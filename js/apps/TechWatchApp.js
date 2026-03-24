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
      { id: 'ai', label: 'IA & ML', color: 'var(--accent-b)' },
      { id: 'web', label: 'Web Dev', color: 'var(--accent-c)' },
      { id: 'security', label: 'Cybersécurité', color: 'var(--accent-e)' },
      { id: 'devops', label: 'DevOps', color: 'var(--accent-d)' },
    ];

    const articles = [
      {
        cat: 'ai', catLabel: 'IA & ML', color: 'var(--accent-b)',
        date: 'Juin 2025', date_bg: 'rgba(110,198,255,.1)',
        title: 'Claude 4 et le raisonnement long-contexte',
        desc: 'Anthropic publie Claude 4, avec une fenêtre de contexte étendue à 200k tokens et de nouvelles capacités de raisonnement étape par étape. Les implications pour le développement logiciel sont considérables : revue de code complète d\'une codebase entière en une seule requête.',
      },
      {
        cat: 'web', catLabel: 'Web Dev', color: 'var(--accent-c)',
        date: 'Mai 2025', date_bg: 'rgba(255,179,71,.1)',
        title: 'CSS Anchor Positioning — La fin des dropdowns JavaScript',
        desc: 'La spécification CSS Anchor Positioning atteint sa maturité dans Chrome 125+. Elle permet de positionner des éléments flottants relativement à un "ancre" DOM, sans une ligne de JS. Tooltip, dropdown, popover : tout devient du CSS natif.',
      },
      {
        cat: 'security', catLabel: 'Cybersécurité', color: 'var(--accent-e)',
        date: 'Avr. 2025', date_bg: 'rgba(255,143,163,.1)',
        title: 'Faille critique dans OpenSSH : CVE-2025-0281',
        desc: 'Une vulnérabilité d\'exécution de code à distance (RCE) affecte les versions d\'OpenSSH antérieures à 9.8. Les serveurs Linux exposés sur Internet sont directement concernés. Mise à jour immédiate recommandée et audit des clés autorisées.',
      },
      {
        cat: 'devops', catLabel: 'DevOps', color: 'var(--accent-d)',
        date: 'Mar. 2025', date_bg: 'rgba(207,159,255,.1)',
        title: 'Docker 26 : Build Cache persistant et Compose Watch',
        desc: 'Docker 26 introduit un cache de build persistant entre les machines via un registre distant, réduisant drastiquement les temps CI. La fonctionnalité Compose Watch recharge automatiquement les services lors de modifications fichier, similaire au HMR frontend.',
      },
      {
        cat: 'ai', catLabel: 'IA & ML', color: 'var(--accent-b)',
        date: 'Mar. 2025', date_bg: 'rgba(110,198,255,.1)',
        title: 'LLMs dans le code : GitHub Copilot X vs Cursor vs Codeium',
        desc: 'Comparatif des assistants IA de code : GitHub Copilot X intègre GPT-4 et propose la revue de PR automatique. Cursor se distingue par ses modifications "diff" directement dans l\'éditeur. Codeium reste gratuit et supporte 70+ langages.',
      },
      {
        cat: 'web', catLabel: 'Web Dev', color: 'var(--accent-c)',
        date: 'Fév. 2025', date_bg: 'rgba(255,179,71,.1)',
        title: 'Next.js 15 et React Server Components : retour d\'expérience',
        desc: 'Après plusieurs mois de production avec RSC, les retours terrain révèlent à la fois des gains de performance significatifs (TTI -40%) et une complexité mentale accrue. Le modèle "server-first" nécessite de repenser complètement la gestion d\'état.',
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
          <h2 style="font-family:var(--font-display);font-weight:800;font-size:18px;color:var(--text-primary)">Veille Technologique</h2>
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
              <span class="tw-read-more">→ Lire l'article complet</span>
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
