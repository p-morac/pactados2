import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface AuthCardProps {
  titulo: string;
  children: ReactNode;
  /** Enlaces secundarios bajo el formulario ("¿Ya tienes cuenta?…"). */
  pie?: ReactNode;
  className?: string;
}

/**
 * Tarjeta crema de Pactados con la "sombra sólida" naranja del prototipo
 * (una capa con el gradiente de los botones, desplazada abajo a la derecha).
 */
export function AuthCard({ titulo, children, pie, className }: AuthCardProps) {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] bg-[linear-gradient(160deg,#ffb24c_0%,#ff8a2f_42%,#ff681b_100%)] shadow-[0_26px_44px_rgba(196,85,38,0.26)]"
      />
      <div className="relative rounded-[2rem] border border-borde bg-[linear-gradient(180deg,rgba(255,252,247,0.99),rgba(255,242,224,0.97))] p-6 shadow-[0_22px_44px_rgba(171,91,27,0.12),inset_0_1px_0_rgba(255,255,255,0.85)] sm:p-8">
        <h2 className="font-display text-[2.35rem] uppercase leading-none tracking-tight sm:text-[2.6rem]">
          <span className="titulo-solido">{titulo}</span>
        </h2>

        <div className="mt-6">{children}</div>

        {pie ? <div className="mt-6 border-t border-[#efd9c1] pt-5">{pie}</div> : null}
      </div>
    </div>
  );
}
