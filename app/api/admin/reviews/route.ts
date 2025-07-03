import { NextRequest, NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import Review from "@/models/Review";
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
        { clientName: { $regex: search, $options: "i" } },
        { clientCompany: { $regex: search, $options: "i" } },
        { review: { $regex: search, $options: "i" } }
      ];
    }

    if (status && status !== "all") {
      query.status = status;
    }

    const reviews = await Review.find(query)
      .sort({ createdAt: -1 })
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

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1];
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
      clientName,
      clientRole,
      clientCompany,
      image,
      review,
      rating,
      status = "draft",
      featured = false
    } = body;

    if (!clientName || !clientRole || !clientCompany || !review || !rating) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const newReview = new Review({
      clientName,
      clientRole,
      clientCompany,
      image,
      review,
      rating,
      status,
      featured,
      author: {
        id: decoded.id,
        name: decoded.email,
        role: decoded.role
      },
      publishedAt: status === "published" ? new Date() : undefined
    });

    await newReview.save();

    return NextResponse.json(
      { message: "Review created successfully", review: newReview },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
} 