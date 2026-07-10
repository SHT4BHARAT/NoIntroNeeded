import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shivanshu Tiwari — Full-Stack GenAI/ML Engineer",
    short_name: "SHT Portfolio",
    description:
      "Full-Stack GenAI/ML Engineer — autonomous agents, LLM pipelines, voice AI, production deploys.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0C10",
    theme_color: "#D4913A",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
