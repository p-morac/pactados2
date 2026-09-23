"use client";

import { useEffect, useState } from "react";

import { obtenerUsuarioGuardado } from "@/lib/auth-client";
import { formatearHora, MENSAJE_POR_CATEGORIA, plural, rachaDestacada, resumirDia } from "@/lib/hoy-utils";
import type { CategoriaHabito, HabitoDelDia, MetaEnCurso, UsuarioHoy } from "@/types/habitos";

const ETIQUETA_CATEGORIA: Record<CategoriaHabito, string> = {
  mente: "Mente",
  salud: "Salud",
  actividad: "Actividad",
};

interface HoyDashboardProps {
  usuario: UsuarioHoy;
  metaEnCurso: MetaEnCurso;
  habitos: HabitoDelDia[];
  /** "HH:mm". La agenda muestra los hábitos desde esta hora en adelante. */
  horaActual: string;
}

export function HoyDashboard({ usuario, metaEnCurso, habitos, horaActual }: HoyDashboardProps) {
  const [usuarioActual, setUsuarioActual] = useState(usuario);

  useEffect(() => {
    const usuarioGuardado = obtenerUsuarioGuardado();
    if (usuarioGuardado) setUsuarioActual(usuarioGuardado);
  }, []);

  const resumen = resumirDia(habitos);
  const destacada = rachaDestacada(habitos);
  const agenda = habitos.filter((h) => h.hora >= horaActual).sort((a, b) => a.hora.localeCompare(b.hora));

  return (
    <div>
      <h1 className="text-[28px] font-extrabold leading-[34px]">
        {usuarioActual.saludo} {usuarioActual.nombre}
      </h1>
      <p className="mt-[2.5px] text-[14px] leading-5 text-black/60">Hoy tienes metas que cumplir. ¡Paso a paso!</p>

      <div className="mt-[22.5px] grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <article className="rounded-xl border-2 border-tinta bg-nube px-[18px] pb-[17px] pt-[18px]">
            <p className="text-[12px] font-semibold uppercase leading-4 text-gris">
              Ahora mismo ({formatearHora(metaEnCurso.hora)})
            </p>
            <h2 className="mt-[7px] text-[22px] font-extrabold leading-7">{metaEnCurso.nombre}</h2>
            <p className="mt-1.5 text-[13px] leading-[18px] text-black/60">
              Meta: {metaEnCurso.meta} · Progreso actual: {metaEnCurso.progreso}%
            </p>
          </article>

          <h2 className="mt-[21px] text-[16px] font-semibold leading-6">Tu agenda de hoy:</h2>
          <ul className="mt-2.5 flex flex-col gap-3">
            {agenda.map((habito) => (
              <li
                key={habito.id}
                className="flex h-[53px] items-center rounded-lg border-[1.5px] border-black bg-durazno/60 pl-[14.5px] pr-[15px]"
              >
                <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-tinta" />
                <span className="ml-3 min-w-0 flex-1 truncate text-[14px] font-semibold">
                  {formatearHora(habito.hora)} — {habito.nombre}
                </span>
                <span className="ml-3 rounded border border-tinta bg-nube px-[7px] text-[11px] font-medium leading-[19px] text-gris">
                  {ETIQUETA_CATEGORIA[habito.categoria]}
                </span>
                <span className="ml-2.5 w-[81.5px] shrink-0 whitespace-nowrap text-[13px] text-black/60">
                  Racha {habito.rachaDias} {plural(habito.rachaDias, "día")}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <article className="flex flex-col items-center rounded-xl border-2 border-tinta bg-white pb-[17px] pt-[18px]">
            <h2 className="text-[14px] font-semibold leading-[18px]">Progreso de hoy</h2>
            <Anillo pendientes={resumen.pendientes} total={resumen.total} />
            <p className="mt-[15px] text-[13px] leading-[18px] text-gris">Hábitos a completar</p>
          </article>

          <article className="mt-6 rounded-xl border-2 border-tinta bg-nube p-3.5">
            <p className="text-[11px] font-semibold uppercase leading-[14px] text-gris-claro">Racha destacada</p>
            {destacada ? (
              <>
                <p className="mt-1.5 text-[14px] font-semibold leading-5 text-gris">
                  {MENSAJE_POR_CATEGORIA[destacada.categoria]}
                </p>
                <div className="mt-1.5 flex items-center justify-between gap-3">
                  <p className="text-[20px] font-extrabold leading-6">
                    {destacada.nombre} · {destacada.rachaDias} {plural(destacada.rachaDias, "día")}
                  </p>
                  <p className="text-[12px] font-semibold leading-4">¡Muy bien!</p>
                </div>
              </>
            ) : (
              <p className="mt-1.5 text-[14px] font-semibold leading-5 text-gris">
                Completa un hábito hoy para empezar tu primera racha.
              </p>
            )}
          </article>

          <article className="mt-6 rounded-xl border-[1.5px] border-gris-borde bg-white px-[14.5px] pb-[11.5px] pt-[13.5px]">
            <h2 className="text-[14px] font-bold leading-5">Resumen</h2>
            <ul className="mt-[7px] text-[13px] leading-[22px] text-gris">
              <FilaResumen emoji="a-tiempo" texto={`${resumen.aTiempo} a tiempo`} />
              <FilaResumen emoji="pospuesta" texto={`${resumen.pospuestos} ${plural(resumen.pospuestos, "pospuesta")}`} />
              <FilaResumen emoji="por-registrar" texto={`${resumen.porRegistrar} por registrar`} />
            </ul>
          </article>
        </div>
      </div>
    </div>
  );
}

const RADIO = 37;
const CIRCUNFERENCIA = 2 * Math.PI * RADIO;

/** Anillo del prototipo: el arco naranja muestra los hábitos que faltan (3/5). */
function Anillo({ pendientes, total }: { pendientes: number; total: number }) {
  const fraccion = total === 0 ? 0 : pendientes / total;

  return (
    <div
      role="img"
      aria-label={`${pendientes} de ${total} hábitos por completar`}
      className="relative mt-[15px] h-20 w-20"
    >
      <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="40" cy="40" r="34" className="fill-nube" />
        <circle cx="40" cy="40" r={RADIO} fill="none" strokeWidth="6" className="stroke-gris-borde" />
        <circle
          cx="40"
          cy="40"
          r={RADIO}
          fill="none"
          strokeWidth="6"
          strokeDasharray={CIRCUNFERENCIA}
          strokeDashoffset={CIRCUNFERENCIA * (1 - fraccion)}
          className="stroke-naranja"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[18px] font-extrabold">
        {pendientes}/{total}
      </span>
    </div>
  );
}

function FilaResumen({ emoji, texto }: { emoji: string; texto: string }) {
  return (
    <li className="flex items-center">
      {/* eslint-disable-next-line @next/next/no-img-element -- emoji de 13px exportado del prototipo */}
      <img src={`/emoji/${emoji}.png`} alt="" width={13} height={13} className="mr-[3.5px]" />
      {texto}
    </li>
  );
}
