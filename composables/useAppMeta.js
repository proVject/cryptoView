export const useAppMeta = () => {
    const config = useAppConfig()

    useHead({
        titleTemplate: (titleChunk) => {
            return titleChunk ? `${titleChunk} | ${config.seo.siteName}` : config.seo.defaultTitle
        },
        meta: [
            { name: 'description', content: config.seo.description },
            { name: 'keywords', content: config.seo.keywords },

            // OpenGraph
            { property: 'og:title', content: config.seo.defaultTitle },
            { property: 'og:description', content: config.seo.description },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: config.seo.url },
            { property: 'og:image', content: config.seo.image },

            // Twitter
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: config.seo.defaultTitle },
            { name: 'twitter:description', content: config.seo.description },
            { name: 'twitter:image', content: config.seo.image },
        ]
    })
}