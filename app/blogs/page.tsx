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
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* Hero Section */}
      <section className="border-b border-slate-100 bg-slate-50 py-20">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Content Side */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-100">
                  <BookOpen className="mr-2 h-4 w-4" aria-hidden="true" />
                  Tech Insights & Tutorials
                </div>
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                  <span className="block">Latest</span>
                  <span className="mt-1 block text-blue-700">Tech Insights</span>
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                  Stay ahead of the curve with our expert insights, tutorials,
                  and industry analysis. From AI breakthroughs to development
                  best practices.
                </p>
              </div>

              {/* Newsletter Signup */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-lg font-semibold text-slate-900">
                  Get Weekly Updates
                </h3>
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter your email"
                    className="flex-1 border-slate-200 bg-white focus:border-blue-500"
                  />
                  <Button className="!w-auto bg-blue-600 px-6 text-white hover:bg-blue-700">
                    Subscribe
                  </Button>
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  Join 10,000+ developers. No spam.
                </p>
              </div>
            </div>

            {/* Visual Side - Blog Interface */}
            <div className="relative">
              <div className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-md">
                <div className="space-y-6">
                  {/* Browser Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-blue-500" />
                      <span className="h-2.5 w-2.5 rounded-full bg-blue-100" />
                      <span className="h-2.5 w-2.5 rounded-full bg-blue-100" />
                    </div>
                    <Badge
                      variant="outline"
                      className="border-blue-100 bg-blue-50/60 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-blue-700">
                      Blog Dashboard
                    </Badge>
                  </div>

                  {/* Blog Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
                      <div className="text-lg font-semibold text-slate-900">
                        {blogs.length}+
                      </div>
                      <div className="text-xs text-slate-500">Articles</div>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
                      <div className="text-lg font-semibold text-slate-900">
                        25K
                      </div>
                      <div className="text-xs text-slate-500">Readers</div>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
                      <div className="text-lg font-semibold text-slate-900">
                        4.8★
                      </div>
                      <div className="text-xs text-slate-500">Rating</div>
                    </div>
                  </div>

                  {/* Article Preview */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-3 flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                        <BookOpen className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900">
                          {blogs[0]?.title || "Latest Article"}
                        </div>
                        <div className="text-xs text-slate-500">
                          {blogs[0]?.readTime || "5 min read"} •{" "}
                          {blogs[0]?.stats?.views || "1.2K"} views
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-full rounded bg-blue-100" />
                      <div className="h-2 w-3/4 rounded bg-blue-100" />
                      <div className="h-2 w-1/2 rounded bg-blue-100" />
                    </div>
                  </div>

                  {/* Reading Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-700">
                      <span>Weekly Reading Goal</span>
                      <span>7/10 articles</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-blue-50">
                      <div
                        className="h-2 animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-blue-500"
                        style={{ width: "70%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 flex h-16 w-16 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="absolute -bottom-4 -left-4 flex h-14 w-14 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="border-b bg-white py-12">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            {/* Search */}
            <div className="relative w-full flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
              <Input
                placeholder="Search articles..."
                className="h-12 border-slate-200 bg-white pl-10 focus:border-blue-500"
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
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "!px-4 !py-2 !w-auto", // Add padding to maintain button size based on content
                  category === "All"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border-blue-200 bg-white text-slate-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
                )}>
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredBlogs.length > 0 && (
        <section className="bg-slate-50 py-20">
          <div className="container">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-semibold text-slate-900">
                Featured Articles
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-600">
                Our most popular and impactful articles that are shaping the
                tech industry
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {featuredBlogs.map((blog) => (
                <Card
                  key={blog._id}
                  className="group overflow-hidden border border-slate-100 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-md">
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
                      <Badge className="bg-blue-50 text-blue-700">
                        {blog.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gray-200 text-slate-700">
                        Featured
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="p-8">
                    <div className="mb-4 flex items-center space-x-4">
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

                    <CardTitle className="mb-3 line-clamp-3 text-2xl text-slate-900 transition-colors">
                      {blog.title}
                    </CardTitle>

                    <CardDescription className="mb-6 h-16 line-clamp-3 text-base leading-relaxed text-slate-600">
                      {blog.excerpt}
                    </CardDescription>

                    {/* Tags */}
                    <div className="mb-6 flex flex-wrap gap-2">
                      {blog.tags &&
                        blog.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="cursor-pointer rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 transition-colors hover:bg-blue-100 hover:text-blue-700">
                            {tag}
                          </span>
                        ))}
                    </div>

                    {/* Meta Info */}
                    <div className="mb-6 flex items-center justify-between text-sm text-slate-600">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center gap-2 space-x-1">
                          <Calendar className="h-4 w-4" />
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
                          <Clock className="h-4 w-4" />
                          <span>{blog.readTime || "5 min read"}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
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
                        className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <Link href={`/blogs/${blog.slug}`}>
                          Read Article
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        size="icon"
                        className="!w-auto border border-blue-200 bg-white px-5 py-2 text-blue-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-800">
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
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-semibold text-slate-900">
              All Articles
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Explore our complete collection of technical articles, tutorials,
              and industry insights
            </p>
          </div>

          {gridBlogs.length === 0 ? (
            <div className="py-12 text-center">
              <BookOpen className="mx-auto mb-4 h-12 w-12 text-slate-400" />
              <h3 className="mb-2 text-lg font-medium text-slate-900">
                No articles found
              </h3>
              <p className="mb-4 text-slate-600">
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
                    className="group overflow-hidden border border-slate-100 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-md">
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
                        <Badge className="bg-blue-50 text-xs text-blue-700">
                          {blog.category}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="p-6">
                      <div className="mb-3 flex items-center space-x-3">
                        <Image
                          src={getAuthorInfo(blog).avatar || "/placeholder.svg"}
                          alt={getAuthorInfo(blog).name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <div>
                          <div className="text-sm font-medium text-slate-900">
                            {getAuthorInfo(blog).name}
                          </div>
                            <div className="text-xs text-slate-600">
                            {getAuthorInfo(blog).designation}
                          </div>
                        </div>
                      </div>

                      <CardTitle className="mb-2 line-clamp-2 text-lg text-slate-900 transition-colors group-hover:text-blue-600">
                        {blog.title}
                      </CardTitle>

                      <CardDescription className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-600">
                        {blog.excerpt}
                      </CardDescription>

                      {/* Meta */}
                      <div className="mb-4 flex items-center justify-between text-xs text-slate-600">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
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
                            <Clock className="h-3 w-3" />
                            <span>{blog.readTime || "5 min read"}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{blog.stats?.views || "1.2K"}</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        asChild
                        className="px-6 py-3 bg-blue-600 text-white shadow-sm hover:bg-blue-700">
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
      <section className="bg-slate-900 py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-8 text-center">
            <h2 className="text-4xl font-semibold text-white">
              Never Miss an Update
            </h2>
            <p className="text-xl leading-relaxed text-slate-200">
              Subscribe to our newsletter and get the latest tech insights,
              tutorials, and industry news delivered to your inbox.
            </p>
            <div className="mx-auto max-w-md">
              <div className="flex gap-3 rounded-xl bg-slate-800 p-2">
                <Input
                  placeholder="Enter your email"
                  className="flex-1 border-0 bg-slate-800 text-white placeholder:text-slate-400 focus-visible:ring-0"
                />
                <Button className="!w-auto bg-white px-6 text-slate-900 hover:bg-slate-100">
                  Subscribe
                </Button>
              </div>
            </div>
            <p className="text-sm text-slate-400">
              Join 10,000+ developers. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
