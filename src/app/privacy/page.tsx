import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SOCIAL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy — Shivanshu Tiwari",
  description:
    "Privacy policy for shivanshutiwari.in — what data is collected (Vercel hosting logs, optional Vercel Analytics, contact form), cookies used, and contact for questions.",
  openGraph: {
    title: "Privacy — shivanshutiwari.in",
    description: "How shivanshutiwari.in handles data — hosting logs, analytics, contact form.",
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
  robots: "index, follow",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl flex-1 px-4 py-20">
      <h1 className="font-display mb-2 text-3xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mb-2 text-xs text-muted-foreground">
        Effective date: 2026-08-30 — Draft awaiting Shivanshu&apos;s review for accuracy. Claims below were
        derived from codebase inspection (src/app/layout.tsx, src/lib/analytics.ts, src/proxy.ts,
        src/app/api/contact/route.ts). Verify before treating as final.
      </p>
      <p className="mb-8 text-sm italic text-muted">
        This is a personal portfolio site — not a SaaS product or e-commerce store. No advertising pixels,
        no third-party tracking cookies beyond what is described here.
      </p>

      <div className="space-y-8 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="font-display mb-3 text-sm font-semibold uppercase tracking-widest text-muted">
            What this site does
          </h2>
          <p>
            shivanshutiwari.in presents projects, blog posts, education, achievements, and contact
            information for Shivanshu Tiwari. It is a static personal portfolio — not a data-collecting
            product. The only interactive feature that stores user-provided data is the contact form.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-3 text-sm font-semibold uppercase tracking-widest text-muted">
            Data collection
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Hosting logs:</strong> Vercel (the hosting provider) logs
              basic request metadata — IP address, user-agent, path, and timestamp — for operational and
              security purposes per{" "}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                Vercel&apos;s privacy policy
              </a>
              .
            </li>
            <li>
              <strong className="text-foreground">Vercel Analytics:</strong> This site includes{" "}
              <code className="rounded bg-surface px-1 py-0.5 font-mono text-xs">@vercel/analytics</code> which counts
              pageviews without setting tracking cookies or collecting personal data. See{" "}
              <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                Vercel Analytics privacy
              </a>
              . Implementation in <code className="font-mono text-xs">src/app/layout.tsx</code> and{" "}
              <code className="font-mono text-xs">src/lib/analytics.ts</code>.
            </li>
            <li>
              <strong className="text-foreground">Contact form:</strong> If you use the form at{" "}
              <Link href="/contact" className="text-accent hover:underline">/contact</Link>, your name, email,
              and message are sent to a Google Sheet via Google Sheets API (googleapis). No data is sold or
              shared beyond that destination. The form includes rate-limiting (5 requests per IP window) and
              a honeypot field for spam protection — see{" "}
              <code className="font-mono text-xs">src/app/api/contact/route.ts</code>.
            </li>
            <li>
              <strong className="text-foreground">No other tracking:</strong> No Google Analytics, Plausible,
              advertising pixels, or third-party cookies are in use as of this writing. Verify in the
              codebase: <code className="font-mono text-xs">src/app/layout.tsx</code> contains only{" "}
              <code className="font-mono text-xs">Analytics</code> from @vercel/analytics.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display mb-3 text-sm font-semibold uppercase tracking-widest text-muted">
            Cookies
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <code className="rounded bg-surface px-1 py-0.5 font-mono text-xs">role</code> — stores your
              preference for the AI Engineer vs Backend Systems view (values: ai-engineer, backend-systems).
              Set in <code className="font-mono text-xs">src/proxy.ts</code>, SameSite=Lax, 1-year expiry.
              No tracking purpose.
            </li>
            <li>
              No consent banner is shown because no advertising or analytics cookies are set. If tracking is
              added later, this policy and the site&apos;s cookie handling must be updated.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display mb-3 text-sm font-semibold uppercase tracking-widest text-muted">
            Your rights and contact
          </h2>
          <p>
            If you have questions about data handling, or want a contact-form submission removed, reach out
            via the <Link href="/contact" className="text-accent hover:underline">contact page</Link> or
            email <a href={SOCIAL.email} className="text-accent hover:underline">{SOCIAL.email.replace("mailto:", "")}</a>. For
            Vercel&apos;s handling of hosting logs, see Vercel&apos;s policy linked above.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-3 text-sm font-semibold uppercase tracking-widest text-muted">
            Changes
          </h2>
          <p>
            If this site adds analytics, cookies, or any new data collection beyond what is described here,
            this page will be updated and the effective date changed. The canonical version lives at{" "}
            <code className="font-mono text-xs">{SITE_URL}/privacy</code>.
          </p>
        </section>
      </div>
    </div>
  );
}
