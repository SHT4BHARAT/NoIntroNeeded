export interface Achievement {
  title: string;
  date: string;
  category: "hackathon" | "certification" | "challenge" | "other";
  description: string;
  verifiableUrl?: string;
}
