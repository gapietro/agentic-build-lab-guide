# Use case: stop critical incidents sitting at low priority

*Submitted by the incident manager to the platform team.*

We keep finding incidents on services the business can't run without, such
as Payroll and Customer Portal, sitting at P4 for hours. Sometimes the
caller picked low impact or urgency. Sometimes an agent lowered it to get it
out of their queue.

What we'd like:
- A list of our critical services, each with the lowest priority its
  incidents should ever have.
- Incidents on those services can't be saved below that priority.
- When the system raises a priority, it says why, on the incident.
- Incident managers can still go lower when there's a good reason, but it
  has to be recorded, and nobody can change that record afterwards.
- A simple weekly number: how often this kicks in.

We'd also like the system to work out how urgent an incident really is from
what the caller wrote, and set the priority to match. People under-report
all the time.
