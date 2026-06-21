#!/usr/bin/env node
/* =====================================================================
   Saora — Build : génère le site à partir de articles.js
   ---------------------------------------------------------------------
   Ce script lit la liste ARTICLES dans articles.js (source de vérité
   unique) et régénère automatiquement :
     1. journal/<slug>/index.html   — une page statique par article
     2. Journal.dc.html             — la carte "à la une" + la grille
                                       (entre les marqueurs AUTO:*)
     3. sitemap.xml                 — toutes les URLs du site

   USAGE : node build.js
   PRÉREQUIS : aucun (Node.js seul, pas de dépendance npm)
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SITE_URL = 'https://saora-travel.com';

// --- 1. Charger articles.js (qui s'attend à un objet global `window`) ---
global.window = global;
require(path.join(ROOT, 'articles.js'));
const ARTICLES = global.SAORA_ARTICLES_LIST;
if (!ARTICLES || !ARTICLES.length) {
  console.error('Aucun article trouvé dans articles.js — abandon.');
  process.exit(1);
}

// --- 2. Template d'une page article (journal/<slug>/index.html) ---
function renderArticlePage(a) {
  const url = `${SITE_URL}/journal/${a.slug}/`;
  const heroUrl = `${SITE_URL}/${a.hero}`;
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    image: [heroUrl],
    datePublished: a.dateISO,
    author: { '@type': 'Person', name: a.author },
    publisher: { '@type': 'Organization', name: 'Saora Travel Planner' },
    mainEntityOfPage: url,
    description: a.excerpt
  });

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${a.title} — Saora · Journal</title>
<meta name="description" content="${a.excerpt}">
<link rel="canonical" href="${url}">
<link rel="icon" type="image/svg+xml" href="../../favicon.svg">
<meta property="og:type" content="article">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${a.title}">
<meta property="og:description" content="${a.excerpt}">
<meta property="og:image" content="${heroUrl}">
<meta property="og:locale" content="fr_FR">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${a.title}">
<meta name="twitter:description" content="${a.excerpt}">
<meta name="twitter:image" content="${heroUrl}">
<script async src="https://www.googletagmanager.com/gtag/js?id=G-L3NJT7W1C6"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-L3NJT7W1C6');</script>
<script type="application/ld+json">${jsonLd}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet">
<style>
  @font-face{font-family:'Sloop Script One';src:url('../../Sloop-ScriptOne.woff2') format('woff2');font-weight:400;font-style:normal;font-display:swap;}
  *{box-sizing:border-box;}
  html{scroll-behavior:smooth;}
  body{margin:0;background:#f1ece2;color:#232a1f;-webkit-font-smoothing:antialiased;font-family:'Helvetica Neue',Arial,sans-serif;}
  ::selection{background:#5c6b53;color:#f4efe6;}
  a{color:inherit;text-decoration:none;}
  @media (max-width: 920px){
    [data-rhide]{display:none!important;}
    #art-head,#art-body,#art-cta-inner{padding-left:24px!important;padding-right:24px!important;}
    [data-nav]{display:flex!important;justify-content:space-between!important;padding-left:20px!important;padding-right:20px!important;}
    [data-nav] > a{margin:0!important;}
    [data-nav] > div{display:none!important;}
    [data-burger]{display:flex!important;}
    #art-lead{height:46vh!important;}
    footer{padding-left:22px!important;padding-right:22px!important;}
    .att-row{flex-direction:column!important;gap:6px!important;}
    .att-num{font-size:54px!important;}
  }
  @media (max-width: 600px){
    [data-nav]{padding:14px 16px!important;}
    [data-nav] a[href$="#contact"]{padding:11px 15px!important;letter-spacing:0.14em!important;}
  }</style>
</head>
<body>
<div style="background:#f1ece2;overflow:hidden;position:relative;">

  <nav data-nav="" style="position:fixed;top:0;left:0;right:0;z-index:60;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:18px 44px;background:rgba(241,236,226,0.92);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid rgba(35,42,31,0.07);box-shadow:0 1px 0 rgba(35,42,31,0.10);">
    <div data-rhide="" style="display:flex;gap:32px;align-items:center;justify-content:flex-end;flex:1;">
      <a href="../../index.html#methode" style="font-size:11px;letter-spacing:0.26em;text-transform:uppercase;color:#3c4232;padding-bottom:3px;">Création</a>
      <a href="../../index.html#carnet" style="font-size:11px;letter-spacing:0.26em;text-transform:uppercase;color:#3c4232;padding-bottom:3px;">Carnet</a>
      <a href="../../index.html#formules" style="font-size:11px;letter-spacing:0.26em;text-transform:uppercase;color:#3c4232;padding-bottom:3px;">Formules</a>
    </div>
    <a href="../../index.html" style="text-align:center;line-height:0.9;justify-self:center;margin:0 38px;">
      <span style="display:block;font-family:'Cormorant Garamond',Georgia,serif;font-size:28px;font-weight:600;letter-spacing:0.04em;color:#232a1f;">Saora</span>
      <span style="display:block;font-size:8.5px;letter-spacing:0.42em;text-transform:uppercase;color:#6f7d63;margin-top:1px;">Travel Planner</span>
    </a>
    <div style="display:flex;gap:22px;align-items:center;justify-content:flex-start;flex:1;">
      <a href="../../index.html#apropos" data-rhide="" style="font-size:11px;letter-spacing:0.26em;text-transform:uppercase;color:#3c4232;padding-bottom:3px;">À propos</a>
      <a href="../../Journal.dc.html" style="font-size:11px;letter-spacing:0.26em;text-transform:uppercase;color:#232a1f;padding-bottom:3px;border-bottom:1px solid #5c6b53;">Journal</a>
      <a href="../../index.html#contact" style="font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;color:#f4efe6;background:#232a1f;padding:13px 22px;white-space:nowrap;">Me contacter</a>
    </div>
    <button data-burger="" aria-label="Ouvrir le menu" style="display:none;flex-direction:column;align-items:center;justify-content:center;gap:5px;width:42px;height:42px;padding:9px;background:none;border:none;cursor:pointer;justify-self:end;">
      <span style="display:block;width:24px;height:1.5px;background:#232a1f;"></span>
      <span style="display:block;width:24px;height:1.5px;background:#232a1f;"></span>
      <span style="display:block;width:24px;height:1.5px;background:#232a1f;"></span>
    </button>
  </nav>
  <div data-menu="" style="position:fixed;inset:0;z-index:80;background:#f1ece2;opacity:0;visibility:hidden;transition:opacity .45s ease,visibility .45s ease;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:40px;">
    <div style="position:absolute;top:24px;left:0;right:0;text-align:center;line-height:0.9;">
      <span style="display:block;font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:600;color:#232a1f;">Saora</span>
      <span style="display:block;font-size:8px;letter-spacing:0.42em;text-transform:uppercase;color:#6f7d63;margin-top:2px;">Travel Planner</span>
    </div>
    <button data-menu-close="" aria-label="Fermer le menu" style="position:absolute;top:18px;right:24px;width:44px;height:44px;background:none;border:none;cursor:pointer;font-family:'Cormorant Garamond',serif;font-size:40px;line-height:1;color:#232a1f;">×</button>
    <a href="../../index.html#methode" style="font-family:'Cormorant Garamond',serif;font-size:30px;color:#232a1f;padding:7px;">Création</a>
    <a href="../../index.html#carnet" style="font-family:'Cormorant Garamond',serif;font-size:30px;color:#232a1f;padding:7px;">Carnet</a>
    <a href="../../index.html#formules" style="font-family:'Cormorant Garamond',serif;font-size:30px;color:#232a1f;padding:7px;">Formules</a>
    <a href="../../index.html#apropos" style="font-family:'Cormorant Garamond',serif;font-size:30px;color:#232a1f;padding:7px;">À propos</a>
    <a href="../../Journal.dc.html" style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:30px;color:#5c6b53;padding:7px;">Journal</a>
    <a href="../../index.html#contact" style="margin-top:22px;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#f4efe6;background:#232a1f;padding:16px 32px;">Me contacter</a>
  </div>
  <header id="art-head" style="max-width:820px;margin:0 auto;padding:178px 44px 46px;text-align:center;">
    <p style="font-size:12px;letter-spacing:0.16em;color:#8a8068;margin:0 0 26px;">
      <a href="../../Journal.dc.html" style="color:#8a8068;">Journal</a>
      <span style="margin:0 8px;color:#c2b89e;">/</span><span>${a.category}</span>
    </p>
    <h1 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(38px,5.2vw,68px);line-height:1.06;letter-spacing:0.01em;margin:0;color:#232a1f;">${a.titleHtml}</h1>
    <p style="max-width:560px;margin:24px auto 30px;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:22px;line-height:1.5;color:#574f3f;">${a.subtitle}</p>
    <div style="display:flex;align-items:center;justify-content:center;gap:16px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#8a8068;"><span>Par ${a.author}</span><span style="width:4px;height:4px;border-radius:50%;background:#c2b89e;"></span><span>${a.date}</span><span style="width:4px;height:4px;border-radius:50%;background:#c2b89e;"></span><span>${a.readingTime}</span></div>
  </header>
  <div id="art-lead" role="img" aria-label="${a.heroAlt}" style="height:62vh;min-height:400px;background:url('../../${a.hero}') ${a.heroPos}/cover no-repeat;"></div>
  <article id="art-body" style="max-width:720px;margin:0 auto;padding:72px 44px 40px;">
${a.bodyHtml}
  </article>
  <section style="background:#8a8068;color:#f4efe6;margin-top:40px;">
    <div id="art-cta-inner" style="max-width:820px;margin:0 auto;padding:96px 44px;text-align:center;">
      <p style="font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:#574f3f;margin:0 0 18px;">${a.ctaEyebrow}</p>
      <h2 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(34px,4.4vw,56px);line-height:1.08;margin:0 0 24px;color:#f4efe6;">${a.ctaTitleHtml}</h2>
      <p style="font-size:16px;line-height:1.8;color:#574f3f;margin:0 auto 30px;max-width:480px;">${a.ctaText}</p>
      <a href="../../index.html#contact" style="display:inline-block;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#232a1f;background:#f4efe6;padding:17px 34px;">Démarrer mon projet de voyage</a>
    </div>
  </section>

  <footer style="background:#1b2116;color:#cdd3c2;padding:80px 44px 40px;">
    <div style="max-width:1180px;margin:0 auto;display:flex;justify-content:space-between;gap:40px;flex-wrap:wrap;border-bottom:1px solid rgba(244,239,230,0.12);padding-bottom:48px;">
      <div style="max-width:300px;">
        <div style="line-height:0.9;margin-bottom:18px;">
          <span style="display:block;font-family:'Cormorant Garamond',serif;font-size:34px;font-weight:600;color:#f4efe6;">Saora</span>
          <span style="display:block;font-family:'Sloop Script One',cursive;font-size:26px;color:#9aa68c;margin-top:2px;">Travel planner</span>
        </div>
        <p style="font-size:14px;line-height:1.7;color:rgba(205,211,194,0.7);margin:0;">Voyages sur-mesure &amp; carnets de voyage pour les couples. Façonné à la main, jusqu'au départ.</p>
      </div>
      <div style="display:flex;gap:64px;flex-wrap:wrap;">
        <div style="display:flex;flex-direction:column;gap:14px;">
          <span style="font-size:10px;letter-spacing:0.28em;text-transform:uppercase;color:#7d8a6f;margin-bottom:4px;">Le site</span>
          <a href="../../index.html#methode" style="font-size:14px;color:rgba(205,211,194,0.85);">Création</a>
          <a href="../../index.html#carnet" style="font-size:14px;color:rgba(205,211,194,0.85);">Carnet de voyage</a>
          <a href="../../index.html#formules" style="font-size:14px;color:rgba(205,211,194,0.85);">Formules</a>
          <a href="../../Journal.dc.html" style="font-size:14px;color:rgba(205,211,194,0.85);">Journal</a>
        </div>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <span style="font-size:10px;letter-spacing:0.28em;text-transform:uppercase;color:#7d8a6f;margin-bottom:4px;">Contact</span>
          <a href="../../index.html#contact" style="font-size:14px;color:rgba(205,211,194,0.85);">Me contacter</a>
          <a href="https://www.instagram.com/saora.travelplanner/" target="_blank" rel="noopener noreferrer" style="font-size:14px;color:rgba(205,211,194,0.85);">Instagram</a>
          <a href="mailto:saora.travelplanner@gmail.com" style="font-size:14px;color:rgba(205,211,194,0.85);">saora.travelplanner@gmail.com</a>
        </div>
      </div>
    </div>
    <div style="max-width:1180px;margin:0 auto;padding-top:26px;display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;font-size:11px;letter-spacing:0.12em;color:rgba(205,211,194,0.5);">
      <span>© 2026 Saora Travel Planner</span>
      <span>Conçu avec soin · <a href="../../mentions-legales.html" style="color:rgba(205,211,194,0.5);">Mentions légales</a></span>
    </div>
  </footer>
</div>
<script>(function(){var b=document.querySelector('[data-burger]'),m=document.querySelector('[data-menu]');if(!m)return;function s(o){m.style.opacity=o?'1':'0';m.style.visibility=o?'visible':'hidden';document.body.style.overflow=o?'hidden':'';}if(b)b.addEventListener('click',function(){s(true);});m.querySelectorAll('a, [data-menu-close]').forEach(function(e){e.addEventListener('click',function(){s(false);});});document.addEventListener('keydown',function(e){if(e.key==='Escape')s(false);});})();</script>
</body>
</html>`;
}

// --- 3. Template de la carte "à la une" (1er article de la liste) ---
function renderFeaturedCard(a) {
  return `<a href="journal/${a.slug}/index.html" data-reveal="" style="opacity:0;transform:translateY(28px);transition:opacity 1.1s cubic-bezier(.2,.7,.2,1),transform 1.1s cubic-bezier(.2,.7,.2,1);display:block;--saora-z:1;" style-hover="--saora-z:1.05;">
      <div id="feat-grid" style="display:grid;grid-template-columns:1.05fr 0.95fr;gap:0;background:#f6f2ea;border:1px solid rgba(35,42,31,0.12);overflow:hidden;">
        <div id="feat-img" role="img" aria-label="${a.heroAlt}" style="position:relative;min-height:440px;overflow:hidden;">
          <div style="position:absolute;inset:0;background:url('./${a.hero}') ${a.heroPos}/cover no-repeat;transform:scale(var(--saora-z,1));transition:transform 1.3s cubic-bezier(.2,.7,.2,1);"></div>
          <span style="position:absolute;top:20px;left:20px;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#f4efe6;background:rgba(35,42,31,0.45);padding:7px 12px;">À la une</span>
        </div>
        <div style="padding:56px 52px;display:flex;flex-direction:column;justify-content:center;">
          <p style="font-size:11px;letter-spacing:0.32em;text-transform:uppercase;color:#6f7d63;margin:0 0 18px;">${a.category}</p>
          <h2 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(30px,3.2vw,42px);line-height:1.1;margin:0;color:#232a1f;">${a.titleHtml}</h2>
          <p style="font-size:16px;line-height:1.8;color:#574f3f;margin:22px 0 28px;max-width:440px;">${a.excerpt}</p>
          <div style="display:flex;align-items:center;gap:18px;font-size:12px;letter-spacing:0.06em;color:#8a8068;margin:0 0 28px;">
            <span>${a.date}</span><span style="width:4px;height:4px;border-radius:50%;background:#c2b89e;"></span><span>${a.readingTime} de lecture</span>
          </div>
          <span style="align-self:flex-start;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#232a1f;border-bottom:1px solid #5c6b53;padding-bottom:4px;">Lire l'article →</span>
        </div>
      </div>
    </a>`;
}

// --- 4. Template d'une carte de la grille (les autres articles) ---
function renderGridCard(a) {
  return `<a href="journal/${a.slug}/index.html" data-reveal="" style="opacity:0;transform:translateY(28px);transition:opacity 1.1s cubic-bezier(.2,.7,.2,1),transform 1.1s cubic-bezier(.2,.7,.2,1);display:flex;flex-direction:column;background:#f6f2ea;border:1px solid rgba(35,42,31,0.12);overflow:hidden;--saora-z:1;" style-hover="--saora-z:1.05;">
        <div role="img" aria-label="${a.heroAlt}" style="position:relative;height:210px;overflow:hidden;">
          <div style="position:absolute;inset:0;background:url('./${a.hero}') ${a.heroPos}/cover no-repeat;transform:scale(var(--saora-z,1));transition:transform 1.3s cubic-bezier(.2,.7,.2,1);"></div>
        </div>
        <div style="padding:28px 28px 32px;display:flex;flex-direction:column;flex:1;">
          <p style="font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#6f7d63;margin:0 0 14px;">${a.category}</p>
          <h3 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:25px;line-height:1.12;margin:0 0 14px;color:#232a1f;">${a.titleHtml}</h3>
          <p style="font-size:14.5px;line-height:1.7;color:#574f3f;margin:0 0 22px;">${a.excerpt}</p>
          <div style="margin-top:auto;display:flex;align-items:center;gap:14px;font-size:11px;letter-spacing:0.06em;color:#8a8068;">
            <span>${a.date}</span><span style="width:3px;height:3px;border-radius:50%;background:#c2b89e;"></span><span>${a.readingTime}</span>
          </div>
        </div>
      </a>`;
}

// --- 5. Écrire les pages journal/<slug>/index.html ---
ARTICLES.forEach(a => {
  const dir = path.join(ROOT, 'journal', a.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), renderArticlePage(a), 'utf8');
  console.log(`✓ journal/${a.slug}/index.html`);
});

// --- 6. Régénérer la zone auto de Journal.dc.html ---
const journalPath = path.join(ROOT, 'Journal.dc.html');
let journalHtml = fs.readFileSync(journalPath, 'utf8');

const [featured, ...rest] = ARTICLES;

journalHtml = journalHtml.replace(
  /<!-- AUTO:FEATURED:START -->[\s\S]*?<!-- AUTO:FEATURED:END -->/,
  `<!-- AUTO:FEATURED:START -->\n    ${renderFeaturedCard(featured)}\n    <!-- AUTO:FEATURED:END -->`
);

journalHtml = journalHtml.replace(
  /<!-- AUTO:GRID:START -->[\s\S]*?<!-- AUTO:GRID:END -->/,
  `<!-- AUTO:GRID:START -->\n      ${rest.map(renderGridCard).join('\n\n      ')}\n      <!-- AUTO:GRID:END -->`
);

fs.writeFileSync(journalPath, journalHtml, 'utf8');
console.log('✓ Journal.dc.html (carte à la une + grille régénérées)');

// --- 7. Régénérer sitemap.xml ---
const urls = [
  { loc: `${SITE_URL}/`, lastmod: null, changefreq: 'monthly', priority: '1.0' },
  ...ARTICLES.map(a => ({
    loc: `${SITE_URL}/journal/${a.slug}/`,
    lastmod: a.dateISO,
    changefreq: 'monthly',
    priority: '0.8'
  }))
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}<changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap, 'utf8');
console.log('✓ sitemap.xml');

console.log(`\nTerminé — ${ARTICLES.length} article(s) construits avec succès.`);
