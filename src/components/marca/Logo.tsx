import { cn } from "@/lib/utils";

import { Llama } from "./Llama";

/** Logo grande de las pantallas de acceso: llama + "Pactados" (40px). */
export function Logo({ className }: { className?: string }) {
  return (
    <p className={cn("flex items-center", className)}>
      <span className="flex h-10 w-10 items-center justify-center">
        <Llama className="h-[34.42px] w-[25.34px]" />
      </span>
      <span className="ml-[7.5px] text-[40px] font-extrabold leading-none tracking-[0.4px]">Pactados</span>
    </p>
  );
}

/** Logo de la barra lateral (24px). */
export function LogoCompacto({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-[11px]", className)}>
      <Llama className="h-[18.6px] w-[13.7px]" />
      <span className="text-[24px] font-extrabold leading-none">Pactados</span>
    </span>
  );
}
