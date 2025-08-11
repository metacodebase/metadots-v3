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
  Play,
  ExternalLink,
  FileText,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

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
    date: new Date().toISOString().split("T")[0],
    link: "",
    status: "draft" as "draft" | "published" | "archived",
    featured: false,
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    podcastName: "",
    description: "",
    duration: "",
    plays: 0,
    date: new Date().toISOString().split("T")[0],
    link: "",
    status: "draft" as "draft" | "published" | "archived",
    featured: false,
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
          Authorization: `Bearer ${token}`,
        },
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
    if (
      !formData.name ||
      !formData.podcastName ||
      !formData.description ||
      !formData.duration ||
      !formData.link
    ) {
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
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
        date: new Date().toISOString().split("T")[0],
        link: "",
        status: "draft",
        featured: false,
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
    if (
      !editFormData.name ||
      !editFormData.podcastName ||
      !editFormData.description ||
      !editFormData.duration ||
      !editFormData.link
    ) {
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editFormData),
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
    if (
      !confirm(
        "Are you sure you want to delete this podcast? This action cannot be undone."
      )
    ) {
      return;
    }
    try {
      setIsDeleting(podcastId);
      setError("");
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/podcasts/${podcastId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
      date: new Date(podcast.date).toISOString().split("T")[0],
      link: podcast.link,
      status: podcast.status,
      featured: podcast.featured,
    });
    setShowEditDialog(podcast._id);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
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
    <div className="h-full bg-white rounded-lg md:overflow-auto">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">Podcasts</h1>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 py-4 px-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-auto">
                <Plus className="h-4 w-4 mr-2" />
                New Podcast
              </Button>
            </DialogTrigger>

            <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#f6f8fa] p-8 rounded-lg shadow-xl text-black break-words">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  Create New Podcast
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Add a new podcast episode
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={handleCreatePodcast}
                className="space-y-6 !w-full">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700">
                      Episode Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter episode name"
                      required
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="podcastName"
                      className="block text-sm font-semibold text-gray-700">
                      Podcast Name *
                    </Label>
                    <Input
                      id="podcastName"
                      value={formData.podcastName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          podcastName: e.target.value,
                        })
                      }
                      placeholder="Enter podcast name"
                      required
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="block text-sm font-semibold text-gray-700">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Brief description of the podcast episode"
                    rows={3}
                    required
                    className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="duration"
                      className="block text-sm font-semibold text-gray-700">
                      Duration *
                    </Label>
                    <Input
                      id="duration"
                      placeholder="e.g., 45 min"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                      required
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="plays"
                      className="block text-sm font-semibold text-gray-700">
                      Plays
                    </Label>
                    <Input
                      id="plays"
                      type="number"
                      min="0"
                      value={formData.plays}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          plays: parseInt(e.target.value) || 0,
                        })
                      }
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="date"
                      className="block text-sm font-semibold text-gray-700">
                      Date *
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      required
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="link"
                    className="block text-sm font-semibold text-gray-700">
                    Podcast Link *
                  </Label>
                  <Input
                    id="link"
                    type="url"
                    placeholder="https://..."
                    value={formData.link}
                    onChange={(e) =>
                      setFormData({ ...formData, link: e.target.value })
                    }
                    required
                    className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full"
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
                      Featured Episode
                    </Label>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    onClick={() => setShowCreateDialog(false)}
                    className="bg-transparent text-black hover:bg-black hover:text-white border border-black !w-auto">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isCreating}
                    className="bg-blue-700 text-white hover:bg-blue-800 !w-auto px-4">
                    {isCreating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Create Podcast"
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
                    placeholder="Search podcasts..."
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

        {/* Podcasts Table */}
        <Card className="bg-[#f6f8fa] text-black border-none">
          <CardHeader>
            <CardTitle>All Podcasts</CardTitle>
            <CardDescription>Manage your podcast episodes</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : podcasts.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No podcasts found
                </h3>
                <p className="text-gray-600 mb-4">
                  Get started by creating your first podcast episode.
                </p>
                <Button
                  onClick={() => setShowCreateDialog(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Podcast
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="hover:bg-blue-50">
                    <tr className="border-b border-gray-300 hover:bg-blue-100 bg-blue-50">
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Episode
                      </th>
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Podcast
                      </th>
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Duration
                      </th>
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Plays
                      </th>
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Date
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
                    {filteredPodcasts.map((podcast, index) => (
                      <tr
                        key={podcast._id}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        }`}>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900 truncate w-20">
                              {podcast.name}
                            </p>
                            <p className="text-sm text-gray-600 line-clamp-2 truncate w-20">
                              {podcast.description}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-gray-900">
                            {podcast.podcastName}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-gray-900">
                            {podcast.duration}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-gray-900">
                            {podcast.plays.toLocaleString()}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-gray-900">
                            {formatDate(podcast.date)}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            variant={
                              podcast.status === "published"
                                ? "default"
                                : podcast.status === "draft"
                                ? "secondary"
                                : "destructive"
                            }>
                            {podcast.status.charAt(0).toUpperCase() +
                              podcast.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          {podcast.featured ? (
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              className="!w-auto px-4 text-blue-700  bg-transparent hover:bg-transparent"
                              onClick={() =>
                                window.open(podcast.link, "_blank")
                              }
                              title="Open podcast link">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                            <Dialog
                              open={showEditDialog === podcast._id}
                              onOpenChange={(open) =>
                                !open && setShowEditDialog(null)
                              }>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  className="!w-auto px-4 text-blue-700  bg-transparent hover:bg-transparent"
                                  onClick={() => openEditDialog(podcast)}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#f6f8fa] p-8 rounded-lg shadow-xl text-black">
                                <DialogHeader>
                                  <DialogTitle className="text-xl font-semibold">
                                    Edit Podcast
                                  </DialogTitle>
                                  <DialogDescription className="text-gray-600">
                                    Update podcast details
                                  </DialogDescription>
                                </DialogHeader>
                                <form
                                  onSubmit={handleUpdatePodcast}
                                  className="space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor="edit-name"
                                        className="block text-sm font-semibold text-gray-700">
                                        Episode Name *
                                      </Label>
                                      <Input
                                        id="edit-name"
                                        value={editFormData.name}
                                        onChange={(e) =>
                                          setEditFormData({
                                            ...editFormData,
                                            name: e.target.value,
                                          })
                                        }
                                        required
                                        className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor="edit-podcastName"
                                        className="block text-sm font-semibold text-gray-700">
                                        Podcast Name *
                                      </Label>
                                      <Input
                                        id="edit-podcastName"
                                        value={editFormData.podcastName}
                                        onChange={(e) =>
                                          setEditFormData({
                                            ...editFormData,
                                            podcastName: e.target.value,
                                          })
                                        }
                                        required
                                        className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                                      />
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <Label
                                      htmlFor="edit-description"
                                      className="block text-sm font-semibold text-gray-700">
                                      Description *
                                    </Label>
                                    <Textarea
                                      id="edit-description"
                                      value={editFormData.description}
                                      onChange={(e) =>
                                        setEditFormData({
                                          ...editFormData,
                                          description: e.target.value,
                                        })
                                      }
                                      rows={3}
                                      required
                                      className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                                    />
                                  </div>

                                  <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor="edit-duration"
                                        className="block text-sm font-semibold text-gray-700">
                                        Duration *
                                      </Label>
                                      <Input
                                        id="edit-duration"
                                        placeholder="e.g., 45 min"
                                        value={editFormData.duration}
                                        onChange={(e) =>
                                          setEditFormData({
                                            ...editFormData,
                                            duration: e.target.value,
                                          })
                                        }
                                        required
                                        className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor="edit-plays"
                                        className="block text-sm font-semibold text-gray-700">
                                        Plays
                                      </Label>
                                      <Input
                                        id="edit-plays"
                                        type="number"
                                        min="0"
                                        value={editFormData.plays}
                                        onChange={(e) =>
                                          setEditFormData({
                                            ...editFormData,
                                            plays:
                                              parseInt(e.target.value) || 0,
                                          })
                                        }
                                        className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor="edit-date"
                                        className="block text-sm font-semibold text-gray-700">
                                        Date *
                                      </Label>
                                      <Input
                                        id="edit-date"
                                        type="date"
                                        value={editFormData.date}
                                        onChange={(e) =>
                                          setEditFormData({
                                            ...editFormData,
                                            date: e.target.value,
                                          })
                                        }
                                        required
                                        className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                                      />
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <Label
                                      htmlFor="edit-link"
                                      className="block text-sm font-semibold text-gray-700">
                                      Podcast Link *
                                    </Label>
                                    <Input
                                      id="edit-link"
                                      type="url"
                                      placeholder="https://..."
                                      value={editFormData.link}
                                      onChange={(e) =>
                                        setEditFormData({
                                          ...editFormData,
                                          link: e.target.value,
                                        })
                                      }
                                      required
                                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
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
                                        Featured Episode
                                      </Label>
                                    </div>
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
                                        "Update Podcast"
                                      )}
                                    </Button>
                                  </div>
                                </form>
                              </DialogContent>
                            </Dialog>
                            <Button
                              size="sm"
                              className="!w-auto px-4 text-red-800  bg-transparent hover:bg-transparent"
                              onClick={() => handleDeletePodcast(podcast._id)}
                              disabled={isDeleting === podcast._id}>
                              {isDeleting === podcast._id ? (
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

export default function PodcastsPage() {
  return <PodcastsContent />;
}
