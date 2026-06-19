/**
 * PB2I — Musée page JS
 * Loads machines from JSON, renders grid, handles modal
 */
import { mountComponents, initFadeIn } from '../../components.js'
import { fetchCollection } from '../../utils/api.js'
import { getActiveLang } from '/src/utils/lang.js'
import { initI18n, translateDOM } from '../../utils/i18n.js'

window.PB2I_PAGE = 'home'
await initI18n()
  mountComponents('musee')
  translateDOM()

const baseUrl = import.meta.env.BASE_URL || '/'

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

  // Format description: support paragraphs and basic bullet lists (starting with - or •)
  const rawDesc = machine.description || ''
  const formattedDesc = rawDesc.split('\n').reduce((acc, line) => {
    line = line.trim()
    if (!line) return acc

    const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      if (acc.inList) {
        acc.html += '</ul>'
        acc.inList = false
      }
      const alt = imgMatch[1];
      const src = imgMatch[2].startsWith('/') ? baseUrl + imgMatch[2].slice(1) : imgMatch[2];
      acc.html += `<img src="${src}" alt="${alt}" class="w-auto max-w-full mx-auto rounded-xl my-5 shadow-sm object-contain max-h-72 bg-white p-2 border" style="border-color:rgba(0,0,0,0.08)">`
      return acc
    }

    if (line.startsWith('- ') || line.startsWith('• ')) {
      if (!acc.inList) {
        acc.html += '<ul class="list-disc list-inside space-y-1 mb-3 ml-2">'
        acc.inList = true
      }
      acc.html += `<li>${line.substring(2)}</li>`
    } else {
      if (acc.inList) {
        acc.html += '</ul>'
        acc.inList = false
      }
      acc.html += `<p class="mb-3">${line}</p>`
    }
    return acc
  }, { html: '', inList: false })
  if (formattedDesc.inList) formattedDesc.html += '</ul>'
  
  modalDesc.innerHTML = formattedDesc.html

  modalImg.src           = machine.image.startsWith('/') ? baseUrl + machine.image.slice(1) : baseUrl + machine.image
  modalImg.alt           = machine.name

  const scrollContainer = overlay.querySelector('.overflow-y-auto')
  setTimeout(() => {
    if (scrollContainer) scrollContainer.scrollTop = 0
  }, 10)

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
    const data = await fetchCollection('musee')
    const machines = data.machines || []

    grid.innerHTML = machines.map((m, i) => `
      <button
        class="card-machine h-full focus:outline-none focus:ring-2 focus:ring-offset-2"
        style="--tw-ring-color:var(--color-primary)"
        data-id="${m.id}" data-fade
        style="animation-delay:${i * 40}ms"
        aria-label="En savoir plus sur ${m.name}">
        <img src="${baseUrl}${m.image.startsWith('/') ? m.image.slice(1) : m.image}" alt="${m.name}"
          class="w-28 h-24 object-contain mx-auto"
          onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&q=50'">
        <p class="text-body font-heading font-bold text-sm leading-snug text-center transition-colors duration-200" >
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
