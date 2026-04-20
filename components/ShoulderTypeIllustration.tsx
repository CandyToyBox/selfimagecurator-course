"use client";

import type { ShoulderType } from "@/lib/curriculum";

interface Props {
  type: ShoulderType;
  selected?: boolean;
}

/**
 * Diagrams the shoulder angle from a front-view perspective.
 * Shows neck → shoulder point angle.
 *
 * ViewBox: 0 0 80 80
 */

// Each config: [leftShoulderX, leftShoulderY, rightShoulderX, rightShoulderY]
// Neck base is always at (40, 28)
const SHOULDER_POINTS: Record<ShoulderType, [number, number, number, number]> = {
  dropped:  [12, 50, 68, 50],  // slopes downward noticeably
  square:   [10, 36, 70, 36],  // nearly horizontal, just below neck
  standard: [12, 42, 68, 42],  // slight slope — between dropped and square
};

export function ShoulderTypeIllustration({ type, selected = false }: Props) {
  const [lX, lY, rX, rY] = SHOULDER_POINTS[type];
  const ink  = selected ? "#EEEFED" : "#3D3440";
  const bg   = selected ? "#342C36" : "#F5F4EB";
  const faint = selected ? "rgba(238,239,237,0.06)" : "rgba(61,52,64,0.05)";
  const gridId = `sic-grid-sh-${type}`;

  // Neck base
  const neckX = 40;
  const neckY = 28;

  // Angle indicator arc
  const angleLabel = type === "dropped" ? "↘" : type === "square" ? "→" : "↗";

  return (
    <svg
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${type} shoulder type`}
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <defs>
        <pattern id={gridId} width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke={ink} strokeWidth="0.25" opacity="0.18" />
        </pattern>
      </defs>

      <rect width="80" height="80" fill={bg} />
      <rect width="80" height="80" fill={`url(#${gridId})`} />

      {/* Head */}
      <circle cx="40" cy="10" r="8" fill={faint} stroke={ink} strokeWidth="1.3" />

      {/* Neck */}
      <line x1="36" y1="18" x2={neckX - 2} y2={neckY} stroke={ink} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="44" y1="18" x2={neckX + 2} y2={neckY} stroke={ink} strokeWidth="1.2" strokeLinecap="round" />

      {/* Shoulder line — left */}
      <line
        x1={neckX - 2}
        y1={neckY}
        x2={lX}
        y2={lY}
        stroke={ink}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Shoulder line — right */}
      <line
        x1={neckX + 2}
        y1={neckY}
        x2={rX}
        y2={rY}
        stroke={ink}
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Shoulder endpoint dots */}
      <circle cx={lX} cy={lY} r="2.5" fill={ink} opacity="0.8" />
      <circle cx={rX} cy={rY} r="2.5" fill={ink} opacity="0.8" />

      {/* Horizontal reference line (ghost) */}
      <line
        x1="8"
        y1={neckY}
        x2="72"
        y2={neckY}
        stroke={ink}
        strokeWidth="0.5"
        strokeDasharray="2,2"
        opacity="0.22"
      />

      {/* Angle label bottom-right */}
      <text
        x="68"
        y="72"
        fontSize="11"
        fill={ink}
        opacity="0.45"
        textAnchor="middle"
        style={{ fontFamily: "monospace" }}
      >
        {angleLabel}
      </text>
    </svg>
  );
}
