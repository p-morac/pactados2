import type { Metadata } from "next";
import { CuentaDashboard } from "@/components/cuenta/CuentaDashboard";

export const metadata: Metadata = {
  title: "Cuenta - Pactados",
  description: "Administra tus datos personales y privacidad.",
};

export default function CuentaPage() {
  return <CuentaDashboard />;
}