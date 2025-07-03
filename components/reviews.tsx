"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Image from "next/image";

interface Review {
  _id: string;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  image?: string;
  review: string;
  rating: number;
  featured: boolean;
  createdAt: string;
}

interface ReviewsProps {
  featured?: boolean;
  limit?: number;
  showTitle?: boolean;
}

export default function Reviews({ featured = false, limit = 3, showTitle = true }: ReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams();
        if (featured) params.append("featured", "true");
        if (limit) params.append("limit", limit.toString());
        
        const response = await fetch(`/api/reviews?${params}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch reviews");
        }
        
        setReviews(data.reviews);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching reviews:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [featured, limit]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: limit }, (_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Unable to load reviews at this time.</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No reviews available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {showTitle && (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied clients about their transformative experiences
          </p>
        </div>
      )}
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <Card key={review._id} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {review.image ? (
                    <Image
                      src={review.image}
                      alt={review.clientName}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {review.clientName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">{review.clientName}</h3>
                    <p className="text-sm text-gray-600">{review.clientRole}</p>
                    <p className="text-sm text-gray-500">{review.clientCompany}</p>
                  </div>
                </div>
                {review.featured && (
                  <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                )}
              </div>
              <div className="flex items-center">
                {renderStars(review.rating)}
                <span className="ml-2 text-sm text-gray-600">({review.rating})</span>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700 leading-relaxed">
                "{review.review}"
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 