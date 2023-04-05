// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  srcDir: 'src/',

  /**
   * Environment shared with the CLIENT
   */
  runtimeConfig: {
    public: {
      BASE_SITE: 'https://clau-dev.com',
      BASE_API: 'https://api.clau-dev.com',
      BASE_BUCKET: 'https://bucket.clau-dev.com',
      siteUrl: process.env.NUXT_PUBLIC_BASE_SITE || 'https://clau-dev.com',
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-icon',
    'nuxt-headlessui',
    // "@nuxtjs/i18n",
    /**
     * HINT: Currently doesn't work with DenoDeploy
     */
    // "@nuxt/image-edge",
    '@nuxtjs/device',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-schema-org',
    'magic-regexp/nuxt',

    /**
     * TODO: Customize to:
     * - log in console
     * - use remote images
     */
    // "nuxt-security",
    'nuxt-swiper',
    'nuxt-typed-router',
    '@nuxtjs/partytown',
    '@vue-macros/nuxt',
    'nuxt-viewport',
    '@sidebase/nuxt-pdf',
  ],

  tailwindcss: {
    config: {
      content: ['src/**/**.vue'],
    },
  },
})
