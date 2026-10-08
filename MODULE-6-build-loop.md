# Module 6 — The build loop

*Workshop · 12:40 · 30 minutes, then the batch runs over lunch · 14:00 · 45 minutes*

**In the workshop:** Steps 1–7 at 12:40 (your first story by hand, about 30
minutes). Start Step 8's batch at 13:10, just before lunch. After lunch,
at 14:00: read Step 8's evidence, then Steps 9–11. Step 12 is ⏭ after the
workshop.

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
them the same way. After lunch you install the app and check it live. In the workshop,
the override (capability 4) and the weekly count (5) stay on the board for
later. **If you're building the whole app**, step 12 takes you the rest of
the way, after the workshop.

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
If the top story isn't the floor, build it anyway: build only the top
story by hand. Step 8's batch builds the next ones (and, building the whole
app, Step 12 builds the rest, in the plan's order).

Claude restates the story in **five bullets**. Read them against the design.
If they're right, type `confirm`. If not, say what's wrong in one line.

Once it has started, **🔍 Check** which branch it's on:
```
Run exactly this and show me the raw output, unedited: git -C ~/projects/priority-guard/app branch --show-current
```

✅ **Check:** the raw output is a **new branch** name, never `main`. When this is
the floor story, the bullets mention your central rule, and one says the
floor's logic makes **no platform calls**.

⚠️ **If you see…** *it prints `main`:* stop. Tell Claude "Never work on main.
Create a new branch for this story first." and run the check again.

### Step 3 — 🔮 Predict it

**Why this step:** Writing your own test cases before you see Claude's gives
you something to compare against. If you look at Claude's first, its list
quietly becomes yours, and you lose the chance to see what either of you missed.

**✏️ Editor:** in `LOG.md`, list three test cases **you** would write for the floor.
Include at least one unusual case, not only the obvious one.

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

**The test script.** `npm test` runs your tests, but only if `package.json`
says how. **✏️ Editor:** open `~/projects/priority-guard/app/package.json`
and look under `"scripts"` for a line that starts with `"test"`. **None
there?** **🤖 Claude:** type:
```
This story must add a test script; include it.
```

✅ **Check:** the tests run and **fail**, because the code doesn't exist yet.
Compare them with your three predicted cases. Which did Claude miss? Which
did you?

### Step 5 — Green, and look at the shape

**Why this step:** Passing tests show the code does what the tests ask.
Looking at its shape checks the design idea: logic that works on plain values,
with ServiceNow kept outside it, can be tested in seconds with no instance.

**🤖 Claude:** let Claude write the code until the tests pass. Then ask:
```
Give me the path of the file that holds the floor function.
```
**✏️ Editor:** open that file and look: does the floor function call
ServiceNow anywhere? (A platform call looks like `GlideRecord`, `gs.` or
`current.`.)

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
**🌐 Browser:** open the pull request on GitHub (Claude prints its link;
or open your repo and click the **Pull requests** tab).

