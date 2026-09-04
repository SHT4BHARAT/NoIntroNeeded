/**
 * DeclarativeWebMCP renders W3C draft WebMCP action forms into server-rendered HTML.
 *
 * Scanners, search crawlers, and browser-resident AI agents (e.g. ChatGPT Sites,
 * Chrome 157+, Claude browser agents) read `toolname` and `tooldescription`
 * attributes from server-rendered HTML without requiring client-side JavaScript execution.
 */
export function DeclarativeWebMCP() {
  return (
    <div className="sr-only" data-webmcp="declarative-tools">
      {/* Search Portfolio Projects Tool */}
      <form
        toolname="search_portfolio_projects"
        tooldescription="Search Shivanshu Tiwari's 19 portfolio projects, tech stacks, and case studies"
        action="/search"
        method="GET"
      >
        <input
          type="search"
          name="q"
          toolparam="q"
          placeholder="Search by keyword, domain (ai-agents, backend, voice-ai, rl), or stack"
        />
        <button type="submit">Search Projects</button>
      </form>

      {/* Search Documentation Tool */}
      <form
        toolname="search_docs"
        tooldescription="Search Shivanshu Tiwari developer portal, API specifications, multi-language SDKs, CLI tools, and technical documentation"
        action="/search"
        method="GET"
      >
        <input
          type="search"
          name="q"
          toolparam="q"
          placeholder="Search documentation, developer guides, SDKs, or APIs"
        />
        <button type="submit">Search Docs</button>
      </form>

      {/* Search Site Tool */}
      <form
        toolname="search_site"
        tooldescription="Search entire portfolio including developer resources, SDKs, CLI, APIs, 19 engineering projects, and blog posts"
        action="/search"
        method="GET"
      >
        <input
          type="search"
          name="q"
          toolparam="q"
          placeholder="Search projects, developer docs, SDKs, CLI..."
        />
        <button type="submit">Search Site</button>
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
