export class ProjectsApp {
  constructor(wm) { this.wm = wm; this.id = 'projects'; }

  open() {
    if (this.wm.isOpen(this.id)) { this.wm.focus(this.id); this.wm.restore(this.id); return; }
    this.wm.open(this.id, 'projects.dir', this._html(), { width: 860, height: 580 });
  }

  _html() {
    const projects = [
      {
        name: 'AlphaTech — Gestion de ludotechque',
        desc: 'Application Java Swing et AWT pour la gestion d\'une ludothèque: emprunts, retours, catalogue de jeux, gestion des membres d\'utilisation. Backend MySQL avec interface graphique réactive avec Java Swing.',
        tags: ['Java', 'Maven', 'Javaswing', 'MySQL'],
        color: 'linear-gradient(90deg,var(--accent-a),var(--accent-b))',
        link: 'https://github.com/ragdolcat/AlphaTech',
        year: '2026'
      },
      {
        name: 'AlphaContest — Site web de gestion de tournoi',
        desc: 'Interface de monitoring réseau avec détection d\'anomalies basée sur des seuils configurables. Notifications en temps réel, export PDF des rapports et historique des incidents.',
        tags: ['PHP 8.2','Symfony', 'Doctrine ORM', 'Twig', 'MySQL'],
        color: 'linear-gradient(90deg,var(--accent-b),var(--accent-d))',
        link: 'https://github.com/ragdolcat/AlphaContest',
        year: '2026'
      },
      {
        name: 'MK-SWAP - Jeu de plates-formes 3D',
        desc: 'Jeu de plates-formes 3D développé en C# avec Unity dans le cadre de la Winter Melon Jam 2026. Mécanique de swap entre 3 masques conférant des pouvoirs différents.',
        tags: ['C#', 'Unity', '3D', 'Game Development'],
        color: 'linear-gradient(90deg,var(--accent-b),var(--accent-d))',
        link: 'https://noodlestd.itch.io/mk-swap',
        year: '2025'
      },
      {
        name: 'Portfolio OS (Ce projet)',
        desc: 'Interface portfolio imitant un OS desktop avec fenêtres draggables, gestion du focus, applications intégrées et thème sombre/clair. Vanilla JS modulaire, aucun framework.',
        tags: ['HTML5', 'CSS3', 'Vanilla JS', 'ES Modules'],
        color: 'linear-gradient(90deg,var(--accent-b),var(--accent-a))',
        link: 'https://github.com/ragdolcat/OS-Portfolio',
        year: '2026'
      },
      {
        name: 'L\'Odyssée Numérique Éthique',
        desc: 'Site web éducatif sur l\'éthique numérique dans le cadre de la nuit de l\'info 2025. Contenu interactif sur les enjeux de la vie privée, de la sécurité et de l\'impact environnemental du numérique.',
        tags: ['HTML5', 'CSS3', 'Vanilla JS'],
        color: 'linear-gradient(90deg,var(--accent-b),var(--accent-a))',
        link: 'https://github.com/ragdolcat/L-Odyssee-Numerique-ethique',
        year: '2025'
      }
    ];

    return `
    <div class="win-body" style="display:flex;flex-direction:column;height:100%">
      <div class="app-header">
        <h1>Mes Projets</h1>
        <p>// Voici une liste de mes projets</p>
      </div>
      <div class="win-scroll">
        <div class="projects-grid">
          ${projects.map(p => `
            <div class="project-card">
              <div class="project-card-accent" style="background:${p.color}"></div>
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
                <h3>${p.name}</h3>
                <span style="font-family:var(--font-mono);font-size:10px;color:var(--text-muted)">${p.year}</span>
              </div>
              <p>${p.desc}</p>
              <div class="project-tags">${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
              <a href="${p.link}" class="project-link">→ Voir le projet</a>
            </div>
          `).join('')}
        </div>
      </div>
    </div>`;
  }
}
