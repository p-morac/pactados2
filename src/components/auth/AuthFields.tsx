import type { ComponentProps, ReactNode } from "react";

import { PHONE_CODES } from "@/lib/phone-codes";
import { cn } from "@/lib/utils";

/** "naranja" en ingresar y registro; "oscuro" en recuperar. */
export type BordeCampo = "naranja" | "oscuro";

function inputClass(borde: BordeCampo, invalido?: boolean, extra?: string) {
  return cn(
    "block h-[37px] w-full rounded-lg border-[1.5px] bg-white px-[13px] text-[14px] text-tinta outline-none placeholder:text-gris-claro focus-visible:shadow-[0_0_0_3px_rgba(255,156,64,0.3)]",
    invalido ? "border-error" : borde === "naranja" ? "border-naranja" : "border-tinta",
    extra
  );
}

interface CampoProps {
  id: string;
  etiqueta: string;
  error?: string;
  children: ReactNode;
}

export function Campo({ id, etiqueta, error, children }: CampoProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-[5px] block text-[12px] font-semibold uppercase leading-4 text-gris">
        {etiqueta}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1 text-[12px] leading-4 text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type TextInputProps = ComponentProps<"input"> & { borde: BordeCampo; invalido?: boolean };

export function TextInput({ borde, invalido, className, id, ...props }: TextInputProps) {
  return (
    <input
      id={id}
      aria-invalid={invalido || undefined}
      aria-describedby={invalido && id ? `${id}-error` : undefined}
      className={inputClass(borde, invalido, className)}
      {...props}
    />
  );
}

type SelectProps = ComponentProps<"select"> & { borde: BordeCampo };

interface CampoCelularProps {
  borde: BordeCampo;
  prefijo: Omit<SelectProps, "borde">;
  celular: Omit<TextInputProps, "borde">;
  error?: string;
}

/** Fila "PREFIJO | CELULAR" de registro y recuperar. */
export function CampoCelular({ borde, prefijo, celular, error }: CampoCelularProps) {
  const idCelular = celular.id ?? "celular";

  return (
    <div className="grid grid-cols-[80px_minmax(0,1fr)] gap-x-3">
      <div>
        <label htmlFor={prefijo.id} className="mb-[5px] block text-[12px] font-semibold uppercase leading-4 text-gris">
          Prefijo
        </label>
        <select
          aria-label="Prefijo del país"
          className={inputClass(borde, false, "cursor-pointer appearance-none font-medium")}
          {...prefijo}
        >
          {PHONE_CODES.map((pais) => (
            <option key={pais.code} value={pais.code} aria-label={`${pais.pais} ${pais.code}`}>
              {pais.code}
            </option>
          ))}
        </select>
      </div>
      <Campo id={idCelular} etiqueta="Celular" error={error}>
        <TextInput
          borde={borde}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          invalido={!!error}
          {...celular}
        />
      </Campo>
    </div>
  );
}
