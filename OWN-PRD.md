# Your own PRD track — build your own app with the same method

[Lab home](README.md) · [Getting it to production →](PROMOTE.md)

You've done the workshop on Priority Guard, so you know what each module
should feel like. This track runs the **same modules on your own use case**,
and ends with one **slice** of your app, working on your development
instance, graded and handed over.

**Do the workshop first**, including the parts each module marks **⏭ After
the workshop**. One full run with known answers teaches you what a good
result looks like, so you can judge your own results.

---

## 1. How it differs from the workshop

| | Workshop (Priority Guard) | Your own PRD track |
|---|---|---|
| Inputs and PRD | Given to you | Yours |
| Who accepts the PRD and signs the design | Your instructor, as the customer | **The real owner** of the requirements |
| Instance | Your PDI | **A development instance from the customer's own instance family** (section 2) |
| What gets built | A teaching slice | **One slice you choose**, small enough to finish |
| When it ends | When the clock runs out | When the slice is **done** (section 5) |
| Time | One day together, then the after-the-workshop parts | A kick-off half day, then about **two weeks** of sessions, with two check-ins |
| Generative AI in the app | None | **None in the first slice** (section 2) |

---

## 2. Before you start

### Is your use case ready?

**Why this step:** If one of these is missing, you'll get stuck halfway, so check them before you put the work in.

Every row must be **true** before you start, or avoided by the slice you
choose. Settle them at the kick-off, with your instructor and the customer's
platform team.

| Must be true | Why |
|---|---|
| You have the inputs: a use case, notes from the people who asked, technical documents | A one-line request isn't enough to trace a PRD against |
| There's a named **real owner** who will accept the PRD and sign the design | A design you sign alone is a guess |
| **Claude Code is approved for this customer's data**: the plan and its terms allow customer documents to go into it | You'll give it their PRD and technical documents |
| The app repo can live in a **customer-owned GitHub organisation**, and GitHub Issues are allowed | The kit needs GitHub: its plan, milestones and grade use Issues. GitLab or Azure DevOps won't work with it |
| You have a **development instance in the customer's own instance family**, with their scope prefix, and agreement to install there | An app built on a PDI usually can't be promoted into the customer's instances, because its scope prefix belongs to the PDI. PDIs are also reclaimed when idle. Confirm with the platform team |
| You know **how the SDK should sign in** to that instance: a local admin account on dev, or the method the platform team approves | Many customer instances are single sign-on only, and the SDK's basic sign-in may not work |
| The first slice needs **no generative AI at runtime** | The lab teaches only the plain-code path. AI features need patterns this track doesn't cover: the suggestion check, budgets, rate limits, off switches and accuracy testing. Do AI in a later slice, with your instructor |
| Any **integration** in the first slice has a test endpoint and a test credential for the dev instance | See "Integrations" in section 4 |
| The slice can be **tested on demo data** | You'll seed demo records in the app (section 4) |
| You have about **8–15 working sessions** of 1–2 hours over two weeks | Less time means a smaller slice |

### Your own workspace and accounts

**Why this step:** Fresh folders keep the workshop's files out, and a real test user shows the app as its real users will see it.

**Never reuse the workshop's folders.** A second brief in `brief/`, or the
workshop's `CONSULT.md`, would confuse the kit.

1. Choose a short name for your app, for example `access-review`. Then,
   **⌨️ You** (any folder):
   ```
   mkdir -p ~/projects/<app>/brief ~/projects/<app>-notes
   touch ~/projects/<app>-notes/LOG.md ~/projects/<app>-notes/catches.md
   ```
   Wherever a module says `~/projects/priority-guard`, use `~/projects/<app>`. Wherever it
   says `~/projects/priority-guard-notes`, use `~/projects/<app>-notes`.
