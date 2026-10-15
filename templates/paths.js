// Rutas públicas del sitio (todas con barra final: cada página es /ruta/index.html).
// Todas incluyen la subcarpeta de publicación (site.basePath), p. ej. /analitixiq/servicios/.
import { site } from '../content/site.js';

const base = site.basePath.endsWith('/') ? site.basePath : `${site.basePath}/`;

/** Antepone la subcarpeta de publicación a una ruta interna ('servicios/' → '/analitixiq/servicios/'). */
export const withBase = (route = '') => base + route.replace(/^\//, '');

/** Convierte una ruta pública en la ruta relativa a la raíz del sitio generado ('/analitixiq/servicios/' → 'servicios/'). */
export const stripBase = (path) => (path.startsWith(base) ? path.slice(base.length) : path.replace(/^\//, ''));

export const asset = (file) => withBase(file);

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
