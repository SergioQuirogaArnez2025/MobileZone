# Informe procesual del proyecto MobileZone

**Fecha de entrega:** 23 de noviembre de 2026  
**Repositorio:** https://github.com/SergioQuirogaArnez2025/MobileZone  
**Sitio publicado:** https://sergioquirogaarnez2025.github.io/MobileZone/

## Resumen del proyecto

MobileZone es una tienda web desarrollada con React y Vite. La versión entregada muestra un catálogo de productos consultado desde Supabase y permite que una persona cree una cuenta, inicie sesión y gestione su carrito remoto. La base de datos conserva el carrito y sus artículos; las reglas de seguridad limitan cada carrito a su usuario autenticado.

El despliegue de GitHub Pages terminó correctamente y la página respondió HTTP 200. La integración se comprobó con pruebas automatizadas, consultas al API y pruebas manuales con dos cuentas. La entrega cubre catálogo público y carritos privados; la administración de productos, contacto persistente, solicitudes de privacidad, roles de personal y pago no forman parte del alcance implementado.

## Objetivo

Conectar el proyecto MobileZone con una base de datos real y comprobar que las operaciones del carrito realizadas desde la página se guardan en Supabase. Además, se buscó proteger los datos de cada cuenta para que otro usuario no pueda leer o modificar su carrito.

## Proceso de desarrollo

### 1. Revisión del proyecto y del modelo

Se revisó la aplicación React existente, el flujo anterior del carrito y el documento ER/CRUD proporcionado para la evaluación. A partir de esa revisión se identificaron las entidades necesarias para el alcance acordado: productos, carritos y artículos del carrito. También se separaron las funciones implementadas de las propuestas de administración y soporte que no tenían definidos sus permisos ni flujos.

### 2. Preparación del proyecto Supabase

Se creó el proyecto MobileZone en Supabase, se autenticó Supabase CLI y se vinculó el proyecto remoto al repositorio local. Se configuraron Auth y las URL de redirección para el sitio publicado y el desarrollo local. Las credenciales locales se guardan en un archivo ignorado por Git; al frontend solo se entrega la URL del proyecto y la clave publicable.

### 3. Esquema y seguridad de datos

Se creó y aplicó una migración SQL con las tablas `products`, `carts` y `cart_items`, sus relaciones, claves foráneas y restricciones. La cantidad debe ser un entero entre 1 y 99, y cada producto aparece como máximo una vez por carrito.

Se habilitó Row Level Security (RLS). El catálogo permite lectura pública; las operaciones sobre carritos y artículos requieren autenticación y las políticas comprueban que el carrito pertenece al usuario activo. La función `add_cart_item` valida la sesión y la cantidad antes de escribir. El catálogo de demostración se cargó mediante `seed.sql`.

### 4. Integración con la aplicación

Se centralizó el cliente de Supabase y la capa de consultas de datos. La aplicación carga productos desde la base, solicita el inicio de sesión para usar el carrito remoto y permite añadir productos, cambiar cantidades y eliminar artículos. Después de cada operación, vuelve a consultar los datos para reflejar la respuesta del servidor.

### 5. Pruebas

Se ejecutaron 14 pruebas automatizadas y todas pasaron. También se probaron manualmente dos cuentas: cada una vio su propio carrito, la cantidad persistió después de recargar y el cambio y la eliminación se reflejaron en la base. Las llamadas anónimas pudieron leer el catálogo, pero recibieron HTTP 401 al intentar acceder a los carritos o usar la función de escritura. Las cantidades 0 y 100 fueron rechazadas por PostgreSQL con SQLSTATE `23514`.

Los datos temporales de carrito usados en la prueba se limpiaron. Se conservaron dos cuentas de prueba con carritos vacíos.

### 6. Publicación

Se configuraron en GitHub Actions las variables de compilación `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY`. El workflow ejecuta instalación, pruebas, compilación y publicación en GitHub Pages. La ejecución del commit `818228b` finalizó correctamente y la URL publicada respondió HTTP 200. El estado del repositorio quedó limpio y sincronizado con `main`.

## Herramientas utilizadas

- **React y Vite:** interfaz de la tienda y compilación del sitio.
- **Supabase Auth:** registro, confirmación de correo e inicio de sesión.
- **Supabase Database y PostgreSQL:** almacenamiento de productos, carritos y artículos.
- **Row Level Security y funciones SQL:** control de acceso y validación en el servidor.
- **Supabase CLI:** autenticación, enlace del proyecto y aplicación/verificación de migraciones.
- **Git y GitHub:** control de versiones y repositorio del proyecto.
- **GitHub Actions y GitHub Pages:** pruebas, compilación y despliegue.
- **Pruebas automatizadas de JavaScript:** verificación de validaciones y lógica de la aplicación.

## Resultados obtenidos

- Catálogo con 16 productos disponible desde Supabase.
- Carrito persistente, asociado a la cuenta autenticada.
- Separación de los carritos entre dos cuentas de prueba.
- Control de acceso anónimo y validación de cantidades comprobados.
- 14 de 14 pruebas automatizadas aprobadas y compilación de producción exitosa.
- Sitio desplegado y accesible en GitHub Pages.

## Límites actuales

La aplicación no incluye una pantalla administrativa para crear, editar o borrar productos. El formulario de contacto y otras interacciones de soporte no guardan datos en Supabase; tampoco hay flujo de solicitudes de privacidad, roles administrativos, pedidos confirmados ni pagos. Estas funciones se dejaron fuera del alcance acordado porque requieren definir permisos y procesos adicionales.

Antes de entregar el video, se recomienda hacer una última prueba en la URL publicada con una cuenta de demostración: iniciar sesión, agregar un producto, mostrar su fila en `cart_items` desde Supabase, recargar para mostrar persistencia y retirar el artículo temporal al terminar.

## Conclusión

MobileZone está conectado a Supabase para la lectura del catálogo y la gestión segura de carritos por usuario. Las comprobaciones realizadas muestran que las escrituras se conservan y que RLS impide el acceso anónimo a datos privados. El repositorio y la aplicación están publicados; la exposición oral en video y la demostración visual de la fila en Supabase son las actividades que restan para completar la presentación.