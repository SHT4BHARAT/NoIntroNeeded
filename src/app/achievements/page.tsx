import type { Metadata } from "next";
import Link from "next/link";
import { z } from "zod";
import { SITE_URL } from "@/lib/constants";
import { achievements } from "@/lib/achievements/data";
import type { Achievement } from "@/types/achievements";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";
import { PhotoStrip } from "@/components/gallery/PhotoStrip";

const achievementCategoryEnum = z.enum(["hackathon", "certification", "challenge", "other"]);

export const metadata: Metadata = {
  title: "Achievements — Shivanshu Tiwari",
  description:
    "Certifications, hackathon participation, and technical milestones from Shivanshu Tiwari's work in AI agent engineering and backend systems.",
  openGraph: {
    title: "Achievements — Shivanshu Tiwari",
    description:
      "Certifications, hackathon participation, and technical milestones from Shivanshu Tiwari's work.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Achievements — Shivanshu Tiwari",
    description:
      "Certifications, hackathon participation, and technical milestones from Shivanshu Tiwari's work.",
  },
  alternates: {
    canonical: `${SITE_URL}/achievements`,
  },
  robots: "index, follow",
};

const CATEGORY_LABELS: Record<Achievement["category"], string> = {
  hackathon: "Hackathons",
  certification: "Certifications",
  challenge: "Challenges",
  other: "Other",
};

const CATEGORY_ORDER: Achievement["category"][] = [
  "hackathon",
  "certification",
  "challenge",
  "other",
];

function AchievementCard({
  title,
  date,
  category,
  description,
  verifiableUrl,
  photos,
}: Achievement) {
  return (
    <article
      tabIndex={0}
      className="rounded-lg border border-accent/10 bg-card p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/50 hover:bg-surface focus-visible:-translate-y-1 focus-visible:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 motion-reduce:transform-none motion-reduce:transition-none"
    >
      <div className="mb-2 flex items-center gap-3">
        <span className="inline-block rounded bg-accent-bg px-2 py-0.5 font-mono text-xs text-accent">
          {CATEGORY_LABELS[category]}
        </span>
        <span className="text-xs text-muted-foreground">{date}</span>
      </div>
      <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      <p className="mt-1 text-sm text-muted">{description}</p>
      {photos && photos.length > 0 && (
        <PhotoStrip photos={photos} category={category} />
      )}
      {verifiableUrl && (
        <a
          href={verifiableUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block font-mono text-xs text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
        >
          Verify →
        </a>
      )}
    </article>
  );
}

export default async function AchievementsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const parsed = category ? achievementCategoryEnum.safeParse(category) : null;
  const activeCategory: Achievement["category"] | null = parsed?.success ? parsed.data : null;

  const filtered = activeCategory
    ? achievements.filter((a) => a.category === activeCategory)
    : achievements;

  return (
    <div className="mx-auto max-w-3xl flex-1 px-4 py-20">
      <RevealOnScroll>
        <h1 className="font-display mb-2 text-3xl font-bold tracking-tight">Achievements</h1>
      </RevealOnScroll>

      <RevealOnScroll>
        <p className="mb-8 text-muted">Hackathon wins, certifications, and challenge results.</p>
      </RevealOnScroll>

      <RevealOnScroll>
        <div className="mb-8 flex flex-wrap gap-2">
          <Link
            href="/achievements"
            className={`rounded-md border px-3 py-1.5 font-mono text-xs transition-colors duration-150 ease-out motion-reduce:transition-none ${
              activeCategory === null
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-muted hover:bg-surface hover:border-accent/50"
            }`}
          >
            All ({achievements.length})
          </Link>

          {CATEGORY_ORDER.map((cat) => {
            const count = achievements.filter((a) => a.category === cat).length;
            return (
              <Link
                key={cat}
                href={`/achievements?category=${cat}`}
                className={`rounded-md border px-3 py-1.5 font-mono text-xs transition-colors duration-150 ease-out motion-reduce:transition-none ${
                  activeCategory === cat
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted hover:bg-surface hover:border-accent/50"
                }`}
              >
                {CATEGORY_LABELS[cat]} ({count})
              </Link>
            );
          })}
        </div>
      </RevealOnScroll>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">No achievements yet.</p>
      ) : (
        <RevealOnScroll>
          <div className="space-y-4">
            {filtered.map((achievement) => (
              <RevealOnScroll key={`${achievement.title}-${achievement.date}`}>
                <AchievementCard {...achievement} />
              </RevealOnScroll>
            ))}
          </div>
        </RevealOnScroll>
      )}
    </div>
  );
}
