"use client";

import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LogOut,
  User,
  Settings,
  BarChart3,
  FileText,
  Users,
  Mic,
} from "lucide-react";
import Link from "next/link";

function DashboardContent() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    console.log("Dashboard logout button clicked");
    logout();
    // The ProtectedRoute component will handle the redirect
  };

  const menuItems = [
    {
      title: "Users",
      description: "Manage user accounts",
      icon: Users,
      href: "/meta-admin/dashboard/users",
      color: "bg-blue-500",
    },
    {
      title: "Blogs",
      description: "Manage blog posts",
      icon: FileText,
      href: "/meta-admin/dashboard/blogs",
      color: "bg-green-500",
    },
    {
      title: "Projects",
      description: "Manage projects",
      icon: BarChart3,
      href: "/meta-admin/dashboard/projects",
      color: "bg-purple-500",
    },
    {
      title: "Podcasts",
      description: "Manage podcasts",
      icon: Mic,
      href: "/meta-admin/dashboard/podcasts",
      color: "bg-orange-500",
    },
    {
      title: "Case Studies",
      description: "Manage case studies",
      icon: FileText,
      href: "/meta-admin/dashboard/case-studies",
      color: "bg-red-500",
    },
    {
      title: "Settings",
      description: "System settings",
      icon: Settings,
      href: "/meta-admin/dashboard/settings",
      color: "bg-gray-500",
    },
  ];

  return (
    <div className="h-full bg-white rounded-lg md:overflow-auto">
      {/* <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Meta Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {user?.name}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div> */}

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900  mb-2">
            Welcome back, {user?.name}!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your content and system settings from here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Link key={item.title} href={item.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-[#f6f8fa] border-none text-blue-700">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <div className={`p-2 rounded-lg ${item.color}`}>
                    <item.icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="ml-4">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#686868]">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
