"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AlertaFormulario, BotonPrincipal, EnlaceAuth } from "@/components/auth/AuthActions";
import { AuthCard } from "@/components/auth/AuthCard";
import { Campo, CampoCelular, TextInput } from "@/components/auth/AuthFields";
import { SuccessModal } from "@/components/ui/SuccessModal";
import { solicitarRecuperacion } from "@/lib/auth-client";
import { recuperarSchema, type RecuperarValues } from "@/lib/auth-schemas";

export function RecuperarForm() {
  const router = useRouter();
  const [errorGeneral, setErrorGeneral] = useState("");
  const [exito, setExito] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RecuperarValues>({
    resolver: zodResolver(recuperarSchema),
    defaultValues: { nombre: "", prefijo: "+57", celular: "", contrasena: "", confirmacion: "" },
  });

  async function onSubmit(valores: RecuperarValues) {
    setErrorGeneral("");
    const resultado = await solicitarRecuperacion(valores);
    if (!resultado.ok) {
      setErrorGeneral(resultado.error);
      return;
    }
    setExito(true);
  }

  const irAIngresar = useCallback(() => router.push("/ingresar"), [router]);

  return (
    <>
      <AuthCard titulo="Recuperar Contraseña:">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mt-[18px] flex flex-col gap-2.5">
            <Campo id="recuperar-nombre" etiqueta="Nombre" error={errors.nombre?.message}>
              <TextInput
                id="recuperar-nombre"
                borde="oscuro"
                placeholder="Tu nombre registrado"
                autoComplete="name"
                invalido={!!errors.nombre}
                {...register("nombre")}
              />
            </Campo>

            <CampoCelular
              borde="oscuro"
              prefijo={{ id: "recuperar-prefijo", ...register("prefijo") }}
              celular={{ id: "recuperar-celular", placeholder: "Número de celular", ...register("celular") }}
              error={errors.celular?.message}
            />

            <Campo id="recuperar-contrasena" etiqueta="Contraseña nueva" error={errors.contrasena?.message}>
              <TextInput
                id="recuperar-contrasena"
                borde="oscuro"
                type="password"
                placeholder="Nueva contraseña"
                autoComplete="new-password"
                invalido={!!errors.contrasena}
                {...register("contrasena")}
              />
            </Campo>

            <Campo id="recuperar-confirmacion" etiqueta="Confirmar contraseña" error={errors.confirmacion?.message}>
              <TextInput
                id="recuperar-confirmacion"
                borde="oscuro"
                type="password"
                placeholder="Confirma la contraseña"
                autoComplete="new-password"
                invalido={!!errors.confirmacion}
                {...register("confirmacion")}
              />
            </Campo>
          </div>

          <AlertaFormulario mensaje={errorGeneral} />

          <BotonPrincipal cargando={isSubmitting} textoCargando="Enviando enlace…" className="mt-[18px]">
            Restablecer Contraseña
          </BotonPrincipal>
        </form>

        <p className="mt-[22px] flex flex-wrap gap-x-1.5 text-[13px] leading-4 text-gris">
          ¿Recordaste tus datos?
          <EnlaceAuth href="/ingresar">Regresar</EnlaceAuth>
        </p>
      </AuthCard>

      <SuccessModal
        abierto={exito}
        titulo="Mensaje de Recuperación Enviado"
        mensaje="El enlace de recuperación ya fue enviado a tus datos registrados. Revisa tu correo o celular para continuar."
        onConfirmar={irAIngresar}
      />
    </>
  );
}
