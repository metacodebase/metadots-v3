"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader } from "@/components/ui/card";
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  UserCheck,
  Target,
  MessageSquare,
  Lock,
  Loader2,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select } from "antd";

export default function ContactSection() {
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
  const projectTypeOptions = [
    { value: "Web Application", label: "Web Application" },
    { value: "Mobile App", label: "Mobile App" },
    { value: "AI/ML Solution", label: "AI/ML Solution" },
    { value: "E-commerce Platform", label: "E-commerce Platform" },
    { value: "Custom Software", label: "Custom Software" },
    { value: "Consulting", label: "Consulting" },
  ];

  // Budget Range options
  const budgetRangeOptions = [
    { value: "$10K - $25K", label: "$10K - $25K" },
    { value: "$25K - $50K", label: "$25K - $50K" },
    { value: "$50K - $100K", label: "$50K - $100K" },
    { value: "$100K+", label: "$100K+" },
    { value: "Let's discuss", label: "Let's discuss" },
  ];

  // Handle change for Project Type
  const handleProjectTypeChange = (value: string) => {
    handleInputChange({
      target: {
        name: "projectType",
        value: value,
      },
    } as React.ChangeEvent<HTMLSelectElement>);
  };

  // Handle change for Budget Range
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
          source:
            window.location.pathname === "/" ? "homepage" : "contact-page",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Show success page
        setSubmittedName(formData.firstName);
        setShowSuccess(true);

        // Reset form
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
    <section
      id="contact"
      className="relative overflow-hidden bg-slate-50 py-20 md:py-32">
      <div className="container">
        <div className="mb-16 space-y-6 text-center">
          <div className="inline-flex items-center rounded-full bg-blue-100 px-6 py-3 text-sm font-medium text-blue-800 ring-1 ring-inset ring-blue-200">
            <MessageSquare className="mr-2 h-5 w-5" aria-hidden="true" />
            Get in Touch
          </div>
          <h2 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            <span className="block">Let's Build Something</span>
            <span className="mt-1 block text-blue-700">Amazing Together</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600">
            Ready to transform your ideas into reality? Let's discuss your
            project and create something extraordinary.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <div className="space-y-8 lg:col-span-2">
            {/* Address Card (restored design) */}
            <Card className="mb-6 bg-white shadow-sm">
              <CardHeader className="p-6 flex items-start space-x-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <MapPin className="h-7 w-7" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-slate-900 mb-1">
                    Visit Our Office
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    17 J3 Johar Town, Lahore 54000, Punjab - Pakistan
                  </p>
                </div>
              </CardHeader>
            </Card>
            {/* Contact Info Card (phones and email) */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Contact Us
              </h2>
              <Card className="bg-white shadow-sm">
                <CardHeader className="p-6 space-y-4">
                  {/* Phone UK */}
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <Phone
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-slate-700 text-base">
                      +44 7400 926311{" "}
                      {/* <span className="text-xs text-slate-400 ml-2">
                        Mon-Fri 9AM-6PM PKT
                      </span> */}
                    </span>
                  </div>
                  {/* Phone US */}
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <Phone
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-slate-700 text-base">
                      +1 (585) 928-3494{" "}
                      {/* <span className="text-xs text-slate-400 ml-2">
                        Mon-Fri 9AM-6PM EST
                      </span> */}
                    </span>
                  </div>
                  {/* Email */}
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="text-slate-700 text-base">
                      sales@metadots.co{" "}
                      <span className="text-xs text-slate-400 ml-2">
                        We reply within 1 hour
                      </span>
                    </span>
                  </div>
                </CardHeader>
              </Card>
            </div>

            {/* Quick Stats */}
            <Card className="border border-slate-200 bg-white shadow-sm">
              <CardHeader className="p-6">
                <h3 className="font-semibold text-lg text-slate-900 mb-4">
                  Why Choose Us?
                </h3>
                  <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Response Time", value: "1 hour", icon: Clock },
                    {
                      label: "Project Success",
                      value: "98%",
                      icon: CheckCircle,
                    },
                    {
                      label: "Client Retention",
                      value: "95%",
                      icon: UserCheck,
                    },
                    { label: "On-Time Delivery", value: "100%", icon: Target },
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="flex justify-center mb-2">
                        <stat.icon
                          className="w-6 h-6 text-blue-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        {stat.value}
                      </div>
                      <div className="text-sm text-slate-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Enhanced Contact Form */}
          <div className="lg:col-span-3">
            <Card className="relative overflow-hidden bg-white shadow-md">
              <CardHeader className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Start Your Project
                  </h3>
                  <p className="text-slate-600">
                    Tell us about your vision and we'll make it happen
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">
                        First Name *
                      </label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
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
                        placeholder="Doe"
                        className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Email & Company */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">
                        Email Address *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@company.com"
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

                  {/* Project Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Project Type *
                    </label>
                    <Select
                      className="custom-antd-select"
                      placeholder="Select project type"
                      value={formData.projectType || undefined}
                      onChange={handleProjectTypeChange}
                      options={projectTypeOptions}
                      style={{ width: "100%" }}
                      size="large"
                    />
                  </div>

                  {/* Budget Range */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Budget Range
                    </label>
                    <Select
                      className="custom-antd-select"
                      placeholder="Select budget range"
                      value={formData.budgetRange || undefined}
                      onChange={handleBudgetRangeChange}
                      options={budgetRangeOptions}
                      style={{ width: "100%" }}
                      size="large"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Project Details *
                    </label>
                    <textarea
                      name="projectDetails"
                      value={formData.projectDetails}
                      onChange={handleInputChange}
                      className="min-h-[120px] w-full rounded-md border border-slate-200 text-black bg-white px-3 py-2 outline-none  text-sm focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                      placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                      required
                    />
                  </div>

                  {/* Submit Button */}
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
                        Send Message
                        <ArrowRight
                          className="ml-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Button>

                  <p className="text-center text-sm text-slate-500">
                    <Lock className="w-3 h-3 inline mr-1" aria-hidden="true" />
                    Your information is secure and will never be shared with
                    third parties.
                  </p>
                </form>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors z-10"
              aria-label="Close">
              <X className="w-5 h-5 text-slate-500" />
            </button>

            {/* Success Content */}
            <div className="p-8 md:p-12">
              {/* Success Icon */}
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-emerald-100 p-6">
                  <CheckCircle className="h-16 w-16 text-emerald-600" />
                </div>
              </div>

              {/* Success Message */}
              <div className="text-center space-y-4 mb-8">
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
                  Thank You, {submittedName}! 🎉
                </h3>
                <p className="text-lg text-slate-600 max-w-md mx-auto">
                  We've received your message and are excited about the possibility of working with you!
                </p>
              </div>

              {/* What Happens Next */}
              <div className="mb-8 rounded-xl border border-blue-100 bg-blue-50 p-6">
                <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  What happens next?
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  Our team will review your project details and get back to you within <strong>24-48 hours</strong>. 
                  We're committed to providing you with the best solution for your needs.
                </p>
              </div>

              {/* Email Confirmation */}
              <div className="mb-8 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-600 text-center">
                  <Mail className="w-4 h-4 inline mr-1" />
                  We've also sent a confirmation email to your inbox. Please check your email for more details.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => setShowSuccess(false)}
                  className="px-8 py-6 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm">
                  Got it, thanks!
                </Button>
                <Button
                  onClick={() => {
                    setShowSuccess(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  variant="outline"
                  className="px-8 py-6 text-lg font-semibold border-2 hover:bg-slate-50">
                  Back to Home
                </Button>
              </div>
            </div>

            {/* Decorative Bottom */}
            <div className="h-1 bg-blue-600"></div>
          </div>
        </div>
      )}
    </section>
  );
}
