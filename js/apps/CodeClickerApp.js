export class CodeClickerApp {
  constructor(wm) {
    this.wm = wm;
    this.id = 'codeclicker';
    this.state = null;
  }

  open() {
    if (this.wm.isOpen(this.id)) { this.wm.focus(this.id); this.wm.restore(this.id); return; }
    this._loadState();
    this.wm.open(this.id, 'code_clicker.exe', this._html(), { width: 820, height: 580 });
    setTimeout(() => this._init(), 50);
  }

  _defaultState() {
    return {
      lines: 0,
      totalLines: 0,
      linesPerClick: 1,
      linesPerSec: 0,
      upgrades: {},
      buildings: {
        intern:     { count: 0, cost: 15,      baseCost: 15,      lps: 0.1,   label: 'Stagiaire',        desc: 'Écrit du CSS. Lentement.' },
        junior:     { count: 0, cost: 100,     baseCost: 100,     lps: 0.5,   label: 'Dev Junior',       desc: 'Copie-colle depuis Stack Overflow.' },
        senior:     { count: 0, cost: 1100,    baseCost: 1100,    lps: 3,     label: 'Dev Senior',       desc: 'Refactorise le code des autres.' },
        architect:  { count: 0, cost: 12000,   baseCost: 12000,   lps: 10,    label: 'Architecte',       desc: 'Dessine des diagrammes UML.' },
        devops:     { count: 0, cost: 130000,  baseCost: 130000,  lps: 40,    label: 'DevOps',           desc: 'Lance des pipelines CI/CD.' },
        ai:         { count: 0, cost: 1400000, baseCost: 1400000, lps: 200,   label: 'Agent IA',         desc: 'Génère du code qu\'il faut relire.' },
        cto:        { count: 0, cost: 20000000,baseCost: 20000000,lps: 1000,  label: 'CTO',              desc: 'Va en réunion. Produit peu.' },
      },
      upgradeList: {
        // Click upgrades
        coffee:      { cost: 50,       bought: false, type: 'click', mult: 2,   label: 'Café ☕',           desc: '+1 ligne/clic (×2 clics)',       requires: { totalLines: 0 } },
        dualscreen:  { cost: 500,      bought: false, type: 'click', mult: 2,   label: 'Double écran 🖥️',   desc: 'Encore ×2 lignes/clic',          requires: { totalLines: 200 } },
        ergodesk:    { cost: 5000,     bought: false, type: 'click', mult: 2,   label: 'Bureau ergonomique',desc: 'Encore ×2 lignes/clic',          requires: { totalLines: 2000 } },
        keyboard:    { cost: 50000,    bought: false, type: 'click', mult: 2,   label: 'Clavier mécanique ⌨️',desc: '×2 lignes/clic',              requires: { totalLines: 20000 } },
        vimmode:     { cost: 500000,   bought: false, type: 'click', mult: 2,   label: 'Mode VIM 🤓',       desc: '×2 lignes/clic (si tu sais sortir)',requires: { totalLines: 200000 } },
        // Building upgrades
        intern2:     { cost: 200,      bought: false, type: 'building', target: 'intern',    mult: 2, label: 'Formation stagiaire',  desc: 'Stagiaires ×2', requires: { buildings: { intern: 5 } } },
        junior2:     { cost: 2000,     bought: false, type: 'building', target: 'junior',    mult: 2, label: 'Formation junior',     desc: 'Dev Junior ×2', requires: { buildings: { junior: 5 } } },
        senior2:     { cost: 20000,    bought: false, type: 'building', target: 'senior',    mult: 2, label: 'Code Review obligatoire', desc: 'Dev Senior ×2', requires: { buildings: { senior: 5 } } },
        architect2:  { cost: 200000,   bought: false, type: 'building', target: 'architect', mult: 2, label: 'Design Patterns',      desc: 'Architectes ×2', requires: { buildings: { architect: 5 } } },
        devops2:     { cost: 2000000,  bought: false, type: 'building', target: 'devops',    mult: 2, label: 'GitOps',               desc: 'DevOps ×2',      requires: { buildings: { devops: 5 } } },
        ai2:         { cost: 20000000, bought: false, type: 'building', target: 'ai',        mult: 2, label: 'Fine-tuning',          desc: 'Agents IA ×2',   requires: { buildings: { ai: 5 } } },
      }
    };
  }

  _loadState() {
    try {
      const saved = localStorage.getItem('codeclicker_save');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with default to handle missing keys
        const def = this._defaultState();
        this.state = { ...def, ...parsed };
        // Re-merge buildings and upgrades
        Object.keys(def.buildings).forEach(k => {
          this.state.buildings[k] = { ...def.buildings[k], ...(parsed.buildings?.[k] || {}) };
        });
        Object.keys(def.upgradeList).forEach(k => {
          this.state.upgradeList[k] = { ...def.upgradeList[k], ...(parsed.upgradeList?.[k] || {}) };
        });
      } else {
        this.state = this._defaultState();
      }
    } catch(e) {
      this.state = this._defaultState();
    }
    this._recalc();
  }

  _save() {
    try { localStorage.setItem('codeclicker_save', JSON.stringify(this.state)); } catch(e) {}
  }

  _recalc() {
    const s = this.state;
    // LPS from buildings
    let lps = 0;
    const buildingMults = {};
    // Apply building upgrades
    Object.values(s.upgradeList).forEach(u => {
      if (u.bought && u.type === 'building') {
        buildingMults[u.target] = (buildingMults[u.target] || 1) * u.mult;
      }
    });
    Object.entries(s.buildings).forEach(([k, b]) => {
      lps += b.count * b.lps * (buildingMults[k] || 1);
    });
    s.linesPerSec = lps;

    // LPC from click upgrades
    let lpc = 1;
    Object.values(s.upgradeList).forEach(u => {
      if (u.bought && u.type === 'click') lpc *= u.mult;
    });
    s.linesPerClick = lpc;
  }

  _canAffordUpgrade(uid) {
    const u = this.state.upgradeList[uid];
    if (u.bought || this.state.lines < u.cost) return false;
    const req = u.requires;
    if (req.totalLines !== undefined && this.state.totalLines < req.totalLines) return false;
    if (req.buildings) {
      for (const [bk, bv] of Object.entries(req.buildings)) {
        if ((this.state.buildings[bk]?.count || 0) < bv) return false;
      }
    }
    return true;
  }

  _isUpgradeVisible(uid) {
    const u = this.state.upgradeList[uid];
    if (u.bought) return false;
    const req = u.requires;
    if (req.totalLines !== undefined && this.state.totalLines < req.totalLines * 0.5 && this.state.totalLines < req.totalLines) return false;
    if (req.buildings) {
      for (const [bk, bv] of Object.entries(req.buildings)) {
        if ((this.state.buildings[bk]?.count || 0) < Math.max(1, bv - 2)) return false;
      }
    }
    return true;
  }

  _formatNum(n) {
    if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B';
    if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
    return Math.floor(n).toString();
  }

  _html() {
    return `
    <div class="cc-layout">
      <div class="cc-left">
        <div class="cc-stats">
          <div class="cc-stat-lines" id="cc-lines">0</div>
          <div class="cc-stat-label">lignes de code</div>
          <div class="cc-stat-sub" id="cc-lps">0 lignes/sec</div>
        </div>
        <div class="cc-clicker-area">
          <button class="cc-btn-click" id="cc-click-btn" title="Coder !">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="8" width="52" height="40" rx="5" stroke="var(--accent-a)" stroke-width="3"/>
              <path d="M14 24l8 8-8 8" stroke="var(--accent-a)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M30 40h20" stroke="var(--accent-b)" stroke-width="3" stroke-linecap="round"/>
              <rect x="20" y="52" width="24" height="4" rx="2" fill="var(--accent-a)" opacity=".4"/>
            </svg>
          </button>
          <div class="cc-lpc" id="cc-lpc">+1 ligne/clic</div>
        </div>
        <div class="cc-upgrades-section">
          <div class="cc-section-title">// Améliorations</div>
          <div class="cc-upgrades-list" id="cc-upgrades"></div>
        </div>
      </div>
      <div class="cc-right">
        <div class="cc-section-title">// Production</div>
        <div class="cc-buildings" id="cc-buildings"></div>
      </div>
    </div>`;
  }

  _init() {
    const app = document.querySelector(`[data-id="${this.id}"] .cc-layout`);
    if (!app) return;

    const clickBtn = app.querySelector('#cc-click-btn');
    clickBtn.addEventListener('click', (e) => this._onClick(e, app));

    this._renderAll(app);
    this._startLoop(app);
  }

  _onClick(e, app) {
    const s = this.state;
    const gained = s.linesPerClick;
    s.lines += gained;
    s.totalLines += gained;

    // Particle
    const rect = e.currentTarget.getBoundingClientRect();
    const appRect = app.getBoundingClientRect();
    this._spawnParticle(app, e.clientX - appRect.left, e.clientY - appRect.top, gained);

    this._updateStats(app);
    this._renderUpgrades(app);
  }

  _spawnParticle(app, x, y, val) {
    const p = document.createElement('div');
    p.className = 'cc-particle';
    p.textContent = '+' + this._formatNum(val);
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    app.appendChild(p);
    setTimeout(() => p.remove(), 900);
  }

  _startLoop(app) {
    if (this._interval) clearInterval(this._interval);
    const tick = 100; // ms
    this._interval = setInterval(() => {
      if (!document.querySelector(`[data-id="${this.id}"]`)) {
        clearInterval(this._interval);
        return;
      }
      const gained = this.state.linesPerSec * tick / 1000;
      this.state.lines += gained;
      this.state.totalLines += gained;
      this._updateStats(app);
    }, tick);

    // Save every 5s
    this._saveInterval = setInterval(() => this._save(), 5000);

    // Render buildings every second
    this._renderInterval = setInterval(() => {
      this._renderBuildings(app);
      this._renderUpgrades(app);
    }, 1000);
  }

  _updateStats(app) {
    const s = this.state;
    const linesEl = app.querySelector('#cc-lines');
    const lpsEl = app.querySelector('#cc-lps');
    const lpcEl = app.querySelector('#cc-lpc');
    if (linesEl) linesEl.textContent = this._formatNum(s.lines);
    if (lpsEl) lpsEl.textContent = this._formatNum(s.linesPerSec) + ' lignes/sec';
    if (lpcEl) lpcEl.textContent = '+' + this._formatNum(s.linesPerClick) + ' ligne/clic';
  }

  _renderAll(app) {
    this._updateStats(app);
    this._renderBuildings(app);
    this._renderUpgrades(app);
  }

  _renderBuildings(app) {
    const s = this.state;
    const container = app.querySelector('#cc-buildings');
    if (!container) return;
    container.innerHTML = '';

    const buildingMults = {};
    Object.values(s.upgradeList).forEach(u => {
      if (u.bought && u.type === 'building') {
        buildingMults[u.target] = (buildingMults[u.target] || 1) * u.mult;
      }
    });

    Object.entries(s.buildings).forEach(([key, b]) => {
      const canAfford = s.lines >= b.cost;
      const actualLps = b.lps * (buildingMults[key] || 1);
      const div = document.createElement('div');
      div.className = 'cc-building' + (canAfford ? ' cc-can-afford' : '') + (b.count > 0 ? ' cc-owned' : '');
      div.innerHTML = `
        <div class="cc-building-info">
          <div class="cc-building-name">${b.label} <span class="cc-building-count">${b.count}</span></div>
          <div class="cc-building-desc">${b.desc}</div>
          <div class="cc-building-lps">${actualLps >= 1 ? this._formatNum(actualLps) : actualLps.toFixed(1)} ligne${actualLps >= 2 ? 's' : ''}/sec chacun</div>
        </div>
        <div class="cc-building-cost ${canAfford ? 'cc-cost-ok' : 'cc-cost-nok'}">
          <span>${this._formatNum(b.cost)}</span>
          <span class="cc-cost-icon">⌨</span>
        </div>`;
      div.addEventListener('click', () => this._buyBuilding(key, app));
      container.appendChild(div);
    });
  }

  _buyBuilding(key, app) {
    const s = this.state;
    const b = s.buildings[key];
    if (s.lines < b.cost) return;
    s.lines -= b.cost;
    b.count++;
    b.cost = Math.ceil(b.baseCost * Math.pow(1.15, b.count));
    this._recalc();
    this._renderAll(app);
  }

  _renderUpgrades(app) {
    const s = this.state;
    const container = app.querySelector('#cc-upgrades');
    if (!container) return;
    container.innerHTML = '';

    const visible = Object.entries(s.upgradeList).filter(([uid]) => this._isUpgradeVisible(uid));
    if (visible.length === 0) {
      container.innerHTML = '<div class="cc-no-upgrade">// Continuez à coder pour débloquer des améliorations...</div>';
      return;
    }
    visible.forEach(([uid, u]) => {
      const canAfford = this._canAffordUpgrade(uid);
      const div = document.createElement('div');
      div.className = 'cc-upgrade' + (canAfford ? ' cc-can-afford' : '');
      div.title = u.desc;
      div.innerHTML = `
        <div class="cc-upgrade-label">${u.label}</div>
        <div class="cc-upgrade-desc">${u.desc}</div>
        <div class="cc-upgrade-cost ${canAfford ? 'cc-cost-ok' : 'cc-cost-nok'}">${this._formatNum(u.cost)} ⌨</div>`;
      div.addEventListener('click', () => this._buyUpgrade(uid, app));
      container.appendChild(div);
    });
  }

  _buyUpgrade(uid, app) {
    const s = this.state;
    if (!this._canAffordUpgrade(uid)) return;
    s.lines -= s.upgradeList[uid].cost;
    s.upgradeList[uid].bought = true;
    this._recalc();
    this._renderAll(app);
  }

  close() {
    this._save();
    clearInterval(this._interval);
    clearInterval(this._saveInterval);
    clearInterval(this._renderInterval);
  }
}
