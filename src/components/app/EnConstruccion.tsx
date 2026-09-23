import Link from "next/link";

/** Pantalla temporal para las secciones del menú que aún no están construidas. */
export function EnConstruccion({ titulo, descripcion }: { titulo: string; descripcion: string }) {
  return (
    <div>
      <h1 className="text-[28px] font-extrabold leading-[34px]">{titulo}</h1>
      <p className="mt-[2.5px] text-[14px] leading-5 text-black/60">{descripcion}</p>
      <Link href="/hoy" className="mt-6 inline-block text-[14px] font-bold text-naranja underline underline-offset-2">
        → Volver a Hoy
      </Link>
    </div>
  );
}
