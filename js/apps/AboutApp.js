export class AboutApp {
  constructor(wm) { this.wm = wm; this.id = 'about'; }

  open() {
    if (this.wm.isOpen(this.id)) { this.wm.focus(this.id); this.wm.restore(this.id); return; }
    this.wm.open(this.id, 'about_me.exe', this._html(), { width: 740, height: 520 });
    setTimeout(() => this._init(), 50);
  }

  _html() {
    return `
    <div class="about-layout">
      <aside class="about-sidebar">
        <div class="about-avatar">NM</div>
        <div>
          <div class="about-name">Nolane Mesrine</div>
          <div class="about-role">// BTS SIO · SLNM</div>
        </div>
        <nav class="about-nav">
          <button class="about-nav-btn active" data-tab="bio">Biographie</button>
          <button class="about-nav-btn" data-tab="skills">Compétences</button>
          <button class="about-nav-btn" data-tab="xp">Expériences</button>
        </nav>
      </aside>
      <div class="about-content win-scroll">
        <div class="about-scroll">

          <div class="about-section active" id="tab-bio">
            <h2>Hello, World! 👋</h2>
            <p>Je suis <strong>Nolane Mesrine</strong>, étudiant en BTS SIO option SLNM passionné par le développement web, l'open source et les systèmes modernes. Actuellement en alternance chez TechSolutions Paris, je conçois et maintiens des applications full-stack au quotidien.</p>
            <p>Ma philosophie : écrire du code lisible, documenter correctement, et toujours chercher l'outil le plus adapté au problème plutôt que de forcer un marteau sur une vis.</p>
            <p>En dehors du code, je pratique le rock climbing et je contribue à quelques projets open source liés à la cybersécurité.</p>
            <div class="about-tags">
              <span class="about-tag">JavaScript</span><span class="about-tag">Python</span>
              <span class="about-tag">PHP/Laravel</span><span class="about-tag">Docker</span>
              <span class="about-tag">Git</span><span class="about-tag">Linux</span>
              <span class="about-tag">SQL</span><span class="about-tag">Agile/SCRUM</span>
            </div>
          </div>

          <div class="about-section" id="tab-skills">
            <h2>Compétences Techniques</h2>
            <div class="skills-group">
              <p class="skills-group-title">Langages & Frameworks</p>
              <div class="about-tags">
                <span class="about-tag">JavaScript</span>
                <span class="about-tag">TypeScript</span>
                <span class="about-tag">Python</span>
                <span class="about-tag">PHP</span>
                <span class="about-tag">Laravel</span>
                <span class="about-tag">Vue.js</span>
                <span class="about-tag">HTML / CSS</span>
                <span class="about-tag">SQL</span>
                <span class="about-tag">Bash</span>
              </div>
            </div>
            <div class="skills-group">
              <p class="skills-group-title">Outils & Environnements</p>
              <div class="about-tags">
                <span class="about-tag">Git / GitHub</span>
                <span class="about-tag">Docker</span>
                <span class="about-tag">Linux</span>
                <span class="about-tag">GitHub Actions</span>
                <span class="about-tag">VS Code</span>
                <span class="about-tag">PhpStorm</span>
                <span class="about-tag">Nginx</span>
                <span class="about-tag">MySQL</span>
                <span class="about-tag">MongoDB</span>
              </div>
            </div>
            <div class="skills-group">
              <p class="skills-group-title">Méthodes & Gestion de projet</p>
              <div class="about-tags">
                <span class="about-tag">Agile / SCRUM</span>
                <span class="about-tag">Kanban</span>
                <span class="about-tag">Jira</span>
                <span class="about-tag">Notion</span>
                <span class="about-tag">Confluence</span>
                <span class="about-tag">CI/CD</span>
                <span class="about-tag">TDD</span>
              </div>
            </div>
          </div>

          <div class="about-section" id="tab-xp">
            <h2>Expériences</h2>
            <div class="xp-timeline">
              <div class="xp-item">
                <div class="xp-dot"></div>
                <div class="xp-card">
                  <div class="xp-header">
                    <div>
                      <div class="xp-title">Développeur Full-Stack — Alternance</div>
                      <div class="xp-company">TechSolutions Paris</div>
                    </div>
                    <div class="xp-date">2024 – Présent</div>
                  </div>
                  <p class="xp-desc">Conception et maintenance d'applications web full-stack. Intégration de pipelines CI/CD, refactoring d'APIs Laravel, développement de composants Vue.js.</p>
                  <div class="about-tags">
                    <span class="about-tag">Laravel</span><span class="about-tag">Vue.js</span><span class="about-tag">Docker</span><span class="about-tag">GitHub Actions</span>
                  </div>
                </div>
              </div>
              <div class="xp-item">
                <div class="xp-dot"></div>
                <div class="xp-card">
                  <div class="xp-header">
                    <div>
                      <div class="xp-title">Développeur Web — Stage</div>
                      <div class="xp-company">Agence Digitale Lyonnaise</div>
                    </div>
                    <div class="xp-date">Été 2023</div>
                  </div>
                  <p class="xp-desc">Développement de sites vitrines et e-commerce sous WordPress et WooCommerce. Optimisation SEO et performance (Lighthouse 90+).</p>
                  <div class="about-tags">
                    <span class="about-tag">WordPress</span><span class="about-tag">PHP</span><span class="about-tag">JavaScript</span><span class="about-tag">SEO</span>
                  </div>
                </div>
              </div>
              <div class="xp-item">
                <div class="xp-dot xp-dot--edu"></div>
                <div class="xp-card">
                  <div class="xp-header">
                    <div>
                      <div class="xp-title">BTS SIO — option SLAM</div>
                      <div class="xp-company">Lycée Technique, Paris</div>
                    </div>
                    <div class="xp-date">2023 – 2025</div>
                  </div>
                  <p class="xp-desc">Formation en développement d'applications web et mobiles, administration réseau, gestion de projet Agile.</p>
                  <div class="about-tags">
                    <span class="about-tag">Python</span><span class="about-tag">SQL</span><span class="about-tag">Agile</span><span class="about-tag">Réseaux</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  _init() {
    const win = document.querySelector(`.os-window[data-id="${this.id}"]`);
    if (!win) return;
    win.querySelectorAll('.about-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        win.querySelectorAll('.about-nav-btn').forEach(b => b.classList.remove('active'));
        win.querySelectorAll('.about-section').forEach(s => s.classList.remove('active'));
        btn.classList.add('active');
        win.querySelector(`#tab-${btn.dataset.tab}`)?.classList.add('active');
      });
    });
  }
}
