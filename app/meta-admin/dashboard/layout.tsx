import { Sidebar } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  FileText, 
  FolderOpen, 
  Headphones, 
  BookOpen, 
  Settings,
  LogOut,
  Menu
} from "lucide-react"
import Link from "next/link"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/meta-admin/dashboard",
    icon: "dashboard",
  },
  {
    title: "Users",
    href: "/meta-admin/dashboard/users",
    icon: "users",
  },
  {
    title: "Blogs",
    href: "/meta-admin/dashboard/blogs",
    icon: "file-text",
  },
  {
    title: "Projects",
    href: "/meta-admin/dashboard/projects",
    icon: "folder-open",
  },
  {
    title: "Podcasts",
    href: "/meta-admin/dashboard/podcasts",
    icon: "headphones",
  },
  {
    title: "Case Studies",
    href: "/meta-admin/dashboard/case-studies",
    icon: "book-open",
  },
  {
    title: "Settings",
    href: "/meta-admin/dashboard/settings",
    icon: "settings",
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Meta Admin</h1>
          <p className="text-sm text-gray-600">Admin Dashboard</p>
        </div>
        
        <nav className="p-4 flex-1">
          <ul className="space-y-2">
            {sidebarNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {item.icon === "dashboard" && <div className="w-5 h-5 mr-3 bg-blue-500 rounded" />}
                  {item.icon === "users" && <Users className="w-5 h-5 mr-3" />}
                  {item.icon === "file-text" && <FileText className="w-5 h-5 mr-3" />}
                  {item.icon === "folder-open" && <FolderOpen className="w-5 h-5 mr-3" />}
                  {item.icon === "headphones" && <Headphones className="w-5 h-5 mr-3" />}
                  {item.icon === "book-open" && <BookOpen className="w-5 h-5 mr-3" />}
                  {item.icon === "settings" && <Settings className="w-5 h-5 mr-3" />}
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="mt-auto p-4 border-t">
          <Button variant="outline" className="w-full">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
              <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Admin User
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 