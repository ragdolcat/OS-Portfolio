#Prompt
**Role:** Act as a Creative Frontend Developer and UI Designer.
**Goal:** Build a "Desktop OS" styled portfolio using **Vanilla HTML, CSS, and JavaScript**. The site should mimic a computer interface where different sections open as draggable, functional windows.

### 1. The OS Environment
* **Desktop:** A full-screen container with a high-quality wallpaper and clickable icons for "About Me," "Projects," "Tech Watch," and a new "Competencies (E4)" app.
* **Taskbar & Dock:** A semi-transparent bottom bar with a clock, a language switcher (EN/FR), and a Dark Mode toggle.
* **Window Logic:** Use Vanilla JS to make windows draggable, closable, and bring them to the front when clicked (z-index management).

### 2. The "E4 Skills Explorer" App (New Component)
This window specifically addresses the BTS SIO exam requirements by organizing professional skills and "proofs". Create a "File Explorer" or "Dashboard" layout inside this window:
* **Competency Blocks:** Organize skills into the specific categories required by the E4 referential:
    * **IT Asset Management:** Show mastery of Versioning (GIT), technical documentation, and workflows.
    * **Incident Response:** Highlight experience with ticketing, diagnostics, and user assistance.
    * **Online Presence:** Show skills in CMS, SEO tools, and web evolution.
    * **Project Mode:** A section dedicated to Agile (SCRUM), planning (Gantt/Notion/Trello), and team collaboration.
    * **Deployment & Testing:** Showcase experience with integration tests, user training, and DevOps
* **Evidence View (Preuves):** For each skill, include a "File" icon that, when clicked, shows a brief summary of a real-world task or a link to the corresponding code/documentation.

### 3. Professional Development & Tech Watch
* **CV/Certifications App:** A window or PDF viewer displaying your professional identity, certifications, and career path.
* **Tech Watch (Veille) Browser:** A browser-like window for the SLAM option, displaying articles and summaries of technological trends and innovations you monitor.

### 4. Technical Constraints & Design
* **Vanilla Only:** No frameworks. Use CSS Flexbox/Grid for the layout and standard DOM events for window interactions.
* **Glassmorphism:** Use `backdrop-filter: blur()` for window headers and the taskbar to create a modern "Fluent" or "macOS" aesthetic.
* **Responsive:** On mobile, the desktop icons should stack vertically, and windows should open full-screen for better readability.

# output

All 19 files are in place. Now let's package it as a ZIP:Le projet est complet. Voici la structure livrée — **19 fichiers, zéro dépendance** :

```
portfolio/
├── index.html
├── css/
│   ├── variables.css     ← tokens CSS, thèmes dark/light
│   ├── reset.css
│   ├── desktop.css       ← boot screen, wallpaper, icônes
│   ├── taskbar.css       ← barre du bas glassmorphism
│   ├── windows.css       ← fenêtres drag/resize/focus
│   ├── apps.css          ← styles de toutes les apps
│   └── responsive.css    ← mobile full-screen
└── js/
    ├── main.js           ← point d'entrée (ES modules)
    ├── Boot.js           ← animation de démarrage
    ├── WindowManager.js  ← drag, resize, z-index, minimize/max
    ├── Taskbar.js        ← horloge, thème, langue, boutons apps
    ├── DesktopIcons.js   ← double-clic / tap mobile
    ├── AppRegistry.js    ← registre des applications
    └── apps/
        ├── AboutApp.js   ← onglets Bio / Skills / Stats
        ├── ProjectsApp.js
        ├── TechWatchApp.js ← filtre par catégorie
        ├── E4SkillsApp.js  ← référentiel BTS SIO + modales preuves
        └── CVApp.js        ← expériences, certifications, barres
```

**Ce qu'il faut savoir pour l'utiliser :**

- Ouvrir via un serveur local (les ES modules ne fonctionnent pas en `file://`) — `npx serve portfolio` ou l'extension Live Server de VS Code
- Double-clic sur les icônes pour ouvrir les apps (simple tap sur mobile)
- Les fenêtres sont déplaçables par la barre de titre, redimensionnables par le coin bas-droit
- Le toggle 🌙/☀️ passe en thème clair (préférence sauvegardée en `localStorage`)
- Dans **E4 Skills Explorer**, chaque compétence s'ouvre en accordéon et le bouton "Voir la preuve" affiche une modale glassmorphism

**Pour personnaliser** : toutes les données (projets, expériences, compétences, articles de veille) sont des tableaux JS simples dans chaque fichier `apps/*.js` — aucun JSON externe requis.

Trois modifications à faire : supprimer les barres dans AboutApp, franciser les icônes et le HTML, retirer le switcher de langue.Maintenant le HTML — franciser les icônes, retirer le switcher EN/FR :Maintenant ajouter le style pour les groupes de compétences dans apps.css, et nettoyer le code du Taskbar (inutile de garder la logique de langue) :Nettoyer le Taskbar.js — supprimer la logique `_initLang` :Repackager le ZIP :Voici les trois changements appliqués :

**1. Onglet Compétences — plus de barres de progression**, remplacées par des groupes de tags organisés en trois catégories : *Langages & Frameworks*, *Outils & Environnements*, *Méthodes & Gestion de projet*.

**2. Switcher EN/FR supprimé** — retiré du HTML, du CSS et de toute la logique JS dans `Taskbar.js`. Le code de traduction est entièrement éliminé.

**3. Site 100% en français** — icônes du bureau renommées (*À propos*, *Projets*, *Veille Tech*, *Compétences E4*, *CV & Diplômes*), attribut `lang="fr"` sur le `<html>`, et le tooltip du bouton thème traduit.