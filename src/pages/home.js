/**
 * PB2I — Homepage JS
 */

import { mountComponents, initFadeIn, initCarousel, formatArticleDate } from '../components.js'
import { fetchArticles } from '../utils/api.js'
import { initI18n, translateDOM } from '../utils/i18n.js'

window.PB2I_PAGE = 'home'

// Mount navbar + footer
await initI18n()
  mountComponents('')
  translateDOM()

// ── Carousel ────────────────────────────────────────────────
initCarousel({
  trackId: 'carousel-track',
  dotsId: 'carousel-dots',
  itemSelector: '.card-image-wrap',
  carouselId: 'collections-carousel'
})

// ── Load latest articles ─────────────────────────────────────
async function loadNews() {
  const newsList = document.getElementById('news-list')
  if (!newsList) return

  try {
    const lang = document.documentElement.lang || 'fr'
    const baseUrl = import.meta.env.BASE_URL || '/'
    const all = await fetchArticles()
    const articles = all.slice(0, 3)

    newsList.innerHTML = articles.map(a => `
      <a href="${baseUrl}article.html?id=${a.id}"
        class="bg-white border-2 border-[#252525] flex gap-4 items-start overflow-hidden relative w-full min-h-[80px] shrink-0 no-underline hover:scale-[1.01] transition-transform duration-150">
        <img src="${a.thumbnail}" alt="${a.title}"
          class="w-20 sm:w-24 self-stretch object-cover shrink-0"
          onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&q=60'">
        <div class="flex-1 min-w-0 pr-3 py-2 flex flex-col justify-between gap-1">
          <p class="font-heading font-semibold text-sm text-[#252525] leading-snug line-clamp-2">${a.title}</p>
          <p class="text-[11px] text-[#252525]/80 line-clamp-1 leading-normal">${a.excerpt || ''}</p>
          <p class="text-[10px] font-semibold text-[#252525] text-right">${formatArticleDate(a.date, lang)}</p>
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
