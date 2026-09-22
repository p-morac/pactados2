"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AlertaFormulario, BotonPrincipal, EnlaceAuth } from "@/components/auth/AuthActions";
import { AuthCard } from "@/components/auth/AuthCard";
import { Campo, CampoCelular, PasswordInput, TextInput } from "@/components/auth/AuthFields";
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
      <AuthCard
        titulo="Recuperar contraseña"
        pie={
          <p className="font-body flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-cafe">
            ¿Recordaste tus datos?
            <EnlaceAuth href="/ingresar">Regresar</EnlaceAuth>
          </p>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <Campo id="recuperar-nombre" etiqueta="Nombre" error={errors.nombre?.message}>
            <TextInput
              id="recuperar-nombre"
              placeholder="Tu nombre registrado"
              autoComplete="name"
              invalido={!!errors.nombre}
              {...register("nombre")}
            />
          </Campo>

          <CampoCelular
            prefijo={{ id: "recuperar-prefijo", ...register("prefijo") }}
            celular={{ id: "recuperar-celular", placeholder: "Número de celular", ...register("celular") }}
            error={errors.celular?.message}
          />

          <Campo
            id="recuperar-contrasena"
            etiqueta="Contraseña nueva"
            error={errors.contrasena?.message}
            ayuda="Mínimo 8 caracteres, con letras y números."
          >
            <PasswordInput
              id="recuperar-contrasena"
              placeholder="Nueva contraseña"
              autoComplete="new-password"
              invalido={!!errors.contrasena}
              conAyuda
              {...register("contrasena")}
            />
          </Campo>

          <Campo id="recuperar-confirmacion" etiqueta="Confirmar contraseña" error={errors.confirmacion?.message}>
            <PasswordInput
              id="recuperar-confirmacion"
              placeholder="Confirma la contraseña"
              autoComplete="new-password"
              invalido={!!errors.confirmacion}
              {...register("confirmacion")}
            />
          </Campo>

          <AlertaFormulario mensaje={errorGeneral} />

          <BotonPrincipal cargando={isSubmitting} textoCargando="Enviando enlace…" className="mt-2">
            Restablecer contraseña
          </BotonPrincipal>
        </form>
      </AuthCard>

      <SuccessModal
        abierto={exito}
        titulo="Mensaje de recuperación enviado"
        mensaje="El enlace de recuperación ya fue enviado a tus datos registrados. Revisa tu correo o celular para continuar."
        onConfirmar={irAIngresar}
      />
    </>
  );
}
