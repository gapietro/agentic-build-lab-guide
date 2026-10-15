# Module 3 — Research, then the LLD

*⏱ 75 min · 10:00*

Check Claude's research on your instance, then write the low-level design
(LLD). **The catch:** Claude's research will be confident and mostly right.
Which of its claims does your instance contradict, or not support?

<details><summary>ℹ️ Why are we doing this?</summary>

- **In real work:** before anyone designs, someone checks what the platform
  really does, on the customer's own instance, not from memory.
- **Why it matters:** Claude's facts are confident guesses. One wrong one
  breaks the build at install time, after the work is done.
- **Your mindset:** you're the auditor. A claim is true only when your
  instance shows it. "Couldn't check" is an honest answer.
</details>

### 1. 🔮 Guess, then ask Claude for the facts

Guess first: which two platform facts does this design depend on most?

⌨️ **Terminal:**
```
cd ~/projects/priority-guard && mkdir -p inputs docs
cp ../agentic-build-lab-guide/files/inputs/TECH-NOTES.md inputs/
cp ../agentic-build-lab-guide/files/LLD-TEMPLATE.md docs/
claude
```
🤖 **Claude:**
```
Read brief/PRD-PriorityGuard.md, CONSULT.md and inputs/TECH-NOTES.md. List
every platform fact the design will rely on, including what a scoped app
needs to update incidents and anything else that runs at the same point as
its logic. For each, say how sure you are and how I can check it on my
instance by reading records only. Mark the five the design depends on
most. Design nothing, run nothing, write no file.
```
Compare with your guess.

### 2. Get a read-only script

🤖 **Claude:**
```
Write a read-only background script checking your top five facts. Use
only new GlideRecord, new GlideAggregate, addQuery, addEncodedQuery,
setLimit, query, next, get, getValue, getDisplayValue, getRowCount,
getTableName and gs.print, and no functions of your own. Per fact, gs.print
its number, the table and query, and the raw values (or that reading
records can't check it), never "confirmed". Only show me the script.
```
✅ Every word just before a `(`, and after `new`, is one of those calls.
`if (`, `while (` and `for (` are fine too.

<details><summary>🛟 Another word comes before a <code>(</code></summary>

Don't run it. Type `Read-only, please: use only the allowed calls.` and
check again.

</details>

<details><summary>🛟 Copying the script doesn't work</summary>

Copying from Claude's window can break the script. Ask Claude for help, or
have it write the script to a file. 🤖 **Claude:**
`Write that script to research-script.js in this folder.` Then ✏️ **Editor:**
open `priority-guard/research-script.js`, press **Cmd+A**, then **Cmd+C**.

</details>

### 3. Run it in Scripts - Background

🌐 **Browser**, **Admin** profile: type `sys.scripts.do` in the filter
navigator and press **Enter**. This page runs scripts as admin. Paste the
script and click **Run script**.

✅ One `*** Script:` line per fact, each looking up the fact it names, in the
right table. A fact whose line looked elsewhere is **not checked**.

<details><summary>🛟 The page won't open, or asks for a role</summary>

Look the facts up by hand and tell Claude, such as
`Fact 3: contradicted. My instance shows …`.
- Fields: `sys_dictionary.list`, **Table** `incident`.
- Business rules (scripts run on save): `sys_script.list`, **Table**
  `incident`. Read **When** and **Order**.
- Access: `sys_db_object.list`, a table's **Application Access** tab.
- Roles: `sys_user_role.list`. Priority lookup: `dl_u_priority.list`.

</details>

### 4. Have Claude mark each fact

Copy the output lines, minus any URL or instance name.

🤖 **Claude:** paste this, then the output lines, and send:
```
From the script output below only, mark each fact confirmed, contradicted,
couldn't check, or production only (in inputs/TECH-NOTES.md, not on my
instance). Facts the script didn't look up are not checked.
```
Check each mark against its output line, and correct any, such as
`Fact 3: production only, not on dev.` A fact about something your app will
create, such as its own table or role, finds nothing yet: correct it to
`couldn't check`, not contradicted.

### 5. Draft the LLD

🤖 **Claude:**
```
Draft docs/LLD-PriorityGuard.md from docs/LLD-TEMPLATE.md, the PRD,
CONSULT.md and the research results. Every component cites a PRD
capability. Section 7 lists every fact with my result, exactly as I
reported it. Anything undecided goes in section 8: never invent a business
decision. Show me a summary first; don't write the file yet.
```
Fix the summary if needed. Then approve it: `Looks right. Write the file.`

### 6. Log it

🤖 **Claude:**
```
Log this module's catches: real problems the process found, in this
session or this module's pull requests, that got fixed or changed a
decision. One line each, as "3 | <what caught it> | <what, and what was
done>", where what caught it is one of prd, consult, research, design,
guard, test, review, partner, grade, drill. Show me the lines, and when I
reply keep, append them to ~/projects/priority-guard/catches.md.
```
Confirm a `research` line for each claim your instance contradicted or didn't
support, if it changed your LLD. Then type `/exit`.

## You now have

- `docs/LLD-PriorityGuard.md`, and this module's catches in `catches.md`.
- The full LLD review is on [After the workshop](AFTER-THE-WORKSHOP.md).
