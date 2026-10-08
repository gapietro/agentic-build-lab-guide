# Module 3 — Research, then the LLD

*Workshop · 10:00 · 75 minutes*

**In the workshop:** do Steps 1–8, with the quick review in Step 6. The
module ends with writing your Module 4 positions (Step 8). The full review in
Step 6 is for after the workshop.

[← Module 2](MODULE-2-consult.md) · [Lab home](README.md) · [Module 4 →](MODULE-4-design.md)

---

## What you'll do

The consult answered the big questions: plain code or AI, which tables,
who owns what. Before anyone designs in detail, you need **facts** about the
platform the design will rely on. Then you write the **LLD**, the low-level
design: components, logic, security, failure modes and a test plan, each
traced back to the PRD.

Research has two halves:
1. **What Claude knows**, about ServiceNow in general and from the customer's
   technical notes.
2. **What your instance says.** Every fact the design relies on gets checked
   on your instance before you build on it. Claude's research is a list of
   claims until then.

**The catch to watch for.** Claude's research will be confident, and mostly
right. Which of its claims does your instance contradict, or not support?

---

## Before you start

- [ ] `~/projects/priority-guard` holds `brief/PRD-PriorityGuard.md`,
      `CONSULT.md`, and the `app/` folder from pre-work.
- [ ] Your **admin** browser profile is logged in to your PDI. If you see a
      page saying the instance is hibernating (asleep), sign in at
      https://developer.servicenow.com and wake it from there. Waking takes a
      few minutes.

### Where each step happens

This module uses one terminal window: you start Claude in it in step 3, and
quit it in step 6. Steps 7 and 8 are in your editor. Every action is labelled with **where** you do it:

| Label | What it is | Folder |
|---|---|---|
| **⌨️ You** | You type it yourself, in a normal terminal: `mkdir`, `cp`, `cd` and `ls` (never in Claude), and `claude` to start Claude | Any (step 1 uses full paths) |
| **🤖 Claude** | Claude Code, started with `claude`. Type prompts here, never shell commands, or `/exit` to quit Claude. Claude runs any commands | `~/projects/priority-guard` |
| **✏️ Editor** | Your text editor (VS Code), for `LOG.md` and changes you make **by hand** | — |
| **🌐 Browser** | Your **admin** browser profile, for checks on the instance | — |

If a block doesn't start with a label, it belongs to the label just above it.

### How to look things up on your instance

