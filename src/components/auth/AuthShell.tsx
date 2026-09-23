import type { ReactNode } from "react";

import { Logo } from "@/components/marca/Logo";
import { cn } from "@/lib/utils";

interface AuthShellProps {
  /** Una entrada por línea, tal como se corta en el prototipo. */
  titulo: string[];
  descripcion: string[];
  /** /ingresar usa el título a 36px; registro y recuperar, a 32px. */
  tituloGrande?: boolean;
  children: ReactNode;
}

/** En escritorio cada línea va en su propio renglón; en móvil el texto fluye normal. */
function Lineas({ lineas }: { lineas: string[] }) {
  return lineas.map((linea) => (
    <span key={linea} className="lg:block lg:whitespace-nowrap">
      {linea}{" "}
    </span>
  ));
}

export function AuthShell({ titulo, descripcion, tituloGrande, children }: AuthShellProps) {
  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-10">
      <div className="flex w-full max-w-[840px] flex-col items-center gap-10 lg:flex-row lg:justify-between lg:gap-0">
        <section className="w-full max-w-[400px] lg:mt-[3px] lg:max-w-none lg:flex-1">
          <Logo />
          <h1
            className={cn(
              "mt-[23px] font-extrabold",
              tituloGrande ? "text-[36px] leading-[42px]" : "text-[32px] leading-[38.5px]"
            )}
          >
            <Lineas lineas={titulo} />
          </h1>
          <p className="mt-[19px] text-[15px] leading-[22px] text-gris">
            <Lineas lineas={descripcion} />
          </p>
        </section>

        {children}
      </div>
    </main>
  );
}
