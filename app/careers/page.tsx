import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Briefcase,
  Heart,
  Coffee,
  Globe,
  TrendingUp,
  Award,
  Search,
  Filter,
  Code,
  Smartphone,
  Database,
  Lightbulb,
  PenTool,
  Settings,
} from "lucide-react"
"use client"

import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/footer"
import { useInquiryForm } from "@/components/inquiry-form-provider"

const jobOpenings = [
  {
    id: 1,
    title: "Senior Full-Stack Developer",
    department: "Engineering",
    location: "Remote / San Francisco",
    type: "Full-time",
    experience: "5+ years",
    salary: "$120k - $180k",
    description:
      "Join our engineering team to build scalable web applications using modern technologies. You'll work on challenging projects that impact millions of users.",
    requirements: [
      "5+ years of experience with React, Node.js, and TypeScript",
      "Experience with cloud platforms (AWS, GCP, or Azure)",
      "Strong understanding of database design and optimization",
      "Experience with microservices architecture",
      "Excellent problem-solving and communication skills",
    ],
    benefits: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "Flexible work arrangements",
      "Professional development budget",
      "Latest tech equipment",
    ],
    tags: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"],
    icon: Code,
    color: "from-blue-500 to-indigo-600",
    featured: true,
  },
  {
    id: 2,
    title: "AI/ML Engineer",
    department: "AI Research",
    location: "Remote / New York",
    type: "Full-time",
    experience: "3+ years",
    salary: "$130k - $200k",
    description:
      "Lead the development of cutting-edge AI solutions and machine learning models that power our intelligent applications.",
    requirements: [
      "3+ years of experience in machine learning and AI",
      "Proficiency in Python, TensorFlow, and PyTorch",
      "Experience with large language models and NLP",
      "Strong mathematical and statistical background",
      "Experience with MLOps and model deployment",
    ],
    benefits: [
      "Top-tier compensation package",
      "Research and conference budget",
      "Access to latest AI tools and platforms",
      "Flexible work schedule",
      "Health and wellness benefits",
    ],
    tags: ["Python", "TensorFlow", "PyTorch", "NLP", "MLOps"],
    icon: Lightbulb,
    color: "from-purple-500 to-pink-600",
    featured: true,
  },
  {
    id: 3,
    title: "Mobile App Developer (React Native)",
    department: "Mobile",
    location: "Remote / Austin",
    type: "Full-time",
    experience: "4+ years",
    salary: "$110k - $160k",
    description:
      "Build beautiful and performant mobile applications that deliver exceptional user experiences across iOS and Android platforms.",
    requirements: [
      "4+ years of React Native development experience",
      "Strong knowledge of JavaScript/TypeScript",
      "Experience with native iOS and Android development",
      "Understanding of mobile app performance optimization",
      "Experience with app store deployment processes",
    ],
    benefits: [
      "Competitive salary and benefits",
      "Mobile device allowance",
      "Flexible working hours",
      "Learning and development opportunities",
      "Team building events",
    ],
    tags: ["React Native", "iOS", "Android", "JavaScript", "TypeScript"],
    icon: Smartphone,
    color: "from-green-500 to-emerald-600",
    featured: false,
  },
  {
    id: 4,
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Remote / Seattle",
    type: "Full-time",
    experience: "4+ years",
    salary: "$115k - $170k",
    description:
      "Design and maintain our cloud infrastructure, ensuring scalability, security, and reliability of our systems.",
    requirements: [
      "4+ years of DevOps and cloud infrastructure experience",
      "Expertise in AWS, Docker, and Kubernetes",
      "Experience with Infrastructure as Code (Terraform, CloudFormation)",
      "Strong knowledge of CI/CD pipelines",
      "Experience with monitoring and logging tools",
    ],
    benefits: [
      "Excellent compensation package",
      "Cloud certification support",
      "Home office setup allowance",
      "Flexible PTO policy",
      "Professional development budget",
    ],
    tags: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
    icon: Settings,
    color: "from-orange-500 to-red-600",
    featured: false,
  },
  {
    id: 5,
    title: "UX/UI Designer",
    department: "Design",
    location: "Remote / Los Angeles",
    type: "Full-time",
    experience: "3+ years",
    salary: "$90k - $140k",
    description: "Create intuitive and beautiful user experiences that delight our users and drive business success.",
    requirements: [
      "3+ years of UX/UI design experience",
      "Proficiency in Figma, Sketch, and design systems",
      "Strong portfolio demonstrating design thinking",
      "Experience with user research and testing",
      "Understanding of front-end development principles",
    ],
    benefits: [
      "Competitive salary and equity",
      "Design tools and software licenses",
      "Conference and workshop attendance",
      "Flexible work environment",
      "Health and wellness benefits",
    ],
    tags: ["Figma", "UX Research", "Design Systems", "Prototyping", "User Testing"],
    icon: PenTool,
    color: "from-pink-500 to-rose-600",
    featured: false,
  },
  {
    id: 6,
    title: "Data Engineer",
    department: "Data",
    location: "Remote / Chicago",
    type: "Full-time",
    experience: "4+ years",
    salary: "$120k - $175k",
    description:
      "Build and maintain data pipelines and infrastructure that power our analytics and machine learning capabilities.",
    requirements: [
      "4+ years of data engineering experience",
      "Expertise in Python, SQL, and data warehousing",
      "Experience with big data technologies (Spark, Kafka, Airflow)",
      "Knowledge of cloud data platforms (Snowflake, BigQuery, Redshift)",
      "Strong understanding of data modeling and ETL processes",
    ],
    benefits: [
      "Competitive compensation",
      "Data platform access and training",
      "Flexible work arrangements",
      "Professional development support",
      "Comprehensive health benefits",
    ],
    tags: ["Python", "SQL", "Spark", "Kafka", "Snowflake"],
    icon: Database,
    color: "from-teal-500 to-cyan-600",
    featured: false,
  },
]

