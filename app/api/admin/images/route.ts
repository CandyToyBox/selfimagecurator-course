/**
 * Admin images API — lists curation images from the static manifest
 * and results from Supabase.
 *
 * GET /api/admin/images → JSON: { images, results, total }
 */

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export async function GET() {
  const manifestPath = path.join(process.cwd(), "public", "images", "curation", "manifest.json");
  const filenames: string[] = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

  const { data: rows } = await supabase
    .from("curation_results")
    .select("image_name, body_type");

  const images = filenames
    .filter((f) => f !== "manifest.json")
    .map((name) => ({
      path: name,
      name,
      folder: "Thays Book Images",
      url: `/images/curation/${encodeURIComponent(name)}`,
    }));

  const results: Record<string, string> = {};
  for (const row of rows || []) {
    results[row.image_name] = row.body_type;
  }

  return NextResponse.json({ images, results, total: images.length });
}
