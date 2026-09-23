import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface BotonPrincipalProps {
  children: ReactNode;
  cargando?: boolean;
  textoCargando?: string;
  /** Píldora en /ingresar; esquinas de 8px en registro y recuperar. */
  redondo?: boolean;
  className?: string;
}

/** Botón naranja con la sombra sólida durazno del prototipo. */
export function BotonPrincipal({ children, cargando, textoCargando, redondo, className }: BotonPrincipalProps) {
  return (
    <button
      type="submit"
      disabled={cargando}
      aria-busy={cargando || undefined}
      className={cn(
        "flex h-[42px] w-full items-center justify-center bg-naranja text-[15px] font-bold text-white shadow-[5px_5px_0_var(--color-durazno)] outline-none focus-visible:ring-2 focus-visible:ring-tinta disabled:opacity-80",
        redondo ? "rounded-[20px]" : "rounded-lg",
        className
      )}
    >
      {cargando ? (textoCargando ?? children) : children}
    </button>
  );
}

export function EnlaceAuth({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="font-bold text-naranja underline underline-offset-2">
      {children}
    </Link>
  );
}

export function AlertaFormulario({ mensaje }: { mensaje: string }) {
  if (!mensaje) return null;
  return (
    <p role="alert" className="mt-3 text-[13px] leading-5 text-error">
      {mensaje}
    </p>
  );
}
