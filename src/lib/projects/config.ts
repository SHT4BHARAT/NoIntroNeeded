import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "agentic-honey-pot",
    title: "Agentic Honeypot — AI Scam-Baiting System",
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
  },
  {
    slug: "samvad",
    title: "Samvad — AI Meeting Assistant",
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
  },
  {
    slug: "email-categorization-agent",
    title: "AI Email Categorization Agent",
    description:
      "Local-first inbox automation agent — reads Gmail via OAuth2, semantically classifies every email into custom labels using an LLM, applies them automatically, and runs on a schedule with zero manual input. Persistent sender-to-label memory cuts repeat API costs by 60%+.",
    stack: ["Python", "Google Gemini", "Gmail API", "OAuth2"],
    date: "2025",
    highlights: [
      "Persistent sender-to-label memory cuts repeat API costs by 60%+",
      "Intelligently skips already-labeled threads",
      "Runs unattended with zero cloud dependency",
      "OAuth2-secured Gmail integration",
    ],
    aiFraming:
      "An LLM-powered agent that semantically classifies and labels Gmail automatically, with persistent memory that cuts repeat API costs by 60%+.",
    backendFraming:
      "A local-first automation service integrating Gmail's OAuth2 API — built to run unattended with zero cloud dependency or data exposure.",
  },
  {
    slug: "call-center-compliance-api",
    title: "Call Center Compliance API",
    description:
      "End-to-end pipeline — upload a call recording, get back a structured compliance report as JSON. Chains speech-to-text (Sarvam AI STT) through an LLM SOP-validation pipeline to analytics — no human in the loop. Supports Hindi and multilingual audio.",
    stack: ["Python", "FastAPI", "Sarvam AI STT", "Vercel"],
    repoUrl: "https://github.com/SHT4BHARAT/Call_Center_Compliance-",
    date: "2025",
    highlights: [
      "Serverless FastAPI pipeline on Vercel",
      "POST an audio file, get back structured JSON in seconds",
      "Hindi + multilingual audio support built in",
      "Chains STT → LLM SOP validation → analytics, no human review",
    ],
    aiFraming:
      "Chains speech-to-text with an LLM SOP-validation pipeline to turn a raw call recording into a structured compliance report — no human review step.",
    backendFraming:
      "A serverless FastAPI pipeline on Vercel: POST an audio file, get back structured JSON in seconds, with Hindi and multilingual support built in.",
  },
  {
    slug: "echopay",
    title: "EchoPay — Audio-Powered Offline Payment System",
    description:
      "Offline P2P payments using high-frequency audio tones (18–22kHz) — no internet required. Custom Pure Kotlin MFSK engine built from scratch using the Goertzel algorithm for real-time decoding, with HMAC-SHA256 security. Built in 8 hours.",
    stack: ["Kotlin", "Node.js", "Express", "Railway", "MFSK", "HMAC-SHA256"],
    demoUrl: "https://echopay-backend-production.up.railway.app",
    date: "2025",
    highlights: [
      "Custom Pure Kotlin MFSK engine built from scratch",
      "Goertzel algorithm for real-time audio decoding",
      "Hybrid Audio+UDP transceiver",
      "Transmission speed optimized by 70% with HMAC-SHA256 security",
      "Built in 8 hours — MLBhopal GenAI Hackathon Runner-up 2025",
    ],
    aiFraming:
      "Not an LLM project, but the same rigor applied to production-grade autonomous systems under real constraints — built in 8 hours for a hackathon runner-up finish.",
    backendFraming:
      "A custom-built MFSK audio protocol engine written in pure Kotlin from scratch, using the Goertzel algorithm for real-time decoding and HMAC-SHA256 security — a from-scratch systems project, not a wrapper around a library.",
  },
  {
    slug: "daitfo",
    title: "DAITFO — RL Traffic Signal Control Benchmark",
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
  },
  {
    slug: "cloud-audit-env",
    title: "CloudAuditEnv — LLM Agent Evaluation for Cloud Security",
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
  },
  {
    slug: "payout-engine",
    title: "PayoutEngine — Concurrency-Safe Payout System",
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
