import type { HabitoDelDia, MetaEnCurso, UsuarioHoy } from "@/types/habitos";

/**
 * Datos de ejemplo que reproducen el prototipo "Pactados.web/hoy".
 * Reemplázalos por la consulta real (Supabase, API, etc.) cuando exista backend.
 */

export const USUARIO_DEMO: UsuarioHoy = {
  nombre: "Mariana",
  nombreCompleto: "Mariana Quintero",
  saludo: "Bienvenida",
};

/** Hora "actual" fija para que el demo coincida con el prototipo (12:00 pm). */
export const HORA_DEMO = "12:00";

export const META_EN_CURSO_DEMO: MetaEnCurso = {
  id: "agua",
  hora: "12:00",
  nombre: "Tomar Agua",
  categoria: "salud",
  meta: "2 Litros diarios",
  progreso: 60,
};

/**
 * 5 hábitos del día → 2 a tiempo, 1 pospuesta, 2 por registrar
 * y 3 de 5 por completar, igual que el prototipo.
 */
export const HABITOS_DEMO: HabitoDelDia[] = [
  {
    id: "perro-manana",
    hora: "07:00",
    nombre: "Sacar el perro",
    categoria: "actividad",
    rachaDias: 2,
    completado: true,
    pospuesto: false,
  },
  {
    id: "agua-manana",
    hora: "07:40",
    nombre: "Tomar agua",
    categoria: "salud",
    rachaDias: 3,
    completado: true,
    pospuesto: false,
  },
  {
    id: "leer-odisea",
    hora: "16:00",
    nombre: "Leer la odisea",
    categoria: "mente",
    rachaDias: 3,
    completado: false,
    pospuesto: true,
  },
  {
    id: "estirar",
    hora: "18:00",
    nombre: "Estirar",
    categoria: "salud",
    rachaDias: 4,
    completado: false,
    pospuesto: false,
  },
  {
    id: "perro-noche",
    hora: "20:00",
    nombre: "Sacar el perro",
    categoria: "actividad",
    rachaDias: 2,
    completado: false,
    pospuesto: false,
  },
];
