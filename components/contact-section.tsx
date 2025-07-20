import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader } from "@/components/ui/card"
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
} from "lucide-react"

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg animate-bounce-subtle">
            <MessageSquare className="w-5 h-5 mr-2" aria-hidden="true" />
            Get in Touch
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block text-slate-900">Let's Build Something</span>
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
              Amazing Together
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your ideas into reality? Let's discuss your project and create something extraordinary.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Address Card (restored design) */}
            <Card className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white mb-6">
              <CardHeader className="p-6 flex items-start space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <MapPin className="h-7 w-7 text-white" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-slate-900 mb-1">Visit Our Office</h3>
                  <p className="text-slate-600 leading-relaxed">17 J3 Johar Town, Lahore 54000, Punjab - Pakistan</p>
                </div>
              </CardHeader>
            </Card>
            {/* Contact Info Card (phones and email) */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Contact Us</h2>
              <Card className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white">
                <CardHeader className="p-6 space-y-4">
                  {/* Phone UK */}
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                      <Phone className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <span className="text-slate-700 text-base">+44 7400 926311 <span className="text-xs text-slate-400 ml-2">Mon-Fri 9AM-6PM PKT</span></span>
                  </div>
                  {/* Phone US */}
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                      <Phone className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <span className="text-slate-700 text-base">+1 (585) 928-3494 <span className="text-xs text-slate-400 ml-2">Mon-Fri 9AM-6PM EST</span></span>
                  </div>
                  {/* Email */}
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <Mail className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <span className="text-slate-700 text-base">sales@metadots.co <span className="text-xs text-slate-400 ml-2">We reply within 24 hours</span></span>
                  </div>
                </CardHeader>
              </Card>
            </div>

            {/* Quick Stats */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-lg">
              <CardHeader className="p-6">
                <h3 className="font-semibold text-lg text-slate-900 mb-4">Why Choose Us?</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Response Time", value: "< 24hrs", icon: Clock },
                    { label: "Project Success", value: "98%", icon: CheckCircle },
                    { label: "Client Retention", value: "95%", icon: UserCheck },
                    { label: "On-Time Delivery", value: "100%", icon: Target },
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="flex justify-center mb-2">
                        <stat.icon className="w-6 h-6 text-blue-600" aria-hidden="true" />
                      </div>
                      <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                      <div className="text-sm text-slate-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Enhanced Contact Form */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-2xl bg-white relative overflow-hidden">
              {/* Form Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>

              <CardHeader className="relative z-10 p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Start Your Project</h3>
                  <p className="text-slate-600">Tell us about your vision and we'll make it happen</p>
                </div>

                <form className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">First Name *</label>
                      <Input
                        placeholder="John"
                        className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Last Name *</label>
                      <Input
                        placeholder="Doe"
                        className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Email & Company */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Email Address *</label>
                      <Input
                        type="email"
                        placeholder="john@company.com"
                        className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Company</label>
                      <Input
                        placeholder="Your Company"
                        className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Project Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Project Type *</label>
                    <select className="w-full h-12 px-3 border border-slate-200 rounded-md focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 bg-white">
                      <option>Select project type</option>
                      <option>Web Application</option>
                      <option>Mobile App</option>
                      <option>AI/ML Solution</option>
                      <option>E-commerce Platform</option>
                      <option>Custom Software</option>
                      <option>Consulting</option>
                    </select>
                  </div>

                  {/* Budget Range */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Budget Range</label>
                    <select className="w-full h-12 px-3 border border-slate-200 rounded-md focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 bg-white">
                      <option>Select budget range</option>
                      <option>$10K - $25K</option>
                      <option>$25K - $50K</option>
                      <option>$50K - $100K</option>
                      <option>$100K+</option>
                      <option>Let's discuss</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Project Details *</label>
                    <textarea
                      className="min-h-[120px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                      placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                    />
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="button"
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <MessageSquare className="mr-2 h-5 w-5" aria-hidden="true" />
                    Send Message
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Button>

                  <p className="text-center text-sm text-slate-500">
                    <Lock className="w-3 h-3 inline mr-1" aria-hidden="true" />
                    Your information is secure and will never be shared with third parties.
                  </p>
                </form>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
} 