import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['http://192.168.110.20:3000'],
  eslint: {
    ignoreDuringBuilds: true, // ✅ Bỏ qua lỗi ESLint khi chạy `next build`
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://103.82.132.143:8080/:path*',
      },
      {
        source: '/ws',
        destination: 'http://103.82.132.143:8080/ws',
      },
    ]
  },
};

export default nextConfig;
