import type { Metadata } from "next";

import { HoyDashboard } from "@/components/hoy/HoyDashboard";
import { HABITOS_DEMO, HORA_DEMO, META_EN_CURSO_DEMO, USUARIO_DEMO } from "@/lib/hoy-mock";

export const metadata: Metadata = {
  title: "Hoy - Pactados",
  description: "Tus hábitos, rachas y progreso del día.",
};

export default function HoyPage() {
  // Datos de ejemplo. Con backend real: consulta aquí al usuario y sus hábitos del día,
  // y usa horaActual() de "@/lib/hoy-utils" en lugar de HORA_DEMO.
  return (
    <HoyDashboard usuario={USUARIO_DEMO} metaEnCurso={META_EN_CURSO_DEMO} habitos={HABITOS_DEMO} horaActual={HORA_DEMO} />
  );
}
