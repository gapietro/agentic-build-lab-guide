# Module 5 — The fence and the plan

*Workshop · 12:00 · 45 minutes*

**In the workshop:** do all fourteen steps. Claude does the routine typing; don't skip the guard test (Step 4), the allow list (Step 2) or the file list check (Step 7).

[← Module 4](MODULE-4-design.md) · [Lab home](README.md) · [Module 6 →](MODULE-6-build-loop.md)

---

## What you'll do

The plans are signed. Before anyone digs, the site gets a **fence** and a
**build plan**.

- **The fence** is your app's code repo, `~/projects/priority-guard/app`. It
  **rejects every file by default**, and only the files you name get in.
  Then you **try to commit a secret**, to prove the fence works.
- **The plan** comes from your signed design: milestones and small stories
  on GitHub. Every story says which gate it's holding up. Things worth
  recording that hold up no gate go on a watch list, which the kit calls the
  **register**.

**The idea to watch for.** A check only counts if it could have failed.
You've never seen the guard fire. In step 4 you try to beat it.

---

## Before you start

- [ ] `~/projects/priority-guard` holds `brief/`, `CONSULT.md`, `inputs/`, and in `docs/`
      the signed `LLD-PriorityGuard.md` and `DESIGN-PriorityGuard.md`.
- [ ] `gh auth status` is green.
- [ ] **Choose two values now** and write them in your values table:
  - `<APP_REPO>`: your app's GitHub repo, `your-account/priority-guard`. It
    **must not exist yet**.
  - `<SCOPE>`: your app's scope: your instance's vendor prefix, then `pg_`
    and your initials, for example `x_123456_pg_ga`. **18 characters at
    most.** Find the prefix in your admin profile (**🌐 Browser**): type
    `sys_properties.list` in the filter navigator and look up
    `glide.appcreator.company.code`. The scope is `x_<that value>_pg_<initials>`.
- [ ] You have **two terminal windows** open, side by side. Window 1 is for
      Claude, window 2 is a normal terminal. Every step says which one to use.

### Where each step happens

This module switches between Claude and your own commands a lot. Every
action is labelled with **where** you do it:

| Label | What it is | Folder |
|---|---|---|
| **🤖 Claude** | Terminal window 1: Claude Code, started with `claude`. Type the prompt or kit command shown, or `/exit` to quit Claude; Claude runs the commands | `~/projects/priority-guard` in steps 1–5.2, then `~/projects/priority-guard/app` |
| **🔍 Check** | Terminal window 1: a prompt that asks Claude to run one check command. Read the **raw output** of the command itself, not Claude's summary of it | Same as 🤖 Claude |
| **⌨️ You** | A normal terminal where **you** type the command yourself, never Claude: window 2, or window 1 when you start Claude | The folder in brackets |
| **✏️ Editor** | Your text editor, for changes you make **by hand**, such as allow lines and `LOG.md` | — |
| **🌐 Browser** | GitHub, and your PDI in your **admin** browser profile | — |

Claude does the routine typing from step 1 on. Its shell goes back to the
folder Claude was started in after every command, so every prompt uses full
paths. You type the guard test (step 4), the SDK project setup (step 5.1)
and the first honest count (step 12) yourself. Allow lines are your
decision: Claude may propose or add one, but none goes in unread. You read
`.gitignore` before each commit that changes it. If a block doesn't start
with a label, it belongs to the label just above it.

---

## Steps

### Step 1 — Create the app folder

**Why this step:** Your app's code needs its own folder and its own history of
saved changes, kept apart from the customer's material one folder up. Setting
your name and a GitHub noreply email now means every change says who made it,
without putting your personal email online.

**⌨️ You** (window 1, `~/projects/priority-guard`): start Claude in the
workspace. It does steps 1–3 from here.
```
cd ~/projects/priority-guard
claude
```

**🤖 Claude:** type this prompt (with your values):
```
Create the folder ~/projects/priority-guard/app and make it a new git
repository whose first branch is main: git init -b main. Then, for that
repository only (not --global), set user.name to "<your name or handle>"
and user.email to "<your GitHub noreply email>". Use full paths in every
command. Don't create any other file, and don't commit or push anything.
Don't read anything outside ~/projects/priority-guard and
~/projects/prove-it-kit.
```
**Your GitHub noreply email** keeps a personal email out of the history.
To find it (**🌐 Browser**): on GitHub, open **Settings → Emails** and tick
**Keep my email addresses private**. GitHub then shows your noreply
address. It looks like `12345678+your-account@users.noreply.github.com`.
Copy it exactly.

**When Claude asks permission** to run a command, follow the box in
[Lab home](README.md), section 7, *When Claude asks permission*.

