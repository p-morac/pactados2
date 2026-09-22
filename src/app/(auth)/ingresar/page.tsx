import type { Metadata } from "next";

import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Ingresar - Pactados",
  description: "Inicia sesión en Pactados para ver tus hábitos, alarmas y rachas del día.",
};

export default function IngresarPage() {
  return (
    <AuthShell
      titulo={{ antes: "Crea hábitos de vida y", destacado: "mantenlos", despues: "con nosotros" }}
      descripcion="Únete a una comunidad de personas enfocadas en dar pasos firmes todos los días. Diseña tu rutina, configura alarmas y celebra tu consistencia."
    >
      <LoginForm />
    </AuthShell>
  );
}
