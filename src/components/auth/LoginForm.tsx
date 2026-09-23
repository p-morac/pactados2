"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AlertaFormulario, BotonPrincipal } from "@/components/auth/AuthActions";
import { AuthCard } from "@/components/auth/AuthCard";
import { Campo, TextInput } from "@/components/auth/AuthFields";
import { iniciarSesion } from "@/lib/auth-client";
import { loginSchema, type LoginValues } from "@/lib/auth-schemas";

export function LoginForm({ destino = "/hoy" }: { destino?: string }) {
  const router = useRouter();
  const [errorGeneral, setErrorGeneral] = useState("");
  const [redirigiendo, setRedirigiendo] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    // El prototipo no muestra prefijo al ingresar: se asume +57.
    defaultValues: { prefijo: "+57", celular: "", contrasena: "" },
  });

  async function onSubmit(valores: LoginValues) {
    setErrorGeneral("");
    const resultado = await iniciarSesion(valores);
    if (!resultado.ok) {
      setErrorGeneral(resultado.error);
      return;
    }
    setRedirigiendo(true);
    router.push(destino);
  }

  return (
    <AuthCard titulo="Bienvenido, Regístrate:" angosta>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mt-5 flex flex-col gap-3">
          <Campo id="login-celular" etiqueta="Celular" error={errors.celular?.message}>
            <TextInput
              id="login-celular"
              borde="naranja"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="Ej: 300 123 4567"
              invalido={!!errors.celular}
              {...register("celular")}
            />
          </Campo>

          <Campo id="login-contrasena" etiqueta="Contraseña" error={errors.contrasena?.message}>
            <TextInput
              id="login-contrasena"
              borde="naranja"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              invalido={!!errors.contrasena}
              {...register("contrasena")}
            />
          </Campo>
        </div>

        <AlertaFormulario mensaje={errorGeneral} />

        <BotonPrincipal redondo cargando={isSubmitting || redirigiendo} textoCargando="Ingresando…" className="mt-5">
          Iniciar Sesión
        </BotonPrincipal>
      </form>

      <div className="mt-7 flex flex-col items-start gap-2 text-[13px] font-bold leading-4 text-naranja">
        <Link href="/recuperar" className="underline underline-offset-2">
          → ¿Olvidaste tu contraseña?
        </Link>
        <Link href="/registro" className="underline underline-offset-2">
          → Crear cuenta
        </Link>
      </div>
    </AuthCard>
  );
}
