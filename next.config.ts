import type { NextConfig } from "next";

const [repositoryOwner = "yobb-bit", repositoryName = ""] =
  process.env.GITHUB_REPOSITORY?.split("/") ?? [];
const isGitHubActionsBuild = process.env.GITHUB_ACTIONS === "true";
const isRootGitHubPagesSite =
  repositoryName.toLowerCase() === `${repositoryOwner.toLowerCase()}.github.io`;
const basePath =
  isGitHubActionsBuild && repositoryName && !isRootGitHubPagesSite
    ? `/${repositoryName}`
    : "";
const siteUrl = `https://${repositoryOwner}.github.io${basePath}`;

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  output: "export",
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
};

export default nextConfig;
