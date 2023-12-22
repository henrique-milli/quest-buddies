/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: "export",
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
