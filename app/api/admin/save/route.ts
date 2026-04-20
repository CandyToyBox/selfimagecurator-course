/**
 * LOCAL-ONLY admin API — saves body type categorization to disk.
 * POST /api/admin/save  { path: string, bodyType: string }
 */

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const RESULTS_FILE = path.join(
  process.env.HOME || "",
  "thays-brand", "scripts", "curation_results.json"
);

const COURSE_DEST = path.join(
  process.env.HOME || "",
  "selfimagecurator-course", "public", "images", "body-types"
);

function loadResults(): Record<string, string> {
  try {
    return JSON.parse(fs.readFileSync(RESULTS_FILE, "utf-8"));
  } catch {
    return {};
  }
}

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not available in production" }, { status: 404 });
  }

  const { imgPath, bodyType } = await req.json();
  if (!imgPath || !bodyType) {
    return NextResponse.json({ error: "Missing imgPath or bodyType" }, { status: 400 });
  }

  const results = loadResults();
  results[imgPath] = bodyType;
  fs.mkdirSync(path.dirname(RESULTS_FILE), { recursive: true });
  fs.writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2));

  return NextResponse.json({ ok: true });
}

export async function PUT(req: NextRequest) {
  // Finalize: copy best pick per type into course public folder
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not available in production" }, { status: 404 });
  }

  const results = loadResults();
  const VALID = ["apple", "hourglass", "inverted-triangle", "rectangle", "triangle"];
  const picks: Record<string, string> = {};

  // First non-skip per body type becomes the pick
  for (const [filePath, bt] of Object.entries(results)) {
    if (!VALID.includes(bt)) continue;
    if (!picks[bt]) picks[bt] = filePath;
  }

  fs.mkdirSync(COURSE_DEST, { recursive: true });
  const copied: string[] = [];

  for (const [bt, src] of Object.entries(picks)) {
    const ext = path.extname(src).toLowerCase() === ".png" ? ".png" : ".jpg";
    const dest = path.join(COURSE_DEST, `sic-body-${bt}${ext}`);
    fs.copyFileSync(src, dest);
    copied.push(`${bt} → sic-body-${bt}${ext}`);
  }

  return NextResponse.json({ ok: true, copied });
}
