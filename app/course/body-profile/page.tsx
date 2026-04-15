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
          <div className="py-6 space-y-3">
            <p className="text-sm mb-4" style={{ color: "var(--ink-soft)" }}>
              Stand in front of a mirror and observe the overall shape created by your shoulders,
              waist, and hips. Which description feels most accurate?
            </p>
            {(Object.keys(BODY_STRUCTURE_INFO) as BodyStructure[]).map((key) => (
              <OptionButton
                key={key}
                label={BODY_STRUCTURE_INFO[key].label}
                description={BODY_STRUCTURE_INFO[key].description}
                selected={profile.bodyStructure === key}
                onClick={() => {
                  save({ bodyStructure: key });
                  setOpenSection("line");
                }}
              />
            ))}
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
          <div className="py-6 space-y-3">
            <p className="text-sm mb-4" style={{ color: "var(--ink-soft)" }}>
              Your vertical line describes the overall movement of your body — how curves flow or
              don&apos;t. Look at the full silhouette of your body from the front.
            </p>
            <OptionButton
              label="Curvy"
              description="Clear curves — at the bust, waist, or hips. Your body has visible rounded transitions."
              selected={profile.verticalLine === "curvy"}
              onClick={() => {
                save({ verticalLine: "curvy" });
                setOpenSection("proportions");
              }}
            />
            <OptionButton
              label="Angular"
              description="Straighter silhouette — fewer visible curves. Your transitions are more linear."
              selected={profile.verticalLine === "angular"}
              onClick={() => {
                save({ verticalLine: "angular" });
                setOpenSection("proportions");
              }}
            />
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
          <div className="py-6 space-y-3">
            <p className="text-sm mb-4" style={{ color: "var(--ink-soft)" }}>
              Look at your shoulders from the front. What is the angle and placement of your shoulder line?
            </p>
            <OptionButton
              label="Dropped Shoulder"
              description="Your shoulders have a slope — they drop down from your neck at an angle."
              selected={profile.shoulderType === "dropped"}
              onClick={() => {
                save({ shoulderType: "dropped" });
                setOpenSection("hip");
              }}
            />
            <OptionButton
              label="Square Shoulder"
              description="Your shoulders are relatively flat and sit at a horizontal angle — squarer in appearance."
              selected={profile.shoulderType === "square"}
              onClick={() => {
                save({ shoulderType: "square" });
                setOpenSection("hip");
              }}
            />
            <OptionButton
              label="Standard Shoulder"
              description="Neither prominently dropped nor square — a moderate, balanced shoulder line."
              selected={profile.shoulderType === "standard"}
              onClick={() => {
                save({ shoulderType: "standard" });
                setOpenSection("hip");
              }}
            />
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
          <div className="py-6 space-y-3">
            <p className="text-sm mb-4" style={{ color: "var(--ink-soft)" }}>
              Where does your hip sit relative to your waist? Use a belt or your necklace placed at
              the fullest part of your hip to help gauge placement.
            </p>
            <OptionButton
              label="Low Hip"
              description="Your hip sits lower — there is more distance between your waist and the fullest part of your hip."
              selected={profile.hipPlacement === "low"}
              onClick={() => {
                save({ hipPlacement: "low" });
                setOpenSection("" as Section);
              }}
            />
            <OptionButton
              label="High Hip"
              description="Your hip sits higher — the fullest part of your hip is closer to your natural waist."
              selected={profile.hipPlacement === "high"}
              onClick={() => {
                save({ hipPlacement: "high" });
                setOpenSection("" as Section);
              }}
            />
            <OptionButton
              label="Standard"
              description="Average hip placement — not distinctly high or low."
              selected={profile.hipPlacement === "standard"}
              onClick={() => {
                save({ hipPlacement: "standard" });
                setOpenSection("" as Section);
              }}
            />
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
