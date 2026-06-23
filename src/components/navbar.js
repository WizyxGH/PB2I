/**
 * PB2I — Navbar component
 * HTML template + desktop/mobile interactions + language switcher
 */

import '../style.css'
import { getActiveLang, saveLang } from '../utils/lang.js'
import { t } from '../utils/i18n.js'

import { getLinks, getCollectionLinks } from '../utils/navLinks.js'

const BASE_URL = import.meta.env.BASE_URL || '/'
export const logoUrl = `${BASE_URL}assets/logo.webp`

// ── Flag icons ───────────────────────────────────────────────
const FLAG_FILES = { fr: 'fr.svg', en: 'gb.svg', de: 'de.svg' }

function flagSvg(lang) {
  const file = FLAG_FILES[lang]
  if (!file) return ''
  return `<img src="${BASE_URL}assets/flags/${file}" alt="${lang.toUpperCase()} flag" width="20" height="14" style="border-radius:2px;flex-shrink:0;object-fit:cover;vertical-align:middle" aria-hidden="true">`
}

// ── HTML ─────────────────────────────────────────────────────
export function createNavbar(activePage = '') {
  const links = getLinks(BASE_URL)
  const collectionLinks = getCollectionLinks(BASE_URL)

  const navLinks = links.map(l =>
    `<a href="${l.href}" class="navbar-link${activePage === l.key ? ' active' : ''}">${l.label}</a>`
  ).join('')

  const colLinks = collectionLinks.map(l =>
    `<a href="${l.href}" class="block px-5 py-3 text-sm font-medium text-gray-800 hover:bg-amber-50 hover:text-primary transition-colors duration-150" style="color:inherit"
       onmouseover="this.style.background='#F5F0EB';this.style.color='#702424'"
       onmouseout="this.style.background='';this.style.color=''">${l.label}</a>`
  ).join('')

  const mobileLinks = links.map(l =>
    `<a href="${l.href}" class="block py-3 text-base font-semibold text-white border-b border-white/15 transition-opacity hover:opacity-75">${l.label}</a>`
  )

  const mobileColLinks = collectionLinks.map(l =>
    `<a href="${l.href}" class="block py-2 pl-4 text-base text-white/80 border-b border-white/10 hover:text-white transition-colors">${l.label}</a>`
  ).join('')

  return `
  <!-- Skip link -->
  <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:z-[9999]">
    Aller au contenu principal
  </a>

  <!-- Navbar -->
  <nav id="navbar" class="navbar" role="navigation" aria-label="Navigation principale">
    
    <!-- Mobile Hamburger -->
    <button id="nav-hamburger" class="lg:hidden absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 cursor-pointer p-2 bg-transparent border-none z-50" aria-label="Menu" aria-expanded="false">
      <span class="block w-5.5 h-0.5 bg-white rounded transition-all duration-300 origin-center" id="ham-l1"></span>
      <span class="block w-5.5 h-0.5 bg-white rounded transition-all duration-300" id="ham-l2"></span>
      <span class="block w-5.5 h-0.5 bg-white rounded transition-all duration-300 origin-center" id="ham-l3"></span>
    </button>

    <!-- Logo -->
    <div class="flex items-center justify-center lg:justify-start w-full lg:w-auto gap-3 flex-shrink-0">
      <a href="${BASE_URL}index.html" class="flex items-center gap-2 lg:gap-3">
        <img id="navbar-logo" src="${logoUrl}" alt="Logo PB2I — Lion de Belfort" class="h-8 lg:h-12 w-auto object-contain" onerror="this.style.display='none'">
        <span class="font-heading font-extrabold text-white text-xl lg:text-sm leading-tight">PB2I</span>
      </a>
    </div>

    <!-- Desktop Links -->
    <div class="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 ml-8">
      ${links.slice(0,2).map(l =>
        `<a href="${l.href}" class="navbar-link${activePage === l.key ? ' active' : ''}">${l.label}</a>`
      ).join('')}

      <!-- Dropdown: Nos collections -->
      <div id="nav-dropdown" class="relative">
        <button id="nav-dropdown-toggle"
          class="flex items-center gap-1 text-sm font-semibold text-white/90 hover:text-white transition-colors cursor-pointer bg-transparent border-none relative navbar-link"
          aria-haspopup="true" aria-expanded="false"
          style="font-family:var(--font-body)">
          ${t('navbar.collections')}
          <svg id="nav-dropdown-chevron" class="w-4 h-4 fill-white transition-transform duration-200 flex-shrink-0" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
          </svg>
        </button>
        <div id="nav-dropdown-menu"
          class="absolute top-[calc(100%+14px)] left-0 bg-white rounded-xl shadow-2xl min-w-52 z-10 opacity-0 pointer-events-none -translate-y-2 transition-all duration-200 overflow-hidden"
          role="menu">
          ${colLinks}
        </div>
      </div>

      ${links.slice(2).map(l =>
        `<a href="${l.href}" class="navbar-link${activePage === l.key ? ' active' : ''}">${l.label}</a>`
      ).join('')}
    </div>

    <!-- Language Switcher -->
    <div id="nav-lang" class="hidden lg:flex relative ml-auto items-center gap-1">
      <button id="nav-lang-toggle"
        class="flex items-center gap-1.5 text-sm font-semibold text-white/90 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
        aria-haspopup="true" aria-expanded="false"
        style="font-family:var(--font-body)">
        <svg class="w-4 h-4 fill-white flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 17.93V18c0-.553-.447-1-1-1H8v-2c0-1.103-.897-2-2-2H4.07C3.39 11.217 3 10.15 3 9c0-.276.017-.549.048-.817L8 13v1c0 1.103.897 2 2 2v3.93zM18.929 17H17c-1.103 0-2-.897-2-2v-1l-5.947-5.947A8.003 8.003 0 0112 4c3.773 0 6.935 2.62 7.793 6.151L18 12v2c0 .737.405 1.375 1 1.723-.023.43-.07.855-.071.277z"/>
        </svg>
        <span id="nav-lang-label" data-current-lang>FR</span>
        <svg class="w-4 h-4 fill-white" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
        </svg>
      </button>
      <div id="nav-lang-menu"
        class="absolute top-[calc(100%+8px)] right-0 bg-white rounded-xl shadow-2xl min-w-28 py-2 z-10 opacity-0 pointer-events-none -translate-y-2 transition-all duration-200">
        <button data-lang="fr" class="nav-lang-item flex items-center gap-2 w-full px-4 py-2 text-sm font-medium text-gray-800 hover:bg-amber-50 transition-colors cursor-pointer bg-transparent border-none"
          style="font-family:var(--font-body)">${flagSvg('fr')} Français</button>
        <button data-lang="en" class="nav-lang-item flex items-center gap-2 w-full px-4 py-2 text-sm font-medium text-gray-800 hover:bg-amber-50 transition-colors cursor-pointer bg-transparent border-none"
          style="font-family:var(--font-body)">${flagSvg('en')} English</button>
        <button data-lang="de" class="nav-lang-item flex items-center gap-2 w-full px-4 py-2 text-sm font-medium text-gray-800 hover:bg-amber-50 transition-colors cursor-pointer bg-transparent border-none"
          style="font-family:var(--font-body)">${flagSvg('de')} Deutsch</button>
      </div>
    </div>
  </nav>

  <!-- Mobile Menu Drawer -->
  <div id="nav-mobile-menu"
    class="fixed z-40 left-0 right-0 bottom-0 overflow-y-auto flex flex-col gap-1 px-6 py-6 -translate-x-full transition-transform duration-400"
    style="top:var(--navbar-mob); background:var(--color-primary)">

    ${mobileLinks.slice(0, 2).join('')}

    <!-- Collections submenu -->
    <button id="mob-col-toggle"
      class="flex items-center justify-between w-full py-3 text-base font-semibold text-white border-b border-white/15 bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer text-left"
      style="font-family:var(--font-body)">
          ${t('navbar.collections')}
          <svg id="mob-col-chevron" class="w-4.5 h-4.5 fill-white transition-transform duration-200" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
      </svg>
    </button>
    <div id="mob-col-sub" class="hidden flex-col pl-4">
      ${mobileColLinks}
    </div>

    ${mobileLinks.slice(2).join('')}

    <!-- Mobile lang -->
    <div class="flex gap-6 mt-auto pt-6 border-t border-white/15">
      <button data-lang="fr" class="mob-lang-btn flex items-center gap-2 text-sm font-semibold bg-transparent border-none cursor-pointer hover:opacity-100 transition-opacity"
        style="font-family:var(--font-body)">${flagSvg('fr')} FR</button>
      <button data-lang="en" class="mob-lang-btn flex items-center gap-2 text-sm font-semibold bg-transparent border-none cursor-pointer hover:opacity-100 transition-opacity"
        style="font-family:var(--font-body)">${flagSvg('en')} EN</button>
      <button data-lang="de" class="mob-lang-btn flex items-center gap-2 text-sm font-semibold bg-transparent border-none cursor-pointer hover:opacity-100 transition-opacity"
        style="font-family:var(--font-body)">${flagSvg('de')} DE</button>
    </div>
  </div>
  `
}

