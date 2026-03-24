export class DesktopIcons {
  constructor(wm, registry) {
    this.wm = wm;
    this.registry = registry;
    this.grid = document.getElementById('icon-grid');
  }

  render() {
    this.grid.querySelectorAll('.desktop-icon').forEach(icon => {
      const appId = icon.dataset.app;
      icon.addEventListener('dblclick', () => this._open(appId, icon));
      icon.addEventListener('click', () => {
        // On mobile single-click opens
        if (window.innerWidth <= 768) this._open(appId, icon);
      });
    });
  }

  _open(appId, icon) {
    this.registry.launch(appId);
    icon.classList.add('active-icon');
    setTimeout(() => icon.classList.remove('active-icon'), 600);
  }
}
