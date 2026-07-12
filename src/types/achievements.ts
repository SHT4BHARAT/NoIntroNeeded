export interface Photo {
  src: string;
  alt: string;
}

export interface Achievement {
  title: string;
  date: string;
  category: "hackathon" | "certification" | "challenge" | "other";
  description: string;
  verifiableUrl?: string;
  photos?: Photo[];
}
