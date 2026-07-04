// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/opt-logo.png' },
        { rel: 'shortcut icon', type: 'image/png', href: '/opt-logo.png' },
        { rel: 'apple-touch-icon', href: '/opt-logo.png' }
      ]
    }
  }
})
