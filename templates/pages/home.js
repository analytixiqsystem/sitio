import { html, cx } from '../html.js';
import { icon } from '../icons.js';
import { paths } from '../paths.js';
import { layout, organizationJsonLd } from '../layout.js';
import {
  aurora,
  architectureStack,
  button,
  chips,
  container,
  ctaBand,
  cycleFlow,
  eyebrow,
  industryCard,
  interventionStages,
  section,
  sectionHeader,
  serviceCard,
  solutionCard,
  textLink,
} from '../components.js';
import { site } from '../../content/site.js';
import { services } from '../../content/services.js';
import { solutions } from '../../content/solutions.js';
import { industries, expansionVerticals } from '../../content/industries.js';

/** Divide un titular en palabras animables; `highlight` se anima como una sola pieza con degradado de marca. */
function heroHeadline(before, highlight, after) {
  const words = (text) => text.split(' ').filter(Boolean).map((w) => html`<span class="hw">${w}</span> `);
  return html`${words(before)}<span class="hw text-brand-gradient">${highlight}</span> ${words(after)}`;
}

function hero() {
  return html`
    <section class="relative isolate overflow-hidden bg-ink-950 pt-[4.5rem] text-white" aria-labelledby="hero-title">
      ${aurora()}
      ${container(
        html`
          <div class="grid grid-cols-1 items-center gap-14 pt-14 pb-16 sm:pt-20 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:pt-24 lg:pb-24">
            <div data-hero>
              <div data-hero-item>${eyebrow(site.positioning, 'dark')}</div>
              <h1
                id="hero-title"
                class="mt-6 font-display text-[2.6rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance sm:text-6xl lg:text-[4.1rem]"
                data-hero-headline
              >
                ${heroHeadline('Transformamos datos en', 'decisiones', '')}
                ${heroHeadline('y tecnología en', 'capacidades de negocio.', '')}
              </h1>
              <p class="mt-7 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl" data-hero-item>${site.mainMessageBody[0]}</p>
              <div class="mt-10 flex flex-wrap gap-3" data-hero-item>
                ${button({ href: paths.contact, label: 'Conversemos sobre su desafío', variant: 'primary' })}
                ${button({ href: paths.solution('data-ai-maturity-assessment'), label: 'Evaluar la madurez de datos e IA', variant: 'ghost-dark', iconName: null })}
              </div>
              <p class="mt-10 flex items-center gap-3 font-mono text-[0.78rem] uppercase tracking-[0.2em] text-white/55" data-hero-item>
                <span class="h-px w-8 bg-gradient-to-r from-brand-cyan to-brand-magenta"></span>${site.tagline}
              </p>
            </div>
            <div class="relative">${architectureStack()}</div>
          </div>

          <div class="flex flex-col gap-5 border-t border-white/10 py-8 lg:flex-row lg:items-center lg:justify-between" data-hero-item>
            <p class="shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-white/50">Cubrimos el ciclo completo</p>
            ${cycleFlow(site.cycle)}
          </div>
        `,
        'relative',
      )}
    </section>
  `;
}

function challenge() {
  return section({
    id: 'reto',
    tone: 'white',
    label: 'reto-title',
    body: html`
      <div class="grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
        <div class="lg:sticky lg:top-28 lg:self-start">
          ${sectionHeader({
            id: 'reto-title',
            eyebrow: 'El reto',
            title: 'La tecnología aislada no se convierte en capacidad.',
            lead: 'Evitamos soluciones tecnológicas aisladas. Conectamos cada iniciativa con el negocio, los procesos, los datos y el gobierno que la hacen sostenible.',
          })}
          <div class="mt-10" data-reveal>
            <p class="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">Lo que conectamos</p>
            <ul class="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2.5">
              ${site.connects.map(
                (item, i) => html`
                  <li class="flex items-center gap-2">
                    <span class="rounded-lg border border-line bg-canvas px-3 py-1.5 text-[0.95rem] font-medium text-ink-900">${item}</span>
                    ${i < site.connects.length - 1 ? icon('plus', 'size-3.5 text-slate-400') : ''}
                  </li>
                `,
              )}
            </ul>
          </div>
        </div>
        <ul class="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2" data-reveal-group>
          ${site.problems.map(
            (p) => html`
              <li class="group/problem bg-white p-7 transition-colors duration-300 hover:bg-canvas sm:p-8" data-reveal-item>
                <span class="grid size-11 place-items-center rounded-xl bg-canvas text-ink-700 ring-1 ring-line transition-colors duration-300 group-hover/problem:bg-ink-950 group-hover/problem:text-brand-cyan-light group-hover/problem:ring-ink-950">
                  ${icon(p.icon, 'size-5')}
                </span>
                <h3 class="mt-6 font-display text-lg font-medium text-ink-900">${p.title}</h3>
                <p class="mt-2 leading-relaxed text-slate-600">${p.text}</p>
              </li>
            `,
          )}
        </ul>
      </div>
    `,
  });
}

