import { BarraLateral, BarraSuperiorMovil, NavInferiorMovil } from "@/components/app/AppNav";
import { USUARIO_DEMO } from "@/lib/hoy-mock";
import { iniciales } from "@/lib/hoy-utils";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="escenario-crema">
      <BarraSuperiorMovil iniciales={iniciales(USUARIO_DEMO.nombreCompleto)} />

      <div className="mx-auto flex w-full max-w-[1440px] gap-8 px-4 sm:px-6 lg:px-4 lg:py-4">
        <BarraLateral />
        <main className="min-w-0 flex-1 pb-32 pt-6 lg:pb-8 lg:pr-4 lg:pt-6">{children}</main>
      </div>

      <NavInferiorMovil />
    </div>
  );
}
