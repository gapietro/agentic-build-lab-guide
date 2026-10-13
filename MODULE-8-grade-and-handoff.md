# Module 8 — Grade and handoff: could someone else own this?

*Workshop · 15:10 · 45 minutes*

**In the workshop:** Part A: predict, allow the secrets scan, run the grade,
read it, file its findings and merge `GRADE.md`. The real grade (Part A
again), Parts B and C (the runbook, the drill and the verdict) and steps
10–11 are ⏭ after the workshop.

[← Module 7](MODULE-7-break-it.md) · [Lab home](README.md) · [Module 9 →](MODULE-9-debrief.md)

---

## What you'll do

Two checks that only make sense once there's something to hand over:

1. **The grade.** `/prove-it:grade` behaves like a demanding senior engineer
   who has never met you. It **runs** the build and the tests before it
   scores anything. Anything it couldn't run is marked **unverified**, and
   unverified scores zero.
2. **The handoff drill.** You write a runbook and **freeze** it. Then your
   partner breaks your app on purpose while you're out of the room. You
   diagnose it using **only the runbook**, in a Claude session that knows
   nothing else.

**The rules that keep the drill honest:**
- Whoever plants the failure doesn't diagnose it. (Option B in step 7 is
  the weaker exception, for when you have no partner.)
- The runbook is frozen **before** anyone chooses what to break. Edit it
  afterwards, and you'd be writing it to the answer.

**The catch to watch for.** A runbook always looks complete to the person
who wrote it. Does yours get you to the cause, from the symptom alone?

---

## Before you start

- [ ] Module 6 is done (Module 7 is optional on the day).
- [ ] You're on `main`, and it's clean: if you did Module 7, you're back
      from `test/break-floor`. You check this in step 2, once Claude is
      open.
- [ ] Your app is installed on your PDI, from the latest `main`.
- [ ] No Claude session is open yet: you start one in step 2. If a Claude
      session is still open, type `/exit`.

### Where each step happens

This module moves between Claude, your own terminal, your editor and the
browser. Every action is labelled with **who** does it, and **where**:

| Label | What you do | Folder |
|---|---|---|
| **🤖 Claude** | Type the prompt into Claude Code, or `/exit` to quit it. Claude runs the commands. Step 8 uses a **fresh** session with no memory of the build | `~/projects/priority-guard/app` |
| **⌨️ You** | Type it yourself, in a normal terminal: starting Claude, and the step 8 session start | `~/projects/priority-guard/app` |
| **🔍 Check** | Claude runs a check; **you read its raw output**, not Claude's summary of it | `~/projects/priority-guard/app` |
| **✏️ Editor** | Your text editor, for reading files and for changes you make **by hand** | — |
| **🌐 Browser** | Your instance, in the **admin** or **agent** browser profile the step names | — |

If a block doesn't start with a label, it belongs to the label just above it.

---

## Part A — The grade

### Step 1 — 🔮 Predict it

**Why this step:** You write your guess before you see the grade. Then you can tell how well you judge your own work, which matters most when nobody else is checking it.

**✏️ Editor:** in `LOG.md`, write the score out of 100 you expect, and the one weakness you
think it will find.

### Step 2 — Allow the grade's secrets scan

**Why this step:** The grade only gives credit for what it can actually check. Letting its scan run lets it really look for leaked passwords and keys, instead of skipping that check.

Part of the grade scans the repo for secrets. It runs read-only commands
such as `git ls-files`, `git log -p`, `grep` and `sed`, and writes a few
temporary files outside the repo.

In **auto mode** (set by the settings file you installed in Module 0), the
scan runs without stopping to ask you. You don't need to add any rules.

**⌨️ You:** start Claude in the repo:
```
cd ~/projects/priority-guard/app
claude
```

**🔍 Check** that you're on a clean `main`:
```
Run exactly this and show me the raw output, unedited: git -C ~/projects/priority-guard/app branch --show-current && git -C ~/projects/priority-guard/app status --short
```
✅ **Check:** it prints `main` and nothing else.

