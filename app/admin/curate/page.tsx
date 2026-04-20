"use client";

import { useEffect, useState, useCallback } from "react";

type ImageMeta = { path: string; name: string; folder: string; url: string };
type Results = Record<string, string>;

const BODY_TYPES = ["apple", "hourglass", "inverted-triangle", "rectangle", "triangle", "skip"];
const TYPE_LABELS: Record<string, string> = {
  apple: "Apple",
  hourglass: "Hourglass",
  "inverted-triangle": "Inv. Triangle",
  rectangle: "Rectangle",
  triangle: "Triangle / Pear",
  skip: "Skip",
};
const TYPE_COLORS: Record<string, string> = {
  apple:             "#8B5E6E",
  hourglass:         "#342C36",
  "inverted-triangle": "#2C2D30",
  rectangle:         "#4a5568",
  triangle:          "#553c2e",
  skip:              "#aaa",
};

export default function CuratePage() {
  const [images, setImages]   = useState<ImageMeta[]>([]);
  const [results, setResults] = useState<Results>({});
  const [total, setTotal]     = useState(0);
  const [saving, setSaving]   = useState<string | null>(null);
  const [filter, setFilter]   = useState<string>("all");
  const [finalizing, setFinalizing] = useState(false);
  const [finalMsg, setFinalMsg]     = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/images");
    const data = await res.json();
    setImages(data.images || []);
    setResults(data.results || {});
    setTotal(data.total || 0);
  }, []);

  useEffect(() => { load(); }, [load]);

  const classify = async (imgPath: string, bodyType: string) => {
    setSaving(imgPath);
    await fetch("/api/admin/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imgPath, bodyType }),
    });
    setResults((r) => ({ ...r, [imgPath]: bodyType }));
    setSaving(null);
  };

  const finalize = async () => {
    if (!confirm("Copy the first selected image per body type into the course? This overwrites current picks.")) return;
    setFinalizing(true);
    const res = await fetch("/api/admin/save", { method: "PUT" });
    const data = await res.json();
    const picks = data.picks || {};
    const summary = Object.entries(picks).map(([bt, path]) => `${bt} → ${path}`).join("\n");
    setFinalMsg(summary || "Nothing picked yet.");
    setFinalizing(false);
  };

  const done   = Object.values(results).filter((v) => v !== "skip" && BODY_TYPES.includes(v)).length;
  const counts = BODY_TYPES.reduce<Record<string, number>>((acc, t) => {
    acc[t] = Object.values(results).filter((v) => v === t).length;
    return acc;
  }, {});

  const visible = images.filter((img) => {
    if (filter === "all") return true;
    if (filter === "uncategorized") return !results[img.path];
    return results[img.path] === filter;
  });

  return (
    <div style={{ background: "#EEEFED", minHeight: "100vh", fontFamily: "Rajdhani, sans-serif" }}>

      {/* ── Sticky header ── */}
      <div style={{
        position: "sticky", top: 0, zIndex: 20,
        background: "#342C36", color: "#EEEFED",
        padding: "14px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 16, flexWrap: "wrap",
      }}>
        <div>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Body Type Curation
          </p>
          <p style={{ margin: "2px 0 0", fontSize: 11, opacity: 0.6 }}>
            {done} / {total} categorized
            &nbsp;·&nbsp;
            {BODY_TYPES.filter(t => t !== "skip").map(t =>
              `${TYPE_LABELS[t]}: ${counts[t]}`
            ).join("  ·  ")}
          </p>
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["all", "uncategorized", ...BODY_TYPES].map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{
              fontSize: 10, padding: "4px 10px", cursor: "pointer", border: "none",
              fontFamily: "Rajdhani, sans-serif", fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.1em",
              background: filter === f ? "#EEEFED" : "rgba(255,255,255,0.12)",
              color: filter === f ? "#342C36" : "#EEEFED",
            }}>
              {f === "all" ? `All (${total})` : f === "uncategorized" ? `Uncategorized (${total - Object.keys(results).length})` : `${TYPE_LABELS[f]} (${counts[f]})`}
            </button>
          ))}
        </div>

        <button
          onClick={finalize}
          disabled={finalizing || done === 0}
          style={{
            background: "#8B5E6E", color: "#EEEFED", border: "none",
            padding: "10px 18px", cursor: done > 0 ? "pointer" : "not-allowed",
            fontFamily: "Rajdhani, sans-serif", fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 12,
            opacity: done > 0 ? 1 : 0.4,
          }}
        >
          {finalizing ? "Copying..." : "Copy to Course"}
        </button>
      </div>

      {finalMsg && (
        <div style={{ background: "#342C36", color: "#EEEFED", padding: "10px 20px", fontSize: 12, whiteSpace: "pre-line" }}>
          {finalMsg}
          <button onClick={() => setFinalMsg("")} style={{ marginLeft: 16, color: "#8B5E6E", background: "none", border: "none", cursor: "pointer", fontFamily: "Rajdhani", fontWeight: 700 }}>
            Dismiss
          </button>
        </div>
      )}

      {/* ── Image grid ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 12,
        padding: 20,
      }}>
        {visible.map((img) => {
          const current = results[img.path] || "";
          const isSaving = saving === img.path;
          const isSkipped = current === "skip";

          return (
            <div key={img.path} style={{
              background: "#F5F4EB",
              border: `1.5px solid ${current && current !== "skip" ? TYPE_COLORS[current] : "#ddd"}`,
              opacity: isSkipped ? 0.35 : 1,
              position: "relative",
              transition: "opacity 0.2s",
            }}>
              {/* Current type badge */}
              {current && current !== "skip" && (
                <div style={{
                  position: "absolute", top: 6, right: 6, zIndex: 2,
                  background: TYPE_COLORS[current], color: "#EEEFED",
                  fontSize: 9, padding: "2px 6px", fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.1em",
                }}>
                  {TYPE_LABELS[current]}
                </div>
              )}

              {/* Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.name}
                loading="lazy"
                style={{ width: "100%", display: "block" }}
              />

              {/* Body type buttons */}
              <div style={{ padding: "8px 6px 6px" }}>
                <p style={{ fontSize: 9, color: "#999", margin: "0 0 5px", wordBreak: "break-all" }}>
                  {img.name}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                  {BODY_TYPES.map((bt) => (
                    <button
                      key={bt}
                      onClick={() => classify(img.path, bt)}
                      disabled={isSaving}
                      style={{
                        fontSize: 9, padding: "3px 7px", cursor: "pointer",
                        fontFamily: "Rajdhani, sans-serif", fontWeight: 700,
                        textTransform: "uppercase", letterSpacing: "0.06em",
                        border: current === bt ? `2px solid ${TYPE_COLORS[bt]}` : "1.5px solid #ccc",
                        background: current === bt ? TYPE_COLORS[bt] : "#F5F4EB",
                        color: current === bt ? "#EEEFED" : "#3D3440",
                        opacity: isSaving ? 0.5 : 1,
                      }}
                    >
                      {current === bt ? "✓ " : ""}{bt === "inverted-triangle" ? "Inv.Tri" : TYPE_LABELS[bt]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {visible.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#888" }}>
          <p style={{ fontSize: 14 }}>No images match this filter.</p>
        </div>
      )}
    </div>
  );
}
