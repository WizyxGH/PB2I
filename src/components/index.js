/**
 * PB2I — Components entry point
 *
 * Assembles and mounts all shared components (navbar, footer, video overlay).
 * Re-exports utilities so pages can import from '../components.js' sans changement.
 *
 * Structure:
 *   components/navbar.js      → Navbar HTML + interactions + langue
 *   components/footer.js      → Footer HTML
 *   components/video.js       → Video overlay + openVideo()
 *   components/modal.js       → openModal / closeModal / closeAllModals
 *   components/animations.js  → initFadeIn()
 */

import { createNavbar, initNavbarInteractions } from './navbar.js'
import { createFooter }                          from './footer.js'
import { createVideoOverlay, initVideoOverlayClose } from './video.js'

// Re-exports for pages
export { openModal, closeModal, closeAllModals } from './modal.js'
export { openVideo }                             from './video.js'
export { initFadeIn }                            from './animations.js'

/**
 * Injects navbar, footer and video overlay into the page, then wires up all interactions.
 * @param {string} activePage - key matching a navbar link (e.g. 'histoire', 'missions')
 */
export function mountComponents(activePage = '') {
  // Navbar
  const navbarEl = document.createElement('div')
  navbarEl.innerHTML = createNavbar(activePage)
  document.body.prepend(navbarEl)

  // Footer
  const footerEl = document.createElement('div')
  footerEl.innerHTML = createFooter()
  document.body.appendChild(footerEl)

  // Video overlay
  const videoEl = document.createElement('div')
  videoEl.innerHTML = createVideoOverlay()
  document.body.appendChild(videoEl)

  // Wire interactions
  initNavbarInteractions()
  initVideoOverlayClose()
}
