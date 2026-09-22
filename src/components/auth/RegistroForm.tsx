"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AlertaFormulario, BotonPrincipal, EnlaceAuth } from "@/components/auth/AuthActions";
import { AuthCard } from "@/components/auth/AuthCard";
import { Campo, CampoCelular, PasswordInput, TextInput } from "@/components/auth/AuthFields";
import { SuccessModal } from "@/components/ui/SuccessModal";
import { registrarCuenta } from "@/lib/auth-client";
import { registroSchema, type RegistroValues } from "@/lib/auth-schemas";

export function RegistroForm() {
  const router = useRouter();
  const [errorGeneral, setErrorGeneral] = useState("");
  const [exito, setExito] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistroValues>({
    resolver: zodResolver(registroSchema),
    defaultValues: { nombre: "", prefijo: "+57", celular: "", contrasena: "" },
  });

  async function onSubmit(valores: RegistroValues) {
    setErrorGeneral("");
    const resultado = await registrarCuenta(valores);
    if (!resultado.ok) {
      setErrorGeneral(resultado.error);
      return;
    }
    setExito(true);
  }

  const irAIngresar = useCallback(() => router.push("/ingresar"), [router]);

  return (
    <>
      <AuthCard
        titulo="Crear cuenta"
        pie={
          <p className="font-body flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-cafe">
            ¿Ya tienes cuenta?
            <EnlaceAuth href="/ingresar">Inicia sesión</EnlaceAuth>
          </p>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <Campo id="registro-nombre" etiqueta="Nombre" error={errors.nombre?.message}>
            <TextInput
              id="registro-nombre"
              placeholder="Tu nombre completo"
              autoComplete="name"
              invalido={!!errors.nombre}
              {...register("nombre")}
            />
          </Campo>

          <CampoCelular
            prefijo={{ id: "registro-prefijo", ...register("prefijo") }}
            celular={{ id: "registro-celular", placeholder: "Número de celular", ...register("celular") }}
            error={errors.celular?.message}
          />

          <Campo
            id="registro-contrasena"
            etiqueta="Contraseña"
            error={errors.contrasena?.message}
            ayuda="Mínimo 8 caracteres, con letras y números."
          >
            <PasswordInput
              id="registro-contrasena"
              placeholder="Elige una contraseña segura"
              autoComplete="new-password"
              invalido={!!errors.contrasena}
              conAyuda
              {...register("contrasena")}
            />
          </Campo>

          <AlertaFormulario mensaje={errorGeneral} />

          <BotonPrincipal cargando={isSubmitting} textoCargando="Creando cuenta…" className="mt-2">
            Crear cuenta
          </BotonPrincipal>
        </form>
      </AuthCard>

      <SuccessModal
        abierto={exito}
        titulo="Cuenta creada con éxito"
        mensaje="Tu cuenta fue creada correctamente. Ya puedes iniciar sesión para empezar a configurar tus alarmas y hábitos."
        onConfirmar={irAIngresar}
      />
    </>
  );
}