2. Run Module 0's checks again for **this** instance: the SDK sign-in under a
   new alias (by the platform team's approved method), a clean bench, and
   two browser profiles.
3. **Your ordinary user is your app's real user.** Not `itil`. Create a test
   user with only the roles your real users will have. Your app's own role
   doesn't exist until the first install: assign it to the test user then,
   and write it in your values table.
4. **Demo data replaces Module 0's demo incidents.** Write down now which
   records your slice needs to show it working, and plan to seed them (section
   4).

### Decisions the instructor makes in the workshop

**Why this step:** Nobody will answer these on the spot, so settle them early, before they block you.

In the workshop your instructor answers these on the spot. In this track,
settle them **at the kick-off** and write the answers in `LOG.md`:

| Decision | Where it's used |
|---|---|
| The `now-sdk init` template, and whether it accepts a folder after `git init` | Module 5, steps 1 and 5 |
| Your scope prefix and `<SCOPE>` | Module 5, before you start |
| That the grade's secrets scan runs in auto mode without permission prompts on your machine (Module 0's settings file sets auto mode; Claude Code 2.1.147 or later) | Module 8, step 2. If the scan can't run, it's unverified and the grade is capped at 49 |
| Whether to build the top story when it isn't the one you expected | Module 6, step 2: yes, always |

---

## 3. Your PRD

### Size it

**Why this step:** A PRD that's too big makes each review too long to read properly, and things slip through.

The consult reads the whole PRD. If it has **more than about 12
capabilities**, put **one release or epic** in `brief/`, and list the rest
under **Out of scope** as "later releases". A PRD of 40 capabilities makes a
consult and a design challenge too long to review properly.

### Format it

**Why this step:** The kit expects this layout, so using it lets every module read your PRD.

- **Markdown**, one file. Convert a Word or PDF document first.
- Use the layout of the workshop's `files/PRD-PriorityGuard.md`: Problem,
  Users, Capabilities requested (numbered, each with "Accepted when"),
  Non-functional requirements, Out of scope, Success looks like, **Open
  decisions**, **Acceptance**.

### Review it (Module 1, on your own inputs)

**Why this step:** Every line should trace back to something the customer said, so you don't build guesses.

Put your inputs and your PRD in a review folder and run Module 1's steps,
with this trace prompt (**🤖 Claude**, in the review folder):
```
Trace <your PRD file> against the input files here. For every capability
and requirement in the PRD, quote the input sentence that supports it, or
say "no source". Then list every input statement that changes what gets
built but isn't in the PRD. Quote, don't paraphrase. Don't fix anything,
and don't edit any file.
```
- There's **no answer card**. Open decisions go to the real owner, and you
  wait for their answers. Never answer a business question for them.
- **Acceptance** is the real owner's name, role, date and signature.
- Copy the accepted PRD into `~/projects/<app>/brief/`, as the only file there.

---

## 4. Module by module

The steps, commands and safety rules are the workshop's. This section lists
**every** place a module assumes Priority Guard, and what to do instead.

**Do every part of every module, including the parts marked ⏭ After the
workshop.** Those marks are for the one-day workshop only. The workshop's
timings, the lunch break and "optional" don't apply here: Module 7 is not
optional on your own app.

### Module 2 — Consult

**Why this step:** The consult only helps if you push back with your own rules, not the workshop's.

- Step 2: if it asks about size, give your honest estimate for the PRD in
  `brief/`.
- Step 2's reply about "contradicts capability 2" is Priority Guard's. Use
  your own: if a bullet contradicts a rule your PRD states, type
  for example `Bullet 3 contradicts capability 1. Correct it.`, with your
  own bullet and capability numbers, no brackets.
- Step 4: instead of capabilities 6, 2 and 4, read **every** row marked AI skill
  or agent (its reason), the **ownership** table (one owner per table), every
  **VERIFY** item, and the **readiness** verdict.
- Step 5: for every row marked AI skill or agent, push back:
  `Capability N is marked [AI skill / agent]. Why can't plain code do it? If it can, change it.`

### NEW · After Module 2 — Choose one slice

**Why this step:** A small slice you finish beats a big one you don't, and trying the riskiest part first shows early whether the idea holds.

