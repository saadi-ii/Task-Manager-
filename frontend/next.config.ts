import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:7000/:path*",
      },
    ];
  },
  images:{
      remotePatterns:[
        {
          protocol:"https",
          hostname:"cdn.iconscout.com"
        },
        {
          protocol:"https",
          hostname:"plus.unsplash.com"
        }
      ]
    }
};

export default nextConfig;
