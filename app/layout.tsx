import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { InquiryFormProvider } from "@/components/inquiry-form-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import Head from "next/head";
import Header from "./LandingLayout/Header";

export const metadata: Metadata = {
  title: "Metadots - AI Solutions & Technology",
  description:
    "Transforming businesses through innovative technology solutions. We don't just build software—we architect the future of digital experiences.",
  generator: "Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/images/metadots-logo.svg" />
      </Head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <AuthProvider>
            <InquiryFormProvider>
              {/* <Header /> */}
              {children}
            </InquiryFormProvider>
          </AuthProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
