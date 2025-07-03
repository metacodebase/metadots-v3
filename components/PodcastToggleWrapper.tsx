'use client'

import { useState } from "react"
import PodcastCard from "./PodcastCard"

interface PodcastToggleWrapperProps {
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

export default function PodcastToggleWrapper({ podcasts }: PodcastToggleWrapperProps) {
  const [openPodcastIndex, setOpenPodcastIndex] = useState(-1)

  const handleToggle = (index: number) => {
    setOpenPodcastIndex(openPodcastIndex === index ? -1 : index)
  }

  return (
    <div className="space-y-4">
      {podcasts.map((podcast, index) => (
        <PodcastCard
          key={podcast._id}
          podcast={podcast}
          isOpen={openPodcastIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  )
} 