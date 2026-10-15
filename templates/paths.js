// Rutas públicas del sitio (todas con barra final: cada página es /ruta/index.html).
// Todas incluyen la subcarpeta de publicación (site.basePath), p. ej. /analitixiq/servicios/.
import { site } from '../content/site.js';

const base = site.basePath.endsWith('/') ? site.basePath : `${site.basePath}/`;

/** Antepone la subcarpeta de publicación a una ruta interna ('servicios/' → '/analitixiq/servicios/'). */
export const withBase = (route = '') => base + route.replace(/^\//, '');

/** Convierte una ruta pública en la ruta relativa a la raíz del sitio generado ('/analitixiq/servicios/' → 'servicios/'). */
export const stripBase = (path) => (path.startsWith(base) ? path.slice(base.length) : path.replace(/^\//, ''));

/**
 * Archivo de /site/public referenciado en atributos que Vite procesa (img src, link href).
 * Vite antepone la subcarpeta por su cuenta, en dev y en build; anteponerla aquí la duplicaría.
 * Para URLs absolutas (og:image, JSON-LD) use withBase().
 */
export const asset = (file) => `/${file.replace(/^\//, '')}`;

export const paths = {
  home: withBase(),
  about: withBase('nosotros/'),
  services: withBase('servicios/'),
  service: (slug) => withBase(`servicios/${slug}/`),
  solutions: withBase('soluciones/'),
  solution: (slug) => withBase(`soluciones/${slug}/`),
  industries: withBase('industrias/'),
  industry: (slug) => withBase(`industrias/${slug}/`),
  insights: withBase('insights/'),
  contact: withBase('contacto/'),
  contactWith: (interest) => withBase(`contacto/?interes=${interest}#formulario`),
};
