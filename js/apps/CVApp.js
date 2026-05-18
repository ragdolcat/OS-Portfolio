/* ═══════════════════════════════════════════
   CV APP — PDF / image viewer with upload
   ═══════════════════════════════════════════ */
export class CVApp {
  constructor(wm) {
    this.wm = wm;
    this.id = 'cv';
    this._fileData = null; // { url, name, type }
    // Restore from sessionStorage (stays during page session)
    try {
      const saved = sessionStorage.getItem('cv-file');
      if (saved) this._fileData = JSON.parse(saved);
    } catch(e) {}
  }

  open() {
    if (this.wm.isOpen(this.id)) { this.wm.focus(this.id); this.wm.restore(this.id); return; }
    this.wm.open(this.id, 'curriculum_vitae.pdf', this._html(), { width: 800, height: 620 });
    setTimeout(() => this._init(), 50);
  }

  _html() {
    const hasFile = !!this._fileData;
    return `
    <div class="cv-viewer">
      <div class="cv-viewer-toolbar">
        <span class="cv-viewer-filename" id="cv-filename">
          ${hasFile ? this._fileData.name : 'Aucun fichier chargé'}
        </span>
        <button class="cv-viewer-btn" id="cv-upload-btn">
          📂 Charger CV (PDF / image)
        </button>
        ${hasFile ? `
          <button class="cv-viewer-btn" id="cv-download-btn">
            ⬇ Télécharger
          </button>
          <button class="cv-viewer-btn" id="cv-clear-btn" title="Retirer le fichier">✕</button>
        ` : ''}
      </div>

      <div class="cv-viewer-content" id="cv-viewer-content">
        ${hasFile ? this._renderFile() : this._renderPlaceholder()}
      </div>
    </div>`;
  }

  _renderPlaceholder() {
    return `
    <div class="cv-placeholder">
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
        <rect x="10" y="4" width="28" height="40" rx="3"/>
        <path d="M16 14h16M16 21h16M16 28h10"/>
        <path d="M28 36l4-4 4 4M32 32v8" stroke-width="1.5"/>
      </svg>
      <div class="cv-placeholder-title">Charger votre CV</div>
      <div class="cv-placeholder-sub">
        Cliquez sur le bouton ci-dessus ou déposez un fichier ici.<br>
        Formats acceptés : PDF, JPG, PNG, WebP
      </div>
      <button class="cv-upload-btn-big" id="cv-placeholder-btn">
        📂 Choisir un fichier
      </button>
    </div>`;
  }

  _renderFile() {
    const { url, type } = this._fileData;
    if (type === 'application/pdf') {
      return `<iframe src="${url}" title="CV PDF" style="width:100%;height:100%;border:none;"></iframe>`;
    }
    // Image
    return `<img src="${url}" alt="CV" style="max-width:100%;max-height:100%;object-fit:contain;border-radius:4px;display:block;margin:auto;">`;
  }

  _init() {
    const win = document.querySelector(`.os-window[data-id="${this.id}"]`);
    if (!win) return;

    const fileInput   = document.getElementById('cv-file-input');
    const uploadBtn   = win.querySelector('#cv-upload-btn');
    const placeholderBtn = win.querySelector('#cv-placeholder-btn');
    const downloadBtn = win.querySelector('#cv-download-btn');
    const clearBtn    = win.querySelector('#cv-clear-btn');
    const content     = win.querySelector('#cv-viewer-content');

    const triggerUpload = () => fileInput?.click();
    uploadBtn?.addEventListener('click', triggerUpload);
    placeholderBtn?.addEventListener('click', triggerUpload);

    // Drag & drop onto content area
    content?.addEventListener('dragover', e => {
      e.preventDefault();
      content.style.outline = '2px dashed var(--accent-a)';
    });
    content?.addEventListener('dragleave', () => { content.style.outline = ''; });
    content?.addEventListener('drop', e => {
      e.preventDefault();
      content.style.outline = '';
      const file = e.dataTransfer.files[0];
      if (file) this._loadFile(file, win);
    });

    // File input change
    fileInput?.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (file) this._loadFile(file, win);
      fileInput.value = '';
    });

    // Download
    downloadBtn?.addEventListener('click', () => {
      if (!this._fileData) return;
      const a = document.createElement('a');
      a.href = this._fileData.url;
      a.download = this._fileData.name;
      a.click();
    });

    // Clear
    clearBtn?.addEventListener('click', () => {
      this._fileData = null;
      sessionStorage.removeItem('cv-file');
      this._refresh(win);
    });
  }

  _loadFile(file, win) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this._fileData = { url: e.target.result, name: file.name, type: file.type };
      // Save to session (may fail for large files)
      try { sessionStorage.setItem('cv-file', JSON.stringify(this._fileData)); } catch(ex) {}
      this._refresh(win);
    };
    reader.readAsDataURL(file);
  }

  _refresh(win) {
    win.querySelector('.win-body').innerHTML = this._html();
    setTimeout(() => this._init(), 30);
  }
}
