"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPersonalizedLessons, LESSONS, type Lesson, type UserProfile } from "@/lib/curriculum";

const CATEGORY_LABELS: Record<string, string> = {
  "body-structure": "Body Structure",
  "proportions": "Proportions",
  "lines-fabrics": "Lines & Fabrics",
  "shoulder": "Shoulder",
  "hip": "Hip",
};

const CATEGORY_ORDER = ["body-structure", "proportions", "lines-fabrics", "shoulder", "hip"];

function LessonCard({ lesson }: { lesson: Lesson }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border transition-all"
      style={{
        borderColor: open ? "var(--plum)" : "var(--ink-ghost)",
        background: open ? "var(--parchment)" : "transparent",
      }}
    >
      <button
        className="w-full text-left px-6 py-5 flex items-start justify-between gap-4"
        onClick={() => setOpen(!open)}
      >
        <div>
          <p
            className="text-base font-bold"
            style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
          >
            {lesson.title}
          </p>
          <p className="text-xs mt-0.5" style={{ color: "var(--ink-soft)" }}>
            {lesson.subtitle}
          </p>
        </div>
        <span
          className="text-xs shrink-0 mt-1"
          style={{ color: "var(--ink-ghost)" }}
        >
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div className="px-6 pb-6">
          <ul className="space-y-3 mt-2">
            {lesson.points.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <div
                  className="w-1 h-1 rounded-full mt-2 shrink-0"
                  style={{ background: "var(--plum)" }}
                />
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                  {point}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function GarmentGuidePage() {
  const [profile, setProfile] = useState<Partial<UserProfile> | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sic-profile");
      if (saved) {
        const p = JSON.parse(saved) as Partial<UserProfile>;
        setProfile(p);
        if (p.bodyStructure || p.verticalLine || p.shoulderType || p.hipPlacement) {
          const personalized = getPersonalizedLessons({
            bodyStructure: p.bodyStructure || null,
            verticalLine: p.verticalLine || null,
            shoulderType: p.shoulderType || null,
            hipPlacement: p.hipPlacement || null,
            proportionTypes: p.proportionTypes || [],
          });
          setLessons(personalized);
        }
      }
    }
  }, []);

  const noProfile = !profile?.bodyStructure && !profile?.verticalLine;

  const grouped = CATEGORY_ORDER.reduce<Record<string, Lesson[]>>((acc, cat) => {
    const items = lessons.filter((l) => l.category === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {});

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <p className="text-xs uppercase tracking-[0.35em] mb-6" style={{ color: "var(--ink-soft)" }}>
        Module 04 — Garment Guide
      </p>
      <h1
        className="text-4xl md:text-5xl font-bold leading-[1.05] mb-6"
        style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
      >
        Your personalized garment guide.
      </h1>

      {noProfile ? (
        <div
          className="p-8 mb-10"
          style={{ background: "var(--parchment)", border: "1px solid var(--ink-ghost)" }}
        >
          <p className="text-sm mb-4" style={{ color: "var(--ink-soft)" }}>
            Your garment guide is personalized based on your body profile. Complete the Body Profile
            module first to unlock your specific lessons.
          </p>
          <Link
            href="/course/body-profile"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider"
            style={{ color: "var(--plum)" }}
          >
            Build My Profile <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <>
          {/* Profile summary bar */}
          <div
            className="flex flex-wrap gap-2 mb-8 p-4"
            style={{ background: "var(--parchment)", border: "1px solid var(--ink-ghost)" }}
          >
            {profile?.bodyStructure && (
              <span
                className="text-[10px] px-2 py-1 uppercase tracking-widest font-medium"
                style={{ background: "var(--plum)", color: "var(--cream)" }}
              >
                {profile.bodyStructure.replace(/-/g, " ")}
              </span>
            )}
            {profile?.verticalLine && (
              <span
                className="text-[10px] px-2 py-1 uppercase tracking-widest font-medium"
                style={{ background: "var(--ink-ghost)", color: "var(--ink)" }}
              >
                {profile.verticalLine}
              </span>
            )}
            {profile?.shoulderType && profile.shoulderType !== "standard" && (
              <span
                className="text-[10px] px-2 py-1 uppercase tracking-widest font-medium"
                style={{ background: "var(--ink-ghost)", color: "var(--ink)" }}
              >
                {profile.shoulderType.replace(/-/g, " ")} shoulder
              </span>
            )}
            {profile?.hipPlacement && profile.hipPlacement !== "standard" && (
              <span
                className="text-[10px] px-2 py-1 uppercase tracking-widest font-medium"
                style={{ background: "var(--ink-ghost)", color: "var(--ink)" }}
              >
                {profile.hipPlacement} hip
              </span>
            )}
            {(profile?.proportionTypes || []).filter((p) => p !== "standard").map((p) => (
              <span
                key={p}
                className="text-[10px] px-2 py-1 uppercase tracking-widest font-medium"
                style={{ background: "var(--ink-ghost)", color: "var(--ink)" }}
              >
                {p.replace(/-/g, " ")}
              </span>
            ))}
          </div>

          <p className="text-sm leading-relaxed mb-12" style={{ color: "var(--ink-soft)" }}>
            The{" "}
            <strong style={{ color: "var(--ink)" }}>
              {lessons.length} lessons
            </strong>{" "}
            below apply to your specific body profile. Expand each one to read your personalized
            guidelines. These are your rules — use them every time you get dressed.
          </p>

          {/* Lessons by category */}
          <div className="space-y-12">
            {Object.entries(grouped).map(([cat, catLessons]) => (
              <div key={cat}>
                <p
                  className="text-xs uppercase tracking-[0.3em] mb-4"
                  style={{ color: "var(--ink-soft)" }}
                >
                  {CATEGORY_LABELS[cat]}
                </p>
                <div className="space-y-2">
                  {catLessons.map((lesson) => (
                    <LessonCard key={lesson.id} lesson={lesson} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-16">
        <Link
          href="/course/blueprint"
          className="inline-flex items-center gap-3 px-8 py-4 font-semibold uppercase tracking-widest text-sm transition-opacity hover:opacity-80"
          style={{ background: "var(--plum)", color: "var(--cream)" }}
        >
          Build My Blueprint
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
