# Module 1 — From inputs to a PRD

*⏱ 30 min · 09:00*

You review a PRD drafted from two inputs, and the customer accepts it.
**The catch:** is everything in the PRD backed by an input, and everything
important in the inputs in the PRD?

### 1. Read the inputs yourself, then 🔮 guess

✏️ **Editor:** read `agentic-build-lab-guide/files/inputs/USE-CASE.md` and
`WORKSHOP-NOTES.md`. Before you open the PRD, guess what it needs.

### 2. Have Claude trace the PRD

⌨️ **Terminal:** start Claude in a review folder. Pick **Yes** to trust it.
```
mkdir -p ~/projects/priority-guard-prd-review
cd ~/projects/agentic-build-lab-guide/files
cp inputs/USE-CASE.md inputs/WORKSHOP-NOTES.md PRD-PriorityGuard.md ~/projects/priority-guard-prd-review/
cd ~/projects/priority-guard-prd-review && claude
```
🤖 **Claude:**
```
Trace PRD-PriorityGuard.md against the two input files here. For every
capability and requirement in the PRD, quote the input sentence that
supports it, or say "no source". Then list every input statement that
changes what gets built but isn't in the PRD. Quote, don't paraphrase.
Don't edit any file.
```

### 3. Check the evidence yourself

✏️ **Editor:** find the quoted sentence for **two** supported items, and
check every **"no source"** and every statement **left out** yourself.

### 4. Decide each gap, and edit by hand

For each real gap:
- **No input asked for it:** take it out.
- **An input asked, the PRD dropped it:** put it back in its capability.
  Never add a capability number.
- **The inputs disagree, or leave who or how undecided:** list it under
  **7. Open decisions**. Never pick a side.

✏️ **Editor:** edit `priority-guard-prd-review/PRD-PriorityGuard.md`.

### 5. Log it

🤖 **Claude:**
```
Log this module's catches: real problems the process found, in this
session or this module's pull requests, that got fixed or changed a
decision. One line each, as "1 | <what caught it> | <what, and what was
done>", where what caught it is one of prd, consult, research, design,
guard, test, review, partner, grade, drill. Show me the lines, then append
the ones I confirm or add to ~/projects/priority-guard/catches.md.
```
Confirm a line for each gap you fixed in step 4, such as `1 | prd | The PRD
asked for something no input mentioned; I took it out`. Then type `/exit`.

### 6. Get the customer's acceptance

At about **09:25** your instructor, as the customer, answers the room's open
decisions once. Not ready then? Ask for the answers when you get here.

✏️ **Editor:** put each answer in the capability it affects, and set
**7. Open decisions** to `None.` Fill in **8. Acceptance**: the customer's
name and role as given, today's date, and the name again as signature.

⌨️ **Terminal:**
```
cp ~/projects/priority-guard-prd-review/PRD-PriorityGuard.md ~/projects/priority-guard/brief/
ls ~/projects/priority-guard/brief
```
✅ `ls` prints only `PRD-PriorityGuard.md`. In it, **7. Open decisions**
says `None.`, **8. Acceptance** is filled in, and no capability is renumbered.

## You now have

- `~/projects/priority-guard/brief/PRD-PriorityGuard.md`, accepted, and
  this module's catches in `catches.md`.
