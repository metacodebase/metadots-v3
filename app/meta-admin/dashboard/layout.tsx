"use client";

import { Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Users,
  FileText,
  FolderOpen,
  Headphones,
  BookOpen,
  Settings,
  LogOut,
  Menu,
  Star,
  Briefcase,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useMemo } from "react";

const allNavItems = [
  {
    title: "Dashboard",
    href: "/meta-admin/dashboard",
    icon: "dashboard",
    roles: ["admin", "author"], // Both admin and author can see dashboard
  },
  {
    title: "Users",
    href: "/meta-admin/dashboard/users",
    icon: "users",
    roles: ["admin"], // Only admin can see users
  },
  {
    title: "Blogs",
    href: "/meta-admin/dashboard/blogs",
    icon: "file-text",
    roles: ["admin", "author"], // Both admin and author can see blogs
  },
  {
    title: "Projects",
    href: "/meta-admin/dashboard/projects",
    icon: "folder-open",
    roles: ["admin"], // Only admin can see projects
  },
  {
    title: "Podcasts",
    href: "/meta-admin/dashboard/podcasts",
    icon: "headphones",
    roles: ["admin"], // Only admin can see podcasts
  },
  {
    title: "Case Studies",
    href: "/meta-admin/dashboard/case-studies",
    icon: "book-open",
    roles: ["admin", "author"], // Both admin and author can see case studies
  },
  {
    title: "Reviews",
    href: "/meta-admin/dashboard/reviews",
    icon: "star",
    roles: ["admin"], // Only admin can see reviews
  },
  {
    title: "Jobs",
    href: "/meta-admin/dashboard/jobs",
    icon: "briefcase",
    roles: ["admin", "author"], // Both admin and author can see jobs
  },
  {
    title: "Contacts",
    href: "/meta-admin/dashboard/contacts",
    icon: "message-square",
    roles: ["admin"], // Only admin can see contacts
  },
  {
    title: "Settings",
    href: "/meta-admin/dashboard/settings",
    icon: "settings",
    roles: ["admin"], // Only admin can see settings
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  // Filter navigation items based on user role
  const sidebarNavItems = useMemo(() => {
    if (!user) return [];
    return allNavItems.filter((item) => item.roles.includes(user.role));
  }, [user]);

  const handleLogout = () => {
    logout();
  };

  // Function to check if a nav item is active
  const isActiveLink = (href: string) => {
    if (href === "/meta-admin/dashboard") {
      return pathname === "/meta-admin/dashboard" || pathname === "/meta-admin";
    }
    return pathname === href;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="px-6 py-4 ">
          <h1 className="text-2xl font-bold text-gray-800">Meta Admin</h1>
          <p className="text-sm text-gray-600">
            {user?.role === "admin" ? "Admin Dashboard" : "Author Dashboard"}
          </p>
        </div>

        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {sidebarNavItems.map((item) => {
              const isActive = isActiveLink(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-100 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}>
                    {item.icon === "dashboard" && (
                      <div
                        className={`w-5 h-5 mr-3 rounded ${
                          isActive ? "bg-blue-600" : "bg-blue-500"
                        }`}
                      />
                    )}
                    {item.icon === "users" && (
                      <Users
                        className={`w-5 h-5 mr-3 ${
                          isActive ? "text-blue-700" : ""
                        }`}
                      />
                    )}
                    {item.icon === "file-text" && (
                      <FileText
                        className={`w-5 h-5 mr-3 ${
                          isActive ? "text-blue-700" : ""
                        }`}
                      />
                    )}
                    {item.icon === "folder-open" && (
                      <FolderOpen
                        className={`w-5 h-5 mr-3 ${
                          isActive ? "text-blue-700" : ""
                        }`}
                      />
                    )}
                    {item.icon === "headphones" && (
                      <Headphones
                        className={`w-5 h-5 mr-3 ${
                          isActive ? "text-blue-700" : ""
                        }`}
                      />
                    )}
                    {item.icon === "book-open" && (
                      <BookOpen
                        className={`w-5 h-5 mr-3 ${
                          isActive ? "text-blue-700" : ""
                        }`}
                      />
                    )}
                    {item.icon === "star" && (
                      <Star
                        className={`w-5 h-5 mr-3 ${
                          isActive ? "text-blue-700" : ""
                        }`}
                      />
                    )}
                    {item.icon === "briefcase" && (
                      <Briefcase
                        className={`w-5 h-5 mr-3 ${
                          isActive ? "text-blue-700" : ""
                        }`}
                      />
                    )}
                    {item.icon === "message-square" && (
                      <MessageSquare
                        className={`w-5 h-5 mr-3 ${
                          isActive ? "text-blue-700" : ""
                        }`}
                      />
                    )}
                    {item.icon === "settings" && (
                      <Settings
                        className={`w-5 h-5 mr-3 ${
                          isActive ? "text-blue-700" : ""
                        }`}
                      />
                    )}
                    <span
                      className={`font-medium ${
                        isActive ? "text-blue-700" : ""
                      }`}>
                      {item.title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto p-4 border-t">
          <div className="mb-3 text-sm text-gray-600">
            <div className="font-medium">{user?.name}</div>
            <div className="text-xs capitalize">{user?.role}</div>
          </div>
          <Button
            className="!w-full group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700  px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            onClick={handleLogout}>
            Logout
            <LogOut className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm  px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* <Button className="bg-blue-600" size="sm">
                <Menu className="w-5 h-5" />
              </Button> */}
              {/* <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2> */}
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">{user?.name}</div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-medium">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-[#f6f8fa]  !text-black p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
