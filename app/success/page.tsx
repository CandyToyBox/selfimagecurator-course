"use client";

import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function SuccessPage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center"
      style={{ background: "var(--cream)" }}
    >
      <CheckCircle size={40} style={{ color: "var(--plum)" }} className="mb-8" />
      <p
        className="text-xs uppercase tracking-[0.3em] mb-4"
        style={{ color: "var(--ink-soft)" }}
      >
        Enrollment confirmed
      </p>
      <h1
        className="text-4xl md:text-5xl font-bold mb-6"
        style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
      >
        Welcome to the Blueprint Workshop.
      </h1>
      <p className="text-sm leading-relaxed max-w-md mb-12" style={{ color: "var(--ink-soft)" }}>
        Your access is ready. Begin at your own pace — there&apos;s no rush. Take your time with
        each module and build your blueprint step by step.
      </p>
      <Link
        href="/course/welcome"
        className="inline-flex items-center gap-3 px-8 py-4 font-semibold uppercase tracking-widest text-sm transition-opacity hover:opacity-80"
        style={{ background: "var(--plum)", color: "var(--cream)" }}
      >
        Begin the Workshop
        <ArrowRight size={16} />
      </Link>
      <p className="text-xs mt-8" style={{ color: "var(--ink-ghost)" }}>
        A receipt has been sent to your email.
      </p>
    </main>
  );
}
