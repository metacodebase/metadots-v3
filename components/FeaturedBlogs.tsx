'use client'

import { useState } from "react"
import { BookOpen } from "lucide-react"
import FeaturedBlog from "./FeaturedBlog"
import BlogCard from "./BlogCard"

interface FeaturedBlogsProps {
  blogs: Array<{
    _id: any
    title: string
    content: string
    excerpt: string
    featuredImage?: string
    author: {
      name: string
      role: string
      designation?: string
      avatar?: string
    }
    publishedAt?: string
    readTime: string
    featured: boolean
    status: string
    slug: string
  }>
}

export default function FeaturedBlogs({ blogs }: FeaturedBlogsProps) {
  const [openBlogIndex, setOpenBlogIndex] = useState(0)

  const handleToggle = (index: number) => {
    setOpenBlogIndex(openBlogIndex === index ? -1 : index)
  }

  if (!blogs || blogs.length === 0) {
    return null
  }

  const [firstBlog, ...otherBlogs] = blogs

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
          <BookOpen className="w-6 h-6 text-white" aria-hidden="true" />
        </div>
        <h3 className="text-3xl font-bold text-white">Latest Articles</h3>
      </div>

      {/* First blog - always open */}
      <FeaturedBlog blog={firstBlog} />

      {/* Other blogs - collapsible */}
      <div className="space-y-4">
        {otherBlogs.map((blog, index) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            isOpen={openBlogIndex === index + 1}
            onToggle={() => handleToggle(index + 1)}
          />
        ))}
      </div>
    </div>
  )
} 