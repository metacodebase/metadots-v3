import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Plus, 
  Search, 
  Filter,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  User,
  Clock
} from "lucide-react"
import Link from "next/link"

const blogs = [
  {
    id: 1,
    title: "The Future of AI in Business Transformation",
    excerpt: "Explore how artificial intelligence is revolutionizing business operations across industries...",
    author: "Sarah Chen",
    category: "AI & Machine Learning",
    status: "Published",
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    views: "12.5K",
    likes: "342",
  },
  {
    id: 2,
    title: "Building Scalable Web Applications",
    excerpt: "Discover the architectural patterns and best practices that enable applications to handle millions...",
    author: "Alex Rodriguez",
    category: "Web Development",
    status: "Draft",
    publishedAt: "2024-01-12",
    readTime: "12 min read",
    views: "8.7K",
    likes: "256",
  },
  {
    id: 3,
    title: "The Rise of Cloud-Native Applications",
    excerpt: "Understanding how cloud-native development is changing the way we build, deploy, and scale...",
    author: "Michael Zhang",
    category: "Cloud Computing",
    status: "Published",
    publishedAt: "2024-01-10",
    readTime: "10 min read",
    views: "6.2K",
    likes: "189",
  },
  {
    id: 4,
    title: "Mobile-First Design: Best Practices for 2024",
    excerpt: "Essential strategies for creating mobile-first experiences that engage users and drive conversions...",
    author: "Emma Thompson",
    category: "Mobile Development",
    status: "Scheduled",
    publishedAt: "2024-01-08",
    readTime: "7 min read",
    views: "9.1K",
    likes: "298",
  },
  {
    id: 5,
    title: "Database Optimization Techniques",
    excerpt: "Learn advanced database optimization strategies that can dramatically improve your application's...",
    author: "David Kumar",
    category: "Database",
    status: "Published",
    publishedAt: "2024-01-05",
    readTime: "15 min read",
    views: "5.8K",
    likes: "167",
  },
]

export default function BlogsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-600">Manage blog content and articles</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Blog Post
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
                  placeholder="Search blog posts..."
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

      {/* Blogs Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Blog Posts</CardTitle>
          <CardDescription>Manage your blog content and articles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Title</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Author</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Published</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Views</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{blog.title}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{blog.excerpt}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{blog.readTime}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <span className="text-sm text-gray-900">{blog.author}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">
                        {blog.category}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={
                        blog.status === "Published" ? "default" :
                        blog.status === "Draft" ? "secondary" :
                        "destructive"
                      }>
                        {blog.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {blog.publishedAt}
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-900">{blog.views}</div>
                      <div className="text-xs text-gray-500">{blog.likes} likes</div>
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

      {/* Blog Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900">89</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">67</p>
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
                <p className="text-sm font-medium text-gray-600">Drafts</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
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
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">42.8K</p>
              </div>
              <Eye className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 