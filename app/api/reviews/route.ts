import { NextRequest, NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import Review from "@/models/Review";

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

    const reviews = await Review.find(query)
      .sort({ featured: -1, createdAt: -1 })
      .limit(limit)
      .populate("author.id", "name email");

    return NextResponse.json({ reviews });
  } catch (error: any) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
} 