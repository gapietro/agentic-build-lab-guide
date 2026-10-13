# Module 0 — Pre-work: get your bench ready

*Before the workshop. About 90–120 minutes. Do it at least two days early, so
there's time to fix anything that fails.*

[Lab home](README.md) · [Module 1 →](MODULE-1-prd.md)

---

## What you'll do

Install the tools, connect your instance, set up your app's code repo, and
pass **eight pre-flight checks**. On the day there's no time to debug an
install, so this module moves every likely problem to before the day.

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
- **🔍 Check**: a prompt, typed inside Claude, that asks Claude to run one
  check command. Read the **raw output** of the command itself, not
  Claude's summary of it.
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

⚠️ **If you see…** *the developer site says your instance was **reclaimed**
(released after a long time unused):* request a new one, and tell your
instructor before you go on. The new instance needs this step and Step 3
item 5 again, and may have a different vendor prefix (Step 8.1).

⚠️ **If you see…** *no business services:* tell your instructor. The lab needs
at least three, and your instructor can give you a small set to load.

### Step 2 — The tools

**Why this step:** Every later module uses these tools. Checking that each one prints a version now means a missing install shows up at home, not halfway through a build on the day.

**⌨️ You**: open the Terminal (see "Before you begin" above). You don't
need to change folder: run each command right where the Terminal opens.

For each tool, **first run its Check command** (the right-hand column) to see
whether you already have it. If it prints a version that's new enough, move
on. If it prints `command not found`, the tool isn't installed yet: install
it with the middle column, then run the Check command again. Go **in this
order**: Node.js first, because the next installs use `npm`, and `npm` comes
with Node.js.

| Tool | Install | Check |
|---|---|---|
| Node.js | Version **22.22 or later** (24 is fine): Claude Code needs at least 22. Download the **LTS** installer from https://nodejs.org and run it, or, if you use Homebrew, run `brew install node` | `node --version` shows `v22.22` or higher, for example `v22.22.0` or `v24.11.0` |
| npm | Comes with Node.js: nothing extra to install | `npm --version` prints a number, for example `10.9.0` |
| ServiceNow SDK | `npm install -g @servicenow/sdk` (`-g` means "global": installed once for your whole computer, not inside one folder) | `now-sdk --version` |
| GitHub CLI | Download from https://cli.github.com, or run `brew install gh` | `gh --version` |
| git | Usually already installed | `git --version` |
| Claude Code | `npm install -g @anthropic-ai/claude-code`. You need version **2.1.147 or later**: the first with the built-in `/code-review`. If yours is older, run `claude update` | `claude --version` shows `2.1.147` or higher |

✅ **Check:** all six Check commands print a version, and Node.js and Claude
Code are at least the versions above.

⚠️ **If you see…** *`command not found` for a tool you've just installed:*
close the Terminal window and open a new one, then run the Check again (a new
window picks up newly installed tools). Still not found? Run `echo $PATH`.
The output should include `/usr/local/bin` (or `/opt/homebrew/bin` if you
used Homebrew). If it doesn't, the installer will have told you how to add
it; if you can't find that, tell your instructor. Using nvm? Tools you
install with `npm install -g` belong to one Node.js version. If
`node --version` shows a different version from the one you installed them
with, run the `npm install -g` commands again in this window.

⚠️ **If you see…** *`EACCES` or "permission denied" when you run
`npm install -g`:* your computer won't let you install for everyone without
an administrator's password. Two ways round it:
- **If you can**, reinstall Node.js with Homebrew (`brew install node`) or
  with nvm (run the install line from https://github.com/nvm-sh/nvm, **close
  the Terminal window and open a new one**, then run `nvm install 22`). Then
  run the `npm install -g` command again. That avoids needing
  administrator rights for every install.
