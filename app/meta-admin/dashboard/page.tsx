import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  FileText, 
  FolderOpen, 
  Headphones, 
  BookOpen, 
  TrendingUp,
  Plus,
  Eye,
  Edit,
  Trash2
} from "lucide-react"
import Link from "next/link"

const stats = [
  {
    title: "Total Users",
    value: "1,234",
    change: "+12%",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Blog Posts",
    value: "89",
    change: "+5%",
    icon: FileText,
    color: "bg-green-500",
  },
  {
    title: "Projects",
    value: "45",
    change: "+8%",
    icon: FolderOpen,
    color: "bg-purple-500",
  },
  {
    title: "Podcasts",
    value: "23",
    change: "+15%",
    icon: Headphones,
    color: "bg-orange-500",
  },
  {
    title: "Case Studies",
    value: "12",
    change: "+3%",
    icon: BookOpen,
    color: "bg-red-500",
  },
]

const recentItems = [
  {
    type: "Blog",
    title: "The Future of AI in Business",
    author: "Sarah Chen",
    date: "2024-01-15",
    status: "Published",
  },
  {
    type: "Project",
    title: "AI Analytics Platform",
    author: "Alex Johnson",
    date: "2024-01-14",
    status: "In Progress",
  },
  {
    type: "User",
    title: "New user registered",
    author: "john.doe@example.com",
    date: "2024-01-13",
    status: "Active",
  },
  {
    type: "Podcast",
    title: "Tech Trends 2024",
    author: "Mike Wilson",
    date: "2024-01-12",
    status: "Published",
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your content.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <TrendingUp className="w-4 h-4 mr-2" />
            View Analytics
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.change}
                  </p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across all content types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      {item.type === "Blog" && <FileText className="w-4 h-4 text-blue-600" />}
                      {item.type === "Project" && <FolderOpen className="w-4 h-4 text-purple-600" />}
                      {item.type === "User" && <Users className="w-4 h-4 text-green-600" />}
                      {item.type === "Podcast" && <Headphones className="w-4 h-4 text-orange-600" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600">by {item.author}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{item.date}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.status === "Published" ? "bg-green-100 text-green-800" :
                      item.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                      "bg-blue-100 text-blue-800"
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common admin tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/meta-admin/users">
                <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                  <Users className="w-6 h-6" />
                  <span>Manage Users</span>
                </Button>
              </Link>
              <Link href="/meta-admin/blogs">
                <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                  <FileText className="w-6 h-6" />
                  <span>Manage Blogs</span>
                </Button>
              </Link>
              <Link href="/meta-admin/projects">
                <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                  <FolderOpen className="w-6 h-6" />
                  <span>Manage Projects</span>
                </Button>
              </Link>
              <Link href="/meta-admin/podcasts">
                <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                  <Headphones className="w-6 h-6" />
                  <span>Manage Podcasts</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 