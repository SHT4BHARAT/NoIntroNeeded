export interface RoleConfig {
  slug: string;
  title: string;
  headline: string;
  subheading?: string;
  description: string;
  about: string;
  skills: {
    categories: { name: string; items: string[] }[];
  };
  projectSlugs: string[];
}
