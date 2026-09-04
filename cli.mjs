#!/usr/bin/env node
const SITE_URL = "https://shivanshutiwari.in";

const args = process.argv.slice(2);
const cmd = args[0]?.toLowerCase();

async function run() {
  console.log(`Shivanshu Tiwari CLI (sht-portfolio-v2) — ${SITE_URL}\n`);

  if (cmd === "projects" || cmd === "list") {
    try {
      const res = await fetch(`${SITE_URL}/api/v1/projects?limit=10`).then((r) => r.json());
      console.log(JSON.stringify(res, null, 2));
    } catch {
      console.log("Could not reach live API. Fallback: curl " + SITE_URL + "/api/v1/projects");
    }
  } else if (cmd === "project" && args[1]) {
    try {
      const res = await fetch(`${SITE_URL}/api/v1/projects/${args[1]}`).then((r) => r.json());
      console.log(JSON.stringify(res, null, 2));
    } catch {
      console.log(`Could not fetch project '${args[1]}'. See ${SITE_URL}/#projects`);
    }
  } else if (cmd === "sandbox") {
    try {
      const res = await fetch(`${SITE_URL}/api/v1/sandbox/ping`).then((r) => r.json());
      console.log("Sandbox Status:", JSON.stringify(res, null, 2));
    } catch {
      console.log("Sandbox active at " + SITE_URL + "/api/v1/sandbox");
    }
  } else if (cmd === "keys") {
    try {
      const res = await fetch(`${SITE_URL}/api/v1/keys`, { method: "POST" }).then((r) => r.json());
      console.log("Generated Test Key:", JSON.stringify(res, null, 2));
    } catch {
      console.log("Self-serve keys at POST " + SITE_URL + "/api/v1/keys");
    }
  } else if (cmd === "docs" || cmd === "llms") {
    try {
      const text = await fetch(`${SITE_URL}/llms.txt`).then((r) => r.text());
      console.log(text.slice(0, 1000) + "\n...\nFull text at: " + SITE_URL + "/llms.txt");
    } catch {
      console.log("Docs available at " + SITE_URL + "/developers");
    }
  } else if (cmd === "mcp") {
    console.log(`MCP Servers:
- Product Actions: POST ${SITE_URL}/mcp (Streamable HTTP)
- Documentation:   POST ${SITE_URL}/mcp/docs (Streamable HTTP)
- Manifest:        ${SITE_URL}/.well-known/mcp/server-card.json`);
  } else if (cmd === "contact") {
    console.log(`Submit contact inquiry:
POST ${SITE_URL}/api/v1/contact
Headers: Content-Type: application/json, Idempotency-Key: <uuid>
Body: {"name": "...", "email": "...", "message": "..."}`);
  } else {
    console.log(`Commands:
  shivanshu projects          List portfolio projects
  shivanshu project <slug>    Get detailed project architecture & findings
  shivanshu sandbox           Check sandbox test environment
  shivanshu keys              Generate instant test API key
  shivanshu docs              View curated LLM documentation (llms.txt)
  shivanshu mcp               Show Model Context Protocol connection info
  shivanshu contact           Show contact submission specifications

Developer Portal: https://shivanshutiwari.in/developers`);
  }
}

run();
