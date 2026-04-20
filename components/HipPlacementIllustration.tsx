"use client";

import type { HipPlacement } from "@/lib/curriculum";

interface Props {
  type: HipPlacement;
  selected?: boolean;
}

/**
 * Shows the distance between the natural waist and the fullest hip point.
 * - High: fullest hip is close to the waist
 * - Low: fullest hip is further from the waist
 * - Standard: average distance
 *
 * ViewBox: 0 0 80 120
 * Renders a simplified lower-torso side view with waist & hip level markers.
 */

// Y-coordinate for the fullest hip relative to waist line (waist = y 40)
const HIP_Y: Record<HipPlacement, number> = {
  high:     60,   // close to waist
  standard: 72,   // moderate
  low:      86,   // further from waist
};

// Approximate left/right x at each level for the outline
// Waist is narrowest, hip flares out
function buildPath(hipY: number): string {
  const waistY = 40;
  const hipX = 14;
  const bottomY = 110;

  return [
    `M 28,${waistY}`,
    `C 24,${waistY + 8} ${hipX},${hipY - 6} ${hipX},${hipY}`,
    `C ${hipX},${hipY + 12} 18,${bottomY - 8} 20,${bottomY}`,
    `L 60,${bottomY}`,
    `C 62,${bottomY - 8} 66,${hipY + 12} 66,${hipY}`,
    `C 66,${hipY - 6} 56,${waistY + 8} 52,${waistY}`,
    "Z",
  ].join(" ");
}

export function HipPlacementIllustration({ type, selected = false }: Props) {
  const hipY = HIP_Y[type];
  const path = buildPath(hipY);
  const ink  = selected ? "#EEEFED" : "#3D3440";
  const bg   = selected ? "#342C36" : "#F5F4EB";
  const faint = selected ? "rgba(238,239,237,0.06)" : "rgba(61,52,64,0.05)";
  const accent = selected ? "rgba(238,239,237,0.55)" : "rgba(142,94,110,0.65)"; // --accent
  const gridId = `sic-grid-hp-${type}`;

  return (
    <svg
      viewBox="0 0 80 120"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${type} hip placement`}
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <defs>
        <pattern id={gridId} width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke={ink} strokeWidth="0.25" opacity="0.18" />
        </pattern>
      </defs>

      <rect width="80" height="120" fill={bg} />
      <rect width="80" height="120" fill={`url(#${gridId})`} />

      {/* Torso outline */}
      <path d={path} fill={faint} stroke={ink} strokeWidth="1.5" strokeLinejoin="round" />

      {/* Waist line marker */}
      <line x1="6" y1="40" x2="74" y2="40" stroke={ink} strokeWidth="0.5" strokeDasharray="2,2" opacity="0.3" />
      <text x="5" y="38.5" fontSize="4.5" fill={ink} opacity="0.5" fontFamily="monospace" fontWeight="600">W</text>

      {/* Hip line marker — highlighted in accent color */}
      <line x1="6" y1={hipY} x2="74" y2={hipY} stroke={accent} strokeWidth="0.8" strokeDasharray="2.5,2" />
      <text x="5" y={hipY - 1.5} fontSize="4.5" fill={accent} fontFamily="monospace" fontWeight="600">H</text>

      {/* Distance arrow between W and H */}
      <line
        x1="72"
        y1="40"
        x2="72"
        y2={hipY}
        stroke={accent}
        strokeWidth="0.8"
        opacity="0.6"
        strokeLinecap="round"
      />
      {/* Arrow head top */}
      <path d="M 70,43 L 72,40 L 74,43" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.6" />
      {/* Arrow head bottom */}
      <path d={`M 70,${hipY - 3} L 72,${hipY} L 74,${hipY - 3}`} fill="none" stroke={accent} strokeWidth="0.8" opacity="0.6" />
    </svg>
  );
}
