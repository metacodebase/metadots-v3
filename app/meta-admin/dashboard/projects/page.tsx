"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AdminRoute } from "@/components/AdminRoute"
import { 
  FolderOpen, 
  Plus, 
  Search, 
  Filter,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  Users,
  Star,
  ExternalLink
} from "lucide-react"
import Link from "next/link"

const projects = [
  {
    id: 1,
    title: "AI-Powered Analytics Platform",
    description: "Revolutionary analytics platform that processes 10M+ data points daily, featuring real-time AI insights...",
    client: "TechCorp Enterprise",
    category: "AI/ML",
    status: "Live",
    duration: "8 months",
    team: "12 developers",
    rating: 5.0,
    budget: "$250K",
    startDate: "2024-01-15",
  },
  {
    id: 2,
    title: "Enterprise E-commerce Platform",
    description: "AI-powered e-commerce solution with smart recommendations, real-time inventory, and advanced analytics...",
    client: "GlobalShop Inc",
    category: "E-commerce",
    status: "Live",
    duration: "6 months",
    team: "8 developers",
    rating: 4.9,
    budget: "$180K",
    startDate: "2024-01-10",
  },
  {
    id: 3,
    title: "Digital Banking Solution",
    description: "Secure banking platform with blockchain integration, real-time fraud detection, and AI-powered insights...",
    client: "SecureBank Pro",
    category: "FinTech",
    status: "In Progress",
    duration: "12 months",
    team: "15 developers",
    rating: 4.8,
    budget: "$350K",
    startDate: "2024-01-05",
  },
  {
    id: 4,
    title: "AI Healthcare Platform",
    description: "Comprehensive healthcare management with AI diagnostics, telemedicine, and patient monitoring...",
    client: "MedTech Solutions",
    category: "Healthcare",
    status: "Live",
    duration: "10 months",
    team: "10 developers",
    rating: 5.0,
    budget: "$280K",
    startDate: "2024-01-01",
  },
  {
    id: 5,
    title: "Smart IoT Management System",
    description: "Comprehensive IoT platform for managing smart devices, real-time monitoring, and predictive maintenance...",
    client: "SmartCity Corp",
    category: "IoT",
    status: "Planning",
    duration: "9 months",
    team: "11 developers",
    rating: 4.7,
    budget: "$200K",
    startDate: "2024-02-01",
  },
]

function ProjectsContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600">Manage client projects and portfolio</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
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
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>Manage your client projects and portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Project</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Client</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Team</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Budget</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Rating</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{project.title}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{project.duration}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-900">{project.client}</div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">
                        {project.category}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={
                        project.status === "Live" ? "default" :
                        project.status === "In Progress" ? "secondary" :
                        "destructive"
                      }>
                        {project.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{project.team}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm font-medium text-gray-900">{project.budget}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-900">{project.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">45</p>
              </div>
              <FolderOpen className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Live Projects</p>
                <p className="text-2xl font-bold text-gray-900">32</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-green-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$1.26M</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <AdminRoute>
      <ProjectsContent />
    </AdminRoute>
  );
} 