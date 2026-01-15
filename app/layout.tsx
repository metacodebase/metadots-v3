import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { InquiryFormProvider } from "@/components/inquiry-form-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import ConditionalHeader from "@/components/ConditionalHeader";

export const metadata: Metadata = {
  title: "Metadots - AI Solutions & Technology",
  description:
    "Transforming businesses through innovative technology solutions. We don't just build software—we architect the future of digital experiences.",
  generator: "Next.js",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <AuthProvider>
            <InquiryFormProvider>
              <ConditionalHeader />
              {children}
            </InquiryFormProvider>
          </AuthProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
