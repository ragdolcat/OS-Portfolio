export class ProjectsApp {
  constructor(wm) { this.wm = wm; this.id = 'projects'; }

  open() {
    if (this.wm.isOpen(this.id)) { this.wm.focus(this.id); this.wm.restore(this.id); return; }
    this.wm.open(this.id, 'projects.dir', this._html(), { width: 860, height: 580 });
  }

  _html() {
    const projects = [
      {
        name: 'TaskFlow — Gestionnaire Agile',
        desc: 'Application web full-stack de gestion de projet inspirée de Trello. Tableaux Kanban en temps réel via WebSocket, gestion des sprints SCRUM, et génération automatique de rapports de vélocité.',
        tags: ['Laravel', 'Vue.js', 'WebSocket', 'MySQL', 'Docker'],
        color: 'linear-gradient(90deg,var(--accent-a),var(--accent-b))',
        link: '#',
        year: '2024'
      },
      {
        name: 'SecureNet — Dashboard Réseau',
        desc: 'Interface de monitoring réseau avec détection d\'anomalies basée sur des seuils configurables. Notifications en temps réel, export PDF des rapports et historique des incidents.',
        tags: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Chart.js'],
        color: 'linear-gradient(90deg,var(--accent-b),var(--accent-d))',
        link: '#',
        year: '2024'
      },
      {
        name: 'CMS Institutionnel',
        desc: 'Système de gestion de contenu sur-mesure pour une association locale. Interface admin WYSIWYG, gestion des médias, SEO automatique et intégration Google Analytics.',
        tags: ['PHP', 'MySQL', 'JavaScript', 'TinyMCE'],
        color: 'linear-gradient(90deg,var(--accent-c),var(--accent-e))',
        link: '#',
        year: '2023'
      },
      {
        name: 'API Inventory Management',
        desc: 'API REST pour la gestion du parc informatique d\'entreprise. Suivi des licences logicielles, alertes d\'expiration, QR codes pour inventaire physique et rapports CMDB.',
        tags: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger'],
        color: 'linear-gradient(90deg,var(--accent-d),var(--accent-a))',
        link: '#',
        year: '2023'
      },
      {
        name: 'CI/CD Pipeline Automatisé',
        desc: 'Infrastructure DevOps complète avec tests unitaires automatisés, déploiement continu sur VPS, monitoring Grafana/Prometheus et rollback automatique en cas d\'erreur.',
        tags: ['GitHub Actions', 'Docker', 'Nginx', 'Grafana', 'Bash'],
        color: 'linear-gradient(90deg,var(--accent-e),var(--accent-c))',
        link: '#',
        year: '2024'
      },
      {
        name: 'Portfolio OS (Ce projet)',
        desc: 'Interface portfolio imitant un OS desktop avec fenêtres draggables, gestion du focus, applications intégrées et thème sombre/clair. Vanilla JS modulaire, aucun framework.',
        tags: ['HTML5', 'CSS3', 'Vanilla JS', 'ES Modules'],
        color: 'linear-gradient(90deg,var(--accent-b),var(--accent-a))',
        link: '#',
        year: '2025'
      }
    ];

    return `
    <div class="win-body" style="display:flex;flex-direction:column;height:100%">
      <div class="app-header">
        <h1>Mes Projets</h1>
        <p>// Double-cliquez sur une carte pour voir les détails</p>
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
