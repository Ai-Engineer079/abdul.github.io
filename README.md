Portfolio (Static HTML/CSS/JS)

Overview

- Clean, responsive portfolio similar in structure/feel to robinrathore.xyz
- No build step required; edit one config and you’re done
- Dark/light theme, smooth scroll, scroll‑spy, and small animations

Quick Start

- Open index.html in a browser
- Or serve locally for best experience: npx serve .

Customize

- Update personal info in site.config.js:1
  - name, role, location, email, resumeUrl, socials
  - experience, projects, skills
- Replace avatar at assets/images/avatar.svg:1
- Replace OG image at assets/images/og-image.svg:1
- Add project thumbnails under assets/images/

Deploy

- GitHub Pages: push and enable Pages on the repo (root)
- Netlify: drag‑and‑drop folder or link repo
- Vercel: import repo; set framework as “Other” (static)

Notes

- Everything runs client‑side; no server needed
- For a contact form, plug a service like Formspree or Netlify Forms
- Theme is persisted in localStorage; reset by clearing site data

