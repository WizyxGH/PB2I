/**
 * PB2I — Homepage JS
 */

import { mountComponents, initFadeIn } from '../components.js'
import { fetchArticles } from '../utils/api.js'
import { initI18n, translateDOM } from '../utils/i18n.js'

window.PB2I_PAGE = 'home'

// Mount navbar + footer
await initI18n()
  mountComponents('')
  translateDOM()

// ── Carousel ────────────────────────────────────────────────
const track  = document.getElementById('carousel-track')
const items  = track?.querySelectorAll('.card-image-wrap')
const prev   = document.getElementById('carousel-prev')
const next   = document.getElementById('carousel-next')


if (track && items?.length) {
  let current = 0
  const total   = items.length
  const visible = () => window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1
  const maxIdx  = () => Math.max(0, total - visible())
  const dotsContainer = document.getElementById('carousel-dots')

  function buildDots() {
    if (!dotsContainer) return
    const count = maxIdx() + 1
    dotsContainer.innerHTML = Array.from({ length: count }, (_, i) =>
      `<button class="carousel-dot w-2 h-2 rounded-full transition-all duration-200"
        style="background:${i === current ? 'var(--color-primary)' : 'rgba(112,36,36,0.25)'};transform:${i === current ? 'scale(1.3)' : 'scale(1)'}"
        aria-label="Slide ${i + 1}"></button>`
    ).join('')
    dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) =>
      d.addEventListener('click', () => goTo(i))
    )
  }

  function updateDots() {
    const allDots = dotsContainer?.querySelectorAll('.carousel-dot')
    allDots?.forEach((d, i) => {
      d.style.background = i === current ? 'var(--color-primary)' : 'rgba(112,36,36,0.25)'
      d.style.transform  = i === current ? 'scale(1.3)' : 'scale(1)'
    })
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, maxIdx()))
    const gap = parseInt(getComputedStyle(track).gap) || 24
    const itemW = items[0].offsetWidth + gap
    track.style.transform = `translateX(-${current * itemW}px)`
    updateDots()
  }

  prev?.addEventListener('click', () => goTo(current - 1))
  next?.addEventListener('click', () => goTo(current + 1))

  // Auto-play
  let timer = setInterval(() => goTo(current + 1 > maxIdx() ? 0 : current + 1), 4500)
  const carouselEl = document.getElementById('collections-carousel')
  carouselEl?.addEventListener('mouseenter', () => clearInterval(timer))
  carouselEl?.addEventListener('mouseleave', () => {
    timer = setInterval(() => goTo(current + 1 > maxIdx() ? 0 : current + 1), 4500)
  })

  // Touch
  let tx = 0
  track.addEventListener('touchstart', e => { tx = e.touches[0].clientX }, { passive: true })
  track.addEventListener('touchend',   e => {
    const diff = tx - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1)
  })

  window.addEventListener('resize', () => {
    // Clamp current to new maxIdx after resize
    current = Math.min(current, maxIdx())
    buildDots()
    goTo(current)
  })

  buildDots()
  goTo(0)
}


// ── Load latest articles ─────────────────────────────────────
async function loadNews() {
  const newsList = document.getElementById('news-list')
  if (!newsList) return

  try {
    const lang = document.documentElement.lang || 'fr'
    const baseUrl = import.meta.env.BASE_URL || '/'
    const all = await fetchArticles()
    const articles = all.slice(0, 3)

    const formatArticleDate = (isoStr) => {
      try {
        const parts = isoStr.split('-')
        let d = new Date(isoStr)
        if (parts.length === 3) {
          d = new Date(parts[0], parseInt(parts[1]) - 1, parts[2])
        }
        if (isNaN(d.valueOf())) return isoStr
        return new Intl.DateTimeFormat(lang || 'fr', { day: 'numeric', month: 'long', year: 'numeric' }).format(d)
      } catch (e) { 
        console.error('Date format error:', e)
        return isoStr 
      }
    }

    newsList.innerHTML = articles.map(a => `
      <a href="${baseUrl}article.html?id=${a.id}"
        class="bg-white border-2 border-[#252525] flex gap-4 items-start overflow-hidden relative w-full min-h-[80px] shrink-0 no-underline hover:scale-[1.01] transition-transform duration-150">
        <img src="${a.thumbnail}" alt="${a.title}"
          class="w-20 sm:w-24 self-stretch object-cover shrink-0"
          onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&q=60'">
        <div class="flex-1 min-w-0 pr-3 py-2 flex flex-col justify-between gap-1">
          <p class="font-heading font-semibold text-sm text-[#252525] leading-snug line-clamp-2">${a.title}</p>
          <p class="text-[11px] text-[#252525]/80 line-clamp-1 leading-normal">${a.excerpt || ''}</p>
          <p class="text-[10px] font-semibold text-[#252525] text-right">${formatArticleDate(a.date)}</p>
        </div>
      </a>
    `).join('')

    if (!articles.length) {
      newsList.innerHTML = '<p class="text-sm text-gray-500 py-4">Aucune actualité disponible.</p>'
    }
  } catch {
    newsList.innerHTML = '<p class="text-sm text-gray-400 py-4 italic">Actualités non disponibles.</p>'
  }
}

loadNews()
initFadeIn('[data-fade]')
