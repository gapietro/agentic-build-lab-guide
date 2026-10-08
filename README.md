# Agentic Build Lab — build a ServiceNow app with a coding agent, and prove it works

**A hands-on workshop.** In one day, 09:00–17:00, you build a small ServiceNow app,
**Priority Guard**, the way real work arrives: from a use case, workshop
notes and technical notes, through a PRD and an LLD, to a reviewed,
installed app. The after-the-workshop track then finishes it and hands it
over. A coding agent (Claude Code) does the typing. You
make the decisions, and checks decide whether each piece of work may go on.

You're not here to learn this app. You're here to learn **the method**, so
you can use it on your own work next week. Every module has a moment where
the process catches something. Those moments are the lesson.

**Read it online:** https://claude.ai/artifact/LLZPgYakMRU9hWxmhughrQ (the same guide as one page,
with a menu on the left; your instructor shares the link with you). You
still clone the guide in Module 0: the steps copy files from it.

**The one idea:** the AI does the typing. People and checks do the deciding.

**The path, and the document each step leaves:**

| Inputs | → PRD | → Consult | → Research and LLD | → Challenge and sign | → Plan | → Build | → Grade and handoff |
|---|---|---|---|---|---|---|---|
| Use case, workshop notes (tech notes join at research) | Accepted PRD | `CONSULT.md` | Signed LLD | Signed design record | The board | Merged, installed code | On the day: `GRADE.md`. After the workshop: `RUNBOOK.md` and a verdict |

---

## Who this lab is for

This lab is for **ServiceNow admins, developers and architects** who want to
build on the platform with a coding agent, safely. You don't need to be a
programmer: Claude writes the code. You do need to be comfortable finding
your way around ServiceNow as an admin.

**You need working knowledge of:**

| Area | "Working knowledge" means you can… |
|---|---|
| **ServiceNow, as an admin** | Log in as admin; open a table's list and a record; create a record; create a user and give it a role; find and change a system property. (The "ServiceNow basics" box below covers the exact clicks.) |
| **Your own computer** | Install software (or get IT to); open a terminal and run a command you're given; open and edit a text file. |
| **GitHub** | Have an account and sign in. You don't need to know git: the guide gives every command. |

**Helpful, but not required:**

| Area | Why it helps |
|---|---|
| ServiceNow development (business rules, script includes, scoped apps, access rules) | Modules 3–6 make more sense when you know where app logic runs on the platform |
| Reading JavaScript or TypeScript | You can follow what Claude writes, not just whether it passes |
| git basics (branch, commit, pull request) | Modules 5–8 move faster |
| Having used Claude Code or another coding agent | Module 0 and the first hour feel familiar |

**Not needed:** writing code yourself, the ServiceNow SDK or Fluent, Now
Assist or any AI experience, or experience with this method.

**Quick self-check.** If you can say yes to all four, you're ready:
1. Can you log in to a ServiceNow instance as admin and open the incident list?
2. Could you create a user and give it the `itil` role, given the menu path?
3. Can you open a terminal on your computer and run a command you're given?
4. Can you install software on your computer, or get it installed in time?

A "no" isn't a blocker: tell your instructor before the day. They can pair
you with someone, or help you with Module 0.

---

## 1. What you'll learn

By the end of the day you will have done most of these yourself, once. The
parts marked **⏭** you do in the after-the-workshop track.

| You'll be able to… | Module |
|---|---|
| Build a repo that refuses secrets, and prove it does | 0 (pre-work) |
| Review a PRD against the inputs it came from, and get it accepted | 1 |
| Turn a PRD into an architecture, and push back on AI where it doesn't belong | 2 |
| Research the platform, check every fact on your instance, and write an LLD | 3 |
| Let the AI challenge your design, and sign the contract the code is held to | 4 |
| Turn a signed design into a plan | 5 |
| Run the build loop: tests first, one word to ship, review before merge, and check the app live as an ordinary agent | 6 |
| Attack your own safeguard with a fresh reviewer (optional on the day). ⏭ Have your partner attack the live app | 7 |
| Grade the app like a stranger. ⏭ Prove a runbook works by breaking the app | 8 |
| Count what the process caught | 9 |

---

## 2. The schedule

