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
    color: "from-yellow-500 to-orange-600",
  },
  {
    icon: Users,
    title: "Client Success",
    description:
      "Your success is our success. We're committed to delivering exceptional value and results.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: Heart,
    title: "Quality Obsessed",
    description:
      "We maintain the highest standards in everything we do, from code to customer service.",
    color: "from-red-500 to-pink-600",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description:
      "We build solutions that make a positive difference in businesses and communities worldwide.",
    color: "from-green-500 to-emerald-600",
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
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Content Side */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium shadow-lg">
                  <Users className="w-4 h-4 mr-2" aria-hidden="true" />
                  About Metadots
                </div>
                <h1 className="text-5xl font-bold tracking-tight sm:text-6xl text-white">
                  <span className="block">Building the</span>
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Future of Tech
                  </span>
                </h1>
                <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
                  We're a team of passionate innovators, engineers, and
                  designers dedicated to transforming businesses through
                  cutting-edge technology solutions.
                </p>
              </div>

              {/* Company Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-white">10+</div>
                  <div className="text-sm text-white/70">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-sm text-white/70">
                    Projects Delivered
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact-us">
                  <Button
                    size="lg"
                    className="bg-white text-slate-900 hover:bg-white/90 px-8">
                    Our Story
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact-us">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:text-white hover:bg-white/10 bg-transparent">
                    Meet the Team
                  </Button>
                </Link>
              </div>
            </div>

            {/* Visual Side - Company Dashboard */}
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
                    <Badge className="bg-white/20 text-white backdrop-blur-sm">
                      Company Overview
                    </Badge>
                  </div>

                  {/* Team Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/80 text-sm">
                          Global Team
                        </span>
                        <Users className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="text-2xl font-bold text-white">50+</div>
                      <div className="text-xs text-white/60">
                        Experts Worldwide
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/80 text-sm">Countries</span>
                        <Globe className="w-4 h-4 text-green-400" />
                      </div>
                      <div className="text-2xl font-bold text-white">25+</div>
                      <div className="text-xs text-white/60">
                        Global Presence
                      </div>
                    </div>
                  </div>

                  {/* Mission Progress */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white font-medium">
                        Mission Progress
                      </span>
                      <Target className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-white/80 text-sm">
                        <span>Innovation Goals</span>
                        <span>92%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
                          style={{ width: "92%" }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Values */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white/5 rounded-lg p-3 text-center">
                      <Heart className="w-5 h-5 text-red-400 mx-auto mb-1" />
                      <div className="text-white/80 text-xs">Quality</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 text-center">
                      <Lightbulb className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                      <div className="text-white/80 text-xs">Innovation</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-xl flex items-center justify-center animate-float">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg shadow-xl flex items-center justify-center animate-float delay-1000">
                <TrendingUp className="w-5 h-5 text-white" />
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
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 p-8 shadow-2xl">
                <div className="h-full w-full rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center mx-auto">
                      <Target className="w-10 h-10 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white">
                        Innovation Driven
                      </h3>
                      <p className="text-white/80">
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
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do and shape our company
              culture
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card
                key={index}
                className="group text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white">
                <CardHeader className="p-8">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-4">{value.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work - Roadmap */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg mb-6">
              <Rocket className="w-5 h-5 mr-2" />
              Our Process
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">How We Work</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Our proven methodology ensures successful project delivery from
              concept to launch and beyond
            </p>
          </div>

          {/* Roadmap */}
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 hidden lg:block"></div>

            <div className="space-y-16">
              {workflowSteps.map((step, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}>
                  {/* Step Number Circle */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-white to-slate-100 border-4 border-blue-400 flex items-center justify-center shadow-xl z-10 hidden lg:flex">
                    <span className="text-lg font-bold text-slate-900">
                      {step.step}
                    </span>
                  </div>

                  {/* Content Card */}
                  <div
                    className={`w-full lg:w-5/12 ${
                      index % 2 === 0 ? "lg:pr-16" : "lg:pl-16"
                    }`}>
                    <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 shadow-xl">
                      <CardHeader className="p-8">
                        <div className="flex items-center space-x-4 mb-6">
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                            <step.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-sm text-white/60 font-medium">
                              Step {step.step}
                            </div>
                            <CardTitle className="text-2xl text-white">
                              {step.title}
                            </CardTitle>
                          </div>
                        </div>

                        <CardDescription className="text-white/80 text-base leading-relaxed mb-6">
                          {step.description}
                        </CardDescription>

                        <div className="space-y-3 mb-6">
                          {step.details.map((detail, detailIndex) => (
                            <div
                              key={detailIndex}
                              className="flex items-center space-x-3">
                              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                              <span className="text-white/80 text-sm">
                                {detail}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-white/60">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{step.duration}</span>
                          </div>
                          <Button
                            variant="ghost"
                            className="text-white hover:text-white hover:bg-white/10">
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  </div>

                  {/* Mobile Step Number */}
                  <div className="lg:hidden mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white to-slate-100 border-4 border-blue-400 flex items-center justify-center shadow-xl">
                      <span className="text-sm font-bold text-slate-900">
                        {step.step}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Let's discuss how our proven process can help bring your vision to
              life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact-us">
                <Button
                  size="lg"
                  className="bg-white text-slate-900 hover:bg-white/90 px-8">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact-us">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:text-white hover:bg-white/10 px-8 bg-transparent">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Schedule a Call
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Meet the visionaries and experts leading our mission to transform
              businesses through technology
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white">
                <div className="relative">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <CardHeader className="p-6">
                  <CardTitle className="text-xl mb-1">{member.name}</CardTitle>
                  <div className="text-blue-600 font-medium mb-3">
                    {member.role}
                  </div>
                  <CardDescription className="text-sm leading-relaxed mb-4">
                    {member.bio}
                  </CardDescription>

                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-slate-700 mb-2">
                        Expertise
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {member.expertise.map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="text-xs text-slate-700 font-medium">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-slate-900">
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
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
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
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
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
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-white" />
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
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
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
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 p-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        50+
                      </div>
                      <div className="text-sm text-blue-700">Team Members</div>
                    </div>
                  </div>
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-green-100 to-green-200 p-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        15+
                      </div>
                      <div className="text-sm text-green-700">Countries</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 p-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        98%
                      </div>
                      <div className="text-sm text-purple-700">
                        Satisfaction
                      </div>
                    </div>
                  </div>
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 p-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600 mb-2">
                        24/7
                      </div>
                      <div className="text-sm text-orange-700">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="container">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white">
              Ready to Work Together?
            </h2>
            <p className="text-xl text-white/80 leading-relaxed">
              Let's discuss how we can help transform your business with
              innovative technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
