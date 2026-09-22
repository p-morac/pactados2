import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, CircleAlert, LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

interface BotonPrincipalProps {
  children: ReactNode;
  cargando?: boolean;
  textoCargando?: string;
  className?: string;
}

/** Botón píldora con el gradiente de fuego de la landing. */
export function BotonPrincipal({ children, cargando, textoCargando, className }: BotonPrincipalProps) {
  return (
    <button
      type="submit"
      disabled={cargando}
      aria-busy={cargando || undefined}
      className={cn(
        "font-body inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,#ff8a2f,#ff681b)] px-6 py-4 text-[1rem] font-semibold text-white shadow-[0_16px_28px_rgba(232,113,39,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_34px_rgba(232,113,39,0.34)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-fuego/35 disabled:pointer-events-none disabled:opacity-80 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className
      )}
    >
      {cargando ? (
        <>
          <LoaderCircle className="h-4 w-4 animate-spin motion-reduce:animate-none" strokeWidth={2.4} />
          {textoCargando ?? children}
        </>
      ) : (
        <>
          {children}
          <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
        </>
      )}
    </button>
  );
}

const enlaceClase =
  "font-body inline-flex items-center gap-1.5 rounded-md text-sm font-semibold text-fuego-texto underline decoration-fuego/40 underline-offset-4 transition hover:text-brasa hover:decoration-brasa focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuego/40";

export function EnlaceAuth({ href, children, conFlecha }: { href: string; children: ReactNode; conFlecha?: boolean }) {
  return (
    <Link href={href} className={enlaceClase}>
      {conFlecha ? <ArrowRight className="h-4 w-4 no-underline" strokeWidth={2.4} aria-hidden="true" /> : null}
      {children}
    </Link>
  );
}

export function AlertaFormulario({ mensaje }: { mensaje: string }) {
  if (!mensaje) return null;
  return (
    <div
      role="alert"
      className="font-body flex items-start gap-2 rounded-[1.1rem] border border-[#eb5a44]/30 bg-[#eb5a44]/10 px-4 py-3 text-sm text-[#b8391f]"
    >
      <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2.2} />
      <span>{mensaje}</span>
    </div>
  );
}
