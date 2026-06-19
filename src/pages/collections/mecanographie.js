/**
 * PB2I — Mécanographie page JS
 */
import { mountComponents, initFadeIn } from '/src/components.js'
import { getActiveLang } from '/src/utils/lang.js'
import { initI18n, translateDOM } from '../../utils/i18n.js'
import { fetchCollection } from '../../utils/api.js'

window.PB2I_PAGE = 'home'
await initI18n()
  mountComponents('mecanographie')
  translateDOM()

const baseUrl = import.meta.env.BASE_URL || '/'

// ── Refs ───────────────────────────────────────────────────────
const grid    = document.getElementById('tech-grid')
const overlay = document.getElementById('machine-overlay')
const modalImg   = document.getElementById('modal-img')
const modalTitle = document.getElementById('modal-title')
const modalName  = document.getElementById('modal-name')
const modalDesc  = document.getElementById('modal-desc')
const closeBtn   = document.getElementById('modal-close')

// ── Modal helpers ─────────────────────────────────────────────
function openTechModal(tech) {
  modalTitle.textContent = tech.name
  modalName.textContent  = tech.name

  const rawDesc = tech.description || ''
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

  modalImg.src           = tech.image.startsWith('/') ? baseUrl + tech.image.slice(1) : tech.image
  modalImg.alt           = tech.name

  overlay.classList.remove('opacity-0', 'pointer-events-none')
  overlay.classList.add('opacity-100', 'pointer-events-auto')
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  overlay.classList.add('opacity-0', 'pointer-events-none')
  overlay.classList.remove('opacity-100', 'pointer-events-auto')
  document.body.style.overflow = ''
}

if (closeBtn && overlay) {
  closeBtn.addEventListener('click', closeModal)
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal()
  })
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal()
  })
}

// ── Load Data & Build Grid ────────────────────────────────────
async function loadTechs() {
  if (!grid) return

  try {
    const techs = await fetchCollection('mecanographie')
    
    grid.innerHTML = techs.map(tech => {
      const imgUrl = tech.image.startsWith('/') ? baseUrl + tech.image.slice(1) : tech.image
      return `
      <button class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border text-left flex flex-col group h-full"
        style="border-color:rgba(0,0,0,0.08)"
        data-id="${tech.id}"
        aria-label="Détails : ${tech.name}">
        <div class="bg-warm-bg w-full h-40 overflow-hidden relative" >
          <img src="${imgUrl}" alt="${tech.name}" class="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105" loading="lazy">
        </div>
        <div class="p-4 flex flex-col flex-1">
          <h3 class="text-body font-bold text-sm mb-1" >${tech.name}</h3>
          <span class="text-primary text-xs font-semibold mt-auto" >En savoir plus ↗</span>
        </div>
      </button>
      `
    }).join('')

    // Add click events
    const btns = grid.querySelectorAll('button[data-id]')
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const t = techs.find(x => x.id === btn.getAttribute('data-id'))
        if (t) openTechModal(t)
      })
    })

  } catch (err) {
    console.error('Error loading mecanographie JSON:', err)
  }
}

document.addEventListener('DOMContentLoaded', loadTechs)

// YouTube Modals (videos)
const videoCards = document.querySelectorAll('.card-video')
if (videoCards.length > 0) {
  // simple youtube modal implementation
  videoCards.forEach(card => {
    card.addEventListener('click', () => {
      const ytId = card.getAttribute('data-youtube')
      if (!ytId) return
      
      const iframe = document.createElement('iframe')
      iframe.src = `https://www.youtube.com/embed/${ytId}?autoplay=1`
      iframe.setAttribute('allowfullscreen', '')
      iframe.setAttribute('allow', 'autoplay; encrypted-media')
      iframe.className = 'w-full h-full rounded-xl shadow-2xl'
      
      const modal = document.createElement('div')
      modal.className = 'fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm opacity-0 transition-opacity duration-300'
      
      const content = document.createElement('div')
      content.className = 'relative w-full max-w-4xl aspect-video scale-95 transition-transform duration-300'
      
      const close = document.createElement('button')
      close.className = 'absolute -top-10 right-0 text-white hover:text-gray-300 text-3xl leading-none z-10 p-2'
      close.innerHTML = '×'
      close.setAttribute('aria-label', 'Fermer la vidéo')
      
      content.appendChild(iframe)
      content.appendChild(close)
      modal.appendChild(content)
      document.body.appendChild(modal)
      
      // trigger animation
      requestAnimationFrame(() => {
        modal.classList.remove('opacity-0')
        content.classList.remove('scale-95')
      })
      
      const removeModal = () => {
        modal.classList.add('opacity-0')
        content.classList.add('scale-95')
        setTimeout(() => modal.remove(), 300)
      }
      
      close.addEventListener('click', removeModal)
      modal.addEventListener('click', e => {
        if (e.target === modal) removeModal()
      })
      document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
          removeModal()
          document.removeEventListener('keydown', escHandler)
        }
      })
    })
  })
}
