/**
 * Admin save API — persists body type classifications to Vercel Blob.
 *
 * POST /api/admin/save  { imgPath, bodyType }  → save one classification
 * PUT  /api/admin/save                          → finalize: record best pick per body type
 */

import { NextRequest, NextResponse } from "next/server";
import { list, put } from "@vercel/blob";

const RESULTS_BLOB = "curation/results.json";

async function loadResults(): Promise<Record<string, string>> {
  try {
    const { blobs } = await list({ prefix: RESULTS_BLOB });
    if (!blobs.length) return {};
    const res = await fetch(blobs[0].url);
    return await res.json();
  } catch {
    return {};
  }
}

async function saveResults(results: Record<string, string>) {
  await put(RESULTS_BLOB, JSON.stringify(results, null, 2), {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true,
  });
}

export async function POST(req: NextRequest) {
  const { imgPath, bodyType } = await req.json();
  if (!imgPath || !bodyType) {
    return NextResponse.json({ error: "Missing imgPath or bodyType" }, { status: 400 });
  }

  const results = await loadResults();
  results[imgPath] = bodyType;
  await saveResults(results);

  return NextResponse.json({ ok: true });
}

export async function PUT() {
  const VALID = ["apple", "hourglass", "inverted-triangle", "rectangle", "triangle"];
  const results = await loadResults();
  const picks: Record<string, string> = {};

  for (const [filePath, bt] of Object.entries(results)) {
    if (!VALID.includes(bt)) continue;
    if (!picks[bt]) picks[bt] = filePath;
  }

  return NextResponse.json({ ok: true, picks });
}
