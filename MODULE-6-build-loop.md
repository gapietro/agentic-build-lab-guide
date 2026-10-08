# Module 6 — The build loop

*Day 2 afternoon and Day 3 morning · about 5 hours · stage three of five*

[← Module 5](MODULE-5-fence-and-plan.md) · [Lab home](README.md) · [Module 7 →](MODULE-7-break-it.md)

---

## What you'll do

Claude is the crew: it writes the code and the tests. It **never** decides
on its own that its work is good enough. A review of every change, and tests
that must pass, decide.

You run **the build loop**, one story at a time:

1. **Open:** Claude reads `SESSION-NOTE.md` and `BACKLOG.md` and proposes
   the next story.
2. **Confirm:** Claude restates the story in five bullets. You reply with
   one word: `confirm`.
3. **Tests first:** Claude writes tests and runs them **red**, then writes the
   code and runs them **green**.
4. **Ship:** you type `ship it`. It pushes, opens a pull request, reviews,
   fixes the findings once, and merges when green.
5. **Reset:** `/clear`, and the next story starts clean, from the files.

You take stories **in the order your plan ranks them**, never the one you
expected. Somewhere in the first few you'll meet these two, and they're what
this module is about:
- **The floor itself:** plain code that, given a priority and a service's
  floor, returns the priority to save. Tests only. No instance.
- **Wiring it in:** the critical services list, and the rule on the incident
  table that applies the floor and writes the work note.

Other stories, such as a test harness or a table, may come first. Build
them the same way. On Day 3 morning you install the app and check it live. In the workshop,
the override (capability 4) and the weekly count (5) stay on the board for
later. **If you're building the whole app**, step 12 takes you the rest of
the way.

**The idea to watch for.** The floor is plain code that sees only plain
data, and the ServiceNow parts are a thin layer around the outside. That's
why the floor's tests run in seconds with no instance at all.

**The catch to watch for.** The review on `ship it` reads code you didn't
write, and code Claude wrote and was sure of. Does it find something real?

---

## Before you start

- [ ] Module 5 is done: the plan is merged and `main` is clean.
- [ ] `gh issue list` shows your stories.
- [ ] Your PDI is awake.
- [ ] You have **two terminal windows** open, side by side, as in Module 5.

### Where each step happens

Every action is labelled with **where** you do it, as in Module 5:

| Label | What it is | Folder |
|---|---|---|
| **⌨️ Shell** | Terminal window 2: a normal terminal for `git`, `gh`, `now-sdk` and `npm`. Never Claude | `~/projects/priority-guard/app` |
| **🤖 Claude** | Terminal window 1: Claude Code, started with `claude`. Type prompts and kit commands here, never shell commands | `~/projects/priority-guard/app` |
| **✏️ Editor** | Your text editor, for files you write or read **yourself**, such as `LOG.md` | — |
| **🌐 Browser** | GitHub, and your PDI in your **admin** or **agent** browser profile | — |

If a block doesn't start with a label, it belongs to the label just above it.

---

## The first story

### Step 1 — Open the session

**Why this step:** Each session starts from the files, not from what you or
Claude remember. Pulling `main` first means you start from the latest merged
work, and re-checking blockers stops Claude trusting a note that's out of date.

**⌨️ Shell:** `cd ~/projects/priority-guard/app && git switch main && git pull`.

**🤖 Claude:** start Claude in `~/projects/priority-guard/app` and type the session open:
```
Read BACKLOG.md and SESSION-NOTE.md. Re-check the live state of any
blocker they mention. Then tell me the top three items by gate distance.
```

✅ **Check:** Claude names three stories, closest to the next milestone
first.

### Step 2 — Take the top story, and confirm it

**Why this step:** The plan ranks stories by how close they are to unblocking
the next gate. Picking the one you expected instead breaks that order. The five
bullets are your chance to fix a misunderstanding before any code is written.

**✏️ Editor:** write the top three in `LOG.md`.

