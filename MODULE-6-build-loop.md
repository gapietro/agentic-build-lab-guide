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

You run that loop **by hand once**, on the first story, so you see every
check happen. Then you hand the next stories to Claude, which runs the same
loop with several **sub-agents** at once, while you read the evidence (step 8).

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
- [ ] Your stories are filed. You check this in step 1, once Claude is open.
- [ ] Your PDI is awake.
- [ ] You have **two terminal windows** open, side by side, as in Module 5.

### Where each step happens

Every action is labelled with **where** you do it, as in Module 5:

| Label | What it is | Folder |
|---|---|---|
| **🤖 Claude** | Terminal window 1: Claude Code, started with `claude`. Type the prompt or kit command shown, or `/exit` to quit Claude; Claude runs any commands it needs | `~/projects/priority-guard/app` |
| **🔍 Check** | Terminal window 1: a prompt that asks Claude to run one check command. Read the **raw output** of the command itself, not Claude's summary of it | `~/projects/priority-guard/app` |
| **⌨️ You** | A normal terminal where **you** type the command yourself, never Claude: window 2, or window 1 before you start Claude | `~/projects/priority-guard/app` |
| **✏️ Editor** | Your text editor, for files you write or read **yourself**, such as `LOG.md` | — |
| **🌐 Browser** | GitHub, and your PDI in your **admin** or **agent** browser profile | — |

If a block doesn't start with a label, it belongs to the label just above it.

---

## The first story

### Step 1 — Open the session

**Why this step:** Each session starts from the files, not from what you or
Claude remember. Pulling `main` first means you start from the latest merged
work, and re-checking blockers stops Claude trusting a note that's out of date.

**🤖 Claude:** if a session is still open from Module 5, type `/exit`.

**⌨️ You** (`~/projects/priority-guard/app`), in window 1: start Claude.
```
cd ~/projects/priority-guard/app && claude
```

**🤖 Claude:** bring `main` up to date:
```
Run git -C ~/projects/priority-guard/app switch main && git -C ~/projects/priority-guard/app pull, and show me the output. Change nothing else.
```
**🔍 Check:** confirm your stories are filed:
```
Run exactly this and show me the raw output, unedited: gh issue list
```

**🤖 Claude:** type the session open:
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

### Step 8 — Accelerate: let sub-agents run the loop to the gate

**Why this step:** You've now run the loop once by hand, so you know what each
check is for. Typing the same steps for every story teaches nothing new. Here
Claude coordinates several helpers, called **sub-agents**, that run the same
loop on the next stories at the same time. The checks don't change: every
story is still tested first, reviewed and merged on green. What changes is
your job. You stop typing commands and start reading the evidence.

**🤖 Claude:** run `/clear` (or start a fresh session: **🤖 Claude:** type
`/exit`, then **⌨️ You:** `claude`), then step 1's prompt
that brings `main` up to date, then the session open from step 1. Then type
this prompt. Choose the **Stop when** line that fits,
and delete the other:

```
Run the build loop on the next stories for me, using sub-agents to go faster.
You are the coordinator: plan, delegate, merge and report. Don't write
feature code yourself.

Scope: open stories on the next gate, in the order the live board and
BACKLOG.md rank them.
Stop when: the story that wires the floor into the incident table is merged.
Stop when: no open stories are left on the next gate.

Give each story to one sub-agent, working in its own git worktree on its own
branch. Each sub-agent must:
1. Read CLAUDE.md, the story's issue, and the design terms it implements in
   docs/DESIGN-PriorityGuard.md.
2. Restate the story in five bullets, and put them at the top of the pull
   request description.
3. Write the tests first. Start each test's name with the design term it
   proves ("C<n>: ..."), using the term's real number. Run them and save the
   failing output.
4. Write the code until the tests pass, run the whole test suite, and save the
   passing output.
5. ship it, exactly as CLAUDE.md defines it. The pull request description
   holds the five bullets, the failing run, the passing run, and every review
   finding with what was done about it.

Rules:
- Run stories at the same time only if they don't change the same files and
  neither needs the other. Otherwise run them one after another.
- Merge one pull request at a time. Before each merge, update the branch from
  the latest main and run the tests again.
- Never merge with a failing test, and never skip /code-review.
- If a story fails the same step three times, stop that story, leave its pull
  request open, and tell me why.
- Stop everything and ask me if a story needs a design change, a business
  decision, or anything on the instance. Never run now-sdk install.
- Don't create, close or re-label issues by hand. A story closes when its
  pull request merges.

When you're done, give me one table: story, pull request, failing and passing
test counts, review findings and what was done, merged or stopped (and why).
Then the live count of open stories on the next gate.
```

