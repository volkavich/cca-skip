/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'raw.githubusercontent.com',
      'ipfs.io',
      'i.ibb.co',
      'pbs.twimg.com',
    ],
  },
};
