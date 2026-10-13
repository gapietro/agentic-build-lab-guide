# Module 4 — Design challenge

*⏱ 45 min · 11:25*

Claude challenges your design, question by question; you sign the result.
**The idea:** signed building plans. After signing, moving a wall needs a
written change order. **The catch:** the challenge question your LLD can't
answer.

### 1. Get your positions ready

✏️ **Editor:** in `LOG.md`, fill any blank line in your positions list
from your signed LLD.

### 2. Start the challenge

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
your list.

### 3. Answer each question

Answer in one or two lines, from your list and LLD §3–§5 and §7. Grey text
in the input box is Claude Code's guess: type your own, never **Tab** or
**Right arrow**. Note surprising questions in `LOG.md`. Two answers are exact:
- A capability the customer deferred:
  `Out of scope for this record; deferred to a later release.` Never
  "Not decided" here: it would leave a decided deferral `OPEN`.
- Only the business can decide: `Not decided. Record it as open.`

✅ Before the read-back, it has asked about failure, security, cost,
boundaries and gates (milestones).

<details><summary>🛟 It skipped one</summary>

Type `You haven't asked about <topic>. Ask before the read-back.`, with the
topic in place of `<topic>`.

</details>

### 4. Check the read-back

It lists every term and asks `Confirm these N terms, or correct any.`
Whatever it lists, 🤖 paste this, then your central-rule sentences from
`LOG.md` (adding terms is normal, not a catch):
```
Not agreed yet. Add these as separate terms if missing: every table the app
writes has one owner; AI never runs while someone is saving; any AI feature
installs switched off. Replace any weaker term that says the same. Add my
central rule, below, word for word, one sentence per term, as consecutive
terms, then read the terms back again:
```
Anything else wrong? Reply `Not agreed yet.` and the change. Repeat until
it's right. ✏️ **Editor:** count the terms; write the number in `LOG.md`.

### 5. Confirm

🤖 **Claude:** type this yourself, alone:
```
Confirmed.
```
✅ In VS Code, `priority-guard/docs/DESIGN-PriorityGuard.md` exists, with
your count of terms in §3. Then type `/exit`.

### 6. Read and sign it

✏️ **Editor:** read every term: is each one what you agreed?
- An `OPEN` term your LLD answers: replace `OPEN` by hand, and note it in
  `LOG.md`. Leave the rest for the build plan.
- §8: each option you rejected is there, with its reason.

In §9 Approval, fill in the empty row `| | | | |`: your name, `developer`,
today's date, your name again, such as
`| Sam Lee | developer | 2026-10-14 | Sam Lee |`. Don't add a row. Save.

✅ All four cells are real, not `TBD`, `-` or `<…>`: the build plan refuses
an empty cell.

## You now have

- `docs/DESIGN-PriorityGuard.md` in your workspace, signed by you.

**Log it:** `4 | design | <what the question exposed, and the term it added>`

Not catches (`LOG.md` only): terms you added at the read-back, gaps left
`OPEN`, and `OPEN` terms you decided yourself.