Step 4 checks the most important facts with a short script. This box is the
**second way**, by hand: use it for any fact the script couldn't check, or if
the script page won't open for you. **🌐 Browser**, in your **admin**
profile: type each one in the filter navigator and press **Enter**. (New to lists and filtering? See
[ServiceNow basics you'll use](README.md#servicenow-basics-youll-use).)

| To see | Type in the filter navigator | Then |
|---|---|---|
| The fields on the incident table | `sys_dictionary.list` | Filter the **Table** column to `incident` |
| The business rules on the incident table | `sys_script.list` | Filter the **Table** column to `incident`. Look at the **When** and **Order** columns |
| A table's application access | `sys_db_object.list` | Find the table in the **Name** column (for example `incident`), open its record, and click the **Application Access** tab |
| The roles on your instance | `sys_user_role.list` | Filter the **Name** column, or scroll |
| The priority lookup | `dl_u_priority.list` | Read the rows |

---

## Steps

### Step 1 — Bring in the technical notes and the template

**Why this step:** Claude can only work with what is in the workspace folder.
Copying in the customer's technical notes and the design template now means
the research and the design start from the same material everyone else uses.

The technical notes are customer material, like the PRD. They go in the
workspace, but **not** in `brief/`, because the consult expects exactly one
file there.

**⌨️ You** (any folder):
```
mkdir -p ~/projects/priority-guard/inputs ~/projects/priority-guard/docs
cp ~/projects/agentic-build-lab-guide/files/inputs/TECH-NOTES.md ~/projects/priority-guard/inputs/
cp ~/projects/agentic-build-lab-guide/files/LLD-TEMPLATE.md ~/projects/priority-guard/docs/
```

### Step 2 — 🔮 Predict it

**Why this step:** Once you've seen Claude's answer, it's hard to remember what
you thought before. Writing your own guess down first gives you something
honest to compare with, and shows you where your instincts were right or off.

**✏️ Editor:** in `LOG.md`, write the two platform facts you think this design depends on
most.

### Step 3 — Research with Claude

**Why this step:** The design will rest on facts about the platform. Here
Claude lists those facts and says how to check each one. Without that list,
guesses can slip into the design looking like facts.

**⌨️ You** (any folder):
```
cd ~/projects/priority-guard
claude
```
**🤖 Claude** (`~/projects/priority-guard`): type:
```
Research the platform facts this app depends on, before we design it. Read
brief/PRD-PriorityGuard.md, CONSULT.md and inputs/TECH-NOTES.md. List every
platform fact the design will rely on: the tables and fields, anything else
that runs at the same point as this app's logic, roles and access
controls, and what a scoped app needs to update incidents. For each fact, say
how sure you are and exactly how I can check it on my instance by reading
records only: list views, record forms, the dictionary, a table's
application access. Don't run anything on the instance yourself. Mark the
five facts the design depends on most. Don't design anything yet, and don't
write any file.
```

✅ **Check:** a numbered list of facts, each with a confidence level and a
way to check it on your instance, with five of them marked as the ones the
design depends on most. The screens in
[How to look things up on your instance](#how-to-look-things-up-on-your-instance)
cover most of the checks it suggests.

### Step 4 — Check the facts with a background script

**Why this step:** Claude can sound sure and still be wrong. A short script
that only **reads** from your instance checks the five most important facts
in one go. Its output is something you see for yourself, not Claude's word.

**🤖 Claude** (`~/projects/priority-guard`): type:
```
Write one read-only ServiceNow background script that checks the five facts
you marked as the ones the design depends on most. Use only these calls:
new GlideRecord, new GlideAggregate, addQuery, addEncodedQuery, setLimit,
query, next, get, getValue, getDisplayValue, getRowCount, getTableName and
gs.print. No other calls at all. Write it as plain statements, with no
functions of your own. For each fact, print one line with
gs.print: the fact number, what the script looked up (the table and the
query), and the raw values it found. Print raw values only; never print
confirmed or contradicted. If a fact can't be checked by reading records,
print a line that says so. Don't run anything and don't write any file.
Just show me the script.
```

**Read the script** in Claude's reply before you copy it. You don't need to
understand every line. You're checking that it only **reads**.

**The allow list.** Look at every word that comes right before a `(`, and
every word after `new`. Each one must be on this list:
- `GlideRecord`, `GlideAggregate` (after `new`)
- `addQuery`, `addEncodedQuery`, `setLimit`, `query`, `next`, `get`
- `getValue`, `getDisplayValue`, `getRowCount`, `getTableName`
- `gs.print`

`if (`, `while (` and `for (` are fine: they're part of how any script is
written, not calls to the instance.

⚠️ **If you see…** *any other word before a `(`:* don't run it, even if it
looks harmless. Type
`Read-only, please: use only the allowed calls.` and check the new script
the same way.

**🌐 Browser**, in your **admin** profile:
1. Type `sys.scripts.do` in the filter navigator and press **Enter**. This
   opens **Scripts - Background**, a page where you can run a script on the
   instance. It runs as you, with full **admin** rights, which is why you
   check the script first.
2. Paste the script into the big box. Leave the other settings as they are,
   except one: if your instructor tells you to, tick **Execute in sandbox**.
   Click **Run script**.
3. The output appears on the page, one line per fact (each line usually
   starts with `*** Script:`). Copy those lines.
4. Read each line against the fact it names: **does each printed line
   actually look up the fact it names?** For example, a line about a field
   on the incident table should come from the incident table's dictionary,
   not from some other table. A line that looked in the wrong place hasn't
   checked its fact: treat that fact as **not checked**, or check it by hand.

If the page won't open, or asks for a role you don't have, check the five
facts by hand instead, using
[How to look things up on your instance](#how-to-look-things-up-on-your-instance).

**🤖 Claude** (`~/projects/priority-guard`): type this, then paste the
output lines underneath it in the same message (press **Shift+Enter** for a
new line), and send:
```
Here is the raw output of the script on my instance. Mark each fact
confirmed, contradicted, couldn't check, or production only (the fact comes
from inputs/TECH-NOTES.md), from this output only.
```
**No URLs and no instance names**: delete any from the output before you
send it. These results end up in the LLD, which goes into the code repo.

Read Claude's marks against the output lines yourself. The output is the
evidence; Claude's marks are only a summary of it.

- If a fact comes from the technical notes (the customer's production) and
  your instance doesn't have it, tell Claude, for example:
  `Fact 3: production only, not on dev.` It still matters to the design. You
  just can't test it here.
- Some facts can't be confirmed before the app exists, such as when your own
  logic will run, or what cross-scope access it will need. **Couldn't check**
  is a valid result for those. The LLD carries them as risks.
- If you check a fact by hand, tell Claude what you saw in words, for
  example: `Fact 3: contradicted. My instance shows <what you saw>.`
- Any fact that wasn't in the script, and that you didn't check by hand, is
  **not checked**. Tell Claude so.

✅ **Check:** every one of the five facts has a result: confirmed,
contradicted, production only, or couldn't check. Every other fact has a
result too, or is marked **not checked**.

> **Faster ways, if your instructor has set them up:** a read-only MCP server
> connected to the instance, or the Claude browser extension reading the
> instance pages. The rule doesn't change: the evidence is the **raw result**
> you read yourself, not Claude's summary. The workshop bench has no MCP
> servers (Module 0 Step 6), so by default use the background script.

### Step 5 — Draft the LLD

**Why this step:** The LLD, the detailed design, turns the PRD and your
checked facts into a plan for the code. Asking for a summary first lets you
catch a wrong turn before it is written into a file.

**🤖 Claude** (`~/projects/priority-guard`): type:
```
Draft docs/LLD-PriorityGuard.md from docs/LLD-TEMPLATE.md, using the PRD,
CONSULT.md and the research results I gave you. Every component cites a PRD
capability. Fill the research log in section 7 with every fact and my
result for it, exactly as I reported it. Anything not decided goes in section
8, Open decisions. Never invent a business decision. Show me a summary first.
Don't write the file yet.
```
Read the summary. If it's right, type `Looks right. Write the file.` and let it write it (if it
asks to create `docs/LLD-PriorityGuard.md`, choose **1. Yes**).

✅ **Check:** `docs/LLD-PriorityGuard.md` exists, with all nine sections.

### Step 6 — A quick review of the LLD

**Why this step:** Claude wrote the draft, so a person has to read it with
fresh eyes, and that person is you. A gap found here takes minutes to fix.
The same gap found later, in the code, takes much longer.

**🤖 Claude:** type `/exit` to quit Claude. **✏️ Editor:** open the LLD in a text editor and check three things:

1. **§1 traceability:** every PRD capability is either built, or deferred
   with a reason.
2. **§7 research log:** matches what the script showed in Step 4 (and
   anything you checked by hand), including the contradicted and
   production-only facts.
3. **No `<…>` placeholders** are left anywhere.

Fix anything wrong **by hand** (**✏️ Editor**), or start Claude again
(**⌨️ You**: `claude` in `~/projects/priority-guard`) and ask it to fix one
named section (**🤖 Claude**).

✅ **Check:** all three are true. Write in `LOG.md` what you had to fix.

#### ⏭ **After the workshop:** the full review

Go through the LLD again with all six checks:

1. **§1 traceability:** every PRD capability is either built, or deferred
   with a reason. Capability 6 matches what your consult decided.
2. **§3 logic:** the floor is **plain code**, and §3 says **when** it runs,
   backed by the research log. A good "when" answer reads something like:
   *a before business rule on incident, on insert and update.*
3. **§4 security:** who can edit the critical services list, who can override,
   how approval works for Tier 1 services (from your accepted PRD), and the
   cross-scope access the app needs. If your PRD has nothing to answer a
   line, check the PRD against the inputs again
   ([Module 1 Step 4](MODULE-1-prd.md#step-4--check-the-evidence-yourself))
   before you invent an answer.
4. **§5 failure modes:** at least one for the floor, and one for the override.
5. **§6 test plan:** includes checks **as an ordinary agent**, on the instance.
6. **§7 research log:** matches what you actually found in Step 4, including
   the contradicted and production-only facts.

**Don't edit the signed LLD.** By now it's signed, and your design record is
built from it. Write down each finding instead:
- **A finding that changes what the app does** (a behaviour): take it to
  [Module 7 Part C](MODULE-7-break-it.md#part-c--if-the-design-has-to-change),
  which amends the signed design.
- **Any other finding** (wording, a missing detail that changes nothing):
  note it in `LOG.md`.

✅ **Check:** you've gone through all six. Every finding is either in
`LOG.md` or on its way to Module 7 Part C.

### Step 7 — Sign the LLD

**Why this step:** Your signature says you have read this design and stand
behind it. Without it, the LLD is only a draft Claude wrote, and the design
challenge in the next module has nothing firm to test.

**✏️ Editor:** in **§9 Sign-off**, fill in all four cells, **by hand**: your name, your role,
today's date (YYYY-MM-DD), and your name again as the signature. You sign as
the designer, so your role is, for example, `developer`. Type between the
bars of the existing empty row `| | | | |`; don't add a row. (The customer
signs only once, in Module 1's PRD acceptance.)

✅ **Check:** the LLD is signed by you, and has no `<…>` placeholders left.
`ls ~/projects/priority-guard/docs` shows `LLD-PriorityGuard.md` and `LLD-TEMPLATE.md`.

### Step 8 — Write your Module 4 positions

**Why this step:** In Module 4 the design challenge asks one question at a
time. Answers made up on the spot can contradict each other. Writing your
positions now, while the LLD you just signed is fresh, keeps your answers
steady, and shows you early where the LLD has nothing to say.

**✏️ Editor:** copy this list into `LOG.md`. The lines marked *fixed* are
already filled in: copy them as they are. **Fill in every other line
yourself, from your signed LLD.** Where the LLD doesn't answer a line, that's
worth knowing before the challenge starts.

- **Feature name** *(fixed)*: `PriorityGuard` (letters only; it becomes a
  file name).
- **Your design in your own words:** three or four sentences, from LLD
  §1–§3. What gets built, which tables it uses, and which code owns each write.
- **The central rule:** write it as **separate short sentences**, one idea
  each. For example: "Only plain code sets the priority floor." "The floor
  can raise a priority, never lower it." "Only an override can go below the
  floor."
- **When the floor runs, and what it must survive:** ______ (copy it from
  LLD §3 and §7 in your own words).
- **Who can change the critical services list:** ______
- **Who can override, and what an override must record:** ______
- **Can an override be edited or deleted afterwards?** ______
- **How approval works for Tier 1 services:** ______ (PRD capability 4, LLD §3–§4).
  If your PRD has nothing to answer a line, check the PRD against the inputs
  again ([Module 1 Step 4](MODULE-1-prd.md#step-4--check-the-evidence-yourself))
  before you invent an answer.
- **What happens to capability 6 (smart urgency):** ______ (from your consult,
  and the customer's decision if the consult asked for one)
- **What the app must never do** *(fixed, add to it from your LLD if you
  like)*: it never changes the priority matrix, and never touches SLA
  definitions. ______
- **Who can see the weekly count:** ______
- **Demo data:** which seed records show the app working: ______. Start
  from the test plan in your LLD §6. For example: two or three critical
  services, each with a floor, and an incident below the floor on each.
- **Milestones this feature must pass** *(fixed)*:

  | Milestone | Passes when |
  |---|---|
  | MERGE | Every change reviewed, all checks green |
  | INSTALL | The app installs cleanly on your PDI and a live check passes |
  | DEMO | The floor works live, as an ordinary agent |
  | HANDOFF | Someone else can diagnose a failure from the runbook alone |

✅ **Check:** every line has an answer. The central rule is at least two
separate sentences. Not finished when the module ends? Finish it at the start
of Module 4.

---

## Log it

- Your two predicted facts against what mattered most.
- In `catches.md`, one line for each research claim your instance
  contradicted that changed the LLD, and each real LLD gap you fixed in
  review:
  ```
  3 | research | <the claim, and what your instance showed>
  ```

**Next:** [Module 4](MODULE-4-design.md). The AI challenges the design, you
answer from the positions you just wrote, and you sign the contract.
