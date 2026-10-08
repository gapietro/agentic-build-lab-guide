# Module 1 — From inputs to a PRD

*Day 1 · about 60 minutes · before the consult*

[← Module 0](MODULE-0-prework.md) · [Lab home](README.md) · [Module 2 →](MODULE-2-consult.md)

---

## What you'll do

Real work never starts with a clean brief. It starts with a **use case**
someone wrote, **workshop conversations**, and **technical documents** about the
customer's systems. Someone turns the first two into a **PRD**: the
requirements everyone agrees to build. The technical documents come in later,
when you research the platform (Module 3).

In this module you're handed a PRD, drafted by the platform team from two
inputs. Your job is to **review it against the inputs**, like the person
who has to sign it. Then the customer (your instructor) accepts it, and it
becomes what the rest of the lab builds from.

**Why review, and not just accept it?** A PRD is a summary, and summaries
drift. It can say something nobody asked for, or quietly drop something
somebody did ask for. Both are cheap to fix now and expensive later.

**The catch to watch for.** Is everything in the PRD backed by an input? Is
everything important in the inputs in the PRD?

---

## Before you start

**Why this step:** This module needs a working bench and an empty workspace. If something is already in the workspace, it gets mixed in with the PRD you accept later.

- [ ] Module 0's pre-flight checks are all ticked.
- [ ] `ls -R ~/projects/priority-guard` shows only an empty `brief/` folder,
      exactly like this (with your own user name in place of `<you>`):
      ```
      brief

      /Users/<you>/projects/priority-guard/brief:
      ```

---

## Steps

### Step 1 — Read the inputs yourself

**Why this step:** You can only judge a summary if you know what it summarises. Reading the inputs yourself, without Claude, gives you your own view to check everything else against.

In your lab guide folder, read these two files, **not in Claude**:
- `files/inputs/USE-CASE.md`: what the incident manager asked for
- `files/inputs/WORKSHOP-NOTES.md`: the discovery workshop

✅ **Check:** you can say, in one sentence each, what the incident manager,
the service owner and the service desk lead each want.

### Step 2 — 🔮 Predict it

**Why this step:** Writing down what you expect before you look keeps you honest. Afterwards you can see where your own reading held up and where it didn't, which is hard to tell once you've seen the answer.

Before you open the PRD, write in `LOG.md` the three things you'd expect a
good PRD for this to contain, and one thing the inputs disagree about, if
you found one.

### Step 3 — Trace the PRD with Claude

**Why this step:** Claude can check every line of the PRD, the written list of what gets built, against the inputs much faster than you can by hand. The scratch folder holds only these three files, so nothing else gets into its answer.

Make a scratch folder for the review, so the review doesn't mix with your
workspace.

**⌨️ You** (any folder):
```
mkdir -p ~/projects/priority-guard-prd-review
cp ~/projects/agentic-build-lab-guide/files/inputs/USE-CASE.md ~/projects/agentic-build-lab-guide/files/inputs/WORKSHOP-NOTES.md ~/projects/agentic-build-lab-guide/files/PRD-PriorityGuard.md ~/projects/priority-guard-prd-review/
cd ~/projects/priority-guard-prd-review
claude
```
**🤖 Claude** (`~/projects/priority-guard-prd-review`): type:
```
Trace PRD-PriorityGuard.md against the two input files here. For every
capability and requirement in the PRD, quote the input sentence that
supports it, or say "no source". Then list every input statement that
changes what gets built but isn't in the PRD. Quote, don't paraphrase.
Don't fix anything, and don't edit any file.
```

✅ **Check:** you get two lists: PRD items with a quoted source (or "no
source"), and input statements the PRD leaves out.

### Step 4 — Check the evidence yourself

**Why this step:** Claude's trace is a claim, not a fact. You only act on what you've seen in the files with your own eyes, so a wrong finding never makes it into the PRD.

Claude's trace is a claim. Check it:
1. For **two** PRD items Claude says are supported, find the quoted sentence
   in the input file yourself.
2. For every item it marks **"no source"**, search the inputs yourself before
   you believe it.
3. For every input statement it says the PRD leaves out, find it in the PRD
   yourself before you believe it.

✅ **Check:** you've confirmed or rejected each finding with your own eyes.
Write in `LOG.md` any finding you rejected, and why.

### Step 5 — Decide what to do with each gap

**Why this step:** Each kind of gap has its own fix, and the rules stop you making decisions that belong to the customer. Editing by hand means you know exactly what changed and why.

**🤖 Claude:** type `/exit` to quit Claude. For each real gap, decide:
- **The PRD says something no input asked for:** take it out, unless the
  customer confirms they want it.
- **An input asks for something the PRD dropped:** put it back, **inside the
  capability it belongs to**. Never add a new capability number.
- **The inputs disagree, or leave a detail undecided** (who decides, how it
  works): write it under **7. Open decisions**. Never pick a side, or invent
  the detail, for the customer.

**✏️ Editor:** edit `~/projects/priority-guard-prd-review/PRD-PriorityGuard.md` in your text
editor (VS Code), **by hand**. Keep the capability numbers of anything you don't remove.

✅ **Check:** every gap you found is either fixed in the PRD or listed as an
open decision.

### Step 6 — Customer acceptance

**Why this step:** The PRD is the agreement the rest of the lab builds from. The customer's sign-off turns your draft into that agreement, and one set of answers for the whole room means every pair builds the same thing.

Your instructor plays the customer, and answers the room's open decisions
together, once, so every pair builds the same thing. This happens at about
**09:45**, for the whole room at once. If you finish Step 5 early, wait for
it. If you missed it, ask your instructor: they have the answers written
down. Record each answer in
the PRD, in the capability it affects, and remove it from Open decisions. If
you found something the customer doesn't answer, ask before you accept.

When nothing is open, fill in **8. Acceptance** with the customer's name and
role as your instructor gives them, today's date, and the customer's name
again as the signature. Then move the PRD into your workspace.

**⌨️ You** (any folder):
```
cp ~/projects/priority-guard-prd-review/PRD-PriorityGuard.md ~/projects/priority-guard/brief/
```

✅ **Check:** `ls -R ~/projects/priority-guard` shows only `brief/PRD-PriorityGuard.md`,
exactly like this (with your own user name in place of `<you>`):
```
brief

/Users/<you>/projects/priority-guard/brief:
PRD-PriorityGuard.md
```
In that PRD:
- **3. Capabilities requested** has every customer answer applied: anything
  the customer said to remove is gone, anything they said to keep is still
  there, and every capability keeps its original number.
- **7. Open decisions** says `None.`
- **8. Acceptance** has a name, role, date and signature.

⚠️ **If you see…** *open decisions still listed, or a capability the customer kept is missing:* the
customer's answers weren't applied (easy to miss if you had help editing the
PRD). Apply them now, before Module 2: the consult reads this file as the
brief, and its questions will be different if it isn't right.

---

## Log it

- Your prediction against what you found.
- In `catches.md`, one line per real gap you fixed in the PRD:
  ```
  1 | prd | <what the PRD said or missed, and what you changed>
  ```

**Next:** [Module 2](MODULE-2-consult.md). The consult reads your accepted PRD.
