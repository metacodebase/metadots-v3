"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  MessageSquare,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Clock,
  Mail,
  Phone,
  Building,
  User,
  CheckCircle,
  Clock as ClockIcon,
  AlertCircle,
  FileText,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  projectType: string;
  budgetRange: string;
  projectDetails: string;
  status: "new" | "contacted" | "qualified" | "proposal" | "closed";
  source: "homepage" | "contact-page" | "other";
  ipAddress: string;
  userAgent: string;
  notes: string;
  assignedTo?: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface ContactStats {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  proposal: number;
  closed: number;
}

const statusOptions = [
  { value: "new", label: "New", color: "bg-blue-100 text-blue-800" },
  {
    value: "contacted",
    label: "Contacted",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "qualified",
    label: "Qualified",
    color: "bg-green-100 text-green-800",
  },
  {
    value: "proposal",
    label: "Proposal",
    color: "bg-purple-100 text-purple-800",
  },
  { value: "closed", label: "Closed", color: "bg-gray-100 text-gray-800" },
];

function ContactsContent() {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [stats, setStats] = useState<ContactStats>({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    proposal: 0,
    closed: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Dialog states
  const [showViewDialog, setShowViewDialog] = useState<string | null>(null);
  const [showEditDialog, setShowEditDialog] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Form states
  const [editFormData, setEditFormData] = useState({
    status: "new" as "new" | "contacted" | "qualified" | "proposal" | "closed",
    notes: "",
  });

  // Fetch contacts
  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("admin_token");
      const params = new URLSearchParams();

      if (searchTerm) params.append("search", searchTerm);
      if (statusFilter !== "all") params.append("status", statusFilter);

      const response = await fetch(`/api/admin/contacts?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }

      const data = await response.json();
      setContacts(data.contacts);
      setStats(data.stats);
    } catch (err) {
      setError("Failed to load contacts");
      console.error("Error fetching contacts:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [searchTerm, statusFilter]);

  // Update contact
  const handleUpdateContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showEditDialog) return;

    try {
      setIsUpdating(true);
      setError("");
      const token = localStorage.getItem("admin_token");

      const response = await fetch(`/api/admin/contacts/${showEditDialog}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editFormData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update contact");
      }

      setShowEditDialog(null);
      fetchContacts();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete contact
  const handleDeleteContact = async (contactId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this contact? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      setIsDeleting(contactId);
      setError("");
      const token = localStorage.getItem("admin_token");

      const response = await fetch(`/api/admin/contacts/${contactId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete contact");
      }

      fetchContacts();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsDeleting(null);
    }
  };

  // Open edit dialog
  const openEditDialog = async (contact: Contact) => {
    setEditFormData({
      status: contact.status,
      notes: contact.notes,
    });
    setShowEditDialog(contact._id);
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusOption = statusOptions.find(
      (option) => option.value === status
    );
    return (
      <Badge className={statusOption?.color || "bg-gray-100 text-gray-800"}>
        {statusOption?.label || status}
      </Badge>
    );
  };

  // Filter contacts
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="h-full bg-white rounded-lg md:overflow-auto">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">
              Contact Submissions
            </h1>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-[#f6f8fa] border-none text-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.total}
                  </p>
                </div>
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-[#f6f8fa] border-none text-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">New</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {stats.new}
                  </p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-[#f6f8fa] border-none text-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Contacted</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {stats.contacted}
                  </p>
                </div>
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-[#f6f8fa] border-none text-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Qualified</p>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.qualified}
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-[#f6f8fa] border-none text-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Proposal</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {stats.proposal}
                  </p>
                </div>
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <FileText className="w-4 h-4 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-[#f6f8fa] border-none text-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Closed</p>
                  <p className="text-2xl font-bold text-gray-600">
                    {stats.closed}
                  </p>
                </div>
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="bg-[#f6f8fa] text-black border-none mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="!bg-white">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Contacts Table */}
        <Card className="bg-[#f6f8fa] text-black border-none">
          <CardHeader>
            <CardTitle>All Contact Submissions</CardTitle>
            <CardDescription>
              Manage and track contact form submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No contact submissions found
                </h3>
                <p className="text-gray-600">
                  Contact submissions will appear here when users fill out the
                  contact form.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="hover:bg-blue-50">
                    <tr className="border-b border-gray-300 hover:bg-blue-100 bg-blue-50">
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Contact
                      </th>
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Project
                      </th>
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Status
                      </th>
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Source
                      </th>
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Submitted
                      </th>
                      <th className="font-semibold text-gray-900 py-4 text-left px-4">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact, index) => (
                      <tr
                        key={contact._id}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        }`}>
                        <td className="py-4 px-4">
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="font-medium text-gray-900 truncate w-20">
                                {contact.firstName} {contact.lastName}
                              </p>
                            </div>
                            <p className="text-sm text-gray-600">
                              {contact.email}
                            </p>
                            {contact.company && (
                              <p className="text-xs text-gray-500 flex items-center">
                                <Building className="w-3 h-3 mr-1" />
                                {contact.company}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <Badge
                              variant="outline"
                              className="mb-1 text-black">
                              {contact.projectType}
                            </Badge>
                            {contact.budgetRange && (
                              <p className="text-xs text-gray-500">
                                {contact.budgetRange}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          {getStatusBadge(contact.status)}
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="secondary">
                            {contact.source === "homepage"
                              ? "Homepage"
                              : "Contact Page"}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {new Date(contact.createdAt).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "short", day: "numeric" }
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <Dialog
                              open={showViewDialog === contact._id}
                              onOpenChange={(open) =>
                                !open && setShowViewDialog(null)
                              }>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  className="!w-auto px-4 text-blue-700 hover:text-hover bg-transparent"
                                  onClick={() =>
                                    setShowViewDialog(contact._id)
                                  }>
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="w-full max-w-2xl bg-[#f6f8fa] p-8 rounded-lg shadow-xl text-black">
                                <DialogHeader>
                                  <DialogTitle className="text-xl font-semibold">
                                    Contact Details
                                  </DialogTitle>
                                  <DialogDescription className="text-gray-600">
                                    View complete contact submission details
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="block text-sm font-semibold text-gray-700">
                                        Name
                                      </Label>
                                      <p className="text-sm text-gray-900">
                                        {contact.firstName} {contact.lastName}
                                      </p>
                                    </div>
                                    <div>
                                      <Label className="block text-sm font-semibold text-gray-700">
                                        Email
                                      </Label>
                                      <p className="text-sm text-gray-900">
                                        {contact.email}
                                      </p>
                                    </div>
                                  </div>
                                  {contact.company && (
                                    <div>
                                      <Label className="block text-sm font-semibold text-gray-700">
                                        Company
                                      </Label>
                                      <p className="text-sm text-gray-900">
                                        {contact.company}
                                      </p>
                                    </div>
                                  )}
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="block text-sm font-semibold text-gray-700">
                                        Project Type
                                      </Label>
                                      <p className="text-sm text-gray-900">
                                        {contact.projectType}
                                      </p>
                                    </div>
                                    <div>
                                      <Label className="block text-sm font-semibold text-gray-700">
                                        Budget Range
                                      </Label>
                                      <p className="text-sm text-gray-900">
                                        {contact.budgetRange || "Not specified"}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="block text-sm font-semibold text-gray-700">
                                      Project Details
                                    </Label>
                                    <p className="text-sm text-gray-900 whitespace-pre-wrap">
                                      {contact.projectDetails}
                                    </p>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="block text-sm font-semibold text-gray-700">
                                        Status
                                      </Label>
                                      <div className="mt-1">
                                        {getStatusBadge(contact.status)}
                                      </div>
                                    </div>
                                    <div>
                                      <Label className="block text-sm font-semibold text-gray-700">
                                        Source
                                      </Label>
                                      <p className="text-sm text-gray-900">
                                        {contact.source === "homepage"
                                          ? "Homepage"
                                          : "Contact Page"}
                                      </p>
                                    </div>
                                  </div>
                                  {contact.notes && (
                                    <div>
                                      <Label className="block text-sm font-semibold text-gray-700">
                                        Notes
                                      </Label>
                                      <p className="text-sm text-gray-900 whitespace-pre-wrap">
                                        {contact.notes}
                                      </p>
                                    </div>
                                  )}
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="block text-sm font-semibold text-gray-700">
                                        Submitted
                                      </Label>
                                      <p className="text-sm text-gray-900">
                                        {new Date(
                                          contact.createdAt
                                        ).toLocaleString()}
                                      </p>
                                    </div>
                                    <div>
                                      <Label className="block text-sm font-semibold text-gray-700">
                                        IP Address
                                      </Label>
                                      <p className="text-sm text-gray-900">
                                        {contact.ipAddress}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Dialog
                              open={showEditDialog === contact._id}
                              onOpenChange={(open) =>
                                !open && setShowEditDialog(null)
                              }>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  className="!w-auto px-4 text-blue-700 hover:text-hover bg-transparent"
                                  onClick={() => openEditDialog(contact)}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="w-full max-w-lg bg-[#f6f8fa] p-8 rounded-lg shadow-xl text-black">
                                <DialogHeader>
                                  <DialogTitle className="text-xl font-semibold">
                                    Update Contact
                                  </DialogTitle>
                                  <DialogDescription className="text-gray-600">
                                    Update contact status and add notes
                                  </DialogDescription>
                                </DialogHeader>
                                <form
                                  onSubmit={handleUpdateContact}
                                  className="space-y-6">
                                  <div className="space-y-2">
                                    <Label
                                      htmlFor="status"
                                      className="block text-sm font-semibold text-gray-700">
                                      Status
                                    </Label>
                                    <Select
                                      value={editFormData.status}
                                      onValueChange={(
                                        value:
                                          | "new"
                                          | "contacted"
                                          | "qualified"
                                          | "proposal"
                                          | "closed"
                                      ) =>
                                        setEditFormData({
                                          ...editFormData,
                                          status: value,
                                        })
                                      }>
                                      <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 w-full">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent className="!bg-white">
                                        {statusOptions.map((option) => (
                                          <SelectItem
                                            key={option.value}
                                            value={option.value}>
                                            {option.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label
                                      htmlFor="notes"
                                      className="block text-sm font-semibold text-gray-700">
                                      Notes
                                    </Label>
                                    <Textarea
                                      value={editFormData.notes}
                                      onChange={(e) =>
                                        setEditFormData({
                                          ...editFormData,
                                          notes: e.target.value,
                                        })
                                      }
                                      placeholder="Add notes about this contact..."
                                      rows={4}
                                      className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                                    />
                                  </div>
                                  <div className="flex justify-end space-x-4">
                                    <Button
                                      type="button"
                                      onClick={() => setShowEditDialog(null)}
                                      className="text-white hover:text-black !w-auto px-4 bg-black hover:bg-transparent border border-black hover:border-black transition-colors duration-300">
                                      Cancel
                                    </Button>
                                    <Button
                                      type="submit"
                                      disabled={isUpdating}
                                      className="bg-blue-700 text-white hover:bg-blue-800 !w-auto px-4">
                                      {isUpdating ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                      ) : (
                                        "Update Contact"
                                      )}
                                    </Button>
                                  </div>
                                </form>
                              </DialogContent>
                            </Dialog>
                            <Button
                              size="sm"
                              className="!w-auto px-4 text-red-800 hover:text-hover bg-transparent"
                              onClick={() => handleDeleteContact(contact._id)}
                              disabled={isDeleting === contact._id}>
                              {isDeleting === contact._id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ContactsPage() {
  return <ContactsContent />;
}
