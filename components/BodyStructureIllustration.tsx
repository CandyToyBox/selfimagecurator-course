"use client";

import type { BodyStructure } from "@/lib/curriculum";

interface BodyStructureIllustrationProps {
  type: BodyStructure;
  selected?: boolean;
}

/**
 * SVG torso paths for each body structure type.
 * ViewBox: 0 0 100 230 — center X = 50
 * Key y-levels: shoulder=48, waist=92, hip=118, crotch=148
 *
 * Each path traces: left shoulder → left side → crotch → right side → right shoulder → close
 */
const TORSO_PATHS: Record<BodyStructure, string> = {
  // Fuller midsection — belly bulges wider than shoulders or hips
  apple:
    "M 32,48 C 28,58 23,75 25,92 C 25,104 27,115 30,126 C 37,140 45,145 50,148 C 55,145 63,140 70,126 C 73,115 75,104 75,92 C 77,75 72,58 68,48 Z",

  // Wide shoulders taper sharply to narrow hips
  "inverted-triangle":
    "M 23,48 C 20,58 25,76 31,92 C 33,104 34,115 36,126 C 40,140 46,145 50,148 C 54,145 60,140 64,126 C 66,115 67,104 69,92 C 75,76 80,58 77,48 Z",

  // Shoulders, waist, and hips nearly equal — minimal side curves
  rectangle:
    "M 30,48 C 26,58 27,76 31,92 C 31,104 30,115 30,126 C 36,140 45,145 50,148 C 55,145 64,140 70,126 C 70,115 69,104 69,92 C 73,76 74,58 70,48 Z",

  // Narrow shoulders flare to wide hips
  triangle:
    "M 35,48 C 32,58 29,76 31,92 C 28,104 25,115 23,126 C 30,140 44,145 50,148 C 56,145 70,140 77,126 C 75,115 72,104 69,92 C 71,76 68,58 65,48 Z",

  // Shoulder and hip width balanced; dramatic waist curve
  hourglass:
    "M 26,48 C 22,58 30,76 36,92 C 32,104 26,115 26,126 C 33,140 44,145 50,148 C 56,145 67,140 74,126 C 74,115 68,104 64,92 C 70,76 78,58 74,48 Z",
};

// Approximate shoulder x-positions per type (for arm attachment)
const SHOULDER_X: Record<BodyStructure, { left: number; right: number }> = {
  apple:              { left: 32, right: 68 },
  "inverted-triangle":{ left: 23, right: 77 },
  rectangle:          { left: 30, right: 70 },
  triangle:           { left: 35, right: 65 },
  hourglass:          { left: 26, right: 74 },
};

export function BodyStructureIllustration({
  type,
  selected = false,
}: BodyStructureIllustrationProps) {
  const torso = TORSO_PATHS[type];
  const { left: sL, right: sR } = SHOULDER_X[type];

  // Color tokens
  const ink  = selected ? "#EEEFED" : "#3D3440"; // --cream : --ink
  const bg   = selected ? "#342C36" : "#F5F4EB"; // --plum  : --parchment
  const faint = selected ? "rgba(238,239,237,0.06)" : "rgba(61,52,64,0.04)";

  // Unique pattern id per type (safe since each type renders once per page)
  const gridId = `sic-grid-${type}`;

  return (
    <svg
      viewBox="0 0 100 230"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${type} body structure diagram`}
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <defs>
        {/* Blueprint grid — fine cross-hatch */}
        <pattern id={gridId} width="10" height="10" patternUnits="userSpaceOnUse">
          <path
            d="M 10 0 L 0 0 0 10"
            fill="none"
            stroke={ink}
            strokeWidth="0.25"
            opacity="0.2"
          />
        </pattern>
      </defs>

      {/* Background fill */}
      <rect width="100" height="230" fill={bg} />
      {/* Blueprint grid overlay */}
      <rect width="100" height="230" fill={`url(#${gridId})`} />

      {/* ── Measurement annotation lines ── */}
      {/* Shoulder level */}
      <line x1="6" y1="48" x2="94" y2="48" stroke={ink} strokeWidth="0.5" strokeDasharray="2,2" opacity="0.28" />
      <text x="4" y="46.5" fontSize="4.5" fill={ink} opacity="0.55" fontFamily="monospace" fontWeight="600" textAnchor="middle">S</text>
      {/* Waist level */}
      <line x1="6" y1="92" x2="94" y2="92" stroke={ink} strokeWidth="0.5" strokeDasharray="2,2" opacity="0.28" />
      <text x="4" y="90.5" fontSize="4.5" fill={ink} opacity="0.55" fontFamily="monospace" fontWeight="600" textAnchor="middle">W</text>
      {/* Hip level */}
      <line x1="6" y1="118" x2="94" y2="118" stroke={ink} strokeWidth="0.5" strokeDasharray="2,2" opacity="0.28" />
      <text x="4" y="116.5" fontSize="4.5" fill={ink} opacity="0.55" fontFamily="monospace" fontWeight="600" textAnchor="middle">H</text>

      {/* ── Figure ── */}

      {/* Head */}
      <circle cx="50" cy="20" r="11" fill={faint} stroke={ink} strokeWidth="1.4" />

      {/* Neck */}
      <line x1="45" y1="31" x2="43" y2="46" stroke={ink} strokeWidth="1.3" strokeLinecap="round" />
      <line x1="55" y1="31" x2="57" y2="46" stroke={ink} strokeWidth="1.3" strokeLinecap="round" />

      {/* Torso silhouette */}
      <path d={torso} fill={faint} stroke={ink} strokeWidth="1.6" strokeLinejoin="round" />

      {/* Arms */}
      <path
        d={`M ${sL},54 C ${sL - 7},68 ${sL - 8},86 ${sL - 5},108`}
        fill="none"
        stroke={ink}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d={`M ${sR},54 C ${sR + 7},68 ${sR + 8},86 ${sR + 5},108`}
        fill="none"
        stroke={ink}
        strokeWidth="1.25"
        strokeLinecap="round"
      />

      {/* Left leg */}
      <path
        d="M 37,148 Q 32,184 30,226 L 45,226 Q 47,184 50,148 Z"
        fill={faint}
        stroke={ink}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      {/* Right leg */}
      <path
        d="M 63,148 Q 68,184 70,226 L 55,226 Q 53,184 50,148 Z"
        fill={faint}
        stroke={ink}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
