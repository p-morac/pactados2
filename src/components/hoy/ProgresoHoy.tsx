import { Check } from "lucide-react";

import { plural } from "@/lib/hoy-utils";
import type { ResumenDelDia } from "@/types/habitos";

const RADIO = 50;
const CIRCUNFERENCIA = 2 * Math.PI * RADIO;

/**
 * Igual que el prototipo: el número y el arco muestran los hábitos
 * que faltan por completar hoy (3/5). Cada hábito marcado lo reduce.
 */
export function ProgresoHoy({ resumen }: { resumen: ResumenDelDia }) {
  const { pendientes, total } = resumen;
  const fraccion = total === 0 ? 0 : pendientes / total;
  const diaCompleto = total > 0 && pendientes === 0;

  const descripcion = diaCompleto
    ? `Completaste los ${total} hábitos de hoy`
    : `${pendientes} de ${total} ${plural(total, "hábito")} por completar`;

  return (
    <article className="tarjeta-crema flex h-full items-center gap-5 p-5 md:flex-col md:justify-center md:gap-0 md:p-6 md:text-center">
      <div role="img" aria-label={descripcion} className="relative h-28 w-28 shrink-0 md:order-2 md:mt-4 md:h-36 md:w-36">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
          <defs>
            <linearGradient id="progreso-hoy-fuego" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffb300" />
              <stop offset="100%" stopColor="#ff5a0a" />
            </linearGradient>
          </defs>
          <circle cx="60" cy="60" r={RADIO} fill="none" stroke="#f3dfc4" strokeWidth="12" />
          {fraccion > 0 ? (
            <circle
              cx="60"
              cy="60"
              r={RADIO}
              fill="none"
              stroke="url(#progreso-hoy-fuego)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={CIRCUNFERENCIA}
              strokeDashoffset={CIRCUNFERENCIA * (1 - fraccion)}
              className="transition-[stroke-dashoffset] duration-500 ease-out motion-reduce:transition-none"
            />
          ) : null}
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          {diaCompleto ? (
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(180deg,#ff8a2f,#ff681b)] text-white shadow-[0_10px_20px_rgba(232,113,39,0.3)] md:h-16 md:w-16">
              <Check className="h-7 w-7 md:h-8 md:w-8" strokeWidth={3} />
            </span>
          ) : (
            <p className="font-display text-[2.3rem] leading-none text-tinta md:text-[2.8rem]">
              {pendientes}
              <span className="text-[1.4rem] text-cafe/70 md:text-[1.7rem]">/{total}</span>
            </p>
          )}
        </div>
      </div>

      {/* En móvil el texto va al lado del anillo; desde md, arriba y abajo. */}
      <div className="md:contents">
        <h2 className="font-display text-[1.9rem] uppercase leading-none tracking-tight text-tinta md:order-1">
          Progreso de hoy
        </h2>
        <p className="font-body mt-1.5 text-sm font-semibold text-cafe md:order-3 md:mt-3">
          {diaCompleto ? "¡Día completo!" : "Hábitos a completar"}
        </p>
      </div>
    </article>
  );
}
