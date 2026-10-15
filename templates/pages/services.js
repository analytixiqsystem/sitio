import { html, cx } from '../html.js';
import { icon } from '../icons.js';
import { paths } from '../paths.js';
import { layout, breadcrumbJsonLd, absolute } from '../layout.js';
import {
  button,
  checkList,
  chips,
  ctaBand,
  cycleFlow,
  linkCard,
  outcomeCard,
  pageHero,
  section,
  sectionHeader,
  serviceCard,
  solutionCard,
} from '../components.js';
import { site } from '../../content/site.js';
import { services } from '../../content/services.js';
import { solutions } from '../../content/solutions.js';

const baseCrumbs = [
  { href: paths.home, label: 'Inicio' },
  { href: paths.services, label: 'Servicios' },
];

export function servicesIndexPage() {
  return layout({
    title: 'Servicios',
    description:
      'Seis líneas de negocio: estrategia y arquitectura empresarial, gobierno de datos, plataformas de datos y Cloud, BI y analítica, inteligencia artificial, e IoT y tiempo real.',
    path: paths.services,
    section: 'services',
    jsonLd: [breadcrumbJsonLd(baseCrumbs)],
    body: html`
      ${pageHero({
        crumbs: baseCrumbs,
        eyebrow: 'Servicios',
        title: 'Seis líneas de negocio, un mismo modelo de valor.',
        lead: site.valueProposition,
        meta: cycleFlow(site.cycle),
      })}
      ${section({
        tone: 'canvas',
        body: html`
          <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-reveal-group>${services.map((s) => serviceCard(s))}</div>
        `,
      })}
      ${section({
        tone: 'white',
        label: 'transversales-title',
        body: html`
          <div class="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            ${sectionHeader({
              id: 'transversales-title',
              eyebrow: 'Capacidades transversales',
              title: 'Lo que sostiene cada línea de negocio.',
              lead: 'Las líneas de negocio se complementan con capacidades de seguridad, operación, integración, FinOps y gestión del cambio.',
            })}
            <div data-reveal>${chips(site.transversal)}</div>
          </div>
        `,
      })}
      ${ctaBand()}
    `,
  });
}

function relatedSolutions(service) {
  const related = solutions.filter((s) => s.lines.includes(service.slug));
  if (!related.length) return '';
  return section({
    tone: 'canvas',
    label: 'ofertas-title',
    body: html`
      ${sectionHeader({
        id: 'ofertas-title',
        eyebrow: 'Ofertas relacionadas',
        title: 'Formas concretas de empezar.',
      })}
      <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>${related.map((s) => solutionCard(s))}</div>
    `,
  });
}

function specialBlocks(service) {
  const blocks = [];

  if (service.special) {
    blocks.push(html`
      <div class="rounded-3xl border border-line bg-white p-8 sm:p-10" data-reveal>
        <span class="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.16em] text-accent">
          Oferta especializada
        </span>
        <h3 class="mt-5 font-display text-2xl font-medium tracking-tight text-ink-900">${service.special.title}</h3>
        <p class="mt-3 text-slate-600">${service.special.text}</p>
        <ul class="mt-6 grid gap-3 sm:grid-cols-2">
          ${service.special.items.map(
            (item) => html`
              <li class="flex items-center gap-3 rounded-xl bg-canvas px-4 py-3 text-slate-700">
                ${icon('alert-circle', 'size-4 shrink-0 text-brand-magenta')} ${item}
              </li>
            `,
          )}
        </ul>
        <div class="mt-8">${button({ href: paths.solution('power-bi-governance-accelerator'), label: 'Ver Power BI Governance Accelerator', variant: 'secondary' })}</div>
      </div>
    `);
  }

  if (service.model) {
    blocks.push(html`
      <div class="rounded-3xl bg-ink-950 p-8 text-white sm:p-10" data-reveal>
        <p class="font-mono text-xs uppercase tracking-[0.2em] text-white/55">Nuestro modelo</p>
        <h3 class="mt-3 font-display text-2xl font-medium tracking-tight">De la estrategia a la operación de la IA</h3>
        <div class="mt-7">${cycleFlow(service.model, { label: 'Modelo de IA' })}</div>
      </div>
    `);
  }

  if (service.proposition) {
    blocks.push(html`
      <div class="grid gap-6 rounded-3xl bg-ink-950 p-8 text-white sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center" data-reveal>
        <div>
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-white/55">Propuesta</p>
          <h3 class="mt-3 font-display text-3xl font-medium tracking-tight text-brand-gradient">${service.proposition.title}</h3>
          <p class="mt-4 text-lg leading-relaxed text-white/75">${service.proposition.text}</p>
        </div>
        <div>
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-white/55">Sectores prioritarios</p>
          ${chips(service.sectors, { tone: 'dark', className: 'mt-4' })}
        </div>
      </div>
    `);
  }

  return blocks;
}

