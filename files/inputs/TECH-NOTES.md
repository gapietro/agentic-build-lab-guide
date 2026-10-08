# Technical notes: the customer's incident setup

*From the platform team's wiki. These describe the customer's **production**
instance. Your developer instance stands in for it. It won't match every
detail, so any fact the design depends on has to be checked on your own
instance.*

- **Priority** on incidents is worked out from **impact** and **urgency**. The
  customer changed the standard impact × urgency matrix last year. The team
  calls this "the priority lookup".
- Incidents point to the affected service in the **Service** field
  (business service).
- There's an existing global business rule, **"Raise VIP caller priority"**, that
  sets priority to P2 when the caller is marked VIP. It was written years ago
  and nobody is sure exactly when it runs.
- Service desk agents have the standard `itil` role. Incident managers are a
  **group**, not a role. Service owners are named on each business service
  record.
- Critical services are tracked today in a spreadsheet. There's no table for
  them on the instance.
- New work is built as **scoped applications**. The platform team's standard
  is: no changes to global business rules, and no changes to the incident
  form's layout without the service desk lead's sign-off.
