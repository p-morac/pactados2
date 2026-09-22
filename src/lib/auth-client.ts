import {
  telefonoCompleto,
  type LoginValues,
  type RecuperarValues,
  type RegistroValues,
} from "@/lib/auth-schemas";

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

export async function iniciarSesion(datos: LoginValues): Promise<ResultadoAuth> {
  const telefono = telefonoCompleto(datos.prefijo, datos.celular);
  void telefono; // TODO: enviar { telefono, contrasena: datos.contrasena }
  await esperar(700);
  return { ok: true };
}

export async function registrarCuenta(datos: RegistroValues): Promise<ResultadoAuth> {
  const telefono = telefonoCompleto(datos.prefijo, datos.celular);
  void telefono; // TODO: enviar { nombre: datos.nombre, telefono, contrasena: datos.contrasena }
  await esperar(900);
  return { ok: true };
}

export async function solicitarRecuperacion(datos: RecuperarValues): Promise<ResultadoAuth> {
  const telefono = telefonoCompleto(datos.prefijo, datos.celular);
  void telefono; // TODO: enviar { nombre: datos.nombre, telefono, contrasena: datos.contrasena }
  await esperar(900);
  return { ok: true };
}
