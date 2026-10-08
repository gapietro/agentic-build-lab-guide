# Module 0 — Pre-work: get your bench ready

*Before the workshop. About 60–90 minutes. Do it at least two days early, so
there's time to fix anything that fails.*

[Lab home](README.md) · [Module 1 →](MODULE-1-prd.md)

---

## What you'll do

Install the tools, connect your instance, and pass **seven pre-flight
checks**. On the day there's no time to debug an install, so this module
moves every likely problem to before the day.

**Why a clean bench matters.** A coding agent reads everything it's given:
your other plugins, your personal instruction files, your saved logins. For
a build you can trust and repeat, it should see only what this lab gives it.
If you can, do the whole lab in a **separate user account** on your
computer, so nothing from your day-to-day setup leaks in. If you can't, the
checks in step 6 tell you what to look for.

---

## Steps

### Step 1 — A ServiceNow developer instance

**Why this step:** The PDI, your own practice ServiceNow instance, is where the app you build will run. The app works on incidents and business services, so without the demo data there's nothing to test it on.

1. Get a Personal Developer Instance (PDI) from the ServiceNow developer
   site, if you don't have one.
2. Log in as admin. Open **Incident > All** and check there are demo
   incidents.
3. Type `cmdb_ci_service.list` in the filter navigator and press Enter. Check
   there are demo business services.

✅ **Check:** you can log in as admin, and you can see demo incidents and
demo business services.

⚠️ **If you see…** *no business services:* tell your instructor. The lab needs
at least three, and your instructor can give you a small set to load.

### Step 2 — The tools

**Why this step:** Every later module uses these five tools. Checking each one prints a version now means a missing install shows up at home, not halfway through a build on the day.

Install each of these, then run the check command:

| Tool | Install | Check |
|---|---|---|
| Node.js | The version the ServiceNow SDK requires; the SDK's documentation names it | `node --version` |
| ServiceNow SDK | `npm install -g @servicenow/sdk` | `now-sdk --version` |
| GitHub CLI | From cli.github.com | `gh --version` |
| git | Usually already installed | `git --version` |
| Claude Code | From Anthropic's Claude Code documentation. Your instructor gives the minimum version: it must include the built-in `/code-review` | `claude --version` |

✅ **Check:** all five commands print a version.

### Step 3 — Sign in

**Why this step:** Each tool needs its own login before it can act for you. The shared settings file makes your Claude sessions behave like everyone else's. Typing your password only into the SDK, never into Claude, keeps it out of any chat record.

