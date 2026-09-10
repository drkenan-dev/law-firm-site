/**
 * Generates professional placeholder SVG images for the law firm website.
 *
 * Run:  npm run generate:images
 *
 * Output: /public/images/{hero,general,attorneys,practice-areas,blog}/*.svg
 *
 * These are intentionally simple, on-brand placeholders. To use real
 * photography later, replace any generated file with an image that has
 * the SAME filename (and reasonable dimensions) — no code changes needed.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public", "images");

const NAVY_DARK = "#071426";
const NAVY = "#0B1F3A";
const NAVY_MID = "#12305C";
const GOLD = "#B69258";
const GOLD_LIGHT = "#DCC391";
const CREAM = "#F3F1EC";

const esc = (s) => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

/* ---------- shared building blocks ---------- */

function background(w, h, from = NAVY, to = NAVY_MID) {
  return `<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="0.6" y2="1">
    <stop offset="0" stop-color="${from}"/>
    <stop offset="1" stop-color="${to}"/>
  </linearGradient>
  <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${GOLD}" stop-opacity="0.5"/>
    <stop offset="1" stop-color="${GOLD_LIGHT}" stop-opacity="0.9"/>
  </linearGradient>
</defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>`;
}

function decorativeGrid(w, h) {
  let out = "";
  for (let x = 0; x <= w; x += 80) {
    out += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="${GOLD}" stroke-opacity="0.06"/>`;
  }
  for (let y = 0; y <= h; y += 80) {
    out += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${GOLD}" stroke-opacity="0.06"/>`;
  }
  return out;
}

function vignette(w, h) {
  return `<linearGradient id="vig" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="#000" stop-opacity="0.32"/>
  <stop offset="0.45" stop-color="#000" stop-opacity="0"/>
  <stop offset="1" stop-color="#000" stop-opacity="0.55"/>
</linearGradient>
<rect width="${w}" height="${h}" fill="url(#vig)"/>`;
}

/** Classical courthouse portico: base + columns + pediment. */
function courthouse(w, h, sx, sw, sy) {
  const colCount = 5;
  const colW = sw * 0.085;
  const gap = (sw - colW * colCount) / (colCount + 1);
  let cols = "";
  for (let i = 0; i < colCount; i++) {
    const x = sx + gap + i * (gap + colW);
    cols += `<rect x="${x}" y="${sy}" width="${colW}" height="${h - sy - 30}" fill="${NAVY_DARK}" opacity="0.62"/>
             <rect x="${x + colW * 0.18}" y="${sy}" width="${colW * 0.16}" height="${h - sy - 30}" fill="${GOLD}" opacity="0.5"/>`;
  }
  return `<g>
  <rect x="${sx}" y="${sy - 26}" width="${sw}" height="26" fill="${NAVY_DARK}" opacity="0.85"/>
  <path d="M ${sx - 34} ${sy - 26} L ${sx + sw / 2} ${sy - 92} L ${sx + sw + 34} ${sy - 26} Z" fill="${NAVY_DARK}" opacity="0.85"/>
  <rect x="${sx - 26}" y="${h - 30}" width="${sw + 52}" height="30" fill="${NAVY_DARK}" opacity="0.85"/>
  ${cols}
  <line x1="${sx}" y1="${sy + 40}" x2="${sx + sw}" y2="${sy + 40}" stroke="${GOLD}" stroke-opacity="0.5"/>
</g>`;
}

/** Scales of justice glyph used on portraits/og images. */
function scales(cx, cy, s) {
  return `<g transform="translate(${cx} ${cy}) scale(${s})" stroke="${GOLD_LIGHT}" fill="none" stroke-width="6" stroke-linecap="round">
  <circle cy="-150" r="9" fill="${GOLD_LIGHT}" stroke="none"/>
  <path d="M 0 -145 V 40"/>
  <path d="M -185 40 H 185"/>
  <path d="M -185 40 L -185 50 C -185 122 -125 170 -22 172"/>
  <path d="M 185 40 L 185 50 C 185 122 125 170 22 172"/>
  <path d="M -138 55 L -138 60 C -138 112 -95 148 -10 150"/>
  <path d="M 138 55 L 138 60 C 138 112 95 148 10 150"/>
  <path d="M 0 40 V 52"/>
</g>`;
}

