/**
 * PB2I — Musée page JS
 * Loads machines from JSON, renders grid, handles modal
 */
import { mountComponents, initFadeIn } from '/src/components.js'
import { getActiveLang } from '/src/utils/lang.js'

window.PB2I_PAGE = 'home'
mountComponents('collections')

// ── Refs ───────────────────────────────────────────────────────
const grid    = document.getElementById('machines-grid')
const overlay = document.getElementById('machine-overlay')
const modalImg   = document.getElementById('modal-img')
const modalTitle = document.getElementById('modal-title')
const modalName  = document.getElementById('modal-name')
const modalDesc  = document.getElementById('modal-desc')
const closeBtn   = document.getElementById('modal-close')

// ── Modal helpers ─────────────────────────────────────────────
function openMachineModal(machine) {
  modalTitle.textContent = machine.name
  modalName.textContent  = machine.name
  modalDesc.textContent  = machine.description
  modalImg.src           = machine.image
  modalImg.alt           = machine.name

  overlay.classList.remove('opacity-0', 'pointer-events-none')
  overlay.classList.add('opacity-100', 'pointer-events-auto')
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  overlay.classList.add('opacity-0', 'pointer-events-none')
  overlay.classList.remove('opacity-100', 'pointer-events-auto')
  document.body.style.overflow = ''
}

closeBtn?.addEventListener('click', closeModal)
overlay?.addEventListener('click', (e) => { if (e.target === overlay) closeModal() })
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal() })

// ── Load & render machines ────────────────────────────────────
async function loadMachines() {
  if (!grid) return
  try {
    const lang = getActiveLang()
    const baseUrl = import.meta.env.BASE_URL || '/'
    const res  = await fetch(`${baseUrl}data/${lang}/collections/musee.json`)
    const data = await res.json()
    const machines = data.machines || []

    grid.innerHTML = machines.map((m, i) => `
      <button
        class="card-machine text-left cursor-pointer border-transparent transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
        style="--tw-ring-color:var(--color-primary)"
        data-id="${m.id}" data-fade
        style="animation-delay:${i * 40}ms"
        aria-label="En savoir plus sur ${m.name}">
        <img src="${m.image}" alt="${m.name}"
          class="w-28 h-24 object-contain mx-auto"
          onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&q=50'">
        <p class="font-heading font-bold text-sm leading-snug text-center transition-colors duration-200" style="color:var(--color-text-body)">
          ${m.name}
        </p>
      </button>
    `).join('')

    // Attach click handlers
    grid.querySelectorAll('[data-id]').forEach(btn => {
      const machine = machines.find(m => m.id === btn.dataset.id)
      if (!machine) return
      const open = () => openMachineModal(machine)
      btn.addEventListener('click', open)
      btn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open() })
    })

    initFadeIn('[data-fade]')

  } catch (err) {
    console.error('Error loading machines:', err)
    grid.innerHTML = '<p class="col-span-full text-center text-sm text-gray-400 italic py-8">Impossible de charger les machines.</p>'
  }
}

loadMachines()
