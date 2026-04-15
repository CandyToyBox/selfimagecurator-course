import Link from "next/link";
import { ArrowRight } from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Color Exploration",
    body: "You'll assemble colors based on your consultant's scheme and photograph them against your skin in natural light.",
  },
  {
    number: "02",
    title: "Build Your Body Profile",
    body: "Using the workshop materials, you'll identify your body structure, proportions, vertical line, shoulder type, and hip placement.",
  },
  {
    number: "03",
    title: "Your Personalized Garment Guide",
    body: "Based on your profile, you'll receive the specific sections of the garment guide that apply to your unique combination.",
  },
  {
    number: "04",
    title: "Inside Line Fabrics",
    body: "You'll learn which fabrics work with your body's natural lines — and which to avoid.",
  },
  {
    number: "05",
    title: "Your Complete Blueprint",
    body: "A downloadable, personalized summary of everything you've learned — your permanent reference guide.",
  },
];

export default function WelcomePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <p
        className="text-xs uppercase tracking-[0.35em] mb-6"
        style={{ color: "var(--ink-soft)" }}
      >
        Module 01 — Welcome
      </p>
      <h1
        className="text-4xl md:text-6xl font-bold leading-[1.0] mb-8"
        style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
      >
        Your blueprint starts here.
      </h1>
      <p className="text-base leading-relaxed mb-4 max-w-2xl" style={{ color: "var(--ink-soft)" }}>
        The Online Blueprint Workshop is a guided, step-by-step process designed to help you
        understand your unique characteristics and translate them into a clear, intentional
        self-image.
      </p>
      <p className="text-base leading-relaxed mb-16 max-w-2xl" style={{ color: "var(--ink-soft)" }}>
        Work through each module at your own pace. There are no deadlines and no wrong answers —
        only your honest observations about your own body.
      </p>

      {/* What you'll need */}
      <div
        className="p-8 mb-16"
        style={{ background: "var(--parchment)", border: "1px solid var(--ink-ghost)" }}
      >
        <h2
          className="text-lg font-bold mb-6"
          style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
        >
          What you&apos;ll need
        </h2>
        <ul className="space-y-3">
          {[
            "Fabric swatches or clothing pieces in the colors from your color scheme",
            "A string, long necklace, or ribbon (for body proportion assessment)",
            "Your phone — to photograph colors against your skin",
            "A full-length mirror or a space to see your full silhouette",
            "This device — to work through the modules",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <div
                className="w-1 h-1 rounded-full mt-2 shrink-0"
                style={{ background: "var(--plum)" }}
              />
              <span className="text-sm" style={{ color: "var(--ink-soft)" }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* How it works */}
      <h2
        className="text-lg font-bold mb-8"
        style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
      >
        How the workshop works
      </h2>
      <div className="space-y-0">
        {STEPS.map((step, i) => (
          <div
            key={step.number}
            className="flex gap-6 py-6"
            style={{
              borderBottom: i < STEPS.length - 1 ? "1px solid var(--ink-ghost)" : "none",
            }}
          >
            <span
              className="text-xs font-bold shrink-0 mt-0.5"
              style={{ color: "var(--ink-ghost)", fontFamily: "Rajdhani, sans-serif", minWidth: "1.5rem" }}
            >
              {step.number}
            </span>
            <div>
              <h3
                className="text-base font-bold mb-1"
                style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
              >
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                {step.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <Link
          href="/course/color"
          className="inline-flex items-center gap-3 px-8 py-4 font-semibold uppercase tracking-widest text-sm transition-opacity hover:opacity-80"
          style={{ background: "var(--plum)", color: "var(--cream)" }}
        >
          Begin — Color Exploration
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
