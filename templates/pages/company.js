// Páginas institucionales: Nosotros, Insights, Contacto y 404.
import { html, raw } from '../html.js';
import { icon } from '../icons.js';
import { paths, withBase } from '../paths.js';
import { layout, breadcrumbJsonLd } from '../layout.js';
import {
  architectureStack,
  button,
  chips,
  ctaBand,
  cycleFlow,
  interventionStages,
  linkCard,
  pageHero,
  placeholder,
  section,
  sectionHeader,
  textLink,
} from '../components.js';
import { site } from '../../content/site.js';
import { services } from '../../content/services.js';
import { solutions } from '../../content/solutions.js';

const home = { href: paths.home, label: 'Inicio' };

/* ---------- Nosotros ---------- */

export function aboutPage() {
  const crumbs = [home, { href: paths.about, label: 'Nosotros' }];
  return layout({
    title: 'Nosotros',
    description: `${site.name}: firma de ${site.positioning}. ${site.valueProposition}`,
    path: paths.about,
    section: 'about',
    jsonLd: [breadcrumbJsonLd(crumbs)],
    body: html`
      ${pageHero({
        crumbs,
        eyebrow: site.positioning,
        title: 'Un socio estratégico para convertir datos y tecnología en resultados.',
        lead: `${site.name} es una consultoría especializada en Arquitectura, Datos, Analítica, Inteligencia Artificial y Transformación Digital.`,
        meta: cycleFlow(site.cycle),
      })}

      ${section({
        tone: 'white',
        label: 'proposito-title',
        body: html`
          <div class="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              ${sectionHeader({
                id: 'proposito-title',
                eyebrow: 'Propuesta de valor',
                title: site.valueProposition,
              })}
              <div class="mt-8 space-y-5 text-lg leading-relaxed text-slate-600" data-reveal>
                ${site.mainMessageBody.map((p) => html`<p>${p}</p>`)}
                <p>
                  No somos una fábrica de software: el desarrollo, la automatización y la integración son capacidades habilitadoras
                  dentro de una propuesta de consultoría y transformación de mayor nivel.
                </p>
              </div>
            </div>
            <div class="rounded-3xl bg-ink-950 p-6 sm:p-10" data-reveal>
              <p class="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-white/55">Arquitectura conceptual del portafolio</p>
              ${architectureStack()}
            </div>
          </div>
        `,
      })}

      ${section({
        tone: 'canvas',
        label: 'capacidades-title',
        body: html`
          <div class="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            ${sectionHeader({
              id: 'capacidades-title',
              eyebrow: 'Lo que integramos',
              title: 'Capacidades conectadas, no soluciones aisladas.',
              lead: `Conectamos ${site.connects.join(' + ')}.`,
            })}
            <div data-reveal>${chips(site.capabilities)}</div>
          </div>
        `,
      })}

      <section class="relative isolate overflow-hidden bg-ink-950 py-20 text-white sm:py-28" aria-labelledby="modelo-title">
        <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          ${sectionHeader({
            id: 'modelo-title',
            eyebrow: 'Cómo trabajamos',
            title: 'Un ciclo de intervención de seis etapas.',
            tone: 'dark',
          })}
          <div class="mt-14" data-reveal>${interventionStages({ idPrefix: 'nosotros' })}</div>
        </div>
      </section>

      ${section({
        tone: 'white',
        label: 'principios-title',
        body: html`
          ${sectionHeader({ id: 'principios-title', eyebrow: 'Principios', title: 'Cómo entendemos la consultoría.' })}
          <ul class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            ${site.principles.map(
              (p, i) => html`
                <li class="rounded-2xl border border-line bg-canvas p-7" data-reveal-item>
                  <span class="font-mono text-sm text-accent">0${i + 1}</span>
                  <h3 class="mt-3 font-display text-lg font-medium text-ink-900">${p.title}</h3>
                  <p class="mt-2 leading-relaxed text-slate-600">${p.text}</p>
                </li>
              `,
            )}
          </ul>
        `,
      })}

      ${section({
        tone: 'canvas',
        label: 'audiencia-title',
        body: html`
          <div class="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              ${sectionHeader({
                id: 'audiencia-title',
                eyebrow: 'Con quién trabajamos',
                title: 'Interlocutores de negocio y de tecnología.',
                lead: 'Lenguaje ejecutivo para la alta dirección y profundidad técnica para los equipos de arquitectura, datos y TI.',
              })}
              <div class="mt-8" data-reveal>${chips(site.audience)}</div>
            </div>
            <div class="rounded-3xl border border-dashed border-slate-300 bg-white p-8" data-reveal>
              <span class="grid size-12 place-items-center rounded-xl bg-canvas text-ink-700">${icon('users', 'size-6')}</span>
              <h3 class="mt-6 font-display text-xl font-medium text-ink-900">Equipo</h3>
              <p class="mt-3 leading-relaxed text-slate-600">
                ${placeholder('perfiles del equipo directivo y de arquitectura (nombre, rol, trayectoria y fotografía)')}
              </p>
            </div>
          </div>
        `,
      })}

      ${ctaBand()}
    `,
  });
}

