import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Search, Filter, Star, ExternalLink, Github, Calendar, Users, BarChart3 } from "lucide-react"
"use client"

import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/footer"
import { useInquiryForm } from "@/components/inquiry-form-provider"

const projects = [
  {
    id: 1,
    title: "AI-Powered Analytics Platform",
    description:
      "Revolutionary analytics platform that processes 10M+ data points daily, featuring real-time AI insights, predictive modeling, and automated reporting.",
    category: "AI/ML",
    tags: ["React", "Node.js", "Python", "TensorFlow", "AWS", "PostgreSQL"],
    image: "/placeholder.svg?height=300&width=500",
    featured: true,
    metrics: {
      efficiency: "340%",
      dataPoints: "10M+",
      uptime: "99.9%",
    },
    client: "TechCorp Enterprise",
    duration: "8 months",
    team: "12 developers",
    rating: 5.0,
    status: "Live",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    title: "Enterprise E-commerce Platform",
    description:
      "AI-powered e-commerce solution with smart recommendations, real-time inventory, and advanced analytics for global retail operations.",
    category: "E-commerce",
    tags: ["Next.js", "Stripe", "Redis", "MongoDB", "Docker"],
    image: "/placeholder.svg?height=300&width=500",
    featured: true,
    metrics: {
      performance: "95%",
      conversion: "23%",
      revenue: "$2.4M",
    },
    client: "GlobalShop Inc",
    duration: "6 months",
    team: "8 developers",
    rating: 4.9,
    status: "Live",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: 3,
    title: "Digital Banking Solution",
    description:
      "Secure banking platform with blockchain integration, real-time fraud detection, and AI-powered financial insights.",
    category: "FinTech",
    tags: ["React Native", "Blockchain", "Node.js", "PostgreSQL", "AWS"],
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
    metrics: {
      security: "99%",
      transactions: "1M+",
      users: "50K+",
    },
    client: "SecureBank Pro",
    duration: "12 months",
    team: "15 developers",
    rating: 4.8,
    status: "Live",
    color: "from-blue-600 to-purple-700",
  },
  {
    id: 4,
    title: "AI Healthcare Platform",
    description:
      "Comprehensive healthcare management with AI diagnostics, telemedicine, and patient monitoring systems.",
    category: "Healthcare",
    tags: ["Vue.js", "Python", "TensorFlow", "Docker", "PostgreSQL"],
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
    metrics: {
      accuracy: "98.7%",
      patients: "10K+",
      diagnoses: "50K+",
    },
    client: "MedTech Solutions",
    duration: "10 months",
    team: "10 developers",
    rating: 5.0,
    status: "Live",
    color: "from-rose-500 to-pink-600",
  },
  {
    id: 5,
    title: "Smart IoT Management System",
    description:
      "Comprehensive IoT platform for managing smart devices, real-time monitoring, and predictive maintenance.",
    category: "IoT",
    tags: ["React", "Node.js", "MongoDB", "MQTT", "AWS IoT"],
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
    metrics: {
      devices: "100K+",
      uptime: "99.8%",
      efficiency: "45%",
    },
    client: "SmartCity Corp",
    duration: "9 months",
    team: "11 developers",
    rating: 4.7,
    status: "Live",
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: 6,
    title: "Real Estate Management Platform",
    description:
      "Complete property management solution with virtual tours, AI-powered valuations, and automated workflows.",
    category: "Real Estate",
    tags: ["Next.js", "Three.js", "PostgreSQL", "Stripe", "AWS"],
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
    metrics: {
      properties: "25K+",
      users: "15K+",
      revenue: "$1.8M",
    },
    client: "PropertyPro Ltd",
    duration: "7 months",
    team: "9 developers",
    rating: 4.6,
    status: "Live",
    color: "from-orange-500 to-red-600",
  },
]

const categories = ["All", "AI/ML", "E-commerce", "FinTech", "Healthcare", "IoT", "Real Estate"]

