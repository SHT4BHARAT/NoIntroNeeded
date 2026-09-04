#!/usr/bin/env node
/**
 * Official CLI tool for Shivanshu Tiwari Portfolio & APIs
 * Usage: npx shivanshu <command> [options]
 * Package: sht-portfolio-v2
 */

const SITE_URL = process.env.SHIVANSHU_API_URL || "https://shivanshutiwari.in";
const VERSION = "1.0.0";

const rawArgs = process.argv.slice(2);
const isJson = rawArgs.includes("--json");
const args = rawArgs.filter((a) => !a.startsWith("--"));
const cmd = args[0]?.toLowerCase();

function printHelp() {
  console.log(`
Shivanshu Tiwari CLI (v${VERSION})
Official command-line tool for exploring engineering projects, developer APIs, and AI integrations.

Usage:
  npx shivanshu <command> [arguments] [options]
  npm install -g sht-portfolio-v2 && shivanshu <command>

Commands:
  projects [domain]              List portfolio projects (domains: ai-agents, backend, voice-ai, rl)
  project <slug>                 Get comprehensive technical details, architecture & tradeoffs
  compare <slugA> <slugB>        Compare two projects side-by-side
  batch                          Execute sample multi-operation batch request
  jobs [jobId]                   Create or inspect asynchronous background job
  keys                           Generate ephemeral sandbox API key for testing
  sandbox                        Verify sandbox environment connectivity
  mcp                            Inspect Model Context Protocol server configuration
  docs [path]                    View curated documentation (llms.txt, about, developers)
  pricing                        Inspect access tiers and rate limits
  contact <name> <email> <msg>   Submit an inquiry or internship proposal

Options:
  --json                         Output raw JSON response for scripting / agent ingestion
  --help, -h                     Show this help message
  --version, -v                  Show CLI version

Documentation: ${SITE_URL}/developers/cli
Developer Portal: ${SITE_URL}/developers
`);
}

