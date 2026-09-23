import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface AuthCardProps {
  titulo: string;
  children: ReactNode;
  /** Ancho en escritorio: 380px en /ingresar, 400px en registro y recuperar. */
  angosta?: boolean;
}

/** Tarjeta blanca con la sombra sólida naranja del prototipo. */
export function AuthCard({ titulo, children, angosta }: AuthCardProps) {
  return (
    <div
      className={cn(
        "w-full max-w-[400px] rounded-2xl bg-white p-8 shadow-[5px_5px_0_var(--color-naranja)] lg:mb-[2px] lg:shrink-0",
        angosta ? "lg:w-[380px]" : "lg:w-[400px]"
      )}
    >
      <h2 className="text-[20px] font-bold leading-6 tracking-[0.15px]">{titulo}</h2>
      {children}
    </div>
  );
}
