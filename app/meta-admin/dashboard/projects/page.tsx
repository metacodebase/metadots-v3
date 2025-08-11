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

interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image?: string;
  featured: boolean;
  metrics: Record<string, string>;
  client: string;
  duration: string;
  team: string;
  rating: number;
  status: "draft" | "published" | "archived";
  color: string;
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  technologies: string[];
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

const categories = [
  "AI/ML",
  "E-commerce",
  "FinTech",
  "Healthcare",
  "IoT",
  "Real Estate",
  "Technology",
  "Other",
];

const technologyCategories = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "AI/ML",
  "Mobile",
  "Other",
];

function ProjectsContent() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "AI/ML",
    tags: [] as string[],
    image: "",
    featured: false,
    metrics: {},
    client: "",
    duration: "",
    team: "",
    rating: 0,
    status: "draft" as "draft" | "published" | "archived",
    color: "from-blue-500 to-indigo-600",
    liveUrl: "",
    githubUrl: "",
    caseStudyUrl: "",
    technologies: [] as string[],
  });

  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    category: "AI/ML",
    tags: [] as string[],
    image: "",
    featured: false,
    metrics: {},
    client: "",
    duration: "",
    team: "",
    rating: 0,
    status: "draft" as "draft" | "published" | "archived",
    color: "from-blue-500 to-indigo-600",
    liveUrl: "",
    githubUrl: "",
    caseStudyUrl: "",
    technologies: [] as string[],
  });

  // Technology management functions
  const addTechnology = (isEdit: boolean = false) => {
    if (isEdit) {
      setEditFormData({
        ...editFormData,
        technologies: [...editFormData.technologies, ""],
      });
    } else {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, ""],
      });
    }
  };

  const removeTechnology = (index: number, isEdit: boolean = false) => {
    if (isEdit) {
      setEditFormData({
        ...editFormData,
        technologies: editFormData.technologies.filter((_, i) => i !== index),
      });
    } else {
      setFormData({
        ...formData,
        technologies: formData.technologies.filter((_, i) => i !== index),
      });
    }
  };

  const updateTechnology = (
    index: number,
    value: string,
    isEdit: boolean = false
  ) => {
    if (isEdit) {
      const updatedTechs = [...editFormData.technologies];
      updatedTechs[index] = value;
      setEditFormData({
        ...editFormData,
        technologies: updatedTechs,
      });
    } else {
      const updatedTechs = [...formData.technologies];
      updatedTechs[index] = value;
      setFormData({
        ...formData,
        technologies: updatedTechs,
      });
    }
  };

  // Fetch projects
  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      setError("");
      const token = localStorage.getItem("admin_token");
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (categoryFilter !== "all") params.append("category", categoryFilter);
      const response = await fetch(`/api/admin/projects?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch projects");
      }
      setProjects(data.projects);
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
    // eslint-disable-next-line
  }, [user, searchTerm, categoryFilter]);

  // Create project
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.client ||
      !formData.duration ||
      !formData.team
    ) {
      setError("Please fill in all required fields");
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      setIsCreating(true);
      setError("");
      const token = localStorage.getItem("admin_token");

      console.log("Sending project data:", formData);
      console.log("Technologies being sent:", formData.technologies);

      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create project");
      }
      setShowCreateDialog(false);
      setFormData({
        title: "",
        description: "",
        category: "AI/ML",
        tags: [],
        image: "",
        featured: false,
        metrics: {},
        client: "",
        duration: "",
        team: "",
        rating: 0,
        status: "draft",
        color: "from-blue-500 to-indigo-600",
        liveUrl: "",
        githubUrl: "",
        caseStudyUrl: "",
        technologies: [],
      });
      fetchProjects();
      toast.success("Project created successfully");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsCreating(false);
    }
  };

  // Update project
  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !editFormData.title ||
      !editFormData.description ||
      !editFormData.category ||
      !editFormData.client ||
      !editFormData.duration ||
      !editFormData.team
    ) {
      setError("Please fill in all required fields");
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      setIsUpdating(true);
      setError("");
      const token = localStorage.getItem("admin_token");

      console.log("Sending update data:", editFormData);
      console.log(
        "Technologies being sent for update:",
        editFormData.technologies
      );

      const response = await fetch(`/api/admin/projects/${showEditDialog}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editFormData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to update project");
      }
      setShowEditDialog(null);
      fetchProjects();
      toast.success("Project updated successfully");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete project
  const handleDeleteProject = async (projectId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this project? This action cannot be undone."
      )
    ) {
      return;
    }
    try {
      setIsDeleting(projectId);
      setError("");
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to delete project");
      }
      fetchProjects();
      toast.success("Project deleted successfully");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsDeleting(null);
    }
  };

  // Open edit dialog
  const openEditDialog = (project: Project) => {
    console.log("Opening edit dialog for project:", project);
    console.log("Project technologies:", project.technologies);
    setEditFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      tags: project.tags || [],
      image: project.image || "",
      featured: project.featured,
      metrics: project.metrics || {},
      client: project.client,
      duration: project.duration,
      team: project.team,
      rating: project.rating,
      status: project.status,
      color: project.color,
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      caseStudyUrl: project.caseStudyUrl || "",
      technologies: project.technologies || [],
    });
    setShowEditDialog(project._id);
  };

  // Filtered projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="h-full bg-white rounded-lg md:overflow-auto">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">Projects</h1>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 py-4 px-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-auto">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </DialogTrigger>

            <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#f6f8fa] p-8 rounded-lg shadow-xl text-black break-words">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  Create New Project
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Add a new project to your portfolio
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={handleCreateProject}
                className="space-y-6 !w-full">
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
                    placeholder="Enter project title"
                    required
                    className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="block text-sm font-semibold text-gray-700">
                    Description *
                  </Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Brief description of the project"
                    required
                    className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                      htmlFor="client"
                      className="block text-sm font-semibold text-gray-700">
                      Client *
                    </Label>
                    <Input
                      id="client"
                      value={formData.client}
                      onChange={(e) =>
                        setFormData({ ...formData, client: e.target.value })
                      }
                      placeholder="Client name"
                      required
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="duration"
                      className="block text-sm font-semibold text-gray-700">
                      Duration *
                    </Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                      placeholder="e.g., 3 months"
                      required
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="team"
                      className="block text-sm font-semibold text-gray-700">
                      Team *
                    </Label>
                    <Input
                      id="team"
                      value={formData.team}
                      onChange={(e) =>
                        setFormData({ ...formData, team: e.target.value })
                      }
                      placeholder="Team size or members"
                      required
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full"
                    />
                  </div>
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

                <div className="space-y-2">
                  <Label className="block text-sm font-semibold text-gray-700">
                    Project Image
                  </Label>
                  <ImageUpload
                    value={formData.image}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                    className="mt-2 !w-full p-4 border rounded-md bg-white border-blue-500"
                  />
                </div>

                {/* Technologies Section */}
                <div className="space-y-2">
                  <Label className="block text-sm font-semibold text-gray-700">
                    Technologies
                  </Label>
                  <div className="space-y-3">
                    {(formData.technologies || []).map((tech, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <Input
                          placeholder="Technology name"
                          value={tech}
                          onChange={(e) =>
                            updateTechnology(index, e.target.value)
                          }
                          className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                        />
                        <Button
                          type="button"
                          className="!w-auto px-4 text-red-800  bg-transparent hover:bg-transparent"
                          onClick={() => removeTechnology(index)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={() => addTechnology()}
                      className="bg-transparent text-black hover:bg-black hover:text-white border border-black !w-auto">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Technology
                    </Button>
                  </div>
                </div>

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
                    Featured Project
                  </Label>
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
                      "Create Project"
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
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>
              </div>
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

        {/* Projects Table */}
        <Card className="bg-[#f6f8fa] text-black border-none">
          <CardHeader>
            <CardTitle>All Projects</CardTitle>
            <CardDescription>Manage your portfolio projects</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No projects found
                </h3>
                <p className="text-gray-600 mb-4">
                  Get started by creating your first project.
                </p>
                <Button
                  onClick={() => setShowCreateDialog(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Project
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="hover:bg-blue-50">
                    <tr className="border-b border-gray-300 hover:bg-blue-100 bg-blue-50">
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Project
                      </th>
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Client
                      </th>
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Category
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
                    {filteredProjects.map((project, index) => (
                      <tr
                        key={project._id}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        }`}>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900 truncate w-20">
                              {project.title}
                            </p>
                            <p className="text-sm text-gray-600 line-clamp-2 truncate w-20">
                              {project.description}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-gray-900">
                            {project.client}
                          </div>
                          <div className="text-xs text-gray-500">
                            {project.duration}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className="text-black">
                            {project.category}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            variant={
                              project.status === "published"
                                ? "default"
                                : project.status === "draft"
                                ? "secondary"
                                : "destructive"
                            }>
                            {project.status.charAt(0).toUpperCase() +
                              project.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          {project.featured ? (
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <Dialog
                              open={showEditDialog === project._id}
                              onOpenChange={(open) =>
                                !open && setShowEditDialog(null)
                              }>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  className="!w-auto px-4 text-blue-700  bg-transparent hover:bg-transparent"
                                  onClick={() => openEditDialog(project)}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#f6f8fa] p-8 rounded-lg shadow-xl text-black">
                                <DialogHeader>
                                  <DialogTitle className="text-xl font-semibold">
                                    Edit Project
                                  </DialogTitle>
                                  <DialogDescription className="text-gray-600">
                                    Update project details
                                  </DialogDescription>
                                </DialogHeader>
                                <form
                                  onSubmit={handleUpdateProject}
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
                                      htmlFor="edit-description"
                                      className="block text-sm font-semibold text-gray-700">
                                      Description *
                                    </Label>
                                    <Input
                                      id="edit-description"
                                      value={editFormData.description}
                                      onChange={(e) =>
                                        setEditFormData({
                                          ...editFormData,
                                          description: e.target.value,
                                        })
                                      }
                                      required
                                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                                    />
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor="edit-client"
                                        className="block text-sm font-semibold text-gray-700">
                                        Client *
                                      </Label>
                                      <Input
                                        id="edit-client"
                                        value={editFormData.client}
                                        onChange={(e) =>
                                          setEditFormData({
                                            ...editFormData,
                                            client: e.target.value,
                                          })
                                        }
                                        required
                                        className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor="edit-duration"
                                        className="block text-sm font-semibold text-gray-700">
                                        Duration *
                                      </Label>
                                      <Input
                                        id="edit-duration"
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
                                  </div>

                                  <div className="space-y-2">
                                    <Label
                                      htmlFor="edit-team"
                                      className="block text-sm font-semibold text-gray-700">
                                      Team *
                                    </Label>
                                    <Input
                                      id="edit-team"
                                      value={editFormData.team}
                                      onChange={(e) =>
                                        setEditFormData({
                                          ...editFormData,
                                          team: e.target.value,
                                        })
                                      }
                                      required
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

                                  <div className="space-y-2">
                                    <Label className="block text-sm font-semibold text-gray-700">
                                      Project Image
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

                                  {/* Technologies Section */}
                                  <div className="space-y-2">
                                    <Label className="block text-sm font-semibold text-gray-700">
                                      Technologies
                                    </Label>
                                    <div className="space-y-3">
                                      {(editFormData.technologies || []).map(
                                        (tech, index) => (
                                          <div
                                            key={index}
                                            className="flex gap-2 items-center">
                                            <Input
                                              placeholder="Technology name"
                                              value={tech}
                                              onChange={(e) =>
                                                updateTechnology(
                                                  index,
                                                  e.target.value,
                                                  true
                                                )
                                              }
                                              className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                                            />
                                            <Button
                                              type="button"
                                              className="!w-auto px-4 text-red-800  bg-transparent hover:bg-transparent"
                                              onClick={() =>
                                                removeTechnology(index, true)
                                              }>
                                              <Trash2 className="w-4 h-4" />
                                            </Button>
                                          </div>
                                        )
                                      )}
                                      <Button
                                        type="button"
                                        onClick={() => addTechnology(true)}
                                        className="bg-transparent text-black hover:bg-black hover:text-white border border-black !w-auto">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Technology
                                      </Button>
                                    </div>
                                  </div>

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
                                      Featured Project
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
                                        "Update Project"
                                      )}
                                    </Button>
                                  </div>
                                </form>
                              </DialogContent>
                            </Dialog>
                            <Button
                              size="sm"
                              className="!w-auto px-4 text-red-800  bg-transparent hover:bg-transparent"
                              onClick={() => handleDeleteProject(project._id)}
                              disabled={isDeleting === project._id}>
                              {isDeleting === project._id ? (
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

export default function ProjectsPage() {
  return <ProjectsContent />;
}
