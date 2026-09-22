# Pactados Web

Proyecto Next.js con las pantallas de acceso y la pantalla principal de Pactados, con la estética de [pactados.vercel.app](https://pactados.vercel.app): títulos en Bebas Neue, texto en DM Sans, fondo crema que se vuelve brasa y acentos en gradiente de fuego.

## Pantallas

| Ruta | Pantalla |
| --- | --- |
| `/ingresar` | Inicio de sesión (celular + contraseña). Al ingresar lleva a `/hoy`. |
| `/registro` | Crear cuenta. Muestra el modal "Cuenta creada con éxito" y lleva a `/ingresar`. |
| `/recuperar` | Recuperar contraseña. Muestra el modal "Mensaje de recuperación enviado" y lleva a `/ingresar`. |
| `/hoy` | Dashboard del día: "Ahora mismo", agenda, progreso, racha destacada y resumen. |

`/` redirige a `/ingresar`. `/alarmas`, `/progreso` y `/cuenta` existen solo para que el menú no dé error: muestran un aviso de "en construcción".

## Cómo correrlo

Necesitas Node.js 20.9 o superior.

```bash
npm install
npm run dev
```

Abre http://localhost:3000. Para producción: `npm run build` y `npm start`.

## Qué es de verdad y qué es simulado

- **Formularios:** la validación es real (react-hook-form + zod): campos obligatorios, celular de 7 a 12 dígitos, contraseña de mínimo 8 caracteres con letras y números, y confirmación igual en recuperar.
- **Cuentas:** simuladas. `src/lib/auth-client.ts` espera un momento y responde éxito. Para conectar un backend (Supabase, Firebase o una API propia) cambia solo el cuerpo de `iniciarSesion`, `registrarCuenta` y `solicitarRecuperacion`. Si devuelves `{ ok: false, error: "..." }`, el mensaje aparece en el formulario.
- **Datos de Hoy:** de ejemplo, en `src/lib/hoy-mock.ts` (Mariana, 12:00 pm, 5 hábitos). Marcar un hábito como hecho actualiza el anillo, la racha y el resumen, pero el cambio vive solo en el navegador y se pierde al recargar.

## Estructura

```
src/
  app/
    (auth)/ingresar | registro | recuperar   páginas de acceso
    (app)/layout.tsx                          barra lateral (escritorio) / barras superior e inferior (móvil)
    (app)/hoy                                 dashboard
    globals.css                               tokens de color y clases visuales de la marca
  components/
    marca/     Logo, MarcaCompacta, Fuego, TextoFuego, TextoSolido
    auth/      AuthShell, AuthCard, campos, botones y los 3 formularios
    ui/        SuccessModal (reutilizable, p. ej. para "Nueva alarma creada")
    app/       navegación y pantalla "en construcción"
    hoy/       tarjetas del dashboard
  lib/         esquemas zod, cliente de auth, datos demo y utilidades
  types/       tipos de hábitos
```

## Personalizar

- **Colores:** los tokens están en `@theme` dentro de `globals.css` (`fuego`, `brasa`, `crema`, `tinta`, `cafe`, `borde`…) y se usan como clases de Tailwind: `bg-crema`, `text-tinta`, `border-borde`.
- **Categorías de hábitos:** nombre, ícono y color en `src/components/hoy/categorias.ts`.
- **Prefijos de país:** `src/lib/phone-codes.ts`.
