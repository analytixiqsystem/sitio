// Componentes de presentación reutilizables. Solo reciben datos; el contenido vive en /content.
import { html, raw, cx } from './html.js';
import { icon } from './icons.js';
import { paths } from './paths.js';
import { site } from '../content/site.js';
import { serviceBySlug } from '../content/services.js';
import { interventionModel, architectureLayers, architectureFoundation } from '../content/model.js';
import { solutionGroups } from '../content/solutions.js';

/* ---------- Primitivas ---------- */

/** Dato corporativo pendiente: se muestra de forma visible para no inventar información. */
export const placeholder = (label, tone = 'light') =>
  html`<span class="${cx('placeholder', tone === 'dark' && 'placeholder-dark')}" title="Dato pendiente de completar">[Pendiente: ${label}]</span>`;

export const container = (body, className = '') =>
  html`<div class="${cx('mx-auto max-w-7xl px-5 sm:px-6 lg:px-8', className)}">${body}</div>`;

const sectionTones = {
  canvas: 'bg-canvas',
  white: 'bg-white',
  dark: 'bg-ink-950 text-white',
};

export function section({ id, tone = 'canvas', className = '', label, body }) {
  return html`
    <section
      ${id ? raw(`id="${id}"`) : ''}
      ${label ? raw(`aria-labelledby="${label}"`) : ''}
      class="${cx('relative scroll-mt-24 py-20 sm:py-28', sectionTones[tone], className)}"
    >
      ${container(body)}
    </section>
  `;
}

export const eyebrow = (text, tone = 'light') => html`
  <p class="${cx('eyebrow', tone === 'dark' && 'eyebrow-dark')}">${text}</p>
`;

export function sectionHeader({ id, eyebrow: kicker, title, lead, tone = 'light', align = 'left', className = '' }) {
  const dark = tone === 'dark';
  return html`
    <div class="${cx('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}" data-reveal>
      ${kicker ? eyebrow(kicker, tone) : ''}
      <h2
        ${id ? raw(`id="${id}"`) : ''}
        class="${cx('mt-4 font-display text-3xl font-medium tracking-tight text-balance sm:text-[2.6rem] sm:leading-[1.1]', dark ? 'text-white' : 'text-ink-900')}"
      >
        ${title}
      </h2>
      ${lead
        ? html`<p class="${cx('mt-5 text-lg leading-relaxed text-pretty', dark ? 'text-white/70' : 'text-slate-600')}">${lead}</p>`
        : ''}
    </div>
  `;
}

export function button({ href, label, variant = 'primary', iconName = 'arrow-right', className = '' }) {
  return html`
    <a href="${href}" class="${cx('btn group/btn', `btn-${variant}`, className)}">
      <span>${label}</span>
      ${iconName ? icon(iconName, 'size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5') : ''}
    </a>
  `;
}

export const textLink = ({ href, label, tone = 'light', className = '' }) => html`
  <a
    href="${href}"
    class="${cx(
      'group/link inline-flex min-h-11 items-center gap-2 font-semibold transition-colors duration-200',
      tone === 'dark' ? 'text-brand-cyan-light hover:text-white' : 'text-accent hover:text-accent-hover',
      className,
    )}"
  >
    ${label} ${icon('arrow-right', 'size-4 transition-transform duration-200 group-hover/link:translate-x-1')}
  </a>
`;

export function chips(items, { tone = 'light', mono = false, className = '' } = {}) {
  return html`
    <ul class="${cx('flex flex-wrap gap-2', className)}">
      ${items.map(
        (item) => html`<li class="${cx('chip', tone === 'dark' && 'chip-dark', mono && 'font-mono text-[0.8rem]')}">${item}</li>`,
      )}
    </ul>
  `;
}

