# After the workshop — finish the app

*⏱ Several sessions, at your own pace · your partner joins for Parts 2 and 4*

Finish the app, then attack, grade and hand it over. **The catch:** others
find what your passing tests missed.

<details><summary>🛟 You put your machine back after Module 9</summary>

Set the lab up again, then switch off again what you switched back on:
```
node ~/projects/agentic-build-lab-guide/files/merge-claude-settings.mjs
mv ~/.claude/CLAUDE.md ~/.claude/CLAUDE.md.off
claude plugin disable <name>
```
</details>

## Part 1 — Finish the build

### 1. Review the LLD

✏️ **Editor:** check `priority-guard/app/docs/LLD-PriorityGuard.md`:
1. §1: each capability built or deferred; capability 6 as consulted.
2. §3: a plain-code floor, and when it runs, such as *a before business
   rule, insert and update*.
3. §4: who edits the critical list, who overrides, Tier 1 approval,
   cross-scope access.
4. §5: failure modes for the floor and the override.
5. §6: tests as an ordinary agent.
6. §7: matches your Module 3 script.

Never edit the signed LLD: a behaviour change goes to
[Part 3](#part-3--change-the-design-when-a-fix-needs-it).

### 2. Find the next gate

⌨️ **Terminal**, in your window:
```
cd ~/projects/priority-guard/app
for g in merge install demo handoff; do
  echo "$g: $(gh issue list --state open --label "gate:$g" --limit 5000 --json labels --jq '[.[] | select(all(.labels[]; .name != "register"))] | length')"
done
```
✅ The next gate is the first count not at 0, whatever `BACKLOG.md`
says. Only `handoff` left? Go to Part 2.

### 3. Build with sub-agents

In the Claude window: `cd ~/projects/priority-guard/app && claude`.
🤖 **Claude:**
```
Read BACKLOG.md and SESSION-NOTE.md. Re-check the live state of any
blocker they mention. Then tell me the top three items by gate distance.
```
Then:
```
Run the build loop with sub-agents on the next gate's open stories, in board
order, until no open stories are left on the next gate.
You only plan, delegate, merge and report. Per story: one sub-agent in its
own git worktree and branch; a five-bullet restatement; tests first, named
"C<n>: …", with the failing run saved; code until the whole suite passes;
then ship it as CLAUDE.md says, with the bullets, both runs and every review
finding in the pull request. Parallel only without shared files. Merge one
at a time, after updating from main and re-testing. Never merge red or skip
/code-review. Three failures on one step stop that story, its pull request
left open. Ask me before any design change, business decision or instance
work. Never run now-sdk install or now-sdk auth. Don't create, close or
relabel issues by hand. End with a table: story, pull request, failing and
passing counts, findings and what was done, merged or stopped and why. Then
the live count of open stories on the next gate.
```
🌐 **Browser:** ✅ each merged pull request shows the bullets, a failing then
a passing run, and the findings.

Stopped for a design change? Part 3. Before DEMO, 🤖 ask: `Which design
terms, boundary terms too, have no test named with their id? Is the demo
data seeded in src/?` Build any gap.

### 4. Build and install

⌨️ **Terminal**, in your window:
```
git switch main && git pull && git status --short
now-sdk build && now-sdk install --auth lab-pdi
```
✅ Status prints nothing, the build says `Build completed successfully`, and
the install ends with a link to your app.

After the first install, 🌐 **Browser**, **Admin** profile:
1. In `sys_user.list`, create `im.demo` with roles `itil` and your override
   role (in your design, starting with `<SCOPE>`), and `owner.demo` with
   `itil`.
2. **Set Password** on each: set one, note it, untick **Require password
   change**.
3. In `cmdb_ci_service.list`, set your critical service's **Owned by** to
   `owner.demo`.
4. Tick **Tier 1** on its critical services row, if there is one.

### 5. Check it live

🌐 **Browser:** as stories land, check them on your critical service, as
the right user (your name, top right, **Impersonate user**):
- the floor, as `agent.demo`: Impact and Urgency **3 - Low** save at **1**
  or **2**, with a work note;
- an override with a reason, as `im.demo`;
- a Tier 1 override waiting, then approved by `owner.demo`;
- the weekly count.

<details><summary>🛟 A check fails</summary>

🤖 `File a GitHub issue for <what you saw>, with its gate label, milestone
and priority label.` Then `Take issue #<n>.`, `confirm`, tests first and
`ship it`.
</details>

Show DEMO live, as `agent.demo`, to whoever plays the customer. Then
🤖 **Claude**, per proved INSTALL and DEMO story, numbered in the table:
```
Close issue #<n> with gh issue close and exactly this comment: "<who saw
what, as which user, when>". Close no other issue.
```

🤖 **Claude**, to close the session:
```
We're stopping here. Update SESSION-NOTE.md: what's proven, what's
open, the exact next step, and the top three next items.
```
Then `Commit only SESSION-NOTE.md, on a new branch docs/session-note, then
ship it.`

Repeat steps 2 to 5 until `merge`, `install` and `demo` print 0.

## Part 2 — Break it, for real

### 1. Run a fresh reviewer

⌨️ **Terminal**, in your window, set aside the day's reviewer branch
(`not found` is fine):
```
cd ~/projects/priority-guard/app
git branch -m test/break-floor test/break-floor-day
```
🤖 **Claude**, fresh session in the repo, no session open:
```
Review someone else's work in this repo. One rule must hold: an incident
on a critical service can never be saved below that service's floor,
except by a recorded override that follows the design's approval rules.
Break it. Don't trust SESSION-NOTE.md or pull requests: re-run the checks
yourself. Probe the floor, the rule that applies it, the override, every
way an incident's priority can change, and every error path. List every
attempt. First branch test/break-floor from main and work only there.
Before any fix, make each attempt a test named with the design term it
tests, so one that gets through fails. Try every value of any finite input
set. Commit the tests there. Fix nothing, push nothing, and never run
now-sdk install or now-sdk auth.
```
✅ Its tests are on `test/break-floor`: the failing ones got through. ⌨️ In
your window: `git switch main && git status --short` ✅ prints nothing.

### 2. Fix what got through

🤖 **Claude**, fresh session, after the session open:
```
Create a new branch fix/<a few words, such as service-change> from main.
Restate the fix in five bullets and wait for my confirm. Then write a
failing test for <its test's name, or the exact steps>, copying only that
test from test/break-floor if it's there, and show me it failing. Fix the
code until the whole suite passes. Don't merge test/break-floor. Never run
now-sdk install or now-sdk auth.
```
`confirm`, red then green, `ship it`, reading every finding. Fixes that
change what the app should do need Part 3 first. Then build, install and
check live.

### 3. Swap seats

Your partner, at your computer in your **Agent** profile as `agent.demo`,
tries to save an incident on your critical service at priority 3, 4 or 5
without an override. **Don't help.** One got through? Note its exact steps,
swap back, and do step 2 for it. Then attack theirs.

<details><summary>ℹ️ Hints, only after 10 stuck minutes</summary>

- Save on a non-critical service, then change it.
- Edit it again after the raise.
- Change the priority itself, on the form or list.
- Save twice, or edit from the list.
</details>

## Part 3 — Change the design, when a fix needs it

### 1. Amend the design

⌨️ In your window: `git switch main && git pull && git status --short`.
✅ It prints nothing. 🤖 **Claude**, fresh session in the repo, after the
session open: `/prove-it:design-challenge amend
docs/DESIGN-PriorityGuard.md`. At the read-back, type `Confirmed.`, or
`Not agreed yet.` and what to change.

### 2. Sign and merge it

🤖 **Claude:** type `/clear`, then, with your name:
```
I approve the amendment. In docs/DESIGN-PriorityGuard.md §10, sign each
blank Signed by for me as <your name>. Then commit that file on a new
branch docs/amend-floor, and ship it.
```

### 3. File and build it

Once merged, ⌨️ in your window:
`git switch main && git pull && git status --short`. 🤖 **Claude:**
`/prove-it:build-plan docs/DESIGN-PriorityGuard.md`, then `approve`. At "Dry
run first (recommended), or apply now?", type `apply now`. Then
`Commit BACKLOG.md on a new branch docs/amend-plan, then ship it.`

🤖 Then `Take issue #<n>.` with the new story's number, `confirm`, tests
first, `ship it`. Build, install and check live.

## Part 4 — Grade and hand over

### 1. 🔮 Grade at DEMO

Once `merge`, `install` and `demo` print 0. Guess the score first. ⌨️ In
your window:
```
cd ~/projects/priority-guard/app
git switch main && git pull && git status --short
```
✅ It prints nothing.

🤖 **Claude**, fresh session in the repo, after the session open:
`/prove-it:grade demo`. Reply `lab-pdi`, allow that one install (**1**,
never 2), then `approve`, `Dry run first.`, `apply`, and `Commit GRADE.md
and BACKLOG.md on a new branch chore/grade-demo, then ship it.` ✅ It isn't
a preview. Build its findings as in Part 1.

### 2. Freeze a runbook

🤖 **Claude**, fresh session: `/prove-it:handoff`. Then:
```
In RUNBOOK.md, replace each VERIFY with the table list for that screen,
such as sys_properties.list, and point every index row only at platform
screens and the app's own lists and logs. Show me each change first.
```
Approve the changes, or correct them. ⌨️ In your window:
```
grep -c VERIFY RUNBOOK.md
git diff .gitignore
```
✅ `grep` prints `0`, and the diff adds only `+!/RUNBOOK.md` and
`+!/HANDOFF.md`.

🤖 `Commit RUNBOOK.md, HANDOFF.md and .gitignore on a new branch
docs/runbook, then ship it.` Once merged, the runbook is **frozen**: don't
change it until the drill ends.

### 3. Your partner plants

Whoever plants doesn't diagnose: 🤖 `/exit`, and leave. Your partner, at
your computer:
1. ⌨️ Runs `claude` in the repo and `/prove-it:handoff plant`, and reads
   `~/projects/priority-guard/drill-card.md`. Unrealistic? `plant` again,
   before filling in **Planted by**.
2. ✏️ Writes the before state on it, 🌐 plants it in your **Admin** profile
   as it says, and fills in **Planted by** `partner` and **Planted on**.
3. 🤖 `/exit`. Writes you a symptom report, such as `My P4 incident on
   Email stayed at P4.`

No partner? Plant it yourself and write `builder`: it's a weaker drill.

### 4. Diagnose from the runbook

⌨️ In the Claude window, with Claude closed:
```
cd ~/projects/priority-guard/app && git switch main && git pull
CLAUDE_CODE_DISABLE_AUTO_MEMORY=1 claude
```
🤖 **Claude**, first, with no session open:
```
/prove-it:handoff diagnose <the symptom report>
```
🌐 **Admin** profile: open each screen it asks for; type what it shows,
word for word. ✅ It names a cause; your partner says if it's the planted
one.

### 5. Restore, then verdict

1. 🌐 Your partner restores it as the card says, checks the before state,
   and fills in **Restored on**.
2. 🌐 As `agent.demo`: ✅ an incident on your critical service at Impact
   and Urgency **3 - Low** saves at **1** or **2**, with a work note.
3. 🤖 `/exit`, plain `claude`, then `/prove-it:handoff verdict`. NOT READY
   is valid: it ships as written.
4. 🤖 `Commit HANDOFF.md on a new branch docs/verdict, then ship it.`

### 6. Close HANDOFF stories

⌨️ In your window:
`gh issue list --state open --label "gate:handoff" --json number,title`

🤖 **Claude**, with the numbers of the stories your evidence meets:
```
Close issues <numbers> with gh issue close, each with exactly this comment,
where HASH is the short hash of the last commit that changed RUNBOOK.md:
"Runbook frozen at HASH. Partner-planted drill diagnosed from it alone.
Verdict: READY." Close no other issue.
```
✅ The same command lists only stories your evidence doesn't meet yet.

### 7. Grade at HANDOFF

⌨️ In your window: `git switch main && git pull`.

🤖 **Claude:** `/prove-it:grade handoff`, then as at DEMO: `lab-pdi`, **1**,
`approve`, `Dry run first.`, `apply`, and `Commit GRADE.md and BACKLOG.md on
a new branch chore/grade-handoff, then ship it.` Its findings are your next
work.

### 8. Log it

🤖 **Claude:**
```
Log the catches since the workshop: real problems the process found, in
this repo's pull requests, issues and HANDOFF.md, that got fixed or changed
a decision. One line each, as "<module> | <what caught it> | <what, and
what was done>": module 6 for the build, 7 for attacks, 8 for the grade and
the drill; what caught it is one of prd, consult, research, design, guard,
test, review, partner, grade, drill. Show me the lines, then append the
ones I confirm or add to ~/projects/priority-guard/catches.md.
```
Confirm a line only once its fix is merged.

## You now have

A finished app, handed over, and its catches in `catches.md`.
