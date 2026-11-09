# NR Foods — Catering & Dine-In Website

A responsive marketing website for NR Foods (Catering & Events, Hyderabad), built as a client project / portfolio piece. Plain static HTML/CSS/JS, no build step.

## Features

- Responsive layout with mobile nav
- Menu with category tabs (Starters / Mains / Biryani & Rice / Desserts)
- Catering packages + 4-step process
- Notable-events showcase section
- Photo gallery
- Enquiry form backed by Google Sheets + email notification (no traditional backend)
- Direct WhatsApp and Instagram links
- Animated fork-and-spoon loading screen

## Tech stack

- HTML5, CSS3 (custom properties), vanilla JavaScript
- Google Apps Script as a free serverless backend for the enquiry form
- Fonts: Fraunces + Archivo (Google Fonts)

## Project structure

```
nrfoods-site/
├── index.html
├── styles.css
├── script.js
├── google-apps-script.gs
├── assets/
│   ├── nrfoods-logo.png
│   └── celeb-*.jpg
└── README.md
```

## Setup

1. Clone or download this repo.
2. In `script.js`, set `CONFIG.phone` (digits only, e.g. `919876543210`), `CONFIG.instagramHandle`, and `CONFIG.googleScriptUrl`.
3. For the enquiry form: follow the setup steps at the top of `google-apps-script.gs`, deploy it as a Web App, and paste the `/exec` URL into `CONFIG.googleScriptUrl`.
4. Open `index.html` in a browser, or serve the folder with any static host (Vercel, Netlify, GitHub Pages).

## Status

Prototype build. Menu items, prices, address, hours and reviews are placeholders pending final details from the client.

