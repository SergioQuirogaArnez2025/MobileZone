export const routeTitles = {
  '/inicio': 'MobileZone | Smartphones premium',
  '/smartphones': 'Catálogo completo - MobileZone',
  '/comparar': 'Comparación - MobileZone',
  '/ofertas': 'Ofertas especiales - MobileZone',
  '/contacto': 'Contacto - MobileZone',
  '/carrito': 'Carrito de compras - MobileZone',
  '/landing': 'MobileZone | Premium Smartphones',
}

export function getRouteLocation(pathname, search = '', basePath = '') {
  const base = basePath.replace(/\/$/, '')
  let path = pathname

  if (base && (path === base || path === `${base}/`)) path = '/'
  else if (base && path.startsWith(`${base}/`)) path = path.slice(base.length)

  path = path.replace(/\/+$/, '') || '/'
  if (path === '/' || path === '/index.html') path = '/inicio'

  return { path, search }
}

export function getPageTitle(path) {
  return routeTitles[path] || 'Página no encontrada - MobileZone'
}
