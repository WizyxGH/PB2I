/**
 * PB2I — Notre histoire page JS
 */
import { mountComponents } from '../components.js'
import { initI18n, translateDOM } from '../utils/i18n.js'

window.PB2I_PAGE = 'histoire'
await initI18n()
  mountComponents('histoire')
  translateDOM()
