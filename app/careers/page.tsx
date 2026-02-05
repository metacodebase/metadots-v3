"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import cn from "classnames";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Loader2,
  Menu,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import { useInquiryForm } from "@/components/inquiry-form-provider";
import { useEffect, useState } from "react";

interface Job {
  _id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship" | "Freelance";
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  tags: string[];
  icon: string;
  color: string;
  featured: boolean;
  status: "draft" | "published" | "archived" | "closed";
  stats: {
    views: number;
    applications: number;
    shares: number;
    saves: number;
  };
  createdAt: string;
  updatedAt: string;
}

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
    description:
      "Create intuitive and beautiful user experiences that delight our users and drive business success.",
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
    tags: [
      "Figma",
      "UX Research",
      "Design Systems",
      "Prototyping",
      "User Testing",
    ],
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
];

const departments = [
  "All",
  "Engineering",
  "AI Research",
  "Mobile",
  "Infrastructure",
  "Design",
  "Data",
];

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description:
      "Comprehensive health, dental, and vision insurance plus wellness programs",
  },
  {
    icon: Coffee,
    title: "Flexible Work",
    description: "Remote-first culture with flexible hours and unlimited PTO",
  },
  {
    icon: TrendingUp,
    title: "Growth & Learning",
    description:
      "Professional development budget and conference attendance support",
  },
  {
    icon: Award,
    title: "Competitive Package",
    description: "Top-tier salary, equity, and performance bonuses",
  },
  {
    icon: Users,
    title: "Amazing Team",
    description:
      "Work with talented, passionate people who care about making an impact",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Build products that are used by millions of people worldwide",
  },
];

