import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import { InquiryFormProvider } from "@/components/inquiry-form-provider"
import './globals.css'

export const metadata: Metadata = {
  title: 'Metadots - AI Solutions & Technology',
  description: 'Transforming businesses through innovative technology solutions. We don\'t just build software—we architect the future of digital experiences.',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <InquiryFormProvider>
            {children}
          </InquiryFormProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
