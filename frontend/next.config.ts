import type { NextConfig } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7001";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/:path*`,
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
        },
        {
          protocol:"https",
          hostname:"media.istockphoto.com"
        },
        {
          protocol:"https",
          hostname:"static.vecteezy.com"
        },
      ]
    }
};

export default nextConfig;
