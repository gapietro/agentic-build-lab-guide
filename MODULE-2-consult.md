# Module 2 — Consult: understand before building

*Workshop · 09:30 · 30 minutes · the first stage of five*

**In the workshop:** do Steps 1–6; Step 5 (push back) only if you need it.

[← Module 1](MODULE-1-prd.md) · [Lab home](README.md) · [Module 3 →](MODULE-3-research-and-lld.md)

---

## What you'll do

**Nothing gets built in this module. That's the point.**

The consult reads your accepted PRD (it calls it the brief) the way a
sceptical senior engineer would, and
answers the architecture questions before any code exists:

- For each of the six capabilities: **plain code**, an **AI skill**, or an
  **agent**?
  - Plain code does the same thing every time.
  - An AI skill is one call to a language model, for when the problem is
    language. `CONSULT.md` calls it a **Now Assist skill**.
  - An agent decides its own next steps while it runs.
  - Each costs more attention, and more money, than the one before.
- Which tables and roles the app needs, and who owns each table: the one
  thing allowed to write it, usually a piece of code (it may name a role
  that writes through a form).
- What any AI would cost.
- Is the brief ready to build, or does someone need to decide something first?

It leaves one file: `CONSULT.md`.

**The catch to watch for.** Read capabilities 2 and 6 in the PRD side by
side. One says the priority can never go below the floor. The other asks AI
to "adjust the priority". Does the consult notice that these pull against
each other?

---

## Before you start

**Why this step:** The consult reads your accepted PRD and nothing else. If the PRD isn't finished and signed, the advice you get is about the wrong brief.

