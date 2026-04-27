import { defineConfig, DefaultTheme } from 'vitepress'
import pkg from '../package.json' assert { type: 'json' }
const { version } = pkg

export default defineConfig({
  appearance: {
    initialValue: 'light' as any
  },
  title: 'Парк за углом',
  locales: {
    '/': {
      lang: 'ru-RU',
      title: 'Парк за углом',
      description: 'Умные парки для детей и их родителей',
    },
  },

  transformPageData(pageData) {
    return pageData
  },

  buildEnd(siteConfig) {
    // Этот хук выполняется после сборки
  },

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: 'public/prkx-icon.png' }],
    ['link', { rel: 'shortcut icon', href: '/prkx-icon.png' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['script', {}, `
    (function() {
      function createFooterContent() {
        const links = [
          { text: '↗ Контакт', href: '/contact-us' },
          { text: 'Телеграм-канал', href: 'https://t.me/runPrkx', target: '_blank' }
        ];

        let html = '<hr style="border: 0; border-top: 1px solid var(--vp-c-divider); margin: 24px 0;">';
        html += '<div class="custom-footer-links"><div class="footer-row">';
        links.slice(0, 3).forEach((link, i) => {
          if (i > 0) html += '<span class="dot-separator">•</span>';
          html += '<a href="' + link.href + '"' + (link.target ? ' target="' + link.target + '" rel="noopener noreferrer"' : '') + '>' + link.text + '</a>';
        });
        html += '</div><div class="footer-row">';
        links.slice(3).forEach((link, i) => {
          if (i > 0) html += '<span class="dot-separator">•</span>';
          html += '<a href="' + link.href + '">' + link.text + '</a>';
        });
        html += '</div></div>';
        html += '<div style="margin-top: 24px; text-align: center;">';
        html += '<div style="color: var(--vp-c-text-2); font-size: 14px;">Умные парки для детей и их родителей</div>';
        html += '<div style="color: var(--vp-c-text-2); margin-top: 4px; font-size: 14px; text-align: center;">© <a href="https://orxaos.sbs" target="_blank" rel="noopener noreferrer" style="color: var(--vp-c-text-2); text-decoration: none;">Orxaos</a> | Михаил Изюмов 2025</div>';
        return html;
      }

      function replaceFooter() {
        let footer = document.querySelector('.VPFooter');
        if (!footer) {
          footer = document.createElement('footer');
          footer.className = 'VPFooter';
          document.body.appendChild(footer);
        }
        footer.innerHTML = createFooterContent();
        if (window.location.pathname !== '/') {
          footer.style.position = 'relative';
          footer.style.bottom = '70px';
          footer.style.zIndex = '10';
          footer.style.marginBottom = '-70px';
        } else {
          footer.style.position = '';
          footer.style.bottom = '';
          footer.style.zIndex = '';
          footer.style.paddingBottom = '30px';
        }
      }

      function updateApplyLinkTarget() {
        const applyLinks = document.querySelectorAll('.VPSocialLink[aria-label="apply-link"]');
        applyLinks.forEach(applyLink => {
          applyLink.href = '/run-prkx';
          applyLink.setAttribute('target', '_self');
          applyLink.removeAttribute('rel');

          const newLink = document.createElement('a');
          newLink.href = '/run-prkx';
          newLink.className = applyLink.className;
          newLink.setAttribute('aria-label', 'apply-link');
          newLink.setAttribute('target', '_self');

          Array.from(applyLink.attributes).forEach(attr => {
            if (attr.name !== 'href' && attr.name !== 'target' && attr.name !== 'rel') {
              newLink.setAttribute(attr.name, attr.value);
            }
          });

          applyLink.parentNode.replaceChild(newLink, applyLink);
        });
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          replaceFooter();
          updateApplyLinkTarget();
        });
      } else {
        replaceFooter();
        updateApplyLinkTarget();
      }

      window.addEventListener('load', () => {
        replaceFooter();
        updateApplyLinkTarget();
      });
      setTimeout(() => {
        replaceFooter();
        updateApplyLinkTarget();
      }, 1000);
      setTimeout(() => {
        replaceFooter();
        updateApplyLinkTarget();
      }, 2000);

      let lastUrl = location.href;
      new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
          lastUrl = url;
          setTimeout(() => {
            replaceFooter();
            updateApplyLinkTarget();
          }, 100);
        }
      }).observe(document, { subtree: true, childList: true });
    })();
    `],
    ['style', {}, `
      :root {
        --vp-c-brand-1: #2e6b5e;
        --vp-c-brand-2: #3a7d6e;
        --vp-c-brand-3: #2e6b5e;
        --vp-c-brand-soft: rgba(46, 107, 94, 0.14);
      }
      /* Логотип */
      .VPNavBarTitle .logo {
        height: 32px !important;
        width: auto !important;
      }

      /* Контейнер социальных ссылок */
      .VPNavBarSocialLinks {
        min-width: 4px !important;
        justify-content: flex-end !important;
        gap: 4px !important;
        margin-left: 0px !important;
      }

      /* Убираем все иконки GitHub */
      .VPSocialLink .vpi-social-github {
        display: none !important;
      }

      /* Базовые стили для социальных ссылок */
      .VPSocialLink {
        width: auto !important;
        height: auto !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
      }

      /* Кнопка "Войти" (прозрачная) */
      .VPSocialLink[aria-label="login-link"]::after {
        content: "Сообщество";
        font-size: 14px;
        color: var(--vp-c-text-1);
        padding: 6px 12px;
        border: 1px solid var(--vp-c-divider);
        border-radius: 6px;
        background: transparent;
        transition: all 0.3s ease;
        white-space: nowrap;
        margin: 0 4px;
      }

      .VPSocialLink[aria-label="login-link"]:hover::after {
        background: var(--vp-c-bg-soft);
        border-color: var(--vp-c-brand);
      }

      /* Кнопка "Расти с планом" (заполненная) */
      .VPSocialLink[aria-label="apply-link"]::after {
        content: "Поддержать";
        font-size: 14px;
        color: white;
        padding: 6px 12px;
        border: 1px solid var(--vp-c-brand);
        border-radius: 6px;
        background: var(--vp-c-brand);
        transition: all 0.3s ease;
        white-space: nowrap;
        margin: 0 4px;
      }

      .VPSocialLink[aria-label="apply-link"]:hover::after {
        background: var(--vp-c-brand-darker, var(--vp-c-brand));
        transform: translateY(-1px);
      }

      /* Стили для футера */
      .custom-footer-links {
        display: flex;
        flex-direction: column;
        gap: 3px;
        align-items: center;
      }

      .footer-row {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        justify-content: center;
      }

      .footer-row a {
        color: var(--vp-c-text-2);
        text-decoration: none;
        transition: color 0.3s ease;
      }

      .footer-row a:hover {
        color: var(--vp-c-brand);
      }

      .dot-separator {
        color: var(--vp-c-text-3);
        font-weight: bold;
      }

      .VPFooter .copyright {
        margin-top: 2px !important;
      }

      /* Скрыть переключатель темы */
      .VPSwitchAppearance {
        display: none !important;
      }

      /* Убрать разделители между кнопками в навигации */
      .VPNavBarSocialLinks::before,
      .VPNavBarSocialLinks .divider {
        display: none !important;
      }

      /* Убрать вертикальные разделители */
      .VPNavBar .divider {
        display: none !important;
      }

      /* Мобильные стили */
      @media (max-width: 768px) {
        .VPNavBarSocialLinks {
          width: 100% !important;
          min-width: 100% !important;
          flex-direction: column !important;
          gap: 8px !important;
          padding: 0 16px !important;
          box-sizing: border-box !important;
          margin-left: 8 !important;
        }

        .VPSocialLink {
          width: 100% !important;
          display: flex !important;
          justify-content: center !important;
          box-sizing: border-box !important;
        }

        .VPSocialLink[aria-label="login-link"]::after,
        .VPSocialLink[aria-label="apply-link"]::after {
          width: 100% !important;
          display: block !important;
          text-align: center;
          padding: 10px 12px !important;
          margin: 10 !important;
          box-sizing: border-box !important;
        }

        /* Футер на мобильных */
        .footer-row {
          flex-direction: column;
          gap: 8px;
        }

        .dot-separator {
          display: none;
        }
      }
    `]
  ],
  base: '/woodled/',
  cleanUrls: true,
  appearance: false,
  outDir: '.vitepress/dist',
  description: 'Умные парки для детей и их родителей.',
  themeConfig: {
    logo: '/prkx-favicon.png',
    siteTitle: "Парк за углом",
    
    sidebar: {
      '/Parks/': {
        items: sidebarParki()
      },
      '/masterplan/': {
        items: sidebarMasterplan()
      },
      '/about/': {
        items: sidebarWhyPark()
      },
      '/culture/': {
        items: sidebarCulture()
      }
    },

    search: {
      provider: 'local',
      options: {
        placeholder: 'Поиск…',
        translations: {
          button: {
            buttonText: 'Поиск',
            buttonAriaLabel: 'Поиск'
          },
          modal: {
            displayDetails: 'Показать подробные результаты',
            resetButtonTitle: 'Сбросить поиск',
            backButtonTitle: 'Закрыть поиск',
            noResultsText: 'Результаты не найдены для',
            footer: {
              selectText: 'выбрать',
              navigateText: 'навигация',
              closeText: 'закрыть'
            }
          }
        }
      }
    },

    nav: nav(),

    socialLinks: [
      { icon: 'github', link: '/community', ariaLabel: 'login-link', target: '_self' },
      { icon: 'github', link: '/run-prkx', ariaLabel: 'apply-link', target: '_self' }
    ],

    // footer: {
    //   message: 'Журнал  •  Телеграм-канал  •  Поддержка  •  Условия использования  •  Контакт',
    //   copyright: '© Модуль Роста® 2010 — 2025'
    // },
  }
})

