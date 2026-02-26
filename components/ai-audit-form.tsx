"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  MessageSquare,
  Lock,
  Loader2,
  Mail,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select } from "antd";

export default function AiAuditFormCard() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    projectType: "",
    budgetRange: "",
    projectDetails: "",
  });

  const auditFocusOptions = [
    { value: "Revenue Optimization", label: "Revenue Optimization" },
    { value: "Operations Automation", label: "Operations Automation" },
    { value: "Customer Support AI", label: "Customer Support AI" },
    { value: "Pricing Intelligence", label: "Pricing Intelligence" },
    { value: "Forecasting & Demand", label: "Forecasting & Demand" },
    { value: "Data Strategy", label: "Data Strategy" },
  ];

  const budgetRangeOptions = [
    { value: "$10K - $25K", label: "$10K - $25K" },
    { value: "$25K - $50K", label: "$25K - $50K" },
    { value: "$50K - $100K", label: "$50K - $100K" },
    { value: "$100K+", label: "$100K+" },
    { value: "Let's discuss", label: "Let's discuss" },
  ];

  const handleProjectTypeChange = (value: string) => {
    handleInputChange({
      target: {
        name: "projectType",
        value: value,
      },
    } as React.ChangeEvent<HTMLSelectElement>);
  };

  const handleBudgetRangeChange = (value: string) => {
    handleInputChange({
      target: {
        name: "budgetRange",
        value: value,
      },
    } as React.ChangeEvent<HTMLSelectElement>);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.projectType ||
      !formData.projectDetails
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          source: "ai-audit",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmittedName(formData.firstName);
        setShowSuccess(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          company: "",
          projectType: "",
          budgetRange: "",
          projectDetails: "",
        });
      } else {
        throw new Error(data.error || "Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Card className="relative overflow-hidden bg-white shadow-md">
        <CardHeader className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Book Your Free AI Audit
            </h3>
            <p className="text-slate-600">
              Tell us what you want to improve and we will map the highest
              impact AI opportunities.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  First Name *
                </label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Jordan"
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Last Name *
                </label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Lee"
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Work Email *
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="jordan@company.com"
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Company
                </label>
                <Input
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Your Company"
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Audit Focus *
              </label>
              <Select
                className="custom-antd-select"
                placeholder="Select primary focus"
                value={formData.projectType || undefined}
                onChange={handleProjectTypeChange}
                options={auditFocusOptions}
                style={{ width: "100%" }}
                size="large"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Planned AI Investment
              </label>
              <Select
                className="custom-antd-select"
                placeholder="Select investment range"
                value={formData.budgetRange || undefined}
                onChange={handleBudgetRangeChange}
                options={budgetRangeOptions}
                style={{ width: "100%" }}
                size="large"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Goals and Current Workflow *
              </label>
              <textarea
                name="projectDetails"
                value={formData.projectDetails}
                onChange={handleInputChange}
                className="min-h-[120px] w-full rounded-md border border-slate-200 text-black bg-white px-3 py-2 outline-none text-sm focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                placeholder="Share your goals, key systems, and any repetitive tasks you want automated..."
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full bg-blue-600 text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
              {isSubmitting ? (
                <>
                  <Loader2
                    className="mr-2 h-5 w-5 animate-spin"
                    aria-hidden="true"
                  />
                  Sending...
                </>
              ) : (
                <>
                  <MessageSquare
                    className="mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  Request AI Audit
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </>
              )}
            </Button>

            <p className="text-center text-sm text-slate-500">
              <Lock className="w-3 h-3 inline mr-1" aria-hidden="true" />
              Your information is secure and will never be shared with third
              parties.
            </p>
          </form>
        </CardHeader>
      </Card>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors z-10"
              aria-label="Close">
              <X className="w-5 h-5 text-slate-500" />
            </button>

            <div className="p-8 md:p-12">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-emerald-100 p-6">
                  <CheckCircle className="h-16 w-16 text-emerald-600" />
                </div>
              </div>

              <div className="text-center space-y-4 mb-8">
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
                  Thank you, {submittedName}!
                </h3>
                <p className="text-lg text-slate-600 max-w-md mx-auto">
                  Your AI audit request is in. We are reviewing your details and
                  will schedule a discovery call shortly.
                </p>
              </div>

              <div className="mb-8 rounded-xl border border-blue-100 bg-blue-50 p-6">
                <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  What happens next?
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  We will confirm a short discovery call within
                  <strong> 24-48 hours</strong>. After the call, you will receive
                  a tailored AI audit report with ROI projections and a clear
                  implementation plan.
                </p>
              </div>

              <div className="mb-8 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-600 text-center">
                  <Mail className="w-4 h-4 inline mr-1" />
                  You will receive a confirmation email with next steps.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => setShowSuccess(false)}
                  className="px-8 py-6 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm">
                  Got it
                </Button>
                <Button
                  onClick={() => {
                    setShowSuccess(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  variant="outline"
                  className="px-8 py-6 text-lg font-semibold border-2 hover:bg-slate-50">
                  Back to Top
                </Button>
              </div>
            </div>

            <div className="h-1 bg-blue-600"></div>
          </div>
        </div>
      )}
    </>
  );
}
