# Module 6 — The build loop

*⏱ 12:40 · 30 min, the batch runs over lunch, then 14:00 · 45 min*

Build one story by hand, let Claude build more over lunch, then try the app
live. **The idea:** the floor is plain code on plain data, with ServiceNow a
thin layer outside, so its tests need no instance. **The catch:** does the
`ship it` review find something real in code Claude was sure of?

## Part 1 — Your first story, by hand

### 1. Open the session

⌨️ **Terminal**, in the Claude window, after `/exit` if Claude is open:
```
cd ~/projects/priority-guard/app && claude
```
🤖 **Claude:**
```
Read BACKLOG.md and SESSION-NOTE.md. Re-check the live state of any
blocker they mention. Then tell me the top three items by gate distance.
```

### 2. 🔮 Take the top story

🤖 **Claude:** type `Take the top one.`, even if it isn't the floor.

Claude restates the story in five bullets. First, guess three test cases for
it, one unusual: step 3 compares.

### 3. Confirm it, tests first

🤖 **Claude:** if the bullets match your design, paste this, type `go` after
it, and press **Enter**. If not, say what's wrong first.
```
Confirmed. Build this story tests first: start each test's name with the
design term it proves, like "C<n>: the floor can raise a priority, never
lower it", using the term's real number from docs/DESIGN-PriorityGuard.md.
If the story proves no term, say so and name the tests after the story.
Show me them failing, then stop before any implementation.
```
⌨️ **Terminal**, in your window:
```
git branch --show-current
```
✅ It prints a new branch, never `main`.

<details><summary>🛟 It prints main</summary>

🤖 **Claude:** `Never work on main. Create a new branch for this story first.`
</details>

✅ The tests run and **fail**. Compare them with your three.

### 4. Make them pass, and check the shape

🤖 **Claude:**
```
Make them pass, with a "test" script in package.json. Which file holds the
floor function, if any?
```
✏️ **Editor:** open it. ✅ The tests pass, and any floor function has no
`GlideRecord`, `gs.` or `current.` in it.

### 5. Ship it

🤖 **Claude:** type `ship it`, then read every `/code-review` finding in
Claude's output, not on the pull request. Wrong? Tell Claude why, in one line.

🌐 **Browser:** open the pull request Claude links. ✅ It shows **Merged**.

🤖 **Claude:** type `/clear`.

## Part 2 — The batch, over lunch (start at 13:10)

### 6. Start the batch

Leave the laptop open and plugged in. ⌨️ **Terminal**, in your window, on a
Mac: `caffeinate -i`.

🤖 **Claude:** paste this. Sub-agents are helpers Claude starts; a git
worktree is a separate working copy, in its own folder.
```
Run the build loop with sub-agents on the next gate's open stories, in board
order, until the story wiring the floor into the incident table is merged.
You only plan, delegate, merge and report. Per story: one sub-agent, own git
worktree and branch; five-bullet restatement; tests first, named "C<n>: …",
failing run saved; code until the whole suite passes; ship it as CLAUDE.md
says, with bullets, both runs and every review finding in the pull request.
Parallel only without shared files. Merge one at a time, after updating from
main and re-testing. Never merge red or skip /code-review. Three failures on
one step stop that story, its pull request left open. Ask me before any
design change, business decision or instance work. Never run now-sdk install
or now-sdk auth. Don't create, close or relabel issues by hand. End with a
table (story, pull request, failing/passing counts, findings and actions,
outcome and why) and the next gate's live count of open stories.
```
Stay until a failing test run appears. Permission questions wait for you over
lunch.

### 7. Read the evidence, after lunch

Let it finish. 🌐 **Browser:** open its table's pull requests (**Pull
requests**, **Closed**).
✅ Each has five bullets, a failing then a passing run, and the
findings. The wiring story's bullets say: the rule runs before save, what the
work note says, and nothing lets priority below the floor.

⌨️ **Terminal**, in your window: **Ctrl+C** stops `caffeinate`. Then:
```
git switch main && git pull && npm test
```
✅ Every test passes.

<details><summary>🛟 A pull request skipped a check, or the batch stopped</summary>

