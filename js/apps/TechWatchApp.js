export class TechWatchApp {
  constructor(wm) { this.wm = wm; this.id = 'techwatch'; }

  open() {
    if (this.wm.isOpen(this.id)) { this.wm.focus(this.id); this.wm.restore(this.id); return; }
    this.wm.open(this.id, 'veille_techno.browser', this._html(), { width: 900, height: 580 });
    setTimeout(() => this._init(), 50);
  }

  _html() {
    const cats = [
      { id: 'all', label: 'Tout', color: 'var(--accent-a)' },
      { id: 'ARM', label: 'Architecture ARM', color: 'var(--accent-b)' },
      { id: 'RISC-V', label: 'Architecture RISC-V', color: 'var(--accent-b)' },
    ];

    const articles = [
      {
        cat: 'ARM',
        catLabel: 'Architecture ARM',
        color: 'var(--accent-c)',
        date: 'Mai 2026',
        date_bg: 'rgba(255,179,71,.1)',
        title: 'Armv9.7-A : les nouveautés architecture 2025-2026',
        desc: 'Mise à jour majeure de l\'architecture A-Profile avec de nouvelles instructions SVE et SME pour les données 6-bit, optimisées pour l\'IA embarquée et les performances vectorielles.',
        link: 'https://developer.arm.com/community/arm-community-blogs/b/architectures-and-processors-blog/posts/arm-a-profile-architecture-developments-2025'
      },
      {
        cat: 'RISC-V',
        catLabel: 'Architecture RISC-V',
        color: 'var(--accent-c)',
        date: 'Avr. 2026',
        date_bg: 'rgba(255,179,71,.1)',
        title: 'RISC-V 2026 Update : RVA23, IA et adoption massive',
        desc: 'Revue complète des avancées RISC-V avec la ratification RVA23, les extensions vectorielles pour l\'IA, l\'arrivée d\'Ubuntu optimisé et la progression dans l\'automobile et les serveurs.',
        link: 'https://www.youtube.com/watch?v=z6gHC-R59lw'
      },
      {
        cat: 'ARM',
        catLabel: 'Architecture ARM',
        color: 'var(--accent-c)',
        date: 'Mars 2026',
        date_bg: 'rgba(255,179,71,.1)',
        title: 'Arm vs RISC-V en 2025-2026 : qui va dominer ?',
        desc: 'Comparaison approfondie des deux architectures : customisation RISC-V vs écosystème mature ARM, avec focus sur l\'IA, l\'efficacité énergétique et les déploiements cloud/edge.',
        link: 'https://www.linkedin.com/pulse/arm-vs-risc-v-2025-which-architecture-define-future-florous-ph-d--o0aaf'
      },
      {
        cat: 'RISC-V',
        catLabel: 'Architecture RISC-V',
        color: 'var(--accent-c)',
        date: 'Fév. 2026',
        date_bg: 'rgba(255,179,71,.1)',
        title: 'RISC-V atteint la maturité : Linux prêt pour l\'adoption large',
        desc: 'Canonical annonce qu\'Ubuntu 26.04 LTS rend RISC-V prêt pour la production à grande échelle avec le profil RVA23, rivalisant avec ARM et x86 dans les serveurs et edge.',
        link: 'https://www.howtogeek.com/risc-v-linux-will-be-ready-for-wide-adoption-in-2026-says-canonical/'
      },
      {
        cat: 'ARM',
        catLabel: 'Architecture ARM',
        color: 'var(--accent-c)',
        date: 'Janv. 2026',
        date_bg: 'rgba(255,179,71,.1)',
        title: 'Innovations ARM : Lumex et Compute Subsystems pour l\'IA',
        desc: 'Architecture Lumex optimisée IA intégrant CPU/GPU/NPU, et avancée des Compute Subsystems qui accélèrent le time-to-market pour les partenaires comme Google et Samsung.',
        link: 'https://www.marketresearchfuture.com/news/arm-introduces-ai-optimized-chip-architecture-in-2025'
    },
      {
        cat: 'RISC-V',
        catLabel: 'Architecture RISC-V',
        color: 'var(--accent-c)',
        date: 'Mars 2026',
        date_bg: 'rgba(255,179,71,.1)',
        title: 'RISC-V dans l\'automobile et l\'IA : Embedded World 2026',
        desc: 'Nouvelles puces automotive-grade et IP IA-native (vector + matrix) chez SiFive, Andes et Infineon, montrant la montée en puissance de RISC-V dans les systèmes critiques.',
        link: 'https://riscv.org/blog/embedded-world-2026/'
      },
    ];

    return `
    <div class="techwatch-layout" style="height:100%">
      <aside class="techwatch-sidebar">
        <h3>Catégories</h3>
        ${cats.map(c => `
          <button class="tw-cat ${c.id === 'all' ? 'active' : ''}" data-cat="${c.id}">
            <span class="tw-dot" style="background:${c.color}"></span>${c.label}
          </button>`).join('')}
      </aside>
      <div class="win-scroll" style="flex:1">
        <div class="tw-header" style="padding:16px 24px 12px;border-bottom:1px solid var(--border)">
          <a href="https://canva.link/0y8877nlh64kjbv" style="font-family:var(--font-display);font-weight:800;font-size:18px;color:var(--text-primary)">Veille Technologique</a>
          <p style="font-family:var(--font-mono);font-size:11px;color:var(--text-muted);margin-top:4px">// SLAM — Surveillance des tendances tech 2024-2025</p>
        </div>
        <div id="tw-feed">
          ${articles.map(a => `
            <article class="tw-article" data-cat="${a.cat}">
              <div class="tw-article-meta">
                <span class="tw-article-cat" style="background:${a.date_bg};color:${a.color};border:1px solid ${a.color}22">${a.catLabel}</span>
                <span class="tw-article-date">${a.date}</span>
              </div>
              <h3>${a.title}</h3>
              <p>${a.desc}</p>
              <a href="${a.link}" class="tw-read-more">→ Lire l'article complet</a>
            </article>`).join('')}
        </div>
      </div>
    </div>`;
  }

  _init() {
    const win = document.querySelector(`.os-window[data-id="${this.id}"]`);
    if (!win) return;

    win.querySelectorAll('.tw-cat').forEach(btn => {
      btn.addEventListener('click', () => {
        win.querySelectorAll('.tw-cat').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.cat;
        win.querySelectorAll('.tw-article').forEach(a => {
          a.style.display = (cat === 'all' || a.dataset.cat === cat) ? '' : 'none';
        });
      });
    });
  }
}
