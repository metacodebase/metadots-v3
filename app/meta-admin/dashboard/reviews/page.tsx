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
import {
  Loader2,
  Plus,
  Search,
  Filter,
  Star,
  Trash2,
  Edit,
  FileText,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { ImageUpload } from "@/components/ui/image-upload";

interface Review {
  _id: string;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  image?: string;
  review: string;
  rating: number;
  status: "draft" | "published" | "archived";
  featured: boolean;
  author: {
    id: string;
    name: string;
    role: string;
  };
  publishedAt?: string;
  stats: {
    views: number;
    likes: number;
    shares: number;
  };
  createdAt: string;
  updatedAt: string;
}

function ReviewsContent() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    clientName: "",
    clientRole: "",
    clientCompany: "",
    image: "",
    review: "",
    rating: 5,
    status: "draft" as "draft" | "published" | "archived",
    featured: false,
  });

  const [editFormData, setEditFormData] = useState({
    clientName: "",
    clientRole: "",
    clientCompany: "",
    image: "",
    review: "",
    rating: 5,
    status: "draft" as "draft" | "published" | "archived",
    featured: false,
  });

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      setError("");
      const token = localStorage.getItem("admin_token");
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (statusFilter !== "all") params.append("status", statusFilter);
      const response = await fetch(`/api/admin/reviews?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch reviews");
      }
      setReviews(data.reviews);
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchReviews();
    }
  }, [user, searchTerm, statusFilter]);

  // Create review
  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.clientName ||
      !formData.clientRole ||
      !formData.clientCompany ||
      !formData.review
    ) {
      setError("Please fill in all required fields");
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      setIsCreating(true);
      setError("");
      const token = localStorage.getItem("admin_token");

      const response = await fetch("/api/admin/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create review");
      }
      setShowCreateDialog(false);
      setFormData({
        clientName: "",
        clientRole: "",
        clientCompany: "",
        image: "",
        review: "",
        rating: 5,
        status: "draft",
        featured: false,
      });
      fetchReviews();
      toast.success("Review created successfully");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsCreating(false);
    }
  };

  // Update review
  const handleUpdateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !editFormData.clientName ||
      !editFormData.clientRole ||
      !editFormData.clientCompany ||
      !editFormData.review
    ) {
      setError("Please fill in all required fields");
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      setIsUpdating(true);
      setError("");
      const token = localStorage.getItem("admin_token");

      const response = await fetch(`/api/admin/reviews/${showEditDialog}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editFormData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to update review");
      }
      setShowEditDialog(null);
      fetchReviews();
      toast.success("Review updated successfully");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete review
  const handleDeleteReview = async (reviewId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this review? This action cannot be undone."
      )
    ) {
      return;
    }
    try {
      setIsDeleting(reviewId);
      setError("");
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to delete review");
      }
      fetchReviews();
      toast.success("Review deleted successfully");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsDeleting(null);
    }
  };

  // Open edit dialog
  const openEditDialog = (review: Review) => {
    setEditFormData({
      clientName: review.clientName,
      clientRole: review.clientRole,
      clientCompany: review.clientCompany,
      image: review.image || "",
      review: review.review,
      rating: review.rating,
      status: review.status,
      featured: review.featured,
    });
    setShowEditDialog(review._id);
  };

  // Render stars
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  // Filtered reviews
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.clientCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.review.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="h-full bg-white rounded-lg md:overflow-auto">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">Reviews</h1>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 py-4 px-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-auto">
                <Plus className="h-4 w-4 mr-2" />
                New Review
              </Button>
            </DialogTrigger>

            <DialogContent className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#f6f8fa] p-8 rounded-lg shadow-xl text-black break-words">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  Create New Review
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Add a new client testimonial
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleCreateReview} className="space-y-6 !w-full">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="clientName"
                      className="block text-sm font-semibold text-gray-700">
                      Client Name *
                    </Label>
                    <Input
                      id="clientName"
                      value={formData.clientName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          clientName: e.target.value,
                        })
                      }
                      placeholder="Enter client name"
                      required
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="clientRole"
                      className="block text-sm font-semibold text-gray-700">
                      Client Role *
                    </Label>
                    <Input
                      id="clientRole"
                      value={formData.clientRole}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          clientRole: e.target.value,
                        })
                      }
                      placeholder="Enter client role"
                      required
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="clientCompany"
                    className="block text-sm font-semibold text-gray-700">
                    Company *
                  </Label>
                  <Input
                    id="clientCompany"
                    value={formData.clientCompany}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        clientCompany: e.target.value,
                      })
                    }
                    placeholder="Enter company name"
                    required
                    className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="rating"
                    className="block text-sm font-semibold text-gray-700">
                    Rating *
                  </Label>
                  <Select
                    value={formData.rating.toString()}
                    onValueChange={(value) =>
                      setFormData({ ...formData, rating: parseInt(value) })
                    }>
                    <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full">
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent className="!bg-white">
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="1">1 Star</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="review"
                    className="block text-sm font-semibold text-gray-700">
                    Review *
                  </Label>
                  <Textarea
                    id="review"
                    value={formData.review}
                    onChange={(e) =>
                      setFormData({ ...formData, review: e.target.value })
                    }
                    placeholder="Enter client review"
                    rows={4}
                    required
                    className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="block text-sm font-semibold text-gray-700">
                    Client Image (Optional)
                  </Label>
                  <ImageUpload
                    value={formData.image}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                    className="mt-2 !w-full p-4 border rounded-md bg-white border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="status"
                      className="block text-sm font-semibold text-gray-700">
                      Status
                    </Label>
                    <Select
                      value={formData.status}
                      onValueChange={(
                        value: "draft" | "published" | "archived"
                      ) => setFormData({ ...formData, status: value })}>
                      <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="!bg-white">
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2 pt-8">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          featured: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="featured" className="text-sm text-gray-700">
                      Featured Review
                    </Label>
                  </div>
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
                      "Create Review"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        {/* Filters and Search */}
        <Card className="bg-[#f6f8fa] text-black border-none mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search reviews..."
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
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
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

        {/* Reviews Table */}
        <Card className="bg-[#f6f8fa] text-black border-none">
          <CardHeader>
            <CardTitle>All Reviews</CardTitle>
            <CardDescription>Manage your client testimonials</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No reviews found
                </h3>
                <p className="text-gray-600 mb-4">
                  Get started by creating your first client review.
                </p>
                <Button
                  onClick={() => setShowCreateDialog(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Review
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="hover:bg-blue-50">
                    <tr className="border-b border-gray-300 hover:bg-blue-100 bg-blue-50">
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Client
                      </th>
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Company
                      </th>
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Rating
                      </th>
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Status
                      </th>
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Featured
                      </th>
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReviews.map((review, index) => (
                      <tr
                        key={review._id}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        }`}>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900 truncate w-20">
                              {review.clientName}
                            </p>
                            <p className="text-sm text-gray-600">
                              {review.clientRole}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-gray-900">
                            {review.clientCompany}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            {renderStars(review.rating)}
                            <span className="ml-2 text-sm text-gray-600">
                              ({review.rating})
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            variant={
                              review.status === "published"
                                ? "default"
                                : review.status === "draft"
                                ? "secondary"
                                : "destructive"
                            }>
                            {review.status.charAt(0).toUpperCase() +
                              review.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          {review.featured ? (
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <Dialog
                              open={showEditDialog === review._id}
                              onOpenChange={(open) =>
                                !open && setShowEditDialog(null)
                              }>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  className="!w-auto px-4 text-blue-700 hover:text-hover bg-transparent"
                                  onClick={() => openEditDialog(review)}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-[#f6f8fa] p-8 rounded-lg shadow-xl text-black">
                                <DialogHeader>
                                  <DialogTitle className="text-xl font-semibold">
                                    Edit Review
                                  </DialogTitle>
                                  <DialogDescription className="text-gray-600">
                                    Update review details
                                  </DialogDescription>
                                </DialogHeader>
                                <form
                                  onSubmit={handleUpdateReview}
                                  className="space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor="edit-clientName"
                                        className="block text-sm font-semibold text-gray-700">
                                        Client Name *
                                      </Label>
                                      <Input
                                        id="edit-clientName"
                                        value={editFormData.clientName}
                                        onChange={(e) =>
                                          setEditFormData({
                                            ...editFormData,
                                            clientName: e.target.value,
                                          })
                                        }
                                        required
                                        className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor="edit-clientRole"
                                        className="block text-sm font-semibold text-gray-700">
                                        Client Role *
                                      </Label>
                                      <Input
                                        id="edit-clientRole"
                                        value={editFormData.clientRole}
                                        onChange={(e) =>
                                          setEditFormData({
                                            ...editFormData,
                                            clientRole: e.target.value,
                                          })
                                        }
                                        required
                                        className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                                      />
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <Label
                                      htmlFor="edit-clientCompany"
                                      className="block text-sm font-semibold text-gray-700">
                                      Company *
                                    </Label>
                                    <Input
                                      id="edit-clientCompany"
                                      value={editFormData.clientCompany}
                                      onChange={(e) =>
                                        setEditFormData({
                                          ...editFormData,
                                          clientCompany: e.target.value,
                                        })
                                      }
                                      required
                                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label
                                      htmlFor="edit-rating"
                                      className="block text-sm font-semibold text-gray-700">
                                      Rating *
                                    </Label>
                                    <Select
                                      value={editFormData.rating.toString()}
                                      onValueChange={(value) =>
                                        setEditFormData({
                                          ...editFormData,
                                          rating: parseInt(value),
                                        })
                                      }>
                                      <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent className="!bg-white">
                                        <SelectItem value="5">
                                          5 Stars
                                        </SelectItem>
                                        <SelectItem value="4">
                                          4 Stars
                                        </SelectItem>
                                        <SelectItem value="3">
                                          3 Stars
                                        </SelectItem>
                                        <SelectItem value="2">
                                          2 Stars
                                        </SelectItem>
                                        <SelectItem value="1">
                                          1 Star
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div className="space-y-2">
                                    <Label
                                      htmlFor="edit-review"
                                      className="block text-sm font-semibold text-gray-700">
                                      Review *
                                    </Label>
                                    <Textarea
                                      id="edit-review"
                                      value={editFormData.review}
                                      onChange={(e) =>
                                        setEditFormData({
                                          ...editFormData,
                                          review: e.target.value,
                                        })
                                      }
                                      rows={4}
                                      required
                                      className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label className="block text-sm font-semibold text-gray-700">
                                      Client Image (Optional)
                                    </Label>
                                    <ImageUpload
                                      value={editFormData.image}
                                      onChange={(url) =>
                                        setEditFormData({
                                          ...editFormData,
                                          image: url,
                                        })
                                      }
                                      className="mt-2 w-full p-4 border rounded-md bg-white border-blue-500"
                                    />
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
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
                                          <SelectItem value="archived">
                                            Archived
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="flex items-center space-x-2 pt-8">
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
                                        Featured Review
                                      </Label>
                                    </div>
                                  </div>

                                  <div className="flex justify-end space-x-4">
                                    <Button
                                      type="button"
                                      onClick={() => setShowEditDialog(null)}
                                      className="text-white hover:text-black !w-auto px-4 bg-black hover:bg-transparent border border-black hover:border-black transition-colors duration-300">
                                      Cancel
                                    </Button>
                                    <Button
                                      type="submit"
                                      disabled={isUpdating}
                                      className="bg-blue-700 text-white hover:bg-blue-800 !w-auto px-4">
                                      {isUpdating ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                      ) : (
                                        "Update Review"
                                      )}
                                    </Button>
                                  </div>
                                </form>
                              </DialogContent>
                            </Dialog>
                            <Button
                              size="sm"
                              className="!w-auto px-4 text-red-800 hover:text-hover bg-transparent"
                              onClick={() => handleDeleteReview(review._id)}
                              disabled={isDeleting === review._id}>
                              {isDeleting === review._id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
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

export default function ReviewsPage() {
  return <ReviewsContent />;
}
