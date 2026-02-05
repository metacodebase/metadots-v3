"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface FeaturedBlogProps {
  blog: {
    _id: any;
    title: string;
    content: string;
    excerpt: string;
    featuredImage?: string;
    author: {
      name: string;
      role: string;
      designation?: string;
      avatar?: string;
    };
    publishedAt?: string;
    readTime: string;
    featured: boolean;
    status: string;
    slug: string;
  };
}

export default function FeaturedBlog({ blog }: FeaturedBlogProps) {
  return (
    <Card className="group overflow-hidden border border-slate-200 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-md">
      <CardHeader className="p-0">
        <div className="relative">
          {/* Blog Header with Image or Gradient */}
          <div
            className={`${
              blog.featuredImage
                ? "bg-cover bg-center"
                : "bg-slate-900"
            } relative overflow-hidden p-6`}
            style={
              blog.featuredImage
                ? { backgroundImage: `url(${blog.featuredImage})` }
                : {}
            }>
            <div className="relative z-10">
              <div className="mb-4 flex items-center justify-between">
                <Badge className="bg-slate-800 px-3 py-1 text-xs font-medium text-slate-50">
                  Featured Article
                </Badge>
                <div className="flex items-center text-sm text-slate-200">
                  <Clock className="mr-1 h-4 w-4" />
                  {blog.readTime}
                </div>
              </div>

              {/* Abstract Pattern */}
              <div className="mb-4 flex items-center space-x-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-2 w-2 rounded-full bg-blue-400/60"
                    style={{
                      animationDelay: `${i * 200}ms`,
                    }}></div>
                ))}
              </div>

              {/* Read More Button */}
              <Link href={`/blogs/${blog.slug}`}>
                <Button
                  size="sm"
                  className="border border-slate-600 bg-slate-800 text-slate-50 hover:bg-slate-700">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="p-6">
            <CardTitle className="mb-3 text-xl font-semibold text-slate-900">
              {blog.title}
            </CardTitle>
            <CardDescription className="mb-4 leading-relaxed text-slate-600">
              {blog.excerpt}
            </CardDescription>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {blog.author.avatar ? (
                  <div className="h-8 w-8 overflow-hidden rounded-full">
                    <Image
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                    <span className="text-sm font-bold">
                      {blog.author.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <div className="text-sm font-medium text-slate-900">
                    {blog.author.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {blog.author.designation || blog.author.role}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 space-x-2 text-sm text-slate-500">
                <Calendar className="h-4 w-4" />
                {blog.publishedAt
                  ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Coming Soon"}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
