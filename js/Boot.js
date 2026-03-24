export class Boot {
  constructor() {
    this.el = document.getElementById('boot-screen');
  }

  start(onDone) {
    // Wait for boot animation (bar takes 2s), then fade out
    setTimeout(() => {
      this.el.classList.add('hidden');
      setTimeout(onDone, 600);
    }, 2400);
  }
}
