'use client'

import { useState } from 'react'
import ReviewToggleWrapper from './ReviewToggleWrapper'

interface FeaturedReviewsProps {
  reviews: Array<{
    _id: any
    clientName: string
    clientRole: string
    clientCompany: string
    image?: string
    review: string
    rating: number
    featured: boolean
    status: string
  }>
}

export default function FeaturedReviews({ reviews }: FeaturedReviewsProps) {
  const [openReviewIndex, setOpenReviewIndex] = useState(0)

  const handleToggle = (index: number) => {
    setOpenReviewIndex(openReviewIndex === index ? -1 : index)
  }

  return (
    <div className="space-y-6">
      {reviews.map((review, index) => (
        <ReviewToggleWrapper
          key={review._id}
          review={review}
          isOpen={openReviewIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  )
} 