export class E4SkillsApp {
  constructor(wm) { this.wm = wm; this.id = 'e4skills'; }

  open() {
    if (this.wm.isOpen(this.id)) { this.wm.focus(this.id); this.wm.restore(this.id); return; }
    this.wm.open(this.id, 'E4_Skills_Explorer.app', this._html(), { width: 960, height: 620 });
    setTimeout(() => this._init(), 50);
  }

  _data() {
    return [
      {
        id: 'assets',
        icon: '🗄️',
        label: 'Gestion du patrimoine',
        desc: 'Maîtrise des outils de versioning, documentation technique et workflows de gestion du parc informatique.',
        skills: [
          {
            name: 'Versioning avec Git',
            level: 'Maîtrisé',
            desc: 'Utilisation quotidienne de Git en environnement professionnel : branches feature/hotfix, pull requests, résolution de conflits, git flow. Mise en place de hooks pre-commit et intégration avec GitHub Actions.',
            proof: {
              title: 'Preuve : Gestion du dépôt TaskFlow',
              body: 'Mise en place d\'un workflow Git complet sur le projet TaskFlow en alternance. Structure de branches : main / develop / feature/* / hotfix/*. Rédaction d\'un CONTRIBUTING.md, protection de la branche main avec obligation de PR et review. Plus de 800 commits sur 8 mois, avec messages conventionnels (Conventional Commits).'
            }
          },
          {
            name: 'Documentation technique',
            level: 'Maîtrisé',
            desc: 'Rédaction de documentation fonctionnelle et technique : README, guides d\'installation, manuels utilisateur, schémas d\'architecture (PlantUML, Draw.io). Utilisation de Confluence pour la documentation d\'équipe.',
            proof: {
              title: 'Preuve : Documentation API Inventory Management',
              body: 'Rédaction complète de la documentation Swagger/OpenAPI pour l\'API REST de gestion du parc informatique. Couverture de 100% des endpoints, exemples de requêtes/réponses, guide d\'authentification JWT. Documentation hébergée sur GitHub Pages avec génération automatique via CI/CD.'
            }
          },
          {
            name: 'Gestion du parc & CMDB',
            level: 'Opérationnel',
            desc: 'Inventaire du parc matériel et logiciel, gestion des licences, suivi des garanties et des renouvellements. Utilisation d\'GLPI pour la CMDB et génération de rapports périodiques.',
            proof: {
              title: 'Preuve : Inventaire CMDB en stage',
              body: 'Participation à l\'audit complet du parc informatique de 200+ postes lors du stage de 1ère année. Import des données dans GLPI, création de QR codes pour les équipements, mise en place d\'alertes automatiques pour les licences expirant sous 90 jours. Réduction des licences surnuméraires de 15%.'
            }
          }
        ]
      },
      {
        id: 'incidents',
        icon: '🛠️',
        label: 'Réponse aux incidents',
        desc: 'Expérience en support utilisateur, ticketing, diagnostic et résolution d\'incidents de niveau 1 à 3.',
        skills: [
          {
            name: 'Gestion de tickets (ITSM)',
            level: 'Maîtrisé',
            desc: 'Traitement de tickets d\'incidents via GLPI et Jira Service Management. Priorisation selon la matrice Impact/Urgence ITIL, escalade vers les équipes N2/N3, suivi des SLA et communication proactive avec les utilisateurs.',
            proof: {
              title: 'Preuve : Support helpdesk en alternance',
              body: 'Traitement de 40+ tickets/semaine sur la période octobre-décembre 2024. Taux de résolution au premier contact : 72%. SLA respecté à 94%. Création de 12 procédures de résolution documentées dans la base de connaissances interne, réduisant le temps moyen de résolution de 18 minutes.'
            }
          },
          {
            name: 'Diagnostic réseau & système',
            level: 'Opérationnel',
            desc: 'Diagnostic des problèmes réseau (ping, traceroute, nmap, Wireshark), analyse des logs système, vérification des services (systemctl, journalctl), dépannage DNS/DHCP et configuration VPN.',
            proof: {
              title: 'Preuve : Résolution d\'incident réseau critique',
              body: 'Résolution d\'une panne réseau affectant 30 postes dans une filiale. Diagnostic via Wireshark : identification d\'un loop switching causé par une mauvaise configuration RSTP. Correction du port BPDU Guard sur le switch Cisco. Durée totale d\'intervention : 2h vs SLA de 4h. Rédaction du post-mortem complet.'
            }
          },
          {
            name: 'Assistance utilisateur',
            level: 'Maîtrisé',
            desc: 'Formation des utilisateurs sur les outils bureautiques et métier, rédaction de guides pratiques illustrés, animation de sessions de formation collectives (5-15 personnes), support à distance via TeamViewer/AnyDesk.',
            proof: {
              title: 'Preuve : Formation migration Microsoft 365',
              body: 'Animation de 4 sessions de formation (12 utilisateurs chacune) lors de la migration Teams/SharePoint. Création d\'un support de 30 slides et d\'un guide de démarrage rapide. Questionnaire de satisfaction post-formation : 4.6/5. Réduction des tickets liés à M365 de 60% dans les 3 semaines suivantes.'
            }
          }
        ]
      },
      {
        id: 'online',
        icon: '🌐',
        label: 'Présence en ligne',
        desc: 'Compétences en CMS, référencement naturel, analyse web et évolution des sites institutionnels.',
        skills: [
          {
            name: 'CMS & Gestion de contenu',
            level: 'Maîtrisé',
            desc: 'Développement et administration de sites sous WordPress (thèmes enfants, plugins personnalisés, WooCommerce) et Drupal. Création d\'un CMS maison en PHP/MySQL pour un client associatif. Gestion des accès contributeurs et formation éditoriale.',
            proof: {
              title: 'Preuve : CMS Institutionnel (Projet)',
              body: 'Développement complet d\'un CMS sur-mesure en PHP/MySQL pour l\'association Maison de Quartier Belleville. Interface d\'administration WYSIWYG avec TinyMCE, gestion des médias avec redimensionnement automatique, workflow de publication avec validation rédacteur → administrateur. 8 contributeurs formés, 150+ articles publiés depuis le lancement.'
            }
          },
          {
            name: 'SEO & Analytics',
            level: 'Opérationnel',
            desc: 'Audit SEO technique (Core Web Vitals, balises structurées, sitemap, robots.txt), utilisation de Google Search Console et Google Analytics 4. Intégration de Schema.org et optimisation des performances (Lighthouse score 90+).',
            proof: {
              title: 'Preuve : Audit SEO et amélioration des performances',
              body: 'Audit complet du site WordPress d\'un client e-commerce : score Lighthouse initial 42/100. Actions : compression images WebP, lazy loading, minification CSS/JS, implémentation cache Redis, balises Open Graph. Score final : 91/100. Trafic organique +34% en 3 mois selon Google Analytics 4.'
            }
          },
          {
            name: 'Évolution & maintenance web',
            level: 'Opérationnel',
            desc: 'Maintenance évolutive et corrective de sites web existants, gestion des mises à jour plugins/thèmes, sauvegardes automatisées, monitoring uptime et alertes Sentry pour les erreurs front/back.',
            proof: {
              title: 'Preuve : Maintenance parc web en alternance',
              body: 'Responsable de la maintenance de 6 sites clients en alternance. Mise en place d\'un pipeline de mises à jour hebdomadaires avec environnement de staging. Configuration de Sentry pour le monitoring d\'erreurs JavaScript. Zéro incident de production majeur sur la période de 12 mois grâce aux sauvegardes automatisées quotidiennes.'
            }
          }
        ]
      },
      {
        id: 'project',
        icon: '📋',
        label: 'Mode Projet',
        desc: 'Méthodologies Agile/SCRUM, planification Gantt, collaboration d\'équipe et outils de gestion de projet.',
        skills: [
          {
            name: 'Agile / SCRUM',
            level: 'Maîtrisé',
            desc: 'Participation active aux cérémonies SCRUM : sprint planning, daily stand-up, sprint review et rétrospective. Rôle de Scrum Master junior sur le projet TaskFlow. Utilisation du velocity chart pour l\'estimation et le suivi des sprints de 2 semaines.',
            proof: {
              title: 'Preuve : Projet TaskFlow en méthode SCRUM',
              body: 'Chef de projet sur TaskFlow (équipe de 4 développeurs). Mise en place du board Kanban dans Jira, définition de la Definition of Done, rédaction des user stories avec critères d\'acceptance. 6 sprints de 2 semaines complétés. Velocity stabilisée à 32 points/sprint après 3 itérations. Livraison dans les délais avec 98% du backlog initial complété.'
            }
          },
          {
            name: 'Planification (Gantt / Notion)',
            level: 'Opérationnel',
            desc: 'Création et suivi de diagrammes de Gantt pour la planification de projets (GanttProject, Excel, Notion). Identification des chemins critiques, gestion des dépendances entre tâches et ajustement du planning en cas de dérive.',
            proof: {
              title: 'Preuve : Planning projet CMS Institutionnel',
              body: 'Rédaction du cahier des charges et planification complète du projet CMS sur 6 semaines. Diagramme de Gantt avec 4 jalons (maquettes → développement → recette → livraison), identification de 2 tâches sur le chemin critique. Respect du planning à 95%, un retard de 2 jours sur la phase de recette absorbé par la marge prévue.'
            }
          },
          {
            name: 'Collaboration & outils d\'équipe',
            level: 'Maîtrisé',
            desc: 'Utilisation quotidienne de Jira, Confluence, Notion, Trello et Slack en contexte professionnel. Rédaction de comptes-rendus de réunion, animation de kick-off, partage de connaissances et revue de code collaborative.',
            proof: {
              title: 'Preuve : Collaboration multi-équipe en alternance',
              body: 'Travail en mode projet avec 3 équipes distinctes (dev, infra, métier) via Confluence et Slack. Rédaction de 20+ comptes-rendus de réunion, animation de 2 ateliers de refinement backlog. Mise en place d\'un espace Notion centralisé pour le knowledge management de l\'équipe dev (30+ pages documentées).'
            }
          }
        ]
      },
      {
        id: 'deploy',
        icon: '🚀',
        label: 'Déploiement & Tests',
        desc: 'Tests d\'intégration, déploiement continu, formation utilisateur et pratiques DevOps modernes.',
        skills: [
          {
            name: 'Tests & Qualité logicielle',
            level: 'Opérationnel',
            desc: 'Rédaction de tests unitaires (PHPUnit, Jest) et de tests d\'intégration (Postman, Cypress). Couverture de code mesurée via Istanbul/nyc. Participation aux recettes utilisateur (UAT) et rédaction de procès-verbaux de recette.',
            proof: {
              title: 'Preuve : Suite de tests API Inventory',
              body: 'Mise en place d\'une suite de tests complète pour l\'API REST : 87 tests unitaires avec PHPUnit (couverture 78%), 23 tests d\'intégration via Postman/Newman exécutés automatiquement dans le pipeline CI. Recette utilisateur avec 5 testeurs métier : 3 bugs critiques détectés et corrigés avant la livraison en production.'
            }
          },
          {
            name: 'CI/CD & DevOps',
            level: 'Opérationnel',
            desc: 'Mise en place de pipelines CI/CD avec GitHub Actions et GitLab CI. Containerisation avec Docker et Docker Compose, déploiement sur VPS Linux (Ubuntu), configuration Nginx comme reverse proxy, gestion des certificats SSL avec Let\'s Encrypt.',
            proof: {
              title: 'Preuve : Pipeline CI/CD complet (Projet)',
              body: 'Architecture DevOps complète pour le projet TaskFlow : build Docker → tests automatisés → analyse statique SonarQube → déploiement staging → déploiement production avec approbation manuelle. Temps de déploiement : 4 minutes. Rollback automatique si le health check échoue après déploiement. Uptime production : 99.7% sur 6 mois.'
            }
          },
          {
            name: 'Formation & conduite du changement',
            level: 'Opérationnel',
            desc: 'Conception de supports pédagogiques (slides, guides PDF, vidéos tutoriels), animation de formations en présentiel et à distance, recueil des retours et itération sur les contenus. Accompagnement au changement lors des migrations et nouvelles implémentations.',
            proof: {
              title: 'Preuve : Formation déploiement TaskFlow',
              body: 'Conception et animation d\'une formation de 3h pour 15 utilisateurs finaux lors du déploiement de TaskFlow. Création d\'un manuel utilisateur illustré (28 pages), de 5 tutoriels vidéo (2-4 min chacun) hébergés sur l\'intranet. Score d\'adoption à J+30 : 89% des utilisateurs actifs quotidiennement (vs objectif de 75%).'
            }
          }
        ]
      }
    ];
  }

