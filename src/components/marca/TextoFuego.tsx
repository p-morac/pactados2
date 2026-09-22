import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Palabra con el gradiente de fuego de la landing (ámbar → naranja → rojo). */
export function TextoFuego({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("texto-fuego", className)}>{children}</span>;
}

/** Texto oscuro con relieve de los títulos del hero. */
export function TextoSolido({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("titulo-solido", className)}>{children}</span>;
}
