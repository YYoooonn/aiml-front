// @ts-check

/**
 * @type {import('next').NextConfig}
 */

import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig = {
  /* config options here */
  // https://github.com/pmndrs/react-spring/issues/2146
  reactStrictMode: false,
  swcMinify: true,
  // output: "standalone", // 여기서 standalone 폴더를 사용한다고 해준다.
};

export default withVanillaExtract(nextConfig);
