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

### Before you begin: the terminal and the labels

**The terminal** is the window where you type commands. On a Mac, press
**Cmd+Space**, type `Terminal`, and press **Enter**. Type a command, then
press **Enter** to run it.

Every action below starts with a label (the full list is in the
[README, section 7](README.md#7-how-to-read-a-module)):
- **⌨️ You**: type it yourself, in a normal terminal.
- **🤖 Claude**: type it inside Claude Code, after you've started it with
  `claude`. Commands that start with `/`, like `/plugin`, only work there.
- **🌐 Browser**: do it in your web browser.
- **✏️ Editor**: change a file by hand in your text editor.

While Claude is running in one Terminal window, that window belongs to
Claude. For a **⌨️ You** step, open a second Terminal window with **Cmd+N**
and type the command there.

---

## Steps

### Step 1 — A ServiceNow developer instance

**Why this step:** The PDI, your own practice ServiceNow instance, is where the app you build will run. The app works on incidents and business services, so without the demo data there's nothing to test it on.

**🌐 Browser:**
1. Go to https://developer.servicenow.com and sign in (create a free account
   if you don't have one). Request a **Personal Developer Instance (PDI)**
   if you don't have one yet.
2. When the instance is created, the developer site shows its address (for
   example `https://dev123456.service-now.com`), the user name `admin`, and
   the **admin password**. Write down the address, and keep the password
   somewhere safe. Lost the password? You can reset it from the developer
   site, where your instance is listed.
3. Open your instance's address and log in as `admin`.
4. Open the list of incidents: click **All** at the top left of the page,
   type `incident.list` in the search box under it (the **filter
   navigator**), and press **Enter**. Check there are demo incidents in the
   list. New to ServiceNow? Read
   [ServiceNow basics you'll use](README.md#servicenow-basics-youll-use)
   in the README first: it explains the filter navigator and lists.
5. In the filter navigator, type `cmdb_ci_service.list` and press **Enter**.
   Check there are demo business services.

✅ **Check:** you can log in as admin, and you can see demo incidents and
demo business services.

⚠️ **If you see…** *a page saying the instance is hibernating (asleep):* a
PDI goes to sleep when you haven't used it for a while. Sign in at
https://developer.servicenow.com and wake your instance from there. Waking
takes a few minutes. Then reload your instance's address.

⚠️ **If you see…** *no business services:* tell your instructor. The lab needs
at least three, and your instructor can give you a small set to load.

### Step 2 — The tools

**Why this step:** Every later module uses these five tools. Checking each one prints a version now means a missing install shows up at home, not halfway through a build on the day.

**⌨️ You** (in a terminal): install each of these, **in this order**, then
run its check command. Node.js comes first because the next commands use
`npm`, which comes with Node.js.

| Tool | Install | Check |
|---|---|---|
| Node.js | Version **20.18 or later** (version 22 or 24 is fine). Download the **LTS** installer from https://nodejs.org and run it, or, if you use Homebrew, run `brew install node` | `node --version` shows `v20.18` or higher, for example `v22.11.0` |
| ServiceNow SDK | `npm install -g @servicenow/sdk` | `now-sdk --version` |
| GitHub CLI | Download from https://cli.github.com, or run `brew install gh` | `gh --version` |
| git | Usually already installed | `git --version` |
| Claude Code | `npm install -g @anthropic-ai/claude-code`. You need version **2.1.147 or later**: the first with the built-in `/code-review`. If yours is older, run `claude update` | `claude --version` shows `2.1.147` or higher |

✅ **Check:** all five commands print a version, and Node.js and Claude Code
are at least the versions above.

⚠️ **If you see…** *`EACCES` or "permission denied" when you run
`npm install -g`:* **don't** use `sudo` to get round it. Install Node.js
again with the installer from https://nodejs.org or with Homebrew
(`brew install node`), or with nvm if you already use it. Then run the
`npm install -g` command again. If it still fails, tell your instructor.

⚠️ **If you see…** *`git --version` opens a box asking to install the
"command line developer tools":* click **Install**, wait for it to finish,
then run `git --version` again.

**Your text editor.** Several steps have you change a file by hand. Use
**Visual Studio Code** (VS Code), free from https://code.visualstudio.com.
Once the `~/projects` folder exists (Step 3 makes it), open it in VS Code
with **File > Open Folder…**, then choose your home folder, then
`projects`. **Don't use TextEdit**: it can save files as rich text and
turns straight quotes into curly "smart quotes", which break settings
files and commands.

### Step 3 — Sign in

**Why this step:** Each tool needs its own login before it can act for you. The shared settings file makes your Claude sessions behave like everyone else's. Typing your password only into the SDK, never into Claude, keeps it out of any chat record.

1. **GitHub.** **⌨️ You:**
   ```
   gh auth login
   ```
   It asks you four questions. Use the arrow keys and **Enter** to answer:
   - *Where do you use GitHub?* **GitHub.com**
   - *What is your preferred protocol for Git operations?* **HTTPS**
   - *Authenticate Git with your GitHub credentials?* **Yes**
   - *How would you like to authenticate GitHub CLI?* **Login with a web
     browser**. It shows a one-time code. Press **Enter**, and your browser
     opens GitHub: type the code there and approve.

   Then run:
   ```
   gh auth setup-git
   ```
   This tells `git` to use your GitHub CLI login, so later `git` commands
   (clone, push) don't ask you for a password.
2. **This lab guide.** **⌨️ You:** clone it into `~/projects` (you need the
   invite from the README's "What you need"). **Using the zip instead?** You
   already have it in `~/projects/agentic-build-lab-guide`: skip this item.
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

   **Reading the guide:** open `LAB.html` from this folder in your browser,
   or use the online copy at https://claude.ai/artifact/LLZPgYakMRU9hWxmhughrQ (it's
   the same guide; your instructor shares the link). The commands still copy
   files from this folder, so keep the clone either way.
3. **Claude Code settings, before the first `claude` run.** The guide ships
   the settings file ready to use: `files/claude-settings.json`. It turns off
   the extras that would make your sessions differ from everyone else's:
   connectors from your Claude account, saved memories and web search. It
   also starts Claude in **auto mode**: Claude goes ahead with routine actions,
   like writing a file it was asked to write, without stopping to ask you
   each time, and still checks with you before anything risky. It also
   blocks three things: web search is off; Claude can't run `now-sdk auth`,
   so your instance login stays out of Claude; and Claude's file reader
   can't open your notes folder (`~/projects/priority-guard-notes`, made
   below) or this guide's folder. Copy it into place. **⌨️ You:**
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

   **How to merge by hand (✏️ Editor).** `.claude` is a hidden folder, so
   open the file from the terminal. **⌨️ You:**
   ```
   open -a "Visual Studio Code" ~/.claude/settings.json
   ```
   Copy in every setting from the pack's file that yours doesn't have, and
   keep the settings you already had. If your file already has a `deny`
   list, **add** the pack's five `deny` entries to the end of yours; don't
   replace it.
   For example, if your file was:
   ```
   {
     "theme": "dark",
     "permissions": {
       "deny": ["Bash(rm -rf:*)"]
     }
   }
   ```
   after merging it becomes:
   ```
   {
     "theme": "dark",
     "disableClaudeAiConnectors": true,
     "syncClaudeAiPlugins": false,
     "syncClaudeAiSkills": false,
     "autoMemoryEnabled": false,
     "skillOverrides": { "claude-api": "off" },
     "permissions": {
       "defaultMode": "auto",
       "deny": [
         "Bash(rm -rf:*)",
         "WebSearch",
         "WebFetch",
         "Bash(now-sdk auth:*)",
         "Read(~/projects/priority-guard-notes/**)",
         "Read(~/projects/agentic-build-lab-guide/**)"
       ]
     }
   }
   ```
   The file can't hold comments. Watch the commas: one between items, none
   after the last item in a list or a `{ }` block. If you're unsure, send
   your file to your instructor before the day and they'll check it.

   ✅ **Check:** **⌨️ You:**
   ```
   diff ~/projects/agentic-build-lab-guide/files/claude-settings.json ~/.claude/settings.json && echo "settings in place"
   ```
   prints `settings in place`. If you merged by hand, it prints the
   differences instead. That's expected: check that every setting from the
   pack's file is in yours.
4. **Claude Code:** run `claude` once and complete sign-in. You need a paid
   Claude plan (Pro, Max, Team or Enterprise) or a Claude Console account.
   The free plan doesn't include Claude Code. **⌨️ You:** start it in your
   home folder:
   ```
   cd ~
   claude
   ```
   Follow its sign-in steps (it opens your browser). When it asks whether
   you trust this folder, choose **Yes**. Then **🤖 Claude:** type `/exit`
   and press **Enter** to quit Claude.
5. **Your PDI, in private** (nobody watching your screen). Pick an
   **alias**: a short nickname you choose for this login, for example
   `mypdi`. Write it in your values table as `<PDI_ALIAS>`. **⌨️ You:** run
   this, with your instance's address from Step 1 (for example
   `https://dev123456.service-now.com`) and your alias:
   ```
   now-sdk auth --add https://<your-instance>.service-now.com --type basic --alias <PDI_ALIAS>
   ```
   When it asks for a user name, type `admin`. When it asks for the
   password, type your admin password from Step 1 and press **Enter**.
   Nothing appears on screen while you type the password: that's normal.
   **Never type a password into Claude.** The SDK keeps this login, and
   Claude only ever uses the alias name.

✅ **Check:** **⌨️ You:** `gh auth status` prints a line starting
`✓ Logged in to github.com account` followed by your GitHub name. In a
normal terminal, not in Claude, `now-sdk auth --list` shows your alias.
Don't show that output to anyone or paste it anywhere: it names your
instance.

### Step 4 — Your two folders

**Why this step:** One folder is where the app gets built. The other holds your log and your list of catches. Keeping them apart means Claude doesn't read your notes as part of the project.

Both go under `~/projects`, the base folder for everything in this lab.

**⌨️ You:**
```
mkdir -p ~/projects/priority-guard/brief ~/projects/priority-guard-notes
touch ~/projects/priority-guard-notes/LOG.md ~/projects/priority-guard-notes/catches.md
```
The `brief/` folder stays empty until Module 1, when your accepted PRD goes
in.

✅ **Check:** **⌨️ You:** `ls -R ~/projects/priority-guard` shows only an
empty `brief/` folder. The output looks exactly like this (with your own
user name in place of `<you>`):
```
brief

/Users/<you>/projects/priority-guard/brief:
```

### Step 5 — Install the kit and the review command

**Why this step:** The kit is the set of commands that take you through the lab's stages, and `/code-review` checks code before it ships. Pinning the kit to one release means everyone in the room runs the same version, so results can be compared.

1. **⌨️ You:** start Claude Code in the workspace:
   ```
   cd ~/projects/priority-guard
   claude
   ```
   When it asks whether you trust this folder, choose **Yes**.
2. **🤖 Claude:** add the kit's marketplace, pinned to a release, then
   install the plugin. Type each line and press **Enter**:
   ```
   /plugin marketplace add gapietro/prove-it-kit#v0.1.3
   ```
   ```
   /plugin install prove-it@prove-it
   ```
   Approve the plugin trust warning, and choose **Install for you (user
   scope)**. Restart if Claude Code asks you to. **To restart Claude:**
   type `/exit`, then, in the same Terminal window (you're still in
   `~/projects/priority-guard`), type `claude` and press **Enter**.
3. **🤖 Claude:** type `/prove-it:` and **don't press Enter.** Look at the menu.
4. **🤖 Claude:** type `/code-review` and **don't press Enter.** Check that it appears. It's
   built into Claude Code. **Don't install the `code-review` plugin** from a
   marketplace: that's a different tool, and `/plugin` must show only
   `prove-it`.

✅ **Check:** the menu shows exactly five kit commands, `/prove-it:consult`,
`/prove-it:design-challenge`, `/prove-it:build-plan`, `/prove-it:grade` and
`/prove-it:handoff`, and `/code-review` exists.

⚠️ **If you see…** *`/code-review` doesn't appear:* your Claude Code is
older than 2.1.147. **🤖 Claude:** type `/exit`. **⌨️ You:** run
`claude update`, check `claude --version` shows `2.1.147` or higher, then
start Claude again with `claude`.

⚠️ **If you see…** *other commands besides the five:* other plugins are
installed. Note which ones. Ideally, disable them for this lab (Step 6
shows how).

### Step 6 — Check the bench is clean

**Why this step:** Anything extra Claude can see, such as a personal instruction file or a connection to another tool, changes how it behaves. Checking now means what you see in the lab comes from the lab, not from your own setup.

**🤖 Claude:** run `/plugin`, then `/mcp`. Press **Esc** to close each
one. Then quit Claude with `/exit`.

**⌨️ You:**
```
ls ~/.claude/CLAUDE.md
```

✅ **Check:** `/plugin` lists only `prove-it`. `/mcp` shows no servers. `ls`
says the file doesn't exist: it prints
`ls: /Users/<you>/.claude/CLAUDE.md: No such file or directory`.

⚠️ **If you see…** *a personal `CLAUDE.md`, MCP servers or other plugins:*
they'll shape what Claude does in the lab. Use a separate user account, or
switch them off for the workshop like this, and note what you did:
- **A personal `CLAUDE.md`:** **⌨️ You:** rename it so Claude doesn't read it:
  ```
  mv ~/.claude/CLAUDE.md ~/.claude/CLAUDE.md.off
  ```
  After the workshop, put it back with
  `mv ~/.claude/CLAUDE.md.off ~/.claude/CLAUDE.md`.
- **Other plugins:** **🤖 Claude:** type `/plugin`, open the list of
  installed plugins, select each plugin other than `prove-it`, and choose
  **Disable**.
- **MCP servers:** **⌨️ You:** list them, then remove each one by its name:
  ```
  claude mcp list
  claude mcp remove <name>
  ```
  Run `claude mcp list` again to check they've gone. If one won't go, tell
  your instructor.

Then run the checks at the top of this step again.

### Step 7 — A second browser profile

**Why this step:** You'll need to see the app the way an everyday user sees it, not as an admin who can do anything. A second browser profile lets you stay logged in as both at once.

A **browser profile** is a separate set of logins inside your browser. You
need two: one called **Admin**, where you log in as admin, and one called
**Agent**, where you log in as an ordinary service desk agent.

**🌐 Browser:**
1. **Make the second profile.** Name your profiles **Admin** and **Agent**.
   - **Chrome:** click your profile icon at the top right, then **Add**.
   - **Edge:** click your profile icon, then **Add profile**.
   - **Firefox:** type `about:profiles` in the address bar and press
     **Enter**. Click **Create a New Profile** and follow the steps, then
     click **Launch profile in new browser**.
   - **Safari:** if your Safari has no **Profiles** option, use a private
     window (**File > New Private Window**) or a second browser for the
     Agent login.
2. **Create the agent user**, in your **Admin** profile, logged in as admin:
   1. Click **All**, type `User Administration` in the filter navigator, and
      click **Users** under it.
   2. Click **New**. Fill in **User ID** `agent.demo`, **First name**
      `Agent` and **Last name** `Demo`. Click **Submit**.
   3. In the list of users, find `agent.demo` (type it in the **User ID**
      column's search box and press **Enter**), and click it to open it.
   4. Scroll down to the **Roles** tab near the bottom of the form, and
      click **Edit…**. Find `itil` in the left-hand list, select it, click
      the **>** arrow to move it to the right-hand list, and click
      **Save**. Give it no other role.
   5. Back on the user record, click **Set Password**. Make a password, and
      save it where you keep your passwords. If you see a **Require password
      change** option, untick it. If you don't, expect to be asked for a new
      password the first time you log in as `agent.demo`.
3. Write `agent.demo` in your values table as `<AGENT_USER>`.
4. In your **Agent** profile, open your instance's address and log in as
   `agent.demo`.

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

**Anything not ticked: tell your instructor before the day**, at least two
days before, using the contact your instructor gave you in the workshop
invite.
