import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, Eye, Heart, Share2, BookOpen, Menu } from "lucide-react"
import { connectMongo } from "@/lib/mongodb"
import Blog from "@/models/Blog"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/footer"

interface BlogDetailPageProps {
  params: {
    slug: string
  }
}

async function getData(slug: string) {
  await connectMongo()
  
  // Get the specific blog by slug
  const blog = await Blog.findOne({ slug, status: "published" })
  
  if (!blog) {
    notFound()
  }
  
  // Get related blogs (same category, excluding current blog)
  const relatedBlogs = await Blog.find({ 
    category: blog.category, 
    _id: { $ne: blog._id },
    status: "published" 
  }).limit(3)
  
  return {
    blog: JSON.parse(JSON.stringify(blog)),
    relatedBlogs: JSON.parse(JSON.stringify(relatedBlogs))
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { blog, relatedBlogs } = await getData(params.slug)
  
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
            <Link href="/blogs" className="text-sm font-medium text-blue-600">
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

      {/* Article Content */}
      <article className="py-20">
        <div className="container max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Button asChild variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
              <Link href="/blogs">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>

          {/* Article Header */}
          <div className="mb-12">
            <div className="flex items-center space-x-4 mb-6">
              <Badge className={`bg-gradient-to-r ${blog.color || "from-blue-500 to-indigo-600"} text-white`}>
                {blog.category}
              </Badge>
              {blog.featured && (
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">Featured</Badge>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {blog.title}
            </h1>

            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              {blog.excerpt}
            </p>

            {/* Author Info */}
            <div className="flex items-center space-x-4 mb-8">
              <Image
                src={blog.author?.avatar || "/placeholder.svg"}
                alt={blog.author?.name || "Author"}
                width={56}
                height={56}
                className="rounded-full"
              />
              <div>
                <div className="font-semibold text-lg text-slate-900">{blog.author?.name || "Metadots Team"}</div>
                <div className="text-slate-600">{blog.author?.role || "Tech Writer"}</div>
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex items-center justify-between text-sm text-slate-600 mb-8 p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{blog.readTime || "5 min read"}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>{blog.stats?.views || "1.2K"} views</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>{blog.stats?.likes || "45"} likes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {blog.featuredImage && (
            <div className="mb-12">
              <div className="aspect-video overflow-hidden rounded-2xl">
                <Image
                  src={blog.featuredImage}
                  alt={blog.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div 
              className="text-slate-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share Section */}
          <div className="mb-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Share this article</h3>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center space-x-2">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Related Articles</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Continue reading with these related articles
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedBlogs.map((relatedBlog: any) => (
                <Card
                  key={relatedBlog._id}
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white"
                >
                  <div className="relative">
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={relatedBlog.featuredImage || "/placeholder.svg"}
                        alt={relatedBlog.title}
                        width={400}
                        height={240}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge className={`bg-gradient-to-r ${relatedBlog.color || "from-blue-500 to-indigo-600"} text-white text-xs`}>
                        {relatedBlog.category}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="p-6">
                    <CardTitle className="text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {relatedBlog.title}
                    </CardTitle>

                    <CardDescription className="text-sm leading-relaxed mb-4 line-clamp-3">
                      {relatedBlog.excerpt}
                    </CardDescription>

                    <div className="flex items-center justify-between text-xs text-slate-600 mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(relatedBlog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{relatedBlog.readTime || "5 min read"}</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-between text-blue-600 hover:text-blue-700 hover:bg-blue-50 group/btn"
                    >
                      <Link href={`/blogs/${relatedBlog.slug}`}>
                        Read More
                        <ArrowLeft className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform rotate-180" />
                      </Link>
                    </Button>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="container">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white">Never Miss an Update</h2>
            <p className="text-xl text-white/80 leading-relaxed">
              Subscribe to our newsletter and get the latest tech insights, tutorials, and industry news delivered to
              your inbox.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex gap-3 p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border-0 bg-white/20 text-white placeholder:text-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <Button className="bg-white text-slate-900 hover:bg-white/90 px-6">Subscribe</Button>
              </div>
            </div>
            <p className="text-white/60 text-sm">Join 10,000+ developers. No spam, unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 