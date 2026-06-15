/**
 * PB2I — Animation helpers
 */

/**
 * Fade-in elements matching `selector` when they enter the viewport.
 * @param {string} selector - CSS selector, default '[data-fade]'
 */
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
