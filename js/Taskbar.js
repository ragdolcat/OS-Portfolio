export class Taskbar {
  constructor(wm) {
    this.wm = wm;
    this.appBar = document.getElementById('taskbar-apps');
    this.clockEl = document.getElementById('tb-clock');
    this.themeBtn = document.getElementById('theme-toggle');
    this.appMeta = {};
  }

  init() {
    this._startClock();
    this._initTheme();
    this._listenWM();
  }

  // ── Clock ──
  _startClock() {
    const update = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      this.clockEl.textContent = `${h}:${m}`;
    };
    update();
    setInterval(update, 10000);
  }

  // ── Dark / Light theme ──
  _initTheme() {
    const body = document.body;
    const iconDark  = document.getElementById('icon-dark');
    const iconLight = document.getElementById('icon-light');

    const apply = (theme) => {
      body.dataset.theme = theme;
      iconDark.style.display  = theme === 'dark' ? '' : 'none';
      iconLight.style.display = theme === 'light' ? '' : 'none';
    };

    // Load saved preference
    const saved = localStorage.getItem('portfolio-theme') ?? 'dark';
    apply(saved);

    this.themeBtn.addEventListener('click', () => {
      const next = body.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(next);
      localStorage.setItem('portfolio-theme', next);
    });
  }

  // ── Listen to WindowManager events ──
  _listenWM() {
    this.wm.on('opened', ({ id, title }) => this._addBtn(id, title));
    this.wm.on('closed', ({ id }) => this._removeBtn(id));
    this.wm.on('focused', ({ id }) => this._setFocused(id));
    this.wm.on('minimized', ({ id }) => this._setUnfocused(id));
    this.wm.on('restored', ({ id }) => this._setFocused(id));
  }

  _addBtn(id, title) {
    if (document.getElementById(`tb-${id}`)) return;
    const colors = ['var(--accent-a)', 'var(--accent-b)', 'var(--accent-c)', 'var(--accent-d)', 'var(--accent-e)'];
    const color = colors[Object.keys(this.appMeta).length % colors.length];
    this.appMeta[id] = { title, color };

    const btn = document.createElement('button');
    btn.className = 'tb-app-btn';
    btn.id = `tb-${id}`;
    btn.innerHTML = `<span class="tb-app-dot" style="background:${color}"></span>${title}`;
    btn.addEventListener('click', () => {
      if (this.wm.isMinimized(id)) {
        this.wm.restore(id);
      } else if (this.wm.isOpen(id)) {
        this.wm.minimize(id);
      }
    });
    this.appBar.appendChild(btn);
  }

  _removeBtn(id) {
    document.getElementById(`tb-${id}`)?.remove();
    delete this.appMeta[id];
  }

  _setFocused(id) {
    document.querySelectorAll('.tb-app-btn').forEach(b => b.classList.remove('focused'));
    document.getElementById(`tb-${id}`)?.classList.add('focused');
  }

  _setUnfocused(id) {
    document.getElementById(`tb-${id}`)?.classList.remove('focused');
  }
}
