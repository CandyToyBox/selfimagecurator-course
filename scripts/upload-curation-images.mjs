/**
 * One-time script: uploads all images from the local Thays Book Images folder
 * to Vercel Blob under curation/images/
 *
 * Usage:
 *   BLOB_READ_WRITE_TOKEN=vercel_blob_... node scripts/upload-curation-images.mjs
 */

import { put } from "@vercel/blob";
import fs from "fs";
import path from "path";

const SRC_DIR = path.join(process.env.HOME, "Downloads", "Thays Book Images");
const EXTS = new Set([".jpg", ".jpeg", ".png"]);

const files = fs
  .readdirSync(SRC_DIR)
  .filter((f) => EXTS.has(path.extname(f).toLowerCase()) && !f.startsWith("screencapture"))
  .sort();

console.log(`Uploading ${files.length} images...`);

let done = 0;
for (const file of files) {
  const filePath = path.join(SRC_DIR, file);
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(file).toLowerCase();
  const contentType = ext === ".png" ? "image/png" : "image/jpeg";

  const blob = await put(`curation/images/${file}`, buffer, {
    access: "public",
    contentType,
    allowOverwrite: true,
  });

  done++;
  process.stdout.write(`\r${done}/${files.length} — ${file}`);
}

console.log("\nDone.");
