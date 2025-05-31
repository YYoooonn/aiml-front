const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["@repo/ui"],
  output: "standalone",
  images: {
    remotePatterns: [
      {
        // 허용할 외부 이미지 도메인 -> S3 버킷의 도메인, TODO: 환경변수로 관리
        protocol: 'https',
        hostname: 'myfirstbucket2502.s3.ap-northeast-2.amazonaws.com',
      },
    ]
  },
};

module.exports = withVanillaExtract(nextConfig);
