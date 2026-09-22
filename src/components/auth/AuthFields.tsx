"use client";

import { useState, type ComponentProps, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";

import { PHONE_CODES } from "@/lib/phone-codes";
import { cn } from "@/lib/utils";

const inputBase =
  "font-body w-full rounded-[1.1rem] border bg-white/85 px-4 py-3 text-[0.98rem] text-tinta shadow-[inset_0_1px_2px_rgba(171,91,27,0.06)] outline-none transition placeholder:text-[#b89f8a] focus:bg-white focus:ring-4";
const inputOk = "border-borde focus:border-fuego focus:ring-fuego/15";
const inputError = "border-[#eb5a44]/70 focus:border-[#eb5a44] focus:ring-[#eb5a44]/15";

export function inputClass(invalido?: boolean, extra?: string) {
  return cn(inputBase, invalido ? inputError : inputOk, extra);
}

/* ─────────────── Contenedor de campo ─────────────── */

interface CampoProps {
  id: string;
  etiqueta: string;
  error?: string;
  ayuda?: string;
  children: ReactNode;
}

export function Campo({ id, etiqueta, error, ayuda, children }: CampoProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="font-body mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-etiqueta"
      >
        {etiqueta}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="font-body mt-1.5 text-sm text-error">
          {error}
        </p>
      ) : ayuda ? (
        <p id={`${id}-ayuda`} className="font-body mt-1.5 text-[0.82rem] text-[#9a8270]">
          {ayuda}
        </p>
      ) : null}
    </div>
  );
}

/* ─────────────── Input de texto ─────────────── */

type TextInputProps = ComponentProps<"input"> & {
  invalido?: boolean;
  /** true si el <Campo> muestra texto de ayuda, para enlazarlo con aria-describedby. */
  conAyuda?: boolean;
};

function describedBy(id: string | undefined, invalido?: boolean, conAyuda?: boolean) {
  if (!id) return undefined;
  if (invalido) return `${id}-error`;
  return conAyuda ? `${id}-ayuda` : undefined;
}

export function TextInput({ invalido, conAyuda, className, id, ...props }: TextInputProps) {
  return (
    <input
      id={id}
      aria-invalid={invalido || undefined}
      aria-describedby={describedBy(id, invalido, conAyuda)}
      className={inputClass(invalido, className)}
      {...props}
    />
  );
}

/* ─────────────── Contraseña con mostrar/ocultar ─────────────── */

export function PasswordInput({ invalido, conAyuda, className, id, ...props }: TextInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        type={visible ? "text" : "password"}
        aria-invalid={invalido || undefined}
        aria-describedby={describedBy(id, invalido, conAyuda)}
        className={inputClass(invalido, cn("pr-12", className))}
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
        aria-pressed={visible}
        className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-etiqueta transition hover:bg-[#ffe9d2] hover:text-fuego-texto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuego/40"
      >
        {visible ? <EyeOff className="h-[1.1rem] w-[1.1rem]" /> : <Eye className="h-[1.1rem] w-[1.1rem]" />}
      </button>
    </div>
  );
}

/* ─────────────── Prefijo + celular ─────────────── */

type SelectProps = ComponentProps<"select"> & { invalido?: boolean };

export function PrefijoSelect({ invalido, className, ...props }: SelectProps) {
  return (
    <select
      aria-label="Prefijo del país"
      aria-invalid={invalido || undefined}
      className={inputClass(invalido, cn("cursor-pointer appearance-none bg-[length:0.7rem] bg-[right_0.8rem_center] bg-no-repeat pr-8", className))}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23c3834c' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
      }}
      {...props}
    >
      {PHONE_CODES.map((pais) => (
        <option key={pais.code} value={pais.code} aria-label={`${pais.pais} ${pais.code}`}>
          {`${pais.flag} ${pais.code}`}
        </option>
      ))}
    </select>
  );
}

interface CampoCelularProps {
  prefijo: SelectProps;
  celular: TextInputProps;
  error?: string;
}

/** Fila "PREFIJO | CELULAR" del prototipo, con un único mensaje de error. */
export function CampoCelular({ prefijo, celular, error }: CampoCelularProps) {
  return (
    <div className="grid grid-cols-[6.6rem_minmax(0,1fr)] gap-3">
      <div>
        <label
          htmlFor={prefijo.id}
          className="font-body mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-etiqueta"
        >
          Prefijo
        </label>
        <PrefijoSelect {...prefijo} />
      </div>
      <Campo id={celular.id ?? "celular"} etiqueta="Celular" error={error}>
        <TextInput type="tel" inputMode="tel" autoComplete="tel-national" invalido={!!error} {...celular} />
      </Campo>
    </div>
  );
}