/* ---------- asset builders ---------- */

function heroHome() {
  const w = 1600, h = 1000;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="Illustration of a courthouse with classical columns">
${background(w, h)}
${decorativeGrid(w, h)}
<circle cx="${w * 0.78}" cy="120" r="150" fill="${GOLD}" opacity="0.14"/>
${courthouse(w, h, 780, 700, 320)}
${scales(w * 0.5, h * 0.36, 0.8)}
<rect x="90" y="${h - 120}" width="340" height="5" fill="${GOLD}"/>
<text x="90" y="${h - 84}" font-family="Georgia, 'Times New Roman', serif" font-size="34" fill="${GOLD_LIGHT}" letter-spacing="10">EST. ${1999}</text>
${vignette(w, h)}
</svg>`;
}

function heroInterior() {
  const w = 1600, h = 560;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
${background(w, h)}
${decorativeGrid(w, h)}
${courthouse(w, h, 980, 520, 120)}
<rect x="70" y="${h - 90}" width="300" height="4" fill="${GOLD}"/>
${vignette(w, h)}
</svg>`;
}

function portrait(name, initials) {
  const w = 600, h = 720;
  const cx = w / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="Placeholder portrait of ${esc(name)}">
${background(w, h)}
${decorativeGrid(w, h)}
${scales(cx, 150, 0.62)}
<ellipse cx="${cx}" cy="${h * 0.66}" rx="150" ry="${h * 0.34}" fill="${NAVY}" opacity="0.75"/>
<ellipse cx="${cx}" cy="300" rx="110" ry="130" fill="${CREAM}" opacity="0.16"/>
<path d="M ${cx - 150} ${h} C ${cx - 190} ${h - 170} ${cx + 190} ${h - 170} ${cx + 150} ${h} Z" fill="${NAVY_DARK}" opacity="0.7"/>
<text x="${cx}" y="${h - 108}" font-family="Georgia, 'Times New Roman', serif" font-size="120" font-weight="bold" fill="${GOLD_LIGHT}" text-anchor="middle" opacity="0.92">${esc(initials)}</text>
<rect x="${cx - 150}" y="${h - 70}" width="300" height="2" fill="${GOLD}" opacity="0.7"/>
<text x="${cx}" y="${h - 34}" font-family="Georgia, 'Times New Roman', serif" font-size="30" fill="${CREAM}" opacity="0.85" text-anchor="middle">${esc(name)}</text>
</svg>`;
}

function areaCard(label, glyph) {
  const w = 800, h = 500;
  const cx = w / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)} illustration">
${background(w, h)}
${decorativeGrid(w, h)}
<circle cx="${cx}" cy="170" r="92" fill="none" stroke="${GOLD}" stroke-opacity="0.4" stroke-width="2"/>
${glyph(cx, 170)}
<rect x="${cx - 220}" y="330" width="440" height="40" rx="3" fill="${NAVY_DARK}" opacity="0.6"/>
<text x="${cx}" y="358" font-family="Georgia, 'Times New Roman', serif" font-size="26" letter-spacing="5" fill="${GOLD_LIGHT}" text-anchor="middle">${esc(label)}</text>
</svg>`;
}

