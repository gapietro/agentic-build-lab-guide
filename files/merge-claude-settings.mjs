#!/usr/bin/env node
// Put the lab's Claude Code settings into ~/.claude/settings.json.
//
//   node ~/projects/agentic-build-lab-guide/files/merge-claude-settings.mjs          set up or merge
//   node ~/projects/agentic-build-lab-guide/files/merge-claude-settings.mjs --check  only check, change nothing
//
// No settings file yet: it writes the lab's file.
// A settings file already: it saves a backup next to it, then adds the lab's
// settings and keeps everything that was there. Lists (like "deny") are added
// to, never replaced. If your file isn't valid JSON, it stops and changes nothing.
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const lab = JSON.parse(readFileSync(join(here, 'claude-settings.json'), 'utf8'));
const target = join(homedir(), '.claude', 'settings.json');
const checkOnly = process.argv.includes('--check');

const isObj = (v) => v && typeof v === 'object' && !Array.isArray(v);

// Merge `add` into `base`: lab values win for single settings, lists are unioned.
function merge(base, add) {
  const out = { ...base };
  for (const [k, v] of Object.entries(add)) {
    if (Array.isArray(v)) {
      const have = Array.isArray(out[k]) ? out[k] : [];
      out[k] = [...have, ...v.filter((x) => !have.includes(x))];
    } else if (isObj(v)) {
      out[k] = merge(isObj(out[k]) ? out[k] : {}, v);
    } else {
      out[k] = v;
    }
  }
  return out;
}

// Every lab setting present (lists may hold extra entries of yours).
function missing(have, want, path = '') {
  const gaps = [];
  for (const [k, v] of Object.entries(want)) {
    const p = path ? `${path}.${k}` : k;
    if (Array.isArray(v)) {
      const list = Array.isArray(have?.[k]) ? have[k] : [];
      for (const x of v) if (!list.includes(x)) gaps.push(`${p} is missing ${JSON.stringify(x)}`);
    } else if (isObj(v)) {
      gaps.push(...missing(isObj(have?.[k]) ? have[k] : {}, v, p));
    } else if (have?.[k] !== v) {
      gaps.push(`${p} should be ${JSON.stringify(v)}`);
    }
  }
  return gaps;
}

let current = null;
if (existsSync(target)) {
  try {
    current = JSON.parse(readFileSync(target, 'utf8'));
  } catch (e) {
    console.error(`Your ${target} isn't valid JSON, so nothing was changed.`);
    console.error(`Fix it (or ask your instructor), then run this again. Detail: ${e.message}`);
    process.exit(1);
  }
}

if (checkOnly) {
  const gaps = missing(current ?? {}, lab);
  if (!current) console.log(`No settings file at ${target} yet.`);
  if (gaps.length) {
    console.log('Lab settings NOT in place:');
    for (const g of gaps) console.log(`  - ${g}`);
    process.exit(1);
  }
  console.log('Lab settings in place.');
  process.exit(0);
}

mkdirSync(dirname(target), { recursive: true });
if (!current) {
  writeFileSync(target, JSON.stringify(lab, null, 2) + '\n');
  console.log(`Created ${target} with the lab's settings.`);
} else {
  const gaps = missing(current, lab);
  if (!gaps.length) {
    console.log(`${target} already has every lab setting. Nothing changed.`);
  } else {
    const backup = `${target}.before-lab.bak`;
    copyFileSync(target, backup);
    writeFileSync(target, JSON.stringify(merge(current, lab), null, 2) + '\n');
    console.log(`Added the lab's settings to ${target}, keeping yours.`);
    console.log(`Your original is saved as ${backup}.`);
  }
}
console.log('Lab settings in place.');
