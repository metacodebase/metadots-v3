"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Plus, Search, Filter, Star, Trash2, Edit } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"
import { ImageUpload } from "@/components/ui/image-upload"

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
    featured: false
  });

  const [editFormData, setEditFormData] = useState({
    clientName: "",
    clientRole: "",
    clientCompany: "",
    image: "",
    review: "",
    rating: 5,
    status: "draft" as "draft" | "published" | "archived",
    featured: false
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
          Authorization: `Bearer ${token}`
        }
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
    if (!formData.clientName || !formData.clientRole || !formData.clientCompany || !formData.review) {
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
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
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
        featured: false
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
    if (!editFormData.clientName || !editFormData.clientRole || !editFormData.clientCompany || !editFormData.review) {
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
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editFormData)
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
    if (!confirm("Are you sure you want to delete this review? This action cannot be undone.")) {
      return;
    }
    try {
      setIsDeleting(reviewId);
      setError("");
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
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
      featured: review.featured
    });
    setShowEditDialog(review._id);
  };

  // Render stars
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
          <p className="text-gray-600">Manage client testimonials and reviews</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Review
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Review</DialogTitle>
              <DialogDescription>Add a new client testimonial</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateReview} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clientName">Client Name *</Label>
                  <Input
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="clientRole">Client Role *</Label>
                  <Input
                    id="clientRole"
                    value={formData.clientRole}
                    onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="clientCompany">Company *</Label>
                <Input
                  id="clientCompany"
                  value={formData.clientCompany}
                  onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="rating">Rating *</Label>
                <select
                  id="rating"
                  className="w-full border rounded px-3 py-2"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  required
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>
              <div>
                <Label htmlFor="review">Review *</Label>
                <textarea
                  id="review"
                  className="w-full border rounded px-3 py-2 min-h-[100px]"
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Client Image (Optional)</Label>
                <ImageUpload
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    className="w-full border rounded px-3 py-2"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="featured">Featured Review</Label>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Review"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search reviews..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <select
              className="w-40 border rounded px-3 py-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Reviews Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Reviews</CardTitle>
          <CardDescription>Manage your client testimonials</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Client</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Company</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Rating</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Featured</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReviews.map((review) => (
                    <tr key={review._id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{review.clientName}</p>
                          <p className="text-sm text-gray-600">{review.clientRole}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-900">{review.clientCompany}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          {renderStars(review.rating)}
                          <span className="ml-2 text-sm text-gray-600">({review.rating})</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant={
                          review.status === "published" ? "default" :
                          review.status === "draft" ? "secondary" :
                          "destructive"
                        }>
                          {review.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        {review.featured ? <Star className="w-4 h-4 text-yellow-500" /> : "-"}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => openEditDialog(review)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteReview(review._id)}
                            disabled={isDeleting === review._id}
                          >
                            {isDeleting === review._id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <Dialog open={showEditDialog === review._id} onOpenChange={(open) => !open && setShowEditDialog(null)}>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Edit Review</DialogTitle>
                              <DialogDescription>Update review details</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleUpdateReview} className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="edit-clientName">Client Name *</Label>
                                  <Input
                                    id="edit-clientName"
                                    value={editFormData.clientName}
                                    onChange={(e) => setEditFormData({ ...editFormData, clientName: e.target.value })}
                                    required
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-clientRole">Client Role *</Label>
                                  <Input
                                    id="edit-clientRole"
                                    value={editFormData.clientRole}
                                    onChange={(e) => setEditFormData({ ...editFormData, clientRole: e.target.value })}
                                    required
                                  />
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="edit-clientCompany">Company *</Label>
                                <Input
                                  id="edit-clientCompany"
                                  value={editFormData.clientCompany}
                                  onChange={(e) => setEditFormData({ ...editFormData, clientCompany: e.target.value })}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-rating">Rating *</Label>
                                <select
                                  id="edit-rating"
                                  className="w-full border rounded px-3 py-2"
                                  value={editFormData.rating}
                                  onChange={(e) => setEditFormData({ ...editFormData, rating: parseInt(e.target.value) })}
                                  required
                                >
                                  <option value={5}>5 Stars</option>
                                  <option value={4}>4 Stars</option>
                                  <option value={3}>3 Stars</option>
                                  <option value={2}>2 Stars</option>
                                  <option value={1}>1 Star</option>
                                </select>
                              </div>
                              <div>
                                <Label htmlFor="edit-review">Review *</Label>
                                <textarea
                                  id="edit-review"
                                  className="w-full border rounded px-3 py-2 min-h-[100px]"
                                  value={editFormData.review}
                                  onChange={(e) => setEditFormData({ ...editFormData, review: e.target.value })}
                                  required
                                />
                              </div>
                              <div>
                                <Label>Client Image (Optional)</Label>
                                <ImageUpload
                                  value={editFormData.image}
                                  onChange={(url) => setEditFormData({ ...editFormData, image: url })}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="edit-status">Status</Label>
                                  <select
                                    id="edit-status"
                                    className="w-full border rounded px-3 py-2"
                                    value={editFormData.status}
                                    onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value as any })}
                                  >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="archived">Archived</option>
                                  </select>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id="edit-featured"
                                    checked={editFormData.featured}
                                    onChange={(e) => setEditFormData({ ...editFormData, featured: e.target.checked })}
                                    className="rounded border-gray-300"
                                  />
                                  <Label htmlFor="edit-featured">Featured Review</Label>
                                </div>
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button type="button" variant="outline" onClick={() => setShowEditDialog(null)}>
                                  Cancel
                                </Button>
                                <Button type="submit" disabled={isUpdating}>
                                  {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update Review"}
                                </Button>
                              </div>
                            </form>
                          </DialogContent>
                        </Dialog>
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
  )
}

export default function ReviewsPage() {
  return (
    <ReviewsContent />
  );
} 