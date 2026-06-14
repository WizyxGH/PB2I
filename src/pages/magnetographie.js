/**
 * PB2I — Magnétographie page JS
 */
import { mountComponents, initFadeIn } from '/src/components.js'

window.PB2I_PAGE = 'home'
mountComponents('collections')

// Engine data
const engines = {
  mg100: {
    title: 'Moteur magnétographique MG100',
    content: `
      <h3 class="font-heading font-bold text-lg mb-4" style="color:var(--color-text-body)">Moteur MG100 — 6 000 tr/min</h3>
      <p class="mb-4">Le MG100 est le premier moteur magnétographique développé par Bull à Belfort. Il constitue le cœur de l'imprimante MP6090, tournant à 6 000 tours par minute pour permettre une impression de 6 090 lignes par minute.</p>
      <p class="mb-4">Le tambour du MG100, d'un diamètre de 150 mm, est recouvert d'une couche d'oxyde de fer analogue à celle des bandes magnétiques. Des têtes d'écriture magnétique créent l'image latente ligne par ligne à la vitesse de rotation du tambour.</p>
      <p>La précision de fabrication requise pour ce moteur est exceptionnelle : le tambour doit être parfaitement cylindrique à 0,5 micron près pour garantir la qualité d'impression.</p>
    `
  },
  mg150: {
    title: 'Moteur magnétographique MG150',
    content: `
      <h3 class="font-heading font-bold text-lg mb-4" style="color:var(--color-text-body)">Moteur MG150 — 9 000 tr/min</h3>
      <p class="mb-4">Le MG150 représente la deuxième génération des moteurs magnétographiques Bull. Grâce à des roulements perfectionnés et un tambour plus léger en alliage d'aluminium, il atteint 9 000 tours par minute pour un débit de 9 000 lignes par minute.</p>
      <p class="mb-4">Ce moteur équipe les imprimantes de la série MP9000, conçues pour les centres de traitement de données à fort volume. Le système de refroidissement par air forcé est intégré dans le carter du moteur.</p>
      <p>Le MG150 introduit également un système de contrôle de vitesse par asservissement numérique, garantissant une stabilité de rotation à ±0,01% quelle que soit la charge.</p>
    `
  },
  mg200: {
    title: 'Moteur magnétographique MG200',
    content: `
      <h3 class="font-heading font-bold text-lg mb-4" style="color:var(--color-text-body)">Moteur MG200 — 12 000 tr/min</h3>
      <p class="mb-4">Le MG200 est l'apogée de la technologie magnétographique Bull. Tournant à 12 000 tours par minute, il permet une impression de 12 000 lignes par minute, soit 200 pages A4 par minute — une performance qui reste remarquable même selon les standards actuels.</p>
      <p class="mb-4">Ce moteur utilise des roulements magnétiques à lévitation (forerunner des roulements magnétiques modernes) pour éliminer tout frottement mécanique. Cette technologie, alors très avancée, a nécessité 5 ans de recherche et développement dans les laboratoires Bull de Belfort.</p>
      <p>Le MG200 n'a été produit qu'en série limitée (environ 200 exemplaires) en raison de la complexité de sa fabrication. C'est l'une des pièces maîtresses de la collection PB2I.</p>
    `
  }
}

// Modal refs
const overlay      = document.getElementById('engine-overlay')
const modalTitle   = document.getElementById('engine-modal-title')
const modalBody    = document.getElementById('engine-modal-body')
const modalClose   = document.getElementById('engine-modal-close')

function openEngineModal(engineId) {
  const engine = engines[engineId]
  if (!engine || !overlay) return

  modalTitle.textContent = engine.title
  modalBody.innerHTML    = engine.content

  overlay.classList.remove('opacity-0', 'pointer-events-none')
  overlay.classList.add('opacity-100', 'pointer-events-auto')
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  overlay?.classList.add('opacity-0', 'pointer-events-none')
  overlay?.classList.remove('opacity-100', 'pointer-events-auto')
  document.body.style.overflow = ''
}

modalClose?.addEventListener('click', closeModal)
overlay?.addEventListener('click', (e) => { if (e.target === overlay) closeModal() })
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal() })

// Attach to engine cards
document.querySelectorAll('.engine-card').forEach(card => {
  const open = () => openEngineModal(card.dataset.engine)
  card.addEventListener('click', open)
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open() })
})

initFadeIn('[data-fade]')
