#!/usr/bin/env node
"use strict";
/**
 * Shivanshu Tiwari Portfolio CLI (sht / shivanshu)
 * Official CLI tool published on npm: sht-portfolio-v2
 */
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const client = new index_1.ShivanshuClient({
    baseUrl: process.env.SHIVANSHU_API_URL || "https://shivanshutiwari.in",
    apiKey: process.env.SHIVANSHU_API_KEY,
});
async function main() {
    const args = process.argv.slice(2);
    const command = args[0] || "help";
    try {
        switch (command) {
            case "help":
            case "--help":
            case "-h":
                console.log(`
Shivanshu Tiwari Portfolio CLI & Developer SDK

Usage:
  npx sht-portfolio-v2 <command> [options]
  shivanshu <command> [options]
  sht <command> [options]

Commands:
  projects          List all engineering projects (AI agents, RL, backend)
  project <slug>    Get detailed architecture and results for a project
  ping              Test sandbox and connectivity to shivanshutiwari.in
  key               Generate an ephemeral self-serve developer API key
  docs              Print developer documentation links

Environment Variables:
  SHIVANSHU_API_URL  Custom base URL (default: https://shivanshutiwari.in)
  SHIVANSHU_API_KEY  API key for authenticated endpoints
`);
                break;
            case "projects":
                const projects = await client.projects.list({ limit: 50 });
                console.log(`Found ${projects.data.length} projects on shivanshutiwari.in:\n`);
                projects.data.forEach((p) => {
                    console.log(`- ${p.title} (${p.slug})`);
                    console.log(`  Stack: ${p.stack.join(", ")}`);
                    console.log(`  Highlights: ${p.highlights.join("; ")}\n`);
                });
                break;
            case "project":
                const slug = args[1];
                if (!slug) {
                    console.error("Error: Please provide a project slug. Example: shivanshu project honeypot-agent");
                    process.exit(1);
                }
                const proj = await client.projects.get(slug);
                console.log(JSON.stringify(proj, null, 2));
                break;
            case "ping":
                const ping = await client.sandbox.ping();
                console.log("Sandbox Ping Status:", JSON.stringify(ping, null, 2));
                break;
            case "key":
                const key = await client.keys.generate();
                console.log("Generated Ephemeral API Key:", JSON.stringify(key, null, 2));
                break;
            case "docs":
                console.log(`
Official Developer Links:
- Developer Portal: https://shivanshutiwari.in/developers
- SDK Reference:    https://shivanshutiwari.in/developers/sdk
- OpenAPI Spec:     https://shivanshutiwari.in/openapi.json
- LLMs.txt:         https://shivanshutiwari.in/llms.txt
- AGENTS.md:        https://shivanshutiwari.in/AGENTS.md
- SKILL.md:         https://shivanshutiwari.in/SKILL.md
- MCP Server:       https://shivanshutiwari.in/mcp
`);
                break;
            default:
                console.error(`Unknown command: ${command}. Run "shivanshu help" for available commands.`);
                process.exit(1);
        }
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("CLI Error:", message);
        process.exit(1);
    }
}
main();
