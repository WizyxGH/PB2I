/**
 * PB2I — Video overlay component
 */

export function createVideoOverlay() {
  return `
  <div id="video-overlay"
    class="fixed inset-0 z-[1000] bg-black/75 backdrop-blur-sm flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-250">
    <div class="relative w-full max-w-4xl mx-4 aspect-video">
      <button id="video-close"
        class="absolute -top-10 right-0 text-white/80 hover:text-white text-3xl font-light bg-transparent border-none cursor-pointer transition-colors"
        aria-label="Fermer la vidéo">✕</button>
      <iframe id="video-iframe" class="w-full h-full rounded-xl shadow-2xl" title="Lecteur vidéo"
        allow="autoplay; fullscreen" allowfullscreen frameborder="0" src=""></iframe>
    </div>
  </div>
  `
}

export function openVideo(youtubeId) {
  const overlay = document.getElementById('video-overlay')
  const iframe  = document.getElementById('video-iframe')
  if (!overlay || !iframe) return
  iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`
  overlay.classList.remove('opacity-0', 'pointer-events-none')
  overlay.classList.add('opacity-100', 'pointer-events-auto')
  document.body.style.overflow = 'hidden'
}

export function initVideoOverlayClose() {
  const overlay = document.getElementById('video-overlay')
  const iframe  = document.getElementById('video-iframe')
  const closeBtn = document.getElementById('video-close')

  function closeVideo() {
    overlay.classList.add('opacity-0', 'pointer-events-none')
    iframe.src = ''
    document.body.style.overflow = ''
  }

  closeBtn?.addEventListener('click', closeVideo)
  overlay?.addEventListener('click', (e) => { if (e.target === overlay) closeVideo() })
}
