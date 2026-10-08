# Getting it to production

[Lab home](README.md) · [← Your own PRD track](OWN-PRD.md)

Everything in this lab runs on a **development instance**, on purpose. The
coding agent never touches test or production, and nothing in the kit does
either. Getting a finished app to production goes through **the customer's
own change process**, run by the people who own those instances.

This page is a **checklist** for that step, not a set of commands. How apps
move between instances (an application repository, source control, or
something else) is the customer's platform team's decision, and it differs
from customer to customer. Several platform behaviours below are marked
**confirm with your platform team**: they're likely, but check them on their
instances before you rely on them.

---

## 1. The bar before you ask

**None of these can be waived.**

- [ ] **The slice is done**, as [OWN-PRD.md](OWN-PRD.md) section 5 defines it:
      every gate's count is zero, and `BACKLOG.md` names no next gate.
- [ ] **A real grade at HANDOFF, not a preview, in the "ready with named fixes"
      band (75) or above.**
- [ ] **No cap on that grade from build, tests or the secrets scan, from a
      missing signature, or from an unbounded AI feature.**
- [ ] **`HANDOFF.md` says READY.** NOT READY means someone else couldn't run the
      app from the runbook. That's not something to accept on paper.
- [ ] **The real owner has seen it work live** as an ordinary user. The DEMO
      story is closed with that recorded.
- [ ] **The app has an off switch**: an admin-controlled setting, in the design
      as a term, with a test, that turns off the app's logic. And the
      runbook's **Recovery** section names it. Plain-code logic is live the
      moment it's installed. Without a switch, the only way to stop it is to
      back the whole app out.

**What can be accepted:** a test-coverage gap or a runbook gap the grade
named, if the real owner accepts it in writing. Record it in
`docs/PROMOTION.md` (section 2), with who accepted it, when, and the date it
will be closed.

---

## 2. Agree how it moves

Meet the customer's platform team **before** you raise anything, and write
their answers in the repo, in `docs/PROMOTION.md` (admit it with an allow
line, as you did for `docs/`):

1. **The delivery mechanism.** How a scoped app moves from development to
   test to production at this customer. Ask them, don't assume.
2. **Who installs.** On test and production it's **their** team. Never the
   coding agent, and ideally not the builder either.
3. **Global and shared changes.** Anything the app changes outside its own
   scope: shared tables, global rules. These are in your LLD §2–§3, and
   usually need their own approval.
4. **Cross-scope access.** On a development instance the platform may record
   cross-scope access for you as the app runs. On test and production it may
   not. Logic that worked on dev then fails. Confirm with your platform team,
   and make sure every cross-scope privilege the app needs is **declared in
   source** (your LLD §4 lists them).
5. **Demo data stays out of production.** Your seed records are part of the
   app's source, so they'd install everywhere. Agree how they're excluded
   from the production install, and confirm it works on test.
6. **Per-instance configuration.** Role-to-group assignments, setting values,
   and any integration's endpoint and credential are different on each
   instance. They're set by an admin, by hand, from the runbook's
   configuration steps. List them.
7. **Back-out.** How to remove the app if switching it off isn't enough, and
   what that costs. Uninstalling a scoped app may delete its tables and the
   data in them, such as override records or audit rows. Confirm with your
   platform team. Write the agreed back-out in `docs/PROMOTION.md`.
8. **The version.** Bump the app's version in `now.config.json`, merge it,
   then tag **that** commit, so test and production get exactly what was
   graded:
   ```
   git tag -a v1.0.0 -m "Slice 1: <what a user can now do>"
   git push origin v1.0.0
   ```
   If anything changes after the HANDOFF grade (runbook fixes, the version
   bump), **grade again at the tagged commit**.

---

## 3. Test, with the runbook only

1. **The platform team installs the tagged version on test**, following
   `RUNBOOK.md` and nothing else, then does the per-instance configuration
   (section 2, item 6). If they need to ask you anything, that's a gap in the
   runbook: fix it through the build loop, re-tag, and start this step again.
2. **First contact with real data.** Test usually holds copies of real
   records. Re-run your live check, and the access checks, **as ordinary
   users**. Check the cross-scope access works here. Anything that fails goes
   back through the build loop on development. Never a fix on test.
3. **Rehearse Recovery on test.** Switch the app off with its off switch, and
   check it really stops. Then switch it back on. If the platform team allows
   it, rehearse the agreed back-out too. The handoff drill tested
   diagnosis, not recovery, so this is new evidence.
4. **Re-run the handoff drill on test**, if the platform team allows a planted
   failure there.

✅ **Check:** every result is in `docs/PROMOTION.md`, with dates and who ran
it. Nothing was fixed on test by hand.

---

## 4. The change request

Raise it through the customer's change process. Attach the evidence. Don't
summarise it:

| Evidence | From |
|---|---|
| What changes, and what doesn't | The signed design record, and LLD §1 |
| How well it's built | `GRADE.md`, graded at the tagged commit |
| Whether someone else can run it | `HANDOFF.md` and `RUNBOOK.md` |
| What was tested on test, and by whom | `docs/PROMOTION.md` |
| How to switch it off, and how to back it out | The runbook's **Recovery** section, and the back-out in `docs/PROMOTION.md`, rehearsed on test |
| Anything accepted rather than fixed | `docs/PROMOTION.md`, with the owner's written acceptance |

**Say what isn't done.** List the deferred capabilities from `SLICE.md` in
the change request itself. Approvers should never discover a gap after
go-live.

---

## 5. Production

1. **Their team installs the same tag** from the runbook, without the demo
   data, then does the per-instance configuration.
2. **The off switch starts off.** The app is installed, but its logic doesn't
   run yet.
3. **The owner switches it on**, at an agreed time, with you available.
4. **Watch the first day.** Use the checks the runbook gives an on-call
   person: the platform's own screens, and the app's own lists and logs.
5. **If it misbehaves:** switch it off first, then diagnose, from the runbook.
   Back out only if switching it off isn't enough, and only as agreed in
   `docs/PROMOTION.md`.

✅ **Done when:** it's on in production, the first day's checks are clean and
written down, and the owner has signed off in the change request.

---

## 6. After go-live

- **The next slice** extends the same design: see [OWN-PRD.md](OWN-PRD.md)
  section 6. It goes back through the design challenge before any code.
- **Anything found in production** becomes a story on the board, built
  through the loop on development, then promoted with this page again.
  Never a hand fix in production.
