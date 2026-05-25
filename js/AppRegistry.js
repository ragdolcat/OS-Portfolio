import { AboutApp }        from './apps/AboutApp.js';
import { ProjectsApp }     from './apps/ProjectsApp.js';
import { TechWatchApp }    from './apps/TechWatchApp.js';
import { E4SkillsApp }     from './apps/E4SkillsApp.js';
import { CVApp }           from './apps/CVApp.js';
import { WallpaperApp }    from './apps/WallpaperApp.js';
import { SocialApp }       from './apps/SocialApp.js';
import { CodeClickerApp }  from './apps/CodeClickerApp.js';

export class AppRegistry {
  constructor(wm) {
    this.wm = wm;
    this.apps = {
      about:       new AboutApp(wm),
      projects:    new ProjectsApp(wm),
      techwatch:   new TechWatchApp(wm),
      e4skills:    new E4SkillsApp(wm),
      cv:          new CVApp(wm),
      social:      new SocialApp(wm),
      codeclicker: new CodeClickerApp(wm),
      wallpaper:   new WallpaperApp(wm),
    };
  }

  launch(id) {
    const app = this.apps[id];
    if (!app) return;
    app.open();
  }
}
