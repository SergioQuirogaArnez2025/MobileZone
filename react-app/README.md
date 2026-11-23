# MobileZone

Aplicación de tienda construida con React y Vite.

## Desarrollo local

```sh
npm ci
npm run dev
```

Ejecuta las pruebas de rutas y precios con `npm test`.

Para generar y revisar la compilación de producción:

```sh
npm run build
npm run preview
```

## Supabase

El catálogo se lee de Supabase y el carrito remoto requiere iniciar sesión desde **Mi cuenta**. Configura primero las variables públicas en `.env.local` usando [.env.example](./.env.example). La CLI, los comandos de migración, RLS, Auth y el procedimiento de verificación están en [SUPABASE_SETUP.md](../SUPABASE_SETUP.md).

## GitHub Pages

El workflow [Deploy to GitHub Pages](../.github/workflows/pages.yml) compila `react-app` y publica el contenido de `dist` en cada push a `main`. El sitio está disponible en <https://sergioquirogaarnez2025.github.io/MobileZone/>.

La compilación de Pages usa `/MobileZone/` como ruta base y genera un `404.html` para que las rutas de la aplicación también funcionen al abrirlas directamente.
