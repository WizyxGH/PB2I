/**
 * PB2I — Actualités JS
 */
import { mountComponents, initFadeIn, createArticleCard } from '../components.js'
import { fetchArticles } from '../utils/api.js'
import { initI18n, translateDOM } from '../utils/i18n.js'

window.PB2I_PAGE = 'articles'
await initI18n()
  mountComponents('actualites')
  translateDOM()

async function loadArticles() {
  const grid      = document.getElementById('articles-grid')
  const noArticle = document.getElementById('no-articles')
  if (!grid) return

  try {
    const baseUrl = import.meta.env.BASE_URL || '/'
    const lang = document.documentElement.lang || 'fr' // needed for date formatting
    const articles = await fetchArticles()

    if (!articles.length) {
      grid.innerHTML = ''
      noArticle?.classList.remove('hidden')
      return
    }

    grid.innerHTML = articles.map((a, i) => createArticleCard(a, i, baseUrl, lang)).join('')

    initFadeIn('[data-fade]')
  } catch (err) {
    console.error(err)
    grid.innerHTML = '<p class="col-span-3 text-center text-sm text-gray-400 py-12 italic">Impossible de charger les articles.</p>'
  }
}

loadArticles()
