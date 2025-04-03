// @ts-check

/**
 * @type {import('next').NextConfig}
 */

const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // https://github.com/pmndrs/react-spring/issues/2146
  reactStrictMode: false,
  swcMinify: true,
  output: "standalone", // 여기서 standalone 폴더를 사용한다고 해준다.
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};

module.exports = withVanillaExtract(nextConfig);