⚠️ **If you see…** *another branch name, or a list of files:* get back to a
clean `main` before you grade. **🤖 Claude:**
```
Run git -C ~/projects/priority-guard/app switch main and show me the output. Change nothing else.
```
Then run the 🔍 Check above again. Still lists files? They're leftovers
from Module 7's reviewer. **🤖 Claude:**
```
Switch ~/projects/priority-guard/app to test/break-floor, commit the files git status lists there, then switch back to main. Never commit them on main.
```
Then run the 🔍 Check again: it must print `main` and nothing else.

⚠️ **If you see…** *Claude asks permission for a read-only command like
`git ls-files`, `git log`, `grep` or `sed` during the grade:* choose **1**
(**Yes**). **Never** choose "don't ask again": that saves a lasting rule,
and it can land in a settings file inside the repo.

If the scan can't run, it's marked **unverified**, and that caps the
score. Keep this Claude session open for step 3.

### Step 3 — Run the grade

**Why this step:** A grader who doesn't know you can't be talked round. It runs the build and the tests itself, so the score shows what works, not what you say works.

**🤖 Claude** (`~/projects/priority-guard/app`, the session from step 2): the session open:
```
Read BACKLOG.md and SESSION-NOTE.md. Re-check the live state of any
blocker they mention. Then tell me the top three items by gate distance.
```
Then type:
```
/prove-it:grade
```
With no milestone named, it lists your milestones and asks which one to
grade. **In the workshop, choose MERGE.** (Building the whole app: see
below.)

**In a workshop, not every story is done.** If it says the milestone isn't
reached and asks whether to grade anyway, answer **yes**, and write in your
log that this is a preview. `GRADE.md` will say so at the top. A preview is
honest about being a preview.

Don't explain the app to it, or tell it what you're proud of. It reads the
repo cold. If Claude Code asks permission to run the build or the tests,
approve each one and note what it was.

Before it installs, it asks *"Which alias should I install to?"* Reply with
**only** your alias name:
```
<PDI_ALIAS>
```
When Claude then asks permission to run `now-sdk install --auth <PDI_ALIAS>`,
this is the **one exception** to the permission box in
[Lab home](README.md), section 7: check the command names **your** alias,
then choose **1** (yes, once). Never choose 2. If it asks to run
`now-sdk auth`, or to install with a different alias: choose 3 (No).

**In the workshop, expect a capped score.** You haven't built the override
or the weekly count, so the design terms behind them have no tests. The grade
says so, and caps the score. That's the grade being honest, not you failing.

**The real grade comes after the workshop.** On the day, the grade is a
preview. The first after-the-workshop item, after step 4, runs Part A again
as a real grade.

✅ **Check:** `GRADE.md` has a score, the arithmetic behind it, every
**unverified** item, and any problem that **caps** the score.

### Step 4 — Read it like a stranger would

**Why this step:** A score on its own teaches you little. Reading the reasons behind it, and putting the findings on your board, turns them into work someone will actually do.

1. Compare the score and the main weakness with your prediction.
2. Find every **unverified** item. Why couldn't it check that?
3. Find any **cap**. One serious problem limits the whole score, however good
   the rest is.

**🤖 Claude:** it offers to file the findings as stories. Type `approve`, then
`Dry run first.`, read it, then `apply`.

Then put the grade into the repo. The grade added `GRADE.md`'s allow line but
didn't commit anything. **✏️ Editor:** read `.gitignore` first: it should now
end with `!/GRADE.md`, and nothing else should be new. **🤖 Claude:**
```
Commit GRADE.md, .gitignore and BACKLOG.md in ~/projects/priority-guard/app
together on a new branch, chore/grade, never on main, then ship it.
```

Once it's merged, go back to an up-to-date `main`. **🔍 Check:**
```
Run exactly this and show me the raw output, unedited: git -C ~/projects/priority-guard/app switch main && git -C ~/projects/priority-guard/app pull && git -C ~/projects/priority-guard/app status --short
```

