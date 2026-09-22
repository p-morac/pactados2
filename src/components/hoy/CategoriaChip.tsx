import type { CategoriaHabito } from "@/types/habitos";

import { CATEGORIAS } from "./categorias";

export function CategoriaChip({ categoria }: { categoria: CategoriaHabito }) {
  const { etiqueta, icono: Icono, color } = CATEGORIAS[categoria];

  return (
    <span
      className="font-body inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold"
      style={{ color, backgroundColor: `${color}18`, border: `1px solid ${color}2e` }}
    >
      <Icono className="h-3.5 w-3.5" strokeWidth={2.3} />
      {etiqueta}
    </span>
  );
}
