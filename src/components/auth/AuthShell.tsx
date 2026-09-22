import Image from "next/image";
import type { ReactNode } from "react";

import { Logo } from "@/components/marca/Logo";
import { TextoFuego, TextoSolido } from "@/components/marca/TextoFuego";

interface AuthShellProps {
  /** Título partido en tres para pintar la palabra central con el gradiente de fuego. */
  titulo: { antes: string; destacado: string; despues?: string };
  descripcion: string;
  /** La tarjeta con el formulario (un <AuthCard />). */
  children: ReactNode;
}

export function AuthShell({ titulo, descripcion, children }: AuthShellProps) {
  return (
    <main className="escenario-fuego px-4 md:px-6 lg:px-8">
      <div className="orbe orbe-izquierda" aria-hidden="true" />
      <div className="orbe orbe-derecha" aria-hidden="true" />
      <div className="rejilla absolute inset-x-10 top-12 bottom-8 opacity-30" aria-hidden="true" />

      <Image
        src="/fuego-doodle-izquierda.png"
        alt=""
        width={75}
        height={84}
        aria-hidden="true"
        className="garabato left-[4%] top-[14%] hidden h-[4.6rem] w-auto opacity-80 lg:block"
      />
      <Image
        src="/fuego-doodle-abajo.png"
        alt=""
        width={76}
        height={75}
        aria-hidden="true"
        className="garabato bottom-[7%] left-[3%] hidden h-[5.2rem] w-auto opacity-60 lg:block"
      />
      <span className="destello right-[4%] top-[12%] hidden lg:block" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid min-h-dvh w-full max-w-[1120px] items-center gap-10 py-10 md:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <section className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <Logo className="w-[10.5rem] md:w-[13rem]" />

          <h1 className="font-display mt-4 max-w-[14ch] text-[clamp(2.7rem,6vw,5.1rem)] uppercase leading-[0.9] tracking-tight text-balance lg:mt-6">
            <TextoSolido>{titulo.antes} </TextoSolido>
            <TextoFuego>{titulo.destacado}</TextoFuego>
            {titulo.despues ? <TextoSolido> {titulo.despues}</TextoSolido> : null}
          </h1>

          <p className="font-body mt-5 max-w-[36ch] text-[1rem] leading-7 text-black/70 md:text-[1.08rem]">
            {descripcion}
          </p>
        </section>

        <div className="mx-auto w-full max-w-[29rem] pb-3 pr-3 lg:mr-0">{children}</div>
      </div>
    </main>
  );
}
