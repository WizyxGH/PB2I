import { getActiveLang } from './lang.js';

let translations = {};

export async function initI18n() {
  const lang = getActiveLang();
  const baseUrl = import.meta.env.BASE_URL || '/';
  try {
    const res = await fetch(`${baseUrl}data/${lang}/ui.json`);
    if (res.ok) {
      translations = await res.json();
    } else {
      console.warn(`Translation file not found: data/${lang}/ui.json`);
    }
  } catch (err) {
    console.error('Failed to load translations for', lang, err);
  }
}

export function t(keyPath) {
  const keys = keyPath.split('.');
  let value = translations;
  for (const key of keys) {
    if (value && value[key] !== undefined) {
      value = value[key];
    } else {
      return keyPath; // Fallback
    }
  }
  return value;
}

export function translateDOM() {
  // Désactivé à la demande de l'utilisateur : seule la navbar est traduite pour le moment.
  /*
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = t(key);
    if (translation !== key) {
      el.innerHTML = translation;
    }
  });
  */
}

// Global exposure if needed by inline scripts
window.i18n = { t, translateDOM };
