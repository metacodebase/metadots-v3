export default function BlogSkeleton() {
  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      {/* Header Skeleton */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Skeleton */}
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>

            {/* Navigation Skeleton */}
            <nav className="hidden md:flex space-x-8">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </nav>

            {/* CTA Button Skeleton */}
            <div className="h-10 w-28 bg-blue-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </header>

      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 min-h-screen relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge Skeleton */}
              <div className="inline-block">
                <div className="h-8 w-48 bg-purple-400/30 rounded-full animate-pulse"></div>
              </div>

              {/* Title Skeleton */}
              <div className="space-y-4">
                <div className="h-12 w-64 bg-white/20 rounded animate-pulse"></div>
                <div className="h-12 w-80 bg-purple-400/30 rounded animate-pulse"></div>
              </div>

              {/* Description Skeleton */}
              <div className="space-y-3">
                <div className="h-4 w-full bg-white/20 rounded animate-pulse"></div>
                <div className="h-4 w-4/5 bg-white/20 rounded animate-pulse"></div>
              </div>

              {/* Subscription Form Skeleton */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                <div className="h-6 w-48 bg-white/20 rounded animate-pulse"></div>
                <div className="flex gap-3">
                  <div className="flex-1 h-12 bg-white/20 rounded-lg animate-pulse"></div>
                  <div className="h-12 w-24 bg-white rounded-lg animate-pulse"></div>
                </div>
                <div className="h-4 w-56 bg-white/20 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Right Dashboard Mockup */}
            <div className="relative">
              {/* Dashboard Container */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 space-y-6">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <div className="h-8 w-32 bg-purple-400/30 rounded-lg animate-pulse"></div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white/10 rounded-xl p-4 space-y-2">
                      <div className="h-8 w-12 bg-white/20 rounded animate-pulse"></div>
                      <div className="h-4 w-16 bg-white/20 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>

                {/* Latest Article Card */}
                <div className="bg-white/10 rounded-xl p-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-400/30 rounded-lg animate-pulse"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 w-24 bg-white/20 rounded animate-pulse"></div>
                      <div className="h-3 w-32 bg-white/20 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-white/20 rounded animate-pulse"></div>
                    <div className="h-3 w-3/4 bg-white/20 rounded animate-pulse"></div>
                  </div>
                </div>

                {/* Reading Goal */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-32 bg-white/20 rounded animate-pulse"></div>
                    <div className="h-4 w-20 bg-white/20 rounded animate-pulse"></div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/10 rounded-lg animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-2 bg-white/10 rounded-full">
                        <div className="h-2 bg-green-400 rounded-full w-3/4 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Blog Dashboard Badge */}
              <div className="absolute -top-4 -right-4 bg-purple-500 rounded-2xl p-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-white/20 rounded animate-pulse"></div>
                  <div className="h-4 w-24 bg-white/20 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Circle */}
        <div className="absolute bottom-8 left-8">
          <div className="w-12 h-12 bg-black/20 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
