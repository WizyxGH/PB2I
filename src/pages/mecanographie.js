/**
 * PB2I — Mécanographie page JS
 */
import { mountComponents, openVideo } from '/src/components.js'

window.PB2I_PAGE = 'home'
mountComponents('collections')

// ── Flipbook ─────────────────────────────────────────────────
const flipbookEl = document.getElementById('flipbook')
const slides     = flipbookEl?.querySelectorAll('.flipbook-slide')
const prevBtn    = document.getElementById('flipbook-prev')
const nextBtn    = document.getElementById('flipbook-next')
const counter    = document.getElementById('flipbook-counter')

if (slides?.length) {
  let current = 0

  function goTo(idx) {
    slides[current].classList.add('hidden')
    slides[current].classList.remove('is-active')

    current = ((idx % slides.length) + slides.length) % slides.length

    slides[current].classList.remove('hidden')
    slides[current].classList.add('is-active')
    slides[current].style.animation = 'none'
    slides[current].offsetHeight // reflow
    slides[current].style.animation = 'fadeInUp 0.35s ease both'

    if (counter) counter.textContent = `${current + 1} / ${slides.length}`
  }

  prevBtn?.addEventListener('click', () => goTo(current - 1))
  nextBtn?.addEventListener('click', () => goTo(current + 1))

  // Keyboard
  flipbookEl?.setAttribute('tabindex', '0')
  flipbookEl?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  goTo(current - 1)
    if (e.key === 'ArrowRight') goTo(current + 1)
  })

  goTo(0)
}

// ── Video cards ───────────────────────────────────────────────
document.querySelectorAll('.card-video[data-youtube]').forEach(card => {
  const open = () => openVideo(card.dataset.youtube)
  card.addEventListener('click', open)
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open() })
})
