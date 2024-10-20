/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,

    i18n: {
        locales: ['en'],
        defaultLocale: 'en',
    },
    images: {
        formats: ['image/avif', 'image/webp'],
    },
    webpack: (config) => {
        config.module.rules.push(
            ...[
                {
                    test: /\.yml$/,
                    type: 'json',
                    use: 'yaml-loader',
                },
            ]
        )
        return config
    },
}
