/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/.env', destination: '/api/env' },
      { source: '/backup/config.json', destination: '/api/backup-config' },
      { source: '/backup-old/data.json.old', destination: '/api/backup-data' },
    ];
  },
};

module.exports = nextConfig;
