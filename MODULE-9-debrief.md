# Module 9 — What the process caught

*⏱ 15 min · 15:55*

Count your catches from your notes, not memory, and decide what to take home.

### 1. Count your catches

⌨️ **Terminal**, in your window:
```
grep -c '|' ~/projects/priority-guard-notes/catches.md
grep '|' ~/projects/priority-guard-notes/catches.md | cut -d'|' -f2 | tr -d ' ' | sort | uniq -c
```
✅ Your total, then a count per kind, such as `3 design`.

### 2. Add yours to the room's board

Add your counts to your instructor's columns. Then ask together:
1. **Which column is biggest?** There the process paid for itself.
2. **Which came before any code?** `prd`, `consult`, `research`, `design`:
   the cheapest.
3. **Which came from an inspection?** `review` and `grade` today, `partner`
   and `drill` later. Your own tests had passed first.

### 3. Write down what's real

✏️ **Editor:** in `LOG.md`, write three short lists:
- **Real:** what you saw work live, as `agent.demo`.
- **Staged:** what ran only on demo data, or only in tests.
- **Not built:** capability 6, the override (4), the weekly count (5), what
  your grade left open, the runbook, the drill and the verdict.

### 4. Take it home

✏️ **Editor:** in `LOG.md`, write one sentence each: the next real work
you'll build this way, the one stage you'd keep, and the building block
you're missing at work. Short of time? Do it at home.

## The three things to remember

1. **The AI is the crew, not the inspector.** People and checks decide.
2. **A check only counts if it could have failed.**
3. **Everything is written down.** Someone else could pick your app up.

## After the lab: put your machine back

Used a separate user account? Skip this part.

### 5. Put your settings back

⌨️ **Terminal**, with every Claude window closed (`/exit`):
```
git -C ~/projects/agentic-build-lab-guide pull
node ~/projects/agentic-build-lab-guide/files/merge-claude-settings.mjs --restore
node ~/projects/agentic-build-lab-guide/files/merge-claude-settings.mjs --check
```
✅ The last command says `Lab settings NOT in place:`. That's what you want.

### 6. Switch back on what Module 0 switched off

⌨️ **Terminal:** only what `LOG.md` lists:
- `mv ~/.claude/CLAUDE.md.off ~/.claude/CLAUDE.md`
- `claude plugin enable <name>`, for each plugin
- MCP servers: as `~/projects/priority-guard-notes/mcp-before-lab.txt` shows

### 7. Remove the kit and the SDK login

⌨️ **Terminal**, only if you're done with the lab for good:
```
claude plugin uninstall prove-it@prove-it
claude plugin marketplace remove prove-it
now-sdk auth --delete lab-pdi
```

## You now have

- Your catches counted, your notes in `LOG.md`, your machine as before.
- Coming back for [After the workshop](AFTER-THE-WORKSHOP.md)? First run
  `node ~/projects/agentic-build-lab-guide/files/merge-claude-settings.mjs`.
