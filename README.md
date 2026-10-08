# Agentic Build Lab — build a ServiceNow app with a coding agent, and prove it works

**A hands-on workshop.** In three days you build a small ServiceNow app,
**Priority Guard**, the way real work arrives: from a use case, workshop
notes and technical notes, through a PRD and an LLD, to a reviewed,
installed, handed-over app. A coding agent (Claude Code) does the typing. You
make the decisions, and checks decide whether each piece of work may go on.

You're not here to learn this app. You're here to learn **the method**, so
you can use it on your own work next week. Every module has a moment where
the process catches something. Those moments are the lesson.

**The one idea:** the AI does the typing. People and checks do the deciding.

**The path, and the document each step leaves:**

| Inputs | → PRD | → Consult | → Research and LLD | → Challenge and sign | → Plan | → Build | → Grade and handoff |
|---|---|---|---|---|---|---|---|
| Use case, workshop notes (tech notes join at research) | Accepted PRD | `CONSULT.md` | Signed LLD | Signed design record | The board | Merged, installed code | `GRADE.md`, `RUNBOOK.md`, a verdict |

---

## 1. What you'll learn

By the end you will have done each of these yourself, once:

| You'll be able to… | Module |
|---|---|
| Review a PRD against the inputs it came from, and get it accepted | 1 |
| Turn a PRD into an architecture, and push back on AI where it doesn't belong | 2 |
| Research the platform, check every fact on your instance, and write an LLD | 3 |
| Let the AI challenge your design, and sign the contract the code is held to | 4 |
| Build a repo that refuses secrets, and turn a signed design into a plan | 5 |
| Run the build loop: tests first, one word to ship, review before merge | 6 |
| Attack your own safeguard, and check the app as an ordinary user | 7 |
| Grade the app like a stranger, and prove a runbook works by breaking the app | 8 |
| Count what the process caught | 9 |

---

## 2. The schedule

| When | Module | What you do | Leaves behind |
|---|---|---|---|
| Before the day (60–90 min) | [0 · Pre-work](MODULE-0-prework.md) | Install the tools, connect your instance, pass the pre-flight checks | A ready bench |
| Day 1, 09:00 | [1 · Inputs to PRD](MODULE-1-prd.md) | Review the PRD against the inputs; the customer accepts it | An accepted PRD |
| Day 1, 10:00 | [2 · Consult](MODULE-2-consult.md) | The agent reads the PRD and recommends an architecture | `CONSULT.md` |
| Day 1, 11:30 | [3 · Research and LLD](MODULE-3-research-and-lld.md) | Research the platform, check it on your instance, write the LLD (lunch in the middle) | A signed LLD |
| Day 2, 09:00 | [4 · Challenge and sign](MODULE-4-design.md) | The agent challenges your design; you sign the contract | The signed design record |
| Day 2, 10:45 | [5 · Fence and plan](MODULE-5-fence-and-plan.md) | The repo, the secret test, the plan | A repo and a plan |
| Day 2, 13:30 → Day 3, 10:30 | [6 · Build loop](MODULE-6-build-loop.md) | Stories, test first, reviewed, installed, checked live | An installed app |
| Day 3, 10:30 | [7 · Break it](MODULE-7-break-it.md) | A fresh reviewer and your partner attack your floor | Findings, fixed |
| Day 3, 12:45 | [8 · Grade and handoff](MODULE-8-grade-and-handoff.md) | Grade it; write a runbook; your partner breaks your app | `GRADE.md`, `RUNBOOK.md`, a verdict |
| Day 3, 15:15 | [9 · What the process caught](MODULE-9-debrief.md) | Count the catches; take it home | Your tally |
| After the workshop | [Your own PRD track](OWN-PRD.md) | The same modules on your own use case: a kick-off half day, then about two weeks to finish one slice | A working slice on your development instance, graded and handed over |
| When it's ready | [Getting it to production](PROMOTE.md) | The customer's change process, with your evidence attached | The app in production |

Times are a guide. Your instructor will keep the room together. If you fall
behind, your instructor can give you a **checkpoint** to start the next
module from, so you never miss one.

**You work in pairs.** You each build your own app on your own instance, but
twice you work on your partner's: in Module 7 you attack their safeguard, and
in Module 8 you break their app for them to diagnose. Whoever built something
never gets to be the only one who checks it.

---

## 3. What you need

Do all of [Module 0](MODULE-0-prework.md) **before the day**. It has the
details and a check for each item.

