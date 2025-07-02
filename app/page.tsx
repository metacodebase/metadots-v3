"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Code,
  Smartphone,
  Globe,
  BarChart3,
  Users,
  Zap,
  Star,
  Play,
  Calendar,
  ExternalLink,
  Menu,
  Database,
  Cloud,
  Container,
  GitBranch,
  Layers,
  Server,
  Shield,
  Workflow,
  Award,
  Rocket,
  MapPin,
  Phone,
  Mail,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  Lock,
  Heart,
  Settings,
  MessageSquare,
  Eye,
  Share2,
  UserCheck,
  Headphones,
  BookOpen,
  PenTool,
  Lightbulb,
  Atom,
  Triangle,
  Hexagon,
  Circle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/footer"

export default function MetadotsLanding() {
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
            <Link href="#services" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Services
            </Link>
            <Link href="#portfolio" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Portfolio
            </Link>
            <Link href="/projects" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
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
            <Link href="#contact" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button className="hidden md:inline-flex bg-blue-600 hover:bg-blue-700">Get a Quote</Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 md:py-32">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-ping delay-2000"></div>
        </div>

        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium shadow-lg animate-bounce-subtle">
                  <Zap className="w-4 h-4 mr-2" aria-hidden="true" />
                  Where Ideas Meet Reality
                </div>
                <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                  <span className="block text-slate-900">Transform Your</span>
                  <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                    Digital Vision
                  </span>
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
                  Empowering startups and enterprises with cutting-edge AI solutions, from LLM integrations to
                  intelligent automation. We don't just build software—we architect the future.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Start Building
                  <ArrowRight
                    className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="group text-lg px-8 py-4 border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  Watch Demo
                </Button>
              </div>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center group cursor-pointer">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                    500+
                  </div>
                  <div className="text-sm text-slate-600 font-medium">AI Projects</div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                    98%
                  </div>
                  <div className="text-sm text-slate-600 font-medium">Success Rate</div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                    24/7
                  </div>
                  <div className="text-sm text-slate-600 font-medium">AI Support</div>
                </div>
              </div>
            </div>

            {/* Enhanced Interactive Dashboard */}
            <div className="relative animate-fade-in-right">
              <div className="relative">
                {/* Main Dashboard */}
                <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-3xl blur-xl"></div>
                  <div className="relative space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-100"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-200"></div>
                      </div>
                      <Badge className="bg-white/20 text-white backdrop-blur-sm">AI Dashboard</Badge>
                    </div>

                    {/* AI Metrics Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white/80 text-sm">LLM Processing</span>
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                        <div className="text-2xl font-bold text-white group-hover:scale-105 transition-transform">
                          94.7%
                        </div>
                        <div className="text-xs text-white/60">Accuracy Rate</div>
                      </div>

                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white/80 text-sm">AI Models</span>
                          <Zap className="w-4 h-4 text-yellow-400 animate-pulse" aria-hidden="true" />
                        </div>
                        <div className="text-2xl font-bold text-white group-hover:scale-105 transition-transform">
                          12
                        </div>
                        <div className="text-xs text-white/60">Active Models</div>
                      </div>
                    </div>

                    {/* AI Visualization */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-white font-medium">Neural Network Activity</span>
                        <div className="flex space-x-1">
                          <div className="w-1 h-4 bg-blue-400 rounded animate-pulse"></div>
                          <div className="w-1 h-6 bg-indigo-400 rounded animate-pulse delay-100"></div>
                          <div className="w-1 h-3 bg-purple-400 rounded animate-pulse delay-200"></div>
                          <div className="w-1 h-5 bg-blue-400 rounded animate-pulse delay-300"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                          <span className="text-white/80 text-sm">GPT-4 Integration Active</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-ping delay-500"></div>
                          <span className="text-white/80 text-sm">Computer Vision Processing</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping delay-1000"></div>
                          <span className="text-white/80 text-sm">ML Pipeline Optimized</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl shadow-xl flex items-center justify-center animate-float">
                  <Code className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl shadow-xl flex items-center justify-center animate-float delay-1000">
                  <Smartphone className="w-6 w-6 text-white" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New "We Create Impact" Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="container relative z-10">
          <div className="text-center space-y-6 mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg animate-bounce-subtle">
              <BarChart3 className="w-5 h-5 mr-2" aria-hidden="true" />
              AI-Powered Innovation
            </div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block text-slate-900">We Create</span>
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                Intelligent Impact
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              From LLM integrations to computer vision, we're building the next generation of AI-powered solutions that
              transform how businesses operate, scale, and innovate.
            </p>
          </div>

          {/* AI Services Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {/* LLM Integration */}
            <Card className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10 p-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Zap className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <CardTitle className="text-2xl mb-4 group-hover:text-blue-600 transition-colors">
                  LLM Integration
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Seamlessly integrate GPT-4, Claude, and custom language models into your applications. From chatbots
                  to content generation, we make AI accessible and powerful.
                </CardDescription>
                <div className="mt-6 flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                  Explore LLM Solutions <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </div>
              </CardHeader>
            </Card>

            {/* Computer Vision */}
            <Card className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10 p-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Eye className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <CardTitle className="text-2xl mb-4 group-hover:text-purple-600 transition-colors">
                  Computer Vision
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Advanced image recognition, object detection, and visual AI solutions. Transform visual data into
                  actionable insights with cutting-edge ML models.
                </CardDescription>
                <div className="mt-6 flex items-center text-purple-600 font-medium group-hover:translate-x-2 transition-transform">
                  Discover Vision AI <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </div>
              </CardHeader>
            </Card>

            {/* Intelligent Automation */}
            <Card className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-green-50 to-emerald-50">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10 p-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Workflow className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <CardTitle className="text-2xl mb-4 group-hover:text-green-600 transition-colors">
                  Smart Automation
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Intelligent process automation that learns and adapts. Reduce manual work by 80% with AI-driven
                  workflows and decision engines.
                </CardDescription>
                <div className="mt-6 flex items-center text-green-600 font-medium group-hover:translate-x-2 transition-transform">
                  Automate Processes <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Interactive AI Demo Section */}
          <div className="relative">
            <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-3xl"></div>
              <div className="relative z-10 grid gap-8 lg:grid-cols-2 items-center">
                <div className="space-y-6">
                  <Badge className="bg-white/20 text-white backdrop-blur-sm px-4 py-2">Live AI Demo</Badge>
                  <h3 className="text-3xl font-bold text-white">Experience AI in Action</h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    See how our AI solutions process natural language, analyze data, and generate insights in real-time.
                    This isn't just a demo—it's a glimpse into the future of intelligent software.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="bg-white text-slate-900 hover:bg-white/90 font-medium px-6 py-3">
                      <Play className="mr-2 h-5 w-5" aria-hidden="true" />
                      Try Live Demo
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10 px-6 py-3 bg-transparent"
                    >
                      Schedule AI Consultation
                    </Button>
                  </div>
                </div>

                {/* AI Processing Visualization */}
                <div className="relative">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">AI Processing Pipeline</span>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-200"></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-400"></div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg animate-fade-in-up">
                          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-bold">1</span>
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium">Data Ingestion</div>
                            <div className="text-white/60 text-xs">Processing 1.2M tokens/sec</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg animate-fade-in-up delay-300">
                          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-bold">2</span>
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium">AI Analysis</div>
                            <div className="text-white/60 text-xs">Neural networks active</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg animate-fade-in-up delay-600">
                          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-bold">3</span>
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium">Intelligent Output</div>
                            <div className="text-white/60 text-xs">97.3% accuracy achieved</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Portfolio Highlights */}
      <section
        id="portfolio"
        className="py-20 md:py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-indigo-400 rounded-full animate-ping delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping delay-2000"></div>
        </div>

        <div className="container relative z-10">
          <div className="text-center space-y-6 mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg animate-bounce-subtle">
              <BarChart3 className="w-5 h-5 mr-2" aria-hidden="true" />
              Featured Work
            </div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block text-slate-900">Portfolio</span>
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                Highlights
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Discover our award-winning projects that have transformed businesses and set new industry standards
            </p>
          </div>

          {/* Featured Project - Large Card */}
          <div className="mb-16">
            <Card className="group relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:scale-[1.02] bg-gradient-to-br from-white to-blue-50/30">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative overflow-hidden">
                  <div className="aspect-[4/3] bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 relative">
                    {/* Animated Dashboard Mockup */}
                    <div className="absolute inset-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-100"></div>
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-200"></div>
                          </div>
                          <Badge className="bg-white/20 text-white backdrop-blur">Live Dashboard</Badge>
                        </div>

                        {/* Animated Charts */}
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-white/10 rounded-lg p-3 backdrop-blur">
                            <div className="text-white text-sm font-medium mb-2">Revenue</div>
                            <div className="text-white text-lg font-bold">$2.4M</div>
                            <div className="flex items-end space-x-1 mt-2">
                              {[40, 60, 30, 80, 50, 90, 70].map((height, i) => (
                                <div
                                  key={i}
                                  className="bg-green-400 rounded-sm animate-pulse"
                                  style={{
                                    width: "4px",
                                    height: `${height}%`,
                                    animationDelay: `${i * 200}ms`,
                                  }}
                                ></div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-white/10 rounded-lg p-3 backdrop-blur">
                            <div className="text-white text-sm font-medium mb-2">Users</div>
                            <div className="text-white text-lg font-bold">45.2K</div>
                            <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                              <div
                                className="bg-blue-400 h-2 rounded-full animate-pulse"
                                style={{ width: "78%" }}
                              ></div>
                            </div>
                          </div>
                          <div className="bg-white/10 rounded-lg p-3 backdrop-blur">
                            <div className="text-white text-sm font-medium mb-2">Growth</div>
                            <div className="text-white text-lg font-bold">+24%</div>
                            <div className="text-green-400 text-xs mt-1 animate-pulse flex items-center">
                              <TrendingUp className="w-3 h-3 mr-1" aria-hidden="true" />
                              +12% this month
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-xl flex items-center justify-center animate-float">
                      <Zap className="w-8 h-8 text-white" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-blue-100 text-blue-700 px-3 py-1">Featured Project</Badge>
                      <Badge className="bg-green-100 text-green-700 px-3 py-1">Award Winner</Badge>
                    </div>

                    <h3 className="text-3xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      AI-Powered Analytics Platform
                    </h3>

                    <p className="text-lg text-slate-600 leading-relaxed">
                      Revolutionary analytics platform that processes 10M+ data points daily, featuring real-time AI
                      insights, predictive modeling, and automated reporting. Increased client efficiency by 340%.
                    </p>

                    {/* Tech Stack */}
                    <div className="space-y-3">
                      <div className="text-sm font-medium text-slate-700">Technology Stack:</div>
                      <div className="flex flex-wrap gap-2">
                        {["React", "Node.js", "Python", "TensorFlow", "AWS", "PostgreSQL"].map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 py-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">340%</div>
                        <div className="text-sm text-slate-600">Efficiency Gain</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">10M+</div>
                        <div className="text-sm text-slate-600">Data Points/Day</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">99.9%</div>
                        <div className="text-sm text-slate-600">Uptime</div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300">
                        View Case Study
                        <ArrowRight
                          className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
                          aria-hidden="true"
                        />
                      </Button>
                      <Button
                        variant="outline"
                        className="border-slate-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 bg-transparent"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                        Live Demo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Project Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* E-commerce Project */}
            <Card className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 relative overflow-hidden">
                  {/* Animated E-commerce Interface */}
                  <div className="absolute inset-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-white text-sm font-medium">ShopFlow Pro</div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white/20 rounded p-2">
                          <div className="w-full h-8 bg-white/30 rounded mb-1"></div>
                          <div className="text-white text-xs">$299</div>
                        </div>
                        <div className="bg-white/20 rounded p-2">
                          <div className="w-full h-8 bg-white/30 rounded mb-1"></div>
                          <div className="text-white text-xs">$199</div>
                        </div>
                      </div>
                      <div className="bg-white/20 rounded p-2">
                        <div className="flex justify-between text-white text-xs">
                          <span>Sales Today</span>
                          <span className="animate-pulse">$12,450</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Cart Icon */}
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl shadow-lg flex items-center justify-center animate-bounce-subtle">
                    <Smartphone className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <div className="text-sm font-medium">E-commerce Platform</div>
                    <div className="text-xs opacity-80">Next.js • Stripe • AI Recommendations</div>
                  </div>
                </div>
              </div>

              <CardHeader className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-emerald-100 text-emerald-700">E-commerce</Badge>
                  <div className="flex items-center text-sm text-slate-500">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" aria-hidden="true" />
                    4.9
                  </div>
                </div>
                <CardTitle className="text-xl mb-3 group-hover:text-emerald-600 transition-colors">
                  Enterprise E-commerce Platform
                </CardTitle>
                <CardDescription className="text-base leading-relaxed mb-4">
                  AI-powered e-commerce solution with smart recommendations, real-time inventory, and advanced
                  analytics.
                </CardDescription>

                {/* Progress Indicators */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Performance</span>
                    <span className="text-emerald-600 font-medium">95%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-1000 group-hover:w-[95%]"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  className="w-full justify-between text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-300 group/btn"
                >
                  View Case Study
                  <ArrowRight
                    className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Button>
              </CardHeader>
            </Card>

            {/* FinTech Project */}
            <Card className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 relative overflow-hidden">
                  {/* Animated Banking Interface */}
                  <div className="absolute inset-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-white text-sm font-medium">SecureBank Pro</div>
                        <div className="flex space-x-1">
                          <div className="w-1 h-4 bg-blue-400 rounded animate-pulse"></div>
                          <div className="w-1 h-6 bg-indigo-400 rounded animate-pulse delay-100"></div>
                          <div className="w-1 h-3 bg-purple-400 rounded animate-pulse delay-200"></div>
                        </div>
                      </div>
                      <div className="bg-white/20 rounded p-3">
                        <div className="text-white text-lg font-bold">$1,234,567</div>
                        <div className="text-white/80 text-xs">Total Balance</div>
                        <div className="text-green-400 text-xs mt-1 animate-pulse">+$12,450 today</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white/10 rounded p-2 text-center">
                          <div className="text-white text-sm font-medium">Transfers</div>
                          <div className="text-white/80 text-xs">1,247</div>
                        </div>
                        <div className="bg-white/10 rounded p-2 text-center">
                          <div className="text-white text-sm font-medium">Security</div>
                          <div className="text-green-400 text-xs">100%</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-lg flex items-center justify-center animate-pulse">
                    <Shield className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                </div>
              </div>

              <CardHeader className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-blue-100 text-blue-700">FinTech</Badge>
                  <div className="flex items-center text-sm text-slate-500">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" aria-hidden="true" />
                    4.8
                  </div>
                </div>
                <CardTitle className="text-xl mb-3 group-hover:text-blue-600 transition-colors">
                  Digital Banking Solution
                </CardTitle>
                <CardDescription className="text-base leading-relaxed mb-4">
                  Secure banking platform with blockchain integration, real-time fraud detection, and AI-powered
                  insights.
                </CardDescription>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Security Score</span>
                    <span className="text-blue-600 font-medium">99%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-1000 group-hover:w-[99%]"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  className="w-full justify-between text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-300 group/btn"
                >
                  View Case Study
                  <ArrowRight
                    className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Button>
              </CardHeader>
            </Card>

            {/* Healthcare Project */}
            <Card className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600 relative overflow-hidden">
                  {/* Animated Healthcare Interface */}
                  <div className="absolute inset-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-white text-sm font-medium">HealthCare AI</div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white/20 rounded p-2">
                          <div className="text-white text-xs">Patients Today</div>
                          <div className="text-white text-lg font-bold animate-pulse">247</div>
                        </div>
                        <div className="bg-white/20 rounded p-2">
                          <div className="text-white text-xs">AI Diagnoses</div>
                          <div className="text-white text-lg font-bold animate-pulse">98.7%</div>
                        </div>
                      </div>
                      <div className="bg-white/10 rounded p-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-white/30 rounded-full"></div>
                          <div>
                            <div className="text-white text-xs">Dr. Sarah Johnson</div>
                            <div className="text-white/80 text-xs">Cardiology • Online</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Medical Cross */}
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl shadow-lg flex items-center justify-center animate-pulse">
                    <Heart className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                </div>
              </div>

              <CardHeader className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-rose-100 text-rose-700">Healthcare</Badge>
                  <div className="flex items-center text-sm text-slate-500">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" aria-hidden="true" />
                    5.0
                  </div>
                </div>
                <CardTitle className="text-xl mb-3 group-hover:text-rose-600 transition-colors">
                  AI Healthcare Platform
                </CardTitle>
                <CardDescription className="text-base leading-relaxed mb-4">
                  Comprehensive healthcare management with AI diagnostics, telemedicine, and patient monitoring systems.
                </CardDescription>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Accuracy Rate</span>
                    <span className="text-rose-600 font-medium">98.7%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full transition-all duration-1000 group-hover:w-[98.7%]"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  className="w-full justify-between text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-all duration-300 group/btn"
                >
                  View Case Study
                  <ArrowRight
                    className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Button>
              </CardHeader>
            </Card>
          </div>

          {/* View All Projects Button */}
          <div className="text-center mt-16">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4"
            >
              <BarChart3 className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" aria-hidden="true" />
              Explore All Projects
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Podcast & Blog Section */}
      <section
        id="blog"
        className="py-20 md:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container relative z-10">
          <div className="text-center space-y-6 mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg animate-bounce-subtle">
              <Play className="w-5 h-5 mr-2" aria-hidden="true" />
              Content & Insights
            </div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
              <span className="block">Podcast &</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                Blog Hub
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              Dive deep into the latest tech trends, AI innovations, and industry insights through our premium content
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Enhanced Podcast Section */}
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                  <Headphones className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-3xl font-bold text-white">Latest Episodes</h3>
              </div>

              {/* Featured Podcast Episode */}
              <Card className="group bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative">
                    {/* Audio Waveform Visualization */}
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <Badge className="bg-white/20 text-white backdrop-blur">Featured Episode</Badge>
                          <div className="text-white/80 text-sm">45 min</div>
                        </div>

                        {/* Animated Waveform */}
                        <div className="flex items-center space-x-1 mb-4">
                          {[...Array(40)].map((_, i) => (
                            <div
                              key={i}
                              className="bg-white/60 rounded-full animate-pulse"
                              style={{
                                width: "3px",
                                height: `${(i % 8) * 4 + 10}px`,
                                animationDelay: `${i * 50}ms`,
                                animationDuration: `${1000 + (i % 10) * 100}ms`,
                              }}
                            ></div>
                          ))}
                        </div>

                        {/* Audio Controls */}
                        <div className="flex items-center space-x-4">
                          <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur">
                            <Play className="w-4 h-4" aria-hidden="true" />
                            <span className="sr-only">Play episode</span>
                          </Button>
                          <div className="flex-1 bg-white/20 rounded-full h-2">
                            <div
                              className="bg-white h-2 rounded-full transition-all duration-300"
                              style={{ width: "35%" }}
                            ></div>
                          </div>
                          <div className="text-white/80 text-sm">15:42</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <CardTitle className="text-xl text-white mb-3 group-hover:text-purple-400 transition-colors">
                        The Future of AI in Business Transformation
                      </CardTitle>
                      <CardDescription className="text-white/70 mb-4 leading-relaxed">
                        Join our CEO as he discusses how artificial intelligence is revolutionizing business operations,
                        featuring insights from industry leaders and real-world case studies.
                      </CardDescription>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
                          <div>
                            <div className="text-white text-sm font-medium">Alex Johnson</div>
                            <div className="text-white/60 text-xs">CEO & Host</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-white/60 text-sm">
                          <Calendar className="w-4 h-4" aria-hidden="true" />
                          Dec 15, 2024
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Recent Episodes */}
              <div className="space-y-4">
                {[
                  {
                    title: "Building Scalable AI Systems",
                    duration: "38 min",
                    date: "Dec 8, 2024",
                    plays: "12.4K",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    title: "The Rise of No-Code Development",
                    duration: "42 min",
                    date: "Dec 1, 2024",
                    plays: "8.7K",
                    color: "from-green-500 to-emerald-500",
                  },
                ].map((episode, index) => (
                  <Card
                    key={index}
                    className="group bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <CardHeader className="flex flex-row items-center space-y-0 p-4">
                      <div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${episode.color} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shadow-lg`}
                      >
                        <Play className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg text-white group-hover:text-blue-400 transition-colors">
                          {episode.title}
                        </CardTitle>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-white/60">
                          <span>{episode.duration}</span>
                          <span>•</span>
                          <span>{episode.date}</span>
                          <span>•</span>
                          <span className="text-green-400">{episode.plays} plays</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
                        <Play className="w-4 h-4" aria-hidden="true" />
                        <span className="sr-only">Play episode</span>
                      </Button>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {/* Enhanced Blog Section */}
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-3xl font-bold text-white">Latest Articles</h3>
              </div>

              {/* Featured Blog Post */}
              <Card className="group bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 overflow-hidden">
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 relative overflow-hidden">
                    {/* Animated Code Editor */}
                    <div className="absolute inset-4 bg-black/40 backdrop-blur-sm rounded-lg border border-white/20 p-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                          <div className="text-white/60 text-xs ml-4">building-scalable-apps.tsx</div>
                        </div>
                        <div className="space-y-1 text-xs font-mono">
                          <div className="text-blue-300 animate-pulse">import React from 'react';</div>
                          <div className="text-green-300 animate-pulse delay-200">{"const ScalableApp = () => {"}</div>
                          <div className="text-yellow-300 animate-pulse delay-400">
                            {" "}
                            return {"<div>Hello World</div>"}
                          </div>
                          <div className="text-green-300 animate-pulse delay-600">{"}"}</div>
                        </div>
                      </div>
                    </div>

                    {/* Reading Time Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/20 text-white backdrop-blur">8 min read</Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge className="bg-blue-100 text-blue-700">Development</Badge>
                      <Badge className="bg-green-100 text-green-700">Featured</Badge>
                    </div>

                    <CardTitle className="text-xl text-white mb-3 group-hover:text-blue-400 transition-colors">
                      Building Scalable Web Applications with Modern Architecture
                    </CardTitle>

                    <CardDescription className="text-white/70 mb-4 leading-relaxed">
                      Discover the architectural patterns and best practices that enable applications to handle millions
                      of users while maintaining performance and reliability.
                    </CardDescription>

                    {/* Engagement Metrics */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-white/60">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                          <span>4.8</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" aria-hidden="true" />
                          <span>2.3K reads</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Share2 className="w-4 h-4" aria-hidden="true" />
                          <span>145 shares</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500"></div>
                        <div>
                          <div className="text-white text-sm font-medium">Sarah Chen</div>
                          <div className="text-white/60 text-xs">Senior Developer</div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-400 hover:text-blue-300 hover:bg-white/10 group/btn"
                      >
                        Read More
                        <ArrowRight
                          className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform"
                          aria-hidden="true"
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Recent Blog Posts */}
              <div className="space-y-4">
                {[
                  {
                    title: "The Rise of Cloud-Native Applications",
                    author: "Mike Rodriguez",
                    date: "Dec 5, 2024",
                    readTime: "6 min",
                    category: "Cloud",
                    color: "from-purple-500 to-pink-500",
                    engagement: "1.8K",
                  },
                  {
                    title: "AI-Powered Code Generation Tools",
                    author: "Emma Wilson",
                    date: "Nov 28, 2024",
                    readTime: "12 min",
                    category: "AI",
                    color: "from-orange-500 to-red-500",
                    engagement: "3.2K",
                  },
                ].map((post, index) => (
                  <Card
                    key={index}
                    className="group bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <CardHeader className="p-4">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-16 h-16 rounded-xl bg-gradient-to-br ${post.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}
                        >
                          <PenTool className="w-6 h-6 text-white" aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className="bg-white/20 text-white text-xs">{post.category}</Badge>
                            <span className="text-white/60 text-xs">{post.readTime} read</span>
                          </div>
                          <CardTitle className="text-lg text-white group-hover:text-blue-400 transition-colors mb-2">
                            {post.title}
                          </CardTitle>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-sm text-white/60">
                              <span>{post.author}</span>
                              <span>•</span>
                              <span>{post.date}</span>
                            </div>
                            <div className="text-green-400 text-sm">{post.engagement} reads</div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Newsletter Signup */}
          <div className="mt-20">
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 backdrop-blur-sm rounded-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl animate-pulse"></div>

              <Card className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 md:p-12 overflow-hidden">
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl opacity-20 animate-float"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl opacity-20 animate-float delay-1000"></div>

                <div className="relative z-10 text-center space-y-8">
                  <div className="space-y-4">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium shadow-lg animate-bounce-subtle">
                      <Users className="w-4 h-4 mr-2" aria-hidden="true" />
                      Join 10K+ Subscribers
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white">Stay Ahead of the Curve</h3>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
                      Get exclusive insights, cutting-edge tutorials, and industry secrets delivered to your inbox
                      weekly. Join the elite circle of tech innovators.
                    </p>
                  </div>

                  <div className="max-w-lg mx-auto">
                    <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                      <Input
                        placeholder="Enter your email address"
                        className="flex-1 bg-white/20 border-0 text-white placeholder:text-white/60 backdrop-blur-sm rounded-xl h-12 px-4 focus:ring-2 focus:ring-white/30"
                      />
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg rounded-xl px-8 h-12 font-medium transition-all duration-300 transform hover:scale-105">
                        Subscribe Now
                        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                    <p className="text-white/60 text-sm mt-3">
                      <Lock className="w-3 h-3 inline mr-1" aria-hidden="true" />
                      No spam, unsubscribe anytime. Join 10,000+ developers already subscribed.
                    </p>
                  </div>

                  {/* Social Proof */}
                  <div className="flex items-center justify-center space-x-8 pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">10K+</div>
                      <div className="text-white/60 text-sm">Subscribers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">98%</div>
                      <div className="text-white/60 text-sm">Open Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">Weekly</div>
                      <div className="text-white/60 text-sm">Updates</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Client Testimonials */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container relative z-10">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg animate-bounce-subtle">
              <Star className="w-5 h-5 mr-2" aria-hidden="true" />
              Client Success Stories
            </div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block text-slate-900">What Our</span>
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                Clients Say
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it - hear from our satisfied clients about their transformative experiences
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO, TechCorp",
                content:
                  "Metadots transformed our digital presence completely. Their team's expertise and dedication exceeded our expectations. The AI solutions they implemented increased our efficiency by 300%.",
                rating: 5,
                avatar: "SJ",
                color: "from-blue-500 to-indigo-600",
                delay: "0",
              },
              {
                name: "Michael Chen",
                role: "Founder, StartupXYZ",
                content:
                  "The mobile app they developed for us has significantly improved our customer engagement and business growth. ROI increased by 250% within the first quarter.",
                rating: 5,
                avatar: "MC",
                color: "from-purple-500 to-pink-600",
                delay: "200",
              },
              {
                name: "Emily Rodriguez",
                role: "CTO, InnovateLab",
                content:
                  "Professional, reliable, and innovative. Metadots delivered exactly what we needed on time and within budget. Their AI integration saved us 40 hours per week.",
                rating: 5,
                avatar: "ER",
                color: "from-green-500 to-emerald-600",
                delay: "400",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="group bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${testimonial.delay}ms` }}
              >
                <CardHeader className="p-8">
                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400 animate-pulse"
                        style={{ animationDelay: `${i * 100}ms` }}
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative mb-6">
                    <div className="absolute -top-2 -left-2 text-6xl text-blue-100 font-serif">"</div>
                    <CardDescription className="text-base leading-relaxed text-slate-700 relative z-10 italic">
                      {testimonial.content}
                    </CardDescription>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${testimonial.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <span className="text-white font-bold text-lg">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-lg">{testimonial.name}</div>
                      <div className="text-slate-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Client Logos Carousel */}
          <div className="text-center space-y-8">
            <h3 className="text-xl font-semibold text-slate-700">Trusted by industry leaders</h3>
            <div className="flex items-center justify-center space-x-12 opacity-60">
              {["TechCorp", "StartupXYZ", "InnovateLab", "FutureAI", "CloudTech"].map((company, index) => (
                <div
                  key={company}
                  className="text-2xl font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer transform hover:scale-110 duration-300"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Technology Stack */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="container">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg animate-bounce-subtle">
              <Code className="w-5 h-5 mr-2" aria-hidden="true" />
              Technology Stack
            </div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block text-slate-900">Cutting-Edge</span>
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                Technologies
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We leverage the most advanced tools and frameworks to build robust, scalable, and future-proof solutions
            </p>
          </div>

          {/* Technology Categories */}
          <div className="space-y-12">
            {/* Frontend Technologies */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center text-slate-800">Frontend & Mobile</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  { name: "React", icon: Atom, color: "from-blue-400 to-blue-600" },
                  { name: "Next.js", icon: Triangle, color: "from-slate-700 to-slate-900" },
                  { name: "TypeScript", icon: Code, color: "from-blue-500 to-blue-700" },
                  { name: "Flutter", icon: Lightbulb, color: "from-blue-300 to-blue-500" },
                  { name: "React Native", icon: Smartphone, color: "from-purple-400 to-purple-600" },
                  { name: "Vue.js", icon: Hexagon, color: "from-green-400 to-green-600" },
                ].map((tech, index) => (
                  <Card
                    key={tech.name}
                    className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 bg-white animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>
                    <CardHeader className="p-6 text-center relative z-10">
                      <div className="mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                        <tech.icon
                          className="w-10 h-10 text-slate-600 group-hover:text-blue-600 transition-colors"
                          aria-hidden="true"
                        />
                      </div>
                      <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {tech.name}
                      </h4>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {/* Backend Technologies */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center text-slate-800">Backend & Database</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  { name: "Node.js", icon: Circle, color: "from-green-500 to-green-700" },
                  { name: "Python", icon: Code, color: "from-yellow-400 to-yellow-600" },
                  { name: "PostgreSQL", icon: Database, color: "from-blue-600 to-blue-800" },
                  { name: "MongoDB", icon: Database, color: "from-green-600 to-green-800" },
                  { name: "Redis", icon: Server, color: "from-red-500 to-red-700" },
                  { name: "GraphQL", icon: Hexagon, color: "from-pink-500 to-pink-700" },
                ].map((tech, index) => (
                  <Card
                    key={tech.name}
                    className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 bg-white animate-fade-in-up"
                    style={{ animationDelay: `${index * 100 + 600}ms` }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>
                    <CardHeader className="p-6 text-center relative z-10">
                      <div className="mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                        <tech.icon
                          className="w-10 h-10 text-slate-600 group-hover:text-blue-600 transition-colors"
                          aria-hidden="true"
                        />
                      </div>
                      <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {tech.name}
                      </h4>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {/* Cloud & DevOps */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center text-slate-800">Cloud & DevOps</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  { name: "AWS", icon: Cloud, color: "from-orange-400 to-orange-600" },
                  { name: "Docker", icon: Container, color: "from-blue-400 to-blue-600" },
                  { name: "Kubernetes", icon: Settings, color: "from-blue-600 to-blue-800" },
                  { name: "Vercel", icon: Triangle, color: "from-slate-800 to-slate-900" },
                  { name: "GitHub", icon: GitBranch, color: "from-gray-700 to-gray-900" },
                  { name: "Terraform", icon: Layers, color: "from-purple-500 to-purple-700" },
                ].map((tech, index) => (
                  <Card
                    key={tech.name}
                    className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 bg-white animate-fade-in-up"
                    style={{ animationDelay: `${index * 100 + 1200}ms` }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>
                    <CardHeader className="p-6 text-center relative z-10">
                      <div className="mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                        <tech.icon
                          className="w-10 h-10 text-slate-600 group-hover:text-blue-600 transition-colors"
                          aria-hidden="true"
                        />
                      </div>
                      <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {tech.name}
                      </h4>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced About Section - Service Offerings */}
      <section
        id="about"
        className="py-20 md:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container relative z-10">
          <div className="text-center space-y-6 mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg animate-bounce-subtle">
              <Users className="w-5 h-5 mr-2" aria-hidden="true" />
              How We Work
            </div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
              <span className="block">Innovating the Future</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                of Technology
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              Choose the perfect engagement model that fits your project needs and business goals
            </p>
          </div>

          {/* Service Models */}
          <div className="grid gap-8 lg:grid-cols-3 mb-16">
            {/* Dedicated Team */}
            <Card className="group bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105">
              <CardHeader className="p-8 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users className="h-10 w-10 text-white" aria-hidden="true" />
                </div>
                <CardTitle className="text-2xl text-white mb-4 group-hover:text-blue-400 transition-colors">
                  Dedicated Team
                </CardTitle>
                <CardDescription className="text-white/70 text-base leading-relaxed mb-6">
                  Get a full-stack team of experts dedicated exclusively to your project. Perfect for long-term
                  partnerships and complex enterprise solutions.
                </CardDescription>

                {/* Features */}
                <div className="space-y-3 text-left">
                  {[
                    "Full-time dedicated developers",
                    "Direct communication channels",
                    "Flexible team scaling",
                    "Long-term partnership focus",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                        style={{ animationDelay: `${index * 200}ms` }}
                      ></div>
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </CardHeader>
            </Card>

            {/* Fixed Price Projects */}
            <Card className="group bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105">
              <CardHeader className="p-8 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Target className="h-10 w-10 text-white" aria-hidden="true" />
                </div>
                <CardTitle className="text-2xl text-white mb-4 group-hover:text-green-400 transition-colors">
                  Fixed Price Projects
                </CardTitle>
                <CardDescription className="text-white/70 text-base leading-relaxed mb-6">
                  Well-defined projects with clear scope and deliverables. Ideal for startups and businesses with
                  specific requirements and budget constraints.
                </CardDescription>

                {/* Features */}
                <div className="space-y-3 text-left">
                  {[
                    "Clear project scope & timeline",
                    "Fixed budget with no surprises",
                    "Milestone-based delivery",
                    "Quality assurance included",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div
                        className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                        style={{ animationDelay: `${index * 200}ms` }}
                      ></div>
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                  Get Quote
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </CardHeader>
            </Card>

            {/* Consulting & Strategy */}
            <Card className="group bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105">
              <CardHeader className="p-8 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Lightbulb className="h-10 w-10 text-white" aria-hidden="true" />
                </div>
                <CardTitle className="text-2xl text-white mb-4 group-hover:text-purple-400 transition-colors">
                  Consulting & Strategy
                </CardTitle>
                <CardDescription className="text-white/70 text-base leading-relaxed mb-6">
                  Strategic guidance and technical consulting to help you make informed decisions about your technology
                  roadmap and digital transformation.
                </CardDescription>

                {/* Features */}
                <div className="space-y-3 text-left">
                  {[
                    "Technology roadmap planning",
                    "Architecture design & review",
                    "Performance optimization",
                    "Digital transformation strategy",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                        style={{ animationDelay: `${index * 200}ms` }}
                      ></div>
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  Book Consultation
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </CardHeader>
            </Card>
          </div>

          {/* Company Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10+", label: "Years Experience", icon: Award },
              { number: "500+", label: "Projects Delivered", icon: Rocket },
              { number: "50+", label: "Expert Developers", icon: Users },
              { number: "25+", label: "Countries Served", icon: Globe },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="mb-2 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  <stat.icon
                    className="w-10 h-10 text-white/80 group-hover:text-blue-400 transition-colors"
                    aria-hidden="true"
                  />
                </div>
                <div className="text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {stat.number}
                </div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
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
              <div className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    title: "Visit Our Office",
                    content: "123 Business District\nTech City, TC 12345",
                    color: "from-blue-500 to-blue-600",
                  },
                  {
                    icon: Phone,
                    title: "Call Us",
                    content: "+1 (555) 123-4567\nMon-Fri 9AM-6PM EST",
                    color: "from-green-500 to-green-600",
                  },
                  {
                    icon: Mail,
                    title: "Email Us",
                    content: "hello@metadots.co\nWe reply within 24 hours",
                    color: "from-purple-500 to-purple-600",
                  },
                ].map((contact, index) => (
                  <Card
                    key={index}
                    className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white"
                  >
                    <CardHeader className="p-6">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${contact.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <contact.icon className="h-7 w-7 text-white" aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {contact.title}
                          </h3>
                          <p className="text-slate-600 whitespace-pre-line leading-relaxed">{contact.content}</p>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
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

      <Footer />
    </div>
  )
}