Most real PRDs are 20 to 40 stories. You'll finish one **slice**: the
thinnest piece a real user can use from start to finish. Everything else is
deferred, not dropped.

1. **🤖 Claude** (`~/projects/<app>`):
   ```
   Read brief/ and CONSULT.md. Propose two or three end-to-end slices. Each
   slice must: let a real user do one complete thing; be about 5 to 8
   stories; use no generative AI; avoid anything the consult marked not
   ready or conditional, or listed under Open decisions; and avoid
   integrations unless the slice can't work without one. For each, list the
   capabilities it covers, what it defers, and the riskiest assumption it
   tests. Don't write any file.
   ```
2. Choose one. Prefer the slice that **tests your riskiest assumption first**,
   not the easiest one. **Keep it small now:** cutting it later is costly
   (section 5).
3. **✏️ Editor:** write `SLICE.md` in `~/projects/<app>`, **by hand**: the capabilities in the slice,
   the ones deferred, the one thing a real user will be able to do, and your
   **live check**, the steps an ordinary user follows to see it work.
4. Get the real owner's OK on what's deferred, in writing.

### Module 3 — Research and LLD

**Why this step:** Keeping the research and the LLD (the detailed design) to the slice means you study only what you'll build.

- Step 1: copy **your** technical documents into `~/projects/<app>/inputs/`, not
  `TECH-NOTES.md`.
- Step 3: in the research prompt, replace "what a scoped app needs to update
  incidents" with **what a scoped app needs to read and write the tables your
  slice uses**. Add `Only the capabilities in SLICE.md.`
- Step 5: add `Only the capabilities in SLICE.md. In section 1, list every
  deferred capability as "not built: deferred in SLICE.md".`
- Step 6's review checks become:
  1. every slice capability is in §1, and every deferred one says so;
  2. §3 says where your logic runs and **when**, backed by the research log;
  3. §4 covers who can do what, and the cross-scope access the app needs;
  4. §5 has a failure mode for each component;
  5. §6 tests your central rule off the instance, and your live check on it;
  6. §7 matches what you found.
- Before the LLD goes into the repo (Module 5 step 9), grep it for the
  customer's name and its instance host names too, not only `service-now`.

**Integrations.** If your slice calls another system:
- Credentials go only into a **connection and credential** record an admin
  sets up by hand on each instance. Never into `src/`, into Claude, or into a
  drill card.
- Keep the outbound call out of your plain-code logic, so that logic still
  tests in seconds without the instance.
- Each instance (dev, test, production) needs its own endpoint and
  credential. Note them for [PROMOTE.md](PROMOTE.md).

### Module 4 — Challenge and sign

**Why this step:** The signed design is the contract for your slice, so the real owner has to agree to every line.

Use this positions list instead of step 1's. Fill every line from your LLD:

- **Feature name:** letters only.
- **Your design in your own words:** three or four sentences from LLD §1–§3,
  and **say what's deferred**: "This record covers SLICE.md; capabilities N
  and M are deferred."
- **The central rule:** the one rule that, if broken, puts a wrong value on a
  real record or skips a control. Written as separate short sentences.
- **When your logic runs, and what it must survive:** LLD §3 and §7.
- **Who can change what:** each table and setting, from LLD §4.
- **What the app must never do:** for example, change global behaviour without
  approval.
- **An off switch:** an admin-controlled setting that turns off the app's
  logic. It's required for production ([PROMOTE.md](PROMOTE.md) §1), so put it
  in the design now, as a term, with a test.
- **Demo data:** which seed records show the slice working.
- **Deferred:** the capabilities in SLICE.md's deferred list.
- **Gates:** MERGE, INSTALL, DEMO, HANDOFF. **DEMO** means the real owner sees
  the slice work, live, as an ordinary user.

When the challenge asks about a **deferred** capability, answer
`Out of scope for this record; deferred in SLICE.md.` Never answer
`Not decided`: that writes an OPEN term, which fails the grade.

