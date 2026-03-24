export class WindowManager {
  constructor(container) {
    this.container = container;
    this.windows = new Map(); // id -> { el, meta }
    this.zCounter = 100;
    this.openOrder = [];
    this.listeners = {}; // event -> callbacks[]
  }

  // ── Event bus ──
  on(evt, cb) {
    (this.listeners[evt] ??= []).push(cb);
  }
  emit(evt, data) {
    (this.listeners[evt] ?? []).forEach(cb => cb(data));
  }

  // ── Open a window ──
  open(id, title, contentHTML, opts = {}) {
    if (this.windows.has(id)) {
      this.focus(id);
      this.restore(id);
      return;
    }

    const tpl = document.getElementById('tpl-window');
    const node = tpl.content.cloneNode(true);
    const win = node.querySelector('.os-window');

    win.dataset.id = id;
    win.querySelector('.win-title').textContent = title;
    win.querySelector('.win-body').innerHTML = contentHTML;

    // Default size & position
    const w = opts.width  ?? 820;
    const h = opts.height ?? 560;
    const maxX = Math.max(60, window.innerWidth  - w - 40);
    const maxY = Math.max(60, window.innerHeight - h - 80);
    const x = opts.x ?? (80 + Math.random() * Math.min(maxX, 200));
    const y = opts.y ?? (60 + Math.random() * Math.min(maxY, 140));

    win.style.width  = `${w}px`;
    win.style.height = `${h}px`;
    win.style.left   = `${x}px`;
    win.style.top    = `${y}px`;
    win.style.zIndex = ++this.zCounter;

    this.container.appendChild(win);
    this.windows.set(id, { el: win, minimized: false, maximized: false, prevRect: null });
    this.openOrder.push(id);

    this._attachControls(id, win);
    this._makeDraggable(id, win);
    this._makeResizable(id, win);

    win.addEventListener('pointerdown', () => this.focus(id), { capture: true });
    this.focus(id);
    this.emit('opened', { id, title });
  }

  // ── Focus ──
  focus(id) {
    const entry = this.windows.get(id);
    if (!entry) return;
    entry.el.style.zIndex = ++this.zCounter;
    this.windows.forEach((e, wid) => e.el.classList.toggle('is-focused', wid === id));
    this.emit('focused', { id });
  }

  // ── Close ──
  close(id) {
    const entry = this.windows.get(id);
    if (!entry) return;
    entry.el.style.animation = 'winClose .2s ease both';
    setTimeout(() => {
      entry.el.remove();
      this.windows.delete(id);
      this.openOrder = this.openOrder.filter(w => w !== id);
      this.emit('closed', { id });
    }, 200);
  }

  // ── Minimize ──
  minimize(id) {
    const entry = this.windows.get(id);
    if (!entry) return;
    entry.el.classList.add('minimized');
    entry.minimized = true;
    setTimeout(() => { if (entry.minimized) entry.el.style.display = 'none'; }, 220);
    this.emit('minimized', { id });
  }

  // ── Restore ──
  restore(id) {
    const entry = this.windows.get(id);
    if (!entry) return;
    entry.el.style.display = '';
    entry.el.classList.remove('minimized');
    entry.minimized = false;
    this.focus(id);
    this.emit('restored', { id });
  }

  // ── Toggle maximize ──
  toggleMax(id) {
    const entry = this.windows.get(id);
    if (!entry) return;
    if (!entry.maximized) {
      entry.prevRect = {
        left: entry.el.style.left, top: entry.el.style.top,
        width: entry.el.style.width, height: entry.el.style.height
      };
      entry.el.classList.add('maximized');
      entry.maximized = true;
    } else {
      entry.el.classList.remove('maximized');
      const r = entry.prevRect;
      if (r) {
        Object.assign(entry.el.style, r);
      }
      entry.maximized = false;
    }
    this.focus(id);
  }

  isOpen(id)      { return this.windows.has(id); }
  isMinimized(id) { return this.windows.get(id)?.minimized ?? false; }

  // ── Private: controls ──
  _attachControls(id, win) {
    win.querySelector('.win-close').addEventListener('click', () => this.close(id));
    win.querySelector('.win-min').addEventListener('click',   () => this.minimize(id));
    win.querySelector('.win-max').addEventListener('click',   () => this.toggleMax(id));
  }

  // ── Private: draggable ──
  _makeDraggable(id, win) {
    const titlebar = win.querySelector('.win-titlebar');
    let ox, oy, startX, startY;

    const onMove = (e) => {
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      const nx = cx - ox;
      const ny = cy - oy;
      const maxX = window.innerWidth  - 80;
      const maxY = window.innerHeight - 80;
      win.style.left = `${Math.max(-200, Math.min(maxX, nx))}px`;
      win.style.top  = `${Math.max(0,    Math.min(maxY, ny))}px`;
    };

    const onUp = () => {
      win.classList.remove('dragging');
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup',   onUp);
    };

    titlebar.addEventListener('pointerdown', (e) => {
      const entry = this.windows.get(id);
      if (entry?.maximized) return;
      if (e.target.closest('.win-btn')) return;
      ox = e.clientX - win.offsetLeft;
      oy = e.clientY - win.offsetTop;
      win.classList.add('dragging');
      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup',   onUp);
      this.focus(id);
    });
  }

  // ── Private: resizable ──
  _makeResizable(id, win) {
    // Inject resize handle
    const handle = document.createElement('div');
    handle.className = 'win-resize';
    win.appendChild(handle);

    let sx, sy, sw, sh;

    const onMove = (e) => {
      const w = Math.max(360, sw + e.clientX - sx);
      const h = Math.max(260, sh + e.clientY - sy);
      win.style.width  = `${w}px`;
      win.style.height = `${h}px`;
    };
    const onUp = () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup',   onUp);
    };

    handle.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      sx = e.clientX; sy = e.clientY;
      sw = win.offsetWidth; sh = win.offsetHeight;
      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup',   onUp);
    });
  }
}
