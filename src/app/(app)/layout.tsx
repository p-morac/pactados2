import { BarraLateral, BarraSuperiorMovil } from "@/components/app/AppNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh lg:flex">
      <BarraLateral />
      <BarraSuperiorMovil />
      <main className="min-w-0 flex-1 px-4 pb-8 pt-6 lg:px-8 lg:pt-[30px]">{children}</main>
    </div>
  );
}
