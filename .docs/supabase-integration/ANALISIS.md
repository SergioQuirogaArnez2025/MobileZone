# Análisis del modelo ER/CRUD y su integración con MobileZone

## Fuente y alcance

Fuente revisada: [ER-CRUD.pdf](../ER-CRUD/ER-CRUD.pdf), documento de 8 páginas. Se comprobó que es un PDF legible mediante extracción de texto y revisión visual de todas sus páginas. El propio documento se titula «Cambios y mejoras realizados en MobileZone»; no es una especificación completa de producción. En particular, presenta el diagrama relacional de carrito como propuesta, describe permisos futuros y no define todos los tipos SQL, nulabilidad, valores por defecto, acciones referenciales ni políticas ejecutables.

Esta sección separa lo que indica el PDF de las decisiones que aún requieren confirmación. No se crean entidades o privilegios como si fueran requisitos confirmados.

## Entidades y restricciones

### Modelo ER de carrito (página 4)

Cardinalidades descritas por el diagrama: `Carrito 1 — 0..N ItemCarrito` y `Producto 1 — 0..N ItemCarrito`. Cada artículo pertenece a un carrito y referencia un producto. El diagrama no especifica `ON DELETE`, propiedad del carrito, ni si se permiten dos líneas del mismo producto en un carrito.

| Entidad / atributo | Tipo PostgreSQL propuesto | PK / FK | Nulabilidad y valor por defecto | Restricción / fuente |
|---|---|---|---|---|
| `products.id` | `uuid` | PK | No nulo; UUID generado | El diagrama marca PK; generación UUID es una decisión técnica pendiente de migración. |
| `products.name` | `varchar(160)` | — | No nulo; sin valor por defecto | El diagrama llama al atributo `nombre`; tamaño y nulabilidad son decisiones por consistencia con el catálogo actual. |
| `products.brand` | `varchar(100)` | — | No nulo; sin valor por defecto | El diagrama llama al atributo `marca`; límites/nulabilidad no están en la fuente. |
| `products.image` | `text` | — | Nulo permitido; sin valor por defecto | El diagrama llama al atributo `imagen`; se permite nulo por decisión técnica. |
| `products.official_price` | `numeric(12,2)` | — | No nulo; sin valor por defecto | El diagrama dice `decimal precio_oficial`; escala y restricción `>= 0` son decisiones propuestas. |
| `carts.id` | `uuid` | PK | No nulo; UUID generado | El diagrama marca PK; no define propietario ni cómo se emite el ID. |
| `cart_items.id` | `uuid` | PK | No nulo; UUID generado | El diagrama marca PK; generación UUID es una decisión técnica. |
| `cart_items.cart_id` | `uuid` | FK → `carts.id` | No nulo | El diagrama marca FK. Acción de borrado pendiente; cascada es la opción propuesta para líneas al borrar carrito. |
| `cart_items.product_id` | `uuid` | FK → `products.id` | No nulo | El diagrama marca FK. Acción de borrado pendiente; restringir el borrado evita referencias rotas. |
| `cart_items.quantity` | `integer` | — | No nulo; sin valor por defecto | El diagrama indica entero. El PDF exige entero positivo; la app actual limita a 1–99. El límite superior del modelo remoto se debe confirmar/definir en migración. |

El esquema ilustrativo preexistente en [análisis-entidad-crud-seguridad.md](../../docs/analisis-entidad-crud-seguridad.md) propone `UNIQUE (cart_id, product_id)`, `CHECK (official_price >= 0)`, cantidad entre 1 y 99 y cascada al borrar carrito. Son decisiones razonables alineadas con la app, pero no todas aparecen en el diagrama del PDF. Deben conservarse como decisiones identificadas, no atribuirse literalmente al PDF.

`price` no se guarda en `cart_items`: se obtiene de `products.official_price`. El PDF dice que el navegador no es fuente confiable y que una futura API debe volver a calcular la cotización; la interfaz actual solo calcula un resumen local y prepara un enlace de WhatsApp, no crea una orden ni verifica un pago.

### Decisiones acordadas para la implementación

