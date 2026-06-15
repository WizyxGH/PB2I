/**
 * PB2I — Contact page JS
 */
import { mountComponents } from '../components.js'

window.PB2I_PAGE = 'home'
mountComponents('contact')

const form    = document.getElementById('contact-form')
const success = document.getElementById('form-success')
const errorEl = document.getElementById('form-error')
const submit  = document.getElementById('contact-submit')
const emailInput = document.getElementById('contact-email')
const emailError = document.getElementById('email-error')

// Email validation
emailInput?.addEventListener('blur', () => {
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)
  emailError?.classList.toggle('hidden', valid || !emailInput.value)
})

// Form submit (mailto fallback + UI feedback)
form?.addEventListener('submit', (e) => {
  e.preventDefault()

  const email   = emailInput?.value.trim()
  const objet   = document.getElementById('contact-objet')?.value.trim()
  const message = document.getElementById('contact-message')?.value.trim()

  if (!email || !objet || !message) {
    errorEl?.classList.remove('hidden')
    success?.classList.add('hidden')
    return
  }

  // Build mailto link
  const mailtoLink = `mailto:pb2i.belfort@gmail.com?subject=${encodeURIComponent(objet)}&body=${encodeURIComponent(`De: ${email}\n\n${message}`)}`

  // Show success message
  success?.classList.remove('hidden')
  errorEl?.classList.add('hidden')

  // Open mailto
  window.location.href = mailtoLink

  // Reset form after short delay
  setTimeout(() => {
    form.reset()
    success?.classList.add('hidden')
  }, 5000)
})
