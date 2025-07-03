'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, Calendar, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReviewToggleWrapperProps {
  review: {
    _id: any
    clientName: string
    clientRole: string
    clientCompany: string
    image?: string
    review: string
    rating: number
    featured: boolean
    status: string
  }
  isOpen: boolean
  onToggle: () => void
}

export default function ReviewToggleWrapper({ review, isOpen, onToggle }: ReviewToggleWrapperProps) {
  return (
    <Card className="group bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative">
          {/* Review Header with Image or Gradient */}
          <div className={`${review.image ? 'bg-cover bg-center' : 'bg-gradient-to-r from-green-600 to-emerald-600'} p-6 relative overflow-hidden`} 
               style={review.image ? { backgroundImage: `url(${review.image})` } : {}}>
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-white/20 text-white backdrop-blur">Client Review</Badge>
                <div className="text-white/80 text-sm flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date().toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </div>
              </div>

              {/* Rating Stars */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/40'}`}
                    aria-hidden="true"
                  />
                ))}
                <span className="text-white/80 text-sm ml-2">{review.rating}/5</span>
              </div>

              {/* Quote Icon */}
              <div className="flex items-center space-x-2 mb-4">
                <Quote className="w-6 h-6 text-white/60" aria-hidden="true" />
                <span className="text-white/80 text-sm">Client Testimonial</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <CardTitle className="text-xl text-white mb-3 group-hover:text-green-400 transition-colors">
              "{review.review}"
            </CardTitle>
            <CardDescription className="text-white/70 mb-4 leading-relaxed">
              {review.review.length > 200 ? `${review.review.substring(0, 200)}...` : review.review}
            </CardDescription>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {review.clientName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{review.clientName}</div>
                  <div className="text-white/60 text-xs">{review.clientRole}</div>
                  <div className="text-white/60 text-xs">{review.clientCompany}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 text-white/60 text-sm">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{review.rating}.0</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggle}
                  className="text-white/60 hover:text-white hover:bg-white/10"
                >
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Expanded Content */}
            <div className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
            )}>
              <div className="pt-4 border-t border-white/20">
                <CardDescription className="text-white/70 leading-relaxed">
                  {review.review}
                </CardDescription>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
} 