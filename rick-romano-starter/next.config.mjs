/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',              // ensure server output
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};
export default nextConfig;