/* ---------- Insights ---------- */

export function insightsPage() {
  const crumbs = [home, { href: paths.insights, label: 'Insights' }];
  return layout({
    title: 'Insights',
    description: 'Perspectivas sobre arquitectura empresarial, gobierno de datos, plataformas modernas, analítica e inteligencia artificial.',
    path: paths.insights,
    section: 'insights',
    jsonLd: [breadcrumbJsonLd(crumbs)],
    body: html`
      ${pageHero({
        crumbs,
        eyebrow: 'Insights',
        title: 'Perspectivas sobre datos, arquitectura e inteligencia artificial.',
        lead: 'Pronto publicaremos análisis y guías prácticas sobre cada una de nuestras líneas de negocio.',
      })}
      ${section({
        tone: 'canvas',
        label: 'temas-title',
        body: html`
          <div class="flex flex-col gap-6 rounded-3xl border border-dashed border-slate-300 bg-white p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10" data-reveal>
            <div class="flex items-start gap-5">
              <span class="grid size-12 shrink-0 place-items-center rounded-xl bg-ink-950 text-brand-cyan-light">${icon('book', 'size-6')}</span>
              <div>
                <h2 class="font-display text-xl font-medium text-ink-900">Contenido en preparación</h2>
                <p class="mt-2 max-w-xl leading-relaxed text-slate-600">
                  Mientras tanto, conozca nuestras líneas de negocio o escríbanos con su pregunta.
                </p>
              </div>
            </div>
            ${button({ href: paths.contact, label: 'Escribirnos', variant: 'secondary' })}
          </div>

          <div class="mt-20">
            ${sectionHeader({ id: 'temas-title', eyebrow: 'Temas', title: 'Sobre qué escribiremos.' })}
            <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
              ${services.map((s) => linkCard({ href: paths.service(s.slug), title: s.navTitle, text: s.short, iconName: s.icon }))}
            </div>
          </div>
        `,
      })}
      ${ctaBand()}
    `,
  });
}

/* ---------- Contacto ---------- */