export default function CareersPage() {
  const { openInquiryForm } = useInquiryForm();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [departments, setDepartments] = useState<string[]>([
    "All",
    "Engineering",
    "AI Research",
    "Mobile",
    "Infrastructure",
    "Design",
    "Data",
  ]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams();
        if (searchTerm) params.append("search", searchTerm);
        if (departmentFilter !== "All")
          params.append("department", departmentFilter);

        const response = await fetch(`/api/jobs?${params}`);
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await response.json();
        setJobs(data.jobs);
        setDepartments(data.departments || departments);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        // Fallback to empty array if API fails
        setJobs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [searchTerm, departmentFilter]);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Code":
        return <Code className="w-8 h-8 text-white" />;
      case "Lightbulb":
        return <Lightbulb className="w-8 h-8 text-white" />;
      case "Smartphone":
        return <Smartphone className="w-8 h-8 text-white" />;
      case "Settings":
        return <Settings className="w-8 h-8 text-white" />;
      case "PenTool":
        return <PenTool className="w-8 h-8 text-white" />;
      case "Database":
        return <Database className="w-8 h-8 text-white" />;
      default:
        return <Briefcase className="w-8 h-8 text-white" />;
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* Hero Section */}
      <section className="border-b border-slate-100 bg-slate-50 py-20">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Content Side */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-100">
                  <Briefcase className="mr-2 h-4 w-4" aria-hidden="true" />
                  Join Our Team
                </div>
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                  <span className="block">Build the</span>
                  <span className="mt-1 block text-blue-700">
                    Future with Us
                  </span>
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                  Join a team of passionate innovators, engineers, and designers
                  who are transforming businesses through cutting-edge
                  technology.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
                  <div className="text-3xl font-semibold text-slate-900">
                    50+
                  </div>
                  <div className="text-sm text-slate-500">Team Members</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
                  <div className="text-3xl font-semibold text-slate-900">
                    {jobs.length}
                  </div>
                  <div className="text-sm text-slate-500">Open Positions</div>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/contact-us">
                  <Button
                    size="lg"
                    className="bg-blue-600 px-8 text-white hover:bg-blue-700">
                    View Open Roles
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact-us">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border border-blue-200 bg-white px-8 text-blue-700 hover:border-blue-400 hover:bg-blue-50">
                    Learn About Culture
                  </Button>
                </Link>
              </div>
            </div>

            {/* Visual Side - HR Dashboard */}
            <div className="relative">
              <div className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-md">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-blue-500" />
                      <span className="h-2.5 w-2.5 rounded-full bg-blue-100" />
                      <span className="h-2.5 w-2.5 rounded-full bg-blue-100" />
                    </div>
                    <Badge
                      variant="outline"
                      className="border-blue-100 bg-blue-50/60 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-blue-700">
                      Careers Hub
                    </Badge>
                  </div>

                  {/* Open Positions */}
                  <div className="space-y-3">
                    {jobs.slice(0, 3).map((job, index) => (
                      <div
                        key={job._id}
                        className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {renderIcon(job.icon)}
                            <span className="text-sm font-medium text-slate-900">
                              {job.title}
                            </span>
                          </div>
                          <Badge
                            className="border-blue-100 bg-blue-50 text-[11px] font-medium uppercase tracking-wide text-blue-700">
                            {job.featured ? "Featured" : "New"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Team Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
                      <div className="text-lg font-semibold text-slate-900">
                        98%
                      </div>
                      <div className="text-xs text-slate-500">
                        Satisfaction
                      </div>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
                      <div className="text-lg font-semibold text-slate-900">
                        15+
                      </div>
                      <div className="text-xs text-slate-500">Countries</div>
                    </div>
                  </div>

                  {/* Benefits Preview */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-3 flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium text-slate-800">
                        Benefits & Perks
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded p-2 bg-white text-center">
                        <Coffee className="mx-auto mb-1 h-3 w-3 text-blue-500" />
                        <div className="text-xs text-slate-700">Flexible</div>
                      </div>
                      <div className="rounded p-2 bg-white text-center">
                        <TrendingUp className="mx-auto mb-1 h-3 w-3 text-blue-500" />
                        <div className="text-xs text-slate-700">Growth</div>
                      </div>
                      <div className="rounded p-2 bg-white text-center">
                        <Award className="mx-auto mb-1 h-3 w-3 text-blue-500" />
                        <div className="text-xs text-slate-700">Rewards</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 flex h-16 w-16 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="absolute -bottom-4 -left-4 flex h-14 w-14 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm">
                <Briefcase className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-semibold text-slate-900">
              Why Work With Us?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              We've created an environment where talented people can do their
              best work and grow their careers
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="group border border-slate-100 bg-white text-center shadow-sm transition hover:border-blue-200 hover:shadow-md">
                <CardHeader className="p-8">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-transform group-hover:scale-105">
                    <benefit.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="mb-4 text-xl text-slate-900">
                    {benefit.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed text-slate-600">
                    {benefit.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Job Search and Filters */}
      <section className="bg-slate-100 py-12">
        <div className="container">
          <div className="flex items-center justify-between gap-6">
            {/* Search */}
            <div className="relative w-full flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
              <Input
                placeholder="Search positions..."
                className="h-12 bg-white pl-10 border-slate-200 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Sort */}
            <Button
              variant="outline"
              className="flex !w-auto items-center gap-2 border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700">
              <Filter className="h-4 w-4" />
              <span className="hidden md:block">Sort by Latest</span>
            </Button>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {departments.map((department) => (
              <Button
                key={department}
                variant={
                  departmentFilter === department ? "default" : "outline"
                }
                size="sm"
                onClick={() => setDepartmentFilter(department)}
                className={cn(
                  "!px-4 !py-2 !w-auto", // Add padding to maintain button size based on content
                  department === "All"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border-blue-200 bg-white text-slate-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
                )}>
                {department}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Positions */}
      <section className="bg-slate-50 py-20">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-semibold text-slate-900">
              Featured Positions
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              High-impact roles that are critical to our mission and growth
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {isLoading ? (
              <div className="col-span-2 flex h-32 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : jobs.filter((job) => job.featured).length === 0 ? (
              <div className="col-span-2 py-12 text-center">
                <p className="text-slate-500">
                  No featured positions available at the moment.
                </p>
              </div>
            ) : (
              jobs
                .filter((job) => job.featured)
                .map((job) => (
                  <Card
                    key={job._id}
                    className="group overflow-hidden border border-slate-100 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-md">
                    <CardHeader className="flex flex-col gap-2 p-8">
                      <div>
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center space-x-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition-transform group-hover:scale-105">
                              {renderIcon(job.icon)}
                            </div>
                            <div>
                              <CardTitle className="mb-2 text-2xl text-slate-900 transition-colors">
                                {job.title}
                              </CardTitle>
                              <div className="flex items-center space-x-4 text-sm text-slate-600">
                                <Badge className="bg-blue-50 text-blue-700">
                                  {job.department}
                                </Badge>
                                <Badge className="bg-blue-100 text-blue-800">
                                  Featured
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        <CardDescription className="mb-6 truncate text-base leading-relaxed text-slate-600">
                          {job.description}
                        </CardDescription>
                        {/* Job Details */}
                        <div className="mb-6 grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 text-slate-800">
                          <div className="flex items-center justify-center space-x-2 rounded-lg bg-white py-4 text-sm">
                            <MapPin className="w-4 h-4 text-slate-500" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center justify-center space-x-2 rounded-lg bg-white py-4 text-sm">
                            <Clock className="w-4 h-4 text-slate-500" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center justify-center space-x-2 rounded-lg bg-white py-4 text-sm">
                            <Briefcase className="w-4 h-4 text-slate-500" />
                            <span>{job.experience}</span>
                          </div>
                          <div className="flex items-center justify-center space-x-2 rounded-lg bg-white py-4 text-sm">
                            <DollarSign className="w-4 h-4 text-slate-500" />
                            <span>{job.salary}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        {/* Tech Stack */}
                        <div className="mb-6">
                          <div className="text-sm font-medium text-slate-700 mb-3">
                            Required Skills
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {job.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        {/* Actions */}
                        <div className="flex gap-3">
                          <Button
                            onClick={openInquiryForm}
                            className="flex-1 bg-blue-600 hover:bg-blue-700">
                            Apply Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                          <Button
                            className="!w-auto border border-blue-200 bg-white px-5 py-2 text-blue-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-800"
                            onClick={openInquiryForm}>
                            Learn More
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))
            )}
          </div>
        </div>
      </section>

      {/* All Positions */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-semibold text-slate-900">
              All Open Positions
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Explore all the opportunities available at Metadots
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {isLoading ? (
              <div className="col-span-2 flex h-32 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : jobs.length === 0 ? (
              <div className="col-span-2 py-12 text-center">
                <p className="text-slate-500">
                  No positions available at the moment. Please check back later.
                </p>
              </div>
            ) : (
              jobs.map((job) => (
                <Card
                  key={job._id}
                  className="group overflow-hidden border border-slate-100 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-md">
                  <CardHeader className="flex h-full flex-col justify-between gap-2 p-8">
                    <div>
                      <div className="mb-6 flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition-transform group-hover:scale-105">
                            {renderIcon(job.icon)}
                          </div>
                          <div>
                            <CardTitle className="mb-2 text-2xl text-slate-900 transition-colors">
                              {job.title}
                            </CardTitle>
                            <div className="flex items-center space-x-4 text-sm text-slate-600">
                              <Badge className="bg-blue-50 text-blue-700">
                                {job.department}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardDescription className="mb-6 truncate text-base leading-relaxed text-slate-600">
                        {job.description}
                      </CardDescription>
                      {/* Job Details */}
                      <div className="mb-6 grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 text-slate-800">
                        <div className="flex items-center justify-center space-x-2 rounded-lg bg-white py-4 text-sm">
                          <MapPin className="w-4 h-4 text-slate-500" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 rounded-lg bg-white py-4 text-sm">
                          <Clock className="w-4 h-4 text-slate-500" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 rounded-lg bg-white py-4 text-sm">
                          <Briefcase className="w-4 h-4 text-slate-500" />
                          <span>{job.experience}</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 rounded-lg bg-white py-4 text-sm">
                          <DollarSign className="w-4 h-4 text-slate-500" />
                          <span>{job.salary}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      {/* Tech Stack */}
                      <div className="mb-6">
                        <div className="mb-3 text-sm font-medium text-slate-700">
                          Required Skills
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {job.tags.map((tag) => (
                            <span
                              key={tag}
                              className="cursor-pointer rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 transition-colors hover:bg-blue-100 hover:text-blue-700">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      {/* Actions */}
                      <div className="flex gap-3">
                        <Button
                          onClick={openInquiryForm}
                          className="flex-1 bg-blue-600 hover:bg-blue-700">
                          Apply Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button
                          onClick={openInquiryForm}
                          className="!w-auto border border-blue-200 bg-white px-5 py-2 text-blue-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-800">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