function businessLines() {
  return section({
    id: 'lineas',
    tone: 'canvas',
    label: 'lineas-title',
    body: html`
      <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        ${sectionHeader({
          id: 'lineas-title',
          eyebrow: 'Seis líneas de negocio',
          title: 'De la estrategia a la operación, en una sola arquitectura.',
          lead: site.valueProposition,
        })}
        <div class="shrink-0" data-reveal>${textLink({ href: paths.services, label: 'Ver todos los servicios' })}</div>
      </div>
      <div class="bento mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-12" data-reveal-group>
        ${services.map((s, i) => html`<div class="${cx(i < 2 ? 'lg:col-span-6' : 'lg:col-span-3')}">${serviceCard(s, { featured: i < 2 })}</div>`)}
      </div>
    `,
  });
}

function model() {
  return html`
    <section id="modelo" class="relative isolate overflow-hidden bg-ink-950 py-20 text-white sm:py-28" aria-labelledby="modelo-title">
      ${aurora({ intensity: 'soft' })}
      ${container(
        html`
          <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            ${sectionHeader({
              id: 'modelo-title',
              eyebrow: 'Modelo de intervención',
              title: 'Seis etapas para pasar del diagnóstico a la capacidad en operación.',
              lead: 'Diferenciamos estrategia, arquitectura e implementación, y las conectamos en un mismo ciclo.',
              tone: 'dark',
            })}
          </div>
          <div class="mt-14" data-reveal>${interventionStages()}</div>
        `,
        'relative',
      )}
    </section>
  `;
}

function featuredSolutions() {
  const featured = solutions.filter((s) => s.featured);
  return section({
    id: 'soluciones',
    tone: 'white',
    label: 'soluciones-title',
    body: html`
      <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        ${sectionHeader({
          id: 'soluciones-title',
          eyebrow: 'Ofertas empaquetadas',
          title: 'Puntos de entrada con alcance, duración y entregables claros.',
          lead: 'Comience con un diagnóstico acotado y avance con una hoja de ruta priorizada.',
        })}
        <div class="shrink-0" data-reveal>${textLink({ href: paths.solutions, label: `Ver las ${solutions.length} soluciones` })}</div>
      </div>
      <div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>${featured.map((s) => solutionCard(s))}</div>
    `,
  });
}

function industriesBlock() {
  return section({
    id: 'industrias',
    tone: 'canvas',
    label: 'industrias-title',
    body: html`
      <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        ${sectionHeader({
          id: 'industrias-title',
          eyebrow: 'Industrias',
          title: 'Experiencia donde los datos operan infraestructura crítica.',
        })}
        <div class="shrink-0" data-reveal>${textLink({ href: paths.industries, label: 'Ver industrias' })}</div>
      </div>
      <div class="mt-14 grid gap-5 lg:grid-cols-3" data-reveal-group>${industries.map((i) => industryCard(i))}</div>
      <div class="mt-10 flex flex-col gap-4 rounded-2xl border border-dashed border-slate-300 p-6 sm:flex-row sm:items-center" data-reveal>
        <p class="shrink-0 font-mono text-xs uppercase tracking-[0.18em] text-slate-500">Verticales de expansión</p>
        ${chips(expansionVerticals)}
      </div>
    `,
  });
}

function expertise() {
  return section({
    id: 'experiencia',
    tone: 'white',
    label: 'experiencia-title',
    body: html`
      <div class="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          ${sectionHeader({
            id: 'experiencia-title',
            eyebrow: 'Marcos y tecnologías',
            title: 'Rigor metodológico y experiencia en plataformas líderes.',
            lead: 'Aplicamos marcos de referencia reconocidos y trabajamos con las plataformas que ya usa su organización. Las tecnologías se eligen por su ajuste al contexto, no al revés.',
          })}
          <div class="mt-10 space-y-8" data-reveal>
            <div>
              <h3 class="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">Marcos de referencia</h3>
              ${chips(site.frameworks, { className: 'mt-4' })}
            </div>
            <div>
              <h3 class="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">Experiencia tecnológica</h3>
              ${chips(site.technologies, { className: 'mt-4' })}
            </div>
          </div>
        </div>
        <div>
          <ul class="grid gap-4 sm:grid-cols-2" data-reveal-group>
            ${site.principles.map(
              (p, i) => html`
                <li class="rounded-2xl border border-line bg-canvas p-6" data-reveal-item>
                  <span class="font-mono text-sm text-accent">0${i + 1}</span>
                  <h3 class="mt-3 font-display text-lg font-medium text-ink-900">${p.title}</h3>
                  <p class="mt-2 text-[0.98rem] leading-relaxed text-slate-600">${p.text}</p>
                </li>
              `,
            )}
          </ul>
        </div>
      </div>
    `,
  });
}

export function homePage() {
  return layout({
    title: site.positioning,
    description: site.description,
    path: paths.home,
    section: 'home',
    jsonLd: [organizationJsonLd()],
    body: html`
      ${hero()} ${challenge()} ${businessLines()} ${model()} ${featuredSolutions()} ${industriesBlock()} ${expertise()}
      ${ctaBand({ lead: site.mainMessageBody[1] })}
    `,
  });
}