Use the first **Stop when** in the workshop. Use the second if you're
building the whole app (step 12).

While it runs, watch rather than type. Claude may ask you to approve
something. Read it first, and decline anything that touches your instance or
your credentials.

When it reports, read the table, then check the evidence yourself:

1. **🌐 Browser:** open **every** merged pull request on GitHub. Each one shows
   the five bullets, a failing run before a passing run, and the review's
   findings.
2. For the story that wires the floor in, check its five bullets answer these:
   - **When** does the rule run: before the incident is saved?
   - What does it write in the work note?
   - Does **anything** in this story let the priority go lower than the floor?
3. **⌨️ You** (`~/projects/priority-guard/app`), in window 2, not Claude:
   ```
   cd ~/projects/priority-guard/app && git switch main && git pull
   npm test
   ```
   Everything passes.

✅ **Check:** every story in scope is merged, each through its own pull request
with a review. Nothing merged with a failing test. Stopped stories, if any, are
listed with a reason. The wiring story is merged (or, building the whole app,
the next gate's count is zero).

⚠️ **If you see…**
- *a pull request with no review findings section, or no failing run:* that
  story skipped a check. Run `/code-review` on it yourself (**🤖 Claude**),
  and note it in `LOG.md`. A check that was skipped proves nothing.
- *two sub-agents changed the same file and a merge conflicts:* that's the
  "one at a time" rule doing its job. Let the coordinator rebase and re-test,
  or tell it to run the remaining stories one after another.
- *a story stopped for a design change:* go to Module 7, Part C. Don't let it
  change the design to get through.
- *it runs much longer, or uses much more of your plan's limits, than you
  expected:* several sub-agents use usage faster than one session. Tell it to
  run one story at a time, and note it.

**Catches:** each real review finding that got fixed and merged is a catch for
`review`, exactly as in step 6. Read the findings yourself before you count
them.

### Step 9 — Build and install

**Why this step:** Tests prove the code works on its own. Installing puts the
app on your instance, so you can see what it does on the real platform.
Building from a clean, up-to-date `main` means you install exactly what was
reviewed.

**🤖 Claude:** build on a clean, up-to-date `main`:
```
Run git -C ~/projects/priority-guard/app status. If the working tree isn't clean, stop and tell me. Otherwise run git -C ~/projects/priority-guard/app switch main && git -C ~/projects/priority-guard/app pull, then now-sdk build (this session runs in ~/projects/priority-guard/app), and show me the output. Don't run now-sdk install.
```

**⌨️ You** (`~/projects/priority-guard/app`), in window 2, once the build
succeeds. The instance is yours, so you install it yourself:
```
cd ~/projects/priority-guard/app && now-sdk install --auth <PDI_ALIAS>
```
Always `--auth`. Never `--alias`: on `install` it's silently ignored, and the
app goes to whatever instance is the default.

✅ **Check:** the build succeeds, then the install succeeds and prints a link
to your app.

### Step 10 — Try it live, as an ordinary agent

**Why this step:** Passing tests on your laptop don't prove the app works on
the instance. You test as an ordinary agent, not as admin, because an admin
can do things real users can't, and that can hide problems.

All in **🌐 Browser**:

(New to ServiceNow screens? Read "ServiceNow basics you'll use" in the
[Lab home](README.md) first. It takes two minutes.)

1. **Switch the app on, if it has a switch.** Many designs give the app an
   on/off switch that **installs off**, so an admin turns it on on purpose
   (look in your design record for "switched off" or a master switch). While
   it's off, the floor does nothing at all. In your **admin** profile:
   1. In the filter navigator, type `sys_properties.list` and press **Enter**.
   2. In the **Name** column's search box, type `<SCOPE>` and press **Enter**.
      You now see only your app's settings.
   3. Look for the one whose **Description** says it switches the floor on.
      Its name often ends in `.floor.enabled`. **None there?** Your app has no
      switch: skip to item 2.
   4. Click its name to open it. Change **Value** from `false` to `true`, and
      click **Update**.
2. **Mark one business service as critical.** Your app keeps its list of
   critical services in its own table. In your **admin** profile:
   1. Find the table's name: in the filter navigator, type
      `sys_db_object.list` and press **Enter**. In the **Name** column's
      search box, type `<SCOPE>` and press **Enter**. You see your app's
      tables. Find the one whose **Label** is like "Critical service", and
      note its **Name**, for example `x_123456_pg_ga_critical_service`.
   2. In the filter navigator, type that name followed by `.list`, for example
      `x_123456_pg_ga_critical_service.list`, and press **Enter**. The list
      is empty: that's expected.
   3. Click **New**. In **Service**, click the 🔍 and choose a business
      service, for example **Email**. Write its name down: you need it in
      item 3. Set **Floor** to **2** (it may show as **P2**). Make sure
      **Active** is ticked. Leave anything else as it is.
   4. Click **Submit**. The list now shows your one row.
3. **Create an incident as an ordinary agent.** In your **agent** profile,
   logged in as `<AGENT_USER>`:
   1. In the filter navigator, type `incident.list` and press **Enter**, then
      click **New**.
   2. Fill in **Caller** (any user) and **Short description** (anything).
   3. In **Service**, choose **the same business service** you marked in
      item 2. This matters: the floor only acts on an incident whose Service
      is on your list.
   4. Set **Impact** to **3 - Low** and **Urgency** to **3 - Low**. The form
      shows **Priority 5 - Planning**. That's what you'd get without your app.
   5. Click **Submit**, then open the incident again from the list.

✅ **Check:** the saved priority is **P1 or P2**, and the incident has a work
note explaining the raise.

⚠️ **If you see…** *Submit refused on the critical services list (item 2),
or no **New** button:* your design may let only a service's owner edit its
row. Note the message, and tell your instructor, or ask Claude (**🤖
Claude**) "which users can add a row to the critical services list, and
why?". Don't change the app's rules by hand.

⚠️ **If you see…** *the priority stayed low:* check these three first, in
this order. None of them is a defect:
1. the switch from item 1, if your app has one, is `true`;
2. the incident's **Service** is set, and it's the service on your list;
3. your critical services list has that service, **active**, with a floor.

If all three are right and it still stayed low, that's a real defect found on
the instance. Once it's fixed and merged, it's a **catch** for `test`. Describe what you saw to Claude in one
sentence (**🤖 Claude**), and let it fix it through the loop (a story, tests, `ship it`).
Don't fix it by hand on the instance.

⚠️ **If you see…** *the priority went up, but there's no work note:* that's a
real defect too, and a **catch** for `test` once fixed. Work notes are a
special kind of field, so describe exactly that to Claude: "the raise saved
but no work note appeared on the incident".

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

**🤖 Claude:** work gate by gate, **in the plan's order**, until the **MERGE,
INSTALL and DEMO** counts are all zero. For each gate, run step 8's prompt
with the second **Stop when** line, then read its evidence as step 8 says.
Stories that need the instance (an install, a live check, the demo) stop and
come back to you: do those by hand, as below. Leave the `gate:handoff`
stories open: Module 8 closes them.

**Which gate is next.** The gates go in order: `merge`, `install`, `demo`,
`handoff`. The next one is the **first whose count isn't zero**. Check
each in order (**🔍 Check**), swapping in the gate's name, in lower case, and
read the number in the raw output:
```
Run exactly this and show me the raw output, unedited: gh issue list --state open --label "gate:<gate>" --limit 5000 --json labels --jq '[.[] | select(all(.labels[]; .name != "register"))] | length'
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
- **The override with Tier 1 approval** is the hardest story. Its five
  bullets (at the top of its pull request) must say who approves, where the
  approval is recorded, and what the incident does while it waits. If one is
  missing, tell the coordinator before the next gate's run.
- **Every design term needs a test** whose name carries its id, including
  **boundary and posture terms**. For example: a test that the app's source
  makes no AI calls, and doesn't touch the priority lookup or the SLA
  definitions. A term with no test caps the grade.
- **Seed the demo data as source** in the app (`src/`), as your design says.
  The grade checks for it.
- After any story that changes what's on the instance, **build and install**
  again (step 9: **🤖 Claude** builds, **⌨️ You** install), and re-run your live checks. Add checks as stories land:
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
