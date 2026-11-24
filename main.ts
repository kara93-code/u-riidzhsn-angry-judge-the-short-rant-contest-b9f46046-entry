// Angry Judge: The Short Rant Contest — entry program.
//
// Writes one short, funny rant about an everyday annoyance to
// $MAKEFUN_OUTPUT_DIR/entry.txt (UTF-8, 1-400 characters).
// No network, no randomness, no secrets: the text is fixed in this file.

import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The rant: the self-checkout machine that treats an honest shopper
// like a smuggler. Specific, concrete, and shared by everyone who has
// ever apologised to a machine while a queue watched.
const RANT =
  "I scanned the milk once. The self-checkout yelled UNEXPECTED ITEM " +
  "like I'd smuggled it in under my coat. I lifted it. I put it back. " +
  "I apologised to a machine. Then the attendant strolled over, pressed " +
  "one button, and fixed in two seconds what I'd failed at for four " +
  "minutes — while twelve strangers judged my entire character.";

function main(): void {
  const trimmed = RANT.trim();
  if (trimmed.length < 1 || trimmed.length > 400) {
    throw new Error(`rant must be 1-400 characters, got ${trimmed.length}`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR?.trim() || "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, trimmed + "\n", "utf8");
  chmodSync(outPath, 0o644);
  console.log(`wrote ${outPath} (${trimmed.length} characters)`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