| When | Module | What you do | Leaves behind |
|---|---|---|---|
| Before the day (90–120 min) | [0 · Pre-work](MODULE-0-prework.md) | Install the tools, connect your instance, set up your app's repo (and prove it refuses a secret), pass the pre-flight checks | A ready bench and your app's repo |
| 09:00 (30 min) | [1 · Inputs to PRD](MODULE-1-prd.md) | Review the PRD against the inputs; the customer accepts it | An accepted PRD |
| 09:30 (30 min) | [2 · Consult](MODULE-2-consult.md) | The agent reads the PRD and recommends an architecture | `CONSULT.md` |
| 10:00 (75 min) | [3 · Research and LLD](MODULE-3-research-and-lld.md) | Research the platform; a background script checks the top facts on your instance; Claude drafts the LLD; a quick review; you sign; you write your Module 4 positions. *After the workshop:* the full LLD review | A signed LLD and your positions |
| 11:15 (10 min) | Break | — | — |
| 11:25 (45 min) | [4 · Challenge and sign](MODULE-4-design.md) | The agent challenges your design; you sign the contract | The signed design record |
| 12:10 (30 min) | [5 · Fence and plan](MODULE-5-fence-and-plan.md) | The project's rules, the private GitHub repo, the plan | A plan on GitHub |
| 12:40 (30 min) | [6 · Build loop](MODULE-6-build-loop.md) | Your first story by hand, then start the sub-agent batch at 13:10. *After the workshop:* Step 12, building the whole app | A first story merged; a batch running |
| 13:10 | Lunch | The batch runs while you eat (back at 14:00) | — |
| 14:00 (45 min) | [6 · Build loop](MODULE-6-build-loop.md) (continued) | Read the batch's evidence, install, check it live, close | An installed app |
| 14:45 (15 min) | [7 · Break it](MODULE-7-break-it.md) | **Optional:** the fresh reviewer attacks your floor. *After the workshop:* fix what got through; your partner's attack; amend the design | A list of attempts (fixes after the workshop) |
| 15:00 (10 min) | Break | — | — |
| 15:10 (45 min) | [8 · Grade and handoff](MODULE-8-grade-and-handoff.md) | Run the grade and read it. *After the workshop:* the real grade, the runbook, the drill, the verdict | `GRADE.md` (later `RUNBOOK.md` and a verdict) |
| 15:55 (15 min) | [9 · What the process caught](MODULE-9-debrief.md) | Debrief: count the catches; take it home | Your tally |
| 16:10–17:00 | Buffer | Catch up on slow installs or runs, or start the after-the-workshop track | — |
| After the workshop | [Your own PRD track](OWN-PRD.md) | The same modules on your own use case: a kick-off half day, then about two weeks to finish one slice | A working slice on your development instance, graded and handed over |
| When it's ready | [Getting it to production](PROMOTE.md) | The customer's change process, with your evidence attached | The app in production |

Times are a guide. Your instructor will keep the room together. If you fall
behind, your instructor can give you a **checkpoint** to start the next
module from, so you never miss one.

**The after-the-workshop track.** One day isn't enough for every step, so
each module marks the parts you skip on the day with **⏭ After the
workshop**. Nothing is cut: do those parts later, in order, starting from
where you stopped. They take you from the app you installed on the day to a
fully built, graded and handed-over app.

**You work in pairs.** You each build your own app on your own instance. On
the day you work alone. Your partner is needed only in the after-the-workshop
track, twice: in Module 7 you attack their safeguard, and in Module 8 you
break their app for them to diagnose (the drill). Whoever built something
never gets to be the only one who checks it.

---

## 3. What you need

Do all of [Module 0](MODULE-0-prework.md) **before the day**. It has the
details and a check for each item.

- A ServiceNow instance where you're an admin. A free **Personal Developer
  Instance (PDI)** from https://developer.servicenow.com is easiest. Any other
  **non-production** instance works too, as long as you're an admin, it has
  the standard demo incidents and business services, and nobody minds you
  installing a test app on it. **Never a production instance.**
