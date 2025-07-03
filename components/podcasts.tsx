"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Headphones, Calendar, Clock, ExternalLink } from "lucide-react";

interface Podcast {
  _id: string;
  name: string;
  podcastName: string;
  description: string;
  duration: string;
  plays: number;
  date: string;
  link: string;
  featured: boolean;
  createdAt: string;
}

interface PodcastsProps {
  featured?: boolean;
  limit?: number;
  showTitle?: boolean;
}

export default function Podcasts({ featured = false, limit = 3, showTitle = true }: PodcastsProps) {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams();
        if (featured) params.append("featured", "true");
        if (limit) params.append("limit", limit.toString());
        
        const response = await fetch(`/api/podcasts?${params}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch podcasts");
        }
        
        setPodcasts(data.podcasts);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching podcasts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPodcasts();
  }, [featured, limit]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: limit }, (_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Unable to load podcasts at this time.</p>
      </div>
    );
  }

  if (podcasts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No podcasts available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {showTitle && (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Latest Podcast Episodes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Listen to our latest episodes covering technology, AI, and industry insights
          </p>
        </div>
      )}
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {podcasts.map((podcast) => (
          <Card key={podcast._id} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Headphones className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-600">{podcast.podcastName}</span>
                </div>
                {podcast.featured && (
                  <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {podcast.name}
              </h3>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700 leading-relaxed mb-4 line-clamp-3">
                {podcast.description}
              </CardDescription>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{podcast.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Play className="w-4 h-4" />
                    <span>{podcast.plays.toLocaleString()} plays</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(podcast.date)}</span>
                </div>
              </div>
              
              <Button 
                className="w-full group/btn"
                onClick={() => window.open(podcast.link, '_blank')}
              >
                <Play className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                Listen Now
                <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 