✅ **Check:** the findings are on your board, each naming the gate it holds
up, and the pull request with `GRADE.md` is merged. `git status --short`
prints **nothing** after the pull: `main` is clean. **A finding becomes a
catch only once it's fixed and merged.** Most grade findings won't be fixed
today, so most aren't catches yet.

#### ⏭ **After the workshop:** the real grade

This is the first after-the-workshop part of this module. Do it before
Part B.

**Why this step:** The grade on the day was a preview: not every story was
built. A grade only counts when the milestone it grades has really been
reached.

**When:**
- **If you built the whole app** (Module 6 step 12): once the MERGE, INSTALL
  and DEMO counts are zero. Choose the **DEMO** milestone in step 3. Every
  gate up to DEMO is at zero, so this is a **real** grade, not a preview.
- **Otherwise:** once your Module 7 fixes are merged. Choose the same
  milestone as on the day. If it still says the milestone isn't reached,
  answer **yes** and note in your log that it's a preview again, as in
  step 3: it only becomes real once every story on that milestone is built.

Then grade again, the same way as on the day:
1. **✏️ Editor:** in `LOG.md`, write the score you expect now.
2. **⌨️ You** (window 1): start a fresh session in the repo:
   ```
   cd ~/projects/priority-guard/app
   claude
   ```
   **🔍 Check** you're on a clean `main`:
   ```
   Run exactly this and show me the raw output, unedited: git -C ~/projects/priority-guard/app branch --show-current && git -C ~/projects/priority-guard/app status --short
   ```
   It prints `main` and nothing else. If it prints another branch,
   **🤖 Claude:**
   ```
   Run git -C ~/projects/priority-guard/app switch main and show me the output. Change nothing else.
   ```
   and check again.
3. **🤖 Claude:** the session open:
   ```
   Read BACKLOG.md and SESSION-NOTE.md. Re-check the live state of any
   blocker they mention. Then tell me the top three items by gate distance.
   ```
   Then type `/prove-it:grade` and choose the milestone above. When it
   asks *"Which alias should I install to?"*, reply with only your
   `<PDI_ALIAS>`, and allow that one `now-sdk install --auth <PDI_ALIAS>`
   (choose **1**, never 2).
4. **🤖 Claude:** when it offers to file the findings, type `approve`, then
   `Dry run first.`, read it, then `apply`. **✏️ Editor:** read `.gitignore`:
   nothing should be new this time. Then **🤖 Claude:**
   ```
   Commit GRADE.md, BACKLOG.md, and .gitignore only if it changed, in
   ~/projects/priority-guard/app together on a new branch,
   chore/grade-demo, never on main, then ship it.
   ```

Its findings get filed as stories, and some may re-open an earlier gate.
Work them through the loop until those counts are zero again, before
Part B.

✅ **Check:** the real grade's `GRADE.md` is merged from `chore/grade-demo`.
**🔍 Check** that `main` is clean and up to date:
```
Run exactly this and show me the raw output, unedited: git -C ~/projects/priority-guard/app switch main && git -C ~/projects/priority-guard/app pull && git -C ~/projects/priority-guard/app status --short
```
`git status --short` prints **nothing** after the pull.

---

## Part B — The runbook

⏭ **After the workshop:** all of Part B. The drill in Part C needs a
runbook that's frozen before anyone plants a failure, so write and freeze it
first.

### Step 5 — Write it

**Why this step:** The runbook is the instructions for whoever looks after the app next. If something breaks when you're not around, it's what they'll have to go on.

