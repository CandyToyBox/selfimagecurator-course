/**
 * LOCAL-ONLY admin API — reads body type images from the local filesystem.
 * Only active in development (returns 404 in production).
 *
 * GET  /api/admin/images           → JSON list of image metadata
 * GET  /api/admin/images?path=...  → serve raw image bytes
 */

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SRC_DIRS = [
  path.join(process.env.HOME || "", "Downloads", "Thays book images"),
  path.join(process.env.HOME || "", "Downloads", "EOther images thays"),
];

const UPSCALED_DIR = path.join(
  process.env.HOME || "",
  "thays-brand", "graphic-system", "images", "upscaled"
);

const RESULTS_FILE = path.join(
  process.env.HOME || "",
  "thays-brand", "scripts", "curation_results.json"
);

function getImages() {
  const exts = new Set([".jpg", ".jpeg", ".png"]);
  const images: { path: string; name: string; folder: string }[] = [];
  for (const dir of SRC_DIRS) {
    if (!fs.existsSync(dir)) continue;
    const folder = path.basename(dir);
    for (const f of fs.readdirSync(dir).sort()) {
      if (exts.has(path.extname(f).toLowerCase()) && !f.startsWith("screencapture")) {
        images.push({ path: path.join(dir, f), name: f, folder });
      }
    }
  }
  return images;
}

function loadResults(): Record<string, string> {
  try {
    return JSON.parse(fs.readFileSync(RESULTS_FILE, "utf-8"));
  } catch {
    return {};
  }
}

export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not available in production" }, { status: 404 });
  }

  const imgPath = req.nextUrl.searchParams.get("path");

  // Serve a single image — prefer upscaled version when available
  if (imgPath) {
    // Check for upscaled version first
    const folder   = path.basename(path.dirname(imgPath));
    const stem     = path.basename(imgPath, path.extname(imgPath));
    const upscaled = path.join(UPSCALED_DIR, folder, `${stem}_4x.jpg`);
    const servePath = fs.existsSync(upscaled) ? upscaled : imgPath;

    if (!fs.existsSync(servePath)) {
      return new NextResponse(null, { status: 404 });
    }
    const ext  = path.extname(servePath).toLowerCase();
    const mime = ext === ".png" ? "image/png" : "image/jpeg";
    const buf  = fs.readFileSync(servePath);
    return new NextResponse(buf, {
      headers: {
        "Content-Type": mime,
        "Cache-Control": "public, max-age=3600",
        "X-Upscaled": fs.existsSync(upscaled) ? "true" : "false",
      },
    });
  }

  // Return full image list + current results
  const images = getImages();
  const results = loadResults();
  return NextResponse.json({ images, results, total: images.length });
}
