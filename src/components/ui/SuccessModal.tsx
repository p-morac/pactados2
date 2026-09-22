"use client";

import { useEffect, useId, useRef } from "react";
import { Check } from "lucide-react";

import { Fuego } from "@/components/marca/Fuego";

interface SuccessModalProps {
  abierto: boolean;
  titulo: string;
  mensaje: string;
  textoBoton?: string;
  /** Se llama al pulsar el botón, al hacer clic fuera o con Escape. */
  onConfirmar: () => void;
}

/**
 * Modal de confirmación del prototipo ("Cuenta creada con éxito",
 * "Mensaje de recuperación enviado", "Nueva alarma creada…").
 */
export function SuccessModal({
  abierto,
  titulo,
  mensaje,
  textoBoton = "Entendido",
  onConfirmar,
}: SuccessModalProps) {
  const botonRef = useRef<HTMLButtonElement>(null);
  const tituloId = useId();
  const mensajeId = useId();

  useEffect(() => {
    if (!abierto) return;

    const focoPrevio = document.activeElement as HTMLElement | null;
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    botonRef.current?.focus();

    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") onConfirmar();
      // Solo hay un elemento enfocable: mantenemos el foco dentro del modal.
      if (e.key === "Tab") {
        e.preventDefault();
        botonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", alTeclear);

    return () => {
      document.body.style.overflow = overflowPrevio;
      document.removeEventListener("keydown", alTeclear);
      focoPrevio?.focus?.();
    };
  }, [abierto, onConfirmar]);

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-5 py-10">
      <div
        aria-hidden="true"
        onClick={onConfirmar}
        className="absolute inset-0 bg-[rgba(58,24,8,0.3)] backdrop-blur-[6px] animate-in fade-in duration-200 motion-reduce:animate-none"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={tituloId}
        aria-describedby={mensajeId}
        className="relative w-full max-w-[27rem] animate-in fade-in zoom-in-95 slide-in-from-bottom-3 duration-300 motion-reduce:animate-none"
      >
        {/* Fuego que asoma sobre la tarjeta, como en el hero de la landing */}
        <Fuego conHalo className="absolute left-1/2 top-[-3.4rem] z-10 h-[5.4rem] w-[4.2rem] -translate-x-1/2" />

        <div
          aria-hidden="true"
          className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-[2rem] bg-[linear-gradient(160deg,#ffb24c_0%,#ff8a2f_42%,#ff681b_100%)]"
        />
        <div className="relative rounded-[2rem] border border-borde bg-[linear-gradient(180deg,rgba(255,252,247,1),rgba(255,242,224,0.98))] px-6 pb-6 pt-9 shadow-[0_34px_90px_rgba(124,50,18,0.3),inset_0_1px_0_rgba(255,255,255,0.85)] sm:px-8 sm:pb-8">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(180deg,#ff8a2f,#ff681b)] text-white shadow-[0_10px_20px_rgba(232,113,39,0.3)]">
              <Check className="h-6 w-6" strokeWidth={3} />
            </span>
            <h2 id={tituloId} className="font-display text-[2rem] uppercase leading-[0.92] tracking-tight sm:text-[2.2rem]">
              <span className="titulo-solido">{titulo}</span>
            </h2>
          </div>

          <p id={mensajeId} className="font-body mt-4 text-[1rem] leading-7 text-[#7a6150]">
            {mensaje}
          </p>

          <button
            ref={botonRef}
            type="button"
            onClick={onConfirmar}
            className="font-body mt-6 inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(180deg,#ff8a2f,#ff681b)] px-6 py-4 text-[1rem] font-semibold text-white shadow-[0_16px_28px_rgba(232,113,39,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_34px_rgba(232,113,39,0.34)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-fuego/35 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            {textoBoton}
          </button>
        </div>
      </div>
    </div>
  );
}
