import { WindowManager }    from './WindowManager.js';
import { Taskbar }          from './Taskbar.js';
import { AppRegistry }      from './AppRegistry.js';
import { DesktopIcons }     from './DesktopIcons.js';
import { Boot }             from './Boot.js';
import { WallpaperManager } from './WallpaperManager.js';
import { StartMenu }        from './StartMenu.js';

async function init() {
  const boot      = new Boot();
  const wm        = new WindowManager(document.getElementById('windows-container'));
  const registry  = new AppRegistry(wm);
  const taskbar   = new Taskbar(wm);
  const icons     = new DesktopIcons(wm, registry);
  const wallpaper = new WallpaperManager();
  const startMenu = new StartMenu(registry, taskbar, wallpaper);

  boot.start(() => {
    icons.render();
    taskbar.init();
    wallpaper.restore();

    // Save CodeClicker state on window close
    wm.on('closed', ({ id }) => {
      const app = registry.apps[id];
      if (app?.close) app.close();
    });

    // Open "About Me" automatically on first launch
    setTimeout(() => registry.launch('about'), 120);
  });
}

document.addEventListener('DOMContentLoaded', init);