/* Tiny lucide-style glyphs drawn as raw paths (stroke-based). */
const glyphs = {
  building: (cx, cy) => `<g transform="translate(${cx} ${cy})" fill="none" stroke="${GOLD_LIGHT}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M-40 -70 h50 v140 h44 v-100 h40 v100 h10"/><path d="M-60 70 v-90 h40 v90"/><path d="M-25 -45 h16 M-25 -20 h16 M-25 5 h16 M25 -70 v-30 M5 -100 h40"/></g>`,
  scale: (cx, cy) => `<g transform="translate(${cx} ${cy}) scale(0.72)" fill="none" stroke="${GOLD_LIGHT}" stroke-width="4" stroke-linecap="round">
    <circle cy="-70" r="6" fill="${GOLD_LIGHT}" stroke="none"/><path d="M0 -64 V20"/><path d="M-85 20 H85"/><path d="M-85 20 L-85 26 C-85 62 -58 78 -10 80"/><path d="M85 20 L85 26 C85 62 58 78 10 80"/><path d="M-63 27 L-63 32 C-63 56 -43 68 -4 70"/><path d="M63 27 L63 32 C63 56 43 68 4 70"/><path d="M0 20 V27"/></g>`,
  home: (cx, cy) => `<g transform="translate(${cx} ${cy})" fill="none" stroke="${GOLD_LIGHT}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M0 -75 L-62 0 H-34 V75 H34 V0 H62 Z"/><rect x="-18" y="40" width="36" height="35"/></g>`,
  users: (cx, cy) => `<g transform="translate(${cx} ${cy})" fill="none" stroke="${GOLD_LIGHT}" stroke-width="4" stroke-linecap="round">
    <circle cx="-20" cy="-30" r="22"/><path d="M-58 60 C-58 25 -40 10 -20 10 S18 25 18 60"/><circle cx="28" cy="-26" r="16"/><path d="M22 8 C48 10 64 30 64 60"/></g>`,
  briefcase: (cx, cy) => `<g transform="translate(${cx} ${cy})" fill="none" stroke="${GOLD_LIGHT}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <rect x="-55" y="8" width="110" height="70" rx="5"/><path d="M-30 8 V-18 a18 18 0 0 1 60 0 V8"/></g>`,
  bulb: (cx, cy) => `<g transform="translate(${cx} ${cy})" fill="none" stroke="${GOLD_LIGHT}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M-14 30 h28 M-10 50 h20 M-18 -10 a42 42 0 0 1 84 6 c0 18 -12 28 -22 36 v8 h-40 v-8 c-10 -8 -22 -18 -22 -36"/></g>`,
  bank: (cx, cy) => `<g transform="translate(${cx} ${cy})" fill="none" stroke="${GOLD_LIGHT}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M-70 30 h140 M-60 70 h120 M0 -70 L-72 30 h144 Z"/><path d="M18 30 V 70"/></g>`,
  shield: (cx, cy) => `<g transform="translate(${cx} ${cy})" fill="none" stroke="${GOLD_LIGHT}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M-40 -62 V14 C-40 44 -8 62 0 66 C8 62 40 44 40 14 V-62 Z"/><path d="M-18 6 L-6 18 L 20 -12"/></g>`,
  calc: (cx, cy) => `<g transform="translate(${cx} ${cy})" fill="none" stroke="${GOLD_LIGHT}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <rect x="-45" y="-70" width="90" height="140" rx="6"/><path d="M-25 -48 h50 M-25 -22 h50 M-25 4 h50 M-25 30 h50 M-25 56 h50"/><circle cx="-22" cy="-48" r="8" fill="${GOLD_LIGHT}" stroke="none"/><circle cx="22" cy="-22" r="8" fill="${GOLD_LIGHT}" stroke="none"/></g>`,
  globe: (cx, cy) => `<g transform="translate(${cx} ${cy})" fill="none" stroke="${GOLD_LIGHT}" stroke-width="4" stroke-linecap="round">
    <circle r="68"/><path d="M-68 0 H68 M-62 -28 H62 M-62 28 H62 M0 -68 C22 -30 22 30 0 68 M0 -68 C-22 -30 -22 30 0 68"/></g>`,
  contract: (cx, cy) => `<g transform="translate(${cx} ${cy})" fill="none" stroke="${GOLD_LIGHT}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M-55 -68 C-30 -76 -8 -74 8 -66 L30 -55 V60 C10 52 -12 52 -30 58 Z M30 -55 L55 -45 L48 -62 Z"/><path d="M-38 -26 H6 M-38 -2 H6 M-38 22 H6"/><path d="M14 -6 H30"/></g>`,
  gavel: (cx, cy) => `<g transform="translate(${cx} ${cy}) scale(0.9)" fill="none" stroke="${GOLD_LIGHT}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M-60 66 L10 -4 M10 -4 L32 18 M32 18 L52 38 C58 44 52 52 45 55 L-14 30 M32 18 L56 -6 L76 14 L52 38"/><rect x="-58" y="58" width="42" height="8" rx="4"/></g>`,
};

