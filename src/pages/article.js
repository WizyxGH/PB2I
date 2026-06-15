/**
 * PB2I — Article detail JS
 */
import { mountComponents, initFadeIn } from '../components.js'
import { getActiveLang } from '../utils/lang.js'
import { initI18n, translateDOM } from '../utils/i18n.js'

window.PB2I_PAGE = 'articles'
await initI18n()
  mountComponents('actualites')
  translateDOM()

async function loadArticle() {
  const params    = new URLSearchParams(window.location.search)
  const articleId = params.get('id')

  const header = document.getElementById('article-header')
  const body   = document.getElementById('article-body')

  try {
    const lang = getActiveLang()
    const baseUrl = import.meta.env.BASE_URL || '/'
    const res  = await fetch(`${baseUrl}data/${lang}/articles.json`)
    const data = await res.json()
    const all  = data.articles || []

    const article = all.find(a => a.id === articleId) || all[0]
    if (!article) throw new Error('Not found')

    const formatArticleDate = (isoStr) => {
      try {
        // Fix for Safari and others: convert to YYYY/MM/DD or just parse it explicitly
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

    // Update page title
    document.title = `${article.title} — PB2I`
    document.getElementById('article-page-title').textContent = `${article.title} — PB2I`

    // Render header
    header.innerHTML = `
      <h1 class="font-heading font-bold text-3xl lg:text-4xl leading-tight mb-6" style="color:var(--color-text-body)">
        ${article.title}
      </h1>
    `

    // Render body
    body.innerHTML = `
      <!-- Intro paragraphs -->
      ${article.content.slice(0, 2).map(p => `<p class="text-base leading-loose mb-6" style="color:var(--color-text-muted)">${p}</p>`).join('')}

      <!-- Hero image -->
      <img src="${article.thumbnail}" alt="${article.title}"
        class="w-full rounded-2xl my-10 shadow-md object-cover max-h-[480px]"
        onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80'">

      <!-- Rest of content -->
      ${article.content.slice(2).map(p => `<p class="text-base leading-loose mb-6" style="color:var(--color-text-muted)">${p}</p>`).join('')}

      <!-- Author -->
      <div class="flex items-center gap-3 mt-12 pt-8 border-t" style="border-color:rgba(112,36,36,0.12)">
        <div class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
          style="background:var(--color-primary)">${article.author.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
        <div>
          <p class="text-sm font-semibold" style="color:var(--color-primary)">${article.author}</p>
          <p class="text-xs" style="color:rgba(37,37,37,0.5)">${formatArticleDate(article.date)}</p>
        </div>
      </div>
    `

    // Related articles
    const related = all.filter(a => a.id !== article.id).slice(0, 4)
    const relGrid = document.getElementById('related-grid')
    if (relGrid) {
      const baseUrl = import.meta.env.BASE_URL || '/'
      relGrid.innerHTML = related.map((a, i) => `
        <a href="${baseUrl}article.html?id=${a.id}" class="card-article no-underline" data-fade style="animation-delay:${i*60}ms">
          <div class="card-article-img-wrap">
            <img src="${a.thumbnail}" alt="${a.title}" class="card-article-img"
              onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=60'">
          </div>
          <div class="p-4 flex flex-col gap-2 flex-1">
            <p class="font-heading font-bold text-sm leading-snug" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;color:var(--color-text-body)">${a.title}</p>
            <p class="text-xs" style="color:rgba(37,37,37,0.5)">${formatArticleDate(a.date)}</p>
            <span class="mt-auto text-xs font-semibold" style="color:var(--color-primary)">Lire l'article</span>
          </div>
        </a>
      `).join('')
      initFadeIn('[data-fade]')
    }

  } catch {
    if (header) header.innerHTML = '<h1 class="text-2xl font-bold text-gray-800">Article non trouvé</h1>'
    if (body)   body.innerHTML   = '<p class="text-gray-500">Cet article n\'existe pas ou a été supprimé.</p>'
  }
}

loadArticle()
