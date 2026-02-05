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
  Search,
  Filter,
  Star,
  ExternalLink,
  Github,
  Calendar,
  Users,
  BarChart3,
  Menu,
} from "lucide-react";
import { connectMongo } from "@/lib/mongodb";
import Project from "@/models/Project";

import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";

const categories = [
  "All",
  "AI/ML",
  "E-commerce",
  "FinTech",
  "Healthcare",
  "IoT",
  "Real Estate",
];

async function getData() {
  try {
    await connectMongo();

    // Get all published projects
    const projects = await Project.find({ status: "published" }).sort({
      createdAt: -1,
    });

    return {
      projects: projects ? JSON.parse(JSON.stringify(projects)) : [],
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {
      projects: [],
    };
  }
}

export default async function ProjectsPage() {
  const { projects } = await getData();
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
                  <BarChart3 className="mr-2 h-4 w-4" aria-hidden="true" />
                  Our Portfolio
                </div>
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                  <span className="block">Transformative</span>
                  <span className="mt-1 block text-blue-700">
                    Digital Solutions
                  </span>
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                  Explore our comprehensive portfolio of cutting-edge projects
                  that have revolutionized businesses across industries. From
                  AI-powered platforms to enterprise solutions.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
                  <div className="text-3xl font-semibold text-slate-900">
                    500+
                  </div>
                  <div className="text-sm text-slate-500">
                    Projects Delivered
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
                  <div className="text-3xl font-semibold text-slate-900">
                    98%
                  </div>
                  <div className="text-sm text-slate-500">
                    Client Satisfaction
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/contact-us">
                  <Button
                    size="lg"
                    className="bg-blue-600 px-8 py-4 text-white hover:bg-blue-700">
                    Explore Projects
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact-us">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border border-blue-200 bg-white px-8 py-4 text-blue-700 hover:border-blue-400 hover:bg-blue-50">
                    View Case Studies
                  </Button>
                </Link>
              </div>
            </div>

            {/* Visual Side */}
            <div className="relative">
              <div className="relative">
                {/* Main Dashboard */}
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
                        Project Dashboard
                      </Badge>
                    </div>

                    {/* Project Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-700">
                            AI Platform
                          </span>
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-300/60" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500" />
                          </span>
                        </div>
                        <div className="text-2xl font-semibold text-slate-900">
                          94.7%
                        </div>
                        <div className="text-xs text-slate-600">
                          Success Rate
                        </div>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-700">
                            E-commerce
                          </span>
                          <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
                        </div>
                        <div className="text-2xl font-semibold text-slate-900">
                          $2.4M
                        </div>
                        <div className="text-xs text-slate-600">
                          Revenue Generated
                        </div>
                      </div>
                    </div>

                    {/* Progress Bars */}
                    <div className="space-y-3">
                      <div>
                        <div className="mb-1 flex justify-between text-sm text-slate-700">
                          <span>Project Completion</span>
                          <span>87%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-blue-50">
                          <div
                            className="h-2 animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-blue-500"
                            style={{ width: "87%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex justify-between text-sm text-slate-700">
                          <span>Client Satisfaction</span>
                          <span>98%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-blue-50">
                          <div
                            className="h-2 animate-[pulse_2.2s_ease-in-out_infinite] rounded-full bg-blue-500"
                            style={{ width: "98%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <div className="absolute -bottom-4 -left-4 flex h-16 w-16 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="border-b bg-white py-12">
        <div className="container">
          <div className="flex items-center justify-between gap-6">
            {/* Search */}
            <div className="relative w-full flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
              <Input
                placeholder="Search projects..."
                className="h-12 border-slate-300 bg-white pl-10 focus:border-blue-500"
              />
            </div>

            {/* Category Filters */}

            {/* Sort */}
            <Button
              variant="outline"
              className="flex !w-auto items-center gap-2 border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700">
              <Filter className="h-4 w-4" />
              <span className="hidden md:block">Sort by Latest</span>
            </Button>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className={cn(
                  "!px-4 !py-2 !w-auto", // Add padding to maintain button size based on content
                  category === "All"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border-blue-200 bg-white text-slate-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
                )}>
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-slate-50 py-20">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-semibold text-slate-900">
              Featured Projects
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Our most impactful and innovative solutions that have set new
              industry standards
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {projects
              .filter((project: any) => project.featured)
              .map((project: any) => (
                <Card
                  key={project._id}
                  className="group overflow-hidden border border-slate-100 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-md">
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
                      <Badge className="bg-white text-slate-700">
                        {project.category}
                      </Badge>
                      {project.featured && (
                        <Badge className="bg-blue-600 text-white">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center space-x-1 rounded-full bg-white px-2 py-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">
                          {project.rating || 5.0}
                        </span>
                      </div>
                    </div>
                  </div>

                  <CardHeader className="p-8">
                    <div className="flex h-full flex-col justify-between gap-4">
                      <div>
                        <div className="mb-4 flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="mb-3 text-2xl text-slate-900 transition-colors">
                              {project.title}
                            </CardTitle>
                            <CardDescription className="mb-4 text-base leading-relaxed text-slate-600">
                              {project.description}
                            </CardDescription>
                          </div>
                        </div>
                        {/* Tech Stack */}
                        <div className="mb-6">
                          <div className="flex flex-wrap gap-2">
                            {project.technologies &&
                              project.technologies.map((tag: string) => (
                                <span
                                  key={tag}
                                  className="cursor-pointer rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 transition-colors hover:bg-blue-100 hover:text-blue-700">
                                  {tag}dfff
                                </span>
                              ))}
                          </div>
                        </div>
                        {/* Metrics */}
                        <div className="mb-6 flex items-center justify-between gap-4 p-4">
                          {project.metrics &&
                            Object.entries(project.metrics).map(
                              ([key, value]: [string, any]) => (
                                <div key={key} className="text-center">
                                  <div className="text-lg font-bold text-blue-600">
                                    {value}
                                  </div>
                                  <div className="text-xs text-slate-600 capitalize">
                                    {key.replace(/([A-Z])/g, " $1")}
                                  </div>
                                </div>
                              )
                            )}
                        </div>
                      </div>
                      <div>
                        {/* Project Info */}
                        <div className="mb-6 flex items-center justify-between pb-2 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <div className="text-blue-600">
                              <Users className="w-4 h-4" />
                            </div>
                            <span>{project.teamSize || "8 developers"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-blue-600">
                              <Calendar className="w-4 h-4" />
                            </div>
                            <span>{project.duration || "6 months"}</span>
                          </div>
                        </div>
                        {/* Actions */}
                        <div className="flex gap-3">
                          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                            <Link
                              className="flex items-center gap-2"
                              href="/contact-us">
                              <span>View Case Study</span>
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            className="!w-auto border border-blue-200 bg-white px-5 py-2 text-blue-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-800"
                            size="icon">
                            <Link href="/contact-us">
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            className="!w-auto border border-blue-200 bg-white px-5 py-2 text-blue-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-800"
                            size="icon">
                            <Link href="/contact-us">
                              <Github className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
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
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-semibold text-slate-900">
              All Projects
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Comprehensive showcase of our diverse portfolio across multiple
              industries and technologies
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project: any) => (
              <Card
                key={project._id}
                className="group overflow-hidden border border-slate-100 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-md">
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
                    <Badge className="bg-blue-50 text-blue-700">
                      {project.category}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="flex items-center space-x-1 rounded-full bg-white px-2 py-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">
                        {project.rating || 5.0}
                      </span>
                    </div>
                  </div>
                </div>

                <CardHeader className="p-6 ">
                  <div className="flex h-full flex-col justify-between gap-2">
                    <div>
                      <CardTitle className="mb-2 line-clamp-2 text-lg text-blue-700 transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-600">
                        {project.description}
                      </CardDescription>
                    </div>
                    {/* Tech Tags */}
                    <div className="h-[120px]">
                      <div className="mb-4 flex flex-wrap gap-1">
                        {project.technologies &&
                          project.technologies
                            .slice(0, 3)
                            .map((tag: string) => (
                              <span
                                key={tag}
                                className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">
                                {tag}
                              </span>
                            ))}
                        {project.technologies &&
                          project.technologies.length > 3 && (
                            <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">
                              +{project.technologies.length - 3} more
                            </span>
                          )}
                      </div>
                      {/* Quick Metrics */}
                      <div className="grid grid-cols-3 gap-2 py-2 text-xs">
                        {project.metrics &&
                          Object.entries(project.metrics)
                            .slice(0, 3)
                            .map(([key, value]: [string, any]) => (
                              <div
                                key={key}
                                className="rounded bg-slate-50 p-2 text-center">
                                <div className="font-bold text-blue-600">
                                  {value}
                                </div>
                                <div className="text-slate-600 capitalize">
                                  {key}
                                </div>
                              </div>
                            ))}
                      </div>
                    </div>
                    <Button className="group px-8 py-4 bg-blue-600 text-white shadow-sm hover:bg-blue-700">
                      <Link
                        className="flex items-center gap-2"
                        href="/contact-us">
                        View Details
                        <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <Link href="/contact-us">
              <Button
                size="lg"
                variant="outline"
                className="px-8 bg-transparent">
                Load More Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-8 text-center">
            <h2 className="text-4xl font-semibold text-white">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl leading-relaxed text-slate-200">
              Let's discuss how we can transform your ideas into reality with
              cutting-edge technology solutions.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/contact-us">
                <Button
                  size="lg"
                  className="bg-white text-slate-900 hover:bg-white/90 px-8">
                  Start a Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact-us">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:text-white hover:bg-white/10 px-8 bg-transparent">
                  Schedule Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
