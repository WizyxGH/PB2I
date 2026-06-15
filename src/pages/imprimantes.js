import { mountComponents, initFadeIn } from '/src/components.js';

window.PB2I_PAGE = 'home';
mountComponents('collections');
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
    quote: ""
  },
  {
    id: "1975",
    year: "1975",
    title: "Titre de l'évènement",
    subtitle: "Sous-titre ou description courte pour 1975.",
    desc: "<p>Description détaillée de l'évènement de 1975.</p>",
    quote: ""
  },
  {
    id: "1976",
    year: "1976",
    title: "Titre de l'évènement",
    subtitle: "Sous-titre ou description courte pour 1976.",
    desc: "<p>Description détaillée de l'évènement de 1976.</p>",
    quote: ""
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
    quote: ""
  },
  {
    id: "1979",
    year: "1979",
    title: "Titre de l'évènement",
    subtitle: "Sous-titre ou description courte pour 1979.",
    desc: "<p>Description détaillée de l'évènement de 1979.</p>",
    quote: ""
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
    quote: ""
  },
  {
    id: "1983",
    year: "1983",
    title: "Titre de l'évènement",
    subtitle: "Sous-titre ou description courte pour 1983.",
    desc: "<p>Description détaillée de l'évènement de 1983.</p>",
    quote: ""
  },
  {
    id: "1984",
    year: "1984",
    title: "Titre de l'évènement",
    subtitle: "Sous-titre ou description courte pour 1984.",
    desc: "<p>Description détaillée de l'évènement de 1984.</p>",
    quote: ""
  },
  {
    id: "1985",
    year: "1985",
    title: "Titre de l'évènement",
    subtitle: "Sous-titre ou description courte pour 1985.",
    desc: "<p>Description détaillée de l'évènement de 1985.</p>",
    quote: ""
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
    quote: ""
  },
  {
    id: "1990",
    year: "1990",
    title: "Titre de l'évènement",
    subtitle: "Sous-titre ou description courte pour 1990.",
    desc: "<p>Description détaillée de l'évènement de 1990.</p>",
    quote: ""
  },
  {
    id: "1991",
    year: "1991 et après...",
    title: "Titre de l'évènement",
    subtitle: "Sous-titre ou description courte pour 1991 et après.",
    desc: "<p>Description détaillée de l'évènement de 1991.</p>",
    quote: ""
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('chrono-grid');
  if (!grid) return;

  function renderGrid(activeId) {
    grid.innerHTML = chronoData.map(item => {
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
});
