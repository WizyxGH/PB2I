import { mountComponents, initFadeIn } from '/src/components.js';
import { getActiveLang } from '/src/utils/lang.js';
import { initI18n, translateDOM } from '../utils/i18n.js';

window.PB2I_PAGE = 'home';
await initI18n();
mountComponents('collections');
translateDOM();
initFadeIn('[data-fade]');

const chronoData = [
  {
    id: "annees70",
    year: "Années 70's",
    title: "Lancement de l'imprimante à impact PR71",
    subtitle: "Lancement de l'imprimante à impact PR71, conçue et fabriquée à Belfort.",
    desc: "<p>Sa vitesse d'impression de 1600 lpm (lignes par minute) ramène BULL à l'état de l'art mais confirme la nécessité de passer à une technologie sans impact (NIP) !</p>",
    quote: "Technologie originale de support porte-caractère souple (bande ou « belt »). Cette bande restera pour BULL le composant de base de ses dernières imprimantes impact à venir, qui seront des optimisations à vitesse plus lente."
  },
  {
    id: "1973",
    year: "1973",
    title: "Titre de l'évènement",
    subtitle: "Sous-titre ou description courte pour 1973.",
    desc: "<p>Description détaillée de l'évènement de 1973.</p>",
    quote: ""
  },
  {
    id: "1974",
    year: "1974",
    title: "Titre de l'évènement",
    subtitle: "Sous-titre ou description courte pour 1974.",
    desc: "<p>Description détaillée de l'évènement de 1974.</p>",
    quote: "La DI-180 est, à cette époque, la seule imprimante magnétique disponible sur le marché. Elle utilise des composants magnétiques directement issus des technologies de mémoires de masse (rubans, disques magnétiques). Impression sérielle limitée à 180 lignes par minute."
  },
  {
    id: "1975",
    year: "1975",
    title: "Titre de l'évènement",
    subtitle: "Sous-titre ou description courte pour 1975.",
    desc: "<p>Description détaillée de l'évènement de 1975.</p>",
    quote: "Réalisation de maquettes à bande magnétique large. Essais de têtes d’écriture intégrées empruntées aux disques. Premières investigations en matière de „toner“ (encre en poudre)."
  },
  {
    id: "1976",
    year: "1976",
    title: "Titre de l'évènement",
    subtitle: "Sous-titre ou description courte pour 1976.",
    desc: "<p>Description détaillée de l'évènement de 1976.</p>",
    quote: "L’effectif mobilisé passe de 5 à 20 ingénieurs et techniciens."
  },
  {
    id: "1977",
    year: "1977",
    title: "Titre de l'évènement",
    subtitle: "Sous-titre ou description courte pour 1977.",
    desc: "<p>Description détaillée de l'évènement de 1977.</p>",
    quote: ""
  },
  {
    id: "1978",
    year: "1978",
    title: "Titre de l'évènement",
    subtitle: "Sous-titre ou description courte pour 1978.",
    desc: "<p>Description détaillée de l'évènement de 1978.</p>",
    quote: "Le nom commercial anticipé pour le futur produit est resté assez fluctuant à cette époque : MP60, puis MP6000, enfin MP6090…\nDe fait, les partenaires commerciaux ont très vite adopté le nom de code du projet utilisé par les ingénieurs R&D : „Mathilde“. Ce nom sera aussi, par la suite, celui repris par la presse et restera le plus connu du grand public…"
  },
  {
    id: "1979",
    year: "1979",
    title: "Titre de l'évènement",
    subtitle: "Sous-titre ou description courte pour 1979.",
    desc: "<p>Description détaillée de l'évènement de 1979.</p>",
    quote: "Les procédés de fabrication (qui ont été regroupés dans la division R&D Techno) sont progressivement définis et mis au point.\nContacts avec plusieurs fabricants de toner en Europe et aux USA pour sous-traiter la future fabrication en volume du toner. Résultats peu concluants : décision d’investir dans un atelier de production d’encre à Belfort."
  },
  {
    id: "1980",
    year: "1980",
    title: "Titre de l'évènement",
    subtitle: "Sous-titre ou description courte pour 1980.",
    desc: "<p>Description détaillée de l'évènement de 1980.</p>",
    quote: ""
  },
  {
    id: "1981",
    year: "1981",
    title: "Titre de l'évènement",
    subtitle: "Sous-titre ou description courte pour 1981.",
    desc: "<p>Description détaillée de l'évènement de 1981.</p>",
    quote: ""
  },
  {
    id: "1982",
    year: "1982",
    title: "Titre de l'évènement",
    subtitle: "Sous-titre ou description courte pour 1982.",
    desc: "<p>Description détaillée de l'évènement de 1982.</p>",
    quote: "NCC’82 puis SICOB 1982 (Paris)"
  },
  {
    id: "1983",
    year: "1983",
    title: "Titre de l'évènement",
    subtitle: "Sous-titre ou description courte pour 1983.",
    desc: "<p>Description détaillée de l'évènement de 1983.</p>",
    quote: "NCC’83 (Anaheim, Ca, USA), mai 1983.\nSICOB (Paris), septembre 1983.\nNB : par convention, les 3 derniers chiffres désignent la vitesse d’impression en ppm (090 signifie 90 ppm)"
  },
  {
    id: "1984",
    year: "1984",
    title: "Titre de l'évènement",
    subtitle: "Sous-titre ou description courte pour 1984.",
    desc: "<p>Description détaillée de l'évènement de 1984.</p>",
    quote: "Du fait de l’abandon de GE, et de la disparition de la DI-180, BULL est seul à proposer une imprimante magnétique. Le terme magnétographie est de plus en plus utilisé par analogie à celui de l’électrophotographie."
  },
  {
    id: "1985",
    year: "1985",
    title: "Titre de l'évènement",
    subtitle: "Sous-titre ou description courte pour 1985.",
    desc: "<p>Description détaillée de l'évènement de 1985.</p>",
    quote: "Cette imprimante ne sera jamais réellement commercialisée."
  },
  {
    id: "1986",
    year: "1986",
    title: "Titre de l'évènement",
    subtitle: "Sous-titre ou description courte pour 1986.",
    desc: "<p>Description détaillée de l'évènement de 1986.</p>",
    quote: ""
  },
  {
    id: "1987",
    year: "1987",
    title: "Titre de l'évènement",
    subtitle: "Sous-titre ou description courte pour 1987.",
    desc: "<p>Description détaillée de l'évènement de 1987.</p>",
    quote: "Face à la pression de la concurrence électrophotographique laser, qui règne dans le domaine de l’impression de pages séparées, ce produit n’a pas connu le volume de production des produits MP6xxx."
  },
  {
    id: "1990",
    year: "1990",
    title: "Titre de l'évènement",
    subtitle: "Sous-titre ou description courte pour 1990.",
    desc: "<p>Description détaillée de l'évènement de 1990.</p>",
    quote: "Développé en coopération avec un fabricant de presses d’imprimerie, un prototype est présenté à DRUPA 90 à Düsseldorf.\nLe nom de code du projet était THV (Très Haute Vitesse)"
  },
  {
    id: "1991",
    year: "1991 et après...",
    title: "Titre de l'évènement",
    subtitle: "Sous-titre ou description courte pour 1991 et après.",
    desc: "<p>Description détaillée de l'évènement de 1991.</p>",
    quote: "Période NIPSON à détailler plus tard"
  }
];

