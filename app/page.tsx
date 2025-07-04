import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { connectMongo } from "@/lib/mongodb"
import Project from "@/models/Project"
import CaseStudy from "@/models/CaseStudy"
import Podcast from "@/models/Podcast"
import Blog from "@/models/Blog"
import Review from "@/models/Review"
import FeaturedProject from "@/components/FeaturedProject"
import ProjectCard from "@/components/ProjectCard"
import CaseStudyCard from "@/components/CaseStudyCard"
import PodcastToggleWrapper from "@/components/PodcastToggleWrapper"
import BlogToggleWrapper from "@/components/BlogToggleWrapper"
import FeaturedPodcast from "@/components/FeaturedPodcast"
import FeaturedBlog from "@/components/FeaturedBlog"
import PodcastCard from "@/components/PodcastCard"
import BlogCard from "@/components/BlogCard"
import FeaturedReviews from "@/components/FeaturedReviews"
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

async function getData() {
  try {
    await connectMongo()
    
    // Get featured project
    const featuredProject = await Project.findOne({ featured: true, status: "published" })
    
    // Get 3 featured case studies
    const featuredCaseStudies = await CaseStudy.find({ featured: true, status: "published" }).limit(3)
    
    // Get 3 featured podcasts
    const featuredPodcasts = await Podcast.find({ featured: true, status: "published" }).limit(3)
    
    // Get 3 featured blogs
    const featuredBlogs = await Blog.find({ featured: true, status: "published" }).limit(3)
    
    // Get 3 featured reviews
    const featuredReviews = await Review.find({ featured: true, status: "published" }).limit(3)
    
    return {
      featuredProject: featuredProject ? JSON.parse(JSON.stringify(featuredProject)) : null,
      featuredCaseStudies: featuredCaseStudies ? JSON.parse(JSON.stringify(featuredCaseStudies)) : [],
      featuredPodcasts: featuredPodcasts ? JSON.parse(JSON.stringify(featuredPodcasts)) : [],
      featuredBlogs: featuredBlogs ? JSON.parse(JSON.stringify(featuredBlogs)) : [],
      featuredReviews: featuredReviews ? JSON.parse(JSON.stringify(featuredReviews)) : []
    }
  } catch (error) {
    console.error('Error fetching data for homepage:', error);
    // Return empty data instead of failing the entire page
    return {
      featuredProject: null,
      featuredCaseStudies: [],
      featuredPodcasts: [],
      featuredBlogs: [],
      featuredReviews: []
    }
  }
}

