# Guía para la presentación de MobileZone

## Datos para la entrega

- **Repositorio:** https://github.com/SergioQuirogaArnez2025/MobileZone
- **Aplicación:** https://sergioquirogaarnez2025.github.io/MobileZone/
- **Informe procesual:** `docs/informe-procesual-mobilezone.md`
- **Duración sugerida del video:** 5 a 7 minutos.

## Antes de grabar

1. Abre la página publicada y el panel del proyecto MobileZone en Supabase.
2. Comprueba que puedes iniciar sesión con una cuenta de demostración y que el correo ya está confirmado. No muestres ni compartas contraseñas, tokens ni claves.
3. Deja abierta la página de la tienda y prepara Supabase en **Table Editor** o **SQL Editor**.
4. Si creas una cuenta para la presentación, usa un correo al que tengas acceso para confirmar el registro. Evita usar datos personales reales en el video.
5. No debe haber datos de prueba que no quieras que aparezcan en la grabación. La consulta de abajo muestra filas de carrito; limpia el artículo temporal al terminar.

## Guion sugerido

### 1. Presentación (30 segundos)

“Este es MobileZone, una tienda web hecha con React y Vite. El catálogo se obtiene de Supabase. Los usuarios pueden iniciar sesión y guardar su carrito en una base de datos, con reglas que separan la información de cada cuenta.”

### 2. Repositorio y tecnologías (45 segundos)

Muestra el repositorio de GitHub y señala brevemente `react-app`, `supabase/migrations` y el workflow de GitHub Actions. Indica que el proyecto usa React, Vite, Supabase Auth, PostgreSQL, RLS y GitHub Pages. No abras archivos `.env.local` ni muestres credenciales.

### 3. Funcionamiento de la página (1 a 2 minutos)

1. Abre la aplicación publicada y muestra el catálogo.
2. Abre **Mi cuenta** e inicia sesión con la cuenta de demostración confirmada.
3. Añade un producto al carrito y cambia su cantidad a 2.
4. Muestra el carrito con el producto y la cantidad elegida.
5. Recarga la página para mostrar que los datos se recuperan de Supabase.

### 4. Verificación directa en Supabase (1 a 2 minutos)

En el panel del proyecto, abre **SQL Editor** y ejecuta la consulta siguiente. Muestra el nombre del producto y la cantidad que acabas de cambiar desde la web:

```sql
select
  ci.id as cart_item_id,
  p.name as product,
  ci.quantity,
  c.user_id
from public.cart_items as ci
join public.carts as c on c.id = ci.cart_id
join public.products as p on p.id = ci.product_id
order by ci.id desc;
```

Explica que la fila consultada es el artículo agregado desde la página y que `quantity` coincide con el valor del carrito. Para evitar exponer información innecesaria, no muestres correos ni compartas los identificadores de usuario en el video.

Luego, si el tiempo alcanza, vuelve a la página, elimina el artículo y ejecuta la consulta otra vez para mostrar que también se guardó la eliminación. La consulta se ejecuta con acceso de administración del panel; la seguridad para usuarios normales se aplica con RLS.

### 5. Seguridad y cierre (45 segundos)

Explica que el catálogo tiene lectura pública, pero los carritos exigen sesión autenticada y solo son visibles para su propietario. Menciona que las cantidades válidas van de 1 a 99 y que 0 y 100 fueron rechazadas por el servidor. Cierra compartiendo el enlace del repositorio y el de la página publicada.

## Después de grabar

- Revisa que se escuchen las explicaciones y que los textos de Supabase se lean en el video.
- Confirma que el video muestre al menos una fila creada desde la web y la misma fila en la base de datos.
- Borra el artículo temporal del carrito usado para la demostración y verifica que ya no aparezca en `cart_items`.
- Sube el video a la plataforma que indique el docente y comparte el enlace junto con el del repositorio.

## Qué queda por hacer para entregar

- Grabar y revisar el video demostrativo; todavía no hay una grabación en el repositorio.
- Ejecutar la demostración en la URL publicada y capturar en video la fila de Supabase. Las pruebas previas confirman la integración, pero no sustituyen esa evidencia audiovisual solicitada.
- Compartir los enlaces del repositorio, la página y el video en la entrega del curso.