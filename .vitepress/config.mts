import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'WOODLED Docs',
  description: '',

  locales: {
    '/': {
      lang: 'ru-RU',
      title: 'WOODLED Docs',
      description: '',
    },
  },

  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['script', {}, `
    (function() {
      function updateLinkTargets() {
        ['login-link', 'apply-link'].forEach(label => {
          document.querySelectorAll('.VPSocialLink[aria-label="' + label + '"]').forEach(link => {
            const newLink = document.createElement('a');
            newLink.href = link.href;
            newLink.className = link.className;
            newLink.setAttribute('aria-label', label);
            newLink.setAttribute('target', '_self');
            Array.from(link.attributes).forEach(attr => {
              if (!['href', 'target', 'rel'].includes(attr.name)) {
                newLink.setAttribute(attr.name, attr.value);
              }
            });
            link.parentNode.replaceChild(newLink, link);
          });
        });
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateLinkTargets);
      } else {
        updateLinkTargets();
      }
      window.addEventListener('load', updateLinkTargets);
      setTimeout(updateLinkTargets, 1000);

      let lastUrl = location.href;
      new MutationObserver(() => {
        if (location.href !== lastUrl) {
          lastUrl = location.href;
          setTimeout(updateLinkTargets, 100);
        }
      }).observe(document, { subtree: true, childList: true });
    })();
    `],
    ['style', {}, `
      /* Скрыть иконки GitHub у кнопок навбара */
      .VPSocialLink .vpi-social-github {
        display: none !important;
      }

      .VPNavBarSocialLinks {
        min-width: 4px !important;
        justify-content: flex-end !important;
        gap: 4px !important;
        margin-left: 0px !important;
      }

      .VPSocialLink {
        width: auto !important;
        height: auto !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
      }

      /* Кнопка 1 — прозрачная (outline) */
      .VPSocialLink[aria-label="login-link"]::after {
        content: "Кнопка 1";
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

      /* Кнопка 2 — заполненная (filled) */
      .VPSocialLink[aria-label="apply-link"]::after {
        content: "Кнопка 2";
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

      /* Скрыть переключатель темы */
      .VPSwitchAppearance {
        display: none !important;
      }

      /* Убрать разделители в навигации */
      .VPNavBarSocialLinks::before,
      .VPNavBarSocialLinks .divider,
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
          box-sizing: border-box !important;
        }
      }
    `],
  ],

  base: '/woodled/',
  cleanUrls: true,
  appearance: false,
  outDir: '.vitepress/dist',

  themeConfig: {
    siteTitle: 'WOODLED Docs',

    nav: [],

    sidebar: {},

    socialLinks: [
      { icon: 'github', link: '/', ariaLabel: 'login-link' },
      { icon: 'github', link: '/', ariaLabel: 'apply-link' },
    ],
  },
})