// Навигация с разделом "Культура"
function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'Парки',
      items: [
        { text: 'Самара, Конноармейская 6а', link: '/Parks/Samara/konnoarmeiskaya_6/overview.md' }
      ]
    },
    {
      text: 'Мастерплан',
      items: [
        { text: 'Обзор', link: '/masterplan/overview' },
        { text: 'В чем план', link: '/masterplan/the-plan' },
        { text: 'Прогресс', link: '/masterplan/roadmap' }
      ]
    },
    {
      text: 'О Нас',
      items: [
        { text: 'Инициатива', link: '/about/origin' },
        { text: 'Миссия', link: '/about/mission' },
        { text: 'Видение', link: '/about/vision' },
        { text: 'Ценности', link: '/about/values' }
      ]
    },
    {
      text: 'Культура',
      items: [
        { text: 'Культура парков', link: '/culture/parks' },
        { text: 'Примеры', link: '/culture/references' }
      ]
    }
  ]
}

function sidebarParki(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Самара, Конноармейская, 6а',
      collapsed: false,
      items: [
        { text: 'Обзор проекта', link: '/Parks/Samara/konnoarmeiskaya_6/overview.md' },
        { text: 'Прогресс по проекту', link: '/Parks/Samara/konnoarmeiskaya_6/progress.md' },
        { text: 'Цифры и факты', link: '/Parks/Samara/konnoarmeiskaya_6/facts-and-figures.md' },
        { text: 'СМИ о парке', link: '/Parks/Samara/konnoarmeiskaya_6/media.md' },
        { text: 'Вопросы и ответы', link: '/Parks/Samara/konnoarmeiskaya_6/faq.md' }
      ]
    }
  ]
}

function sidebarMasterplan(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Мастерплан',
      collapsed: false,
      items: [
        { text: 'Обзор', link: '/masterplan/overview' },
        { text: 'Сегодня', link: '/masterplan/the-present' },
        { text: 'Возможности', link: '/masterplan/the-possibility' },
        { text: 'Решение', link: '/masterplan/the-solution' },
        { text: 'В чем план', link: '/masterplan/the-plan' },
        { text: 'Как мы это сделаем', link: '/masterplan/how-we-can-do-it' },
        { text: 'Прогресс', link: '/masterplan/roadmap' }
      ]
    }
  ]
}

function sidebarWhyPark(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'О нас',
      collapsed: false,
      items: [
        { text: 'Инициатива', link: '/about/origin' },
        { text: 'Миссия', link: '/about/mission' },
        { text: 'Видение', link: '/about/vision' },
        { text: 'Ценности', link: '/about/values' }
      ]
    }
  ]
}

// Добавленная функция sidebarCulture для раздела "Культура"
function sidebarCulture(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Культура',
      collapsed: false,
      items: [
        { text: 'Культура парков', link: '/culture/parks' },
        { text: 'Примеры', link: '/culture/references' }
      ]
    }
  ]
}
