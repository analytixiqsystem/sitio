// Industrias objetivo (sección 7 del documento de portafolio).

export const industries = [
  {
    slug: 'energia-oil-gas',
    icon: 'zap',
    title: 'Energía y Oil & Gas',
    short: 'Datos operacionales, IoT industrial y tiempo real para activos críticos.',
    intro:
      'Conectamos activos industriales, datos operacionales y plataformas analíticas para que la información de campo llegue a la decisión con gobierno y seguridad.',
    capabilities: [
      'IoT industrial',
      'Edge',
      'Datos operacionales',
      'Arquitecturas Cloud',
      'Real-Time',
      'Gobierno de datos',
      'IA',
      'Analítica',
      'Plataformas modernas',
    ],
    services: ['iot-industria-tiempo-real', 'modern-data-platforms-cloud', 'gobierno-arquitectura-calidad-datos', 'inteligencia-artificial-agentic-ai'],
    solutions: ['iot-real-time-architecture-blueprint', 'data-ai-maturity-assessment', 'ai-opportunity-radar'],
  },
  {
    slug: 'gobierno-sector-publico',
    icon: 'landmark',
    title: 'Gobierno y sector público',
    short: 'Arquitectura, interoperabilidad y gobierno de datos para el Estado digital.',
    intro:
      'Acompañamos a entidades públicas en su arquitectura empresarial y de información, la interoperabilidad y el gobierno de datos que exige la transformación digital del Estado.',
    capabilities: [
      'Gobierno Digital',
      'Arquitectura empresarial',
      'Arquitectura de información',
      'Interoperabilidad',
      'Gobierno de datos',
      'Calidad',
      'Analítica',
      'IA',
      'Modernización tecnológica',
    ],
    services: ['estrategia-arquitectura-empresarial', 'gobierno-arquitectura-calidad-datos', 'business-intelligence-analytics', 'inteligencia-artificial-agentic-ai'],
    solutions: ['enterprise-data-architecture-blueprint', 'data-governance-accelerator', 'architecture-review-service'],
  },
  {
    slug: 'empresas-servicios',
    icon: 'building',
    title: 'Servicios y organizaciones empresariales',
    short: 'Modernización de datos, Microsoft Fabric, Power BI e IA con gobierno.',
    intro:
      'Ayudamos a organizaciones empresariales a modernizar sus datos, ordenar su analítica y adoptar IA con una arquitectura coherente y gobernada.',
    capabilities: [
      'Modernización de datos',
      'Microsoft Fabric',
      'Power BI',
      'Gobierno',
      'Automatización',
      'IA',
      'Arquitectura empresarial',
    ],
    services: ['modern-data-platforms-cloud', 'business-intelligence-analytics', 'inteligencia-artificial-agentic-ai', 'estrategia-arquitectura-empresarial'],
    solutions: ['microsoft-fabric-readiness-assessment', 'power-bi-governance-accelerator', 'ai-proof-of-value'],
  },
];

export const expansionVerticals = ['Servicios financieros', 'Salud', 'Retail', 'Educación', 'Utilities', 'Manufactura'];

export const industryBySlug = Object.fromEntries(industries.map((i) => [i.slug, i]));