- **No failing run, or no findings:** 🤖 `Run /code-review on pull request
  #<n>.`
- **Stopped early:** type `/exit`, then `claude`, then the same prompt.
- **Stopped for a design change:** leave it open, and tell your instructor.
  The wiring story? Skip steps 9 to 11.
</details>

## Part 3 — Install and try it live (14:00)

### 8. Build and install

⌨️ **Terminal**, in your window:
```
git switch main && git pull && git status --short
now-sdk build && now-sdk install --auth lab-pdi
```
✅ Status prints nothing, the build says `Build completed successfully`, and
the install ends with a link to your app.

<details><summary>🛟 The install fails, or says 401</summary>

Your PDI is asleep. Wake it at https://developer.servicenow.com and run the
same two lines again.
</details>

### 9. Switch the app on

🌐 **Browser**, **Admin** profile: in `sys_properties.list`, filter **Name**
by your `<SCOPE>`, the `scope` line in `app/now.config.json`, such as
`x_123456_pg_ga`. If one's **Description** says it switches the floor on,
set its **Value** to `true` and click **Update**.

<details><summary>🛟 It's read-only, with a banner about another app</summary>

Switch to your app with the banner's link or the application picker (the
globe, top right), set **Value**, then switch back to **Global**.
</details>

### 10. Mark one service as critical

🌐 **Browser**, **Admin** profile:
1. In `sys_db_object.list`, filter **Name** by `<SCOPE>`. Note the name of
   the table labelled like "Critical service".
2. Open `<that name>.list` and click **New**.
3. Set **Service** to one such as **Email**, **Floor** to **2**, tick
   **Active**, and **Submit**. That's your critical service.

### 11. Make an incident as `agent.demo`

🌐 **Browser**, **Agent** profile: in `incident.list`, click **New**. Fill
in any **Caller** and **Short description**, set **Service** to your critical
service, and **Impact** and **Urgency** to **3 - Low** (Priority shows
**5 - Planning**). **Submit**, then reopen it.

✅ **Priority** is **1 - Critical** or **2 - High**, with a work note in the
**Activity** stream.

<details><summary>🛟 The priority stayed low, or there's no work note</summary>

Low? Check the switch, the incident's **Service**, and its row's **Active**
and **Floor**. All fine, or no work note? It's a real defect.

🤖 **Claude:**
```
File a GitHub issue in plain words: <what you saw, such as "the raise saved
but no work note appeared">, with the gate label of the gate it holds up,
that gate's milestone and p0, p1 or p2. Show me first; file after I say yes.
No code.
```
Then `Take issue #<n>.`, `confirm`, tests first, `ship it`. ⌨️ In your
window, build, install and try again:
```
git switch main && git pull && git status --short
now-sdk build && now-sdk install --auth lab-pdi
```
</details>

### 12. Close the session

🤖 **Claude:**
```
We're stopping here. Update SESSION-NOTE.md: what's proven, what's
open, the exact next step, and the top three next items.
```
✏️ **Editor:** read `app/SESSION-NOTE.md`. Have Claude correct anything
"verified" you haven't seen live. Then 🤖 **Claude:**
```
Commit only SESSION-NOTE.md, on a new branch docs/session-note, then ship it.
```
Once merged, ⌨️ **Terminal**, in your window:
```
git switch main && git pull && git status --short
```
✅ `git status --short` prints nothing.

### 13. Log it

🤖 **Claude:**
```
Log this module's catches: real problems the process found, in this
session or this module's pull requests, that got fixed or changed a
decision. One line each, as "6 | <what caught it> | <what, and what was
done>", where what caught it is one of prd, consult, research, design,
guard, test, review, partner, grade, drill. Show me the lines, then append
the ones I confirm or add to ~/projects/priority-guard/catches.md.
```
Confirm a `review` line per fixed review finding, step 5's included, and a
`test` line per real live defect. Missing one? Tell Claude to add it.

## You now have

- Your stories up to the wiring story, merged, and the floor working live.
- The session note merged, a clean `main`, and this module's catches in
  `catches.md`.
