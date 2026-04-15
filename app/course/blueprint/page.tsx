"use client";

import { useEffect, useState } from "react";
import { getPersonalizedLessons, BODY_STRUCTURE_INFO, type UserProfile } from "@/lib/curriculum";
import { Download, CalendarDays } from "lucide-react";

export default function BlueprintPage() {
  const [profile, setProfile] = useState<Partial<UserProfile> | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sic-profile");
      if (saved) setProfile(JSON.parse(saved));
    }
  }, []);

  const lessons = profile
    ? getPersonalizedLessons({
        bodyStructure: profile.bodyStructure || null,
        verticalLine: profile.verticalLine || null,
        shoulderType: profile.shoulderType || null,
        hipPlacement: profile.hipPlacement || null,
        proportionTypes: profile.proportionTypes || [],
      })
    : [];

  const handlePrint = () => window.print();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <p className="text-xs uppercase tracking-[0.35em] mb-6" style={{ color: "var(--ink-soft)" }}>
        Module 05 — Your Blueprint
      </p>
      <h1
        className="text-4xl md:text-5xl font-bold leading-[1.05] mb-6"
        style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
      >
        Your complete blueprint.
      </h1>
      <p className="text-base leading-relaxed mb-12" style={{ color: "var(--ink-soft)" }}>
        This is your permanent style reference. Every rule and guideline below applies specifically
        to you — based on everything you identified in this workshop. Save or print it and return
        to it whenever you need clarity.
      </p>

      {/* Blueprint card */}
      <div
        id="blueprint-printable"
        className="p-8 mb-10 space-y-8"
        style={{ background: "var(--parchment)", border: "1px solid var(--ink-ghost)" }}
      >
        {/* Header */}
        <div
          className="pb-6"
          style={{ borderBottom: "1px solid var(--ink-ghost)" }}
        >
          <p
            className="text-xs uppercase tracking-[0.3em] mb-2"
            style={{ color: "var(--ink-soft)" }}
          >
            Self-Image Curator — Personal Style Blueprint
          </p>
          <h2
            className="text-2xl font-bold"
            style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
          >
            {profile?.bodyStructure
              ? BODY_STRUCTURE_INFO[profile.bodyStructure].label
              : "Your"}{" "}
            Body Blueprint
          </h2>
        </div>

        {/* Profile summary */}
        <div>
          <p
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "var(--ink-ghost)" }}
          >
            Your Profile
          </p>
          <div className="grid grid-cols-2 gap-y-4 gap-x-8">
            {[
              {
                label: "Body Structure",
                value: profile?.bodyStructure
                  ? BODY_STRUCTURE_INFO[profile.bodyStructure].label
                  : "—",
              },
              {
                label: "Vertical Line",
                value: profile?.verticalLine
                  ? profile.verticalLine.charAt(0).toUpperCase() + profile.verticalLine.slice(1)
                  : "—",
              },
              {
                label: "Color Season",
                value: (profile as Record<string, unknown>)?.colorSeason
                  ? String((profile as Record<string, unknown>).colorSeason).charAt(0).toUpperCase() +
                    String((profile as Record<string, unknown>).colorSeason).slice(1)
                  : "—",
              },
              {
                label: "Shoulder Type",
                value: profile?.shoulderType
                  ? profile.shoulderType.replace(/-/g, " ")
                  : "—",
              },
              {
                label: "Hip Placement",
                value: profile?.hipPlacement
                  ? profile.hipPlacement.charAt(0).toUpperCase() + profile.hipPlacement.slice(1)
                  : "—",
              },
              {
                label: "Proportions",
                value:
                  (profile?.proportionTypes || []).length > 0
                    ? profile!.proportionTypes!.map((p) => p.replace(/-/g, " ")).join(", ")
                    : "Standard",
              },
            ].map((item) => (
              <div key={item.label}>
                <p
                  className="text-[10px] uppercase tracking-widest mb-0.5"
                  style={{ color: "var(--ink-ghost)" }}
                >
                  {item.label}
                </p>
                <p className="text-sm font-medium capitalize" style={{ color: "var(--ink)" }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* All lessons */}
        {lessons.length > 0 && (
          <div>
            <p
              className="text-xs uppercase tracking-widest mb-6"
              style={{ color: "var(--ink-ghost)" }}
            >
              Your Garment Guidelines ({lessons.length} lessons)
            </p>
            <div className="space-y-6">
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="pb-6"
                  style={{ borderBottom: "1px solid var(--ink-ghost)" }}
                >
                  <h3
                    className="text-base font-bold mb-0.5"
                    style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
                  >
                    {lesson.title}
                  </h3>
                  <p className="text-xs mb-3" style={{ color: "var(--ink-soft)" }}>
                    {lesson.subtitle}
                  </p>
                  <ul className="space-y-1.5">
                    {lesson.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-xs mt-0.5 shrink-0" style={{ color: "var(--plum)" }}>
                          —
                        </span>
                        <span className="text-xs leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-[10px]" style={{ color: "var(--ink-ghost)" }}>
          Generated by the Self-Image Curator Online Blueprint Workshop — selfimagecurator.com
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-16">
        <button
          onClick={handlePrint}
          className="flex items-center justify-center gap-3 px-6 py-4 font-semibold uppercase tracking-widest text-sm transition-opacity hover:opacity-80"
          style={{ background: "var(--plum)", color: "var(--cream)" }}
        >
          <Download size={16} />
          Save / Print Blueprint
        </button>
      </div>

      {/* CTA: Book a consultation */}
      <div
        className="p-8"
        style={{ background: "var(--ink-deep)", color: "var(--cream)" }}
      >
        <CalendarDays size={24} className="mb-4 opacity-60" />
        <h2
          className="text-2xl font-bold mb-3"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
        >
          Ready to go deeper?
        </h2>
        <p className="text-sm leading-relaxed mb-6 opacity-75 max-w-lg">
          A one-on-one consultation with Thays goes beyond what any self-guided course can offer.
          She&apos;ll review your specific wardrobe, your lifestyle, and your blueprint together
          — giving you direct, personalized guidance.
        </p>
        <a
          href="https://selfimagecurator.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-6 py-3 text-sm font-semibold uppercase tracking-widest transition-opacity hover:opacity-80"
          style={{ background: "var(--cream)", color: "var(--plum)" }}
        >
          Book a Consultation
        </a>
        <p className="text-xs mt-4 opacity-40">
          Workshop graduates receive priority scheduling.
        </p>
      </div>
    </div>
  );
}
