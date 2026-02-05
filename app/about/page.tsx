import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Users,
  Target,
  Lightbulb,
  Award,
  Globe,
  Heart,
  CheckCircle,
  MessageSquare,
  Code,
  Rocket,
  TrendingUp,
  Clock,
  Search,
  Settings,
  Menu,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "CEO & Founder",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Visionary leader with 15+ years in tech innovation and business transformation.",
    expertise: ["Strategy", "AI", "Leadership"],
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Sarah Chen",
    role: "CTO",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Technical architect specializing in scalable systems and emerging technologies.",
    expertise: ["Architecture", "Cloud", "DevOps"],
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Michael Rodriguez",
    role: "Head of AI",
    image: "/placeholder.svg?height=300&width=300",
    bio: "AI researcher and practitioner with expertise in machine learning and data science.",
    expertise: ["Machine Learning", "Data Science", "Research"],
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Emma Thompson",
    role: "Design Director",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Creative leader focused on user-centered design and digital experiences.",
    expertise: ["UX Design", "Product Design", "Strategy"],
    social: { linkedin: "#", twitter: "#" },
  },
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    description:
      "We push boundaries and embrace cutting-edge technologies to solve complex challenges.",
  },
  {
    icon: Users,
    title: "Client Success",
    description:
      "Your success is our success. We're committed to delivering exceptional value and results.",
  },
  {
    icon: Heart,
    title: "Quality Obsessed",
    description:
      "We maintain the highest standards in everything we do, from code to customer service.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description:
      "We build solutions that make a positive difference in businesses and communities worldwide.",
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Discovery & Strategy",
    description:
      "We dive deep into your business needs, challenges, and goals to create a comprehensive strategy.",
    icon: Search,
    details: [
      "Stakeholder interviews and workshops",
      "Technical requirements analysis",
      "Market research and competitive analysis",
      "Strategic roadmap development",
    ],
    duration: "1-2 weeks",
    color: "from-blue-500 to-indigo-600",
  },
  {
    step: "02",
    title: "Design & Architecture",
    description:
      "Our team creates detailed designs and technical architecture for your solution.",
    icon: Settings,
    details: [
      "User experience design and prototyping",
      "System architecture planning",
      "Technology stack selection",
      "Security and compliance planning",
    ],
    duration: "2-3 weeks",
    color: "from-purple-500 to-pink-600",
  },
  {
    step: "03",
    title: "Development & Testing",
    description:
      "We build your solution using agile methodologies with continuous testing and feedback.",
    icon: Code,
    details: [
      "Agile development sprints",
      "Continuous integration and deployment",
      "Automated testing and quality assurance",
      "Regular client demos and feedback",
    ],
    duration: "8-16 weeks",
    color: "from-green-500 to-emerald-600",
  },
  {
    step: "04",
    title: "Launch & Optimization",
    description:
      "We deploy your solution and provide ongoing support to ensure optimal performance.",
    icon: Rocket,
    details: [
      "Production deployment and monitoring",
      "Performance optimization",
      "User training and documentation",
      "Ongoing support and maintenance",
    ],
    duration: "Ongoing",
    color: "from-orange-500 to-red-600",
  },
];