const chronoGrid = document.getElementById('chrono-grid');
if (chronoGrid) {
  function renderGrid(activeId) {
    chronoGrid.innerHTML = chronoData.map(item => {
      const isActive = item.id === activeId;
      const bgClass = isActive ? 'bg-[#702424]' : 'bg-[#f8eedc] hover:bg-[#f2e2ca]';
      const textClass = isActive ? 'text-white' : 'text-[#702424]';
      const titleClass = isActive ? 'text-white' : 'text-gray-800';

      return `
        <button class="chrono-btn rounded-xl p-4 flex flex-col items-center justify-center text-center transition-colors ${bgClass}" data-id="${item.id}">
          <p class="font-heading font-bold text-lg mb-2 ${textClass}">${item.year}</p>
          <p class="text-[11px] leading-tight ${titleClass}">${item.title}</p>
        </button>
      `;
    }).join('');

    // Attach event listeners
    document.querySelectorAll('.chrono-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        updateContent(id);
        renderGrid(id);
      });
    });
  }

  function updateContent(id) {
    const data = chronoData.find(item => item.id === id);
    if (!data) return;

    document.getElementById('chrono-title').textContent = data.year;
    document.getElementById('chrono-subtitle').textContent = data.subtitle;
    document.getElementById('chrono-desc').innerHTML = data.desc;
    
    const quoteEl = document.getElementById('chrono-quote');
    if (data.quote) {
      quoteEl.textContent = data.quote;
      quoteEl.style.display = 'block';
    } else {
      quoteEl.style.display = 'none';
    }
  }

  // Init
  renderGrid('annees70');
  updateContent('annees70');
}
