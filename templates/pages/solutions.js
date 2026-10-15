import { html } from '../html.js';
import { icon } from '../icons.js';
import { paths } from '../paths.js';
import { layout, breadcrumbJsonLd, absolute } from '../layout.js';
import { ctaBand, linkCard, pageHero, section, sectionHeader, solutionCard, solutionsExplorer } from '../components.js';
import { site } from '../../content/site.js';
import { serviceBySlug } from '../../content/services.js';
import { solutions } from '../../content/solutions.js';

const baseCrumbs = [
  { href: paths.home, label: 'Inicio' },
  { href: paths.solutions, label: 'Soluciones' },
];

export function solutionsIndexPage() {
  return layout({
    title: 'Soluciones',
    description:
      'Ofertas empaquetadas con alcance y entregables definidos: Data & AI Maturity Assessment, Data Governance Accelerator, Microsoft Fabric Readiness, Power BI Governance, AI Opportunity Radar y más.',
    path: paths.solutions,
    section: 'solutions',
    jsonLd: [breadcrumbJsonLd(baseCrumbs)],
    body: html`
      ${pageHero({
        crumbs: baseCrumbs,
        eyebrow: 'Soluciones',
        title: 'Ofertas con alcance, duración y entregables definidos.',
        lead: 'Puntos de entrada concretos para evaluar, diseñar y poner en marcha capacidades de datos, arquitectura e IA.',
        actions: [{ href: paths.contactWith('madurez-datos-ia'), label: 'Evaluar la madurez de datos e IA', variant: 'primary' }],
      })}
      ${section({ tone: 'canvas', body: solutionsExplorer(solutions) })}
      ${ctaBand()}
    `,
  });
}

export function solutionPage(solution) {
  const crumbs = [...baseCrumbs, { href: paths.solution(solution.slug), label: solution.title }];
  const lines = solution.lines.map((slug) => serviceBySlug[slug]).filter(Boolean);
  const others = solutions
    .filter((s) => s.slug !== solution.slug && s.groups.some((g) => solution.groups.includes(g)))
    .slice(0, 3);

  const meta = html`
    <dl class="flex flex-wrap gap-3">
      <div class="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm">
        ${icon('clock', 'size-4 text-brand-cyan-light')}
        <dt class="text-white/60">${solution.durationLabel || 'Duración orientativa'}:</dt>
        <dd class="font-semibold text-white">${solution.duration}</dd>
      </div>
      <div class="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm">
        ${icon('file', 'size-4 text-brand-cyan-light')}
        <dt class="text-white/60">${solution.deliverablesTitle || 'Entregables'}:</dt>
        <dd class="font-semibold text-white">${solution.deliverables.length}</dd>
      </div>
    </dl>
  `;

  return layout({
    title: solution.title,
    description: `${solution.summary} Duración orientativa: ${solution.duration}.`,
    path: paths.solution(solution.slug),
    section: 'solutions',
    jsonLd: [
      breadcrumbJsonLd(crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: solution.title,
        description: solution.summary,
        provider: { '@type': 'ProfessionalService', name: site.name, url: site.url },
        url: absolute(paths.solution(solution.slug)),
      },
    ],
    body: html`
      ${pageHero({
        crumbs,
        eyebrow: 'Solución',
        title: solution.title,
        lead: solution.summary,
        meta,
        actions: [{ href: `${paths.contact}?solucion=${solution.slug}#formulario`, label: 'Solicitar esta solución', variant: 'primary' }],
      })}

      ${section({
        tone: 'white',
        label: 'entregables-title',
        body: html`
          <div class="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div>
              ${sectionHeader({
                id: 'entregables-title',
                eyebrow: solution.deliverablesTitle || 'Entregables',
                title: solution.deliverablesTitle ? '¿En qué puede acompañarle?' : '¿Qué recibe su organización?',
              })}
              <ol class="mt-10 grid gap-3 sm:grid-cols-2" data-reveal-group>
                ${solution.deliverables.map(
                  (d, i) => html`
                    <li class="flex items-center gap-4 rounded-2xl border border-line bg-canvas p-4" data-reveal-item>
                      <span class="grid size-10 shrink-0 place-items-center rounded-xl bg-ink-950 font-mono text-sm text-brand-cyan-light">${String(i + 1).padStart(2, '0')}</span>
                      <span class="font-medium text-ink-900">${d}</span>
                    </li>
                  `,
                )}
              </ol>
            </div>
            <aside class="space-y-5 lg:pt-4" aria-label="Líneas de negocio relacionadas">
              <div class="rounded-3xl border border-line bg-canvas p-7" data-reveal>
                <h3 class="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">Líneas de negocio relacionadas</h3>
                <div class="mt-5 grid gap-3" data-reveal-group>
                  ${lines.map((l) => linkCard({ href: paths.service(l.slug), title: l.navTitle, iconName: l.icon }))}
                </div>
              </div>
            </aside>
          </div>
        `,
      })}

      ${others.length
        ? section({
            tone: 'canvas',
            label: 'otras-soluciones-title',
            body: html`
              ${sectionHeader({ id: 'otras-soluciones-title', eyebrow: 'También le puede interesar', title: 'Soluciones relacionadas' })}
              <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>${others.map((s) => solutionCard(s))}</div>
            `,
          })
        : ''}

      ${ctaBand()}
    `,
  });
}
