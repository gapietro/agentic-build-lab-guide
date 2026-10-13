# Module 4 — Design approval: nothing is built until you sign

*Workshop · 11:25 · 45 minutes*

**In the workshop:** do all six steps.

[← Module 3](MODULE-3-research-and-lld.md) · [Lab home](README.md) · [Module 5 →](MODULE-5-fence-and-plan.md)

---

## What you'll do

`CONSULT.md` is **advice**. Nobody has pushed back on it, asked how it fails,
or signed it. In this module you do all three:

1. **You design.** You wrote your design positions at the end of Module 3,
   before the challenge starts. The kit doesn't design anything.
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

- [ ] `~/projects/priority-guard/CONSULT.md` exists, and you haven't
      hand-edited it. A change Claude made at your request in Module 2
      Step 5 is fine.
- [ ] `~/projects/priority-guard` holds `app/` (from pre-work), `brief/`,
      `CONSULT.md`, `inputs/` and `docs/`, with `docs/LLD-PriorityGuard.md`
      signed by you (Module 3).
- [ ] Your positions list is in `LOG.md` (Module 3 Step 8).

---

## Steps

### Step 1 — Get your positions ready

**Why this step:** Answers made up on the spot can contradict each other.
Answering from the list you wrote at the end of Module 3 keeps your answers
steady.

