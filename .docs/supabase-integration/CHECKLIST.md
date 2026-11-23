# Checklist de integración Supabase

Estado actualizado: 2026-11-23. El alcance de esta fase es catálogo público de solo lectura y carritos privados por cuenta. La administración de productos, contacto, privacidad y roles se pospuso por decisión del propietario.

## Etapas generales

- [x] Revisar el proyecto y validar el PDF. Evidencia: `.docs/ER-CRUD/ER-CRUD.pdf`, 8 páginas; extracción de texto y revisión visual; stack React/Vite y persistencia anterior inspeccionados.
- [x] Documentar el modelo y su correspondencia con la aplicación. Evidencia: [ANALISIS.md](./ANALISIS.md); separa requisitos del PDF, propuestas y decisiones técnicas.
- [x] Crear e identificar el proyecto remoto y enlazarlo mediante CLI. Evidencia: `supabase projects list` confirmó `MobileZone`, región `sa-east-1`, estado `ACTIVE_HEALTHY`; `supabase link` enlazó la referencia `pqtgjvdlvwrkywmrbktv`.
- [x] Crear, aplicar y verificar migraciones y permisos. Evidencia: `db push --dry-run --remote --include-seed` mostró una migración y `supabase/seed.sql`; `db push --remote --include-seed --yes` los aplicó; `migration list --remote` confirmó `20261118191900`. SQL habilita RLS, limita carritos por `auth.uid()`, deja `products` en lectura pública y restringe `add_cart_item` a `authenticated`.
- [x] Configurar SDK y variables locales. Evidencia: `react-app/src/lib/supabase.js`, `react-app/src/lib/mobilezoneData.js`, `.env.example`, `.gitignore` y `react-app/.env.local` con URL y clave publicable. `.env.local` está ignorado por Git.
- [x] Configurar variables de GitHub Actions. Se crearon `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` en el repositorio; la API confirmó que coinciden con `.env.local` (valores no mostrados). `.github/workflows/pages.yml` las lee y falla explícitamente si faltan.
- [ ] Publicar y comprobar GitHub Pages. Requiere subir los cambios locales a `main`; el workflow aún no se ha ejecutado.
- [ ] Integrar y comprobar cada operación CRUD requerida. Estado por entidad:
  - `products`: R pública implementada y verificada (16 filas por API anónima); C/U/D administrativos pospuestos por decisión de alcance.
  - `carts`: crear/obtener y leer por cuenta implementados; aislamiento entre cuentas verificado. U no aplica a los atributos actuales; D del carrito no se ofrece en UI.
  - `cart_items`: C/R/U/D implementados y probados desde la app; cantidad persiste al recargar; las restricciones 1–99 están en la app y Postgres.
  - `contact_messages`, `privacy_requests` y roles administrativos: pospuestos por decisión del propietario; el formulario de contacto sigue siendo una simulación.
- [x] Verificar persistencia y permisos del alcance implementado. Evidencia: dos cuentas probaron carritos separados; el primero persistió cantidad 2 tras recargar; cambio y eliminación funcionaron; la otra cuenta no vio su contenido. API anónima leyó `products` (16 registros) y recibió HTTP 401 al leer y hacer POST a `carts`/`cart_items`, o invocar `add_cart_item`.
- [x] Limpiar el artículo temporal de prueba. La única fila `cart_items` era el artículo `galaxy-s24-ultra` de cantidad 1 agregado durante la prueba; se eliminó mediante una consulta SQL acotada. Quedaron dos carritos vacíos. Las dos cuentas de prueba se conservan para evitar borrar cuentas Auth sin autorización específica.
- [x] Documentar ejecución, decisiones y pendientes. Evidencia: [ANALISIS.md](./ANALISIS.md), este checklist y [SUPABASE_SETUP.md](../../SUPABASE_SETUP.md).

## Verificaciones locales

- [x] Supabase CLI disponible y autenticada; proyecto enlazado.
- [x] `npm.cmd test`: 14/14 pruebas pasan (2026-11-23).
- [x] `npm.cmd run build`: build de producción correcto (Vite 8.3.1; 72 módulos).
- [x] `supabase config diff`: cero diferencias remotas tras aplicar configuración de Auth.
- [x] Cliente anónimo: catálogo accesible; lectura de carrito y RPC de escritura de carrito denegadas con HTTP 401.
- [x] Probar directamente en remoto valores inválidos con una sesión autenticada. Las llamadas a `add_cart_item` con cantidades 0 y 100 fueron rechazadas por Postgres con SQLSTATE `23514` y el mensaje `Quantity must be an integer between 1 and 99`; la función no insertó filas.
- [ ] Verificar el despliegue de GitHub Pages después de subir los cambios locales a `main`.

## Próximos pasos

1. Subir los cambios locales a `main` y revisar que GitHub Actions complete pruebas, build y despliegue.
2. Probar la URL publicada: catálogo, confirmación de correo, inicio de sesión y carrito.
3. Decidir si se amplía el alcance para administración de productos, contacto, privacidad o roles; no implementarlos sin definir permisos y flujos.
