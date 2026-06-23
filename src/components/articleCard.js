/**
 * PB2I — Article Card Component
 */

export function formatArticleDate(isoStr, lang = 'fr') {
  try {
    const parts = isoStr.split('-')
    let d = new Date(isoStr)
    if (parts.length === 3) {
      d = new Date(parts[0], parseInt(parts[1]) - 1, parts[2])
    }
    if (isNaN(d.valueOf())) return isoStr
    return new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'long', year: 'numeric' }).format(d)
  } catch (e) { 
    console.error('Date format error:', e)
    return isoStr 
  }
}

export function createArticleCard(article, index, baseUrl, lang = 'fr') {
  const authorInitials = article.author.split(' ').map(n => n[0]).join('').slice(0,2)
  return `
    <a href="${baseUrl}article.html?id=${article.id}" class="card-article no-underline h-full" data-fade style="animation-delay:${index * 60}ms">
      <div class="card-article-img-wrap">
        <img src="${article.thumbnail}" alt="" class="card-article-img"
          onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=70'">
      </div>
      <div class="flex flex-col flex-1 p-5 gap-3">
        <h2 class="text-body font-heading font-bold text-lg leading-snug transition-colors duration-200"
          >
          ${article.title}
        </h2>
        <p class="text-sm leading-relaxed flex-1" style="color:var(--color-text-muted);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden">
          ${article.excerpt}
        </p>
        <div class="border-primary/10 flex items-center justify-between pt-3 border-t" >
          <div class="flex items-center gap-2">
            <div class="bg-primary w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              >${authorInitials}</div>
            <div>
              <p class="text-primary text-xs font-semibold" >${article.author}</p>
              <p class="text-black/50 text-xs" >${formatArticleDate(article.date, lang)}</p>
            </div>
          </div>
          <span class="bg-primary text-xs font-semibold px-3 py-1.5 rounded-lg text-white" >
            Lire l'article
          </span>
        </div>
      </div>
    </a>
  `
}
