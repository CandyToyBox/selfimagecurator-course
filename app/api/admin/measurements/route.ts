/**
 * 3D Measure Up webhook receiver — LOCAL + PRODUCTION
 *
 * 3D Measure Up POSTs measurement results here when a scan completes.
 *
 * Setup in 3D Measure Up Settings:
 *   Webhook URL → https://your-vercel-domain.vercel.app/api/admin/measurements
 *   (or http://localhost:3000/api/admin/measurements while developing with ngrok)
 *
 * The incoming POST is verified using the API key header.
 * Measurements are saved to ~/thays-brand/scripts/measurements/ (dev)
 * or logged for collection (production).
 *
 * GET /api/admin/measurements  → list saved measurements
 * POST /api/admin/measurements → receive webhook from 3D Measure Up
 */

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const API_KEY      = "StjDZpQhxHNOSXJoZRIiSgTehbGiMXYSnWU";
const MEASURES_DIR = path.join(process.env.HOME || "", "thays-brand", "scripts", "measurements");

function verifyKey(req: NextRequest): boolean {
  // 3D Measure Up sends the API key in one of these headers
  const incoming = req.headers.get("x-api-key")
    || req.headers.get("api-key")
    || req.headers.get("authorization")?.replace("Bearer ", "");
  return incoming === API_KEY;
}

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not available in production" }, { status: 404 });
  }

  const dir = path.join(MEASURES_DIR);
  if (!fs.existsSync(dir)) {
    return NextResponse.json({ measurements: [], total: 0 });
  }

  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith(".json"))
    .map(f => {
      const content = JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8"));
      return { file: f, ...content };
    });

  return NextResponse.json({ measurements: files, total: files.length });
}

export async function POST(req: NextRequest) {
  // Verify this is from 3D Measure Up
  if (!verifyKey(req)) {
    console.warn("[3DMU webhook] Invalid API key");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: Record<string, unknown>;
  const contentType = req.headers.get("content-type") || "";

  try {
    if (contentType.includes("application/json")) {
      payload = await req.json();
    } else if (contentType.includes("text/csv") || contentType.includes("text/plain")) {
      const text = await req.text();
      payload = { raw_csv: text, format: "csv" };
    } else {
      // Try JSON first, fall back to text
      const text = await req.text();
      try {
        payload = JSON.parse(text);
      } catch {
        payload = { raw: text, format: "unknown" };
      }
    }
  } catch (err) {
    return NextResponse.json({ error: "Could not parse body" }, { status: 400 });
  }

  // Add metadata
  const timestamp = new Date().toISOString();
  const id = crypto.randomBytes(6).toString("hex");
  const record = { id, received_at: timestamp, ...payload };

  // Extract label/name if provided (so we know which image this is for)
  const label = (payload.label as string)
    || (payload.scan_id as string)
    || (payload.file_name as string)
    || id;

  const safeName = label.replace(/[^a-z0-9_-]/gi, "_").slice(0, 80);

  // Save to disk (dev) or log (prod)
  if (process.env.NODE_ENV === "development") {
    fs.mkdirSync(MEASURES_DIR, { recursive: true });
    const outPath = path.join(MEASURES_DIR, `${safeName}.json`);
    fs.writeFileSync(outPath, JSON.stringify(record, null, 2));
    console.log(`[3DMU webhook] Saved: ${safeName}.json`);
  } else {
    // Production: log so it's visible in Vercel function logs
    console.log(`[3DMU webhook] Received scan: ${label}`, JSON.stringify(payload).slice(0, 500));
  }

  return NextResponse.json({ ok: true, id, label });
}
