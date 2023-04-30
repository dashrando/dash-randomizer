/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
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