Coming back after the workshop? **⌨️ You** (window 1): start a session in
the repo first:
```
cd ~/projects/priority-guard/app
claude
```
**🤖 Claude:** bring `main` up to date:
```
Run git -C ~/projects/priority-guard/app switch main && git -C ~/projects/priority-guard/app pull, and show me the output. Change nothing else.
```
Then the session open:
```
Read BACKLOG.md and SESSION-NOTE.md. Re-check the live state of any
blocker they mention. Then tell me the top three items by gate distance.
```
Then type:
```
/prove-it:handoff
```
With no argument, it checks two things: does every piece of the app point to
the design term that explains it, and is there a runbook. It writes
`RUNBOOK.md` and a `HANDOFF.md` draft.

**✏️ Editor:** open `RUNBOOK.md`. Find the **symptom → cause index** at the end. Every row
must send the reader only to things an on-call person really has: the
platform's own screens, and your app's own lists and logs. Never "ask the
builder" or "check the code".

**Fix any row that breaks this before step 6.** Either change it by hand
(**✏️ Editor**), or **🤖 Claude:**
```
In ~/projects/priority-guard/app/RUNBOOK.md, rewrite the symptom → cause
index row for "<the row's symptom>" so it points only to platform screens
and the app's own lists and logs. Change nothing else.
```
Read the row again afterwards.

### Step 6 — Freeze it

**Why this step:** Freezing the runbook means it can't change once the drill starts. If you could edit it after seeing the problem, you'd be writing the answer in, and the drill would prove nothing.

The handoff added two allow lines and committed nothing. **✏️ Editor:**
read `.gitignore` first: it should now end with `!/RUNBOOK.md` and
`!/HANDOFF.md`, and nothing else should be new. **🤖 Claude:**
```
Commit RUNBOOK.md, HANDOFF.md and .gitignore in ~/projects/priority-guard/app
on a new branch docs/runbook, never on main, then ship it.
```
When it's merged, **🤖 Claude:**
```
Switch ~/projects/priority-guard/app to main and pull. Don't change any file.
```
**🔍 Check:**
```
Run exactly this and show me the raw output, unedited: git -C ~/projects/priority-guard/app log -1 --format=%h
```
**✏️ Editor:** write that hash, as the tool printed it, in `LOG.md` as the **frozen runbook**. From now on, the
runbook doesn't change until the drill is over.

✅ **Check:** `RUNBOOK.md` is on `main`, and you've written down the hash.

---

## Part C — The drill (swap with your partner)

⏭ **After the workshop:** all of Part C. It needs your partner, to plant a
failure while you're away, and the runbook you froze in Part B.

### Step 7 — Your partner plants, while you're away

**Why this step:** Real failures turn up without warning, from someone else's change. Having your partner choose and plant the problem means you can't know the answer in advance.

**Two ways to run the drill.**
- **Option A, the normal one:** your partner plants the failure on your
  app, and you diagnose it. Follow the steps below.
- **Option B, no partner:** you plant the failure yourself, following the
  same steps, then diagnose it, and write `builder` in **Planted by**.
  It's a **weaker** drill, because you know the answer. Say so in your log, and in the handoff comment if you close
  the HANDOFF stories (step 10).

**The order.** Your partner plants yours only after you've finished
diagnosing theirs, or while you're out of the room. Never while you can see
the screen.

Before you leave, quit the session from step 2. **🤖 Claude:** type `/exit`.

**You leave the room** (or at least turn away from the screen). Your partner
sits at your computer and does this. Every action below is **your
partner's**, not yours:

1. **⌨️ Your partner** (`~/projects/priority-guard/app`): starts Claude with `claude`.
   **🤖 Claude (your partner types):**
   ```
   /prove-it:handoff plant
   ```
2. **Your partner** reads the proposal. The kit suggests **one** realistic failure and writes a
   **drill card** in the workspace, outside the repo, at
   `~/projects/priority-guard/drill-card.md`, with the steps to plant
   it, the symptom, and the exact steps to restore it. The kit never changes
   the instance itself.
   **Not realistic?** Before anyone fills in **Planted by**, run
   `/prove-it:handoff plant` again: it replaces a card that was never
   planted.
