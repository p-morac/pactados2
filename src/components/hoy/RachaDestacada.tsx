import { Fuego } from "@/components/marca/Fuego";
import { TextoFuego, TextoSolido } from "@/components/marca/TextoFuego";
import { MENSAJE_POR_CATEGORIA, plural } from "@/lib/hoy-utils";
import type { HabitoDelDia } from "@/types/habitos";

export function RachaDestacada({ habito }: { habito: HabitoDelDia | null }) {
  return (
    <article className="tarjeta-crema h-full overflow-hidden p-6">
      <Fuego conHalo className="absolute right-4 top-4 h-[4.6rem] w-[3.6rem]" />

      <p className="font-body text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-etiqueta">
        Racha destacada
      </p>

      {habito ? (
        <>
          <p className="font-body mt-1.5 pr-20 text-[0.98rem] font-semibold text-cafe">
            {MENSAJE_POR_CATEGORIA[habito.categoria]}
          </p>
          <p className="font-display mt-3 pr-16 text-[2.3rem] uppercase leading-[0.9] tracking-tight">
            <TextoSolido>{habito.nombre}</TextoSolido>
          </p>
          <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
            <TextoFuego className="font-display text-[3.3rem] uppercase leading-[0.95] tracking-tight">
              {habito.rachaDias} {plural(habito.rachaDias, "día")}
            </TextoFuego>
            <span className="font-body mb-1.5 rounded-full bg-[#ffe9d2] px-3 py-1.5 text-sm font-bold text-fuego-texto">
              ¡Muy bien!
            </span>
          </div>
        </>
      ) : (
        <p className="font-body mt-2 pr-20 text-[0.98rem] text-cafe">
          Completa un hábito hoy para empezar tu primera racha.
        </p>
      )}
    </article>
  );
}
