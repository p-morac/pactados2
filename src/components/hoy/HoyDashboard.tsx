"use client";

import { useEffect, useState } from "react";

import { TextoFuego, TextoSolido } from "@/components/marca/TextoFuego";
import { obtenerUsuarioGuardado } from "@/lib/auth-client";
import { rachaDestacada, resumirDia } from "@/lib/hoy-utils";
import type { HabitoDelDia, MetaEnCurso, UsuarioHoy } from "@/types/habitos";

import { AgendaItem } from "./AgendaItem";
import { AhoraMismoCard } from "./AhoraMismoCard";
import { ProgresoHoy } from "./ProgresoHoy";
import { RachaDestacada } from "./RachaDestacada";
import { ResumenDia } from "./ResumenDia";

interface HoyDashboardProps {
  usuario: UsuarioHoy;
  metaEnCurso: MetaEnCurso;
  habitosIniciales: HabitoDelDia[];
  /** "HH:mm". La agenda muestra los hábitos desde esta hora en adelante. */
  horaActual: string;
}

export function HoyDashboard({ usuario, metaEnCurso, habitosIniciales, horaActual }: HoyDashboardProps) {
  const [usuarioActual, setUsuarioActual] = useState(usuario);
  const [habitos, setHabitos] = useState(habitosIniciales);

  useEffect(() => {
    const usuarioGuardado = obtenerUsuarioGuardado();
    if (usuarioGuardado) setUsuarioActual(usuarioGuardado);
  }, []);

  const resumen = resumirDia(habitos);
  const destacada = rachaDestacada(habitos);
  const agenda = habitos.filter((h) => h.hora >= horaActual).sort((a, b) => a.hora.localeCompare(b.hora));

  // TODO: persistir en el backend. Por ahora el estado vive en el navegador.
  function alternarHabito(id: string) {
    setHabitos((actuales) =>
      actuales.map((h) =>
        h.id === id
          ? { ...h, completado: !h.completado, rachaDias: Math.max(0, h.rachaDias + (h.completado ? -1 : 1)) }
          : h
      )
    );
  }

  return (
    <div>
      <header className="mb-7 lg:mb-8">
        <h1 className="font-display text-[clamp(2.9rem,6vw,4.8rem)] uppercase leading-[0.9] tracking-tight">
          <TextoSolido>{usuario.saludo} </TextoSolido>
          <TextoFuego>{usuarioActual.nombre}</TextoFuego>
        </h1>
        <p className="font-body mt-2 text-[1.02rem] text-cafe md:text-[1.08rem]">
          Hoy tienes metas que cumplir. ¡Paso a paso!
        </p>
      </header>

      <div className="rejilla-hoy">
        <div className="[grid-area:ahora]">
          <AhoraMismoCard meta={metaEnCurso} />
        </div>

        <div className="[grid-area:progreso]">
          <ProgresoHoy resumen={resumen} />
        </div>

        <section aria-labelledby="agenda-titulo" className="[grid-area:agenda]">
          <h2 id="agenda-titulo" className="font-display text-[2rem] uppercase leading-none tracking-tight text-tinta">
            Tu agenda de hoy
          </h2>
          {agenda.length > 0 ? (
            <ul className="mt-4 flex flex-col gap-3">
              {agenda.map((habito) => (
                <AgendaItem key={habito.id} habito={habito} onAlternar={alternarHabito} />
              ))}
            </ul>
          ) : (
            <p className="tarjeta-crema font-body mt-4 px-6 py-8 text-center text-cafe">
              No te quedan hábitos por hoy. Crea uno nuevo desde el botón “Crear hábito”.
            </p>
          )}
        </section>

        <div className="[grid-area:racha]">
          <RachaDestacada habito={destacada} />
        </div>

        <div className="[grid-area:resumen]">
          <ResumenDia resumen={resumen} />
        </div>
      </div>
    </div>
  );
}
