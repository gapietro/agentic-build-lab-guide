# Module 7 — Break it: tests prove only what the author thought to check

*Day 3 · about 90 minutes · still the build stage*

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
- [ ] Your partner is ready for Part B.

---

## Part A — The fresh reviewer

### Step 1 — 🔮 Predict it

**Why this step:** Writing your guesses down first gives you something honest to compare with. Afterwards you can see which holes you'd have missed on your own.

In `LOG.md`, write the three ways **you** would try to get a critical
incident below its floor. Keep the list. You'll compare it with the
reviewer's in step 3.

### Step 2 — Start a reviewer with no context

**Why this step:** You know what you meant the code to do, so you tend to test what you meant. A reviewer with no history knows only the rule, so it tries things you didn't think to try.

Quit any open Claude session. Start a new one in `~/projects/priority-guard/app`:
```
claude
```
**Don't** run the session open. This reviewer shouldn't know what you
intended, only what must hold. Type:
```
You are reviewing someone else's work. One rule must hold: an incident on a
critical service can never be saved below that service's floor. Try to
break it. Don't read the summary; re-run the checks yourself. Look at the
floor, the rule that applies it, every way priority can change on an
incident, and any error path. List every attempt.
Turn each one into a failing test before any fix, its name starting with the
design term it tests. Where the inputs are a finite set, try all of them.
```

**If you built the override:** in the prompt's second line, write `…below that
service's floor, except by a recorded override that follows the design's
approval rules.` and add `the override` to the list of places to look.

✅ **Check:** the reviewer re-runs the tests itself, and lists every attempt.
Copy the list into your log, with how many attempts got through.

### Step 3 — Compare, then deal with what got through

**Why this step:** A hole only stops mattering once it's fixed properly. A failing test first proves the hole is real, and keeps it closed. If the fix changes what the app should do, the design has to say so first.

1. Tick each of your predicted attacks the reviewer tried. For any it
   missed, ask it for a failing test for that case too.
2. For **each** attack that got through:
   - It's a **catch**. Log it.
   - **Does fixing it need a design change?** For example, the reviewer asks
     whether an incident manager may override below the floor without a
     reason. That's a decision, not code. Go to Part C.
   - Otherwise: failing test first, then the fix, then `ship it`.
3. **In the workshop, stop after one fix.** Write any other attempts that got
   through on your board as stories, each naming the gate it holds up. On a
   real project you'd repeat with a new reviewer until a round finds nothing.
4. **Building the whole app:** fix **every** attempt that got through, through
   the loop (or Part C if it changes the design). Don't file new stories by
   hand: a fix is a branch and `ship it`. Then reinstall, re-run your live
   checks, and add a fresh comment to the closed DEMO story saying what
   changed and that the checks pass again. Any open issue on the DEMO gate
   turns Module 8's grade into a preview.

✅ **Check:** you've written down how many attempts there were, how many got
through, and what you fixed. A bypass counts as a catch once its fix is
merged.

---

## Part B — Your partner attacks the live app

### Step 4 — Swap seats

**Why this step:** Tests run on your terms; real people use the real screens. Your partner doesn't share your assumptions, so they try the app the way someone else would.

Your partner sits at your computer, in your **agent** browser profile,
logged in as `<AGENT_USER>`. You watch and write. **Don't help.** Your
partner's goal: an incident on your critical service, saved at priority 3, 4
or 5, without an override.

Things worth trying, if your partner runs out of ideas:
- Create the incident on a non-critical service, then change the service.
- Edit the incident again after it's been raised, changing any field an
  agent can change.
- Change the priority itself, if the form or the list view lets you.
- Save twice in a row, or edit from the list view instead of the form.

✅ **Check:** your log lists every attempt and its result.

⚠️ **If you see…** *an attempt gets through:* that's a **catch**, found by your
partner on a live instance. Write the exact steps. Swap back, and fix it in
Part A's way: a failing test that reproduces it, then the fix, through the
loop, then re-install and re-try the same steps.

### Step 5 — Swap back, and attack theirs

**Why this step:** Now you're the outsider. Looking for holes in someone else's app shows you how easy it is to miss your own.

Do the same on your partner's computer, as their agent user.

---

## Part C — If the design has to change

**In the workshop, your instructor shows this once, for the room.** Follow
these steps yourself only if a fix in Part A or B changes what the design
says, for example a new rule about which changes the floor must survive.

### Step 6 — Amend the design, then build

**Why this step:** The signed design is the agreement about what the app does. If a fix changes that, the design changes first and you sign it, so the code never quietly drifts from what was agreed.

1. Start a branch for the amendment, from a clean `main`:
   ```
   git switch main && git pull
   git switch -c docs/amend-floor
   ```
2. In Claude, run the session open, then:
   ```
   /prove-it:design-challenge amend docs/DESIGN-PriorityGuard.md
   ```
3. It asks what changed and why, **one question per turn**. Answer with what
   you found and what you want the design to say. Then answer its questions.
4. It reads back the changed terms. If they're right, type `Confirmed.`
5. Open `docs/DESIGN-PriorityGuard.md` in your **editor**. In **§10**, the drift
   log has one row per added or changed term, with **Signed by** left blank.
   Fill in each **Signed by** cell yourself. The kit never signs, and the
   build plan refuses an unsigned row.
6. `ship it` to merge the amendment.
7. Turn the amendment into a story:
   ```
   /prove-it:build-plan docs/DESIGN-PriorityGuard.md
   ```
   Type `approve` at the preview, then `apply now`.
8. **Then** build the fix as a normal story, through the loop. The build plan
   left `BACKLOG.md` and `.gitignore` changed on `main`: commit them as the
   first commit on that story's branch.

✅ **Check:** the design has a new or changed term, numbered, and every new
drift row is signed by you. Nothing was renumbered or deleted. The fix was
built **after** the amendment was merged, not before.

---

## Log it

```
7 | partner | <the attack that got through, now fixed>
7 | review | <the reviewer's attack that got through, now fixed>
```
And in `LOG.md`: your three predictions against what actually worked.

**Next:** [Module 8](MODULE-8-grade-and-handoff.md). Could someone else own
this app without you?