**Who signs §9:** the real owner, with their name and role. It's their
contract. You can't sign it for them.

### Module 5 — Fence and plan

**Why this step:** The safety setup doesn't change, only the names, and the repo belongs to the customer from day one.

Unchanged, apart from your names: workspace, feature, `<SCOPE>` and
`<APP_REPO>`. Create the repo in the **customer's GitHub organisation**,
for example `gh repo create <org>/<repo> --private …`. The plan covers only
the slice, because the signed design does.

### Module 6 — The build loop

**Why this step:** The loop is the same; these swaps make each check test your rule, not the workshop's.

- Step 2: take whatever is top, always. The floor-story expectations don't
  apply: expect the bullets to match your central rule.
- Step 4: the example test name becomes one from **your** central rule.
- Step 8: use the **Workshop prompt**, with its **Stop when** line changed to
  your slice's key story (the one that wires your logic into the platform),
  or the **Whole app prompt** once that story is merged. In both,
  `docs/DESIGN-PriorityGuard.md` becomes your design record. When you read
  that story's pull request, the bullet questions become: **when** does your
  logic run, what does it write, and does anything in this story let your
  central rule be broken?
- Step 10: run **your live check** from SLICE.md, as your ordinary user.
- Step 12 (marked after the workshop) is how you finish the slice's gates.
- **Seed your demo data** as source in the app (`src/`). The grade checks for
  it. [PROMOTE.md](PROMOTE.md) covers keeping it out of production.

### Module 7 — Break it

**Why this step:** Real users will try things you didn't plan for, so keep looking for holes until a round finds none.

- Step 2: in the reviewer prompt, replace the rule with **your central rule**,
  in one sentence. Keep the rest, including the branch `test/break-floor`,
  which step 3 uses.
- Step 3: do **every** item, not only item 1, and **don't stop after one
  fix.** On real work, repeat with a new reviewer until a round finds
  nothing.
- Part B: a colleague who didn't build it attacks your live app, as your
  ordinary user. Their goal: break your central rule. The attack ideas
  become: change the record after your logic has run, change related
  records, save twice, and edit from the list view.

### Module 8 — Grade and handoff

**Why this step:** The grade and the drill show whether someone else could look after your app, which is what the customer needs.

The order changes. See section 5: grade at **DEMO**, hand off, then grade
again at **HANDOFF**.
- Step 9.2: re-run **your** live check.
- The drill needs a colleague who plants a failure realistic **for your app**,
  while you're out of the room (step 7's option A). The drill card is
  written at `~/projects/<app>/drill-card.md`.
- Step 7's symptom example names your own app's records, not an incident.

### Module 9 — What the process caught

**Why this step:** Writing down what isn't built stops anyone thinking the app is more ready than it is.

Step 3's "not built" list is your SLICE.md deferred list, plus anything the
grade or verdict left open. Add one line: what you'll build next.

---

## 5. Finishing the slice

### The gates, in order

**Why this step:** The open-story count shows where you really are, so nobody has to guess.

The plan files one milestone per gate: **MERGE → INSTALL → DEMO → HANDOFF**.
The next gate is the one `BACKLOG.md` names at the top. Count what stands in
its way, swapping in its name. **🔍 Check:**
```
Run exactly this and show me the raw output, unedited: gh issue list --state open --label "gate:<next gate>" --limit 5000 --json labels --jq '[.[] | select(all(.labels[]; .name != "register"))] | length'
```
Keep running the build loop, one story at a time, until it's zero. Then
move to the next gate. Nothing closes milestones for you. **The count is the
truth.**

### Evidence the grade needs

**Why this step:** The grade credits only what it can see proof of, so leave the proof where it looks.

- **DEMO** counts only if the DEMO story is **closed with a comment** that
  records who saw what, live, as which user, and when.
- **Demo data** must be seeded as source in `src/`.
- **Every design term** must be named by a test (`C<n>: …`), including the off
  switch.

