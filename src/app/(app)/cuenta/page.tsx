import type { Metadata } from "next";

import { EnConstruccion } from "@/components/app/EnConstruccion";

export const metadata: Metadata = { title: "Cuenta - Pactados" };

export default function Page() {
  return <EnConstruccion titulo="Cuenta" descripcion="Aquí vas a administrar tus datos personales y tu privacidad. Esta pantalla todavía no está construida." />;
}
