// The One-Liner Groan-Off — make.fun entry for @mmo4me.
// One original dad joke, one line, at most 140 characters.
// The program writes the line to /output/entry.txt, deterministically.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke, drafted to the winner's shape for blind one-liner briefs:
// one mechanism, one incident, twist word last, stop at the landing.
// Setup: the son insults the dad's jokes. Twist: "revolting" read as
// "revolving" — the dad takes the insult as a compliment about spin.
const SETUP = "My son called my jokes revolting.";
const PUNCH = "I said, 'Thanks, I was going for a spin.'";
const LINE = `${SETUP} ${PUNCH}`;

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

// Gate from the rules: the entry must be UTF-8 text of 1 to 140
// characters, not only white space. Fail loudly instead of writing
// an invalid entry.
function validateEntry(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 140) {
    throw new Error(`entry is ${chars} characters, must be 1-140`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry is only white space");
  }
}

// uid-65534-safe: mkdir the output dir, clear only its CONTENTS,
// never delete the dir itself (its parent is not writable in the
// grader sandbox).
function writeEntry(line: string): void {
  validateEntry(line);
  mkdirSync(OUT_DIR, { recursive: true });
  for (const name of readdirSync(OUT_DIR)) {
    rmSync(join(OUT_DIR, name), { recursive: true, force: true });
  }
  writeFileSync(OUT_FILE, line, "utf8");
}

function main(): void {
  writeEntry(LINE);
  console.log(`wrote ${[...LINE].length} chars to ${OUT_FILE}`);
}

main();
