/**
 * Accept header negotiation for text/markdown content negotiation.
 * Implements specificity-first ranking per RFC 9110 §12.5.1.
 * See https://acceptmarkdown.com/recipes/nextjs and
 * https://acceptmarkdown.com/guides/accept-text-markdown
 */

export const PRODUCES = ["text/html", "text/markdown"] as const;
export type ProducedType = (typeof PRODUCES)[number];

export interface AcceptEntry {
  type: string;
  q: number;
  specificity: number;
}

export function parseAccept(header: string): AcceptEntry[] {
  return header
    .split(",")
    .map((raw) => {
      const parts = raw.trim().split(";").map((s) => s.trim());
      const type = parts[0].toLowerCase();
      if (!type) return null;
      let q = 1;
      for (const param of parts.slice(1)) {
        const eqIdx = param.indexOf("=");
        if (eqIdx === -1) continue;
        const name = param.slice(0, eqIdx).trim();
        const value = param.slice(eqIdx + 1).trim();
        if (name === "q") {
          const parsed = Number(value);
          if (!Number.isNaN(parsed)) q = Math.max(0, Math.min(1, parsed));
        }
      }
      const specificity = type === "*/*" ? 0 : type.endsWith("/*") ? 1 : 2;
      return { type, q, specificity } as AcceptEntry;
    })
    .filter((e): e is AcceptEntry => e !== null && e.type.length > 0);
}

export function matches(entry: AcceptEntry, candidate: string): boolean {
  if (entry.type === "*/*") return true;
  if (entry.type.endsWith("/*")) return candidate.startsWith(entry.type.slice(0, -1));
  return entry.type === candidate;
}

/**
 * Returns the preferred produced type for the given Accept header,
 * or null if none of PRODUCES is acceptable.
 * Implements specificity-first per RFC 9110: exact > type/* > * / * .
 */
export function preferredType(header: string | null): ProducedType | null {
  if (!header || header.trim() === "") return "text/html";
  const entries = parseAccept(header);
  if (entries.length === 0) return "text/html";

  let bestType: ProducedType | null = null;
  let bestQ = -1;
  let bestPosition = Infinity;

  for (const candidate of PRODUCES) {
    let matched: AcceptEntry | null = null;
    let matchedPosition = Infinity;
    for (let idx = 0; idx < entries.length; idx++) {
      const e = entries[idx];
      if (!matches(e, candidate)) continue;
      if (
        matched === null ||
        e.specificity > matched.specificity ||
        (e.specificity === matched.specificity && idx < matchedPosition)
      ) {
        matched = e;
        matchedPosition = idx;
      }
    }
    if (matched === null) continue;
    const matchedQ: number = matched.q;
    if (matchedQ <= 0) continue;

    if (matchedQ > bestQ || (matchedQ === bestQ && matchedPosition < bestPosition)) {
      bestQ = matchedQ;
      bestPosition = matchedPosition;
      bestType = candidate;
    }
  }

  return bestType;
}

export function appendVaryAccept(headers: Headers): void {
  const existing = headers.get("Vary");
  if (!existing) {
    headers.set("Vary", "Accept");
    return;
  }
  const tokens = existing.split(",").map((s) => s.trim().toLowerCase());
  if (!tokens.includes("accept")) {
    headers.set("Vary", `${existing}, Accept`);
  }
}
