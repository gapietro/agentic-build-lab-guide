# LLD — <Feature name>

*Low-level design. Written after the consult and the platform research,
before the design challenge. Every choice traces to a PRD capability, and
every platform fact it relies on is in the research log (§7).*

## 1. Scope and traceability

| PRD capability | Built here? | Where in this LLD | If not built: why, and when |
|---|---|---|---|

## 2. Components

The scoped application, its tables and fields, and which component **owns**
each write.

| Component | Type (table, rule, script, role, ACL, report…) | Purpose | Owns writes to |
|---|---|---|---|

## 3. Logic

For each piece of logic: what it does, whether it is **plain code**, where it
runs, **when** it runs, and what else on the platform runs at the same point.

## 4. Security

Roles, access controls (ACLs), who can do what, and any cross-scope access
the app needs. Test as an ordinary user, not an admin.

## 5. Failure modes

What happens when each component fails, is switched off, or meets data it
doesn't expect.

| Failure | What the user sees | What the app does | How it's detected |
|---|---|---|---|

## 6. Test plan

- **Off the instance:** the plain-code logic, in fast unit tests. Each test's
  name starts with the design term it proves.
- **On the instance:** what only the platform can prove, done as an
  **ordinary agent**.

## 7. Research log

Every platform fact this design relies on.

| # | Fact | Source (research, tech notes, instance) | Checked on your instance? | Result |
|---|---|---|---|---|

## 8. Open decisions

Anything this LLD can't decide. Never guess a business decision.

## 9. Sign-off

| Name | Role | Date | Signature |
|---|---|---|---|
| | | | |
