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
Reply `PriorityGuard` to the feature name, then describe your design from
your signed LLD in three or four sentences: what it does, its tables, and
who owns each write.

### 2. Answer each question

Answer in one or two lines, from your LLD, §3–§5 and §7. Grey text in the
input box is Claude Code's guess: type your own, never **Tab** or **Right
arrow**. Three answers are exact:
- A capability the customer deferred:
  `Out of scope for this record; deferred to a later release.` Never
  "Not decided" here: it would leave a decided deferral `OPEN`.
- Only the business can decide: `Not decided. Record it as open.`
- Gates: `MERGE: every change reviewed, all checks green. INSTALL: installs
  cleanly on my PDI, a live check passes. DEMO: the floor works live, as an
  ordinary agent. HANDOFF: someone else diagnoses a failure from the runbook
  alone.`

✅ Before the read-back, it has asked about failure, security, cost,
boundaries and gates (milestones).

<details><summary>🛟 It skipped one</summary>

Type `You haven't asked about <topic>. Ask before the read-back.`, with the
topic in place of `<topic>`.

</details>

### 3. Check the read-back

It lists every term and asks `Confirm these N terms, or correct any.`
Whatever it lists, 🤖 paste this (adding terms is normal, not a catch):
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
at the read-back, and gaps left `OPEN`, aren't catches. Then type `/exit`.

### 6. Read and sign it

✏️ **Editor:** read every term: is each one what you agreed?
- An `OPEN` term your LLD answers: replace `OPEN` by hand. Leave the rest
  for the build plan.
- §8: each option you rejected is there, with its reason.

In §9 Approval, fill in the empty row `| | | | |`: your name, `developer`,
today's date, your name again, such as
`| Sam Lee | developer | 2026-10-14 | Sam Lee |`. Don't add a row. Save.

✅ All four cells are real, not `TBD`, `-` or `<…>`: the build plan refuses
an empty cell.

## You now have

- `docs/DESIGN-PriorityGuard.md` in your workspace, signed by you, and this
  module's catches in `catches.md`.