export default async function MetadotsLanding() {
  const { featuredProject, featuredCaseStudies, featuredPodcasts, featuredBlogs, featuredReviews } = await getData()
  
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
                  Free AI Audit
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
              <span className="block text-slate-900">Deep Domain Expertise</span>
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                in Leading Industries
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              From LLM integrations to computer vision, we're building the next generation of AI-powered solutions that
              transform how businesses operate, scale, and innovate.
            </p>
          </div>

          {/* AI Services Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
            {/* Healthcare */}
            <Card className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-pink-50 to-red-100 p-2">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10 p-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Heart className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <CardTitle className="text-lg mb-2 group-hover:text-pink-600 transition-colors">
                  Healthcare
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  AI-powered diagnostics, patient management, and predictive analytics to improve outcomes and streamline healthcare operations.
                </CardDescription>
                <div className="mt-4 flex items-center text-pink-600 font-medium group-hover:translate-x-2 transition-transform text-sm">
                  Explore Healthcare AI <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </div>
              </CardHeader>
            </Card>

            {/* Finance */}
            <Card className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-green-50 to-emerald-100 p-2">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10 p-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <BarChart3 className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <CardTitle className="text-lg mb-2 group-hover:text-green-600 transition-colors">
                  Finance
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Fraud detection, risk assessment, and automated financial insights for smarter, faster decision-making in finance.
                </CardDescription>
                <div className="mt-4 flex items-center text-green-600 font-medium group-hover:translate-x-2 transition-transform text-sm">
                  Explore Finance AI <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </div>
              </CardHeader>
            </Card>

            {/* Legal */}
            <Card className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-blue-50 to-indigo-100 p-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10 p-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Shield className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <CardTitle className="text-lg mb-2 group-hover:text-blue-600 transition-colors">
                  Legal
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Contract analysis, legal research, and compliance automation to empower law firms and legal departments.
                </CardDescription>
                <div className="mt-4 flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform text-sm">
                  Explore Legal AI <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </div>
              </CardHeader>
            </Card>

            {/* EdTech */}
            <Card className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-yellow-50 to-orange-100 p-2">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10 p-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <BookOpen className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <CardTitle className="text-lg mb-2 group-hover:text-yellow-600 transition-colors">
                  EdTech
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Personalized learning, automated grading, and intelligent content delivery for next-generation education platforms.
                </CardDescription>
                <div className="mt-4 flex items-center text-yellow-600 font-medium group-hover:translate-x-2 transition-transform text-sm">
                  Explore EdTech AI <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
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
          {featuredProject && <FeaturedProject project={featuredProject} />}



          {/* Case Studies Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredCaseStudies.map((caseStudy: any) => (
              <CaseStudyCard key={caseStudy._id} caseStudy={caseStudy} />
            ))}
                    </div>

          {/* View All Case Studies Button */}
          <div className="text-center mt-16">
            <Link href="/case-studies">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4"
            >
              <BarChart3 className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" aria-hidden="true" />
                Explore All Case Studies
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Podcast & Blog Section */}
      {(featuredPodcasts && featuredPodcasts.length > 0) || (featuredBlogs && featuredBlogs.length > 0) ? (
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
              {featuredPodcasts && featuredPodcasts.length > 0 && (
                <div className="space-y-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                      <Headphones className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">Latest Episodes</h3>
                  </div>

                  {/* First podcast - always open */}
                  <FeaturedPodcast podcast={featuredPodcasts[0]} />

                  {/* Other podcasts - collapsible */}
                  <PodcastToggleWrapper podcasts={featuredPodcasts.slice(1)} />
                </div>
              )}

              {/* Enhanced Blog Section */}
              {featuredBlogs && featuredBlogs.length > 0 && (
                <div className="space-y-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                      <BookOpen className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">Latest Articles</h3>
                  </div>

                  {/* First blog - always open */}
                  <FeaturedBlog blog={featuredBlogs[0]} />

                  {/* Other blogs - collapsible */}
                  <BlogToggleWrapper blogs={featuredBlogs.slice(1)} />
                </div>
              )}
            </div>
          </div>
        </section>
      ) : null}



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
            {featuredReviews && featuredReviews.length > 0 ? (
              featuredReviews.map((review: any, index: number) => (
                <Card
                  key={review._id}
                  className="group bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardHeader className="p-8">
                    {/* Rating Stars */}
                    <div className="flex items-center space-x-1 mb-6">
                      {[...Array(review.rating)].map((_, i) => (
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
                        {review.review}
                      </CardDescription>
                    </div>

                    {/* Client Info */}
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${
                          index === 0 ? "from-blue-500 to-indigo-600" : 
                          index === 1 ? "from-purple-500 to-pink-600" : 
                          "from-green-500 to-emerald-600"
                        } flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <span className="text-white font-bold text-lg">{review.clientName.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-lg">{review.clientName}</div>
                        <div className="text-slate-600">{review.clientRole}, {review.clientCompany}</div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))
            ) : (
              [
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
              ))
            )}
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

            {/* Forward Deployed Engineers */}
            <Card className="group bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105">
              <CardHeader className="p-8 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users className="h-10 w-10 text-white" aria-hidden="true" />
                </div>
                <CardTitle className="text-2xl text-white mb-4 group-hover:text-purple-400 transition-colors">
                  Forward Deployed Engineers
                </CardTitle>
                <CardDescription className="text-white/70 text-base leading-relaxed mb-6">
                  Our engineers work directly with your team, ensuring rapid delivery, deep integration, and hands-on support for mission-critical projects.
                </CardDescription>
                {/* Features */}
                <div className="space-y-3 text-left">
                  {[
                    "Onsite & remote collaboration",
                    "Rapid prototyping & delivery",
                    "Seamless integration with your team",
                    "Continuous support & optimization",
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
                  Meet Our Engineers
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

      <Footer />
    </div>
  )
}
