import type { CategoriaHabito, HabitoDelDia, ResumenDelDia } from "@/types/habitos";

/** "16:00" → { hora: "4:00", periodo: "pm" } */
export function partirHora(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const periodo = h >= 12 ? "pm" : "am";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return { hora: `${h12}:${String(m).padStart(2, "0")}`, periodo };
}

/** "16:00" → "4:00 pm" */
export function formatearHora(hhmm: string) {
  const { hora, periodo } = partirHora(hhmm);
  return `${hora} ${periodo}`;
}

/** Hora local actual en formato "HH:mm". */
export function horaActual(fecha = new Date()) {
  return `${String(fecha.getHours()).padStart(2, "0")}:${String(fecha.getMinutes()).padStart(2, "0")}`;
}

/**
 * Taxonomía del resumen (suma siempre el total):
 * - a tiempo: completado sin posponer
 * - pospuesta: la alarma se pospuso (se haya completado o no)
 * - por registrar: ni completado ni pospuesto
 */
export function resumirDia(habitos: HabitoDelDia[]): ResumenDelDia {
  const total = habitos.length;
  const completados = habitos.filter((h) => h.completado).length;
  const pospuestos = habitos.filter((h) => h.pospuesto).length;
  const aTiempo = habitos.filter((h) => h.completado && !h.pospuesto).length;

  return {
    total,
    completados,
    pendientes: total - completados,
    aTiempo,
    pospuestos,
    porRegistrar: total - aTiempo - pospuestos,
  };
}

/** Hábito con la racha más larga (desempata el que aparezca primero). */
export function rachaDestacada(habitos: HabitoDelDia[]) {
  return habitos.reduce<HabitoDelDia | null>(
    (mejor, h) => (!mejor || h.rachaDias > mejor.rachaDias ? h : mejor),
    null
  );
}

export const MENSAJE_POR_CATEGORIA: Record<CategoriaHabito, string> = {
  salud: "Estás cuidando tu salud",
  mente: "Estás entrenando tu mente",
  actividad: "Te estás moviendo más",
};

export function plural(n: number, singular: string, pluralForma = `${singular}s`) {
  return n === 1 ? singular : pluralForma;
}

/** "Mariana Quintero" → "MQ" */
export function iniciales(nombre: string) {
  return nombre
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0]?.toUpperCase() ?? "")
    .join("");
}
