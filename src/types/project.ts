export interface Project {
  slug: string;
  title: string;
  tagline?: string;
  description: string;
  stack: string[];
  repoUrl?: string;
  demoUrl?: string;
  thumbnail?: string;
  date: string;
  featured?: boolean;
  highlights: string[];
  aiFraming?: string;
  backendFraming?: string;
  problem?: string;
  whatIBuilt?: string;
  architecture?: string;
  result?: string;
  keyDecisions?: string[];
  honestPart?: string;
}
