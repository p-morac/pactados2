import { BookOpen, Brain, Footprints, GlassWater, HeartPulse, StretchHorizontal, type LucideIcon } from "lucide-react";

import type { CategoriaHabito, IconoMeta } from "@/types/habitos";

export const CATEGORIAS: Record<CategoriaHabito, { etiqueta: string; icono: LucideIcon; color: string }> = {
  mente: { etiqueta: "Mente", icono: Brain, color: "#d9695f" },
  salud: { etiqueta: "Salud", icono: HeartPulse, color: "#2f9e5f" },
  actividad: { etiqueta: "Actividad", icono: Footprints, color: "#e8782b" },
};

export const ICONOS_META: Record<IconoMeta, LucideIcon> = {
  agua: GlassWater,
  libro: BookOpen,
  caminar: Footprints,
  estirar: StretchHorizontal,
};
