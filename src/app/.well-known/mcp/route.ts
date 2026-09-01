// Consolidate to ONE honest MCP server. /.well-known/mcp re-exports the single
// /mcp implementation so both surfaces serve identical tools and handshake.
export { GET, POST, OPTIONS } from "@/app/mcp/route";
