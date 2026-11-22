import type { NextConfig } from "next";

// 엔터프라이즈급 웹 보안 헤더 설정 (OWASP 표준 가이드라인 준수)
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
];

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentUpgrade: 'security',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.aliexpress-media.com',
      },
      {
        protocol: 'https',
        hostname: '**.alicdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.danawa.com',
      },
    ],
  },
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.pccraft.kr',
          },
        ],
        destination: 'https://pccraft.kr/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
