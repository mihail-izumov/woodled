import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Парк за углом',
  description: 'Умные парки для детей и их родителей.',

  locales: {
    '/': {
      lang: 'ru-RU',
      title: 'Парк за углом',
      description: 'Умные парки для детей и их родителей',
    },
  },

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: 'public/prkx-icon.png' }],
    ['link', { rel: 'shortcut icon', href: '/prkx-icon.png' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
  ],

  base: '/woodled/',
  cleanUrls: true,
  appearance: false,
  outDir: '.vitepress/dist',

  themeConfig: {
    logo: '/prkx-favicon.png',
    siteTitle: 'Парк за углом',

    nav: [],

    sidebar: {},

    socialLinks: [],

    search: {
      provider: 'local',
      options: {
        placeholder: 'Поиск…',
        translations: {
          button: {
            buttonText: 'Поиск',
            buttonAriaLabel: 'Поиск',
          },
          modal: {
            displayDetails: 'Показать подробные результаты',
            resetButtonTitle: 'Сбросить поиск',
            backButtonTitle: 'Закрыть поиск',
            noResultsText: 'Результаты не найдены для',
            footer: {
              selectText: 'выбрать',
              navigateText: 'навигация',
              closeText: 'закрыть',
            },
          },
        },
      },
    },
  },
})
