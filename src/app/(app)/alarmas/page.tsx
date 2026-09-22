import type { Metadata } from "next";

import { EnConstruccion } from "@/components/app/EnConstruccion";

export const metadata: Metadata = { title: "Alarmas - Pactados" };

export default function Page() {
  return <EnConstruccion titulo="Alarmas" descripcion="Aquí vas a ver y crear tus alarmas. Esta pantalla todavía no está construida." />;
}
