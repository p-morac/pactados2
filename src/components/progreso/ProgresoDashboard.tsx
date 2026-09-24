"use client";
import { Image as ImageIcon } from "lucide-react";

export function ProgresoDashboard() {
  return (
    <div className="w-full text-[#111827]">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-[32px] font-bold leading-tight">Progreso</h1>
        <p className="text-gray-500 mt-1 text-sm">Cada progreso cuenta como información no como juicio</p>
      </div>

      {/* Tarjetas Superiores */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard titulo="CUMPLIMIENTO" valor="74%" subtitulo="+8% de la semana" />
        <StatCard titulo="COMPLETADOS" valor="18" subtitulo="de 24 planificados" />
        <StatCard titulo="MEJOR RACHA" valor="4 Días!" subtitulo="hábito de mañana" />
        <StatCard titulo="MEJOR DÍA" valor="Martes" subtitulo="5 de 5 registros" />
      </div>

      {/* Contenido Principal */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 w-full">
        
        {/* Columna Izquierda: Graficos y Consistencia */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          
          {/* Grafico: Ritmo de semana */}
          <div className="border-[1.5px] border-gray-900 rounded-xl p-6 bg-white flex flex-col h-[280px]">
            <h3 className="text-base font-bold mb-2">Ritmo de semana:</h3>
            
            <div className="flex-1 flex items-end justify-between px-2 sm:px-6 pt-6">
              {/* Los valores (val1, val2) representan un porcentaje de altura (0 a 100) */}
              <BarColumn day="Lun" val1={55} val2={35} />
              <BarColumn day="Mar" val1={100} val2={90} />
              <BarColumn day="Mier" val1={50} val2={50} />
              <BarColumn day="Jue" val1={30} val2={15} />
              <BarColumn day="Vier" val1={80} val2={60} />
              <BarColumn day="Sab" val1={60} val2={45} />
              <BarColumn day="Dom" val1={45} val2={30} />
            </div>
          </div>

          {/* Consistencia */}
          <div className="border-[1.5px] border-gray-900 rounded-xl p-6 bg-white flex flex-col">
            <h3 className="text-base font-bold mb-4 flex items-center gap-2">
              Consistencia <span className="text-gray-400">— Agosto</span>
            </h3>
            <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2">
              <DayBox day="10" active />
              <DayBox day="11" />
              <DayBox day="12" />
              <DayBox day="13" active />
              <DayBox day="14" />
              <DayBox day="15" />
              <DayBox day="16" active />
            </div>
          </div>
        </div>

        {/* Columna Derecha: Tus Registros */}
        <div className="xl:col-span-4">
          <div className="border-[1.5px] border-gray-900 rounded-xl p-6 bg-white h-full flex flex-col">
            <h3 className="text-base font-bold mb-4">Tus Registros 📸</h3>

            <div className="w-full aspect-[16/9] sm:aspect-[4/3] bg-[#F8FAFC] border-[1.5px] border-gray-200 rounded-xl flex items-center justify-center mb-5 relative overflow-hidden group">
              {<img src="\EstirandoPrincipal.jpg" alt="Estirando Principal" className="absolute inset-0 w-full h-full object-cover" />}
            </div>

            <div className="mb-6">
              <p className="text-[11px] font-bold text-gray-400 tracking-wide uppercase mb-1">Último registro</p>
              <h4 className="text-lg font-bold">Estirar · 4 PM</h4>
              <p className="text-sm text-gray-500 mt-0.5">🎵 Promises - Jhéne Aiko</p>
            </div>

            <hr className="border-gray-200 mb-6" />

            <div>
              <p className="text-sm font-bold text-gray-600 mb-3">Registros anteriores:</p>
              <div className="flex gap-3">
                <MiniImagePlaceholder />
                <MiniImagePlaceholder />
                <MiniImagePlaceholder />
                <MiniImagePlaceholder />
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

// --- Componentes Auxiliares ---

function StatCard({ titulo, valor, subtitulo }: { titulo: string; valor: string; subtitulo: string }) {
  return (
    <div className="border-[1.5px] border-gray-900 rounded-xl p-5 bg-white flex flex-col justify-center">
      <p className="text-[11px] font-bold text-gray-500 tracking-wide uppercase mb-1.5">{titulo}</p>
      <p className="text-[28px] font-extrabold leading-none mb-1.5">{valor}</p>
      <p className="text-xs text-gray-400">{subtitulo}</p>
    </div>
  );
}

function BarColumn({ day, val1, val2 }: { day: string; val1: number; val2: number }) {
  return (
    <div className="flex flex-col items-center gap-3 h-full justify-end w-full">
      <div className="flex items-end gap-1 md:gap-1.5 h-full justify-center w-full">
        <div
          className="w-3 md:w-4 bg-[#FFA351] rounded-t-sm transition-all duration-500"
          style={{ height: `${val1}%` }}
        />
        <div
          className="w-3 md:w-4 bg-[#FFE4CC] rounded-t-sm transition-all duration-500"
          style={{ height: `${val2}%` }}
        />
      </div>
      <span className="text-[11px] font-bold text-gray-600">{day}</span>
    </div>
  );
}

function DayBox({ day, active = false }: { day: string; active?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center w-[46px] h-[46px] min-w-[46px] rounded-lg text-sm font-bold border-[1.5px] transition-colors cursor-pointer
        ${active 
          ? 'bg-[#FFA351] text-white border-[#FFA351] hover:bg-[#F3913B]' 
          : 'bg-white text-gray-900 border-gray-900 hover:bg-gray-50'
        }`}
    >
      {day}
    </div>
  );
}

function MiniImagePlaceholder() {
  return (
    <div className="w-[52px] h-[52px] bg-[#F8FAFC] border-[1.5px] border-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden shrink-0">
      <ImageIcon className="w-4 h-4 text-gray-300" />
      {<img src="\estirando2.jpg" alt="Estirando 2" className="absolute inset-0 w-full h-full object-cover" />}
    </div>
  );
}