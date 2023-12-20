const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  serverRuntimeConfig: {
    secret:
      "ASfa-sf9iasffak2kkkkkkasf@@@@-aF0=1021fiasfjasfkasfk@21231240!+R)KAS+Fj=asfjA+SF)JK!+@",
  },
  reactStrictMode: false,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
        ? 'http://localhost:27888/api' // development api
        : 'http://localhost:27888/api' // production api
}
};

module.exports = nextConfig;
