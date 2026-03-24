export class CVApp {
  constructor(wm) { this.wm = wm; this.id = 'cv'; }

  open() {
    if (this.wm.isOpen(this.id)) { this.wm.focus(this.id); this.wm.restore(this.id); return; }
    this.wm.open(this.id, 'curriculum_vitae.pdf', this._html(), { width: 780, height: 620 });
  }

  _html() {
    return `
    <div class="win-scroll">
      <div class="cv-layout">

        <!-- Header Card -->
        <div class="cv-header-card">
          <div class="cv-avatar-sm">AM</div>
          <div class="cv-meta">
            <h2>Alexandre Moreau</h2>
            <p>Étudiant BTS SIO option SLAM — Développeur Full-Stack en alternance</p>
            <div class="cv-contact">
              <span class="cv-contact-item">📧 alexandre.moreau@email.com</span>
              <span class="cv-contact-item">📍 Paris, France</span>
              <span class="cv-contact-item">🔗 github.com/alexmoreau</span>
              <span class="cv-contact-item">💼 linkedin.com/in/alexmoreau</span>
            </div>
          </div>
        </div>

        <!-- Experience -->
        <div class="cv-section">
          <div class="cv-section-title">Expérience professionnelle</div>
          <div class="cv-exp">
            <div class="cv-exp-item">
              <div class="cv-exp-head">
                <div>
                  <div class="cv-exp-title">Développeur Full-Stack (Alternance)</div>
                  <div class="cv-exp-company">TechSolutions Paris · CDI-alternance</div>
                </div>
                <div class="cv-exp-date">Sept. 2024 – Présent</div>
              </div>
              <div class="cv-exp-desc">
                Développement et maintenance d'applications web internes en Laravel/Vue.js. 
                Mise en place du pipeline CI/CD avec GitHub Actions. 
                Support helpdesk N1/N2, gestion du parc informatique, participation aux cérémonies SCRUM.
              </div>
            </div>
            <div class="cv-exp-item">
              <div class="cv-exp-head">
                <div>
                  <div class="cv-exp-title">Stagiaire Développeur Web</div>
                  <div class="cv-exp-company">Agence DigitalCraft · Stage 6 semaines</div>
                </div>
                <div class="cv-exp-date">Juin – Juil. 2024</div>
              </div>
              <div class="cv-exp-desc">
                Développement d'un CMS sur-mesure en PHP/MySQL. 
                Audit SEO et optimisation des performances de 3 sites clients. 
                Formation des équipes éditoriales à l'utilisation du backoffice.
              </div>
            </div>
            <div class="cv-exp-item">
              <div class="cv-exp-head">
                <div>
                  <div class="cv-exp-title">Technicien Support (Stage)</div>
                  <div class="cv-exp-company">Mairie du 11e arrondissement · Stage 4 semaines</div>
                </div>
                <div class="cv-exp-date">Jan. 2024</div>
              </div>
              <div class="cv-exp-desc">
                Audit et inventaire du parc informatique (200+ postes) sous GLPI. 
                Support utilisateur niveau 1, installation et configuration de postes Windows 11. 
                Participation à la migration vers Microsoft 365.
              </div>
            </div>
          </div>
        </div>

        <!-- Education -->
        <div class="cv-section">
          <div class="cv-section-title">Formation</div>
          <div class="cv-exp">
            <div class="cv-exp-item">
              <div class="cv-exp-head">
                <div>
                  <div class="cv-exp-title">BTS SIO option SLAM</div>
                  <div class="cv-exp-company">Lycée Victor Hugo, Paris 11e</div>
                </div>
                <div class="cv-exp-date">2023 – 2025</div>
              </div>
              <div class="cv-exp-desc">
                Solutions Logicielles et Applications Métiers. Spécialisation développement web, 
                bases de données, réseaux et gestion de projets informatiques. Moyenne générale : 16.4/20.
              </div>
            </div>
            <div class="cv-exp-item">
              <div class="cv-exp-head">
                <div>
                  <div class="cv-exp-title">Baccalauréat Général — NSI & Mathématiques</div>
                  <div class="cv-exp-company">Lycée Voltaire, Paris 11e</div>
                </div>
                <div class="cv-exp-date">2023</div>
              </div>
              <div class="cv-exp-desc">Mention Très Bien — Spécialités Numérique & Sciences Informatiques et Mathématiques.</div>
            </div>
          </div>
        </div>

        <!-- Certifications -->
        <div class="cv-section">
          <div class="cv-section-title">Certifications</div>
          <div class="cert-grid">
            ${this._cert('🎓', 'PIX', 'Certification numérique nationale', '#FFB347', 'rgba(255,179,71,.1)')}
            ${this._cert('☁️', 'AWS Cloud Practitioner', 'Amazon Web Services', '#6EC6FF', 'rgba(110,198,255,.1)')}
            ${this._cert('🔒', 'Google Cybersecurity', 'Google / Coursera', '#FF8FA3', 'rgba(255,143,163,.1)')}
            ${this._cert('🐧', 'Linux Essentials', 'LPI — Linux Professionnel', '#7DF9C4', 'rgba(126,249,196,.1)')}
          </div>
        </div>

        <!-- Tech Skills -->
        <div class="cv-section">
          <div class="cv-section-title">Compétences techniques</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px">
            <div>
              <p style="font-family:var(--font-mono);font-size:10px;color:var(--text-muted);letter-spacing:.1em;margin-bottom:12px">LANGAGES & FRAMEWORKS</p>
              <div class="skill-bars">
                ${this._bar('JavaScript / TypeScript', 88, 'var(--accent-a)')}
                ${this._bar('PHP / Laravel', 75, 'var(--accent-b)')}
                ${this._bar('Python', 78, 'var(--accent-c)')}
                ${this._bar('SQL / MySQL', 82, 'var(--accent-d)')}
                ${this._bar('HTML / CSS', 93, 'var(--accent-e)')}
              </div>
            </div>
            <div>
              <p style="font-family:var(--font-mono);font-size:10px;color:var(--text-muted);letter-spacing:.1em;margin-bottom:12px">OUTILS & ENVIRONNEMENTS</p>
              <div class="skill-bars">
                ${this._bar('Git / GitHub Actions', 87, 'var(--accent-a)')}
                ${this._bar('Docker / Linux', 70, 'var(--accent-b)')}
                ${this._bar('Jira / Confluence', 80, 'var(--accent-c)')}
                ${this._bar('VS Code / PhpStorm', 90, 'var(--accent-d)')}
                ${this._bar('Figma / Design', 60, 'var(--accent-e)')}
              </div>
            </div>
          </div>
        </div>

        <!-- Languages -->
        <div class="cv-section">
          <div class="cv-section-title">Langues</div>
          <div style="display:flex;gap:12px;flex-wrap:wrap">
            ${[
              { lang: 'Français', level: 'Langue maternelle', pct: 100, color: 'var(--accent-a)' },
              { lang: 'Anglais', level: 'B2 — Courant', pct: 78, color: 'var(--accent-b)' },
              { lang: 'Espagnol', level: 'A2 — Notions', pct: 35, color: 'var(--accent-c)' },
            ].map(l => `
              <div style="flex:1;min-width:160px;padding:14px;border-radius:10px;background:var(--bg-card);border:1px solid var(--border)">
                <div style="font-family:var(--font-display);font-weight:700;font-size:14px;color:var(--text-primary);margin-bottom:4px">${l.lang}</div>
                <div style="font-family:var(--font-mono);font-size:10px;color:var(--text-muted);margin-bottom:10px">${l.level}</div>
                <div class="skill-bar-track"><div class="skill-bar-fill" style="width:${l.pct}%;background:${l.color}"></div></div>
              </div>`).join('')}
          </div>
        </div>

        <!-- Interests -->
        <div class="cv-section">
          <div class="cv-section-title">Centres d'intérêt</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            ${['🧗 Rock Climbing', '🎮 Game Dev (Godot)', '🔐 CTF / Cybersécurité', '📚 Open Source', '🎵 Musique électronique', '✈️ Voyages'].map(i =>
              `<span style="padding:6px 14px;border-radius:20px;background:var(--bg-card);border:1px solid var(--border);font-family:var(--font-mono);font-size:11px;color:var(--text-secondary)">${i}</span>`
            ).join('')}
          </div>
        </div>

      </div>
    </div>`;
  }

  _cert(emoji, name, org, color, bg) {
    return `
    <div class="cert-card">
      <div class="cert-badge" style="background:${bg};font-size:20px">${emoji}</div>
      <div>
        <div class="cert-name">${name}</div>
        <div class="cert-org">${org}</div>
      </div>
    </div>`;
  }

  _bar(name, pct, color) {
    return `
    <div class="skill-bar-item">
      <div class="skill-bar-meta">
        <span class="skill-bar-name">${name}</span>
        <span class="skill-bar-pct">${pct}%</span>
      </div>
      <div class="skill-bar-track">
        <div class="skill-bar-fill" style="width:${pct}%;background:${color};animation-delay:${Math.random() * .4}s"></div>
      </div>
    </div>`;
  }
}
