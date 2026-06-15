/**
 * PB2I — Nos missions page JS
 */
import { mountComponents } from '../components.js'
import { initI18n, translateDOM } from '../utils/i18n.js'

window.PB2I_PAGE = 'missions'
await initI18n()
  mountComponents('missions')
  translateDOM()
