"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, FileText, Sparkles } from "lucide-react";
import Footer from "@/components/footer";
import AiAuditFormCard from "@/components/ai-audit-form";

export default function AiAuditPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      <section className="border-b border-slate-100 bg-slate-50 py-20">
        <div className="container">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-100">
                  <Sparkles className="mr-2 h-4 w-4" aria-hidden="true" />
                  Free AI Audit
                </div>
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                  <span className="block">Start Your Company&apos;s</span>
                  <span className="mt-1 block text-blue-700">
                    AI Journey Today
                  </span>
                </h1>
                <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                  Schedule a short discovery call and receive a tailored AI
                  audit report with automation opportunities, ROI projections,
                  and a clear implementation roadmap.
                </p>
              </div>

              <div className="space-y-3 text-sm text-slate-700">
                {[
                  "Audit turnaround in 7 days",
                  "ROI model with 3-6x upside",
                  "Top 5 automation quick wins",
                  "Implementation-ready roadmap",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
                Based on the discovery call, you&apos;ll receive a 6-page AI Audit
                Report tailored for your business.
              </div>
            </div>

            <div id="contact" className="lg:sticky lg:top-24">
              <AiAuditFormCard />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3 lg:items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                AI Audit Report Points Out (No Charge)
              </p>
              <ul className="space-y-3 text-sm text-slate-700">
                {[
                  "Business areas needing automation",
                  "New revenue and upsell opportunities",
                  "Manual processes to replace with intelligent workflows",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-blue-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <Image
                src="/ai-audit/report-preview.svg"
                alt="AI audit report preview"
                width={520}
                height={360}
                className="h-auto w-full rounded-2xl"
                priority
              />
            </div>

            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                Your Next Moves
              </p>
              <ul className="space-y-3 text-sm text-slate-700">
                {[
                  "Work with a team of engineers to implement the findings",
                  "Partner with experts who own the outcome",
                  "Move with a delivery team that ships, not just consults",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <ArrowRight className="mt-0.5 h-4 w-4 text-blue-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Audit Deliverables
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
              What You Get in the AI Audit
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
              Everything you need to move from ideas to execution, presented in
              a clear, business-first format.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <Image
                src="/ai-audit/workflow-map.svg"
                alt="Workflow automation map"
                width={520}
                height={360}
                className="h-auto w-full rounded-2xl"
              />
              <h3 className="mt-6 text-xl font-semibold text-slate-900">
                Automation Opportunity Map
              </h3>
              <p className="mt-3 text-sm text-slate-600">
                We identify repeatable workflows, data bottlenecks, and the best
                AI use cases across teams.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <Image
                src="/ai-audit/scorecard.svg"
                alt="AI revenue scorecard"
                width={520}
                height={360}
                className="h-auto w-full rounded-2xl"
              />
              <h3 className="mt-6 text-xl font-semibold text-slate-900">
                Revenue + Profit Scorecard
              </h3>
              <p className="mt-3 text-sm text-slate-600">
                A quantified view of how AI impacts margin, pricing power, and
                operational efficiency.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-[360px] items-center justify-center rounded-2xl bg-slate-900 text-white">
                <div className="text-center space-y-4">
                  <FileText className="mx-auto h-10 w-10 text-blue-300" />
                  <p className="text-lg font-semibold">Implementation Plan</p>
                  <p className="text-sm text-white/70">
                    Timeline, resourcing, and build sequence.
                  </p>
                </div>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900">
                Implementation Roadmap
              </h3>
              <p className="mt-3 text-sm text-slate-600">
                Clear phases from prototype to production with expected impact
                and cost ranges.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-16 lg:py-20">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                One step closer to maximizing revenue and profits
              </h2>
              <p className="text-base text-white/70">
                Your audit highlights quick wins plus longer-term compounding
                gains across revenue, operations, and customer experience.
              </p>
              <div className="space-y-4 text-sm text-white/80">
                {[
                  "Increase RevPAR by an average of 15%+",
                  "Save hours of manual work across teams",
                  "Updated AI-driven forecasts for the next 730 days",
                  "Accessible insights anytime, anywhere, on any device",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-blue-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                Trusted by the industry for AI strategy, implementation, and
                measurable outcomes.
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <Image
                src="/ai-audit/scorecard.svg"
                alt="AI audit scorecard preview"
                width={520}
                height={360}
                className="h-auto w-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="container">
          <div className="mb-10 flex flex-col gap-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              What Happens Next
            </p>
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              A Clear, Fast Path to AI Impact
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "Discovery Call",
                text: "We learn your goals, systems, and data constraints in 30 minutes.",
              },
              {
                title: "AI Audit Report",
                text: "Receive a 6-page report with ROI, quick wins, and a build plan.",
              },
              {
                title: "Implementation Sprint",
                text: "If you decide to move forward, we execute the roadmap with your team.",
              },
            ].map((step, index) => (
              <div
                key={step.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                  0{index + 1}
                </div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
