/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "v-land.herokuapp.com"],
  },
};

module.exports = nextConfig;
