import { z } from "zod";

const soloDigitos = (valor: string) => valor.replace(/\D/g, "");

const prefijo = z.string().min(2, "Elige un prefijo");

const celular = z
  .string()
  .trim()
  .min(1, "Escribe tu número de celular")
  .regex(/^[\d\s-]+$/, "Usa solo números")
  .refine((v) => soloDigitos(v).length >= 7 && soloDigitos(v).length <= 12, {
    message: "Revisa el número: debe tener entre 7 y 12 dígitos",
  });

const nombre = z.string().trim().min(3, "Escribe tu nombre completo");

const contrasenaNueva = z
  .string()
  .min(8, "Usa al menos 8 caracteres")
  .regex(/[A-Za-zÁÉÍÓÚáéíóúÑñ]/, "Incluye al menos una letra")
  .regex(/\d/, "Incluye al menos un número");

export const loginSchema = z.object({
  prefijo,
  celular,
  contrasena: z.string().min(1, "Escribe tu contraseña"),
});

export const registroSchema = z.object({
  nombre,
  prefijo,
  celular,
  contrasena: contrasenaNueva,
});

export const recuperarSchema = z
  .object({
    nombre,
    prefijo,
    celular,
    contrasena: contrasenaNueva,
    confirmacion: z.string().min(1, "Confirma la contraseña"),
  })
  .refine((datos) => datos.contrasena === datos.confirmacion, {
    message: "Las contraseñas no coinciden",
    path: ["confirmacion"],
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type RegistroValues = z.infer<typeof registroSchema>;
export type RecuperarValues = z.infer<typeof recuperarSchema>;

export function telefonoCompleto(prefijoTel: string, numero: string) {
  return `${prefijoTel}${soloDigitos(numero)}`;
}
