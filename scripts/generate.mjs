// Genera las páginas HTML estáticas en /site a partir de /content y /templates.
// Se ejecuta automáticamente desde vite.config.js (dev y build); también: `npm run generate`.
import { mkdirSync, writeFileSync, readFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { site } from '../content/site.js';
import { services } from '../content/services.js';
import { solutions } from '../content/solutions.js';
import { industries } from '../content/industries.js';
import { paths, stripBase, withBase } from '../templates/paths.js';
import { homePage } from '../templates/pages/home.js';
import { servicesIndexPage, servicePage } from '../templates/pages/services.js';
import { solutionsIndexPage, solutionPage } from '../templates/pages/solutions.js';
import { industriesIndexPage, industryPage } from '../templates/pages/industries.js';
import { aboutPage, insightsPage, contactPage, notFoundPage } from '../templates/pages/company.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');
const manifestFile = join(root, '.generated.json');

const pages = [
  { path: paths.home, render: homePage, priority: '1.0' },
  { path: paths.about, render: aboutPage, priority: '0.7' },
  { path: paths.services, render: servicesIndexPage, priority: '0.9' },
  ...services.map((s) => ({ path: paths.service(s.slug), render: () => servicePage(s), priority: '0.9' })),
  { path: paths.solutions, render: solutionsIndexPage, priority: '0.9' },
  ...solutions.map((s) => ({ path: paths.solution(s.slug), render: () => solutionPage(s), priority: '0.8' })),
  { path: paths.industries, render: industriesIndexPage, priority: '0.7' },
  ...industries.map((i) => ({ path: paths.industry(i.slug), render: () => industryPage(i), priority: '0.7' })),
  { path: paths.insights, render: insightsPage, priority: '0.5' },
  { path: paths.contact, render: contactPage, priority: '0.8' },
  { file: '404.html', render: notFoundPage, sitemap: false },
];

// Las rutas públicas incluyen la subcarpeta (/sitio/...); en disco se escriben desde la raíz de /site
const fileFor = (page) => page.file || join(stripBase(page.path), 'index.html');

// Elimina las páginas generadas en la ejecución anterior (por si se renombró un slug)
if (existsSync(manifestFile)) {
  for (const file of JSON.parse(readFileSync(manifestFile, 'utf8'))) rmSync(join(root, file), { force: true });
}

const written = [];
for (const page of pages) {
  const file = fileFor(page);
  const target = join(root, file);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, page.render());
  written.push(file.replaceAll('\\', '/'));
}
writeFileSync(manifestFile, JSON.stringify(written, null, 2));

// SEO: sitemap y robots
const today = new Date().toISOString().slice(0, 10);
const urls = pages
  .filter((p) => p.sitemap !== false)
  .map(
    (p) =>
      `  <url><loc>${new URL(p.path, site.url).href}</loc><lastmod>${today}</lastmod><priority>${p.priority}</priority></url>`,
  )
  .join('\n');
const publicDir = join(root, 'public');
mkdirSync(publicDir, { recursive: true });
writeFileSync(
  join(publicDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
writeFileSync(
  join(publicDir, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${new URL(withBase('sitemap.xml'), site.url).href}\n`,
);

console.log(`[generate] ${written.length} páginas generadas en /site`);
