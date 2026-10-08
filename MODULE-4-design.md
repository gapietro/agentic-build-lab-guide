# Module 4 — Design approval: nothing is built until you sign

*Day 2 · about 1¾ hours · stage two of five*

[← Module 3](MODULE-3-research-and-lld.md) · [Lab home](README.md) · [Module 5 →](MODULE-5-fence-and-plan.md)

---

## What you'll do

`CONSULT.md` is **advice**. Nobody has pushed back on it, asked how it fails,
or signed it. In this module you do all three:

1. **You design.** You write your design positions before the challenge
   starts. The kit doesn't design anything.
2. **The AI challenges.** `/prove-it:design-challenge` asks **one question
   per turn**: how it fails, security, cost, boundaries, then milestones.
3. **It reads every numbered term back.** You correct them until they're
   right, then confirm. It writes exactly what you confirmed.
4. **You sign it by hand.** The AI never signs.

**Why:** think of signed building plans. After they're signed, moving a wall
means a written change order. The signed design is what the code is held to
from now on.

**The catch to watch for.** Watch for the challenge question your LLD
can't answer. That's a gap that would otherwise have shown up in the code.

---

## Before you start

- [ ] `~/projects/priority-guard/CONSULT.md` exists, and you haven't edited it.
- [ ] `~/projects/priority-guard` holds `brief/`, `CONSULT.md`, `inputs/` and `docs/`,
      with `docs/LLD-PriorityGuard.md` signed by you (Module 3).

---

## Steps

### Step 1 — Write your positions

**Why this step:** Answers made up on the spot can contradict each other.
Writing your positions down first, from your LLD, keeps your answers steady,
and shows you early where the LLD has nothing to say.

The challenge asks one question at a time. Answer from a list you prepared,
not on the spot, so your answers stay consistent. Copy this list into
`LOG.md` and **fill in every line yourself, from your signed LLD**. The LLD
is your design; the challenge is there to find its weak points. Where the LLD
doesn't answer a line, that's worth knowing before the challenge starts.

- **Feature name:** `PriorityGuard` (letters only; it becomes a file name).
- **Your design in your own words:** three or four sentences, from LLD
  §1–§3. What gets built, which tables it uses, and which code owns each write.
- **The central rule:** write it as **separate short sentences**, one idea
  each. For example: "Only plain code sets the priority floor." "The floor
  can raise a priority, never lower it." "Only an override can go below the
  floor."
