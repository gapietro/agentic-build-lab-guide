# Module 9 — What the process caught

*Workshop · 15:45 · 15 minutes*

**In the workshop:** Step 1 (count) and Step 2 (the room's board), kept
short. Steps 3 and 4 are quick: do them in the room, but if time is short,
do Step 4 at home.

[← Module 8](MODULE-8-grade-and-handoff.md) · [Lab home](README.md)

---

## What you'll do

Count, from your notes and not from memory, everything the process stopped
before it reached your app. Then decide what you'll take back to your own
work.

---

## Step 1 — Count your catches

**Why this step:** Memory makes some catches feel bigger and forgets others. Counting from your notes gives you numbers you can show and stand behind.

**⌨️ You** (any folder): count your catches. This counts the lines that
contain a `|`, so a stray heading or blank line isn't counted:
```
grep -c '|' ~/projects/priority-guard-notes/catches.md
```
Then count them by what caught them. `cut` takes the middle part of each
line, `tr` removes the spaces around it (so `review` and ` review ` count as
one), and `sort | uniq -c` counts each kind:
```
grep '|' ~/projects/priority-guard-notes/catches.md | cut -d'|' -f2 | tr -d ' ' | sort | uniq -c
```

✅ **Check:** two numbers you can stand behind: your total, and your biggest
single source of catches.

## Step 2 — The room's board

**Why this step:** One person's numbers could be luck. The whole room's board shows where the process stopped problems most often.

Your instructor puts a board up with one column per kind of catch:
`prd`, `consult`, `research`, `design`, `guard`, `test`, `review`, `partner`,
`grade`, `drill`. Add your counts. After one day, some columns, such as
`partner` and `drill`, are usually empty: those come from the
after-the-workshop parts.

Look at the board together. Three questions:
1. **Which column is biggest?** That's where the process paid for itself.
2. **Which catches happened before any code existed?** (prd, consult,
   research, design) Those were the cheapest ones.
3. **Which catches came from an inspection, not from the builder's own
   testing?** (review, partner, grade, drill) The builder's own tests had
   passed before every one of them.

## Step 3 — What's real, what's staged, what's not built

**Why this step:** The most expensive mistake in a fast project is believing something's more ready than it is. Saying it out loud, in writing, is the habit.

In `LOG.md`, write three short lists about **your** Priority Guard:
- **Real:** what you saw work on the instance, as an ordinary agent.
- **Staged:** what only ran on demo data, or only in tests.
- **Not built:** capability 6 (smart urgency: the AI piece), plus
  capability 4 (the override) and capability 5 (the weekly count) if you
  stopped at the workshop slice, and anything your grade or verdict left
  open. Add the after-the-workshop parts you haven't done yet: the runbook,
  the drill and the verdict, at least.

## Step 4 — Take it home

If time is short, do this step at home.

**Why this step:** A workshop only matters if it changes what you do next week. Writing down one next step, and what's missing to take it, makes it more likely to happen.

Write one sentence for each:
1. The **next real piece of work** you'll build this way.
2. The **one stage** you'd keep even if you dropped all the others.
3. The **building block** you're missing at work today: a dev instance, a
   repo with review, a starter kit, an approver, or something else.

---

## The three things to remember

1. **The AI is the crew, not the inspector.** It types. People and checks
   decide.
2. **A check only counts if it could have failed.** You beat the guard, and
   tried to break the floor and the app on purpose. That's how you know the
   checks work.
3. **Everything is written down.** Inputs, PRD, consult, LLD, signed design, plan,
   tests, grade, and after the workshop the runbook and verdict. Someone else
   could pick your app up tomorrow.
