import type { Metadata } from "next";

import { AuthShell } from "@/components/auth/AuthShell";
import { RecuperarForm } from "@/components/auth/RecuperarForm";

export const metadata: Metadata = {
  title: "Recuperar contraseña - Pactados",
  description: "Restablece tu contraseña de Pactados y vuelve a tus metas.",
};

export default function RecuperarPage() {
  return (
    <AuthShell
      titulo={["¿Problemas para", "ingresar?"]}
      descripcion={[
        "No te preocupes, todos olvidamos las llaves alguna",
        "vez. Confirma tus datos de registro y restablece tu",
        "contraseña para volver de inmediato a tus metas.",
      ]}
    >
      <RecuperarForm />
    </AuthShell>
  );
}
