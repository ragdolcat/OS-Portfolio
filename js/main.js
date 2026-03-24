import { WindowManager } from './WindowManager.js';
import { Taskbar } from './Taskbar.js';
import { AppRegistry } from './AppRegistry.js';
import { DesktopIcons } from './DesktopIcons.js';
import { Boot } from './Boot.js';

// Initialise application
async function init() {
  const boot = new Boot();
  const wm = new WindowManager(document.getElementById('windows-container'));
  const registry = new AppRegistry(wm);
  const taskbar = new Taskbar(wm);
  const icons = new DesktopIcons(wm, registry);

  boot.start(() => {
    icons.render();
    taskbar.init();
  });
}

document.addEventListener('DOMContentLoaded', init);
