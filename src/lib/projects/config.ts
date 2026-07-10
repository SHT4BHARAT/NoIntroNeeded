import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "agentic-honey-pot",
    title: "Agentic Honey-Pot — Scam Detection System",
    description:
      "An autonomous AI agent that poses as a potential scam victim, engages real scammers in live conversation, and extracts intelligence (UPI IDs, phishing URLs, phone numbers) via an agentic loop. Achieves 85–90% fraud detection accuracy across real-world scam samples.",
    stack: ["Python", "FastAPI", "Google Gemini", "Docker", "Railway"],
    repoUrl: "https://github.com/SHT4BHARAT/agentic-honeypot-scam-detection",
    demoUrl: "https://honypot-scam-detection.up.railway.app/",
    date: "2026",
    highlights: [
      "85–90% fraud detection accuracy across real-world scam samples",
      "Dockerized REST API on Railway with 99%+ uptime, sub-2s response",
      "GUVI India AI Impact Buildathon 2026 Finalist",
      "Extracts UPI IDs, phishing URLs, and phone numbers via autonomous agentic loop",
    ],
    aiFraming:
      "An autonomous LLM agent that runs a live conversational loop against real scammers, extracting UPI IDs and phishing URLs with 85–90% detection accuracy — a production fraud pipeline, not a chatbot demo.",
    backendFraming:
      "A Dockerized FastAPI service deployed on Railway with 99%+ uptime and sub-2-second response times, built for real, unattended production traffic.",
  },
  {
    slug: "samvad",
    title: "Samvad — Voice-Driven Meeting Intelligence Agent",
    description:
      "Real-time voice agent that transcribes meetings live, detects voice commands, and auto-generates intelligence reports with structured action items and owner assignments — delivered before the call ends. No notes, no follow-up, no human review.",
    stack: ["Python", "FastAPI", "Sarvam AI", "WebSocket", "Redis", "PostgreSQL", "React"],
    date: "2025",
    highlights: [
      "Multi-speaker diarization + real-time transcript highlighting",
      "99%+ uptime with persistent Redis + PostgreSQL storage",
      "Auto-generates structured action items with owner assignment",
      "Real-time WebSocket pipeline for live transcription",
    ],
    aiFraming:
      "A real-time voice agent with multi-speaker diarization that classifies meeting segments and extracts action items live, no post-processing required.",
    backendFraming:
      "Full real-time infra: FastAPI + WebSocket for live transcription, Redis for session state, PostgreSQL for persistence, React on the frontend — 99%+ uptime.",
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
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsBySlugs(slugs: string[]): Project[] {
  return slugs
    .map((slug) => getProjectBySlug(slug))
    .filter((p): p is Project => p !== undefined);
}
