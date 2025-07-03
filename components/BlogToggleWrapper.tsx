'use client'

import { useState } from "react"
import BlogCard from "./BlogCard"

interface BlogToggleWrapperProps {
  blogs: Array<{
    _id: any
    title: string
    content: string
    excerpt: string
    featuredImage?: string
    author: {
      name: string
      role: string
    }
    publishedAt?: string
    readTime: string
    featured: boolean
    status: string
    slug: string
  }>
}

export default function BlogToggleWrapper({ blogs }: BlogToggleWrapperProps) {
  const [openBlogIndex, setOpenBlogIndex] = useState(-1)

  const handleToggle = (index: number) => {
    setOpenBlogIndex(openBlogIndex === index ? -1 : index)
  }

  return (
    <div className="space-y-4">
      {blogs.map((blog, index) => (
        <BlogCard
          key={blog._id}
          blog={blog}
          isOpen={openBlogIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  )
} 