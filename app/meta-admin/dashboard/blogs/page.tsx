"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { ImageUpload } from "@/components/ui/image-upload";
import {
  Loader2,
  FileText,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Clock,
  ExternalLink,
  EyeOff,
  CheckCircle,
  Clock as ClockIcon,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  author: {
    id: string;
    name: string;
    role: string;
    designation?: string;
  };
  status: "draft" | "published" | "scheduled" | "archived";
  featured: boolean;
  publishedAt?: string;
  scheduledAt?: string;
  readTime: string;
  stats: {
    views: number;
    likes: number;
    shares: number;
    comments: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface BlogStats {
  total: number;
  published: number;
  drafts: number;
  totalViews: number;
}

const categories = [
  "AI & Machine Learning",
  "Web Development",
  "Cloud Computing",
  "Mobile Development",
  "Database",
  "Cybersecurity",
  "DevOps",
  "UI/UX Design",
];

function BlogsContent() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [stats, setStats] = useState<BlogStats>({
    total: 0,
    published: 0,
    drafts: 0,
    totalViews: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Dialog states
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    category: "",
    tags: "",
    status: "draft" as "draft" | "published" | "scheduled" | "archived",
    featured: false,
    scheduledAt: "",
  });

  const [editFormData, setEditFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    category: "",
    tags: "",
    status: "draft" as "draft" | "published" | "scheduled" | "archived",
    featured: false,
    scheduledAt: "",
  });

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("admin_token");
      const params = new URLSearchParams();

      if (searchTerm) params.append("search", searchTerm);
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (categoryFilter !== "all") params.append("category", categoryFilter);

      const response = await fetch(`/api/admin/blogs?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const data = await response.json();
      setBlogs(data.blogs);
      setStats(data.stats);
    } catch (err) {
      setError("Failed to load blogs");
      console.error("Error fetching blogs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [searchTerm, statusFilter, categoryFilter]);

  // Create blog
  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.excerpt ||
      !formData.content ||
      !formData.category
    ) {
      setError("Title, excerpt, content, and category are required");
      return;
    }

    try {
      setIsCreating(true);
      setError("");
      const token = localStorage.getItem("admin_token");

      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      const response = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          tags: tagsArray,
          scheduledAt: formData.scheduledAt || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create blog");
      }

      setShowCreateDialog(false);
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        featuredImage: "",
        category: "",
        tags: "",
        status: "draft",
        featured: false,
        scheduledAt: "",
      });
      fetchBlogs();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsCreating(false);
    }
  };

  // Update blog
  const handleUpdateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !editFormData.title ||
      !editFormData.excerpt ||
      !editFormData.content ||
      !editFormData.category
    ) {
      setError("Title, excerpt, content, and category are required");
      return;
    }

    try {
      setIsUpdating(true);
      setError("");
      const token = localStorage.getItem("admin_token");

      const tagsArray = editFormData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      const response = await fetch(`/api/admin/blogs/${showEditDialog}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...editFormData,
          tags: tagsArray,
          scheduledAt: editFormData.scheduledAt || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update blog");
      }

      setShowEditDialog(null);
      fetchBlogs();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete blog
  const handleDeleteBlog = async (blogId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this blog? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      setIsDeleting(blogId);
      setError("");
      const token = localStorage.getItem("admin_token");

      const response = await fetch(`/api/admin/blogs/${blogId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete blog");
      }

      fetchBlogs();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsDeleting(null);
    }
  };

  // Open edit dialog
  const openEditDialog = async (blog: Blog) => {
    setEditFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      featuredImage: blog.featuredImage || "",
      category: blog.category,
      tags: blog.tags.join(", "),
      status: blog.status,
      featured: blog.featured,
      scheduledAt: blog.scheduledAt
        ? new Date(blog.scheduledAt).toISOString().slice(0, 16)
        : "",
    });
    setShowEditDialog(blog._id);
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "draft":
        return <EyeOff className="h-4 w-4 text-gray-600" />;
      case "scheduled":
        return <ClockIcon className="h-4 w-4 text-blue-600" />;
      case "archived":
        return <Trash2 className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  // Filter blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="h-full bg-white rounded-lg md:overflow-auto">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">Blog Posts</h1>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 py-4 px-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-auto">
                <Plus className="h-4 w-4 mr-2" />
                New Blog Post
              </Button>
            </DialogTrigger>

            <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#f6f8fa] p-8 rounded-lg shadow-xl text-black break-words">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  Create New Blog Post
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Create a new blog post with rich content and media
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleCreateBlog} className="space-y-6 !w-full">
                <div className="space-y-2">
                  <Label
                    htmlFor="title"
                    className="block text-sm font-semibold text-gray-700">
                    Title *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter blog title"
                    required
                    className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {formData.title.length}/200 characters (SEO meta title will
                    be truncated to 60 characters)
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="category"
                    className="block text-sm font-semibold text-gray-700">
                    Category *
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }>
                    <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="!bg-white">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="excerpt"
                    className="block text-sm font-semibold text-gray-700">
                    Excerpt *
                  </Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    placeholder="Brief description of the blog post"
                    rows={3}
                    required
                    className=" bg-white  border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 "
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {formData.excerpt.length}/500 characters (SEO meta
                    description will be truncated to 160 characters)
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="block text-sm font-semibold text-gray-700">
                    Featured Image
                  </Label>
                  <ImageUpload
                    value={formData.featuredImage}
                    onChange={(url) =>
                      setFormData({ ...formData, featuredImage: url })
                    }
                    className="mt-2 !w-full p-4 border rounded-md bg-white border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="content"
                    className="block text-sm font-semibold text-gray-700">
                    Content *
                  </Label>
                  <RichTextEditor
                    content={formData.content}
                    onChange={(content) =>
                      setFormData({ ...formData, content })
                    }
                    placeholder="Write your blog content here..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="tags"
                      className="block text-sm font-semibold text-gray-700">
                      Tags (comma-separated)
                    </Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value })
                      }
                      placeholder="nextjs, react, javascript"
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="status"
                      className="block text-sm font-semibold text-gray-700">
                      Status
                    </Label>
                    <Select
                      value={formData.status}
                      onValueChange={(
                        value: "draft" | "published" | "scheduled" | "archived"
                      ) => setFormData({ ...formData, status: value })}>
                      <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="!bg-white">
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {formData.status === "scheduled" && (
                  <div className="space-y-2">
                    <Label
                      htmlFor="scheduledAt"
                      className="block text-sm font-semibold text-gray-700">
                      Schedule Date & Time
                    </Label>
                    <Input
                      id="scheduledAt"
                      type="datetime-local"
                      value={formData.scheduledAt}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          scheduledAt: e.target.value,
                        })
                      }
                      required
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full"
                    />
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="featured" className="text-sm text-gray-700">
                    Featured Post
                  </Label>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    onClick={() => setShowCreateDialog(false)}
                    className="text-white hover:text-black !w-auto px-4 bg-black hover:bg-transparent border border-black hover:border-black transition-colors duration-300">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isCreating}
                    className="bg-blue-700 text-white hover:bg-blue-800 !w-auto px-4">
                    {isCreating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Create Blog Post"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-[#f6f8fa] border-none text-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Posts
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.total}
                  </p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-[#f6f8fa] border-none text-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.published}
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-[#f6f8fa] border-none text-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Drafts</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.drafts}
                  </p>
                </div>
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <EyeOff className="w-4 h-4 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-[#f6f8fa] border-none text-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Views
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalViews.toLocaleString()}
                  </p>
                </div>
                <Eye className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="bg-[#f6f8fa] text-black border-none mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search blog posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="!bg-white">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px] h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent className="!bg-white">
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Blogs Table */}
        <Card className="bg-[#f6f8fa] text-black border-none">
          <CardHeader>
            <CardTitle>All Blog Posts</CardTitle>
            <CardDescription>
              Manage your blog content and articles
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No blog posts found
                </h3>
                <p className="text-gray-600 mb-4">
                  Get started by creating your first blog post.
                </p>
                <Button
                  onClick={() => setShowCreateDialog(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Blog Post
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="hover:bg-blue-50">
                    <tr className="border-b border-gray-300 hover:bg-blue-100 bg-blue-50">
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Title
                      </th>
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Author
                      </th>
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Category
                      </th>
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Status
                      </th>
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Published
                      </th>
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Views
                      </th>
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBlogs.map((blog, index) => (
                      <tr
                        key={blog._id}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        }`}>
                        <td className="py-4 px-4">
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="font-medium text-gray-900 truncate w-20">
                                {blog.title}
                              </p>
                              {blog.featured && (
                                <Badge variant="secondary">Featured</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2 truncate w-20">
                              {blog.excerpt}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Clock className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {blog.readTime}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-gray-900">
                            {blog.author.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {blog.author.designation || blog.author.role}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className="text-black">
                            {blog.category}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(blog.status)}
                            <Badge
                              variant={
                                blog.status === "published"
                                  ? "default"
                                  : blog.status === "draft"
                                  ? "secondary"
                                  : blog.status === "scheduled"
                                  ? "outline"
                                  : "destructive"
                              }>
                              {blog.status.charAt(0).toUpperCase() +
                                blog.status.slice(1)}
                            </Badge>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {blog.publishedAt
                            ? new Date(blog.publishedAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )
                            : "-"}
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-gray-900">
                            {blog.stats.views.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {blog.stats.likes} likes
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            {blog.status === "published" && (
                              <Button
                                size="sm"
                                asChild
                                className="!w-auto px-4 text-blue-700 hover:text-hover bg-transparent">
                                <a
                                  href={`/blogs/${blog.slug}`}
                                  target="_blank"
                                  rel="noopener noreferrer">
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </Button>
                            )}
                            <Dialog
                              open={showEditDialog === blog._id}
                              onOpenChange={(open) =>
                                !open && setShowEditDialog(null)
                              }>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  className="!w-auto px-4 text-blue-700 hover:text-hover bg-transparent"
                                  onClick={() => openEditDialog(blog)}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#f6f8fa] p-8 rounded-lg shadow-xl text-black">
                                <DialogHeader>
                                  <DialogTitle className="text-xl font-semibold">
                                    Edit Blog Post
                                  </DialogTitle>
                                  <DialogDescription className="text-gray-600">
                                    Update blog post content and settings
                                  </DialogDescription>
                                </DialogHeader>
                                <form
                                  onSubmit={handleUpdateBlog}
                                  className="space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor="edit-title"
                                        className="block text-sm font-semibold text-gray-700">
                                        Title *
                                      </Label>
                                      <Input
                                        id="edit-title"
                                        value={editFormData.title}
                                        onChange={(e) =>
                                          setEditFormData({
                                            ...editFormData,
                                            title: e.target.value,
                                          })
                                        }
                                        required
                                        className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                                      />
                                      <div className="text-xs text-gray-500 mt-1">
                                        {editFormData.title.length}/200
                                        characters (SEO meta title will be
                                        truncated to 60 characters)
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor="edit-category"
                                        className="block text-sm font-semibold text-gray-700">
                                        Category *
                                      </Label>
                                      <Select
                                        value={editFormData.category}
                                        onValueChange={(value) =>
                                          setEditFormData({
                                            ...editFormData,
                                            category: value,
                                          })
                                        }>
                                        <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="!bg-white">
                                          {categories.map((category) => (
                                            <SelectItem
                                              key={category}
                                              value={category}>
                                              {category}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <Label
                                      htmlFor="edit-excerpt"
                                      className="block text-sm font-semibold text-gray-700">
                                      Excerpt *
                                    </Label>
                                    <Textarea
                                      id="edit-excerpt"
                                      value={editFormData.excerpt}
                                      onChange={(e) =>
                                        setEditFormData({
                                          ...editFormData,
                                          excerpt: e.target.value,
                                        })
                                      }
                                      rows={3}
                                      required
                                      className=" bg-white  border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 "
                                    />
                                    <div className="text-xs text-gray-500 mt-1">
                                      {editFormData.excerpt.length}/500
                                      characters (SEO meta description will be
                                      truncated to 160 characters)
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <Label className="block text-sm font-semibold text-gray-700">
                                      Featured Image
                                    </Label>
                                    <ImageUpload
                                      value={editFormData.featuredImage}
                                      onChange={(url) =>
                                        setEditFormData({
                                          ...editFormData,
                                          featuredImage: url,
                                        })
                                      }
                                      className="mt-2 w-full p-4 border rounded-md bg-white border-blue-500"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label
                                      htmlFor="edit-content"
                                      className="block text-sm font-semibold text-gray-700">
                                      Content *
                                    </Label>
                                    <RichTextEditor
                                      content={editFormData.content}
                                      onChange={(content) =>
                                        setEditFormData({
                                          ...editFormData,
                                          content,
                                        })
                                      }
                                      placeholder="Write your blog content here..."
                                    />
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor="edit-tags"
                                        className="block text-sm font-semibold text-gray-700">
                                        Tags (comma-separated)
                                      </Label>
                                      <Input
                                        id="edit-tags"
                                        value={editFormData.tags}
                                        onChange={(e) =>
                                          setEditFormData({
                                            ...editFormData,
                                            tags: e.target.value,
                                          })
                                        }
                                        className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor="edit-status"
                                        className="block text-sm font-semibold text-gray-700">
                                        Status
                                      </Label>
                                      <Select
                                        value={editFormData.status}
                                        onValueChange={(
                                          value:
                                            | "draft"
                                            | "published"
                                            | "scheduled"
                                            | "archived"
                                        ) =>
                                          setEditFormData({
                                            ...editFormData,
                                            status: value,
                                          })
                                        }>
                                        <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="!bg-white">
                                          <SelectItem value="draft">
                                            Draft
                                          </SelectItem>
                                          <SelectItem value="published">
                                            Published
                                          </SelectItem>
                                          <SelectItem value="scheduled">
                                            Scheduled
                                          </SelectItem>
                                          <SelectItem value="archived">
                                            Archived
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>

                                  {editFormData.status === "scheduled" && (
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor="edit-scheduledAt"
                                        className="block text-sm font-semibold text-gray-700">
                                        Schedule Date & Time
                                      </Label>
                                      <Input
                                        id="edit-scheduledAt"
                                        type="datetime-local"
                                        value={editFormData.scheduledAt}
                                        onChange={(e) =>
                                          setEditFormData({
                                            ...editFormData,
                                            scheduledAt: e.target.value,
                                          })
                                        }
                                        required
                                        className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                                      />
                                    </div>
                                  )}

                                  <div className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      id="edit-featured"
                                      checked={editFormData.featured}
                                      onChange={(e) =>
                                        setEditFormData({
                                          ...editFormData,
                                          featured: e.target.checked,
                                        })
                                      }
                                      className=""
                                    />
                                    <Label
                                      htmlFor="edit-featured"
                                      className="text-sm text-gray-700">
                                      Featured Post
                                    </Label>
                                  </div>

                                  <div className="flex justify-end space-x-4">
                                    <Button
                                      type="button"
                                      onClick={() => setShowEditDialog(null)}
                                      className="bg-transparent text-black hover:bg-black hover:text-white border border-black !w-auto">
                                      Cancel
                                    </Button>
                                    <Button
                                      type="submit"
                                      disabled={isUpdating}
                                      className="bg-blue-700 text-white hover:bg-blue-800 !w-auto px-4">
                                      {isUpdating ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                      ) : (
                                        "Update Blog Post"
                                      )}
                                    </Button>
                                  </div>
                                </form>
                              </DialogContent>
                            </Dialog>
                            <Button
                              size="sm"
                              className="!w-auto px-4 text-red-800 hover:text-hover bg-transparent"
                              onClick={() => handleDeleteBlog(blog._id)}
                              disabled={isDeleting === blog._id}>
                              {isDeleting === blog._id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function BlogsPage() {
  return <BlogsContent />;
}
