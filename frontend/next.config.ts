import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:7001/:path*",
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
