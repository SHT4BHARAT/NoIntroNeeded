import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "API Versioning & Deprecation Policy — Shivanshu Tiwari",
  description:
    "Official API versioning guarantees, sunset schedules, and migration timelines for Shivanshu Tiwari Portfolio APIs.",
  alternates: {
    canonical: `${SITE_URL}/developers/deprecation`,
  },
};

export default function DeprecationPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl flex-1 px-4 py-16">
      <div className="mb-6 flex items-center gap-2 text-xs font-mono text-accent">
        <Link href="/developers" className="hover:underline">
          Developers
        </Link>
        <span>/</span>
        <span>Deprecation Policy</span>
      </div>

      <h1 className="font-display mb-4 text-3xl font-bold tracking-tight">
        Shivanshu Tiwari API Versioning & Deprecation Policy
      </h1>
      <p className="mb-8 text-muted">
        This document declares the stability, versioning, and deprecation guarantees provided by the Shivanshu Tiwari Portfolio API.
      </p>

      <div className="space-y-8">
        <section className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold mb-3">1. Versioning Strategy</h2>
          <p className="text-sm text-muted leading-relaxed">
            The API follows explicit URI-path versioning under <code>/api/v&lt;N&gt;</code> (currently <code>/api/v1</code>). Non-breaking additions (new endpoints, optional request parameters, additive response fields) are deployed in-place. Breaking changes trigger a new major version path.
          </p>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold mb-3">2. Standard Deprecation & Sunset Headers (RFC 8594)</h2>
          <p className="text-sm text-muted mb-4 leading-relaxed">
            When an API version or specific operation is scheduled for retirement, all responses include standard IETF HTTP headers:
          </p>
          <pre className="rounded-lg bg-background p-4 text-xs font-mono text-foreground overflow-x-auto">
{`Deprecation: @1798761600
Sunset: Thu, 31 Dec 2026 23:59:59 GMT
Link: <https://shivanshutiwari.in/developers/deprecation>; rel="deprecation"`}
          </pre>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold mb-3">3. Minimum 180-Day Notice Period</h2>
          <p className="text-sm text-muted leading-relaxed">
            We guarantee a minimum of <strong>180 days (6 months)</strong> notice between the first broadcast of a <code>Sunset</code> header and the decommissioning of any versioned endpoint. Autonomous agents and developers have guaranteed migration windows.
          </p>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold mb-3">4. Active Versions Schedule</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="py-2">Version</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Deprecated</th>
                  <th className="py-2">Sunset Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-mono text-xs">
                <tr>
                  <td className="py-3 font-semibold text-accent">v1 (/api/v1)</td>
                  <td className="py-3 text-green-500">Active / Current</td>
                  <td className="py-3 text-muted">No</td>
                  <td className="py-3 text-muted">31 Dec 2026 (Earliest)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div className="mt-10 flex gap-4 text-sm">
        <Link href="/developers" className="text-accent hover:underline">
          &larr; Return to Developer Portal
        </Link>
        <Link href="/openapi.json" className="text-accent hover:underline">
          View OpenAPI Spec
        </Link>
      </div>
    </div>
  );
}