- El usuario eligió Supabase Auth como identidad del propietario: `carts.user_id` referencia `auth.users.id`, es único y no puede modificarse a otro usuario por RLS. Esto amplía el ER dibujado, que no contenía propietario, pero permite aplicar el permiso de titular sin acceso cruzado.
- La app usa cada ID de catálogo actual como `products.sku` único porque distintas superficies tienen IDs de presentación distintos. La PK sigue siendo UUID y `cart_items.product_id` referencia la PK. Esta compatibilidad conserva los identificadores actuales; una normalización comercial futura podría reunir variantes del mismo modelo.
- Para renderizar la interfaz actual, `products` añade opcionales de presentación (`badge`, `description`, `details`, `specs`, `tagline`) que no aparecen en el ER. No son fuente del precio ni del propietario.
- `products` se leerá públicamente; no se habilita C/U/D de catálogo desde el cliente. El usuario decidió posponer el CRUD administrativo y el soporte. Las tablas de contacto y privacidad también se posponen.
- `carts` no tiene atributos mutables en el ER; la aplicación crea/lee el carrito y crea/lee/actualiza/elimina sus artículos. La cantidad 1–99 se alinea con el código existente y se aplica en Postgres.

### Entidades de privacidad propuestas (páginas 5–6)

El PDF propone los conceptos de mensaje de contacto, solicitud de privacidad y personal autorizado, pero no presenta para ellos un ER completo ni DDL detallado. La implementación actual solo contiene un formulario de contacto con una confirmación simulada; no persiste mensajes ni hay roles o interfaz de soporte. Auth sí se usa para cuentas/carritos, pero no se crearon roles administrativos. La entidad newsletter tampoco forma parte del modelo ER del PDF y queda fuera de esta integración.

| Entidad / atributos descritos en el análisis del proyecto | Tipo PostgreSQL propuesto | PK / FK | Nulabilidad, defaults y restricciones propuestas |
|---|---|---|---|
| `contact_messages`: `id`, `full_name`, `email`, `message`, `status`, `created_at`, `updated_at` | UUID, `varchar(120)`, `varchar(254)`, `text`, `varchar(20)`, `timestamptz` | `id` PK | Campos de contenido no nulos; estado inicial `new`; timestamps con `now()`; estados controlados. La fuente y el análisis no definen una retención aprobada. |
| `privacy_requests`: `id`, `contact_message_id`, `request_type`, `status`, `requester_email`, `requested_correction`, datos de verificación/resolución | UUID, `varchar`, `text`, `timestamptz` | `id` PK; `contact_message_id` FK opcional | Tipo/estado controlados; correo no nulo; estado inicial de verificación; borrar mensaje no debe borrar el trámite. Verificación y retención requieren política aprobada. |
| Personal autorizado (`staff_accounts` en la propuesta del análisis) | UUID y rol | `id` vinculado a una identidad autenticada | Lista de roles propuesta; no permitir autoasignación ni aceptar un rol enviado por el navegador. El origen confiable del rol y el proceso de alta aún no están configurados. |

Estas tablas no se consideran requisitos confirmados por el diagrama de carrito. El PDF dice que son propuestas y que el titular no debe poder leer/modificar mensajes ajenos; atención autorizada tramita solicitudes tras verificar titularidad. No define una política de verificación, retención, acceso de soporte ni protección contra abuso del formulario. No se debe conceder lectura pública de datos personales ni crear una política amplia de escritura para ocultar ese vacío.

## CRUD y correspondencia con la aplicación

El PDF describe el uso y las reglas esperadas, pero no incluye una matriz CRUD formal. La siguiente matriz distingue las operaciones que se desprenden de la fuente de las que aún no son posibles de autorizar.

