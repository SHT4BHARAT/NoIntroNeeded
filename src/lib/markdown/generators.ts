import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, SOCIAL } from "@/lib/constants";
import { projects, getProjectBySlug } from "@/lib/projects/config";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { education, experience, volunteer, achievements } from "@/lib/achievements/data";
import { roles } from "@/lib/role/config";

function fm(title: string, description: string, canonical: string): string {
  const esc = (s: string) => s.replace(/"/g, '\\"').replace(/\n/g, " ");
  return `---\ntitle: "${esc(title)}"\ndescription: "${esc(description)}"\ncanonical: "${canonical}"\nlastUpdated: "${new Date().toISOString().split("T")[0]}"\n---\n\n`;
}

export function homeMarkdown(): string {
  let body = `# ${SITE_NAME} — ${SITE_TITLE}\n\n`;
  body += `${SITE_DESCRIPTION}\n\n`;
  body += `> B.Tech CS & IT, SIRT Bhopal (RGPV) — Class of 2027. I build autonomous agents, LLM pipelines, and concurrency-safe backend systems.\n\n`;
  body += `## About\n\n`;
  body += `I don't just use AI — I build things with it that keep running after I close my laptop. I'm a third-year B.Tech CS & IT student in Bhopal, and over the past year I've built autonomous agents, LLM pipelines, voice intelligence tools, and RL benchmarking systems across 19 projects — some shipped and deployed, some deliberately stopped short of production so I could document what actually worked and what didn't. I'm not interested in demos that only look good in a pitch. When something fails — an RL agent losing to a simple heuristic, a classifier scoring 25% instead of the 90% I hoped for — I keep the result and figure out why, instead of reframing it until it sounds better. That's the standard I hold my own work to, and it's the standard I expect from anything I ship.\n\n`;
  body += `## Links\n\n`;
  body += `- GitHub: ${SOCIAL.github}\n`;
  body += `- LinkedIn: ${SOCIAL.linkedin}\n`;
  body += `- Email: ${SOCIAL.email.replace("mailto:", "")}\n`;
  body += `- Website: ${SITE_URL}\n\n`;
  body += `## Featured Projects\n\n`;
  for (const p of projects.filter((pr) => pr.featured)) {
    body += `- [${p.title}](${SITE_URL}/projects/${p.slug}): ${p.description}\n`;
  }
  body += `\n## All Projects\n\n`;
  for (const p of projects) {
    body += `- [${p.title}](${SITE_URL}/projects/${p.slug}) — ${p.stack.join(", ")}\n`;
  }
  body += `\n---\n*Source: ${SITE_URL} — Content negotiation via Accept: text/markdown*\n`;
  return fm(`${SITE_NAME} — ${SITE_TITLE}`, SITE_DESCRIPTION, SITE_URL) + body;
}

export function projectMarkdown(slug: string): string | null {
  const project = getProjectBySlug(slug);
  if (!project) return null;
  let body = `# ${project.title}\n\n`;
  if (project.tagline) body += `*${project.tagline}*\n\n`;
  body += `${project.description}\n\n`;
  body += `**Stack:** ${project.stack.join(", ")}  \n`;
  body += `**Date:** ${project.date}  \n`;
  if (project.repoUrl) body += `**Repository:** ${project.repoUrl}  \n`;
  if (project.demoUrl) body += `**Live Demo:** ${project.demoUrl}  \n`;
  body += `\n`;

  if (project.problem) {
    body += `## The Problem\n\n${project.problem}\n\n`;
  }
  if (project.whatIBuilt) {
    body += `## What I Built\n\n${project.whatIBuilt}\n\n`;
  }
  if (project.architecture) {
    body += `## Architecture\n\n\`\`\`\n${project.architecture}\n\`\`\`\n\n`;
  }
  if (project.result) {
    body += `## The Result\n\n${project.result}\n\n`;
  }
  if (project.keyDecisions && project.keyDecisions.length > 0) {
    body += `## Key Decisions & Tradeoffs\n\n`;
    for (const d of project.keyDecisions) body += `- ${d}\n`;
    body += `\n`;
  }
  if (project.honestPart) {
    body += `## The Honest Part\n\n${project.honestPart}\n\n`;
  }
  body += `## Highlights\n\n`;
  for (const h of project.highlights) body += `- ${h}\n`;
  body += `\n---\n*Source: ${SITE_URL}/projects/${slug}*\n`;
  return fm(project.title, project.description, `${SITE_URL}/projects/${slug}`) + body;
}

export function blogPostMarkdown(slug: string, lang: "en" | "hi" = "en"): string | null {
  const post = getPostBySlug(slug, lang);
  if (!post) return null;
  const front = post.frontmatter;
  let body = `# ${front.title}\n\n`;
  body += `${front.excerpt}\n\n`;
  body += `**Category:** ${front.category}  \n`;
  body += `**Date:** ${front.date}  \n`;
  body += `**Tags:** ${front.tags.join(", ")}  \n`;
  body += `**Reading time:** ${post.readingTime} min  \n\n`;
  body += `---\n\n`;
  body += post.content;
  body += `\n\n---\n*Source: ${SITE_URL}/blog/${lang === "hi" ? "hi/" : ""}${slug}*\n`;
  return fm(front.title, front.excerpt, `${SITE_URL}/blog/${lang === "hi" ? "hi/" : ""}${slug}`) + body;
}

export function staticPageMarkdown(pathname: string): string | null {
  // Normalize: strip leading slash, handle index.md fallback
  const key = pathname.replace(/^\//, "") || "/";
  const normalized = key === "index" ? "/" : key;
  switch (normalized) {
    case "/":
      return homeMarkdown();
    case "index":
      return homeMarkdown();
    case "ai-engineer": {
      const r = roles.find((x) => x.slug === "ai-engineer");
      if (!r) return null;
      let body = `# ${r.title} — ${SITE_NAME}\n\n${r.headline}\n\n${r.subheading}\n\n## About\n\n${r.about}\n\n## Projects\n\n`;
      for (const slug of r.projectSlugs as string[]) {
        const p = getProjectBySlug(slug);
        if (p) body += `- [${p.title}](${SITE_URL}/projects/${p.slug}): ${p.description}\n`;
      }
      body += `\n---\n*Source: ${SITE_URL}/ai-engineer*\n`;
      return fm(`${r.title} — ${SITE_NAME}`, r.subheading ?? r.headline, `${SITE_URL}/ai-engineer`) + body;
    }
    case "backend-systems": {
      const r = roles.find((x) => x.slug === "backend-systems");
      if (!r) return null;
      let body = `# ${r.title} — ${SITE_NAME}\n\n${r.headline}\n\n${r.subheading}\n\n## About\n\n${r.about}\n\n## Projects\n\n`;
      for (const slug of r.projectSlugs as string[]) {
        const p = getProjectBySlug(slug);
        if (p) body += `- [${p.title}](${SITE_URL}/projects/${p.slug}): ${p.description}\n`;
      }
      body += `\n---\n*Source: ${SITE_URL}/backend-systems*\n`;
      return fm(`${r.title} — ${SITE_NAME}`, r.subheading ?? r.headline, `${SITE_URL}/backend-systems`) + body;
    }
    case "about":
      return aboutMarkdown();
    case "privacy":
      return privacyMarkdown();
    case "contact":
      return contactMarkdown();
    case "education": {
      let body = `# Education — ${SITE_NAME}\n\nAcademic background and qualifications.\n\n`;
      for (const edu of education) {
        body += `## ${edu.degree} — ${edu.institution}\n\n`;
        body += `*${edu.period}*\n\n${edu.description}\n\n`;
        if (edu.skills?.length) body += `**Skills:** ${edu.skills.join(", ")}\n\n`;
      }
      body += `---\n*Source: ${SITE_URL}/education*\n`;
      return fm(`Education — ${SITE_NAME}`, "Academic background and qualifications.", `${SITE_URL}/education`) + body;
    }
    case "experience": {
      let body = `# Experience — ${SITE_NAME}\n\n`;
      for (const exp of experience) {
        body += `## ${exp.role} — ${exp.company}\n\n*${exp.period}*\n\n${exp.description}\n\n`;
        if ((exp as unknown as { highlights?: string[] }).highlights?.length) {
          for (const h of (exp as unknown as { highlights: string[] }).highlights) body += `- ${h}\n`;
          body += `\n`;
        }
      }
      body += `---\n*Source: ${SITE_URL}/experience*\n`;
      return fm(`Experience — ${SITE_NAME}`, "Work history and internships.", `${SITE_URL}/experience`) + body;
    }
    case "achievements": {
      let body = `# Achievements — ${SITE_NAME}\n\n`;
      for (const a of achievements) {
        body += `## ${a.title}\n\n*${a.date} — ${a.category}*\n\n${a.description}\n\n`;
      }
      body += `---\n*Source: ${SITE_URL}/achievements*\n`;
      return fm(`Achievements — ${SITE_NAME}`, "Certifications, hackathon participation, and technical milestones.", `${SITE_URL}/achievements`) + body;
    }
    case "volunteer": {
      let body = `# Volunteer — ${SITE_NAME}\n\n`;
      for (const v of volunteer) {
        body += `## ${v.role} — ${v.organization}\n\n*${v.period}*\n\n${v.description}\n\n`;
      }
      body += `---\n*Source: ${SITE_URL}/volunteer*\n`;
      return fm(`Volunteer — ${SITE_NAME}`, "Community involvement and volunteer work.", `${SITE_URL}/volunteer`) + body;
    }
    case "faq": {
      const faqItems = [
        {
          question: "What does Shivanshu build?",
          answer:
            "Autonomous AI agents and backend systems — scam-detection agents, RL benchmarking pipelines, voice intelligence tools, and the real-time infrastructure (APIs, databases, event buses) that keeps them running. I also document what didn't work, not just what did.",
        },
        {
          question: "What's his most technically interesting project?",
          answer:
            "Depends what you're looking for. DAITFO is the strongest engineering story — a full RL benchmark that found a simple heuristic beats PPO reinforcement learning, with the failure mode fully diagnosed. Agentic Honeypot is the most polished shipped product — a live AI honeypot that engages real scammers and extracts fraud intelligence, deployed on Render with a public demo.",
        },
        {
          question: "Is he looking for work?",
          answer: "Yes — actively looking for an AI or Software Engineering internship, remote or hybrid.",
        },
        {
          question: "What's his tech stack?",
          answer:
            "Python and JavaScript/TypeScript, with hands-on experience in Google Gemini, Sarvam AI, LangChain, Stable-Baselines3, FastAPI, Django, Node.js, Docker, Redis, PostgreSQL, and Socket.io/WebSockets.",
        },
      ];
      let body = `# FAQ — ${SITE_NAME}\n\n`;
      for (const f of faqItems) {
        body += `## ${f.question}\n\n${f.answer}\n\n`;
      }
      body += `---\n*Source: ${SITE_URL}/faq*\n`;
      return fm(`FAQ — ${SITE_NAME}`, "Frequently asked questions about Shivanshu Tiwari — AI agent engineer and backend systems developer.", `${SITE_URL}/faq`) + body;
    }
    case "blog": {
      const posts = getAllPosts("en");
      let body = `# Blog — ${SITE_NAME}\n\nField notes, repo deep-dives, and technical commentary.\n\n`;
      for (const p of posts) {
        body += `- [${p.frontmatter.title}](${SITE_URL}/blog/${p.frontmatter.slug}): ${p.frontmatter.excerpt}\n`;
      }
      body += `\n---\n*Source: ${SITE_URL}/blog*\n`;
      return fm(`Blog — ${SITE_NAME}`, "Field notes, repo deep-dives, and technical commentary.", `${SITE_URL}/blog`) + body;
    }
    case "developers": {
      let body = `# Developers — Shivanshu Tiwari\n\nDeveloper portal for Shivanshu Tiwari — API docs, OpenAPI, auth, MCP. See ${SITE_URL}/developers.\n\n## Endpoints\n\n- GET /sitemap.xml\n- GET /openapi.json\n- GET /.well-known/api-catalog\n- GET /.well-known/agent-skills/index.json\n\n*Source: ${SITE_URL}/developers*\n`;
      return fm(`Developers — Shivanshu Tiwari`, "Developer portal for Shivanshu Tiwari — API docs, OpenAPI, auth, MCP.", `${SITE_URL}/developers`) + body;
    }
    case ".well-known/api-catalog":
    case ".well-known/api-catalog.json": {
      let body = `# API Catalog — Shivanshu Tiwari\n\nRFC 9727 linkset at ${SITE_URL}/.well-known/api-catalog. See ${SITE_URL}/openapi.json.\n\n`;
      return fm(`API Catalog — Shivanshu Tiwari`, "RFC 9727 API catalog for Shivanshu Tiwari portfolio.", `${SITE_URL}/.well-known/api-catalog`) + body;
    }
    default:
      // Fallback for any other well-known or content page: return generic markdown with heading so .md twin never 404s for valid HTML
      if (key.startsWith(".well-known/") || key === "developers" || key.endsWith(".md")) {
        let body = `# ${key} — Shivanshu Tiwari\n\nContent for ${SITE_URL}/${key}. See ${SITE_URL}/llms.txt for discovery.\n\n`;
        return fm(`${key} — Shivanshu Tiwari`, `Content for ${key} — Shivanshu Tiwari portfolio.`, `${SITE_URL}/${key}`) + body;
      }
      return null;
  }
}

export function aboutMarkdown(): string {
  const body = `# About — Shivanshu Tiwari

> AI-native backend systems engineer — autonomous agents, LLM pipelines, and concurrency-safe backend systems.

I don't just use AI — I build things with it that keep running after I close my laptop. I'm a third-year B.Tech CS & IT student in Bhopal (SIRT Bhopal, RGPV — Class of 2027), and over the past year I've built autonomous agents, LLM pipelines, voice intelligence tools, and RL benchmarking systems across 19 documented projects — some shipped and deployed, some deliberately stopped short of production so I could document what actually worked and what didn't.

## How I work

I'm not interested in demos that only look good in a pitch. When something fails — an RL agent losing to a simple heuristic, a classifier scoring 25% instead of the 90% I hoped for — I keep the result and figure out why, instead of reframing it until it sounds better. That honest-documentation approach is visible in my case studies: DAITFO documents a negative result (the heuristic beat PPO on every metric) as the finding itself, and CloudAuditEnv explicitly flags unverified benchmark scores and missing seed support.

The standard I hold my own work to: the system owns the task completely — no human in the loop to patch over gaps.

## What I build

- **Autonomous AI agents** — e.g., Agentic Honeypot (Gemini 2.0 Flash scam-baiting agent extracting 8 entity types of fraud intelligence)
- **Voice AI** — e.g., Samvad (Sarvam AI speech-to-text, 3-phase transcript refinement with hallucination gate, ReAct task extraction)
- **RL systems** — e.g., DAITFO (custom Gymnasium environment wrapping SUMO, 27 controlled runs benchmarking PPO vs. heuristic)
- **Backend infrastructure** — FastAPI, Django, Node.js/Express, Docker, Redis, PostgreSQL, Celery, Socket.io, NATS JetStream

## Background

B.Tech Computer Science & Information Technology, Sagar Institute of Research and Technology (SIRT), Bhopal — affiliated to Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV), Class of 2027. Based in Bhopal, India — open to remote and hybrid internships.

## Links

- GitHub: ${SOCIAL.github}
- LinkedIn: ${SOCIAL.linkedin}
- Email: ${SOCIAL.email.replace("mailto:", "")}
- Website: ${SITE_URL}

---
*Source: ${SITE_URL}/about — Draft expanded bio. Awaiting Shivanshu's review for final wording.*
`;
  return fm("About — Shivanshu Tiwari", "AI-native backend systems engineer — autonomous agents, LLM pipelines, and concurrency-safe backend systems.", `${SITE_URL}/about`) + body;
}

export function privacyMarkdown(): string {
  const body = `# Privacy Policy — shivanshutiwari.in

> This is a personal portfolio site. No analytics beyond Vercel's default hosting logs and optional Vercel Analytics pageview counts. No cookies except a role-preference cookie for the AI/Backend view toggle.

*Effective date: 2026-08-30 — Draft awaiting Shivanshu's review for accuracy.*

## What this site does

This is a static personal portfolio — not a SaaS product, not an e-commerce store. It presents projects, blog posts, and contact information.

## Data collection

- **Hosting logs:** Vercel (the hosting provider) logs basic request metadata (IP, user-agent, path) for operational and security purposes per Vercel's own privacy policy.
- **Vercel Analytics:** This site includes \`@vercel/analytics\` which counts pageviews without setting tracking cookies or collecting personal data. See [Vercel Analytics privacy](https://vercel.com/docs/analytics/privacy-policy).
- **Contact form:** If you use the contact form, your name, email, and message are sent to a Google Sheet via Google Sheets API. No data is sold or shared beyond that. The form includes rate-limiting (5 requests per IP window) and honeypot spam protection.
- **No other tracking:** No Google Analytics, Plausible, advertising pixels, or third-party cookies are in use as of this writing. Verify in \`src/app/layout.tsx\` and \`src/lib/analytics.ts\`.

## Cookies

- \`role\` — stores your preference for the AI Engineer vs Backend Systems view. SameSite=Lax, 1-year expiry. No tracking purpose.
- No consent banner is shown because no advertising/analytics cookies are set.

## Contact

If you have questions about data handling, reach out via the [contact page](${SITE_URL}/contact) or email ${SOCIAL.email.replace("mailto:", "")}.

---
*Source: ${SITE_URL}/privacy — Claims above were derived from codebase inspection (layout.tsx, analytics.ts, proxy.ts). Verify before publishing.*
`;
  return fm("Privacy Policy — shivanshutiwari.in", "Personal portfolio privacy — hosting logs, Vercel Analytics, contact form only.", `${SITE_URL}/privacy`) + body;
}

export function contactMarkdown(): string {
  const body = `# Contact — Shivanshu Tiwari

> Get in touch about internships, collaborations, or project questions. I prefer email for initial contact.

Have a question, project idea, or just want to say hi? Drop a message via the form at ${SITE_URL}/contact or reach me directly.

## How to reach me

- **Email:** ${SOCIAL.email.replace("mailto:", "")} (preferred for internships and detailed inquiries)
- **GitHub:** ${SOCIAL.github}
- **LinkedIn:** ${SOCIAL.linkedin}
- **Contact form:** ${SITE_URL}/contact — name, email, and message (min 10 chars) sent to a Google Sheet; rate-limited and spam-filtered.

## What to reach out about

- AI/Software Engineering internships (remote or hybrid) — actively looking
- Collaborations on agent systems, LLM pipelines, or backend infrastructure
- Questions about any of the 19 documented projects (especially DAITFO, Agentic Honeypot, Samvad, PayoutEngine, CloudAuditEnv)
- Feedback on honest-documentation approach or case-study methodology

## Response time

I aim to respond within 2–3 days. If you haven't heard back, a follow-up via email is welcome.

---
*Source: ${SITE_URL}/contact*
`;
  return fm("Contact — Shivanshu Tiwari", "Get in touch about internships, collaborations, or project questions.", `${SITE_URL}/contact`) + body;
}