✅ **Check:** git's output says it created an empty repository in `.../priority-guard/app/.git/`.

⚠️ **If your instructor tells you, before you start, that `now-sdk init`
needs an empty folder:** use the order in step 5.1's ⚠️ from the start:
make the empty folder and run `now-sdk init` first (items 1 and 2 of that ⚠️),
then steps 1–4, then step 5 from item 5.2 on.

### Step 2 — An allow list, before the first commit

**Why this step:** Most `.gitignore` files (the file that tells git what to
leave out) ban things they've seen before, but sensitive material has no fixed
shape. An **allow list** only has to know what the repo is for: everything
else is invisible to git. It must be in place before the first commit, because
once a file is committed it stays in the history.

1. **🤖 Claude:** get a local copy of the kit, at the version you installed,
   outside the workspace, then copy the allow list and start a README:
   ```
   Clone the public repo gapietro/prove-it-kit to ~/projects/prove-it-kit
   with gh repo clone, then detach it at the tag v0.1.3:
   git -C ~/projects/prove-it-kit switch --detach v0.1.3
   Then copy ~/projects/prove-it-kit/templates/gitignore.allowlist to
   ~/projects/priority-guard/app/.gitignore, and create
   ~/projects/priority-guard/app/README.md containing exactly one line:
   # Priority Guard
   Use full paths. The app repo stays on main: don't stage, commit or push
   anything. Don't read anything outside ~/projects/priority-guard and
   ~/projects/prove-it-kit.
   ```
2. **✏️ Editor:** open `~/projects/priority-guard/app/.gitignore` and read
   it. Find the line `/*`. That line hides everything; the `!` lines let
   things back in.

✅ **Check:** you can point to the line that hides everything, and to the
lines that admit `README.md` and `.gitignore`.

### Step 3 — Install the guard

**Why this step:** The allow list decides which files get in, but not what's
written inside them. The guard is a small script git runs before every commit
(every saved snapshot of your work), and it looks for things like passwords
and tokens. Without it, a secret typed into an allowed file would go straight
in.

**🤖 Claude:**
```
Install the kit's commit guard in the app repo. Run exactly this, as one
command:
cd ~/projects/priority-guard/app && cp ~/projects/prove-it-kit/hooks/pre-commit-guard.sh "$(git rev-parse --git-path hooks)/pre-commit" && chmod +x "$(git rev-parse --git-path hooks)/pre-commit"
Don't edit the script. Stay on main; don't stage, commit or push anything.
Don't read anything outside ~/projects/priority-guard and
~/projects/prove-it-kit.
```

✅ **Check:** `.git/hooks/pre-commit` exists. It runs before every commit.

### Step 4 — 🔮 Try to beat the guard

**Why this step:** A check only counts if it could have failed. Writing your
prediction down first shows you what you really expected, not what you
remember expecting once you've seen the result. Then you try to get a fake
secret past the guard, so you know how it behaves before you trust it with
real code.

