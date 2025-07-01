import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Eye,
  Heart,
  Share2,
  Bookmark,
  Twitter,
  Linkedin,
  Facebook,
  LinkIcon,
  MessageSquare,
  ThumbsUp,
} from "lucide-react"
"use client"

import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/footer"
import { useInquiryForm } from "@/components/inquiry-form-provider"

// This would typically come from a database or API
const blogPost = {
  id: 1,
  title: "The Future of AI in Business Transformation",
  excerpt:
    "Explore how artificial intelligence is revolutionizing business operations across industries, from automation to predictive analytics and beyond.",
  content: `
    <p>Artificial intelligence is no longer a futuristic concept—it's a present reality that's transforming how businesses operate, compete, and grow. From small startups to Fortune 500 companies, organizations across every industry are leveraging AI to streamline operations, enhance customer experiences, and drive innovation.</p>

    <h2>The Current State of AI in Business</h2>
    <p>Today's AI landscape is characterized by rapid advancement and widespread adoption. Machine learning algorithms are becoming more sophisticated, natural language processing is reaching human-like capabilities, and computer vision is enabling new forms of automation and analysis.</p>

    <p>Key areas where AI is making the biggest impact include:</p>
    <ul>
      <li><strong>Customer Service:</strong> Chatbots and virtual assistants are handling routine inquiries, freeing up human agents for complex issues</li>
      <li><strong>Predictive Analytics:</strong> Companies are using AI to forecast demand, identify trends, and make data-driven decisions</li>
      <li><strong>Process Automation:</strong> Repetitive tasks are being automated, improving efficiency and reducing errors</li>
      <li><strong>Personalization:</strong> AI is enabling hyper-personalized experiences across marketing, e-commerce, and content delivery</li>
    </ul>

    <h2>Emerging Trends and Technologies</h2>
    <p>As we look toward the future, several emerging trends are set to reshape the AI landscape:</p>

    <h3>1. Generative AI and Large Language Models</h3>
    <p>The rise of GPT-4, Claude, and other large language models is democratizing AI capabilities. These tools are enabling businesses to automate content creation, code generation, and complex reasoning tasks.</p>

    <h3>2. Edge AI and Real-time Processing</h3>
    <p>Moving AI processing closer to the data source is reducing latency and improving privacy. This trend is particularly important for IoT applications, autonomous vehicles, and real-time decision-making systems.</p>

    <h3>3. Explainable AI (XAI)</h3>
    <p>As AI systems become more complex, the need for transparency and explainability grows. XAI techniques are helping businesses understand how AI makes decisions, which is crucial for regulatory compliance and building trust.</p>

    <h2>Implementation Strategies</h2>
    <p>Successfully implementing AI in business requires a strategic approach:</p>

    <ol>
      <li><strong>Start with Clear Objectives:</strong> Define specific business problems that AI can solve</li>
      <li><strong>Invest in Data Quality:</strong> AI is only as good as the data it's trained on</li>
      <li><strong>Build Internal Capabilities:</strong> Develop AI literacy across your organization</li>
      <li><strong>Partner with Experts:</strong> Work with AI specialists to accelerate implementation</li>
      <li><strong>Iterate and Improve:</strong> Continuously refine your AI systems based on performance and feedback</li>
    </ol>

    <h2>Challenges and Considerations</h2>
    <p>While AI offers tremendous opportunities, businesses must also navigate several challenges:</p>

    <ul>
      <li><strong>Ethical Considerations:</strong> Ensuring AI systems are fair, unbiased, and respect privacy</li>
      <li><strong>Regulatory Compliance:</strong> Staying compliant with evolving AI regulations</li>
      <li><strong>Skills Gap:</strong> Finding and retaining AI talent in a competitive market</li>
      <li><strong>Integration Complexity:</strong> Seamlessly integrating AI into existing systems and workflows</li>
    </ul>

    <h2>The Road Ahead</h2>
    <p>The future of AI in business is bright, with new possibilities emerging constantly. Organizations that embrace AI today will be better positioned to compete in tomorrow's digital economy. The key is to start with a clear strategy, invest in the right capabilities, and remain adaptable as the technology continues to evolve.</p>

    <p>As we move forward, AI will become increasingly integrated into every aspect of business operations. The companies that thrive will be those that view AI not just as a tool, but as a fundamental component of their competitive strategy.</p>
  `,
  category: "AI & Machine Learning",
  author: {
    name: "Sarah Chen",
    avatar: "/placeholder.svg?height=60&width=60",
    role: "AI Research Lead",
    bio: "Sarah is a leading AI researcher with over 10 years of experience in machine learning and business transformation. She has helped dozens of companies implement AI solutions that drive real business value.",
  },
  publishedAt: "2024-01-15",
  updatedAt: "2024-01-16",
  readTime: "8 min read",
  image: "/placeholder.svg?height=500&width=800",
  tags: ["AI", "Business", "Transformation", "Machine Learning", "Strategy"],
  stats: {
    views: "12.5K",
    likes: "342",
    shares: "89",
    comments: "23",
  },
  color: "from-blue-500 to-indigo-600",
}