| Página del PDF → entidad | Operación CRUD requerida o propuesta | Flujo / archivo actual | Acceso indicado en la fuente | Verificación necesaria |
|---|---|---|---|---|
| Pág. 2–4 → `products` | C: administrador; R: visitante; U/D: administrador (C/U/D administrativo se deriva de la propuesta de permisos, no del ER gráfico). | Lectura remota centralizada en [mobilezoneData.js](../../react-app/src/lib/mobilezoneData.js); presentación en [StorePages.jsx](../../react-app/src/pages/StorePages.jsx). | Lectura pública; escritura protegida. No hay interfaz de administración en esta fase. | R verificada: API anónima devuelve 16 productos. C/U/D se pospusieron por decisión del usuario. |
| Pág. 2–4 → `carts` | Crear/obtener y leer por titular; no hay atributos mutables ni eliminación del carrito desde UI. | [App.jsx](../../react-app/src/App.jsx) carga carrito remoto por sesión; `ensureUserCart` en [mobilezoneData.js](../../react-app/src/lib/mobilezoneData.js). | Titular autenticado, con RLS por `auth.uid()`. | Dos cuentas probaron aislamiento. Cliente anónimo no pudo leer `carts` (HTTP 401). |
| Pág. 2–4 → `cart_items` | C/R/U/D: propietario; actualización solo de cantidad; 1–99 en la app; el total se deriva del catálogo. | Añadir, cambiar cantidad, eliminar y resumen en [App.jsx](../../react-app/src/App.jsx); [StorePages.jsx](../../react-app/src/pages/StorePages.jsx). | Propietario del carrito. No confiar en precio/nombre remitidos por el navegador. | RLS entre dos usuarios y C/R/U/D verificados desde la app; persistencia verificada tras recargar. La suite cubre validación de cantidad; queda una llamada negativa autenticada contra remoto. |
| Pág. 5–6 → `contact_messages` (propuesta) | C: visitante; R/U/D: personal autorizado; titular solo mediante trámite verificado. | [ContactPage](../../react-app/src/pages/StorePages.jsx) actualmente simula el envío con un temporizador. | Mensajes personales no públicos; acceso limitado al personal, con derechos del titular mediados por verificación. | Acordar forma de identidad/verificación, roles de soporte, antiabuso y retención antes de abrir acceso por API. |
| Pág. 5–6 → `privacy_requests` (propuesta) | C: titular; R: titular verificado para estado y personal asignado; U/D: solo personal y conforme a retención. | No hay flujo de privacidad en la aplicación. | La solicitud no otorga acceso al mensaje; personal autorizado verifica y tramita. | Confirmar procedimiento, verificación, acceso a solicitudes y conservación antes de migrar o exponer la entidad. |
| Pág. 6 → personal/roles (propuesta) | Alta, lectura, cambio de rol y baja no se definen como CRUD de la aplicación. | Existe Auth de cliente para cuentas y carritos; no hay interfaz de personal ni roles administrativos. | El rol debe ser asignado por una fuente confiable, nunca por el visitante. | Definir administradores/soporte sin autoelevación; se recomienda configuración exclusivamente confiable (no desde cliente). |

### Estado de ejecución y pendientes (2026-11-23)

1. Proyecto remoto `MobileZone` creado en la organización gratuita, región `sa-east-1`, referencia `pqtgjvdlvwrkywmrbktv`; CLI autenticada y proyecto enlazado.
2. Supabase Auth y redirecciones aplicadas al remoto. La longitud mínima de contraseña es 8 y el sitio apunta a GitHub Pages; la redirección de desarrollo local está permitida.
3. Migración y seed aplicados; `supabase migration list --remote` confirmó `20261118191900`. El API anónimo devolvió 16 productos y denegó lectura de `carts`/`cart_items` y ejecución anónima de `add_cart_item` (HTTP 401).
4. Prueba manual con dos cuentas: registro, confirmación, inicio de sesión, carrito persistente, cambio de cantidad, eliminación y aislamiento entre cuentas. La suite tiene 14/14 pruebas y la build de producción pasa.
5. Se pospusieron C/U/D administrativos de catálogo, contacto, privacidad y roles por decisión del usuario. Se eliminó el único artículo agregado durante la prueba; quedan dos cuentas Auth de prueba con sus carritos vacíos.
6. Las variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` ya están creadas y verificadas en GitHub Actions. El commit `818228b` se subió a `main`; GitHub Actions terminó `success` (run 45223177861) y la URL publicada respondió HTTP 200. Las llamadas autenticadas al RPC con cantidades 0 y 100 fueron rechazadas por Postgres con SQLSTATE `23514` antes de insertar; las escrituras anónimas a carrito/RPC también fueron denegadas.

## Mapa de páginas

| Página | Contenido relevante y uso en este análisis |
|---|---|
| 1 | Portada «Cambios y mejoras realizados en MobileZone». |
| 2 | Resumen ejecutivo: carrito corregido, ER propuesto, permisos futuros y estado de preparación Supabase. |
| 3 | Restauración del carrito; valida ID y cantidad positiva; datos de producto salen del catálogo. |
| 4 | Diagrama ER propuesto de `Carrito`, `Producto` e `ItemCarrito`, campos y cardinalidades. |
| 5 | Catálogo público, integridad de precio y privacidad de datos de contacto. |
| 6 | Roles y permisos propuestos para titulares, atención y administración del catálogo. |
| 7 | Preparación local de CLI/SDK/env; autenticación, enlace y esquema remoto pendientes. |
| 8 | Pruebas y documentación existente; confirma que no prueba RLS ni remoto. |
