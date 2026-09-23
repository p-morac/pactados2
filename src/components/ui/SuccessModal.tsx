"use client";

import { useEffect, useId, useRef } from "react";
import { Check } from "lucide-react";

interface SuccessModalProps {
  abierto: boolean;
  titulo: string;
  mensaje: string;
  textoBoton?: string;
  /** Se llama al pulsar el botón, al hacer clic fuera o con Escape. */
  onConfirmar: () => void;
}

/** Modal de confirmación del prototipo ("Cuenta creada con éxito", "Mensaje de recuperación enviado"…). */
export function SuccessModal({ abierto, titulo, mensaje, textoBoton = "Entendido", onConfirmar }: SuccessModalProps) {
  const botonRef = useRef<HTMLButtonElement>(null);
  const tituloId = useId();
  const mensajeId = useId();

  useEffect(() => {
    if (!abierto) return;

    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    botonRef.current?.focus();

    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") onConfirmar();
      // Solo hay un elemento enfocable: el foco se queda en el botón.
      if (e.key === "Tab") {
        e.preventDefault();
        botonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", alTeclear);

    return () => {
      document.body.style.overflow = overflowPrevio;
      document.removeEventListener("keydown", alTeclear);
    };
  }, [abierto, onConfirmar]);

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div aria-hidden="true" onClick={onConfirmar} className="absolute inset-0 bg-black/[0.38] backdrop-blur-[4px]" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={tituloId}
        aria-describedby={mensajeId}
        className="relative w-full max-w-[420px] rounded-xl border-2 border-tinta bg-white p-[22px]"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-naranja text-white">
            <Check className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <h2 id={tituloId} className="text-[18px] font-bold leading-6">
            {titulo}
          </h2>
        </div>

        <p id={mensajeId} className="mt-4 text-[13px] leading-5 text-gris">
          {mensaje}
        </p>

        <button
          ref={botonRef}
          type="button"
          onClick={onConfirmar}
          className="mt-4 flex h-[41px] w-full items-center justify-center rounded-lg bg-naranja text-[14px] font-bold text-white outline-none focus-visible:ring-2 focus-visible:ring-tinta focus-visible:ring-offset-2"
        >
          {textoBoton}
        </button>
      </div>
    </div>
  );
}
