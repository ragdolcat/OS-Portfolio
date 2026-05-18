/* ═══════════════════════════════════════════
   START MENU — app launcher + theme shortcut
   ═══════════════════════════════════════════ */
export class StartMenu {
  constructor(registry, taskbar, wallpaper) {
    this.registry  = registry;
    this.taskbar   = taskbar;
    this.wallpaper = wallpaper;

    this.el        = document.getElementById('start-menu');
    this.startBtn  = document.getElementById('start-btn');
    this.isOpen    = false;

    this._bind();
  }

  _bind() {
    // Toggle menu on start-btn click
    this.startBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.isOpen ? this._close() : this._open();
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.el.contains(e.target) && e.target !== this.startBtn) {
        this._close();
      }
    });

    // App items inside menu
    this.el.querySelectorAll('.start-menu-item[data-app]').forEach(item => {
      item.addEventListener('click', () => {
        const appId = item.dataset.app;
        if (appId === 'wallpaper') {
          this.registry.launch('wallpaper');
        } else {
          this.registry.launch(appId);
        }
        this._close();
      });
    });

    // Theme toggle inside start menu (mirrors taskbar one)
    const smThemeBtn = document.getElementById('sm-theme-btn');
    if (smThemeBtn) {
      smThemeBtn.addEventListener('click', () => {
        // Fire the taskbar's theme toggle
        document.getElementById('theme-toggle')?.click();
        // Sync icons
        this._syncThemeIcons();
      });
    }

    // Wallpaper shortcut button in footer
    const smWpBtn = document.getElementById('sm-wallpaper-btn');
    if (smWpBtn) {
      smWpBtn.addEventListener('click', () => {
        this.registry.launch('wallpaper');
        this._close();
      });
    }

    // Sync theme icons whenever theme changes
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      setTimeout(() => this._syncThemeIcons(), 50);
    });

    // Keyboard: Escape closes
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this._close();
    });
  }

  _open() {
    this.isOpen = true;
    this.el.classList.add('is-open');
    this.el.setAttribute('aria-hidden', 'false');
    this.startBtn.classList.add('active');
    this._syncThemeIcons();
  }

  _close() {
    this.isOpen = false;
    this.el.classList.remove('is-open');
    this.el.setAttribute('aria-hidden', 'true');
    this.startBtn.classList.remove('active');
  }

  _syncThemeIcons() {
    const isDark = document.body.dataset.theme === 'dark';
    const darkIcon  = document.getElementById('sm-icon-dark');
    const lightIcon = document.getElementById('sm-icon-light');
    if (darkIcon)  darkIcon.style.display  = isDark ? '' : 'none';
    if (lightIcon) lightIcon.style.display = isDark ? 'none' : '';
  }
}
