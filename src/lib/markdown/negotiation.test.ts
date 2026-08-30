import { describe, it, expect } from "vitest";
import { parseAccept, preferredType, appendVaryAccept } from "./negotiation";

describe("parseAccept", () => {
  it("parses simple types", () => {
    expect(parseAccept("text/markdown")).toEqual([
      { type: "text/markdown", q: 1, specificity: 2 },
    ]);
  });

  it("parses q values", () => {
    const entries = parseAccept("text/markdown;q=0.5, text/html;q=0.9");
    expect(entries[0]).toMatchObject({ type: "text/markdown", q: 0.5 });
    expect(entries[1]).toMatchObject({ type: "text/html", q: 0.9 });
  });

  it("handles wildcard */*", () => {
    expect(parseAccept("*/*")).toEqual([{ type: "*/*", q: 1, specificity: 0 }]);
  });

  it("handles type/*", () => {
    expect(parseAccept("text/*")).toEqual([{ type: "text/*", q: 1, specificity: 1 }]);
  });

  it("clamps q to [0,1]", () => {
    expect(parseAccept("text/html;q=2").at(0)?.q).toBe(1);
    expect(parseAccept("text/html;q=-1").at(0)?.q).toBe(0);
  });

  it("defaults missing q to 1", () => {
    expect(parseAccept("text/html").at(0)?.q).toBe(1);
  });

  it("handles malformed header gracefully", () => {
    const entries = parseAccept("not-a-valid-header-,,,");
    // Should not throw; produce entries (even if weird types)
    expect(Array.isArray(entries)).toBe(true);
  });
});

describe("preferredType", () => {
  it("returns html for null/empty header", () => {
    expect(preferredType(null)).toBe("text/html");
    expect(preferredType("")).toBe("text/html");
  });

  it("prefers markdown when explicitly requested", () => {
    expect(preferredType("text/markdown")).toBe("text/markdown");
  });

  it("prefers markdown over html when both with same q but markdown first", () => {
    expect(preferredType("text/markdown, text/html")).toBe("text/markdown");
  });

  it("honors q-values", () => {
    expect(preferredType("text/markdown;q=0.5, text/html;q=0.9")).toBe("text/html");
    expect(preferredType("text/markdown;q=0.9, text/html;q=0.5")).toBe("text/markdown");
  });

  it("explicit q=0 rejects type and falls back to wildcard", () => {
    // text/html;q=0, */*;q=1 => should reject html, but */* matches markdown
    // Our PRODUCES are text/html and text/markdown. */* matches both, but html is rejected.
    // So markdown via wildcard should win.
    expect(preferredType("text/html;q=0, */*;q=1")).toBe("text/markdown");
  });

  it("specificity-first: explicit rejection overrides wildcard", () => {
    // text/html;q=0, */*;q=1 must still reject html
    // Already tested above, but also ensure text/markdown still chosen
    const result = preferredType("text/html;q=0, */*;q=1");
    expect(result).not.toBe("text/html");
  });

  it("returns html for */*", () => {
    // Both match via wildcard, but html comes first in PRODUCES? Actually our loop iterates PRODUCES in order: html, markdown
    // With same q and same specificity, the first candidate with lower position? Need to check logic.
    // For */* with q=1, both candidates match with same specificity 0 and same position 0.
    // Across candidates tie-break is matchedPosition and q. Both same, so first PRODUCES entry (html) will be chosen initially, then markdown has same q and same position so not > -> html wins.
    // This is acceptable default.
    const r = preferredType("*/*");
    // Could be either but our implementation will return text/html
    expect(r).toBe("text/html");
  });

  it("returns html for text/html alone", () => {
    expect(preferredType("text/html")).toBe("text/html");
  });

  it("returns null for unsupported type", () => {
    expect(preferredType("application/pdf")).toBeNull();
  });

  it("returns 406 case: rejects both via q=0", () => {
    expect(preferredType("text/html;q=0, text/markdown;q=0")).toBeNull();
  });

  it("handles type/* matching", () => {
    expect(preferredType("text/*")).toBe("text/html");
  });

  it("q=0 with specific type but wildcard with q=1 still serves other type", () => {
    expect(preferredType("text/markdown;q=0, text/html;q=1")).toBe("text/html");
    expect(preferredType("text/html;q=0, text/markdown;q=1")).toBe("text/markdown");
  });

  it("honors specificity over q-value misordering", () => {
    // text/html;q=0, */*;q=1 — wildcard should not override explicit rejection
    // We already test, but also ensure text/html;q=0 not returned
    expect(preferredType("text/html;q=0, */*;q=1")).toBe("text/markdown");
    // Conversely, text/markdown;q=0, */*;q=1 => should return html
    expect(preferredType("text/markdown;q=0, */*;q=1")).toBe("text/html");
  });
});

describe("appendVaryAccept", () => {
  it("sets Vary when missing", () => {
    const h = new Headers();
    appendVaryAccept(h);
    expect(h.get("Vary")).toBe("Accept");
  });

  it("appends Accept when not present", () => {
    const h = new Headers({ Vary: "rsc, next-router-state-tree" });
    appendVaryAccept(h);
    expect(h.get("Vary")).toBe("rsc, next-router-state-tree, Accept");
  });

  it("does not duplicate Accept case-insensitively", () => {
    const h = new Headers({ Vary: "Accept" });
    appendVaryAccept(h);
    expect(h.get("Vary")).toBe("Accept");
    const h2 = new Headers({ Vary: "accept" });
    appendVaryAccept(h2);
    expect(h2.get("Vary")).toBe("accept");
    const h3 = new Headers({ Vary: "rsc, Accept" });
    appendVaryAccept(h3);
    expect(h3.get("Vary")).toBe("rsc, Accept");
  });
});