export default function ProjectsPage() {
  const { openInquiryForm } = useInquiryForm()
  
  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image src="/images/metadots-logo.svg" alt="Metadots" width={140} height={32} className="h-8 w-auto" />
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="#" className="text-sm font-medium text-blue-600">
              Projects
            </Link>
            <Link href="/blogs" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Blog
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/careers" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Careers
            </Link>
          </nav>
                          <Button onClick={openInquiryForm} className="bg-blue-600 hover:bg-blue-700">Get a Quote</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl animate-ping delay-2000"></div>
        </div>

        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Content Side */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium shadow-lg animate-bounce-subtle">
                  <BarChart3 className="w-4 h-4 mr-2" aria-hidden="true" />
                  Our Portfolio
                </div>
                <h1 className="text-5xl font-bold tracking-tight sm:text-6xl text-white">
                  <span className="block">Transformative</span>
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Digital Solutions
                  </span>
                </h1>
                <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
                  Explore our comprehensive portfolio of cutting-edge projects that have revolutionized businesses
                  across industries. From AI-powered platforms to enterprise solutions.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-sm text-white/70">Projects Delivered</div>
                </div>
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-white">98%</div>
                  <div className="text-sm text-white/70">Client Satisfaction</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={openInquiryForm} className="bg-white text-slate-900 hover:bg-white/90 px-8 py-4 shadow-xl">
                  Explore Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={openInquiryForm}
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 bg-transparent"
                >
                  View Case Studies
                </Button>
              </div>
            </div>

            {/* Visual Side */}
            <div className="relative">
              <div className="relative">
                {/* Main Dashboard */}
                <div className="relative rounded-3xl bg-white/10 backdrop-blur-sm p-8 shadow-2xl border border-white/20">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-100"></div>
                        <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse delay-200"></div>
                      </div>
                      <Badge className="bg-white/20 text-white backdrop-blur-sm">Project Dashboard</Badge>
                    </div>

                    {/* Project Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white/80 text-sm">AI Platform</span>
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                        <div className="text-2xl font-bold text-white">94.7%</div>
                        <div className="text-xs text-white/60">Success Rate</div>
                      </div>

                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white/80 text-sm">E-commerce</span>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        </div>
                        <div className="text-2xl font-bold text-white">$2.4M</div>
                        <div className="text-xs text-white/60">Revenue Generated</div>
                      </div>
                    </div>

                    {/* Progress Bars */}
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-white/80 text-sm mb-1">
                          <span>Project Completion</span>
                          <span>87%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full"
                            style={{ width: "87%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-white/80 text-sm mb-1">
                          <span>Client Satisfaction</span>
                          <span>98%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full"
                            style={{ width: "98%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl shadow-xl flex items-center justify-center animate-float">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl shadow-xl flex items-center justify-center animate-float delay-1000">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-12 bg-white border-b">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input placeholder="Search projects..." className="pl-10 h-12 border-slate-200 focus:border-blue-500" />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  size="sm"
                  className={
                    category === "All" ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-50 hover:text-blue-600"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Sort */}
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              Sort by Latest
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Projects</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our most impactful and innovative solutions that have set new industry standards
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {projects
              .filter((project) => project.featured)
              .map((project) => (
                <Card
                  key={project.id}
                  className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] bg-white"
                >
                  <div className="relative">
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={500}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-white/90 text-slate-700">{project.category}</Badge>
                      {project.featured && (
                        <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">Featured</Badge>
                      )}
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center space-x-1 bg-white/90 rounded-full px-2 py-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">{project.rating}</span>
                      </div>
                    </div>
                  </div>

                  <CardHeader className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-3 group-hover:text-blue-600 transition-colors">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="text-base leading-relaxed mb-4">
                          {project.description}
                        </CardDescription>
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-blue-600">{value}</div>
                          <div className="text-xs text-slate-600 capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
                        </div>
                      ))}
                    </div>

                    {/* Project Info */}
                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{project.team}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{project.duration}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button onClick={openInquiryForm} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                        View Case Study
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Github className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">All Projects</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive showcase of our diverse portfolio across multiple industries and technologies
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white"
              >
                <div className="relative">
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={240}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge className={`bg-gradient-to-r ${project.color} text-white`}>{project.category}</Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="flex items-center space-x-1 bg-white/90 rounded-full px-2 py-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{project.rating}</span>
                    </div>
                  </div>
                </div>

                <CardHeader className="p-6">
                  <CardTitle className="text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </CardDescription>

                  {/* Quick Metrics */}
                  <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                    {Object.entries(project.metrics)
                      .slice(0, 3)
                      .map(([key, value]) => (
                        <div key={key} className="text-center p-2 bg-slate-50 rounded">
                          <div className="font-bold text-blue-600">{value}</div>
                          <div className="text-slate-600 capitalize">{key}</div>
                        </div>
                      ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full justify-between text-blue-600 hover:text-blue-700 hover:bg-blue-50 group/btn"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="px-8 bg-transparent">
              Load More Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="container">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white">Ready to Start Your Project?</h2>
            <p className="text-xl text-white/80 leading-relaxed">
              Let's discuss how we can transform your ideas into reality with cutting-edge technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={openInquiryForm} className="bg-white text-slate-900 hover:bg-white/90 px-8">
                Start a Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={openInquiryForm}
                className="border-white/30 text-white hover:bg-white/10 px-8 bg-transparent"
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
