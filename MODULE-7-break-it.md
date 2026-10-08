# Module 7 — Break it: tests prove only what the author thought to check

*Workshop · 14:45 · optional, 15 minutes*

**In the workshop:** Part A only: predict, start the fresh reviewer, and
compare its list with yours, in 15 minutes. The reviewer lists its attempts.
Fixing what got through, Part B (your partner) and Part C (amending the
design) are ⏭ after the workshop.

**Short on time? Skip this module; nothing later depends on it.**

[← Module 6](MODULE-6-build-loop.md) · [Lab home](README.md) · [Module 8 →](MODULE-8-grade-and-handoff.md)

---

## What you'll do

Your tests are green. That proves your floor works in every case **you
thought of**. This module looks for the cases you didn't, two ways:

1. **A fresh reviewer.** A brand-new Claude session, with none of the build's
   context, is told one rule must hold and asked to break it.
2. **Your partner.** They sit at your keyboard, in your **agent** browser
   profile, and try to get an incident on a critical service saved below
   its floor, using only what an ordinary agent can do.

Anything that gets through is fixed the proper way: a failing test first,
then the fix, through the loop. If fixing it changes the design, it goes
**back to the design**, and gets amended and signed before it's built.

**The catch to watch for.** Your tests check the floor where you thought to
apply it. A real user can change an incident in more ways than your tests
imagined. Will the reviewer or your partner find one before your customers
would?

---

## Before you start

- [ ] Module 6 is done: both stories merged, the app installed, and the live
      check in Module 6 step 10 passed. (Building the whole app: the MERGE,
      INSTALL and DEMO counts are zero, from Module 6 step 12.)
- [ ] `main` is clean and up to date.
- [ ] After the workshop only: your partner is ready for Part B.

---

## Part A — The fresh reviewer

### Step 1 — 🔮 Predict it

**Why this step:** Writing your guesses down first gives you something honest to compare with. Afterwards you can see which holes you'd have missed on your own.

In `LOG.md`, write the three ways **you** would try to get a critical
incident below its floor. Keep the list. You'll compare it with the
reviewer's in step 3.

### Step 2 — Start a reviewer with no context

**Why this step:** You know what you meant the code to do, so you tend to test what you meant. A reviewer with no history knows only the rule, so it tries things you didn't think to try.

**🤖 Claude:** if a session is open, type `/exit`.

**⌨️ You** (`~/projects/priority-guard/app`): start a new one:
```
cd ~/projects/priority-guard/app && claude
```
**🤖 Claude:** **don't** run the session open. This reviewer shouldn't know
what you intended, only what must hold. Type:
```
You are reviewing someone else's work in ~/projects/priority-guard/app.
One rule must hold: an incident on a critical service can never be saved
below that service's floor. Try to break it. Don't rely on SESSION-NOTE.md
or pull request descriptions; re-run the checks yourself. Look at the
floor, the rule that applies it, every way priority can change on an
incident, and any error path. List every attempt.
Before writing anything, create a new branch test/break-floor from main
and work only there; never commit to main. Never run now-sdk install or
now-sdk auth. Turn each attempt into a test,
its name starting with the design term it tests, before any fix. An
attempt that gets through shows as a failing test. Where the inputs are a
finite set, try all of them. Commit the tests on test/break-floor. Don't
fix anything, don't push, and don't read or change anything outside
~/projects/priority-guard and ~/projects/prove-it-kit.
```

**If you built the override:** in the sentence that starts `One rule must
hold`, end it with `…below that service's floor, except by a recorded
override that follows the design's approval rules.` and add `the override`
to the list of places to look. Make these changes in your editor before you
paste the prompt.

✅ **Check:** the reviewer re-runs the tests itself, and lists every attempt.
Its tests are committed on `test/break-floor`, not on `main`. Copy the list
into your log, with how many attempts got through.

### Step 3 — Compare, then deal with what got through

**Why this step:** A hole only stops mattering once it's fixed properly. A failing test first proves the hole is real, and keeps it closed. If the fix changes what the app should do, the design has to say so first.

**In the workshop, do item 1 only, then stop** where it says so below.

1. **Still in the reviewer session:** tick each of your predicted attacks
   the reviewer tried. For any it missed, ask it (**🤖 Claude**) for a test
   for that case too, and to commit it on `test/break-floor`.

   Before you leave this branch, **🔍 Check** nothing is left uncommitted:
   ```
   Run exactly this and show me the raw output, unedited: git -C ~/projects/priority-guard/app status --short
   ```
   ✅ **Check:** the raw output is **empty**. If it lists any files, ask the
   reviewer to commit them on `test/break-floor` first, then check again.

