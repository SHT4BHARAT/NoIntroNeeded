import { experience, certifications } from "@/lib/achievements/data";

export function RoleSections({ aboutText }: { aboutText: string }) {
  return (
    <>
      <section className="mb-16">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
          About
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted">{aboutText}</p>
      </section>

      <section className="mb-16">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
          Experience
        </h2>
        <div className="mt-4 space-y-6">
          {experience.map((exp) => (
            <div key={exp.company}>
              <div className="flex items-baseline justify-between">
                <h3 className="text-sm font-semibold">{exp.role}</h3>
                <span className="text-xs text-muted-foreground">{exp.period}</span>
              </div>
              <p className="text-xs text-muted-foreground">{exp.company}</p>
              <p className="mt-1 text-sm text-muted">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
          Certifications
        </h2>
        <div className="mt-4 space-y-3">
          {certifications.map((cert) => (
            <div key={cert.title} className="rounded-lg border border-border p-4">
              <h3 className="text-sm font-semibold">{cert.title}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {cert.provider} &middot; {cert.duration}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
