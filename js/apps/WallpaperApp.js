/* ═══════════════════════════════════════════
   WALLPAPER APP — choose preset or upload image
   ═══════════════════════════════════════════ */
import { PRESETS, WallpaperManager } from '../WallpaperManager.js';

export class WallpaperApp {
  constructor(wm) {
    this.wm = wm;
    this.id = 'wallpaper';
    // Re-use the global WallpaperManager instance via singleton pattern
    this._mgr = new WallpaperManager();
  }

  open() {
    if (this.wm.isOpen(this.id)) { this.wm.focus(this.id); this.wm.restore(this.id); return; }
    this.wm.open(this.id, 'fond_ecran.app', this._html(), { width: 560, height: 480 });
    setTimeout(() => this._init(), 50);
  }

  _html() {
    const presetCards = PRESETS.map(p => `
      <div class="wallpaper-preset ${this._mgr.getActivePreset() === p.id && !this._mgr.hasCustom() ? 'is-active' : ''}"
           data-preset="${p.id}"
           style="background:${p.previewCss}">
        <div class="wallpaper-preset-label">${p.label}</div>
      </div>
    `).join('');

    const customPreview = this._mgr.hasCustom()
      ? `<div style="font-family:var(--font-mono);font-size:11px;color:var(--accent-a);margin-bottom:8px">
           ✓ Image personnalisée active —
           <button class="wallpaper-reset-btn" id="wp-reset-btn" style="display:inline-flex;margin-left:4px">Réinitialiser</button>
         </div>`
      : '';

    return `
    <div class="wallpaper-picker win-scroll">
      <div class="wallpaper-picker-title">🖼️ Fond d'écran</div>

      <div>
        <div class="wallpaper-section-label">Thèmes prédéfinis</div>
        ${customPreview}
        <div class="wallpaper-presets" id="wp-preset-grid">
          ${presetCards}
        </div>
      </div>

      <div>
        <div class="wallpaper-section-label">Image personnalisée</div>
        <div class="wallpaper-upload-zone" id="wp-upload-zone">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <div class="wallpaper-upload-title">Déposer une image ici</div>
          <div class="wallpaper-upload-sub">ou cliquer pour parcourir<br>JPG, PNG, WebP, GIF supportés</div>
        </div>
      </div>
    </div>`;
  }

  _init() {
    const win = document.querySelector(`.os-window[data-id="${this.id}"]`);
    if (!win) return;

    // Preset clicks
    win.querySelectorAll('.wallpaper-preset').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.preset;
        this._mgr.applyPreset(id);
        // Update active state in all open wallpaper windows
        win.querySelectorAll('.wallpaper-preset').forEach(c => c.classList.remove('is-active'));
        card.classList.add('is-active');
      });
    });

    // Upload zone click
    const zone = win.querySelector('#wp-upload-zone');
    zone?.addEventListener('click', () => {
      const input = document.getElementById('wallpaper-input');
      if (input) input.click();
    });

    // Drag & Drop
    zone?.addEventListener('dragover', e => { e.preventDefault(); zone.style.borderColor = 'var(--accent-a)'; });
    zone?.addEventListener('dragleave', () => { zone.style.borderColor = ''; });
    zone?.addEventListener('drop', e => {
      e.preventDefault();
      zone.style.borderColor = '';
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) this._applyFile(file, win);
    });

    // File input
    const fileInput = document.getElementById('wallpaper-input');
    fileInput?.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (file) this._applyFile(file, win);
      fileInput.value = '';
    });

    // Reset button (if present)
    const resetBtn = win.querySelector('#wp-reset-btn');
    resetBtn?.addEventListener('click', () => {
      this._mgr.resetToDefault();
      // Refresh window content
      win.querySelector('.win-body').innerHTML = this._html();
      setTimeout(() => this._init(), 30);
    });
  }

  _applyFile(file, win) {
    this._mgr.applyFile(file);
    // Mark all presets inactive
    win.querySelectorAll('.wallpaper-preset').forEach(c => c.classList.remove('is-active'));
    // Show feedback
    const zone = win.querySelector('#wp-upload-zone');
    if (zone) {
      zone.innerHTML = `<div style="font-family:var(--font-mono);font-size:12px;color:var(--accent-a);text-align:center">
        ✓ Image appliquée : <strong>${file.name}</strong><br>
        <span style="color:var(--text-muted);font-size:10px">Cliquer pour changer</span>
      </div>`;
    }
  }
}
