// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        locales: ['en', 'fr', 'ar'],
        defaultLocale: 'en',
    },
    eslint: {
        // Allow production builds to successfully complete
        // even if your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    // other config if needed...
}

module.exports = nextConfig;