3. **✏️ Editor (your partner):** writes down the **before** state of whatever they're about to change, on
   the card, so the restore can be checked.
4. **🌐 Browser (your partner)**, in your **admin** profile: plants it, exactly as the card says.
   **✏️ Editor (your partner):** fills in **Planted by** with a role, `partner`, never a name, and
   **Planted on**.
5. **🤖 Claude (your partner types):** `/exit`, to quit Claude. Then your
   partner writes you a one-line **symptom report**, the
   way a real user would: what they saw, not why. For example: "I logged an
   incident on <your critical service> at P4 and it stayed at P4." (Use the
   service you marked critical in Module 6 step 10, for example Email.)

Then do the same on your partner's computer.

### Step 8 — Diagnose from the runbook alone

**Why this step:** This is the real test of the runbook. A Claude session with no memory of the build stands in for a stranger, so you see whether the runbook alone gets someone from the symptom to the cause.

Back at your own computer, with **no** Claude session open:

1. **⌨️ You**, in the window you'll use for Claude: start a **fresh** session
   with no memory of the build. Type these three lines; the last line,
   `claude`, starts Claude:
   ```
   cd ~/projects/priority-guard/app
   git switch main && git pull
   CLAUDE_CODE_DISABLE_AUTO_MEMORY=1 claude
   ```
2. **🤖 Claude:** the **first** thing you type is this, with your partner's symptom
   report in place of `<SYMPTOM_REPORT>`:
   ```
   /prove-it:handoff diagnose <SYMPTOM_REPORT>
   ```
3. It reads only `RUNBOOK.md`, matches the symptom to a row, and tells you
   where to look. **🌐 Browser** (your **admin** profile): open each screen
   it asks for, and type into Claude exactly what the screen shows, **word
   for word**. Don't summarise, and don't point at the answer, even if
   you've guessed it.

✅ **Check:** it names a cause, and your partner confirms whether it's the one
they planted. Write down which.

⚠️ **If you see…** *it can't find the cause from the runbook:* that isn't a
failed lab. **That's the drill working.** The runbook has a gap, and you
found it now instead of on a real outage. Write down what was missing. Once
the runbook fix is merged, it's a catch for `drill`.

### Step 9 — Restore, then the verdict

**Why this step:** A drill must leave the app the way it found it. Checking the restore, then writing the verdict, gives an honest answer on whether someone else could own this app.

1. **🌐 Browser:** your partner restores the failure **exactly** as the drill card says,
   checks it against the before state, and fills in **Restored on**.
2. **🌐 Browser** (your **agent** profile, logged in as `<AGENT_USER>`):
   check the floor works again. Type `incident.list` in the filter
   navigator, press **Enter**, and click **New**. Fill in **Caller** (any
   user) and **Short description**, set **Service** to your critical service,
   and set **Impact** to **3 - Low** and **Urgency** to **3 - Low**. Click
   **Submit**, then open the incident again from the list.
   ✅ **Check:** **Priority** shows **1 - Critical** or **2 - High**, and the
   **Activity** stream has a work note explaining the raise.
3. **🤖 Claude:** quit the diagnose session: type `/exit`. **⌨️ You:** start the
   **project** session again, in `~/projects/priority-guard/app`, with plain `claude`.
   **🤖 Claude:** type:
   ```
   /prove-it:handoff verdict
   ```
4. **✏️ Editor:** open `HANDOFF.md` and find the verdict: **READY** or **NOT READY**.
   Then read `.gitignore`: it should still end with `!/RUNBOOK.md` and
   `!/HANDOFF.md`, and nothing else should be new.
5. **🤖 Claude:** commit the verdict and ship it, verdict and all:
   ```
   Commit HANDOFF.md, and .gitignore only if it changed, on a new branch
   docs/verdict in ~/projects/priority-guard/app, never on main, then
   ship it.
   ```

**NOT READY is a valid result.** It means the check found something real.
The verdict ships exactly as written.

