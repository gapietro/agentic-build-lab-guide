# Discovery workshop: notes (excerpt)

*Attendees: incident manager (IM), Payroll service owner (SO), service desk
lead (SDL), platform team facilitator (F). Notes taken live; lightly edited.*

---

**F:** Who decides which services are critical?

**SO:** Service owners. I know Payroll is critical, and so does the business.
We'd each maintain our own entries.

**IM:** And the minimum priority should be per service. Payroll at P2,
Customer Portal at P2, the intranet maybe P3.

**F:** What happens today when someone lowers a priority?

**SDL:** Honestly, agents drop things to P4 to stop the SLA clock when
they're swamped. It's not malicious. They're drowning.

**IM:** That's exactly what I want stopped. But I still need to be able to
drop one when it's clearly wrong, say someone logged a password reset
against Payroll. I'll always give a reason.

**SO:** For Payroll, and anything Tier 1, I want to approve any drop below
the floor. The incident manager shouldn't be able to do that on their own
for my service.

**IM:** Fine by me for Tier 1, as long as it doesn't hold the incident up.

**F:** And the work note when the system raises a priority?

**SDL:** Yes please, so the agent isn't confused why it changed.
Something like "Priority raised from P4 to P2: Payroll is a critical
service." And it can't slow down saving: my agents save hundreds of
incidents a day. Please don't change the incident form either. My team
knows it blind.

**IM:** The weekly number: how many it raised, how many overrides, on my
desk on Monday morning. That's all I need. I don't need a dashboard.

**SDL:** Could AI read the description, figure out the real urgency, and set
the priority from it? Half our P4s are really P2s.

**F:** We'll look at that.

**IM:** One more thing: we tuned the priority calculation last year. Impact
and urgency work out priority on their own, and we changed the matrix. Don't
touch that.

**F:** Understood. The matrix and the SLA definitions are out of scope. We'll
build and test it on a developer instance with demo data, nothing real.