export function servicePage(service) {
  const crumbs = [...baseCrumbs, { href: paths.service(service.slug), label: service.navTitle }];
  const others = services.filter((s) => s.slug !== service.slug);
  const extra = specialBlocks(service);

  return layout({
    title: service.seo.title,
    description: service.seo.description,
    path: paths.service(service.slug),
    section: 'services',
    jsonLd: [
      breadcrumbJsonLd(crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.title,
        description: service.intro,
        serviceType: service.title,
        provider: { '@type': 'ProfessionalService', name: site.name, url: site.url },
        url: absolute(paths.service(service.slug)),
      },
    ],
    body: html`
      ${pageHero({
        crumbs,
        eyebrow: `Línea de negocio ${service.number}`,
        title: service.title,
        lead: service.intro,
        actions: [
          { href: paths.contact, label: site.cta.button, variant: 'primary' },
          { href: '#servicios', label: 'Ver servicios', variant: 'ghost-dark', iconName: null },
        ],
        aside: html`
          <div class="hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur lg:block">
            <div class="flex items-center justify-between">
              <span class="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-violet text-white shadow-[0_12px_30px_-12px] shadow-brand-blue/70">
                ${icon(service.icon, 'size-7')}
              </span>
              <span class="font-mono text-4xl font-light text-white/15">${service.number}</span>
            </div>
            <p class="mt-7 font-mono text-xs uppercase tracking-[0.2em] text-white/50">Énfasis de la línea</p>
            <ul class="mt-4 space-y-3">
              ${service.highlights.map(
                (h) => html`<li class="flex items-center gap-3 text-white/90">${icon('check', 'size-4 shrink-0 text-brand-cyan-light')} ${h}</li>`,
              )}
            </ul>
            <p class="mt-7 border-t border-white/10 pt-5 text-sm text-white/55">${service.items.length} servicios en esta línea</p>
          </div>
        `,
      })}

      ${section({
        id: 'servicios',
        tone: 'white',
        label: 'servicios-title',
        body: html`
          <div class="grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <div>
              ${sectionHeader({ id: 'servicios-title', eyebrow: 'Servicios', title: 'Qué hacemos en esta línea' })}
              <div class="mt-10">${checkList(service.items, { columns: 2 })}</div>
            </div>
            <div class="space-y-5 lg:pt-4">
              ${outcomeCard(service.outcome)}
              ${service.frameworks
                ? html`
                    <div class="rounded-3xl border border-line bg-canvas p-7" data-reveal>
                      <h3 class="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">${service.frameworksTitle}</h3>
                      ${chips(service.frameworks, { className: 'mt-4' })}
                    </div>
                  `
                : ''}
            </div>
          </div>
          ${extra.length ? html`<div class="${cx('mt-16 grid gap-6', extra.length > 1 && 'lg:grid-cols-2')}">${extra}</div>` : ''}
        `,
      })}

      ${relatedSolutions(service)}

      ${section({
        tone: 'white',
        label: 'otras-title',
        body: html`
          ${sectionHeader({ id: 'otras-title', eyebrow: 'Otras líneas de negocio', title: 'Capacidades que se conectan entre sí.' })}
          <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            ${others.map((s) => linkCard({ href: paths.service(s.slug), title: s.navTitle, text: s.short, iconName: s.icon }))}
          </div>
        `,
      })}

      ${ctaBand()}
    `,
  });
}
