import { NextRequest, NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import Podcast from "@/models/Podcast";

export async function GET(request: NextRequest) {
  try {
    await connectMongo();

    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const limit = parseInt(searchParams.get("limit") || "10");

    let query: any = { status: "published" };

    if (featured === "true") {
      query.featured = true;
    }

    const podcasts = await Podcast.find(query)
      .sort({ featured: -1, date: -1 })
      .limit(limit)
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