**✏️ Editor:** open `LOG.md` and find the positions list you wrote in
[Module 3 Step 8](MODULE-3-research-and-lld.md#step-8--write-your-module-4-positions).
Read it through once. Any line still blank? Fill it in now, from your signed
LLD.

✅ **Check:** every line has your answer. The central rule is at least two
separate sentences.

### Step 2 — Start the challenge

**Why this step:** This starts the challenge, where the AI asks hard questions
about your design. It asks one at a time, so each answer gets your full
attention instead of getting lost in a pile.

1. **⌨️ You** (`~/projects/priority-guard`): start Claude in the workspace:
   ```
   cd ~/projects/priority-guard
   claude
   ```
2. **🤖 Claude:** type exactly this, **with nothing after it** (anything after it is read as
   a file path):
   ```
   /prove-it:design-challenge
   ```
3. It proposes a feature name. Reply:
   ```
   PriorityGuard
   ```
4. It asks you to describe the design in your own words. Type your sentences
   from your positions list.

✅ **Check:** from now on, **every turn that needs your answer ends with
exactly one question.** The read-back (Step 4) ends with
"Confirm these N terms, or correct any." instead, and the last turn, after
you confirm, asks nothing.

### Step 3 — Answer, one question at a time

**Why this step:** Each question is a chance to find a weak spot while it is
still on paper, where it is cheap to fix. Answering from your list keeps the
record consistent.

Answer each question from your positions list. **Keep each answer to one
line or two.** When it asks how something fails, or about security, answer
from LLD §3 (logic), §4 (security), §5 (failure modes) and §7 (research
log).

**Typing answers in Claude.** Pressing **Enter** sends your message. For an
answer of several lines, write it in your editor first and paste the whole
answer in at once, or press **Shift+Enter** for a new line. If Shift+Enter
doesn't make a new line in your terminal, type `\` and then press **Enter**.

**Grey text you didn't type.** After a question, the prompt box may show a
reply in grey, for example `yes, use PriorityGuard`. That's Claude Code
guessing your answer, and it often makes a design decision for you. It isn't
your answer. Don't press **Tab** or the **Right arrow** key, which put it in
the box. Type your own answer from your list: the grey text disappears as
soon as you start typing. This holds
for every turn of the challenge, including the read-back.

When it asks about a capability the customer **deferred**, answer
`Out of scope for this record; deferred to a later release.` Never answer
`Not decided` for a deferred capability: that writes an OPEN term, and an
OPEN term fails the grade. If it asks
something your list doesn't cover:
- If it's a real decision, make it, and add it to your list.
- If only the business can decide, say `Not decided. Record it as open.`

**Write down the questions that surprised you.** Those are the ones the
challenge exists for.

✅ **Check:** at some point it has asked about failure, security, cost,
boundaries (what the app won't do) and milestones.

⚠️ **If you see…** *it's about to read the terms back, but it never asked
about one of those topics:* type, with the topic in place of `<topic>`:
```
You haven't asked about <topic>. Ask before the read-back.
```

### Step 4 — Check the read-back

**Why this step:** The read-back is the AI saying "here is what I heard."
Anything wrong or missing here goes into the design as if you had agreed to
it, so this is your last easy chance to fix it.

When the questions are done, it reads back every **numbered term** and asks
you to confirm. Read the whole list against your positions. Any question you
answered with `Not decided. Record it as open.` is in the list too, marked
`OPEN`. That's expected: the kit writes exactly the list you confirm, `OPEN`
terms included. Look for:

1. **Your central rule** as separate, consecutive terms, one rule per term.
2. **The platform posture terms:** one owner per table; AI never runs while
   someone is saving; any AI feature installs switched off.

**Expect to add some of these yourself.** The kit only turns your answers
into terms, and your positions list never mentions the posture terms, so the
first read-back often leaves them out. It may also merge or reword your
central rule. Adding them is the normal path, not a sign something went
wrong, and not a catch.

If anything is missing or wrong, reply starting with `Not agreed yet.` and
say what to add or change, in one message. For example:
```
Not agreed yet. Add a term: an override can't be edited or deleted after it
is saved. Read the terms back again.
```
If your central rule or any posture term is missing, merged or weaker than
you wrote it, type this, with your own central-rule sentences from `LOG.md`
in place of the ones in quotes:
```
Not agreed yet. Add my central rule as consecutive terms, one sentence each,
word for word: "<sentence 1>" "<sentence 2>" "<sentence 3>". Add these as
separate terms if they're missing: every table the app writes has one owner;
AI never runs while someone is saving; any AI feature installs switched off.
Replace any weaker term that says the same thing. Read the terms back again.
```
It reads the whole list back again, with its new count. Repeat until it's
right.

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
number of terms you wrote down. It ends by saying a person signs this, not
the AI. If any terms are marked `OPEN`, write their numbers (for example
`C9`) in `LOG.md`, or write `none`.

### Step 6 — Read it and sign it

**Why this step:** From here on, the code is held to this signed design. Reading
every term first means you know what you are agreeing to. Signing by hand
means a person, not the AI, takes responsibility for it.

**🤖 Claude:** type `/exit` to quit Claude. Open `docs/DESIGN-PriorityGuard.md` in a text editor.

1. Read every term. Is each one something you agreed?
2. Any term marked `OPEN`? Each one fails the grade in Module 8. If you can
   decide it now from your LLD, replace `OPEN` with your answer, by hand,
   and note it in `LOG.md`. If only the business can decide, leave it: in
   Module 5 the build plan turns it into a story that asks for a decision.
3. Find the **rejected alternatives**. Is "let AI adjust the priority" there,
   with a reason, if you rejected it?
4. Sign it **yourself, in the editor**. Never ask Claude to. In **§9
   Approval**, find the existing empty row, `| | | | |`, and type your
   values between its bars, all four cells: your signing name, your role,
   today's date (YYYY-MM-DD), and your signing name typed again. **Don't
   add a new row.** You sign as the designer, so your role is, for example,
   `developer`. (The customer signs only once, in Module 1's PRD
   acceptance.) A finished row looks like
   `| Sam Lee | developer | 2026-10-14 | Sam Lee |`. Save the file.

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
- **Not catches** (write them in `LOG.md` instead): a term **you** added or
  fixed at the read-back (Step 4), such as your central rule or a posture
  term; a gap the challenge found but left `OPEN`; and an `OPEN` term you
  decided yourself in Step 6. An `OPEN` gap becomes a catch only when it's
  decided later (through the build plan's ruling story) and the design
  changes because of it.

**Next:** [Module 5](MODULE-5-fence-and-plan.md). The design is signed. Now
the site gets a fence and a plan.
