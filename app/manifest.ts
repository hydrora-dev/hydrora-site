import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HYDRORA",
    short_name: "HYDRORA",
    description: "Premium smart hydration ecosystem. Powered by flavour. Driven by data.",
    start_url: "/",
    display: "standalone",
    background_color: "#050B1E",
    theme_color: "#050B1E",
    icons: [
      { src: "/icons/icon.svg", sizes: "any", type: "image/svg+xml" }
    ]
  };
}