- A Mac or Linux computer. (Windows users: WSL works, but tell your instructor.)
- A Claude Code account on a paid plan, or a Claude Console account.
- A GitHub account and the GitHub CLI.
- Node.js and the ServiceNow SDK.
- Two browser profiles: one for admin, one for an ordinary agent.
- **This lab guide**: it lives in the private GitHub repo
  `gapietro/agentic-build-lab-guide`. Your instructor invites you: **accept
  the invite** (check your GitHub email or https://github.com/notifications).
  Until Module 0 you can read it on GitHub, or online at
  https://claude.ai/artifact/LLZPgYakMRU9hWxmhughrQ. In Module 0 Step 3 you clone it
  to `~/projects/agentic-build-lab-guide`, **outside**
  `~/projects/priority-guard`.
  (Can't use git? Your instructor can send the same guide as a zip,
  `agentic-build-lab-guide.zip`. Unzip it with
  `mkdir -p ~/projects && unzip ~/Downloads/agentic-build-lab-guide.zip -d ~/projects`.)

**Where everything goes.** Everything this lab creates lives under one base
folder, `~/projects`: the guide, your workspace, your notes and the kit's
clone. The only exception is Claude Code's own settings, which must stay in
`~/.claude`.

**You don't create any folders yet.** The folders this guide mentions
(`priority-guard`, `priority-guard-notes`) don't exist when you start:
Module 0 creates them, step by step. Before Module 0, `~/projects` holds only
this guide:
```
~/projects/
└── agentic-build-lab-guide/      this guide (README.md, LAB.html, the MODULE- files, files/)
```

After Module 0 it looks like this:
```
~/projects/
├── agentic-build-lab-guide/      this guide (you read it; Claude never does)
├── priority-guard/               your workspace: Claude works here
│   ├── app/                      your app's repo (Module 0 Step 8)
│   └── brief/                    empty until Module 1
├── priority-guard-notes/         your notes: Claude never reads these
│   ├── LOG.md                    your log
│   └── catches.md                empty for now
└── prove-it-kit/                 a local copy of the kit, v0.1.3 (Module 0 Step 8)
```
Later modules add to `priority-guard/` (the PRD, the consult, the inputs,
the designs) and fill `app/` with your app's code. Each module says what it
creates.

**Using your own computer and Claude Code?** Module 0 changes a few Claude
Code settings for the lab, safely and with a backup. "Put your machine back",
at the end of Module 9, undoes all of it.

**You don't need Now Assist.** The app is plain code. The AI in this lab is
the one that writes the code, not one inside the app.

---

## 4. Three rules for the whole lab

**1. The guide is your checklist, not the agent's instructions.** Never paste
this guide into Claude. The one exception is the prompts in the **🤖 Claude**
boxes: those are written for Claude, so type or paste them in. Everything
else (the checks, the "If you see…" notes, the explanations) stays with you.
The kit and Claude do the work; you check it. If Claude sees the checks, they
stop being checks.

**2. Two folders, never mixed.** (You create both in Module 0 Step 4.)

| Folder | What's in it | Does Claude see it? |
|---|---|---|
| `~/projects/priority-guard/` | Your workspace: your app's repo (from pre-work), then the accepted PRD, the consult and the customer's notes | Yes. Run Claude here. |
| `~/projects/priority-guard-notes/` | Your notes: your log and your catch list | No. Your settings stop Claude's file reader from opening it (and this guide's folder), but a shell command could still reach it. So never ask Claude to read it, and choose **No** if Claude asks to. |

**3. Follow what really happens.** Claude won't word things the way this
guide does. The checks describe what a good result looks like, not exact
words. If what you see is different, don't re-run the prompt to get a
"better" answer. Write down what happened, and carry on or ask your
instructor.

---

## 5. Words you'll type

**Don't memorise this table.** Every step shows you exactly what to type, at
the moment you need it. This is just a reference, so you know it's coming:
some steps ask for one exact word or phrase, and the kit and your project
instructions watch for that exact wording.

