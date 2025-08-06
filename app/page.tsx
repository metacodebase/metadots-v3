import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { connectMongo } from "@/lib/mongodb";
import Project from "@/models/Project";
import CaseStudy from "@/models/CaseStudy";
import Podcast from "@/models/Podcast";
import Blog from "@/models/Blog";
import Review from "@/models/Review";
import FeaturedProject from "@/components/FeaturedProject";
import ProjectCard from "@/components/ProjectCard";
import CaseStudyCard from "@/components/CaseStudyCard";
import PodcastToggleWrapper from "@/components/PodcastToggleWrapper";
import BlogToggleWrapper from "@/components/BlogToggleWrapper";
import FeaturedPodcast from "@/components/FeaturedPodcast";
import FeaturedBlog from "@/components/FeaturedBlog";
import PodcastCard from "@/components/PodcastCard";
import BlogCard from "@/components/BlogCard";
import FeaturedReviews from "@/components/FeaturedReviews";
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
} from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiVuedotjs,
  SiAngular,
  SiSvelte,
  SiTailwindcss,
  SiBootstrap,
  SiNodedotjs,
  SiPython,
  SiGo,
  SiRust,
  SiPhp,
  SiLaravel,
  SiDjango,
  SiExpress,
  SiNestjs,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiMysql,
  SiGraphql,
  SiAmazon,
  SiGooglecloud,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiGithub,
  SiGitlab,
  SiBitbucket,
  SiVercel,
  SiNetlify,
  SiFirebase,
  SiSupabase,
  SiPrisma,
  SiSequelize,
  SiJest,
  SiCypress,
  SiWebpack,
  SiVite,
  SiNpm,
  SiYarn,
  SiPnpm,
  SiFigma,
  SiAdobe,
  SiSketch,
  SiInvision,
  SiHeroku,
  SiDigitalocean,
  SiCloudflare,
  SiAlgolia,
  SiStripe,
  SiTwilio,
  SiSlack,
  SiDiscord,
  SiNotion,
  SiLinear,
  SiJira,
  SiTrello,
  SiAsana,
  SiAirtable,
  SiZapier,
  SiFlutter,
  SiIonic,
  SiExpo,
  SiElectron,
  SiTauri,
} from "react-icons/si";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import ContactSection from "@/components/contact-section";

