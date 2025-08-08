import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink, TrendingUp, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FeaturedProjectProps {
  project: {
    _id: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    image: string;
    featured: boolean;
    metrics: {
      efficiency?: string;
      dataPoints?: string;
      uptime?: string;
      [key: string]: string | undefined;
    };
    client: string;
    duration: string;
    team: string;
    rating: number;
    status: string;
    color: string;
    liveUrl?: string;
    githubUrl?: string;
    technologies: string[];
  };
}

export default function FeaturedProject({ project }: FeaturedProjectProps) {
  return (
    <div className="mb-16">
      <Card className="group relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:scale-[1.02] !bg-white">
        <div className="grid lg:grid-cols-2 gap-0">
          <div className="relative overflow-hidden">
            <div className="aspect-[4/3] relative">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-indigo-600/20 to-purple-700/20"></div>

              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-xl flex items-center justify-center animate-float">
                <Zap className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Badge className="bg-blue-100 text-blue-700 px-3 py-1">
                  Featured Project
                </Badge>
                <Badge className="bg-green-100 text-green-700 px-3 py-1">
                  Award Winner
                </Badge>
              </div>

              <h3 className="text-3xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {project.title}
              </h3>

              <p className="text-lg text-slate-600 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="space-y-3">
                <div className="text-sm font-medium text-slate-700">
                  Technology Stack:
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 py-4">
                {project.metrics.efficiency && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {project.metrics.efficiency}
                    </div>
                    <div className="text-sm text-slate-600">
                      Efficiency Gain
                    </div>
                  </div>
                )}
                {project.metrics.dataPoints && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {project.metrics.dataPoints}
                    </div>
                    <div className="text-sm text-slate-600">
                      Data Points/Day
                    </div>
                  </div>
                )}
                {project.metrics.uptime && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500 ">
                      {project.metrics.uptime}
                    </div>
                    <div className="text-sm text-slate-600">Uptime</div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  Start Project
                  <ArrowRight
                    className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-300 border-whtie hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 bg-transparent text-black">
                  <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                  Book a Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
