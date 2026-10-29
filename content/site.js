// Contenido corporativo de AnalytixIQ Systems.
// Fuente: AnalytixIQ_Systems_Portafolio_Codex.md
// Los valores `null` se muestran en el sitio como placeholders visibles: complételos con datos reales.

export const site = {
  name: 'AnalytixIQ Systems',
  shortName: 'AnalytixIQ',
  tagline: 'Datos que inspiran, información que transforma.',
  positioning: 'Data, AI & Enterprise Architecture Consulting',
  // Subcarpeta donde se publica el sitio (GitHub Pages de proyecto: https://analytixiqsystem.github.io/sitio/).
  // Debe coincidir con el nombre del repositorio. Use BASE_PATH=/ si algún día se publica en un dominio propio.
  basePath: process.env.BASE_PATH || '/sitio/',
  // URL pública completa del sitio (incluye la subcarpeta). En GitHub Actions la define el flujo de despliegue.
  url: process.env.SITE_URL || 'https://analytixiqsystem.github.io/sitio/',
  lang: 'es',
  description:
    'Consultoría especializada en arquitectura empresarial, datos, analítica, inteligencia artificial y transformación digital. Transformamos datos en decisiones y tecnología en capacidades de negocio.',

  valueProposition:
    'Transformamos datos y tecnología en capacidades empresariales que permiten decidir mejor, operar con mayor eficiencia e innovar de forma sostenible.',
  mainMessage: 'Transformamos datos en decisiones y tecnología en capacidades de negocio.',
  mainMessageBody: [
    'AnalytixIQ Systems ayuda a organizaciones a diseñar, gobernar y modernizar sus ecosistemas de datos, analítica e Inteligencia Artificial.',
    'Desde estrategia y arquitectura hasta implementación de plataformas Cloud, Microsoft Fabric, soluciones de IA e IoT, conectamos tecnología y negocio para construir soluciones escalables, gobernadas y orientadas a resultados.',
  ],

  // Ciclo completo que cubre el modelo de la compañía
  cycle: ['Estrategia', 'Arquitectura', 'Gobierno', 'Ingeniería', 'Analítica', 'IA', 'Operación'],
  // Lo que la compañía conecta para evitar soluciones aisladas
  connects: ['Negocio', 'Procesos', 'Datos', 'Arquitectura', 'Tecnología', 'Inteligencia Artificial', 'Gobierno'],

  capabilities: [
    'Estrategia',
    'Arquitectura empresarial',
    'Arquitectura de datos',
    'Gobierno de datos',
    'Ingeniería de datos',
    'Business Intelligence',
    'Inteligencia Artificial',
    'Cloud',
    'IoT y tiempo real',
    'Gobierno tecnológico',
  ],

  transversal: [
    'Cloud Architecture',
    'Solution Architecture',
    'Cybersecurity by Design',
    'DevSecOps',
    'DataOps',
    'MLOps',
    'LLMOps',
    'APIs e integración',
    'Microsoft Power Platform',
    'Dataverse',
    'Automatización de procesos',
    'Gobierno tecnológico',
    'FinOps',
    'Gestión del cambio',
    'Capacitación',
    'Transferencia de conocimiento',
  ],

  frameworks: ['TOGAF', 'DAMA-DMBOK', 'DCAM', 'ISO/IEC 25012', 'Data Mesh', 'Well-Architected Frameworks'],
  technologies: [
    'Microsoft Azure',
    'Microsoft Fabric',
    'OneLake',
    'Power BI',
    'Azure Data Factory',
    'Dataverse',
    'Databricks',
    'Apache Spark',
    'Google Cloud Platform',
    'BigQuery',
    'AWS',
    'Azure IoT Operations',
    'OPC-UA',
    'MQTT',
  ],

  audience: [
    'CEO',
    'CIO',
    'CTO',
    'CDO',
    'Chief AI Officer',
    'Gerentes de Tecnología',
    'Gerentes de Datos y Analítica',
    'Líderes de Inteligencia Artificial',
    'Arquitectos Empresariales',
    'Arquitectos de Datos',
    'Líderes de Transformación Digital',
    'Líderes de Innovación',
  ],

  // Problemas que el portafolio declara resolver (secciones 4.1, 4.4 y 4.5 del documento)
  problems: [
    { icon: 'copy', title: 'Duplicidad y deuda tecnológica', text: 'Herramientas que se acumulan, se superponen y encarecen la operación.' },
    { icon: 'unlink', title: 'Soluciones desacopladas', text: 'Iniciativas tecnológicas aisladas que no responden a una arquitectura objetivo.' },
    { icon: 'chart', title: 'Indicadores inconsistentes', text: 'Informes que proliferan sin estándares ni propietarios, y cifras que no coinciden.' },
    { icon: 'database', title: 'Datos sin gobierno', text: 'Información sin dueños, sin trazabilidad y sin controles de calidad.' },
    { icon: 'flask', title: 'IA en experimentos aislados', text: 'Pilotos que no escalan porque faltan datos listos, arquitectura y gobierno.' },
    { icon: 'activity', title: 'Operación sin tiempo real', text: 'Activos físicos y datos operacionales desconectados de la decisión.' },
  ],

  principles: [
    { title: 'Valor de negocio primero', text: 'Partimos del problema y del resultado esperado; la tecnología es un medio, no un fin.' },
    { title: 'Arquitectura conectada a resultados', text: 'Cada decisión arquitectónica se justifica por su impacto en la operación y en la estrategia.' },
    { title: 'Gobierno y seguridad transversales', text: 'El gobierno, la seguridad y la calidad acompañan cada capa, desde el diseño.' },
    { title: 'IA responsable y medible', text: 'Sin promesas exageradas: casos de uso priorizados por valor, con guardrails y métricas.' },
    { title: 'Estrategia, arquitectura e implementación', text: 'Diferenciamos cada etapa y la conectamos, para que lo diseñado llegue a operar.' },
    { title: 'Socio estratégico', text: 'Acompañamos decisiones de largo plazo, no solo la asignación de recursos técnicos.' },
  ],

  contact: {
    email: 'mauricio_smith@hotmail.com',
    phone: '305 314 1340',
    phoneHref: 'tel:+573053141340',
    location: 'Medellín, Colombia',
    linkedin: null, // PLACEHOLDER: URL de LinkedIn
  },
  // PLACEHOLDER: endpoint que recibe el formulario (Formspree, Power Automate, API propia...).
  formEndpoint: '',
  privacyPolicyUrl: null, // PLACEHOLDER: URL de la política de tratamiento de datos

  cta: {
    primary: 'Conversemos sobre su próximo desafío de Datos, Arquitectura o IA.',
    button: 'Hablar con un arquitecto',
    secondary: [
      { label: 'Evaluar mi arquitectura', interest: 'evaluar-arquitectura' },
      { label: 'Evaluar la madurez de datos e IA', interest: 'madurez-datos-ia' },
      { label: 'Diseñar una estrategia de IA', interest: 'estrategia-ia' },
      { label: 'Modernizar mi plataforma de datos', interest: 'modernizar-plataforma' },
      { label: 'Implementar Gobierno de Datos', interest: 'gobierno-datos' },
      { label: 'Evaluar Microsoft Fabric', interest: 'evaluar-fabric' },
      { label: 'Hablar con un arquitecto', interest: 'hablar-arquitecto' },
    ],
  },
};
