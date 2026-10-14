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

### 3. Decide each gap, with Claude

🤖 **Claude:**
```
Walk me through each "no source" and each statement left out, one at a
time: quote the PRD line and the closest input sentence, say the gap in
plain words, and recommend keep it, take it out, put it back in a
capability, or list it under 7. Open decisions. Never add a capability or
pick a side where the inputs disagree. Wait for my answer each time. Then
list the changes; edit PRD-PriorityGuard.md only after I say go.
```
For each gap, check the two quotes, then reply `yes`, or what to do
instead. Not sure? Ask `Why?`

Short on time? 🤖 **Claude:**
```
Do the rest as you recommend, but stop on any take out or open decision.
```

✅ Claude lists the changes. Read the list, then type `go`.

### 4. Log it

🤖 **Claude:**
```
Log this module's catches: real problems the process found, in this
session or this module's pull requests, that got fixed or changed a
decision. One line each, as "1 | <what caught it> | <what, and what was
done>", where what caught it is one of prd, consult, research, design,
guard, test, review, partner, grade, drill. Show me the lines, then append
the ones I confirm or add to ~/projects/priority-guard/catches.md.
```
Confirm a line for each gap you fixed in step 3, such as `1 | prd | The PRD
asked for something no input mentioned; I took it out`.

### 5. Get the customer's acceptance

⌨️ **Terminal**, in your window (**Cmd+N**): get the customer's answers.
```
cp ~/projects/agentic-build-lab-guide/files/CUSTOMER-ANSWERS.md ~/projects/priority-guard-prd-review/
```
🤖 **Claude:**
```
Apply CUSTOMER-ANSWERS.md to PRD-PriorityGuard.md: put each answer into
the capabilities it affects, set 7. Open decisions to "None.", and fill in
8. Acceptance from the file, with today's date. Ask me about any open
decision it doesn't cover. Change nothing else. Then copy the PRD into
~/projects/priority-guard/brief/.
```
Type `/exit`, then ⌨️ **Terminal:** `ls ~/projects/priority-guard/brief`

✅ It prints only `PRD-PriorityGuard.md`.

## You now have

- `~/projects/priority-guard/brief/PRD-PriorityGuard.md`, accepted, and
  this module's catches in `catches.md`.
