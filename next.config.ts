import type { NextConfig } from "next";
const path = require('path');

const nextConfig: NextConfig = {
  reactCompiler: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    additionalData: `
      @use "@/styles/variables" as *;
      @use "@/styles/functions" as *;
      @use "@/styles/mixins" as *;
    `,
  },
};

export default nextConfig;
