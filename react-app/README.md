# MobileZone

Aplicación de tienda construida con React y Vite.

## Desarrollo local

```sh
npm ci
npm run dev
```

Para generar y revisar la compilación de producción:

```sh
npm run build
npm run preview
```

## GitHub Pages

El workflow [Deploy to GitHub Pages](../.github/workflows/pages.yml) compila `react-app` y publica el contenido de `dist` en cada push a `main`. El sitio está disponible en <https://sergioquirogaarnez2025.github.io/MobileZone/>.

La compilación de Pages usa `/MobileZone/` como ruta base y genera un `404.html` para que las rutas de la aplicación también funcionen al abrirlas directamente.
