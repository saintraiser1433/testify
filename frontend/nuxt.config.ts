// // https://nuxt.com/docs/api/configuration/nuxt-config
import ViteComponents from "unplugin-vue-components/vite";
import 'dotenv/config';
import IconsResolver from "unplugin-icons/resolver";


export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  routeRules: {
    '/': { redirect: '/auth' },
    '/admin/': { redirect: '/admin/home' },
    // '/admin/home': { ssr: true },
  },

  app: {
    head: {
      title: "Testify",
      link: [
        {
          rel: "icon",
          type: "image/x-icon", // or 'image/x-icon' if using .ico
          href: "/favicon.ico", // Update this path if using a different filename or format
        },
      ],
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          charset: "utf-8",
        },
      ],
    },
  },
  // auth: {
  // globalAppMiddleware: true,
  // baseURL: process.env.BASE_API_URL,
  // provider: {
  //   type: 'local',
  //   endpoints: {
  //     signIn: { path: '/login', method: 'post' },
  //     signOut: { path: '/logout', method: 'post' },
  //     signUp: { path: '/register', method: 'post' },
  //     getSession: { path: '/session', method: 'get' },
  //   },
  //   pages: {
  //     login: '/auth',
  //   },
  //   token: {
  //     signInResponseTokenPointer: '/token',
  //     type: 'Bearer',
  //     cookieName: 'auth.token',
  //     headerName: 'Authorization',
  //     maxAgeInSeconds: 1800,
  //     cookieDomain: 'sidebase.io',
  //     secureCookieAttribute: false,
  //     httpOnlyCookieAttribute: false,
  //   },
  // },

  // sessionRefresh: {
  //   enablePeriodically: true,
  //   enableOnWindowFocus: true,
  // }


  // },

  colorMode: {
    classSuffix: "",
    preference: "light",
    fallback: "light",
  },
  css: ["sweetalert2/dist/sweetalert2.min.css"],
  devtools: { enabled: true },
  imports: {
    dirs: ["types/*.ts", "store/*.ts", "utils/*.ts", "composables/*.ts", "composables/*/*.ts", "constants/*.ts"],
  },
  modules: [
    '@pinia/nuxt',
    'unplugin-icons/nuxt',
    '@vueuse/nuxt',
    '@nuxt/ui',
    '@morev/vue-transitions/nuxt',
    'nuxt-tiptap-editor',
    '@nuxt/image',
    '@nuxtjs/svg-sprite',
    'nuxt-echarts',
    // '@nuxt/fonts'
  ],
  tiptap: {
    prefix: 'Tiptap',
    lowlight: {
      theme: 'github-dark',
    },
  },
  svgSprite: {},
  echarts: {
    renderer: ['svg', 'canvas'],
    charts: ['BarChart', 'LineChart', 'PieChart'],
    components: ['DatasetComponent', 'GridComponent', 'TooltipComponent']
  },






  runtimeConfig: {
    gitSecretKey: process.env.GITHUB_SECRET_KEY,
    accessTokenSecret: process.env.NUXT_ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.NUXT_REFRESH_TOKEN_SECRET,
    public: {
      baseURL: process.env.BASE_API_URL,
      // baseURL: process.env.NUXT_PUBLIC_BASE_URL,
      gitClientID: process.env.GITHUB_CLIENT_ID,
      storageURL: process.env.STORAGE_URL
    },
  },
  ssr: false,

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config.js",
    exposeConfig: false,
    config: {},
    viewer: true,
  },

  vite: {

    plugins: [
      ViteComponents({
        resolvers: [IconsResolver()],
      }),
    ],
  },

});


