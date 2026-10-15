import { animate, inView, stagger } from 'motion';

const root = document.documentElement;
const motionOn = root.classList.contains('motion');
const ease = [0.16, 1, 0.3, 1];
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

/* ---------- Cabecera: estado al hacer scroll ---------- */
const header = document.getElementById('site-header');
let menuOpen = false;
const syncHeader = () => header?.setAttribute('data-scrolled', String(!menuOpen && window.scrollY > 12));
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

/* ---------- Menús desplegables (escritorio) ---------- */
const dropdowns = $$('[data-dropdown]').map((item) => {
  const trigger = item.querySelector('[data-dropdown-trigger]');
  const panel = item.querySelector('[data-dropdown-panel]');
  let timer;
  const set = (open) => {
    clearTimeout(timer);
    panel.hidden = !open;
    trigger.setAttribute('aria-expanded', String(open));
  };
  const api = { item, open: () => (dropdowns.forEach((d) => d !== api && d.close()), set(true)), close: () => set(false) };

  trigger.addEventListener('click', () => (panel.hidden ? api.open() : api.close()));
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    item.addEventListener('pointerenter', () => {
      clearTimeout(timer);
      timer = setTimeout(api.open, 80);
    });
    item.addEventListener('pointerleave', () => {
      clearTimeout(timer);
      timer = setTimeout(api.close, 160);
    });
  }
  item.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) {
      api.close();
      trigger.focus();
    }
  });
  item.addEventListener('focusout', (event) => {
    if (!item.contains(event.relatedTarget)) api.close();
  });
  return api;
});
document.addEventListener('click', (event) => {
  dropdowns.forEach((d) => !d.item.contains(event.target) && d.close());
});

/* ---------- Menú móvil ---------- */
const mobileToggle = document.querySelector('[data-mobile-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const ICON_MENU =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" class="size-6" aria-hidden="true"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>';
const ICON_CLOSE =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" class="size-6" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';

function setMobileMenu(open) {
  if (!mobileMenu) return;
  menuOpen = open;
  mobileMenu.hidden = !open;
  header.classList.toggle('bg-ink-950', open);
  syncHeader();
  mobileToggle.setAttribute('aria-expanded', String(open));
  mobileToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  mobileToggle.innerHTML = open ? ICON_CLOSE : ICON_MENU;
  root.style.overflow = open ? 'hidden' : '';
  if (open && motionOn) {
    animate(mobileMenu, { opacity: [0, 1] }, { duration: 0.25 });
    animate($$('nav > *', mobileMenu), { opacity: [0, 1], y: [12, 0] }, { duration: 0.4, delay: stagger(0.04), ease });
  }
}
mobileToggle?.addEventListener('click', () => setMobileMenu(mobileMenu.hidden));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobileMenu && !mobileMenu.hidden) {
    setMobileMenu(false);
    mobileToggle.focus();
  }
});
window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => e.matches && setMobileMenu(false));

/* ---------- Tarjetas "spotlight": el brillo del borde sigue al puntero ---------- */
if (window.matchMedia('(pointer: fine)').matches) {
  let frame;
  document.addEventListener('pointermove', (event) => {
    const card = event.target.closest?.('.spotlight');
    if (!card) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--x', `${event.clientX - rect.left}px`);
      card.style.setProperty('--y', `${event.clientY - rect.top}px`);
    });
  });
}

/* ---------- Pestañas del modelo de intervención (patrón ARIA tabs) ---------- */
$$('[data-tabs]').forEach((widget) => {
  const tabs = $$('[data-tab]', widget);
  const panels = $$('[data-panel]', widget);
  const segments = $$('[data-segment]', widget);

  const select = (index, focus = false) => {
    tabs.forEach((tab, i) => {
      const active = i === index;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      panels[i].hidden = !active;
    });
    segments.forEach((seg, i) => seg.classList.toggle('is-active', i <= index));
    if (focus) tabs[index].focus();
    if (motionOn) {
      animate(panels[index], { opacity: [0, 1], y: [10, 0] }, { duration: 0.45, ease });
      animate($$('li', panels[index]), { opacity: [0, 1], x: [-8, 0] }, { duration: 0.4, delay: stagger(0.04, { startDelay: 0.08 }), ease });
    }
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(i));
    tab.addEventListener('keydown', (event) => {
      const last = tabs.length - 1;
      const next = {
        ArrowDown: i === last ? 0 : i + 1,
        ArrowRight: i === last ? 0 : i + 1,
        ArrowUp: i === 0 ? last : i - 1,
        ArrowLeft: i === 0 ? last : i - 1,
        Home: 0,
        End: last,
      }[event.key];
      if (next === undefined) return;
      event.preventDefault();
      select(next, true);
    });
  });
});

