# Authentication Guide — Shivanshu Tiwari Portfolio API

This guide defines the authentication protocol, credentials, and identity assertions for the **Shivanshu Tiwari Portfolio API** following the [WorkOS auth.md specification](https://github.com/workos/auth.md).

The portfolio provides public read-only access alongside an authenticated contact and testing surface. Browsing projects, blog posts, documentation, and the MCP servers requires **no credentials or bearer tokens**.

---

## Discover

Clients and autonomous AI agents discover authentication endpoints and protected resource metadata via standard RFC 8414 and RFC 9207 discovery URIs:

* **Protected Resource Metadata:** `https://shivanshutiwari.in/.well-known/oauth-protected-resource`
* **Authorization Server Metadata:** `https://shivanshutiwari.in/.well-known/oauth-authorization-server`
* **API Catalog (RFC 9727):** `https://shivanshutiwari.in/.well-known/api-catalog`
* **OpenAPI 3.0.3 Specification:** `https://shivanshutiwari.in/openapi.json`
* **WWW-Authenticate Challenge:** When authentication is required or challenged, endpoints emit:
  ```http
  WWW-Authenticate: Bearer resource_metadata="https://shivanshutiwari.in/.well-known/oauth-protected-resource"
  ```

---

## Pick a method

Supported authentication and identity verification methods for human developers and autonomous agents:

1. `anonymous` — **Default**. Used for all read operations (portfolio project queries, documentation, llms.txt, MCP tool execution, blog posts). No credentials required.
2. `identity_assertion` — Autonomous agents identifying themselves may supply an identity assertion token (`urn:ietf:params:oauth:token-type:id-jag` or signed JWT) in the `Authorization` header.
3. `service_auth` — Ephemeral test API keys for automated integration testing in the sandbox environment. Generated on demand via `POST https://shivanshutiwari.in/api/v1/keys`.

---

## Register

* **Anonymous access:** Zero registration required. Agents and scrapers may query endpoints immediately without onboarding friction.
* **Agent identification:** Agents registering their identity assertion pass their agent card identifier or public JWKS URI during initial handshake.
* **Sandbox keys:** Self-serve instant test key provisioning via `POST https://shivanshutiwari.in/api/v1/keys`.

---

## Claim

Submit contact inquiries and collaboration requests:

* **Endpoint:** `POST https://shivanshutiwari.in/api/v1/contact`
* **Idempotency:** Include the `Idempotency-Key` HTTP header containing a unique UUIDv4 string for safe request retry.
* **Payload:** `{ "name": "...", "email": "...", "message": "..." }`
* **Sandbox testing:** Submissions to `POST https://shivanshutiwari.in/api/v1/sandbox/contact` simulate end-to-end delivery without sending external emails.

---

## Exchange

Because read operations are open to everyone, token exchange is optional:

* For `anonymous` requests, callers proceed directly to resource requests without exchanging a secret code.
* For `identity_assertion`, agents asserting an ID-JAG token (`urn:ietf:params:oauth:token-type:id-jag`) exchange their assertion for an ephemeral scoped access token at the token endpoint, or provide the assertion directly as a Bearer token.
* For `service_auth`, the test API key is returned immediately in the JSON response of `POST https://shivanshutiwari.in/api/v1/keys`.

---

## Use the access_token

Pass credentials in the standard HTTP `Authorization` header:

```bash
# Read requests (Anonymous — default)
curl -H "Accept: text/markdown" https://shivanshutiwari.in/about
curl -H "Accept: application/json" https://shivanshutiwari.in/api/v1/projects

# Authenticated request with Bearer token
curl -H "Authorization: Bearer <access_token>" \
     -H "Content-Type: application/json" \
     https://shivanshutiwari.in/api/v1/projects

# Idempotent contact submission
curl -X POST https://shivanshutiwari.in/api/v1/contact \
     -H "Content-Type: application/json" \
     -H "Idempotency-Key: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d" \
     -d '{"name": "Agent Aria", "email": "aria@example.com", "message": "Internship opportunity inquiry"}'
```

---

## Errors

The API returns standard RFC 7807 problem details and RFC 6750 OAuth error responses:

* `401 Unauthorized` — Emitted when invalid credentials are provided. Includes `WWW-Authenticate: Bearer resource_metadata="https://shivanshutiwari.in/.well-known/oauth-protected-resource", error="invalid_token"`.
* `403 Forbidden` — Emitted when an operation exceeds granted scopes. Includes `error="insufficient_scope"`.
* `429 Too Many Requests` — Emitted when IP rate limits are exceeded (default: 60 requests/minute). Includes `Retry-After: <seconds>` and `RateLimit-*` headers.
* `400 Bad Request` — Emitted on validation errors with machine-readable error codes and resolution hints.

---

## Revocation

* **Stateless sessions:** Public read sessions require no revocation.
* **Sandbox keys:** Ephemeral sandbox API keys automatically expire after 24 hours.
* **Token revocation:** Revocation signals may be broadcast to `https://shivanshutiwari.in/.well-known/oauth-protected-resource`.

---

## agent_auth

Standard machine-readable authentication manifest for autonomous agent frameworks:

```json
{
  "identity_endpoint": "https://shivanshutiwari.in/api/v1/contact",
  "identity_types_supported": [
    "anonymous",
    "identity_assertion",
    "service_auth"
  ],
  "identity_assertion": {
    "assertion_types_supported": [
      "urn:ietf:params:oauth:token-type:id-jag"
    ]
  },
  "skill": "https://shivanshutiwari.in/auth.md",
  "claim_endpoint": "https://shivanshutiwari.in/api/v1/contact",
  "events_endpoint": "https://shivanshutiwari.in/.well-known/oauth-protected-resource",
  "authorization_server": "https://shivanshutiwari.in/.well-known/oauth-authorization-server",
  "protected_resource": "https://shivanshutiwari.in/.well-known/oauth-protected-resource"
}
```
