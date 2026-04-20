"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import type {
  BodyStructure,
  VerticalLine,
  ShoulderType,
  HipPlacement,
  ProportionType,
  UserProfile,
} from "@/lib/curriculum";
import { BODY_STRUCTURE_INFO } from "@/lib/curriculum";
import { BodyStructureIllustration } from "@/components/BodyStructureIllustration";
import { VerticalLineIllustration } from "@/components/VerticalLineIllustration";
import { ShoulderTypeIllustration } from "@/components/ShoulderTypeIllustration";
import { HipPlacementIllustration } from "@/components/HipPlacementIllustration";

type Section = "structure" | "line" | "proportions" | "shoulder" | "hip";

function SectionHeader({
  label,
  open,
  done,
  onClick,
}: {
  label: string;
  open: boolean;
  done: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className="w-full flex items-center justify-between py-4 text-left"
      style={{ borderBottom: open ? "1px solid var(--plum)" : "1px solid var(--ink-ghost)" }}
      onClick={onClick}
    >
      <span
        className="text-base font-bold uppercase tracking-wide"
        style={{ fontFamily: "Rajdhani, sans-serif", color: done ? "var(--plum)" : "var(--ink)" }}
      >
        {label} {done && "✓"}
      </span>
      {open ? (
        <ChevronUp size={16} style={{ color: "var(--ink-soft)" }} />
      ) : (
        <ChevronDown size={16} style={{ color: "var(--ink-soft)" }} />
      )}
    </button>
  );
}

function OptionButton({
  label,
  description,
  selected,
  onClick,
}: {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 transition-all"
      style={{
        background: selected ? "var(--plum)" : "var(--parchment)",
        border: `1px solid ${selected ? "var(--plum)" : "var(--ink-ghost)"}`,
        color: selected ? "var(--cream)" : "var(--ink)",
      }}
    >
      <p className="text-sm font-semibold" style={{ fontFamily: "Rajdhani, sans-serif" }}>
        {label}
      </p>
      {description && (
        <p
          className="text-xs mt-1 leading-relaxed"
          style={{ color: selected ? "rgba(238,239,237,0.75)" : "var(--ink-soft)" }}
        >
          {description}
        </p>
      )}
    </button>
  );
}

const PROPORTION_OPTIONS: { value: ProportionType; label: string; description: string }[] = [
  {
    value: "elongated-neck",
    label: "Elongated Neck",
    description: "Your neck appears longer relative to your torso and shoulders.",
  },
  {
    value: "elongated-torso",
    label: "Elongated Torso",
    description: "Your torso is longer relative to your leg length.",
  },
  {
    value: "elongated-legs",
    label: "Elongated Legs",
    description: "Your legs are longer relative to your torso.",
  },
  {
    value: "standard",
    label: "Standard Proportions",
    description: "No significant elongation in any area.",
  },
];

