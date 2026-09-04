/**
 * Official TypeScript/JavaScript SDK for Shivanshu Tiwari Portfolio APIs
 * Documentation: https://shivanshutiwari.in/developers/sdk
 * Repository: https://github.com/SHT4BHARAT/NoIntroNeeded/tree/main/sdk/typescript
 */

export interface ClientConfig {
  baseUrl?: string;
  apiKey?: string;
  timeoutMs?: number;
}

export interface ProjectSummary {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  repoUrl?: string;
  demoUrl?: string;
  date: string;
  highlights: string[];
  honestPart?: string;
  aiFraming?: string;
  backendFraming?: string;
}

export interface ProjectDetails extends ProjectSummary {
  tagline?: string;
  domain?: string;
  problem?: string;
  whatIBuilt?: string;
  architecture?: {
    summary?: string;
    diagram?: string;
  };
  results?: {
    summary?: string;
  };
  keyDecisions?: string[];
}

export interface ProjectListResponse {
  data: ProjectSummary[];
  pagination: {
    nextCursor: string | null;
    hasMore: boolean;
    limit: number;
  };
}

export interface ProjectListOptions {
  limit?: number;
  cursor?: string;
  domain?: "ai-agents" | "backend" | "voice-ai" | "rl" | string;
}

export interface EphemeralKeyResponse {
  apiKey: string;
  tier: string;
  rateLimit: number;
  expiresAt: string;
}

export interface SandboxStatusResponse {
  pong: boolean;
  sandbox: boolean;
  timestamp: string;
  headers?: Record<string, string>;
}

export interface BatchOperation {
  id: string;
  op: string;
  args?: Record<string, unknown>;
}

export interface BatchResponse {
  results: Array<{
    id: string;
    status: number;
    data: unknown;
  }>;
}

export interface JobCreationResponse {
  jobId: string;
  status: "accepted" | "processing" | "completed" | "failed";
  createdAt: string;
  location?: string;
}

export interface JobStatusResponse {
  jobId: string;
  status: "accepted" | "processing" | "completed" | "failed";
  progress?: number;
  result?: unknown;
  error?: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  idempotent?: boolean;
}

export class ShivanshuAPIError extends Error {
  public readonly status: number;
  public readonly body: unknown;

  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = "ShivanshuAPIError";
    this.status = status;
    this.body = body;
  }
}

export class ShivanshuClient {
  public readonly baseUrl: string;
  private apiKey?: string;
  private timeoutMs: number;

  constructor(config: ClientConfig = {}) {
    this.baseUrl = (config.baseUrl || "https://shivanshutiwari.in").replace(/\/+$/, "");
    this.apiKey = config.apiKey;
    this.timeoutMs = config.timeoutMs || 10000;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
    const headers: Record<string, string> = {
      Accept: "application/json",
      ...(options.headers as Record<string, string> || {}),
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
        let errorBody: unknown;
        try {
          errorBody = await response.json();
        } catch {
          errorBody = await response.text();
        }
        throw new ShivanshuAPIError(
          `Request to ${endpoint} failed with HTTP status ${response.status}`,
          response.status,
          errorBody
        );
      }

      return (await response.json()) as T;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  public readonly projects = {
    /**
     * List all engineering projects with optional cursor pagination and domain filtering.
     */
    list: async (options: ProjectListOptions = {}): Promise<ProjectListResponse> => {
      const params = new URLSearchParams();
      if (options.limit) params.set("limit", options.limit.toString());
      if (options.cursor) params.set("cursor", options.cursor);
      if (options.domain) params.set("domain", options.domain);

      const qs = params.toString();
      return this.request<ProjectListResponse>(`/api/v1/projects${qs ? `?${qs}` : ""}`);
    },

    /**
     * Retrieve technical architecture, decisions, and outcomes for a single project slug.
     */
    get: async (slug: string): Promise<ProjectDetails> => {
      return this.request<ProjectDetails>(`/api/v1/projects/${encodeURIComponent(slug)}`);
    },

    /**
     * Compare two engineering projects side-by-side.
     */
    compare: async (slugA: string, slugB: string): Promise<{ projectA: ProjectDetails; projectB: ProjectDetails }> => {
      const [projectA, projectB] = await Promise.all([
        this.projects.get(slugA),
        this.projects.get(slugB),
      ]);
      return { projectA, projectB };
    },
  };

  public readonly keys = {
    /**
     * Generate an ephemeral self-serve sandbox API key valid for 24 hours.
     */
    generate: async (): Promise<EphemeralKeyResponse> => {
      return this.request<EphemeralKeyResponse>("/api/v1/keys", { method: "POST" });
    },
  };

  public readonly sandbox = {
    /**
     * Check connectivity to the isolated sandbox test environment.
     */
    ping: async (): Promise<SandboxStatusResponse> => {
      return this.request<SandboxStatusResponse>("/api/v1/sandbox/ping");
    },

    /**
     * Test contact submission within the sandbox without sending live emails.
     */
    contact: async (data: ContactSubmission): Promise<ContactResponse> => {
      return this.request<ContactResponse>("/api/v1/sandbox/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    },
  };

  public readonly batch = {
    /**
     * Execute multiple API actions in a single atomic network request.
     */
    run: async (operations: BatchOperation[]): Promise<BatchResponse> => {
      return this.request<BatchResponse>("/api/v1/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ operations }),
      });
    },
  };

  public readonly jobs = {
    /**
     * Dispatch an asynchronous long-running task (HTTP 202 Accepted).
     */
    create: async (task: string, payload?: Record<string, unknown>): Promise<JobCreationResponse> => {
      return this.request<JobCreationResponse>("/api/v1/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task, payload }),
      });
    },

    /**
     * Poll the status and results of a previously created asynchronous job.
     */
    get: async (jobId: string): Promise<JobStatusResponse> => {
      return this.request<JobStatusResponse>(`/api/v1/jobs/${encodeURIComponent(jobId)}`);
    },

    /**
     * Helper to poll a job until completion or timeout.
     */
    waitFor: async (
      jobId: string,
      pollIntervalMs = 1000,
      maxWaitMs = 30000
    ): Promise<JobStatusResponse> => {
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

  public readonly contact = {
    /**
     * Submit an inquiry or proposal with automatic idempotency protection.
     */
    submit: async (
      data: ContactSubmission,
      idempotencyKey?: string
    ): Promise<ContactResponse> => {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (idempotencyKey) {
        headers["Idempotency-Key"] = idempotencyKey;
      }
      return this.request<ContactResponse>("/api/v1/contact", {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
    },
  };

  public readonly docs = {
    /**
     * Fetch curated LLM navigation index or markdown documentation.
     */
    get: async (path = "llms.txt"): Promise<string> => {
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

export default ShivanshuClient;