- [ ] Module 0's pre-flight checks are all ticked.
- [ ] Module 1 is done: `ls ~/projects/priority-guard` shows only `app`
      (your app's repo, from pre-work) and `brief`, and
      `ls ~/projects/priority-guard/brief` shows only `PRD-PriorityGuard.md`,
      accepted by the customer. It has every
      customer answer from Module 1 Step 6 applied, says `None.` under Open
      decisions, and has a signed acceptance row.
      If your PRD doesn't match this, it isn't finished: go back to
      [Module 1 Step 4](MODULE-1-prd.md#step-4--check-the-evidence-yourself),
      check the evidence again, and finish Steps 5 and 6.

This module doesn't use your instance, so it doesn't matter if your PDI is
asleep.

---

## Steps

### Step 1 — 🔮 Predict it

**Why this step:** Your own answer, written first, is what you measure the consult against. Without it, it's easy to agree with whatever the tool says.

Before you run anything, write in `LOG.md`:
1. Which of the six capabilities would you build as plain code? Which
   need AI?
2. Is there anything in the brief you'd refuse to build as written? Why?

There are no wrong answers. You'll compare them with the consult's in step 4.

✅ **Check:** two answers, with a reason each, in your log.

### Step 2 — Run the consult

**Why this step:** The consult first plays the brief back to you in a few lines, so you can check it understood before it spends time on advice. A misunderstanding fixed here costs one line. Left in, it shapes everything the consult writes after.

1. **⌨️ You** (any folder): start Claude in the workspace:
   ```
   cd ~/projects/priority-guard
   claude
   ```
2. **🤖 Claude** (`~/projects/priority-guard`): type exactly this, **with
   nothing after it** (anything after it is read as the brief's file path).
   With nothing after it, it reads the one brief in `brief/`.
   ```
   /prove-it:consult
   ```

✅ **Check:** it restates the brief in **five bullets or fewer**, perhaps with
a few clarifying questions, asks you to reply `confirmed` or correct it, and
**stops**. It hasn't written `CONSULT.md` yet.

3. Read each bullet against the brief.
   - Answer any clarifying question in **one line**. If only the brief's owner
     could answer it, type `Unknown. Record it as an open decision.` **Never
     invent a business fact** to keep things moving.
   - To name a bullet, count the bullets from the top: the first is 1. Type
     the number with no brackets.
   - If a bullet says something the brief doesn't, type, for example,
     `Bullet 3 isn't in the brief. Drop it.`
   - If only **part** of a bullet isn't in the brief, type, for example,
     `In bullet 5, 'within a week' isn't in the brief. Remove that part.`
     Use your own bullet number and the extra words.
   - If a bullet contradicts the floor (for example, it lets AI change the
     priority freely), type, for example,
     `Bullet 3 contradicts capability 2. Correct it.`
   - If it asks about size, type `About 8–10 stories; we build the first few in one afternoon.`
   - If it asks whether your instance has Now Assist (or generative AI),
     type `No. Assume Now Assist isn't available.` The lab is built without
     it, so every pair gets the same consult.
   - Put all your answers and corrections in **one message**, one line each.
     **Enter** sends the message, so press **Shift+Enter** for a new line (if
     that doesn't make a new line, type `\` and then press **Enter**). Press
     **Enter** only when everything is in.
4. If you corrected anything, it restates the brief again and stops again.
   After answers alone, it may restate again or just ask you to confirm.
   Read any new bullets the same way. When the restatement is right, type
   exactly this, in a message on its own (lower case, no full stop):
   ```
   confirmed
   ```

⚠️ **If you see…** *it writes `CONSULT.md` before you confirm:* that's the
kit breaking its own rule. It isn't a catch: the process didn't find a
problem in your work. Write it in `LOG.md` and tell your instructor. Then
delete the file, run the consult again, and confirm when it asks.

### Step 3 — Let it run

**Why this step:** This is where the consult does its work and writes it down in `CONSULT.md`. Checking that `CONSULT.md` is the only thing it wrote keeps you in control: the consult advises, it doesn't change anything else.

The consult works for several minutes. In auto mode it writes `CONSULT.md`
without asking. If Claude Code does ask *Do you want to create CONSULT.md?*,
choose **1. Yes**. If it asks to write or change any other file, choose
**No** (the last choice) and note it in `LOG.md`: the consult writes only
`CONSULT.md`. If it asks to use your instance or your credentials, decline:
the consult never needs them.

When it's finished, check it wrote only that one file.

**🔍 Check** (`~/projects/priority-guard`): type:
```
Run exactly this and show me the raw output, unedited: ls -A ~/projects/priority-guard
```
Read the command's own output (the tool result), not Claude's summary of it.
In Claude Code, that's the line starting with **⏺** that shows the command,
and the lines starting with **⎿** under it. If you see `… +N lines`, press
**Ctrl+O** to see all of it. (More in
[the README, section 7](README.md#7-how-to-read-a-module).)
You should see `app`, `brief` and `CONSULT.md`. (`app` is your app's repo,
from pre-work.) A `.claude` folder is fine too: that's Claude Code's own.
Anything else, note it in `LOG.md`.

✅ **Check:** `CONSULT.md` exists in `~/projects/priority-guard`, next to `brief/`. It
has a row for each of the **six** capabilities, each marked plain code, Now
Assist skill or agent, with a reason. It has a **Cost** section, and a
**Readiness** table that rates each requirement **ready**, **conditional**
or **not ready**.

The consult's closing message sums up its advice, including each
capability's choice. Your prediction from Step 1 is already in `LOG.md`.
Don't change it. If you do, write down that you did.

⚠️ **If you see…**
- *an error or a stall:* retry up to twice, and note each retry in
  `LOG.md`. On the third failure, stop and ask your instructor. That's the
  "error brake": three failures on one approach means stop and find out why.
- *its closing message says "Next: `/prove-it:design-challenge` reads this
  `CONSULT.md`":* that's the kit's usual next step. In this lab, research
  and the LLD come first (Module 3), and the design challenge is Module 4.
  Don't run it now.
- *grey `/prove-it:design-challenge` text in the prompt box, which you didn't
  type:* that's Claude Code guessing your next prompt from the consult's last
  line. It can appear after any reply until you quit. Leave it: **Tab** or
  the **Right arrow** key would put it in the box. It disappears as soon as
  you start typing anything, whether that's Step 5's question or `/exit` in
  Step 6.

### Step 4 — Read it like a reviewer

**Why this step:** Advice is only useful if someone checks it. Reading `CONSULT.md` yourself, outside Claude, and against your prediction is how you spot advice you don't agree with.

Open `CONSULT.md` in a text editor (not in Claude). Find:

1. **Capability 6, "Smart urgency".** What did the consult recommend, and
   why?
2. **Capabilities 2 and 4.** In the **Data and ownership** section, what
   owns the decision to go below the floor: which code (or, if it names
   one, which role working through a form)?
3. **The Readiness table.** Is any requirement rated **conditional** or
   **not ready**? What is it waiting for? (There's no single verdict: the
   brief is ready to build only if every row says **ready**.)

Now compare with your prediction from step 1.

✅ **Check:** you can say in one sentence what the consult did with
capability 6.

### Step 5 — Push back if you need to

**Why this step:** The consult gives advice, and you decide. If its advice doesn't fit what the PRD says, a direct question gives it the chance to put that right, and your log shows who spotted it.

If the consult let AI change the priority directly, in either direction, ask:
```
Capability 2 says an incident on a critical service can never be saved
below its floor. If AI adjusts the priority in capability 6, can it lower it
below the floor? If it can, what should change?
```
Read the answer. If it changes its recommendation, have it record the change:
```
Update CONSULT.md: capability 6 <the new decision>, with that reason.
```
Replace `<the new decision>` with what it just recommended. It edits
`CONSULT.md` (if it asks first, choose **1. Yes**). Then open `CONSULT.md`
and read the change.

**Is it a catch?**
- If the consult raised the conflict **on its own** (in step 3's output, before
  you asked), that's a catch for `consult`.
- If it changed only after **you** pushed back, it isn't a catch for the
  process. Write in `LOG.md` that you caught it. That's still the lesson:
  the person decides.

✅ **Check:** your `CONSULT.md` says either that AI can't lower the
priority, or that capability 6 is deferred or reworked.

### Step 6 — Close

**Why this step:** `CONSULT.md` is the record of what the consult advised, and Module 4 reads it later. Leaving it as it is keeps that record honest.

1. **🤖 Claude:** type `/exit` to quit Claude. If grey text is in the prompt
   box, it disappears as soon as you start typing `/exit`.
2. Don't hand-edit `CONSULT.md`. Module 4 reads it as it is. A change
   Claude made at your request in Step 5 is fine.

---

## Log it

- In `LOG.md`: your prediction against the consult's answer, in one line.
- In `catches.md`, only if the consult raised it itself:
  ```
  2 | consult | capability 6 could lower a priority below the floor
  ```
- **Not catches here** (write them in `LOG.md` instead): anything you
  supplied (your answers, `Unknown. Record it as an open decision.`, your
  corrections to its bullets), an open decision on its own, a change it made
  only after you pushed back, or your prediction being wrong.

**Next:** [Module 3](MODULE-3-research-and-lld.md). The consult is advice. Before anyone
designs in detail, you need facts about the platform. Nobody has
challenged it yet, or signed it.
