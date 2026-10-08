# Module 8 — Grade and handoff: could someone else own this?

*Day 3 · about 2½ hours · stages four and five*

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
- Whoever plants the failure doesn't diagnose it.
- The runbook is frozen **before** anyone chooses what to break. Edit it
  afterwards, and you'd be writing it to the answer.

**The catch to watch for.** A runbook always looks complete to the person
who wrote it. Does yours get you to the cause, from the symptom alone?

---

## Before you start

- [ ] Module 7 is done, and `main` is clean.
- [ ] Your app is installed on your PDI, from the latest `main`.
- [ ] No Claude session is open yet: you start one in step 2.

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

**Why this step:** The grade only gives credit for what it can actually check. Giving it this access first lets it really look for leaked passwords and keys, instead of skipping that check.

Part of the grade scans the repo for secrets. That needs a few more
permissions than the build and tests: reading the repo's guard script,
writing temporary files outside the repo, and running `git ls-files`,
`git log -p` and `grep`.

1. **⌨️ You:** start Claude in the repo:
   ```
   cd ~/projects/priority-guard/app
   claude
   ```
2. **🤖 Claude:** type `/permissions` and add the rules. **Your instructor
   shows you the exact rules** for your Claude Code version. When it asks
   where to save each rule, choose **User settings**, never a project
   setting: project settings live in a file inside the repo.

Without them the scan is marked **unverified**, and that caps the score.
Keep this Claude session open for step 3.

### Step 3 — Run the grade

**Why this step:** A grader who doesn't know you can't be talked round. It runs the build and the tests itself, so the score shows what works, not what you say works.

**🤖 Claude** (`~/projects/priority-guard/app`, the session from step 2): run the session open, then type:
```
/prove-it:grade
```
With no milestone named, it lists your milestones and asks which one to
grade. Choose the one your stories so far belong to.

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

**In the workshop, expect a capped score.** You haven't built the override
or the weekly count, so the design terms behind them have no tests. The grade
says so, and caps the score. That's the grade being honest, not you failing.

**If you built the whole app** (Module 6 step 12): choose the **DEMO**
milestone. Every gate up to DEMO is at zero, so this is a **real** grade, not a
preview. Its findings get filed as stories, and some may re-open an earlier
gate. Work them through the loop until those counts are zero again, before
Part B.

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
Commit GRADE.md, .gitignore and BACKLOG.md together on a new branch,
chore/grade, never on main, then ship it.
```

✅ **Check:** the findings are on your board, each naming the gate it holds
up, and the pull request with `GRADE.md` is merged. **A finding becomes a
catch only once it's fixed and merged.** Most grade findings won't be fixed
today, so most aren't catches yet.

---

## Part B — The runbook

### Step 5 — Write it

**Why this step:** The runbook is the instructions for whoever looks after the app next. If something breaks when you're not around, it's what they'll have to go on.

**🤖 Claude** (same session):
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

### Step 6 — Freeze it

**Why this step:** Freezing the runbook means it can't change once the drill starts. If you could edit it after seeing the problem, you'd be writing the answer in, and the drill would prove nothing.

**🤖 Claude:**
```
ship it
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

### Step 7 — Your partner plants, while you're away

**Why this step:** Real failures turn up without warning, from someone else's change. Having your partner choose and plant the problem means you can't know the answer in advance.

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
   **drill card** in the workspace, outside the repo, with the steps to plant
   it, the symptom, and the exact steps to restore it. The kit never changes
   the instance itself.
3. **✏️ Editor (your partner):** writes down the **before** state of whatever they're about to change, on
   the card, so the restore can be checked.
4. **🌐 Browser (your partner)**, in your **admin** profile: plants it, exactly as the card says.
   **✏️ Editor (your partner):** fills in **Planted by** with a role, `partner`, never a name, and
   **Planted on**.
5. **🤖 Claude (your partner types):** `/exit`, to quit Claude. Then your
   partner writes you a one-line **symptom report**, the
   way a real user would: what they saw, not why. For example: "I logged an
   incident on Payroll at P4 and it stayed at P4."

Then do the same on your partner's computer.

