"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const STEPS = [
  { href: "/course/welcome", label: "Welcome", number: "01" },
  { href: "/course/color", label: "Color Exploration", number: "02" },
  { href: "/course/body-profile", label: "Body Profile", number: "03" },
  { href: "/course/garment-guide", label: "Garment Guide", number: "04" },
  { href: "/course/blueprint", label: "Your Blueprint", number: "05" },
];

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const currentIndex = STEPS.findIndex((s) => pathname.startsWith(s.href));

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--cream)" }}>
      {/* Top bar */}
      <header
        className="h-14 flex items-center justify-between px-6 md:px-10 shrink-0"
        style={{ background: "var(--parchment)", borderBottom: "1px solid var(--ink-ghost)" }}
      >
        <Link
          href="/"
          className="text-xs font-bold uppercase tracking-[0.25em]"
          style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
        >
          Self-Image Curator
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {STEPS.map((step, i) => {
            const isActive = pathname.startsWith(step.href);
            const isDone = i < currentIndex;
            return (
              <Link
                key={step.href}
                href={step.href}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium uppercase tracking-widest transition-colors rounded-sm"
                style={{
                  background: isActive ? "var(--plum)" : "transparent",
                  color: isActive ? "var(--cream)" : isDone ? "var(--ink)" : "var(--ink-ghost)",
                }}
              >
                <span>{step.number}</span>
                <span>{step.label}</span>
              </Link>
            );
          })}
        </div>
        {/* Mobile step indicator */}
        <div className="md:hidden text-xs" style={{ color: "var(--ink-soft)" }}>
          {currentIndex + 1} / {STEPS.length}
        </div>
      </header>

      {/* Progress bar */}
      <div
        className="h-0.5 w-full"
        style={{ background: "var(--ink-ghost)" }}
      >
        <div
          className="h-full transition-all duration-500"
          style={{
            background: "var(--plum)",
            width: `${((currentIndex + 1) / STEPS.length) * 100}%`,
          }}
        />
      </div>

      {/* Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
