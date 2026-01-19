// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-12-23',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@vueuse/motion/nuxt', '@nuxtjs/sitemap', 'nuxt-schema-org'],
  app: {
    head: {
      title: 'AI Music - AI 生成音乐，一键创作',
      meta: [
        { name: 'description', content: 'AI 生成音乐软件：文本生成音乐、风格控制、导出与二次编辑，让创作更高效。' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap' },
      ],
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },
  css: ['~/assets/css/main.css'],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  // Runtime configuration for SEO
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      siteName: process.env.NUXT_PUBLIC_SITE_NAME || 'AI Music',
      ogImage: process.env.NUXT_PUBLIC_OG_IMAGE || '/og-image.svg',
      appUrl: process.env.NUXT_PUBLIC_APP_URL || '#cta',
      contactEmail: process.env.NUXT_PUBLIC_CONTACT_EMAIL || '',
    },
  },
  // Sitemap configuration
  sitemap: {
    hostname: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    gzip: true,
    routes: [
      { url: '/', changefreq: 'weekly', priority: 1.0 },
    ],
  },
})
