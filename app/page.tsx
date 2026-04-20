"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { BodyStructureIllustration } from "@/components/BodyStructureIllustration";
import type { BodyStructure } from "@/lib/curriculum";

const PRICE = 197;

const WHAT_YOU_GET = [
  {
    number: "01",
    title: "Color Exploration",
    body: "Identify your cool or warm color season and learn how to use it to enhance your natural features.",
  },
  {
    number: "02",
    title: "Your Body Profile",
    body: "Build your personal blueprint — body structure, proportions, vertical line, shoulder type, and hip placement.",
  },
  {
    number: "03",
    title: "Your Personalized Garment Guide",
    body: "Access only the lessons that apply to you. Every principle mapped to your unique structure — not a generic body type chart.",
  },
  {
    number: "04",
    title: "Inside Line Fabrics",
    body: "Understand which fabrics and textures work with your body — and which to avoid. A detail most style guides skip entirely.",
  },
  {
    number: "05",
    title: "Your Complete Blueprint",
    body: "A downloadable summary of every rule, recommendation, and reference curated specifically for you.",
  },
];

const FAQS = [
  {
    q: "Is this a live course or self-paced?",
    a: "Fully self-paced. Work through it on your own time — there are no deadlines, no live sessions required.",
  },
  {
    q: "How is this different from a consultation with Thays?",
    a: "A one-on-one consultation goes deeper and includes direct feedback on your specific wardrobe and lifestyle. This course gives you the complete framework and methodology at your own pace. Many clients use it as preparation before booking a consultation.",
  },
  {
    q: "Do I need fashion experience?",
    a: "None at all. This workshop is designed to be clear, practical, and accessible — whether you're starting from scratch or refining an existing style.",
  },
  {
    q: "Will this work for my body type?",
    a: "The course covers all five body structures plus proportions, vertical lines, shoulder types, and hip placement. Your guide is filtered specifically to your combination — not a one-size-fits-all approach.",
  },
  {
    q: "What happens after I purchase?",
    a: "You'll receive an email with access to the full workshop immediately. You can start the same day.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b cursor-pointer select-none"
      style={{ borderColor: "var(--ink-ghost)" }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between py-5">
        <span className="text-sm font-medium pr-8" style={{ color: "var(--ink)" }}>
          {q}
        </span>
        <ChevronDown
          size={16}
          style={{
            color: "var(--ink-soft)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            flexShrink: 0,
          }}
        />
      </div>
      {open && (
        <p className="text-sm pb-5 leading-relaxed" style={{ color: "var(--ink-soft)" }}>
          {a}
        </p>
      )}
    </div>
  );
}

export default function LandingPage() {
  return (
    <main style={{ background: "var(--cream)", color: "var(--ink)" }}>
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16"
        style={{ background: "var(--cream)", borderBottom: "1px solid var(--ink-ghost)" }}
      >
        <span
          className="text-xs font-bold uppercase tracking-[0.25em]"
          style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
        >
          Self-Image Curator
        </span>
        <Link
          href="/checkout"
          className="text-xs font-semibold uppercase tracking-widest px-5 py-2.5 transition-opacity hover:opacity-70"
          style={{
            background: "var(--plum)",
            color: "var(--cream)",
            letterSpacing: "0.15em",
          }}
        >
          Enroll — ${PRICE}
        </Link>
      </nav>

      {/* Hero */}
      <section
        className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16"
        style={{ background: "var(--plum)" }}
      >
        <p
          className="text-xs uppercase tracking-[0.35em] mb-8 opacity-60"
          style={{ color: "var(--cream)", fontFamily: "Rajdhani, sans-serif" }}
        >
          The Online Blueprint Workshop
        </p>
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-8 max-w-4xl"
          style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--cream)" }}
        >
          Dress with intention.
          <br />
          Know exactly why.
        </h1>
        <p
          className="text-base md:text-lg max-w-xl leading-relaxed mb-12 font-light"
          style={{ color: "var(--cream)", opacity: 0.75 }}
        >
          A guided, step-by-step experience to help you understand your unique body structure and
          translate it into a clear, intentional self-image.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/checkout"
            className="flex items-center gap-3 px-8 py-4 font-semibold uppercase tracking-widest text-sm transition-opacity hover:opacity-90"
            style={{ background: "var(--cream)", color: "var(--plum)" }}
          >
            Enroll Now — ${PRICE}
            <ArrowRight size={16} />
          </Link>
          <a
            href="#what-you-get"
            className="text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
            style={{ color: "var(--cream)" }}
          >
            See what&apos;s inside
          </a>
        </div>
        <p className="text-xs mt-6 opacity-40" style={{ color: "var(--cream)" }}>
          One-time payment. Immediate access. No subscription.
        </p>
      </section>

      {/* Who this is for */}
      <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto">
        <p
          className="text-xs uppercase tracking-[0.3em] mb-10"
          style={{ color: "var(--ink-soft)" }}
        >
          Who this is for
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              headline: "You're done guessing.",
              body: "You've tried trends, Pinterest boards, and styled yourself into circles. You want a system — not more inspiration.",
            },
            {
              headline: "You want to understand your body.",
              body: "Not just 'what looks good' but why. The principles behind proportion, balance, and garment construction.",
            },
            {
              headline: "You're investing in your image.",
              body: "Whether you're preparing for a life change or elevating your everyday — you know your presentation matters.",
            },
          ].map((item) => (
            <div key={item.headline} className="space-y-3">
              <h3
                className="text-lg font-bold"
                style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
              >
                {item.headline}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: "1px", background: "var(--ink-ghost)", maxWidth: "800px", margin: "0 auto" }} />

      {/* Body structure visual strip */}
      <section
        className="py-20 px-6 md:px-12"
        style={{ background: "var(--ink-deep)" }}
      >
        <div className="max-w-4xl mx-auto">
          <p
            className="text-xs uppercase tracking-[0.3em] mb-3"
            style={{ color: "rgba(238,239,237,0.4)" }}
          >
            Your starting point
          </p>
          <p
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--cream)" }}
          >
            Five body structures. One precise blueprint.
          </p>
          <p
            className="text-sm mb-12 max-w-lg"
            style={{ color: "rgba(238,239,237,0.55)" }}
          >
            Your bone structure — not your weight or measurements — determines which garment
            principles apply to you. Every blueprint generated in this workshop is unique.
          </p>
          <div className="grid grid-cols-5 gap-3">
            {(
              [
                { type: "apple" as BodyStructure, label: "Apple" },
                { type: "inverted-triangle" as BodyStructure, label: "Inv. Triangle" },
                { type: "rectangle" as BodyStructure, label: "Rectangle" },
                { type: "triangle" as BodyStructure, label: "Triangle" },
                { type: "hourglass" as BodyStructure, label: "Hourglass" },
              ]
            ).map(({ type, label }) => (
              <div key={type} className="flex flex-col">
                <div className="w-full" style={{ aspectRatio: "3/5" }}>
                  <BodyStructureIllustration type={type} selected />
                </div>
                <p
                  className="text-[10px] uppercase tracking-widest text-center mt-2"
                  style={{ color: "rgba(238,239,237,0.45)", fontFamily: "Rajdhani, sans-serif" }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
          <p
            className="text-xs mt-8"
            style={{ color: "rgba(238,239,237,0.3)" }}
          >
            Plus vertical line · proportions · shoulder type · hip placement — 1,620 possible profile combinations.
          </p>
        </div>
      </section>

      {/* What you get */}
      <section id="what-you-get" className="py-24 px-6 md:px-12 max-w-4xl mx-auto">
        <p
          className="text-xs uppercase tracking-[0.3em] mb-10"
          style={{ color: "var(--ink-soft)" }}
        >
          What&apos;s inside
        </p>
        <div className="space-y-0">
          {WHAT_YOU_GET.map((item, i) => (
            <div
              key={item.number}
              className="flex gap-8 py-8"
              style={{
                borderBottom: i < WHAT_YOU_GET.length - 1 ? "1px solid var(--ink-ghost)" : "none",
              }}
            >
              <span
                className="text-xs font-bold shrink-0 mt-1"
                style={{ color: "var(--ink-ghost)", fontFamily: "Rajdhani, sans-serif", minWidth: "2rem" }}
              >
                {item.number}
              </span>
              <div className="space-y-2">
                <h3
                  className="text-xl font-bold"
                  style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Includes */}
      <section className="py-20 px-6 md:px-12" style={{ background: "var(--parchment)" }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] mb-10" style={{ color: "var(--ink-soft)" }}>
            Your enrollment includes
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Full access to all 5 workshop modules",
              "Personalized garment guide filtered to your body profile",
              "Color exploration toolkit",
              "Inside line fabrics guide",
              "26-page illustrated reference guide",
              "Downloadable personal blueprint",
              "Access to book a 1-on-1 consultation at a member rate",
              "Lifetime access — no expiration",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <Check size={14} className="mt-0.5 shrink-0" style={{ color: "var(--plum)" }} />
                <span className="text-sm" style={{ color: "var(--ink)" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Thays */}
      <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: "var(--ink-soft)" }}>
              Your guide
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
            >
              Thays Vick
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--ink-soft)" }}>
              Thays is a self-image consultant and educator who has spent years developing a precise,
              structured approach to personal style — one that goes far beyond trends or body type
              categories.
            </p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--ink-soft)" }}>
              Her one-on-one consultations are in high demand. This workshop is the closest thing to
              that experience in a self-guided format — built from the same methodology she uses with
              every client.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              The Online Blueprint Workshop is her way of making that system accessible to anyone ready
              to do the work.
            </p>
          </div>
          <div
            className="aspect-[3/4] flex items-center justify-center"
            style={{ background: "var(--ink-ghost)" }}
          >
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--ink-soft)" }}>
              Photo
            </span>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section
        className="py-24 px-6 md:px-12 text-center"
        style={{ background: "var(--ink-deep)", color: "var(--cream)" }}
      >
        <p
          className="text-xs uppercase tracking-[0.3em] mb-6 opacity-60"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
        >
          One-time investment
        </p>
        <div
          className="text-6xl md:text-8xl font-bold mb-4"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
        >
          ${PRICE}
        </div>
        <p className="text-sm opacity-60 mb-10">One-time payment. Immediate access. No subscription.</p>
        <Link
          href="/checkout"
          className="inline-flex items-center gap-3 px-10 py-5 font-semibold uppercase tracking-widest text-sm transition-opacity hover:opacity-90"
          style={{ background: "var(--cream)", color: "var(--plum)" }}
        >
          Begin Your Blueprint
          <ArrowRight size={16} />
        </Link>
        <p className="text-xs mt-8 opacity-40">
          Questions?{" "}
          <a
            href="mailto:hello@selfimagecurator.com"
            className="underline"
            style={{ color: "var(--cream)" }}
          >
            hello@selfimagecurator.com
          </a>
        </p>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-12 max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] mb-10" style={{ color: "var(--ink-soft)" }}>
          Frequently asked
        </p>
        {FAQS.map((faq) => (
          <FaqItem key={faq.q} q={faq.q} a={faq.a} />
        ))}
      </section>

      {/* Footer */}
      <footer
        className="py-10 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: "1px solid var(--ink-ghost)" }}
      >
        <span
          className="text-xs uppercase tracking-[0.25em]"
          style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink-soft)" }}
        >
          Self-Image Curator
        </span>
        <p className="text-xs" style={{ color: "var(--ink-ghost)" }}>
          © {new Date().getFullYear()} Thays Vick. All rights reserved.
        </p>
        <a href="https://selfimagecurator.com" className="text-xs" style={{ color: "var(--ink-soft)" }}>
          selfimagecurator.com
        </a>
      </footer>
    </main>
  );
}
