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
          <div class="about-role">// BTS SIO · SLAM</div>
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
            <p>Je suis <strong>Nolane Mesrine</strong>, étudiant en BTS SIO option SLAM passionné par le développement Applicatifs, l'open source et les systèmes modernes. Actuellement en recherche d'alternance, je suis à la recherche d'une opportunité pour développer mes compétences et contribuer à des projets innovants.</p>
            <p>Ma philosophie : Structurer le plus possible son code pour qu'il soit maintenable et chercher toujours l'outil le plus adapté au problème plutôt que de forcer un marteau sur une vis.</p>
            <p>En dehors du code, je fait de la photographie et j'écoute de la musique.</p>
            <div class="about-tags">
              <span class="about-tag">C#</span><span class="about-tag">WPF</span><span class="about-tag">Java</span><span class="about-tag">Python</span>
              <span class="about-tag">PHP/symfony</span><span class="about-tag">Docker</span>
              <span class="about-tag">Git</span><span class="about-tag">Linux</span>
              <span class="about-tag">SQL</span><span class="about-tag">ST</span>
            </div>
          </div>

          <div class="about-section" id="tab-skills">
            <h2>Compétences Techniques</h2>
            <div class="skills-group">
              <p class="skills-group-title">Langages & Frameworks</p>
              <div class="about-tags">
                <span class="about-tag">C#</span>
                <span class="about-tag">WPF</span>
                <span class="about-tag">JavaScript</span>
                <span class="about-tag">Java</span>
                <span class="about-tag">Python</span>
                <span class="about-tag">PHP</span>
                <span class="about-tag">Symfony</span>
                <span class="about-tag">HTML / CSS</span>
                <span class="about-tag">SQL</span>
                <span class="about-tag">Bash</span>
                <span class="about-tag">ST</span>
                <span class="about-tag">Modbus</span>
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
                <span class="about-tag">JetBrain Rider</span>
                <span class="about-tag">MySQL</span>
                <span class="about-tag">Laragon</span>
                <span class="about-tag">CODESYS</span>
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
                      <div class="xp-title">Développeur Back-End — Stage</div>
                      <div class="xp-company">TechSolutions Paris</div>
                    </div>
                    <div class="xp-date">Janv 2026 – Mars 2026</div>
                  </div>
                  <p class="xp-desc">Intégration et modification d'un PLC avec CODESYS sur une application de contrôle industriel faite en WPF avec Modbus.</p>
                  <div class="about-tags">
                    <span class="about-tag">C#</span><span class="about-tag">WPF</span><span class="about-tag">CODESYS</span><span class="about-tag">ST</span><span class="about-tag">Modbus</span>
                  </div>
                </div>
              </div>
              <div class="xp-item">
                <div class="xp-dot"></div>
                <div class="xp-card">
                  <div class="xp-header">
                    <div>
                      <div class="xp-title">CyberSécurité — Stage</div>
                      <div class="xp-company">centre de gestion de la fonction publique territoriale des Deux-Sèvres</div>
                    </div>
                    <div class="xp-date">Mai 2025 - Juin 2025</div>
                  </div>
                  <p class="xp-desc">Mise en place d'un campagne de sensibilisation à la cybersécurité avec des outils de communication et de formation. Mise en place de fausse campagne de phishing.</p>
                  <div class="about-tags">
                    <span class="about-tag">CyberSécurité</span><span class="about-tag">Prévention</span><span class="about-tag">Phishing</span><span class="about-tag">Communication</span>
                  </div>
                </div>
              </div>
              <div class="xp-item">
                <div class="xp-dot xp-dot--edu"></div>
                <div class="xp-card">
                  <div class="xp-header">
                    <div>
                      <div class="xp-title">BTS SIO — option SLAM</div>
                      <div class="xp-company">Lycée Générale et technologique de la Venise Verte, Niort</div>
                    </div>
                    <div class="xp-date">2024 – 2026</div>
                  </div>
                  <p class="xp-desc">Formation en développement d'applications, administration réseau, gestion de projet.</p>
                  <div class="about-tags">
                    <span class="about-tag">Java</span><span class="about-tag">PHP</span><span class="about-tag">SQL</span><span class="about-tag">Gestion de projets</span><span class="about-tag">Réseaux</span>
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
