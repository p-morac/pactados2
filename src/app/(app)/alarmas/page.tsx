import type { Metadata } from "next";

import { AlarmasDashboard } from "@/components/alarmas/AlarmasDashboard";

export const metadata: Metadata = { title: "Alarmas - Pactados" };

export default function Page() {
  return <AlarmasDashboard />;
}
