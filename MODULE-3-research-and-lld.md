# Module 3 — Research, then the LLD

*Day 1 · about 4 hours, including lunch · between the consult and the design challenge*

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

- [ ] `~/projects/priority-guard` holds `brief/PRD-PriorityGuard.md` and `CONSULT.md`.
- [ ] Your **admin** browser profile is logged in to your PDI.

### Where each step happens

This module uses one terminal window: you start Claude in it in step 3, and
quit it in step 6. Every action is labelled with **where** you do it:

| Label | What it is | Folder |
|---|---|---|
| **⌨️ You** | You type it yourself, in a normal terminal: `mkdir`, `cp`, `cd` and `ls` (never in Claude), and `claude` to start Claude | Any (step 1 uses full paths) |
| **🤖 Claude** | Claude Code, started with `claude`. Type prompts here, never shell commands, or `/exit` to quit Claude. Claude runs any commands | `~/projects/priority-guard` |
| **✏️ Editor** | Your text editor, for `LOG.md` and changes you make **by hand** | — |
| **🌐 Browser** | Your **admin** browser profile, for checks on the instance | — |

If a block doesn't start with a label, it belongs to the label just above it.

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
how sure you are and exactly how I can check it on my instance, using
read-only screens only: list views, record forms, the dictionary, a table's
application access. No scripts. Don't design anything yet, and don't write
any file.
```

✅ **Check:** a numbered list of facts, each with a confidence level and a
way to check it on your instance.

### Step 4 — Check the facts on your instance

**Why this step:** Claude can sound sure and still be wrong. Looking on your
own instance turns each claim into something you have seen for yourself,
before you build anything on it.

**🌐 Browser:** go through the list, in your **admin** browser profile. Check **at least the
five facts the design depends on most**, and mark the rest **not checked**.
For each fact:
1. Do the check Claude described, or a better one if you know one.
2. **✏️ Editor:** write the result in your log: **confirmed**, **contradicted** (what you
   saw instead), or **couldn't check**.
3. If a fact comes from the technical notes (the customer's production) and
   your instance doesn't have it, write **"production only, not on dev"**.
   It still matters to the design. You just can't test it here.

Some facts can't be confirmed before the app exists, such as when your own
logic will run, or what cross-scope access it will need. **Couldn't check**
is a valid result for those. Say so, and the LLD carries them as risks.

**🤖 Claude** (`~/projects/priority-guard`): tell Claude what you found, one line per fact, for example:
`Fact 3: contradicted. My instance shows <what you saw>.`
Describe what you saw in words. **No URLs and no instance names**: these
results end up in the LLD, which goes into the code repo.

✅ **Check:** every fact has a result: confirmed, contradicted, production
only, couldn't check, or not checked.

> **In a real project** you'd usually run these checks through a read-only
> MCP server connected to the instance, instead of clicking through screens.
> The rule doesn't change: the evidence is the **raw query result**, which you
> read yourself, not Claude's summary of it. If Claude makes a claim and then
> "checks" it for you, it's still a claim. This lab does the checks by hand
> because the bench has no MCP servers (Module 0 step 6), and so you see what
> each fact looks like on the platform.

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
Read the summary. If it's right, say so and let it write the file (if it
asks to create `docs/LLD-PriorityGuard.md`, choose **1. Yes**).

✅ **Check:** `docs/LLD-PriorityGuard.md` exists, with all nine sections.

### Step 6 — Review the LLD like a reviewer

**Why this step:** Claude wrote the draft, so a person has to read it with
fresh eyes, and that person is you. A gap found here takes minutes to fix.
The same gap found later, in the code, takes much longer.

**🤖 Claude:** type `/exit` to quit Claude. **✏️ Editor:** open the LLD in a text editor and check:

1. **§1 traceability:** every PRD capability is either built, or deferred
   with a reason. Capability 6 matches what your consult decided.
2. **§3 logic:** the floor is **plain code**, and §3 says **when** it runs,
   backed by the research log.
3. **§4 security:** who can edit the critical services list, who can override,
   how approval works for Tier 1 services (from your accepted PRD), and the
   cross-scope access the app needs.
4. **§5 failure modes:** at least one for the floor, and one for the override.
5. **§6 test plan:** includes checks **as an ordinary agent**, on the instance.
6. **§7 research log:** matches what you actually found in step 4, including
   the contradicted and production-only facts.

Fix anything wrong **by hand** (**✏️ Editor**), or start Claude again
(**⌨️ You**: `claude` in `~/projects/priority-guard`) and ask it to fix one
named section (**🤖 Claude**).

✅ **Check:** all six are true. Write in `LOG.md` what you had to fix.

### Step 7 — Sign the LLD

**Why this step:** Your signature says you have read this design and stand
behind it. Without it, the LLD is only a draft Claude wrote, and the design
challenge in the next module has nothing firm to test.

**✏️ Editor:** in **§9 Sign-off**, fill in all four cells, **by hand**: your name, your role,
today's date (YYYY-MM-DD), and your name again as the signature.

✅ **Check:** the LLD is signed by you, and has no `<…>` placeholders left.
`ls ~/projects/priority-guard/docs` shows `LLD-PriorityGuard.md` and `LLD-TEMPLATE.md`.

---

## Log it

- Your two predicted facts against what mattered most.
- In `catches.md`, one line for each research claim your instance
  contradicted that changed the LLD, and each real LLD gap you fixed in
  review:
  ```
  3 | research | <the claim, and what your instance showed>
  ```

**Next:** [Module 4](MODULE-4-design.md). The AI challenges the design, and you
sign the contract.