First predict, in `LOG.md` (**✏️ Editor**): will the guard stop a commit
that contains a token? Then, in **⌨️ You** (window 2, `~/projects/priority-guard/app`),
go to the repo:
```
cd ~/projects/priority-guard/app
```
and **type** these (don't paste):
```
git add .gitignore README.md
echo 'FAKE_TOKEN=do-not-use-0000' >> README.md
git add README.md
git commit -m "chore: initial scaffold"
```

✅ **Check:** the commit is **blocked**, and the guard says why. Then type
`git log`. It prints `fatal: your current branch 'main' does not have any
commits yet`. That error is **the good result**: nothing got in. This is
**the check working**, not a catch: nothing real was stopped. Write it in
`LOG.md`.

⚠️ **If you see…** *the commit went through:* that's the most important
finding of the day, and a real **catch**. The guard can't be trusted. Tell
your instructor, and don't push anything until it's understood.

Now remove the fake token and commit cleanly, still in **⌨️ You**:
```
echo "# Priority Guard" > README.md
git add README.md
git commit -m "chore: initial scaffold"
```

✅ **Check:** this commit succeeds. The guard ran and passed.

### Step 5 — The SDK project, and prove it builds

**Why this step:** This sets up the ServiceNow app itself and proves it
compiles before you write any real code. Setup tools can change your files, so
you also check the fence is still in place and that build output and
downloaded packages stay out of git. If the empty project doesn't build,
nothing you add to it will.

1. **⌨️ You** (window 2, `~/projects/priority-guard/app`): create the
   ServiceNow project. `init` signs in to your instance, so you run it
   yourself, not Claude. It gets every answer as a flag, so it asks nothing:
   ```
   cd ~/projects/priority-guard/app
   now-sdk init --appName "Priority Guard" --packageName priority-guard --scopeName <SCOPE> --template typescript.basic --auth <PDI_ALIAS>
   ```

   | Flag | Answer | Why |
   |---|---|---|
   | `--appName` | `Priority Guard` | The app's display name |
   | `--packageName` | `priority-guard` | npm package name: lower case, no spaces |
   | `--scopeName` | `<SCOPE>`, for example `x_123456_pg_ga` | Your instance's vendor prefix, then `pg_` and your initials. **18 characters at most** (the SDK refuses longer). Initials keep it unique if two people ever share an instance |
   | `--template` | `typescript.basic` | Plain TypeScript, no front end. The app has no UI of its own, so it needs no React or Vue |
   | `--auth` | `<PDI_ALIAS>` | Always name your instance. Without it, `init` uses whichever alias is the default |

   ✅ **Check:** it ends with `Application created successfully.` and the
   folder now has `now.config.json`, `package.json` and `src/`. A warning
   that a newer SDK version is available is fine: don't upgrade mid-lab.

   ⚠️ **If you see…** *it still asks questions:* answer with the values in
   the table above. If it asks for a template, choose **typescript.basic**.

   ⚠️ **If you see…** *`init` refuses to run, with an error saying the
   folder isn't empty:* your SDK version wants an empty folder. Start the
   folder again, in this order, and keep the allow list **before the first
   commit**:
   1. **⌨️ You** (window 2): delete the app folder and make it again, empty.
      Nothing has been pushed, and the only commit is the step 4 scaffold,
      which you redo:
      ```
      cd ~/projects/priority-guard
      rm -rf ~/projects/priority-guard/app
      mkdir -p ~/projects/priority-guard/app
      ```
   2. **⌨️ You** (window 2): the `cd` and `now-sdk init` lines above.
   3. **🤖 Claude:** step 1's prompt (`git init -b main`, your name and
      email), then step 2 (the allow list) and step 3 (the guard).
   4. **⌨️ You:** step 4 (beat the guard, then the clean commit).
   5. Carry on from item 5.2 below.

   If anything else goes wrong, stop and ask your instructor.
2. **Restore the allow list.** `now-sdk init` writes its own short
   `.gitignore` over yours (SDK 4.12 does this every time). Put the kit's
   allow list back.

   **🤖 Claude:**
   ```
   now-sdk init replaced ~/projects/priority-guard/app/.gitignore with its
   own. Copy ~/projects/prove-it-kit/templates/gitignore.allowlist over it
   again. Change nothing else. Stay on main; don't stage, commit or push
   anything. Don't read anything outside ~/projects/priority-guard and
   ~/projects/prove-it-kit.
   ```
   **🔍 Check:**
   ```
   Run exactly this and show me the raw output, unedited:
   grep -n '^/\*' ~/projects/priority-guard/app/.gitignore
   ```
   `grep` must print **exactly one line**, the `/*`. Nothing was committed
   with the SDK's version, so nothing leaked.

   **Remove the template's examples.** The `typescript.basic` template ships
   two sample files that are not part of your app: a business rule on the
   incident table and a client script that shows "Table loaded
   successfully!!" on every incident form. Left in, they install with your
   app and run on every incident.

   **🤖 Claude:**
   ```
   Delete the example files the now-sdk template created in
   ~/projects/priority-guard/app: src/fluent/example.now.ts and
   src/server/script.ts. If the template created different example files,
   list them and ask me before deleting anything. Keep the tsconfig files.
   Don't delete anything else. Don't stage, commit or push anything.
   ```
   **🔍 Check:**
   ```
   Run exactly this and show me the raw output, unedited:
   grep -rn -e "my_client_script" -e "LogStateChange" -e "Table loaded" ~/projects/priority-guard/app/src
   ```
   It prints **nothing**: no example rule or script is left.
