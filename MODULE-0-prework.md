# Module 0 — Pre-work: get your bench ready

*⏱ About 90 minutes · at home, at least two days before the workshop*

Set up your instance, your tools and your app's repo, so the day starts with
the build. **The idea:** a check only counts if it could have failed. At the
end you try to beat your repo's guard with a fake token.

## Part 1 — Your instance

### 1. Get a developer instance

🌐 **Browser:** at https://developer.servicenow.com, sign in and request a
**Personal Developer Instance (PDI)**. Note its address, such as
`https://dev123456.service-now.com`, and its admin password.

### 2. Check the demo data

🌐 **Browser:** log in to your instance as `admin`. Click **All** at the top
left, type `incident.list` in the box under it, and press **Enter**. Then do
the same with `cmdb_ci_service.list`.

✅ Both lists have rows: demo incidents and demo business services.

<details><summary>🛟 It's asleep or gone, or has no business services</summary>

- **Asleep (hibernating):** wake it at https://developer.servicenow.com. It
  takes a few minutes.
- **Reclaimed**, or **no business services:** tell your instructor.
</details>

### 3. Make an ordinary agent user

🌐 **Browser**, as admin:
1. Click **All**, type `User Administration`, and click **Users**.
2. Click **New**. Set **User ID** `agent.demo`, **First name** `Agent`,
   **Last name** `Demo`, and click **Submit**.
3. Open `agent.demo`. On the **Roles** tab, click **Edit…**, move `itil` to
   the right-hand list, and click **Save**.
4. **Set Password**: set one, note it, untick **Require password change**.
5. Add a browser profile named **Agent** (in Chrome: your profile icon, then
   **Add**), and log in there as `agent.demo`. Your usual profile is
   **Admin**: stay logged in there as admin.

## Part 2 — Your tools

### 4. Install the tools

⌨️ **Terminal:** open Terminal (**Cmd+Space**, type `Terminal`, press
**Enter**) and check what you have:
```
node --version
git --version
gh --version
now-sdk --version
claude --version
```
✅ Node.js is `v22.22` or later and Claude Code is `2.1.228` or later. The
others print any version.

⌨️ **Missing one, or too old?** Install Node.js LTS from https://nodejs.org
and the GitHub CLI from https://cli.github.com. Then install the other two,
and run the checks again:
```
npm install -g @servicenow/sdk @anthropic-ai/claude-code
```
Install VS Code from https://code.visualstudio.com too: it's your editor.
**Never installed tools like these?** That's fine: ask Claude at
https://claude.ai, or any AI assistant, to walk you through it.

<details><summary>🛟 An install or a check doesn't work</summary>

- **"command not found" just after installing:** open a new Terminal window
  and check again.
- **EACCES or "permission denied":** run the same command with `sudo` in
  front, and type your Mac's password. Nothing shows as you type.
- **A box offers "command line developer tools":** click **Install**.
</details>

### 5. Sign in to GitHub and get this guide

Accept your instructor's invite to this guide's repo first: it's in your
GitHub email and at https://github.com/notifications.

⌨️ **Terminal:**
```
gh auth login --web --git-protocol https
gh auth setup-git
mkdir -p ~/projects
gh repo clone gapietro/agentic-build-lab-guide ~/projects/agentic-build-lab-guide
```
`gh auth login` shows a one-time code. Press **Enter**, type the code into
the GitHub page that opens, and approve. Press **Enter** for any question.

<details><summary>🛟 It says "Could not resolve to a Repository"</summary>

The invite isn't accepted yet, or you signed in to another GitHub account:
`gh auth status` shows which.
</details>

### 6. Add the lab's Claude Code settings

Close every other Claude Code window first, with `/exit`.

⌨️ **Terminal:**
```
node ~/projects/agentic-build-lab-guide/files/merge-claude-settings.mjs
```
✅ It prints `Lab settings in place.`

