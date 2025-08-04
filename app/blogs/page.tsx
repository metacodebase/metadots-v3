"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import cn from "classnames";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Search,
  Filter,
  Calendar,
  Clock,
  Eye,
  Heart,
  Share2,
  BookOpen,
  Menu,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import BlogSkeleton from "./BlogSkeleton";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  author: {
    id:
      | string
      | {
          _id: string;
          name: string;
          email: string;
          designation?: string;
          role: string;
          avatar?: string;
        };
    name: string;
    role: string;
    avatar?: string;
    designation?: string;
  };
  status: "draft" | "published" | "scheduled" | "archived";
  featured: boolean;
  publishedAt?: string;
  readTime: string;
  stats: {
    views: number;
    likes: number;
    shares: number;
    comments: number;
  };
  createdAt: string;
  updatedAt: string;
  color?: string;
}

const categories = [
  "All",
  "AI & Machine Learning",
  "Web Development",
  "Cloud Computing",
  "Mobile Development",
  "Database",
  "Cybersecurity",
  "DevOps",
  "UI/UX Design",
];

const ITEMS_PER_PAGE = 9;

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [displayedBlogs, setDisplayedBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/blogs");
      if (response.ok) {
        const data = await response.json();
        const sortedBlogs = data.blogs.sort(
          (a: Blog, b: Blog) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setBlogs(sortedBlogs);
        setFilteredBlogs(sortedBlogs);
        setDisplayedBlogs(sortedBlogs.slice(0, ITEMS_PER_PAGE));
        setHasMore(sortedBlogs.length > ITEMS_PER_PAGE);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filter blogs based on search and category
  useEffect(() => {
    let filtered = blogs;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((blog) => blog.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilteredBlogs(filtered);
    setCurrentPage(1);
    setDisplayedBlogs(filtered.slice(0, ITEMS_PER_PAGE));
    setHasMore(filtered.length > ITEMS_PER_PAGE);
  }, [blogs, searchTerm, selectedCategory]);

  // Load more blogs
  const loadMore = () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newBlogs = filteredBlogs.slice(startIndex, endIndex);

    setDisplayedBlogs((prev) => [...prev, ...newBlogs]);
    setCurrentPage(nextPage);
    setHasMore(endIndex < filteredBlogs.length);
    setIsLoadingMore(false);
  };

  // Helper function to get author info
  const getAuthorInfo = (blog: Blog) => {
    const authorName =
      typeof blog.author.id === "object" && blog.author.id
        ? blog.author.id.name
        : blog.author.name || "Metadots Team";

    const authorDesignation =
      typeof blog.author.id === "object" && blog.author.id
        ? blog.author.id.designation
        : blog.author.designation || blog.author.role || "Tech Writer";

    const authorAvatar =
      typeof blog.author.id === "object" && blog.author.id
        ? blog.author.id.avatar
        : blog.author.avatar;

    return {
      name: authorName,
      designation: authorDesignation,
      avatar: authorAvatar,
    };
  };

  // Get featured blogs
  const featuredBlogs = blogs.filter((blog) => blog.featured).slice(0, 2);

  // Get non-featured blogs for the grid
  const gridBlogs = displayedBlogs.filter((blog) => !blog.featured);

  if (isLoading) {
    return <BlogSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Content Side */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm font-medium shadow-lg">
                  <BookOpen className="w-4 h-4 mr-2" aria-hidden="true" />
                  Tech Insights & Tutorials
                </div>
                <h1 className="text-5xl font-bold tracking-tight sm:text-6xl text-white leading-tight">
                  <span className="block">Latest</span>
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent pb-2">
                    Tech Insights
                  </span>
                </h1>
                <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
                  Stay ahead of the curve with our expert insights, tutorials,
                  and industry analysis. From AI breakthroughs to development
                  best practices.
                </p>
              </div>

              {/* Newsletter Signup */}
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Get Weekly Updates
                </h3>
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter your email"
                    className="border-0 bg-white/20 text-white placeholder:text-white/60 flex-1"
                  />
                  <Button className="bg-white text-slate-900 hover:bg-white/90 px-6 !w-auto">
                    Subscribe
                  </Button>
                </div>
                <p className="text-white/60 text-sm mt-2">
                  Join 10,000+ developers. No spam.
                </p>
              </div>
            </div>

            {/* Visual Side - Blog Interface */}
            <div className="relative">
              <div className="relative rounded-3xl bg-white/10 backdrop-blur-sm p-8 shadow-2xl border border-white/20">
                <div className="space-y-6">
                  {/* Browser Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <Badge className="bg-white/20 text-white backdrop-blur-sm">
                      Blog Dashboard
                    </Badge>
                  </div>

                  {/* Blog Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-white">
                        {blogs.length}+
                      </div>
                      <div className="text-xs text-white/60">Articles</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-white">25K</div>
                      <div className="text-xs text-white/60">Readers</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-white">4.8★</div>
                      <div className="text-xs text-white/60">Rating</div>
                    </div>
                  </div>

                  {/* Article Preview */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg"></div>
                      <div>
                        <div className="text-white text-sm font-medium">
                          {blogs[0]?.title || "Latest Article"}
                        </div>
                        <div className="text-white/60 text-xs">
                          {blogs[0]?.readTime || "5 min read"} •{" "}
                          {blogs[0]?.stats?.views || "1.2K"} views
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-white/20 rounded w-full"></div>
                      <div className="h-2 bg-white/20 rounded w-3/4"></div>
                      <div className="h-2 bg-white/20 rounded w-1/2"></div>
                    </div>
                  </div>

                  {/* Reading Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-white/80 text-sm">
                      <span>Weekly Reading Goal</span>
                      <span>7/10 articles</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full"
                        style={{ width: "70%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl shadow-xl flex items-center justify-center animate-float">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg shadow-xl flex items-center justify-center animate-float delay-1000">
                <Eye className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-white border-b">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search articles..."
                className="pl-10 h-12 border-slate-200 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filters */}

            {/* Results Count */}
            <div className="text-sm text-slate-600">
              {filteredBlogs.length} article
              {filteredBlogs.length !== 1 ? "s" : ""} found
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap mt-5">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "!px-4 !py-2 !w-auto", // Add padding to maintain button size based on content
                  category === "All"
                    ? "bg-blue-700 hover:bg-blue-700 text-white"
                    : "bg-blue-50 border-blue-700 hover:bg-blue-700 text-black hover:text-white focus:bg-blue-700 focus:text-white"
                )}>
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredBlogs.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-white to-slate-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                  Featured
                </span>{" "}
                Articles
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Our most popular and impactful articles that are shaping the
                tech industry
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {featuredBlogs.map((blog) => (
                <Card
                  key={blog._id}
                  className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] bg-white">
                  <div className="relative">
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={blog.featuredImage || "/placeholder.svg"}
                        alt={blog.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge
                        className={`bg-gradient-to-r ${
                          blog.color || "from-blue-500 to-indigo-600"
                        } text-white`}>
                        {blog.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-slate-700">
                        Featured
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <Image
                        src={getAuthorInfo(blog).avatar || "/placeholder.svg"}
                        alt={getAuthorInfo(blog).name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <div className="font-medium text-slate-900">
                          {getAuthorInfo(blog).name}
                        </div>
                        <div className="text-sm text-slate-600">
                          {getAuthorInfo(blog).designation}
                        </div>
                      </div>
                    </div>

                    <CardTitle className="text-2xl mb-3 text-blue-600 transition-colors line-clamp-2">
                      {blog.title}
                    </CardTitle>

                    <CardDescription className="text-base leading-relaxed mb-6 line-clamp-3">
                      {blog.excerpt}
                    </CardDescription>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {blog.tags &&
                        blog.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer">
                            {tag}
                          </span>
                        ))}
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-slate-600 mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center gap-2 space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(blog.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{blog.readTime || "5 min read"}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{blog.stats?.views || "1.2K"}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{blog.stats?.likes || "45"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button
                        asChild
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                        <Link href={`/blogs/${blog.slug}`}>
                          Read Article
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles Grid */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              All Articles
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore our complete collection of technical articles, tutorials,
              and industry insights
            </p>
          </div>

          {gridBlogs.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedCategory !== "All"
                  ? "Try adjusting your search or filter criteria."
                  : "No articles are available at the moment."}
              </p>
              {(searchTerm || selectedCategory !== "All") && (
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  variant="outline">
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {gridBlogs.map((blog) => (
                  <Card
                    key={blog._id}
                    className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white">
                    <div className="relative">
                      <div className="aspect-video overflow-hidden">
                        <Image
                          src={blog.featuredImage || "/placeholder.svg"}
                          alt={blog.title}
                          width={400}
                          height={240}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge
                          className={`bg-gradient-to-r ${
                            blog.color || "from-blue-500 to-indigo-600"
                          } text-white text-xs`}>
                          {blog.category}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <Image
                          src={getAuthorInfo(blog).avatar || "/placeholder.svg"}
                          alt={getAuthorInfo(blog).name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <div>
                          <div className="font-medium text-sm text-slate-900">
                            {getAuthorInfo(blog).name}
                          </div>
                          <div className="text-xs text-slate-600">
                            {getAuthorInfo(blog).designation}
                          </div>
                        </div>
                      </div>

                      <CardTitle className="text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {blog.title}
                      </CardTitle>

                      <CardDescription className="text-sm leading-relaxed mb-4 line-clamp-3">
                        {blog.excerpt}
                      </CardDescription>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs text-slate-600 mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {new Date(blog.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{blog.readTime || "5 min read"}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{blog.stats?.views || "1.2K"}</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        asChild
                        variant="ghost"
                        className="w-full justify-between text-blue-600 hover:text-blue-700 hover:bg-blue-50 group/btn">
                        <Link href={`/blogs/${blog.slug}`}>
                          Read More
                          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="text-center mt-12">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 bg-transparent"
                    onClick={loadMore}
                    disabled={isLoadingMore}>
                    {isLoadingMore ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        Load More Articles
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* End of results */}
              {!hasMore && displayedBlogs.length > 0 && (
                <div className="text-center mt-12">
                  <p className="text-gray-600">
                    You've reached the end of all articles.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="container">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white">
              Never Miss an Update
            </h2>
            <p className="text-xl text-white/80 leading-relaxed">
              Subscribe to our newsletter and get the latest tech insights,
              tutorials, and industry news delivered to your inbox.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex gap-3 p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                <Input
                  placeholder="Enter your email"
                  className="border-0 bg-white/20 text-white placeholder:text-white/60 flex-1"
                />
                <Button className="bg-white text-slate-900 hover:bg-white/90 px-6 !w-auto">
                  Subscribe
                </Button>
              </div>
            </div>
            <p className="text-white/60 text-sm">
              Join 10,000+ developers. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