**In the workshop, stop here.** In `LOG.md`, write each attempt that got
through as an **open finding**, with its failing test's name. It isn't a
catch yet: a bypass becomes a catch once its fix is merged. Then leave the
reviewer and go back to `main`, so Module 8 grades `main`, not the
reviewer's branch. **🤖 Claude:** type `/exit`. **⌨️ You** (window 1):
```
cd ~/projects/priority-guard/app && git switch main
```

⏭ **After the workshop:** items 2 to 5 below, fixing what got through.

2. **Leave the reviewer.** It was set up to attack, not to build.
   **🤖 Claude:** type `/exit`. **⌨️ You** (window 1): start a normal
   session:
   ```
   cd ~/projects/priority-guard/app && claude
   ```
   **🤖 Claude:** bring `main` up to date (Module 6 step 1's prompt), then
   run the session open.
3. For **each** attack that got through:
   - It's a **catch** once its fix is merged. Log it.
   - **Does fixing it need a design change?** For example, the reviewer asks
     whether an incident manager may override below the floor without a
     reason. That's a decision, not code. Go to Part C.
   - Otherwise, build the fix as a story, through the loop (Module 6 steps
     4–7). Its branch starts from `main`, and copies in **only** that
     attack's failing test, never the whole of `test/break-floor`. Nothing
     red is ever merged: the fix makes that test pass first.
     **🤖 Claude** (replace `<short-name>` with a few words, for example
     `service-change`):
     ```
     Create a new branch fix/<short-name> from main in
     ~/projects/priority-guard/app, never on main. Restate the fix in five
     bullets and wait for my confirm. Then copy in only the failing test
     for <the attack, in a few words> from the branch test/break-floor,
     and show me it failing. Then fix the code until the whole suite
     passes. Don't merge test/break-floor and don't push it. Never run
     now-sdk install or now-sdk auth.
     ```
     Read the bullets, type `confirm`, and watch the red, then green run.
     Then `ship it`, and read the review as in Module 6 step 6.
4. **Not building the whole app? Stop after one fix.** File the other attacks that got
   through as stories, so they aren't lost. **🤖 Claude:**
   ```
   File one GitHub issue per attempt that got through, each with the
   failing test's name. Label each like the plan's other stories: a
   gate:<gate> label, the milestone for that gate, and a priority label
   (p0, p1 or p2). Show me the list first; file only after I say yes.
   ```
   Replace `<gate>` with the gate each one holds up, in lower case. Without
   the gate label and milestone, the board and the grade don't count them.
   (Module 6 step 8's rule "Don't create, close or re-label issues by
   hand." is only for the coordinator's batch run.) Read the list, then say yes. On a real project
   you'd repeat with a new reviewer until a round finds nothing.
5. **Building the whole app:** fix **every** attempt that got through, through
   the loop, as in item 3 (or Part C if it changes the design). A fix doesn't
   need an issue filed by hand: a fix is a branch and `ship it`. Then reinstall (Module 6 step 9:
   **🤖 Claude** builds, **⌨️ You** install), re-run your live checks, and
   add a fresh comment to the closed DEMO story saying what changed and that
   the checks pass again. Any open issue on the DEMO gate
   turns Module 8's grade into a preview.

`test/break-floor` stays on your computer only, as the reviewer's record.
Never merge it.

✅ **Check:** you've written down how many attempts there were, how many got
through, and (after the workshop) what you fixed. A bypass counts as a catch
once its fix is merged.

---

## Part B — Your partner attacks the live app

⏭ **After the workshop:** all of Part B. It needs your partner, at your
keyboard, for a full swap each way.

### Step 4 — Swap seats

**Why this step:** Tests run on your terms; real people use the real screens. Your partner doesn't share your assumptions, so they try the app the way someone else would.

Your partner sits at your computer, in your **agent** browser profile,
logged in as `<AGENT_USER>`. You watch and write. **Don't help.** Your
partner's goal: an incident on your critical service, saved at priority 3, 4
or 5, without an override.

**Only if your partner has been stuck for 10 minutes:** some things worth
trying.
- Create the incident on a non-critical service, then change the service.
- Edit the incident again after it's been raised, changing any field an
  agent can change.
- Change the priority itself, if the form or the list view lets you.
- Save twice in a row, or edit from the list view instead of the form.

✅ **Check:** your log lists every attempt and its result.

⚠️ **If you see…** *an attempt gets through:* that's a **catch**, found by your
partner on a live instance. Write the exact steps. Swap back, and fix it in
Part A's way, in a normal session (step 3, item 2). **🤖 Claude:**
```
Create a new branch fix/<short-name> from main in
~/projects/priority-guard/app, never on main. Restate the fix in five
bullets and wait for my confirm. Then write a test that reproduces these
steps, its name starting with the design term it tests, and show me it
failing: <the exact steps>. Then fix the code until the whole suite passes.
Never run now-sdk install or now-sdk auth.
```
Then `ship it`, re-install (Module 6 step 9: **🤖 Claude** builds, **⌨️ You**
install), and re-try the same steps.

### Step 5 — Swap back, and attack theirs

**Why this step:** Now you're the outsider. Looking for holes in someone else's app shows you how easy it is to miss your own.

Do the same on your partner's computer, as their agent user.

---

## Part C — If the design has to change

⏭ **After the workshop:** all of Part C. Follow these steps only if a fix
in Part A or B changes what the design says, for example a new rule about
which changes the floor must survive.

### Step 6 — Amend the design, then build

**Why this step:** The signed design is the agreement about what the app does. If a fix changes that, the design changes first and you sign it, so the code never quietly drifts from what was agreed.

1. Start from a fresh project session, never the reviewer's: it was set up
   to attack, not to build. **🤖 Claude:** type `/exit`. **⌨️ You**
   (`~/projects/priority-guard/app`): start a fresh project session:
   ```
   cd ~/projects/priority-guard/app && claude
   ```
   **🤖 Claude:** start a branch for the amendment, from a clean `main`:
   ```
   Run git -C ~/projects/priority-guard/app status. If the working tree isn't clean, stop and tell me. Otherwise run git -C ~/projects/priority-guard/app switch main && git -C ~/projects/priority-guard/app pull && git -C ~/projects/priority-guard/app switch -c docs/amend-floor and show me the output. Commit nothing.
   ```
2. **🤖 Claude:** run the session open, then:
   ```
   /prove-it:design-challenge amend docs/DESIGN-PriorityGuard.md
   ```
3. It asks what changed and why, **one question per turn**. Answer with what
   you found and what you want the design to say. Then answer its questions.
4. It reads back the changed terms. If they're right, type `Confirmed.`
5. **✏️ Editor:** open `docs/DESIGN-PriorityGuard.md`. In **§10**, the drift
   log has one row per added or changed term, with **Signed by** left blank.
   Fill in each **Signed by** cell yourself. The kit never signs, and the
   build plan refuses an unsigned row.
6. **🤖 Claude:** commit the signed amendment and merge it:
   ```
   Commit only docs/DESIGN-PriorityGuard.md in ~/projects/priority-guard/app
   on the branch docs/amend-floor, never on main, then ship it.
   ```
7. **🤖 Claude:** once it's merged, bring `main` up to date (Module 6 step
   1's prompt). Then turn the amendment into a story:
   ```
   /prove-it:build-plan docs/DESIGN-PriorityGuard.md
   ```
   Type `approve` at the preview. When it asks "Dry run first, or apply
   now?", type `apply now`. Note the new story's issue number.
8. **✏️ Editor:** read `.gitignore`. The build plan may have added allow
   lines: check each one before it's committed. The build plan left
   `BACKLOG.md` (and maybe `.gitignore`) changed on `main`. **🤖 Claude:**
   ```
   Commit BACKLOG.md, and .gitignore if it changed, in
   ~/projects/priority-guard/app on a new branch docs/amend-plan, never on
   main, then ship it.
   ```
9. **🤖 Claude:** **then** build the fix as a normal story, through the loop
   (Module 6 steps 2–7): `Take issue #<n>.`, with the new story's number,
   then `confirm`, tests first, `ship it`.

✅ **Check:** the design has a new or changed term, numbered, and every new
drift row is signed by you. Nothing was renumbered or deleted. The fix was
built **after** the amendment was merged, not before.

---

## Log it

```
7 | partner | <the attack that got through, now fixed>
7 | review | <the reviewer's attack that got through, now fixed>
```
Only once each fix is merged. In the workshop, the attempts that got through
stay in `LOG.md` as open findings, not in `catches.md`.
And in `LOG.md`: your three predictions against what actually worked.

**Next:** [Module 8](MODULE-8-grade-and-handoff.md). Could someone else own
this app without you?
