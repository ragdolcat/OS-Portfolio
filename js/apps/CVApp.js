/* ═══════════════════════════════════════════
   CV APP — Affichage direct de MESRINE_Nolane_CV.pdf
   ═══════════════════════════════════════════ */
export class CVApp {
  constructor(wm) {
    this.wm = wm;
    this.id = 'cv';
    // Fichier CV fixe embarqué dans le projet
    this._fileData = { url: 'img/MESRINE_Nolane_CV.pdf', name: 'MESRINE_Nolane_CV.pdf', type: 'application/pdf' };
  }

  open() {
    if (this.wm.isOpen(this.id)) { this.wm.focus(this.id); this.wm.restore(this.id); return; }
    this.wm.open(this.id, 'MESRINE_Nolane_CV.pdf', this._html(), { width: 800, height: 620 });
  }

  _html() {
    return `
    <div class="cv-viewer">
      <div class="cv-viewer-toolbar">
        <span class="cv-viewer-filename" id="cv-filename">
          MESRINE_Nolane_CV.pdf
        </span>
        <a class="cv-viewer-btn" href="img/MESRINE_Nolane_CV.pdf" download="MESRINE_Nolane_CV.pdf">
          ⬇ Télécharger
        </a>
      </div>

      <div class="cv-viewer-content" id="cv-viewer-content">
        <iframe src="img/MESRINE_Nolane_CV.pdf" title="CV PDF" style="width:100%;height:100%;border:none;"></iframe>
      </div>
    </div>`;
  }
}
