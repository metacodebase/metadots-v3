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
      className={`group cursor-pointer overflow-hidden border border-slate-200 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-md ${
        isOpen ? "ring-1 ring-blue-200" : ""
      }`}
      onClick={onToggle}>
      <CardHeader className="p-0">
        <div className="relative">
          {/* Audio Waveform Visualization */}
          <div
            className={`relative overflow-hidden bg-slate-900 p-6 transition-all duration-500 ${
              isOpen ? "h-auto" : "h-24"
            }`}>
            <div className="relative z-10">
              <div className="mb-4 flex items-center justify-between">
                <Badge className="bg-slate-800 px-3 py-1 text-xs font-medium text-slate-50">
                  Episode
                </Badge>
                <div className="text-sm text-slate-200">{podcast.duration}</div>
              </div>

              {/* Animated Waveform - Only show when open */}
              {isOpen && (
                <div className="mb-4 flex items-center space-x-1">
                  {[...Array(40)].map((_, i) => (
                    <div
                      key={i}
                      className="h-6 w-[3px] rounded-full bg-blue-400/60"
                      style={{
                        height: `${(i % 8) * 4 + 10}px`,
                      }}></div>
                  ))}
                </div>
              )}

              {/* Audio Controls - Only show when open */}
              {isOpen && (
                <div className="flex items-center space-x-4">
                  <Button
                    size="sm"
                    className="border border-slate-600 bg-slate-800 text-slate-50 hover:bg-slate-700"
                    onClick={handlePlayClick}>
                    <Play className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">Play episode</span>
                  </Button>
                  <div className="h-2 flex-1 rounded-full bg-slate-700">
                    <div
                      className="h-2 w-1/3 rounded-full bg-blue-400 transition-all duration-300"
                      style={{ width: "35%" }}></div>
                  </div>
                  <div className="text-sm text-slate-200">15:42</div>
                </div>
              )}

              {/* Toggle Icon */}
              <div className="absolute right-0 top-10">
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-slate-200" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-200" />
                )}
              </div>
            </div>
          </div>

          <div
            className={`p-6 transition-all duration-500 ${
              isOpen ? "opacity-100" : "opacity-80"
            }`}>
            <CardTitle className="mb-3 text-xl font-semibold text-slate-900">
              {podcast.name}
            </CardTitle>
            <CardDescription
              className={`mb-4 leading-relaxed text-slate-600 transition-all duration-500 ${
                isOpen ? "max-h-32" : "max-h-0 overflow-hidden"
              }`}>
              {podcast.description}
            </CardDescription>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                  <Play className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-900">
                    {podcast.podcastName}
                  </div>
                  <div className="text-xs text-slate-500">Podcast</div>
                </div>
              </div>
              <div className="flex items-center gap-2 space-x-2 text-sm text-slate-500">
                <Calendar className="h-4 w-4" aria-hidden="true" />
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
