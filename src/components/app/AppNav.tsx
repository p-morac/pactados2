"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Calendar, ChartNoAxesColumn, Plus, User, type LucideIcon } from "lucide-react";

import { LogoCompacto } from "@/components/marca/Logo";
import { cn } from "@/lib/utils";

const ITEMS_NAV: { href: string; etiqueta: string; icono: LucideIcon }[] = [
  { href: "/hoy", etiqueta: "Hoy", icono: Calendar },
  { href: "/alarmas", etiqueta: "Alarmas", icono: Bell },
  { href: "/progreso", etiqueta: "Progreso", icono: ChartNoAxesColumn },
  { href: "/cuenta", etiqueta: "Cuenta", icono: User },
];

/** "Crear" lleva al formulario de nueva alarma. */
const HREF_CREAR = "/alarmas";

function useActivo() {
  const pathname = usePathname();
  return (href: string) => pathname === href || pathname.startsWith(`${href}/`);
}

/** Escritorio: barra naranja fija a la izquierda. */
export function BarraLateral() {
  const esActivo = useActivo();

  return (
    <aside className="sticky top-0 hidden h-dvh w-[220px] shrink-0 flex-col border-r-2 border-tinta bg-naranja lg:flex">
      <Link href="/hoy" aria-label="Pactados, ir a Hoy" className="ml-[27px] mt-[24.5px] self-start">
        <LogoCompacto />
      </Link>

      <nav aria-label="Principal" className="mt-[34.5px] px-6">
        <ul className="flex flex-col gap-2">
          {ITEMS_NAV.map(({ href, etiqueta, icono: Icono }) => {
            const activo = esActivo(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={activo ? "page" : undefined}
                  className={cn(
                    "flex h-[37px] w-[172px] items-center gap-2.5 rounded-lg px-4 text-[14px]",
                    activo ? "bg-crema font-semibold text-black" : "font-medium text-gris hover:bg-crema/40"
                  )}
                >
                  <Icono size={17} strokeWidth={2} aria-hidden="true" />
                  {etiqueta}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Link
        href={HREF_CREAR}
        className="mb-[30.5px] ml-[31.5px] mt-auto flex h-5 items-center gap-[7px] self-start text-[14px] font-semibold"
      >
        <Plus size={15} strokeWidth={2.2} aria-hidden="true" />
        <span className="underline underline-offset-2">Crear</span>
      </Link>
    </aside>
  );
}

/** Móvil y tableta: la misma navegación en una barra superior. */
export function BarraSuperiorMovil() {
  const esActivo = useActivo();

  return (
    <header className="sticky top-0 z-30 border-b-2 border-tinta bg-naranja px-4 pb-2 pt-3 lg:hidden">
      <div className="flex items-center justify-between">
        <Link href="/hoy" aria-label="Pactados, ir a Hoy">
          <LogoCompacto />
        </Link>
        <Link href={HREF_CREAR} className="flex items-center gap-1.5 text-[14px] font-semibold">
          <Plus size={15} strokeWidth={2.2} aria-hidden="true" />
          <span className="underline underline-offset-2">Crear</span>
        </Link>
      </div>

      <nav aria-label="Principal" className="mt-2">
        <ul className="flex gap-1 overflow-x-auto">
          {ITEMS_NAV.map(({ href, etiqueta, icono: Icono }) => {
            const activo = esActivo(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={activo ? "page" : undefined}
                  className={cn(
                    "flex h-[37px] items-center gap-2 rounded-lg px-3 text-[14px]",
                    activo ? "bg-crema font-semibold text-black" : "font-medium text-gris"
                  )}
                >
                  <Icono size={17} strokeWidth={2} aria-hidden="true" />
                  {etiqueta}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
