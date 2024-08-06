// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  vite: {
    optimizeDeps: {
      exclude: ["vee-validate"],
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@vee-validate/nuxt",
    "@formkit/auto-animate/nuxt",
    "shadcn-nuxt",
  ],

  nitro: {
    preset: "vercel-edge", // you can use 'vercel' or other providers here
  },

  runtimeConfig: {
    openaiApiKey: "",
    assistantId: "",
  },

  compatibilityDate: "2024-07-05",
});
