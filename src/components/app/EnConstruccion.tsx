import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Fuego } from "@/components/marca/Fuego";
import { TextoSolido } from "@/components/marca/TextoFuego";

/** Pantalla temporal para las secciones del menú que aún no están construidas. */
export function EnConstruccion({ titulo, descripcion }: { titulo: string; descripcion: string }) {
  return (
    <div className="tarjeta-crema mx-auto mt-10 max-w-xl px-6 pb-8 pt-14 text-center sm:px-10">
      <Fuego conHalo className="absolute left-1/2 top-[-2.8rem] h-[4.6rem] w-[3.6rem] -translate-x-1/2" />
      <h1 className="font-display text-[clamp(2.6rem,6vw,3.6rem)] uppercase leading-none tracking-tight">
        <TextoSolido>{titulo}</TextoSolido>
      </h1>
      <p className="font-body mx-auto mt-3 max-w-[38ch] text-[1rem] leading-7 text-cafe">{descripcion}</p>
      <Link
        href="/hoy"
        className="font-body mt-6 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,#ff8a2f,#ff681b)] px-6 py-3.5 text-[0.98rem] font-semibold text-white shadow-[0_16px_28px_rgba(232,113,39,0.26)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-fuego/35 motion-reduce:hover:translate-y-0"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2.4} />
        Volver a Hoy
      </Link>
    </div>
  );
}
