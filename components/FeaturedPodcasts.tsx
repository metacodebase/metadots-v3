'use client'

import { useState } from "react"
import { Headphones } from "lucide-react"
import FeaturedPodcast from "./FeaturedPodcast"
import PodcastCard from "./PodcastCard"

interface FeaturedPodcastsProps {
  podcasts: Array<{
    _id: any
    name: string
    podcastName: string
    description: string
    duration: string
    plays: number
    date: string
    link: string
    featured: boolean
    status: string
  }>
}

export default function FeaturedPodcasts({ podcasts }: FeaturedPodcastsProps) {
  const [openPodcastIndex, setOpenPodcastIndex] = useState(0)

  const handleToggle = (index: number) => {
    setOpenPodcastIndex(openPodcastIndex === index ? -1 : index)
  }

  if (!podcasts || podcasts.length === 0) {
    return null
  }

  const [firstPodcast, ...otherPodcasts] = podcasts

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
          <Headphones className="w-6 h-6 text-white" aria-hidden="true" />
        </div>
        <h3 className="text-3xl font-bold text-white">Latest Episodes</h3>
      </div>

      {/* First podcast - always open */}
      <FeaturedPodcast podcast={firstPodcast} />

      {/* Other podcasts - collapsible */}
      <div className="space-y-4">
        {otherPodcasts.map((podcast, index) => (
          <PodcastCard
            key={podcast._id}
            podcast={podcast}
            isOpen={openPodcastIndex === index + 1}
            onToggle={() => handleToggle(index + 1)}
          />
        ))}
      </div>
    </div>
  )
} 