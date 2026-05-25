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
            desc: 'Utilisation quotidienne de Git sur les Projets Java et PHP.',
            proof: { title: '', body: '' }
          },
          { name: 'Documentation technique', level: 'Maîtrisé',
            desc: 'Rédaction de documentation fonctionnelle et technique sur les projets Java et PHP : README, guides d\'installation, manuels utilisateur, schémas d\'architecture.',
              proof: { title: '', body: '' }  
          },
          { name: 'Gestion du parc ', level: 'Opérationnel',
            desc: 'Inventaire du parc matériel et résolution de problèmes sur GLPI lors de mon stage au CDG79.',
            proof: { title: '', body: '' }
          }
        ]
      },
      {
        id: 'incidents', icon: '🛠️', label: 'Réponse aux incidents',
        desc: 'Expérience en support utilisateur, ticketing, diagnostic et résolution d\'incidents N1 à N3.',
        skills: [
          { name: 'Diagnostic réseau & système', level: 'Maîtrisé',
            desc: 'Diagnostic réseau (ping, Wireshark), analyse des logs, lors de ma formation de BTS SIO.',
            proof: { title: '', body: '' }  
          },
          { name: 'Assistance utilisateur', level: 'Maîtrisé',
            desc: 'support présentiel sur l\'installation de windows lors de mon stage a Agileo Automation.',
            proof: { title: '', body: '' }  
          }
        ]
      },
      {
        id: 'online', icon: '🌐', label: 'Présence en ligne',
        desc: 'Compétences en CMS, analyse web et évolution de sites institutionnels.',
        skills: [
          { name: 'CMS & Gestion de contenu', level: 'Maîtrisé',
            desc: 'WordPress (thèmes enfants, plugins) Lors de ma formation de BTS SIO.',
            proof: { title: '', body: '' }
          },
          { name: 'Évolution & maintenance web', level: 'Opérationnel',
            desc: 'Maintenance évolutive/corrective, sauvegardes automatisées pour mon portfolio.',
            proof: { title: '', body: '' }
          }
        ]
      },
      {
        id: 'project', icon: '📋', label: 'Mode Projet',
        desc: 'Méthodologies Agile/SCRUM, planification Gantt, collaboration d\'équipe et outils de gestion.',
        skills: [
          { name: 'Agile / SCRUM', level: 'Maîtrisé',
            desc: 'Cérémonies SCRUM : sprint planning, daily, review, rétrospective. Rôle Scrum Master junior. Velocity chart.',
            proof: { title: '', body: '' }
          },
          { name: 'Collaboration & outils d\'équipe', level: 'Maîtrisé',
            desc: 'Jira, Confluence, Notion, Trello, Slack en contexte professionnel. Comptes-rendus, kick-off, revue de code.',
            proof: { title: '', body: '' }
          }
        ]
      },
      {
        id: 'deploy', icon: '🚀', label: 'Mettre à disposition des utilisateurs un service informatiques',
        desc: 'Tests d\'intégration, déploiement continu, formation utilisateur et pratiques DevOps.',
        skills: [
          { name: 'Tests & Qualité logicielle', level: 'Opérationnel',
            desc: 'Tests unitaires (PHPUnit, Jest), intégration (Postman, Cypress), UAT, PV de recette.',
            proof: { title: '', body: '' }
          },
          { name: 'Formation & conduite du changement', level: 'Opérationnel',
            desc: 'Supports pédagogiques (slides, PDF, vidéos), formations présentiel/distanciel, accompagnement migration.',
            proof: { title: '', body: '' }
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
