/**
 * PB2I — Shared API/Fetch Utils
 */
import { getActiveLang } from './lang.js'

export async function fetchJSON(path) {
  try {
    const lang = getActiveLang() || 'fr'
    const baseUrl = import.meta.env.BASE_URL || '/'
    
    // Assure that path does not start with a slash since baseUrl ends with one
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    const url = `${baseUrl}data/${lang}/${cleanPath}`
    
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status} for ${url}`)
    return await res.json()
  } catch (err) {
    console.error(`Error fetching JSON data for ${path}:`, err)
    throw err
  }
}

export async function fetchArticles() {
  const data = await fetchJSON('articles.json')
  return data.articles || []
}

export async function fetchCollection(collectionName) {
  const data = await fetchJSON(`collections/${collectionName}.json`)
  return data
}
