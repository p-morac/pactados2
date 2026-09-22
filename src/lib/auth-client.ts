import {
  telefonoCompleto,
  type LoginValues,
  type RecuperarValues,
  type RegistroValues,
} from "@/lib/auth-schemas";
import type { UsuarioHoy } from "@/types/habitos";

export type ResultadoAuth = { ok: true } | { ok: false; error: string };

/**
 * ⚠️ Simulación: este proyecto todavía no tiene backend de cuentas.
 * Cada función espera un momento y responde éxito para que el flujo
 * (cargando → modal → redirección) funcione de punta a punta.
 *
 * Para conectarlo, reemplaza el cuerpo de cada función por la llamada real
 * (Supabase Auth, Firebase, una API route propia en /api/auth/…, etc.).
 * Mientras devuelvas un ResultadoAuth, los formularios no necesitan cambios:
 * si devuelves { ok: false, error: "…" } el mensaje aparece en el formulario.
 */

const esperar = (ms: number) => new Promise((resolver) => setTimeout(resolver, ms));
const CLAVE_USUARIO = "pactados.usuario";
const CLAVE_CUENTAS = "pactados.cuentas";

interface CuentaLocal {
  nombreCompleto: string;
  telefono: string;
  contrasena: string;
}

function leerCuentas(): CuentaLocal[] {
  if (typeof window === "undefined") return [];

  const cuentas = window.localStorage.getItem(CLAVE_CUENTAS);
  if (!cuentas) return [];

  try {
    const datos = JSON.parse(cuentas) as unknown;
    return Array.isArray(datos) ? (datos as CuentaLocal[]) : [];
  } catch {
    return [];
  }
}

function guardarUsuarioActual(cuenta: CuentaLocal) {
  window.localStorage.setItem(CLAVE_USUARIO, JSON.stringify({ nombreCompleto: cuenta.nombreCompleto }));
}

export function obtenerUsuarioGuardado(): UsuarioHoy | null {
  if (typeof window === "undefined") return null;

  const usuario = window.localStorage.getItem(CLAVE_USUARIO);
  if (!usuario) return null;

  try {
    const datos = JSON.parse(usuario) as { nombreCompleto?: string };
    if (!datos.nombreCompleto) return null;

    return {
      nombre: datos.nombreCompleto.trim().split(/\s+/)[0],
      nombreCompleto: datos.nombreCompleto,
      saludo: "Bienvenida",
    };
  } catch {
    return null;
  }
}

export async function iniciarSesion(datos: LoginValues): Promise<ResultadoAuth> {
  const telefono = telefonoCompleto(datos.prefijo, datos.celular);
  await esperar(700);

  const cuenta = leerCuentas().find((actual) => actual.telefono === telefono && actual.contrasena === datos.contrasena);
  if (!cuenta) return { ok: false, error: "El celular o la contraseña no coinciden con una cuenta registrada." };

  guardarUsuarioActual(cuenta);
  return { ok: true };
}

export async function registrarCuenta(datos: RegistroValues): Promise<ResultadoAuth> {
  const telefono = telefonoCompleto(datos.prefijo, datos.celular);
  await esperar(900);

  const cuentas = leerCuentas();
  if (cuentas.some((cuenta) => cuenta.telefono === telefono)) {
    return { ok: false, error: "Ya existe una cuenta con ese número de celular." };
  }

  const cuenta = { nombreCompleto: datos.nombre.trim(), telefono, contrasena: datos.contrasena };
  window.localStorage.setItem(CLAVE_CUENTAS, JSON.stringify([...cuentas, cuenta]));
  guardarUsuarioActual(cuenta);
  return { ok: true };
}

export async function solicitarRecuperacion(datos: RecuperarValues): Promise<ResultadoAuth> {
  const telefono = telefonoCompleto(datos.prefijo, datos.celular);
  void telefono; // TODO: enviar { nombre: datos.nombre, telefono, contrasena: datos.contrasena }
  await esperar(900);
  return { ok: true };
}