### Step 8 — Diagnose from the runbook alone

**Why this step:** This is the real test of the runbook. A Claude session with no memory of the build stands in for a stranger, so you see whether the runbook alone gets someone from the symptom to the cause.

Back at your own computer, with **no** Claude session open:

1. **⌨️ You**, in the window you'll use for Claude: start a **fresh** session
   with no memory of the build. The last line starts **🤖 Claude**:
   ```
   cd ~/projects/priority-guard/app
   git switch main && git pull
   CLAUDE_CODE_DISABLE_AUTO_MEMORY=1 claude
   ```
2. **🤖 Claude:** the **first and only** thing you type is this, with your partner's symptom
   report in place of `<SYMPTOM_REPORT>`:
   ```
   /prove-it:handoff diagnose <SYMPTOM_REPORT>
   ```
3. It reads only `RUNBOOK.md`, matches the symptom to a row, and tells you
   where to look. **🌐 Browser:** open each screen it asks for, and read out what it shows,
   **word for word**. Don't summarise, and don't point at the answer, even if
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
2. **🌐 Browser** (your **agent** profile): re-run Module 6 step 10: a critical incident at
   impact 3 and urgency 3 must save at P1 or P2.
3. **🤖 Claude:** quit the diagnose session: type `/exit`. **⌨️ You:** start the
   **project** session again, in `~/projects/priority-guard/app`, with plain `claude`.
   **🤖 Claude:** type:
   ```
   /prove-it:handoff verdict
   ```
4. **✏️ Editor:** open `HANDOFF.md` and find the verdict: **READY** or **NOT READY**.
5. **🤖 Claude:** ship it, verdict and all:
   ```
   ship it
   ```

**NOT READY is a valid result.** It means the check found something real.
The verdict ships exactly as written.

✅ **Check:** `HANDOFF.md` has a verdict, it's merged, and every planted card
has **Restored on** filled in.

### Step 10 — If you built the whole app: close the HANDOFF stories

**Why this step:** Open stories make the board say the handoff isn't done. Closing each one with its evidence records what proved it, so anyone reading later can check.

The plan filed stories on the HANDOFF gate back in Module 5, from your
design's HANDOFF row. Nothing has closed them yet. **🔍 Check:**
```
Run exactly this and show me the raw output, unedited: gh issue list --state open --label "gate:handoff" --json number,title
```
Close each one with a comment that records the evidence: the **frozen runbook
commit** (step 6), the drill's result (step 8), and the verdict (step 9). If
you planted the failure yourself (option B), say so in the comment: it's a
weaker test of "someone else can diagnose it". **🤖 Claude**, with the
numbers from the raw output and your own comment:
```
Close issues <NUMBERS> with gh issue close, each with exactly this
comment, and nothing else: "<EVIDENCE>". Don't close any other issue.
```

✅ **Check:** the `gate:handoff` count (Module 6 step 12's command) is zero.
**🔍 Check:**
```
Run exactly this and show me the raw output, unedited: gh issue list --state open --label "gate:handoff" --limit 5000 --json labels --jq '[.[] | select(all(.labels[]; .name != "register"))] | length'
```

### Step 11 — If you built the whole app: grade again at HANDOFF

**Why this step:** The first grade came before the handoff work. Grading again at the end says whether the finished app could be owned by someone else.

1. Record the **DEMO grade's commit** first: the next grade
   rewrites `GRADE.md`, so the first one survives only in the history.
   **🔍 Check:**
   ```
   Run exactly this and show me the raw output, unedited: git -C ~/projects/priority-guard/app log -1 --format=%h -- GRADE.md
   ```
   **✏️ Editor:** write that hash, as the tool printed it, in `LOG.md`.
2. **🤖 Claude:** run `/prove-it:grade` again, and choose the **HANDOFF** milestone. This is
   the grade that says whether the finished app could be owned by someone
   else.
3. Read it, then file its findings the same way as step 4 (`approve`,
   `Dry run first.`, `apply`), and merge `GRADE.md` the same way, on a new
   branch named `chore/grade-handoff` in place of `chore/grade`.

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
