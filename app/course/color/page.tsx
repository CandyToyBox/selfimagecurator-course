"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

type Season = "cool-high" | "cool-low" | "warm-high" | "warm-low" | null;

const COLOR_GROUPS = {
  "cool-high": {
    label: "Cool — High Contrast",
    description:
      "Deep pigment, jewel-bright saturation. If these colors make your skin look luminous, clear, and defined — you are a high-contrast cool season.",
    groups: [
      {
        name: "Pinks & Berry",
        swatches: [
          { name: "Soft Pink", hex: "#F9B8D1" },
          { name: "Hot Pink", hex: "#F472B6" },
          { name: "Fuchsia", hex: "#DB2777" },
          { name: "Berry", hex: "#9D174D" },
          { name: "Deep Plum", hex: "#631039" },
        ],
      },
      {
        name: "Blues",
        swatches: [
          { name: "Sky", hex: "#93C5FD" },
          { name: "Royal Blue", hex: "#3B82F6" },
          { name: "Cobalt", hex: "#2563EB" },
          { name: "Deep Blue", hex: "#1D4ED8" },
          { name: "Navy", hex: "#1E3A8A" },
        ],
      },
      {
        name: "Grays",
        swatches: [
          { name: "Silver", hex: "#CBD5E1" },
          { name: "Cool Gray", hex: "#94A3B8" },
          { name: "Slate", hex: "#64748B" },
          { name: "Dark Slate", hex: "#475569" },
          { name: "Charcoal", hex: "#334155" },
        ],
      },
    ],
  },
  "cool-low": {
    label: "Cool — Low Contrast",
    description:
      "Muted, dusty, and soft. If bold colors overwhelm your features but these softer cool tones feel harmonious — you are a low-contrast cool season.",
    groups: [
      {
        name: "Soft Pinks & Lilac",
        swatches: [
          { name: "Lilac", hex: "#E9D5FF" },
          { name: "Mauve", hex: "#D8B4FE" },
          { name: "Dusty Rose", hex: "#C084FC" },
          { name: "Blush", hex: "#E879F9" },
          { name: "Soft Pink", hex: "#F0ABFC" },
        ],
      },
      {
        name: "Periwinkle & Soft Blue",
        swatches: [
          { name: "Pale Blue", hex: "#DBEAFE" },
          { name: "Periwinkle", hex: "#BFDBFE" },
          { name: "Cornflower", hex: "#93C5FD" },
          { name: "Soft Blue", hex: "#60A5FA" },
          { name: "Dusty Blue", hex: "#818CF8" },
        ],
      },
      {
        name: "Soft Grays",
        swatches: [
          { name: "White Gray", hex: "#F8FAFC" },
          { name: "Pale Gray", hex: "#E2E8F0" },
          { name: "Light Gray", hex: "#CBD5E1" },
          { name: "Silver", hex: "#B0BAC8" },
          { name: "Pewter", hex: "#94A3B8" },
        ],
      },
    ],
  },
  "warm-high": {
    label: "Warm — High Contrast",
    description:
      "Rich, earthy, saturated warmth. If these deep oranges, reds, and browns make your skin glow — you are a high-contrast warm season.",
    groups: [
      {
        name: "Oranges & Terracotta",
        swatches: [
          { name: "Peach", hex: "#FED7AA" },
          { name: "Orange", hex: "#FB923C" },
          { name: "Burnt Orange", hex: "#EA580C" },
          { name: "Terracotta", hex: "#C2410C" },
          { name: "Deep Terra", hex: "#7C2D12" },
        ],
      },
      {
        name: "Reds",
        swatches: [
          { name: "Tomato", hex: "#FF3B30" },
          { name: "Red", hex: "#E11D48" },
          { name: "Deep Red", hex: "#BE123C" },
          { name: "Crimson", hex: "#9F1239" },
          { name: "Burgundy", hex: "#7F1D1D" },
        ],
      },
      {
        name: "Camel & Brown",
        swatches: [
          { name: "Camel", hex: "#D4A574" },
          { name: "Warm Tan", hex: "#B5885A" },
          { name: "Cognac", hex: "#92613C" },
          { name: "Brown", hex: "#7C4921" },
          { name: "Espresso", hex: "#5C3317" },
        ],
      },
    ],
  },
  "warm-low": {
    label: "Warm — Low Contrast",
    description:
      "Soft, peachy, and blended. If saturated colors feel heavy but these muted warm tones feel natural and skin-like — you are a low-contrast warm season.",
    groups: [
      {
        name: "Soft Coral & Salmon",
        swatches: [
          { name: "Blush Coral", hex: "#F8B4A0" },
          { name: "Soft Salmon", hex: "#F49580" },
          { name: "Coral", hex: "#E87060" },
          { name: "Warm Salmon", hex: "#D45040" },
          { name: "Deep Coral", hex: "#B83020" },
        ],
      },
      {
        name: "Peach & Warm Skin",
        swatches: [
          { name: "Cream Peach", hex: "#FDDBC7" },
          { name: "Light Peach", hex: "#F5C5A3" },
          { name: "Peach", hex: "#E8A882" },
          { name: "Warm Peach", hex: "#D08B60" },
          { name: "Deep Peach", hex: "#B87040" },
        ],
      },
      {
        name: "Warm Nudes & Taupe",
        swatches: [
          { name: "Warm Ivory", hex: "#EFE4D0" },
          { name: "Nude", hex: "#D4B896" },
          { name: "Warm Taupe", hex: "#B89875" },
          { name: "Taupe Brown", hex: "#9A7D55" },
          { name: "Warm Brown", hex: "#7A6040" },
        ],
      },
    ],
  },
};

