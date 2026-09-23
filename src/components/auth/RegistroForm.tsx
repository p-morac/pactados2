"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AlertaFormulario, BotonPrincipal, EnlaceAuth } from "@/components/auth/AuthActions";
import { AuthCard } from "@/components/auth/AuthCard";
import { Campo, CampoCelular, TextInput } from "@/components/auth/AuthFields";
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
      <AuthCard titulo="Crear cuenta:">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mt-5 flex flex-col gap-3">
            <Campo id="registro-nombre" etiqueta="Nombre" error={errors.nombre?.message}>
              <TextInput
                id="registro-nombre"
                borde="naranja"
                placeholder="Tu nombre completo"
                autoComplete="name"
                invalido={!!errors.nombre}
                {...register("nombre")}
              />
            </Campo>

            <CampoCelular
              borde="naranja"
              prefijo={{ id: "registro-prefijo", ...register("prefijo") }}
              celular={{ id: "registro-celular", placeholder: "Número de celular", ...register("celular") }}
              error={errors.celular?.message}
            />

            <Campo id="registro-contrasena" etiqueta="Contraseña" error={errors.contrasena?.message}>
              <TextInput
                id="registro-contrasena"
                borde="naranja"
                type="password"
                placeholder="Elige una contraseña segura"
                autoComplete="new-password"
                invalido={!!errors.contrasena}
                {...register("contrasena")}
              />
            </Campo>
          </div>

          <AlertaFormulario mensaje={errorGeneral} />

          <BotonPrincipal cargando={isSubmitting} textoCargando="Creando cuenta…" className="mt-5">
            Crear Cuenta
          </BotonPrincipal>
        </form>

        <p className="mt-6 flex flex-wrap gap-x-1.5 text-[13px] leading-4 text-gris">
          ¿Ya tienes cuenta?
          <EnlaceAuth href="/ingresar">Inicia sesión</EnlaceAuth>
        </p>
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