3. **Move Claude into the repo.** **🤖 Claude** (window 1): type `/exit`.
   Then **⌨️ You** (window 1): start Claude again **in the repo**. From now on,
   Claude always runs here:
   ```
   cd ~/projects/priority-guard/app
   claude
   ```
   **🤖 Claude** (`~/projects/priority-guard/app`): type this prompt:
   ```
   now-sdk init just created files in ~/projects/priority-guard/app.
   Compare them with the allow lines already in
   ~/projects/priority-guard/app/.gitignore. Propose any allow line to
   append at the end: only what belongs in source control for this SDK
   project. Not dist, not node_modules, nothing that holds credentials.
   Show me the list first. Don't write it yet. Stay on main; don't stage,
   commit or push anything. Don't read anything outside
   ~/projects/priority-guard and ~/projects/prove-it-kit.
   ```
   Read the proposal. It's **your** decision. A reasonable proposal is
   usually **nothing** (the kit's list already covers the SDK's files), or
   `!/.vscode/` (the editor's settings folder). Say **no** to anything
   under `dist`, `node_modules` or `.snc`, and to any name containing
   `auth`, `env`, `cred` or `secret`. If you agree with all of it, type
   `confirm` (in Claude). If not, say in one line which line to drop, and
   check the new list before you type `confirm`.
4. **🤖 Claude** (`~/projects/priority-guard/app`):
   ```
   Install the packages and build the empty project. This session runs in
   ~/projects/priority-guard/app, so run, from there:
   npm install
   then
   now-sdk build
   If the build fails, show me the error and stop: don't change any file to
   fix it. Never run now-sdk auth. Stay on main; don't stage, commit or push
   anything. Don't read anything outside ~/projects/priority-guard and
   ~/projects/prove-it-kit.
   ```
   **🔍 Check:**
   ```
   Run exactly this and show me the raw output, unedited:
   git -C ~/projects/priority-guard/app status --short
   git -C ~/projects/priority-guard/app check-ignore -v dist
   git -C ~/projects/priority-guard/app check-ignore -v node_modules
   ```

✅ **Check:** the build finishes without errors. `git status --short` shows
no `dist/` and no `node_modules/`. Both `check-ignore` lines name a rule
that hides them.

⚠️ **If you see…** *the build fails:*
1. **✏️ Editor:** copy the **first** error line into `LOG.md`.
2. **🤖 Claude:**
   ```
   Explain this build error in plain words. Don't change any file.
   ```
3. If it says a file (often an `index` file under `src/`) still **imports**
   one of the example files you deleted, let Claude remove **only that
   import line**:
   ```
   Remove only the import of the deleted example file from that file in
   ~/projects/priority-guard/app/src. Show me the change before you save
   it. Change nothing else. Stay on main; don't stage, commit or push
   anything.
   ```
   Read the change, then run the build again (the prompt in item 4).
4. Any other error: stop and ask your instructor.

### Step 6 — The project's rules

**Why this step:** `CLAUDE.md` is the file Claude reads at the start of every
session to learn this project's facts and rules. Filling it in once means
Claude works to your scope, your instance and your design every time, instead
of guessing. Reading it yourself means you know what Claude has been told to
do.

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

### Step 7 — Read the file list, then go private on GitHub

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
- anything you agreed to in step 5.3, for example files under `.vscode/`

Not every name has to appear: a file committed in step 4 and not changed
since won't show. **Any other name: stop.** Tell Claude which one, fix
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

### Step 8 — Restart, and start the plan branch

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

### Step 9 — Bring the signed design in, by name

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

### Step 10 — Preview the plan

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

### Step 11 — Approve, dry run, apply

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
on. `BACKLOG.md` and `.gitignore` are committed in step 13, on `docs/plan`.

### Step 12 — Your first honest count

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

### Step 13 — The first session close

**Why this step:** Claude doesn't remember anything between sessions. The
session note writes down what's proven, what's still open and what comes next,
so the next session, or a teammate, starts from a file instead of from memory.

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

✅ **Check:** `SESSION-NOTE.md` lists what's proven, what's open, the next
step and the top three.

⚠️ **If you see…** *Claude already committed it:* don't commit again. Check
the commit is on `docs/plan`, and that `.gitignore` ends with
`!/BACKLOG.md` and `!/SESSION-NOTE.md`. If `BACKLOG.md` was left out of
that commit, have Claude commit it on `docs/plan` too.

### Step 14 — Ship the plan

**Why this step:** `ship it` runs the same steps every time: push, a pull
request (a request to add your change to the main copy), a review, fixes, then
merge. The plan goes through review like any other change. It also shows you
the ritual on something small before you use it on code.

**🤖 Claude** (`~/projects/priority-guard/app`):
```
ship it
```
Watch the ritual run: push, pull request, review, fixes once, merge when
green, branch deleted.

Then **🔍 Check** (`~/projects/priority-guard/app`):
```
Run exactly this and show me the raw output, unedited:
git -C ~/projects/priority-guard/app switch main && git -C ~/projects/priority-guard/app pull && git -C ~/projects/priority-guard/app status --short
```

✅ **Check:** the pull request is merged on GitHub. **No story was closed** by
it, and the count from step 12 hasn't changed: the plan isn't a story. The
raw output shows the switch to `main` and the pull worked, and `git status`
lists nothing: it's clean.

---

## Log it

- In `LOG.md`: your prediction about the guard, and what happened.
- In `catches.md`, only real catches, for example:
  ```
  5 | review | <a real finding on the plan's pull request, now fixed>
  ```

**Next:** [Module 6](MODULE-6-build-loop.md). The build.
