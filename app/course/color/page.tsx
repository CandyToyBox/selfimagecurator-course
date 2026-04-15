"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const COOL_COLORS = [
  { name: "Soft Pink", hex: "#F4A7B9" },
  { name: "Hot Pink", hex: "#E91E8C" },
  { name: "Deep Magenta", hex: "#8B1A4A" },
  { name: "Royal Blue", hex: "#2B5BE0" },
  { name: "Cobalt", hex: "#0047AB" },
  { name: "Navy", hex: "#0D1B6E" },
  { name: "Light Gray", hex: "#B0B7BF" },
  { name: "Slate", hex: "#6B7B8D" },
  { name: "Charcoal", hex: "#3D4555" },
];

const WARM_COLORS = [
  { name: "Peach", hex: "#F4A460" },
  { name: "Burnt Orange", hex: "#CC5500" },
  { name: "Terracotta", hex: "#A0522D" },
  { name: "Bright Red", hex: "#E30000" },
  { name: "Deep Red", hex: "#8B0000" },
  { name: "Crimson", hex: "#6B0020" },
  { name: "Camel", hex: "#C49A6C" },
  { name: "Cognac", hex: "#9B4722" },
  { name: "Dark Brown", hex: "#4A2000" },
];

export default function ColorPage() {
  const [selected, setSelected] = useState<"cool" | "warm" | null>(null);

  const handleSave = (choice: "cool" | "warm") => {
    setSelected(choice);
    if (typeof window !== "undefined") {
      const existing = JSON.parse(localStorage.getItem("sic-profile") || "{}");
      localStorage.setItem("sic-profile", JSON.stringify({ ...existing, colorSeason: choice }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
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
        skin tone, hair, and eyes. Understanding this is the first step to building a wardrobe that
        works with you, not against you.
      </p>
      <p className="text-base leading-relaxed mb-16" style={{ color: "var(--ink-soft)" }}>
        Gather fabric swatches or clothing pieces in the colors below. In natural, bright light,
        hold each color against your bare skin near your face. Observe how your complexion responds.
      </p>

      {/* Instructions */}
      <div
        className="p-6 mb-12"
        style={{ background: "var(--parchment)", border: "1px solid var(--ink-ghost)" }}
      >
        <h2
          className="text-sm font-bold mb-4 uppercase tracking-wider"
          style={{ fontFamily: "Rajdhani, sans-serif", color: "var(--ink)" }}
        >
          How to observe
        </h2>
        <ul className="space-y-2">
          {[
            "Hold the color flat against your collarbone or jaw — not draped over you.",
            "Use natural daylight — not artificial indoor lighting.",
            "Look at your skin, not the fabric. Does it look luminous or dull?",
            "Cool tones tend to make the skin look clearer and more vibrant.",
            "Warm tones tend to add warmth and glow to the complexion.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <div className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ background: "var(--plum)" }} />
              <span className="text-sm" style={{ color: "var(--ink-soft)" }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Color palettes */}
      <div className="grid md:grid-cols-2 gap-10 mb-16">
        {/* Cool */}
        <div>
          <p
            className="text-xs uppercase tracking-[0.3em] mb-6"
            style={{ color: "var(--ink-soft)" }}
          >
            Cool Colors
          </p>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {COOL_COLORS.map((c) => (
              <div key={c.hex} className="space-y-1">
                <div
                  className="aspect-square w-full"
                  style={{ background: c.hex }}
                />
                <p className="text-[10px]" style={{ color: "var(--ink-ghost)" }}>{c.name}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => handleSave("cool")}
            className="w-full py-3 text-xs font-semibold uppercase tracking-widest transition-all"
            style={{
              background: selected === "cool" ? "var(--plum)" : "transparent",
              color: selected === "cool" ? "var(--cream)" : "var(--ink)",
              border: "1px solid var(--plum)",
            }}
          >
            {selected === "cool" ? "Cool Season Selected" : "I am Cool"}
          </button>
        </div>

        {/* Warm */}
        <div>
          <p
            className="text-xs uppercase tracking-[0.3em] mb-6"
            style={{ color: "var(--ink-soft)" }}
          >
            Warm Colors
          </p>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {WARM_COLORS.map((c) => (
              <div key={c.hex} className="space-y-1">
                <div
                  className="aspect-square w-full"
                  style={{ background: c.hex }}
                />
                <p className="text-[10px]" style={{ color: "var(--ink-ghost)" }}>{c.name}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => handleSave("warm")}
            className="w-full py-3 text-xs font-semibold uppercase tracking-widest transition-all"
            style={{
              background: selected === "warm" ? "var(--plum)" : "transparent",
              color: selected === "warm" ? "var(--cream)" : "var(--ink)",
              border: "1px solid var(--plum)",
            }}
          >
            {selected === "warm" ? "Warm Season Selected" : "I am Warm"}
          </button>
        </div>
      </div>

      {selected && (
        <div
          className="p-6 mb-10"
          style={{ background: "var(--parchment)", border: "1px solid var(--plum)" }}
        >
          <p className="text-sm font-medium mb-1" style={{ color: "var(--ink)" }}>
            You selected: <strong>{selected === "cool" ? "Cool" : "Warm"} Season</strong>
          </p>
          <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
            {selected === "cool"
              ? "Your palette works with blue, pink, and gray undertones. The colors in your wardrobe should lean toward jewel tones, icy shades, and blue-based neutrals."
              : "Your palette works with golden, orange, and earthy undertones. Your wardrobe will shine in camel, rust, warm brown, olive, and earth tones."}
          </p>
        </div>
      )}

      <div className="flex items-center gap-4">
        <Link
          href="/course/body-profile"
          className="inline-flex items-center gap-3 px-8 py-4 font-semibold uppercase tracking-widest text-sm transition-opacity hover:opacity-80"
          style={{ background: "var(--plum)", color: "var(--cream)" }}
        >
          Next — Body Profile
          <ArrowRight size={16} />
        </Link>
        {!selected && (
          <p className="text-xs" style={{ color: "var(--ink-ghost)" }}>
            Select a season to continue, or skip for now.
          </p>
        )}
      </div>
    </div>
  );
}
