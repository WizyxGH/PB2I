/**
 * PB2I — Footer component
 */

const BASE_URL = import.meta.env.BASE_URL || '/'
const logoUrl  = `${BASE_URL}assets/logo.png`

const wave = `<svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,30 C180,60 360,0 540,30 C720,60 900,0 1080,30 C1260,60 1350,15 1440,30 L1440,60 L0,60 Z" fill="#702424"/>
  </svg>`

export function createFooter() {
  return `
  <footer class="relative mt-24" role="contentinfo">
    <div class="footer-wave">${wave}</div>
    <div style="background:var(--color-primary)" class="px-6 md:px-12 lg:px-36 py-8 grid grid-cols-2 lg:flex lg:flex-row gap-8 lg:gap-12 justify-between">
      <!-- Branding -->
      <div class="flex flex-col gap-4 col-span-2 lg:col-span-1">
        <img src="${logoUrl}" alt="Logo PB2I" class="h-12 w-auto object-contain self-start" onerror="this.style.display='none'">
        <p class="font-heading font-extrabold text-white text-sm leading-snug max-w-[200px] lg:max-w-[160px]">
          Patrimoine Belfortain de l'Industrie Informatique
        </p>
      </div>

      <!-- Liens -->
      <div class="flex flex-col gap-4 col-span-1">
        <h3 class="font-heading text-sm font-semibold text-white uppercase tracking-wider">Liens</h3>
        <nav class="flex flex-col gap-2">
          <a href="${BASE_URL}notre-histoire.html" class="text-xs text-white/75 hover:text-white transition-colors">Notre histoire</a>
          <a href="${BASE_URL}nos-missions.html"   class="text-xs text-white/75 hover:text-white transition-colors">Nos missions</a>
          <a href="${BASE_URL}association.html"    class="text-xs text-white/75 hover:text-white transition-colors">L'association</a>
          <a href="${BASE_URL}actualites.html"     class="text-xs text-white/75 hover:text-white transition-colors">Actualités</a>
          <a href="${BASE_URL}contact.html"        class="text-xs text-white/75 hover:text-white transition-colors">Contact</a>
        </nav>
      </div>

      <!-- Mentions légales -->
      <div class="flex flex-col gap-4 col-span-1">
        <h3 class="font-heading text-sm font-semibold text-white uppercase tracking-wider">Mentions légales</h3>
        <nav class="flex flex-col gap-2">
          <a href="${BASE_URL}mentions-legales.html" class="text-xs text-white/75 hover:text-white transition-colors">Mentions légales</a>
          <a href="${BASE_URL}mentions-legales.html" class="text-xs text-white/75 hover:text-white transition-colors">Confidentialité</a>
        </nav>
      </div>

      <!-- Social -->
      <div class="flex flex-col gap-4 col-span-2 lg:col-span-1">
        <h3 class="font-heading text-sm font-semibold text-white uppercase tracking-wider">Suivez-nous</h3>
        <div class="flex gap-4">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
            class="w-10 h-10 bg-white rounded-lg flex items-center justify-center transition-transform hover:-translate-y-0.5 shadow-sm hover:shadow-md">
            <svg class="w-5 h-5" fill="#702424" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
            </svg>
          </a>
          <a href="mailto:contact@pb2i.fr" aria-label="Email"
            class="w-10 h-10 bg-white rounded-lg flex items-center justify-center transition-transform hover:-translate-y-0.5 shadow-sm hover:shadow-md">
            <svg class="w-5 h-5" fill="none" stroke="#702424" stroke-width="2" viewBox="0 0 24 24">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div style="background:var(--color-primary-dark)" class="text-center py-3">
      <p class="text-xs text-white/50">© 2026 PB2I — Patrimoine Belfortain de l'Industrie Informatique</p>
    </div>
  </footer>
  `
}
