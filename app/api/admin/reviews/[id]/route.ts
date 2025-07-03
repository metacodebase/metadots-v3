import { NextRequest, NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import Review from "@/models/Review";
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

    const review = await Review.findById(params.id).populate("author.id", "name email");
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    return NextResponse.json({ review });
  } catch (error: any) {
    console.error("Error fetching review:", error);
    return NextResponse.json(
      { error: "Failed to fetch review" },
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
      clientName,
      clientRole,
      clientCompany,
      image,
      review,
      rating,
      status,
      featured
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

    const existingReview = await Review.findById(params.id);
    if (!existingReview) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    const updateData = {
      clientName,
      clientRole,
      clientCompany,
      image,
      review,
      rating,
      status,
      featured,
      publishedAt: status === "published" ? new Date() : existingReview.publishedAt
    };

    const updatedReview = await Review.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    ).populate("author.id", "name email");

    return NextResponse.json({
      message: "Review updated successfully",
      review: updatedReview
    });
  } catch (error: any) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { error: "Failed to update review" },
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

    const review = await Review.findById(params.id);
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    await Review.findByIdAndDelete(params.id);

    return NextResponse.json({
      message: "Review deleted successfully"
    });
  } catch (error: any) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
} 