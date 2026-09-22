import { formatearHora } from "@/lib/hoy-utils";
import type { MetaEnCurso } from "@/types/habitos";

import { ICONOS_META } from "./categorias";

export function AhoraMismoCard({ meta }: { meta: MetaEnCurso }) {
  const Icono = ICONOS_META[meta.icono];
  const progreso = Math.max(0, Math.min(100, Math.round(meta.progreso)));

  return (
    <article aria-labelledby="ahora-mismo-titulo" className="panel-brasa h-full p-6 sm:p-8">
      <div className="flex items-start justify-between gap-5">
        <div className="min-w-0">
          <p className="font-body inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ffe2bf] sm:tracking-[0.24em]">
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#ffd76f] opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ffd76f]" />
            </span>
            <span>
              Ahora mismo <span className="whitespace-nowrap">({formatearHora(meta.hora)})</span>
            </span>
          </p>

          <h2
            id="ahora-mismo-titulo"
            className="font-display mt-3 text-[clamp(3rem,6vw,4.4rem)] uppercase leading-[0.86] tracking-tight text-[#fff7ef] [text-shadow:0_8px_24px_rgba(97,27,9,0.3)]"
          >
            {meta.nombre}
          </h2>

          <p className="font-body mt-2 text-[0.98rem] text-[#ffe9d4]">
            Meta: {meta.meta}
          </p>
        </div>

        <span
          aria-hidden="true"
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.3rem] bg-crema text-actividad shadow-[0_14px_24px_rgba(97,27,9,0.26)]"
        >
          <Icono className="h-8 w-8" strokeWidth={2} />
        </span>
      </div>

      <div className="mt-7">
        <div className="flex items-end justify-between gap-3">
          <span className="font-body text-sm font-semibold text-[#ffe2bf]">Progreso actual</span>
          <span className="font-display text-[2.2rem] leading-none text-white">{progreso}%</span>
        </div>
        <div
          role="progressbar"
          aria-label={`Progreso de ${meta.nombre}`}
          aria-valuenow={progreso}
          aria-valuemin={0}
          aria-valuemax={100}
          className="mt-2 h-3.5 overflow-hidden rounded-full bg-[rgba(74,20,6,0.32)] shadow-[inset_0_2px_4px_rgba(74,20,6,0.25)]"
        >
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#ffd76f,#fff3d6)] shadow-[0_0_14px_rgba(255,215,111,0.6)]"
            style={{ width: `${progreso}%` }}
          />
        </div>
      </div>
    </article>
  );
}
