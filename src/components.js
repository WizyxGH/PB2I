/**
 * PB2I — Shared Components
 * Injects Navbar and Footer into every page
 */

import './style.css'

// ── Assets ──────────────────────────────────────────────────
const logoUrl = '/assets/logo.png'

// ── Navbar HTML ─────────────────────────────────────────────
function createNavbar(activePage = '') {
  const links = [
    { label: 'Notre histoire', href: '/#histoire', key: 'histoire' },
    { label: 'Nos missions',   href: '/#missions',  key: 'missions'  },
    { label: "L'association",  href: '/association.html', key: 'association' },
    { label: 'Actualités',     href: '/actualites.html',  key: 'actualites' },
    { label: 'Contact',        href: '/contact.html',      key: 'contact'    },
  ]

  const collectionLinks = [
    { label: 'Mécanographie',  href: '/collections/mecanographie.html' },
    { label: 'Imprimantes',    href: '/collections/imprimantes.html'    },
    { label: 'Magnétographie', href: '/collections/magnetographie.html' },
    { label: 'Musée',          href: '/collections/musee.html'          },
  ]

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
  ).join('')

  const mobileColLinks = collectionLinks.map(l =>
    `<a href="${l.href}" class="block py-2 pl-4 text-base text-white/80 border-b border-white/10 hover:text-white transition-colors">${l.label}</a>`
  ).join('')

  return `
  <!-- Skip link -->
  <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:z-[9999]">
    Aller au contenu principal
  </a>

  <!-- Navbar -->
  <nav id="navbar" class="navbar relative" role="navigation" aria-label="Navigation principale">
    
    <!-- Mobile Hamburger (shown only on mobile/tablet, positioned on the left) -->
    <button id="nav-hamburger" class="lg:hidden absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 cursor-pointer p-2 bg-transparent border-none z-50" aria-label="Menu" aria-expanded="false">
      <span class="block w-5.5 h-0.5 bg-white rounded transition-all duration-300 origin-center" id="ham-l1"></span>
      <span class="block w-5.5 h-0.5 bg-white rounded transition-all duration-300" id="ham-l2"></span>
      <span class="block w-5.5 h-0.5 bg-white rounded transition-all duration-300 origin-center" id="ham-l3"></span>
    </button>

    <!-- Logo / Branding (centered on mobile, left-aligned on desktop) -->
    <div class="flex items-center justify-center lg:justify-start w-full lg:w-auto gap-3 flex-shrink-0">
      <a href="/index.html" class="flex items-center gap-2 lg:gap-3">
        <img id="navbar-logo" src="${logoUrl}" alt="Logo PB2I — Lion de Belfort" class="h-8 lg:h-12 w-auto object-contain" onerror="this.style.display='none'">
        <span class="font-heading font-extrabold text-white text-xl lg:text-sm leading-tight">PB2I</span>
      </a>
    </div>

    <!-- Desktop Navigation Links (hidden on mobile/tablet) -->
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
          Nos collections
          <svg id="nav-dropdown-chevron" class="w-4 h-4 fill-white transition-transform duration-200 flex-shrink-0" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
          </svg>
        </button>
        <div id="nav-dropdown-menu"
          class="absolute top-[calc(100%+14px)] left-0 bg-white rounded-xl shadow-2xl min-w-52 py-2 z-10 opacity-0 pointer-events-none -translate-y-2 transition-all duration-200"
          role="menu">
          ${colLinks}
        </div>
      </div>

      ${links.slice(2).map(l =>
        `<a href="${l.href}" class="navbar-link${activePage === l.key ? ' active' : ''}">${l.label}</a>`
      ).join('')}
    </div>

    <!-- Language Switcher (hidden on mobile) -->
    <div id="nav-lang" class="hidden lg:flex relative ml-auto items-center gap-1">
      <button id="nav-lang-toggle"
        class="flex items-center gap-1.5 text-sm font-semibold text-white/90 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
        aria-haspopup="true" aria-expanded="false"
        style="font-family:var(--font-body)">
        <svg class="w-4 h-4 fill-white flex-shrink-0" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 17.93V18c0-.553-.447-1-1-1H8v-2c0-1.103-.897-2-2-2H4.07C3.39 11.217 3 10.15 3 9c0-.276.017-.549.048-.817L8 13v1c0 1.103.897 2 2 2v3.93zM18.929 17H17c-1.103 0-2-.897-2-2v-1l-5.947-5.947A8.003 8.003 0 0112 4c3.773 0 6.935 2.62 7.793 6.151L18 12v2c0 .737.405 1.375 1 1.723-.023.43-.07.855-.071.277z"/>
        </svg>
        <span id="nav-lang-label" data-current-lang>FR</span>
        <svg class="w-4 h-4 fill-white" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
        </svg>
      </button>
      <div id="nav-lang-menu"
        class="absolute top-[calc(100%+8px)] right-0 bg-white rounded-xl shadow-2xl min-w-28 py-2 z-10 opacity-0 pointer-events-none -translate-y-2 transition-all duration-200">
        <button data-lang="fr" class="nav-lang-item flex items-center gap-2 w-full px-4 py-2 text-sm font-medium text-gray-800 hover:bg-amber-50 transition-colors cursor-pointer bg-transparent border-none"
          style="font-family:var(--font-body)">🇫🇷 Français</button>
        <button data-lang="en" class="nav-lang-item flex items-center gap-2 w-full px-4 py-2 text-sm font-medium text-gray-800 hover:bg-amber-50 transition-colors cursor-pointer bg-transparent border-none"
          style="font-family:var(--font-body)">🇬🇧 English</button>
        <button data-lang="de" class="nav-lang-item flex items-center gap-2 w-full px-4 py-2 text-sm font-medium text-gray-800 hover:bg-amber-50 transition-colors cursor-pointer bg-transparent border-none"
          style="font-family:var(--font-body)">🇩🇪 Deutsch</button>
      </div>
    </div>
  </nav>

  <!-- Mobile Menu Drawer -->
  <div id="nav-mobile-menu"
    class="fixed z-40 left-0 right-0 bottom-0 overflow-y-auto flex flex-col gap-1 px-6 py-6 -translate-x-full transition-transform duration-400"
    style="top:var(--navbar-mob); background:var(--color-primary)">

    ${mobileLinks}

    <!-- Collections submenu -->
    <button id="mob-col-toggle"
      class="flex items-center justify-between w-full py-3 text-base font-semibold text-white border-b border-white/15 bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer text-left"
      style="font-family:var(--font-body)">
      Nos collections
      <svg id="mob-col-chevron" class="w-4.5 h-4.5 fill-white transition-transform duration-200" viewBox="0 0 20 20">
        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
      </svg>
    </button>
    <div id="mob-col-sub" class="hidden flex-col pl-4">
      ${mobileColLinks}
    </div>

    <!-- Mobile lang -->
    <div class="flex gap-6 mt-auto pt-8">
      <button data-lang="fr" class="mob-lang-btn text-sm font-semibold text-white/70 bg-transparent border-none cursor-pointer hover:text-white transition-colors"
        style="font-family:var(--font-body)">🇫🇷 FR</button>
      <button data-lang="en" class="mob-lang-btn text-sm font-semibold text-white/70 bg-transparent border-none cursor-pointer hover:text-white transition-colors"
        style="font-family:var(--font-body)">🇬🇧 EN</button>
      <button data-lang="de" class="mob-lang-btn text-sm font-semibold text-white/70 bg-transparent border-none cursor-pointer hover:text-white transition-colors"
        style="font-family:var(--font-body)">🇩🇪 DE</button>
    </div>
  </div>
  `
}

