# Design System — AnalytixIQ Systems (MASTER)

Fuente de verdad visual del sitio. Construido con la skill ui-ux-pro-max (patrón _Trust & Authority + Conversion_, estilo _Accessible & Ethical_) y ajustado a la marca.

## Dirección

- **B2B corporativo y elegante**: base navy (confianza), superficies claras para lectura, secciones oscuras para momentos de énfasis (hero, modelo de intervención, CTA, pie).
- **Degradado de marca con moderación**: los colores del logo (cian → azul → violeta → magenta) solo aparecen en acentos: palabras clave del titular, iconos de la pila de arquitectura, halos del hero, wordmark del pie. Nunca como fondo de bloques de texto.
- **Valor antes que tecnología**: cada página abre con el problema o el resultado; las tecnologías se muestran como experiencia (chips de texto), nunca con logos de terceros.

## Tokens (site/src/main.css → `@theme`)

| Rol | Token | Valor |
|---|---|---|
| Fondo oscuro | `ink-950` | `#060A17` |
| Superficies oscuras | `ink-900/800/700` | `#0A1024` / `#111A35` / `#1C274A` |
| Fondo claro | `canvas` | `#F6F7FB` |
| Bordes | `line` | `#E3E7F0` |
| CTA | `accent` / `accent-hover` | `#2F4BE0` / `#2339C2` (AA con blanco) |
| Marca | `brand-cyan/blue/violet/magenta` | `#19B6F2` `#3D5AF1` `#8B3BF0` `#EC3D8F` |
| Texto de marca sobre oscuro | `brand-*-light` | `#6FD3FA` `#8EA0FF` `#B78CFF` `#F68FBF` |

## Tipografía

- **Lexend** (títulos, `font-display`): geométrica, cercana al wordmark del logo.
- **Source Sans 3** (texto, `font-sans`): legible, base 16 px, interlineado 1.6.
- **JetBrains Mono** (etiquetas, duraciones, metadatos, `font-mono`): da el tono técnico/datos.

## Componentes

`button` (primary, secondary, ghost-dark), `eyebrow`, `sectionHeader`, `pageHero`, `serviceCard`, `solutionCard`, `industryCard`, `linkCard`, `chips`, `checkList`, `outcomeCard`, `architectureStack`, `cycleFlow`, `interventionStages` (pestañas ARIA), `solutionsExplorer` (filtro con `aria-pressed` + región viva), `ctaBand`, `placeholder`.

## Movimiento (motion)

- Hero: titular palabra a palabra (opacidad + desplazamiento + desenfoque), luego la pila de arquitectura se ensambla de la base al "Valor de negocio" y un pulso recorre la columna.
- Scroll: revelado suave y escalonado (0.7–0.85 s, `cubic-bezier(.16,1,.3,1)`).
- Aurora: deriva lenta de halos, pausada fuera de pantalla.
- `prefers-reduced-motion`: sin animaciones; el contenido se muestra en su estado final. Si el JS no carga, el contenido nunca queda oculto.

## Inspiración 21st.dev (reinterpretada en HTML + Tailwind)

Grainy Mesh Gradient / Aurora → fondo del hero · Bento Grid → líneas de negocio · Staged Progress Bar + Tabs (roving focus) → modelo de intervención · tarjetas con borde "spotlight" · Halftone Wordmark Footer → pie.

## Accesibilidad

Contraste ≥ 4.5:1, foco visible (azul sobre claro, cian sobre oscuro), enlace "Saltar al contenido", objetivos táctiles ≥ 44 px, menús con `aria-expanded` y Escape, formulario con etiquetas visibles, errores junto al campo y resumen enfocable.
