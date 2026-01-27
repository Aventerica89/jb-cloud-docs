import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = join(__dirname, '../public/og-image.png');

// Brand colors from logo
const purple = '#5521B5';
const darkBg = '#0f0f23';

// Create SVG with brand styling
const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${darkBg}"/>
      <stop offset="100%" style="stop-color:#1a1a3e"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Accent line -->
  <rect x="0" y="0" width="1200" height="6" fill="${purple}"/>

  <!-- Logo letters scaled up -->
  <g transform="translate(100, 200) scale(3)">
    <!-- j letter -->
    <path d="M8 8h8v28c0 6-3 10-10 10-2 0-4-.5-6-1.5l2-6c1 .5 2 1 3 1 2 0 3-1.5 3-4V8z" fill="${purple}"/>
    <!-- j dot (red accent) -->
    <rect x="8" y="0" width="8" height="7" rx="1" fill="#EF4444"/>
    <!-- b letter -->
    <path d="M24 0h8v16c2-2 5-3 8-3 8 0 13 6 13 15s-5 15-13 15c-3 0-6-1-8-3v2h-8V0zm8 28c0 5 3 8 7 8s7-3 7-8-3-8-7-8-7 3-7 8z" fill="${purple}"/>
  </g>

  <!-- Title text -->
  <text x="380" y="320" font-family="system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="72" font-weight="700" fill="#ffffff">Cloud Docs</text>

  <!-- Subtitle -->
  <text x="380" y="400" font-family="system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="32" fill="#9CA3AF">Documentation for JB Cloud Infrastructure</text>

  <!-- Domain -->
  <text x="100" y="570" font-family="ui-monospace, monospace" font-size="24" fill="#6B7280">docs.jbcloud.app</text>
</svg>
`;

async function generate() {
  try {
    await sharp(Buffer.from(svg))
      .png()
      .toFile(outputPath);
    console.log(`OG image generated at: ${outputPath}`);
  } catch (error) {
    console.error('Failed to generate OG image:', error);
    process.exit(1);
  }
}

generate();
