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
          data.clientDesignation =
            data.clientDesignation || data.clientRole || "";
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
      <section className="border-b border-slate-100 bg-slate-50 py-20">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-100">
                  <Zap className="mr-2 h-4 w-4" aria-hidden="true" />
                  Where Ideas Meet Reality
                </div>
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                  <span className="block">Transform Your</span>
                  <span className="mt-1 block text-blue-700">Digital Vision</span>
                </h1>
                <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                  Empowering startups and enterprises with cutting-edge AI
                  solutions, from LLM integrations to intelligent automation. We
                  don't just build software—we architect the future.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md"
                  asChild>
                  <Link href="/contact-us">
                    Start Building
                    <ArrowRight
                      className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="group px-8 py-4 border border-blue-200 bg-white text-blue-700 hover:border-blue-400 hover:bg-blue-50"
                  asChild>
                  <Link href="/contact-us">
                    <Play
                      className="mr-2 h-5 w-5 transition-transform group-hover:scale-110"
                      aria-hidden="true"
                    />
                    Free AI Audit
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-2xl font-semibold text-slate-900">
                    500+
                  </div>
                  <div className="text-xs font-medium text-slate-500 sm:text-sm">
                    AI Projects
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-slate-900">
                    98%
                  </div>
                  <div className="text-xs font-medium text-slate-500 sm:text-sm">
                    Success Rate
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-slate-900">
                    24/7
                  </div>
                  <div className="text-xs font-medium text-slate-500 sm:text-sm">
                    AI Support
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard preview */}
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-md ring-1 ring-slate-100 lg:p-8">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-blue-500" />
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-100" />
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-100" />
                </div>
                <Badge
                  variant="outline"
                  className="border-blue-100 bg-blue-50/60 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-blue-700">
                  AI Dashboard
                </Badge>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-700">
                      LLM Processing
                    </span>
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-300/60" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500" />
                    </span>
                  </div>
                  <div className="text-3xl font-semibold text-slate-900">
                    94.7%
                  </div>
                  <div className="text-xs text-slate-600">Accuracy Rate</div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-700">
                      AI Models
                    </span>
                    <Zap className="h-4 w-4 text-blue-500" aria-hidden="true" />
                  </div>
                  <div className="text-3xl font-semibold text-slate-900">12</div>
                  <div className="text-xs text-slate-600">Active Models</div>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50/70 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-800">
                    Neural Network Activity
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-wide text-blue-500">
                    Live
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>GPT-4 Integration Active</span>
                    <span className="h-1.5 w-28 overflow-hidden rounded-full bg-blue-50">
                      <span className="block h-1.5 w-[70%] animate-[pulse_1.8s_ease-in-out_infinite] rounded-full bg-blue-500" />
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Computer Vision Processing</span>
                    <span className="h-1.5 w-28 overflow-hidden rounded-full bg-blue-50">
                      <span className="block h-1.5 w-[55%] animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-blue-500" />
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>ML Pipeline Optimized</span>
                    <span className="h-1.5 w-28 overflow-hidden rounded-full bg-blue-50">
                      <span className="block h-1.5 w-[80%] animate-[pulse_2.2s_ease-in-out_infinite] rounded-full bg-blue-500" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "We Create Impact" Section */}
      <section className="relative overflow-hidden bg-white py-20 md:py-32">
        <div className="container">
          <div className="mb-20 space-y-6 text-center">
            <div className="inline-flex items-center rounded-full bg-blue-50 px-6 py-3 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-100">
              <BarChart3 className="mr-2 h-5 w-5" aria-hidden="true" />
              AI-Powered Innovation
            </div>
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              <span className="block">Deep Domain Expertise</span>
              <span className="mt-1 block text-blue-700">
                in Leading Industries
              </span>
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed text-slate-600">
              From LLM integrations to computer vision, we're building the next
              generation of AI-powered solutions that transform how businesses
              operate, scale, and innovate.
            </p>
          </div>

          {/* AI Services Grid */}
          <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {aiServices.map((service) => {
              const IconComponent = service.icon;

              return (
                <Card
                  key={service.id}
                  className="group flex h-full flex-col justify-between border border-slate-100 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-md">
                  <CardHeader className="flex h-full flex-col justify-between gap-4 p-4">
                    <div>
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                        <IconComponent
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </div>
                      <CardTitle className="mb-2 text-base font-semibold text-slate-900">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed text-slate-600">
                        {service.description}
                      </CardDescription>
                    </div>

                    <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                      <Link
                        href="/contact-us"
                        className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                        {service.linkText}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          {/* Interactive AI Demo Section */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 p-8 shadow-lg md:p-12">
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div className="space-y-6">
                  <Badge className="px-4 py-2 bg-slate-800 text-xs font-medium text-slate-50">
                    Live AI Demo
                  </Badge>
                  <h3 className="text-3xl font-semibold text-white">
                    Experience AI in Action
                  </h3>
                  <p className="text-lg leading-relaxed text-slate-200">
                    See how our AI solutions process natural language, analyze
                    data, and generate insights in real-time. This isn't just a
                    demo—it's a glimpse into the future of intelligent software.
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <Button
                      className="bg-white px-6 py-3 font-medium text-slate-900 hover:bg-slate-100"
                      asChild>
                      <Link href="/contact-us">
                        <Play className="mr-2 h-5 w-5" aria-hidden="true" />
                        Try Live Demo
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-slate-600 bg-transparent px-6 py-3 text-slate-100 hover:bg-slate-800"
                      asChild>
                      <Link href="/contact-us">Schedule AI Consultation</Link>
                    </Button>
                  </div>
                </div>

                {/* AI Processing Visualization */}
                <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-50">
                        AI Processing Pipeline
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 rounded-lg bg-slate-900/60 p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
                          1
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-50">
                            Data Ingestion
                          </div>
                          <div className="text-xs text-slate-300">
                            Processing 1.2M tokens/sec
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 rounded-lg bg-slate-900/60 p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-xs font-bold text-white">
                          2
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-50">
                            AI Analysis
                          </div>
                          <div className="text-xs text-slate-300">
                            Neural networks active
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 rounded-lg bg-slate-900/60 p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-400 text-xs font-bold text-white">
                          3
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-50">
                            Intelligent Output
                          </div>
                          <div className="text-xs text-slate-300">
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
      </section>

      {/* Portfolio Highlights */}
      <section
        id="portfolio"
        className="relative overflow-hidden bg-slate-50 py-20">
        <div className="container">
          <div className="mb-20 space-y-6 text-center">
            <div className="inline-flex items-center rounded-full bg-blue-50 px-6 py-3 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-100">
              <BarChart3 className="mr-2 h-5 w-5" aria-hidden="true" />
              Featured Work
            </div>
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              <span className="block">Portfolio</span>
              <span className="mt-1 block text-blue-700">Highlights</span>
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed text-slate-600">
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
          <div className="mt-16 text-center">
            <Link href="/contact-us">
              <Button
                size="lg"
                className="group px-8 py-4 bg-slate-900 text-white shadow-sm hover:bg-slate-800 hover:shadow-md">
                <BarChart3
                  className="mr-2 h-5 w-5 transition-transform group-hover:rotate-6"
                  aria-hidden="true"
                />
                Explore All Case Studies
                <ArrowRight
                  className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Podcast & Blog Section */}
      <section
        id="blog"
        className="relative overflow-hidden bg-slate-900 py-20 md:py-32">
        <div className="container">
          <div className="mb-20 space-y-6 text-center">
            <div className="inline-flex items-center rounded-full bg-slate-800 px-6 py-3 text-sm font-medium text-slate-50">
              <Play className="mr-2 h-5 w-5" aria-hidden="true" />
              Content & Insights
            </div>
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="block">Podcast &</span>
              <span className="mt-1 block text-blue-300">Blog Hub</span>
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed text-slate-200">
              Dive deep into the latest tech trends, AI innovations, and
              industry insights through our premium content
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Podcast Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-slate-50">
                  <Headphones
                    className="h-6 w-6"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-3xl font-semibold text-white">
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

            {/* Blog Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-slate-50">
                  <BookOpen className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-3xl font-semibold text-white">
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

      {/* Client Testimonials */}
      <section className="relative overflow-hidden bg-white py-20 md:py-32">
        <div className="container">
          <div className="mb-16 space-y-6 text-center">
            <div className="inline-flex items-center rounded-full bg-blue-50 px-6 py-3 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-100">
              <Star className="mr-2 h-5 w-5" aria-hidden="true" />
              Client Success Stories
            </div>
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              <span className="block">What Our</span>
              <span className="mt-1 block text-blue-700">Clients Say</span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600">
              Don't just take our word for it - hear from our satisfied clients
              about their transformative experiences
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredReviews && featuredReviews.length > 0
              ? featuredReviews.map((review: any, index: number) => (
                  <Card
                    key={review._id}
                    className="group bg-white border border-slate-100 shadow-sm hover:shadow-md transition"
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
                        <div className="absolute -top-2 -left-2 text-3xl text-blue-100 font-serif">
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
                        ) : null}
                        <div>
                          <div className="font-semibold text-slate-900 text-lg">
                            {review.clientName}
                          </div>
                          <div className="text-slate-600">
                            {review.clientDesignation || review.clientRole},{" "}
                            {review.clientCompany}
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
                ].map((testimonial) => (
                  <Card
                    key={testimonial.clientName}
                    className="group bg-white border border-slate-100 shadow-sm hover:shadow-md transition"
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
                        {testimonial.clientAvatar ? null : null}
                        <div>
                          <div className="font-semibold text-slate-900 text-lg">
                            {testimonial.clientName}
                          </div>
                          <div className="text-slate-600">
                            {testimonial.clientDesignation},{" "}
                            {testimonial.clientCompany}
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
              Trusted by Industry Leaders
            </h3>
            <div className="flex items-center justify-center  flex-wrap gap-8 md:gap-12 opacity-60">
              {[
                "/images/BoiceVox-logo.png",
                "/images/teammatch-logo.png",
                "/images/fangenie-logo.png",
                "/images/spectrum-logo.png",
                "/images/haulos-logo.svg",
              ].map((company, index) => (
                <div
                  key={company}
                  className={`text-sm md:text-2xl font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer transform hover:scale-110 duration-300 `}
                  style={{ animationDelay: `${index * 200}ms` }}>
                   <Image
                      src={company}
                      alt="Company Logo"
                      width={140}
                      height={32} 
                      priority
                    />
                  
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="bg-slate-50 py-20 md:py-32">
        <div className="container">
          <div className="mb-16 space-y-6 text-center">
            <div className="inline-flex items-center rounded-full bg-blue-50 px-6 py-3 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-100">
              <Code className="mr-2 h-5 w-5" aria-hidden="true" />
              Technology Stack
            </div>
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              <span className="block">Cutting-Edge</span>
              <span className="mt-1 block text-blue-700">Technologies</span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600">
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
                  <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                {[
                  {
                    name: "React",
                    icon: SiReact,
                    color: "",
                    delay: 0,
                  },
                  {
                    name: "Next.js",
                    icon: SiNextdotjs,
                    color: "",
                    delay: 100,
                  },
                  {
                    name: "TypeScript",
                    icon: SiTypescript,
                    color: "",
                    delay: 200,
                  },
                  {
                    name: "JavaScript",
                    icon: SiJavascript,
                    color: "",
                    delay: 300,
                  },
                  {
                    name: "Vue.js",
                    icon: SiVuedotjs,
                    color: "",
                    delay: 400,
                  },
                  {
                    name: "Angular",
                    icon: SiAngular,
                    color: "",
                    delay: 500,
                  },
                  {
                    name: "Svelte",
                    icon: SiSvelte,
                    color: "",
                    delay: 600,
                  },
                  {
                    name: "Tailwind CSS",
                    icon: SiTailwindcss,
                    color: "",
                    delay: 700,
                  },
                  {
                    name: "Bootstrap",
                    icon: SiBootstrap,
                    color: "",
                    delay: 800,
                  },
                  {
                    name: "Material UI",
                    icon: SiBootstrap,
                    color: "",
                    delay: 900,
                  },
                  {
                    name: "React Native",
                    icon: SiReact,
                    color: "",
                    delay: 1000,
                  },
                  {
                    name: "Flutter",
                    icon: SiFlutter,
                    color: "",
                    delay: 1100,
                  },
                  {
                    name: "Ionic",
                    icon: SiIonic,
                    color: "",
                    delay: 1200,
                  },
                  {
                    name: "Expo",
                    icon: SiExpo,
                    color: "",
                    delay: 1300,
                  },
                  {
                    name: "Electron",
                    icon: SiElectron,
                    color: "",
                    delay: 1400,
                  },
                  {
                    name: "Tauri",
                    icon: SiTauri,
                    color: "",
                    delay: 1500,
                  },
                ].map((tech) => (
                  <Card
                    key={tech.name}
                    className="group border border-slate-100 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-md"
                    style={{ animationDelay: `${tech.delay}ms` }}>
                    <CardHeader className="relative z-10 p-4 text-center">
                      <div className="mb-2 flex justify-center transition-transform group-hover:scale-105">
                        <tech.icon
                          className="w-8 h-8 text-slate-600 group-hover:text-blue-600 transition-colors"
                          aria-hidden="true"
                        />
                      </div>
                      <h4 className="text-sm font-semibold text-slate-800 transition-colors group-hover:text-blue-600">
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
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                {[
                  {
                    name: "Node.js",
                    icon: SiNodedotjs,
                    color: "",
                    delay: 0,
                  },
                  {
                    name: "Python",
                    icon: SiPython,
                    color: "",
                    delay: 100,
                  },
                  {
                    name: "Java",
                    icon: SiPython,
                    color: "",
                    delay: 200,
                  },
                  {
                    name: "Go",
                    icon: SiGo,
                    color: "",
                    delay: 300,
                  },
                  {
                    name: "Rust",
                    icon: SiRust,
                    color: "",
                    delay: 400,
                  },
                  {
                    name: "PHP",
                    icon: SiPhp,
                    color: "",
                    delay: 500,
                  },
                  {
                    name: "Laravel",
                    icon: SiLaravel,
                    color: "",
                    delay: 600,
                  },
                  {
                    name: "Django",
                    icon: SiDjango,
                    color: "",
                    delay: 700,
                  },
                  {
                    name: "Express.js",
                    icon: SiExpress,
                    color: "",
                    delay: 800,
                  },
                  {
                    name: "NestJS",
                    icon: SiNestjs,
                    color: "",
                    delay: 900,
                  },
                  {
                    name: "PostgreSQL",
                    icon: SiPostgresql,
                    color: "",
                    delay: 1000,
                  },
                  {
                    name: "MongoDB",
                    icon: SiMongodb,
                    color: "",
                    delay: 1100,
                  },
                  {
                    name: "Redis",
                    icon: SiRedis,
                    color: "",
                    delay: 1200,
                  },
                  {
                    name: "MySQL",
                    icon: SiMysql,
                    color: "",
                    delay: 1300,
                  },
                  {
                    name: "GraphQL",
                    icon: SiGraphql,
                    color: "",
                    delay: 1400,
                  },
                  {
                    name: "Prisma",
                    icon: SiPrisma,
                    color: "",
                    delay: 1500,
                  },
                  {
                    name: "Sequelize",
                    icon: SiSequelize,
                    color: "",
                    delay: 1600,
                  },
                  {
                    name: "Firebase",
                    icon: SiFirebase,
                    color: "",
                    delay: 1700,
                  },
                  {
                    name: "Supabase",
                    icon: SiSupabase,
                    color: "",
                    delay: 1800,
                  },
                ].map((tech) => (
                  <Card
                    key={tech.name}
                    className="group border border-slate-100 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-md"
                    style={{ animationDelay: `${tech.delay}ms` }}>
                    <CardHeader className="relative z-10 p-4 text-center">
                      <div className="mb-2 flex justify-center transition-transform group-hover:scale-105">
                        <tech.icon
                          className="w-8 h-8 text-slate-600 group-hover:text-blue-600 transition-colors"
                          aria-hidden="true"
                        />
                      </div>
                      <h4 className="text-sm font-semibold text-slate-800 transition-colors group-hover:text-blue-600">
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
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
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
                    color: "",
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
                    color: "",
                    delay: 100,
                  },
                  {
                    name: "Playwright",
                    icon: SiCypress,
                    color: "",
                    delay: 200,
                  },
                  {
                    name: "Webpack",
                    icon: SiWebpack,
                    color: "",
                    delay: 300,
                  },
                  {
                    name: "Vite",
                    icon: SiVite,
                    color: "",
                    delay: 400,
                  },
                  {
                    name: "NPM",
                    icon: SiNpm,
                    color: "",
                    delay: 500,
                  },
                  {
                    name: "Yarn",
                    icon: SiYarn,
                    color: "",
                    delay: 600,
                  },
                  {
                    name: "PNPM",
                    icon: SiPnpm,
                    color: "",
                    delay: 700,
                  },
                ].map((tech) => (
                  <Card
                    key={tech.name}
                    className="group border border-slate-100 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-md"
                    style={{ animationDelay: `${tech.delay}ms` }}>
                    <CardHeader className="relative z-10 p-4 text-center">
                      <div className="mb-2 flex justify-center transition-transform group-hover:scale-105">
                        <tech.icon
                          className="w-8 h-8 text-slate-600 group-hover:text-blue-600 transition-colors"
                          aria-hidden="true"
                        />
                      </div>
                      <h4 className="text-sm font-semibold text-slate-800 transition-colors group-hover:text-blue-600">
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
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                {[
                  {
                    name: "Figma",
                    icon: SiFigma,
                    color: "",
                    delay: 0,
                  },
                  {
                    name: "Adobe",
                    icon: SiAdobe,
                    color: "",
                    delay: 100,
                  },
                  {
                    name: "Sketch",
                    icon: SiSketch,
                    color: "",
                    delay: 200,
                  },
                  {
                    name: "Slack",
                    icon: SiSlack,
                    color: "",
                    delay: 300,
                  },
                  {
                    name: "Discord",
                    icon: SiDiscord,
                    color: "",
                    delay: 400,
                  },
                  {
                    name: "Notion",
                    icon: SiNotion,
                    color: "",
                    delay: 500,
                  },
                  {
                    name: "Linear",
                    icon: SiLinear,
                    color: "",
                    delay: 600,
                  },
                  {
                    name: "Jira",
                    icon: SiJira,
                    color: "",
                    delay: 700,
                  },
                  {
                    name: "Trello",
                    icon: SiTrello,
                    color: "",
                    delay: 800,
                  },
                  {
                    name: "Asana",
                    icon: SiAsana,
                    color: "",
                    delay: 900,
                  },
                  {
                    name: "Airtable",
                    icon: SiAirtable,
                    color: "",
                    delay: 1000,
                  },
                  {
                    name: "Zapier",
                    icon: SiZapier,
                    color: "",
                    delay: 1100,
                  },
                ].map((tech) => (
                  <Card
                    key={tech.name}
                    className="group border border-slate-100 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-md"
                    style={{ animationDelay: `${tech.delay}ms` }}>
                    <CardHeader className="relative z-10 p-4 text-center">
                      <div className="mb-2 flex justify-center transition-transform group-hover:scale-105">
                        <tech.icon
                          className="w-8 h-8 text-slate-600 group-hover:text-blue-600 transition-colors"
                          aria-hidden="true"
                        />
                      </div>
                      <h4 className="text-sm font-semibold text-slate-800 transition-colors group-hover:text-blue-600">
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

      {/* About Section - Service Offerings */}
      <section
        id="about"
        className="relative overflow-hidden bg-white py-20 md:py-32">
        <div className="container">
          <div className="mb-20 space-y-6 text-center">
            <div className="inline-flex items-center rounded-full bg-blue-50 px-6 py-3 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-100">
              <Users className="mr-2 h-5 w-5" aria-hidden="true" />
              How We Work
            </div>
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              <span className="block">Innovating the Future</span>
              <span className="mt-1 block text-blue-700">of Technology</span>
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed text-slate-600">
              Choose the perfect engagement model that fits your project needs
              and business goals
            </p>
          </div>

          {/* Service Models */}
          <div className="mb-16 grid gap-8 lg:grid-cols-3">
            {/* Dedicated Team */}
            <Card className="group border border-slate-100 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-md">
              <CardHeader className="p-8 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <Users className="h-10 w-10" aria-hidden="true" />
                </div>
                <CardTitle className="mb-4 text-2xl text-slate-900">
                  Dedicated Team
                </CardTitle>
                <CardDescription className="mb-6 text-base leading-relaxed text-slate-600">
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
                    <div key={index} className="flex items-center gap-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-left">
                  <Button
                    className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700"
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
            <Card className="group border border-slate-100 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-md">
              <CardHeader className="p-8 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <Target className="h-10 w-10" aria-hidden="true" />
                </div>
                <CardTitle className="mb-4 text-2xl text-slate-900">
                  Fixed Price Projects
                </CardTitle>
                <CardDescription className="mb-6 text-base leading-relaxed text-slate-600">
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
                    <div key={index} className="flex items-center gap-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-left">
                  <Button
                    className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700"
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
            <Card className="group border border-slate-100 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-md">
              <CardHeader className="p-8 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <Users className="h-10 w-10" aria-hidden="true" />
                </div>
                <CardTitle className="mb-4 text-2xl text-slate-900">
                  Forward Deployed Engineers
                </CardTitle>
                <CardDescription className="mb-6 text-base leading-relaxed text-slate-600">
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
                    <div key={index} className="flex items-center gap-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-left">
                  <Button
                    className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700"
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
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {[
              { number: "10+", label: "Years Experience", icon: Award },
              { number: "500+", label: "Projects Delivered", icon: Rocket },
              { number: "50+", label: "Expert Developers", icon: Users },
              { number: "25+", label: "Countries Served", icon: Globe },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="mb-2 flex justify-center transition-transform group-hover:scale-105">
                  <stat.icon
                    className="h-10 w-10 text-blue-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mb-2 text-3xl font-bold text-slate-900">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-600">{stat.label}</div>
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
