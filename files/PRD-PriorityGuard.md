# PRD — Priority Guard

*Draft 1, prepared by the platform team from the use case and the discovery
workshop. For review and acceptance.*

## 1. Problem

Incidents on business-critical services are often logged at low priority,
because callers pick a low impact or urgency. Some are later lowered on
purpose, to take pressure off a queue. A critical service can be down while
its incident sits at P4.

## 2. Users

- **Service desk agent:** logs and works incidents.
- **Incident manager:** owns the incident process and its exceptions.
- **Service owner:** knows which services the business can't run without.

## 3. Capabilities requested

1. **Critical services list.** Service owners mark their services as
   critical, each with a minimum priority (the **floor**).
   *Accepted when:* a service owner can add, change and remove entries for
   their own services, and nobody else's.
2. **Priority floor.** An incident on a critical service can never be saved
   below that service's floor. Raising the priority is always allowed.
   *Accepted when:* saving any incident on a critical service below its floor
   results in the floor, whatever the impact and urgency.
3. **Explain.** When the floor raises an incident's priority, a work note
   says what was raised, from what, and why.
   *Accepted when:* every raise has a work note in the form "Priority raised
   from P4 to P2: Payroll is a critical service."
4. **Override.** An incident manager can set an incident below its floor,
   with a mandatory reason. The override is recorded and can't be edited
   afterwards.
   *Accepted when:* an override without a reason is refused, and every
   override is listed with who, when and why.
5. **Weekly count.** How many incidents the floor raised, and how many
   overrides there were, per week.
6. **Smart urgency.** Use AI to judge how urgent an incident really is from
   its description, and adjust the priority to match.
7. **Problem records.** The floor also applies to problem records on critical
   services.

## 4. Non-functional requirements

- The floor adds no noticeable delay when an agent saves an incident.
- Every override is recorded and can't be changed afterwards.

## 5. Out of scope

- The impact × urgency priority matrix, and SLA definitions.
- The incident form's layout.
- Real data. Everything is built and tested on a developer instance with
  demo data.

## 6. Success looks like

- No incident on a critical service sits below its floor without a recorded
  override.
- Every automatic raise explains itself.
- The weekly count is available every Monday.

## 7. Open decisions

- None.

## 8. Acceptance

| Name | Role | Date | Signature |
|---|---|---|---|
| | | | |
