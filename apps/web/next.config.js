const { withSentryConfig } = require("@sentry/nextjs");

const enableSentry = process.env.ENABLE_SENTRY || false;

const sentryConfig = {
  silent: true,
  org: "dashrando",
  project: "web",
}

const sentryOpts = {
  widenClientFileUpload: true,
  transpileClientSDK: true,
  tunnelRoute: "/monitoring",
  hideSourceMaps: true,
  disableLogger: true,
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  redirects: async () => {
    return [
      {
        source: "/discord",
        destination: "https://discord.gg/WsnYSxA",
        permanent: false,
      },
      {
        source: "/smdiscord",
        destination: "https://discord.gg/rT2fWZt",
        permanent: false,
      },
      {
        source: "/source",
        destination: "https://github.com/dashrando",
        permanent: false,
      },
      {
        source: "/readable",
        destination: "/readable/recall",
        permanent: false,
      },
      {
        source: "/readable-logic",
        destination: "/readable/recall",
        permanent: false,
      },
    ];
  },
  rewrites: async () => {
    return [
      {
        source: "/",
        destination: "/index.html",
      },
      {
        source: "/updates",
        destination: "/updates.html",
      },
      {
        source: "/resources",
        destination: "/resources.html",
      },
      {
        source: "/sgl2020",
        destination: "/sgl2020.html",
      },
      {
        source: "/tournament",
        destination: "/tournament.html",
      },
    ];
  },
};

module.exports = enableSentry
  ? withSentryConfig(nextConfig, sentryConfig, sentryOpts)
  : nextConfig;
