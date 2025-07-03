import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function CaseStudyLoading() {
  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <div className="hidden md:flex items-center space-x-8">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-16" />
            ))}
          </div>
        </div>
      </header>

      {/* Hero Section Skeleton */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        <div className="container relative z-10">
          <div className="mb-8">
            <Skeleton className="h-6 w-32" />
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-6 w-3/4" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                    <Skeleton className="h-8 w-20 mx-auto mb-2" />
                    <Skeleton className="h-4 w-16 mx-auto" />
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Skeleton className="h-12 w-48" />
                <Skeleton className="h-12 w-40" />
              </div>
            </div>

            <div className="relative">
              <Skeleton className="w-full h-80 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-12">
              <div className="grid gap-8 md:grid-cols-2">
                {[...Array(2)].map((_, i) => (
                  <Card key={i} className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <Skeleton className="h-6 w-32 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                  </Card>
                ))}
              </div>

              {[...Array(3)].map((_, i) => (
                <Card key={i} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-48 mb-4" />
                    <Skeleton className="h-4 w-64 mb-6" />
                    <div className="space-y-3">
                      {[...Array(4)].map((_, j) => (
                        <Skeleton key={j} className="h-4 w-full" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-32 mb-4" />
                    <div className="space-y-3">
                      {[...Array(4)].map((_, j) => (
                        <Skeleton key={j} className="h-4 w-full" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 