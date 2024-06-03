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

const partyKitHost = process.env.NEXT_PUBLIC_PARTYKIT_HOST
const partyKiProtocol = partyKitHost.includes('127.0.0.1') ? 'http' : 'https'
const partyKitProxy = `${partyKiProtocol}://${partyKitHost}`

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
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
        source: "/github",
        destination: "https://github.com/dashrando",
        permanent: false,
      },
      {
        source: "/readable",
        destination: "/readable/standard",
        permanent: false,
      },
      {
        source: "/readable-logic",
        destination: "/readable/standard",
        permanent: false,
      },
      {
        source: "/readable/standard-area",
        destination: "/readable/area",
        permanent: false,
      },
      {
        source: "/seed/race/:path*",
        destination: "/race/:path*",
        permanent: true,
      },
      {
        source: "/events",
        destination: "/events/mystery",
        permanent: false,
      },
      {
        source: "/spring-invitational-form",
        destination: "https://forms.gle/59EFcZ4g5cPqgaNC8",
        permanent: false,
      },
      {
        source: "/events/mystery/discord",
        destination: "https://discord.gg/2usVyy4",
        permanent: false,
      },
      {
        source: "/events/mystery/register",
        destination: "https://www.inertia.run/i/dash-mystery?returnTo=https%3A%2F%2Fmystery.dash.kupppo.com%2Fevents%2Fmystery%2Fregistered",
        permanent: false,
      },
      {
        source: "/mystery-register",
        destination: "https://www.inertia.run/i/dash-mystery",
        permanent: false,
      },
      {
        source: "/si24",
        destination: "/events/spring-invitational",
        permanent: false,
      }
    ];
  },
  rewrites: async () => {
    return [
      {
        source: "/homepage",
        destination: "/index.html",
      },
      {
        source: "/updates",
        destination: "/updates.html",
      },
      {
        source: "/sgl2020",
        destination: "/sgl2020.html",
      },
      {
        source: "/tournament",
        destination: "/tournament.html",
      },
      {
        source: '/partykit/:path*',
        destination: `${partyKitProxy}/:path*`,
      }
    ];
  },
  transpilePackages: ['core']
};

module.exports = enableSentry
  ? withSentryConfig(nextConfig, sentryConfig, sentryOpts)
  : nextConfig;
