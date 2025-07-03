import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, Smartphone, Shield, Heart } from "lucide-react"
import Image from "next/image"

interface ProjectCardProps {
  project: {
    _id: string
    title: string
    description: string
    category: string
    tags: string[]
    image: string
    featured: boolean
    metrics: {
      performance?: string
      conversion?: string
      revenue?: string
      accuracy?: string
      patients?: string
      diagnoses?: string
      security?: string
      transactions?: string
      users?: string
      devices?: string
      energy?: string
      properties?: string
      students?: string
      courses?: string
      completion?: string
      threats?: string
      response?: string
      [key: string]: string | undefined
    }
    client: string
    duration: string
    team: string
    rating: number
    status: string
    color: string
    liveUrl?: string
    githubUrl?: string
    technologies: string[]
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'e-commerce':
        return Smartphone
      case 'fintech':
        return Shield
      case 'healthcare':
        return Heart
      default:
        return Smartphone
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'e-commerce':
        return 'bg-emerald-100 text-emerald-700'
      case 'fintech':
        return 'bg-blue-100 text-blue-700'
      case 'healthcare':
        return 'bg-rose-100 text-rose-700'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  const getGradientColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'e-commerce':
        return 'from-emerald-400 via-teal-500 to-cyan-600'
      case 'fintech':
        return 'from-blue-500 via-indigo-600 to-purple-700'
      case 'healthcare':
        return 'from-rose-400 via-pink-500 to-purple-600'
      default:
        return 'from-slate-400 via-gray-500 to-slate-600'
    }
  }

  const IconComponent = getCategoryIcon(project.category)

  return (
    <Card className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white">
      <div className="relative">
        <div className={`aspect-video bg-gradient-to-br ${getGradientColor(project.category)} relative overflow-hidden`}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          
          {/* Floating Icon */}
          <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl shadow-lg flex items-center justify-center animate-bounce-subtle">
            <IconComponent className="w-6 h-6 text-white" aria-hidden="true" />
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 text-white">
            <div className="text-sm font-medium">{project.category} Platform</div>
            <div className="text-xs opacity-80">{project.technologies.slice(0, 3).join(' • ')}</div>
          </div>
        </div>
      </div>

      <CardHeader className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge className={getCategoryColor(project.category)}>{project.category}</Badge>
          <div className="flex items-center text-sm text-slate-500">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" aria-hidden="true" />
            {project.rating}
          </div>
        </div>
        <CardTitle className="text-xl mb-3 group-hover:text-blue-600 transition-colors">
          {project.title}
        </CardTitle>
        <CardDescription className="text-base leading-relaxed mb-4">
          {project.description}
        </CardDescription>

        {/* Progress Indicators */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Performance</span>
            <span className="text-blue-600 font-medium">
              {project.metrics.performance || project.metrics.accuracy || project.metrics.security || '95%'}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-1000 group-hover:w-[95%]"
              style={{ width: "0%" }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="ghost"
            className="flex-1 justify-between text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-300 group/btn"
          >
            Start Project
            <ArrowRight
              className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </Button>
          <Button
            variant="ghost"
            className="flex-1 justify-between text-green-600 hover:text-green-700 hover:bg-green-50 transition-all duration-300 group/btn"
          >
            Book a Call
            <ArrowRight
              className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </Button>
        </div>
      </CardHeader>
    </Card>
  )
} 