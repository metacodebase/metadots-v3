"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Send, User, Mail, Phone, Building, Globe, MessageSquare, ArrowRight } from "lucide-react"

interface InquiryFormProps {
  isOpen: boolean
  onClose: () => void
}

export default function InquiryForm({ isOpen, onClose }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      company: "",
      website: "",
      message: "",
    })
    
    setIsSubmitting(false)
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Right-side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full z-[60] bg-white shadow-2xl transition-transform duration-300 ease-in-out flex flex-col
          w-full max-w-none md:max-w-[70vw]
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
        style={{ width: '100vw', maxWidth: '70vw' }}
      >
        <div className="relative flex-1 flex flex-col overflow-y-auto">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 hover:bg-slate-200 rounded-full w-10 h-10"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Header */}
          <div className="relative p-8 pb-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium shadow-lg">
                <MessageSquare className="w-4 h-4 mr-2" />
                Let's Build Something Amazing
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Project Inquiry</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Tell us about your vision and we'll help you bring it to life with cutting-edge technology solutions
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information - 2 columns */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-900 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-3">
                    <Label htmlFor="fullName" className="text-sm font-medium text-slate-700">
                      Full Name *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="pl-12 h-14 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 text-base"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                      Email Address *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                        className="pl-12 h-14 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 text-base"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information - 2 columns */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-900 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-blue-600" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
                      Phone Number *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="pl-12 h-14 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 text-base"
                      />
                    </div>
                  </div>

                  {/* Website */}
                  <div className="space-y-3">
                    <Label htmlFor="website" className="text-sm font-medium text-slate-700">
                      Website <span className="text-slate-400">(Optional)</span>
                    </Label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        id="website"
                        name="website"
                        type="url"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="https://yourwebsite.com"
                        className="pl-12 h-14 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 text-base"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Information - Full width */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-900 flex items-center">
                  <Building className="w-5 h-5 mr-2 text-blue-600" />
                  Company Information
                </h3>
                <div className="space-y-3">
                  <Label htmlFor="company" className="text-sm font-medium text-slate-700">
                    Company Name *
                  </Label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Enter your company name"
                      className="pl-12 h-14 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 text-base"
                    />
                  </div>
                </div>
              </div>

              {/* Project Details - Full width */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-900 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
                  Project Details
                </h3>
                <div className="space-y-3">
                  <Label htmlFor="message" className="text-sm font-medium text-slate-700">
                    Tell us about your project *
                  </Label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Describe your project goals, timeline, budget, technical requirements, and any specific features you need..."
                      className="pl-12 min-h-[160px] bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 resize-none text-base leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-16 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Sending Your Inquiry...
                    </>
                  ) : (
                    <>
                      <Send className="mr-3 h-5 w-5" />
                      Send Project Inquiry
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Trust Indicators */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-slate-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <span>24h Response Time</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                  <span>Free Consultation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 