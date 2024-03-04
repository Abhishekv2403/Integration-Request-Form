import { createResolver } from "nuxt/kit";

const { resolve } = createResolver(import.meta.url);

import { auth } from '~/plugins/firebase.js';



// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  devtools: { enabled: true },

  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css'
  ],

  build: {
    transpile: ['vuetify'],
  },

  plugins: [
    '~/plugins/firebase.js',
    { src: '~/plugins/vuetify.js', mode: 'client' },
  ],

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },

  router: {
    middleware: ['auth'],
  },


});