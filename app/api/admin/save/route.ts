/**
 * Admin save API — persists body type classifications to Supabase.
 *
 * POST /api/admin/save  { imgPath, bodyType }  → upsert one classification
 * PUT  /api/admin/save                          → return best pick per body type
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export async function POST(req: NextRequest) {
  const { imgPath, bodyType } = await req.json();
  if (!imgPath || !bodyType) {
    return NextResponse.json({ error: "Missing imgPath or bodyType" }, { status: 400 });
  }

  const { error } = await supabase
    .from("curation_results")
    .upsert({ image_name: imgPath, body_type: bodyType, updated_at: new Date().toISOString() });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function PUT() {
  const VALID = ["apple", "hourglass", "inverted-triangle", "rectangle", "triangle"];

  const { data: rows } = await supabase
    .from("curation_results")
    .select("image_name, body_type")
    .in("body_type", VALID)
    .order("updated_at", { ascending: true });

  const picks: Record<string, string> = {};
  for (const row of rows || []) {
    if (!picks[row.body_type]) picks[row.body_type] = row.image_name;
  }

  return NextResponse.json({ ok: true, picks });
}