export function checkList(items, { columns = 2, tone = 'light' } = {}) {
  const colClass = { 1: '', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3' }[columns];
  return html`
    <ul class="${cx('grid gap-x-8 gap-y-3', colClass)}" data-reveal-group>
      ${items.map(
        (item) => html`
          <li class="flex items-start gap-3" data-reveal-item>
            <span class="${cx('mt-0.5 grid size-6 shrink-0 place-items-center rounded-full', tone === 'dark' ? 'bg-white/10 text-brand-cyan-light' : 'bg-accent/10 text-accent')}">
              ${icon('check', 'size-3.5')}
            </span>
            <span class="${cx('text-[1.02rem] leading-snug', tone === 'dark' ? 'text-white/85' : 'text-slate-700')}">${item}</span>
          </li>
        `,
      )}
    </ul>
  `;
}

/* ---------- Fondos ---------- */

/** Fondo de aurora con grano, inspirado en los mesh gradients de 21st.dev, en colores de marca. */
export function aurora({ intensity = 'full' } = {}) {
  return html`
    <div class="aurora pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div class="aurora-grid absolute inset-0"></div>
      <div class="aurora-blob aurora-blob-1" data-aurora></div>
      ${intensity === 'full' ? html`<div class="aurora-blob aurora-blob-2" data-aurora></div>` : ''}
      <div class="aurora-blob aurora-blob-3" data-aurora></div>
      <div class="grain absolute inset-0"></div>
      <div class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950"></div>
    </div>
  `;
}

/* ---------- Cabeceras de página ---------- */

export function breadcrumbs(items) {
  return html`
    <nav aria-label="Ruta de navegación" class="mb-8">
      <ol class="flex flex-wrap items-center gap-1.5 text-sm text-white/55">
        ${items.map((item, i) => {
          const last = i === items.length - 1;
          return html`
            <li class="flex items-center gap-1.5">
              ${last
                ? html`<span aria-current="page" class="text-white/85">${item.label}</span>`
                : html`<a href="${item.href}" class="rounded transition-colors hover:text-white">${item.label}</a>${icon('chevron-right', 'size-3.5 text-white/35')}`}
            </li>
          `;
        })}
      </ol>
    </nav>
  `;
}

export function pageHero({ crumbs, eyebrow: kicker, title, lead, actions = [], aside, meta }) {
  return html`
    <section class="relative isolate overflow-hidden bg-ink-950 pt-[4.5rem] text-white">
      ${aurora({ intensity: 'soft' })}
      ${container(
        html`
          <div class="${cx('grid grid-cols-1 items-end gap-12 py-16 sm:py-20 lg:py-24', aside && 'lg:grid-cols-[1.4fr_1fr]')}">
            <div data-hero>
              ${crumbs ? breadcrumbs(crumbs) : ''}
              ${kicker ? html`<div data-hero-item>${eyebrow(kicker, 'dark')}</div>` : ''}
              <h1 class="mt-5 max-w-4xl font-display text-4xl leading-[1.08] font-medium tracking-tight text-balance sm:text-5xl lg:text-[3.6rem]" data-hero-item>
                ${title}
              </h1>
              ${lead ? html`<p class="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl" data-hero-item>${lead}</p>` : ''}
              ${meta ? html`<div class="mt-7" data-hero-item>${meta}</div>` : ''}
              ${actions.length
                ? html`<div class="mt-9 flex flex-wrap gap-3" data-hero-item>${actions.map((a) => button(a))}</div>`
                : ''}
            </div>
            ${aside ? html`<div data-hero-item>${aside}</div>` : ''}
          </div>
        `,
        'relative',
      )}
    </section>
  `;
}

/* ---------- Visual de arquitectura (hero del inicio) ---------- */

export function architectureStack() {
  return html`
    <figure class="arch relative mx-auto w-full max-w-[34rem] min-w-0" data-arch>
      <figcaption class="sr-only">
        Arquitectura conceptual del portafolio: Arquitectura, Integración e IoT, Plataformas de Datos, Analítica y BI e
        Inteligencia Artificial, sobre una base de gobierno, seguridad, calidad y FinOps, orientadas al valor de negocio.
      </figcaption>

      <div class="mb-4 flex justify-center" data-arch-value>
        <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-white backdrop-blur">
          ${icon('arrow-up-right', 'size-3.5 text-brand-cyan-light')} Valor de negocio
        </span>
      </div>

      <div class="relative">
        <div class="arch-spine absolute top-4 bottom-4 w-px" aria-hidden="true">
          <span class="arch-pulse" data-arch-pulse></span>
        </div>
        <ol class="relative space-y-2.5">
          ${architectureLayers.map(
            (layer, i) => html`
              <li class="arch-layer group/layer" style="--i:${i}" data-arch-layer>
                <span class="arch-node">${icon(layer.icon, 'size-[1.15rem]')}</span>
                <span class="min-w-0 flex-1">
                  <span class="block font-display text-[0.98rem] font-medium text-white">${layer.name}</span>
                  <span class="mt-1 block truncate font-mono text-[0.72rem] tracking-wide text-white/55">${layer.tags.join(' · ')}</span>
                </span>
                <span class="font-mono text-[0.7rem] text-white/35" aria-hidden="true">0${architectureLayers.length - i}</span>
              </li>
            `,
          )}
        </ol>
      </div>

      <div class="arch-foundation mt-3" data-arch-foundation>
        <span class="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-white/80">${architectureFoundation.join(' · ')}</span>
      </div>
    </figure>
  `;
}

/** Flujo horizontal de etapas: Estrategia → Arquitectura → ... */
export function cycleFlow(items, { tone = 'dark', label = 'Ciclo de valor' } = {}) {
  const dark = tone === 'dark';
  return html`
    <ol class="flex flex-wrap items-center gap-x-1.5 gap-y-2" aria-label="${label}" data-cycle>
      ${items.map(
        (item, i) => html`
          <li class="flex items-center gap-1.5" data-cycle-item>
            <span class="${cx('rounded-full px-3 py-1.5 font-mono text-[0.78rem] tracking-wide', dark ? 'bg-white/[0.06] text-white/85 ring-1 ring-white/10' : 'bg-white text-slate-700 ring-1 ring-line')}">${item}</span>
            ${i < items.length - 1 ? icon('chevron-right', cx('size-3.5', dark ? 'text-white/35' : 'text-slate-400')) : ''}
          </li>
        `,
      )}
    </ol>
  `;
}

/* ---------- Tarjetas ---------- */

export function serviceCard(service, { featured = false, tone = 'light' } = {}) {
  return html`
    <article class="${cx('card spotlight group/card flex h-full flex-col', featured && 'card-featured')}" data-reveal-item>
      <div class="flex items-start justify-between gap-4">
        <span class="icon-tile">${icon(service.icon, 'size-6')}</span>
        <span class="font-mono text-sm text-slate-400">${service.number}</span>
      </div>
      <h3 class="mt-7 font-display text-xl font-medium tracking-tight text-ink-900 ${featured ? 'sm:text-2xl' : ''}">
        <a href="${paths.service(service.slug)}" class="card-link">${service.title}</a>
      </h3>
      <p class="mt-3 leading-relaxed text-slate-600">${featured ? service.intro : service.short}</p>
      <ul class="mt-6 flex flex-wrap gap-2">
        ${service.highlights.map((h) => html`<li class="chip">${h}</li>`)}
      </ul>
      <span class="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-accent" aria-hidden="true">
        Explorar línea ${icon('arrow-right', 'size-4 transition-transform duration-200 group-hover/card:translate-x-1')}
      </span>
    </article>
  `;
}

export function solutionCard(solution) {
  const lines = solution.lines.map((slug) => serviceBySlug[slug]).filter(Boolean);
  return html`
    <article class="card spotlight group/card flex h-full flex-col" data-reveal-item data-groups="${solution.groups.join(' ')}">
      <div class="flex items-center justify-between gap-3">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-ink-950 px-3 py-1 font-mono text-[0.72rem] tracking-wide text-white">
          ${icon('clock', 'size-3.5 text-brand-cyan-light')} ${solution.duration}
        </span>
        <span class="font-mono text-xs text-slate-500">${solution.deliverables.length} ${solution.deliverablesTitle ? 'frentes' : 'entregables'}</span>
      </div>
      <h3 class="mt-6 font-display text-[1.2rem] font-medium tracking-tight text-ink-900">
        <a href="${paths.solution(solution.slug)}" class="card-link">${solution.title}</a>
      </h3>
      <p class="mt-3 text-[0.98rem] leading-relaxed text-slate-600">${solution.summary}</p>
      <ul class="mt-5 space-y-2 border-t border-line pt-5">
        ${solution.deliverables.slice(0, 3).map(
          (d) => html`<li class="flex items-center gap-2.5 text-sm text-slate-700">${icon('check', 'size-4 shrink-0 text-accent')} ${d}</li>`,
        )}
        ${solution.deliverables.length > 3
          ? html`<li class="pl-6 text-sm text-slate-500">+ ${solution.deliverables.length - 3} más</li>`
          : ''}
      </ul>
      <p class="mt-auto pt-6 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-slate-500">${lines.map((l) => l.navTitle).join(' · ')}</p>
    </article>
  `;
}

export function industryCard(industry, { tone = 'light' } = {}) {
  return html`
    <article class="card spotlight group/card flex h-full flex-col" data-reveal-item>
      <span class="icon-tile">${icon(industry.icon, 'size-6')}</span>
      <h3 class="mt-7 font-display text-xl font-medium tracking-tight text-ink-900">
        <a href="${paths.industry(industry.slug)}" class="card-link">${industry.title}</a>
      </h3>
      <p class="mt-3 leading-relaxed text-slate-600">${industry.short}</p>
      <ul class="mt-6 flex flex-wrap gap-2">
        ${industry.capabilities.slice(0, 5).map((c) => html`<li class="chip">${c}</li>`)}
      </ul>
      <span class="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-accent" aria-hidden="true">
        Ver industria ${icon('arrow-right', 'size-4 transition-transform duration-200 group-hover/card:translate-x-1')}
      </span>
    </article>
  `;
}

/** Tarjeta compacta para listas de enlaces relacionados. */
export const linkCard = ({ href, title, text, iconName, meta }) => html`
  <a href="${href}" class="card spotlight group/card flex h-full items-start gap-4 !p-5" data-reveal-item>
    ${iconName ? html`<span class="icon-tile !size-11">${icon(iconName, 'size-5')}</span>` : ''}
    <span class="min-w-0 flex-1">
      <span class="flex items-center justify-between gap-3 font-display text-[1.02rem] font-medium text-ink-900">
        ${title} ${icon('arrow-right', 'size-4 shrink-0 text-accent transition-transform duration-200 group-hover/card:translate-x-1')}
      </span>
      ${text ? html`<span class="mt-1 block text-sm leading-snug text-slate-600">${text}</span>` : ''}
      ${meta ? html`<span class="mt-2 block font-mono text-xs text-slate-500">${meta}</span>` : ''}
    </span>
  </a>
`;

/* ---------- Modelo de intervención (pestañas con progreso por etapas) ---------- */

export function interventionStages({ idPrefix = 'etapa' } = {}) {
  const total = interventionModel.length;
  return html`
    <div class="stages grid gap-8 lg:grid-cols-[22rem_1fr] lg:gap-12" data-tabs>
      <div role="tablist" aria-label="Etapas del modelo de intervención" aria-orientation="vertical" class="grid grid-cols-2 content-start gap-2 self-start sm:grid-cols-3 lg:grid-cols-1">
        ${interventionModel.map(
          (stage, i) => html`
            <button
              type="button"
              role="tab"
              id="${idPrefix}-tab-${stage.id}"
              aria-controls="${idPrefix}-panel-${stage.id}"
              aria-selected="${i === 0 ? 'true' : 'false'}"
              tabindex="${i === 0 ? '0' : '-1'}"
              class="stage-tab"
              data-tab
            >
              <span class="font-mono text-xs text-white/45 [[aria-selected=true]>&]:text-brand-cyan-light">0${i + 1}</span>
              <span class="font-display text-[1.02rem] font-medium">${stage.name}</span>
              <span class="ml-auto hidden text-sm text-white/45 lg:inline">${stage.verb}</span>
            </button>
          `,
        )}
      </div>

      <div class="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-7 backdrop-blur sm:p-10">
        <div class="flex gap-1.5" aria-hidden="true">
          ${interventionModel.map((_, i) => html`<span class="stage-segment ${i === 0 ? 'is-active' : ''}" data-segment></span>`)}
        </div>
        ${interventionModel.map(
          (stage, i) => html`
            <div
              role="tabpanel"
              id="${idPrefix}-panel-${stage.id}"
              aria-labelledby="${idPrefix}-tab-${stage.id}"
              tabindex="0"
              class="pt-10 focus-visible:outline-none"
              ${i === 0 ? '' : raw('hidden')}
              data-panel
            >
              <div class="flex items-center gap-4">
                <span class="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-violet text-white shadow-[0_10px_30px_-10px] shadow-brand-blue/60">
                  ${icon(stage.icon, 'size-6')}
                </span>
                <div>
                  <p class="font-mono text-xs uppercase tracking-[0.2em] text-white/50">Etapa ${i + 1} de ${total} · ${stage.verb}</p>
                  <h3 class="mt-1 font-display text-2xl font-medium tracking-tight text-white sm:text-3xl">${stage.name}</h3>
                </div>
              </div>
              <p class="mt-6 max-w-xl text-lg leading-relaxed text-white/75">${stage.summary}</p>
              <ul class="mt-8 grid gap-3 sm:grid-cols-2">
                ${stage.items.map(
                  (item) => html`
                    <li class="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white/90">
                      ${icon('check', 'size-4 shrink-0 text-brand-cyan-light')} ${item}
                    </li>
                  `,
                )}
              </ul>
            </div>
          `,
        )}
      </div>
    </div>
  `;
}

/* ---------- Explorador de soluciones con filtro ---------- */

export function solutionsExplorer(list) {
  return html`
    <div data-filter>
      <div class="flex flex-wrap gap-2" role="group" aria-label="Filtrar soluciones por área">
        ${solutionGroups.map(
          (g, i) => html`
            <button type="button" class="filter-btn" aria-pressed="${i === 0 ? 'true' : 'false'}" data-filter-value="${g.id}">${g.label}</button>
          `,
        )}
      </div>
      <p class="mt-5 text-sm text-slate-500" aria-live="polite" data-filter-status>Mostrando ${list.length} soluciones</p>
      <div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group data-filter-grid>
        ${list.map((s) => solutionCard(s))}
      </div>
    </div>
  `;
}

/* ---------- Llamado a la acción ---------- */

export function ctaBand({ title = site.cta.primary, lead, interests = site.cta.secondary } = {}) {
  return html`
    <section class="relative isolate overflow-hidden bg-ink-950 py-24 text-white sm:py-32" aria-labelledby="cta-title">
      ${aurora()}
      ${container(
        html`
          <div class="mx-auto max-w-4xl text-center" data-reveal>
            ${eyebrow(site.tagline, 'dark')}
            <h2 id="cta-title" class="mt-5 font-display text-3xl leading-[1.1] font-medium tracking-tight text-balance sm:text-5xl">${title}</h2>
            ${lead ? html`<p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">${lead}</p>` : ''}
            <div class="mt-10 flex flex-wrap justify-center gap-3">
              ${button({ href: paths.contact, label: site.cta.button, variant: 'primary' })}
              ${button({ href: paths.solutions, label: 'Ver soluciones', variant: 'ghost-dark', iconName: null })}
            </div>
          </div>
          ${interests.length
            ? html`
                <ul class="mx-auto mt-14 flex max-w-4xl flex-wrap justify-center gap-2.5" aria-label="Temas frecuentes" data-reveal-group>
                  ${interests
                    .filter((i) => i.interest !== 'hablar-arquitecto')
                    .map(
                      (i) => html`
                        <li data-reveal-item>
                          <a href="${paths.contactWith(i.interest)}" class="interest-link">
                            ${i.label} ${icon('arrow-up-right', 'size-3.5')}
                          </a>
                        </li>
                      `,
                    )}
                </ul>
              `
            : ''}
        `,
        'relative',
      )}
    </section>
  `;
}

/* ---------- Bloque "Resultado esperado" ---------- */

export const outcomeCard = (text, title = 'Resultado esperado') => html`
  <div class="relative overflow-hidden rounded-3xl bg-ink-950 p-8 text-white sm:p-10" data-reveal>
    <div class="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-brand-violet/30 blur-3xl" aria-hidden="true"></div>
    <div class="pointer-events-none absolute -bottom-28 -left-10 size-64 rounded-full bg-brand-cyan/20 blur-3xl" aria-hidden="true"></div>
    <div class="relative">
      <span class="grid size-12 place-items-center rounded-xl bg-white/10 text-brand-cyan-light">${icon('target', 'size-6')}</span>
      <p class="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-white/55">${title}</p>
      <p class="mt-3 font-display text-xl leading-snug font-light text-white sm:text-2xl">${text}</p>
    </div>
  </div>
`;
