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
  LayoutDashboard,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useMemo, useState } from "react";
import { Drawer } from "antd";

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
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleLinkClick = () => {
    setDrawerOpen(false);
  };

  const handleMenuClick = () => {
    setDrawerOpen(true);
  };

  const renderIcon = (icon: string, isActive: boolean) => {
    switch (icon) {
      case "dashboard":
        return (
          <LayoutDashboard
            className={`w-5 h-5 mr-3 ${isActive ? "text-blue-700" : ""}`}
          />
        );
      case "users":
        return (
          <Users
            className={`w-5 h-5 mr-3 ${isActive ? "text-blue-700" : ""}`}
          />
        );
      case "file-text":
        return (
          <FileText
            className={`w-5 h-5 mr-3 ${isActive ? "text-blue-700" : ""}`}
          />
        );
      case "folder-open":
        return (
          <FolderOpen
            className={`w-5 h-5 mr-3 ${isActive ? "text-blue-700" : ""}`}
          />
        );
      case "headphones":
        return (
          <Headphones
            className={`w-5 h-5 mr-3 ${isActive ? "text-blue-700" : ""}`}
          />
        );
      case "book-open":
        return (
          <BookOpen
            className={`w-5 h-5 mr-3 ${isActive ? "text-blue-700" : ""}`}
          />
        );
      case "star":
        return (
          <Star className={`w-5 h-5 mr-3 ${isActive ? "text-blue-700" : ""}`} />
        );
      case "briefcase":
        return (
          <Briefcase
            className={`w-5 h-5 mr-3 ${isActive ? "text-blue-700" : ""}`}
          />
        );
      case "message-square":
        return (
          <MessageSquare
            className={`w-5 h-5 mr-3 ${isActive ? "text-blue-700" : ""}`}
          />
        );
      case "settings":
        return (
          <Settings
            className={`w-5 h-5 mr-3 ${isActive ? "text-blue-700" : ""}`}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="md:flex h-full md:h-screen bg-gray-100">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden md:flex w-64 bg-white shadow-lg  flex-col">
        <div className="px-6 py-4">
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
                    {renderIcon(item.icon, isActive)}
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
            className="!w-full group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            onClick={handleLogout}>
            Logout
            <LogOut className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen md:h-full md:overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-black hover:bg-transparent hover:text-black"
                onClick={handleMenuClick}
                aria-label="Open navigation menu">
                <Menu className="w-5 h-5" />
              </Button>
              <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
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
        <main className="flex-1 md:overflow-auto bg-[#f6f8fa] !text-black p-6  md:h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">Meta Admin</h1>
          </div>
        }
        extra={
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDrawerClose}
            className="hover:bg-transparent hover:text-black p-1"
            aria-label="Close navigation menu">
            <X className="h-5 w-5" />
          </Button>
        }
        placement="left"
        onClose={handleDrawerClose}
        open={drawerOpen}
        width={280}
        closable={false}
        styles={{
          body: { padding: 0 },
          header: {
            borderBottom: "1px solid #e5e7eb",
            padding: "16px 24px",
          },
        }}>
        <div className="flex flex-col h-full">
          <div className="px-6 py-4">
            <p className="text-sm text-gray-600">
              {user?.role === "admin" ? "Admin Dashboard" : "Author Dashboard"}
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-4 overflow-y-auto">
            <ul className="space-y-2">
              {sidebarNavItems.map((item) => {
                const isActive = isActiveLink(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={handleLinkClick}
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      }`}>
                      {renderIcon(item.icon, isActive)}
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

          {/* User Info and Logout */}
          <div className="mt-auto p-4 border-t">
            <div className="mb-3 text-sm text-gray-600">
              <div className="font-medium">{user?.name}</div>
              <div className="text-xs capitalize">{user?.role}</div>
            </div>
            <Button
              className="!w-full group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                handleLinkClick();
                handleLogout();
              }}>
              Logout
              <LogOut className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