async function getData() {
  try {
    await connectMongo();

    // Get featured project
    const featuredProject = await Project.findOne({
      featured: true,
      status: "published",
    });

    // Get 3 featured case studies
    const featuredCaseStudies = await CaseStudy.find({
      featured: true,
      status: "published",
    }).limit(3);

    // Get 3 featured podcasts
    const featuredPodcasts = await Podcast.find({
      featured: true,
      status: "published",
    }).limit(3);

    // Get 3 featured blogs
    const featuredBlogs = await Blog.find({
      featured: true,
      status: "published",
    }).limit(3);

    // Get 3 featured reviews
    const featuredReviews = await Review.find({
      featured: true,
      status: "published",
    })
      .sort({ featured: -1, createdAt: -1 })
      .limit(3);

    // Helper function to safely serialize data
    const safeSerialize = (data: any) => {
      if (!data) return null;
      try {
        // Ensure all nested objects have default values
        if (data.metrics && typeof data.metrics === "object") {
          data.metrics = {
            efficiency: data.metrics.efficiency || "",
            dataPoints: data.metrics.dataPoints || "",
            uptime: data.metrics.uptime || "",
            performance: data.metrics.performance || "",
            conversion: data.metrics.conversion || "",
            revenue: data.metrics.revenue || "",
            security: data.metrics.security || "",
            transactions: data.metrics.transactions || "",
            users: data.metrics.users || "",
            accuracy: data.metrics.accuracy || "",
            patients: data.metrics.patients || "",
            diagnoses: data.metrics.diagnoses || "",
            devices: data.metrics.devices || "",
            properties: data.metrics.properties || "",
          };
        }

        // Handle CaseStudy results object
        if (data.results && typeof data.results === "object") {
          data.results = {
            efficiency: data.results.efficiency || "",
            dataPoints: data.results.dataPoints || "",
            uptime: data.results.uptime || "",
            costReduction: data.results.costReduction || "",
            timeToInsight: data.results.timeToInsight || "",
            userSatisfaction: data.results.userSatisfaction || "",
          };
        }

        if (data.author && typeof data.author === "object") {
          data.author = {
            id: data.author.id || "",
            name: data.author.name || "",
            role: data.author.role || "",
            avatar: data.author.avatar || "",
            designation: data.author.designation || "",
          };
        }

        // Handle Review client data including designation and profile picture
        if (data.clientName) {
          data.clientDesignation = data.clientDesignation || data.clientRole || "";
          data.clientAvatar = data.clientAvatar || data.image || "";
        }

        if (data.stats && typeof data.stats === "object") {
          data.stats = {
            views: data.stats.views || 0,
            likes: data.stats.likes || 0,
            shares: data.stats.shares || 0,
            downloads: data.stats.downloads || 0,
          };
        }

        // Ensure arrays are properly handled
        if (data.technologies && Array.isArray(data.technologies)) {
          data.technologies = data.technologies.map((tech: any) => ({
            name: tech.name || "",
            icon: tech.icon || "",
            category: tech.category || "",
          }));
        }

        if (data.keyFeatures && Array.isArray(data.keyFeatures)) {
          data.keyFeatures = data.keyFeatures.map(
            (feature: any) => feature || ""
          );
        }

        if (data.process && Array.isArray(data.process)) {
          data.process = data.process.map((phase: any) => ({
            phase: phase.phase || "",
            duration: phase.duration || "",
            description: phase.description || "",
          }));
        }

        if (data.testimonials && Array.isArray(data.testimonials)) {
          data.testimonials = data.testimonials.map((testimonial: any) => ({
            name: testimonial.name || "",
            role: testimonial.role || "",
            content: testimonial.content || "",
            avatar: testimonial.avatar || "",
          }));
        }

        // Handle Blog-specific fields
        if (data.seo && typeof data.seo === "object") {
          data.seo = {
            metaTitle: data.seo.metaTitle || "",
            metaDescription: data.seo.metaDescription || "",
            keywords: Array.isArray(data.seo.keywords) ? data.seo.keywords : [],
          };
        }

        // Handle Podcast-specific fields
        if (data.plays !== undefined) {
          data.plays = data.plays || 0;
        }

        if (data.date) {
          data.date = data.date;
        }

        if (data.link) {
          data.link = data.link || "";
        }

        // Ensure all string fields have default values
        const stringFields = [
          "title",
          "description",
          "content",
          "excerpt",
          "name",
          "podcastName",
          "clientName",
          "clientRole",
          "clientCompany",
          "review",
          "slug",
          "subtitle",
          "client",
          "industry",
          "duration",
          "team",
          "budget",
          "challenge",
          "solution",
        ];
        stringFields.forEach((field) => {
          if (data[field] === undefined || data[field] === null) {
            data[field] = "";
          }
        });

        // Ensure all number fields have default values
        const numberFields = ["rating", "plays"];
        numberFields.forEach((field) => {
          if (data[field] === undefined || data[field] === null) {
            data[field] = 0;
          }
        });

        // Ensure all boolean fields have default values
        const booleanFields = ["featured"];
        booleanFields.forEach((field) => {
          if (data[field] === undefined || data[field] === null) {
            data[field] = false;
          }
        });

        // Ensure all array fields have default values
        const arrayFields = ["tags", "gallery", "keyFeatures"];
        arrayFields.forEach((field) => {
          if (!Array.isArray(data[field])) {
            data[field] = [];
          }
        });

        return JSON.parse(JSON.stringify(data));
      } catch (err) {
        console.error("Error serializing data:", err);
        return null;
      }
    };

    return {
      featuredProject: featuredProject ? safeSerialize(featuredProject) : null,
      featuredCaseStudies: featuredCaseStudies
        ? featuredCaseStudies.map(safeSerialize).filter(Boolean)
        : [],
      featuredPodcasts: featuredPodcasts
        ? featuredPodcasts.map(safeSerialize).filter(Boolean)
        : [],
      featuredBlogs: featuredBlogs
        ? featuredBlogs.map(safeSerialize).filter(Boolean)
        : [],
      featuredReviews: featuredReviews
        ? featuredReviews.map(safeSerialize).filter(Boolean)
        : [],
    };
  } catch (error) {
    console.error("Error fetching data for homepage:", error);
    // Return empty data instead of failing the entire page
    return {
      featuredProject: null,
      featuredCaseStudies: [],
      featuredPodcasts: [],
      featuredBlogs: [],
      featuredReviews: [],
    };
  }
}
interface AIService {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  colors: {
    background: string;
    hoverBackground: string;
    iconGradient: string;
    titleColor: string;
    titleHoverColor: string;
    linkColor: string;
  };
  linkText: string;
}

