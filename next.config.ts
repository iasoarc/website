import type { NextConfig } from "next";
import { defaultLocale, topicKeys } from "./src/i18n/config";

const nextConfig: NextConfig = {
  async redirects() {
    // Keep the original URLs working, using Chinese as the default language.
    return ["/", ...topicKeys.map(topic => `/${topic}`)].map(source => ({
      source,
      destination: `/${defaultLocale}${source === "/" ? "" : source}`,
      permanent: false,
    }));
  },
};

export default nextConfig;
