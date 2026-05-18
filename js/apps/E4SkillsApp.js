/* ═══════════════════════════════════════════
   E4 SKILLS APP — accordion + table view + PDF fixe
   ═══════════════════════════════════════════ */
export class E4SkillsApp {
  constructor(wm) {
    this.wm = wm;
    this.id = 'e4skills';
    this._viewMode = 'accordion'; // 'accordion' | 'table'
    // Fichier tableau de compétences fixe embarqué dans le projet
    this._fileData = { url: 'img/Tableau_E4_Mesrine_Nolane.pdf', name: 'Tableau_E4_Mesrine_Nolane.pdf', type: 'application/pdf' };
  }

  open() {
    if (this.wm.isOpen(this.id)) { this.wm.focus(this.id); this.wm.restore(this.id); return; }
    this.wm.open(this.id, 'E4_Compétences.app', this._html(), { width: 980, height: 640 });
    setTimeout(() => this._init(), 50);
  }

  _data() {
    return [
      {
        id: 'assets', icon: '🗄️', label: 'Gestion du patrimoine',
        desc: 'Maîtrise des outils de versioning, documentation technique et workflows de gestion du parc informatique.',
        skills: [
          { name: 'Versioning avec Git', level: 'Maîtrisé',
            desc: 'Utilisation quotidienne de Git en environnement professionnel : branches feature/hotfix, pull requests, résolution de conflits, git flow.',
            proof: { title: 'Preuve : Gestion du dépôt TaskFlow', body: 'Mise en place d\'un workflow Git complet sur le projet TaskFlow. Structure main/develop/feature/*/hotfix/*. Plus de 800 commits sur 8 mois avec messages conventionnels.' }
          },
          { name: 'Documentation technique', level: 'Maîtrisé',
            desc: 'Rédaction de documentation fonctionnelle et technique : README, guides d\'installation, manuels utilisateur, schémas d\'architecture.',
            proof: { title: 'Preuve : Documentation API Inventory Management', body: 'Rédaction complète de la documentation Swagger/OpenAPI pour l\'API REST de gestion du parc. Couverture de 100% des endpoints. Hébergée sur GitHub Pages.' }
          },
          { name: 'Gestion du parc & CMDB', level: 'Opérationnel',
            desc: 'Inventaire du parc matériel et logiciel, gestion des licences, suivi des garanties. Utilisation de GLPI pour la CMDB.',
            proof: { title: 'Preuve : Inventaire CMDB en stage', body: 'Audit complet de 200+ postes. Import dans GLPI, QR codes équipements, alertes licences. Réduction des licences surnuméraires de 15%.' }
          }
        ]
      },
      {
        id: 'incidents', icon: '🛠️', label: 'Réponse aux incidents',
        desc: 'Expérience en support utilisateur, ticketing, diagnostic et résolution d\'incidents N1 à N3.',
        skills: [
          { name: 'Gestion de tickets (ITSM)', level: 'Maîtrisé',
            desc: 'Traitement de tickets via GLPI et Jira Service Management. Priorisation ITIL, escalade N2/N3, suivi des SLA.',
            proof: { title: 'Preuve : Support helpdesk en alternance', body: '40+ tickets/semaine. Taux de résolution premier contact : 72%. SLA respecté à 94%. 12 procédures documentées dans la base de connaissances.' }
          },
          { name: 'Diagnostic réseau & système', level: 'Opérationnel',
            desc: 'Diagnostic réseau (ping, traceroute, nmap, Wireshark), analyse des logs, dépannage DNS/DHCP, configuration VPN.',
            proof: { title: 'Preuve : Résolution d\'incident réseau critique', body: 'Panne réseau 30 postes. Diagnostic Wireshark : loop switching RSTP. Correction port BPDU Guard Cisco. Intervention 2h vs SLA 4h.' }
          },
          { name: 'Assistance utilisateur', level: 'Maîtrisé',
            desc: 'Formation sur les outils bureautiques, rédaction de guides, animation de sessions (5-15 personnes), support à distance.',
            proof: { title: 'Preuve : Formation migration Microsoft 365', body: '4 sessions de formation (12 utilisateurs chacune). Guide 30 slides. Satisfaction 4.6/5. Tickets M365 -60% dans les 3 semaines.' }
          }
        ]
      },
      {
        id: 'online', icon: '🌐', label: 'Présence en ligne',
        desc: 'Compétences en CMS, référencement naturel, analyse web et évolution de sites institutionnels.',
        skills: [
          { name: 'CMS & Gestion de contenu', level: 'Maîtrisé',
            desc: 'WordPress (thèmes enfants, plugins, WooCommerce), Drupal, CMS maison en PHP/MySQL. Gestion des accès et formation éditoriale.',
            proof: { title: 'Preuve : CMS Institutionnel', body: 'CMS sur-mesure PHP/MySQL pour association Maison de Quartier Belleville. WYSIWYG TinyMCE, gestion médias. 8 contributeurs formés, 150+ articles.' }
          },
          { name: 'SEO & Analytics', level: 'Opérationnel',
            desc: 'Audit SEO technique (Core Web Vitals, balises structurées, sitemap), Google Search Console, Google Analytics 4.',
            proof: { title: 'Preuve : Audit SEO et performances', body: 'Site e-commerce : Lighthouse 42 → 91/100. Images WebP, lazy loading, cache Redis. Trafic organique +34% en 3 mois.' }
          },
          { name: 'Évolution & maintenance web', level: 'Opérationnel',
            desc: 'Maintenance évolutive/corrective, mises à jour plugins/thèmes, sauvegardes automatisées, monitoring Sentry.',
            proof: { title: 'Preuve : Maintenance parc web', body: '6 sites clients en alternance. Pipeline mises à jour hebdomadaires, environnement staging. Zéro incident majeur en 12 mois.' }
          }
        ]
      },
      {
        id: 'project', icon: '📋', label: 'Mode Projet',
        desc: 'Méthodologies Agile/SCRUM, planification Gantt, collaboration d\'équipe et outils de gestion.',
        skills: [
          { name: 'Agile / SCRUM', level: 'Maîtrisé',
            desc: 'Cérémonies SCRUM : sprint planning, daily, review, rétrospective. Rôle Scrum Master junior. Velocity chart.',
            proof: { title: 'Preuve : Projet TaskFlow SCRUM', body: 'Chef de projet (4 développeurs). Board Jira, Definition of Done. 6 sprints. Velocity 32 pts/sprint. Livraison dans les délais, 98% backlog.' }
          },
          { name: 'Planification (Gantt / Notion)', level: 'Opérationnel',
            desc: 'Diagrammes de Gantt (GanttProject, Notion), chemins critiques, gestion des dépendances.',
            proof: { title: 'Preuve : Planning CMS Institutionnel', body: 'Cahier des charges + Gantt 6 semaines, 4 jalons, 2 tâches chemin critique. Respect planning 95%.' }
          },
          { name: 'Collaboration & outils d\'équipe', level: 'Maîtrisé',
            desc: 'Jira, Confluence, Notion, Trello, Slack en contexte professionnel. Comptes-rendus, kick-off, revue de code.',
            proof: { title: 'Preuve : Collaboration multi-équipe', body: '3 équipes (dev/infra/métier) via Confluence et Slack. 20+ CR réunion. Espace Notion knowledge management (30+ pages).' }
          }
        ]
      },
      {
        id: 'deploy', icon: '🚀', label: 'Déploiement & Tests',
        desc: 'Tests d\'intégration, déploiement continu, formation utilisateur et pratiques DevOps.',
        skills: [
          { name: 'Tests & Qualité logicielle', level: 'Opérationnel',
            desc: 'Tests unitaires (PHPUnit, Jest), intégration (Postman, Cypress), UAT, PV de recette.',
            proof: { title: 'Preuve : Suite de tests API Inventory', body: '87 tests unitaires (couverture 78%), 23 tests intégration Postman/Newman en CI. 3 bugs critiques détectés avant livraison.' }
          },
          { name: 'CI/CD & DevOps', level: 'Opérationnel',
            desc: 'GitHub Actions, GitLab CI, Docker Compose, VPS Linux, Nginx reverse proxy, SSL Let\'s Encrypt.',
            proof: { title: 'Preuve : Pipeline CI/CD complet', body: 'Docker → tests → SonarQube → staging → prod avec approbation. Déploiement 4min. Rollback auto. Uptime 99.7% sur 6 mois.' }
          },
          { name: 'Formation & conduite du changement', level: 'Opérationnel',
            desc: 'Supports pédagogiques (slides, PDF, vidéos), formations présentiel/distanciel, accompagnement migration.',
            proof: { title: 'Preuve : Formation déploiement TaskFlow', body: '3h pour 15 utilisateurs. Manuel 28 pages, 5 tutos vidéo. Score adoption J+30 : 89% (vs objectif 75%).' }
          }
        ]
      }
    ];
  }

