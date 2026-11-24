# MobileZone + Supabase Cloud

## Alcance de esta integración

- Catálogo remoto de solo lectura para visitantes y usuarios autenticados.
- Registro e inicio de sesión con Supabase Auth.
- Un carrito por usuario; cada usuario solo puede consultar y modificar sus artículos mediante RLS.
- Alta de artículos atómica en Postgres, cantidades enteras de 1 a 99 y precio obtenido del producto relacionado.
- CRUD administrativo del catálogo y tablas/contacto/privacidad pospuestos por decisión del propietario; no se exponen permisos de escritura pública.
- La cotización que se muestra en el cliente/WhatsApp es informativa; no crea una orden ni verifica un pago.

El esquema y las decisiones están en [.docs/supabase-integration/ANALISIS.md](.docs/supabase-integration/ANALISIS.md); el progreso verificable está en [.docs/supabase-integration/CHECKLIST.md](.docs/supabase-integration/CHECKLIST.md).

## Requisitos

- React 19 + Vite, JavaScript ES modules, npm; app y `package.json` en `react-app/`.
- Supabase CLI local v3.0.0 como dependencia de desarrollo y `@supabase/supabase-js` como dependencia de runtime.
- En PowerShell con la política actual de scripts, invocar `npx.cmd` (no `npx.ps1`): `npx.cmd --prefix react-app supabase <command>`.
- Docker no es necesario para la integración con Cloud; no ejecutar `supabase start`.

## Crear y enlazar el proyecto Cloud

Estado actual: la CLI está autenticada y el proyecto `MobileZone` está creado y enlazado. No volver a ejecutar `projects create`; los comandos de creación siguientes se conservan como referencia histórica. No compartir tokens, contraseñas ni claves en el chat o repositorio.

1. Autenticar localmente y comprobar organización/proyectos existentes:

   ```powershell
   npx.cmd --prefix react-app supabase login
   npx.cmd --prefix react-app supabase orgs list
   npx.cmd --prefix react-app supabase projects list
   ```

2. Se acordó crear un proyecto nuevo `MobileZone` en la región cercana `sa-east-1` y el tamaño `micro` del plan gratuito. Usar el `org-id` que corresponda a la organización gratuita, sin duplicar un proyecto existente:

   ```powershell
   npx.cmd --prefix react-app supabase projects create MobileZone --org-id <org-id> --region sa-east-1 --size micro
   ```

   Si la CLI solicita contraseña de base de datos, introducirla únicamente en el prompt local. No usar `--db-password` con una contraseña en texto en el comando. Esperar a que el proyecto termine y copiar su referencia real.

3. Enlazar la referencia recién creada:

   ```powershell
   npx.cmd --prefix react-app supabase link --project-ref <project-ref>
   npx.cmd --prefix react-app supabase projects list
   ```

   El estado remoto debe comprobarse antes de migrar; no volver a crear el proyecto al reanudar.

## Configuración de Auth y base de datos

La configuración local define la URL pública de GitHub Pages, la redirección de desarrollo Vite, verificación de correo y contraseñas de al menos 8 caracteres. Antes de cambiar el remoto, revisar exactamente las diferencias:

```powershell
npx.cmd --prefix react-app supabase config diff
```

Aplicar con `supabase config push` solo después de comprobar el diff y confirmar que incluye únicamente valores previstos para Auth/redirecciones:

```powershell
npx.cmd --prefix react-app supabase config push
```

Inspeccionar el destino y el plan de migración antes de aplicar. El `--dry-run` no valida completamente el SQL:

```powershell
npx.cmd --prefix react-app supabase db push --dry-run --remote
npx.cmd --prefix react-app supabase db push --remote --include-seed
npx.cmd --prefix react-app supabase migration list --remote
```