export default function AboutPage() {
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
                  <Users className="mr-2 h-4 w-4" aria-hidden="true" />
                  About Metadots
                </div>
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                  <span className="block">Building the</span>
                  <span className="mt-1 block text-blue-700">Future of Tech</span>
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                  We're a team of passionate innovators, engineers, and
                  designers dedicated to transforming businesses through
                  cutting-edge technology solutions.
                </p>
              </div>

              {/* Company Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
                  <div className="text-3xl font-semibold text-slate-900">
                    10+
                  </div>
                  <div className="text-sm text-slate-500">Years Experience</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
                  <div className="text-3xl font-semibold text-slate-900">
                    500+
                  </div>
                  <div className="text-sm text-slate-500">
                    Projects Delivered
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/contact-us">
                  <Button
                    size="lg"
                    className="bg-blue-600 px-8 text-white hover:bg-blue-700">
                    Our Story
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact-us">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border border-blue-200 bg-white px-8 text-blue-700 hover:border-blue-400 hover:bg-blue-50">
                    Meet the Team
                  </Button>
                </Link>
              </div>
            </div>

            {/* Visual Side - Company Dashboard */}
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
                      Company Overview
                    </Badge>
                  </div>

                  {/* Team Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">
                          Global Team
                        </span>
                        <Users className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="text-2xl font-semibold text-slate-900">
                        50+
                      </div>
                      <div className="text-xs text-slate-500">
                        Experts Worldwide
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">
                          Countries
                        </span>
                        <Globe className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="text-2xl font-semibold text-slate-900">
                        25+
                      </div>
                      <div className="text-xs text-slate-500">
                        Global Presence
                      </div>
                    </div>
                  </div>

                  {/* Mission Progress */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-800">
                        Mission Progress
                      </span>
                      <Target className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-slate-700">
                        <span>Innovation Goals</span>
                        <span>92%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-blue-50">
                        <div
                          className="h-2 animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-blue-500"
                          style={{ width: "92%" }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Values */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-slate-50 p-3 text-center">
                      <Heart className="mx-auto mb-1 h-5 w-5 text-blue-500" />
                      <div className="text-xs text-slate-700">Quality</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3 text-center">
                      <Lightbulb className="mx-auto mb-1 h-5 w-5 text-blue-500" />
                      <div className="text-xs text-slate-700">Innovation</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 flex h-16 w-16 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <div className="absolute -bottom-4 -left-4 flex h-14 w-14 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-slate-900">
                  Our Mission
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  To empower businesses with innovative technology solutions
                  that drive growth, efficiency, and competitive advantage. We
                  believe that the right technology, implemented thoughtfully,
                  can transform organizations and create lasting value.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Our approach combines deep technical expertise with business
                  acumen, ensuring that every solution we deliver not only meets
                  technical requirements but also drives real business outcomes.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-900">
                  Our Vision
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  To be the global leader in AI-powered business transformation,
                  helping organizations navigate the digital future with
                  confidence and success.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-md">
                <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white">
                  <div className="space-y-6 text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                      <Target className="h-10 w-10" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold text-slate-900">
                        Innovation Driven
                      </h3>
                      <p className="text-slate-600">
                        We're constantly exploring new technologies and
                        methodologies to deliver cutting-edge solutions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-slate-50 py-20">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-semibold text-slate-900">
              Our Core Values
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              The principles that guide everything we do and shape our company
              culture
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card
                key={index}
                className="group border border-slate-100 bg-white text-center shadow-sm transition hover:border-blue-200 hover:shadow-md">
                <CardHeader className="p-8">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-transform group-hover:scale-105">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="mb-4 text-xl text-slate-900">
                    {value.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed text-slate-600">
                    {value.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work - Roadmap */}
      <section className="relative overflow-hidden bg-white py-20 md:py-32">
        <div className="container">
          <div className="mb-20 text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-blue-50 px-6 py-3 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-100">
              <Rocket className="mr-2 h-5 w-5" />
              Our Process
            </div>
            <h2 className="mb-6 text-4xl font-semibold text-slate-900">
              How We Work
            </h2>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-600">
              Our proven methodology ensures successful project delivery from
              concept to launch and beyond
            </p>
          </div>

          {/* Roadmap */}
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 transform bg-slate-200 lg:block" />

            <div className="space-y-16">
              {workflowSteps.map((step, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}>
                  {/* Step Number Circle */}
                  <div className="absolute left-1/2 z-10 hidden h-16 w-16 -translate-x-1/2 transform items-center justify-center rounded-full border-4 border-blue-500 bg-white shadow-lg lg:flex">
                    <span className="text-lg font-semibold text-slate-900">
                      {step.step}
                    </span>
                  </div>

                  {/* Content Card */}
                  <div
                    className={`w-full lg:w-5/12 ${
                      index % 2 === 0 ? "lg:pr-16" : "lg:pl-16"
                    }`}>
                    <Card className="border border-slate-200 bg-slate-50/80 shadow-sm transition hover:border-blue-200 hover:bg-white hover:shadow-md">
                      <CardHeader className="p-8">
                        <div className="mb-6 flex items-center space-x-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                            <step.icon className="h-6 w-6" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-500">
                              Step {step.step}
                            </div>
                            <CardTitle className="text-2xl text-slate-900">
                              {step.title}
                            </CardTitle>
                          </div>
                        </div>

                        <CardDescription className="mb-6 text-base leading-relaxed text-slate-600">
                          {step.description}
                        </CardDescription>

                        <div className="space-y-3 mb-6">
                          {step.details.map((detail, detailIndex) => (
                            <div
                              key={detailIndex}
                              className="flex items-center space-x-3">
                              <CheckCircle className="h-4 w-4 flex-shrink-0 text-blue-500" />
                              <span className="text-sm text-slate-700">
                                {detail}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-slate-500">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">{step.duration}</span>
                          </div>
                          <Button
                            variant="ghost"
                            className="text-blue-600 hover:bg-blue-50 hover:text-blue-700">
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  </div>

                  {/* Mobile Step Number */}
                  <div className="mb-4 lg:hidden">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-blue-500 bg-white shadow-lg">
                      <span className="text-sm font-semibold text-slate-900">
                        {step.step}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <h3 className="mb-4 text-2xl font-semibold text-slate-900">
              Ready to Start Your Project?
            </h3>
            <p className="mb-8 mx-auto max-w-2xl text-slate-600">
              Let's discuss how our proven process can help bring your vision to
              life.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/contact-us">
                <Button
                  size="lg"
                  className="bg-blue-600 px-8 text-white hover:bg-blue-700">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact-us">
                <Button
                  size="lg"
                  variant="outline"
                  className="border border-blue-200 bg-white px-8 text-blue-700 hover:border-blue-400 hover:bg-blue-50">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Schedule a Call
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="bg-slate-50 py-20">
        <div className="container">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl font-semibold text-slate-900">
                  Our Culture
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  We've built a culture that celebrates innovation,
                  collaboration, and continuous learning. Our team is our
                  greatest asset, and we're committed to creating an environment
                  where everyone can thrive.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Collaborative
                  </h3>
                  <p className="text-slate-600">
                    We believe the best solutions come from diverse perspectives
                    working together.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Growth-Oriented
                  </h3>
                  <p className="text-slate-600">
                    We invest in our people's development and encourage
                    continuous learning.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Lightbulb className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Innovative
                  </h3>
                  <p className="text-slate-600">
                    We encourage experimentation and embrace new ideas and
                    technologies.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Excellence
                  </h3>
                  <p className="text-slate-600">
                    We maintain high standards and take pride in delivering
                    exceptional work.
                  </p>
                </div>
              </div>

              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700">
                <Link href="/careers">
                  Join Our Team
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex aspect-square items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 p-6">
                    <div className="text-center">
                      <div className="mb-2 text-3xl font-bold text-blue-700">
                        50+
                      </div>
                      <div className="text-sm text-blue-600">Team Members</div>
                    </div>
                  </div>
                  <div className="flex aspect-square items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 p-6">
                    <div className="text-center">
                      <div className="mb-2 text-3xl font-bold text-blue-700">
                        15+
                      </div>
                      <div className="text-sm text-blue-600">Countries</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="flex aspect-square items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 p-6">
                    <div className="text-center">
                      <div className="mb-2 text-3xl font-bold text-blue-700">
                        98%
                      </div>
                      <div className="text-sm text-blue-600">
                        Satisfaction
                      </div>
                    </div>
                  </div>
                  <div className="flex aspect-square items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 p-6">
                    <div className="text-center">
                      <div className="mb-2 text-3xl font-bold text-blue-700">
                        24/7
                      </div>
                      <div className="text-sm text-blue-600">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-8 text-center">
            <h2 className="text-4xl font-semibold text-white">
              Ready to Work Together?
            </h2>
            <p className="text-xl leading-relaxed text-slate-200">
              Let's discuss how we can help transform your business with
              innovative technology solutions.
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
