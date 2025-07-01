import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  BookOpen, 
  Plus, 
  Search, 
  Filter,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  User,
  Star,
  ExternalLink,
  TrendingUp,
  Download
} from "lucide-react"
import Link from "next/link"

const caseStudies = [
  {
    id: 1,
    title: "AI-Powered Analytics Platform for TechCorp",
    description: "How we built a revolutionary analytics platform that processes 10M+ data points daily, featuring real-time AI insights...",
    client: "TechCorp Enterprise",
    industry: "Technology",
    status: "Published",
    duration: "8 months",
    team: "12 developers",
    budget: "$250K",
    results: "340% efficiency improvement",
    publishedAt: "2024-01-15",
    views: "15.2K",
    downloads: "2.8K",
  },
  {
    id: 2,
    title: "E-commerce Transformation for GlobalShop",
    description: "Complete digital transformation of a global retail chain with AI-powered recommendations and real-time inventory...",
    client: "GlobalShop Inc",
    industry: "Retail",
    status: "Published",
    duration: "6 months",
    team: "8 developers",
    budget: "$180K",
    results: "23% conversion increase",
    publishedAt: "2024-01-10",
    views: "12.8K",
    downloads: "2.1K",
  },
  {
    id: 3,
    title: "Digital Banking Solution for SecureBank",
    description: "Secure banking platform with blockchain integration, real-time fraud detection, and AI-powered financial insights...",
    client: "SecureBank Pro",
    industry: "FinTech",
    status: "Draft",
    duration: "12 months",
    team: "15 developers",
    budget: "$350K",
    results: "99% fraud detection accuracy",
    publishedAt: "2024-01-05",
    views: "8.9K",
    downloads: "1.5K",
  },
  {
    id: 4,
    title: "Healthcare AI Platform for MedTech",
    description: "Comprehensive healthcare management system with AI diagnostics, telemedicine, and patient monitoring...",
    client: "MedTech Solutions",
    industry: "Healthcare",
    status: "Published",
    duration: "10 months",
    team: "10 developers",
    budget: "$280K",
    results: "98.7% diagnostic accuracy",
    publishedAt: "2024-01-01",
    views: "11.4K",
    downloads: "1.9K",
  },
  {
    id: 5,
    title: "IoT Management System for SmartCity",
    description: "Comprehensive IoT platform for managing smart devices, real-time monitoring, and predictive maintenance...",
    client: "SmartCity Corp",
    industry: "Smart Cities",
    status: "Scheduled",
    duration: "9 months",
    team: "11 developers",
    budget: "$200K",
    results: "45% operational efficiency",
    publishedAt: "2024-02-01",
    views: "6.7K",
    downloads: "1.2K",
  },
]

export default function CaseStudiesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Case Studies</h1>
          <p className="text-gray-600">Manage client success stories and case studies</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Case Study
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
                  placeholder="Search case studies..."
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

      {/* Case Studies Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Case Studies</CardTitle>
          <CardDescription>Manage your client success stories and case studies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Case Study</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Client</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Industry</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Results</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Published</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Views</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {caseStudies.map((study) => (
                  <tr key={study.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{study.title}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{study.description}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{study.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{study.team}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-900">{study.client}</div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">
                        {study.industry}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={
                        study.status === "Published" ? "default" :
                        study.status === "Draft" ? "secondary" :
                        "destructive"
                      }>
                        {study.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-3 h-3 text-green-500" />
                        <span className="text-sm text-gray-900">{study.results}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {study.publishedAt}
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-900">{study.views}</div>
                      <div className="text-xs text-gray-500">{study.downloads} downloads</div>
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

      {/* Case Study Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Case Studies</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
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
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">55K</p>
              </div>
              <Eye className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Downloads</p>
                <p className="text-2xl font-bold text-gray-900">9.5K</p>
              </div>
              <Download className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 