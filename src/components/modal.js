/**
 * PB2I — Modal helpers (shared across pages)
 */

let _openModals = []

export function openModal(overlayEl) {
  if (!overlayEl) return
  overlayEl.classList.remove('opacity-0', 'pointer-events-none')
  overlayEl.classList.add('opacity-100', 'pointer-events-auto')
  document.body.style.overflow = 'hidden'
  _openModals.push(overlayEl)
}

export function closeModal(overlayEl) {
  if (!overlayEl) return
  overlayEl.classList.add('opacity-0', 'pointer-events-none')
  overlayEl.classList.remove('opacity-100', 'pointer-events-auto')
  _openModals = _openModals.filter(m => m !== overlayEl)
  if (_openModals.length === 0) document.body.style.overflow = ''
}

export function closeAllModals() {
  _openModals.forEach(m => closeModal(m))
}
