/**
 * PB2I — Footer component
 */

import { t } from '../utils/i18n.js'
import { getLinks, getCollectionLinks } from '../utils/navLinks.js'

const BASE_URL = import.meta.env.BASE_URL || '/'
const logoUrl  = `${BASE_URL}assets/logo.webp`

const wave = `<svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,30 C180,60 360,0 540,30 C720,60 900,0 1080,30 C1260,60 1350,15 1440,30 L1440,60 L0,60 Z" fill="#702424"/>
  </svg>`

export function createFooter() {
  const links = getLinks(BASE_URL)
  const collectionLinks = getCollectionLinks(BASE_URL)

  const renderedLinks = [
    `<a href="${BASE_URL}index.html" class="text-xs text-white/75 hover:text-white transition-colors">${t('navbar.home')}</a>`,
    ...links.map(l => `<a href="${l.href}" class="text-xs text-white/75 hover:text-white transition-colors">${l.label}</a>`)
  ].join('')

  const renderedColLinks = collectionLinks.map(l => 
    `<a href="${l.href}" class="text-xs text-white/75 hover:text-white transition-colors">${l.label}</a>`
  ).join('')

  return `
  <footer class="relative mt-24" role="contentinfo">
    <div class="footer-wave">${wave}</div>
    <div class="bg-primary px-6 md:px-12 lg:px-36 py-8 grid grid-cols-2 lg:flex lg:flex-row gap-8 lg:gap-12 justify-between">
      <!-- Branding -->
      <div class="flex flex-col gap-4 col-span-2 lg:col-span-1">
        <img src="${logoUrl}" alt="Logo PB2I" class="h-12 w-auto object-contain self-start" onerror="this.style.display='none'">
        <p class="font-heading font-extrabold text-white text-sm leading-snug max-w-[200px] lg:max-w-[160px]">
          ${t('footer.title')}
        </p>
      </div>

      <!-- Liens -->
      <div class="flex flex-col gap-4 col-span-2 lg:col-span-1">
        <h3 id="footer-nav-heading" class="font-heading text-sm font-semibold text-white uppercase tracking-wider">${t('footer.navigation')}</h3>
        <nav aria-labelledby="footer-nav-heading" class="grid grid-cols-2 gap-x-4 gap-y-2">
          <div class="flex flex-col gap-2">
            ${renderedLinks}
          </div>
          <div class="flex flex-col gap-2">
            ${renderedColLinks}
          </div>
        </nav>
      </div>

      <!-- Mentions légales -->
      <div class="flex flex-col gap-4 col-span-1">
        <h3 id="footer-legal-heading" class="font-heading text-sm font-semibold text-white uppercase tracking-wider">${t('footer.legal_heading')}</h3>
        <nav aria-labelledby="footer-legal-heading" class="flex flex-col gap-2">
          <a href="${BASE_URL}mentions-legales.html" class="text-xs text-white/75 hover:text-white transition-colors">${t('footer.legal')}</a>
          <a href="${BASE_URL}mentions-legales.html" class="text-xs text-white/75 hover:text-white transition-colors">${t('footer.privacy')}</a>
        </nav>
      </div>

      <!-- Social -->
      <div class="flex flex-col gap-4 col-span-1">
        <h3 class="font-heading text-sm font-semibold text-white uppercase tracking-wider">${t('footer.follow')}</h3>
        <div class="flex gap-4">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
            class="w-10 h-10 bg-white rounded-lg flex items-center justify-center transition-transform hover:-translate-y-0.5 shadow-sm hover:shadow-md">
            <svg class="w-5 h-5" fill="#702424" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
            </svg>
          </a>
          <a href="mailto:pb2i.belfort@gmail.com" aria-label="Email"
            class="w-10 h-10 bg-white rounded-lg flex items-center justify-center transition-transform hover:-translate-y-0.5 shadow-sm hover:shadow-md">
            <svg class="w-5 h-5" fill="none" stroke="#702424" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div class="bg-[var(--color-primary-dark)] text-center py-3">
      <p class="text-xs text-white/60">© 2026 PB2I</p>
    </div>
  </footer>
  `
}

