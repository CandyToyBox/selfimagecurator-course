/**
 * Admin images API — lists curation images and results from Vercel Blob.
 *
 * GET  /api/admin/images           → JSON list of image metadata + current results
 * GET  /api/admin/images?name=...  → redirect to the Blob CDN URL for that image
 */

import { NextRequest, NextResponse } from "next/server";
import { list } from "@vercel/blob";

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

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");

  if (name) {
    const { blobs } = await list({ prefix: `curation/images/${name}` });
    if (!blobs.length) return new NextResponse(null, { status: 404 });
    return NextResponse.redirect(blobs[0].url);
  }

  const [{ blobs }, results] = await Promise.all([
    list({ prefix: "curation/images/" }),
    loadResults(),
  ]);

  const images = blobs
    .filter((b) => !b.pathname.endsWith("/"))
    .sort((a, b) => a.pathname.localeCompare(b.pathname))
    .map((b) => ({
      path: b.pathname,
      name: b.pathname.replace("curation/images/", ""),
      folder: "Thays Book Images",
      url: b.url,
    }));

  return NextResponse.json({ images, results, total: images.length });
}