export default function BodyProfilePage() {
  const [openSection, setOpenSection] = useState<Section>("structure");
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    bodyStructure: null,
    verticalLine: null,
    shoulderType: null,
    hipPlacement: null,
    proportionTypes: [],
  });

  // Load saved profile
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sic-profile");
      if (saved) {
        const parsed = JSON.parse(saved);
        setProfile((prev) => ({ ...prev, ...parsed }));
      }
    }
  }, []);

  const save = (updates: Partial<UserProfile>) => {
    const updated = { ...profile, ...updates };
    setProfile(updated);
    if (typeof window !== "undefined") {
      const existing = JSON.parse(localStorage.getItem("sic-profile") || "{}");
      localStorage.setItem("sic-profile", JSON.stringify({ ...existing, ...updates }));
    }
  };

  const toggleProportion = (value: ProportionType) => {
    const current = profile.proportionTypes || [];
    const updated =
      value === "standard"
        ? ["standard" as ProportionType]
        : current.includes(value)
        ? current.filter((p) => p !== value)
        : [...current.filter((p) => p !== "standard"), value];
    save({ proportionTypes: updated });
  };

  const isComplete =
    profile.bodyStructure &&
    profile.verticalLine &&
    profile.shoulderType &&
    profile.hipPlacement &&
    (profile.proportionTypes?.length ?? 0) > 0;

  const toggle = (s: Section) => setOpenSection(openSection === s ? ("" as Section) : s);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <p className="text-xs uppercase tracking-[0.35em] mb-6" style={{ color: "var(--ink-soft)" }}>
        Module 03 — Body Profile
      </p>
      <h1
        className="text-4xl md:text-5xl font-bold leading-[1.05] mb-6"
        style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
      >
        Build your body profile.
      </h1>
      <p className="text-base leading-relaxed mb-4" style={{ color: "var(--ink-soft)" }}>
        Your body profile is the foundation of your personalized garment guide. Take your time with
        each section — there are no wrong answers, only honest observations.
      </p>
      <p className="text-base leading-relaxed mb-16" style={{ color: "var(--ink-soft)" }}>
        You may want a long necklace or string to help identify your balance points and proportions.
      </p>

      {/* Section 1: Body Structure */}
      <div className="mb-2">
        <SectionHeader
          label="01 — Body Structure"
          open={openSection === "structure"}
          done={!!profile.bodyStructure}
          onClick={() => toggle("structure")}
        />
        {openSection === "structure" && (
          <div className="py-6">
            <p className="text-sm mb-6" style={{ color: "var(--ink-soft)" }}>
              Stand in front of a mirror and observe the overall shape created by your shoulders,
              waist, and hips — based on bone structure, not body weight. Which silhouette feels
              most accurate?
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {(Object.keys(BODY_STRUCTURE_INFO) as BodyStructure[]).map((key) => {
                const selected = profile.bodyStructure === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      save({ bodyStructure: key });
                      setOpenSection("line");
                    }}
                    className="text-left transition-all focus:outline-none group"
                    style={{
                      background: selected ? "var(--plum)" : "var(--parchment)",
                      border: `1.5px solid ${selected ? "var(--plum)" : "var(--ink-ghost)"}`,
                    }}
                  >
                    {/* Illustration */}
                    <div className="aspect-[3/5] w-full">
                      <BodyStructureIllustration type={key} selected={selected} />
                    </div>

                    {/* Label */}
                    <div className="px-3 py-3">
                      <p
                        className="text-xs font-bold uppercase tracking-wide leading-tight"
                        style={{
                          fontFamily: "Rajdhani, sans-serif",
                          color: selected ? "var(--cream)" : "var(--ink)",
                        }}
                      >
                        {BODY_STRUCTURE_INFO[key].label}
                      </p>
                      <p
                        className="text-[10px] mt-1 leading-relaxed hidden sm:block"
                        style={{
                          color: selected
                            ? "rgba(238,239,237,0.68)"
                            : "var(--ink-soft)",
                        }}
                      >
                        {BODY_STRUCTURE_INFO[key].description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Section 2: Vertical Line */}
      <div className="mb-2">
        <SectionHeader
          label="02 — Vertical Line"
          open={openSection === "line"}
          done={!!profile.verticalLine}
          onClick={() => toggle("line")}
        />
        {openSection === "line" && (
          <div className="py-6">
            <p className="text-sm mb-6" style={{ color: "var(--ink-soft)" }}>
              Your vertical line describes the quality of movement in your body — whether your
              transitions are rounded and flowing, or more geometric and straight. Look at your
              full silhouette from the front.
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-sm">
              {(
                [
                  {
                    value: "curvy" as VerticalLine,
                    label: "Curvy",
                    desc: "Visible rounded transitions — at the bust, waist, or hips.",
                  },
                  {
                    value: "angular" as VerticalLine,
                    label: "Angular",
                    desc: "More geometric and linear — fewer visible curves in the silhouette.",
                  },
                ] as { value: VerticalLine; label: string; desc: string }[]
              ).map(({ value, label, desc }) => {
                const selected = profile.verticalLine === value;
                return (
                  <button
                    key={value}
                    onClick={() => {
                      save({ verticalLine: value });
                      setOpenSection("proportions");
                    }}
                    className="text-left transition-all focus:outline-none"
                    style={{
                      background: selected ? "var(--plum)" : "var(--parchment)",
                      border: `1.5px solid ${selected ? "var(--plum)" : "var(--ink-ghost)"}`,
                    }}
                  >
                    <div className="aspect-[4/5] w-full">
                      <VerticalLineIllustration type={value} selected={selected} />
                    </div>
                    <div className="px-3 py-3">
                      <p
                        className="text-xs font-bold uppercase tracking-wide"
                        style={{
                          fontFamily: "Rajdhani, sans-serif",
                          color: selected ? "var(--cream)" : "var(--ink)",
                        }}
                      >
                        {label}
                      </p>
                      <p
                        className="text-[10px] mt-1 leading-relaxed"
                        style={{
                          color: selected ? "rgba(238,239,237,0.68)" : "var(--ink-soft)",
                        }}
                      >
                        {desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Section 3: Proportions */}
      <div className="mb-2">
        <SectionHeader
          label="03 — Proportions"
          open={openSection === "proportions"}
          done={(profile.proportionTypes?.length ?? 0) > 0}
          onClick={() => toggle("proportions")}
        />
        {openSection === "proportions" && (
          <div className="py-6 space-y-3">
            <p className="text-sm mb-4" style={{ color: "var(--ink-soft)" }}>
              Use your necklace or string to help identify any elongated areas. Lay it flat along
              your torso, neck, and legs to observe proportional relationships. Select all that
              apply.
            </p>
            {PROPORTION_OPTIONS.map((opt) => (
              <OptionButton
                key={opt.value}
                label={opt.label}
                description={opt.description}
                selected={(profile.proportionTypes || []).includes(opt.value)}
                onClick={() => toggleProportion(opt.value)}
              />
            ))}
            {(profile.proportionTypes?.length ?? 0) > 0 && (
              <button
                className="text-xs underline mt-2"
                style={{ color: "var(--plum)" }}
                onClick={() => setOpenSection("shoulder")}
              >
                Continue →
              </button>
            )}
          </div>
        )}
      </div>

      {/* Section 4: Shoulder Type */}
      <div className="mb-2">
        <SectionHeader
          label="04 — Shoulder Type"
          open={openSection === "shoulder"}
          done={!!profile.shoulderType}
          onClick={() => toggle("shoulder")}
        />
        {openSection === "shoulder" && (
          <div className="py-6">
            <p className="text-sm mb-6" style={{ color: "var(--ink-soft)" }}>
              Look at your shoulders from the front. What is the angle of your shoulder line from
              where it meets your neck to the shoulder point?
            </p>
            <div className="grid grid-cols-3 gap-3 max-w-sm">
              {(
                [
                  {
                    value: "dropped" as ShoulderType,
                    label: "Dropped",
                    desc: "Slopes downward from neck — a visible angle.",
                  },
                  {
                    value: "square" as ShoulderType,
                    label: "Square",
                    desc: "Relatively flat and horizontal — squared appearance.",
                  },
                  {
                    value: "standard" as ShoulderType,
                    label: "Standard",
                    desc: "Moderate angle — between dropped and square.",
                  },
                ] as { value: ShoulderType; label: string; desc: string }[]
              ).map(({ value, label, desc }) => {
                const selected = profile.shoulderType === value;
                return (
                  <button
                    key={value}
                    onClick={() => {
                      save({ shoulderType: value });
                      setOpenSection("hip");
                    }}
                    className="text-left transition-all focus:outline-none"
                    style={{
                      background: selected ? "var(--plum)" : "var(--parchment)",
                      border: `1.5px solid ${selected ? "var(--plum)" : "var(--ink-ghost)"}`,
                    }}
                  >
                    <div className="aspect-square w-full">
                      <ShoulderTypeIllustration type={value} selected={selected} />
                    </div>
                    <div className="px-2 py-2.5">
                      <p
                        className="text-[11px] font-bold uppercase tracking-wide"
                        style={{
                          fontFamily: "Rajdhani, sans-serif",
                          color: selected ? "var(--cream)" : "var(--ink)",
                        }}
                      >
                        {label}
                      </p>
                      <p
                        className="text-[10px] mt-0.5 leading-relaxed hidden sm:block"
                        style={{
                          color: selected ? "rgba(238,239,237,0.68)" : "var(--ink-soft)",
                        }}
                      >
                        {desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Section 5: Hip Placement */}
      <div className="mb-10">
        <SectionHeader
          label="05 — Hip Placement"
          open={openSection === "hip"}
          done={!!profile.hipPlacement}
          onClick={() => toggle("hip")}
        />
        {openSection === "hip" && (
          <div className="py-6">
            <p className="text-sm mb-6" style={{ color: "var(--ink-soft)" }}>
              Place your necklace or a belt at the fullest part of your hip. How far is it from
              your natural waist? The diagram shows the distance between waist (W) and fullest
              hip (H).
            </p>
            <div className="grid grid-cols-3 gap-3 max-w-sm">
              {(
                [
                  {
                    value: "high" as HipPlacement,
                    label: "High Hip",
                    desc: "Fullest hip closer to the natural waist.",
                  },
                  {
                    value: "standard" as HipPlacement,
                    label: "Standard",
                    desc: "Average distance from waist to fullest hip.",
                  },
                  {
                    value: "low" as HipPlacement,
                    label: "Low Hip",
                    desc: "More distance between waist and fullest hip.",
                  },
                ] as { value: HipPlacement; label: string; desc: string }[]
              ).map(({ value, label, desc }) => {
                const selected = profile.hipPlacement === value;
                return (
                  <button
                    key={value}
                    onClick={() => {
                      save({ hipPlacement: value });
                      setOpenSection("" as Section);
                    }}
                    className="text-left transition-all focus:outline-none"
                    style={{
                      background: selected ? "var(--plum)" : "var(--parchment)",
                      border: `1.5px solid ${selected ? "var(--plum)" : "var(--ink-ghost)"}`,
                    }}
                  >
                    <div className="w-full" style={{ aspectRatio: "2/3" }}>
                      <HipPlacementIllustration type={value} selected={selected} />
                    </div>
                    <div className="px-2 py-2.5">
                      <p
                        className="text-[11px] font-bold uppercase tracking-wide"
                        style={{
                          fontFamily: "Rajdhani, sans-serif",
                          color: selected ? "var(--cream)" : "var(--ink)",
                        }}
                      >
                        {label}
                      </p>
                      <p
                        className="text-[10px] mt-0.5 leading-relaxed hidden sm:block"
                        style={{
                          color: selected ? "rgba(238,239,237,0.68)" : "var(--ink-soft)",
                        }}
                      >
                        {desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Profile Summary */}
      {isComplete && (
        <div
          className="p-6 mb-10"
          style={{ background: "var(--parchment)", border: "1px solid var(--plum)" }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "var(--plum)", fontFamily: "Rajdhani, sans-serif" }}
          >
            Your Profile
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Body Structure", value: profile.bodyStructure },
              { label: "Vertical Line", value: profile.verticalLine },
              { label: "Proportions", value: profile.proportionTypes?.join(", ") },
              { label: "Shoulder", value: profile.shoulderType },
              { label: "Hip Placement", value: profile.hipPlacement },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "var(--ink-ghost)" }}>
                  {item.label}
                </p>
                <p className="text-sm font-medium capitalize" style={{ color: "var(--ink)" }}>
                  {item.value?.toString().replace(/-/g, " ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <Link
          href="/course/garment-guide"
          className="inline-flex items-center gap-3 px-8 py-4 font-semibold uppercase tracking-widest text-sm transition-opacity hover:opacity-80"
          style={{
            background: isComplete ? "var(--plum)" : "var(--ink-ghost)",
            color: "var(--cream)",
            pointerEvents: isComplete ? "auto" : "none",
          }}
        >
          View My Garment Guide
          <ArrowRight size={16} />
        </Link>
        {!isComplete && (
          <p className="text-xs" style={{ color: "var(--ink-ghost)" }}>
            Complete all sections to continue.
          </p>
        )}
      </div>
    </div>
  );
}