// ── Footer HTML ──────────────────────────────────────────────
function createFooter() {
  const wave = `<svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,30 C180,60 360,0 540,30 C720,60 900,0 1080,30 C1260,60 1350,15 1440,30 L1440,60 L0,60 Z" fill="#702424"/>
  </svg>`

  return `
  <footer class="relative mt-24" role="contentinfo">
    <div class="footer-wave">${wave}</div>
    <div style="background:var(--color-primary)" class="px-6 md:px-12 lg:px-36 py-8 grid grid-cols-2 lg:flex lg:flex-row gap-8 lg:gap-12 justify-between">
      <!-- Branding -->
      <div class="flex flex-col gap-4 col-span-2 lg:col-span-1">
        <img src="${logoUrl}" alt="Logo PB2I" class="h-12 w-auto object-contain self-start" onerror="this.style.display='none'">
        <p class="font-heading font-extrabold text-white text-sm leading-snug max-w-[200px] lg:max-w-[160px]">
          Patrimoine Belfortain de l'Industrie Informatique
        </p>
      </div>

      <!-- Links -->
      <div class="flex flex-col gap-4 col-span-1">
        <h3 class="font-heading text-sm font-semibold text-white uppercase tracking-wider">Liens</h3>
        <nav class="flex flex-col gap-2">
          <a href="/association.html" class="text-xs text-white/75 hover:text-white transition-colors">L'association</a>
          <a href="/actualites.html"  class="text-xs text-white/75 hover:text-white transition-colors">Actualités</a>
          <a href="/contact.html"     class="text-xs text-white/75 hover:text-white transition-colors">Contact</a>
        </nav>
      </div>

      <!-- Mentions légales -->
      <div class="flex flex-col gap-4 col-span-1">
        <h3 class="font-heading text-sm font-semibold text-white uppercase tracking-wider">Mentions légales</h3>
        <nav class="flex flex-col gap-2">
          <a href="/mentions-legales.html" class="text-xs text-white/75 hover:text-white transition-colors">Mentions légales</a>
          <a href="/mentions-legales.html" class="text-xs text-white/75 hover:text-white transition-colors">Confidentialité</a>
        </nav>
      </div>

      <!-- Social -->
      <div class="flex flex-col gap-4 col-span-2 lg:col-span-1">
        <h3 class="font-heading text-sm font-semibold text-white uppercase tracking-wider">Suivez-nous</h3>
        <div class="flex gap-4">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
            class="w-10 h-10 bg-white rounded-lg flex items-center justify-center transition-transform hover:-translate-y-0.5 shadow-sm hover:shadow-md">
            <svg class="w-5 h-5" fill="#702424" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
            </svg>
          </a>
          <a href="mailto:contact@pb2i.fr" aria-label="Email"
            class="w-10 h-10 bg-white rounded-lg flex items-center justify-center transition-transform hover:-translate-y-0.5 shadow-sm hover:shadow-md">
            <svg class="w-5 h-5" fill="none" stroke="#702424" stroke-width="2" viewBox="0 0 24 24">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div style="background:var(--color-primary-dark)" class="text-center py-3">
      <p class="text-xs text-white/50">© 2026 PB2I — Patrimoine Belfortain de l'Industrie Informatique</p>
    </div>
  </footer>
  `
}