- **When the floor runs, and what it must survive:** ______ (LLD §3 and §7)
- **Who can change the critical services list:** ______
- **Who can override, and what an override must record:** ______
- **Can an override be edited or deleted afterwards?** ______
- **How approval works for Tier 1 services:** ______ (PRD capability 4, LLD §3–§4)
- **What happens to capability 6 (smart urgency):** ______ (from your consult,
  and the customer's decision if the consult asked for one)
- **What the app must never do:** for example, change the priority matrix,
  or touch SLA definitions.
- **Who can see the weekly count:** ______
- **Demo data:** which seed records show the app working: ______
- **Milestones this feature must pass:**

  | Milestone | Passes when |
  |---|---|
  | MERGE | Every change reviewed, all checks green |
  | INSTALL | The app installs cleanly on your PDI and a live check passes |
  | DEMO | The floor works live, as an ordinary agent |
  | HANDOFF | Someone else can diagnose a failure from the runbook alone |

✅ **Check:** every line has your answer. The central rule is at least two
separate sentences.

### Step 2 — Start the challenge

**Why this step:** This starts the challenge, where the AI asks hard questions
about your design. It asks one at a time, so each answer gets your full
attention instead of getting lost in a pile.

1. Start Claude in the workspace:
   ```
   cd ~/projects/priority-guard
   claude
   ```
2. Type exactly this, **with nothing after it** (anything after it is read as
   a file path):
   ```
   /prove-it:design-challenge
   ```
3. It proposes a feature name. Reply:
   ```
   PriorityGuard
   ```
4. It asks you to describe the design in your own words. Type your sentences
   from step 1.

✅ **Check:** from now on, **every turn ends with exactly one question.**

### Step 3 — Answer, one question at a time

**Why this step:** Each question is a chance to find a weak spot while it is
still on paper, where it is cheap to fix. Answering from your list keeps the
record consistent.

Answer each question from your list. When it asks how something fails, or
about security, answer from LLD §3, §5 and §7.

When it asks about a capability the customer **deferred**, answer
`Out of scope for this record; deferred to a later release.` Never answer
`Not decided` for a deferred capability: that writes an OPEN term, and an
OPEN term fails the grade. Keep answers short. If it asks
something your list doesn't cover:
- If it's a real decision, make it, and add it to your list.
- If only the business can decide, say `Not decided. Record it as open.`

**Write down the questions that surprised you.** Those are the ones the
challenge exists for.

✅ **Check:** at some point it has asked about failure, security, cost and
milestones.

### Step 4 — Check the read-back

**Why this step:** The read-back is the AI saying "here is what I heard."
Anything wrong or missing here goes into the design as if you had agreed to
it, so this is your last easy chance to fix it.

When the questions are done, it reads back every **numbered term** and asks
you to confirm. Read the whole list against your positions. Look for:

1. **Your central rule** as separate, consecutive terms, one rule per term.
2. **The platform posture terms:** one owner per table; AI never runs while
   someone is saving; any AI feature installs switched off.

If anything is missing or wrong, reply starting with `Not agreed yet.` and
say what to add or change, in one message. For example:
```
Not agreed yet. Add a term: an override can't be edited or deleted after it
is saved. Read the terms back again.
```
It reads the list back again. Repeat until it's right.

✅ **Check:** count the terms. Write the number in `LOG.md`.

### Step 5 — Confirm

**Why this step:** Only you can agree to the design. Typing the word yourself
makes sure the record holds what you chose, not what the computer guessed you
might say.

When the list is right, type this yourself, with **nothing else**:
```
Confirmed.
```
Type it. Never accept a suggestion that appears as grey text in the prompt
box: that's Claude Code guessing your next words, not you confirming. If
it asks to create the design file, check the file name and choose
**1. Yes**.

✅ **Check:** `docs/DESIGN-PriorityGuard.md` exists, and it has the same
number of terms you wrote down.

### Step 6 — Read it and sign it

**Why this step:** From here on, the code is held to this signed design. Reading
every term first means you know what you are agreeing to. Signing by hand
means a person, not the AI, takes responsibility for it.

Quit Claude (`/exit`). Open `docs/DESIGN-PriorityGuard.md` in a text editor.

1. Read every term. Is each one something you agreed?
2. Find the **rejected alternatives**. Is "let AI adjust the priority" there,
   with a reason, if you rejected it?
3. Sign it **yourself, in the editor**. Never ask Claude to. In **§9
   Approval**, fill in the one blank row, all four cells:
   ```
   | <your signing name> | <your role> | <today's date, YYYY-MM-DD> | <your signing name typed again> |
   ```
   Replace **every** `<…>`, including the angle brackets. A finished row looks
   like `| Sam Lee | incident manager (acting) | 2026-10-14 | Sam Lee |`. Save
   the file.

✅ **Check:** all four §9 cells hold real values. Placeholders such as `TBD`,
`-` or anything in `<…>` count as empty, and Module 5's build plan refuses a
record with an empty cell.

---

## Log it

- The question that surprised you most.
- **Catch:** if a challenge question changed your design (a new or changed
  term you wouldn't otherwise have had), that's a catch for `design`. One
  line per real change, for example:
  ```
  4 | design | <what the question exposed, and the term it added>
  ```

**Next:** [Module 5](MODULE-5-fence-and-plan.md). The design is signed. Now
the site gets a fence and a plan.
