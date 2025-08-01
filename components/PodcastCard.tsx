import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface PodcastCardProps {
  podcast: {
    _id: any;
    name: string;
    podcastName: string;
    description: string;
    duration: string;
    plays: number;
    date: string;
    link: string;
    featured: boolean;
    status: string;
  };
  isOpen: boolean;
  onToggle: () => void;
}

export default function PodcastCard({
  podcast,
  isOpen,
  onToggle,
}: PodcastCardProps) {
  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(podcast.link, "_blank");
  };

  return (
    <Card
      className={`group bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 overflow-hidden cursor-pointer ${
        isOpen ? "bg-white/20" : ""
      }`}
      onClick={onToggle}>
      <CardHeader className="p-0">
        <div className="relative">
          {/* Audio Waveform Visualization */}
          <div
            className={`bg-gradient-to-r from-purple-600 to-pink-600 p-6 relative overflow-hidden transition-all duration-500 ${
              isOpen ? "h-auto" : "h-24"
            }`}>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-white/20 text-white backdrop-blur">
                  Episode
                </Badge>
                <div className="text-white/80 text-sm">{podcast.duration}</div>
              </div>

              {/* Animated Waveform - Only show when open */}
              {isOpen && (
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(40)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white/60 rounded-full animate-pulse"
                      style={{
                        width: "3px",
                        height: `${(i % 8) * 4 + 10}px`,
                        animationDelay: `${i * 50}ms`,
                        animationDuration: `${1000 + (i % 10) * 100}ms`,
                      }}></div>
                  ))}
                </div>
              )}

              {/* Audio Controls - Only show when open */}
              {isOpen && (
                <div className="flex items-center space-x-4">
                  <Button
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur"
                    onClick={handlePlayClick}>
                    <Play className="w-4 h-4" aria-hidden="true" />
                    <span className="sr-only">Play episode</span>
                  </Button>
                  <div className="flex-1 bg-white/20 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full transition-all duration-300"
                      style={{ width: "35%" }}></div>
                  </div>
                  <div className="text-white/80 text-sm">15:42</div>
                </div>
              )}

              {/* Toggle Icon */}
              <div className="absolute top-10 right-0">
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-white/80" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-white/80" />
                )}
              </div>
            </div>
          </div>

          <div
            className={`p-6 transition-all duration-500 ${
              isOpen ? "opacity-100" : "opacity-70"
            }`}>
            <CardTitle className="text-xl text-white mb-3 group-hover:text-purple-400 transition-colors">
              {podcast.name}
            </CardTitle>
            <CardDescription
              className={`text-white/70 mb-4 leading-relaxed transition-all duration-500 ${
                isOpen ? "max-h-32" : "max-h-0 overflow-hidden"
              }`}>
              {podcast.description}
            </CardDescription>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
                <div>
                  <div className="text-white text-sm font-medium">
                    {podcast.podcastName}
                  </div>
                  <div className="text-white/60 text-xs">Podcast</div>
                </div>
              </div>
              <div className="flex items-center gap-2 space-x-2 text-white/60 text-sm">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                {new Date(podcast.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