<details><summary>ℹ️ What this changes, if you already use Claude Code</summary>

It starts Claude in auto mode, turns off connectors, new memories and web
search, blocks `now-sdk auth`, and keeps Claude out of your notes and this
guide. Your own settings are backed up and kept, and Module 9 restores them.
Cleanest of all: a separate user account on your computer.
</details>

### 7. Sign in to Claude Code

⌨️ **Terminal:**
```
cd ~
claude
```
Follow the screens. Choose your **Claude account with subscription** (or
**Anthropic Console account** if you pay per use) and sign in in the browser.
When it asks if you trust this folder, pick **Yes** with the arrow keys.

✅ Under the input box it says `⏵⏵ auto mode on`.

🤖 **Claude:** type `/exit`. You're back at your normal prompt.

<details><summary>🛟 It says ⏸ manual mode on</summary>

Type `/exit`, then put the settings back and start again:
```
node ~/projects/agentic-build-lab-guide/files/merge-claude-settings.mjs
claude
```
Still manual? Your organisation turned auto mode off. Claude will just ask
more often. Tell your instructor.
</details>

### 8. Connect the SDK to your instance

Your instance must be awake. Type the password only here, never in Claude.

⌨️ **Terminal:** replace `dev123456` with your instance's name, from its
address in step 1:
```
now-sdk auth --add https://dev123456.service-now.com --type basic --alias lab-pdi
```
When asked, type the user name `admin`, then your admin password. Nothing
shows while you type it.

<details><summary>🛟 It prints a line starting [now-sdk] ERROR:</summary>

The sign-in failed. Check the instance is awake and the password is right,
then run the same command again.
</details>

## Part 3 — The kit and a clean bench

### 9. Install the kit

⌨️ **Terminal:**
```
claude plugin marketplace add 'gapietro/prove-it-kit#v0.1.3'
claude plugin install prove-it@prove-it
```

### 10. Make your folders

⌨️ **Terminal:**
```
mkdir -p ~/projects/priority-guard/brief
touch ~/projects/priority-guard/catches.md
```
`priority-guard` is your workspace; Claude logs catches in `catches.md`.

✏️ **Editor:** in VS Code, choose **File > Open Folder…** and open the
`projects` folder in your home folder. Keep it open.

### 11. Check nothing else is loaded

Claude reads every plugin, server and personal instruction file you have.
For the lab, it should see only the kit.

⌨️ **Terminal:**
```
cd ~/projects/priority-guard
claude plugin list
claude mcp list
ls ~/.claude/CLAUDE.md
```
✅ The only enabled plugin is `prove-it@prove-it`, with `Version: 0.1.3`.
`claude mcp list` says `No MCP servers configured`. `ls` says
`No such file or directory`.

<details><summary>🛟 Other plugins, MCP servers or a CLAUDE.md are listed</summary>

⌨️ **Terminal:** save the list first, so Module 9 can switch them back on:
```
mkdir -p ~/projects/priority-guard-notes
claude plugin list > ~/projects/priority-guard-notes/plugins-before-lab.txt
```
Then switch each off:
- Plugin: `claude plugin disable <name>`
- `CLAUDE.md`: `mv ~/.claude/CLAUDE.md ~/.claude/CLAUDE.md.off`
- Server `plugin:…`: disable that plugin. `claude.ai …`: tell your
  instructor. Any other:
  `claude mcp get <name> >> ~/projects/priority-guard-notes/mcp-before-lab.txt`,
  then `claude mcp remove <name>`.
- `prove-it` at another version:
  ```
  claude plugin marketplace remove prove-it
  claude plugin marketplace add 'gapietro/prove-it-kit#v0.1.3'
  claude plugin install prove-it@prove-it
  ```
</details>

## Part 4 — Your app's repo

Your app's code gets its own repo, fenced in two ways: it ignores every
file you haven't named, and a guard checks each commit for secrets.

