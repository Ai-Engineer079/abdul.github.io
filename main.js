(() => {
  const C = window.SITE_CONFIG || {};

  // Basic content wiring
  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => Array.from(p.querySelectorAll(s));

  // Title/brand
  document.title = `${C.name || 'Your Name'} — Portfolio`;
  $('#brandName').textContent = C.name || 'Your Name';
  $('#role').textContent = C.role || 'Full Stack & AI Engineer';
  $('#footerName').firstChild && ($('#footerName').firstChild.textContent = `© `);
  $('#year').textContent = new Date().getFullYear();
  $('#resumeLink').href = C.resumeUrl || '#';

  // About
  $('#aboutText').textContent = C.about || $('#aboutText').textContent;
  $('#location').textContent = C.location || 'Remote';
  $('#availability').textContent = C.availability || 'Open to opportunities';

  // Quick facts
  const qf = $('#quickFacts');
  if (Array.isArray(C.quickFacts) && qf) {
    qf.innerHTML = '';
    C.quickFacts.forEach(({ label, value }) => {
      const li = document.createElement('li');
      li.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
      qf.appendChild(li);
    });
  }

  // Social links
  const socials = $('#socialLinks');
  if (Array.isArray(C.socials)) {
    socials.innerHTML = C.socials
      .map(s => `<a class="social-link" href="${s.url}" target="_blank" rel="noopener">${s.icon || '🔗'} <span>${s.name}</span></a>`)
      .join('');
  }

  // Email handling
  const email = C.email || 'you@example.com';
  const emailLink = $('#emailLink');
  const copyEmailBtn = $('#copyEmail');
  const emailCta = $('#emailCta');
  if (emailLink) emailLink.href = `mailto:${email}`;
  if (copyEmailBtn) {
    copyEmailBtn.dataset.email = email;
    copyEmailBtn.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(email); copyEmailBtn.textContent = 'Copied! ✅'; }
      catch { copyEmailBtn.textContent = email; }
      setTimeout(() => (copyEmailBtn.textContent = 'Copy Email'), 1500);
    });
  }
  if (emailCta) emailCta.href = `mailto:${email}`;

  // Experience
  const expList = $('#experienceList');
  if (Array.isArray(C.experience) && expList) {
    expList.innerHTML = '';
    C.experience.forEach((e) => {
      const li = document.createElement('li');
      li.className = 'timeline-item fade-in';
      li.innerHTML = `
        <div class="timeline-time">${e.period || ''}</div>
        <div class="timeline-card">
          <h3>${e.title || ''} · ${e.company || ''}</h3>
          <p>${e.summary || ''}</p>
          ${Array.isArray(e.tech) ? `<div class="chips">${e.tech.map(t => `<span class="chip">${t}</span>`).join('')}</div>` : ''}
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
      card.innerHTML = `
        <div class="project-media">
          <img src="${p.image}" alt="${p.name} preview" loading="lazy" />
        </div>
        <div class="project-body">
          <h3 class="project-title">${p.name}</h3>
          <p class="project-desc">${p.description || ''}</p>
          ${Array.isArray(p.tags) ? `<div class="project-tags">${p.tags.map(t => `<span class='chip'>${t}</span>`).join('')}</div>` : ''}
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
    skills.innerHTML = C.skills.map(s => `<span class="skill">${s}</span>`).join('');
  }

  // Theme toggle
  const root = document.documentElement;
  const themeToggle = $('#themeToggle');
  const themeIcon = $('#themeIcon');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);
  updateThemeButton();
  themeToggle?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', current);
    localStorage.setItem('theme', current);
    updateThemeButton();
  });
  function updateThemeButton(){
    const isLight = root.getAttribute('data-theme') === 'light';
    themeIcon.textContent = isLight ? '🌞' : '🌙';
  }

  // Scroll‑spy for nav
  const sections = ['about','experience','projects','skills','contact'].map(id => ({id, el: document.getElementById(id)}));
  const navLinks = $$('.nav-link');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] });
  sections.forEach(s => s.el && obs.observe(s.el));

  // Smooth scroll
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

  // ==== Custom cursor (desktop) ====
  const enableCustomCursor = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  const cursor = $('#cursor');
  if (enableCustomCursor && cursor) {
    document.body.classList.add('has-custom-cursor');
    let rafId = null;
    let curX = 0, curY = 0;
    let targetX = 0, targetY = 0;
    const move = (e) => { targetX = e.clientX; targetY = e.clientY; if (!rafId) raf(); };
    const raf = () => {
      curX += (targetX - curX) * 0.2;
      curY += (targetY - curY) * 0.2;
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
    const interactiveSel = 'a, button, .btn, .social-link, .project-card';
    const textSel = 'p, h1, h2, h3, h4, h5, h6, li, .project-desc, .section-title, .headline, .subhead, .project-title, .skill';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSel)) cursor.classList.add('link');
      if (e.target.closest(textSel)) cursor.classList.add('text');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSel)) cursor.classList.remove('link');
      if (e.target.closest(textSel)) cursor.classList.remove('text');
    });

    // Hide custom cursor when focusing text fields
    document.addEventListener('focusin', (e) => {
      if (e.target.matches('input, textarea, [contenteditable="true"]')) cursor.classList.add('hide');
    });
    document.addEventListener('focusout', (e) => {
      if (e.target.matches('input, textarea, [contenteditable="true"]')) cursor.classList.remove('hide');
    });

    // Selection feedback
    const onSel = () => {
      const sel = window.getSelection?.();
      if (!sel) return;
      const selecting = sel.rangeCount > 0 && !sel.isCollapsed;
      cursor.classList.toggle('selecting', selecting);
    };
    document.addEventListener('selectionchange', onSel);
  }

  // ==== Magnetic buttons =====
  const magnetize = (el) => {
    const strength = 10; // px
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${(relX/rect.width)*strength}px, ${(relY/rect.height)*strength}px)`;
    };
    const reset = () => { el.style.transform = 'translate(0,0)'; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', reset);
  };
  $$('.btn').forEach(magnetize);

  // ==== Card tilt (projects) =====
  const addTilt = (card) => {
    const max = 7; // deg
    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      const rx = (py * -2) * max;
      const ry = (px * 2) * max;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
      card.style.boxShadow = '0 12px 30px rgba(0,0,0,.35)';
    };
    const reset = () => { card.style.transform = ''; card.style.boxShadow = ''; };
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', reset);
  };
  // Observe project grid population and attach tilt
  const grid = $('#projectsGrid');
  if (grid) {
    const tiltObserver = new MutationObserver(() => {
      $$('.project-card', grid).forEach((c) => {
        if (!c._tiltAttached) { addTilt(c); c._tiltAttached = true; }
      });
      // Animate any newly added project titles
      $$('.project-title', grid).forEach((t) => {
        if (!t.dataset.animated) splitText(t, 'words');
      });
    });
    tiltObserver.observe(grid, { childList: true });
    // If already there
    $$('.project-card', grid).forEach((c) => { if (!c._tiltAttached) { addTilt(c); c._tiltAttached = true; } });
    $$('.project-title', grid).forEach((t) => { if (!t.dataset.animated) splitText(t, 'words'); });
  }

  // ==== Hero parallax for orbs =====
  const hero = $('#hero');
  const orbs = $$('.orb', hero);
  if (hero && orbs.length) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      orbs.forEach((o, i) => {
        const depth = (i + 1) * 8; // px
        o.style.transform = `translate(${x*depth}px, ${y*depth}px)`;
      });
    });
    hero.addEventListener('mouseleave', () => {
      orbs.forEach(o => { o.style.transform = 'translate(0,0)'; });
    });
  }

  // ==== VIP text animations (letters/words) =====
  function splitText(el, mode = 'letters'){
    if (!el || el.dataset.animated) return;
    const text = el.textContent || '';
    el.textContent = '';
    el.classList.add('reveal-text');
    const frag = document.createDocumentFragment();
    let i = 0;
    if (mode === 'words'){
      const parts = text.split(/(\s+)/);
      parts.forEach(part => {
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = part;
        span.style.transitionDelay = `${i * 35}ms`;
        i++;
        frag.appendChild(span);
      });
    } else {
      Array.from(text).forEach(ch => {
        const span = document.createElement('span');
        span.className = 'char';
        if (ch === ' ') { span.innerHTML = '&nbsp;'; }
        else { span.textContent = ch; }
        span.style.transitionDelay = `${i * 18}ms`;
        i++;
        frag.appendChild(span);
      });
    }
    el.appendChild(frag);
    el.dataset.animated = 'true';
    return el;
  }

  function setupTextAnimations(){
    const h1 = $('#headline');
    if (h1 && !h1.dataset.animated) splitText(h1, 'letters');
    $$('.section-title').forEach(el => { if (!el.dataset.animated) splitText(el, 'words'); });
    $$('.project-title').forEach(el => { if (!el.dataset.animated) splitText(el, 'words'); });
    // Observe and play when visible
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('play');
          if (entry.target.classList.contains('vip-underline')) entry.target.classList.add('play');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '-10% 0px -10% 0px', threshold: 0.2 });
    [h1, ...$$('.section-title'), ...$$('.project-title')].filter(Boolean).forEach(el => obs.observe(el));
  }

  setupTextAnimations();
})();
