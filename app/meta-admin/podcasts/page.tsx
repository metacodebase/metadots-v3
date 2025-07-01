import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Headphones, 
  Plus, 
  Search, 
  Filter,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  User,
  Clock,
  Play,
  Download
} from "lucide-react"
import Link from "next/link"

const podcasts = [
  {
    id: 1,
    title: "The Future of AI in Business",
    description: "Exploring how artificial intelligence is transforming business operations and decision-making processes...",
    host: "Sarah Chen",
    category: "Technology",
    status: "Published",
    duration: "45:30",
    publishedAt: "2024-01-15",
    listens: "12.5K",
    downloads: "8.2K",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Building Scalable Web Applications",
    description: "Deep dive into architectural patterns and best practices for building applications that scale...",
    host: "Alex Rodriguez",
    category: "Development",
    status: "Published",
    duration: "52:15",
    publishedAt: "2024-01-12",
    listens: "9.8K",
    downloads: "6.5K",
    rating: 4.9,
  },
  {
    id: 3,
    title: "Cloud-Native Development Trends",
    description: "Understanding the latest trends in cloud-native development and deployment strategies...",
    host: "Michael Zhang",
    category: "Cloud Computing",
    status: "Draft",
    duration: "38:45",
    publishedAt: "2024-01-10",
    listens: "7.2K",
    downloads: "4.8K",
    rating: 4.7,
  },
  {
    id: 4,
    title: "Mobile App Development Best Practices",
    description: "Essential strategies and best practices for creating successful mobile applications...",
    host: "Emma Thompson",
    category: "Mobile Development",
    status: "Scheduled",
    duration: "41:20",
    publishedAt: "2024-01-08",
    listens: "11.3K",
    downloads: "7.9K",
    rating: 4.6,
  },
  {
    id: 5,
    title: "Database Optimization Techniques",
    description: "Advanced techniques for optimizing database performance and improving application speed...",
    host: "David Kumar",
    category: "Database",
    status: "Published",
    duration: "48:10",
    publishedAt: "2024-01-05",
    listens: "6.8K",
    downloads: "4.2K",
    rating: 4.5,
  },
]

export default function PodcastsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Podcasts</h1>
          <p className="text-gray-600">Manage podcast episodes and content</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Podcast
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
                  placeholder="Search podcasts..."
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

      {/* Podcasts Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Podcast Episodes</CardTitle>
          <CardDescription>Manage your podcast content and episodes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Episode</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Host</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Duration</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Published</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Listens</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {podcasts.map((podcast) => (
                  <tr key={podcast.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{podcast.title}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{podcast.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Play className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{podcast.duration}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <span className="text-sm text-gray-900">{podcast.host}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">
                        {podcast.category}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={
                        podcast.status === "Published" ? "default" :
                        podcast.status === "Draft" ? "secondary" :
                        "destructive"
                      }>
                        {podcast.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-900">{podcast.duration}</div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {podcast.publishedAt}
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-900">{podcast.listens}</div>
                      <div className="text-xs text-gray-500">{podcast.downloads} downloads</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Play className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
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

      {/* Podcast Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Episodes</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
              </div>
              <Headphones className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">18</p>
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
                <p className="text-sm font-medium text-gray-600">Total Listens</p>
                <p className="text-2xl font-bold text-gray-900">47.6K</p>
              </div>
              <Play className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Downloads</p>
                <p className="text-2xl font-bold text-gray-900">31.4K</p>
              </div>
              <Download className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 