const relatedPosts = [
  {
    id: 2,
    title: "Building Scalable Web Applications with Modern Architecture",
    excerpt:
      "Discover the architectural patterns and best practices that enable applications to handle millions of users.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Web Development",
    readTime: "12 min read",
    publishedAt: "2024-01-12",
  },
  {
    id: 3,
    title: "The Rise of Cloud-Native Applications",
    excerpt: "Understanding how cloud-native development is changing the way we build and deploy applications.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Cloud Computing",
    readTime: "10 min read",
    publishedAt: "2024-01-10",
  },
  {
    id: 4,
    title: "Mobile-First Design: Best Practices for 2024",
    excerpt: "Essential strategies for creating mobile-first experiences that engage users and drive conversions.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Mobile Development",
    readTime: "7 min read",
    publishedAt: "2024-01-08",
  },
]

export default function BlogDetailPage() {
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
            <Link href="/blogs" className="text-sm font-medium text-blue-600">
              Blog
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/careers" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Careers
            </Link>
          </nav>
          <Button className="bg-blue-600 hover:bg-blue-700">Get a Quote</Button>
        </div>
      </header>

      {/* Back Navigation */}
      <div className="border-b bg-slate-50">
        <div className="container py-4">
          <Button asChild variant="ghost" className="text-slate-600 hover:text-slate-900">
            <Link href="/blogs">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>

      {/* Article Header */}
      <section className="py-12 bg-gradient-to-br from-slate-50 to-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Category and Meta */}
            <div className="flex items-center space-x-4 mb-6">
              <Badge className={`bg-gradient-to-r ${blogPost.color} text-white`}>{blogPost.category}</Badge>
              <div className="flex items-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(blogPost.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{blogPost.readTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{blogPost.stats.views} views</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">{blogPost.title}</h1>

            {/* Excerpt */}
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">{blogPost.excerpt}</p>

            {/* Author and Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div className="flex items-center space-x-4">
                <Image
                  src={blogPost.author.avatar || "/placeholder.svg"}
                  alt={blogPost.author.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <div className="font-semibold text-slate-900">{blogPost.author.name}</div>
                  <div className="text-slate-600">{blogPost.author.role}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Heart className="w-4 h-4 mr-2" />
                  {blogPost.stats.likes}
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-12 shadow-2xl">
              <Image src={blogPost.image || "/placeholder.svg"} alt={blogPost.title} fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <div
                  className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-strong:text-slate-900 prose-ul:text-slate-700 prose-ol:text-slate-700"
                  dangerouslySetInnerHTML={{ __html: blogPost.content }}
                />

                {/* Tags */}
                <div className="mt-12 pt-8 border-t">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {blogPost.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Share Section */}
                <div className="mt-8 pt-8 border-t">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Share this article</h3>
                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm">
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button variant="outline" size="sm">
                      <Facebook className="w-4 h-4 mr-2" />
                      Facebook
                    </Button>
                    <Button variant="outline" size="sm">
                      <LinkIcon className="w-4 h-4 mr-2" />
                      Copy Link
                    </Button>
                  </div>
                </div>

                {/* Author Bio */}
                <div className="mt-12 pt-8 border-t">
                  <div className="flex items-start space-x-4 p-6 bg-slate-50 rounded-xl">
                    <Image
                      src={blogPost.author.avatar || "/placeholder.svg"}
                      alt={blogPost.author.name}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">About {blogPost.author.name}</h3>
                      <p className="text-slate-600 mb-3">{blogPost.author.role}</p>
                      <p className="text-slate-700 leading-relaxed">{blogPost.author.bio}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  {/* Article Stats */}
                  <Card className="p-6">
                    <h3 className="font-semibold text-slate-900 mb-4">Article Stats</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-slate-600">
                          <Eye className="w-4 h-4" />
                          <span>Views</span>
                        </div>
                        <span className="font-medium">{blogPost.stats.views}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-slate-600">
                          <Heart className="w-4 h-4" />
                          <span>Likes</span>
                        </div>
                        <span className="font-medium">{blogPost.stats.likes}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-slate-600">
                          <Share2 className="w-4 h-4" />
                          <span>Shares</span>
                        </div>
                        <span className="font-medium">{blogPost.stats.shares}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-slate-600">
                          <MessageSquare className="w-4 h-4" />
                          <span>Comments</span>
                        </div>
                        <span className="font-medium">{blogPost.stats.comments}</span>
                      </div>
                    </div>
                  </Card>

                  {/* Table of Contents */}
                  <Card className="p-6">
                    <h3 className="font-semibold text-slate-900 mb-4">Table of Contents</h3>
                    <nav className="space-y-2">
                      <a
                        href="#current-state"
                        className="block text-sm text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        The Current State of AI in Business
                      </a>
                      <a
                        href="#emerging-trends"
                        className="block text-sm text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        Emerging Trends and Technologies
                      </a>
                      <a
                        href="#implementation"
                        className="block text-sm text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        Implementation Strategies
                      </a>
                      <a
                        href="#challenges"
                        className="block text-sm text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        Challenges and Considerations
                      </a>
                      <a
                        href="#road-ahead"
                        className="block text-sm text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        The Road Ahead
                      </a>
                    </nav>
                  </Card>

                  {/* Newsletter Signup */}
                  <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
                    <h3 className="font-semibold text-slate-900 mb-2">Stay Updated</h3>
                    <p className="text-sm text-slate-600 mb-4">Get the latest tech insights delivered to your inbox.</p>
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                        Subscribe
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Related Articles</h2>
              <p className="text-lg text-slate-600">Continue exploring our latest insights and tutorials</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {relatedPosts.map((post) => (
                <Card
                  key={post.id}
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white"
                >
                  <div className="relative">
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-white/90 text-slate-700 text-xs">{post.category}</Badge>
                    </div>
                  </div>

                  <CardHeader className="p-6">
                    <CardTitle className="text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>

                    <CardDescription className="text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </CardDescription>

                    <div className="flex items-center justify-between text-xs text-slate-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-between text-blue-600 hover:text-blue-700 hover:bg-blue-50 group/btn"
                    >
                      <Link href={`/blogs/${post.id}`}>
                        Read Article
                        <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Comments ({blogPost.stats.comments})</h2>

              {/* Comment Form */}
              <Card className="p-6 mb-8">
                <h3 className="font-semibold text-slate-900 mb-4">Leave a Comment</h3>
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <textarea
                    placeholder="Your comment..."
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700">Post Comment</Button>
                </div>
              </Card>

              {/* Sample Comments */}
              <div className="space-y-6">
                {[
                  {
                    name: "John Doe",
                    avatar: "/placeholder.svg?height=40&width=40",
                    date: "2 days ago",
                    comment:
                      "Great article! The insights on AI implementation strategies are particularly valuable. We've been considering implementing AI in our workflow and this gives us a good roadmap.",
                  },
                  {
                    name: "Jane Smith",
                    avatar: "/placeholder.svg?height=40&width=40",
                    date: "3 days ago",
                    comment:
                      "The section on challenges and considerations really resonates with our experience. Ethical considerations are indeed crucial when implementing AI solutions.",
                  },
                ].map((comment, index) => (
                  <div key={index} className="flex space-x-4 p-6 bg-slate-50 rounded-xl">
                    <Image
                      src={comment.avatar || "/placeholder.svg"}
                      alt={comment.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-slate-900">{comment.name}</span>
                        <span className="text-sm text-slate-600">{comment.date}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed mb-3">{comment.comment}</p>
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-blue-600">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          Like
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-blue-600">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="container">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white">Ready to Transform Your Business with AI?</h2>
            <p className="text-xl text-white/80 leading-relaxed">
              Let's discuss how we can help you implement cutting-edge AI solutions that drive real business value.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={openInquiryForm} className="bg-white text-slate-900 hover:bg-white/90 px-8">
                Start Your AI Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={openInquiryForm}
                className="border-white/30 text-white hover:bg-white/10 px-8 bg-transparent"
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