const departments = ["All", "Engineering", "AI Research", "Mobile", "Infrastructure", "Design", "Data"]

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health, dental, and vision insurance plus wellness programs",
  },
  {
    icon: Coffee,
    title: "Flexible Work",
    description: "Remote-first culture with flexible hours and unlimited PTO",
  },
  {
    icon: TrendingUp,
    title: "Growth & Learning",
    description: "Professional development budget and conference attendance support",
  },
  {
    icon: Award,
    title: "Competitive Package",
    description: "Top-tier salary, equity, and performance bonuses",
  },
  {
    icon: Users,
    title: "Amazing Team",
    description: "Work with talented, passionate people who care about making an impact",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Build products that are used by millions of people worldwide",
  },
]

export default function CareersPage() {
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
            <Link href="/projects" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Projects
            </Link>
            <Link href="/blogs" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Blog
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="#" className="text-sm font-medium text-blue-600">
              Careers
            </Link>
          </nav>
          <Button className="bg-blue-600 hover:bg-blue-700">Get a Quote</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Content Side */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-medium shadow-lg">
                  <Briefcase className="w-4 h-4 mr-2" aria-hidden="true" />
                  Join Our Team
                </div>
                <h1 className="text-5xl font-bold tracking-tight sm:text-6xl text-white">
                  <span className="block">Build the</span>
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Future with Us
                  </span>
                </h1>
                <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
                  Join a team of passionate innovators, engineers, and designers who are transforming businesses through
                  cutting-edge technology.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-white">50+</div>
                  <div className="text-sm text-white/70">Team Members</div>
                </div>
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-white">6</div>
                  <div className="text-sm text-white/70">Open Positions</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90 px-8">
                  View Open Roles
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                  Learn About Culture
                </Button>
              </div>
            </div>

            {/* Visual Side - HR Dashboard */}
            <div className="relative">
              <div className="relative rounded-3xl bg-white/10 backdrop-blur-sm p-8 shadow-2xl border border-white/20">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-100"></div>
                      <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse delay-200"></div>
                    </div>
                    <Badge className="bg-white/20 text-white backdrop-blur-sm">Careers Hub</Badge>
                  </div>

                  {/* Open Positions */}
                  <div className="space-y-3">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Code className="w-4 h-4 text-blue-400" />
                          <span className="text-white text-sm">Senior Developer</span>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 text-xs">New</Badge>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Lightbulb className="w-4 h-4 text-purple-400" />
                          <span className="text-white text-sm">AI Engineer</span>
                        </div>
                        <Badge className="bg-blue-500/20 text-blue-400 text-xs">Hot</Badge>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <PenTool className="w-4 h-4 text-pink-400" />
                          <span className="text-white text-sm">UX Designer</span>
                        </div>
                        <Badge className="bg-orange-500/20 text-orange-400 text-xs">Remote</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Team Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-white">98%</div>
                      <div className="text-xs text-white/60">Satisfaction</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-white">15+</div>
                      <div className="text-xs text-white/60">Countries</div>
                    </div>
                  </div>

                  {/* Benefits Preview */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center space-x-2 mb-3">
                      <Heart className="w-4 h-4 text-red-400" />
                      <span className="text-white font-medium text-sm">Benefits & Perks</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-white/5 rounded p-2 text-center">
                        <Coffee className="w-3 h-3 text-yellow-400 mx-auto mb-1" />
                        <div className="text-white/80 text-xs">Flexible</div>
                      </div>
                      <div className="bg-white/5 rounded p-2 text-center">
                        <TrendingUp className="w-3 h-3 text-green-400 mx-auto mb-1" />
                        <div className="text-white/80 text-xs">Growth</div>
                      </div>
                      <div className="bg-white/5 rounded p-2 text-center">
                        <Award className="w-3 h-3 text-purple-400 mx-auto mb-1" />
                        <div className="text-white/80 text-xs">Rewards</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl shadow-xl flex items-center justify-center animate-float">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg shadow-xl flex items-center justify-center animate-float delay-1000">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Work With Us?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We've created an environment where talented people can do their best work and grow their careers
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="group text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white"
              >
                <CardHeader className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-4">{benefit.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{benefit.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Job Search and Filters */}
      <section className="py-12 bg-slate-50 border-b">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input placeholder="Search positions..." className="pl-10 h-12 border-slate-200 focus:border-blue-500" />
            </div>

            {/* Department Filters */}
            <div className="flex flex-wrap gap-2">
              {departments.map((department) => (
                <Button
                  key={department}
                  variant={department === "All" ? "default" : "outline"}
                  size="sm"
                  className={
                    department === "All" ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-50 hover:text-blue-600"
                  }
                >
                  {department}
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

      {/* Featured Positions */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Positions</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              High-impact roles that are critical to our mission and growth
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {jobOpenings
              .filter((job) => job.featured)
              .map((job) => (
                <Card
                  key={job.id}
                  className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] bg-white"
                >
                  <CardHeader className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${job.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <job.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl mb-2 group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </CardTitle>
                          <div className="flex items-center space-x-4 text-sm text-slate-600">
                            <Badge className="bg-blue-100 text-blue-700">{job.department}</Badge>
                            <Badge className="bg-green-100 text-green-700">Featured</Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <CardDescription className="text-base leading-relaxed mb-6">{job.description}</CardDescription>

                    {/* Job Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="w-4 h-4 text-slate-500" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Briefcase className="w-4 h-4 text-slate-500" />
                        <span>{job.experience}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <DollarSign className="w-4 h-4 text-slate-500" />
                        <span>{job.salary}</span>
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-6">
                      <div className="text-sm font-medium text-slate-700 mb-3">Required Skills</div>
                      <div className="flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button onClick={openInquiryForm} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button variant="outline" onClick={openInquiryForm}>Learn More</Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* All Positions */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">All Open Positions</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore all the opportunities available at Metadots
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {jobOpenings.map((job) => (
              <Card
                key={job.id}
                className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] bg-white"
              >
                <CardHeader className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${job.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <job.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl mb-2 group-hover:text-blue-600 transition-colors">
                          {job.title}
                        </CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-slate-600">
                          <Badge className="bg-blue-100 text-blue-700">{job.department}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardDescription className="text-base leading-relaxed mb-6">{job.description}</CardDescription>

                  {/* Job Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Briefcase className="w-4 h-4 text-slate-500" />
                      <span>{job.experience}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <DollarSign className="w-4 h-4 text-slate-500" />
                      <span>{job.salary}</span>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <div className="text-sm font-medium text-slate-700 mb-3">Required Skills</div>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button onClick={openInquiryForm} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" onClick={openInquiryForm}>Learn More</Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
