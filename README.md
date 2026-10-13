# Agentic Build Lab

*How this lab works · 5 minutes to read*

In one day you build a small ServiceNow app, **Priority Guard**: a priority
floor for incidents on critical services. Claude Code writes the code. You
make the decisions, and checks decide whether work may go on.

The app isn't the point. **The method is**: the AI types, people and checks
decide. Every module has one **catch**, a moment where the process stops a
mistake. Those moments are the lesson.

## The day

| When | Module | You leave with |
|---|---|---|
| Before the day, 90 min | [0 · Pre-work](MODULE-0-prework.md) | Tools, your instance, your app's repo |
| 09:00 · 30 min | [1 · Inputs to PRD](MODULE-1-prd.md) | An accepted PRD |
| 09:30 · 30 min | [2 · Consult](MODULE-2-consult.md) | `CONSULT.md`: what to build, and how |
| 10:00 · 75 min | [3 · Research and LLD](MODULE-3-research-and-lld.md) | A signed low-level design |
| 11:25 · 45 min | [4 · Design challenge](MODULE-4-design.md) | A signed design record |
| 12:10 · 30 min | [5 · Fence and plan](MODULE-5-fence-and-plan.md) | A private repo and a plan on GitHub |
| 12:40 · 30 min | [6 · Build loop](MODULE-6-build-loop.md) | Your first story, merged |
| 13:10 · lunch | 6, continued | Claude builds the next stories while you eat |
| 14:00 · 45 min | 6, continued | The app installed and working |
| 14:45 · 15 min | [7 · Break it](MODULE-7-break-it.md) *(optional)* | A list of attacks on your app |
| 15:10 · 45 min | [8 · Grade](MODULE-8-grade-and-handoff.md) | `GRADE.md` |
| 15:55 · 15 min | [9 · Debrief](MODULE-9-debrief.md) | Your count of catches |
| Afterwards | [After the workshop](AFTER-THE-WORKSHOP.md) | A finished app, handed over |
| Then | [Your own PRD](OWN-PRD.md), [to production](PROMOTE.md) | The method on your own work |

Read it as one page at https://claude.ai/artifact/LLZPgYakMRU9hWxmhughrQ.
Breaks at 11:15 and 15:00. The buffer, 16:10–17:00, is for catching up.
Behind? Ask your instructor for a checkpoint to start the next module from.

You work alone on the day. Your partner joins you after the workshop, to
attack your app and to test your runbook.

## What you need

- Admin on a ServiceNow instance: a free Personal Developer Instance (PDI)
  from https://developer.servicenow.com, or another **non-production** one.
- A Mac or Linux computer. On Windows, use WSL and tell your instructor.
- A paid Claude plan (Pro, Max, Team or Enterprise) or a Claude Console
  account.
- A GitHub account, with your instructor's invite to this guide accepted.

Module 0 installs everything else. You don't need to write code.

## Where you act

Every action starts with one of these labels.

| Label | What you do |
|---|---|
| 🤖 **Claude** | Type it into Claude Code |
| ⌨️ **Terminal** | Type it into a normal terminal, never into Claude |
| ✏️ **Editor** | Change the file yourself, in VS Code |
| 🌐 **Browser** | Use your instance or GitHub, in the profile named |
| ✅ **Check** | What you should see |

Under some checks there's a closed 🛟 box. Open it only if what you see is
different. ℹ️ boxes say why, if you want to know.

While Claude runs in a Terminal window, that window is Claude's. For ⌨️
steps, use a second window: press **Cmd+N**.

Enter sends a message to Claude. For a new line inside one, type `\` and
then press **Enter**.

When Claude runs a command, Claude Code shows it on a line starting with ⏺,
and its output under it, on lines starting with ⎿. Read that output, not
Claude's summary. If it says `… +N lines`, press **Ctrl+O** to see it all.

## Rules for the whole lab

1. **Never paste this guide into Claude.** Only the text in 🤖 boxes goes
   in. If Claude sees the checks, they stop being checks.
2. **Passwords go into your own terminal or browser**, never into Claude.
3. **Claude never runs `now-sdk auth`.** You install the app yourself. The
   only installs Claude runs are the grade's, to `lab-pdi`.
4. **Never use a production instance.**
5. **Trust what a command prints**, not what Claude says about it.
6. **Follow what really happens.** Don't re-run a prompt to get a nicer
   answer. Write down what happened, and carry on.

**When Claude asks permission**, read the command, then:
- **1. Yes** for `git`, `gh`, `npm`, `node` and `now-sdk build`, and for files in
  `~/projects/priority-guard` or the kit's copy, `~/projects/prove-it-kit`.
- **No** for `now-sdk auth`, `now-sdk install`, anything that names your
  instance, and anything in your notes or this guide's folder.
- Not sure? **No**, then ask Claude what it was for.
- **Never choose "Yes, and don't ask again".** The asking is the check.

## Words you'll meet

- **Repo:** a folder whose history git keeps. Your app's repo is
  `~/projects/priority-guard/app`.
- **Commit:** one saved snapshot in that history.
- **Branch:** a separate line of commits. `main` changes only through pull
  requests.
- **Pull request:** a request on GitHub to merge a branch into `main`. It's
  reviewed first.
- **Story:** one small piece of work, filed as a GitHub issue.
- **Gate:** a milestone that stories hold up: MERGE, INSTALL, DEMO, HANDOFF.
- **Design term:** one numbered rule in your signed design, such as `C3`.
  Every test names the term it proves.
- **Catch:** a real problem the process found **and that got fixed**, or
  that changed a decision. A check firing on something you planted to test
  it isn't a catch.

Some steps ask for one exact word, such as `confirmed` or `ship it`. Type it
exactly as shown, on its own.

## Your folders and your log

After Module 0, `~/projects` holds:
```
agentic-build-lab-guide/   this guide: you read it, Claude never does
priority-guard/            your workspace: Claude works here
  app/                     your app's repo
  brief/                   the PRD, from Module 1
priority-guard-notes/      your notes: Claude never reads them
  LOG.md                   predictions and notes
  catches.md               one line per catch
prove-it-kit/              a copy of the kit
```

Each catch is one line in `catches.md`:
```
<module> | <what caught it> | <what it caught, and what was done>
```
For example: `1 | prd | The PRD asked for something no input mentioned; I
took it out`. "What caught it" is one of `prd`, `consult`, `research`,
`design`, `guard`, `test`, `review`, `partner`, `grade`, `drill`. Keep that
file to catch lines only: Module 9 counts them.

<details><summary>ℹ️ New to ServiceNow? Four moves cover every step</summary>

- **The filter navigator** is the search box at the top left (click **All**
  to see it). Type a table name and `.list`, such as `incident.list`, and
  press **Enter** to open that table as a list.
- **To filter a list**, type in the search box at the top of a column and
  press **Enter**.
- **To make a record**, click **New** on a list, fill in the form, and click
  **Submit**.
- **A reference field** has a 🔍 beside it. Click it and pick a record.

</details>
