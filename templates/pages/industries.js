import { html } from '../html.js';
import { icon } from '../icons.js';
import { paths } from '../paths.js';
import { layout, breadcrumbJsonLd } from '../layout.js';
import { checkList, chips, ctaBand, industryCard, linkCard, pageHero, section, sectionHeader, solutionCard } from '../components.js';
import { serviceBySlug } from '../../content/services.js';
import { solutionBySlug } from '../../content/solutions.js';
import { industries, expansionVerticals } from '../../content/industries.js';

const baseCrumbs = [
  { href: paths.home, label: 'Inicio' },
  { href: paths.industries, label: 'Industrias' },
];

export function industriesIndexPage() {
  return layout({
    title: 'Industrias',
    description:
      'Datos, arquitectura e IA para energía y Oil & Gas, gobierno y sector público, y organizaciones empresariales de servicios.',
    path: paths.industries,
    section: 'industries',
    jsonLd: [breadcrumbJsonLd(baseCrumbs)],
    body: html`
      ${pageHero({
        crumbs: baseCrumbs,
        eyebrow: 'Industrias',
        title: 'Capacidades de datos e IA adaptadas a cada sector.',
        lead: 'Combinamos arquitectura, gobierno de datos, analítica e inteligencia artificial según los retos de cada industria.',
      })}
      ${section({
        tone: 'canvas',
        body: html`
          <div class="grid gap-5 lg:grid-cols-3" data-reveal-group>${industries.map((i) => industryCard(i))}</div>
        `,
      })}
      ${section({
        tone: 'white',
        label: 'expansion-title',
        body: html`
          <div class="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-20">
            ${sectionHeader({
              id: 'expansion-title',
              eyebrow: 'Verticales de expansión',
              title: 'Sectores en los que ampliamos nuestras capacidades.',
            })}
            <div data-reveal>${chips(expansionVerticals)}</div>
          </div>
        `,
      })}
      ${ctaBand()}
    `,
  });
}

export function industryPage(industry) {
  const crumbs = [...baseCrumbs, { href: paths.industry(industry.slug), label: industry.title }];
  const relatedServices = industry.services.map((slug) => serviceBySlug[slug]).filter(Boolean);
  const relatedSolutions = industry.solutions.map((slug) => solutionBySlug[slug]).filter(Boolean);

  return layout({
    title: industry.title,
    description: `${industry.intro} Capacidades: ${industry.capabilities.join(', ')}.`,
    path: paths.industry(industry.slug),
    section: 'industries',
    jsonLd: [breadcrumbJsonLd(crumbs)],
    body: html`
      ${pageHero({
        crumbs,
        eyebrow: 'Industria',
        title: industry.title,
        lead: industry.intro,
        actions: [{ href: paths.contact, label: 'Hablar con un arquitecto', variant: 'primary' }],
        aside: html`
          <div class="hidden justify-end lg:flex" aria-hidden="true">
            <span class="grid size-40 place-items-center rounded-[2.5rem] border border-white/10 bg-white/[0.04] text-brand-cyan-light backdrop-blur">
              ${icon(industry.icon, 'size-16 stroke-[1.25]')}
            </span>
          </div>
        `,
      })}

      ${section({
        tone: 'white',
        label: 'capacidades-title',
        body: html`
          <div class="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            ${sectionHeader({
              id: 'capacidades-title',
              eyebrow: 'Capacidades principales',
              title: 'Lo que aportamos al sector.',
            })}
            <div>${checkList(industry.capabilities, { columns: 2 })}</div>
          </div>
        `,
      })}

      ${section({
        tone: 'canvas',
        label: 'lineas-rel-title',
        body: html`
          ${sectionHeader({ id: 'lineas-rel-title', eyebrow: 'Líneas de negocio', title: 'Servicios más relevantes para el sector.' })}
          <div class="mt-12 grid gap-4 sm:grid-cols-2" data-reveal-group>
            ${relatedServices.map((s) => linkCard({ href: paths.service(s.slug), title: s.navTitle, text: s.short, iconName: s.icon }))}
          </div>
          <div class="mt-20">
            ${sectionHeader({ eyebrow: 'Soluciones sugeridas', title: 'Puntos de entrada recomendados.' })}
            <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
              ${relatedSolutions.map((s) => solutionCard(s))}
            </div>
          </div>
        `,
      })}

      ${ctaBand()}
    `,
  });
}