  _html() {
    const cats = this._data();
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
        <div style="margin-top:auto;padding-top:20px;border-top:1px solid var(--border);margin-top:20px">
          <p style="font-family:var(--font-mono);font-size:9px;color:var(--text-muted);line-height:1.6;padding:0 5px">
            BTS SIO — Option SLAM<br>
            Épreuve E4 — Référentiel 2024<br>
            <span style="color:var(--accent-d)">5 domaines · 15 compétences</span>
          </p>
        </div>
      </aside>
      <div class="e4-content">
        ${cats.map((c, i) => `
          <div class="e4-panel ${i === 0 ? 'active' : ''}" data-panel="${c.id}">
            <div class="e4-panel-header">
              <h2>${c.icon} ${c.label}</h2>
              <p>${c.desc}</p>
            </div>
            <div class="win-scroll">
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
                        data-proof-title="${s.proof.title.replace(/"/g, '&quot;')}"
                        data-proof-body="${s.proof.body.replace(/"/g, '&quot;')}">
                        📎 Voir la preuve / Réalisation
                      </button>
                    </div>
                  </div>`).join('')}
              </div>
            </div>
          </div>`).join('')}
      </div>
    </div>`;
  }

  _init() {
    const win = document.querySelector(`.os-window[data-id="${this.id}"]`);
    if (!win) return;

    // Category switching
    win.querySelectorAll('.e4-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        win.querySelectorAll('.e4-cat-btn').forEach(b => b.classList.remove('active'));
        win.querySelectorAll('.e4-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        win.querySelector(`.e4-panel[data-panel="${btn.dataset.cat}"]`)?.classList.add('active');
      });
    });

    // Skill card accordion
    win.addEventListener('click', (e) => {
      const head = e.target.closest('.e4-skill-head');
      if (head) {
        const card = head.closest('.e4-skill-card');
        card.classList.toggle('open');
      }

      // Proof modal
      const proofBtn = e.target.closest('.e4-proof-btn');
      if (proofBtn) {
        this._showProof(proofBtn.dataset.proofTitle, proofBtn.dataset.proofBody);
      }
    });
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
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  }
}
