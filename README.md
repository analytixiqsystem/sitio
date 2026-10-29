# AnalytixIQ Systems — sitio web

Sitio corporativo estático de **AnalytixIQ Systems** (_Datos que inspiran, información que transforma._), construido con HTML + Tailwind CSS 4 + [motion](https://motion.dev) y empaquetado con Vite.

## Uso

```bash
npm install
npm run dev       # servidor local con recarga → http://127.0.0.1:5173/sitio/
npm run build     # sitio listo para publicar en /dist
npm run preview   # sirve /dist localmente (también bajo /sitio/)
```

## Publicación en GitHub Pages

El sitio se publica en `https://<usuario>.github.io/sitio/`. La subcarpeta `/sitio/` está definida en `content/site.js` (`basePath`) y **debe coincidir con el nombre del repositorio**.

1. Crear en GitHub un repositorio llamado `sitio` (vacío, sin README).
2. Subir el código:
   ```bash
   git remote add origin https://github.com/<usuario>/sitio.git
   git push -u origin main
   ```
3. En el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. El flujo `.github/workflows/deploy.yml` compila y publica en cada `push` a `main` (pestaña **Actions**). También se puede lanzar a mano con **Run workflow**.

Si algún día se usa un dominio propio, basta con compilar con `BASE_PATH=/` y `SITE_URL=https://www.su-dominio.com/`.

## Estructura

```
content/      Contenido del negocio (datos puros, sin HTML)
  site.js         identidad, mensajes, CTA, contacto, marcos y tecnologías
  services.js     6 líneas de negocio
  solutions.js    12 ofertas empaquetadas
  industries.js   industrias objetivo y verticales de expansión
  model.js        modelo de intervención (6 etapas) y arquitectura conceptual
templates/    Presentación
  components.js   componentes reutilizables (tarjetas, hero, CTA, pestañas, filtro…)
  layout.js       documento, SEO, cabecera con menús y pie
  pages/          una función por tipo de página
scripts/generate.mjs   convierte contenido + plantillas en HTML estático dentro de /site
site/
  src/main.css    tokens de diseño (Tailwind @theme) y estilos de componentes
  src/main.js     interacción y animaciones (motion)
  public/brand/   logo procesado (icono con transparencia, favicons)
brand/logo-original.png   logo original recibido
design-system/MASTER.md   decisiones de diseño (fuente de verdad visual)
```

Las páginas HTML de `/site` se **generan**: no se editan a mano. Para cambiar textos, edite `/content`; para cambiar diseño, edite `/templates` o `site/src`.

### Añadir una página de servicio, solución o industria

Agregue un objeto al arreglo correspondiente en `/content`. La página, los menús, el pie, el sitemap y los enlaces relacionados se generan solos.

## Pendientes antes de publicar

Los datos corporativos que no estaban en el documento de portafolio se muestran en el sitio como **`[Pendiente: …]`** (recuadro naranja). Complételos en `content/site.js`:

- `contact.linkedin`
- `formEndpoint`: servicio que recibe el formulario (Formspree, Power Automate, API propia…). Sin él, el formulario valida pero no envía. GitHub Pages solo sirve archivos estáticos, así que el envío debe hacerlo un servicio externo.
- `privacyPolicyUrl`: política de tratamiento de datos
- Equipo directivo (página Nosotros)
- Logo en formato vectorial (SVG): el icono actual se recortó del PNG recibido y el nombre se compone en texto (Lexend).

Por instrucción del documento, el sitio **no** incluye clientes, cifras, testimonios, certificaciones ni logos de terceros.
