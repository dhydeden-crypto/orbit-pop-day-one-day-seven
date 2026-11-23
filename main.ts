// Orbit Pop — entry for make.fun "Day one, day seven" (Node 22, standard library only).
// The entry is the video itself: a short TikTok video about the tiny game Orbit Pop
// on the day it was made and after a week of daily updates, ending with make.fun's
// referral end card and referral code fgktz6fr, posted publicly on TikTok from a
// public account with the bounty line and play code makefun-outlet-rug-geranium
// in its caption. VIDEO.json names that video, and the house reads its views
// and interactions from TikTok. Nothing this program writes about the video is scored.
//
// Authored change vs the starter: before copying, this program reads VIDEO.json
// and checks it is a JSON object with a string "url" field, so a malformed
// VIDEO.json fails loudly here instead of being copied silently to /output.
// It still copies the file byte-for-byte, so the two grader runs write the same bytes.
//
// The VIDEO.json shipped here holds a placeholder address, so the gate refuses
// it as it stands (valid 0). Replace it with your video's address before you submit.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand
// in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });

const source = join(BOT_DIR, 'VIDEO.json');
const parsed = JSON.parse(readFileSync(source, 'utf8')) as { url?: unknown };
if (typeof parsed !== 'object' || parsed === null || typeof parsed.url !== 'string') {
  console.error('VIDEO.json must be a JSON object with a string "url" field');
  process.exit(1);
}

try {
  copyFileSync(source, join(OUTPUT_DIR, 'VIDEO.json'));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
