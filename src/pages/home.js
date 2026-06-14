/**
 * PB2I — Homepage JS
 */

import { mountComponents, initFadeIn } from '../components.js'
import '../../data/fr/articles.json' // ensure bundled

window.PB2I_PAGE = 'home'

// Mount navbar + footer
mountComponents('histoire')

// ── Carousel ────────────────────────────────────────────────
const track  = document.getElementById('carousel-track')
const items  = track?.querySelectorAll('.card-image-wrap')
const prev   = document.getElementById('carousel-prev')
const next   = document.getElementById('carousel-next')
const dots   = document.querySelectorAll('.carousel-dot')

if (track && items?.length) {
  let current = 0
  const total   = items.length
  const visible = () => window.innerWidth <= 768 ? 1 : 3
  const maxIdx  = () => Math.max(0, total - visible())

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, maxIdx()))
    const itemW = items[0].offsetWidth + 16
    track.style.transform = `translateX(-${current * itemW}px)`
    dots.forEach((d, i) => {
      d.style.background = i === current ? 'var(--color-primary)' : 'rgba(112,36,36,0.25)'
      d.style.transform  = i === current ? 'scale(1.3)' : 'scale(1)'
    })
  }

  prev?.addEventListener('click', () => goTo(current - 1))
  next?.addEventListener('click', () => goTo(current + 1))
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)))

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

  window.addEventListener('resize', () => goTo(current))
  goTo(0)
}

// ── Load latest articles ─────────────────────────────────────
async function loadNews() {
  const newsList = document.getElementById('news-list')
  if (!newsList) return

  try {
    const lang = localStorage.getItem('pb2i_lang') || 'fr'
    const res  = await fetch(`/data/${lang}/articles.json`)
    const data = await res.json()
    const articles = data.articles?.slice(0, 3) || []

    newsList.innerHTML = articles.map(a => `
      <a href="/article.html?id=${a.id}"
        class="flex items-start gap-3 py-3.5 border-b last:border-0 cursor-pointer hover:opacity-80 transition-opacity duration-150 no-underline"
        style="border-color:rgba(112,36,36,0.12)">
        <img src="${a.thumbnail}" alt="${a.title}"
          class="w-16 h-14 object-cover rounded-lg flex-shrink-0"
          onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&q=60'">
        <div class="flex-1 min-w-0">
          <p class="text-xs mb-0.5" style="color:rgba(37,37,37,0.5)">${a.date}</p>
          <p class="text-sm font-semibold leading-snug" style="color:var(--color-text-body);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${a.title}</p>
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
