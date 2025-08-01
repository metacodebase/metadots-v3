import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";

interface BlogCardProps {
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
    };
    publishedAt?: string;
    readTime: string;
    featured: boolean;
    status: string;
    slug: string;
  };
  isOpen: boolean;
  onToggle: () => void;
}

export default function BlogCard({ blog, isOpen, onToggle }: BlogCardProps) {
  const handleReadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card
      className={`group bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 overflow-hidden cursor-pointer ${
        isOpen ? "bg-white/20" : ""
      }`}
      onClick={onToggle}>
      <CardHeader className="p-0">
        <div className="relative">
          {/* Blog Header with Image or Gradient */}
          <div
            className={`${
              blog.featuredImage
                ? "bg-cover bg-center"
                : "bg-gradient-to-r from-blue-600 to-indigo-600"
            } p-6 relative overflow-hidden transition-all duration-500 ${
              isOpen ? "h-auto" : "h-24"
            }`}
            style={
              blog.featuredImage
                ? { backgroundImage: `url(${blog.featuredImage})` }
                : {}
            }>
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-white/20 text-white backdrop-blur">
                  Article
                </Badge>
                <div className="text-white/80 text-sm flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {blog.readTime}
                </div>
              </div>

              {/* Abstract Pattern - Only show when open */}
              {isOpen && (
                <div className="flex items-center space-x-2 mb-4">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white/30 rounded-full animate-pulse"
                      style={{
                        width: `${(i % 3) * 4 + 8}px`,
                        height: `${(i % 3) * 4 + 8}px`,
                        animationDelay: `${i * 200}ms`,
                      }}></div>
                  ))}
                </div>
              )}

              {/* Read More Button - Only show when open */}
              {isOpen && (
                <Link href={`/blogs/${blog.slug}`} onClick={handleReadClick}>
                  <Button
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur group-hover:bg-white/30 transition-all">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              )}

              {/* Toggle Icon */}
              <div className="absolute top-10 right-0">
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-white/80" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-white/80" />
                )}
              </div>
            </div>
          </div>

          <div
            className={`p-6 transition-all duration-500 ${
              isOpen ? "opacity-100" : "opacity-70"
            }`}>
            <CardTitle className="text-xl text-white mb-3 group-hover:text-blue-400 transition-colors">
              {blog.title}
            </CardTitle>
            <CardDescription
              className={`text-white/70 mb-4 leading-relaxed transition-all duration-500 ${
                isOpen ? "max-h-32" : "max-h-0 overflow-hidden"
              }`}>
              {blog.excerpt}
            </CardDescription>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {blog.author.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="text-white text-sm font-medium">
                    {blog.author.name}
                  </div>
                  <div className="text-white/60 text-xs">
                    {blog.author.designation || blog.author.role}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 space-x-2 text-white/60 text-sm">
                <Calendar className="w-4 h-4" />
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
