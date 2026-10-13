# Module 8 — Grade: could someone else own this?

*⏱ 45 min · 15:10*

Run `/prove-it:grade`: a demanding senior engineer who has never met you. It
runs the build and the tests before it scores, and anything it couldn't run
is **unverified** and scores zero. **The catch:** what does a stranger find
that you didn't?

### 1. 🔮 Predict the grade

✏️ **Editor:** in `LOG.md`, write the score out of 100 you expect, and the
one weakness you think it will find.

### 2. Start Claude on a clean main

⌨️ **Terminal**, in the Claude window, after `/exit` if Claude is open:
```
cd ~/projects/priority-guard/app && claude
```
⌨️ **Terminal**, in your window:
```
cd ~/projects/priority-guard/app
git switch main && git pull && git status --short
```
✅ `git status --short` prints nothing.

<details><summary>🛟 It lists files</summary>

They're leftovers from Module 7's reviewer. 🤖 **Claude:**
```
Switch to test/break-floor, commit the files git status lists there, then
switch back to main. Never commit them on main.
```
Then run the same command again, in your window.

</details>

### 3. Run the grade

🤖 **Claude:** the session open:
```
Read BACKLOG.md and SESSION-NOTE.md. Re-check the live state of any
blocker they mention. Then tell me the top three items by gate distance.
```
Then type `/prove-it:grade`. Don't explain the app to it: it reads the repo
cold.
- **It lists your milestones** and asks which one: reply `merge`.
- **It says `This milestone is not reached`** and asks whether to grade
  anyway: reply `yes`. That makes it a preview. ✏️ Write "preview" in
  `LOG.md`.

### 4. Answer its questions

- **"Which alias should I install to?"** Reply only `lab-pdi`.
- **Permission for `now-sdk install --auth lab-pdi`:** choose **1**, yes
  once. It's the one install Claude runs. Never **2**.
- **Permission for `now-sdk auth`, or any other alias:** **No**.
- **Permission for `git log -p`, `grep`, `sed`, or writing a temporary file
  outside the repo:** that's its secrets scan. Choose **1**, never **2**.

✅ `GRADE.md` has a score, the arithmetic behind it, every **unverified**
item and any **cap**. If you replied `yes` above, it's headed
`Preview: milestone not reached`.

### 5. Read it like a stranger would

✏️ **Editor:** in `GRADE.md`, compare the score and the main weakness with
your prediction. Then find:
- each **unverified** row under **Rubric**, and why it couldn't check it;
- each row under **Caps applied**: one serious problem limits the whole
  score, however good the rest is.

Expect a cap: the override and the weekly count aren't built, so their
design terms have no tests. That's the grade being honest.

### 6. File its findings

🤖 **Claude:** it shows its findings as proposed stories, then stops. Type
`approve`. When it asks "Dry run first (recommended), or apply now?", type
`Dry run first.`, read what it would write, then type `apply`.

⌨️ **Terminal**, in your window:
```
git diff .gitignore
```
✅ Below the header, the only line starting with `+` is `+!/GRADE.md`.

### 7. Merge the grade

🤖 **Claude:**
```
Commit GRADE.md, .gitignore and BACKLOG.md together on a new branch
chore/grade, then ship it.
```
Once it's merged, ⌨️ **Terminal**, in your window:
```
git switch main && git pull && git status --short
```
✅ The pull request is merged, the findings are stories on GitHub, each
naming the gate it holds up, and `git status --short` prints nothing.

## You now have

- `GRADE.md` on `main`: a preview of the MERGE milestone.
- Its findings filed as stories, and listed in `BACKLOG.md`.
- A clean `main`.

**Log it:** a finding is a catch, `8 | grade | …`, only once its fix is
merged. Most aren't today: list them in `LOG.md` as open findings.

The real grade, the runbook, the drill and the verdict are on
[After the workshop](AFTER-THE-WORKSHOP.md).
