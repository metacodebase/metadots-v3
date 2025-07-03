import { NextRequest, NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import Podcast from "@/models/Podcast";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongo();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const status = searchParams.get("status");

    let query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { podcastName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    if (status && status !== "all") {
      query.status = status;
    }

    const podcasts = await Podcast.find(query)
      .sort({ createdAt: -1 })
      .populate("author.id", "name email");

    return NextResponse.json({ podcasts });
  } catch (error: any) {
    console.error("Error fetching podcasts:", error);
    return NextResponse.json(
      { error: "Failed to fetch podcasts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongo();

    const body = await request.json();
    const {
      name,
      podcastName,
      description,
      duration,
      plays = 0,
      date,
      link,
      status = "draft",
      featured = false
    } = body;

    if (!name || !podcastName || !description || !duration || !date || !link) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newPodcast = new Podcast({
      name,
      podcastName,
      description,
      duration,
      plays,
      date: new Date(date),
      link,
      status,
      featured,
      author: {
        id: decoded.id,
        name: decoded.email,
        role: decoded.role
      },
      publishedAt: status === "published" ? new Date() : undefined
    });

    await newPodcast.save();

    return NextResponse.json(
      { message: "Podcast created successfully", podcast: newPodcast },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating podcast:", error);
    return NextResponse.json(
      { error: "Failed to create podcast" },
      { status: 500 }
    );
  }
} 