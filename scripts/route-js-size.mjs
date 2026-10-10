// Sums the gzip size of every /_next/static JS file referenced by each
// prerendered route's HTML. Run after `next build`:
//   node scripts/route-js-size.mjs [route ...]
// Next 16 no longer prints "First Load JS", so this gives a like-for-like
// number across framework versions.
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const root = process.cwd();
const appDir = join(root, ".next/server/app");
const staticRoot = join(root, ".next");

const defaults = [
  "/",
  "/kitchen-renovations-melbourne",
  "/quote",
  "/renovations/tarneit",
  "/guides/renovation-quote-checklist-melbourne",
  "/projects",
];
const routes = process.argv.slice(2).length ? process.argv.slice(2) : defaults;

function htmlFor(route) {
  const file = route === "/" ? "index.html" : `${route.slice(1)}.html`;
  const p = join(appDir, file);
  return existsSync(p) ? readFileSync(p, "utf8") : null;
}

const cache = new Map();
function gz(file) {
  if (!cache.has(file)) cache.set(file, gzipSync(readFileSync(file)).length);
  return cache.get(file);
}

const rows = [];
for (const route of routes) {
  const html = htmlFor(route);
  if (!html) {
    rows.push({ route, files: 0, gzipKiB: "n/a" });
    continue;
  }
  const sum = (set) => {
    let t = 0;
    for (const s of set) {
      const f = join(staticRoot, decodeURIComponent(s));
      if (existsSync(f)) t += gz(f);
    }
    return (t / 1024).toFixed(1);
  };
  // <script src> tags = JS a modern browser fetches up front (noModule
  // polyfills are skipped by modern browsers, so they're excluded).
  const tags = new Set(
    [...html.matchAll(/<script\b[^>]*>/g)]
      .map((m) => m[0])
      .filter((t) => !/nomodule/i.test(t))
      .map((t) => t.match(/src="\/_next\/(static\/[^"]+?\.js)"/)?.[1])
      .filter(Boolean),
  );
  // Every chunk named anywhere in the HTML/RSC payload (includes lazy chunks).
  const refs = new Set(
    [...html.matchAll(/\/_next\/(static\/[^"'\s)\\]+?\.js)/g)].map((m) => m[1]),
  );
  rows.push({
    route,
    scriptTags: tags.size,
    scriptTagGzipKiB: sum(tags),
    allRefs: refs.size,
    allRefsGzipKiB: sum(refs),
  });
}

// Total CSS for reference.
const cssDir = join(staticRoot, "static/css");
let css = 0;
const walk = (d) => {
  if (!existsSync(d)) return;
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".css")) css += gz(p);
  }
};
walk(cssDir);
walk(join(staticRoot, "static/chunks"));

console.table(rows);
console.log(`All CSS (gzip): ${(css / 1024).toFixed(1)} KiB`);