  _html() {
    const cats = this._data();
    const isTable = this._viewMode === 'table';
    return `
    <div class="e4-layout" style="height:100%">
      <aside class="e4-sidebar">
        <h3>Référentiel E4</h3>
        <div>
          ${cats.map((c, i) => `
            <button class="e4-cat-btn ${i === 0 ? 'active' : ''}" data-cat="${c.id}">
              <span class="e4-cat-icon">${c.icon}</span>
              <span class="e4-cat-label">${c.label}</span>
              <span class="e4-cat-count">${c.skills.length}</span>
            </button>`).join('')}
        </div>

        <!-- Tableau de compétences fixe -->
        <div style="margin-top:auto;padding-top:16px;border-top:1px solid var(--border)">
          <p style="font-family:var(--font-mono);font-size:9px;color:var(--text-muted);padding:0 5px;margin-bottom:10px;line-height:1.6">
            BTS SIO — Option SLAM<br>
            Épreuve E4 — Référentiel 2024<br>
            <span style="color:var(--accent-d)">5 domaines · 15 compétences</span>
          </p>
          <div class="e4-file-display">
            <span style="font-size:20px">📎</span>
            <span class="e4-file-display-name">Tableau_E4_Mesrine_Nolane.pdf</span>
            <button class="e4-file-view-btn" id="e4-view-file-btn">Voir</button>
          </div>
          <div style="padding:0 5px">
            <a class="e4-proof-btn" href="img/Tableau_E4_Mesrine_Nolane.pdf" download="Tableau_E4_Mesrine_Nolane.pdf"
               style="font-size:10px;width:100%;justify-content:center;display:flex;text-decoration:none;">
              ⬇ Télécharger
            </a>
          </div>
        </div>
      </aside>

      <div class="e4-content" style="display:flex;flex-direction:column;">
        <!-- View toggle -->
        <div class="e4-view-toggle">
          <button class="e4-toggle-btn ${!isTable ? 'active' : ''}" data-view="accordion">Détails</button>
          <button class="e4-toggle-btn ${isTable ? 'active' : ''}"  data-view="table">Tableau</button>
        </div>

        ${cats.map((c, i) => `
          <div class="e4-panel ${i === 0 ? 'active' : ''}" data-panel="${c.id}"
               style="flex:1;overflow:hidden;display:${i === 0 ? 'flex' : 'none'};flex-direction:column;">
            <div class="e4-panel-header">
              <h2>${c.icon} ${c.label}</h2>
              <p>${c.desc}</p>
            </div>

            <!-- Accordion view -->
            <div class="e4-accordion-view win-scroll" style="display:${!isTable ? 'block' : 'none'}">
              <div class="e4-skills-list">
                ${c.skills.map(s => `
                  <div class="e4-skill-card">
                    <div class="e4-skill-head">
                      <span class="e4-skill-name">${s.name}</span>
                      <span class="e4-skill-level">${s.level}</span>
                      <span class="e4-skill-toggle">▾</span>
                    </div>
                    <div class="e4-skill-body">
                      <p>${s.desc}</p>
                      <button class="e4-proof-btn"
                        data-proof-title="${s.proof.title.replace(/"/g,'&quot;')}"
                        data-proof-body="${s.proof.body.replace(/"/g,'&quot;')}">
                        📎 Voir la preuve / Réalisation
                      </button>
                    </div>
                  </div>`).join('')}
              </div>
            </div>

            <!-- Table view (all categories) -->
            <div class="e4-table-view win-scroll" style="display:${isTable ? 'block' : 'none'};flex:1;">
              ${this._buildFullTable()}
            </div>
          </div>`).join('')}
      </div>
    </div>`;
  }

