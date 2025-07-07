export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],
  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'system',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },
  runtimeConfig: {
    googleSheetsId: process.env.GOOGLE_SHEETS_ID,
    googleServiceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    public: {
      baseUrl: process.env.BASE_URL || 'https://sxcong.ntpusu.org',
      proposalFormUrl: process.env.PROPOSAL_FORM_URL || '',
      meetingRecordsUrl: process.env.MEETING_RECORDS_URL || '',
      congressWebsiteUrl: process.env.CONGRESS_WEBSITE_URL || '',
      inviteSystemUrl: process.env.INVITE_SYSTEM_URL || '',
      budgetSystemUrl: process.env.BUDGET_SYSTEM_URL || '',
      githubRepoUrl: process.env.GITHUB_REPO_URL || ''
    }
  },
  nitro: {
    preset: 'vercel-edge'
  },
  app: {
    head: {
      title: '三峽校區議事服務 - 國立臺北大學學生自治會',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '國立臺北大學學生自治會三峽校區學生議會議事服務系統' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/site-icon/favicon.ico' },
        { rel: 'apple-touch-icon', type: 'image/png', href: '/site-icon/apple-touch-icon.png', 'sizes': '180x180' },
        { rel: 'icon', type: 'image/png', href: '/site-icon/favicon-32x32.png', 'sizes': '32x32' },
        { rel: 'icon', type: 'image/png', href: '/site-icon/favicon-16x16.png', 'sizes': '16x16' },
        { rel: 'manifest', href: '/site-icon/site.webmanifest' }
      ]
    }
  }
})