- A ServiceNow Personal Developer Instance (PDI), with admin access.
- A Mac or Linux computer. (Windows users: WSL works, but tell your instructor.)
- A Claude Code account on a paid plan, or a Claude Console account.
- A GitHub account and the GitHub CLI.
- Node.js and the ServiceNow SDK.
- Two browser profiles: one for admin, one for an ordinary agent.
- **This lab guide**: it lives in the private GitHub repo
  `gapietro/agentic-build-lab-guide`. Your instructor invites you: **accept
  the invite** (check your GitHub email or https://github.com/notifications).
  Until Module 0 you can read it on GitHub. In Module 0 Step 3 you clone it
  to `~/projects/agentic-build-lab-guide`, **outside**
  `~/projects/priority-guard`.
  (Can't use git? Your instructor can send the same guide as a zip,
  `agentic-build-lab-guide.zip`. Unzip it with
  `mkdir -p ~/projects && unzip ~/Downloads/agentic-build-lab-guide.zip -d ~/projects`.)

**Where everything goes.** Everything this lab creates lives under one base
folder, `~/projects`: the guide, your workspace, your notes and the kit's
clone. The only exception is Claude Code's own settings, which must stay in
`~/.claude`.

**You don't need Now Assist.** The app is plain code. The AI in this lab is
the one that writes the code, not one inside the app.

---

## 4. Three rules for the whole lab

**1. The guide is your checklist, not the agent's instructions.** Never paste
this guide into Claude. The kit and Claude do the work; you check it. If
Claude sees the checks, they stop being checks.

**2. Two folders, never mixed.**

| Folder | What's in it | Does Claude see it? |
|---|---|---|
| `~/projects/priority-guard/` | Your workspace: the accepted PRD, the consult, the customer's notes, then your app's repo | Yes. Run Claude here. |
| `~/projects/priority-guard-notes/` | Your notes: your log and your catch list | Never |

**3. Follow what really happens.** Claude won't word things the way this
guide does. The checks describe what a good result looks like, not exact
words. If what you see is different, don't re-run the prompt to get a
"better" answer. Write down what happened, and carry on or ask your
instructor.

---

## 5. Words you'll type

Some steps ask for one word. **Type it exactly.** The kit and your project
instructions watch for these words.

| You type | When | What happens |
|---|---|---|
| `confirmed` | Module 2, after the consult restates the brief | The consult starts |
| `Confirmed.` | Module 4, after the design challenge reads back the terms | It writes exactly those terms |
| `Not agreed yet.` | Module 4, after a read-back you don't accept | It asks for your correction |
| `approve`, then `dry run`, then `apply` | Module 5, after the plan preview | Shows, then files, the plan on GitHub |
| `approve`, then `Dry run first.`, then `apply` | Module 8, after the grade's findings | Shows, then files, the findings as stories |
| `Take the top one.` | Module 6, after the session open | Starts whatever is really at the top, not the story you expected |
| `confirm` | Modules 5–8, after Claude proposes something | Accepts it (for example, a story's five bullets) |
| `ship it` | Modules 5–8 | Push, open a pull request, review, fix once, merge when green |

**Gates.** The kit calls milestones **gates**: MERGE, INSTALL, DEMO,
HANDOFF. Every story names the gate it's holding up, and "gate distance"
means how close a story is to unblocking the next one. You'll see the word
in the prompts below and on your GitHub board.

**Session open.** Type this at the start of every module from Module 6 on:
```
Read BACKLOG.md and SESSION-NOTE.md. Re-check the live state of any
blocker they mention. Then tell me the top three items by gate distance.
```

**Session close.** Type this at the end of every module from Module 6 on:
```
We're stopping here. Update SESSION-NOTE.md: what's proven, what's
open, the exact next step, and the top three next items.
```

---

## 6. Your values

Fill this in as you go. Wherever a module shows a name in angle brackets,
type your own value.

| Name | What it is | Example | Yours |
|---|---|---|---|
| `<PDI_ALIAS>` | The name your SDK login is saved under | `mypdi` | |
| `<APP_REPO>` | Your app's GitHub repo, `owner/name` | `you/priority-guard` | |
| `<SCOPE>` | Your app's scope: vendor prefix + `pg_` + your initials, 18 characters at most | `x_123456_pg_ga` | |
| `<AGENT_USER>` | The ordinary service desk agent you test as | `agent.demo` | |
| `<OVERRIDE_ROLE>` | The app role that may override the floor | *(from your design)* | |
| `<PARTNER>` | Your partner's first name | | |

---

## 7. How to read a module

Each module has the same parts:
- **What you'll do**, and **the catch to watch for**: the moment this module is about.
- **Before you start**: tick every box.
- **Steps**, each with:
  - ✅ **Check**: what a good result looks like.
  - ⚠️ **If you see…**: what to do when it goes differently.
- **Log it**: one line for your notes. Module 9 counts them.

**Who runs each command.** Every action in a step starts with a label:

| Label | What you do | Used for |
|---|---|---|
| **🤖 Claude** | Type the prompt into Claude Code, or `/exit` to quit it. Claude runs the commands | Routine work: folders, branches, commits, builds. The AI does the typing |
| **⌨️ You** | Type the command yourself, in a normal terminal | Passwords and sign-ins, starting Claude, the guide and notes folders, the instance, and the few checks that must not go through Claude. One exception for the instance: `/prove-it:grade` (Module 8) installs through Claude, after asking you to type the alias |
| **🔍 Check** | Claude runs a check; **you read its raw output** | Checking work. The evidence is what the tool printed, not Claude's summary of it |
| **✏️ Editor** | Open the file in your text editor and change it yourself | Signatures and allow lines. Allow lines are your decision: Claude may propose or add one, but none goes in unread. You read `.gitignore` before each commit that changes it |
| **🌐 Browser** | Use the browser profile the step names | Your instance and GitHub |

**Why the split.** The lab's idea is that the AI types and people decide.
So Claude does the routine typing. You keep three things: your passwords,
your signature, and a few checks done without Claude, so at least one
check never depends on the AI's word.

**Your log.** Keep one file, `~/projects/priority-guard-notes/LOG.md`, plus
`~/projects/priority-guard-notes/catches.md`. Each catch gets one line:
```
<module> | <what caught it> | <what it caught>
```
A **catch** is a real problem the process found **and that got fixed**, or
that changed a decision, before it reached the app. Three things are **not**
catches:
- A check firing on something you planted to test it (like the fake token in
  Module 5). That's the check working: write it in `LOG.md`.
- A finding nobody has fixed yet. It counts once the fix is merged.
- A style nit, or a finding that turns out to be wrong.

"What caught it" is one of: `prd`, `consult`, `research`, `design`, `guard`,
`test`, `review`, `partner`, `grade`, `drill`. Keep `catches.md` to catch lines only, with no
headings or blank lines, so Module 9 can count them.
