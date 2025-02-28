// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    '@nuxtjs/apollo',
    "@nuxt/image",
    "nuxt-graphql-client",
    "nuxt-easy-lightbox"
  ],
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://graphqlzero.almansi.me/api'
      }
    },
  },
  image: {
    domains: ['graphqlzero.almansi.me/']
  },
  css: [
    '@/assets/css/style.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})