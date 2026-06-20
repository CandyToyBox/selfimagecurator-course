"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { BodyStructure } from "@/lib/curriculum";

const SHOW_PER_TYPE: Record<BodyStructure, number> = {
  apple: 8,
  triangle: 8,
  "inverted-triangle": 8,
  hourglass: 4,
  rectangle: 1,
};

type Props = {
  type: BodyStructure;
  selected: boolean;
};

export function BodyTypeGallery({ type, selected }: Props) {
  const [images, setImages] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/images/curation/body-type-index.json")
      .then((r) => r.json())
      .then((index: Record<string, string[]>) => {
        const all = index[type] || [];
        setImages(all.slice(0, SHOW_PER_TYPE[type] ?? 6));
      });
  }, [type]);

  if (images.length === 0) return null;

  const accentColor = selected ? "rgba(238,239,237,0.15)" : "rgba(61,52,64,0.06)";
  const labelColor = selected ? "rgba(238,239,237,0.92)" : "var(--ink-muted)";

  return (
    <div className="mt-4">
      <p
        className="text-[9px] uppercase tracking-[0.22em] mb-2"
        style={{ fontFamily: "var(--f-ui, Inter, sans-serif)", color: labelColor }}
      >
        Reference examples — {images.length} of {SHOW_PER_TYPE[type] ?? 6}
      </p>
      <div
        ref={scrollRef}
        className="flex gap-1.5 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        {images.map((filename) => (
          <div
            key={filename}
            className="shrink-0 relative overflow-hidden"
            style={{
              width: 64,
              height: 96,
              background: accentColor,
            }}
          >
            <Image
              src={`/images/curation/${encodeURIComponent(filename)}`}
              alt=""
              fill
              sizes="64px"
              style={{ objectFit: "cover", objectPosition: "top center" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
