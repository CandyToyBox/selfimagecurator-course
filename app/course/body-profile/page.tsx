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
import { BodyTypeGallery } from "@/components/BodyTypeGallery";
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
      <p className="text-base leading-relaxed mb-12" style={{ color: "var(--ink-soft)" }}>
        You may want a long necklace or string to help identify your balance points and proportions.
      </p>

      {/* Self Characteristics intro banner */}
      <div
        className="flex items-center justify-center py-8 mb-12"
        style={{ background: "var(--ink-deep)" }}
      >
        <div className="text-center px-8">
          <p
            className="text-xs uppercase tracking-[0.45em] mb-3"
            style={{ color: "rgba(238,239,237,0.45)", fontFamily: "Rajdhani, sans-serif" }}
          >
            Step 2
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--cream)" }}
          >
            Self Characteristics
          </h2>
          <p
            className="text-sm mt-3 max-w-sm mx-auto leading-relaxed"
            style={{ color: "rgba(238,239,237,0.6)" }}
          >
            Five profile dimensions that define your personal garment blueprint.
          </p>
        </div>
      </div>

      {/* Body Scale intro */}
      <div className="mb-12">
        <div className="grid md:grid-cols-2 gap-8 items-start mb-8">
          <div>
            <p
              className="text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: "var(--ink-muted)" }}
            >
              Before you begin
            </p>
            <h3
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
            >
              Body Scale
            </h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--ink-soft)" }}>
              Your body scale — whether you are plus, average, or petite — determines the weight
              of fabrics, the structure of garments, and the scale of prints and accessories that
              work best for you.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              There is no hierarchy here — each scale has its own set of principles that create
              harmony and intention in how garments interact with your frame.
            </p>
          </div>

          {/* Scale silhouettes */}
          <div className="flex items-end justify-center gap-4">
            {[
              { label: "Plus", widthClass: "w-16", heights: { body: "h-40", legs: "h-20" } },
              { label: "Average", widthClass: "w-12", heights: { body: "h-36", legs: "h-24" } },
              { label: "Petite", widthClass: "w-10", heights: { body: "h-28", legs: "h-20" } },
            ].map(({ label, widthClass }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div
                  className={`${widthClass} rounded-full`}
                  style={{
                    background: "var(--ink)",
                    aspectRatio: label === "Plus" ? "0.55/1" : label === "Average" ? "0.45/1" : "0.45/1",
                    height: label === "Plus" ? "140px" : label === "Average" ? "130px" : "105px",
                    opacity: 0.85,
                    borderRadius: label === "Plus" ? "48% 48% 38% 38% / 30% 30% 50% 50%" : "45% 45% 38% 38% / 28% 28% 48% 48%",
                  }}
                />
                <p
                  className="text-[10px] uppercase tracking-widest"
                  style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink-muted)" }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Vertical body line intro */}
        <div
          className="p-6 mb-2"
          style={{ background: "var(--parchment)", border: "1px solid var(--ink-ghost)" }}
        >
          <h4
            className="text-base font-bold mb-3"
            style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
          >
            What you are profiling
          </h4>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-3">
            {[
              { item: "Body Structure", desc: "The shape created by your shoulder, waist, and hip lines." },
              { item: "Vertical Line", desc: "Whether your silhouette reads as curvy or angular." },
              { item: "Proportions", desc: "Neck, torso, and leg length relative to each other." },
              { item: "Shoulder Type", desc: "Dropped, standard, or square — affects collar and sleeve choices." },
              { item: "Hip Placement", desc: "How high or low your fullest hip sits from your natural waist." },
            ].map(({ item, desc }) => (
              <div key={item} className="flex items-start gap-3">
                <div className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ background: "var(--plum)" }} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--ink)" }}>{item}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--ink-soft)" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
            <p className="text-sm mb-4" style={{ color: "var(--ink-soft)" }}>
              Stand in front of a mirror and observe the overall shape created by your shoulders,
              waist, and hips — based on bone structure, not body weight. Which silhouette feels
              most accurate?
            </p>
            <p className="text-sm mb-6" style={{ color: "var(--ink-soft)" }}>
              There are five body structures. The key is to look at where your widest horizontal
              line falls — shoulder, waist, or hip — and whether your outline is straight or curved.
            </p>

            {/* 5 structure definitions */}
            <div className="grid gap-3 mb-8">
              {[
                {
                  key: "inverted-triangle",
                  name: "Inverted Triangle",
                  def: "Shoulders are wider than the waist and hip lines.",
                  color: "#5B8DD9",
                },
                {
                  key: "triangle",
                  name: "Triangle",
                  def: "Broadest line is the hip — usually placed at or below the hip line.",
                  color: "#D97B6C",
                },
                {
                  key: "rectangle",
                  name: "Rectangle",
                  def: "Shoulder and hip lines are close in width with a less defined waist.",
                  color: "#6B9E7A",
                },
                {
                  key: "hourglass",
                  name: "Hourglass",
                  def: "Equal shoulder and hip width with a clearly narrower waist.",
                  color: "#A67DB8",
                },
                {
                  key: "apple",
                  name: "Round",
                  def: "Waist line is wider than shoulder and hip — fullness through the center.",
                  color: "#C9A84C",
                },
              ].map(({ key, name, def, color }) => (
                <div
                  key={key}
                  className="flex items-start gap-4 px-4 py-3"
                  style={{ border: "1px solid var(--ink-ghost)" }}
                >
                  <div
                    className="w-2 shrink-0 self-stretch"
                    style={{ background: color, borderRadius: "2px", minHeight: "32px" }}
                  />
                  <div>
                    <p className="text-sm font-bold" style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}>
                      {name}
                    </p>
                    <p className="text-xs leading-relaxed mt-0.5" style={{ color: "var(--ink-soft)" }}>
                      {def}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
                      <BodyTypeGallery type={key} selected={selected} />
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
            <p className="text-sm mb-3" style={{ color: "var(--ink-soft)" }}>
              Look at your shoulders from the front. What is the angle of your shoulder line from
              where it meets your neck to the shoulder point?
            </p>
            <p className="text-sm mb-4" style={{ color: "var(--ink-soft)" }}>
              Understanding your shoulder placement is essential for determining collar styles,
              sleeve types, haircut balance, and accessories — and for creating harmony between
              your upper and lower body. There are three types.
            </p>

            {/* Shoulder type visual reference */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                {
                  label: "Dropped",
                  desc: "Horizontal line slopes noticeably downward from neck to shoulder point.",
                  angle: 18,
                },
                {
                  label: "Standard",
                  desc: "Horizontal line is slightly dropped — a subtle angle.",
                  angle: 8,
                },
                {
                  label: "Square",
                  desc: "Shoulder line is nearly flat — minimal slope from neck to point.",
                  angle: 0,
                },
              ].map(({ label, desc, angle }) => (
                <div
                  key={label}
                  className="p-3"
                  style={{ background: "var(--parchment)", border: "1px solid var(--ink-ghost)" }}
                >
                  {/* SVG shoulder line indicator */}
                  <svg viewBox="0 0 80 40" className="w-full mb-2" style={{ height: "36px" }}>
                    <line
                      x1="10"
                      y1={20 - angle}
                      x2="70"
                      y2={20 + angle}
                      stroke="var(--ink)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="10" cy={20 - angle} r="3" fill="var(--ink)" />
                    <circle cx="70" cy={20 + angle} r="3" fill="var(--ink)" />
                  </svg>
                  <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}>
                    {label}
                  </p>
                  <p className="text-[10px] leading-snug" style={{ color: "var(--ink-soft)" }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
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
                <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "var(--ink-muted)" }}>
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
          <p className="text-xs" style={{ color: "var(--ink-muted)" }}>
            Complete all sections to continue.
          </p>
        )}
      </div>
    </div>
  );
}
