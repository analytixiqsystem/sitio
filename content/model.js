// Modelo de intervención en seis etapas (sección 8) y arquitectura conceptual (sección 9).

export const interventionModel = [
  {
    id: 'discover',
    name: 'Discover',
    verb: 'Entender',
    icon: 'search',
    summary: 'Comprendemos el negocio antes de proponer tecnología.',
    items: ['Estrategia', 'Procesos', 'Problemas', 'Datos', 'Sistemas', 'Arquitectura', 'Objetivos'],
  },
  {
    id: 'assess',
    name: 'Assess',
    verb: 'Evaluar',
    icon: 'gauge',
    summary: 'Medimos el punto de partida con criterios objetivos.',
    items: ['Estado actual', 'Madurez', 'Brechas', 'Riesgos', 'Oportunidades'],
  },
  {
    id: 'architect',
    name: 'Architect',
    verb: 'Diseñar',
    icon: 'compass',
    summary: 'Definimos el estado objetivo y el camino para llegar.',
    items: ['Arquitectura objetivo', 'Principios', 'Estándares', 'Roadmap', 'Modelo de gobierno'],
  },
  {
    id: 'build',
    name: 'Build',
    verb: 'Implementar',
    icon: 'wrench',
    summary: 'Construimos las capacidades priorizadas.',
    items: ['Plataformas', 'Integraciones', 'Pipelines', 'Analítica', 'IA', 'Automatización'],
  },
  {
    id: 'govern',
    name: 'Govern',
    verb: 'Establecer',
    icon: 'shield',
    summary: 'Aseguramos que lo construido sea confiable y controlado.',
    items: ['Gobierno', 'Seguridad', 'Calidad', 'Estándares', 'Observabilidad', 'Controles'],
  },
  {
    id: 'operate',
    name: 'Operate & Evolve',
    verb: 'Evolucionar',
    icon: 'refresh',
    summary: 'Operamos, medimos y hacemos crecer la capacidad.',
    items: ['Medir', 'Operar', 'Optimizar', 'Escalar', 'Evolucionar'],
  },
];

// Capas de la arquitectura conceptual, de arriba (valor) hacia abajo (fundamentos)
export const architectureLayers = [
  { name: 'Inteligencia Artificial', tags: ['ML', 'GenAI', 'Agents'], icon: 'sparkles' },
  { name: 'Analítica & BI', tags: ['Power BI', 'Real Time'], icon: 'chart' },
  { name: 'Plataformas de Datos', tags: ['Fabric', 'Azure', 'GCP', 'Databricks', 'Lakehouse'], icon: 'database' },
  { name: 'Integración & IoT', tags: ['APIs', 'MQTT', 'OPC-UA', 'Batch', 'Streaming'], icon: 'activity' },
  { name: 'Arquitectura', tags: ['Empresarial', 'Datos', 'Soluciones', 'Cloud'], icon: 'network' },
];

export const architectureFoundation = ['Gobierno', 'Seguridad', 'Calidad', 'FinOps'];
