'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">500</h1>
            <h2 className="text-3xl font-semibold text-gray-700 mb-6">Something went wrong!</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              An unexpected error occurred. Please try again.
            </p>
            <button 
              onClick={reset}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
} 