### The order to finish

**Why this step:** Grading before the handoff finds problems while they're still cheap to fix.

1. Close every gate up to and including **DEMO**.
2. **Grade at DEMO, for real.** That's Module 8 Part A, with the
   `/permissions` you settled at the kick-off. It isn't a preview, because
   the milestone is reached.
3. The grade files its findings as stories. Some may re-open an earlier
   gate. **Work them until every gate up to DEMO is back to zero.**
4. **Hand off:** Module 8 Parts B and C, including the drill and the verdict.
5. **Grade again at HANDOFF.** That's the grade [PROMOTE.md](PROMOTE.md) asks
   for.

### Done means

**Why this step:** A clear finish line stops the slice dragging on, or being called done too soon.

- [ ] Every gate's count is zero: `BACKLOG.md` names no next gate.
- [ ] The app is installed on your development instance, and your live check
      passes as your ordinary user.
- [ ] The DEMO story is closed with the owner's live sign-off recorded.
- [ ] A real grade at HANDOFF, not a preview.
- [ ] `HANDOFF.md` has a verdict.

### Check-ins with your instructor

**Why this step:** A second pair of eyes spots a stuck slice before a week is lost.

| When | Bring | The question |
|---|---|---|
| End of week 1 | `SLICE.md`, the board, your catch list | Is the count going down? If it's flat for a week, stop filing and start closing. |
| End of week 2 | Both grades, `HANDOFF.md` | Is it done? What's next: the next slice, or [production](PROMOTE.md)? |

### If the slice won't finish

**Why this step:** Cutting the wrong way loses work or lowers the grade; this way keeps everything on record.

**Cut stories, not terms.** In the next `/prove-it:build-plan` preview, mark
each cut story as **register**, keeping its existing key. That takes it off
the gates without losing it.

Avoid withdrawing a design term. The kit never deletes terms: a withdrawn
term stays in the record, and as far as the kit's documents say, it still
needs a test. Without one, the grade is capped at 74. That's why the slice
should be small from the start.

---

## 6. The next slice

**Don't start a new design record.** A second design record in the same
repo changes how tests must be named, which can stop slice 1's tests
counting, and its plan keys need a different prefix. Instead:

1. **Save the first consult** (`CONSULT.md` → `CONSULT-slice1.md` in the
   workspace) before running anything that rewrites it.
2. Add an **LLD addendum** for the new slice: research and the same LLD
   sections, for the new capabilities only.
3. Extend the **same** design, **🤖 Claude:**
   ```
   /prove-it:design-challenge amend docs/DESIGN-<Feature>.md
   ```
   The new terms continue the numbering, and the real owner signs the new
   drift rows.
4. Re-run the build plan for the new stories, then the build loop.
5. Go back to Module 1 only if the **PRD** changes.

---

## 7. Prompts to edit

| Module and step | Priority Guard's wording | Yours |
|---|---|---|
| 2, step 2 | "Bullet 3 contradicts capability 2" | The capability your rule comes from |
| 2, step 5 | "Capability 2 says an incident on a critical service…" | Your push-back on every AI or agent row |
| 3, step 3 | "what a scoped app needs to update incidents" | The tables your slice reads and writes |
| 4, step 1 | the whole positions list | Section 4's list above |
| 6, step 4 | `C<n>: the floor can raise a priority, never lower it` | An example from your central rule |
| 6, step 10 | Create an incident at impact 3, urgency 3… | Your live check from SLICE.md |
| 7, step 2 | "an incident on a critical service can never be saved below that service's floor" | Your central rule, in one sentence |
| Every module | `priority-guard`, `PriorityGuard`, `PRD-`, `LLD-`, `DESIGN-PriorityGuard.md`, `docs/amend-floor` | Your app's names |

If a prompt or a check mentions incidents, critical services, the floor,
priority, Tier 1 or the CAB, it's Priority Guard's, not yours. Rewrite that
part, and nothing else.
