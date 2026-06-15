/**
 * PB2I — Language utility
 *
 * Returns the active language code ('fr' | 'en' | 'de').
 *
 * Priority:
 *  1. Value stored in localStorage ('pb2i_lang') — set when user explicitly switches
 *  2. Browser/navigator language (navigator.language or navigator.languages)
 *  3. Default: 'fr'
 *
 * Only the three supported languages are accepted; any other browser language
 * falls back to French.
 */

const SUPPORTED = ['fr', 'en', 'de']
const STORAGE_KEY = 'pb2i_lang'

/**
 * Detect the browser's preferred language from the supported set.
 * Tries navigator.languages first (ordered preference list), then navigator.language.
 */
function detectBrowserLang() {
  const candidates = [
    ...(navigator.languages || []),
    navigator.language,
  ].filter(Boolean)

  for (const tag of candidates) {
    // Match on the primary sub-tag (e.g. 'fr' from 'fr-FR' or 'fr-CH')
    const primary = tag.split('-')[0].toLowerCase()
    if (SUPPORTED.includes(primary)) return primary
  }
  return 'fr'
}

/**
 * Get the language to display.
 * Uses localStorage if the user has already chosen, otherwise detects from browser.
 * Also writes the detected language to localStorage on first visit.
 */
export function getActiveLang() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && SUPPORTED.includes(stored)) return stored

  // First visit: detect and persist
  const detected = detectBrowserLang()
  localStorage.setItem(STORAGE_KEY, detected)
  return detected
}

/**
 * Persist a language choice and return it.
 */
export function saveLang(lang) {
  if (!SUPPORTED.includes(lang)) return
  localStorage.setItem(STORAGE_KEY, lang)
}
