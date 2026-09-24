import type { Metadata } from "next";
import { ProgresoDashboard } from "@/components/progreso/ProgresoDashboard";

export const metadata: Metadata = {
  title: "Progreso - Pactados",
  description: "Cada progreso cuenta como información no como juicio.",
};

export default function ProgresoPage() {
  // Aquí podrías cargar datos desde tu backend en el futuro
  return <ProgresoDashboard />;
}