1. **GitHub:** `gh auth login`, then `gh auth setup-git`.
2. **This lab guide.** Clone it into `~/projects` (you need the invite from
   the README's "What you need"). **Using the zip instead?** You already have
   it in `~/projects/agentic-build-lab-guide`: skip this item.
   ```
   mkdir -p ~/projects
   gh repo clone gapietro/agentic-build-lab-guide ~/projects/agentic-build-lab-guide
   ```
   ✅ **Check:** `ls ~/projects/agentic-build-lab-guide` shows `README.md`,
   `LAB.html`, the `MODULE-` files and `files/`. If your instructor says the
   guide was updated, get the changes with
   `git -C ~/projects/agentic-build-lab-guide pull`.

   ⚠️ **If you see…** *`Could not resolve to a Repository`:* you haven't
   accepted the invite yet, or you're signed in to a different GitHub
   account (`gh auth status`).
3. **Claude Code settings, before the first `claude` run.** The guide ships
   the settings file ready to use: `files/claude-settings.json`. It turns off
   the extras that would make your sessions differ from everyone else's:
   connectors from your Claude account, saved memories and web search. It
   also starts Claude in **auto mode**: Claude goes ahead with routine actions,
   like writing a file it was asked to write, without stopping to ask you
   each time, and still checks with you before anything risky. It can never
   run `now-sdk auth`, so your instance login stays out of Claude. Copy it
   into place:
   ```
   mkdir -p ~/.claude
   cp -n ~/projects/agentic-build-lab-guide/files/claude-settings.json ~/.claude/settings.json
   ```
   `-n` never overwrites: if you already have a settings file, `cp` leaves it
   alone (it may print `not overwritten`, or nothing at all; neither is an
   error).
   **If the file already exists, don't replace it**: open both files and
   merge the pack's settings into yours by hand. Replacing it after Step 5
   (where you install the kit) removes the kit.

   ✅ **Check:**
   ```
   diff ~/projects/agentic-build-lab-guide/files/claude-settings.json ~/.claude/settings.json && echo "settings in place"
   ```
   prints `settings in place`. If you merged by hand, it prints the
   differences instead. That's expected: check that every setting from the
   pack's file is in yours.
4. **Claude Code:** run `claude` once and complete sign-in. You need a paid
   Claude plan (Pro, Max, Team or Enterprise) or a Claude Console account.
   The free plan doesn't include Claude Code.
5. **Your PDI, in private** (nobody watching your screen). Pick a short alias
   and write it in your values table as `<PDI_ALIAS>`:
   ```
   now-sdk auth --add https://<your-instance>.service-now.com --type basic --alias <PDI_ALIAS>
   ```
   Type your admin password when it asks. **Never type a password into
   Claude.** The SDK keeps this login, and Claude only ever uses the alias
   name.

✅ **Check:** `gh auth status` is green. In a normal terminal, not in Claude,
`now-sdk auth --list` shows your alias. Don't show that output to anyone or
paste it anywhere: it names your instance.

### Step 4 — Your two folders

**Why this step:** One folder is where the app gets built. The other holds your log and your list of catches. Keeping them apart means Claude doesn't read your notes as part of the project.

Both go under `~/projects`, the base folder for everything in this lab.

```
mkdir -p ~/projects/priority-guard/brief ~/projects/priority-guard-notes
touch ~/projects/priority-guard-notes/LOG.md ~/projects/priority-guard-notes/catches.md
```
The `brief/` folder stays empty until Module 1, when your accepted PRD goes
in.

✅ **Check:** `ls -R ~/projects/priority-guard` shows only an empty `brief/` folder.

### Step 5 — Install the kit and the review command

**Why this step:** The kit is the set of commands that take you through the lab's stages, and `/code-review` checks code before it ships. Pinning the kit to one release means everyone in the room runs the same version, so results can be compared.

1. Start Claude Code in the workspace:
   ```
   cd ~/projects/priority-guard
   claude
   ```
   When it asks whether you trust this folder, choose **Yes**.
2. Add the kit's marketplace, pinned to a release, then install the plugin:
   ```
   /plugin marketplace add gapietro/prove-it-kit#v0.1.3
   ```
   ```
   /plugin install prove-it@prove-it
   ```
   Approve the plugin trust warning, and choose **Install for you (user
   scope)**. Restart if Claude Code asks you to.
3. Type `/prove-it:` and **don't press Enter.** Look at the menu.
4. Type `/code-review` and **don't press Enter.** Check that it appears. It's
   built into Claude Code. **Don't install the `code-review` plugin** from a
   marketplace: that's a different tool, and `/plugin` must show only
   `prove-it`.

✅ **Check:** the menu shows exactly five kit commands, `/prove-it:consult`,
`/prove-it:design-challenge`, `/prove-it:build-plan`, `/prove-it:grade` and
`/prove-it:handoff`, and `/code-review` exists.

⚠️ **If you see…** *other commands besides the five:* other plugins are
installed. Note which ones. Ideally, disable them for this lab.

### Step 6 — Check the bench is clean

**Why this step:** Anything extra Claude can see, such as a personal instruction file or a connection to another tool, changes how it behaves. Checking now means what you see in the lab comes from the lab, not from your own setup.

In Claude Code, run `/plugin`, then `/mcp`. Then press Esc and quit Claude
(`/exit`). In a normal terminal:
```
ls ~/.claude/CLAUDE.md
```

✅ **Check:** `/plugin` lists only `prove-it`. `/mcp` shows no servers. `ls`
says the file doesn't exist.

⚠️ **If you see…** *a personal `CLAUDE.md`, MCP servers or other plugins:*
they'll shape what Claude does in the lab. Use a separate user account, or
rename the file and disable the extras for the workshop. Note what you did.

### Step 7 — A second browser profile

**Why this step:** You'll need to see the app the way an everyday user sees it, not as an admin who can do anything. A second browser profile lets you stay logged in as both at once.

Create a second profile in your browser. In it, log in to your PDI as an
**ordinary service desk agent**: create a user (for example `agent.demo`)
with the `itil` role and nothing else, set a password for it (**Set Password**
on the user record), and write it in your values table as `<AGENT_USER>`.

✅ **Check:** in the second profile, as `<AGENT_USER>`, you can open an
incident but not the **System Definition** menu.

---

## Pre-flight: all seven before the day

**Why this step:** This list is your proof the bench is ready. Anything left unticked would cost you time on the day, so your instructor needs to hear about it before then.

- [ ] Step 1: PDI with demo incidents and business services
- [ ] Step 2: all five tools print a version
- [ ] Step 3: GitHub, Claude Code and the SDK login all work
- [ ] Step 4: the workspace holds only an empty `brief/` folder
- [ ] Step 5: the five kit commands and `/code-review`
- [ ] Step 6: a clean bench
- [ ] Step 7: the agent user in a second browser profile

**Anything not ticked: tell your instructor before the day.**
