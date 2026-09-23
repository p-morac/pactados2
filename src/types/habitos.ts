export type CategoriaHabito = "mente" | "salud" | "actividad";

export interface HabitoDelDia {
  id: string;
  /** Hora programada en formato 24 h, "HH:mm" (ej. "16:00"). */
  hora: string;
  nombre: string;
  categoria: CategoriaHabito;
  rachaDias: number;
  /** El usuario ya registró el hábito hoy. */
  completado: boolean;
  /** La alarma se pospuso al menos una vez hoy. */
  pospuesto: boolean;
}

/** Meta que se va cumpliendo a lo largo del día (ej. 2 litros de agua). */
export interface MetaEnCurso {
  id: string;
  hora: string;
  nombre: string;
  categoria: CategoriaHabito;
  meta: string;
  /** Porcentaje 0–100. */
  progreso: number;
}

export interface UsuarioHoy {
  /** Nombre corto para el saludo. */
  nombre: string;
  nombreCompleto: string;
  /** "Bienvenida", "Bienvenido" o "Te damos la bienvenida". */
  saludo: string;
}

export interface ResumenDelDia {
  total: number;
  completados: number;
  pendientes: number;
  aTiempo: number;
  pospuestos: number;
  porRegistrar: number;
}
