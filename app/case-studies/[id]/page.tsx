"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  ExternalLink,
  Download,
  Share2,
  Calendar,
  Users,
  TrendingUp,
  Target,
  CheckCircle,
  Star,
  Clock,
  DollarSign,
  BarChart3,
  Eye,
  Heart,
  MessageCircle,
  ChevronRight,
  Play,
  Award,
  Zap,
  Shield,
  Globe,
  Smartphone,
  Database,
  Cloud,
  Cpu,
  Palette,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";

// Mock case study data - in real app this would come from API
const caseStudyData = {
  id: 1,
  title: "AI-Powered Analytics Platform for TechCorp",
  subtitle:
    "Revolutionary analytics platform that processes 10M+ data points daily",
  description:
    "How we built a cutting-edge analytics platform that transformed TechCorp's data processing capabilities, featuring real-time AI insights, predictive modeling, and automated reporting systems.",
  client: "TechCorp Enterprise",
  industry: "Technology",
  status: "Published",
  duration: "8 months",
  team: "12 developers",
  budget: "$250K",
  publishedAt: "2024-01-15",
  views: "15.2K",
  downloads: "2.8K",
  rating: 4.9,
  featured: true,
  heroImage: "/placeholder.svg?height=600&width=1200",
  challenge:
    "TechCorp was struggling with processing massive amounts of data in real-time, leading to delayed insights and missed opportunities. Their existing system could only handle 1M data points daily, while they needed to process 10M+ daily.",
  solution:
    "We developed a scalable AI-powered analytics platform using cutting-edge technologies including real-time data processing, machine learning algorithms, and cloud-native architecture.",
  technologies: [
    { name: "React", icon: "⚛️", category: "Frontend" },
    { name: "Node.js", icon: "🟢", category: "Backend" },
    { name: "Python", icon: "🐍", category: "AI/ML" },
    { name: "TensorFlow", icon: "🧠", category: "AI/ML" },
    { name: "AWS", icon: "☁️", category: "Cloud" },
    { name: "PostgreSQL", icon: "🐘", category: "Database" },
    { name: "Redis", icon: "🔴", category: "Cache" },
    { name: "Docker", icon: "🐳", category: "DevOps" },
  ],
  keyFeatures: [
    "Real-time data processing with 10M+ daily data points",
    "AI-powered predictive analytics and insights",
    "Automated reporting and dashboard generation",
    "Scalable cloud-native architecture",
    "Advanced security and compliance features",
    "Multi-tenant support for enterprise clients",
  ],
  results: {
    efficiency: "340% improvement",
    dataPoints: "10M+ processed daily",
    uptime: "99.9% availability",
    costReduction: "60% reduction in processing costs",
    timeToInsight: "90% faster insights delivery",
    userSatisfaction: "95% user satisfaction rate",
  },
  testimonials: [
    {
      name: "Sarah Johnson",
      role: "CTO, TechCorp Enterprise",
      content:
        "The analytics platform has completely transformed how we process and analyze data. The real-time insights have given us a competitive edge we never had before.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Michael Chen",
      role: "Data Science Lead",
      content:
        "The AI-powered predictions are incredibly accurate. We've seen a dramatic improvement in our decision-making process and business outcomes.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ],
  process: [
    {
      phase: "Discovery & Planning",
      duration: "2 weeks",
      description:
        "Comprehensive analysis of requirements, architecture planning, and technology stack selection.",
      icon: Target,
    },
    {
      phase: "Design & Prototyping",
      duration: "3 weeks",
      description:
        "UI/UX design, system architecture, and rapid prototyping of core features.",
      icon: Palette,
    },
    {
      phase: "Development",
      duration: "6 months",
      description:
        "Agile development with bi-weekly sprints, continuous integration, and regular client feedback.",
      icon: Cpu,
    },
    {
      phase: "Testing & Deployment",
      duration: "1 month",
      description:
        "Comprehensive testing, performance optimization, and production deployment.",
      icon: CheckCircle,
    },
  ],
};

export default function CaseStudyPage({ params }: { params: { id: string } }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(342);
  const [viewCount, setViewCount] = useState(15200);

  useEffect(() => {
    // Increment view count when page loads
    setViewCount((prev) => prev + 1);
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: caseStudyData.title,
        text: caseStudyData.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      {/* <Header /> */}
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl animate-ping delay-2000"></div>
        </div>

        <div className="container relative z-10">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center text-white/70 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Content Side */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium shadow-lg animate-bounce-subtle">
                  <BarChart3 className="w-4 h-4 mr-2" aria-hidden="true" />
                  Case Study
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                  {caseStudyData.title}
                </h1>
                <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
                  {caseStudyData.description}
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="text-lg font-bold text-white">
                    {caseStudyData.results.efficiency}
                  </div>
                  <div className="text-sm text-white/70">Efficiency</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="text-lg font-bold text-white">
                    {caseStudyData.results.dataPoints}
                  </div>
                  <div className="text-sm text-white/70">Data Points</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="text-lg font-bold text-white">
                    {caseStudyData.results.uptime}
                  </div>
                  <div className="text-sm text-white/70">Uptime</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="text-lg font-bold text-white">
                    {caseStudyData.results.costReduction}
                  </div>
                  <div className="text-sm text-white/70">Cost Reduction</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-white text-slate-900 hover:bg-white/90 px-8 py-4 shadow-xl">
                  <Download className="ml-2 h-5 w-5" />
                  Download Case Study
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:text-white hover:bg-white/10 px-8 py-4 bg-transparent">
                  <ExternalLink className="ml-2 h-5 w-5" />
                  View Live Project
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={caseStudyData.heroImage}
                  alt={caseStudyData.title}
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">
                          {viewCount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart
                          className={`w-4 h-4 ${
                            isLiked ? "fill-red-500 text-red-500" : ""
                          }`}
                        />
                        <span className="text-sm">
                          {likeCount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {caseStudyData.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Challenge & Solution */}
              <div className="grid gap-8 md:grid-cols-2">
                <Card className="bg-white text-black border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-red-600">
                      <Target className="w-5 h-5 mr-2" />
                      The Challenge
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {caseStudyData.challenge}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white text-black border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-600">
                      <Zap className="w-5 h-5 mr-2" />
                      Our Solution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {caseStudyData.solution}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Key Features */}
              <Card className="bg-white text-black border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                  <CardDescription>
                    Core capabilities that made this project successful
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {caseStudyData.keyFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Development Process */}
              <Card className="bg-white text-black border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Development Process</CardTitle>
                  <CardDescription>
                    Our systematic approach to delivering exceptional results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {caseStudyData.process.map((phase, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <phase.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">
                              {phase.phase}
                            </h4>
                            <Badge className="text-black" variant="outline">
                              {phase.duration}
                            </Badge>
                          </div>
                          <p className="text-gray-600">{phase.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Testimonials */}
              <Card className="bg-white text-black border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Client Testimonials</CardTitle>
                  <CardDescription>
                    What our clients say about the project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {caseStudyData.testimonials.map((testimonial, index) => (
                      <div key={index} className="p-6 bg-gray-50 rounded-lg">
                        <div className="flex items-start space-x-4">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            width={60}
                            height={60}
                            className="rounded-full"
                          />
                          <div className="flex-1">
                            <p className="text-gray-700 mb-3 italic">
                              "{testimonial.content}"
                            </p>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {testimonial.name}
                              </p>
                              <p className="text-sm text-gray-600">
                                {testimonial.role}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Info */}
              <Card className="bg-white text-black border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Project Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Client</span>
                    <span className="font-medium">{caseStudyData.client}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Industry</span>
                    <Badge className="text-black" variant="outline">
                      {caseStudyData.industry}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">
                      {caseStudyData.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Team Size</span>
                    <span className="font-medium">{caseStudyData.team}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Budget</span>
                    <span className="font-medium">{caseStudyData.budget}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Technologies */}
              <Card className="bg-white text-black border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Technologies Used</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {caseStudyData.technologies.map((tech, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{tech.icon}</span>
                          <span className="font-medium">{tech.name}</span>
                        </div>
                        <Badge className="text-xs" variant="secondary">
                          {tech.category}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Results */}
              <Card className="bg-white text-black border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Results & Impact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(caseStudyData.results).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="font-semibold text-green-700">
                        {value}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-white hover:text-white"
                  size="lg"
                  onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Case Study
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve similar results with your
            next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-white/90 px-8 py-4 shadow-xl">
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:text-white hover:bg-white/10 px-8 py-4 bg-transparent">
              View More Projects
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
