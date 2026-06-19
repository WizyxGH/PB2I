/**
 * PB2I — Reusable Carousel Logic
 */

export function initCarousel({
  trackId,
  dotsId,
  itemSelector,
  visibleFn,
  autoPlayInterval = 4500,
  carouselId
}) {
  const track = document.getElementById(trackId)
  if (!track) return

  const items = track.querySelectorAll(itemSelector)
  if (!items.length) return

  let current = 0
  const total = items.length
  // Default responsive visible items logic if not provided
  const visible = visibleFn || (() => window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1)
  const maxIdx = () => Math.max(0, total - visible())
  const dotsContainer = document.getElementById(dotsId)

  function buildDots() {
    if (!dotsContainer) return
    const count = maxIdx() + 1
    if (count <= 1) {
      dotsContainer.innerHTML = ''
      return
    }
    dotsContainer.innerHTML = Array.from({ length: count }, (_, i) =>
      `<button class="carousel-dot w-2 h-2 rounded-full transition-all duration-200 cursor-pointer"
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

  // Auto-play
  let timer = setInterval(() => goTo(current + 1 > maxIdx() ? 0 : current + 1), autoPlayInterval)
  const carouselEl = carouselId ? document.getElementById(carouselId) : track.parentElement
  carouselEl?.addEventListener('mouseenter', () => clearInterval(timer))
  carouselEl?.addEventListener('mouseleave', () => {
    timer = setInterval(() => goTo(current + 1 > maxIdx() ? 0 : current + 1), autoPlayInterval)
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

  // Initialize
  setTimeout(() => {
    buildDots()
    goTo(0)
  }, 100) // Slight delay to ensure layout is ready
}
