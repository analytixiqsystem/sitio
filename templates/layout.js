// Documento base, cabecera y pie compartidos por todas las páginas.
import { html, raw, cx } from './html.js';
import { icon } from './icons.js';
import { site } from '../content/site.js';
import { services } from '../content/services.js';
import { solutions } from '../content/solutions.js';
import { industries } from '../content/industries.js';
import { placeholder } from './components.js';
import { paths, asset, withBase } from './paths.js';

// `path` ya incluye la subcarpeta (/sitio/...), así que se resuelve contra el origen de site.url
const absolute = (path) => new URL(path, site.url).href;

// Script en línea: activa animaciones solo si el usuario no pidió movimiento reducido,
// y las desactiva si el JS principal no llega a cargar (el contenido nunca queda oculto).
const motionFlag = `(function(){var d=document.documentElement;d.classList.add('js');if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion');setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('motion')},2500)}})();`;

function head({ title, description, path, jsonLd = [], noindex = false }) {
  const fullTitle = path === paths.home ? `${site.name} | ${site.positioning}` : `${title} | ${site.name}`;
  const url = absolute(path);
  return html`
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${fullTitle}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${url}" />
    ${noindex ? raw('<meta name="robots" content="noindex" />') : ''}
    <meta name="theme-color" content="#060A17" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="es_ES" />
    <meta property="og:site_name" content="${site.name}" />
    <meta property="og:title" content="${fullTitle}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${absolute(withBase('brand/logo-full.png'))}" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" type="image/png" sizes="32x32" href="${asset('brand/favicon-32.png')}" />
    <link rel="apple-touch-icon" href="${asset('brand/apple-touch-icon.png')}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Lexend:wght@300;400;500;600&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
    />
    <script>${raw(motionFlag)}</script>
    <link rel="stylesheet" href="/src/main.css" />
    <script type="module" src="/src/main.js"></script>
    ${jsonLd.map((data) => html`<script type="application/ld+json">${raw(JSON.stringify(data))}</script>`)}
  `;
}

/* ---------- Cabecera ---------- */

function logo({ dark = true } = {}) {
  return html`
    <a href="${paths.home}" class="group/logo flex items-center gap-2.5 rounded-lg focus-visible:outline-offset-4" aria-label="${site.name}, ir al inicio">
      <img src="${asset('brand/logo-icon.webp')}" alt="" width="403" height="317" class="h-8 w-auto sm:h-9" />
      <span class="leading-none">
        <span
          class="${cx(
            'block font-display text-[1.15rem] font-semibold tracking-tight transition-colors duration-300',
            dark ? 'text-white group-data-[scrolled=true]/header:text-ink-900' : 'text-white',
          )}"
          >AnalytixIQ <span class="font-normal">Systems</span></span
        >
      </span>
    </a>
  `;
}

const navLinkClass =
  'inline-flex min-h-11 items-center gap-1 rounded-lg px-3 text-[0.95rem] font-medium text-white/80 transition-colors duration-200 hover:text-white aria-[current=page]:text-white group-data-[scrolled=true]/header:text-slate-600 group-data-[scrolled=true]/header:hover:text-ink-900 group-data-[scrolled=true]/header:aria-[current=page]:text-ink-900';

function megaLink({ href, iconName, title, text, meta }) {
  return html`
    <li>
      <a href="${href}" class="group/item flex gap-3.5 rounded-xl p-3 transition-colors duration-200 hover:bg-slate-50 focus-visible:bg-slate-50">
        ${iconName
          ? html`<span class="mt-0.5 grid size-10 shrink-0 place-items-center rounded-lg bg-ink-900 text-brand-cyan-light ring-1 ring-ink-700">${icon(iconName, 'size-5')}</span>`
          : ''}
        <span class="min-w-0">
          <span class="flex items-center gap-2 font-display text-[0.95rem] font-medium text-ink-900">
            ${title}
            ${icon('arrow-right', 'size-3.5 -translate-x-1 text-accent opacity-0 transition duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100')}
          </span>
          ${text ? html`<span class="mt-0.5 block text-sm leading-snug text-slate-600">${text}</span>` : ''}
          ${meta ? html`<span class="mt-1 block font-mono text-xs text-slate-500">${meta}</span>` : ''}
        </span>
      </a>
    </li>
  `;
}

function dropdown({ id, label, current, panelClass, body }) {
  return html`
    <li class="relative" data-dropdown>
      <button
        type="button"
        class="${navLinkClass} cursor-pointer"
        aria-expanded="false"
        aria-controls="menu-${id}"
        ${current ? raw('aria-current="page"') : ''}
        data-dropdown-trigger
      >
        ${label}
        ${icon('chevron-down', 'size-4 transition-transform duration-200 [[aria-expanded=true]>&]:rotate-180')}
      </button>
      <div
        id="menu-${id}"
        class="${cx('dropdown-panel absolute top-full pt-3', panelClass)}"
        data-dropdown-panel
        hidden
      >
        <div class="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_60px_-20px_rgb(6_10_23/0.35)]">${body}</div>
      </div>
    </li>
  `;
}

