import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CaseStudyCardProps {
  caseStudy: {
    _id: string
    title: string
    slug: string
    subtitle?: string
    description: string
    client: string
    industry: string
    featured: boolean
    duration: string
    team: string
    budget: string
    heroImage?: string
    results: {
      efficiency?: string
      userSatisfaction?: string
      costReduction?: string
      transactions?: string
      uptime?: string
      accuracy?: string
      timeToInsight?: string
      views?: string
      sales?: string
      energy?: string
      completion?: string
      performance?: string
      satisfaction?: string
      insights?: string
      engagement?: string
      ROI?: string
      threats?: string
      response?: string
      [key: string]: string | undefined
    }
    technologies: Array<{
      name: string
      icon: string
      category: string
    }>
    keyFeatures: string[]
    challenge: string
    solution: string
  }
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const getIndustryColor = (industry: string) => {
    switch (industry.toLowerCase()) {
      case 'technology':
        return 'bg-blue-100 text-blue-700'
      case 'e-commerce':
        return 'bg-emerald-100 text-emerald-700'
      case 'healthcare':
        return 'bg-rose-100 text-rose-700'
      case 'fintech':
        return 'bg-purple-100 text-purple-700'
      case 'iot':
        return 'bg-orange-100 text-orange-700'
      case 'real estate':
        return 'bg-yellow-100 text-yellow-700'
      case 'education':
        return 'bg-indigo-100 text-indigo-700'
      case 'logistics':
        return 'bg-teal-100 text-teal-700'
      case 'marketing':
        return 'bg-pink-100 text-pink-700'
      case 'cybersecurity':
        return 'bg-slate-100 text-slate-700'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  const getGradientColor = (industry: string) => {
    switch (industry.toLowerCase()) {
      case 'technology':
        return 'from-blue-500 via-indigo-600 to-purple-700'
      case 'e-commerce':
        return 'from-emerald-400 via-teal-500 to-cyan-600'
      case 'healthcare':
        return 'from-rose-400 via-pink-500 to-purple-600'
      case 'fintech':
        return 'from-purple-500 via-indigo-600 to-blue-700'
      case 'iot':
        return 'from-orange-400 via-red-500 to-pink-600'
      case 'real estate':
        return 'from-yellow-400 via-orange-500 to-red-600'
      case 'education':
        return 'from-indigo-400 via-blue-500 to-cyan-600'
      case 'logistics':
        return 'from-teal-400 via-green-500 to-emerald-600'
      case 'marketing':
        return 'from-pink-400 via-purple-500 to-indigo-600'
      case 'cybersecurity':
        return 'from-slate-500 via-gray-600 to-slate-700'
      default:
        return 'from-slate-400 via-gray-500 to-slate-600'
    }
  }

  return (
    <Card className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white">
      <div className="relative">
        <div className={`aspect-video bg-gradient-to-br ${getGradientColor(caseStudy.industry)} relative overflow-hidden`}>
          <Image
            src={caseStudy.heroImage || "https://www.knowbe4.com/hubfs/Its%20Not%20About%20URL.jpg"}
            alt={caseStudy.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          
          {/* Floating Elements */}
          <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg flex items-center justify-center animate-float">
            <TrendingUp className="w-6 h-6 text-white" aria-hidden="true" />
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 text-white">
            <div className="text-sm font-medium">{caseStudy.industry} Case Study</div>
            <div className="text-xs opacity-80">{caseStudy.client}</div>
          </div>
        </div>
      </div>

      <CardHeader className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge className={getIndustryColor(caseStudy.industry)}>{caseStudy.industry}</Badge>
          {caseStudy.featured && (
            <Badge className="bg-yellow-100 text-yellow-700">Featured</Badge>
          )}
        </div>
        
        <CardTitle className="text-xl mb-3 group-hover:text-blue-600 transition-colors">
          {caseStudy.title}
        </CardTitle>
        
        {caseStudy.subtitle && (
          <p className="text-sm text-slate-500 mb-3 italic">{caseStudy.subtitle}</p>
        )}
        
        <CardDescription className="text-base leading-relaxed mb-4">
          {caseStudy.description}
        </CardDescription>

        {/* Key Results */}
        <div className="space-y-2 mb-4">
          {caseStudy.results.efficiency && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Efficiency Gain</span>
              <span className="text-blue-600 font-medium">{caseStudy.results.efficiency}</span>
            </div>
          )}
          {caseStudy.results.accuracy && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Accuracy Rate</span>
              <span className="text-green-600 font-medium">{caseStudy.results.accuracy}</span>
            </div>
          )}
          {caseStudy.results.costReduction && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Cost Reduction</span>
              <span className="text-purple-600 font-medium">{caseStudy.results.costReduction}</span>
            </div>
          )}
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 mb-4">
          <div>
            <span className="font-medium">Duration:</span> {caseStudy.duration}
          </div>
          <div>
            <span className="font-medium">Team:</span> {caseStudy.team}
          </div>
        </div>

        <Link href={`/case-studies/${caseStudy.slug}`}>
          <Button
            variant="ghost"
            className="w-full justify-between text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-300 group/btn"
          >
            View Case Study
            <ArrowRight
              className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </Button>
        </Link>
      </CardHeader>
    </Card>
  )
} 