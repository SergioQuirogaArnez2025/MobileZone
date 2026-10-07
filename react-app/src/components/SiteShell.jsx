import { useState } from 'react'
import { navItems } from '../data/catalog.js'

function RouteLink({ path, onNavigate, children, className = '', ...props }) {
  return (
    <a
      href={path}
      className={className}
      onClick={(event) => {
        if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
          event.preventDefault()
          onNavigate(path)
        }
      }}
      {...props}
    >
      {children}
    </a>
  )
}

export function Header({ currentPath, cartCount, onNavigate, onFocusHomeSearch, onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  const navigateFromMenu = (path) => {
    setMenuOpen(false)
    setSearchOpen(false)
    onNavigate(path)
  }

  const submitSearch = (event) => {
    event.preventDefault()
    onSearch(query)
    setSearchOpen(false)
  }

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <RouteLink path="/inicio" onNavigate={navigateFromMenu} className="brand-mark">MOBILEZONE</RouteLink>
          <nav className="desktop-nav" aria-label="Navegación principal">
            {navItems.map((item) => (
              <RouteLink
                key={item.path}
                path={item.path}
                onNavigate={navigateFromMenu}
                className={currentPath === item.path ? 'nav-link is-active' : 'nav-link'}
                aria-current={currentPath === item.path ? 'page' : undefined}
              >
                {item.label}
              </RouteLink>
            ))}
          </nav>
          <div className="header-actions">
            <button type="button" className="icon-button cart-button" aria-label={`Carrito de compras, ${cartCount} artículos`} onClick={() => navigateFromMenu('/carrito')}>
              <span className="material-symbols-outlined" aria-hidden="true">shopping_cart</span>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
            <button type="button" className="icon-button" aria-label="Buscar smartphones" onClick={() => {
              if (currentPath === '/inicio') onFocusHomeSearch()
              else setSearchOpen((open) => !open)
            }}>
              <span className="material-symbols-outlined" aria-hidden="true">search</span>
            </button>
            <button type="button" className="icon-button menu-toggle" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
              <span className="material-symbols-outlined" aria-hidden="true">{menuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="mobile-menu" aria-label="Navegación móvil">
            {navItems.map((item) => <RouteLink key={item.path} path={item.path} onNavigate={navigateFromMenu}>{item.label}</RouteLink>)}
          </nav>
        )}
      </header>
      {searchOpen && (
        <form className="search-popover" role="search" onSubmit={submitSearch}>
          <label className="sr-only" htmlFor="site-search">Buscar smartphones</label>
          <input id="site-search" type="search" placeholder="Buscar smartphones..." value={query} onChange={(event) => setQuery(event.target.value)} autoFocus />
          <button className="button button--primary" type="submit">Buscar</button>
        </form>
      )}
    </>
  )
}

export function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <RouteLink path="/inicio" onNavigate={onNavigate} className="brand-mark">MOBILEZONE</RouteLink>
          <p>Tu destino premium para tecnología móvil y accesorios de alto rendimiento.</p>
          <small>© 2026 Sergio Quiroga. Todos los derechos reservados.</small>
        </div>
        <div>
          <h2>Navegación</h2>
          <div className="footer-links">{navItems.map((item) => <RouteLink key={item.path} path={item.path} onNavigate={onNavigate}>{item.label}</RouteLink>)}</div>
        </div>
        <div>
          <h2>Ayuda</h2>
          <div className="footer-links">
            <RouteLink path="/contacto" onNavigate={onNavigate}>Contacto</RouteLink>
            <a href="mailto:soporte@mobilezone.com">Soporte</a>
            <a href="tel:+59162628578">Línea de atención</a>
          </div>
        </div>
        <div>
          <h2>Síguenos</h2>
          <div className="footer-links">
            <a href="https://www.facebook.com/MobileZone.AR" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://wa.me/59162628578" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export function SiteShell({ currentPath, cartCount, onNavigate, onFocusHomeSearch, onSearch, children }) {
  return (
    <div className="app-shell">
      <Header currentPath={currentPath} cartCount={cartCount} onNavigate={onNavigate} onFocusHomeSearch={onFocusHomeSearch} onSearch={onSearch} />
      {children}
      <Footer onNavigate={onNavigate} />
    </div>
  )
}