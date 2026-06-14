# PB2I — Patrimoine Belfortain de l'Industrie Informatique

Ce projet est le site web de l'association **PB2I** (Patrimoine Belfortain de l'Industrie Informatique), dédiée à la préservation et à la présentation du patrimoine industriel informatique de Belfort.

Le site propose une vitrine interactive présentant l'histoire de l'association, ses missions, ses actualités, ainsi que ses différentes collections muséales (mécanographie, imprimantes, magnétographie, etc.).

---

## 🛠️ Technologies utilisées

Le projet est conçu avec des technologies web modernes, légères et performantes :

1. **Framework & Outils de Build** :
   - **[Vite](https://vite.dev/) (v8)** : Utilisé comme serveur de développement ultra-rapide et bundler de production multi-pages (MPA).
   - **Rollup** : Intégré à Vite pour la compilation optimisée de chaque page HTML indépendante.

2. **Styles & Design** :
   - **[Tailwind CSS](https://tailwindcss.com/) (v4)** : Intégré via le plugin officiel `@tailwindcss/vite` pour des styles utilitaires de nouvelle génération et un thème natif CSS (`@theme`).
   - **CSS3 Vanilla** : Utilisé pour les variables globales de design tokens, la gestion des grilles responsives complexes et les micro-animations.
   - **Polices de caractères** : Literata (serif chaleureux pour les titres) et Inter (sans-serif moderne pour le corps de texte).

3. **Logique applicative** :
   - **Vanilla JavaScript (ES6+)** : Gestion du cycle de vie du site, montage dynamique des composants réutilisables (Navbar, Footer, Modales, Lecteur vidéo) et animations interactives.
   - **Système d'Internationalisation (i18n)** : Système de traduction côté client avec détection et persistance de la langue (`FR`, `EN`, `DE`) dans le stockage local (`localStorage`).

---

## 📁 Structure du Projet

```text
PB2I/
├── collections/          # Fichiers HTML des différentes collections
├── data/                 # Données de traduction statiques (JSON) par langue (fr, en, de)
├── dist/                 # Fichiers compilés prêts pour la production (générés)
├── public/               # Actifs statiques publics (Favicon, icônes globales SVG)
├── src/
│   ├── assets/           # Images, logos et illustrations du site
│   ├── components.js     # Logique de montage des composants partagés (Navbar, Footer, etc.)
│   ├── main.js           # Point d'entrée par défaut
│   ├── style.css         # Feuille de style globale et configuration du thème Tailwind v4
│   └── pages/            # Scripts JavaScript spécifiques à chaque page HTML
├── package.json          # Dépendances et scripts de commande npm
└── vite.config.js        # Configuration du serveur de développement et des points d'entrée MPA
```

---

## 🚀 Démarrage rapide

### Prérequis

Assurez-vous d'avoir installé [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée) et `npm`.

### 1. Installation des dépendances

Installez les modules nécessaires répertoriés dans le fichier `package.json` :

```bash
npm install
```

### 2. Lancer le serveur de développement

Démarrez le serveur local avec rechargement à chaud (Hot Module Replacement - HMR) :

```bash
npm run dev
```

Une fois lancé, ouvrez votre navigateur à l'adresse suivante : [http://localhost:5173](http://localhost:5173).

### 3. Compiler pour la production

Générez le livrable optimisé et minifié dans le dossier `dist/` :

```bash
npm run build
```

### 4. Prévisualiser le livrable de production

Pour tester localement le dossier de production compilé avant déploiement :

```bash
npm run preview
```