const areaSpecs = [
  ["corporate-commercial", "Corporate & Commercial", glyphs.building],
  ["litigation", "Litigation", glyphs.scale],
  ["real-estate", "Real Estate", glyphs.home],
  ["family", "Family Law", glyphs.users],
  ["employment", "Employment", glyphs.briefcase],
  ["intellectual-property", "Intellectual Property", glyphs.bulb],
  ["banking-finance", "Banking & Finance", glyphs.bank],
  ["criminal-defense", "Criminal Defense", glyphs.shield],
  ["tax", "Tax Law", glyphs.calc],
  ["immigration", "Immigration", glyphs.globe],
];

const blogSpecs = [
  ["blog-contracts", "Contracts", glyphs.contract],
  ["blog-dispute", "Disputes", glyphs.gavel],
  ["blog-property", "Property", glyphs.home],
  ["blog-court", "Courts", glyphs.bank],
  ["blog-trademark", "Trademarks", glyphs.bulb],
  ["blog-mediation", "Mediation", glyphs.scale],
];

const generalSpecs = [
  ["about-office", "ABOUT THE FIRM", glyphs.bank],
  ["commitment", "OUR COMMITMENT", glyphs.shield],
  ["careers", "BUILD YOUR CAREER", glyphs.briefcase],
];

/* ---------- write everything ---------- */

const files = [
  ["hero", "hero-home.svg", heroHome()],
  ["hero", "hero-interior.svg", heroInterior()],
  ["general", "og-cover.svg", (() => {
    const w = 1200, h = 630;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
${background(w, h)}
${courthouse(w, h, 740, 460, 160)}
${scales(360, 300, 0.85)}
<text x="70" y="${h - 110}" font-family="Georgia, 'Times New Roman', serif" font-size="66" font-weight="bold" fill="${GOLD_LIGHT}">Crestline Law Partners</text>
<text x="71" y="${h - 62}" font-family="Georgia, 'Times New Roman', serif" font-size="26" letter-spacing="8" fill="${CREAM}" opacity="0.8">EXPERIENCED LEGAL COUNSEL · TRUSTED REPRESENTATION</text>
<rect x="70" y="${h - 130}" width="380" height="4" fill="${GOLD}"/>
</svg>`;
  })()],
  ...generalSpecs.map(([name, label, glyph]) => ["general", `${name}.svg`, areaCard(label, glyph, name)]),
  ...[
    ["attorney-1", "John Williams", "JW"],
    ["attorney-2", "Sarah Anderson", "SA"],
    ["attorney-3", "Michael Johnson", "MJ"],
    ["attorney-4", "Emily Carter", "EC"],
    ["attorney-5", "Daniel Opoku", "DO"],
    ["attorney-6", "Grace Addo", "GA"],
  ].map(([name, label, initials]) => ["attorneys", `${name}.svg`, portrait(label, initials)]),
  ...areaSpecs.map(([name, label, glyph]) => ["practice-areas", `${name}.svg`, areaCard(label, glyph, name)]),
  ...blogSpecs.map(([name, label, glyph]) => ["blog", `${name}.svg`, areaCard(label, glyph, name)]),
];

for (const [folder, filename, svg] of files) {
  const dir = join(publicDir, folder);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, filename), svg, "utf8");
  console.log(`✓ generated ${folder}/${filename}`);
}

console.log(`\nDone — ${files.length} placeholder images written to ${publicDir}`);