// ── Video Overlay ────────────────────────────────────────────
function createVideoOverlay() {
  return `
  <div id="video-overlay"
    class="fixed inset-0 z-[1000] bg-black/75 backdrop-blur-sm flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-250">
    <div class="relative w-full max-w-4xl mx-4 aspect-video">
      <button id="video-close"
        class="absolute -top-10 right-0 text-white/80 hover:text-white text-3xl font-light bg-transparent border-none cursor-pointer transition-colors"
        aria-label="Fermer la vidéo">✕</button>
      <iframe id="video-iframe" class="w-full h-full rounded-xl shadow-2xl"
        allow="autoplay; fullscreen" allowfullscreen frameborder="0" src=""></iframe>
    </div>
  </div>
  `
}

// ── Mount components ─────────────────────────────────────────
export function mountComponents(activePage = '') {
  // Insert navbar before first child of body
  const navbarEl = document.createElement('div')
  navbarEl.innerHTML = createNavbar(activePage)
  document.body.prepend(navbarEl)

  // Insert footer
  const footerEl = document.createElement('div')
  footerEl.innerHTML = createFooter()
  document.body.appendChild(footerEl)

  // Insert video overlay
  const videoEl = document.createElement('div')
  videoEl.innerHTML = createVideoOverlay()
  document.body.appendChild(videoEl)

  // Init interactions
  initNavbarInteractions()
}

