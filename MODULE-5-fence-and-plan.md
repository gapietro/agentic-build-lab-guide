# Module 5 — Fence and plan

*⏱ 30 min · 12:10*

Your repo gets its rules and goes private on GitHub; your design becomes a
plan. **The idea:** a check only counts if it could have failed, so you read
every file name before it leaves your machine, and answer five questions
before the plan is filed. **The catch:** does its review find something real?

### 1. Give the repo its rules

⌨️ **Terminal:** this window becomes the Claude window. Run
`cd ~/projects/priority-guard/app`, then `claude`.

🤖 **Claude:**
```
Copy ~/projects/prove-it-kit/templates/CLAUDE.md to CLAUDE.md and fill in
its Project facts, with the scope from now.config.json; keep the rules.
Instance alias lab-pdi.
The design record will be docs/DESIGN-PriorityGuard.md: the contract. The
LLD, docs/LLD-PriorityGuard.md, is background, frozen at sign-off: if they
disagree, the design record wins. The workspace is one folder up. No
hostnames, no credentials. At the end of .gitignore, add only these allow
lines, one per line: !/CLAUDE.md, !/docs/, !/SESSION-NOTE.md. Commit
nothing.
```
✏️ **Editor:** read `CLAUDE.md`. `ship it` comes from its **Ship ritual**.

### 2. Read every name

⌨️ **Terminal**, in your window (**Cmd+N**). `-n` makes `git add` a dry run:
```
cd ~/projects/priority-guard/app
git add -n .
grep -n -i 'service-now' CLAUDE.md ../docs/*.md
```
✅ `git add` lists nothing but `.gitignore`, `CLAUDE.md`, `now.config.json`,
`package.json`, `package-lock.json`, `tsconfig.json`, `now.dev.mjs`,
`now.prebuild.mjs`, `.eslintrc` and files under `src/`. `grep` prints nothing.

<details><summary>🛟 Any other name is listed</summary>

🤖 **Claude:** `Remove the .gitignore line that admits <the name listed>.`
Then run `git add -n .` again.
</details>

<details><summary>🛟 grep prints a line</summary>

🤖 **Claude:** `In CLAUDE.md and ../docs/*.md, replace my instance's host
name, such as dev123456.service-now.com, with the text <instance>.` Then
run the `grep` again.
</details>

### 3. Commit, and go private on GitHub

🤖 **Claude:**
```
Run git add . and commit on main as "chore: SDK project and CLAUDE.md".
Then run exactly:
gh repo create priority-guard --private --source . --remote=origin --push
```
✅ 🌐 The address `gh` prints opens your repo, marked **Private**. That's
the last commit straight to `main`.

### 4. Restart Claude, and bring the design in

🤖 **Claude:** type `/exit`, then `claude`, so it reads `CLAUDE.md`. Then:
```
Create and switch to a branch, docs/plan. Copy DESIGN-PriorityGuard.md and
LLD-PriorityGuard.md from ../docs/ into docs/, unchanged, and commit just
those two as "docs: signed design record and LLD". Only after that commit
succeeds, delete the two originals.
```

### 5. Preview the plan, and answer five questions

🤖 **Claude:**
```
/prove-it:build-plan docs/DESIGN-PriorityGuard.md
```
It shows a **preview** and files nothing. If it asks to write `plan.json`
one folder up, allow it.

Read the preview, and answer each yes or no:
1. Every story names its gate, or is `register` (blocks no gate).
2. Priority comes only from closeness to the next gate.
3. Every "done when" can be checked.
4. Every story says what passing it doesn't prove.
5. Every term of your central rule (§3 of the design) is in a "done when".

"Pending ruling — no test yet" marks an `OPEN` term: not a no. Any no? Tell
Claude in one line, such as "Story 4's done-when can't be checked", and
answer the new preview. **Never approve a preview you answered no to.**

<details><summary>🛟 It refuses: the record is unsigned</summary>

🤖 **Claude:** type `/clear`, then `I approve docs/DESIGN-PriorityGuard.md.
Ask me my name, then sign its empty §9 or §10 cells for me with it, today,
and commit only that file on docs/plan.` Then run `/prove-it:build-plan
docs/DESIGN-PriorityGuard.md` again.
</details>

### 6. File the plan, and take your first count

🤖 **Claude:** type `approve`, then `dry run` when it asks. Read what it
would file, then type `apply`. ✅ 🌐 GitHub's **Issues** tab lists your
stories, with milestones and labels.

⌨️ **Terminal**, in your window:
```
git diff .gitignore
gh issue list --state open --label "gate:merge" --limit 5000 --json labels --jq '[.[] | select(all(.labels[]; .name != "register"))] | length'
head -5 BACKLOG.md
```
✅ The diff adds just `+!/BACKLOG.md`. The number `gh` prints matches the
one after **Blockers:** in the last line. That's your first honest count,
and the lab's only progress number.

### 7. Close the session, and ship the plan

🤖 **Claude:**
```
We're stopping here. Update SESSION-NOTE.md: what's proven, what's
open, the exact next step, and the top three next items.
```
Then:
```
On docs/plan, commit .gitignore, BACKLOG.md and SESSION-NOTE.md as
"docs: backlog and first session note".
```
Then type `ship it`. Watch: push, pull request, review, fixes once, merge.

⌨️ **Terminal**, in your window:
```
git switch main && git pull && git status --short
```
✅ `git status --short` prints nothing. 🌐 The pull request is merged, and
no issue is closed: the plan isn't a story.

### 8. Log it

🤖 **Claude:**
```
Log this module's catches: real problems the process found, in this
session or this module's pull requests, that got fixed or changed a
decision. One line each, as "5 | <what caught it> | <what, and what was
done>", where what caught it is one of prd, consult, research, design,
guard, test, review, partner, grade, drill. Show me the lines, then append
the ones I confirm or add to ~/projects/priority-guard/catches.md.
```
Confirm a `review` line for each real finding on the plan's pull request
that got fixed.

## You now have

- A private `priority-guard` repo whose clean `main` holds `CLAUDE.md`, the
  signed design and LLD in `docs/`, `BACKLOG.md` and `SESSION-NOTE.md`.
- Your stories on GitHub, your first honest count, and this module's
  catches in `catches.md`.