function header(section) {
  const servicesPanel = html`
    <div class="grid gap-0 lg:grid-cols-[1fr_15rem]">
      <ul class="grid grid-cols-2 gap-1 p-3">
        ${services.map((s) =>
          megaLink({ href: paths.service(s.slug), iconName: s.icon, title: s.navTitle, text: s.short }),
        )}
      </ul>
      <div class="flex flex-col justify-between gap-6 bg-ink-950 p-6 text-white">
        <div>
          <p class="font-mono text-xs uppercase tracking-[0.18em] text-brand-cyan-light">Ciclo completo</p>
          <p class="mt-3 text-sm leading-relaxed text-white/75">
            Estrategia, arquitectura, gobierno, ingeniería, analítica, IA y operación, conectadas.
          </p>
        </div>
        <a href="${paths.services}" class="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-brand-cyan-light">
          Ver todos los servicios ${icon('arrow-right', 'size-4')}
        </a>
      </div>
    </div>
  `;

  const solutionsPanel = html`
    <div>
      <ul class="grid grid-cols-2 gap-1 p-3">
        ${solutions.slice(0, 8).map((s) =>
          megaLink({ href: paths.solution(s.slug), title: s.title, meta: s.duration }),
        )}
      </ul>
      <div class="flex items-center justify-between border-t border-line bg-slate-50 px-6 py-4">
        <p class="text-sm text-slate-600">${solutions.length} ofertas con alcance y entregables definidos.</p>
        <a href="${paths.solutions}" class="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover">
          Ver todas ${icon('arrow-right', 'size-4')}
        </a>
      </div>
    </div>
  `;

  const industriesPanel = html`
    <ul class="grid gap-1 p-3">
      ${industries.map((i) => megaLink({ href: paths.industry(i.slug), iconName: i.icon, title: i.title, text: i.short }))}
      <li class="mt-1 border-t border-line px-3 pt-3 pb-1">
        <a href="${paths.industries}" class="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover">
          Todas las industrias ${icon('arrow-right', 'size-4')}
        </a>
      </li>
    </ul>
  `;

  const mobileGroup = (label, href, links) => html`
    <details class="group/acc border-b border-white/10">
      <summary class="flex min-h-14 cursor-pointer list-none items-center justify-between font-display text-lg text-white [&::-webkit-details-marker]:hidden">
        ${label} ${icon('chevron-down', 'size-5 text-white/60 transition-transform duration-200 group-open/acc:rotate-180')}
      </summary>
      <ul class="space-y-1 pb-4">
        ${links.map(
          (l) => html`<li><a href="${l.href}" class="flex min-h-11 items-center rounded-lg px-3 text-[0.98rem] text-white/75 hover:bg-white/5 hover:text-white">${l.label}</a></li>`,
        )}
        <li><a href="${href}" class="flex min-h-11 items-center gap-2 rounded-lg px-3 font-semibold text-brand-cyan-light">Ver todo ${icon('arrow-right', 'size-4')}</a></li>
      </ul>
    </details>
  `;

  const current = (name) => (section === name ? raw('aria-current="page"') : '');

  return html`
    <a href="#contenido" class="skip-link">Saltar al contenido</a>
    <header
      id="site-header"
      data-scrolled="false"
      class="group/header fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-300 data-[scrolled=true]:border-line data-[scrolled=true]:bg-white/90 data-[scrolled=true]:backdrop-blur-xl"
    >
      <div class="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-5 sm:px-6 lg:px-8">
        ${logo()}
        <nav aria-label="Principal" class="hidden lg:block">
          <ul class="flex items-center gap-0.5">
            <li><a href="${paths.about}" class="${navLinkClass}" ${current('about')}>Nosotros</a></li>
            ${dropdown({ id: 'servicios', label: 'Servicios', current: section === 'services', panelClass: 'left-1/2 w-[50rem] -translate-x-1/3', body: servicesPanel })}
            ${dropdown({ id: 'soluciones', label: 'Soluciones', current: section === 'solutions', panelClass: 'left-1/2 w-[38rem] -translate-x-1/2', body: solutionsPanel })}
            ${dropdown({ id: 'industrias', label: 'Industrias', current: section === 'industries', panelClass: 'left-1/2 w-[26rem] -translate-x-1/2', body: industriesPanel })}
            <li><a href="${paths.insights}" class="${navLinkClass}" ${current('insights')}>Insights</a></li>
          </ul>
        </nav>
        <div class="flex items-center gap-2">
          <a href="${paths.contact}" class="btn btn-header hidden sm:inline-flex">${site.cta.button}</a>
          <button
            type="button"
            class="grid size-11 cursor-pointer place-items-center rounded-lg text-white transition-colors hover:bg-white/10 group-data-[scrolled=true]/header:text-ink-900 group-data-[scrolled=true]/header:hover:bg-slate-100 lg:hidden"
            aria-expanded="false"
            aria-controls="mobile-menu"
            aria-label="Abrir menú"
            data-mobile-toggle
          >
            ${icon('menu', 'size-6')}
          </button>
        </div>
      </div>
    </header>

    <!-- Fuera del <header>: su backdrop-filter crearía un bloque contenedor para este panel fijo -->
    <div id="mobile-menu" class="fixed inset-x-0 top-[4.5rem] bottom-0 z-40 overflow-y-auto bg-ink-950 px-5 pb-10 sm:px-6 lg:hidden" hidden data-mobile-menu>
        <nav aria-label="Principal móvil" class="mx-auto max-w-xl pt-2">
          <a href="${paths.about}" class="flex min-h-14 items-center border-b border-white/10 font-display text-lg text-white">Nosotros</a>
          ${mobileGroup('Servicios', paths.services, services.map((s) => ({ href: paths.service(s.slug), label: s.navTitle })))}
          ${mobileGroup('Soluciones', paths.solutions, solutions.map((s) => ({ href: paths.solution(s.slug), label: s.title })))}
          ${mobileGroup('Industrias', paths.industries, industries.map((i) => ({ href: paths.industry(i.slug), label: i.title })))}
          <a href="${paths.insights}" class="flex min-h-14 items-center border-b border-white/10 font-display text-lg text-white">Insights</a>
          <a href="${paths.contact}" class="btn btn-primary mt-8 w-full justify-center">${site.cta.button}</a>
          <p class="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-white/50">${site.tagline}</p>
        </nav>
      </div>
  `;
}

