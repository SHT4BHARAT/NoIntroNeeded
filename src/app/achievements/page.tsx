import type { Metadata } from "next";
import { z } from "zod";
import { achievements } from "@/lib/achievements/data";
import type { Achievement } from "@/types/achievements";
import { RevealOnScroll } from "@/components/animation/RevealOnScroll";

const achievementCategoryEnum = z.enum(["hackathon", "certification", "challenge", "other"]);

export const metadata: Metadata = {
  title: "Achievements — Shivanshu Tiwari",
  description:
    "Certifications, hackathon participation, and technical milestones from Shivanshu Tiwari's work in AI agent engineering and backend systems.",
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
}: Achievement) {
  return (
    <article className="rounded-lg border border-border bg-card p-5 transition-[transform,box-shadow,border-color,background-color] duration-150 ease-out hover:-translate-y-4 hover:border-accent/70 hover:bg-surface hover:shadow-[0_12px_30px_-18px_rgba(34,211,238,0.40)] focus-visible:-translate-y-4 focus-visible:border-accent/70 focus-visible:outline-none focus-visible:bg-surface focus-visible:shadow-[0_12px_30px_-18px_rgba(34,211,238,0.40)] motion-reduce:transform-none motion-reduce:shadow-none motion-reduce:transition-none">
      <div className="mb-2 flex items-center gap-3">
        <span className="inline-block rounded bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent">
          {CATEGORY_LABELS[category]}
        </span>
        <span className="text-xs text-muted-foreground">{date}</span>
      </div>
      <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      <p className="mt-1 text-sm text-muted">{description}</p>
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
    <main className="mx-auto max-w-2xl flex-1 px-4 py-16">
      <RevealOnScroll>
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Achievements</h1>
      </RevealOnScroll>

      <RevealOnScroll>
        <p className="mb-8 text-muted">Hackathon wins, certifications, and challenge results.</p>
      </RevealOnScroll>

      <RevealOnScroll>
        <div className="mb-8 flex flex-wrap gap-2">
          <a
            href="/achievements"
            className={`rounded-md border px-3 py-1.5 font-mono text-xs transition-colors duration-150 ease-out motion-reduce:transition-none ${
              activeCategory === null
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-muted hover:bg-surface hover:border-accent/50"
            }`}
          >
            All ({achievements.length})
          </a>

          {CATEGORY_ORDER.map((cat) => {
            const count = achievements.filter((a) => a.category === cat).length;
            return (
              <a
                key={cat}
                href={`/achievements?category=${cat}`}
                className={`rounded-md border px-3 py-1.5 font-mono text-xs transition-colors duration-150 ease-out motion-reduce:transition-none ${
                  activeCategory === cat
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted hover:bg-surface hover:border-accent/50"
                }`}
              >
                {CATEGORY_LABELS[cat]} ({count})
              </a>
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
    </main>
  );
}
