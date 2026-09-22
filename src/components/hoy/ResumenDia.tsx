import { CircleCheck, ClipboardList, Hourglass, type LucideIcon } from "lucide-react";

import { plural } from "@/lib/hoy-utils";
import type { ResumenDelDia } from "@/types/habitos";

export function ResumenDia({ resumen }: { resumen: ResumenDelDia }) {
  const filas: { valor: number; texto: string; icono: LucideIcon; color: string }[] = [
    { valor: resumen.aTiempo, texto: "a tiempo", icono: CircleCheck, color: "#2f9e5f" },
    { valor: resumen.pospuestos, texto: plural(resumen.pospuestos, "pospuesta"), icono: Hourglass, color: "#e8782b" },
    { valor: resumen.porRegistrar, texto: "por registrar", icono: ClipboardList, color: "#d9695f" },
  ];

  return (
    <article className="tarjeta-crema h-full p-6">
      <h2 className="font-display text-[1.9rem] uppercase leading-none tracking-tight text-tinta">Resumen</h2>

      <ul className="mt-4 space-y-3 md:grid md:grid-cols-3 md:gap-4 md:space-y-0 lg:block lg:space-y-3">
        {filas.map(({ valor, texto, icono: Icono, color }) => (
          <li key={texto} className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
              style={{ color, backgroundColor: `${color}1a` }}
            >
              <Icono className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <span className="font-body flex items-baseline gap-2 text-[1rem] text-cafe">
              <strong className="font-display text-[1.7rem] font-normal leading-none text-tinta">{valor}</strong>
              {texto}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
