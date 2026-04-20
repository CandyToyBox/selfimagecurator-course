"use client";

import type { VerticalLine } from "@/lib/curriculum";

interface Props {
  type: VerticalLine;
  selected?: boolean;
}

/**
 * Illustrates the vertical line concept:
 * - Curvy: clear S-curve through shoulder → waist → hip — visible rounded transitions
 * - Angular: minimal curve, more linear silhouette — geometric, straight transitions
 *
 * ViewBox: 0 0 80 130
 * Focuses on the torso silhouette to show line quality, not body shape.
 */
const TORSO_PATHS: Record<VerticalLine, string> = {
  // Clear S-curve: dramatic inward waist, outward hip
  curvy:
    "M 20,22 C 14,35 12,50 17,66 C 12,78 12,90 20,102 L 60,102 C 68,90 68,78 63,66 C 68,50 66,35 60,22 Z",

  // Minimal curve: near-straight sides with subtle angle change
  angular:
    "M 20,22 C 18,35 17,50 17,66 C 17,80 17,90 20,102 L 60,102 C 63,90 63,80 63,66 C 63,50 62,35 60,22 Z",
};

export function VerticalLineIllustration({ type, selected = false }: Props) {
  const torso = TORSO_PATHS[type];
  const ink = selected ? "#EEEFED" : "#3D3440";
  const bg  = selected ? "#342C36" : "#F5F4EB";
  const faint = selected ? "rgba(238,239,237,0.06)" : "rgba(61,52,64,0.05)";
  const gridId = `sic-grid-vl-${type}`;

  return (
    <svg
      viewBox="0 0 80 130"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${type} vertical line`}
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <defs>
        <pattern id={gridId} width="10" height="10" patternUnits="userSpaceOnUse">
          <path
            d="M 10 0 L 0 0 0 10"
            fill="none"
            stroke={ink}
            strokeWidth="0.25"
            opacity="0.18"
          />
        </pattern>
      </defs>

      <rect width="80" height="130" fill={bg} />
      <rect width="80" height="130" fill={`url(#${gridId})`} />

      {/* Head */}
      <circle cx="40" cy="10" r="8" fill={faint} stroke={ink} strokeWidth="1.3" />

      {/* Neck */}
      <line x1="36" y1="18" x2="35" y2="21" stroke={ink} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="44" y1="18" x2="45" y2="21" stroke={ink} strokeWidth="1.2" strokeLinecap="round" />

      {/* Torso */}
      <path
        d={torso}
        fill={faint}
        stroke={ink}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* Waist level indicator — thin horizontal guide */}
      <line
        x1="6"
        y1="66"
        x2="74"
        y2="66"
        stroke={ink}
        strokeWidth="0.5"
        strokeDasharray="2,2"
        opacity="0.28"
      />

      {/* Line quality annotation — right side */}
      {type === "curvy" ? (
        // Flowing S-curve symbol
        <path
          d="M 68,36 C 74,42 66,52 72,58 C 78,64 70,74 76,80"
          fill="none"
          stroke={ink}
          strokeWidth="1.0"
          opacity="0.35"
          strokeLinecap="round"
        />
      ) : (
        // Straight vertical symbol
        <line
          x1="72"
          y1="36"
          x2="72"
          y2="80"
          stroke={ink}
          strokeWidth="1.0"
          opacity="0.35"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
