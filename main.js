(() => {
  const C = window.SITE_CONFIG || {};

  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => Array.from(p.querySelectorAll(s));

  // === Simple Icons helpers ===
  const ICON_CDN = (slug) => `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`;
  const ICON_SLUGS = {
    // ML / Data / Python stack
    'python':'python','pytorch':'pytorch','tensorflow':'tensorflow','numpy':'numpy','pandas':'pandas',
    'scikit-learn':'scikitlearn','opencv':'opencv','mlflow':'mlflow','databricks':'databricks',
    'apache spark':'apachespark','spark':'apachespark','jupyter':'jupyter','google colab':'googlecolab',
    // Web / backend
    'fastapi':'fastapi','flask':'flask','streamlit':'streamlit','gradio':'gradio',
    'docker':'docker','git':'git','github':'github','gitlab':'gitlab','github actions':'githubactions',
    'postgresql':'postgresql','mysql':'mysql','redis':'redis','prisma':'prisma','trpc':'trpc',
    'react':'react','next.js':'nextdotjs','nextjs':'nextdotjs','node.js':'nodejs','nodejs':'nodejs',
    'typescript':'typescript','javascript':'javascript','visual studio code':'visualstudiocode','vs code':'visualstudiocode',
    // Cloud / vendors / learning
    'amazon web services':'amazonaws','aws':'amazonaws','microsoft azure':'microsoftazure','azure':'microsoftazure',
    'google':'google','coursera':'coursera','datacamp':'datacamp','hackerrank':'hackerrank',
    // AI brands / LLMs
    'openai':'openai','openai apis':'openai','gpt-4':'openai','gpt-3.5/4':'openai','gpt':'openai','openai gym':'openaigym',
    'anthropic':'anthropic','claude':'anthropic','mistral ai':'mistralai','mistral':'mistralai',
    'hugging face':'huggingface','langchain':'langchain','gemini':'googlegemini','google gemini':'googlegemini',
    // Vector DBs (available)
    'milvus':'milvus',
    // Socials
    'linkedin':'linkedin','kaggle':'kaggle','microsoft':'microsoft','microsoft learn':'microsoft'
  };
  const toSlug = (name = '') => {
    const n = String(name).trim().toLowerCase();
    if (ICON_SLUGS[n]) return ICON_SLUGS[n];
    const norm = n
      .replace(/\s*\+\s*/g, 'plus')
      .replace(/[\.\u00B7\/]/g,'')
      .replace(/\s+/g,'');
    if (ICON_SLUGS[norm]) return ICON_SLUGS[norm];
    return null;
  };
  const iconSpan = (name, extraClass = '') => {
    const slug = toSlug(name);
    if (!slug) return '';
    return `<span class="icon-img ${extraClass}" data-icon="${slug}" data-label="${name}" aria-hidden="true"></span>`;
  };

  // Load SVG icons quickly without extra metadata fetches
  const SVG_CACHE = new Map();
  const loadIconInto = async (el) => {
    const slug = el?.dataset?.icon; if (!slug || el.dataset.loaded) return;
    try {
      let svg = SVG_CACHE.get(slug);
      if (!svg) {
        const res = await fetch(ICON_CDN(slug), { cache: 'force-cache' });
        svg = await res.text();
        SVG_CACHE.set(slug, svg);
      }
      el.innerHTML = svg;
      const svgEl = el.querySelector('svg');
      if (svgEl) {
        svgEl.setAttribute('aria-label', el.dataset.label || slug);
        svgEl.setAttribute('focusable','false');
        svgEl.setAttribute('fill','currentColor');
      }
      el.dataset.loaded = '1';
    } catch {}
  };
  // Lazy-load icons when visible
  let iconObserver = null;
  if ('IntersectionObserver' in window) {
    iconObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { iconObserver.unobserve(e.target); loadIconInto(e.target); } });
    }, { rootMargin: '200px 0px' });
  }
  const loadAllIcons = () => {
    const nodes = $$('.icon-img[data-icon]:not([data-loaded])');
    if (iconObserver) {
      nodes.forEach(n => iconObserver.observe(n));
    } else if ('requestIdleCallback' in window) {
      requestIdleCallback(() => nodes.forEach(n => loadIconInto(n)));
    } else {
      setTimeout(() => nodes.forEach(n => loadIconInto(n)), 0);
    }
  };

  // Title, brand, footer
  document.title = `${C.name || 'Your Name'} - ${C.role || 'AI Engineer'}`;
  const brandName = $('#brandName');
  if (brandName) brandName.textContent = C.name || 'Your Name';
  const role = $('#role');
  if (role) role.textContent = C.role || 'AI Engineer';
  const footerName = $('#footerName');
  if (footerName) footerName.innerHTML = `(c) <span id="year"></span> ${C.name || 'Your Name'}`;
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
  // Favicon and apple-touch-icon from config (optional)
  const favLink = document.querySelector('#favicon');
  const appleIcon = document.querySelector('#appleIcon');
  if (C.favicon && favLink) {
    favLink.href = C.favicon;
    favLink.type = (/\.svg$/i.test(C.favicon) ? 'image/svg+xml' : 'image/png');
  }
  if (C.appleIcon && appleIcon) {
    appleIcon.href = C.appleIcon;
  }
  const resumeLink = $('#resumeLink');
  if (resumeLink) {
    resumeLink.href = C.resumeUrl || '#';
    if (C.resumeUrl && /\.pdf(\?|#|$)/i.test(C.resumeUrl)) {
      resumeLink.setAttribute('download', 'Abdul_Wajid_Resume.pdf');
      resumeLink.setAttribute('title', 'Download Resume');
      resumeLink.removeAttribute('target');
    }
  }
  const resumeCta = $('#resumeCta');
  if (resumeCta) {
    resumeCta.href = C.resumeUrl || '#';
    if (C.resumeUrl && /\.pdf(\?|#|$)/i.test(C.resumeUrl)) {
      resumeCta.setAttribute('download', 'Abdul_Wajid_Resume.pdf');
    } else {
      resumeCta.removeAttribute('download');
    }
  }

  // About + quick facts
  const aboutText = $('#aboutText');
  if (aboutText) {
    if (C.aboutHtml) {
      aboutText.innerHTML = C.aboutHtml;
    } else {
      aboutText.textContent = C.about || aboutText.textContent || '';
    }
  }
  const location = $('#location');
  if (location) location.textContent = C.location || 'Remote';
  const availability = $('#availability');
  if (availability) availability.textContent = C.availability || 'Open to opportunities';
  const qf = $('#quickFacts');
  if (Array.isArray(C.quickFacts) && qf) {
    qf.innerHTML = '';
    C.quickFacts.forEach(({ label, value }) => {
      const li = document.createElement('li');
      li.className = 'fade-in';
      li.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
      qf.appendChild(li);
    });
  }

  // Socials
  const socials = $('#socialLinks');
  if (Array.isArray(C.socials) && socials) {
    socials.innerHTML = C.socials
      .map(s => {
        const icon = iconSpan(s.name, 'social-icon');
        return `<a class="social-link" href="${s.url}" target="_blank" rel="noopener">${icon || ''}<span>${s.name}</span></a>`;
      })
      .join('');
  }

  // Email
  const email = C.email || 'you@example.com';
  const emailLink = $('#emailLink');
  const copyEmailBtn = $('#copyEmail');
  const emailCta = $('#emailCta');
  if (emailLink) emailLink.href = `mailto:${email}`;
  if (emailCta) emailCta.href = `mailto:${email}`;
  if (copyEmailBtn) {
    copyEmailBtn.dataset.email = email;
    copyEmailBtn.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(email); copyEmailBtn.textContent = 'Copied!'; }
      catch { copyEmailBtn.textContent = email; }
      setTimeout(() => (copyEmailBtn.textContent = 'Copy Email'), 1500);
    });
  }

  // Education
  const eduList = $('#educationList');
  const defaultEduLogo = (ed) => {
    const inst = (ed.institution || '').toLowerCase();
    if (inst.includes('muet') || inst.includes('mehran university')) return 'assets/images/muetLogo.svg';
    return null;
  };
  if (Array.isArray(C.education) && eduList) {
    eduList.innerHTML = '';
    C.education.forEach((ed) => {
      const li = document.createElement('li');
      li.className = 'timeline-item fade-in';
      const _eduLogo = ed.logo || defaultEduLogo(ed);
      const _eduUrl = (ed.url && ed.url !== '#') ? ed.url : null;
      li.innerHTML = `
        <div class="timeline-time">${ed.period || ''}</div>
        <div class="timeline-card">
          <div class="timeline-card-head">
            <h3>${ed.degree || ''}</h3>
            ${_eduLogo ? (_eduUrl ? `<a class="timeline-logo" href="${_eduUrl}" target="_blank" rel="noopener" title="${ed.institution || ''}"><img src="${_eduLogo}" alt="${ed.institution || ''} logo" loading="lazy" decoding="async" width="72" height="72" /></a>` : `<span class="timeline-logo" title="${ed.institution || ''}"><img src="${_eduLogo}" alt="${ed.institution || ''} logo" loading="lazy" decoding="async" width="72" height="72" /></span>`) : ''}
          </div>
          <p>${ed.institution || ''}</p>
        </div>`;
      eduList.appendChild(li);
    });
  }

  // Experience
  const expList = $('#experienceList');
  if (Array.isArray(C.experience) && expList) {
    expList.innerHTML = '';
    C.experience.forEach((e) => {
      const li = document.createElement('li');
      li.className = 'timeline-item fade-in';
      const _expLogo = e.logo || ((e.company || '').toLowerCase().includes('x flow') || (e.company || '').toLowerCase().includes('bluescarf') ? 'assets/images/xflowLogo.svg' : ((e.company || '').toLowerCase().includes('ambile') || (e.company || '').toLowerCase().includes('bhurgri') ? 'assets/images/ambileLogo.svg' : null));
      const _expUrl = (e.url && e.url !== '#') ? e.url : null;
      li.innerHTML = `
        <div class="timeline-time">${e.period || ''}</div>
        <div class="timeline-card">
          <div class="timeline-card-head">
            <h3>${e.title || ''} @ ${e.company || ''}</h3>
            ${_expLogo ? (_expUrl ? `<a class="timeline-logo" href="${_expUrl}" target="_blank" rel="noopener" title="${e.company || ''}"><img src="${_expLogo}" alt="${e.company || ''} logo" loading="lazy" decoding="async" width="72" height="72" /></a>` : `<span class="timeline-logo" title="${e.company || ''}"><img src="${_expLogo}" alt="${e.company || ''} logo" loading="lazy" decoding="async" width="72" height="72" /></span>`) : ''}
          </div>
          <p>${e.summary || ''}</p>
          ${Array.isArray(e.tech) ? `<div class="chips">${e.tech.map(t => `<span class="chip">${iconSpan(t, 'chip-icon')}${t}</span>`).join('')}</div>` : ''}
          ${Array.isArray(e.bullets) ? `<ul class="bullets">${e.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
        </div>`;
      expList.appendChild(li);
    });
  }

  // Projects
  const projGrid = $('#projectsGrid');
  if (Array.isArray(C.projects) && projGrid) {
    projGrid.innerHTML = '';
    C.projects.forEach((p) => {
      const card = document.createElement('article');
      card.className = 'project-card fade-in';
      const imgAvif = (p.image || '').replace(/\.(png|jpe?g)$/i, '.avif');
      const imgWebp = (p.image || '').replace(/\.(png|jpe?g)$/i, '.webp');
      card.innerHTML = `
        <div class="project-media">
          ${/\.(png|jpe?g)$/i.test(p.image || '') ? `
            <picture>
              <source type="image/avif" srcset="${imgAvif}" />
              <source type="image/webp" srcset="${imgWebp}" />
              <img src="${p.image}" alt="${p.name} preview" loading="lazy" decoding="async" fetchpriority="low" width="1280" height="720" />
            </picture>
          ` : `
            <img src="${p.image}" alt="${p.name} preview" loading="lazy" decoding="async" fetchpriority="low" />
          `}
        </div>
        <div class="project-body">
          <h3 class="project-title">${p.name}</h3>
          <p class="project-desc">${p.description || ''}</p>
          ${Array.isArray(p.tags) ? `<div class="project-tags">${p.tags.map(t => `<span class='chip'>${iconSpan(t, 'chip-icon')}${t}</span>`).join('')}</div>` : ''}
        </div>
        <div class="project-actions">
          ${(p.links || []).map(l => `<a class="btn btn-outline" href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`).join('')}
        </div>`;
      projGrid.appendChild(card);
    });
  }

  // Skills
  const skills = $('#skillsList');
  if (Array.isArray(C.skills) && skills) {
    skills.innerHTML = C.skills.map(s => `<span class="skill">${iconSpan(s, 'skill-icon')}${s}</span>`).join('');
  }

  // Certifications
  const certs = $('#certificationsList');
  if (Array.isArray(C.certifications) && certs) {
    certs.innerHTML = (C.certifications || [])
      .map(c => {
        const issuerIcon = iconSpan(c.issuer || '', 'chip-icon') || iconSpan(c.name || '', 'chip-icon');
        return `<span class="chip">${issuerIcon || ''}${c.name}${c.issuer ? ' - ' + c.issuer : ''}</span>`;
      })
      .join('');
  }

  // Certificates Marquee (images)
  const certTrack = $('#certificatesTrack');
  const certGallery = Array.isArray(C.certificatesGallery) ? C.certificatesGallery : [];
  if (certTrack && certGallery.length) {
    const doubled = [...certGallery, ...certGallery];
    certTrack.innerHTML = doubled.map(c => {
      const imgSrc = c.image;
      const url = c.url || '#';
      const alt = c.alt || 'Certificate';
      const avif = (imgSrc || '').replace(/\.(png|jpe?g)$/i, '.avif');
      const webp = (imgSrc || '').replace(/\.(png|jpe?g)$/i, '.webp');
      return `
        <div class="certs-item">
          <a href="${url}" target="_blank" rel="noopener">
            ${/\.(png|jpe?g)$/i.test(imgSrc || '') ? `
              <picture>
                <source type="image/avif" srcset="${avif}" />
                <source type="image/webp" srcset="${webp}" />
                <img class="certs-img" src="${imgSrc}" alt="${alt}" loading="lazy" decoding="async" fetchpriority="low" />
              </picture>
            ` : `
              <img class="certs-img" src="${imgSrc}" alt="${alt}" loading="lazy" decoding="async" fetchpriority="low" />
            `}
          </a>
        </div>`;
    }).join('');
    // Restart animation to account for new widths
    restartMarquee(certTrack);
  }

  // Recommendations marquee
  const recTrack = document.getElementById('recsTrack');
  if (recTrack && Array.isArray(C.recommendations)) {
    const makeStars = (n) => {
      const count = Math.max(0, Math.min(5, Math.round(n || 0)));
      return `<span class="stars">${'â˜…'.repeat(count)}${'â˜†'.repeat(5-count)}</span>`;
    };
    const cards = (arr) => arr.map(r => `
      <article class="rec-card">
        <div class="rec-head">
          <div class="rec-left">
            <img class="rec-avatar" src="${r.avatar || 'assets/images/avatar.svg'}" alt="${r.name || 'Reviewer'}" loading="lazy" decoding="async" width="44" height="44" />
            <div class="rec-meta">
              <strong>${r.name || 'Anonymous'}</strong>
              <span>${r.title || ''}${r.company ? ' @ ' + r.company : ''}</span>
              <span class="stars" data-rating="${Math.max(0, Math.min(5, Math.round(r.rating || 0)))}"></span>
            </div>
          </div>
          ${r.logo ? `<span class="rec-right-logo"><img src="${r.logo}" alt="${r.company || ''} logo" loading="lazy" decoding="async" width="28" height="28" /></span>` : ''}
        </div>
        <p class="rec-text">${r.text || 'Great collaboration and impressive problem solving.'}</p>
      </article>`).join('');
    const doubled = [...C.recommendations, ...C.recommendations];
    recTrack.innerHTML = cards(doubled);
    restartMarquee(recTrack);
    recTrack.querySelectorAll('.stars').forEach(el => {
      const c = Math.max(0, Math.min(5, Number(el.dataset.rating || 0)));
      el.innerHTML = '&#9733;'.repeat(c) + '&#9734;'.repeat(5 - c);
    });
  }

  // Highlights (hero)
  const heroHL = $('#heroHighlights');
  if (Array.isArray(C.highlights) && heroHL) {
    heroHL.innerHTML = C.highlights.map(h => `<span class="chip">${iconSpan(h.icon || h.label, 'chip-icon')}${h.label}</span>`).join('');
  }

  // Theme toggle
  const root = document.documentElement;
  const themeToggle = $('#themeToggle');
  const themeIcon = $('#themeIcon');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);
  updateThemeButton();
  // Helper: restart marquee animations (certs/recs) on resize or content changes
  function restartMarquee(track){
    if (!track) return;
    track.style.animation = 'none';
    track.style.transform = 'translateX(0)';
    // Force reflow
    void track.offsetHeight;
    track.style.animation = '';
  }
  // Respect system theme if user didn't choose
  if (!savedTheme && window.matchMedia) {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const applyScheme = (dark) => {
      if (!localStorage.getItem('theme')) {
        root.setAttribute('data-theme', dark ? 'dark' : 'light');
        updateThemeButton();
      }
    };
    applyScheme(mql.matches);
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', (e) => applyScheme(e.matches));
    } else if (typeof mql.addListener === 'function') {
      mql.addListener((e) => applyScheme(e.matches));
    }
  }
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', current);
      localStorage.setItem('theme', current);
      updateThemeButton();
    });
  }
  function updateThemeButton(){
  const isLight = root.getAttribute('data-theme') === 'light';
  if (themeIcon) themeIcon.textContent = isLight ? '🌙' : '☀';
  if (themeToggle) themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  const themeColor = document.querySelector('#themeColor');
  if (themeColor) themeColor.setAttribute('content', isLight ? '#f7f7fb' : '#0b0b0f');
}// Scroll spy + smooth scroll
  const sections = ['about','education','experience','projects','skills','certifications','certificates','recommendations','contact'].map(id => ({id, el: document.getElementById(id)}));
  const navLinks = $$('.nav-link');
  const nav = document.getElementById('primaryNav');
  const navToggle = document.getElementById('navToggle');
  function closeMenu(){ if (!nav) return; nav.classList.remove('open'); if (navToggle) navToggle.setAttribute('aria-expanded','false'); document.body.classList.remove('menu-open'); if (navToggle) navToggle.innerHTML='&#9776;'; }
  function openMenu(){ if (!nav) return; nav.classList.add('open'); if (navToggle) navToggle.setAttribute('aria-expanded','true'); document.body.classList.add('menu-open'); if (navToggle) navToggle.innerHTML='&times;'; }
  if (navToggle && nav){
    navToggle.addEventListener('click', () => { (nav.classList.contains('open') ? closeMenu : openMenu)(); });
    // Close on link click (mobile)
    navLinks.forEach(a => a.addEventListener('click', () => { if (window.matchMedia('(max-width: 640px)').matches) closeMenu(); }));
    // Close if viewport grows
    window.addEventListener('resize', () => { if (!window.matchMedia('(max-width: 640px)').matches) closeMenu(); });
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] });
  sections.forEach(s => s.el && obs.observe(s.el));
  navLinks.forEach(a => a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }));

  // Reveal on scroll
  const fadeEls = () => $$('.fade-in');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { rootMargin: '0px 0px -10% 0px' });
  setTimeout(() => fadeEls().forEach(el => revealObs.observe(el)), 0);
  // Header shrink on scroll
  function onScroll(){ document.body.classList.toggle('scrolled', window.scrollY > 8); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  // Restart marquees on resize to prevent blank/offset tracks after layout changes
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      restartMarquee(document.getElementById('certificatesTrack'));
      restartMarquee(document.getElementById('recsTrack'));
    }, 150);
  });

  // Text animations for headline and section titles
  function splitText(el){
    if (!el || el.dataset.animated) return;
    const text = el.textContent || '';
    el.textContent = '';
    el.classList.add('reveal-text');
    const frag = document.createDocumentFragment();
    let i = 0;
    Array.from(text).forEach(ch => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = ch === ' ' ? '\u00a0' : ch;
      span.style.transitionDelay = `${i * 22}ms`;
      i++;
      frag.appendChild(span);
    });
    el.appendChild(frag);
    el.dataset.animated = 'true';
  }
  (function setupTextAnimations(){
    const h1 = $('#headline');
    splitText(h1);
    // Shimmer config
    if (h1) {
      const FX = (C.effects || {});
      if (typeof FX.shimmerDuration === 'number' || typeof FX.shimmerDuration === 'string') {
        h1.style.setProperty('--shimmer-dur', String(FX.shimmerDuration) + (String(FX.shimmerDuration).endsWith('s') ? '' : 's'));
      }
      if (FX.shimmerHover === false) {
        h1.classList.add('shimmer-off');
      }
    }
    $$('.section-title').forEach(splitText);
    const obs2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('play'); obs2.unobserve(entry.target); } });
    }, { rootMargin: '-10% 0px -10% 0px', threshold: 0.2 });
    [h1, ...$$('.section-title')].filter(Boolean).forEach(el => obs2.observe(el));
  })();

  // Colorize icons after content is in DOM
  loadAllIcons();

  // ==== Custom cursor (desktop) ====
  const enableCustomCursor = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  const cursor = document.getElementById('cursor');
  if (enableCustomCursor && cursor) {
    document.body.classList.add('has-custom-cursor');
    let rafId = null;
    let curX = 0, curY = 0;
    let targetX = 0, targetY = 0;
    const move = (e) => { targetX = e.clientX; targetY = e.clientY; if (!rafId) raf(); };
    const raf = () => {
      curX += (targetX - curX) * 0.22;
      curY += (targetY - curY) * 0.22;
      cursor.style.left = curX + 'px';
      cursor.style.top = curY + 'px';
      rafId = Math.hypot(targetX - curX, targetY - curY) < 0.1 ? null : requestAnimationFrame(raf);
    };
    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseleave', () => cursor.classList.add('hide'));
    window.addEventListener('mouseenter', () => cursor.classList.remove('hide'));
    window.addEventListener('mousedown', () => cursor.classList.add('down'));
    window.addEventListener('mouseup', () => cursor.classList.remove('down'));
    // Hover state for interactive elements + text
    const interactiveSel = 'a, button, .btn, .social-link, .project-card, .timeline-logo';
    const textSel = 'p, h1, h2, h3, h4, h5, h6, li, .project-desc, .section-title, .headline, .subhead, .project-title, .skill';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSel)) cursor.classList.add('link');
      if (e.target.closest(textSel)) cursor.classList.add('text');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSel)) cursor.classList.remove('link');
      if (e.target.closest(textSel)) cursor.classList.remove('text');
    });
  }
})();

