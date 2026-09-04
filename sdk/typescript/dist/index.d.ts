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
export declare class ShivanshuAPIError extends Error {
    readonly status: number;
    readonly body: unknown;
    constructor(message: string, status: number, body?: unknown);
}
export declare class ShivanshuClient {
    readonly baseUrl: string;
    private apiKey?;
    private timeoutMs;
    constructor(config?: ClientConfig);
    private request;
    readonly projects: {
        /**
         * List all engineering projects with optional cursor pagination and domain filtering.
         */
        list: (options?: ProjectListOptions) => Promise<ProjectListResponse>;
        /**
         * Retrieve technical architecture, decisions, and outcomes for a single project slug.
         */
        get: (slug: string) => Promise<ProjectDetails>;
        /**
         * Compare two engineering projects side-by-side.
         */
        compare: (slugA: string, slugB: string) => Promise<{
            projectA: ProjectDetails;
            projectB: ProjectDetails;
        }>;
    };
    readonly keys: {
        /**
         * Generate an ephemeral self-serve sandbox API key valid for 24 hours.
         */
        generate: () => Promise<EphemeralKeyResponse>;
    };
    readonly sandbox: {
        /**
         * Check connectivity to the isolated sandbox test environment.
         */
        ping: () => Promise<SandboxStatusResponse>;
        /**
         * Test contact submission within the sandbox without sending live emails.
         */
        contact: (data: ContactSubmission) => Promise<ContactResponse>;
    };
    readonly batch: {
        /**
         * Execute multiple API actions in a single atomic network request.
         */
        run: (operations: BatchOperation[]) => Promise<BatchResponse>;
    };
    readonly jobs: {
        /**
         * Dispatch an asynchronous long-running task (HTTP 202 Accepted).
         */
        create: (task: string, payload?: Record<string, unknown>) => Promise<JobCreationResponse>;
        /**
         * Poll the status and results of a previously created asynchronous job.
         */
        get: (jobId: string) => Promise<JobStatusResponse>;
        /**
         * Helper to poll a job until completion or timeout.
         */
        waitFor: (jobId: string, pollIntervalMs?: number, maxWaitMs?: number) => Promise<JobStatusResponse>;
    };
    readonly contact: {
        /**
         * Submit an inquiry or proposal with automatic idempotency protection.
         */
        submit: (data: ContactSubmission, idempotencyKey?: string) => Promise<ContactResponse>;
    };
    readonly docs: {
        /**
         * Fetch curated LLM navigation index or markdown documentation.
         */
        get: (path?: string) => Promise<string>;
    };
}
export default ShivanshuClient;