**🤖 Claude** (window 1): **How to tell the review ran:** `/code-review`
reports in your Claude session, not on the pull request. Look in Claude's
output for the `/code-review` run and its list of findings (or "no issues
found"). If it never ran, type `/code-review` yourself. **Read every
finding.**

- **No findings** is a valid result. Write "review clean" in `LOG.md`. It
  isn't a catch.
- **You disagree with a finding?** Say so to Claude in one line, for example
  "Finding 2 is wrong: <why, in one sentence>." A finding you
  disagree with isn't a catch.

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

**In the workshop: start it at 13:10, just before lunch.** It runs while
you eat.
- **Keep the laptop awake.** Leave it open and plugged in. Don't close the
  lid: closing it puts the laptop to sleep, and the run stops. On a Mac,
  also type this in **⌨️ You** (window 2) once the batch has started:
  ```
  caffeinate -i
  ```
  It prints nothing and keeps the Mac awake while it runs. After lunch,
  click window 2 and press **Ctrl+C** to stop it.
- **Stay about 5 minutes after you start it.** Wait until the first
  sub-agent's failing test run appears, and answer any first permission
  question (as the list further down says). Then go to lunch.
- **If Claude asks a permission question while you're away**, it waits for
  you. That's fine. Nothing goes ahead without you. Answer it when you're
  back.
- **Back at 14:00:** read its report and check the evidence (the numbered
  checks after the prompts), then go on to step 9. **Still running at
  14:00? Keep going**: let it finish, then carry on from step 9. Module 7 is
  what gets cut to make the time.

1. **Start clean.** **🤖 Claude:** type `/clear` (or start a fresh session:
   **🤖 Claude:** type `/exit`, then **⌨️ You:** `claude`).
2. **🤖 Claude:** step 1's prompt that brings `main` up to date, then the
   session open from step 1.
3. **🤖 Claude:** paste **one** of the two prompts below. They are the same
   except for the **Stop when** line. **Copy the one you need**, whole:
   - **Workshop:** stop once the wiring story is merged.
   - **Whole app** (step 12): stop when the next gate has no open stories.

**Workshop prompt:**
```
Run the build loop on the next stories for me, using sub-agents to go faster.
You are the coordinator: plan, delegate, merge and report. Don't write
feature code yourself. The repo is ~/projects/priority-guard/app.

Scope: open stories on the next gate, in the order the live board and
BACKLOG.md rank them.
Stop when: the story that wires the floor into the incident table is merged.

Give each story to one sub-agent, working in its own git worktree on its own
branch, never on main. Each sub-agent must:
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
- Never commit to main. Every change goes through a pull request.
- Run stories at the same time only if they don't change the same files and
  neither needs the other. Otherwise run them one after another.
- Merge one pull request at a time. Before each merge, update the branch from
  the latest main and run the tests again.
- Never merge with a failing test, and never skip /code-review.
- If a story fails the same step three times, stop that story, leave its pull
  request open, and tell me why.
- Stop everything and ask me if a story needs a design change, a business
  decision, or anything on the instance. Never run now-sdk install or
  now-sdk auth.
- Don't read or change anything outside ~/projects/priority-guard and
  ~/projects/prove-it-kit.
- Don't create, close or re-label issues by hand. A story closes when its
  pull request merges.

When you're done, give me one table: story, pull request, failing and passing
test counts, review findings and what was done, merged or stopped (and why).
Then the live count of open stories on the next gate.
```

**Whole app prompt:**
```
Run the build loop on the next stories for me, using sub-agents to go faster.
You are the coordinator: plan, delegate, merge and report. Don't write
feature code yourself. The repo is ~/projects/priority-guard/app.

Scope: open stories on the next gate, in the order the live board and
BACKLOG.md rank them.
Stop when: no open stories are left on the next gate.

Give each story to one sub-agent, working in its own git worktree on its own
branch, never on main. Each sub-agent must:
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
- Never commit to main. Every change goes through a pull request.
- Run stories at the same time only if they don't change the same files and
  neither needs the other. Otherwise run them one after another.
- Merge one pull request at a time. Before each merge, update the branch from
  the latest main and run the tests again.
- Never merge with a failing test, and never skip /code-review.
- If a story fails the same step three times, stop that story, leave its pull
  request open, and tell me why.
- Stop everything and ask me if a story needs a design change, a business
  decision, or anything on the instance. Never run now-sdk install or
  now-sdk auth.
- Don't read or change anything outside ~/projects/priority-guard and
  ~/projects/prove-it-kit.
- Don't create, close or re-label issues by hand. A story closes when its
  pull request merges.

When you're done, give me one table: story, pull request, failing and passing
test counts, review findings and what was done, merged or stopped (and why).
Then the live count of open stories on the next gate.
```

A **git worktree** is a separate working copy of the repo, in its own
folder, so two sub-agents can work at once without touching each other's
files.

While it runs, watch rather than type. Claude may ask you to approve
something. Read it first, and answer as the box in [Lab home](README.md),
section 7, *When Claude asks permission* says. For example:
- **approve** (choose 1): `git worktree add …`, `npm test`, `gh pr merge …`;
- **decline** (choose 3, No): `now-sdk install`, `now-sdk auth`, or anything
  containing `service-now.com`.

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
  "one at a time" rule doing its job. Let the coordinator **rebase** (replay
  that branch's changes on top of the latest `main`) and re-test, or tell it
  to run the remaining stories one after another.
- *the run stopped before its **Stop when** was reached* (it ended, crashed,
  or hit a usage limit): nothing is lost. Open pull requests and merged
  stories stay on GitHub, and the next run carries on from them.
  1. **🤖 Claude:** type `/exit`. **⌨️ You** (window 1): `claude`.
  2. **🤖 Claude:** step 1's prompt that brings `main` up to date, then the
     session open.
  3. **🤖 Claude:** paste the **same** prompt as before.
  4. **✏️ Editor:** note in `LOG.md` that the run stopped, where, and why.
- *a story stopped for a design change:* don't let it change the design to
  get through. Leave that story open, note it in `LOG.md`, and tell your
  instructor. Changing the design is Module 7, Part C, which is after the
  workshop. **If it's the story that wires the floor in:** still build and
  install what did merge (step 9), skip step 10's live check for now (do it
  after the design is amended, after the workshop), and close the session
  (step 11).
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

⚠️ **If you see…** *the install fails, times out, or says unauthorized
(401):* your PDI is often asleep.
1. **🌐 Browser** (your **admin** profile): log in to your PDI.
2. If it says the instance is **hibernating**, wake it: go to
   https://developer.servicenow.com, sign in, and start your instance from
   there. Waking takes a few minutes.
3. Wait until you can open a list in the PDI, for example `incident.list`.
4. **⌨️ You** (window 2): run the same `now-sdk install --auth <PDI_ALIAS>`
   command again.

Never ask Claude to run `now-sdk auth` to fix it. If it still fails, write
the error in `LOG.md` and ask your instructor.

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

   ⚠️ **If you see…** *the form is read-only, with a banner at the top
   saying the record belongs to another application:* ServiceNow only lets
   you edit an app's records while you're working "in" that app (its
   **scope**). Click the link in the banner that switches you to your app
   (or choose your app in the **application picker**, the globe icon at
   the top right). Then change **Value**, click **Update**, and switch back
   to **Global** the same way. This wasn't confirmed on every release: if
   there's no banner or no link, write what you see in `LOG.md` and tell
   your instructor.
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
      service, for example **Email**. Write its name in `LOG.md` as **your
      critical service**: you need it in item 3, in step 12, and in
      Modules 7 and 8. Set **Floor** to **2** (it may show as **P2**). Make sure
      **Active** is ticked. Set only these two: leave anything else as it is.
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

✅ **Check:** the saved incident's **Priority** shows **1 - Critical** or
**2 - High**. Scroll down to the **Activity** stream (the history under the
form): there's an entry under **Work notes** explaining the raise.

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
the instance. Once it's fixed and merged, it's a **catch** for `test`.
Don't fix it by hand on the instance. Fix it through the loop:
1. **🤖 Claude:** describe what you saw in one sentence, and have it filed:
   ```
   File one GitHub issue for this defect in <APP_REPO>, in plain words:
   <what you saw, in one sentence>. Label it like the plan's other stories:
   the gate label for the gate it holds up, that gate's milestone,
   and a priority label (p0, p1 or p2). Show me the issue first; file it
   only after I say yes. Change no code yet.
   ```
   Without the gate label and milestone, the board and the grade don't
   count the issue. (Step 8's rule "Don't create, close or re-label issues by
   hand." is only for the coordinator's batch run.)
2. **🤖 Claude:** `Take the top one.` (or `Take issue #<n>.`, with the new
   issue's number). Read the five bullets, then `confirm`.
3. Tests first (red), then the fix (green), as in steps 4 and 5. Then
   `ship it`, and read the review as in step 6.
4. Build and install again (step 9), then redo item 3 above.

⚠️ **If you see…** *the priority went up, but there's no work note:* that's a
real defect too, and a **catch** for `test` once fixed. Work notes are a
special kind of field, so describe exactly that to Claude: "the raise saved
but no work note appeared on the incident". Then follow the same four steps
as above: file the issue, take it, tests, `ship it`, install, check again.

### Step 11 — Close the session

**Why this step:** Claude forgets everything when the session ends, so the note
is how the next session knows where you stopped. Reading it yourself stops a
claim nobody checked from being written down as fact.

**🤖 Claude:**
```
We're stopping here. Update SESSION-NOTE.md: what's proven, what's
open, the exact next step, and the top three next items.
```
**✏️ Editor:** open `~/projects/priority-guard/app/SESSION-NOTE.md` and read
what it wrote. If it says something is "verified" that you haven't seen
work on the instance, tell Claude in one line to correct it.

The note is now changed on `main`. It goes through review like everything
else. **🤖 Claude:**
```
Commit only SESSION-NOTE.md in ~/projects/priority-guard/app on a new
branch docs/session-note, never on main, then ship it.
```
Once it's merged, **🔍 Check:**
```
Run exactly this and show me the raw output, unedited: git -C ~/projects/priority-guard/app switch main && git -C ~/projects/priority-guard/app pull && git -C ~/projects/priority-guard/app status --short
```
✅ **Check:** the pull request is merged, and `git status --short` prints
**nothing** after the pull: `main` is clean.

### Step 12 — If you're building the whole app

⏭ **After the workshop:** skip this step on the day. Do it later, starting
from where you stopped, before Module 7's Part B and Module 8's Parts B and C.

**Why this step:** A real handoff needs every story built, installed and shown,
not just the floor. Going gate by gate, by the live count, keeps you on what's
actually in the way. Each gate also needs evidence, or the grade can't count it.

**🤖 Claude:** work gate by gate, **in the plan's order**, until the **MERGE,
INSTALL and DEMO** counts are all zero. For each gate, run step 8 with the
**Whole app prompt**, then read its evidence as step 8 says.
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
1. **Create the two users.** In the filter navigator, type `sys_user.list`
   and press **Enter**. Click **New**. Fill in **User ID** `im.demo`, a
   **First name** and **Last name**, and click **Submit**. Do the same for
   `owner.demo`.
2. **Give them roles.** Open `im.demo` from the list (filter the **User ID**
   column). Scroll down to the **Roles** tab at the bottom, and click
   **Edit…**. Find `itil` and the app's override role (its name is in your
   design; it starts with your `<SCOPE>`), move both to the right-hand list,
   and click **Save**. Write the override role in your values table as
   `<OVERRIDE_ROLE>`. Then do the same for `owner.demo`, with `itil` only.
3. **Set a password for each.** On each user's form, click **Set Password**
   (top right of the form), set one, and save it. Note it in `LOG.md`, never
   in the repo or in Claude.
4. **Make `owner.demo` the service's owner.** In the filter navigator, type
   `cmdb_ci_service.list` and press **Enter**. Open **your critical service**
   (the one you marked in step 10). In **Owned by**, click the 🔍 and choose
   `owner.demo`. Click **Update**.

Run each live check (**🌐 Browser**) as the right person: the floor as `<AGENT_USER>`, an
override as `im.demo`, an approval as `owner.demo`. On your own, log in as
each in turn in your **agent** profile, or **impersonate** them from your
admin profile: click your name or picture at the top right, choose
**Impersonate user**, and pick the user. To stop, do the same and choose
**End impersonation**.

Along the way:
- **The override with Tier 1 approval** is the hardest story. Its five
  bullets (at the top of its pull request) must say who approves, where the
  approval is recorded, and what the incident does while it waits. If one is
  missing, tell the coordinator before the next gate's run.
- **Before the Tier 1 override checks**, mark your critical service as
  Tier 1. In your **admin** profile, open your critical service's row in
  the critical services list (step 10, item 2), tick **Tier 1** (if your
  design has a Tier 1 field), and click **Update**. Use the same service
  for every check.
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
  Commit it exactly as in step 11: on its own branch `docs/session-note`,
  then `ship it`, so `main` stays clean.

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

**Next:** [Module 7](MODULE-7-break-it.md). A fresh reviewer tries to break
what you built (optional in the workshop).
