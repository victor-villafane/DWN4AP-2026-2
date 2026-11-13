# Plan de mejora — Página de Contacto

**Archivo objetivo:** `clase-26/front/src/pages/Contact.jsx`
**Ruta:** `/contact` (ya registrada en `src/main.jsx`)
**Alcance:** solo frontend (UI + formulario validado). No se toca el backend.

---

## 1. Estado actual

- `Contact.jsx` es un placeholder: `<div>Contact</div>`.
- La ruta `/contact` ya existe en el router (`main.jsx`, lazy load + `Suspense`).
- El link "Contacto" ya existe en `Nav.jsx` y en los CTAs de `Home.jsx`.
- No hay endpoint de contacto en `clase-26/back` (no se creará en esta iteración).

## 2. Decisiones tomadas

| Tema | Decisión |
|---|---|
| Estilo | Estilo de los formularios CRUD: card blanca centrada sobre fondo `slate-100`, bordes/botón azules (`NuevoJuego.jsx`) |
| Validación | `react-hook-form` + `zodResolver` (patrón de `NuevoJuego.jsx`) |
| Feedback | `react-toastify` (ya montado en `Layout.jsx` via `ToastContainer`) |
| Campos | nombre, email, asunto, mensaje + panel de datos de contacto y redes |
| Backend | Sin cambios; el submit resuelve en el cliente |

## 3. Archivos a crear / modificar

| Archivo | Acción |
|---|---|
| `src/schemas/contacto.js` | **Nuevo** — schema Zod del formulario |
| `src/pages/Contact.jsx` | **Reescribir** — página completa |
| `src/components/Layout.jsx` | Verificar (solo si falta el CSS de toast) |
| `src/main.jsx` / `src/components/Nav.jsx` | Sin cambios |

## 4. Pasos de implementación

### Paso 1 — Schema de validación (`src/schemas/contacto.js`)

```js
import { z } from "zod"

export const contactoSchema = z.object({
    nombre:  z.string("El nombre es requerido").min(3, "Mínimo 3 caracteres"),
    email:   z.string("El email es requerido").email("Email inválido"),
    asunto:  z.string("El asunto es requerido").min(4, "Mínimo 4 caracteres"),
    mensaje: z.string("El mensaje es requerido").min(10, "Mínimo 10 caracteres")
               .max(500, "Máximo 500 caracteres"),
})
```

- Siguiendo la nomenclatura del proyecto: export con nombre `...Schema` / `...Shema` y mensajes en español.
- Opcional: agregar `z.string().trim()` a los campos de texto.

### Paso 2 — Estructura de la página (`Contact.jsx`)

```
<div className="min-h-[calc(100vh-4rem)] bg-slate-100 px-4 py-8">
  <div className="mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-[1fr_2fr]">

    <!-- Columna izquierda: datos de contacto y redes -->
    <aside className="rounded-xl bg-white p-6 shadow-md">
      ...título + items (email / teléfono / dirección) + redes
    </aside>

    <!-- Columna derecha: formulario -->
    <form onSubmit={handleSubmit(onSubmit)}
          className="rounded-xl bg-white p-6 shadow-md">
      ...campos + errores + botón
    </form>

  </div>
</div>
```

- En mobile se apila (`grid` → 1 columna), en `lg` pasa a 2 columnas.
- Mismos tokens visuales que `NuevoJuego.jsx`: `rounded-xl bg-white p-6 shadow-md`, fondo `bg-slate-100 px-4 py-8`.

### Paso 3 — Panel de datos de contacto y redes

- 3 ítems con icono (SVG inline tipo Heroicon, como hace `Home.jsx`):
  - 📧 Email: `soporte@ejemplo.com`
  - 📞 Teléfono: `+54 11 0000-0000`
  - 📍 Dirección: `Buenos Aires, Argentina`
- Bloque de redes (links `target="_blank" rel="noopener noreferrer"`):
  GitHub · Instagram · X/Twitter · Discord (íconos SVG inline o texto con hover violeta/azul).
- Nota: los datos son de ejemplo; se dejan en un array constante arriba del componente para editarlos fácil.

### Paso 4 — Formulario con react-hook-form + zod

- `useForm({ resolver: zodResolver(contactoSchema) })`.
- Extraer `register`, `handleSubmit`, `formState: { errors, isSubmitting }`.
- Campos (patrón idéntico a `NuevoJuego.jsx`):
  - `<label htmlFor>` + `<input>`/`<textarea>` con clases:
    `w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200`
  - Error debajo: `<div className="mt-1 text-sm text-red-600">{errors.x.message}</div>`
- Campos:
  1. `nombre` — text
  2. `email` — email
  3. `asunto` — text
  4. `mensaje` — `<textarea rows={5}>`
- Botón `Enviar mensaje` con:
  - `disabled={isSubmitting}` y texto condicional (`Enviando…`) para bloquear doble submit.
  - Clase base: `w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60`.

### Paso 5 — Feedback con toastify y reset

```js
import { Bounce, toast } from "react-toastify"

const onSubmit = (data) => {
    // Sin backend: se resuelve en el cliente
    toast.success("Mensaje enviado. Te responderemos a la brevedad", { transition: Bounce })
    reset()          // limpia el formulario
}
```

- Envolver en `try/catch` para poder mostrar `toast.error(...)` si en el futuro se conecta a un endpoint.
- Verificar que `react-toastify/dist/ReactToastify.css` (o el import de estilos) esté en `Layout.jsx`; agregarlo solo si falta.

### Paso 6 — Detalles de pulido

- `<h1>` consistente: `mb-6 text-2xl font-bold text-slate-800`.
- Subtítulo corto bajo el título explicando a quién aplica el contacto (soporte, alianzas, prensa).
- `noValidate` en el `<form>` para que se validen los mensajes de Zod y no los nativos del navegador.
- Labels asociados por `htmlFor`/`id` (accesibilidad, ya que el patrón del proyecto lo usa).
- Probar responsive: mobile apilado, `lg` dos columnas.

## 5. Criterios de aceptación

- [x] `/contact` muestra la página completa (ya no `<div>Contact</div>`).
- [x] Los 4 campos validan con Zod y muestran errores en rojo bajo cada input.
- [x] Enviar con campos vacíos no dispara el toast de éxito.
- [x] Envío válido muestra `toast.success` y limpia el formulario.
- [x] Botón deshabilitado mientras `isSubmitting`.
- [x] Columna de contacto + redes visible y responsive.
- [x] Estética coherente con `NuevoJuego.jsx` (slate + azul).
- [x] `npm run build` / `pnpm build` sin errores y lint limpio en los archivos nuevos.

> **Actualizado:** implementación completa + 16 pruebas Vitest pasando
> (ver `PLAN-testing.md`).

## 6. Fuera de alcance (iteraciones futuras)

- Endpoint `POST /api/contact` en `clase-26/back` y servicio `src/services/contacto.service`.
- Envío real por email (SMTP/Resend) o guardado en Supabase.
- Límite anti-spam / honeypot / captcha.
- Campo de selección de motivo (soporte / alianzas / prensa).
