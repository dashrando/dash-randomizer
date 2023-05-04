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

module.exports = nextConfig;
