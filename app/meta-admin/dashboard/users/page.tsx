"use client";

import { AdminRoute } from "@/components/AdminRoute";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ImageUpload } from "@/components/ui/image-upload";
import { toast } from "sonner";

interface User {
  _id: string;
  name: string;
  email: string;
  designation?: string;
  avatar?: string;
  role: "admin" | "author" | "user";
  isActive: boolean;
  createdAt: string;
}

function UsersContent() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState<string | null>(null);
  const [error, setError] = useState("");

  const { token } = useAuth();

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    designation: "",
    avatar: "",
    role: "user" as "admin" | "author" | "user",
    isActive: true,
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    password: "",
    designation: "",
    avatar: "",
    role: "user" as "admin" | "author" | "user",
    isActive: true,
  });

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      (user.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  // Utility to safely parse JSON
  const safeJson = async (response: Response) => {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      try {
        return await response.json();
      } catch (err) {
        console.error("Failed to parse JSON:", err);
        return null;
      }
    }
    return null;
  };

  // Fetch users from API
  const fetchUsers = useCallback(async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      setError("");
      const response = await fetch("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const text = await response.text();
        console.error("Fetch users failed:", text);
        let data = null;
        try {
          data = JSON.parse(text);
        } catch {}
        setError(data?.error || "Failed to load users");
        toast.error(data?.error || "Failed to load users");
        setUsers([]);
        return;
      }
      const data = await safeJson(response);
      setUsers(data?.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users");
      toast.error("Failed to load users");
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // Create new user
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const text = await response.text();
        console.error("Create user failed:", text);
        let data = null;
        try {
          data = JSON.parse(text);
        } catch {}
        toast.error(data?.error || "Failed to create user");
        return;
      }
      toast.success("User created successfully");
      setShowCreateDialog(false);
      setFormData({
        name: "",
        email: "",
        password: "",
        designation: "",
        avatar: "",
        role: "user",
        isActive: true,
      });
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Failed to create user");
    } finally {
      setIsCreating(false);
    }
  };

  // Update user
  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showEditDialog) return;
    setIsUpdating(true);
    try {
      const updateData: any = { ...editFormData };
      if (!updateData.password) {
        delete updateData.password;
      }
      // Debug log
      console.log("Updating user with:", updateData);
      const response = await fetch(`/api/admin/users/${showEditDialog}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });
      if (!response.ok) {
        const text = await response.text();
        console.error("Update user failed:", text);
        let data = null;
        try {
          data = JSON.parse(text);
        } catch {}
        toast.error(data?.error || "Failed to update user");
        return;
      }
      toast.success("User updated successfully");
      setShowEditDialog(null);
      setEditFormData({
        name: "",
        email: "",
        password: "",
        designation: "",
        avatar: "",
        role: "user",
        isActive: true,
      });
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete user
  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    setIsDeleting(userId);
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const text = await response.text();
        console.error("Delete user failed:", text);
        let data = null;
        try {
          data = JSON.parse(text);
        } catch {}
        toast.error(data?.error || "Failed to delete user");
        return;
      }
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    } finally {
      setIsDeleting(null);
    }
  };

  // Open edit dialog
  const openEditDialog = (user: User) => {
    setEditFormData({
      name: user.name,
      email: user.email,
      password: "",
      designation: user.designation || "",
      avatar: user.avatar || "",
      role: user.role,
      isActive: user.isActive,
    });
    setShowEditDialog(user._id);
  };

  // Load users on component mount
  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token, fetchUsers]);

  return (
    <div className="h-full bg-white rounded-lg md:overflow-auto">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/meta-admin/dashboard"></Link>
            <h1 className="text-xl font-semibold text-gray-900">
              Users Management
            </h1>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 py-4 px-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>

            <DialogContent className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#f6f8fa] p-8 rounded-lg shadow-xl text-black">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  Create New User
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Add a new user to the system
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleCreateUser} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    placeholder="e.g., John Doe"
                    className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Enter the user's email"
                    className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                    placeholder="Enter a secure password"
                    className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="designation"
                    className="block text-sm font-semibold text-gray-700">
                    Designation
                  </Label>
                  <Input
                    id="designation"
                    value={formData.designation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        designation: e.target.value,
                      })
                    }
                    placeholder="e.g., CEO, Senior Developer, Tech Writer"
                    className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="block text-sm font-semibold text-gray-700">
                    Profile Photo
                  </Label>
                  <ImageUpload
                    value={formData.avatar}
                    onChange={(url) =>
                      setFormData({ ...formData, avatar: url })
                    }
                    placeholder="Upload profile photo"
                    className="mt-2 w-full p-4 border rounded-md bg-white border-blue-500 "
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="role"
                    className="block text-sm font-semibold text-gray-700">
                    Role
                  </Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value: "admin" | "author" | "user") =>
                      setFormData({ ...formData, role: value })
                    }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="!bg-whtie">
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="author">Author</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="active"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="active" className="text-sm text-gray-700">
                    Active
                  </Label>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreateDialog(false)}
                    className="text-white hover:text-white !w-auto px-4">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isCreating}
                    className="bg-blue-700 text-white hover:bg-blue-800 !w-auto px-4">
                    {isCreating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Create User"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card className="bg-[#f6f8fa] text-black border-none">
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              Manage user accounts and permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="hover:bg-blue-50 ">
                    <TableRow className=" border-b border-gray-300 hover:bg-blue-100 bg-blue-50">
                      <TableHead className="font-semibold text-gray-900 py-4">
                        Name
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900 py-4">
                        Email
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900 py-4">
                        Role
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900 py-4 ">
                        Status
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user, index) => (
                      <TableRow
                        key={user._id}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        }`}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Image
                              src={user.avatar || "/placeholder.svg"}
                              alt={user.name}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                            <div>
                              <div className="font-medium">
                                {user.name || "N/A"}
                              </div>
                              {user.designation && (
                                <div className="text-xs text-gray-500">
                                  {user.designation}
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{user.email || "N/A"}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              user.role === "admin"
                                ? "bg-purple-100 text-purple-800"
                                : user.role === "author"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}>
                            {user.role}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              user.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}>
                            {user.isActive ? "Active" : "Inactive"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Dialog
                              open={showEditDialog === user._id}
                              onOpenChange={(open) =>
                                !open && setShowEditDialog(null)
                              }>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  className="!w-auto px-4 text-blue-700 hover:text-hover bg-transparent"
                                  onClick={() => openEditDialog(user)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#f6f8fa] p-8 rounded-lg shadow-xl text-black">
                                <DialogHeader>
                                  <DialogTitle className="text-xl font-semibold">
                                    Edit User
                                  </DialogTitle>
                                  <DialogDescription className="text-gray-600">
                                    Update user information
                                  </DialogDescription>
                                </DialogHeader>

                                <form
                                  onSubmit={handleUpdateUser}
                                  className="space-y-6">
                                  <div className="space-y-2">
                                    <Label
                                      htmlFor="edit-name"
                                      className="block text-sm font-semibold text-gray-700">
                                      Name
                                    </Label>
                                    <Input
                                      id="edit-name"
                                      value={editFormData.name}
                                      onChange={(e) =>
                                        setEditFormData({
                                          ...editFormData,
                                          name: e.target.value,
                                        })
                                      }
                                      required
                                      placeholder="e.g., John Doe"
                                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label
                                      htmlFor="edit-email"
                                      className="block text-sm font-semibold text-gray-700">
                                      Email
                                    </Label>
                                    <Input
                                      id="edit-email"
                                      type="email"
                                      value={editFormData.email}
                                      onChange={(e) =>
                                        setEditFormData({
                                          ...editFormData,
                                          email: e.target.value,
                                        })
                                      }
                                      required
                                      placeholder="Enter the user's email"
                                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label
                                      htmlFor="edit-password"
                                      className="block text-sm font-semibold text-gray-700">
                                      Password (leave blank to keep current)
                                    </Label>
                                    <Input
                                      id="edit-password"
                                      type="password"
                                      value={editFormData.password}
                                      onChange={(e) =>
                                        setEditFormData({
                                          ...editFormData,
                                          password: e.target.value,
                                        })
                                      }
                                      placeholder="Enter a new password"
                                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label
                                      htmlFor="edit-designation"
                                      className="block text-sm font-semibold text-gray-700">
                                      Designation
                                    </Label>
                                    <Input
                                      id="edit-designation"
                                      value={editFormData.designation}
                                      onChange={(e) =>
                                        setEditFormData({
                                          ...editFormData,
                                          designation: e.target.value,
                                        })
                                      }
                                      placeholder="e.g., CEO, Senior Developer, Tech Writer"
                                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label className="block text-sm font-semibold text-gray-700">
                                      Profile Photo
                                    </Label>
                                    <ImageUpload
                                      value={editFormData.avatar}
                                      onChange={(url) =>
                                        setEditFormData({
                                          ...editFormData,
                                          avatar: url,
                                        })
                                      }
                                      placeholder="Upload profile photo"
                                      className="mt-2 w-full p-4 border rounded-md bg-white border-blue-500"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label
                                      htmlFor="edit-role"
                                      className="block text-sm font-semibold text-gray-700">
                                      Role
                                    </Label>
                                    <Select
                                      value={editFormData.role}
                                      onValueChange={(
                                        value: "admin" | "author" | "user"
                                      ) =>
                                        setEditFormData({
                                          ...editFormData,
                                          role: value,
                                        })
                                      }>
                                      <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent className="!bg-white">
                                        <SelectItem value="admin">
                                          Admin
                                        </SelectItem>
                                        <SelectItem value="author">
                                          Author
                                        </SelectItem>
                                        <SelectItem value="user">
                                          User
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      id="edit-active"
                                      checked={editFormData.isActive}
                                      onChange={(e) =>
                                        setEditFormData({
                                          ...editFormData,
                                          isActive: e.target.checked,
                                        })
                                      }
                                      className="rounded border-gray-300"
                                    />
                                    <Label
                                      htmlFor="edit-active"
                                      className="text-sm text-gray-700">
                                      Active
                                    </Label>
                                  </div>

                                  <div className="flex justify-end space-x-4">
                                    <Button
                                      type="button"
                                      variant="outline"
                                      onClick={() => setShowEditDialog(null)}
                                      className="text-white hover:text-white !w-auto px-4">
                                      Cancel
                                    </Button>
                                    <Button
                                      type="submit"
                                      disabled={isUpdating}
                                      className="bg-blue-700 text-white hover:bg-blue-800 !w-auto px-4">
                                      {isUpdating ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                      ) : (
                                        "Update User"
                                      )}
                                    </Button>
                                  </div>
                                </form>
                              </DialogContent>
                            </Dialog>
                            <Button
                              className="!w-auto px-4 text-red-800 hover:text-hover bg-transparent"
                              size="sm"
                              onClick={() => handleDeleteUser(user._id)}
                              disabled={isDeleting === user._id}>
                              {isDeleting === user._id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function Users() {
  return (
    <AdminRoute>
      <UsersContent />
    </AdminRoute>
  );
}
