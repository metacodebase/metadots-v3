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
  "Other"
];

const technologyCategories = [
  "Frontend",
  "Backend", 
  "Database",
  "DevOps",
  "AI/ML",
  "Mobile",
  "Other"
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
    technologies: [] as string[]
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
    technologies: [] as string[]
  });

  // Technology management functions
  const addTechnology = (isEdit: boolean = false) => {
    if (isEdit) {
      setEditFormData({
        ...editFormData,
        technologies: [...editFormData.technologies, ""]
      });
    } else {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, ""]
      });
    }
  };

  const removeTechnology = (index: number, isEdit: boolean = false) => {
    if (isEdit) {
      setEditFormData({
        ...editFormData,
        technologies: editFormData.technologies.filter((_, i) => i !== index)
      });
    } else {
      setFormData({
        ...formData,
        technologies: formData.technologies.filter((_, i) => i !== index)
      });
    }
  };

  const updateTechnology = (index: number, value: string, isEdit: boolean = false) => {
    if (isEdit) {
      const updatedTechs = [...editFormData.technologies];
      updatedTechs[index] = value;
      setEditFormData({
        ...editFormData,
        technologies: updatedTechs
      });
    } else {
      const updatedTechs = [...formData.technologies];
      updatedTechs[index] = value;
      setFormData({
        ...formData,
        technologies: updatedTechs
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
          Authorization: `Bearer ${token}`
        }
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
    if (!formData.title || !formData.description || !formData.category || !formData.client || !formData.duration || !formData.team) {
      setError("Please fill in all required fields");
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      setIsCreating(true);
      setError("");
      const token = localStorage.getItem("admin_token");
      
      console.log('Sending project data:', formData);
      console.log('Technologies being sent:', formData.technologies);
      
      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
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
        technologies: []
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
    if (!editFormData.title || !editFormData.description || !editFormData.category || !editFormData.client || !editFormData.duration || !editFormData.team) {
      setError("Please fill in all required fields");
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      setIsUpdating(true);
      setError("");
      const token = localStorage.getItem("admin_token");
      
      console.log('Sending update data:', editFormData);
      console.log('Technologies being sent for update:', editFormData.technologies);
      
      const response = await fetch(`/api/admin/projects/${showEditDialog}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editFormData)
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
    if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      return;
    }
    try {
      setIsDeleting(projectId);
      setError("");
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
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
    console.log('Opening edit dialog for project:', project);
    console.log('Project technologies:', project.technologies);
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
      technologies: project.technologies || []
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600">Manage portfolio projects</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>Add a new project to your portfolio</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description *</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  className="w-full border rounded px-3 py-2"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="client">Client *</Label>
                <Input
                  id="client"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration *</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="team">Team *</Label>
                  <Input
                    id="team"
                    value={formData.team}
                    onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="featured">Featured Project</Label>
              </div>
              <div>
                <Label htmlFor="status">Status *</Label>
                <select
                  id="status"
                  className="w-full border rounded px-3 py-2"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as "draft" | "published" | "archived" })}
                  required
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div>
                <Label>Project Image</Label>
                <ImageUpload
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                />
              </div>

              {/* Technologies Section */}
              <div>
                <Label>Technologies</Label>
                <div className="space-y-3">
                  {(formData.technologies || []).map((tech, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Input
                        placeholder="Technology name"
                        value={tech}
                        onChange={(e) => updateTechnology(index, e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeTechnology(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addTechnology()}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Technology
                  </Button>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Project"}
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
                  placeholder="Search projects..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <select
              className="w-40 border rounded px-3 py-2"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
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

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>Manage your portfolio projects</CardDescription>
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
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Project</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Client</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Featured</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                  {filteredProjects.map((project) => (
                    <tr key={project._id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{project.title}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-900">{project.client}</div>
                    </td>
                    <td className="py-4 px-4">
                        <Badge variant="outline">{project.category}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={
                          project.status === "published" ? "default" :
                          project.status === "draft" ? "secondary" :
                        "destructive"
                      }>
                        {project.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                        {project.featured ? <Star className="w-4 h-4 text-yellow-500" /> : "-"}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => openEditDialog(project)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteProject(project._id)}
                            disabled={isDeleting === project._id}
                          >
                            {isDeleting === project._id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                        </Button>
                        </div>
                        <Dialog open={showEditDialog === project._id} onOpenChange={(open) => !open && setShowEditDialog(null)}>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Edit Project</DialogTitle>
                              <DialogDescription>Update project details</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleUpdateProject} className="space-y-4">
                              <div>
                                <Label htmlFor="edit-title">Title *</Label>
                                <Input
                                  id="edit-title"
                                  value={editFormData.title}
                                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-description">Description *</Label>
                                <Input
                                  id="edit-description"
                                  value={editFormData.description}
                                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-category">Category *</Label>
                                <select
                                  id="edit-category"
                                  className="w-full border rounded px-3 py-2"
                                  value={editFormData.category}
                                  onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                                  required
                                >
                                  {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <Label htmlFor="edit-client">Client *</Label>
                                <Input
                                  id="edit-client"
                                  value={editFormData.client}
                                  onChange={(e) => setEditFormData({ ...editFormData, client: e.target.value })}
                                  required
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="edit-duration">Duration *</Label>
                                  <Input
                                    id="edit-duration"
                                    value={editFormData.duration}
                                    onChange={(e) => setEditFormData({ ...editFormData, duration: e.target.value })}
                                    required
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-team">Team *</Label>
                                  <Input
                                    id="edit-team"
                                    value={editFormData.team}
                                    onChange={(e) => setEditFormData({ ...editFormData, team: e.target.value })}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id="edit-featured"
                                  checked={editFormData.featured}
                                  onChange={(e) => setEditFormData({ ...editFormData, featured: e.target.checked })}
                                  className="rounded border-gray-300"
                                />
                                <Label htmlFor="edit-featured">Featured Project</Label>
                              </div>
                              <div>
                                <Label htmlFor="edit-status">Status *</Label>
                                <select
                                  id="edit-status"
                                  className="w-full border rounded px-3 py-2"
                                  value={editFormData.status}
                                  onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value as "draft" | "published" | "archived" })}
                                  required
                                >
                                  <option value="draft">Draft</option>
                                  <option value="published">Published</option>
                                  <option value="archived">Archived</option>
                                </select>
                              </div>
                              <div>
                                <Label>Project Image</Label>
                                <ImageUpload
                                  value={editFormData.image}
                                  onChange={(url) => setEditFormData({ ...editFormData, image: url })}
                                />
                              </div>

                              {/* Technologies Section */}
                              <div>
                                <Label>Technologies</Label>
                                <div className="space-y-3">
                                  {(editFormData.technologies || []).map((tech, index) => (
                                    <div key={index} className="flex gap-2 items-center">
                                      <Input
                                        placeholder="Technology name"
                                        value={tech}
                                        onChange={(e) => updateTechnology(index, e.target.value, true)}
                                      />
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => removeTechnology(index, true)}
                                      >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                                    </div>
                                  ))}
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => addTechnology(true)}
                                    className="w-full"
                                  >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Technology
                                  </Button>
                                </div>
                              </div>

                              <div className="flex justify-end space-x-2">
                                <Button type="button" variant="outline" onClick={() => setShowEditDialog(null)}>
                                  Cancel
                                </Button>
                                <Button type="submit" disabled={isUpdating}>
                                  {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update Project"}
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

export default function ProjectsPage() {
  return (
      <ProjectsContent />
  );
} 