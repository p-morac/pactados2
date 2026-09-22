"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Bell, CalendarDays, Plus, UserRound, type LucideIcon } from "lucide-react";

import { MarcaCompacta } from "@/components/marca/Logo";
import { cn } from "@/lib/utils";

interface ItemNav {
  href: string;
  etiqueta: string;
  icono: LucideIcon;
}

export const ITEMS_NAV: ItemNav[] = [
  { href: "/hoy", etiqueta: "Hoy", icono: CalendarDays },
  { href: "/alarmas", etiqueta: "Alarmas", icono: Bell },
  { href: "/progreso", etiqueta: "Progreso", icono: BarChart3 },
  { href: "/cuenta", etiqueta: "Cuenta", icono: UserRound },
];

/** Adónde lleva "Crear": el formulario de nueva alarma/hábito. */
const HREF_CREAR = "/alarmas";

function useActivo() {
  const pathname = usePathname();
  return (href: string) => pathname === href || pathname.startsWith(`${href}/`);
}

/* ───────────── Escritorio: panel brasa fijo a la izquierda ───────────── */

export function BarraLateral() {
  const esActivo = useActivo();

  return (
    <aside className="sticky top-4 hidden h-[calc(100dvh-2rem)] w-[16.5rem] shrink-0 lg:block">
      <div className="panel-brasa flex h-full flex-col px-5 py-7">
        <Link
          href="/hoy"
          className="rounded-2xl px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <MarcaCompacta claro />
        </Link>

        <nav aria-label="Principal" className="mt-10">
          <ul className="flex flex-col gap-1.5">
            {ITEMS_NAV.map(({ href, etiqueta, icono: Icono }) => {
              const activo = esActivo(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={activo ? "page" : undefined}
                    className={cn(
                      "font-body flex items-center gap-3 rounded-[1.1rem] px-4 py-3 text-[0.98rem] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                      activo
                        ? "bg-crema text-tinta shadow-[0_12px_24px_rgba(97,27,9,0.24)]"
                        : "text-[#fff1e2]/85 hover:bg-white/12 hover:text-white"
                    )}
                  >
                    <Icono className={cn("h-5 w-5", activo && "text-fuego-texto")} strokeWidth={2.1} />
                    {etiqueta}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto">
          <Link
            href={HREF_CREAR}
            className="font-body flex w-full items-center justify-center gap-2 rounded-full border border-white/35 bg-white/12 px-5 py-3.5 text-[0.98rem] font-semibold text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <Plus className="h-5 w-5" strokeWidth={2.4} />
            Crear hábito
          </Link>
        </div>
      </div>
    </aside>
  );
}

/* ───────────── Móvil: barra superior con marca y cuenta ───────────── */

export function BarraSuperiorMovil({ iniciales }: { iniciales: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-borde/60 bg-[#f7eedc]/88 pt-[env(safe-area-inset-top)] backdrop-blur-md lg:hidden">
      <div className="flex items-center justify-between px-4 py-2.5 sm:px-6">
        <Link href="/hoy" className="rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuego/40">
          <MarcaCompacta tamano="md" />
        </Link>
        <Link
          href="/cuenta"
          aria-label="Tu cuenta"
          className="font-body flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(180deg,#ff8a2f,#ff681b)] text-sm font-bold text-white shadow-[0_8px_16px_rgba(232,113,39,0.3)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-fuego/30"
        >
          {iniciales}
        </Link>
      </div>
    </header>
  );
}

/* ───────────── Móvil: barra inferior con "Crear" al centro ───────────── */

export function NavInferiorMovil() {
  const esActivo = useActivo();
  const mitad = ITEMS_NAV.length / 2;

  const item = ({ href, etiqueta, icono: Icono }: ItemNav) => {
    const activo = esActivo(href);
    return (
      <li key={href} className="flex-1">
        <Link
          href={href}
          aria-current={activo ? "page" : undefined}
          className={cn(
            "font-body flex flex-col items-center gap-1 rounded-2xl px-1 py-1.5 text-[0.7rem] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuego/40",
            activo ? "bg-[#ffe9d2] text-fuego-texto" : "text-cafe"
          )}
        >
          <Icono className="h-5 w-5" strokeWidth={2.1} />
          {etiqueta}
        </Link>
      </li>
    );
  };

  return (
    <nav
      aria-label="Principal"
      className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] lg:hidden"
    >
      <ul className="mx-auto flex max-w-md items-end gap-1 rounded-[1.6rem] border border-borde bg-[rgba(255,250,243,0.96)] px-2 py-2 shadow-[0_18px_40px_rgba(124,50,18,0.18)] backdrop-blur-md">
        {ITEMS_NAV.slice(0, mitad).map(item)}
        <li className="flex flex-1 justify-center">
          <Link
            href={HREF_CREAR}
            aria-label="Crear hábito"
            className="-mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(180deg,#ff8a2f,#ff681b)] text-white shadow-[0_14px_26px_rgba(232,113,39,0.4)] ring-4 ring-crema transition focus-visible:outline-none focus-visible:ring-fuego/50"
          >
            <Plus className="h-7 w-7" strokeWidth={2.4} />
          </Link>
        </li>
        {ITEMS_NAV.slice(mitad).map(item)}
      </ul>
    </nav>
  );
}