**🤖 Claude:** take whatever is **actually** top:
```
Take the top one.
```
If the top story isn't the floor, build it anyway: your instructor tells you
whether to build another before the floor. (Building the whole app: build
them all, in the plan's order.)

Claude restates the story in **five bullets**. Read them against the design.
If they're right, type `confirm`. If not, say what's wrong in one line.

✅ **Check:** Claude starts on a **new branch**, not on `main`. When this is
the floor story, the bullets mention your central rule, and one says the
floor's logic makes **no platform calls**.

### Step 3 — 🔮 Predict it

**Why this step:** Writing your own test cases before you see Claude's gives
you something to compare against. If you look at Claude's first, its list
quietly becomes yours, and you lose the chance to see what either of you missed.

**✏️ Editor:** in `LOG.md`, list three test cases **you** would write for the floor. Think
about the edges: a priority exactly at the floor, a service with no floor, a
priority already higher than the floor.

### Step 4 — Tests first, red

**Why this step:** A test that has never failed hasn't proved anything: it
might pass whatever the code does. Seeing each test fail before the code exists
shows it can catch a mistake, and it pins down what "done" means up front.

**🤖 Claude:** type:
```
Tests first. Start each test's name with the design term it proves, like "C<n>: the floor can raise a priority, never lower it", using the term's real number from docs/DESIGN-PriorityGuard.md.
Show me them failing before any implementation.
```
(Leave `C<n>` as written. Claude fills in the real number.)

**Why the names matter:** in Module 8, the grade counts a design term as
tested only if a test's name includes its id.

If the project has no `test` script yet, this story must add one. Ask Claude
(**🤖 Claude**) if you don't see one in `package.json` (**✏️ Editor**).

✅ **Check:** the tests run and **fail**, because the code doesn't exist yet.
Compare them with your three predicted cases. Which did Claude miss? Which
did you?

### Step 5 — Green, and look at the shape

**Why this step:** Passing tests show the code does what the tests ask.
Looking at its shape checks the design idea: logic that works on plain values,
with ServiceNow kept outside it, can be tested in seconds with no instance.

**🤖 Claude:** let Claude write the code until the tests pass. Then, in
**✏️ Editor**, open the code file and look: does the floor function call ServiceNow anywhere?

✅ **Check:** the tests pass, and the floor logic takes plain values and
returns plain values. No platform calls inside it.

### Step 6 — Ship it, and read the review

**Why this step:** Claude wrote both the code and the tests, so it can't be
the judge of them. The review is a second reader, and a pull request (a
request to add your change to the main copy) can't merge without it. Reading
every finding yourself is how you tell a real problem from noise.

**🤖 Claude:** type:
```
ship it
```
**🌐 Browser:** open the pull request on GitHub. If Claude doesn't run `/code-review`
itself, type it (**🤖 Claude**). **Read every finding.**

A **catch** is a finding that is real **and gets fixed**. Style nits and
wrong findings don't count.

✅ **Check:** the review ran, its findings were fixed once, and the pull
request is **merged**.

### Step 7 — Reset

**Why this step:** The next story starts from the files, not from this
conversation. Clearing it means guesses and leftovers from this story can't
leak into the next one.

**🤖 Claude:**
```
/clear
```

---

## The next stories, to the wiring

### Step 8 — The same loop, until the floor is wired in

**Why this step:** Every story goes through the same steps, so every piece of
code gets tests and a review, not just the first one. This story is where the
floor meets real incidents, so you check Claude's plan against the design
before it writes any code.

Run steps 1, 2, 4, 5, 6 and 7 again for each story the plan ranks next,
until the story that wires the floor into ServiceNow is merged: the
critical services list, and the rule on the incident table that applies the
floor and writes the work note. If you stop for lunch or a break, run step
11's session close first, and start again from step 1.

Before you type `confirm` (**🤖 Claude**), check the five bullets answer these. If one
doesn't, say so:
- **When** does the rule run: before the incident is saved?
- What does it write in the work note?
- Does **anything** in this story let the priority go lower than the floor?

✅ **Check:** merged, after a review, with tests green.

### Step 9 — Build and install

**Why this step:** Tests prove the code works on its own. Installing puts the
app on your instance, so you can see what it does on the real platform.
Building from a clean, up-to-date `main` means you install exactly what was
reviewed.

**⌨️ Shell**, on a clean, up-to-date `main`:
```
now-sdk build
now-sdk install --auth <PDI_ALIAS>
```
Always `--auth`. Never `--alias`: on `install` it's silently ignored, and the
app goes to whatever instance is the default.

✅ **Check:** the install succeeds and prints a link to your app.

### Step 10 — Try it live, as an ordinary agent

**Why this step:** Passing tests on your laptop don't prove the app works on
the instance. You test as an ordinary agent, not as admin, because an admin
can do things real users can't, and that can hide problems.

All in **🌐 Browser**:

1. In your **admin** profile, mark one business service as critical, with
   a floor of 2, using your app's list.
2. In your **agent** profile, logged in as `<AGENT_USER>`, create an incident
   on that service with impact 3 and urgency 3, and save.

✅ **Check:** the saved priority is **P1 or P2**, and the incident has a work
note explaining the raise.

⚠️ **If you see…** *the priority stayed low:* that's a real defect found on
the instance. Once it's fixed and merged, it's a **catch** for `test`. Describe what you saw to Claude in one
sentence (**🤖 Claude**), and let it fix it through the loop (a story, tests, `ship it`).
Don't fix it by hand on the instance.

### Step 11 — Close the session

**Why this step:** Claude forgets everything when the session ends, so the note
is how the next session knows where you stopped. Reading it yourself stops a
claim nobody checked from being written down as fact.

**🤖 Claude:**
```
We're stopping here. Update SESSION-NOTE.md: what's proven, what's
open, the exact next step, and the top three next items.
```
Read what it wrote. If it says something is "verified" that you haven't
seen work on the instance, correct it.

### Step 12 — If you're building the whole app

**Why this step:** A real handoff needs every story built, installed and shown,
not just the floor. Going gate by gate, by the live count, keeps you on what's
actually in the way. Each gate also needs evidence, or the grade can't count it.

**🤖 Claude:** keep running the loop, steps 1–7, one story at a time, **in the plan's order**,
until the **MERGE, INSTALL and DEMO** counts are all zero. Leave the
`gate:handoff` stories open: Module 8 closes them.

**Which gate is next.** The gates go in order: `merge`, `install`, `demo`,
`handoff`. The next one is the **first whose count isn't zero**. Run this
for each in order in **⌨️ Shell**, swapping in the gate's name, in lower case:
```
gh issue list --state open --label "gate:<gate>" --limit 5000 --json labels --jq '[.[] | select(all(.labels[]; .name != "register"))] | length'
```
`BACKLOG.md` is a snapshot from when the plan was filed. Closing stories
doesn't update it, so it goes stale. **The live count is the truth.**

**Two more users, after the first install.** The first install creates the
app's own roles. Then, as admin (**🌐 Browser**, admin profile):
- create `im.demo`, an incident manager: `itil` plus the app's override role
  (from your design), and write the role in your values table as
  `<OVERRIDE_ROLE>`;
- create `owner.demo`, a service owner: `itil` only, and set it as **Owned
  by** on the Payroll business service;
- set a password for both.

Run each live check (**🌐 Browser**) as the right person: the floor as `<AGENT_USER>`, an
override as `im.demo`, an approval as `owner.demo`. On your own, log in as
each in turn, or impersonate them from your admin profile.

Along the way:
- **The override with Tier 1 approval** is the hardest story. Before you type
  `confirm`, its five bullets must say who approves, where the approval is
  recorded, and what the incident does while it waits. If one is missing,
  say so.
- **Every design term needs a test** whose name carries its id, including
  **boundary and posture terms**. For example: a test that the app's source
  makes no AI calls, and doesn't touch the priority lookup or the SLA
  definitions. A term with no test caps the grade.
- **Seed the demo data as source** in the app (`src/`), as your design says.
  The grade checks for it.
- After any story that changes what's on the instance, **build and install**
  again (step 9, **⌨️ Shell**), and re-run your live checks. Add checks as stories land:
  an override with a reason, a Tier 1 override waiting for approval, and the
  weekly count.
- **The INSTALL and DEMO stories need evidence**, or the grade can't count
  those gates:
  - close the **INSTALL** story with a comment recording the install and the
    live check, as which user, and when;
  - for **DEMO**, show the working app, live, to whoever plays the customer,
    as an ordinary agent, then close the story with a comment recording who
    saw what, as which user, and when.
- **Between stories,** a session close updates `SESSION-NOTE.md` on `main`.
  Commit it as the first commit on the next story's branch, so `main` stays
  clean.

✅ **Check:** the MERGE, INSTALL and DEMO counts are zero, the app is installed
from the latest `main`, every live check passes as the right user, and the
INSTALL and DEMO stories are closed with their evidence.

---

## Log it

- Your predicted test cases against Claude's.
- One line per real, fixed review finding, and per live defect:
  ```
  6 | review | <what it found>
  6 | test | <what went red for a real reason>
  ```

**Next:** [Module 7](MODULE-7-break-it.md). Tomorrow, your partner tries to
break what you built.
