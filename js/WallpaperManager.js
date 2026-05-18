/* ═══════════════════════════════════════════
   WALLPAPER MANAGER — preset + file upload
   ═══════════════════════════════════════════ */

export const PRESETS = [
  {
    id: 'default',
    label: 'Défaut',
    css: `
      radial-gradient(ellipse 80% 60% at 20% 80%, rgba(126,249,196,0.13) 0%, transparent 55%),
      radial-gradient(ellipse 60% 50% at 80% 20%, rgba(110,198,255,0.14) 0%, transparent 50%),
      radial-gradient(ellipse 50% 70% at 60% 70%, rgba(207,159,255,0.1) 0%, transparent 55%),
      linear-gradient(160deg, #0a0d15 0%, #0f1220 40%, #111525 100%)
    `,
    previewCss: 'linear-gradient(135deg, #0a0d15, #0f1220 50%, #111525)',
    light: `
      radial-gradient(ellipse 80% 60% at 20% 80%, rgba(126,249,196,0.18) 0%, transparent 55%),
      radial-gradient(ellipse 60% 50% at 80% 20%, rgba(110,198,255,0.2) 0%, transparent 50%),
      linear-gradient(160deg, #c8d4f0 0%, #d8e0f5 50%, #dde6f8 100%)
    `,
  },
  {
    id: 'aurora',
    label: 'Aurora',
    css: `
      radial-gradient(ellipse 70% 50% at 15% 60%, rgba(64,220,160,0.22) 0%, transparent 60%),
      radial-gradient(ellipse 60% 60% at 85% 30%, rgba(80,100,255,0.2) 0%, transparent 60%),
      radial-gradient(ellipse 50% 40% at 55% 80%, rgba(180,80,255,0.15) 0%, transparent 55%),
      linear-gradient(175deg, #060c12 0%, #0a1020 60%, #0d1428 100%)
    `,
    previewCss: 'linear-gradient(135deg, #06180e, #0a1020 50%, #180a28)',
  },
  {
    id: 'sunset',
    label: 'Sunset',
    css: `
      radial-gradient(ellipse 80% 60% at 30% 80%, rgba(255,100,80,0.25) 0%, transparent 55%),
      radial-gradient(ellipse 60% 50% at 75% 25%, rgba(255,180,80,0.2) 0%, transparent 55%),
      radial-gradient(ellipse 50% 60% at 55% 60%, rgba(200,80,200,0.15) 0%, transparent 55%),
      linear-gradient(160deg, #100810 0%, #1a0c14 50%, #1e1008 100%)
    `,
    previewCss: 'linear-gradient(135deg, #1a0c14, #2a1208)',
  },
  {
    id: 'ocean',
    label: 'Ocean',
    css: `
      radial-gradient(ellipse 80% 60% at 20% 70%, rgba(0,200,255,0.18) 0%, transparent 55%),
      radial-gradient(ellipse 60% 50% at 80% 30%, rgba(0,100,220,0.2) 0%, transparent 55%),
      radial-gradient(ellipse 50% 60% at 55% 90%, rgba(0,220,180,0.12) 0%, transparent 55%),
      linear-gradient(170deg, #040e18 0%, #071428 50%, #061e24 100%)
    `,
    previewCss: 'linear-gradient(135deg, #040e18, #071428 50%, #061e24)',
  },
  {
    id: 'forest',
    label: 'Forest',
    css: `
      radial-gradient(ellipse 80% 60% at 20% 70%, rgba(60,180,80,0.18) 0%, transparent 55%),
      radial-gradient(ellipse 60% 50% at 80% 30%, rgba(100,220,140,0.14) 0%, transparent 55%),
      radial-gradient(ellipse 50% 60% at 55% 80%, rgba(20,100,60,0.2) 0%, transparent 55%),
      linear-gradient(170deg, #050e08 0%, #081408 50%, #0a1a0c 100%)
    `,
    previewCss: 'linear-gradient(135deg, #050e08, #081408 50%, #0a1a0c)',
  },
  {
    id: 'mono',
    label: 'Mono',
    css: `
      radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%),
      linear-gradient(160deg, #09090b 0%, #111113 50%, #0c0c0e 100%)
    `,
    previewCss: 'linear-gradient(135deg, #09090b, #111113)',
  },
  {
    id: 'neon',
    label: 'Neon',
    css: `
      radial-gradient(ellipse 50% 40% at 15% 50%, rgba(255,0,150,0.2) 0%, transparent 55%),
      radial-gradient(ellipse 50% 40% at 85% 50%, rgba(0,240,255,0.2) 0%, transparent 55%),
      radial-gradient(ellipse 60% 40% at 50% 90%, rgba(180,0,255,0.15) 0%, transparent 55%),
      linear-gradient(170deg, #070010 0%, #0a0018 50%, #000a10 100%)
    `,
    previewCss: 'linear-gradient(135deg, #070010, #0a0018 40%, #000a10)',
  },
  {
    id: 'light-clean',
    label: 'Clair',
    css: `
      radial-gradient(ellipse 70% 60% at 20% 70%, rgba(100,180,255,0.22) 0%, transparent 55%),
      radial-gradient(ellipse 60% 50% at 80% 30%, rgba(160,220,255,0.18) 0%, transparent 55%),
      linear-gradient(160deg, #e0ebff 0%, #edf4ff 50%, #e8f0ff 100%)
    `,
    previewCss: 'linear-gradient(135deg, #dde8ff, #e8f0ff)',
  },
];

