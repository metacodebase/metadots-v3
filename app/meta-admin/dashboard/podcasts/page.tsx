"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Plus, Search, Filter, Star, Trash2, Edit, Play, ExternalLink } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"

interface Podcast {
  _id: string;
  name: string;
  podcastName: string;
  description: string;
  duration: string;
  plays: number;
  date: string;
  link: string;
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

function PodcastsContent() {
  const { user } = useAuth();
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
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
    name: "",
    podcastName: "",
    description: "",
    duration: "",
    plays: 0,
    date: new Date().toISOString().split('T')[0],
    link: "",
    status: "draft" as "draft" | "published" | "archived",
    featured: false
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    podcastName: "",
    description: "",
    duration: "",
    plays: 0,
    date: new Date().toISOString().split('T')[0],
    link: "",
    status: "draft" as "draft" | "published" | "archived",
    featured: false
  });

  // Fetch podcasts
  const fetchPodcasts = async () => {
    try {
      setIsLoading(true);
      setError("");
      const token = localStorage.getItem("admin_token");
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (statusFilter !== "all") params.append("status", statusFilter);
      const response = await fetch(`/api/admin/podcasts?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch podcasts");
      }
      setPodcasts(data.podcasts);
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPodcasts();
    }
  }, [user, searchTerm, statusFilter]);

  // Create podcast
  const handleCreatePodcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.podcastName || !formData.description || !formData.duration || !formData.link) {
      setError("Please fill in all required fields");
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      setIsCreating(true);
      setError("");
      const token = localStorage.getItem("admin_token");
      
      const response = await fetch("/api/admin/podcasts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create podcast");
      }
      setShowCreateDialog(false);
      setFormData({
        name: "",
        podcastName: "",
        description: "",
        duration: "",
        plays: 0,
        date: new Date().toISOString().split('T')[0],
        link: "",
        status: "draft",
        featured: false
      });
      fetchPodcasts();
      toast.success("Podcast created successfully");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsCreating(false);
    }
  };

  // Update podcast
  const handleUpdatePodcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFormData.name || !editFormData.podcastName || !editFormData.description || !editFormData.duration || !editFormData.link) {
      setError("Please fill in all required fields");
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      setIsUpdating(true);
      setError("");
      const token = localStorage.getItem("admin_token");
      
      const response = await fetch(`/api/admin/podcasts/${showEditDialog}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editFormData)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to update podcast");
      }
      setShowEditDialog(null);
      fetchPodcasts();
      toast.success("Podcast updated successfully");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete podcast
  const handleDeletePodcast = async (podcastId: string) => {
    if (!confirm("Are you sure you want to delete this podcast? This action cannot be undone.")) {
      return;
    }
    try {
      setIsDeleting(podcastId);
      setError("");
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/podcasts/${podcastId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to delete podcast");
      }
      fetchPodcasts();
      toast.success("Podcast deleted successfully");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsDeleting(null);
    }
  };

  // Open edit dialog
  const openEditDialog = (podcast: Podcast) => {
    setEditFormData({
      name: podcast.name,
      podcastName: podcast.podcastName,
      description: podcast.description,
      duration: podcast.duration,
      plays: podcast.plays,
      date: new Date(podcast.date).toISOString().split('T')[0],
      link: podcast.link,
      status: podcast.status,
      featured: podcast.featured
    });
    setShowEditDialog(podcast._id);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Filtered podcasts
  const filteredPodcasts = podcasts.filter((podcast) => {
    const matchesSearch =
      podcast.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      podcast.podcastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      podcast.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Podcasts</h1>
          <p className="text-gray-600">Manage podcast episodes and content</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Podcast
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Podcast</DialogTitle>
              <DialogDescription>Add a new podcast episode</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreatePodcast} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Episode Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="podcastName">Podcast Name *</Label>
                  <Input
                    id="podcastName"
                    value={formData.podcastName}
                    onChange={(e) => setFormData({ ...formData, podcastName: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description *</Label>
                <textarea
                  id="description"
                  className="w-full border rounded px-3 py-2 min-h-[100px]"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="duration">Duration *</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 45 min"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="plays">Plays</Label>
                  <Input
                    id="plays"
                    type="number"
                    min="0"
                    value={formData.plays}
                    onChange={(e) => setFormData({ ...formData, plays: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="link">Podcast Link *</Label>
                <Input
                  id="link"
                  type="url"
                  placeholder="https://..."
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  required
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
                  <Label htmlFor="featured">Featured Episode</Label>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Podcast"}
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
                  placeholder="Search podcasts..."
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

      {/* Podcasts Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Podcasts</CardTitle>
          <CardDescription>Manage your podcast episodes</CardDescription>
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
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Episode</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Podcast</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Duration</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Plays</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Featured</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPodcasts.map((podcast) => (
                    <tr key={podcast._id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{podcast.name}</p>
                          <p className="text-sm text-gray-600 line-clamp-2">{podcast.description}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-900">{podcast.podcastName}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-900">{podcast.duration}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-900">{podcast.plays.toLocaleString()}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-900">{formatDate(podcast.date)}</div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant={
                          podcast.status === "published" ? "default" :
                          podcast.status === "draft" ? "secondary" :
                          "destructive"
                        }>
                          {podcast.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        {podcast.featured ? <Star className="w-4 h-4 text-yellow-500" /> : "-"}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => window.open(podcast.link, '_blank')}
                            title="Open podcast link"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => openEditDialog(podcast)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeletePodcast(podcast._id)}
                            disabled={isDeleting === podcast._id}
                          >
                            {isDeleting === podcast._id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <Dialog open={showEditDialog === podcast._id} onOpenChange={(open) => !open && setShowEditDialog(null)}>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Edit Podcast</DialogTitle>
                              <DialogDescription>Update podcast details</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleUpdatePodcast} className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="edit-name">Episode Name *</Label>
                                  <Input
                                    id="edit-name"
                                    value={editFormData.name}
                                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                    required
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-podcastName">Podcast Name *</Label>
                                  <Input
                                    id="edit-podcastName"
                                    value={editFormData.podcastName}
                                    onChange={(e) => setEditFormData({ ...editFormData, podcastName: e.target.value })}
                                    required
                                  />
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="edit-description">Description *</Label>
                                <textarea
                                  id="edit-description"
                                  className="w-full border rounded px-3 py-2 min-h-[100px]"
                                  value={editFormData.description}
                                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                                  required
                                />
                              </div>
                              <div className="grid grid-cols-3 gap-4">
                                <div>
                                  <Label htmlFor="edit-duration">Duration *</Label>
                                  <Input
                                    id="edit-duration"
                                    placeholder="e.g., 45 min"
                                    value={editFormData.duration}
                                    onChange={(e) => setEditFormData({ ...editFormData, duration: e.target.value })}
                                    required
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-plays">Plays</Label>
                                  <Input
                                    id="edit-plays"
                                    type="number"
                                    min="0"
                                    value={editFormData.plays}
                                    onChange={(e) => setEditFormData({ ...editFormData, plays: parseInt(e.target.value) || 0 })}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-date">Date *</Label>
                                  <Input
                                    id="edit-date"
                                    type="date"
                                    value={editFormData.date}
                                    onChange={(e) => setEditFormData({ ...editFormData, date: e.target.value })}
                                    required
                                  />
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="edit-link">Podcast Link *</Label>
                                <Input
                                  id="edit-link"
                                  type="url"
                                  placeholder="https://..."
                                  value={editFormData.link}
                                  onChange={(e) => setEditFormData({ ...editFormData, link: e.target.value })}
                                  required
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
                                  <Label htmlFor="edit-featured">Featured Episode</Label>
                                </div>
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button type="button" variant="outline" onClick={() => setShowEditDialog(null)}>
                                  Cancel
                                </Button>
                                <Button type="submit" disabled={isUpdating}>
                                  {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update Podcast"}
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

export default function PodcastsPage() {
  return (
    <PodcastsContent />
  );
} 