/**
 * PB2I — Actualités JS
 */
import { mountComponents, initFadeIn } from '../components.js'
import { getActiveLang } from '../utils/lang.js'
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
    const lang = getActiveLang()
    const baseUrl = import.meta.env.BASE_URL || '/'
    const res  = await fetch(`${baseUrl}data/${lang}/articles.json`)
    const data = await res.json()
    const articles = data.articles || []

    if (!articles.length) {
      grid.innerHTML = ''
      noArticle?.classList.remove('hidden')
      return
    }

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

    grid.innerHTML = articles.map((a, i) => `
      <a href="${baseUrl}article.html?id=${a.id}" class="card-article no-underline" data-fade style="animation-delay:${i*60}ms">
        <div class="card-article-img-wrap">
          <img src="${a.thumbnail}" alt="${a.title}" class="card-article-img"
            onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=70'">
        </div>
        <div class="flex flex-col flex-1 p-5 gap-3">
          <h2 class="font-heading font-bold text-lg leading-snug transition-colors duration-200"
            style="color:var(--color-text-body)">
            ${a.title}
          </h2>
          <p class="text-sm leading-relaxed flex-1" style="color:var(--color-text-muted);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden">
            ${a.excerpt}
          </p>
          <div class="flex items-center justify-between pt-3 border-t" style="border-color:rgba(112,36,36,0.12)">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style="background:var(--color-primary)">${a.author.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
              <div>
                <p class="text-xs font-semibold" style="color:var(--color-primary)">${a.author}</p>
                <p class="text-xs" style="color:rgba(37,37,37,0.5)">${formatArticleDate(a.date)}</p>
              </div>
            </div>
            <span class="text-xs font-semibold px-3 py-1.5 rounded-lg text-white" style="background:var(--color-primary)">
              Lire l'article
            </span>
          </div>
        </div>
      </a>
    `).join('')

    initFadeIn('[data-fade]')
  } catch (err) {
    console.error(err)
    grid.innerHTML = '<p class="col-span-3 text-center text-sm text-gray-400 py-12 italic">Impossible de charger les articles.</p>'
  }
}

loadArticles()
