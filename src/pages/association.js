/**
 * PB2I — Association page JS
 */
import { mountComponents } from '../components.js'
import { initI18n, translateDOM } from '../utils/i18n.js'

window.PB2I_PAGE = 'association'
await initI18n()
  mountComponents('association')
  translateDOM()
