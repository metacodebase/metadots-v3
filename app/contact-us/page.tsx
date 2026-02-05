"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Footer from "@/components/footer";
import ContactSection from "@/components/contact-section";

export default function ContactUsPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* Hero Section */}
      <section className="border-b border-slate-100 bg-slate-50 py-20">
        <div className="container">
          <div className="space-y-10 text-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-100">
                <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                Get in touch
              </div>
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                <span className="block">Ready to Start</span>
                <span className="mt-1 block text-blue-700">Your Project?</span>
              </h1>
              <p className="mx-auto max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Let's discuss your vision and turn it into reality. Our team is
                ready to help you build something amazing.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="px-8 py-4 bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }>
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border border-blue-200 bg-white px-8 py-4 text-blue-700 hover:border-blue-400 hover:bg-blue-50"
                asChild>
                <a href="mailto:sales@metadots.co">
                  <Mail className="mr-2 h-5 w-5" aria-hidden="true" />
                  Send Email
                </a>
              </Button>
            </div>

            {/* Quick Contact Info */}
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 pt-6 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="text-sm font-medium text-slate-900">
                  Call Us
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  +44 7400 926311
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="text-sm font-medium text-slate-900">
                  Email Us
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  sales@metadots.co
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="text-sm font-medium text-slate-900">
                  Visit Us
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  Lahore, Pakistan
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      <Footer />
    </div>
  );
}
