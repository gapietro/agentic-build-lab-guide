# Module 4 — Design challenge

*⏱ 45 min · 11:25*

Claude challenges your design, question by question; you sign the result.
**The idea:** signed building plans. After signing, moving a wall needs a
written change order. **The catch:** the challenge question your LLD can't
answer.

### 1. Start the challenge

⌨️ **Terminal:**
```
cd ~/projects/priority-guard
claude
```
🤖 **Claude:** type this, with nothing after it:
```
/prove-it:design-challenge
```
🤖 When it asks you to confirm the feature name, paste this:
```
PriorityGuard. This is a one-day lab: keep it short. For every question, give
me 3 or 4 numbered answers drawn from docs/LLD-PriorityGuard.md and
CONSULT.md, your recommended one first and "Not decided. Record it as open."
last; if my LLD doesn't answer it, say so first. After my design, ask only
one question each for failure, security, cost and boundaries, the one that
matters most, then gates. At the read-back, cover everything you didn't ask
with your recommended answer, marked (recommended), in about 15 terms.
```

### 2. Answer each question

Check the options against your LLD, then reply with a number, usually `1`.
If it says your LLD doesn't answer, that's the catch: pick the one you'd
defend. Never press **Tab** or **Right arrow**: grey text is only a guess.
- A capability the customer deferred: pick the answer that defers it, never
  "Not decided": that would leave a decided deferral `OPEN`.
- Gates: type this instead of a number: `MERGE: every change reviewed, all
  checks green. INSTALL: installs cleanly on my PDI, a live check passes.
  DEMO: the floor works live, as an ordinary agent. HANDOFF: someone else
  diagnoses a failure from the runbook alone.`

✅ Before the read-back, it has asked about failure, security, cost,
boundaries and gates (milestones).

<details><summary>🛟 It skipped one</summary>

Type `Ask me about each topic you skipped, one at a time, before the
read-back.`

</details>

### 3. Check the read-back

It lists every term and asks `Confirm these N terms, or correct any.` Terms
marked `(recommended)` are its picks for what it didn't ask: read those
first. Whatever it lists, 🤖 paste this (adding terms is normal, not a catch):
```
Not agreed yet. Add these as separate terms if missing: every table the app
writes has one owner; AI never runs while someone is saving; any AI feature
installs switched off. Replace any weaker term that says the same. Add the
priority floor's rule from docs/LLD-PriorityGuard.md §3, one idea per term,
as consecutive terms, then read the terms back again.
```
Anything else wrong? Reply `Not agreed yet.` and the change. Repeat until
it's right.

### 4. Confirm

🤖 **Claude:** type this yourself, alone:
```
Confirmed.
```
✅ In VS Code, `priority-guard/docs/DESIGN-PriorityGuard.md` exists, with as
many terms in §3 as the last read-back listed.

### 5. Log it

🤖 **Claude:**
```
Log this module's catches: real problems the process found, in this
session or this module's pull requests, that got fixed or changed a
decision. One line each, as "4 | <what caught it> | <what, and what was
done>", where what caught it is one of prd, consult, research, design,
guard, test, review, partner, grade, drill. Show me the lines, then append
the ones I confirm or add to ~/projects/priority-guard/catches.md.
```
Confirm a `design` line for each question your LLD couldn't answer, such
as who may edit the critical list, with the term it added. Terms you added
at the read-back, and gaps left `OPEN`, aren't catches.

### 6. Approve it

🤖 **Claude:** type `/clear` first: the challenge's rules stop Claude signing
for you. Then paste this, and give your name when it asks:
```
I approve docs/DESIGN-PriorityGuard.md. Ask me my name, then sign its §9
Approval for me: my name, developer, today's date, my name.
```

<details><summary>🛟 It says it can't sign §9</summary>

The challenge is still loaded. Type `/clear`, then paste the same box again.

</details>

Then type `/exit`.

## You now have

- `docs/DESIGN-PriorityGuard.md` in your workspace, signed by you, and this
  module's catches in `catches.md`.