// Array of AI services data
const aiServices: AIService[] = [
  {
    id: "healthcare",
    title: "Healthcare",
    description:
      "AI-powered diagnostics, patient management, and predictive analytics to improve outcomes and streamline healthcare operations.",
    icon: Heart,
    colors: {
      background: "from-pink-50 to-red-100",
      hoverBackground: "from-pink-600/5 to-red-600/5",
      iconGradient: "from-pink-500 to-red-600",
      titleColor: "text-pink-400",
      titleHoverColor: "group-hover:text-pink-600",
      linkColor: "text-pink-600",
    },
    linkText: "Explore Healthcare AI",
  },
  {
    id: "finance",
    title: "Finance",
    description:
      "Fraud detection, risk assessment, and automated financial insights for smarter, faster decision-making in finance.",
    icon: BarChart3,
    colors: {
      background: "from-green-50 to-emerald-100",
      hoverBackground: "from-green-600/5 to-emerald-600/5",
      iconGradient: "from-green-500 to-emerald-600",
      titleColor: "text-green-400",
      titleHoverColor: "group-hover:text-green-600",
      linkColor: "text-green-600",
    },
    linkText: "Explore Finance AI",
  },
  {
    id: "legal",
    title: "Legal",
    description:
      "Contract analysis, legal research, and compliance automation to empower law firms and legal departments.",
    icon: Shield,
    colors: {
      background: "from-blue-50 to-indigo-100",
      hoverBackground: "from-blue-600/5 to-indigo-600/5",
      iconGradient: "from-blue-500 to-indigo-600",
      titleColor: "text-blue-400",
      titleHoverColor: "group-hover:text-blue-600",
      linkColor: "text-blue-600",
    },
    linkText: "Explore Legal AI",
  },
  {
    id: "edtech",
    title: "EdTech",
    description:
      "Personalized learning, automated grading, and intelligent content delivery for next-generation education platforms.",
    icon: BookOpen,
    colors: {
      background: "from-yellow-50 to-orange-100",
      hoverBackground: "from-yellow-400/5 to-orange-400/5",
      iconGradient: "from-yellow-400 to-orange-500",
      titleColor: "text-yellow-400",
      titleHoverColor: "group-hover:text-yellow-600",
      linkColor: "text-yellow-600",
    },
    linkText: "Explore EdTech AI",
  },
];
export default async function MetadotsLanding() {
  const {
    featuredProject,
    featuredCaseStudies,
    featuredPodcasts,
    featuredBlogs,
    featuredReviews,
  } = await getData();

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20">
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
                <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl leading-tight">
                  <span className="block text-slate-900">Transform Your</span>
                  <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient pb-2">
                    Digital Vision
                  </span>
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
                  Empowering startups and enterprises with cutting-edge AI
                  solutions, from LLM integrations to intelligent automation. We
                  don't just build software—we architect the future.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700  px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  asChild>
                  <Link href="/contact-us">
                    Start Building
                    <ArrowRight
                      className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="group  px-8 py-4 border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild>
                  <Link href="/contact-us">
                    <Play
                      className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform"
                      aria-hidden="true"
                    />
                    Free AI Audit
                  </Link>
                </Button>
              </div>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center group cursor-pointer">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                    500+
                  </div>
                  <div className="text-sm text-slate-600 font-medium">
                    AI Projects
                  </div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                    98%
                  </div>
                  <div className="text-sm text-slate-600 font-medium">
                    Success Rate
                  </div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                    24/7
                  </div>
                  <div className="text-sm text-slate-600 font-medium">
                    AI Support
                  </div>
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
                      <Badge className="bg-white/20 text-white backdrop-blur-sm">
                        AI Dashboard
                      </Badge>
                    </div>

                    {/* AI Metrics Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white/80 text-sm">
                            LLM Processing
                          </span>
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                        <div className="text-2xl font-bold text-white group-hover:scale-105 transition-transform">
                          94.7%
                        </div>
                        <div className="text-xs text-white/60">
                          Accuracy Rate
                        </div>
                      </div>

                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white/80 text-sm">
                            AI Models
                          </span>
                          <Zap
                            className="w-4 h-4 text-yellow-400 animate-pulse"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="text-2xl font-bold text-white group-hover:scale-105 transition-transform">
                          12
                        </div>
                        <div className="text-xs text-white/60">
                          Active Models
                        </div>
                      </div>
                    </div>

                    {/* AI Visualization */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-white font-medium">
                          Neural Network Activity
                        </span>
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
                          <span className="text-white/80 text-sm">
                            GPT-4 Integration Active
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-ping delay-500"></div>
                          <span className="text-white/80 text-sm">
                            Computer Vision Processing
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping delay-1000"></div>
                          <span className="text-white/80 text-sm">
                            ML Pipeline Optimized
                          </span>
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
                  <Smartphone className="w-6  text-white" aria-hidden="true" />
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
            }}></div>
        </div>

        <div className="container relative z-10">
          <div className="text-center space-y-6 mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg animate-bounce-subtle">
              <BarChart3 className="w-5 h-5 mr-2" aria-hidden="true" />
              AI-Powered Innovation
            </div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl leading-tight">
              <span className="block text-slate-900">
                Deep Domain Expertise
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient pb-2">
                in Leading Industries
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              From LLM integrations to computer vision, we're building the next
              generation of AI-powered solutions that transform how businesses
              operate, scale, and innovate.
            </p>
          </div>

          {/* AI Services Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
            {aiServices.map((service) => {
              const IconComponent = service.icon;

              return (
                <Card
                  key={service.id}
                  className={`group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br ${service.colors.background} p-2`}>
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.colors.hoverBackground} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  <CardHeader className="relative z-10 p-4 flex flex-col gap-4 justify-between h-full">
                    <div>
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.colors.iconGradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <IconComponent
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      <CardTitle
                        className={`text-lg mb-2 ${service.colors.titleHoverColor} ${service.colors.titleColor} transition-colors`}>
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </div>

                    <div
                      className={`mt-4 flex items-center ${service.colors.linkColor} font-medium group-hover:translate-x-2 transition-transform text-sm`}>
                      <Link href="/contact-us" className="flex items-center">
                        {service.linkText}{" "}
                        <ArrowRight
                          className="ml-2 h-4 w-4"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          {/* Interactive AI Demo Section */}
          <div className="relative">
            <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-3xl"></div>
              <div className="relative z-10 grid gap-8 lg:grid-cols-2 items-center">
                <div className="space-y-6">
                  <Badge className="bg-white/20 text-white backdrop-blur-sm px-4 py-2">
                    Live AI Demo
                  </Badge>
                  <h3 className="text-3xl font-bold text-white">
                    Experience AI in Action
                  </h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    See how our AI solutions process natural language, analyze
                    data, and generate insights in real-time. This isn't just a
                    demo—it's a glimpse into the future of intelligent software.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      className="bg-white text-slate-900 hover:bg-white/90 font-medium px-6 py-3"
                      asChild>
                      <Link href="/contact-us">
                        <Play className="mr-2 h-5 w-5" aria-hidden="true" />
                        Try Live Demo
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/30 text-white hover:text-white hover:bg-white/10 px-6 py-3 bg-transparent"
                      asChild>
                      <Link href="/contact-us">Schedule AI Consultation</Link>
                    </Button>
                  </div>
                </div>

                {/* AI Processing Visualization */}
                <div className="relative">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">
                          AI Processing Pipeline
                        </span>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-200"></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-400"></div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg animate-fade-in-up">
                          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              1
                            </span>
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium">
                              Data Ingestion
                            </div>
                            <div className="text-white/60 text-xs">
                              Processing 1.2M tokens/sec
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg animate-fade-in-up delay-300">
                          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              2
                            </span>
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium">
                              AI Analysis
                            </div>
                            <div className="text-white/60 text-xs">
                              Neural networks active
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg animate-fade-in-up delay-600">
                          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              3
                            </span>
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium">
                              Intelligent Output
                            </div>
                            <div className="text-white/60 text-xs">
                              97.3% accuracy achieved
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
        </div>
      </section>

      {/* Enhanced Portfolio Highlights */}
      <section
        id="portfolio"
        className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
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
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl leading-tight">
              <span className="block text-slate-900">Portfolio</span>
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient pb-2">
                Highlights
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Discover our award-winning projects that have transformed
              businesses and set new industry standards
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
            <Link href="/contact-us">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4">
                <BarChart3
                  className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform"
                  aria-hidden="true"
                />
                Explore All Case Studies
                <ArrowRight
                  className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Podcast & Blog Section */}
      <section
        id="blog"
        className="py-20 md:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
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
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white leading-tight">
              <span className="block">Podcast &</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient pb-2">
                Blog Hub
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              Dive deep into the latest tech trends, AI innovations, and
              industry insights through our premium content
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Enhanced Podcast Section */}
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                  <Headphones
                    className="w-6 h-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-3xl font-bold text-white">
                  Latest Episodes
                </h3>
              </div>

              {/* First podcast - always open */}
              {featuredPodcasts && featuredPodcasts.length > 0 ? (
                <FeaturedPodcast podcast={featuredPodcasts[0]} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-white/60 text-lg">
                    No podcasts available yet
                  </p>
                </div>
              )}

              {/* Other podcasts - collapsible */}
              {featuredPodcasts && featuredPodcasts.length > 1 && (
                <PodcastToggleWrapper podcasts={featuredPodcasts.slice(1)} />
              )}
            </div>

            {/* Enhanced Blog Section */}
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-3xl font-bold text-white">
                  Latest Articles
                </h3>
              </div>

              {/* First blog - always open */}
              {featuredBlogs && featuredBlogs.length > 0 ? (
                <FeaturedBlog blog={featuredBlogs[0]} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-white/60 text-lg">
                    No blogs available yet
                  </p>
                </div>
              )}

              {/* Other blogs - collapsible */}
              {featuredBlogs && featuredBlogs.length > 1 && (
                <BlogToggleWrapper blogs={featuredBlogs.slice(1)} />
              )}
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
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl leading-tight">
              <span className="block text-slate-900">What Our</span>
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient pb-2">
                Clients Say
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it - hear from our satisfied clients
              about their transformative experiences
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {featuredReviews && featuredReviews.length > 0
              ? featuredReviews.map((review: any, index: number) => (
                  <Card
                    key={review._id}
                    className="group bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: `${index * 200}ms` }}>
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
                        <div className="absolute -top-2 -left-2 text-6xl text-blue-100 font-serif">
                          "
                        </div>
                        <CardDescription className="text-base leading-relaxed text-slate-700 relative z-10 italic">
                          {review.review}
                        </CardDescription>
                      </div>

                      {/* Client Info */}
                      <div className="flex items-center space-x-4">
                        {review.clientAvatar ? (
                          <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Image
                              src={review.clientAvatar}
                              alt={review.clientName}
                              width={56}
                              height={56}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div
                            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${
                              index === 0
                                ? "from-blue-500 to-indigo-600"
                                : index === 1
                                ? "from-purple-500 to-pink-600"
                                : "from-green-500 to-emerald-600"
                            } flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <span className="text-white font-bold text-lg">
                              {review.clientName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-slate-900 text-lg">
                            {review.clientName}
                          </div>
                          <div className="text-slate-600">
                            {review.clientDesignation || review.clientRole}, {review.clientCompany}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              : [
                  {
                    clientName: "Sarah Johnson",
                    clientDesignation: "CEO",
                    clientCompany: "TechCorp",
                    clientAvatar: null,
                    review:
                      "Metadots transformed our digital presence completely. Their team's expertise and dedication exceeded our expectations. The AI solutions they implemented increased our efficiency by 300%.",
                    rating: 5,
                    avatarInitials: "SJ",
                    color: "from-blue-500 to-indigo-600",
                    delay: "0",
                  },
                  {
                    clientName: "Michael Chen",
                    clientDesignation: "Founder",
                    clientCompany: "StartupXYZ",
                    clientAvatar: null,
                    review:
                      "The mobile app they developed for us has significantly improved our customer engagement and business growth. ROI increased by 250% within the first quarter.",
                    rating: 5,
                    avatarInitials: "MC",
                    color: "from-purple-500 to-pink-600",
                    delay: "200",
                  },
                  {
                    clientName: "Emily Rodriguez",
                    clientDesignation: "CTO",
                    clientCompany: "InnovateLab",
                    clientAvatar: null,
                    review:
                      "Professional, reliable, and innovative. Metadots delivered exactly what we needed on time and within budget. Their AI integration saved us 40 hours per week.",
                    rating: 5,
                    avatarInitials: "ER",
                    color: "from-green-500 to-emerald-600",
                    delay: "400",
                  },
                ].map((testimonial, index) => (
                  <Card
                    key={index}
                    className="group bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: `${testimonial.delay}ms` }}>
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
                        <div className="absolute -top-2 -left-2 text-6xl text-blue-100 font-serif">
                          "
                        </div>
                        <CardDescription className="text-base leading-relaxed text-slate-700 relative z-10 italic">
                          {testimonial.review}
                        </CardDescription>
                      </div>

                      {/* Client Info */}
                      <div className="flex items-center space-x-4">
                        {testimonial.clientAvatar ? (
                          <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Image
                              src={testimonial.clientAvatar}
                              alt={testimonial.clientName}
                              width={56}
                              height={56}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div
                            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${testimonial.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <span className="text-white font-bold text-lg">
                              {testimonial.avatarInitials}
                            </span>
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-slate-900 text-lg">
                            {testimonial.clientName}
                          </div>
                          <div className="text-slate-600">
                            {testimonial.clientDesignation}, {testimonial.clientCompany}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
          </div>

          {/* Client Logos Carousel */}
          <div className="text-center space-y-8">
            <h3 className="text-xl font-semibold text-slate-700">
              Trusted by industry leaders
            </h3>
            <div className="flex items-center justify-center  flex-wrap gap-8 md:gap-12 opacity-60">
              {[
                "TechCorp",
                "StartupXYZ",
                "InnovateLab",
                "FutureAI",
                "CloudTech",
              ].map((company, index) => (
                <div
                  key={company}
                  className="text-sm md:text-2xl font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer transform hover:scale-110 duration-300"
                  style={{ animationDelay: `${index * 200}ms` }}>
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
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl leading-tight">
              <span className="block text-slate-900">Cutting-Edge</span>
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient pb-2">
                Technologies
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We leverage the most advanced tools and frameworks to build
              robust, scalable, and future-proof solutions
            </p>
          </div>

          {/* Technology Categories */}
          <div className="space-y-16">
            {/* Frontend & UI Technologies */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-slate-800 mb-4">
                  Frontend & UI Technologies
                </h3>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  Modern frameworks and libraries for building responsive,
                  interactive user interfaces
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                {[
                  {
                    name: "React",
                    icon: SiReact,
                    color: "from-blue-400 to-blue-600",
                    delay: 0,
                  },
                  {
                    name: "Next.js",
                    icon: SiNextdotjs,
                    color: "from-slate-700 to-slate-900",
                    delay: 100,
                  },
                  {
                    name: "TypeScript",
                    icon: SiTypescript,
                    color: "from-blue-500 to-blue-700",
                    delay: 200,
                  },
                  {
                    name: "JavaScript",
                    icon: SiJavascript,
                    color: "from-yellow-400 to-yellow-600",
                    delay: 300,
                  },
                  {
                    name: "Vue.js",
                    icon: SiVuedotjs,
                    color: "from-green-400 to-green-600",
                    delay: 400,
                  },
                  {
                    name: "Angular",
                    icon: SiAngular,
                    color: "from-red-500 to-red-700",
                    delay: 500,
                  },
                  {
                    name: "Svelte",
                    icon: SiSvelte,
                    color: "from-orange-400 to-orange-600",
                    delay: 600,
                  },
                  {
                    name: "Tailwind CSS",
                    icon: SiTailwindcss,
                    color: "from-cyan-400 to-cyan-600",
                    delay: 700,
                  },
                  {
                    name: "Bootstrap",
                    icon: SiBootstrap,
                    color: "from-purple-500 to-purple-700",
                    delay: 800,
                  },
                  {
                    name: "Material UI",
                    icon: SiBootstrap,
                    color: "from-blue-600 to-blue-800",
                    delay: 900,
                  },
                  {
                    name: "React Native",
                    icon: SiReact,
                    color: "from-blue-400 to-blue-600",
                    delay: 1000,
                  },
                  {
                    name: "Flutter",
                    icon: SiFlutter,
                    color: "from-blue-300 to-blue-500",
                    delay: 1100,
                  },
                  {
                    name: "Ionic",
                    icon: SiIonic,
                    color: "from-blue-500 to-blue-700",
                    delay: 1200,
                  },
                  {
                    name: "Expo",
                    icon: SiExpo,
                    color: "from-slate-700 to-slate-900",
                    delay: 1300,
                  },
                  {
                    name: "Electron",
                    icon: SiElectron,
                    color: "from-blue-400 to-blue-600",
                    delay: 1400,
                  },
                  {
                    name: "Tauri",
                    icon: SiTauri,
                    color: "from-purple-500 to-purple-700",
                    delay: 1500,
                  },
                ].map((tech) => (
                  <Card
                    key={tech.name}
                    className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 bg-white animate-fade-in-up"
                    style={{ animationDelay: `${tech.delay}ms` }}>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <CardHeader className="p-4 text-center relative z-10">
                      <div className="mb-2 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                        <tech.icon
                          className="w-8 h-8 text-slate-600 group-hover:text-blue-600 transition-colors"
                          aria-hidden="true"
                        />
                      </div>
                      <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors text-sm">
                        {tech.name}
                      </h4>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {/* Backend & Database Technologies */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-slate-800 mb-4">
                  Backend & Database
                </h3>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  Robust server-side technologies and data management solutions
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                {[
                  {
                    name: "Node.js",
                    icon: SiNodedotjs,
                    color: "from-green-500 to-green-700",
                    delay: 0,
                  },
                  {
                    name: "Python",
                    icon: SiPython,
                    color: "from-yellow-400 to-yellow-600",
                    delay: 100,
                  },
                  {
                    name: "Java",
                    icon: SiPython,
                    color: "from-red-500 to-red-700",
                    delay: 200,
                  },
                  {
                    name: "Go",
                    icon: SiGo,
                    color: "from-blue-500 to-blue-700",
                    delay: 300,
                  },
                  {
                    name: "Rust",
                    icon: SiRust,
                    color: "from-orange-500 to-orange-700",
                    delay: 400,
                  },
                  {
                    name: "PHP",
                    icon: SiPhp,
                    color: "from-purple-500 to-purple-700",
                    delay: 500,
                  },
                  {
                    name: "Laravel",
                    icon: SiLaravel,
                    color: "from-red-400 to-red-600",
                    delay: 600,
                  },
                  {
                    name: "Django",
                    icon: SiDjango,
                    color: "from-green-600 to-green-800",
                    delay: 700,
                  },
                  {
                    name: "Express.js",
                    icon: SiExpress,
                    color: "from-gray-600 to-gray-800",
                    delay: 800,
                  },
                  {
                    name: "NestJS",
                    icon: SiNestjs,
                    color: "from-red-500 to-red-700",
                    delay: 900,
                  },
                  {
                    name: "PostgreSQL",
                    icon: SiPostgresql,
                    color: "from-blue-600 to-blue-800",
                    delay: 1000,
                  },
                  {
                    name: "MongoDB",
                    icon: SiMongodb,
                    color: "from-green-600 to-green-800",
                    delay: 1100,
                  },
                  {
                    name: "Redis",
                    icon: SiRedis,
                    color: "from-red-500 to-red-700",
                    delay: 1200,
                  },
                  {
                    name: "MySQL",
                    icon: SiMysql,
                    color: "from-blue-500 to-blue-700",
                    delay: 1300,
                  },
                  {
                    name: "GraphQL",
                    icon: SiGraphql,
                    color: "from-pink-500 to-pink-700",
                    delay: 1400,
                  },
                  {
                    name: "Prisma",
                    icon: SiPrisma,
                    color: "from-slate-700 to-slate-900",
                    delay: 1500,
                  },
                  {
                    name: "Sequelize",
                    icon: SiSequelize,
                    color: "from-blue-400 to-blue-600",
                    delay: 1600,
                  },
                  {
                    name: "Firebase",
                    icon: SiFirebase,
                    color: "from-orange-400 to-orange-600",
                    delay: 1700,
                  },
                  {
                    name: "Supabase",
                    icon: SiSupabase,
                    color: "from-green-500 to-green-700",
                    delay: 1800,
                  },
                ].map((tech) => (
                  <Card
                    key={tech.name}
                    className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 bg-white animate-fade-in-up"
                    style={{ animationDelay: `${tech.delay}ms` }}>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <CardHeader className="p-4 text-center relative z-10">
                      <div className="mb-2 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                        <tech.icon
                          className="w-8 h-8 text-slate-600 group-hover:text-blue-600 transition-colors"
                          aria-hidden="true"
                        />
                      </div>
                      <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors text-sm">
                        {tech.name}
                      </h4>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {/* Cloud & DevOps */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-slate-800 mb-4">
                  Cloud & DevOps
                </h3>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  Scalable cloud infrastructure and development operations tools
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                {[
                  {
                    name: "AWS",
                    icon: SiAmazon,
                    color: "from-orange-400 to-orange-600",
                    delay: 0,
                  },
                  {
                    name: "Google Cloud",
                    icon: SiGooglecloud,
                    color: "from-blue-500 to-blue-700",
                    delay: 100,
                  },
                  {
                    name: "Azure",
                    icon: SiGooglecloud,
                    color: "from-blue-600 to-blue-800",
                    delay: 200,
                  },
                  {
                    name: "Docker",
                    icon: SiDocker,
                    color: "from-blue-400 to-blue-600",
                    delay: 300,
                  },
                  {
                    name: "Kubernetes",
                    icon: SiKubernetes,
                    color: "from-blue-600 to-blue-800",
                    delay: 400,
                  },
                  {
                    name: "Terraform",
                    icon: SiTerraform,
                    color: "from-purple-500 to-purple-700",
                    delay: 500,
                  },
                  {
                    name: "GitHub",
                    icon: SiGithub,
                    color: "from-gray-700 to-gray-900",
                    delay: 600,
                  },
                  {
                    name: "GitLab",
                    icon: SiGitlab,
                    color: "from-orange-500 to-orange-700",
                    delay: 700,
                  },
                  {
                    name: "Vercel",
                    icon: SiVercel,
                    color: "from-slate-800 to-slate-900",
                    delay: 800,
                  },
                  {
                    name: "Netlify",
                    icon: SiNetlify,
                    color: "from-green-500 to-green-700",
                    delay: 900,
                  },
                  {
                    name: "Heroku",
                    icon: SiHeroku,
                    color: "from-purple-500 to-purple-700",
                    delay: 1000,
                  },
                  {
                    name: "DigitalOcean",
                    icon: SiDigitalocean,
                    color: "from-blue-400 to-blue-600",
                    delay: 1100,
                  },
                  {
                    name: "Cloudflare",
                    icon: SiCloudflare,
                    color: "from-orange-400 to-orange-600",
                    delay: 1200,
                  },
                  {
                    name: "Algolia",
                    icon: SiAlgolia,
                    color: "from-blue-500 to-blue-700",
                    delay: 1300,
                  },
                  {
                    name: "Stripe",
                    icon: SiStripe,
                    color: "from-purple-500 to-purple-700",
                    delay: 1400,
                  },
                  {
                    name: "Twilio",
                    icon: SiTwilio,
                    color: "from-red-500 to-red-700",
                    delay: 1500,
                  },
                ].map((tech) => (
                  <Card
                    key={tech.name}
                    className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 bg-white animate-fade-in-up"
                    style={{ animationDelay: `${tech.delay}ms` }}>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <CardHeader className="p-4 text-center relative z-10">
                      <div className="mb-2 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                        <tech.icon
                          className="w-8 h-8 text-slate-600 group-hover:text-blue-600 transition-colors"
                          aria-hidden="true"
                        />
                      </div>
                      <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors text-sm">
                        {tech.name}
                      </h4>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {/* Testing & Quality Assurance */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-slate-800 mb-4">
                  Testing & Quality Assurance
                </h3>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  Comprehensive testing frameworks and quality assurance tools
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                {[
                  {
                    name: "Jest",
                    icon: SiJest,
                    color: "from-red-500 to-red-700",
                    delay: 0,
                  },
                  {
                    name: "Cypress",
                    icon: SiCypress,
                    color: "from-green-500 to-green-700",
                    delay: 100,
                  },
                  {
                    name: "Playwright",
                    icon: SiCypress,
                    color: "from-blue-500 to-blue-700",
                    delay: 200,
                  },
                  {
                    name: "Webpack",
                    icon: SiWebpack,
                    color: "from-blue-400 to-blue-600",
                    delay: 300,
                  },
                  {
                    name: "Vite",
                    icon: SiVite,
                    color: "from-purple-500 to-purple-700",
                    delay: 400,
                  },
                  {
                    name: "NPM",
                    icon: SiNpm,
                    color: "from-red-500 to-red-700",
                    delay: 500,
                  },
                  {
                    name: "Yarn",
                    icon: SiYarn,
                    color: "from-blue-500 to-blue-700",
                    delay: 600,
                  },
                  {
                    name: "PNPM",
                    icon: SiPnpm,
                    color: "from-orange-500 to-orange-700",
                    delay: 700,
                  },
                ].map((tech) => (
                  <Card
                    key={tech.name}
                    className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 bg-white animate-fade-in-up"
                    style={{ animationDelay: `${tech.delay}ms` }}>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <CardHeader className="p-4 text-center relative z-10">
                      <div className="mb-2 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                        <tech.icon
                          className="w-8 h-8 text-slate-600 group-hover:text-blue-600 transition-colors"
                          aria-hidden="true"
                        />
                      </div>
                      <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors text-sm">
                        {tech.name}
                      </h4>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {/* Design & Collaboration Tools */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-slate-800 mb-4">
                  Design & Collaboration
                </h3>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  Professional design tools and team collaboration platforms
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                {[
                  {
                    name: "Figma",
                    icon: SiFigma,
                    color: "from-purple-500 to-purple-700",
                    delay: 0,
                  },
                  {
                    name: "Adobe",
                    icon: SiAdobe,
                    color: "from-red-500 to-red-700",
                    delay: 100,
                  },
                  {
                    name: "Sketch",
                    icon: SiSketch,
                    color: "from-yellow-400 to-yellow-600",
                    delay: 200,
                  },
                  {
                    name: "Slack",
                    icon: SiSlack,
                    color: "from-purple-500 to-purple-700",
                    delay: 300,
                  },
                  {
                    name: "Discord",
                    icon: SiDiscord,
                    color: "from-indigo-500 to-indigo-700",
                    delay: 400,
                  },
                  {
                    name: "Notion",
                    icon: SiNotion,
                    color: "from-gray-700 to-gray-900",
                    delay: 500,
                  },
                  {
                    name: "Linear",
                    icon: SiLinear,
                    color: "from-blue-500 to-blue-700",
                    delay: 600,
                  },
                  {
                    name: "Jira",
                    icon: SiJira,
                    color: "from-blue-500 to-blue-700",
                    delay: 700,
                  },
                  {
                    name: "Trello",
                    icon: SiTrello,
                    color: "from-blue-500 to-blue-700",
                    delay: 800,
                  },
                  {
                    name: "Asana",
                    icon: SiAsana,
                    color: "from-red-500 to-red-700",
                    delay: 900,
                  },
                  {
                    name: "Airtable",
                    icon: SiAirtable,
                    color: "from-blue-500 to-blue-700",
                    delay: 1000,
                  },
                  {
                    name: "Zapier",
                    icon: SiZapier,
                    color: "from-orange-500 to-orange-700",
                    delay: 1100,
                  },
                ].map((tech) => (
                  <Card
                    key={tech.name}
                    className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 bg-white animate-fade-in-up"
                    style={{ animationDelay: `${tech.delay}ms` }}>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <CardHeader className="p-4 text-center relative z-10">
                      <div className="mb-2 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                        <tech.icon
                          className="w-8 h-8 text-slate-600 group-hover:text-blue-600 transition-colors"
                          aria-hidden="true"
                        />
                      </div>
                      <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors text-sm">
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
        className="py-20 md:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
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
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white leading-tight">
              <span className="block">Innovating the Future</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient pb-2">
                of Technology
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              Choose the perfect engagement model that fits your project needs
              and business goals
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
                  Get a full-stack team of experts dedicated exclusively to your
                  project. Perfect for long-term partnerships and complex
                  enterprise solutions.
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
                        style={{ animationDelay: `${index * 200}ms` }}></div>
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-left">
                  <Button
                    className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    asChild>
                    <Link href="/contact-us">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
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
                  Well-defined projects with clear scope and deliverables. Ideal
                  for startups and businesses with specific requirements and
                  budget constraints.
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
                        style={{ animationDelay: `${index * 200}ms` }}></div>
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-left">
                  <Button
                    className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                    asChild>
                    <Link href="/contact-us">
                      Get Quote
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
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
                  Our engineers work directly with your team, ensuring rapid
                  delivery, deep integration, and hands-on support for
                  mission-critical projects.
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
                        style={{ animationDelay: `${index * 200}ms` }}></div>
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-left">
                  <Button
                    className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    asChild>
                    <Link href="/contact-us">
                      Meet Our Engineers
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
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

      <ContactSection />

      <Footer />
    </div>
  );
}
