import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Search, Zap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      {/* Enhanced 404 Section with matching design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen flex items-center justify-center">
        {/* Animated Background Elements - matching landing page */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-ping delay-2000"></div>
        </div>

        <div className="container relative z-10 text-center">
          <div className="space-y-8 animate-fade-in-up max-w-4xl mx-auto">
            {/* Status Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium shadow-lg animate-bounce-subtle">
              <Zap className="w-4 h-4 mr-2" aria-hidden="true" />
              Oops! Page Not Found
            </div>

            {/* Large 404 Number */}
            <div className="space-y-6">
              <h1 className="text-8xl font-bold tracking-tight sm:text-9xl md:text-[12rem] lg:text-[14rem] leading-tight">
                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                  404
                </span>
              </h1>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-slate-900">
                Page Not Found
              </h2>

              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                It looks like the page you're looking for isn't available. Let’s
                help you find what you need!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                asChild>
                <Link href="/">
                  <Home
                    className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  />
                  Back to Home
                  <ArrowRight
                    className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="group px-8 py-4 border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                asChild>
                <Link href="/contact-us">
                  <Search
                    className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  />
                  Get Help
                </Link>
              </Button>
            </div>

            {/* Additional Help Text */}
            <div className="pt-8 border-t border-slate-200/50">
              <p className="text-sm text-slate-500">
                Need assistance? Our AI-powered support is here to help you
                navigate back to your digital transformation journey.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