// ── Navbar interactions ──────────────────────────────────────
function initNavbarInteractions() {
  // --- Collections dropdown ---
  const dropdownToggle = document.getElementById('nav-dropdown-toggle')
  const dropdownMenu   = document.getElementById('nav-dropdown-menu')
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
    const isOpen = dropdownMenu.classList.contains('opacity-100')
    isOpen ? closeDropdown() : openDropdown()
    closeLangMenu()
  })

  // --- Language switcher ---
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
    const isOpen = langMenu.classList.contains('opacity-100')
    isOpen ? closeLangMenu() : openLangMenu()
    closeDropdown()
  })

  document.querySelectorAll('.nav-lang-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang
      closeLangMenu()
      setActiveLang(lang)
      window.i18n?.setLanguage(lang, window.PB2I_PAGE)
    })
  })

  // Close on outside click
  document.addEventListener('click', () => {
    closeDropdown()
    closeLangMenu()
  })

  // --- Mobile hamburger ---
  const hamburger   = document.getElementById('nav-hamburger')
  const mobileMenu  = document.getElementById('nav-mobile-menu')
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

  // Close mobile menu on link click
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

  // Mobile lang buttons
  document.querySelectorAll('.mob-lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang
      setActiveLang(lang)
      window.i18n?.setLanguage(lang, window.PB2I_PAGE)
    })
  })

  // --- Video overlay close ---
  const videoOverlay = document.getElementById('video-overlay')
  const videoIframe  = document.getElementById('video-iframe')
  const videoClose   = document.getElementById('video-close')

  function closeVideo() {
    videoOverlay.classList.add('opacity-0', 'pointer-events-none')
    videoIframe.src = ''
    document.body.style.overflow = ''
  }

  videoClose?.addEventListener('click', closeVideo)
  videoOverlay?.addEventListener('click', (e) => {
    if (e.target === videoOverlay) closeVideo()
  })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeVideo()
      closeAllModals()
      closeDropdown()
      closeLangMenu()
    }
  })

  // Set current lang from storage
  const savedLang = localStorage.getItem('pb2i_lang') || 'fr'
  setActiveLang(savedLang)
}

// ── Language helpers ─────────────────────────────────────────
function setActiveLang(lang) {
  document.querySelectorAll('[data-current-lang]').forEach(el => {
    el.textContent = lang.toUpperCase()
  })
  document.querySelectorAll('.nav-lang-item, .mob-lang-btn').forEach(btn => {
    const isActive = btn.dataset.lang === lang
    btn.style.fontWeight = isActive ? '700' : '500'
    btn.style.color = isActive ? '#702424' : ''
  })
}

// ── Modal helpers (shared) ───────────────────────────────────
let _openModals = []

export function openModal(overlayEl) {
  if (!overlayEl) return
  overlayEl.classList.remove('opacity-0', 'pointer-events-none')
  overlayEl.classList.add('opacity-100', 'pointer-events-auto')
  document.body.style.overflow = 'hidden'
  _openModals.push(overlayEl)
}

export function closeModal(overlayEl) {
  if (!overlayEl) return
  overlayEl.classList.add('opacity-0', 'pointer-events-none')
  overlayEl.classList.remove('opacity-100', 'pointer-events-auto')
  _openModals = _openModals.filter(m => m !== overlayEl)
  if (_openModals.length === 0) document.body.style.overflow = ''
}

export function closeAllModals() {
  _openModals.forEach(m => closeModal(m))
}

// ── Video player ─────────────────────────────────────────────
export function openVideo(youtubeId) {
  const overlay = document.getElementById('video-overlay')
  const iframe  = document.getElementById('video-iframe')
  if (!overlay || !iframe) return
  iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`
  overlay.classList.remove('opacity-0', 'pointer-events-none')
  overlay.classList.add('opacity-100', 'pointer-events-auto')
  document.body.style.overflow = 'hidden'
}

// ── Intersection Observer (fade in cards) ────────────────────
export function initFadeIn(selector = '[data-fade]') {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate-fade-up')
          entry.target.style.opacity = '1'
        }, i * 60)
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.08 })

  document.querySelectorAll(selector).forEach(el => {
    el.style.opacity = '0'
    observer.observe(el)
  })
}
