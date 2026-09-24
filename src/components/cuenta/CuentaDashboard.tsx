"use client";
import { Home, Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Usuario {
  nombre: string;
  telefono: string;
  miembroDesde: string;
}

export function CuentaDashboard() {
  const [isUpdated, setIsUpdated] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [usuario, setUsuario] = useState<Usuario>({
    nombre: "",
    telefono: "",
    miembroDesde: "2024",
  });

  useEffect(() => {
    // Leemos la simulacion de sesion desde localStorage
    const usuarioLocal = window.localStorage.getItem("pactados.usuario");
    const cuentasLocal = window.localStorage.getItem("pactados.cuentas");

    if (usuarioLocal && cuentasLocal) {
      try {
        const { nombreCompleto } = JSON.parse(usuarioLocal);
        const cuentas = JSON.parse(cuentasLocal);
        
        // Buscamos el perfil completo usando el nombre guardado
        const cuentaActual = cuentas.find((c: any) => c.nombreCompleto === nombreCompleto);

        if (cuentaActual) {
          setUsuario({
            nombre: cuentaActual.nombreCompleto,
            telefono: cuentaActual.telefono,
            miembroDesde: new Date().getFullYear().toString(),
          });
        }
      } catch (error) {
        console.error("Error al leer la sesión local", error);
      }
    }
    setCargando(false);
  }, []);

  const handleGuardar = () => {
    setIsUpdated(true);
    setTimeout(() => {
      setIsUpdated(false);
    }, 3000);
  };

  if (cargando) return null; 

  return (
    <div className="w-full text-[#111827]">
      {/* Encabezado */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-[32px] font-bold leading-tight">Cuenta</h1>
          <p className="text-gray-500 mt-1 text-sm">Administra tus datos personales y privacidad</p>
        </div>
        
        <Link 
          href="/hoy" 
          className="p-2 border-[1.5px] border-gray-900 rounded-full hover:bg-black/5 transition-colors inline-block"
        >
          <Home className="w-5 h-5" strokeWidth={2} />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full">
        {/* Columna Izquierda: Datos Personales */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <h2 className="text-lg font-bold">Datos Personales</h2>

          <div className="space-y-4">
            <InputField label="Nombre completo" defaultValue={usuario.nombre} />
            <InputField label="Teléfono de contacto" defaultValue={usuario.telefono} />
            <InputField label="Contraseña" defaultValue="******" type="password" />
          </div>

          <div className="pt-2">
            <button 
              onClick={handleGuardar}
              className="bg-[#FFA351] hover:bg-[#F3913B] text-white font-bold py-2.5 px-8 rounded-lg border-[1.5px] border-gray-900 transition-colors"
            >
              Guardar
            </button>
            
            {isUpdated && (
              <p className="text-[#FFA351] font-bold mt-4 transition-opacity animate-in fade-in duration-300">
                ¡Informacion Actualizada!
              </p>
            )}
          </div>
        </div>

        {/* Columna Derecha: Configuración */}
        <div className="lg:col-span-5">
          <div className="border-[1.5px] border-gray-900 rounded-xl p-6 bg-white/60 h-full">
            <div className="mb-5">
              <p className="text-xs font-bold text-gray-400 tracking-wide uppercase mb-1">Configuración</p>
              <h3 className="text-[22px] font-bold">Privacidad</h3>
              <p className="text-gray-500 text-sm mt-0.5">Datos y Visibilidad de tu cuenta</p>
            </div>

            <hr className="border-gray-200 mb-6" />

            <div className="space-y-6">
              <ToggleOption 
                title="Guardar mis Registros" 
                description="Permite guardar fotos históricas de tu progreso." 
                initialState={true} 
              />
              <ToggleOption 
                title="Resumen Semanal" 
                description="Recibir reporte de cumplimiento por correo." 
                initialState={false} 
              />
            </div>

            <hr className="border-gray-200 my-6" />

            <div className="text-[11px] text-gray-400 space-y-0.5">
              <p>Pactados Web App v1.4.2</p>
              <p>{usuario.nombre} - Miembro desde {usuario.miembroDesde}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Componentes Auxiliares ---

function InputField({ label, defaultValue, type = "text" }: { label: string, defaultValue: string, type?: string }) {
  return (
    <div className="flex flex-col space-y-1.5 w-full">
      <label className="text-sm font-bold text-gray-600">{label}</label>
      <div className="flex items-center border-[1.5px] border-gray-900 rounded-lg px-4 py-2 bg-white w-full">
        <input
          type={type}
          defaultValue={defaultValue}
          className="flex-1 outline-none text-gray-900 bg-transparent font-medium w-full"
        />
        <Pencil className="w-4 h-4 text-gray-500 ml-2 cursor-pointer hover:text-gray-900 shrink-0" strokeWidth={2.5} />
      </div>
    </div>
  );
}

function ToggleOption({ title, description, initialState }: { title: string, description: string, initialState: boolean }) {
  const [isActive, setIsActive] = useState(initialState);

  return (
    <div className="flex items-center justify-between gap-4 w-full">
      <div className="flex-1">
        <h4 className="text-[15px] font-bold leading-none">{title}</h4>
        <p className="text-xs text-gray-500 mt-1.5 leading-snug">{description}</p>
      </div>
      
      <button 
        onClick={() => setIsActive(!isActive)}
        className={`relative w-12 h-6 rounded-full border-[1.5px] border-gray-900 transition-colors duration-200 ease-in-out focus:outline-none shrink-0 ${isActive ? 'bg-gray-900' : 'bg-transparent'}`}
      >
        <div 
          className={`absolute left-[2px] top-[2px] w-[16px] h-[16px] rounded-full transition-transform duration-200 ease-in-out ${
            isActive 
              ? 'translate-x-6 bg-white border-none' 
              : 'translate-x-0 bg-white border-[1.5px] border-gray-900'
          }`}
        />
      </button>
    </div>
  );
}