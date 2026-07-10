# Site Content — Shivanshu Tiwari Portfolio v2

*Final copy for every page. Written from `realContentData.md` (verified GitHub + LinkedIn data) and the structure locked in `portfolio-v2-build-prompt.md` / `technicalPlan.md`. Ready to implement directly — flag anything you want changed rather than treating this as a first draft to rewrite from scratch.*

---

## 1. Global / Shared

**Nav logo/wordmark:** `Shivanshu Tiwari`

**Canonical bio** (use verbatim everywhere it appears — homepage About, meta descriptions, `llms.txt`, FAQ answers. Do not reword per page, per the GEO requirement):
> I don't just use AI — I build things with it that keep running after I close my laptop. I'm a third-year B.Tech CS & IT student from Bhopal, and I've spent the last year building AI-powered systems — autonomous agents, LLM pipelines, voice intelligence tools, and automation workflows that handle real tasks without human supervision. I'm not interested in demos that look good in a presentation. I build things that work in production and prove it by deploying them. The standard I hold myself to: the system owns the task completely.

**Site tagline (for `<meta>` og:description / general reuse):**
> AI-native backend systems — autonomous agents, LLM pipelines, and production APIs, built by a B.Tech CS & IT student in Bhopal.

---

## 2. Home — `/ai-engineer`

**H1:** I build autonomous AI systems
**Subheading:** Autonomous agents, LLM pipelines, and voice AI that run in production — not local demos.
**Sub-line:** B.Tech CS & IT, SIRT Bhopal · Class of 2027

**Projects shown (in this order):**
1. Agentic Honey-Pot — *"An autonomous LLM agent that runs a live conversational loop against real scammers, extracting UPI IDs and phishing URLs with 85–90% detection accuracy — a production fraud pipeline, not a chatbot demo."*
2. Samvad — *"A real-time voice agent with multi-speaker diarization that classifies meeting segments and extracts action items live, no post-processing required."*
3. AI Email Categorization Agent — *"An LLM-powered agent that semantically classifies and labels Gmail automatically, with persistent memory that cuts repeat API costs by 60%+."*
4. Call Center Compliance API — *"Chains speech-to-text with an LLM SOP-validation pipeline to turn a raw call recording into a structured compliance report — no human review step."*