✅ **Check:** `HANDOFF.md` has a verdict, it's merged, and every planted card
has **Restored on** filled in.

### Step 10 — If you built the whole app: close the HANDOFF stories

⏭ **After the workshop:** this step follows the drill and the verdict.

**Why this step:** Open stories make the board say the handoff isn't done. Closing each one with its evidence records what proved it, so anyone reading later can check.

The plan filed stories on the HANDOFF gate back in Module 5, from your
design's HANDOFF row. Nothing has closed them yet. **🔍 Check:**
```
Run exactly this and show me the raw output, unedited: gh issue list --state open --label "gate:handoff" --json number,title
```
Close each one with a comment that records the evidence: the **frozen runbook
commit** (step 6), the drill's result (step 8), and the verdict (step 9). If
you planted the failure yourself (option B, step 7), say so in the comment: it's a
weaker test of "someone else can diagnose it". **🤖 Claude**, with the
numbers from the raw output and your own comment:
```
Close issues <NUMBERS> with gh issue close, each with exactly this
comment, and nothing else: "<EVIDENCE>". Don't close any other issue.
```
For example, if the raw output listed issues 14 and 17, you'd type:
```
Close issues 14 17 with gh issue close, each with exactly this
comment, and nothing else: "Handoff evidence. Frozen runbook: commit
a1b2c3d. Drill (option A, planted by partner): the diagnose session found
the planted cause from RUNBOOK.md alone. Verdict: READY, in HANDOFF.md on
main." Don't close any other issue.
```

✅ **Check:** the `gate:handoff` count is zero.
**🔍 Check:**
```
Run exactly this and show me the raw output, unedited: gh issue list --state open --label "gate:handoff" --limit 5000 --json labels --jq '[.[] | select(all(.labels[]; .name != "register"))] | length'
```

### Step 11 — If you built the whole app: grade again at HANDOFF

⏭ **After the workshop:** this step follows step 10.

**Why this step:** The first grade came before the handoff work. Grading again at the end says whether the finished app could be owned by someone else.

1. Record the **DEMO grade's commit** first: the real grade you merged
   from `chore/grade-demo`. The next grade rewrites `GRADE.md`, so the
   DEMO grade survives only in the history. First, **🤖 Claude:** bring
   `main` up to date:
   ```
   Run git -C ~/projects/priority-guard/app switch main && git -C ~/projects/priority-guard/app pull, and show me the output. Change nothing else.
   ```
   Then **🔍 Check:**
   ```
   Run exactly this and show me the raw output, unedited: git -C ~/projects/priority-guard/app log -1 --format=%h -- GRADE.md
   ```
   **✏️ Editor:** write that hash, as the tool printed it, in `LOG.md`.
2. **🤖 Claude:** type `/prove-it:grade` again, and choose the **HANDOFF**
   milestone. This is the grade that says whether the finished app could be
   owned by someone else. When it asks *"Which alias should I install to?"*,
   reply with only your `<PDI_ALIAS>`, and allow that one
   `now-sdk install --auth <PDI_ALIAS>` (choose **1**, never 2).
3. Read it. When it offers to file the findings, type `approve`, then
   `Dry run first.`, read it, then `apply`. Then **🤖 Claude:**
   ```
   Commit GRADE.md, BACKLOG.md, and .gitignore only if it changed, in
   ~/projects/priority-guard/app together on a new branch,
   chore/grade-handoff, never on main, then ship it.
   ```

Any findings it files are new stories on earlier gates. **This run ends
here**: list them in `LOG.md` as the next work, but don't work them now.

✅ **Check:** a second `GRADE.md` for HANDOFF, not a preview, merged, with its
findings filed and listed in your log.

---

## Log it

```
8 | grade | <a real finding, only once its fix is merged>
8 | drill | <what the runbook was missing, once the runbook fix is merged>
```
And: your predicted score against the real one.

**Next:** [Module 9](MODULE-9-debrief.md). What did the process catch?
