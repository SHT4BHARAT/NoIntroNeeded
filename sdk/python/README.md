# Shivanshu Tiwari Python SDK (`shivanshu-sdk`)

Official Python client library for integrating with **Shivanshu Tiwari Portfolio APIs**, project catalogs, asynchronous background jobs, Model Context Protocol (MCP), and sandbox testing.

[![PyPI version](https://img.shields.io/badge/pypi-v1.0.0-blue.svg)](https://pypi.org/project/shivanshu-sdk/)
[![Python 3.9+](https://img.shields.io/badge/python-3.9+-brightgreen.svg)](https://www.python.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
pip install shivanshu-sdk
```

*Note: The SDK relies solely on the Python standard library with zero external dependencies.*

## Quick Start

```python
from shivanshu import ShivanshuClient

# Initialize client (uses https://shivanshutiwari.in by default)
client = ShivanshuClient()

# 1. Query engineering projects
res = client.list_projects(domain="ai-agents")
print(f"Total projects: {len(res['data'])}")
for proj in res["data"]:
    print(f"- {proj['title']} ({proj['slug']})")

# 2. Inspect project architecture and technical tradeoffs
project = client.get_project("agentic-honey-pot")
print("Architecture:", project.get("architecture", {}).get("summary"))

# 3. Test sandbox environment
sandbox = client.ping_sandbox()
print("Sandbox status:", sandbox)

# 4. Generate ephemeral sandbox key
key_data = client.generate_key()
print("Test API key:", key_data["apiKey"])
```

## Features

- **Zero Dependencies:** Pure Python 3.9+ using standard `urllib` and `json`.
- **Project Intelligence:** Query 19 engineering projects, architecture diagrams, and honest limitation disclosures.
- **Batch Processing:** Run multi-step operations in an atomic batch.
- **Async Polling:** Built-in `wait_for_job(job_id)` helper.
- **AI Agent Friendly:** Built for ingestion by autonomous agents, LangChain tools, and AutoGen systems.

## API Reference

- `client.list_projects(limit=20, cursor=None, domain=None)`
- `client.get_project(slug)`
- `client.compare_projects(slug_a, slug_b)`
- `client.generate_key()`
- `client.ping_sandbox()`
- `client.sandbox_contact(name, email, message)`
- `client.run_batch(operations)`
- `client.create_job(task, payload=None)`
- `client.get_job(job_id)`
- `client.wait_for_job(job_id, poll_interval=1.0, timeout=30.0)`
- `client.submit_contact(name, email, message, idempotency_key=None)`
- `client.get_docs(path="llms.txt")`

## Links

- **Developer Portal:** [https://shivanshutiwari.in/developers](https://shivanshutiwari.in/developers)
- **CLI Tool:** [https://shivanshutiwari.in/developers/cli](https://shivanshutiwari.in/developers/cli)
- **OpenAPI Spec:** [https://shivanshutiwari.in/openapi.json](https://shivanshutiwari.in/openapi.json)
