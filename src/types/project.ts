export interface Project {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  repoUrl?: string;
  demoUrl?: string;
  thumbnail?: string;
  date: string;
  highlights: string[];
  aiFraming?: string;
  backendFraming?: string;
}

export interface ProjectConfig {
  projects: Project[];
}