### 12. Look up your scope

🌐 **Browser:**
1. In your **Admin** profile, type `sys_properties.list` in the filter
   navigator and press **Enter**. In the **Name** column's search box, type
   `glide.appcreator.company.code` and press **Enter**. Its **Value** is
   your vendor prefix, such as `123456`.
2. Your scope is `x_<prefix>_pg_<your initials>`, such as `x_123456_pg_ga`,
   at most 18 characters.

### 13. Create the app

Your instance must be awake.

⌨️ **Terminal:** replace `<SCOPE>` with your scope from step 12:
```
mkdir -p ~/projects/priority-guard/app
cd ~/projects/priority-guard/app
now-sdk init --appName "Priority Guard" --packageName priority-guard --scopeName <SCOPE> --template typescript.basic --auth lab-pdi
```
✅ It ends with `Application created successfully.`

<details><summary>🛟 It fails, or asks questions</summary>

Asked for a template? Choose **typescript.basic**. Failed? Check the
instance is awake and your scope has no `<` or `>`, then run the last line
again. Still failing? Tell your instructor.
</details>

### 14. Let Claude set up the repo

⌨️ **Terminal:** start Claude in the app folder, and pick **Yes** when it
asks if you trust it:
```
cd ~/projects/priority-guard/app && claude
```
🤖 **Claude:** paste this and press **Enter**:
```
Set up this folder as my app's repo. Make sure ~/projects/prove-it-kit is
gapietro/prove-it-kit at tag v0.1.3: clone it if it's missing, otherwise
fetch tags and switch to the tag. Run git init -b main. For this repo only,
set user.email to my GitHub noreply address, id+login@users.noreply.github.com,
with my id and login from gh api user. Replace .gitignore with the kit's
templates/gitignore.allowlist. Install the kit's hooks/pre-commit-guard.sh
as the pre-commit hook. Delete src/fluent/example.now.ts and
src/server/script.ts and any import of them. Make README.md the single line
"# Priority Guard". Then run npm install and now-sdk build, and stop if the
build fails. Commit nothing.
```
✅ The `now-sdk build` output ends with `Build completed successfully`.

🤖 **Claude:** type `/exit`.

<details><summary>🛟 The build failed</summary>

Tell your instructor the first error line. Don't let Claude change files to
make it pass.
</details>

### 15. 🔮 Try to beat the guard

Guess first: will the guard stop a commit with a token in it?

⌨️ **Terminal**, still in `~/projects/priority-guard/app`:
```
head -1 .gitignore
echo 'FAKE_TOKEN=do-not-use-0000' >> README.md
git add .gitignore README.md
git commit -m "chore: initial scaffold"
```
✅ The first line printed is `# Allowlist .gitignore (prove-it). Nothing is
tracked unless admitted below.` The commit is **blocked**:
`BLOCKED: README.md has 1 added line(s) that look like a secret.`

That's the guard working, not a catch.

<details><summary>🛟 The commit went through</summary>

The guard can't be trusted: that's a real catch. Push nothing, and tell
your instructor. ⌨️ **Terminal:** log it:
```
echo '0 | guard | the guard let a fake token through' >> ~/projects/priority-guard/catches.md
```
</details>

### 16. Commit for real

⌨️ **Terminal:**
```
echo "# Priority Guard" > README.md
git add README.md
git commit -m "chore: initial scaffold"
```
✅ Git prints `[main (root-commit) …] chore: initial scaffold`.

## You now have

- A PDI with demo data, and `agent.demo` logged in to your **Agent** profile.
- The tools, signed in, with the lab settings and the kit `v0.1.3`.
- `~/projects/priority-guard`, holding only `app/`, an empty `brief/` and an
  empty `catches.md`.
- In `app/`: one commit, the allow list, the guard, and an SDK project that
  builds. Its files stay uncommitted until Module 5.

Anything missing? Tell your instructor at least two days before the day.