// ── Interactions ─────────────────────────────────────────────
export function initNavbarInteractions() {
  const dropdownToggle  = document.getElementById('nav-dropdown-toggle')
  const dropdownMenu    = document.getElementById('nav-dropdown-menu')
  const dropdownChevron = document.getElementById('nav-dropdown-chevron')

  function openDropdown() {
    dropdownMenu.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-2')
    dropdownMenu.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0')
    dropdownToggle.setAttribute('aria-expanded', 'true')
    dropdownChevron.classList.add('rotate-180')
  }
  function closeDropdown() {
    dropdownMenu.classList.add('opacity-0', 'pointer-events-none', '-translate-y-2')
    dropdownMenu.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0')
    dropdownToggle.setAttribute('aria-expanded', 'false')
    dropdownChevron.classList.remove('rotate-180')
  }

  dropdownToggle?.addEventListener('click', (e) => {
    e.stopPropagation()
    dropdownMenu.classList.contains('opacity-100') ? closeDropdown() : openDropdown()
    closeLangMenu()
  })

  // Language switcher
  const langToggle = document.getElementById('nav-lang-toggle')
  const langMenu   = document.getElementById('nav-lang-menu')

  function openLangMenu() {
    langMenu.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-2')
    langMenu.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0')
    langToggle.setAttribute('aria-expanded', 'true')
  }
  function closeLangMenu() {
    langMenu.classList.add('opacity-0', 'pointer-events-none', '-translate-y-2')
    langMenu.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0')
    langToggle.setAttribute('aria-expanded', 'false')
  }

  langToggle?.addEventListener('click', (e) => {
    e.stopPropagation()
    langMenu.classList.contains('opacity-100') ? closeLangMenu() : openLangMenu()
    closeDropdown()
  })

  document.querySelectorAll('.nav-lang-item').forEach(btn => {
    btn.addEventListener('click', () => {
      closeLangMenu()
      saveLang(btn.dataset.lang)
      setActiveLang(btn.dataset.lang)
      window.location.reload()
    })
  })

  document.addEventListener('click', () => { closeDropdown(); closeLangMenu() })

  // Mobile hamburger
  const hamburger  = document.getElementById('nav-hamburger')
  const mobileMenu = document.getElementById('nav-mobile-menu')
  const hamL1 = document.getElementById('ham-l1')
  const hamL2 = document.getElementById('ham-l2')
  const hamL3 = document.getElementById('ham-l3')

  hamburger?.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('-translate-x-full')
    if (isOpen) {
      mobileMenu.classList.add('-translate-x-full')
      hamburger.setAttribute('aria-expanded', 'false')
      hamL1.classList.remove('rotate-45', 'translate-y-2')
      hamL2.classList.remove('opacity-0')
      hamL3.classList.remove('-rotate-45', '-translate-y-2')
      document.body.style.overflow = ''
    } else {
      mobileMenu.classList.remove('-translate-x-full')
      hamburger.setAttribute('aria-expanded', 'true')
      hamL1.classList.add('rotate-45', 'translate-y-2')
      hamL2.classList.add('opacity-0')
      hamL3.classList.add('-rotate-45', '-translate-y-2')
      document.body.style.overflow = 'hidden'
    }
  })

  // Mobile collections submenu
  const mobColToggle  = document.getElementById('mob-col-toggle')
  const mobColSub     = document.getElementById('mob-col-sub')
  const mobColChevron = document.getElementById('mob-col-chevron')

  mobColToggle?.addEventListener('click', () => {
    const isOpen = !mobColSub.classList.contains('hidden')
    if (isOpen) {
      mobColSub.classList.add('hidden')
      mobColSub.classList.remove('flex')
      mobColChevron.classList.remove('rotate-180')
    } else {
      mobColSub.classList.remove('hidden')
      mobColSub.classList.add('flex')
      mobColChevron.classList.add('rotate-180')
    }
  })

  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('-translate-x-full')
      hamburger?.setAttribute('aria-expanded', 'false')
      hamL1?.classList.remove('rotate-45', 'translate-y-2')
      hamL2?.classList.remove('opacity-0')
      hamL3?.classList.remove('-rotate-45', '-translate-y-2')
      document.body.style.overflow = ''
    })
  })

  document.querySelectorAll('.mob-lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      saveLang(btn.dataset.lang)
      setActiveLang(btn.dataset.lang)
      window.location.reload()
    })
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeDropdown(); closeLangMenu() }
  })

  // Init lang (detects browser language on first visit)
  setActiveLang(getActiveLang())
}

// ── Language helpers ─────────────────────────────────────────
export function setActiveLang(lang) {
  document.querySelectorAll('[data-current-lang]').forEach(el => {
    el.textContent = lang.toUpperCase()
  })
  // Desktop dropdown: active = dark red text (white background)
  document.querySelectorAll('.nav-lang-item').forEach(btn => {
    const isActive = btn.dataset.lang === lang
    btn.style.fontWeight = isActive ? '700' : '500'
    btn.style.color = isActive ? '#702424' : ''
  })
  // Mobile drawer: active = white (dark red background)
  document.querySelectorAll('.mob-lang-btn').forEach(btn => {
    const isActive = btn.dataset.lang === lang
    btn.style.fontWeight = isActive ? '700' : '500'
    btn.style.color = isActive ? '#ffffff' : 'rgba(255,255,255,0.7)'
  })
}
