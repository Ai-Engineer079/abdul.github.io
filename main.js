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
  const iconImg = (name, extraClass = '') => {
    const slug = toSlug(name);
    if (!slug) return '';
    const url = ICON_CDN(slug);
    return `<img class="icon-img ${extraClass}" src="${url}" alt="${name} icon" loading="lazy" />`;
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
  const resumeLink = $('#resumeLink');
  if (resumeLink) resumeLink.href = C.resumeUrl || '#';

  // About + quick facts
  const aboutText = $('#aboutText');
  if (aboutText) aboutText.textContent = C.about || aboutText.textContent || '';
  const location = $('#location');
  if (location) location.textContent = C.location || 'Remote';
  const availability = $('#availability');
  if (availability) availability.textContent = C.availability || 'Open to opportunities';
  const qf = $('#quickFacts');
  if (Array.isArray(C.quickFacts) && qf) {
    qf.innerHTML = '';
    C.quickFacts.forEach(({ label, value }) => {
      const li = document.createElement('li');
      li.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
      qf.appendChild(li);
    });
  }

  // Socials
  const socials = $('#socialLinks');
  if (Array.isArray(C.socials) && socials) {
    socials.innerHTML = C.socials
      .map(s => {
        const icon = iconImg(s.name, 'social-icon');
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
  if (Array.isArray(C.education) && eduList) {
    eduList.innerHTML = '';
    C.education.forEach((ed) => {
      const li = document.createElement('li');
      li.className = 'timeline-item fade-in';
      li.innerHTML = `
        <div class="timeline-time">${ed.period || ''}</div>
        <div class="timeline-card">
          <h3>${ed.degree || ''}</h3>
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
      li.innerHTML = `
        <div class="timeline-time">${e.period || ''}</div>
        <div class="timeline-card">
          <h3>${e.title || ''} @ ${e.company || ''}</h3>
          <p>${e.summary || ''}</p>
          ${Array.isArray(e.tech) ? `<div class="chips">${e.tech.map(t => `<span class="chip">${iconImg(t, 'chip-icon')}${t}</span>`).join('')}</div>` : ''}
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
          ${Array.isArray(p.tags) ? `<div class="project-tags">${p.tags.map(t => `<span class='chip'>${iconImg(t, 'chip-icon')}${t}</span>`).join('')}</div>` : ''}
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
    skills.innerHTML = C.skills.map(s => `<span class="skill">${iconImg(s, 'skill-icon')}${s}</span>`).join('');
  }

  // Certifications
  const certs = $('#certificationsList');
  if (Array.isArray(C.certifications) && certs) {
    certs.innerHTML = (C.certifications || [])
      .map(c => {
        const issuerIcon = iconImg(c.issuer || '', 'chip-icon') || iconImg(c.name || '', 'chip-icon');
        return `<span class="chip">${issuerIcon || ''}${c.name}${c.issuer ? ' - ' + c.issuer : ''}</span>`;
      })
      .join('');
  }

  // Theme toggle
  const root = document.documentElement;
  const themeToggle = $('#themeToggle');
  const themeIcon = $('#themeIcon');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);
  updateThemeButton();
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
    if (themeIcon) themeIcon.textContent = isLight ? 'Dark' : 'Light';
  }

  // Scroll spy + smooth scroll
  const sections = ['about','education','experience','projects','skills','certifications','contact'].map(id => ({id, el: document.getElementById(id)}));
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
})();