*(EchoPay intentionally omitted from this lane — it's a DSP/systems project, not an LLM project; its AI-engineer framing note in `realContentData.md` is honest about this rather than stretching it to fit.)*

---

## 3. Home — `/backend-systems`

**H1:** I build AI-native backend systems
**Subheading:** API design, real-time infra, distributed systems *(already implemented per the verification pass — confirmed correct, keeping as-is)*
**Body line:** I design and build backend systems — real-time APIs, distributed infrastructure, and production deployments.
**Sub-line:** B.Tech CS & IT, SIRT Bhopal · Class of 2027

**Projects shown (in this order):**
1. Samvad — *"Full real-time infra: FastAPI + WebSocket for live transcription, Redis for session state, PostgreSQL for persistence, React on the frontend — 99%+ uptime."*
2. Agentic Honey-Pot — *"A Dockerized FastAPI service deployed on Railway with 99%+ uptime and sub-2-second response times, built for real, unattended production traffic."*
3. Call Center Compliance API — *"A serverless FastAPI pipeline on Vercel: POST an audio file, get back structured JSON in seconds, with Hindi and multilingual support built in."*
4. AI Email Categorization Agent — *"A local-first automation service integrating Gmail's OAuth2 API — built to run unattended with zero cloud dependency or data exposure."*
5. EchoPay — *"A custom-built MFSK audio protocol engine written in pure Kotlin from scratch, using the Goertzel algorithm for real-time decoding and HMAC-SHA256 security — a from-scratch systems project, not a wrapper around a library."*

**Note — verification flagged this lane as possibly missing two projects (Compliance API, Email Agent) in the live build.** Cross-check this list against what's actually in `lib/role/config.ts` before treating this as done.

---

## 4. Home — `/` (catch-all, "something else" visitor)

**H1:** I build AI-native backend systems
**Subheading:** Autonomous agents, LLM pipelines, production APIs — no role framing, just the strongest work, ranked.

**Projects shown (ranked, no lane spin — per spec, lead with the two that cross-demonstrate the most):**
1. **Agentic Honey-Pot** — *"An autonomous AI agent that poses as a potential scam victim, engages real scammers in live conversation, and extracts intelligence via an agentic loop. 85–90% fraud detection accuracy. Dockerized on Railway, 99%+ uptime, sub-2s response."*
2. **Samvad** — *"A real-time voice agent that transcribes meetings live, detects multi-speaker segments, and auto-generates structured intelligence reports with owner-assigned action items. FastAPI, WebSocket, Redis, PostgreSQL, React."*
3. Call Center Compliance API
4. AI Email Categorization Agent
5. EchoPay

---

## 5. About Section (all Home variants)

**Heading:** About
**Body** (canonical bio, see Section 1 above)

## 6. Skills Section (all Home variants)

**Heading:** Skills

**Languages:** Python, JavaScript, TypeScript, Kotlin, SQL
**AI / Automation:** OpenAI API, Google Gemini, LangChain, CrewAI, Sarvam AI
**Backend / DevOps:** FastAPI, Node.js, Docker, Redis, PostgreSQL, Railway, Vercel

*(Spoken languages and the 100%/80%/75% proficiency bars are available in `realContentData.md` but I'd leave both off — proficiency percentages read as filler on a technical portfolio, and spoken languages aren't relevant to this audience. Include only if you disagree.)*

## 7. Experience Section (all Home variants)

**Heading:** Experience

**Blue Planet Infosolutions Pvt. Ltd. — Android Development Intern**
*Aug 2025 – Mar 2026 (8 months)*
Shipped Kotlin/Java features for Android applications while leading a 10-person remote engineering team — UI implementation, API integration, bug fixes, and cross-device testing.

**Edunet Foundation — Front End Web Development Intern**
*Aug 2025 – Oct 2025 (3 months)*

## 8. Certifications Section (all Home variants)

**Heading:** Certifications

- **Python Programming** — AICTE / Robokwik (8-week corporate internship training)
- **Blockchain and its Applications** — IIT Kharagpur / NPTEL Swayam (12 weeks)

---

## 9. FAQ Section (Home — required for GEO per Section 5 of the build spec)

**What does Shivanshu build?**
> Autonomous AI agents and backend systems that run in production without human supervision — scam-detection agents, voice intelligence tools, email automation, and the real-time infrastructure (APIs, databases, WebSocket services) that keeps them running.

**What's his most technically impressive project?**
> Agentic Honey-Pot — an autonomous agent that holds live conversations with real scammers to extract fraud intelligence, running at 85–90% detection accuracy on a Dockerized FastAPI service with 99%+ uptime. It won Finalist at the GUVI India AI Impact Buildathon 2026.

**Is he looking for work?**
> Yes — actively looking for an AI or Software Engineering internship, remote or hybrid.

**What's his tech stack?**
> Python and JavaScript/TypeScript, with hands-on experience in OpenAI, Google Gemini, Sarvam AI, LangChain, CrewAI, FastAPI, Node.js, Docker, Redis, PostgreSQL, and WebSockets.

---

## 10. Blog Index — `/blog`

**H1:** Blog
**Subheading:** Field notes, repo deep-dives, model & tool drops, and article reactions.

*(Category structure and first post — "Hello World — Building in Public" — already live per the screenshots; no changes needed here.)*

---

## 11. Achievements — `/achievements`

**H1:** Achievements
**Subheading:** Hackathon wins, certifications, and challenge results.

**Entries:**

🚦 **Delhi Next — Code, Create & Change — Top 60 National Cohort** · 2026
> Selected among the Top 60 teams nationally (from a program reaching over 1 crore youth) to present a Smart Traffic Management System at MCD Headquarters, Civic Centre, New Delhi (July 1–3, 2026). The solution is being taken forward as a pilot project with Delhi Government departments.

🏁 **GUVI India AI Impact Buildathon — Finalist** · 2026
> Agentic Honey-Pot — an autonomous scam detection agent that poses as a potential victim and extracts intelligence from real scammers in live conversation.

🥈 **MLBhopal GenAI Hackathon — Runner-up** · 2025
> Built EchoPay, an audio-based offline P2P payment system using a custom Pure Kotlin MFSK engine. Built entirely in 8 hours.

**Certifications (currently missing from this page's data — see note below):**
- Python Programming — AICTE / Robokwik
- Blockchain and its Applications — IIT Kharagpur / NPTEL Swayam

**⚠️ Known issue, carried over from the verification pass:** `lib/achievements/data.ts` currently has zero entries tagged "certification," so this page's filter shows "Certifications (0)" even though two certifications exist and display correctly on the Home page. Adding the two certifications above to that data file with the correct category tag resolves it — this is a data fix, not new content.

**Not included (flagged as unconfirmed in `realContentData.md`):** OpenENV Hackathon — appears on GitHub but not on LinkedIn. Don't publish this one until you confirm it's real and current.

---

## 12. Contact — `/contact`

**H1:** Contact
**Subheading:** Have a question, project idea, or just want to say hi? Drop a message.

*(Form fields — Name, Email, Message — already implemented correctly per the screenshots; no copy changes needed.)*

**Direct contact (if shown alongside the form):**
📧 sht4bharat@gmail.com
🔗 github.com/SHT4BHARAT
🔗 linkedin.com/in/shivanshutiwari-

---

## 13. `llms.txt` Content

```
# Shivanshu Tiwari

AI-native backend systems — autonomous agents, LLM pipelines, and
production APIs. B.Tech CS & IT student at SIRT Bhopal (2027).

I don't just use AI — I build things with it that keep running after I
close my laptop. I build things that work in production and prove it by
deploying them. The standard I hold myself to: the system owns the task
completely.

## Focus areas
- Autonomous AI agents (Agentic Honey-Pot: scam detection, 85-90% accuracy)
- Real-time voice AI (Samvad: meeting transcription + action-item extraction)
- Backend infrastructure (FastAPI, Docker, Redis, PostgreSQL, WebSockets)

## Links
- GitHub: https://github.com/SHT4BHARAT
- LinkedIn: https://www.linkedin.com/in/shivanshutiwari-
- Email: sht4bharat@gmail.com

## Pages
- /ai-engineer — AI/agentic engineering focused view
- /backend-systems — backend/infrastructure focused view
- /blog — technical commentary and field notes
- /achievements — hackathons and certifications
```

---

## 14. Still Open — Needs Your Input Before This Is 100% Final

1. **Confirm the `/backend-systems` project list** — Section 3 above lists all 5 projects; the live build may currently be missing 2 of them (per the earlier verification concern). Check `lib/role/config.ts` directly.
2. **Certifications data fix** — Section 11 flags the specific fix needed for the Achievements page bug.
3. **OpenENV Hackathon** — decide whether to include it; currently excluded from this content pass since it's unconfirmed.
4. **Experience section** — do you want the Blue Planet Team Lead detail included (as written above) or kept more junior/IC-focused? I included it since leadership on a real 10-person team is a genuine differentiator, but it's your call.
5. **Skills proficiency bars / spoken languages** — I recommended leaving both off (Section 6); override if you disagree.
