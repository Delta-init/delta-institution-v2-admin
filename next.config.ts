/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true, // This will ignore all ESLint errors during build
    },
    typescript: {
        ignoreBuildErrors: true,
    },

    images: {
        domains: ['localhost', '127.0.0.1'],
    },
};

module.exports = nextConfig;
