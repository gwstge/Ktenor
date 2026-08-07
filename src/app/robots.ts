import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Internal reference page — useful to me, noise in search results.
      disallow: ["/sk/design", "/en/design"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