export class WallpaperManager {
  constructor() {
    this._wallpaperEl  = document.getElementById('wallpaper');
    this._wallpaperImg = document.getElementById('wallpaper-img');
    this._activePreset = localStorage.getItem('wp-preset') || 'default';
    this._customUrl    = localStorage.getItem('wp-custom-url') || null;
  }

  restore() {
    if (this._customUrl) {
      this._applyCustom(this._customUrl);
    } else {
      this._applyPreset(this._activePreset);
    }
  }

  applyPreset(id) {
    this._activePreset = id;
    this._customUrl    = null;
    localStorage.setItem('wp-preset', id);
    localStorage.removeItem('wp-custom-url');
    this._applyPreset(id);
  }

  applyFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target.result;
      // Don't localStorage for large images (b64 can be huge)
      // Store a flag and keep in memory
      this._customUrl = url;
      try { localStorage.setItem('wp-custom-url', url); } catch(e) { /* quota */ }
      this._applyCustom(url);
    };
    reader.readAsDataURL(file);
  }

  resetToDefault() {
    this._customUrl = null;
    this._activePreset = 'default';
    localStorage.removeItem('wp-custom-url');
    localStorage.setItem('wp-preset', 'default');
    this._applyPreset('default');
  }

  getActivePreset()  { return this._activePreset; }
  hasCustom()        { return !!this._customUrl; }
  getCustomUrl()     { return this._customUrl; }

  _applyPreset(id) {
    const preset = PRESETS.find(p => p.id === id) || PRESETS[0];
    const isDark  = document.body.dataset.theme === 'dark';
    const bg      = (!isDark && preset.light) ? preset.light : preset.css;

    // Hide custom image
    if (this._wallpaperImg) {
      this._wallpaperImg.style.opacity = '0';
    }
    // Set gradient
    if (this._wallpaperEl) {
      this._wallpaperEl.style.background = bg;
    }
  }

  _applyCustom(url) {
    if (this._wallpaperImg) {
      this._wallpaperImg.style.backgroundImage = `url('${url}')`;
      this._wallpaperImg.style.opacity = '1';
    }
    // Dim the gradient behind
    if (this._wallpaperEl) {
      this._wallpaperEl.style.opacity = '0.3';
    }
  }
}
