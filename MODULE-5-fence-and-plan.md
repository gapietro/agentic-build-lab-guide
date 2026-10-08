# Module 5 — The fence and the plan

*Workshop · 12:10 · 30 minutes*

**In the workshop:** do all eight steps. You set up the fence at home, in
[Module 0 Step 8](MODULE-0-prework.md#step-8--set-up-your-apps-repo). Claude
does the routine typing; don't skip the file list check (Step 2) or the five
questions on the plan preview (Step 5).

[← Module 4](MODULE-4-design.md) · [Lab home](README.md) · [Module 6 →](MODULE-6-build-loop.md)

---

## What you'll do

The plans are signed. Before anyone digs, the site gets a **fence** and a
**build plan**.

- **The fence** is your app's code repo, `~/projects/priority-guard/app`,
  which you set up in Module 0 Step 8. It **rejects every file by default**,
  and only the files you name get in. You already tried to commit a secret,
  and watched the guard stop it. Today the repo gets its rules and goes to
  GitHub, private.
- **The plan** comes from your signed design: milestones and small stories
  on GitHub. Every story says which gate it's holding up. Things worth
  recording that hold up no gate go on a watch list, which the kit calls the
  **register**.

**The idea to watch for.** A check only counts if it could have failed. You
saw the guard fire at home. Today you read every file name before it leaves
your machine, and answer five questions before a plan is filed.

---

## Before you start

- [ ] Module 0 Step 8 is done: `~/projects/priority-guard/app` exists with
      one commit (`chore: initial scaffold`), the guard is installed, and
      the empty project builds. `<SCOPE>` is in your values table.
- [ ] Module 4 is done: `~/projects/priority-guard` holds `brief/`,
      `CONSULT.md`, `inputs/`, and in `docs/` the signed
      `LLD-PriorityGuard.md` and `DESIGN-PriorityGuard.md`.
- [ ] `gh auth status` is green.
- [ ] **Choose `<APP_REPO>` now** and write it in your values table: your
      app's GitHub repo, `your-account/priority-guard`. It **must not exist
      yet**.
- [ ] You have **two terminal windows** open, side by side. Window 1 is for
      Claude, window 2 is a normal terminal. Every step says which one to use.

### Where each step happens

This module switches between Claude and your own commands. Every action is
labelled with **where** you do it:

| Label | What it is | Folder |
|---|---|---|
| **🤖 Claude** | Terminal window 1: Claude Code, started with `claude`. Type the prompt or kit command shown, or `/exit` to quit Claude; Claude runs the commands | `~/projects/priority-guard/app`, for the whole module |
| **🔍 Check** | Terminal window 1: a prompt that asks Claude to run one check command. Read the **raw output** of the command itself, not Claude's summary of it | Same as 🤖 Claude |
| **⌨️ You** | A normal terminal where **you** type the command yourself, never Claude: window 2, or window 1 when you start Claude | The folder in brackets |
| **✏️ Editor** | Your text editor, for changes you make **by hand**, such as allow lines and `LOG.md` | — |
| **🌐 Browser** | GitHub, and your PDI in your **admin** browser profile | — |

Claude does the routine typing. Its shell goes back to the folder Claude was
started in after every command, so every prompt uses full paths. You type the
first honest count (step 7) yourself. Allow lines are your decision: Claude
may propose or add one, but none goes in unread. You read `.gitignore`
before each commit that changes it. If a block doesn't start with a label,
it belongs to the label just above it.

**When Claude asks permission** to run a command, follow the box in
[Lab home](README.md), section 7, *When Claude asks permission*.

---

## Steps

### Step 1 — The project's rules

**Why this step:** `CLAUDE.md` is the file Claude reads at the start of every
session to learn this project's facts and rules. Filling it in once means
Claude works to your scope, your instance and your design every time, instead
of guessing. Reading it yourself means you know what Claude has been told to
do.

**⌨️ You** (window 1): start Claude **in the repo**. For this whole module,
Claude runs here:
```
cd ~/projects/priority-guard/app
claude
```

1. **🤖 Claude** (`~/projects/priority-guard/app`): copy the kit's starter rules:
   ```
   Copy ~/projects/prove-it-kit/templates/CLAUDE.md to
   ~/projects/priority-guard/app/CLAUDE.md. Don't change it yet. Stay on
   main; don't stage, commit or push anything. Don't read anything outside
   ~/projects/priority-guard and ~/projects/prove-it-kit.
   ```
   **✏️ Editor:** open `.gitignore` and add `!/CLAUDE.md` at the very end, **by hand**.
2. **🤖 Claude** (`~/projects/priority-guard/app`): type (with your values):
   ```
   Fill in the Project facts in ~/projects/priority-guard/app/CLAUDE.md and
   keep the rules as they are. Scope <SCOPE>. Instance alias <PDI_ALIAS>.
   The design record will be docs/DESIGN-PriorityGuard.md. That is the
   contract. The LLD at docs/LLD-PriorityGuard.md is background, frozen at
   sign-off: if they disagree, the design record wins. The workspace is one
   folder up and nothing from it comes in except by an allow line. No
   hostnames, no credentials. Stay on main; don't stage, commit or push
   anything. Don't read anything outside ~/projects/priority-guard and
   ~/projects/prove-it-kit.
   ```
3. **✏️ Editor:** read `CLAUDE.md` top to bottom. Find the **Ship ritual** section. That's
   where `ship it` comes from.

✅ **Check:** `CLAUDE.md` has your scope and alias, no host name and no
password, and a Ship ritual section.

⚠️ **If you see…** *a `now-sdk install` line in `CLAUDE.md` that says
`--alias`:* change it to `--auth`. On `now-sdk install`, `--alias` is
silently ignored, and the app goes to whatever instance is the default.
That's a real **catch**. This applies only to `now-sdk install` lines: a
`now-sdk auth --add … --alias` line is correct, so leave it as it is.

### Step 2 — Read the file list, then go private on GitHub

**Why this step:** Before anything leaves your machine, you read the name of
every file going in, so nothing gets out that you can't explain. A private
repo keeps the customer's design off the public internet. After this, changes
reach `main` only through review.

**🔍 Check** (`~/projects/priority-guard/app`): list what **would** be added,
without staging anything:
```
Run exactly this and show me the raw output, unedited:
git -C ~/projects/priority-guard/app add -n .
```
(`-n` is a dry run: it only prints the names.) Read **every** file name in
the raw output. You should see only names from this list:
- `.gitignore`, `CLAUDE.md`, `README.md`
- `now.config.json`, `package.json`, `package-lock.json`
- `tsconfig.json`, `now.dev.mjs`, `now.prebuild.mjs`, `.eslintrc`, if the
  SDK created them
- files under `src/`, for example `src/fluent/index.now.ts`
- anything you agreed to in Module 0 Step 8.5, for example files under
  `.vscode/`

Not every name has to appear: a file committed in Module 0 Step 8.4 and not
changed since won't show. **Any other name: stop.** Tell Claude which one, fix
`.gitignore` by hand (**✏️ Editor**) before going on, then run the check
again. Nothing under `dist/` or `node_modules/` may ever appear.

**🤖 Claude** (`~/projects/priority-guard/app`), only once you've read the list:
```
In ~/projects/priority-guard/app, stage everything with
git -C ~/projects/priority-guard/app add . and commit on main with the
message "chore: SDK project and CLAUDE.md". Then create the private GitHub
repo and push, by running exactly:
gh repo create <APP_REPO> --private --source ~/projects/priority-guard/app --remote=origin --push
Push nothing else. Don't read anything outside ~/projects/priority-guard
and ~/projects/prove-it-kit.
```
(`git add .` is safe here only because the allow list decides what git can
see, and you've just read that list.)

✅ **Check** (**🌐 Browser**): the GitHub page shows your repo with a
**Private** badge. **This is the last commit that goes straight to `main`.**
From now on, everything goes on a branch and through review.

### Step 3 — Restart, and start the plan branch

**Why this step:** Claude reads `CLAUDE.md` only when it starts, so it needs a
restart to pick up the rules you just wrote. The plan then goes on its own
branch, a separate line of changes, so `main` (the main copy) only changes
through review. Checking the repo name first makes sure you're pointed at the
right place.

1. **🤖 Claude** (window 1): type `/exit`. That returns window 1 to a shell.
   **⌨️ You** (window 1, `~/projects/priority-guard/app`): start Claude
   again, so it reads the new `CLAUDE.md`:
   ```
   claude
   ```
2. **🤖 Claude** (`~/projects/priority-guard/app`):
   ```
   Run gh repo view --json nameWithOwner -q .nameWithOwner (this session
   runs in ~/projects/priority-guard/app) and show me its raw output. Then create and switch to a new branch:
   git -C ~/projects/priority-guard/app switch -c docs/plan
   Everything from here to the end of this module goes on docs/plan. Don't
   commit to main, and don't push. Don't read anything outside
   ~/projects/priority-guard and ~/projects/prove-it-kit.
   ```

✅ **Check:** `gh repo view` prints exactly `<APP_REPO>`, and you're on a new
branch, `docs/plan`. Everything until the end of this module goes on this
one branch.

### Step 4 — Bring the signed design in, by name

**Why this step:** The code will be checked against the signed design, so the
design has to live next to the code. You copy in only those two files, by
name, and remove the originals so there's only ever one copy to trust.
Checking for instance names first keeps server addresses out of the repo.

The signed design and the signed LLD go into the code repo, because the
code is held to them. The PRD, the consult and the technical notes stay in
the workspace: they're the customer's material, and the design cites them
without copying them. **The design record is the contract** the code is
held to. The LLD is background, frozen when you signed it: if a design
amendment changes something later, the design record wins.

First check the LLD has no instance names in it. **🔍 Check**
(`~/projects/priority-guard/app`); the raw output must be empty:
```
Run exactly this and show me the raw output, unedited:
grep -n -i 'service-now' ~/projects/priority-guard/docs/LLD-PriorityGuard.md
```
⚠️ **If you see…** *`grep` prints a line:* the LLD names your instance.
**✏️ Editor:** open `~/projects/priority-guard/docs/LLD-PriorityGuard.md`,
go to that line number, and replace the host name (for example
`dev12345.service-now.com`) with `<instance>`, by hand. Note it in
`LOG.md`. Then run the check again: it must print nothing before you go on.

**✏️ Editor:** open `.gitignore` and add `!/docs/` at the very end, by hand.

Then **🤖 Claude** (`~/projects/priority-guard/app`):
```
On branch docs/plan in ~/projects/priority-guard/app: create the folder
~/projects/priority-guard/app/docs and copy these two files into it,
unchanged:
~/projects/priority-guard/docs/DESIGN-PriorityGuard.md
~/projects/priority-guard/docs/LLD-PriorityGuard.md
Stage only .gitignore, docs/DESIGN-PriorityGuard.md and
docs/LLD-PriorityGuard.md, and commit with the message "docs: signed design
record and LLD". Only once that commit has succeeded, delete the two
originals from ~/projects/priority-guard/docs. If the commit fails, stop and
delete nothing. Don't commit to main, and don't push. Don't read anything outside
~/projects/priority-guard and ~/projects/prove-it-kit.
```

✅ **Check:** there's one copy of each, in the repo, committed on
`docs/plan`. Don't push yet.

### Step 5 — Preview the plan

**Why this step:** The plan turns the signed design into small stories, each a
piece of work you can finish and check. A preview lets you catch a bad plan
before it's filed on GitHub, where it's harder to clean up. Your five
yes-or-no answers are how you judge it.

**🤖 Claude** (`~/projects/priority-guard/app`):
```
/prove-it:build-plan docs/DESIGN-PriorityGuard.md
```
It checks the design is signed, then drafts the plan in the workspace and
shows a **preview**. It files nothing yet. If it asks to write `plan.json`
one folder up, allow that one file.

⚠️ **If you see…** *it refuses because the record is unsigned:* it names the
gap, for example an empty cell in §9 Approval. Fill it in **by hand** (**✏️
Editor**), then have Claude commit it on this branch (**🤖 Claude**: "Commit
only docs/DESIGN-PriorityGuard.md on docs/plan in
~/projects/priority-guard/app. Don't commit to main, and don't push."), and
run the command again (**🤖 Claude**).

Check the preview, and write yes or no for each:
1. Every story names the gate it's holding up, or is marked for the register.
2. Priority comes from closeness to the next gate, not from size or
   interest.
3. Each story has a "done when" you could actually check.
4. Each story says what passing it **doesn't** prove.
5. There's a story whose tests prove your central rule.

**Any "no"?** Before you type `approve`, tell Claude in **one line** what's
wrong, for example "Story 4 has no done-when you could check." It redrafts
and shows a new preview. Answer the five questions again. **Never approve
a preview you answered no to.**

### Step 6 — Approve, dry run, apply

**Why this step:** Each word is a decision you make on purpose. A dry run
shows exactly what would be filed without filing it, so `apply` holds no
surprises. Nothing appears on GitHub until you say so.

All in **🤖 Claude**. Type each when it asks:
```
approve
```
```
dry run
```
Read what it would file. Then:
```
apply
```

✅ **Check:** on GitHub, the **Issues** tab shows your stories, with
milestones and labels. `BACKLOG.md` exists in the repo.

**✏️ Editor:** read `.gitignore`. The build plan added one allow line and
committed nothing. The file should now end with `!/BACKLOG.md`, and nothing
else should be new. If another line was added, ask Claude why before you go
on. `BACKLOG.md` and `.gitignore` are committed in step 8, on `docs/plan`.

### Step 7 — Your first honest count

**Why this step:** You need one number that says how far you are from the next
gate, and it has to come from the live list on GitHub, not from memory.
Checking it against `BACKLOG.md` confirms the plan was filed the way you saw
it in the preview.

**⌨️ You** (window 2, `~/projects/priority-guard/app`):
```
cd ~/projects/priority-guard/app
gh issue list --state open --label "gate:merge" --limit 5000 --json labels --jq '[.[] | select(all(.labels[]; .name != "register"))] | length'
head -5 BACKLOG.md
```

✅ **Check:** the number from GitHub and the count in `BACKLOG.md` agree.
In `BACKLOG.md`, the count is the number after **Blockers:**, on the line
that starts with **Next gate:**.
That number is **what stands between you and the next gate**. It leaves out
register items, because they hold up nothing. It's the only progress number
this lab uses.

### Step 8 — Close the session, and ship the plan

**Why this step:** Claude doesn't remember anything between sessions. The
session note writes down what's proven, what's still open and what comes next,
so the next session, or a teammate, starts from a file instead of from memory.
Then `ship it` runs the same steps every time: push, a pull request (a request
to add your change to the main copy), a review, fixes, then merge. The plan
goes through review like any other change, and you see the ritual on
something small before you use it on code.

1. **🤖 Claude** (`~/projects/priority-guard/app`): type the session close:
   ```
   We're stopping here. Update SESSION-NOTE.md: what's proven, what's
   open, the exact next step, and the top three next items.
   ```
   If Claude offers to commit or push the note, say no: it's committed in
   item 3, on `docs/plan`.
2. **✏️ Editor:** it's a new file, so it needs its own allow line. Add this at
   the very end of `.gitignore`, by hand: `!/SESSION-NOTE.md`
3. **🤖 Claude** (`~/projects/priority-guard/app`):
   ```
   On branch docs/plan in ~/projects/priority-guard/app, stage only
   .gitignore, BACKLOG.md and SESSION-NOTE.md, and commit with the message
   "docs: backlog and first session note". Don't commit to main, and don't push. Don't
   read anything outside ~/projects/priority-guard and
   ~/projects/prove-it-kit.
   ```

   ✅ **Check:** `SESSION-NOTE.md` lists what's proven, what's open, the
   next step and the top three.

   ⚠️ **If you see…** *Claude already committed it:* don't commit again.
   Check the commit is on `docs/plan`, and that `.gitignore` ends with
   `!/BACKLOG.md` and `!/SESSION-NOTE.md`. If `BACKLOG.md` was left out of
   that commit, have Claude commit it on `docs/plan` too.
4. **🤖 Claude** (`~/projects/priority-guard/app`):
   ```
   ship it
   ```
   Watch the ritual run: push, pull request, review, fixes once, merge when
   green, branch deleted.
5. **🔍 Check** (`~/projects/priority-guard/app`):
   ```
   Run exactly this and show me the raw output, unedited:
   git -C ~/projects/priority-guard/app switch main && git -C ~/projects/priority-guard/app pull && git -C ~/projects/priority-guard/app status --short
   ```

✅ **Check:** the pull request is merged on GitHub. **No story was closed** by
it, and the count from step 7 hasn't changed: the plan isn't a story. The
raw output shows the switch to `main` and the pull worked, and `git status`
lists nothing: it's clean.

---

## Log it

- In `LOG.md`: your yes-or-no answers to the five questions on the plan
  preview (step 5).
- In `catches.md`, only real catches, for example:
  ```
  5 | review | <a real finding on the plan's pull request, now fixed>
  ```

**Next:** [Module 6](MODULE-6-build-loop.md). The build.
