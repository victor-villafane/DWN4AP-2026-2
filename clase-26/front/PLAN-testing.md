# Plan de sistema de pruebas — Vitest

**Proyecto:** `clase-26/front` (Vite 8 · React 19 · Zod 4 · pnpm)
**Objetivo:** sistema de pruebas unitarias y de componente aplicado a la página de contacto.

---

## 1. Stack elegido

| Paquete | Versión | Rol |
|---|---|---|
| `vitest` | ^5.1.0 | Runner de pruebas (integrado con Vite 8) |
| `jsdom` | ^31.0.0 | Entorno DOM para pruebas de componentes |
| `@testing-library/react` | ^16.3.3 | Render + queries (compatible React 19) |
| `@testing-library/jest-dom` | ^7.0.1 | Matchers extras (`toBeVisible`, `toHaveTextContent`…) |
| `@testing-library/user-event` | ^14.6.10 | Interacción real (typing, click) |
| `@vitest/coverage-v8` | ^5.1.0 | Cobertura de código |
| `@vitest/ui` | ^5.1.0 | Consola web para ver/pruebar en vivo (`pnpm test:ui`) |

**Verificación de compatibilidad:** `vitest@5.1.0` declara peer `vite: ^6.4.0 || ^7.0.0 || ^8.0.0` ✅

## 2. Convenciones

- **Ubicación de archivos:** junto al código, `src/**/*.test.{js,jsx}`
  - `src/schemas/contacto.test.js` → unitario del schema Zod
  - `src/pages/Contact.test.jsx` → componente
- **Imports explícitos:** `import { describe, it, expect, vi, afterEach } from "vitest"` (sin `globals: true`, así ESLint no necesita cambios).

### Por qué cada paquete (Vitest solo no alcanza)
Vitest es solo el *runner*: ejecuta los tests y da `describe/it/expect/vi`.
- `jsdom` → entorno DOM falso donde se monta el componente (sin esto no hay `document`).
- `@testing-library/react` → `render()` y `screen.getBy*` para montar el JSX y consultarlo.
- `@testing-library/jest-dom` → matchers como `toBeInTheDocument()` / `toHaveValue()`.
- `@testing-library/user-event` → `user.type()` y `user.click()` fieles al navegador.
- `@vitest/coverage-v8` → reporte de cobertura.
- `@vitest/ui` → consola web (`pnpm test:ui`).
- **Setup file** `src/test/setup.js`:
  - `import "@testing-library/jest-dom/vitest"` → matchers
  - `afterEach(cleanup)` manual → limpieza entre tests (RTL no auto-limpia sin globals)
- **Aislamiento:** `vi.mock` para dependencias externas (`react-toastify`, servicios de red). Nunca se hace red real en las pruebas.
- **Estilo:** AAA (Arrange / Act / Assert), un comportamiento por test, nombres en español.

## 3. Cambios de configuración

### `vite.config.js`
- Importar `defineConfig` desde `vitest/config` (en lugar de `vite`) para poder declarar el bloque `test`.
- `test.environment: "jsdom"`
- `test.setupFiles: ["./src/test/setup.js"]`
- `test.include: ["src/**/*.{test,spec}.{js,jsx}"]`
- `test.coverage.provider: "v8"` con `reportsDirectory: "coverage"`

### `package.json` — scripts nuevos
```json
"test": "vitest run",
"test:watch": "vitest",
"test:ui": "vitest --ui",
"test:coverage": "vitest run --coverage"
```

### `eslint.config.js`
- `globalIgnores(['dist', 'coverage'])` para no lintear reportes.

### `.gitignore`
- Agregar `coverage/`.

## 4. Pruebas a escribir

### A. `src/schemas/contacto.test.js` (unitario — schema)
1. acepta un payload válido completo
2. rechaza email inválido
3. rechaza nombre con menos de 3 caracteres
4. rechaza mensaje con menos de 10 caracteres
5. rechaza mensaje de más de 500 caracteres
6. los errores tienen mensajes en español

### B. `src/pages/Contact.test.jsx` (componente)
1. renderiza el título, los 4 campos y el botón
2. muestra los datos de contacto y los links a redes
3. al enviar vacío muestra errores de validación y NO emite toast de éxito
4. envío válido muestra `toast.success` y limpia el formulario
5. un email malformado muestra el mensaje de error de Zod
6. el botón se deshabilita mientras `isSubmitting`

## 5. Criterios de aceptación

- [x] `pnpm test` pasa al 100% → **2 archivos, 16 pruebas OK**
- [x] `pnpm test:coverage` genera reporte en `coverage/` (HTML + JSON)
- [x] `pnpm lint` limpio en los archivos nuevos (los 57 errores restantes son preexistentes en archivos no tocados)
- [x] `pnpm build` sigue funcionando (`Contact-oOwJ5cHc.js` incluido)
- [x] No hay llamadas a red en las pruebas (`react-toastify` mockeado)

## 6. Resultados obtenidos (2026-11-12)

| Archivo | % Stmts | % Branch | % Funcs |
|---|---|---|---|
| `src/pages/Contact.jsx` | 98.68 | 100 | 100 |
| `src/schemas/contacto.js` | 100 | — | — |

**Nota:** el `catch` del `onSubmit` (línea 60 de `Contact.jsx`) queda sin cubrir porque no hay
modo de hacer fallar el toast mockeado; es el único gap intencional.

## 6. Fuera de alcance (iteraciones futuras)

- Tests E2E con Playwright
- Pruebas de `Home`, `Login`, `Register` y el CRUD
- CI (GitHub Actions) ejecutando lint + test + build
- Tests de accesibilidad con `vitest-axe`
