#!/usr/bin/env node
/**
 * Renders the 1200×630 Open Graph / Twitter cards in public/images/social/
 * from the logo and brand colours only (no project photography).
 *
 *   node scripts/generate-social-images.mjs
 *
 * Re-run after changing a card's wording. Fonts come from the machine that
 * runs the script, so commit the generated PNGs.
 */
import { readFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const outDir = path.join(root, "public/images/social");

const NAVY = "#0d1f3c";
const GOLD = "#d4a832";

const cards = [
  { file: "konntey-default.png", kicker: "Melbourne's west & southeast", lines: ["Home renovations", "& extensions"] },
  { file: "kitchen.png", kicker: "Kitchen renovations", lines: ["Kitchens built", "around how you live"] },
  { file: "bathroom.png", kicker: "Bathroom renovations", lines: ["Ensuites to", "full bathroom rebuilds"] },
  { file: "extensions.png", kicker: "Home extensions", lines: ["More room without", "moving house"] },
  { file: "decks.png", kicker: "Decks & pergolas", lines: ["Outdoor living", "built for Melbourne"] },
  { file: "painting.png", kicker: "Interior & exterior painting", lines: ["Careful prep,", "clean finishes"] },
  { file: "vastu.png", kicker: "Vastu renovations", lines: ["Vastu-aligned design,", "built to code"] },
  { file: "new-homes.png", kicker: "New home builds", lines: ["New homes built", "on your land"] },
];

const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function svg({ kicker, lines }) {
  const display = "'Avenir Next Condensed', 'Barlow Condensed', 'Arial Narrow', sans-serif";
  const body = "'Avenir Next', 'Helvetica Neue', Arial, sans-serif";
  const heading = lines
    .map(
      (line, i) =>
        `<text x="80" y="${310 + i * 90}" font-family="${display}" font-weight="800" font-size="80" fill="#ffffff">${escape(line)}</text>`,
    )
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${NAVY}"/>
  <rect x="80" y="170" width="72" height="5" fill="${GOLD}"/>
  <text x="80" y="150" font-family="${body}" font-weight="600" font-size="26" letter-spacing="3" fill="${GOLD}">${escape(kicker.toUpperCase())}</text>
  ${heading}
  <rect x="0" y="540" width="1200" height="90" fill="#0a1830"/>
  <text x="80" y="596" font-family="${display}" font-weight="800" font-size="34" letter-spacing="1" fill="#ffffff">KONNTEY <tspan fill="${GOLD}">HOME &amp; RENOVATIONS</tspan></text>
  <text x="1120" y="596" text-anchor="end" font-family="${body}" font-weight="500" font-size="24" fill="#ffffffb3">konnteyhomerenovations.com.au</text>
</svg>`;
}

await mkdir(outDir, { recursive: true });
const logo = await sharp(await readFile(path.join(root, "public/images/logo.png")))
  .resize({ width: 240 })
  .png()
  .toBuffer();

for (const card of cards) {
  const out = path.join(outDir, card.file);
  await sharp(Buffer.from(svg(card)))
    .composite([{ input: logo, left: 1200 - 80 - 240, top: 70 }])
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toFile(out);
  const meta = await sharp(out).metadata();
  console.log(`${card.file} ${meta.width}x${meta.height}`);
}