  _buildFullTable() {
    const cats = this._data();
    const rows = cats.flatMap(cat =>
      cat.skills.map((s, si) => ({ cat, skill: s, firstInCat: si === 0, catLen: cat.skills.length }))
    );
    return `
    <div class="e4-table-wrapper">
      <table class="e4-table">
        <thead>
          <tr>
            <th>Domaine</th>
            <th>Compétence</th>
            <th>Niveau</th>
            <th>Description</th>
            <th>Preuve</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(r => `
            <tr>
              ${r.firstInCat ? `<td class="td-cat" rowspan="${r.catLen}">${r.cat.icon} ${r.cat.label}</td>` : ''}
              <td class="td-skill">${r.skill.name}</td>
              <td class="td-level">
                <span class="e4-level-pill ${r.skill.level === 'Maîtrisé' ? 'maitrise' : ''}">${r.skill.level}</span>
              </td>
              <td>${r.skill.desc}</td>
              <td class="td-proof">
                <div class="e4-proof-short">${r.skill.proof.body}</div>
                <button class="e4-proof-btn" style="margin-top:6px;font-size:9px"
                  data-proof-title="${r.skill.proof.title.replace(/"/g,'&quot;')}"
                  data-proof-body="${r.skill.proof.body.replace(/"/g,'&quot;')}">
                  Voir
                </button>
              </td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
  }

  _init() {
    const win = document.querySelector(`.os-window[data-id="${this.id}"]`);
    if (!win) return;

    // View toggle (accordion / table)
    win.querySelectorAll('.e4-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this._viewMode = btn.dataset.view;
        win.querySelectorAll('.e4-toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const isTable = this._viewMode === 'table';
        win.querySelectorAll('.e4-accordion-view').forEach(v => v.style.display = isTable ? 'none' : 'block');
        win.querySelectorAll('.e4-table-view').forEach(v => v.style.display = isTable ? 'block' : 'none');
      });
    });

    // Category switching
    win.querySelectorAll('.e4-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        win.querySelectorAll('.e4-cat-btn').forEach(b => b.classList.remove('active'));
        win.querySelectorAll('.e4-panel').forEach(p => { p.classList.remove('active'); p.style.display = 'none'; });
        btn.classList.add('active');
        const panel = win.querySelector(`.e4-panel[data-panel="${btn.dataset.cat}"]`);
        if (panel) { panel.classList.add('active'); panel.style.display = 'flex'; }
      });
    });

    // Accordion cards & proof modals
    win.addEventListener('click', (e) => {
      const head = e.target.closest('.e4-skill-head');
      if (head) head.closest('.e4-skill-card')?.classList.toggle('open');

      const proofBtn = e.target.closest('.e4-proof-btn[data-proof-title]');
      if (proofBtn) this._showProof(proofBtn.dataset.proofTitle, proofBtn.dataset.proofBody);
    });

    // Bouton "Voir" le tableau de compétences PDF
    win.querySelector('#e4-view-file-btn')?.addEventListener('click', () => this._showFileModal());
  }

  _showFileModal() {
    const overlay = document.createElement('div');
    overlay.className = 'proof-overlay';
    overlay.innerHTML = `
      <div class="proof-modal" style="width:80vw;max-width:900px;height:80vh;display:flex;flex-direction:column">
        <h3 style="flex-shrink:0">📎 Tableau_E4_Mesrine_Nolane.pdf</h3>
        <div style="flex:1;overflow:hidden;border-radius:8px;margin-top:12px">
          <iframe src="img/Tableau_E4_Mesrine_Nolane.pdf" style="width:100%;height:100%;border:none;border-radius:8px"></iframe>
        </div>
        <div class="proof-modal-actions">
          <button class="proof-close-btn">Fermer</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('.proof-close-btn').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  }

  _showProof(title, body) {
    const overlay = document.createElement('div');
    overlay.className = 'proof-overlay';
    overlay.innerHTML = `
      <div class="proof-modal">
        <h3>${title}</h3>
        <p>${body}</p>
        <div class="proof-modal-actions">
          <button class="proof-close-btn">Fermer</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('.proof-close-btn').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  }
}
