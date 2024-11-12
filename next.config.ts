import type { NextConfig } from "next";

const nextConfig: NextConfig = {  images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'i1.sndcdn.com',
      port: '',
      pathname: '/avatars-yHA8nds2mqg4uYtr-kyxTzw-t1080x1080.jpg',
    },
    {
      protocol: 'https',
      hostname: 'www.hollywoodinsider.com',
      port: '',
      pathname: '/wp-content/uploads/2020/09/Hollywood-Insider-Frank-Ocean-Letter-From-Fan.jpg',
    },
    {
      protocol: 'https',
      hostname: 'media.allure.com',
      port: '',
      pathname: '/photos/66ff11de6c3f3d8fc0e06ded/**', // Allow all paths under this pattern
    },
  ],
},
};
export default nextConfig;