const ALL_SWATCHES = Object.entries(COLOR_GROUPS).flatMap(([seasonKey, season]) =>
  season.groups.flatMap((g) =>
    g.swatches.map((s) => ({ ...s, season: seasonKey as Season, groupName: g.name }))
  )
);

function isLight(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55;
}

function FullscreenSwatch({
  swatches,
  startIndex,
  onClose,
}: {
  swatches: typeof ALL_SWATCHES;
  startIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const swatch = swatches[index];
  const light = isLight(swatch.hex);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center transition-colors duration-300"
      style={{ background: swatch.hex }}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full"
        style={{ background: light ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)" }}
      >
        <X size={20} style={{ color: light ? "#1a1a1a" : "#fff" }} />
      </button>

      <div className="text-center px-8">
        <p
          className="text-xs uppercase tracking-[0.35em] mb-3"
          style={{ color: light ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.55)" }}
        >
          {swatch.groupName}
        </p>
        <p
          className="text-3xl font-bold mb-2"
          style={{
            fontFamily: "Rajdhani, sans-serif",
            color: light ? "rgba(0,0,0,0.85)" : "#fff",
          }}
        >
          {swatch.name}
        </p>
        <p
          className="text-sm mb-1"
          style={{ color: light ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.55)" }}
        >
          {swatch.hex}
        </p>
        <p
          className="text-xs uppercase tracking-widest mt-4"
          style={{ color: light ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.45)" }}
        >
          {COLOR_GROUPS[swatch.season as keyof typeof COLOR_GROUPS]?.label}
        </p>
      </div>

      <p
        className="absolute bottom-8 text-xs uppercase tracking-widest"
        style={{ color: light ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)" }}
      >
        Hold your phone screen near your collarbone in natural light
      </p>

      <div className="absolute bottom-20 flex gap-6">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="p-3 rounded-full"
          style={{ background: light ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)" }}
        >
          <ChevronLeft size={22} style={{ color: light ? "#1a1a1a" : "#fff" }} />
        </button>
        <span
          className="flex items-center text-xs"
          style={{ color: light ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)" }}
        >
          {index + 1} / {swatches.length}
        </span>
        <button
          onClick={() => setIndex((i) => Math.min(swatches.length - 1, i + 1))}
          disabled={index === swatches.length - 1}
          className="p-3 rounded-full"
          style={{ background: light ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)" }}
        >
          <ChevronRight size={22} style={{ color: light ? "#1a1a1a" : "#fff" }} />
        </button>
      </div>
    </div>
  );
}

function SwatchStrip({
  group,
  onSwatchClick,
}: {
  group: { name: string; swatches: { name: string; hex: string }[] };
  onSwatchClick: (hex: string, name: string) => void;
}) {
  return (
    <div className="mb-2">
      <p className="text-[10px] uppercase tracking-[0.25em] mb-1.5" style={{ color: "var(--ink-muted)" }}>
        {group.name}
      </p>
      <div className="flex w-full" style={{ height: "56px" }}>
        {group.swatches.map((s) => (
          <button
            key={s.hex}
            onClick={() => onSwatchClick(s.hex, s.name)}
            title={s.name}
            className="flex-1 transition-transform hover:scale-y-110 hover:z-10 relative focus:outline-none"
            style={{ background: s.hex, transformOrigin: "bottom" }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ColorPage() {
  const [selected, setSelected] = useState<Season>(null);
  const [fullscreenSwatch, setFullscreenSwatch] = useState<{
    swatches: typeof ALL_SWATCHES;
    startIndex: number;
  } | null>(null);

  const handleSave = (choice: Season) => {
    setSelected(choice);
    if (typeof window !== "undefined" && choice) {
      const existing = JSON.parse(localStorage.getItem("sic-profile") || "{}");
      localStorage.setItem("sic-profile", JSON.stringify({ ...existing, colorSeason: choice }));
    }
  };

  const openFullscreen = (seasonKey: keyof typeof COLOR_GROUPS, groupIndex: number, swatchIndex: number) => {
    const seasonSwatches = ALL_SWATCHES.filter((s) => s.season === seasonKey);
    const targetHex = COLOR_GROUPS[seasonKey].groups[groupIndex].swatches[swatchIndex].hex;
    const idx = seasonSwatches.findIndex((s) => s.hex === targetHex);
    setFullscreenSwatch({ swatches: seasonSwatches, startIndex: Math.max(0, idx) });
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      {fullscreenSwatch && (
        <FullscreenSwatch
          swatches={fullscreenSwatch.swatches}
          startIndex={fullscreenSwatch.startIndex}
          onClose={() => setFullscreenSwatch(null)}
        />
      )}

      <p className="text-xs uppercase tracking-[0.35em] mb-6" style={{ color: "var(--ink-soft)" }}>
        Module 02 — Color Exploration
      </p>
      <h1
        className="text-4xl md:text-5xl font-bold leading-[1.05] mb-6"
        style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
      >
        Discover your color season.
      </h1>
      <p className="text-base leading-relaxed mb-4" style={{ color: "var(--ink-soft)" }}>
        Your color season determines which family of colors enhances your natural features — your
        skin tone, hair, and eyes. Understanding this is the foundation of a wardrobe that works
        with you, not against you.
      </p>
      <p className="text-base leading-relaxed mb-12" style={{ color: "var(--ink-soft)" }}>
        There are four seasons: Cool High Contrast, Cool Low Contrast, Warm High Contrast, and Warm
        Low Contrast. Work through the steps below to find yours.
      </p>

      {/* Step 1: Cool or Warm */}
      <div
        className="p-6 mb-10"
        style={{ background: "var(--parchment)", border: "1px solid var(--ink-ghost)" }}
      >
        <p
          className="text-xs uppercase tracking-[0.3em] mb-2"
          style={{ color: "var(--ink-muted)" }}
        >
          Step 1
        </p>
        <h2
          className="text-lg font-bold mb-4"
          style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
        >
          Cool or Warm?
        </h2>
        <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--ink-soft)" }}>
          Gather fabric scraps, clothing, or paper in colors from each group below. In natural
          daylight — near a window or outdoors — hold each color against your bare collarbone or
          jaw. Observe your skin, not the fabric.
        </p>
        <ul className="space-y-2 mb-5">
          {[
            "Cool colors have a blue or pink undertone — pinks, blues, blue-reds, and gray.",
            "Warm colors have a yellow or orange undertone — peach, orange, rust, brown, and golden red.",
            "If cool tones make your skin look clearer and more defined — you lean cool.",
            "If warm tones add glow and soften your features — you lean warm.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <div className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ background: "var(--plum)" }} />
              <span className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-xs italic" style={{ color: "var(--ink-muted)" }}>
          Tap any swatch below to view it full-screen on your phone — hold your screen near your collarbone in natural light.
        </p>
      </div>

      {/* Step 2: High or Low Contrast */}
      <div
        className="p-6 mb-12"
        style={{ background: "var(--parchment)", border: "1px solid var(--ink-ghost)" }}
      >
        <p
          className="text-xs uppercase tracking-[0.3em] mb-2"
          style={{ color: "var(--ink-muted)" }}
        >
          Step 2
        </p>
        <h2
          className="text-lg font-bold mb-4"
          style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
        >
          High Contrast or Low Contrast?
        </h2>
        <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--ink-soft)" }}>
          This refers to the contrast between your features — hair, skin, and eyes. Look at yourself
          in a mirror.
        </p>
        <ul className="space-y-2">
          {[
            "High contrast: dark hair with light skin, or very light hair with dark eyes — your features have a strong visible difference.",
            "Low contrast: your hair, skin, and eyes are similar in depth — features blend softly together.",
            "If saturated, bold colors feel heavy or overwhelming — you may be low contrast.",
            "If muted colors make you look washed out — you may be high contrast.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <div className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ background: "var(--plum)" }} />
              <span className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* The 4 Color Palettes */}
      <h2
        className="text-xl font-bold mb-2"
        style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
      >
        Your Color Reference Palettes
      </h2>
      <p className="text-sm mb-10 leading-relaxed" style={{ color: "var(--ink-soft)" }}>
        Test each palette against your skin. The one that makes your complexion look most alive,
        clear, and luminous is your season. Select it below to save it to your profile.
      </p>

      <div className="space-y-12">
        {(Object.keys(COLOR_GROUPS) as (keyof typeof COLOR_GROUPS)[]).map((seasonKey) => {
          const season = COLOR_GROUPS[seasonKey];
          const isSelected = selected === seasonKey;

          return (
            <div key={seasonKey}>
              <div className="flex items-start justify-between mb-4 gap-4">
                <div>
                  <h3
                    className="text-base font-bold mb-1"
                    style={{
                      fontFamily: "Rajdhani, sans-serif",
                      color: isSelected ? "var(--plum)" : "var(--ink)",
                    }}
                  >
                    {season.label}
                    {isSelected && (
                      <span
                        className="ml-2 text-xs font-normal uppercase tracking-widest"
                        style={{ color: "var(--plum)" }}
                      >
                        — Your Season
                      </span>
                    )}
                  </h3>
                  <p className="text-sm leading-relaxed max-w-xl" style={{ color: "var(--ink-soft)" }}>
                    {season.description}
                  </p>
                </div>
                <button
                  onClick={() => handleSave(seasonKey)}
                  className="shrink-0 text-xs font-semibold uppercase tracking-widest px-4 py-2 transition-all"
                  style={{
                    background: isSelected ? "var(--plum)" : "transparent",
                    color: isSelected ? "var(--cream)" : "var(--ink)",
                    border: `1px solid ${isSelected ? "var(--plum)" : "var(--ink-ghost)"}`,
                    whiteSpace: "nowrap",
                  }}
                >
                  {isSelected ? "Selected" : "Select"}
                </button>
              </div>

              {/* Color strips */}
              <div
                className="p-4"
                style={{
                  border: isSelected ? "1.5px solid var(--plum)" : "1px solid var(--ink-ghost)",
                  background: isSelected ? "rgba(52,44,54,0.03)" : "transparent",
                }}
              >
                {season.groups.map((group, gIdx) => (
                  <div key={group.name} className={gIdx < season.groups.length - 1 ? "mb-3" : ""}>
                    <p
                      className="text-[10px] uppercase tracking-[0.25em] mb-1.5"
                      style={{ color: "var(--ink-muted)" }}
                    >
                      {group.name}
                    </p>
                    <div className="flex w-full" style={{ height: "52px" }}>
                      {group.swatches.map((s, sIdx) => (
                        <button
                          key={s.hex}
                          onClick={() => openFullscreen(seasonKey, gIdx, sIdx)}
                          title={`${s.name} — tap to view full-screen`}
                          className="flex-1 relative group focus:outline-none focus:ring-2 focus:ring-offset-1"
                          style={{ background: s.hex }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity">
                            <Maximize2
                              size={12}
                              style={{ color: isLight(s.hex) ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.6)" }}
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                    {/* Color name labels on hover — show statically on mobile */}
                    <div className="flex w-full mt-0.5">
                      {group.swatches.map((s) => (
                        <div key={s.hex + "-label"} className="flex-1">
                          <p
                            className="text-[8px] leading-tight truncate"
                            style={{ color: "var(--ink-muted)" }}
                          >
                            {s.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex justify-end mt-3">
                  <button
                    onClick={() => {
                      const seasonSwatches = ALL_SWATCHES.filter((s) => s.season === seasonKey);
                      setFullscreenSwatch({ swatches: seasonSwatches, startIndex: 0 });
                    }}
                    className="text-xs uppercase tracking-widest flex items-center gap-1.5"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    <Maximize2 size={11} />
                    View full-screen
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selection confirmation */}
      {selected && (
        <div
          className="p-6 mt-12 mb-4"
          style={{ background: "var(--parchment)", border: "1px solid var(--plum)" }}
        >
          <p className="text-sm font-semibold mb-1" style={{ color: "var(--ink)" }}>
            Your season: <strong>{COLOR_GROUPS[selected].label}</strong>
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            {selected === "cool-high" &&
              "Your wardrobe will shine in jewel tones, icy shades, sharp contrast, and blue-based neutrals. Avoid yellow-based or muted earthy tones."}
            {selected === "cool-low" &&
              "Your wardrobe will shine in dusty pastels, soft lilacs, periwinkle, and muted cool shades. Avoid high-saturation and bold contrast."}
            {selected === "warm-high" &&
              "Your wardrobe will shine in rich rust, terracotta, deep red, cognac, and forest tones. Avoid blue-based or icy colors."}
            {selected === "warm-low" &&
              "Your wardrobe will shine in peach, warm nude, soft coral, camel, and blended earthy tones. Avoid bright saturated colors."}
          </p>
        </div>
      )}

      <div className="flex items-center gap-4 mt-12">
        <Link
          href="/course/body-profile"
          className="inline-flex items-center gap-3 px-8 py-4 font-semibold uppercase tracking-widest text-sm transition-opacity hover:opacity-80"
          style={{ background: "var(--plum)", color: "var(--cream)" }}
        >
          Next — Body Profile
          <ArrowRight size={16} />
        </Link>
        {!selected && (
          <p className="text-xs" style={{ color: "var(--ink-muted)" }}>
            Select your season to save it, or skip for now.
          </p>
        )}
      </div>
    </div>
  );
}
