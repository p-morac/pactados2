import type { Metadata } from "next";

import { AuthShell } from "@/components/auth/AuthShell";
import { RegistroForm } from "@/components/auth/RegistroForm";

export const metadata: Metadata = {
  title: "Crear cuenta - Pactados",
  description: "Crea tu cuenta en Pactados y empieza a registrar tus hábitos de salud, mente y actividad.",
};

export default function RegistroPage() {
  return (
    <AuthShell
      titulo={["Comienza tu camino", "hacia una vida", "organizada"]}
      descripcion={[
        "Establece tus objetivos personales de salud, mente y",
        "actividad. Con Pactados, cada pequeño esfuerzo",
        "queda registrado.",
      ]}
    >
      <RegistroForm />
    </AuthShell>
  );
}
