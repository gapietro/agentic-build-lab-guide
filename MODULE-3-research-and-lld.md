# Module 3 — Research, then the LLD

*⏱ 75 min · 10:00*

Check Claude's research on your instance, then sign the low-level design
(LLD). **The catch:** Claude's research will be confident and mostly right.
Which of its claims does your instance contradict, or not support?

### 1. 🔮 Predict, then ask Claude for the facts

✏️ **Editor:** in `LOG.md`, write the two platform facts you think this
design depends on most.

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
Compare with your prediction.

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

### 3. Run it in Scripts - Background

🌐 **Browser**, **Admin** profile: type `sys.scripts.do` in the filter
navigator and press **Enter**. This page runs scripts as admin. Paste the
script, tick **Execute in sandbox** only if your instructor says so, and
click **Run script**.

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
`Fact 3: production only, not on dev.` "Couldn't check" suits what doesn't
exist yet.

### 5. Draft the LLD

🤖 **Claude:**
```
Draft docs/LLD-PriorityGuard.md from docs/LLD-TEMPLATE.md, the PRD,
CONSULT.md and the research results. Every component cites a PRD
capability. Section 7 lists every fact with my result, exactly as I
reported it. Anything undecided goes in section 8: never invent a business
decision. Show me a summary first; don't write the file yet.
```
Fix the summary if needed, then type `Looks right. Write the file.`

### 6. Review and sign it by hand

🤖 **Claude:** type `/exit`. ✏️ **Editor:** open
`priority-guard/docs/LLD-PriorityGuard.md`. Check that §1 lists every PRD
capability as built, or deferred with a reason; that §7 matches the script
output and your checks by hand; and that no `<…>` is left. Fix anything
yourself. Then sign §9: in its empty row `| | | | |`, type your name,
`developer`, today's date (YYYY-MM-DD) and your name again. Don't add a row.

### 7. Write your Module 4 positions

✏️ **Editor:** copy this into `LOG.md` and fill it in from your LLD.
```
Feature name: PriorityGuard
My design, 3-4 sentences (what, tables, who owns each write):
Central rule, as short sentences, one idea each:
When the floor runs, and what it must survive:
Who can change the critical services list:
Who can override, and what it records:
Can an override be edited or deleted:
Tier 1 approval:
Capability 6 (smart urgency):
Never changes the priority matrix or SLA definitions. Also never:
Who sees the weekly count:
Demo data (from LLD §6):
MERGE passes when: every change reviewed, all checks green
INSTALL passes when: installs cleanly on your PDI, a live check passes
DEMO passes when: the floor works live, as an ordinary agent
HANDOFF passes when: someone else diagnoses a failure from the runbook alone
```

## You now have

- `docs/LLD-PriorityGuard.md`, signed by you.
- Your Module 4 positions in `LOG.md`.
- The full LLD review is on [After the workshop](AFTER-THE-WORKSHOP.md).

**Log it:** `3 | research | <the claim, and what your instance showed>`, for
each claim that changed your LLD.
