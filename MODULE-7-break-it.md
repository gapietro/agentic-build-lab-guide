# Module 7 — Break it

*⏱ 15 min · 14:45 · optional*

**Short on time? Skip it:** nothing later in the day depends on it.

A fresh reviewer, told only that the floor must hold, tries to break it.
**The catch:** users change incidents in ways your tests never imagined.

### 1. 🔮 Predict the attacks

✏️ **Editor:** in `LOG.md`, write three ways you'd beat the floor.

### 2. Start a fresh reviewer

🤖 **Claude:** type `/exit`.

⌨️ **Terminal**, in the same window:
```
cd ~/projects/priority-guard/app && claude
```
🤖 **Claude**, skipping the session open:
```
Review someone else's work in this repo. One rule must hold: an incident
on a critical service can never be saved below that service's floor.
Break it. Re-run the checks yourself; don't trust SESSION-NOTE.md or pull
requests. Probe the floor, the rule that applies it, every way an
incident's priority can change, and every error path. List every attempt.
Work only on a new branch, test/break-floor, from main. Make each attempt
a test named with its design term, so one that gets through shows as a
failing test. Try all of any finite input set. Commit the tests. Fix
nothing, push nothing, never run now-sdk install or now-sdk auth.
```
✅ It re-ran the tests, listed attempts, and commits say `[test/break-floor`.

### 3. Compare with yours

Tick each prediction it tried. For any it missed, 🤖 **Claude:**
`Also try: <a line from your LOG.md>. Commit a test for it.`

### 4. Go back to a clean main

⌨️ **Terminal**, in your window: `git status --short`

✅ It prints nothing.

<details><summary>🛟 It lists files</summary>

🤖 **Claude:** `Commit those files on test/break-floor.` Then check again.

</details>

⌨️ **Terminal:**
```
git switch main && git status --short
```
✅ No files listed: Module 8 grades this `main`.

🤖 **Claude:** type `/exit`.

## You now have

- A clean `main`; the reviewer's tests on `test/break-floor`, never merged.

**Log it:** in `LOG.md`, each attempt that got through as an **open finding**,
with its failing test's name; a catch (`7 | review | …`) once its fix merges.