- **If you can't** (for example, your company manages your laptop), put
  `sudo` in front of the same command, for example:
  ```
  sudo npm install -g @servicenow/sdk
  ```
  It asks for your **computer's** password (the one you log in to your Mac
  with). Nothing appears while you type it: that's normal. Do the same for
  `npm install -g @anthropic-ai/claude-code` if it fails the same way.

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

   When you've approved in the browser, the terminal finishes by itself. It
   prints a few lines, such as `✓ Authentication complete.` and
   `✓ Configured git protocol`, and ends with `✓ Logged in as <your GitHub
   name>`. Those lines are normal.

   ⚠️ **If you see…** *(Linux only)*
   - *`! Authentication credentials saved in plain text`:* expected on a
     computer without a password store (keyring). Nothing needs fixing.
   - *GitHub accepted the code, but `gh auth login` keeps waiting, and lines
     starting `ERROR:` fill the terminal:* close the browser window `gh`
     opened. `gh` then finishes, and those lines are harmless.
   - *a message that it couldn't copy the code to the clipboard, suggesting
     `xsel` or `xclip`:* ignore it, and type the code into the browser
     yourself.

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
   What these do: `mkdir -p ~/projects` makes the `projects` folder in your
   home folder (if it isn't there already). `gh repo clone` downloads this
   guide from GitHub into `~/projects/agentic-build-lab-guide`.
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
   below) or this guide's folder.

   **Already use Claude Code? Read this first.** Changing these settings is
   safe, and you can undo it completely after the lab:
   - **It adds, it doesn't replace.** The command below saves a copy of
     your own settings first, then adds the lab's settings next to yours.
     Your plugins, your theme and your own rules stay.
   - **Your past conversations and memories aren't touched.** Turning
     memories off only stops Claude saving *new* memories during the lab.
     Nothing already saved is deleted, and you can still resume your old
     conversations. They'll behave as before once you've put your own
     settings back.
   - **Close every other Claude Code window first** (type `/exit` in each),
     including the Code tab of the Claude desktop app if you use it. They
     read the settings when they start, so one left open would keep running
     with the old settings and could confuse you later.
   - **Undo it after the lab.** "Put your machine back", at the end of
     Module 9, lists every step.

   The cleanest option is still a separate user account on your computer
   (see "Why a clean bench matters" at the top of this module): then there's
   nothing to undo.

   `~/.claude` is a hidden folder in your home folder, where Claude Code
   keeps its settings. You don't need to find it: one command puts the
   lab's settings there. **⌨️ You:**
   ```
   node ~/projects/agentic-build-lab-guide/files/merge-claude-settings.mjs
   ```
   - **No settings file yet** (most people): it creates one.
   - **You already use Claude Code:** it saves a copy of your file
     (`settings.json.before-lab.bak`), then **adds** the lab's settings and
     keeps all of yours, including any plugins you've installed. The copy
     is made only the first time, so running the command again never
     overwrites it. The one setting of yours it takes out (the copy keeps
     it) is one that switches auto mode off.
   - It ends by printing `Lab settings in place.`

   ✅ **Check:** **⌨️ You:**
   ```
   node ~/projects/agentic-build-lab-guide/files/merge-claude-settings.mjs --check
   ```
   prints `Lab settings in place.` It changes nothing; it only checks. You
   can run it any time, for example if you think a setting was changed.

   ⚠️ **If you see…** *"isn't valid JSON, so nothing was changed":* your
   existing settings file has a mistake in it. Send it to your instructor
   (`open -a "Visual Studio Code" ~/.claude/settings.json` opens it), or fix
   the line it names, then run the command again.
4. **Claude Code:** run `claude` once and complete sign-in. You need a paid
   Claude plan (Pro, Max, Team or Enterprise) or a Claude Console account.
   The free plan doesn't include Claude Code. A personal account is
   simplest. A company Team or Enterprise seat works, but your
   organisation's own settings can override the lab's: they can turn auto
   mode off, or add plugins and connections you can't switch off. Steps 5
   and 6 check for this. **⌨️ You:** start it in your home folder:
   ```
   cd ~
   claude
   ```
   You're only signing in here, so your home folder is fine. Follow its
   sign-in steps. The first time, it may show a few screens before you can
   type. If you've used Claude Code before, you may see only some of them,
   or none:
   - *Choose a text style (theme):* pick the one that's easiest to read, and
     press **Enter**.
   - *Select a login method:* choose your **Claude account with a
     subscription** (Pro, Max, Team or Enterprise) and press **Enter**.
     Choose the **Anthropic Console account** only if you pay by API usage.
     Don't choose **3rd-party platform**.
   - Your browser opens so you can sign in. If it doesn't, press `c` to copy
     the sign-in link and open it in your browser. If the page then shows a
     code, paste it into the terminal where it says
     `Paste code here if prompted`.
   - *Login successful:* press **Enter** to continue.
   - *Security notes:* read them and press **Enter**.
   - *Do you trust the files in this folder?* Check which choice is
     highlighted before you press **Enter**: if it's **No, exit**, Enter
     quits Claude. Use the **arrow keys** to select **Yes**, then press
     **Enter**.
   - *Try the new fullscreen renderer?* If it asks, use the arrow keys to
     select **Not now** and press **Enter**. This guide describes the
     standard view.

   Then **🤖 Claude:** type `/exit` and press **Enter** to quit Claude.

   **How to tell you've left Claude:** Claude's input box (with `>` and a
   frame around it) is gone, and you see your normal terminal prompt again,
   usually ending in `%` or `$`. The next item must be typed there, never
   inside Claude.
