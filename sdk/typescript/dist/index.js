"use strict";
/**
 * Official TypeScript/JavaScript SDK for Shivanshu Tiwari Portfolio APIs
 * Documentation: https://shivanshutiwari.in/developers/sdk
 * Repository: https://github.com/SHT4BHARAT/NoIntroNeeded/tree/main/sdk/typescript
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShivanshuClient = exports.ShivanshuAPIError = void 0;
class ShivanshuAPIError extends Error {
    status;
    body;
    constructor(message, status, body) {
        super(message);
        this.name = "ShivanshuAPIError";
        this.status = status;
        this.body = body;
    }
}
exports.ShivanshuAPIError = ShivanshuAPIError;
class ShivanshuClient {
    baseUrl;
    apiKey;
    timeoutMs;
    constructor(config = {}) {
        this.baseUrl = (config.baseUrl || "https://shivanshutiwari.in").replace(/\/+$/, "");
        this.apiKey = config.apiKey;
        this.timeoutMs = config.timeoutMs || 10000;
    }
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
        const headers = {
            Accept: "application/json",
            ...(options.headers || {}),
        };
        if (this.apiKey && !headers["Authorization"]) {
            headers["Authorization"] = `Bearer ${this.apiKey}`;
        }
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);
        try {
            const response = await fetch(url, {
                ...options,
                headers,
                signal: controller.signal,
            });
            if (!response.ok) {
                let errorBody;
                try {
                    errorBody = await response.json();
                }
                catch {
                    errorBody = await response.text();
                }
                throw new ShivanshuAPIError(`Request to ${endpoint} failed with HTTP status ${response.status}`, response.status, errorBody);
            }
            return (await response.json());
        }
        finally {
            clearTimeout(timeoutId);
        }
    }
    projects = {
        /**
         * List all engineering projects with optional cursor pagination and domain filtering.
         */
        list: async (options = {}) => {
            const params = new URLSearchParams();
            if (options.limit)
                params.set("limit", options.limit.toString());
            if (options.cursor)
                params.set("cursor", options.cursor);
            if (options.domain)
                params.set("domain", options.domain);
            const qs = params.toString();
            return this.request(`/api/v1/projects${qs ? `?${qs}` : ""}`);
        },
        /**
         * Retrieve technical architecture, decisions, and outcomes for a single project slug.
         */
        get: async (slug) => {
            return this.request(`/api/v1/projects/${encodeURIComponent(slug)}`);
        },
        /**
         * Compare two engineering projects side-by-side.
         */
        compare: async (slugA, slugB) => {
            const [projectA, projectB] = await Promise.all([
                this.projects.get(slugA),
                this.projects.get(slugB),
            ]);
            return { projectA, projectB };
        },
    };
    keys = {
        /**
         * Generate an ephemeral self-serve sandbox API key valid for 24 hours.
         */
        generate: async () => {
            return this.request("/api/v1/keys", { method: "POST" });
        },
    };
    sandbox = {
        /**
         * Check connectivity to the isolated sandbox test environment.
         */
        ping: async () => {
            return this.request("/api/v1/sandbox/ping");
        },
        /**
         * Test contact submission within the sandbox without sending live emails.
         */
        contact: async (data) => {
            return this.request("/api/v1/sandbox/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
        },
    };
    batch = {
        /**
         * Execute multiple API actions in a single atomic network request.
         */
        run: async (operations) => {
            return this.request("/api/v1/batch", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ operations }),
            });
        },
    };
    jobs = {
        /**
         * Dispatch an asynchronous long-running task (HTTP 202 Accepted).
         */
        create: async (task, payload) => {
            return this.request("/api/v1/jobs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ task, payload }),
            });
        },
        /**
         * Poll the status and results of a previously created asynchronous job.
         */
        get: async (jobId) => {
            return this.request(`/api/v1/jobs/${encodeURIComponent(jobId)}`);
        },
        /**
         * Helper to poll a job until completion or timeout.
         */
        waitFor: async (jobId, pollIntervalMs = 1000, maxWaitMs = 30000) => {
            const startTime = Date.now();
            while (Date.now() - startTime < maxWaitMs) {
                const job = await this.jobs.get(jobId);
                if (job.status === "completed" || job.status === "failed") {
                    return job;
                }
                await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
            }
            throw new Error(`Job ${jobId} timed out after ${maxWaitMs}ms`);
        },
    };
    contact = {
        /**
         * Submit an inquiry or proposal with automatic idempotency protection.
         */
        submit: async (data, idempotencyKey) => {
            const headers = { "Content-Type": "application/json" };
            if (idempotencyKey) {
                headers["Idempotency-Key"] = idempotencyKey;
            }
            return this.request("/api/v1/contact", {
                method: "POST",
                headers,
                body: JSON.stringify(data),
            });
        },
    };
    docs = {
        /**
         * Fetch curated LLM navigation index or markdown documentation.
         */
        get: async (path = "llms.txt") => {
            const url = `${this.baseUrl}/${path.replace(/^\/+/, "")}`;
            const res = await fetch(url, {
                headers: { Accept: "text/markdown, text/plain, */*" },
            });
            if (!res.ok) {
                throw new ShivanshuAPIError(`Failed to fetch doc ${path}`, res.status);
            }
            return res.text();
        },
    };
}
exports.ShivanshuClient = ShivanshuClient;
exports.default = ShivanshuClient;
