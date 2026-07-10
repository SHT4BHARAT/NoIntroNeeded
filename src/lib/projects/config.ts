import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "agentic-honey-pot",
    title: "Agentic Honeypot — AI Scam-Baiting System",
    featured: true,
    description:
      "An AI agent that poses as a confused elderly retiree, engages real scammers in live conversation, and extracts UPI IDs, bank accounts, and phishing links from their own messages — turning reactive defense into active intelligence gathering.",
    stack: ["Python", "FastAPI", "Pydantic", "Google Gemini", "Render", "Vercel", "Docker"],
    repoUrl: "https://github.com/SHT4BHARAT/agentic-honeypot-scam-detection",
    date: "2026",
    highlights: [
      "Gemini 2.0 Flash agent running a 'Rajesh Kumar' persona that keeps scammers engaged and extracting intel",
      "Intelligence extractor scanning for 8 entity types: UPI IDs, bank accounts, phone numbers, phishing URLs, emails, case/policy/order numbers",
      "Keyword + regex scam detector — zero training data needed, low latency on known patterns",
      "Real debugging visible across 22 commits over 45 days: threshold tuning, PORT handling, provider switches",
      "GUVI India AI Impact Buildathon 2026 Finalist",
    ],
    aiFraming:
      "A Gemini 2.0 Flash agent running a live scam-baiting conversation as an elderly persona, extracting 8 types of financial intelligence from scammer replies autonomously — active defense, not passive reporting.",
    backendFraming:
      "A FastAPI pipeline on Render with keyword+regex scam detection, in-memory session store, and a multi-entity intelligence extractor — zero infrastructure, instant deployment on free-tier hosting.",
    problem:
      "Phone and SMS scams targeting elderly Indians cost billions annually, and most defenses are purely reactive — block the number, report it, move on. None of that gathers intelligence on the scammer's actual infrastructure. I wanted to build the opposite: something that engages the scammer in conversation, keeps them talking, and extracts their UPI IDs, bank accounts, and phishing links from their own messages.",
    whatIBuilt:
      'An incoming scam message gets scored by a keyword + regex detector I wrote, then routed to a Gemini 2.0 Flash agent playing "Rajesh Kumar" — an elderly, worried, cooperative victim persona who asks for exactly the wrong things ("could you send me that UPI ID again?"). Every scammer reply is simultaneously scanned by an intelligence extractor I built that pulls 8 entity types: UPI IDs, bank accounts, phone numbers, phishing URLs, emails, case numbers, policy numbers, order numbers. After 20 turns (or once enough financial intel surfaces), the session ends and results POST to the hackathon\'s evaluation endpoint.',
    architecture:
      "Scam Message → Scam Detector (keyword+regex) → Gemini Agent (persona: Rajesh)\n                                                        │\n                                        Intelligence Extractor (8 entity types)\n                                                        │\n                                              GUVI Callback (results)",
    keyDecisions: [
      "I chose pattern matching over ML for scam detection — zero training data needed, low latency, reliable on known patterns. It won't generalize to novel scam phrasing without a real classifier, which I accepted for this scope.",
      "I ran Gemini at temperature 0.9 for natural, varied responses that keep a scammer engaged. That makes persona behavior non-deterministic across runs.",
      "I used an in-memory session store — zero infrastructure, instant deployment on free-tier hosting. Conversations are lost on every cold start; a Redis layer is my obvious next step.",
    ],
  },
  {
    slug: "samvad",
    title: "Samvad — AI Meeting Assistant",
    featured: true,
    description:
      "Records in-person meetings, transcribes them live, and turns them into assigned, emailed tasks — without anyone taking notes.",
    stack: ["Python", "FastAPI", "SQLAlchemy", "APScheduler", "Sarvam AI", "WebSocket", "Redis", "PostgreSQL", "Docker", "GitHub Actions", "Render"],
    date: "2025",
    highlights: [
      "Live transcription via Sarvam AI STT streamed over WebSocket with regex+LLM voice command detection for flagging key moments",
      "3-phase transcript refinement pipeline with a quality gate that catches LLM hallucination before it reaches task output",
      "ReAct agent that extracts tasks with assignees and deadlines via fuzzy name matching (Dice coefficient) against an employee directory",
      "Emails tasks to assignees automatically via Gmail or SMTP after each meeting",
      "60% test coverage minimum enforced by CI — with mocked API and email paths",
    ],
    aiFraming:
      "Sarvam AI STT streaming live over WebSocket, a ReAct agent extracting tasks with assignees and deadlines, and a 3-phase refinement pipeline with a quality gate that specifically catches LLM hallucination — designed for real in-person meetings, not demos.",
    backendFraming:
      "A FastAPI service with SQLAlchemy 2.0, Redis-backed sessions, APScheduler for scheduled tasks, and CI-enforced 60% test coverage — deployed with Docker Compose on Render.",
    problem:
      "In-person meetings lose context because nobody takes structured notes. Decisions get made, tasks get assigned verbally, and by the time someone writes up minutes, half the details are gone. I built Samvad to sit in the room, transcribe everything in real time, let you flag important moments by voice, then run an LLM agent after the meeting to extract tasks with assignees and deadlines — and email them automatically.",
    whatIBuilt:
      "Live, during the meeting: microphone audio (16kHz) streams over WebSocket to Sarvam AI's speech-to-text. I built a regex-based voice command detector — with an LLM fallback for ambiguous phrasing — so you can say things like \"start highlighting\" to flag key sections in real time.\n\nAfter the meeting ends: the raw transcript runs through a 3-phase refinement pipeline I designed (rule-based cleanup → LLM grammar fix → a quality gate that reverts to the rule-based version if the LLM corrupts speaker labels or drops content). A ReAct agent then reads the cleaned transcript, fuzzy-matches mentioned names against an employee directory, inserts tasks into the database, and emails assignees via Gmail or SMTP.",
    architecture:
      "Mic (sounddevice) → Sarvam STT (WebSocket) → Voice Command Detector → live highlights\n                                                        │\n                                              [meeting ends]\n                                                        │\n                        3-Phase Transcript Refiner → ReAct Agent → Task DB → Email",
    keyDecisions: [
      "I used regex + an LLM fallback for voice commands — deterministic phrases resolve instantly; ambiguous speech falls back to an LLM intent call, adding ~2s latency in exchange for handling natural phrasing.",
      "I built a 3-phase refinement pipeline with a quality gate — it explicitly checks whether the LLM's grammar pass corrupted speaker labels or dropped more than half the content, and reverts to the rule-based output if so. I added that complexity specifically to catch LLM hallucination before it reaches a task list.",
      "I picked a single vendor (Sarvam AI) for both STT and the LLM — simpler integration and real Hindi/English code-switching support, at the cost of full vendor lock-in.",
      "I used fuzzy name matching (Dice coefficient) for the employee directory — resilient when STT mishears a name, though short names occasionally produce false positives.",
    ],
  },
  {
    slug: "email-categorization-agent",
    title: "AI Email Categorization Agent",
    description:
      "Local-first inbox automation agent — reads Gmail via OAuth2, semantically classifies every email into custom labels using an LLM, applies them automatically, and runs on a schedule with zero manual input. Skips already-labeled threads to avoid redundant processing.",
    stack: ["Python", "Google Gemini", "Gmail API", "OAuth2"],
    date: "2025",
    highlights: [
      "Intelligently skips already-labeled threads to avoid redundant LLM calls",
      "Runs unattended with zero cloud dependency",
      "OAuth2-secured Gmail integration",
    ],
    aiFraming:
      "An LLM-powered agent that semantically classifies and labels Gmail automatically, with sender-level deduplication to avoid redundant processing.",
    backendFraming:
      "A local-first automation service integrating Gmail's OAuth2 API — built to run unattended with zero cloud dependency or data exposure.",
  },
  {
    slug: "call-center-compliance-api",
    title: "Call Center Compliance API",
    description:
      "I built an API that takes call-center audio, transcribes it, scores SOP compliance, and flags payment-intent signals — designed specifically to avoid the numeric hallucination problem that plagues pure LLM scoring.",
    stack: ["Python", "FastAPI", "Sarvam AI STT", "Vercel"],
    repoUrl: "https://github.com/SHT4BHARAT/Call_Center_Compliance-",
    date: "2025",
    highlights: [
      "Transcribes call-center audio, scores SOP compliance, flags payment-intent signals",
      "Designed to avoid numeric hallucination problems that plague pure LLM scoring",
      "Serverless FastAPI pipeline on Vercel — POST audio, get structured JSON back",
      "Hindi + multilingual audio support built in",
    ],
    honestPart:
      "I don't have a repo or live URL yet. I want to come back to this one — the 'avoid LLM hallucination on numeric scores' framing is a solid technical story if I build it out further.",
    aiFraming:
      "Chains speech-to-text with an LLM SOP-validation pipeline designed to avoid numeric hallucination in compliance scoring — no human review step.",
    backendFraming:
      "A serverless FastAPI pipeline on Vercel: POST an audio file, get back structured JSON in seconds, with Hindi and multilingual support built in.",
  },
  {
    slug: "echopay",
    title: "EchoPay — Audio-Powered Offline Payment System",
    featured: true,
    tagline:
      "Offline P2P payments encoded as audio tones between phones — no internet required.",
    description:
      "I built an offline P2P payment system that encodes transaction data as audio tones between phones (MFSK modulation) — no internet required — with a hybrid UDP fallback and an offline-first Room sync queue.",
    stack: ["Kotlin", "Android SDK", "Express.js", "Railway", "MFSK", "HMAC-SHA256"],
    demoUrl: "https://echopay-backend-production.up.railway.app",
    date: "2025",
    highlights: [
      "Custom Pure Kotlin MFSK engine built from scratch using the Goertzel algorithm",
      "Hybrid Audio+UDP transceiver with offline-first Room sync queue",
      "Native C++ audio engine is stubbed — all real signal work happens in pure Kotlin",
      "Backend has real deploy-debugging history: 5 fix commits for Railway crash loops",
    ],
    honestPart:
      "My native C++ audio engine is stubbed — all the real signal work happens in pure Kotlin. My backend has real deploy-debugging history behind it: 5 fix commits just for a Railway crash loop.",
    aiFraming:
      "A custom-built MFSK audio protocol engine — pure Kotlin signal processing with the Goertzel algorithm for real-time decoding and HMAC-SHA256 security. Not an AI project, but the same engineering rigor applied to a from-scratch systems problem.",
    backendFraming:
      "A custom-built MFSK audio protocol engine written in pure Kotlin from scratch, using the Goertzel algorithm for real-time decoding and HMAC-SHA256 security — a from-scratch systems project, not a wrapper around a library.",
  },
  {
    slug: "daitfo",
    title: "DAITFO — RL Traffic Signal Control Benchmark",
    featured: true,
    description:
      "A custom Gymnasium environment wrapping SUMO that benchmarks a PPO agent against fixed-time and queue-based heuristic controllers across 27 controlled runs. The heuristic won every metric — and that honest negative result is the actual finding, not a failure.",
    stack: ["Python", "Kotlin", "Stable-Baselines3", "Gymnasium", "SUMO", "Jetpack Compose", "Docker", "GitHub Actions"],
    date: "2026",
    highlights: [
      "Heuristic beat PPO on every metric at every demand level — the honest negative result is the finding",
      "Custom Gymnasium environment wrapping SUMO via TraCI with full yellow-phase control",
      "27 controlled runs: 3 controllers × 3 demand levels × 3 seeds",
      "Discovered fundamental reliability tradeoff: shorter minimum phases buy peak performance but cost training stability",
      "Companion Android app (Kotlin/Compose) with role-based monitoring for citizens, responders, and inspectors",
    ],
    aiFraming:
      "A custom Gymnasium RL environment wrapping SUMO that ran a controlled benchmark of PPO vs. heuristics for traffic signal control — and published the honest result when the heuristic outperformed RL across every metric.",
    backendFraming:
      "A 27-run controlled benchmark pipeline using SUMO/TraCI, TensorBoard logging, and Docker Compose, with a companion Android app providing role-based monitoring views.",
    problem:
      "Fixed-timing traffic signals can't adapt to real-time demand, which wastes fuel and delays emergency vehicles at intersections. The obvious modern answer is reinforcement learning. I wanted to know if that answer actually holds up against a much simpler queue-based heuristic — or if it's just assumed to be better because it's newer.",
    whatIBuilt:
      "I built a custom Gymnasium environment wrapping SUMO (a standard traffic microsimulator) via its TraCI interface, exposing queue lengths and waiting times per lane as the observation space. I trained a PPO agent (Stable-Baselines3) on this environment and benchmarked it head-to-head against a fixed-time controller and a queue-based heuristic — across 3 controllers × 3 demand levels × 3 seeds, 27 controlled runs in total.\n\nI also built a companion Android app (Kotlin/Compose) with role-based monitoring views for citizens, emergency responders, and traffic inspectors.",
    architecture:
      "SUMO Simulator\n ├── Fixed-Time Controller\n ├── Heuristic Controller (queue-based, actuated)\n └── PPO Agent (RL)\n        │\n        ▼\n  MetricsCollector → wait time, queue length, throughput\n        │\n        ▼\n  benchmark_results.csv",
    result:
      "The heuristic won. On every metric, at every demand level.\n\nOn medium demand: the heuristic averaged 83s wait time. PPO averaged 136s. Fixed-time was 357s.\n\nThat's not a failed project to me — it's the actual finding. I initially had a bug where the heuristic had zero yellow-transition overhead, which made the early comparison look favorable to RL. Once I fixed that and re-ran the full benchmark, the result flipped completely. I kept the negative result instead of quietly reworking the framing.\n\nThe more interesting nuance I found: tightening the RL agent's minimum phase duration got one seed out of five to match the heuristic (84.6s) — but two of five seeds catastrophically failed instead, with vehicles getting permanently stuck (max wait times over 199,000 seconds in a simulation that should run 3,600). Shorter minimum phases buy peak performance and cost training reliability. That tradeoff is the real technical takeaway I walked away with.",
    keyDecisions: [
      "I built a custom Gymnasium env instead of using sumo-rl's built-in — I wanted full control over yellow-phase handling, at the cost of maintaining the TraCI integration by hand.",
      "I used a binary action space (keep/switch) so the comparison to the heuristic would be apples-to-apples. That meant I couldn't express phase-specific durations as a result.",
      "I trained only on medium demand — simpler experiment design, but low-demand generalization suffered (40s vs. the heuristic's 10.5s).",
      "I descoped the infrastructure I'd originally planned (Kafka, Neo4j, Redis, an LLM layer) to focus on one defensible, well-measured result instead of a sprawling half-built system.",
    ],
  },
  {
    slug: "home-services-app",
    title: "Home Services App",
    description:
      "Emergency home services platform for Indian housing societies — three clients (Android, admin dashboard, API) sharing one REST API with role-based middleware, real-time tracking, and Razorpay payments.",
    stack: ["JavaScript", "TypeScript", "Kotlin", "Express", "Sequelize", "Next.js", "Jetpack Compose", "Hilt", "Retrofit", "PostgreSQL", "Socket.io", "Razorpay"],
    date: "2026",
    highlights: [
      "Three clients (Android/Compose, Next.js admin, Express API) sharing one REST API with role-based middleware",
      "Real-time technician tracking and customer-partner chat via Socket.io rooms scoped per booking",
      "Location-based provider search using Haversine formula across 8 service categories",
      "12 Sequelize models, 9 route groups, 15 backend test files — 23 commits over 18 days",
      "Included a gap-analysis doc, mock Razorpay service for offline testing, and SQLite fallback for local dev",
    ],
    backendFraming:
      "An MVC Express API with Sequelize ORM, JWT auth, Socket.io real-time features, and Razorpay payments — three clients, one API, deployed on Render and Vercel with 15 Jest tests across 9 route groups.",
    problem:
      "In Indian residential societies, urgent household breakdowns — electrical faults, water leaks, appliance failures — need fast, trustworthy help. Existing platforms like Urban Company serve this at city-wide scale; I wanted to explore a society-focused model instead, where concentrated local demand could reduce delivery cost and build trust through repeat local partnerships.",
    whatIBuilt:
      "I built three clients talking to one REST API.\n\nMy backend runs an MVC pattern with role-based middleware (customer/partner/admin), Sequelize ORM over PostgreSQL in production, JWT auth, and location-based provider search using the Haversine formula. Real-time technician tracking and customer-partner chat run through Socket.io rooms scoped to each booking. The Android app follows clean architecture with Hilt DI and Retrofit; the admin dashboard is a typed Next.js client calling the same API.\n\nBy the numbers: 12 Sequelize models, 9 route groups, 15 backend test files, 15 seeded services across 8 categories, 23 commits over 18 days.",
    architecture:
      "Android App (Kotlin/Compose) ──┐\nAdmin Panel (Next.js)        ──┼──▶  Express API ──▶ PostgreSQL\n                                │         │\n                                │         ├──▶ Socket.io (live tracking + chat)\n                                │         └──▶ Razorpay (payments)",
    keyDecisions: [
      "I used SQLite + a mock DB fallback for local dev — no Postgres setup needed to run the project, but the mock doesn't enforce schema constraints, so model-level bugs can slip through to production undetected.",
      "I mocked Razorpay for testing — tests run without network access, but the mock returns hardcoded data, so real payment integration bugs only surface after deployment.",
      "I put tracking and chat on one Socket.io server — simple to implement, at the cost of coupling two features that probably deserve separation as the app grows.",
    ],
  },
  {
    slug: "cloud-audit-env",
    title: "CloudAuditEnv — LLM Agent Evaluation for Cloud Security",
    featured: true,
    description:
      "Procedurally generated cloud security audit environment that tests LLM agents on finding and fixing real vulnerability patterns — built for the OpenENV MetaHackathon.",
    stack: ["Python", "FastAPI", "Pydantic", "OpenAI SDK", "httpx", "OpenEnv", "Qwen2.5-72B-Instruct", "Docker", "HuggingFace Spaces", "Uvicorn"],
    repoUrl: "https://github.com/SHT4BHARAT/OpenENV-MetaHackathon",
    date: "2026",
    highlights: [
      "Procedurally generates 13–22 randomized AWS-style resources with real vulnerability patterns (public SSH, unencrypted storage, wildcard IAM)",
      "Health score system penalizes blind fixes — removing essential security group rules costs -0.2, breaking IAM costs -0.3",
      "Baseline Qwen2.5-72B agent scores ~0.44 on hardest IAM remediation — wildcard permission removal as genuinely hard constrained optimization",
      "Flat JSON action model with batch remediation (remediate_all_in_sg) to stay within 30-step budget",
      "Built for OpenENV MetaHackathon with honest documentation of limitations (no seed support, unverified benchmark scores)",
    ],
    aiFraming:
      "Procedurally generates randomized cloud environments with real vulnerability patterns and measures LLM agents on constrained operational remediation — not quiz-based security evaluation, but actual infrastructure-level security tasks.",
    backendFraming:
      "A FastAPI server with Pydantic validation, procedural resource generation, and a health score computer — deployed on HuggingFace Spaces via Docker for reproducible agent evaluation.",
    problem:
      "LLM agents are increasingly deployed in infrastructure management roles, but there's a shortage of environments that test whether they can actually perform security operations — not just identify them. I built CloudAuditEnv to generate randomized AWS-like environments with real vulnerability patterns (public SSH access, unencrypted storage, wildcard IAM policies) and measure whether an agent can remediate them without breaking essential services in the process. I built this for the OpenENV MetaHackathon.",
    whatIBuilt:
      "Each episode randomly generates 13–22 AWS-style resources with a mix of vulnerabilities. The agent observes the full environment state and outputs flat JSON actions to remediate issues. The interesting design problem I ran into was the health score: an agent that blindly closes every open port breaks production. So I built remediation as constrained optimization rather than greedy fix-everything — removing an essential security group rule costs -0.2, breaking IAM access costs -0.3, high enough to matter without making any single mistake fatal.",
    architecture:
      "LLM Agent (Qwen2.5-72B) ──HTTP/JSON──▶ FastAPI Server (port 7860)\n                                              │\n                                    CloudAuditEnv\n                                       ├── Procedural Generator (uuid + random)\n                                       ├── State Manager (SG/S3/RDS/EBS/IAM)\n                                       └── Reward + Health Score Computer",
    keyDecisions: [
      "I used a flat, verbose action model over discriminated unions — every action carries some unused fields, but parsing works reliably across Pydantic versions instead of breaking on edge cases.",
      "I clamped scores to (0.1, 0.9) — this avoids validation failures at the boundaries, at the cost of perfect remediation never showing as a clean 1.0.",
      "I didn't add seed support — each episode is genuinely random, which means agents can't memorize resource IDs, but it also means there's no reproducible run-to-run comparison yet.",
      "I added a batch remediation action (remediate_all_in_sg) after discovering that fixing security group rules one at a time exhausted the 30-step budget on complex groups.",
    ],
  },
  {
    slug: "payout-engine",
    title: "PayoutEngine — Concurrency-Safe Payout System",
    featured: true,
    description:
      "Prevents double-spending when two payout requests hit the same merchant balance at the same instant — verified with real threading tests, not mocks.",
    stack: ["Python", "Django", "Django REST Framework", "React", "PostgreSQL", "Redis", "Celery", "Vite", "Tailwind CSS", "Render", "Vercel", "Stripe"],
    date: "2026",
    highlights: [
      "Immutable ledger with no mutable balance field — balance is always SUM(credits) − SUM(debits), computed live on every request",
      "Pessimistic row locking (select_for_update) closes the double-spend race at the database level",
      "Verified with real Python threading tests: two simultaneous 6,000 paise requests against 10,000 — exactly one succeeds, no mocks",
      "Strict state machine enforced at the model level (pending → processing → completed/failed) with atomic claim-and-set for Celery workers",
      "24-hour idempotency key expiry protects against duplicate submissions while allowing legitimate retries",
    ],
    aiFraming:
      "Not an LLM or AI project — but the same systems rigor applied to a correctness-critical financial domain: immutable ledger design, pessimistic row locking, and verifiable concurrency guarantees backed by real threading tests.",
    backendFraming:
      "A Django REST API with PostgreSQL immutable ledger, pessimistic row locking (select_for_update), Celery workers with atomic claim-and-set, and a React frontend — built for correctness over speed.",
    problem:
      "International agencies and freelancers in India receive USD payments and need to withdraw to INR bank accounts. The core failure mode I wanted to eliminate: two simultaneous payout requests both check the balance, both see it as sufficient, both deduct — and the merchant is overdrawn. Failed bank settlements also need to release held funds cleanly, not leak them.",
    whatIBuilt:
      "I gave merchants no mutable balance field at all — balance is always SUM(credits) − SUM(debits), computed live from an immutable ledger table on every request. Payouts move through a strict state machine I enforce at the model level (pending → processing → completed/failed), and every balance check during payout creation takes a pessimistic row lock (select_for_update) to close the race condition at the database level rather than trying to catch it after the fact.",
    architecture:
      "React Frontend ──▶ Django REST API ──▶ PostgreSQL (Ledger table)\n                        │                      ▲\n                        ▼                      │\n                  Celery Workers ────────── Redis (broker)\n                        │\n                        ▼\n                Bank Settlement (simulated)",
    keyDecisions: [
      "I chose pessimistic locking over optimistic — it closes the double-spend race completely, at the cost of reduced throughput under high concurrency. For a payout system, I decided correctness beats speed.",
      "I built an immutable ledger with live aggregation — every balance read recomputes from the ledger instead of trusting a cached field. More expensive reads, but the balance can never drift out of sync with its own history.",
      "I used atomic claim-and-set for Celery workers — prevents the same payout from being processed twice if two workers pick it up simultaneously.",
      "I set a 24-hour idempotency key expiry — protects against duplicate submissions within a session, while still letting a genuinely new attempt go through after a day.",
    ],
  },
  {
    slug: "takealift",
    title: "TakeALift — Carpooling & P2P Vehicle Rental",
    description:
      "I built a carpooling and P2P vehicle rental platform with real-time driver dispatch — Redis GEO proximity search, distributed locking to prevent double-dispatch, a NATS event bus, and full AWS infrastructure-as-code across native Android, Flutter, and a TypeScript backend.",
    stack: ["TypeScript", "Kotlin", "Flutter", "PostgreSQL", "Redis", "NATS", "Terraform"],
    date: "2026",
    highlights: [
      "Redis GEO proximity search for real-time driver dispatch with distributed locking to prevent double-dispatch",
      "NATS event bus for async communication across services",
      "Full AWS infrastructure-as-code via Terraform",
      "Three clients: native Android, Flutter, and TypeScript backend",
    ],
    honestPart:
      "I built all 19 commits in a 1.5-hour window — I'm being upfront that this reads as AI-scaffolded rather than iteratively built. I also need to fix my README: it claims 'unit tests for all business logic' and 'multi-cloud ready,' and neither holds up yet (my tests only cover auth + basic API flows; my Terraform is AWS-only).",
    backendFraming:
      "A multi-client carpooling platform with Redis GEO proximity search, distributed locks, NATS event bus, and Terraform-provisioned AWS infra — spanning Android, Flutter, and TypeScript.",
  },
  {
    slug: "uidai-aadhaar-analysis",
    title: "UIDAI Aadhaar Data Analysis Pipeline",
    description:
      "I cleaned and analyzed 4.4M Aadhaar enrollment records — removed 602K duplicates, standardized 65 state-name variants down to 38 — and served the results through a 14-endpoint Flask API.",
    stack: ["Python", "Flask", "pandas"],
    date: "2025",
    highlights: [
      "Cleaned 4.4M records: removed 602K duplicates, standardized 65 state-name variants down to 38",
      "14-endpoint Flask API serving the cleaned dataset",
      "Honestly flagged its own bug: hardcoded summary is off by ~40K from the real cleaned total",
    ],
    honestPart:
      "I caught my own bug during the audit: a hardcoded summary in one script is off by about 40K records from the real cleaned total. I don't have git history or a deployment beyond localhost yet.",
    backendFraming:
      "A Flask API serving 4.4M cleaned Aadhaar enrollment records — pandas-based ETL pipeline with duplicate removal and state-name standardization.",
  },
  {
    slug: "multilingual-mandi-platform",
    title: "Multilingual Mandi Platform",
    description:
      "I built a real-time marketplace connecting local vendors across language barriers, with a provider-chain translation fallback (Google → Microsoft → AWS → mock) and Redis-backed WebSocket negotiation.",
    stack: ["Node.js", "Express", "PostgreSQL", "Redis", "Socket.io"],
    date: "2026",
    highlights: [
      "Provider-chain translation fallback: Google → Microsoft → AWS → mock for cross-language communication",
      "Redis-backed WebSocket negotiation for real-time bargaining between vendors and buyers",
      "Price discovery and negotiation are rule-based heuristics on synthetic data — not ML — described accurately",
    ],
    honestPart:
      'My "AI" price discovery and negotiation are rule-based heuristics on synthetic data, not ML — I\'m describing that accurately rather than calling it "AI-powered." All 11 of my integration tests currently fail (db is not a function), and only my mock translation provider actually runs — I haven\'t wired in real API keys yet.',
    aiFraming:
      "A translation-fallback pipeline (Google → Microsoft → AWS → mock) enabling cross-language marketplace negotiation — with the honest caveat that the 'AI' features are rule-based and tests don't pass.",
    backendFraming:
      "A Node.js/Express marketplace with Redis-backed WebSocket negotiation, provider-chain translation fallback, and PostgreSQL persistence — 11 integration tests that currently fail with no real API keys wired.",
  },
  {
    slug: "party-invite-ai",
    title: "PartyInvite AI — Bulk Invitation Generator",
    description:
      "I built a bulk party invitation generator — a CSV guest list goes in, personalized cards come out, delivered via email and WhatsApp through a Celery queue.",
    stack: ["Python", "Streamlit", "Celery", "PostgreSQL", "Twilio"],
    repoUrl: "https://github.com/SHT4BHARAT/PartyInvitationAutomation",
    date: "2026",
    highlights: [
      "CSV guest list → personalized cards → email + WhatsApp delivery via Celery queue",
      "36 commits over 2 days including full refactor from Streamlit monolith to layered architecture",
      "Status is archived — a completed exploration, not an active project",
    ],
    honestPart:
      "I iterated on this one well for its scope — 36 commits over 2 days, including a full refactor from a Streamlit monolith to a layered architecture. This project is archived — I'm framing it as a completed exploration, not an active project.",
    backendFraming:
      "A Celery-backed invitation pipeline from Streamlit frontend through PostgreSQL persistence to Twilio-based email and WhatsApp delivery.",
  },
  {
    slug: "cyber-mentor",
    title: "CyberMentor — AI Cybersecurity Companion",
    description:
      "I built an AI cybersecurity companion for students — it scans suspicious links/emails and teaches through a teach-back quiz.",
    stack: ["Python", "Gemini", "FastAPI"],
    date: "2026",
    highlights: [
      "Scans suspicious links and emails for phishing and malware indicators",
      "Teach-back quiz reinforces security concepts after each scan",
    ],
    honestPart:
      "I don't have git history yet, my institution dashboard shows placeholder stats I haven't backed with real data, and I left a live API key exposed in .env — I need to rotate that key before this goes anywhere near a public repo.",
    aiFraming:
      "An LLM-powered cybersecurity tutor that scans suspicious links and emails, then reinforces findings through a teach-back quiz — security education meets agentic scanning.",
    backendFraming:
      "A FastAPI backend serving link/email scanning endpoints with LLM-based analysis and quiz generation logic.",
  },
  {
    slug: "mail-agents",
    title: "MailAgents — Local Email Classifier",
    description:
      "I built a local tool that reads my Gmail, categorizes emails by sender with a local/cloud LLM, and auto-applies nested labels.",
    stack: ["Python", "Sarvam AI", "Ollama", "Gmail API", "OAuth2"],
    date: "2026",
    highlights: [
      "Categorizes emails by sender using local (Ollama) or cloud (Sarvam) LLM",
      "Auto-applies nested Gmail labels based on classification",
    ],
    honestPart:
      "I don't have git history or tests yet, and my README claims Claude AI when the code actually uses Sarvam/Ollama — I need to fix that before showing this.",
    backendFraming:
      "A local-first Gmail automation tool using OAuth2, sender-based LLM classification, and automatic nested label application.",
  },
  {
    slug: "margdarshak",
    title: "Margdarshak — Bilingual Career Guidance App",
    description:
      "I built a bilingual (Hindi/English) career guidance Android app with a 4-service Node.js backend for Smart India Hackathon.",
    stack: ["Kotlin", "Android SDK", "Node.js", "Express"],
    date: "2025",
    highlights: [
      "Bilingual Hindi/English career guidance for Indian students",
      "4-service Node.js microservices backend",
    ],
    honestPart:
      "I don't have git history yet, and my docs overclaimed — '100% complete' and 'production-ready' — while my email/password login path still uses a hardcoded dummy token and 3 of 7 planned services were never implemented. I'm reframing the copy honestly before I feature this.",
    backendFraming:
      "A 4-service Node.js microservices backend powering bilingual career guidance for an Android companion app.",
  },
  {
    slug: "compliance-iq",
    title: "ComplianceIQ — AI Policy Compliance Scanner",
    description:
      "I built a tool where you upload a policy PDF, AI extracts the enforceable rules, and a rule engine scans live data for violations with human-in-the-loop review.",
    stack: ["Python", "FastAPI", "Gemini", "PostgreSQL"],
    date: "2026",
    highlights: [
      "Upload a policy PDF — AI extracts enforceable rules automatically",
      "Rule engine scans live data for violations with human-in-the-loop review",
    ],
    honestPart:
      "I don't have a repo or live URL yet — I want to push this before featuring it, since the human-in-the-loop review flow is a genuinely good story once there's a link to back it.",
    aiFraming:
      "Extracts enforceable rules from policy PDFs via LLM, then a rule engine scans live data for violations with human-in-the-loop review — compliance automation with a safety gate.",
    backendFraming:
      "A FastAPI pipeline ingesting policy PDFs through LLM extraction into a rule engine that scans live data — designed for human review sign-off on every violation.",
  },
  {
    slug: "cep-iitb",
    title: "CEP-IITB — IIT Bombay Continuing Education",
    description:
      "I built an Android companion app for IIT Bombay's Continuing Education office — browse courses, view certificates, find contacts.",
    stack: ["Kotlin", "Android SDK"],
    date: "2025",
    highlights: [
      "Browse IIT Bombay CE courses, view certificates, and find department contacts",
      "Active project — currently in use",
    ],
    honestPart:
      "Status: active. I don't have a repo up yet — this is the smallest and simplest of my projects, so I'm keeping it as a one-liner rather than a full case study.",
    backendFraming:
      "An Android companion app for IIT Bombay's Continuing Education office — course browsing, certificate viewing, and contact lookup.",
  },
  {
    slug: "saathi-community-assistant",
    title: "Saathi Community Assistant",
    description:
      "I built a voice assistant that works in 13 Indian languages to help rural citizens find government welfare schemes.",
    stack: ["Python", "STT", "Gemini", "FastAPI"],
    date: "2026",
    highlights: [
      "Voice assistant supporting 13 Indian languages",
      "Surfaces government welfare scheme information for rural citizens",
    ],
    honestPart:
      "I don't have git history or a repo yet. I think this has a strong problem statement — worth revisiting as a flagship candidate later if I push real iteration history behind it.",
    aiFraming:
      "A multilingual voice assistant in 13 Indian languages connecting rural citizens to government welfare schemes — speech-to-text, LLM-powered information retrieval.",
    backendFraming:
      "A FastAPI backend with multilingual STT and LLM-based information retrieval for government welfare scheme discovery.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsBySlugs(slugs: string[]): Project[] {
  return slugs
    .map((slug) => getProjectBySlug(slug))
    .filter((p): p is Project => p !== undefined);
}