/* ---------- Filtro de soluciones ---------- */
$$('[data-filter]').forEach((widget) => {
  const buttons = $$('[data-filter-value]', widget);
  const cards = $$('[data-groups]', widget);
  const status = widget.querySelector('[data-filter-status]');

  buttons.forEach((btn) =>
    btn.addEventListener('click', () => {
      const value = btn.dataset.filterValue;
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      const visible = cards.filter((card) => {
        const show = value === 'todas' || card.dataset.groups.split(' ').includes(value);
        card.hidden = !show;
        return show;
      });
      status.textContent = `Mostrando ${visible.length} ${visible.length === 1 ? 'solución' : 'soluciones'}`;
      if (motionOn) {
        animate(visible, { opacity: [0, 1], y: [14, 0], scale: [0.98, 1] }, { duration: 0.45, delay: stagger(0.04), ease });
      }
    }),
  );
});

/* ---------- Formulario de contacto ---------- */
const form = document.querySelector('[data-contact-form]');
if (form) {
  const summary = document.querySelector('[data-form-summary]');
  const result = document.querySelector('[data-form-result]');
  const submit = form.querySelector('[data-submit]');
  const submitLabel = form.querySelector('[data-submit-label]');

  // Preselecciona el interés si se llega desde un CTA (?interes=... o ?solucion=...)
  const params = new URLSearchParams(window.location.search);
  const preset = params.get('interes') || params.get('solucion');
  const select = form.elements.interes;
  if (preset && [...select.options].some((o) => o.value === preset)) select.value = preset;

  const rules = {
    nombre: (v) => (v.trim().length >= 2 ? '' : 'Escriba su nombre completo.'),
    email: (v) =>
      !v.trim()
        ? 'Escriba su correo corporativo.'
        : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
          ? ''
          : 'Revise el formato del correo, por ejemplo: nombre@empresa.com',
    organizacion: (v) => (v.trim() ? '' : 'Indique el nombre de su organización.'),
    interes: (v) => (v ? '' : 'Seleccione el tema que más se acerque a su necesidad.'),
    mensaje: (v) =>
      v.trim().length >= 20 ? '' : `Cuéntenos un poco más (mínimo 20 caracteres; lleva ${v.trim().length}).`,
    consentimiento: (_, el) => (el.checked ? '' : 'Debe autorizar el tratamiento de datos para enviar la solicitud.'),
  };

  const validate = (name) => {
    const el = form.elements[name];
    const message = rules[name](el.value, el);
    const error = document.getElementById(`${name}-error`);
    el.setAttribute('aria-invalid', String(Boolean(message)));
    error.querySelector('span').textContent = message;
    error.classList.toggle('is-visible', Boolean(message));
    return message;
  };

  Object.keys(rules).forEach((name) => {
    const el = form.elements[name];
    const touch = () => (el.dataset.touched = 'true');
    el.addEventListener('blur', () => (touch(), validate(name)));
    el.addEventListener(el.type === 'checkbox' || el.tagName === 'SELECT' ? 'change' : 'input', () => {
      if (el.dataset.touched || el.getAttribute('aria-invalid') === 'true') validate(name);
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const errors = Object.keys(rules)
      .map((name) => ({ name, message: validate(name) }))
      .filter((e) => e.message);

    if (errors.length) {
      summary.innerHTML = `<p class="font-semibold">Revise ${errors.length === 1 ? 'el siguiente campo' : `los ${errors.length} campos marcados`}:</p><ul class="mt-2 list-disc space-y-1 pl-5">${errors
        .map((e) => `<li><a class="underline underline-offset-2" href="#${e.name}">${e.message}</a></li>`)
        .join('')}</ul>`;
      summary.classList.remove('hidden');
      summary.focus();
      return;
    }
    summary.classList.add('hidden');

    const showResult = (ok, text) => {
      result.className = `mt-6 rounded-2xl border p-5 ${ok ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-red-200 bg-red-50 text-red-800'}`;
      result.textContent = text;
      result.focus();
    };

    const endpoint = form.dataset.endpoint;
    if (!endpoint) {
      showResult(
        true,
        'Gracias. Su mensaje fue validado correctamente. Nota: este formulario aún no está conectado a un servicio de envío (configure formEndpoint en content/site.js).',
      );
      return;
    }

    submit.disabled = true;
    submitLabel.textContent = 'Enviando…';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      showResult(true, 'Gracias. Recibimos su mensaje y un arquitecto le contactará pronto.');
    } catch {
      showResult(false, 'No pudimos enviar su mensaje. Inténtelo de nuevo en unos minutos.');
    } finally {
      submit.disabled = false;
      submitLabel.textContent = 'Enviar mensaje';
    }
  });
}

/* ============================================================
   Animaciones (motion). Solo si no se pidió movimiento reducido.
   ============================================================ */
if (motionOn) {
  root.classList.add('motion-ready');

  // Titular del hero: palabra por palabra, con desenfoque que se disuelve
  const words = $$('[data-hero-headline] .hw');
  animate(
    words,
    { opacity: [0, 1], y: [26, 0], filter: ['blur(10px)', 'blur(0px)'] },
    { duration: 0.9, delay: stagger(0.06, { startDelay: 0.1 }), ease },
  );
  animate(
    $$('[data-hero-item]'),
    { opacity: [0, 1], y: [18, 0] },
    { duration: 0.8, delay: stagger(0.09, { startDelay: words.length ? 0.55 : 0.05 }), ease },
  );

  // Pila de arquitectura: se ensambla desde la base hasta el valor de negocio
  $$('[data-arch]').forEach((arch) => {
    inView(
      arch,
      () => {
        const foundation = arch.querySelector('[data-arch-foundation]');
        const layers = $$('[data-arch-layer]', arch).reverse();
        const value = arch.querySelector('[data-arch-value]');
        animate(foundation, { opacity: [0, 1], scaleX: [0.85, 1] }, { duration: 0.7, delay: 0.35, ease });
        animate(
          layers,
          { opacity: [0, 1], y: [34, 0], scale: [0.96, 1], filter: ['blur(6px)', 'blur(0px)'] },
          { duration: 0.8, delay: stagger(0.11, { startDelay: 0.5 }), ease },
        );
        animate(value, { opacity: [0, 1], y: [10, 0] }, { duration: 0.6, delay: 0.5 + layers.length * 0.11 + 0.25, ease });
      },
      { amount: 0.3 },
    );
  });

  // Ciclo de valor: recorrido secuencial de izquierda a derecha
  $$('[data-cycle]').forEach((cycle) => {
    inView(cycle, () => {
      animate($$('[data-cycle-item]', cycle), { opacity: [0, 1], x: [-10, 0] }, { duration: 0.5, delay: stagger(0.07, { startDelay: 0.3 }), ease });
    });
  });

  // Aurora: deriva lenta de los halos de color, pausada fuera de pantalla
  $$('[data-aurora]').forEach((blob, i) => {
    const drift = animate(
      blob,
      { x: [0, i % 2 ? -70 : 80, i % 2 ? 40 : -40, 0], y: [0, i % 2 ? 50 : -45, 30, 0], scale: [1, 1.08, 0.96, 1] },
      { duration: 24 + i * 7, repeat: Infinity, ease: 'easeInOut' },
    );
    drift.pause();
    inView(blob.parentElement, () => {
      drift.play();
      return () => drift.pause();
    });
  });

  // Revelado al hacer scroll: bloques sueltos
  $$('[data-reveal]').forEach((el) => {
    inView(el, () => animate(el, { opacity: [0, 1], y: [24, 0] }, { duration: 0.85, ease }), { amount: 0.15 });
  });

  // Revelado escalonado: elementos de un mismo grupo
  $$('[data-reveal-group]').forEach((group) => {
    const items = $$('[data-reveal-item]', group).filter((item) => item.closest('[data-reveal-group]') === group);
    inView(
      group,
      () => animate(items, { opacity: [0, 1], y: [22, 0] }, { duration: 0.7, delay: stagger(0.07), ease }),
      { amount: 0.1 },
    );
  });
}
