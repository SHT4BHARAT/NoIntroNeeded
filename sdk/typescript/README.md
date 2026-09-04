# Shivanshu Tiwari SDK for TypeScript & Node.js

Official typed client library for integrating with **Shivanshu Tiwari Portfolio APIs**, project catalogs, asynchronous background jobs, Model Context Protocol (MCP), and sandbox environments.

[![npm version](https://img.shields.io/badge/npm-v1.0.0-blue.svg)](https://www.npmjs.com/package/sht-portfolio-v2)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install sht-portfolio-v2
# or
pnpm add sht-portfolio-v2
# or
yarn add sht-portfolio-v2
```

## Quick Start

```typescript
import { ShivanshuClient } from "sht-portfolio-v2";

const client = new ShivanshuClient();

async function main() {
  // 1. List engineering projects
  const { data: projects } = await client.projects.list({ domain: "ai-agents" });
  console.log(`Found ${projects.length} AI agent projects:`);
  for (const p of projects) {
    console.log(`- ${p.title} (${p.slug})`);
  }

  // 2. Fetch specific project architecture
  const honeypot = await client.projects.get("agentic-honey-pot");
  console.log("Architecture:", honeypot.architecture?.summary);

  // 3. Test sandbox environment
  const sandbox = await client.sandbox.ping();
  console.log("Sandbox active:", sandbox.sandbox);

  // 4. Generate ephemeral test API key
  const keyInfo = await client.keys.generate();
  console.log("Test Key:", keyInfo.apiKey);
}

main().catch(console.error);
```

## Features

- **Strictly Typed:** Full TypeScript interfaces for all 19 projects, payloads, and responses.
- **Zero Heavy Dependencies:** Uses native standard `fetch` and modern Web APIs.
- **Sandbox Testing:** Ephemeral key generation and isolated test endpoints.
- **Batch Processing:** Combine multiple API operations into a single atomic round-trip.
- **Async Jobs:** Polling helper `client.jobs.waitFor(jobId)` for long-running executions.
- **Idempotency Built-In:** Automatic idempotency headers for safe form/contact transmissions.

## API Reference

### `client.projects`
- `client.projects.list(options?: { limit?: number; cursor?: string; domain?: string })`
- `client.projects.get(slug: string)`
- `client.projects.compare(slugA: string, slugB: string)`

### `client.batch`
- `client.batch.run(operations: BatchOperation[])`

### `client.jobs`
- `client.jobs.create(task: string, payload?: Record<string, unknown>)`
- `client.jobs.get(jobId: string)`
- `client.jobs.waitFor(jobId: string, pollIntervalMs?: number, maxWaitMs?: number)`

### `client.keys`
- `client.keys.generate()`: Generates a 24-hour test key (`Authorization: Bearer <key>`).

### `client.sandbox`
- `client.sandbox.ping()`
- `client.sandbox.contact(data: ContactSubmission)`

### `client.docs`
- `client.docs.get(path?: string)`: Retrieves raw markdown twins or `llms.txt`.

## Documentation & Links

- **Developer Portal:** [https://shivanshutiwari.in/developers](https://shivanshutiwari.in/developers)
- **CLI Tool Guide:** [https://shivanshutiwari.in/developers/cli](https://shivanshutiwari.in/developers/cli)
- **OpenAPI Specification:** [https://shivanshutiwari.in/openapi.json](https://shivanshutiwari.in/openapi.json)
