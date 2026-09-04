/**
 * DeclarativeWebMCP renders W3C draft WebMCP action forms into server-rendered HTML.
 *
 * Scanners, search crawlers, and browser-resident AI agents (e.g. ChatGPT Sites,
 * Chrome 157+, Claude browser agents) read `toolname` and `tooldescription`
 * attributes from server-rendered HTML without requiring client-side JavaScript execution.
 */
export function DeclarativeWebMCP() {
  return (
    <div aria-hidden="true" className="sr-only hidden" data-webmcp="declarative-tools">
      {/* Search Portfolio Projects Tool */}
      <form
        toolname="search_portfolio_projects"
        tooldescription="Search Shivanshu Tiwari's 19 portfolio projects, tech stacks, and case studies"
        action="/#projects"
        method="GET"
      >
        <input
          type="search"
          name="query"
          toolparam="query"
          placeholder="Search by keyword, domain (ai-agents, backend, voice-ai, rl), or stack"
        />
        <button type="submit">Search Projects</button>
      </form>

      {/* Get Project Details Tool */}
      <form
        toolname="get_project_details"
        tooldescription="Retrieve detailed engineering writeup, architecture diagram, and honest limitation disclosures for a project by slug"
        action="/#projects"
        method="GET"
      >
        <input
          type="text"
          name="slug"
          toolparam="slug"
          placeholder="Project slug (e.g. daitfo, samvad, agentic-honey-pot, payout-engine)"
        />
        <button type="submit">Get Project</button>
      </form>

      {/* Search Documentation Tool */}
      <form
        toolname="search_docs"
        tooldescription="Search Shivanshu Tiwari developer portal, API specifications, and technical blog posts"
        action="/developers"
        method="GET"
      >
        <input
          type="search"
          name="query"
          toolparam="query"
          placeholder="Search documentation, llms.txt, or blog"
        />
        <button type="submit">Search Docs</button>
      </form>

      {/* Get Contact Info Tool */}
      <form
        toolname="get_contact_info"
        tooldescription="Retrieve verified contact methods, email (sht4bharat@gmail.com), GitHub, and LinkedIn for Shivanshu Tiwari"
        action="/contact"
        method="GET"
      >
        <button type="submit">Get Contact Info</button>
      </form>
    </div>
  );
}