async function run() {
  if (rawArgs.includes("--help") || rawArgs.includes("-h") || !cmd) {
    printHelp();
    process.exit(0);
  }

  if (rawArgs.includes("--version") || rawArgs.includes("-v")) {
    console.log(`shivanshu v${VERSION}`);
    process.exit(0);
  }

  try {
    switch (cmd) {
      case "projects":
      case "list": {
        const domain = args[1];
        const query = domain ? `?domain=${encodeURIComponent(domain)}` : "";
        const res = await fetch(`${SITE_URL}/api/v1/projects${query}`);
        const data = await res.json();
        if (isJson) {
          console.log(JSON.stringify(data, null, 2));
        } else {
          console.log(`Projects on ${SITE_URL} (${data.data?.length || 0} found):`);
          (data.data || []).forEach((p) => {
            console.log(`  • ${p.title} [${p.slug}] - ${p.domain}`);
            console.log(`    ${p.tagline}`);
            console.log(`    Stack: ${(p.stack || []).join(", ")}\n`);
          });
        }
        break;
      }

      case "project": {
        const slug = args[1];
        if (!slug) {
          console.error("Error: Please provide a project slug. Example: shivanshu project agentic-honey-pot");
          process.exit(1);
        }
        const res = await fetch(`${SITE_URL}/api/v1/projects/${encodeURIComponent(slug)}`);
        if (!res.ok) {
          console.error(`Project '${slug}' not found (HTTP ${res.status}). Run 'shivanshu projects' to see available slugs.`);
          process.exit(1);
        }
        const data = await res.json();
        if (isJson) {
          console.log(JSON.stringify(data, null, 2));
        } else {
          console.log(`\n=== ${data.title} ===`);
          console.log(`Slug: ${data.slug} | Domain: ${data.domain}`);
          console.log(`Tagline: ${data.tagline}\n`);
          console.log(`Stack: ${(data.stack || []).join(", ")}`);
          if (data.architecture) {
            console.log(`\nArchitecture:\n${data.architecture.summary || ""}`);
          }
          if (data.results) {
            console.log(`\nOutcomes:\n${data.results.summary || ""}`);
          }
        }
        break;
      }

      case "compare": {
        const slugA = args[1];
        const slugB = args[2];
        if (!slugA || !slugB) {
          console.error("Error: Please provide two slugs to compare. Example: shivanshu compare agentic-honey-pot samvad");
          process.exit(1);
        }
        const [resA, resB] = await Promise.all([
          fetch(`${SITE_URL}/api/v1/projects/${encodeURIComponent(slugA)}`).then((r) => r.json()),
          fetch(`${SITE_URL}/api/v1/projects/${encodeURIComponent(slugB)}`).then((r) => r.json()),
        ]);
        const comparison = { projectA: resA, projectB: resB };
        if (isJson) {
          console.log(JSON.stringify(comparison, null, 2));
        } else {
          console.log(`\nComparison: ${resA.title || slugA} vs ${resB.title || slugB}`);
          console.log(`  Domain:    ${resA.domain} vs ${resB.domain}`);
          console.log(`  Stack A:   ${(resA.stack || []).join(", ")}`);
          console.log(`  Stack B:   ${(resB.stack || []).join(", ")}`);
        }
        break;
      }

      case "keys": {
        const res = await fetch(`${SITE_URL}/api/v1/keys`, { method: "POST" });
        const data = await res.json();
        if (isJson) {
          console.log(JSON.stringify(data, null, 2));
        } else {
          console.log("\nEphemeral Sandbox API Key Generated:");
          console.log(`  Key:        ${data.apiKey}`);
          console.log(`  Tier:       ${data.tier}`);
          console.log(`  Rate Limit: ${data.rateLimit} req/min`);
          console.log(`  Expires At: ${data.expiresAt}`);
          console.log("\nUse in headers: Authorization: Bearer " + data.apiKey);
        }
        break;
      }

      case "sandbox": {
        const res = await fetch(`${SITE_URL}/api/v1/sandbox/ping`);
        const data = await res.json();
        if (isJson) {
          console.log(JSON.stringify(data, null, 2));
        } else {
          console.log("\nSandbox Environment Status:");
          console.log(`  Healthy:     ${data.pong ? "YES" : "NO"}`);
          console.log(`  Sandbox Mode: ${data.sandbox ? "ACTIVE" : "INACTIVE"}`);
          console.log(`  X-Sandbox:    ${res.headers.get("x-sandbox") || "true"}`);
          console.log(`  Ping URL:     ${SITE_URL}/api/v1/sandbox/ping`);
        }
        break;
      }

      case "batch": {
        const body = {
          operations: [
            { id: "op_1", op: "list_projects" },
            { id: "op_2", op: "get_status" },
          ],
        };
        const res = await fetch(`${SITE_URL}/api/v1/batch`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        console.log(JSON.stringify(data, null, 2));
        break;
      }

      case "jobs": {
        const jobId = args[1];
        if (jobId) {
          const res = await fetch(`${SITE_URL}/api/v1/jobs/${encodeURIComponent(jobId)}`);
          const data = await res.json();
          console.log(JSON.stringify(data, null, 2));
        } else {
          const res = await fetch(`${SITE_URL}/api/v1/jobs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ task: "cli-sample-evaluation" }),
          });
          console.log(`Status: ${res.status} Accepted`);
          console.log(`Location: ${res.headers.get("Location")}`);
          const data = await res.json();
          console.log(JSON.stringify(data, null, 2));
        }
        break;
      }

      case "mcp": {
        const info = {
          productServer: {
            url: `${SITE_URL}/mcp`,
            transport: "streamable-http",
            card: `${SITE_URL}/.well-known/mcp/server-card.json`,
          },
          docsServer: {
            url: `${SITE_URL}/mcp/docs`,
            transport: "streamable-http",
            card: `${SITE_URL}/.well-known/mcp/docs/server-card.json`,
          },
          manifest: `${SITE_URL}/.well-known/mcp.json`,
          catalog: `${SITE_URL}/.well-known/mcp-servers.json`,
        };
        if (isJson) {
          console.log(JSON.stringify(info, null, 2));
        } else {
          console.log("\nModel Context Protocol (MCP) Endpoints:");
          console.log(`  Product Actions: POST ${SITE_URL}/mcp`);
          console.log(`  Documentation:   POST ${SITE_URL}/mcp/docs`);
          console.log(`  Discovery JSON:  ${SITE_URL}/.well-known/mcp.json`);
        }
        break;
      }

      case "docs":
      case "llms": {
        const path = args[1] || "llms.txt";
        const url = path.endsWith(".txt") || path.endsWith(".md") ? `${SITE_URL}/${path}` : `${SITE_URL}/${path}.md`;
        const res = await fetch(url);
        const text = await res.text();
        console.log(text);
        break;
      }

      case "pricing": {
        const res = await fetch(`${SITE_URL}/pricing.md`);
        const text = await res.text();
        console.log(text);
        break;
      }

      case "contact": {
        const [name, email, ...msgParts] = args.slice(1);
        const message = msgParts.join(" ");
        if (!name || !email || !message) {
          console.log("Usage: shivanshu contact <name> <email> <message>");
          console.log("Example: shivanshu contact 'Aria Agent' aria@example.com 'Collaborating on voice AI'");
          process.exit(1);
        }
        const res = await fetch(`${SITE_URL}/api/v1/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Idempotency-Key": `cli_${Date.now()}`,
          },
          body: JSON.stringify({ name, email, message }),
        });
        const data = await res.json();
        console.log(JSON.stringify(data, null, 2));
        break;
      }

      default: {
        console.error(`Unknown command '${cmd}'. Run 'shivanshu --help' for available commands.`);
        process.exit(1);
      }
    }
  } catch (err) {
    console.error(`Error executing '${cmd}':`, err.message);
    process.exit(1);
  }
}

run();
