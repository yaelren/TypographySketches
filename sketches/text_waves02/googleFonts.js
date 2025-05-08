async function loadGoogleFontSet(url, p = window) {
    injectFontLink(url);
    await document.fonts.ready; // ??
    let pfonts = Array.from(document.fonts).map(f => {
      let pf = new p5.Font(p, f);
      pf.path = pf.path || url;
    });
    return pfonts;
  }
  
  function injectFontLink(href) {
    const link = document.createElement('link');
    link.id = 'font';
    link.href = href;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }