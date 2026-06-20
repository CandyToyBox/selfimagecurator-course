"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { BodyStructureIllustration } from "@/components/BodyStructureIllustration";
import { BookingEmbed } from "@/components/BookingEmbed";
import type { BodyStructure } from "@/lib/curriculum";

const PRICE = 197;

// Real credentials — sourced from Thays Vick's executive profile.
const STATS = [
  { figure: "15+", label: "Years serving high-net-worth clients" },
  { figure: "$150K+", label: "Luxury purchases facilitated in 30 days" },
  { figure: "$50–60K", label: "Average seasonal client investment" },
  { figure: "100%", label: "Referral-driven · near-zero return rate" },
];

// Heritage houses Thays sources, styles, and tailors for private clients.
const HERITAGE_BRANDS = [
  "Brunello Cucinelli",
  "Loro Piana",
  "Chanel",
  "Hermès",
  "Alexander McQueen",
  "Ralph Lauren",
];

const TESTIMONIALS = [
  {
    quote:
      "I met Thays during a time of transition in my life. She analyzed my goals, dreams, and personality to guide me to a capsule wardrobe I could mix and match for any schedule — the colors all blending for an elevated look. Even the dreaded shopping is now a pleasure, since I know exactly what works for my athletic (and breast-cancer) body. Working with Thays has been life-changing — yet the real gift is the friendship and support she has given me.",
    name: "Carswell Jackson",
    since: "Client since 2018",
  },
  {
    quote:
      "Working with you has literally changed my life! For the first time, I feel confident in my clothes and in my style. From clearing out my closet so I keep only the pieces that work together and are my colors, to shopping for timeless pieces that pair with everything I own — you've made getting dressed fun and so much easier every single day. My style finally complements my body, and I simply feel better in my clothes.",
    name: "Gail Bernstein",
    since: "Client since 2022",
  },
  {
    quote:
      "Thays helped me find my confidence again after becoming a mom and balancing a demanding career. Getting dressed used to feel surprisingly stressful. Now I feel confident, prepared for any occasion, and I never have to overthink what to wear. I've saved so much time and money learning what truly works for my body and my colors — and Thays has a way of making you feel amazing about yourself.",
    name: "Morgan Qubein",
    since: "Client since 2022",
  },
  {
    quote:
      "Thays has made getting dressed a breeze. After determining my color palette, her help revamping my wardrobe — and keeping me current with new purchases — has made my life so much easier. She is also a wonderful person and a joy to work with.",
    name: "Louise Brady",
    since: "Client since 2018",
  },
];

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
        <Image
          src="/Self-Image Curator - Thays Logo.png"
          alt="Self-Image Curator"
          width={120}
          height={40}
          style={{ objectFit: "contain", height: "32px", width: "auto" }}
        />
        <div className="flex items-center gap-4">
          <Link
            href="/course/welcome"
            className="text-xs font-medium uppercase tracking-widest transition-opacity hover:opacity-60 hidden sm:block"
            style={{ color: "var(--ink-soft)", letterSpacing: "0.15em" }}
          >
            Preview Course
          </Link>
          <a
            href="#book"
            className="text-xs font-medium uppercase tracking-widest transition-opacity hover:opacity-60 hidden sm:block"
            style={{ color: "var(--ink-soft)", letterSpacing: "0.15em" }}
          >
            Book 1-on-1
          </a>
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
        </div>
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
        <p className="text-xs mt-6 opacity-75" style={{ color: "var(--cream)" }}>
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
                style={{ color: "var(--ink-muted)", fontFamily: "Rajdhani, sans-serif", minWidth: "2rem" }}
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
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
            >
              Thays Vick
            </h2>
            <p
              className="text-xs uppercase tracking-[0.2em] mb-6"
              style={{ color: "var(--accent)" }}
            >
              Luxury Personal Shopper · Wardrobe Curator · Image Consultant
            </p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--ink-soft)" }}>
              For more than <strong style={{ color: "var(--ink)" }}>15 years</strong>, Thays has helped
              high-net-worth clients across Bal Harbour, Palm Beach, and New York look — and feel —
              unmistakably themselves. As founder of Self-Image Curator, she provides concierge-level
              personal shopping, wardrobe curation, and color analysis for a private clientele of
              executives, physicians, entrepreneurs, and professional athletes.
            </p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--ink-soft)" }}>
              Brazilian-born and atelier-trained — with study at the{" "}
              <strong style={{ color: "var(--ink)" }}>Fashion Institute of Technology (FIT)</strong> —
              she designs, tailors, and alters as fluently as she sources. Every piece fits flawlessly:
              the foundation of a 100% referral-driven practice with a near-zero return rate.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              Her one-on-one consultations are in high demand. The Online Blueprint Workshop distills the
              same proprietary methodology — body architecture, color psychology, and lifestyle — into a
              self-guided experience anyone can follow.
            </p>
          </div>
          <div className="aspect-[3/4] overflow-hidden" style={{ background: "var(--ink-ghost)" }}>
            <Image
              src="/Thays B&W Coat Pic.png"
              alt="Thays Vick"
              width={600}
              height={800}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>
        </div>

        {/* Private-client impact — stats */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px mt-16"
          style={{ background: "var(--ink-ghost)", border: "1px solid var(--ink-ghost)" }}
        >
          {STATS.map((s) => (
            <div key={s.label} className="px-5 py-7 text-center" style={{ background: "var(--cream)" }}>
              <p
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--plum)" }}
              >
                {s.figure}
              </p>
              <p
                className="text-[11px] uppercase tracking-wider leading-snug"
                style={{ color: "var(--ink-soft)" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Signature quote */}
        <blockquote
          className="mt-12 text-center text-lg md:text-xl leading-relaxed italic max-w-2xl mx-auto"
          style={{ fontFamily: "Newsreader, Georgia, serif", color: "var(--ink)" }}
        >
          “Great style isn&apos;t about more — it&apos;s about the right architecture. Built around who a
          woman truly is, the perfect wardrobe makes confidence effortless.”
          <span
            className="block text-xs uppercase tracking-[0.25em] not-italic mt-5"
            style={{ color: "var(--ink-soft)", fontFamily: "Inter, sans-serif" }}
          >
            Thays Vick
          </span>
        </blockquote>
      </section>

      {/* Heritage brand expertise + experience */}
      <section className="py-16 px-6 md:px-12" style={{ background: "var(--ink-deep)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-xs uppercase tracking-[0.3em] mb-8"
            style={{ color: "rgba(238,239,237,0.55)" }}
          >
            Heritage houses she sources &amp; styles
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 mb-12">
            {HERITAGE_BRANDS.map((brand) => (
              <span
                key={brand}
                className="text-base md:text-lg tracking-wide"
                style={{ fontFamily: "Newsreader, Georgia, serif", color: "var(--cream)" }}
              >
                {brand}
              </span>
            ))}
          </div>
          <div
            className="grid md:grid-cols-3 gap-8 pt-10 text-left"
            style={{ borderTop: "1px solid rgba(238,239,237,0.15)" }}
          >
            {[
              {
                h: "Luxury Retail",
                b: "Private clienteling at Alexander McQueen, Saks Fifth Avenue, and Hugo Boss — in New York and Europe.",
              },
              {
                h: "Editorial & Runway",
                b: "Styling with Oscar de la Renta, Marchesa, Jenny Packham, and Calvin Klein Resort.",
              },
              {
                h: "Atelier-Trained",
                b: "A family couture house in Brazil, plus Centro Europeu and the Image Resource Center, New York.",
              },
            ].map((c) => (
              <div key={c.h}>
                <p
                  className="text-sm font-bold mb-2"
                  style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--cream)" }}
                >
                  {c.h}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(238,239,237,0.7)" }}>
                  {c.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 md:px-12" style={{ background: "var(--parchment)" }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "var(--ink-soft)" }}>
            In her clients&apos; words
          </p>
          <p
            className="text-2xl md:text-3xl font-bold mb-12 max-w-xl"
            style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
          >
            A relationship-driven practice — built on trust, discretion, and lasting friendship.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="p-7 flex flex-col"
                style={{ background: "var(--cream)", border: "1px solid var(--ink-ghost)" }}
              >
                <span
                  className="text-3xl leading-none mb-3"
                  style={{ fontFamily: "Newsreader, Georgia, serif", color: "var(--accent)" }}
                >
                  &ldquo;
                </span>
                <blockquote
                  className="text-sm leading-relaxed mb-5 flex-1"
                  style={{ color: "var(--ink-soft)" }}
                >
                  {t.quote}
                </blockquote>
                <figcaption>
                  <p
                    className="text-sm font-bold uppercase tracking-wider"
                    style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
                  >
                    {t.name}
                  </p>
                  <p className="text-xs italic" style={{ color: "var(--accent)" }}>
                    {t.since}
                  </p>
                </figcaption>
              </figure>
            ))}
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
        <p className="text-xs mt-8 opacity-75">
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

      {/* Book a 1-on-1 — inline scheduler */}
      <section id="book" className="py-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "var(--ink-soft)" }}>
            Prefer to work privately
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
          >
            Book a 1-on-1 with Thays.
          </h2>
          <p className="text-sm leading-relaxed max-w-xl mx-auto" style={{ color: "var(--ink-soft)" }}>
            For the full concierge experience — a personal Blueprint Analysis, closet edit, and direct
            guidance built around your body, your lifestyle, and your goals. Choose a time below.
          </p>
        </div>
        <div className="max-w-3xl mx-auto" style={{ border: "1px solid var(--ink-ghost)" }}>
          <BookingEmbed />
        </div>
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
        <Image
          src="/Self-Image Curator - Thays Logo.png"
          alt="Self-Image Curator"
          width={100}
          height={34}
          style={{ objectFit: "contain", height: "28px", width: "auto", opacity: 0.6 }}
        />
        <p className="text-xs" style={{ color: "var(--ink-muted)" }}>
          © {new Date().getFullYear()} Thays Vick. All rights reserved.
        </p>
        <a href="https://selfimagecurator.com" className="text-xs" style={{ color: "var(--ink-soft)" }}>
          selfimagecurator.com
        </a>
      </footer>
    </main>
  );
}
