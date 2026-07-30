/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/.env', destination: '/api/env' },
      { source: '/backup/config.json', destination: '/api/backup-config' },
    ];
  },
};

module.exports = nextConfig;
