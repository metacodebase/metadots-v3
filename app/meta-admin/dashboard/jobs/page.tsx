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
import { Switch } from "@/components/ui/switch";
import {
  Loader2,
  Briefcase,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Users,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  FileText,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Job {
  _id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship" | "Freelance";
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  tags: string[];
  icon: string;
  color: string;
  featured: boolean;
  status: "draft" | "published" | "archived" | "closed";
  responsibilities?: string[];
  qualifications?: string[];
  skills?: string[];
  company: {
    name: string;
    description?: string;
    logo?: string;
    website?: string;
  };
  applicationDeadline?: string;
  startDate?: string;
  remoteWork: boolean;
  relocation?: boolean;
  visaSponsorship?: boolean;
  contact: {
    name: string;
    email: string;
    phone?: string;
  };
  author: {
    id: string;
    name: string;
    role: string;
  };
  publishedAt?: string;
  stats: {
    views: number;
    applications: number;
    shares: number;
    saves: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface JobStats {
  total: number;
  published: number;
  drafts: number;
  closed: number;
  totalApplications: number;
}

const departments = [
  "Engineering",
  "AI Research",
  "Mobile",
  "Infrastructure",
  "Design",
  "Data",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Operations",
  "Other",
];

const jobTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Freelance",
];

const statuses = ["draft", "published", "archived", "closed"];

function JobsContent() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [stats, setStats] = useState<JobStats>({
    total: 0,
    published: 0,
    drafts: 0,
    closed: 0,
    totalApplications: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  // Dialog states
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time" as
      | "Full-time"
      | "Part-time"
      | "Contract"
      | "Internship"
      | "Freelance",
    experience: "",
    salary: "",
    description: "",
    requirements: "",
    benefits: "",
    tags: "",
    icon: "Briefcase",
    color: "",
    featured: false,
    status: "draft" as "draft" | "published" | "archived" | "closed",
    responsibilities: "",
    qualifications: "",
    skills: "",
    companyName: "Metadots",
    companyDescription: "",
    companyLogo: "",
    companyWebsite: "",
    applicationDeadline: "",
    startDate: "",
    remoteWork: false,
    relocation: false,
    visaSponsorship: false,
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });

  const [editFormData, setEditFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time" as
      | "Full-time"
      | "Part-time"
      | "Contract"
      | "Internship"
      | "Freelance",
    experience: "",
    salary: "",
    description: "",
    requirements: "",
    benefits: "",
    tags: "",
    icon: "Briefcase",
    color: "",
    featured: false,
    status: "draft" as "draft" | "published" | "archived" | "closed",
    responsibilities: "",
    qualifications: "",
    skills: "",
    companyName: "Metadots",
    companyDescription: "",
    companyLogo: "",
    companyWebsite: "",
    applicationDeadline: "",
    startDate: "",
    remoteWork: false,
    relocation: false,
    visaSponsorship: false,
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });

  // Fetch jobs
  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("admin_token");
      const params = new URLSearchParams();

      if (searchTerm) params.append("search", searchTerm);
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (departmentFilter !== "all")
        params.append("department", departmentFilter);

      const response = await fetch(`/api/admin/jobs?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data = await response.json();
      setJobs(data.jobs);
      setStats(data.stats);
    } catch (err) {
      setError("Failed to load jobs");
      console.error("Error fetching jobs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [searchTerm, statusFilter, departmentFilter]);

  // Create job
  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.department ||
      !formData.location ||
      !formData.experience ||
      !formData.salary ||
      !formData.description
    ) {
      setError(
        "Title, department, location, experience, salary, and description are required"
      );
      return;
    }

    try {
      setIsCreating(true);
      setError("");
      const token = localStorage.getItem("admin_token");

      const requirementsArray = formData.requirements
        .split("\n")
        .map((req) => req.trim())
        .filter((req) => req);
      const benefitsArray = formData.benefits
        .split("\n")
        .map((benefit) => benefit.trim())
        .filter((benefit) => benefit);
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);
      const responsibilitiesArray = formData.responsibilities
        .split("\n")
        .map((resp) => resp.trim())
        .filter((resp) => resp);
      const qualificationsArray = formData.qualifications
        .split("\n")
        .map((qual) => qual.trim())
        .filter((qual) => qual);
      const skillsArray = formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill);

      const response = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          department: formData.department,
          location: formData.location,
          type: formData.type,
          experience: formData.experience,
          salary: formData.salary,
          description: formData.description,
          requirements: requirementsArray,
          benefits: benefitsArray,
          tags: tagsArray,
          icon: formData.icon,
          color: formData.color,
          featured: formData.featured,
          status: formData.status,
          responsibilities: responsibilitiesArray,
          qualifications: qualificationsArray,
          skills: skillsArray,
          company: {
            name: formData.companyName,
            description: formData.companyDescription,
            logo: formData.companyLogo,
            website: formData.companyWebsite,
          },
          applicationDeadline: formData.applicationDeadline || undefined,
          startDate: formData.startDate || undefined,
          remoteWork: formData.remoteWork,
          relocation: formData.relocation,
          visaSponsorship: formData.visaSponsorship,
          contact: {
            name: formData.contactName || user?.name,
            email: formData.contactEmail || user?.email,
            phone: formData.contactPhone,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create job");
      }

      setShowCreateDialog(false);
      setFormData({
        title: "",
        department: "",
        location: "",
        type: "Full-time",
        experience: "",
        salary: "",
        description: "",
        requirements: "",
        benefits: "",
        tags: "",
        icon: "Briefcase",
        color: "",
        featured: false,
        status: "draft",
        responsibilities: "",
        qualifications: "",
        skills: "",
        companyName: "Metadots",
        companyDescription: "",
        companyLogo: "",
        companyWebsite: "",
        applicationDeadline: "",
        startDate: "",
        remoteWork: false,
        relocation: false,
        visaSponsorship: false,
        contactName: "",
        contactEmail: "",
        contactPhone: "",
      });
      fetchJobs();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsCreating(false);
    }
  };

  // Update job
  const handleUpdateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !editFormData.title ||
      !editFormData.department ||
      !editFormData.location ||
      !editFormData.experience ||
      !editFormData.salary ||
      !editFormData.description
    ) {
      setError(
        "Title, department, location, experience, salary, and description are required"
      );
      return;
    }

    try {
      setIsUpdating(true);
      setError("");
      const token = localStorage.getItem("admin_token");

      const requirementsArray = editFormData.requirements
        .split("\n")
        .map((req) => req.trim())
        .filter((req) => req);
      const benefitsArray = editFormData.benefits
        .split("\n")
        .map((benefit) => benefit.trim())
        .filter((benefit) => benefit);
      const tagsArray = editFormData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);
      const responsibilitiesArray = editFormData.responsibilities
        .split("\n")
        .map((resp) => resp.trim())
        .filter((resp) => resp);
      const qualificationsArray = editFormData.qualifications
        .split("\n")
        .map((qual) => qual.trim())
        .filter((qual) => qual);
      const skillsArray = editFormData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill);

      const response = await fetch(`/api/admin/jobs/${showEditDialog}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editFormData.title,
          department: editFormData.department,
          location: editFormData.location,
          type: editFormData.type,
          experience: editFormData.experience,
          salary: editFormData.salary,
          description: editFormData.description,
          requirements: requirementsArray,
          benefits: benefitsArray,
          tags: tagsArray,
          icon: editFormData.icon,
          color: editFormData.color,
          featured: editFormData.featured,
          status: editFormData.status,
          responsibilities: responsibilitiesArray,
          qualifications: qualificationsArray,
          skills: skillsArray,
          company: {
            name: editFormData.companyName,
            description: editFormData.companyDescription,
            logo: editFormData.companyLogo,
            website: editFormData.companyWebsite,
          },
          applicationDeadline: editFormData.applicationDeadline || undefined,
          startDate: editFormData.startDate || undefined,
          remoteWork: editFormData.remoteWork,
          relocation: editFormData.relocation,
          visaSponsorship: editFormData.visaSponsorship,
          contact: {
            name: editFormData.contactName || user?.name,
            email: editFormData.contactEmail || user?.email,
            phone: editFormData.contactPhone,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update job");
      }

      setShowEditDialog(null);
      fetchJobs();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete job
  const handleDeleteJob = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this job?")) {
      return;
    }

    try {
      setIsDeleting(jobId);
      const token = localStorage.getItem("admin_token");

      const response = await fetch(`/api/admin/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete job");
      }

      fetchJobs();
    } catch (err) {
      setError("Failed to delete job");
      console.error("Error deleting job:", err);
    } finally {
      setIsDeleting(null);
    }
  };

  // Open edit dialog
  const openEditDialog = async (job: Job) => {
    setEditFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      experience: job.experience,
      salary: job.salary,
      description: job.description,
      requirements: job.requirements.join("\n"),
      benefits: job.benefits.join("\n"),
      tags: job.tags.join(", "),
      icon: job.icon,
      color: job.color,
      featured: job.featured,
      status: job.status,
      responsibilities: job.responsibilities?.join("\n") || "",
      qualifications: job.qualifications?.join("\n") || "",
      skills: job.skills?.join(", ") || "",
      companyName: job.company.name,
      companyDescription: job.company.description || "",
      companyLogo: job.company.logo || "",
      companyWebsite: job.company.website || "",
      applicationDeadline: job.applicationDeadline
        ? new Date(job.applicationDeadline).toISOString().split("T")[0]
        : "",
      startDate: job.startDate
        ? new Date(job.startDate).toISOString().split("T")[0]
        : "",
      remoteWork: job.remoteWork,
      relocation: job.relocation || false,
      visaSponsorship: job.visaSponsorship || false,
      contactName: job.contact.name,
      contactEmail: job.contact.email,
      contactPhone: job.contact.phone || "",
    });
    setShowEditDialog(job._id);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "draft":
        return <ClockIcon className="w-4 h-4 text-yellow-500" />;
      case "archived":
        return <XCircle className="w-4 h-4 text-gray-500" />;
      case "closed":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <ClockIcon className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      case "closed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-full bg-white rounded-lg md:overflow-auto">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">Jobs</h1>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 py-4 px-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Create Job
              </Button>
            </DialogTrigger>

            <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#f6f8fa] p-8 rounded-lg shadow-xl text-black break-words">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  Create New Job
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Fill in the details to create a new job posting.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleCreateJob} className="space-y-6 !w-full">
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="title"
                      className="block text-sm font-semibold text-gray-700">
                      Job Title *
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="e.g., Senior Full-Stack Developer"
                      required
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="department"
                      className="block text-sm font-semibold text-gray-700">
                      Department *
                    </Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) =>
                        setFormData({ ...formData, department: value })
                      }>
                      <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent className="!bg-white">
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="location"
                      className="block text-sm font-semibold text-gray-700">
                      Location *
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      placeholder="e.g., Remote / San Francisco"
                      required
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="type"
                      className="block text-sm font-semibold text-gray-700">
                      Job Type *
                    </Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: any) =>
                        setFormData({ ...formData, type: value })
                      }>
                      <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="!bg-white">
                        {jobTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="experience"
                      className="block text-sm font-semibold text-gray-700">
                      Experience *
                    </Label>
                    <Input
                      id="experience"
                      value={formData.experience}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          experience: e.target.value,
                        })
                      }
                      placeholder="e.g., 5+ years"
                      required
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="salary"
                    className="block text-sm font-semibold text-gray-700">
                    Salary *
                  </Label>
                  <Input
                    id="salary"
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                    placeholder="e.g., $120k - $180k"
                    required
                    className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="block text-sm font-semibold text-gray-700">
                    Job Description *
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
                    placeholder="Describe the role and responsibilities..."
                    rows={4}
                    required
                    className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="requirements"
                      className="block text-sm font-semibold text-gray-700">
                      Requirements * (one per line)
                    </Label>
                    <Textarea
                      id="requirements"
                      value={formData.requirements}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          requirements: e.target.value,
                        })
                      }
                      placeholder="5+ years of experience with React...&#10;Experience with cloud platforms..."
                      rows={6}
                      required
                      className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="benefits"
                      className="block text-sm font-semibold text-gray-700">
                      Benefits * (one per line)
                    </Label>
                    <Textarea
                      id="benefits"
                      value={formData.benefits}
                      onChange={(e) =>
                        setFormData({ ...formData, benefits: e.target.value })
                      }
                      placeholder="Competitive salary and equity&#10;Health, dental, and vision insurance..."
                      rows={6}
                      required
                      className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  </div>
                </div>

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
                    placeholder="React, Node.js, TypeScript, AWS"
                    className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="icon"
                      className="block text-sm font-semibold text-gray-700">
                      Icon
                    </Label>
                    <Input
                      id="icon"
                      value={formData.icon}
                      onChange={(e) =>
                        setFormData({ ...formData, icon: e.target.value })
                      }
                      placeholder="Briefcase"
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="color"
                      className="block text-sm font-semibold text-gray-700">
                      Color Gradient
                    </Label>
                    <Input
                      id="color"
                      value={formData.color}
                      onChange={(e) =>
                        setFormData({ ...formData, color: e.target.value })
                      }
                      placeholder=""
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full"
                    />
                  </div>
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
                      onValueChange={(value: any) =>
                        setFormData({ ...formData, status: value })
                      }>
                      <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="!bg-white">
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2 pt-8">
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, featured: checked })
                      }
                    />
                    <Label htmlFor="featured" className="text-sm text-gray-700">
                      Featured Job
                    </Label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="remoteWork"
                      checked={formData.remoteWork}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, remoteWork: checked })
                      }
                    />
                    <Label
                      htmlFor="remoteWork"
                      className="text-sm text-gray-700">
                      Remote Work Available
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="relocation"
                      checked={formData.relocation}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, relocation: checked })
                      }
                    />
                    <Label
                      htmlFor="relocation"
                      className="text-sm text-gray-700">
                      Relocation Assistance
                    </Label>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="visaSponsorship"
                    checked={formData.visaSponsorship}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, visaSponsorship: checked })
                    }
                  />
                  <Label
                    htmlFor="visaSponsorship"
                    className="text-sm text-gray-700">
                    Visa Sponsorship
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
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      "Create Job"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-[#f6f8fa] border-none text-blue-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Jobs
              </CardTitle>
              <Briefcase className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats.total}
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-[#f6f8fa] border-none text-blue-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Published
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.published}
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-[#f6f8fa] border-none text-blue-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Drafts
              </CardTitle>
              <ClockIcon className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {stats.drafts}
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-[#f6f8fa] border-none text-blue-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Closed
              </CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {stats.closed}
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-[#f6f8fa] border-none text-blue-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Applications
              </CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {stats.totalApplications}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-[#f6f8fa] text-black border-none mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="!bg-white">
                  <SelectItem value="all">All Status</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={departmentFilter}
                onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-48 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent className="!bg-white">
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Jobs List */}
        {jobs.length === 0 ? (
          <Card className="bg-[#f6f8fa] text-black border-none">
            <CardContent className="py-8">
              <div className="text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No jobs found
                </h3>
                <p className="text-gray-600 mb-4">
                  Get started by creating your first job posting.
                </p>
                <Button
                  onClick={() => setShowCreateDialog(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Job
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {jobs.map((job) => (
              <Card
                key={job._id}
                className="hover:shadow-md transition-shadow bg-[#f6f8fa] text-black border-none">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${job.color} flex items-center justify-center`}>
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <CardTitle className="text-lg">{job.title}</CardTitle>
                          {job.featured && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              Featured
                            </Badge>
                          )}
                          <Badge className={getStatusColor(job.status)}>
                            {getStatusIcon(job.status)}
                            <span className="ml-1">
                              {job.status.charAt(0).toUpperCase() +
                                job.status.slice(1)}
                            </span>
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-4 h-4" />
                            <span>{job.salary}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Badge variant="outline" className="text-black">
                            {job.department}
                          </Badge>
                          <span>•</span>
                          <span>{job.experience}</span>
                          {job.remoteWork && (
                            <>
                              <span>•</span>
                              <Badge
                                variant="outline"
                                className="text-green-600">
                                Remote
                              </Badge>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        className="!w-auto px-4 text-blue-700 hover:text-hover bg-transparent"
                        onClick={() => openEditDialog(job)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="!w-auto px-4 text-red-800 hover:text-hover bg-transparent"
                        onClick={() => handleDeleteJob(job._id)}
                        disabled={isDeleting === job._id}>
                        {isDeleting === job._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.slice(0, 5).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {job.tags.length > 5 && (
                      <Badge variant="secondary" className="text-xs">
                        +{job.tags.length - 5} more
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>Views: {job.stats.views}</span>
                      <span>Applications: {job.stats.applications}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Created {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Edit Dialog */}
        {showEditDialog && (
          <Dialog
            open={!!showEditDialog}
            onOpenChange={() => setShowEditDialog(null)}>
            <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#f6f8fa] p-8 rounded-lg shadow-xl text-black">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  Edit Job
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Update the job posting details.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUpdateJob} className="space-y-6">
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="edit-title"
                      className="block text-sm font-semibold text-gray-700">
                      Job Title *
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
                      placeholder="e.g., Senior Full-Stack Developer"
                      required
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="edit-department"
                      className="block text-sm font-semibold text-gray-700">
                      Department *
                    </Label>
                    <Select
                      value={editFormData.department}
                      onValueChange={(value) =>
                        setEditFormData({ ...editFormData, department: value })
                      }>
                      <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent className="!bg-white">
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="edit-location"
                      className="block text-sm font-semibold text-gray-700">
                      Location *
                    </Label>
                    <Input
                      id="edit-location"
                      value={editFormData.location}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          location: e.target.value,
                        })
                      }
                      placeholder="e.g., Remote / San Francisco"
                      required
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="edit-type"
                      className="block text-sm font-semibold text-gray-700">
                      Job Type *
                    </Label>
                    <Select
                      value={editFormData.type}
                      onValueChange={(value: any) =>
                        setEditFormData({ ...editFormData, type: value })
                      }>
                      <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="!bg-white">
                        {jobTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="edit-experience"
                      className="block text-sm font-semibold text-gray-700">
                      Experience *
                    </Label>
                    <Input
                      id="edit-experience"
                      value={editFormData.experience}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          experience: e.target.value,
                        })
                      }
                      placeholder="e.g., 5+ years"
                      required
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="edit-salary"
                    className="block text-sm font-semibold text-gray-700">
                    Salary *
                  </Label>
                  <Input
                    id="edit-salary"
                    value={editFormData.salary}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        salary: e.target.value,
                      })
                    }
                    placeholder="e.g., $120k - $180k"
                    required
                    className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="edit-description"
                    className="block text-sm font-semibold text-gray-700">
                    Job Description *
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
                    placeholder="Describe the role and responsibilities..."
                    rows={4}
                    required
                    className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="edit-requirements"
                      className="block text-sm font-semibold text-gray-700">
                      Requirements * (one per line)
                    </Label>
                    <Textarea
                      id="edit-requirements"
                      value={editFormData.requirements}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          requirements: e.target.value,
                        })
                      }
                      placeholder="5+ years of experience with React...&#10;Experience with cloud platforms..."
                      rows={6}
                      required
                      className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="edit-benefits"
                      className="block text-sm font-semibold text-gray-700">
                      Benefits * (one per line)
                    </Label>
                    <Textarea
                      id="edit-benefits"
                      value={editFormData.benefits}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          benefits: e.target.value,
                        })
                      }
                      placeholder="Competitive salary and equity&#10;Health, dental, and vision insurance..."
                      rows={6}
                      required
                      className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  </div>
                </div>

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
                      setEditFormData({ ...editFormData, tags: e.target.value })
                    }
                    placeholder="React, Node.js, TypeScript, AWS"
                    className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="edit-icon"
                      className="block text-sm font-semibold text-gray-700">
                      Icon
                    </Label>
                    <Input
                      id="edit-icon"
                      value={editFormData.icon}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          icon: e.target.value,
                        })
                      }
                      placeholder="Briefcase"
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="edit-color"
                      className="block text-sm font-semibold text-gray-700">
                      Color Gradient
                    </Label>
                    <Input
                      id="edit-color"
                      value={editFormData.color}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          color: e.target.value,
                        })
                      }
                      placeholder=""
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  </div>
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
                      onValueChange={(value: any) =>
                        setEditFormData({ ...editFormData, status: value })
                      }>
                      <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="!bg-white">
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2 pt-8">
                    <Switch
                      id="edit-featured"
                      checked={editFormData.featured}
                      onCheckedChange={(checked) =>
                        setEditFormData({ ...editFormData, featured: checked })
                      }
                    />
                    <Label
                      htmlFor="edit-featured"
                      className="text-sm text-gray-700">
                      Featured Job
                    </Label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="edit-remoteWork"
                      checked={editFormData.remoteWork}
                      onCheckedChange={(checked) =>
                        setEditFormData({
                          ...editFormData,
                          remoteWork: checked,
                        })
                      }
                    />
                    <Label
                      htmlFor="edit-remoteWork"
                      className="text-sm text-gray-700">
                      Remote Work Available
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="edit-relocation"
                      checked={editFormData.relocation}
                      onCheckedChange={(checked) =>
                        setEditFormData({
                          ...editFormData,
                          relocation: checked,
                        })
                      }
                    />
                    <Label
                      htmlFor="edit-relocation"
                      className="text-sm text-gray-700">
                      Relocation Assistance
                    </Label>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-visaSponsorship"
                    checked={editFormData.visaSponsorship}
                    onCheckedChange={(checked) =>
                      setEditFormData({
                        ...editFormData,
                        visaSponsorship: checked,
                      })
                    }
                  />
                  <Label
                    htmlFor="edit-visaSponsorship"
                    className="text-sm text-gray-700">
                    Visa Sponsorship
                  </Label>
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
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      "Update Job"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}

export default function JobsPage() {
  return <JobsContent />;
}
