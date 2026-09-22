import type { Metadata } from "next";

import { EnConstruccion } from "@/components/app/EnConstruccion";

export const metadata: Metadata = { title: "Progreso - Pactados" };

export default function Page() {
  return <EnConstruccion titulo="Progreso" descripcion="Aquí vas a ver tu cumplimiento, rachas y registros. Esta pantalla todavía no está construida." />;
}
