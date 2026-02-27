import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans } from "next/font/google";
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

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <head>
        <Script id="gtm-base" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NQLH77M2');`}
        </Script>
      </head>
      <body className="font-sans">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NQLH77M2"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