function field({ id, label, type = 'text', required, autocomplete, hint, as = 'input', options = [] }) {
  const hintId = hint ? `${id}-hint` : '';
  const describedBy = [hintId, `${id}-error`].filter(Boolean).join(' ');
  const common = raw(
    `id="${id}" name="${id}" ${required ? 'required aria-required="true"' : ''} ${autocomplete ? `autocomplete="${autocomplete}"` : ''} aria-describedby="${describedBy}"`,
  );
  let control;
  if (as === 'textarea') control = html`<textarea ${common} rows="5" class="field-control resize-y"></textarea>`;
  else if (as === 'select')
    control = html`
      <div class="relative">
        <select ${common} class="field-control cursor-pointer appearance-none pr-11">
          <option value="">Seleccione una opción</option>
          ${options.map((o) => html`<option value="${o.value}">${o.label}</option>`)}
        </select>
        ${icon('chevron-down', 'pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-slate-500')}
      </div>
    `;
  else control = html`<input type="${type}" ${common} class="field-control" />`;

  return html`
    <div class="field" data-field>
      <label for="${id}" class="block text-[0.95rem] font-semibold text-ink-900">
        ${label} ${required ? html`<span class="text-brand-magenta" aria-hidden="true">*</span>` : html`<span class="font-normal text-slate-500">(opcional)</span>`}
      </label>
      ${hint ? html`<p id="${hintId}" class="mt-1 text-sm text-slate-500">${hint}</p>` : ''}
      <div class="mt-2">${control}</div>
      <p id="${id}-error" class="field-error mt-2 hidden items-center gap-1.5 text-sm font-medium text-red-700" data-error>
        ${icon('alert-circle', 'size-4 shrink-0')} <span></span>
      </p>
    </div>
  `;
}

