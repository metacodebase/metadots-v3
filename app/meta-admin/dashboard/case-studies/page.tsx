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
  User,
  TrendingUp,
  Download,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface CaseStudy {
  _id: string;
  title: string;
  slug: string;
  subtitle?: string;
  description: string;
  content: string;
  client: string;
  industry: string;
  status: "draft" | "published" | "scheduled" | "archived";
  featured: boolean;
  duration: string;
  team: string;
  budget: string;
  heroImage?: string;
  gallery?: string[];
  results: {
    efficiency?: string;
    dataPoints?: string;
    uptime?: string;
    costReduction?: string;
    timeToInsight?: string;
    userSatisfaction?: string;
  };
  technologies: Array<{
    name: string;
    icon: string;
    category: string;
  }>;
  keyFeatures: string[];
  process: Array<{
    phase: string;
    duration: string;
    description: string;
  }>;
  testimonials: Array<{
    name: string;
    role: string;
    content: string;
    avatar?: string;
  }>;
  challenge: string;
  solution: string;
  author: {
    id: string;
    name: string;
    role: string;
  };
  publishedAt?: string;
  scheduledAt?: string;
  stats: {
    views: number;
    likes: number;
    downloads: number;
    shares: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface CaseStudyStats {
  total: number;
  published: number;
  drafts: number;
  totalViews: number;
  totalDownloads: number;
}

const industries = [
  "Technology",
  "Healthcare",
  "FinTech",
  "E-commerce",
  "Retail",
  "Manufacturing",
  "Education",
  "Real Estate",
  "Smart Cities",
  "IoT",
  "AI/ML",
  "Other",
];

function CaseStudiesContent() {
  const { user } = useAuth();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [stats, setStats] = useState<CaseStudyStats>({
    total: 0,
    published: 0,
    drafts: 0,
    totalViews: 0,
    totalDownloads: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");

  // Dialog states
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    content: "",
    client: "",
    industry: "",
    status: "draft" as "draft" | "published" | "scheduled" | "archived",
    featured: false,
    duration: "",
    team: "",
    budget: "",
    heroImage: "",
    gallery: [] as string[],
    results: {
      efficiency: "",
      dataPoints: "",
      uptime: "",
      costReduction: "",
      timeToInsight: "",
      userSatisfaction: "",
    },
    technologies: [] as Array<{ name: string; icon: string; category: string }>,
    keyFeatures: [] as string[],
    process: [] as Array<{
      phase: string;
      duration: string;
      description: string;
    }>,
    testimonials: [] as Array<{
      name: string;
      role: string;
      content: string;
      avatar?: string;
    }>,
    challenge: "",
    solution: "",
    scheduledAt: "",
  });

  const [editFormData, setEditFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    content: "",
    client: "",
    industry: "",
    status: "draft" as "draft" | "published" | "scheduled" | "archived",
    featured: false,
    duration: "",
    team: "",
    budget: "",
    heroImage: "",
    gallery: [] as string[],
    results: {
      efficiency: "",
      dataPoints: "",
      uptime: "",
      costReduction: "",
      timeToInsight: "",
      userSatisfaction: "",
    },
    technologies: [] as Array<{ name: string; icon: string; category: string }>,
    keyFeatures: [] as string[],
    process: [] as Array<{
      phase: string;
      duration: string;
      description: string;
    }>,
    testimonials: [] as Array<{
      name: string;
      role: string;
      content: string;
      avatar?: string;
    }>,
    challenge: "",
    solution: "",
    scheduledAt: "",
  });

  // Fetch case studies
  const fetchCaseStudies = async () => {
    try {
      setIsLoading(true);
      setError("");
      const token = localStorage.getItem("admin_token");

      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (industryFilter !== "all") params.append("industry", industryFilter);

      const response = await fetch(`/api/admin/case-studies?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch case studies");
      }

      setCaseStudies(data.caseStudies);
      setStats(data.stats);
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCaseStudies();
    }
  }, [user, searchTerm, statusFilter, industryFilter]);

  // Create case study
  const handleCreateCaseStudy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.description ||
      !formData.content ||
      !formData.client ||
      !formData.industry ||
      !formData.duration ||
      !formData.team ||
      !formData.budget ||
      !formData.challenge ||
      !formData.solution
    ) {
      setError(
        "Title, description, content, client, industry, duration, team, budget, challenge, and solution are required"
      );
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsCreating(true);
      setError("");
      const token = localStorage.getItem("admin_token");

      const response = await fetch("/api/admin/case-studies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          scheduledAt: formData.scheduledAt || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create case study");
      }

      setShowCreateDialog(false);
      setFormData({
        title: "",
        subtitle: "",
        description: "",
        content: "",
        client: "",
        industry: "",
        status: "draft",
        featured: false,
        duration: "",
        team: "",
        budget: "",
        heroImage: "",
        gallery: [],
        results: {
          efficiency: "",
          dataPoints: "",
          uptime: "",
          costReduction: "",
          timeToInsight: "",
          userSatisfaction: "",
        },
        technologies: [],
        keyFeatures: [],
        process: [],
        testimonials: [],
        challenge: "",
        solution: "",
        scheduledAt: "",
      });
      fetchCaseStudies();
      toast.success("Case study created successfully");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsCreating(false);
    }
  };

  // Update case study
  const handleUpdateCaseStudy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !editFormData.title ||
      !editFormData.description ||
      !editFormData.content ||
      !editFormData.client ||
      !editFormData.industry ||
      !editFormData.duration ||
      !editFormData.team ||
      !editFormData.budget ||
      !editFormData.challenge ||
      !editFormData.solution
    ) {
      setError(
        "Title, description, content, client, industry, duration, team, budget, challenge, and solution are required"
      );
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsUpdating(true);
      setError("");
      const token = localStorage.getItem("admin_token");

      const response = await fetch(
        `/api/admin/case-studies/${showEditDialog}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...editFormData,
            scheduledAt: editFormData.scheduledAt || undefined,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update case study");
      }

      setShowEditDialog(null);
      fetchCaseStudies();
      toast.success("Case study updated successfully");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete case study
  const handleDeleteCaseStudy = async (caseStudyId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this case study? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      setIsDeleting(caseStudyId);
      setError("");
      const token = localStorage.getItem("admin_token");

      const response = await fetch(`/api/admin/case-studies/${caseStudyId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete case study");
      }

      fetchCaseStudies();
      toast.success("Case study deleted successfully");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsDeleting(null);
    }
  };

  // Open edit dialog
  const openEditDialog = async (caseStudy: CaseStudy) => {
    setEditFormData({
      title: caseStudy.title,
      subtitle: caseStudy.subtitle || "",
      description: caseStudy.description,
      content: caseStudy.content,
      client: caseStudy.client,
      industry: caseStudy.industry,
      status: caseStudy.status,
      featured: caseStudy.featured,
      duration: caseStudy.duration,
      team: caseStudy.team,
      budget: caseStudy.budget,
      heroImage: caseStudy.heroImage || "",
      gallery: caseStudy.gallery || [],
      results: {
        efficiency: caseStudy.results?.efficiency || "",
        dataPoints: caseStudy.results?.dataPoints || "",
        uptime: caseStudy.results?.uptime || "",
        costReduction: caseStudy.results?.costReduction || "",
        timeToInsight: caseStudy.results?.timeToInsight || "",
        userSatisfaction: caseStudy.results?.userSatisfaction || "",
      },
      technologies: caseStudy.technologies,
      keyFeatures: caseStudy.keyFeatures,
      process: caseStudy.process,
      testimonials: caseStudy.testimonials,
      challenge: caseStudy.challenge,
      solution: caseStudy.solution,
      scheduledAt: caseStudy.scheduledAt
        ? new Date(caseStudy.scheduledAt).toISOString().slice(0, 16)
        : "",
    });
    setShowEditDialog(caseStudy._id);
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

  // Filter case studies
  const filteredCaseStudies = caseStudies.filter((study) => {
    const matchesSearch =
      study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.client.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="h-full bg-white rounded-lg md:overflow-auto">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">
              Case Studies
            </h1>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 py-4 px-4 md:px-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-auto">
                <Plus className="h-4 w-4 mr-2" />
                New Case Study
              </Button>
            </DialogTrigger>

            <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#f6f8fa] p-8 rounded-lg shadow-xl text-black break-words">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  Create New Case Study
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Create a new case study with comprehensive details and media
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={handleCreateCaseStudy}
                className="space-y-6 !w-full">
                <div className="grid md:grid-cols-2 gap-4">
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
                      placeholder="Enter case study title"
                      required
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full"
                    />
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
                      placeholder="Enter client name"
                      required
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="industry"
                      className="block text-sm font-semibold text-gray-700">
                      Industry *
                    </Label>
                    <Select
                      value={formData.industry}
                      onValueChange={(value) =>
                        setFormData({ ...formData, industry: value })
                      }>
                      <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent className="!bg-white">
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
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
                      placeholder="e.g., 6 months"
                      required
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="budget"
                      className="block text-sm font-semibold text-gray-700">
                      Budget *
                    </Label>
                    <Input
                      id="budget"
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                      placeholder="e.g., $250K"
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
                    placeholder="Brief description of the case study"
                    rows={3}
                    required
                    className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="block text-sm font-semibold text-gray-700">
                    Hero Image
                  </Label>
                  <ImageUpload
                    value={formData.heroImage}
                    onChange={(url) =>
                      setFormData({ ...formData, heroImage: url })
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
                    placeholder="Write your case study content here..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="challenge"
                      className="block text-sm font-semibold text-gray-700">
                      Challenge *
                    </Label>
                    <Textarea
                      id="challenge"
                      value={formData.challenge}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          challenge: e.target.value,
                        })
                      }
                      placeholder="Describe the challenge faced"
                      rows={3}
                      required
                      className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="solution"
                      className="block text-sm font-semibold text-gray-700">
                      Solution *
                    </Label>
                    <Textarea
                      id="solution"
                      value={formData.solution}
                      onChange={(e) =>
                        setFormData({ ...formData, solution: e.target.value })
                      }
                      placeholder="Describe the solution provided"
                      rows={3}
                      required
                      className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
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
                      <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300">
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
                  <div className="space-y-2">
                    <Label
                      htmlFor="team"
                      className="block text-sm font-semibold text-gray-700">
                      Team Size *
                    </Label>
                    <Input
                      id="team"
                      value={formData.team}
                      onChange={(e) =>
                        setFormData({ ...formData, team: e.target.value })
                      }
                      placeholder="e.g., 8 developers"
                      required
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full"
                    />
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
                    Featured Case Study
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
                      "Create Case Study"
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
                    Total Case Studies
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

          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-[#f6f8fa] border-none text-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Downloads
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalDownloads.toLocaleString()}
                  </p>
                </div>
                <Download className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="bg-[#f6f8fa] text-black border-none mb-6">
          <CardContent className="p-3 md:p-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1 w-full">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search case studies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px] h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300">
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
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger className="w-full md:w-[180px] h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300">
                  <SelectValue placeholder="Filter by industry" />
                </SelectTrigger>
                <SelectContent className="!bg-white">
                  <SelectItem value="all">All Industries</SelectItem>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
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

        {/* Case Studies Table */}
        <Card className="bg-[#f6f8fa] text-black border-none">
          <CardHeader>
            <CardTitle>All Case Studies</CardTitle>
            <CardDescription>
              Manage your client success stories and case studies
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : caseStudies.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No case studies found
                </h3>
                <p className="text-gray-600 mb-4">
                  Get started by creating your first case study.
                </p>
                <Button
                  onClick={() => setShowCreateDialog(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Case Study
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="hover:bg-blue-50">
                    <tr className="border-b border-gray-300 hover:bg-blue-100 bg-blue-50">
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Case Study
                      </th>
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Client
                      </th>
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Industry
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
                    {filteredCaseStudies.map((study, index) => (
                      <tr
                        key={study._id}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        }`}>
                        <td className="py-4 px-4">
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="font-medium text-gray-900 truncate w-20">
                                {study.title}
                              </p>
                              {study.featured && (
                                <Badge variant="secondary">Featured</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2 truncate w-20">
                              {study.description}
                            </p>
                            <div className="flex items-center space-x-4 mt-1">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-500">
                                  {study.duration}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <User className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-500">
                                  {study.team}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-gray-900">
                            {study.client}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className="text-black">
                            {study.industry}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(study.status)}
                            <Badge
                              variant={
                                study.status === "published"
                                  ? "default"
                                  : study.status === "draft"
                                  ? "secondary"
                                  : study.status === "scheduled"
                                  ? "outline"
                                  : "destructive"
                              }>
                              {study.status.charAt(0).toUpperCase() +
                                study.status.slice(1)}
                            </Badge>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {study.publishedAt
                            ? new Date(study.publishedAt).toLocaleDateString(
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
                            {study.stats.views.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {study.stats.downloads.toLocaleString()} downloads
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            {study.status === "published" && (
                              <Button
                                size="sm"
                                asChild
                                className="!w-auto px-4 text-blue-700  bg-transparent hover:bg-transparent">
                                <a
                                  href={`/case-studies/${study.slug}`}
                                  target="_blank"
                                  rel="noopener noreferrer">
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </Button>
                            )}
                            <Dialog
                              open={showEditDialog === study._id}
                              onOpenChange={(open) =>
                                !open && setShowEditDialog(null)
                              }>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  className="!w-auto px-4 text-blue-700  bg-transparent hover:bg-transparent"
                                  onClick={() => openEditDialog(study)}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#f6f8fa] p-8 rounded-lg shadow-xl text-black">
                                <DialogHeader>
                                  <DialogTitle className="text-xl font-semibold">
                                    Edit Case Study
                                  </DialogTitle>
                                  <DialogDescription className="text-gray-600">
                                    Update case study content and settings
                                  </DialogDescription>
                                </DialogHeader>
                                <form
                                  onSubmit={handleUpdateCaseStudy}
                                  className="space-y-6">
                                  <div className="grid md:grid-cols-2 gap-4">
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
                                  </div>

                                  <div className="grid md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor="edit-industry"
                                        className="block text-sm font-semibold text-gray-700">
                                        Industry *
                                      </Label>
                                      <Select
                                        value={editFormData.industry}
                                        onValueChange={(value) =>
                                          setEditFormData({
                                            ...editFormData,
                                            industry: value,
                                          })
                                        }>
                                        <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="!bg-white">
                                          {industries.map((industry) => (
                                            <SelectItem
                                              key={industry}
                                              value={industry}>
                                              {industry}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
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
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor="edit-budget"
                                        className="block text-sm font-semibold text-gray-700">
                                        Budget *
                                      </Label>
                                      <Input
                                        id="edit-budget"
                                        value={editFormData.budget}
                                        onChange={(e) =>
                                          setEditFormData({
                                            ...editFormData,
                                            budget: e.target.value,
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

                                  <div className="space-y-2">
                                    <Label className="block text-sm font-semibold text-gray-700">
                                      Hero Image
                                    </Label>
                                    <ImageUpload
                                      value={editFormData.heroImage}
                                      onChange={(url) =>
                                        setEditFormData({
                                          ...editFormData,
                                          heroImage: url,
                                        })
                                      }
                                      className="mt-2 !w-full p-4 border rounded-md bg-white border-blue-500"
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
                                      placeholder="Write your case study content here..."
                                    />
                                  </div>

                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor="edit-challenge"
                                        className="block text-sm font-semibold text-gray-700">
                                        Challenge *
                                      </Label>
                                      <Textarea
                                        id="edit-challenge"
                                        value={editFormData.challenge}
                                        onChange={(e) =>
                                          setEditFormData({
                                            ...editFormData,
                                            challenge: e.target.value,
                                          })
                                        }
                                        rows={3}
                                        required
                                        className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor="edit-solution"
                                        className="block text-sm font-semibold text-gray-700">
                                        Solution *
                                      </Label>
                                      <Textarea
                                        id="edit-solution"
                                        value={editFormData.solution}
                                        onChange={(e) =>
                                          setEditFormData({
                                            ...editFormData,
                                            solution: e.target.value,
                                          })
                                        }
                                        rows={3}
                                        required
                                        className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                                      />
                                    </div>
                                  </div>

                                  <div className="grid md:grid-cols-2 gap-4">
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
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor="edit-team"
                                        className="block text-sm font-semibold text-gray-700">
                                        Team Size *
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
                                      className="rounded border-gray-300"
                                    />
                                    <Label
                                      htmlFor="edit-featured"
                                      className="text-sm text-gray-700">
                                      Featured Case Study
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
                                        "Update Case Study"
                                      )}
                                    </Button>
                                  </div>
                                </form>
                              </DialogContent>
                            </Dialog>
                            <Button
                              size="sm"
                              className="!w-auto px-4 text-red-800  bg-transparent hover:bg-transparent"
                              onClick={() => handleDeleteCaseStudy(study._id)}
                              disabled={isDeleting === study._id}>
                              {isDeleting === study._id ? (
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

export default function CaseStudiesPage() {
  return <CaseStudiesContent />;
}
