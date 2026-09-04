# Shivanshu Tiwari Go SDK

Official Go client library for the **Shivanshu Tiwari Portfolio APIs**, project intelligence, asynchronous background jobs, and sandbox environments.

[![Go Reference](https://pkg.go.dev/badge/github.com/SHT4BHARAT/NoIntroNeeded/sdk/go.svg)](https://pkg.go.dev/github.com/SHT4BHARAT/NoIntroNeeded/sdk/go)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
go get github.com/SHT4BHARAT/NoIntroNeeded/sdk/go
```

## Quick Start

```go
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/SHT4BHARAT/NoIntroNeeded/sdk/go"
)

func main() {
	ctx := context.Background()
	client := shivanshu.NewClient()

	// 1. List engineering projects
	projects, err := client.ListProjects(ctx, "ai-agents", 10, "")
	if err != nil {
		log.Fatalf("Failed to list projects: %v", err)
	}
	fmt.Printf("Retrieved %d AI agent projects:\n", len(projects.Data))
	for _, p := range projects.Data {
		fmt.Printf("- %s (%s)\n", p.Title, p.Slug)
	}

	// 2. Fetch project details
	details, err := client.GetProject(ctx, "agentic-honey-pot")
	if err != nil {
		log.Fatalf("Failed to get project: %v", err)
	}
	fmt.Printf("Architecture: %s\n", details.Architecture.Summary)

	// 3. Ping sandbox
	sandbox, err := client.PingSandbox(ctx)
	if err != nil {
		log.Fatalf("Failed to ping sandbox: %v", err)
	}
	fmt.Printf("Sandbox active: %v\n", sandbox.Sandbox)
}
```

## Features

- Context-aware methods (`context.Context`).
- Configurable base URL, API keys, and HTTP clients.
- Clean typed structs for all 19 portfolio projects, batch operations, and responses.
- Ephemeral test API key generation and sandbox validation.

## Documentation & Links

- **Developer Portal:** [https://shivanshutiwari.in/developers](https://shivanshutiwari.in/developers)
- **CLI Tool:** [https://shivanshutiwari.in/developers/cli](https://shivanshutiwari.in/developers/cli)
- **OpenAPI Specification:** [https://shivanshutiwari.in/openapi.json](https://shivanshutiwari.in/openapi.json)