export function contactPage() {
  const crumbs = [home, { href: paths.contact, label: 'Contacto' }];
  const interestOptions = [
    ...site.cta.secondary.map((i) => ({ value: i.interest, label: i.label })),
    ...solutions.map((s) => ({ value: s.slug, label: `Solución: ${s.title}` })),
    { value: 'otro', label: 'Otro tema' },
  ];

  const contactLine = (iconName, value, label, href) => html`
    <li class="flex items-start gap-4">
      <span class="grid size-11 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-brand-cyan-light ring-1 ring-white/10">${icon(iconName, 'size-5')}</span>
      <span>
        <span class="block font-mono text-xs uppercase tracking-[0.18em] text-white/50">${label}</span>
        <span class="mt-1 block text-white/90">${value ? (href ? html`<a href="${href}" class="hover:text-white">${value}</a>` : value) : placeholder(label.toLowerCase(), 'dark')}</span>
      </span>
    </li>
  `;

  return layout({
    title: 'Contacto',
    description: `${site.cta.primary} Hable con un arquitecto de ${site.name}.`,
    path: paths.contact,
    section: 'contact',
    jsonLd: [breadcrumbJsonLd(crumbs)],
    body: html`
      ${pageHero({
        crumbs,
        eyebrow: 'Contacto',
        title: site.cta.primary,
        lead: 'Cuéntenos su contexto y le responderá un arquitecto. Sin compromisos: el primer paso es entender el problema.',
      })}

      <section class="bg-canvas py-20 sm:py-28" aria-labelledby="formulario-title">
        <div class="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:gap-16 lg:px-8">
          <aside class="relative h-fit overflow-hidden rounded-3xl bg-ink-950 p-8 text-white sm:p-10" data-reveal>
            <div class="pointer-events-none absolute -top-24 -right-20 size-72 rounded-full bg-brand-blue/30 blur-3xl" aria-hidden="true"></div>
            <div class="relative">
              <h2 class="font-display text-2xl font-medium tracking-tight">Hablemos</h2>
              <p class="mt-3 leading-relaxed text-white/70">${site.valueProposition}</p>
              <ul class="mt-8 space-y-6">
                ${contactLine('mail', site.contact.email, 'Correo', site.contact.email && `mailto:${site.contact.email}`)}
                ${contactLine('phone', site.contact.phone, 'Teléfono', site.contact.phoneHref)}
                ${contactLine('map-pin', site.contact.location, 'Ubicación')}
              </ul>
              <div class="mt-10 border-t border-white/10 pt-8">
                <p class="font-mono text-xs uppercase tracking-[0.18em] text-white/50">Un buen punto de partida</p>
                <div class="mt-3">${textLink({ href: paths.solution('data-ai-maturity-assessment'), label: 'Data & AI Maturity Assessment', tone: 'dark' })}</div>
              </div>
            </div>
          </aside>

          <div id="formulario" class="scroll-mt-28 rounded-3xl border border-line bg-white p-7 sm:p-10" data-reveal>
            <h2 id="formulario-title" class="font-display text-2xl font-medium tracking-tight text-ink-900">Cuéntenos su desafío</h2>
            <p class="mt-2 text-slate-600">Los campos marcados con <span class="text-brand-magenta">*</span> son obligatorios.</p>

            <div class="mt-6 hidden rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert" tabindex="-1" data-form-summary></div>

            <form class="mt-6 grid gap-6 sm:grid-cols-2" novalidate data-contact-form data-endpoint="${site.formEndpoint}">
              ${field({ id: 'nombre', label: 'Nombre completo', required: true, autocomplete: 'name' })}
              ${field({ id: 'email', label: 'Correo corporativo', type: 'email', required: true, autocomplete: 'email' })}
              ${field({ id: 'organizacion', label: 'Organización', required: true, autocomplete: 'organization' })}
              ${field({ id: 'cargo', label: 'Cargo', autocomplete: 'organization-title' })}
              <div class="sm:col-span-2">
                ${field({ id: 'interes', label: 'Tema de interés', as: 'select', required: true, options: interestOptions })}
              </div>
              <div class="sm:col-span-2">
                ${field({
                  id: 'mensaje',
                  label: 'Mensaje',
                  as: 'textarea',
                  required: true,
                  hint: 'Contexto, objetivo y plazos aproximados. Mínimo 20 caracteres.',
                })}
              </div>
              <div class="sm:col-span-2" data-field>
                <label class="flex cursor-pointer items-start gap-3 text-[0.95rem] text-slate-700">
                  <input type="checkbox" id="consentimiento" name="consentimiento" required aria-required="true" aria-describedby="consentimiento-error" class="mt-0.5 size-5 shrink-0 cursor-pointer rounded border-slate-300 accent-accent" />
                  <span>
                    Autorizo el tratamiento de mis datos para atender esta solicitud, según la
                    ${site.privacyPolicyUrl
                      ? html`<a href="${site.privacyPolicyUrl}" class="font-semibold text-accent underline underline-offset-2">política de tratamiento de datos</a>`
                      : html`política de tratamiento de datos ${placeholder('URL de la política')}`}.
                    <span class="text-brand-magenta" aria-hidden="true">*</span>
                  </span>
                </label>
                <p id="consentimiento-error" class="field-error mt-2 hidden items-center gap-1.5 text-sm font-medium text-red-700" data-error>
                  ${icon('alert-circle', 'size-4 shrink-0')} <span></span>
                </p>
              </div>
              <div class="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <button type="submit" class="btn btn-primary group/btn justify-center disabled:cursor-wait disabled:opacity-70" data-submit>
                  <span data-submit-label>Enviar mensaje</span>
                  ${icon('arrow-right', 'size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5')}
                </button>
                <p class="text-sm text-slate-500">Respondemos personalmente cada solicitud.</p>
              </div>
            </form>

            <div class="mt-6 hidden rounded-2xl border p-5" role="status" tabindex="-1" data-form-result></div>
          </div>
        </div>
      </section>
    `,
  });
}

/* ---------- 404 ---------- */

export function notFoundPage() {
  return layout({
    title: 'Página no encontrada',
    description: 'La página que busca no existe o fue movida.',
    path: withBase('404.html'),
    noindex: true,
    body: html`
      ${pageHero({
        eyebrow: 'Error 404',
        title: 'Esta ruta no forma parte de nuestra arquitectura.',
        lead: 'La página que busca no existe o fue movida. Estos enlaces pueden ayudarle a continuar.',
        actions: [
          { href: paths.home, label: 'Volver al inicio', variant: 'primary' },
          { href: paths.contact, label: 'Contacto', variant: 'ghost-dark', iconName: null },
        ],
      })}
    `,
  });
}
