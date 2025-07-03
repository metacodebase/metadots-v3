import { NextRequest, NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import Podcast from "@/models/Podcast";
import { verifyToken } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const podcast = await Podcast.findById(params.id).populate("author.id", "name email");
    if (!podcast) {
      return NextResponse.json({ error: "Podcast not found" }, { status: 404 });
    }

    return NextResponse.json({ podcast });
  } catch (error: any) {
    console.error("Error fetching podcast:", error);
    return NextResponse.json(
      { error: "Failed to fetch podcast" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      plays,
      date,
      link,
      status,
      featured
    } = body;

    if (!name || !podcastName || !description || !duration || !date || !link) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingPodcast = await Podcast.findById(params.id);
    if (!existingPodcast) {
      return NextResponse.json({ error: "Podcast not found" }, { status: 404 });
    }

    const updateData = {
      name,
      podcastName,
      description,
      duration,
      plays,
      date: new Date(date),
      link,
      status,
      featured,
      publishedAt: status === "published" ? new Date() : existingPodcast.publishedAt
    };

    const updatedPodcast = await Podcast.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    ).populate("author.id", "name email");

    return NextResponse.json({
      message: "Podcast updated successfully",
      podcast: updatedPodcast
    });
  } catch (error: any) {
    console.error("Error updating podcast:", error);
    return NextResponse.json(
      { error: "Failed to update podcast" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const podcast = await Podcast.findById(params.id);
    if (!podcast) {
      return NextResponse.json({ error: "Podcast not found" }, { status: 404 });
    }

    await Podcast.findByIdAndDelete(params.id);

    return NextResponse.json({
      message: "Podcast deleted successfully"
    });
  } catch (error: any) {
    console.error("Error deleting podcast:", error);
    return NextResponse.json(
      { error: "Failed to delete podcast" },
      { status: 500 }
    );
  }
} 