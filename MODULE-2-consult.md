# Module 2 — Consult

*⏱ 30 min · 09:30*

Nothing gets built: the consult advises how to build each capability.
**The catch:** capability 2 says the priority never goes below the floor;
capability 6 asks AI to "adjust the priority". Will the consult see the clash?

### 1. 🔮 Guess first

Which capabilities need AI? Anything you'd refuse to build? Keep your guess
in your head: step 5 checks it.

### 2. Start the consult

⌨️ **Terminal:** if asked to trust the folder, pick **Yes**.
```
cd ~/projects/priority-guard && claude
```
🤖 **Claude:** type `/prove-it:consult`, with nothing after it.

✅ It restates the brief in five bullets or fewer, and stops.

<details><summary>🛟 It writes CONSULT.md before you confirm</summary>

The kit broke its rule. Tell your instructor, type `/exit`, run
`rm CONSULT.md` and `claude`, and type `/prove-it:consult` again.
</details>

### 3. Answer in one message

Check each bullet against the PRD. Reply in **one message**, a line each:
type `\` then **Enter** for a new line. Never invent a business fact.

- Only the customer knows: `Unknown. Record it as an open decision.`
- Size: `About 8–10 stories; we build the first few in one afternoon.`
- Now Assist: `No. Assume Now Assist isn't available.`
- Not in the brief: `Bullet <n> isn't in the brief. Drop it.`
- Breaks the floor: `Bullet <n> contradicts capability 2. Correct it.`

When the bullets are right, type `confirmed` alone.

### 4. Let it run

It runs for several minutes, writing only `CONSULT.md`: choose **No** if it
asks to write anything else. Don't run the `/prove-it:design-challenge` it
suggests: research comes first. If that shows as grey text, ignore it:
**Tab** or **Right arrow** would accept it.

⌨️ **Terminal**, in your window (**Cmd+N**), when done:
```
ls -A ~/projects/priority-guard
```
✅ It lists `app`, `brief`, `catches.md` and `CONSULT.md`, and maybe
`.claude`.

<details><summary>🛟 It shows an error, or stalls</summary>

Press **Esc** and type `/prove-it:consult` again. Third failure? Stop and
ask your instructor.
</details>

### 5. Read it like a reviewer

✏️ **Editor:** open `priority-guard/CONSULT.md`. Don't change it.

✅ A row per capability: plain code, Now Assist skill (one AI call) or agent
(AI that plans its steps), with a reason. Then **Cost** and **Readiness**.

Look for capability 6's choice, who owns going below the floor (**Data and
ownership**), and any requirement not **ready**. Compare with your guess.

### 6. Push back if needed, then close

🤖 **Claude:** if the consult let AI change the priority directly, ask:
```
Capability 2 says an incident on a critical service can never be saved
below its floor. If AI adjusts the priority in capability 6, can it lower it
below the floor? If it can, what should change?
```
🤖 If its advice changes, record it, with the new advice as
`<the new decision>`, such as `is deferred`:
```
Update CONSULT.md: capability 6 <the new decision>, with that reason.
```

### 7. Log it

🤖 **Claude:**
```
Log this module's catches: real problems the process found, in this
session or this module's pull requests, that got fixed or changed a
decision. One line each, as "2 | <what caught it> | <what, and what was
done>", where what caught it is one of prd, consult, research, design,
guard, test, review, partner, grade, drill. Show me the lines, then append
the ones I confirm or add to ~/projects/priority-guard/catches.md.
```
Confirm a line only if the consult raised it before you pushed back, such
as `2 | consult | capability 6 could lower a priority below the floor`.
Your own answers and corrections aren't catches. Then type `/exit`.

## You now have

- `CONSULT.md` in `~/projects/priority-guard`, and this module's catches in
  `catches.md`.
