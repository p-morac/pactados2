"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AlertaFormulario, BotonPrincipal, EnlaceAuth } from "@/components/auth/AuthActions";
import { AuthCard } from "@/components/auth/AuthCard";
import { Campo, CampoCelular, PasswordInput } from "@/components/auth/AuthFields";
import { iniciarSesion } from "@/lib/auth-client";
import { loginSchema, type LoginValues } from "@/lib/auth-schemas";

interface LoginFormProps {
  /** A dónde ir después de ingresar. */
  destino?: string;
}

export function LoginForm({ destino = "/hoy" }: LoginFormProps) {
  const router = useRouter();
  const [errorGeneral, setErrorGeneral] = useState("");
  const [redirigiendo, setRedirigiendo] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
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

  const cargando = isSubmitting || redirigiendo;

  return (
    <AuthCard
      titulo="Bienvenido, regístrate"
      pie={
        <div className="flex flex-col items-start gap-2.5">
          <EnlaceAuth href="/recuperar" conFlecha>
            ¿Olvidaste tu contraseña?
          </EnlaceAuth>
          <EnlaceAuth href="/registro" conFlecha>
            Crear cuenta
          </EnlaceAuth>
        </div>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <CampoCelular
          prefijo={{ id: "login-prefijo", ...register("prefijo") }}
          celular={{ id: "login-celular", placeholder: "Ej: 300 123 4567", ...register("celular") }}
          error={errors.celular?.message}
        />

        <Campo id="login-contrasena" etiqueta="Contraseña" error={errors.contrasena?.message}>
          <PasswordInput
            id="login-contrasena"
            placeholder="••••••••"
            autoComplete="current-password"
            invalido={!!errors.contrasena}
            {...register("contrasena")}
          />
        </Campo>

        <AlertaFormulario mensaje={errorGeneral} />

        <BotonPrincipal cargando={cargando} textoCargando="Ingresando…" className="mt-2">
          Iniciar sesión
        </BotonPrincipal>
      </form>
    </AuthCard>
  );
}