| You type | When | What happens |
|---|---|---|
| `confirmed` | Module 2, after the consult restates the brief | The consult starts |
| `Confirmed.` | Module 4, after the design challenge reads back the terms | It writes exactly those terms |
| `Not agreed yet.` | Module 4, after a read-back you don't accept | It asks for your correction |
| `approve`, then `dry run`, then `apply` | Module 5, after the plan preview | Shows, then files, the plan on GitHub |
| `approve`, then `Dry run first.`, then `apply` | Module 8, after the grade's findings | Shows, then files, the findings as stories |
| `Take issue #<n>.` | Module 6 and Module 7, when a step names an issue to build (for example, a defect you just filed) | Starts that issue instead of the top one |
| `apply now` | Module 7 Part C, when it asks "Dry run first (recommended), or apply now?" | Files the amended plan straight away |
| `Take the top one.` | Module 6, after the session open | Starts whatever is really at the top, not the story you expected |
| `confirm` | Module 0 Step 8, and Modules 5–8, after Claude proposes something | Accepts it (for example, a story's five bullets) |
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

## ServiceNow basics you'll use

You don't need to know ServiceNow well. These four moves cover every step:

- **The filter navigator** is the search box at the top left of every
  ServiceNow page (click **All** if you don't see it). Type a table name
  followed by `.list`, for example `incident.list`, and press **Enter** to
  open that table as a list. Every step that says "type … in the filter
  navigator" means this box.
- **Filtering a list:** at the top of each column there's a small search box
  (if you don't see it, click the 🔍 icon at the top left of the list). Type
  in a column's box and press **Enter** to show only matching rows.
- **Making a record:** on a list, click **New** at the top right, fill in the
  form, then click **Submit**.
- **A reference field** (one with a 🔍 icon beside it, such as Service) points
  to another record. Click the 🔍 and pick from the list that opens, or start
  typing a name and choose from the suggestions.

**Your app's tables.** Everything your app stores lives in tables whose names
start with your `<SCOPE>`, for example `x_123456_pg_ga_critical_service`. To
see them all, type `sys_db_object.list` in the filter navigator, then type
your `<SCOPE>` in the **Name** column's search box and press **Enter**. To
open one, type its name followed by `.list` in the filter navigator.

---

## 6. Your values

Fill this in as you go. Wherever a module shows a name in angle brackets,
type your own value.

| Name | What it is | Example | Yours |
|---|---|---|---|
| `<PDI_ALIAS>` | The name your SDK login is saved under | `mypdi` | |
| `<APP_REPO>` | Your app's GitHub repo, `owner/name` | `you/priority-guard` | |
| `<SCOPE>` | Your app's scope: vendor prefix + `pg_` + your initials, 18 characters at most. Module 0 Step 8 shows you where your instance's vendor prefix comes from: the system property `glide.appcreator.company.code` | `x_123456_pg_ga` | |
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
| **🔍 Check** | Claude runs a check; **you read its raw output** (see below) | Checking work. The evidence is what the tool printed, not Claude's summary of it |
| **✏️ Editor** | Open the file in your text editor (VS Code, which you install in Module 0) and change it yourself | Signatures and allow lines. Allow lines are your decision: Claude may propose or add one, but none goes in unread. You read `.gitignore` before each commit that changes it |
| **🌐 Browser** | Use the browser profile the step names | Your instance and GitHub |

**The terminal.** The terminal is the window where you type commands. On a
Mac, press **Cmd+Space**, type `Terminal`, and press **Enter**. When Claude
is running in one Terminal window, that window belongs to Claude. For a
**⌨️ You** step, open a second Terminal window with **Cmd+N** and type the
command there.

**What raw output looks like.** When Claude runs a command, Claude Code
shows it as a line starting with **⏺**, followed by the command it ran. The
command's own output is underneath, on lines starting with **⎿**. That
output is the raw result: read that, not the sentences Claude writes
afterwards. If the output is long, Claude Code folds it and shows
`… +N lines` instead (N is a number). Press **Ctrl+O** to see all of it.

**When Claude asks permission.** Auto mode lets Claude do routine work
without asking, but sometimes it stops and shows a box like *Do you want to
proceed?* with numbered choices. Read the command in the box, then:

| The command is… | Choose |
|---|---|
| `git`, `gh`, `npm` or `now-sdk build` work, reading or writing files under `~/projects/priority-guard`, or reading (only reading) files under `~/projects/prove-it-kit` | **1. Yes** |
| Writing a temporary file (in `/tmp` or a folder `mktemp` made) during the grade in Module 8 | **1. Yes**. The secrets scan keeps its patterns there |
| `now-sdk install --auth <PDI_ALIAS>` with **your** alias, asked by `/prove-it:grade` (Module 8 step 3, the real grade after the workshop, and the re-grade in step 11) | **1. Yes**. This is the only install Claude runs, after asking you to type the alias |
| Any other `now-sdk install`, any `now-sdk auth`, anything that names your instance (`service-now.com`), or anything under `~/projects/priority-guard-notes` or `~/projects/agentic-build-lab-guide` (your settings block Claude's file reader there, but a shell command such as `cat` could still reach them) | **No** (the last choice). Then do that step yourself if the guide says to, as a ⌨️ You step |
| Anything you don't understand | **No**, and ask Claude in one line what it was trying to do and why |

**Never choose "Yes, and don't ask again"** (usually choice 2). It stops
Claude asking about that kind of command for the rest of the lab, and the
asking is the safety check.

**Why the split.** The lab's idea is that the AI types and people decide.
So Claude does the routine typing. You keep three things: your passwords,
your signature, and a few checks done without Claude, so at least one
check never depends on the AI's word.

**Your log.** Keep one file, `~/projects/priority-guard-notes/LOG.md`, plus
`~/projects/priority-guard-notes/catches.md`. Each catch gets one line:
```
<module> | <what caught it> | <what it caught>
```
For example:
```
1 | prd | The PRD asked for something no input mentioned; I took it out
6 | review | The review found the rule didn't handle a missing value; fixed and merged
```
- **module** is the module number you were in.
- **what caught it** is which check found the problem: one word from the list
  below (`prd`, `review`, …), not a description.
- **what it caught** is the problem, in your own words, and what was done.
A **catch** is a real problem the process found **and that got fixed**, or
that changed a decision, before it reached the app. Three things are **not**
catches:
- A check firing on something you planted to test it (like the fake token in
  Module 0 Step 8). That's the check working: write it in `LOG.md`.
- A finding nobody has fixed yet. It counts once the fix is merged.
- A style nit, or a finding that turns out to be wrong.

"What caught it" is one of: `prd`, `consult`, `research`, `design`, `guard`,
`test`, `review`, `partner`, `grade`, `drill`. Keep `catches.md` to catch lines only, with no
headings or blank lines, so Module 9 can count them.
