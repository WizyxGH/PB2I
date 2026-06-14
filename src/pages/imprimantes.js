/**
 * PB2I — Imprimantes page JS
 */
import { mountComponents, initFadeIn } from '/src/components.js'

window.PB2I_PAGE = 'home'
mountComponents('collections')
initFadeIn('[data-fade]')