5. **Your PDI, in private** (nobody watching your screen). Pick an
   **alias**: a short nickname you choose for this login, for example
   `mypdi`. Write it in your values table as `<PDI_ALIAS>`. Your PDI must
   be awake: open its address in your browser first (see Step 1's ⚠️).
   **⌨️ You**, in a normal terminal (not inside Claude: see the end of
   item 4): run this, with your instance's address from Step 1 (for example
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

⚠️ **If you see…** *a line starting `[now-sdk] ERROR:` after
`now-sdk auth --add`:* the sign-in failed, even though the command
finished. Check your PDI is awake and your admin password is right, then
run the `now-sdk auth --add` line again.

⚠️ **If you see…** *`now-sdk auth --list` says `No credentials found` right
after a sign-in that looked fine:* the SDK says this both when nothing is
saved and when it can't read your computer's password store (on a Mac, the
Keychain). Run the `now-sdk auth --add` line again, then
`now-sdk auth --list` straight away. Still missing? Open **Keychain Access**,
make sure your **login** keychain is unlocked, and tell your instructor.

### Step 4 — Your two folders

**Why this step:** One folder is where the app gets built. The other holds your log and your list of catches. Keeping them apart means Claude doesn't read your notes as part of the project.

Both go in `~/projects`, the same folder that holds this guide: **next to**
`agentic-build-lab-guide`, not inside it. (`~` means your home folder, so
`~/projects` is the `projects` folder in your home folder.) You can run these
from any folder: the full paths say exactly where things go.

**⌨️ You:**
```
mkdir -p ~/projects/priority-guard/brief ~/projects/priority-guard-notes
touch ~/projects/priority-guard-notes/LOG.md ~/projects/priority-guard-notes/catches.md
```
What these do:
- `mkdir -p` makes folders: your workspace `priority-guard` with an empty
  `brief` folder inside it, and your notes folder `priority-guard-notes`.
  (`-p` means "make any missing folders on the way, and don't complain if
  one is already there".)
- `touch` makes two empty files in your notes folder: `LOG.md` for your
  notes and `catches.md` for your list of catches.
The `brief/` folder stays empty until Module 1, when your accepted PRD goes
in.

✅ **Check:** **⌨️ You:** `ls -R ~/projects/priority-guard` shows only an
empty `brief/` folder. The output looks exactly like this (with your own
user name in place of `<you>`):
```
brief

/Users/<you>/projects/priority-guard/brief:
```

Your `~/projects` folder now looks like this:
```
~/projects/
├── agentic-build-lab-guide/      this guide (you read it; Claude never does)
├── priority-guard/               your workspace: Claude works here
│   └── brief/                    empty until Module 1
└── priority-guard-notes/         your notes: Claude never reads these
    ├── LOG.md                    empty for now
    └── catches.md                empty for now
```
Step 8 adds your app's code repo, `app/`, inside `priority-guard/`, and a
copy of the kit, `prove-it-kit/`, next to it. Later modules add the PRD,
the consult and the design to `priority-guard/`. Each module says what it
creates.

### Step 5 — Install the kit and the review command

**Why this step:** The kit is the set of commands that take you through the lab's stages, and `/code-review` checks code before it ships. Pinning the kit to one release means everyone in the room runs the same version, so results can be compared.

1. **⌨️ You:** start Claude Code in the workspace:
   ```
   cd ~/projects/priority-guard
   claude
   ```
   When it asks whether you trust this folder, use the **arrow keys** to
   select **Yes**, then press **Enter** (if **No, exit** is highlighted,
   Enter quits Claude).

   ✅ **Check:** under Claude's input box, the status line shows
   `⏵⏵ auto mode on`.

   ⚠️ **If you see…** *`⏸ manual mode on` instead:* auto mode is off.
   **🤖 Claude:** type `/exit`. **⌨️ You:** run the `--check` command from
   Step 3 item 3. If it says the lab settings aren't in place, run the merge
   command from Step 3 item 3 again, then start Claude again. If it says
   they're in place, auto mode is off for another reason: your organisation
   turned it off (on a company Team or Enterprise seat), your account or
   Claude Code version doesn't have it, or the model you've selected doesn't
   support it. You can still do the lab: Claude will ask before more
   actions, and the *When Claude asks permission* box in the
   [README, section 7](README.md#7-how-to-read-a-module) tells you what to
   choose. Tell your instructor before the day.
2. **🤖 Claude:** add the kit's marketplace, pinned to a release, then
   install the plugin. Type each line and press **Enter**:
   ```
   /plugin marketplace add gapietro/prove-it-kit#v0.1.3
   ```
   It prints a line such as `Successfully added marketplace: prove-it`, and
   may also print a line starting `Reloaded:`. Both are expected: the plugin
   isn't installed until the next line.
   ```
   /plugin install prove-it@prove-it
   ```
   Approve the plugin trust warning, and choose **Install for you (user
   scope)**. Restart if Claude Code asks you to. **To restart Claude:**
   type `/exit`, then, in the same Terminal window (you're still in
   `~/projects/priority-guard`), type `claude` and press **Enter**.

   ⚠️ **If you see…** *`/plugin marketplace add` fails with "not found" or a
   permission error:* check you typed `gapietro/prove-it-kit#v0.1.3`
   exactly, and try again. Still failing? Note the exact error and tell
   your instructor.
3. **🤖 Claude:** type `/prove-it:` and **don't press Enter.** Look at the
   menu. When you've looked, press **Esc** once to close the menu, then
   press **Backspace** until the input line is empty.
4. **🤖 Claude:** type `/code-review` and **don't press Enter.** Check that it appears. It's
   built into Claude Code. **Don't install the `code-review` plugin** from a
   marketplace: that's a different tool, and `/plugin` must show only
   `prove-it`. Then press **Esc** once and **Backspace** until the input
   line is empty again.

✅ **Check:** the menu shows exactly five kit commands, `/prove-it:consult`,
`/prove-it:design-challenge`, `/prove-it:build-plan`, `/prove-it:grade` and
`/prove-it:handoff`, and `/code-review` exists.

⚠️ **If you see…** *`/code-review` doesn't appear:* your Claude Code is
older than 2.1.147. **🤖 Claude:** type `/exit`. **⌨️ You:** run
`claude update`, check `claude --version` shows `2.1.147` or higher, then
start Claude again with `claude`.

⚠️ **If you see…** *only `/code-review:` followed by more text (with a
colon):* that's the `code-review` plugin, not the built-in command. Switch
it off: **🤖 Claude:** type `/exit`. **⌨️ You:** run `claude plugin list`
to see its name, then `claude plugin disable <name>` with that name. Start
`claude` again and type `/code-review` again.

⚠️ **If you see…** *other commands besides the five:* other plugins are
installed. Note which ones. Ideally, disable them for this lab (Step 6
shows how).

### Step 6 — Check the bench is clean

**Why this step:** Anything extra Claude can see, such as a personal instruction file or a connection to another tool, changes how it behaves. Checking now means what you see in the lab comes from the lab, not from your own setup.

There are four separate checks. Do them **one at a time**, and finish
each one before you start the next.

**6a. Plugins. 🤖 Claude:**
1. Check Claude's input line is empty, then type `/plugin` and press
   **Enter**. A menu opens.
2. Open the **Installed** tab (the menu may open on another tab: press
   **Tab** to move between tabs). Don't press **Space** or **Enter** on a
   plugin's row: **Space** switches the plugin off.
   ✅ **Check:** among the plugins you installed (for example under
   **User**), the only one is `prove-it`. A **Built-in** group, if you see
   one, comes with Claude Code: leave it.
3. Press **Esc** until the menu closes and you're back at Claude's normal
   prompt (the `>` where you type to Claude).

**6b. MCP servers. 🤖 Claude:** only when you're back at the normal
prompt:
1. Type `/mcp` and press **Enter**.
   ✅ **Check:** it says there are no MCP servers.
2. Press **Esc** to close it.

⚠️ **If you see…** *nothing happens when you type `/mcp`, or it searches
the plugin list instead:* you're still inside the `/plugin` menu. Press
**Esc** until the menu is gone, then type `/mcp` again.

**6c. Quit Claude. 🤖 Claude:** type `/exit`.

**6d. Personal instruction file. ⌨️ You:** in a normal terminal:
```
ls ~/.claude/CLAUDE.md
```
✅ **Check:** `ls` says the file doesn't exist. It prints
`ls: /Users/<you>/.claude/CLAUDE.md: No such file or directory`.

**6e. Kit version. ⌨️ You:** in the same terminal:
```
claude plugin list
```
✅ **Check:** `prove-it@prove-it` is listed, with `Version: 0.1.3` and
`Status: ✔ enabled` under it.

⚠️ **If you see…** *`prove-it` with another version (for example `0.1.2`):*
the kit's marketplace was added earlier, without `#v0.1.3`. **⌨️ You:**
`cd ~/projects/priority-guard && claude`. Then **🤖 Claude:** type
`/plugin marketplace remove prove-it`, and redo Step 5 from item 2. Then
come back and do checks 6a to 6e again.

**⌨️ You (another way to do 6a and 6b):** the same checks can be run from
the terminal, in your workspace (`cd ~/projects/priority-guard` first:
`claude mcp list` also shows servers set up for the folder you're in). Use
these if `/mcp` isn't recognised in your version:
```
claude plugin list
claude mcp list
```
- `claude plugin list` shows which plugins are installed and switched on.
- `claude mcp list` shows connections to other tools (MCP servers).

✅ **Check:** the only plugin you installed that's switched on is
`prove-it`. No MCP servers are listed.

⚠️ **If you see…** *a personal `CLAUDE.md`, MCP servers or other plugins:*
they'll shape what Claude does in the lab. Use a separate user account, or
switch them off for the workshop like this. **Write each change in
`~/projects/priority-guard-notes/LOG.md` as you make it**: you'll undo them
after the lab ("Put your machine back", at the end of Module 9).
- **A personal `CLAUDE.md`:** **⌨️ You:** rename it so Claude doesn't read it:
  ```
  mv ~/.claude/CLAUDE.md ~/.claude/CLAUDE.md.off
  ```
  After the workshop, put it back with
  `mv ~/.claude/CLAUDE.md.off ~/.claude/CLAUDE.md`.
- **Other plugins:** **⌨️ You:** switch each one off (it stays installed,
  so you can switch it back on later), using the name `claude plugin list`
  shows:
  ```
  claude plugin disable <name>
  ```
  Or **🤖 Claude:** type `/plugin`, open the installed plugins, select each
  one other than `prove-it`, and choose **Disable**.
- **MCP servers:** a server whose name starts with `claude.ai` comes from
  your Claude account, and `claude mcp remove` can't remove it: it means
  the lab settings aren't active yet. Close every Claude Code window and
  run the `--check` command from Step 3 item 3. If it says the lab settings
  aren't in place, run the merge command from Step 3 item 3, then check
  again. If it says they're in place and the server is still listed, tell
  your instructor (a company seat can force it). A server
  whose name starts with `plugin:` comes from a plugin: switch that plugin
  off (the **Other plugins** bullet above). For any other server,
  **⌨️ You:** first save its settings, so you can add it back after the
  lab, then remove it:
  ```
  claude mcp get <name> >> ~/projects/priority-guard-notes/mcp-before-lab.txt
  claude mcp remove <name>
  ```
  `claude mcp get` prints how the server was set up; `>>` adds that to a
  file in your notes folder. Run `claude mcp list` again to check they've
  gone. If one won't go, tell your instructor.

Then do checks 6a to 6e again.

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

### Step 8 — Set up your app's repo

**Why this step:** Your app's code gets its own folder and its own history of
saved changes: a **repo**. Before any real code goes in, the repo gets a
**fence**: it rejects every file by default, and a guard checks every commit
for secrets. Setting this up at home leaves the workshop free for the build.
It stays on your computer until Module 5, when it goes to GitHub.

**The idea to watch for.** A check only counts if it could have failed.
You've never seen the guard fire. In 8.4 you try to beat it.

**Two Terminal windows.** This step uses two, side by side. **Window 1** is
for Claude. **Window 2** is a normal terminal, for the commands you type
yourself (open it with **Cmd+N**, as in "Before you begin"). Every action
says which window to use.

**Claude's shell goes back to the folder Claude was started in** after every
command, so every prompt below uses full paths. **Allow lines are your
decision:** Claude may propose one, but none goes in unread. If a block
doesn't start with a label, it belongs to the label just above it.

**When Claude asks permission** to run a command, follow the box in
[Lab home](README.md), section 7, *When Claude asks permission*.

#### 8.1 — Choose your scope, and create the app folder

**Why this step:** The **scope** is your app's unique name on the instance;
every part of the app starts with it. Your GitHub username and a GitHub
noreply email on the repo mean every change says who made it, without
putting your personal email online.

1. **🌐 Browser** (your **Admin** profile, logged in as admin): choose
   `<SCOPE>`. Type `sys_properties.list` in the filter navigator and press
   **Enter**. In the **Name** column's search box, type
   `glide.appcreator.company.code` and press **Enter**. Its **Value** is your
   instance's vendor prefix, for example `123456`. Your scope is
   `x_<that value>_pg_<your initials>`, for example `x_123456_pg_ga`.
   **18 characters at most** (the SDK refuses longer). Your initials keep it
   unique if two people ever share an instance. Write it in your values
   table as `<SCOPE>`.
2. **🌐 Browser:** find your **GitHub noreply email** and your **GitHub
   username**. On GitHub, open **Settings → Emails** and tick **Keep my
   email addresses private**. GitHub then shows your noreply address. It
   looks like `12345678+sam-lee@users.noreply.github.com`. Copy it exactly.
   Your GitHub username is the part between the `+` and the `@` (in the
   example, `sam-lee`). Write both down: you need them in item 4.
3. **⌨️ You** (window 1): start Claude in the workspace. It does 8.1–8.3
   from here.
   ```
   cd ~/projects/priority-guard
   claude
   ```
4. **🤖 Claude:** type this prompt, with your own two values from item 2 in
   place of `<your GitHub username>` and `<your GitHub noreply email>`.
   Replace the angle brackets `<` `>` too, but keep the quotes:
   ```
   Create the folder ~/projects/priority-guard/app and make it a new git
   repository whose first branch is main: git init -b main. Then, for that
   repository only (not --global), set user.name to "<your GitHub username>"
   and user.email to "<your GitHub noreply email>". Use full paths in every
   command. Don't create any other file, and don't commit or push anything.
   Don't read anything outside ~/projects/priority-guard and
   ~/projects/prove-it-kit.
   ```
   For example, the middle of it would read: `set user.name to "sam-lee"
   and user.email to "12345678+sam-lee@users.noreply.github.com"`.
   `user.name` is the name shown on every change you save in this repo.
   Using your GitHub username keeps it the same as your account. It
   becomes public when the repo goes to GitHub.
5. **🔍 Check** what git saved:
   ```
   Run exactly this and show me the raw output, unedited:
   git -C ~/projects/priority-guard/app config user.name && git -C ~/projects/priority-guard/app config user.email
   ```

✅ **Check:** `<SCOPE>` is in your values table and is 18 characters or
fewer. Git's output says it created an empty repository in
`.../priority-guard/app/.git/`. The 🔍 Check prints two lines: your GitHub
username, then your noreply email, with no `<` or `>` in either.

⚠️ **If you see…** *a `<`, a `>`, or the words `your GitHub` in that output:*
the placeholder went in as typed. **🤖 Claude:** type the prompt from item 4
again with your real values. It sets them again, and the 🔍 Check then
shows the new ones.

⚠️ **If your instructor tells you, in the workshop invite, that `now-sdk init`
needs an empty folder:** use the order in 8.5's ⚠️ from the start: make the
empty folder and run `now-sdk init` first (items 1 and 2 of that ⚠️), then
8.1–8.4, then 8.5 from item 2 on.

#### 8.2 — An allow list, before the first commit

**Why this step:** Most `.gitignore` files (the file that tells git what to
leave out) ban things they've seen before, but sensitive material has no fixed
shape. An **allow list** only has to know what the repo is for: everything
else is invisible to git. It must be in place before the first commit, because
once a file is committed it stays in the history.

1. **🤖 Claude:** get a local copy of the kit, at the version you installed
   in Step 5, outside the workspace, then copy the allow list and start a
   README:
   ```
   If ~/projects/prove-it-kit doesn't exist yet, clone the public repo
   gapietro/prove-it-kit to it with gh repo clone. If it already exists,
   don't clone it again: run git -C ~/projects/prove-it-kit fetch --tags
   instead. Either way, then detach it at the tag v0.1.3:
   git -C ~/projects/prove-it-kit switch --detach v0.1.3
   Then copy ~/projects/prove-it-kit/templates/gitignore.allowlist to
   ~/projects/priority-guard/app/.gitignore, and create
   ~/projects/priority-guard/app/README.md containing exactly one line:
   # Priority Guard
   Use full paths. The app repo stays on main: don't stage, commit or push
   anything. Don't read anything outside ~/projects/priority-guard and
   ~/projects/prove-it-kit.
   ```
2. **🔍 Check** that the kit copy is the right version:
   ```
   Run exactly this and show me the raw output, unedited:
   git -C ~/projects/prove-it-kit describe --tags
   ```
   It prints exactly `v0.1.3`. (An older copy would hand out older kit
   files.)
3. **✏️ Editor:** open `~/projects/priority-guard/app/.gitignore` and read
   it. Find the line `/*`. That line hides everything; the `!` lines let
   things back in.

✅ **Check:** the kit copy is `v0.1.3`. You can point to the line that hides
everything, and to the lines that admit `README.md` and `.gitignore`.

#### 8.3 — Install the guard

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

#### 8.4 — 🔮 Try to beat the guard

**Why this step:** A check only counts if it could have failed. Writing your
prediction down first shows you what you really expected, not what you
remember expecting once you've seen the result. Then you try to get a fake
secret past the guard, so you know how it behaves before you trust it with
real code.

First predict, in `LOG.md` (**✏️ Editor**,
`~/projects/priority-guard-notes/LOG.md`): will the guard stop a commit that
contains a token? Then, in **⌨️ You** (window 2), go to the repo:
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
finding of the day, and a real **catch**. The guard can't be trusted. Stop
here and tell your instructor, using the contact in the workshop invite.
Don't push anything until it's understood.

Now remove the fake token and commit cleanly, still in **⌨️ You**
(window 2):
```
echo "# Priority Guard" > README.md
git add README.md
git commit -m "chore: initial scaffold"
```

✅ **Check:** this commit succeeds. The guard ran and passed.

#### 8.5 — The SDK project, and prove it builds

**Why this step:** This sets up the ServiceNow app itself and proves it
compiles before you write any real code. Setup tools can change your files, so
you also check the fence is still in place and that build output and
downloaded packages stay out of git. If the empty project doesn't build,
nothing you add to it will.

1. **⌨️ You** (window 2, `~/projects/priority-guard/app`): create the
   ServiceNow project. `init` signs in to your instance, so you run it
   yourself, not Claude. Your PDI must be awake (see Step 1's ⚠️), and
   `<PDI_ALIAS>` is the alias from Step 3. `init` gets every answer as a
   flag, so it asks nothing:
   ```
   cd ~/projects/priority-guard/app
   now-sdk init --appName "Priority Guard" --packageName priority-guard --scopeName <SCOPE> --template typescript.basic --auth <PDI_ALIAS>
   ```

   | Flag | Answer | Why |
   |---|---|---|
   | `--appName` | `Priority Guard` | The app's display name |
   | `--packageName` | `priority-guard` | npm package name: lower case, no spaces |
   | `--scopeName` | `<SCOPE>`, for example `x_123456_pg_ga` | The scope you chose in 8.1: your instance's vendor prefix, then `pg_` and your initials. **18 characters at most** (the SDK refuses longer) |
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
      Nothing has been pushed, and the only commit is the 8.4 scaffold,
      which you redo:
      ```
      cd ~/projects/priority-guard
      rm -rf ~/projects/priority-guard/app
      mkdir -p ~/projects/priority-guard/app
      ```
   2. **⌨️ You** (window 2): the `cd` and `now-sdk init` lines above.
   3. **🤖 Claude:** 8.1's prompt from item 4 (`git init -b main`, your
      GitHub username and noreply email) and its 🔍 Check, then 8.2 (the
      allow list) and 8.3 (the guard).
   4. **⌨️ You:** 8.4 (beat the guard, then the clean commit).
   5. Carry on from item 2 below.

   If anything else goes wrong, stop and tell your instructor, using the
   contact in the workshop invite.
2. **Restore the allow list.** `now-sdk init` writes its own short
   `.gitignore` over yours (SDK 4.12 does this every time). Put the kit's
   allow list back.

   **🤖 Claude** (window 1, still in `~/projects/priority-guard`):
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
   When it asks whether you trust this folder, use the **arrow keys** to
   select **Yes**, then press **Enter** (if **No, exit** is highlighted,
   Enter quits Claude).

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

   ✅ **Check:** the build finishes without errors. `git status --short`
   shows no `dist/` and no `node_modules/`. Both `check-ignore` lines name
   a rule that hides them.

   ⚠️ **If you see…** *the build fails:*
   1. **✏️ Editor:** copy the **first** error line into `LOG.md`.
   2. **🤖 Claude:**
      ```
      Explain this build error in plain words. Don't change any file.
      ```
   3. If it says a file (often an `index` file under `src/`) still
      **imports** one of the example files you deleted, let Claude remove
      **only that import line**:
      ```
      Remove only the import of the deleted example file from that file in
      ~/projects/priority-guard/app/src. Show me the change before you save
      it. Change nothing else. Stay on main; don't stage, commit or push
      anything.
      ```
      Read the change, then run the build again (the prompt in item 4).
   4. Any other error: stop and tell your instructor, using the contact in
      the workshop invite.
5. **Quit Claude.** **🤖 Claude** (window 1): type `/exit`. The SDK's files
   stay uncommitted for now: in Module 5 you read the list of every file
   before it's committed and goes to GitHub.

✅ **Check:** **⌨️ You** (window 2):
```
git -C ~/projects/priority-guard/app log --oneline
git -C ~/projects/priority-guard/app status --short
```
- `git log --oneline` prints **exactly one line**, ending
  `chore: initial scaffold`.
- `git status --short` lists only the SDK's new files, each on a line
  starting `??` (for example `?? now.config.json`, `?? package.json`,
  `?? src/`). That's expected: they're committed in Module 5. Nothing names
  `dist` or `node_modules`.
- Only if you agreed to `!/.vscode/` in item 3, you also see
  ` M .gitignore` and `?? .vscode/`. That's expected too.

Your `~/projects` folder now looks like this:
```
~/projects/
├── agentic-build-lab-guide/      this guide (you read it; Claude never does)
├── priority-guard/               your workspace: Claude works here
│   ├── brief/                    empty until Module 1
│   └── app/                      your app's code repo: one commit, guard installed
├── priority-guard-notes/         your notes: Claude never reads these
│   ├── LOG.md                    your guard prediction and result
│   └── catches.md                empty for now
└── prove-it-kit/                 a copy of the kit at v0.1.3 (Claude only reads it)
```

---

## Pre-flight: all eight before the day

**Why this step:** This list is your proof the bench is ready. Anything left unticked would cost you time on the day, so your instructor needs to hear about it before then.

- [ ] Step 1: PDI with demo incidents and business services
- [ ] Step 2: all six tools print a version
- [ ] Step 3: GitHub, Claude Code and the SDK login all work
- [ ] Step 4: the workspace holds an empty `brief/` folder and, after
      Step 8, your `app/` repo, and nothing else
- [ ] Step 5: the five kit commands and `/code-review`
- [ ] Step 6: a clean bench
- [ ] Step 7: the agent user in a second browser profile
- [ ] Step 8: your app's repo: `<SCOPE>` chosen, the guard blocked the fake
      token, one `chore: initial scaffold` commit, and the empty project
      builds

**Optional: let Claude double-check your bench.** Once everything above is
ticked, Claude can run the version checks for you in one go and show you the
raw results. **⌨️ You:** `cd ~/projects/priority-guard && claude`. Then
**🔍 Check:**
```
Run exactly these, one after another, and show me the raw output of each,
unedited: node --version; npm --version; now-sdk --version; gh --version;
git --version; claude --version; gh auth status. Don't install, change or
fix anything.
```
Compare each line with Step 2's table. Anything missing or too old: fix it
yourself as Step 2 says, not through Claude. Then **🤖 Claude:** `/exit`.

**Anything not ticked: tell your instructor before the day**, at least two
days before, using the contact your instructor gave you in the workshop
invite.
