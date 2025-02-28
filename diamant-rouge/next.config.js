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
    images: {
        domains: ['amantys.fr'], // Add your image domain here
    },
    async headers() {
        return [
            {
                // Apply these headers to all routes.
                source: '/(.*)',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: 'amantys.fr', // or specify your domain
                    },
                ],
            },
        ];
    },
    // other config if needed...
}

module.exports = nextConfig;