La migración `supabase/migrations/20261118191900_mobilezone_catalog_and_owned_carts.sql` crea catálogo, carrito y líneas con RLS. El usuario autenticado solo accede a su carrito; `anon` solo lee productos. La función `add_cart_item` es `SECURITY INVOKER`, exige Auth y aplica el límite en Postgres. La migración está aplicada y se verificó el aislamiento con dos cuentas y denegaciones anónimas.

`supabase/seed.sql` carga 16 registros de catálogo de forma repetible, sin sobrescribir registros ya editados (`ON CONFLICT (sku) DO NOTHING`). `db push` no carga seed por defecto; `--include-seed` lo solicita explícitamente. Revisar la migración y el seed antes de producción.

No se crean roles administrativos ni tablas de contactos/solicitudes en esta fase. No utilizar una clave `service_role` o secreta en el cliente Vite.

## Variables locales de la app

Copiar `react-app/.env.example` a `react-app/.env.local` y obtener en la configuración/API del proyecto la URL y la clave **publishable** (antes anon):

```dotenv
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

`react-app/.gitignore` excluye `.env` y `.env.*` locales y permite `.env.example`. `src/lib/supabase.js` centraliza el cliente; `src/lib/mobilezoneData.js` concentra consultas y validación. La interfaz informa cuando Supabase no está configurado y no finge haber guardado operaciones remotas.

## Desarrollo y validación

Desde `react-app/`:

```powershell
npm.cmd ci
npm.cmd test
npm.cmd run build
npm.cmd run dev
```

Prueba manual remota completada el 2026-11-23: dos cuentas confirmadas probaron alta/cambio/eliminación, persistencia tras recarga y aislamiento entre carritos. La API anónima consultó los 16 productos y recibió HTTP 401 al leer o escribir carritos. Los artículos temporales de la prueba se limpiaron; las dos cuentas de prueba se conservaron vacías.

## Estado actual y tareas de entrega (2026-11-23)

- Supabase CLI autenticada y proyecto `MobileZone` enlazado: referencia `pqtgjvdlvwrkywmrbktv`, región `sa-east-1`, estado `ACTIVE_HEALTHY`.
- Configuración remota de Auth aplicada: URL pública de GitHub Pages, redirección para desarrollo local y longitud mínima de contraseña de 8. `supabase config diff` confirmó cero diferencias pendientes.
- Migración `20261118191900_mobilezone_catalog_and_owned_carts.sql` y `seed.sql` aplicados. `supabase migration list --remote` confirmó la migración.
- `react-app/.env.local` contiene la URL y clave publicable; Git la ignora. No guardar claves secretas o `service_role` en el cliente.
- Pruebas manuales: dos cuentas, confirmación e inicio de sesión, alta/cambio/eliminación de artículos, persistencia tras recarga y aislamiento de carritos. API anónima leyó el catálogo (16 productos) y recibió HTTP 401 para `carts`, `cart_items` y `add_cart_item`.
- Suite local: 14/14 pruebas pasan; build de producción pasa.
- Variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` creadas en GitHub Actions y verificadas contra `.env.local` sin mostrar sus valores. El artículo de prueba restante se eliminó; quedan dos cuentas Auth de prueba con carritos vacíos.
- Despliegue publicado: commit `8c2eb02` en `main`; GitHub Actions terminó correctamente (run 45223633677) y la URL de GitHub Pages respondió HTTP 200. Pendiente para la presentación: grabar el video y mostrar en Supabase la fila creada desde la web. El [informe procesual](docs/informe-procesual-mobilezone.md) y la [guía de presentación](docs/guia-presentacion-mobilezone.md) describen cómo hacerlo. El workflow `.github/workflows/pages.yml` consume las variables y detiene el build si faltan.

El usuario decidió posponer el CRUD administrativo del catálogo, soporte/contacto, solicitudes de privacidad y roles. El estado detallado está en [.docs/supabase-integration/CHECKLIST.md](.docs/supabase-integration/CHECKLIST.md).
