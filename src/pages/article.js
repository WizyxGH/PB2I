/**
 * PB2I — Article detail JS
 */
import { mountComponents, initFadeIn, createArticleCard, formatArticleDate, initCarousel } from '../components.js'
import { fetchArticles } from '../utils/api.js'
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
    const baseUrl = import.meta.env.BASE_URL || '/'
    const lang = document.documentElement.lang || 'fr'
    const all = await fetchArticles()

    const article = all.find(a => a.id === articleId) || all[0]
    if (!article) throw new Error('Not found')

    // formatArticleDate is now imported from components.js

    // Update page title
    document.title = `${article.title} — PB2I`
    document.getElementById('article-page-title').textContent = `${article.title} — PB2I`

    // Render header
    header.innerHTML = `
      <h1 class="text-body font-heading font-bold text-3xl lg:text-4xl leading-tight mb-6" >
        ${article.title}
      </h1>
    `

    // Render body
    body.innerHTML = `
      <!-- Hero image -->
      <img src="${article.thumbnail}" alt="${article.title}"
        class="w-full rounded-2xl my-10 shadow-md object-cover max-h-[320px]"
        onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80'">

      <!-- Intro paragraphs -->
      ${article.content.slice(0, 2).map(p => `<p class="text-muted text-base leading-loose mb-6" >${p}</p>`).join('')}

      <!-- Rest of content -->
      ${article.content.slice(2).map(p => `<p class="text-muted text-base leading-loose mb-6" >${p}</p>`).join('')}

      <!-- Author -->
      <div class="border-primary/10 flex items-center gap-3 mt-12 pt-8 border-t" >
        <div class="bg-primary w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
          >${article.author.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
        <div>
          <p class="text-primary text-sm font-semibold" >${article.author}</p>
          <p class="text-black/50 text-xs" >${formatArticleDate(article.date, lang)}</p>
        </div>
      </div>
    `

    // Related articles
    const related = all.filter(a => a.id !== article.id).slice(0, 8) // up to 8 articles for the carousel
    const relTrack = document.getElementById('articles-track')
    if (relTrack) {
      const baseUrl = import.meta.env.BASE_URL || '/'
      relTrack.innerHTML = related.map((a, i) => `
        <div class="carousel-item flex-[0_0_85%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(25%-18px)] min-w-0">
          ${createArticleCard(a, i, baseUrl, lang)}
        </div>
      `).join('')
      initFadeIn('[data-fade]')
      
      initCarousel({
        trackId: 'articles-track',
        dotsId: 'articles-dots',
        itemSelector: '.carousel-item',
        visibleFn: () => window.innerWidth >= 1024 ? 4 : window.innerWidth >= 640 ? 2 : 1,
        carouselId: 'articles-carousel'
      })
    }

  } catch {
    if (header) header.innerHTML = '<h1 class="text-2xl font-bold text-gray-800">Article non trouvé</h1>'
    if (body)   body.innerHTML   = '<p class="text-gray-500">Cet article n\'existe pas ou a été supprimé.</p>'
  }
}

loadArticle()