/* ---------- Pie ---------- */

function footer() {
  const col = (title, links) => html`
    <div>
      <h2 class="font-mono text-xs uppercase tracking-[0.18em] text-white/55">${title}</h2>
      <ul class="mt-5 space-y-1">
        ${links.map(
          (l) => html`<li><a href="${l.href}" class="inline-flex min-h-9 items-center text-[0.95rem] text-white/75 transition-colors hover:text-white">${l.label}</a></li>`,
        )}
      </ul>
    </div>
  `;

  const contactItem = (iconName, value, label, href) => html`
    <li class="flex items-start gap-3 text-[0.95rem] text-white/75">
      ${icon(iconName, 'mt-0.5 size-4 shrink-0 text-brand-cyan-light')}
      ${value ? (href ? html`<a href="${href}" class="hover:text-white">${value}</a>` : value) : placeholder(label, 'dark')}
    </li>
  `;

  return html`
    <footer class="relative overflow-hidden bg-ink-950 text-white">
      <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/60 to-transparent"></div>
      <div class="mx-auto max-w-7xl px-5 pt-20 pb-10 sm:px-6 lg:px-8">
        <div class="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div class="max-w-sm">
            ${logo({ dark: false })}
            <p class="mt-5 text-[0.95rem] leading-relaxed text-white/70">${site.valueProposition}</p>
            <ul class="mt-7 space-y-3">
              ${contactItem('mail', site.contact.email, 'Correo de contacto', site.contact.email && `mailto:${site.contact.email}`)}
              ${contactItem('phone', site.contact.phone, 'Teléfono', site.contact.phoneHref)}
              ${contactItem('map-pin', site.contact.location, 'Ciudad / país')}
            </ul>
          </div>
          <div class="grid grid-cols-2 gap-10 sm:grid-cols-4">
            ${col('Servicios', services.map((s) => ({ href: paths.service(s.slug), label: s.navTitle })))}
            ${col('Soluciones', solutions.filter((s) => s.featured).map((s) => ({ href: paths.solution(s.slug), label: s.title })))}
            ${col('Industrias', industries.map((i) => ({ href: paths.industry(i.slug), label: i.title })))}
            ${col('Compañía', [
              { href: paths.about, label: 'Nosotros' },
              { href: paths.insights, label: 'Insights' },
              { href: paths.contact, label: 'Contacto' },
            ])}
          </div>
        </div>

        <p class="halftone-wordmark mt-20 select-none font-display text-[clamp(3.5rem,14vw,12.5rem)] leading-[0.85] font-semibold tracking-[-0.04em]" aria-hidden="true">
          AnalytixIQ
        </p>

        <div class="mt-8 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <p>© <span data-year>${new Date().getFullYear()}</span> ${site.name}. ${site.tagline}</p>
          <p class="max-w-xl md:text-right">
            Las tecnologías y marcos mencionados describen experiencia y capacidades; no implican alianzas comerciales. Las marcas
            pertenecen a sus respectivos propietarios.
          </p>
        </div>
      </div>
    </footer>
  `;
}

export function layout({ title, description, path, section, jsonLd = [], noindex, body }) {
  const doc = html`<!doctype html>
<html lang="${site.lang}">
  <head>
    ${head({ title, description, path, jsonLd, noindex })}
  </head>
  <body class="bg-canvas font-sans text-ink-900 antialiased">
    ${header(section)}
    <main id="contenido" tabindex="-1">${body}</main>
    ${footer()}
  </body>
</html>
`;
  return doc.toString();
}

export const organizationJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.name,
  slogan: site.tagline,
  description: site.description,
  url: absolute(paths.home),
  logo: absolute(withBase('brand/icon-512.png')),
  knowsAbout: site.capabilities,
  ...(site.contact.email ? { email: site.contact.email } : {}),
});

export const breadcrumbJsonLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.label,
    item: absolute(item.href),
  })),
});

export { absolute };
