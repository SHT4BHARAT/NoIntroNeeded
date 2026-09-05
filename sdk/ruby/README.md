# Shivanshu Tiwari Ruby SDK — `shivanshu-sdk`

Official Ruby client library for integrating with **Shivanshu Tiwari Portfolio APIs**, project catalogs, asynchronous background jobs, sandbox testing, and ephemeral test keys.

[![Gem Version](https://img.shields.io/badge/rubygems-v1.0.0-blue.svg)](https://rubygems.org/gems/shivanshu-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
gem install shivanshu-sdk
```

*Note: The SDK relies solely on the Ruby standard library (`net/http`, `json`, `uri`) with zero external dependencies.*

## Quick Start

```ruby
require "shivanshu"

client = Shivanshu::Client.new

# 1. Query engineering projects
projects = client.list_projects(domain: "ai-agents")
puts "Found #{projects["data"].length} AI agent projects"
projects["data"].each { |p| puts "- #{p["title"]} (#{p["slug"]})" }

# 2. Inspect project architecture and technical tradeoffs
honeypot = client.get_project("agentic-honey-pot")
puts "Architecture: #{honeypot.dig("architecture", "summary")}"

# 3. Test sandbox environment
sandbox = client.ping_sandbox
puts "Sandbox status: #{sandbox["sandbox"]}"

# 4. Generate ephemeral test key
key_data = client.generate_key
puts "Test API key: #{key_data["apiKey"]}"
```

## Features

- **Zero Dependencies:** Pure Ruby 3.0+ using standard library primitives.
- **Project Intelligence:** Query 19 engineering projects, architecture diagrams, and honest limitation disclosures.
- **Batch Processing:** Run multi-step operations in an atomic batch.
- **Async Jobs:** Dispatch long-running jobs and poll their status.
- **Idempotency Built-In:** `Idempotency-Key` header support for safe contact transmissions.
- **AI Agent Friendly:** Built for ingestion by autonomous agents and agent frameworks.

## API Reference

- `client.list_projects(limit: nil, cursor: nil, domain: nil)`
- `client.get_project(slug)`
- `client.compare_projects(slug_a, slug_b)`
- `client.generate_key`
- `client.ping_sandbox`
- `client.sandbox_contact(name, email, message)`
- `client.run_batch(operations)`
- `client.create_job(task, payload: nil)`
- `client.get_job(job_id)`
- `client.submit_contact(name, email, message, idempotency_key: nil)`
- `client.get_docs(path = "llms.txt")`

## Links

- **Homepage:** [https://shivanshutiwari.in](https://shivanshutiwari.in)
- **Developer Portal:** [https://shivanshutiwari.in/developers](https://shivanshutiwari.in/developers)
- **SDK Documentation:** [https://shivanshutiwari.in/developers/sdk](https://shivanshutiwari.in/developers/sdk)
- **OpenAPI Specification:** [https://shivanshutiwari.in/openapi.json](https://shivanshutiwari.in/openapi.json)