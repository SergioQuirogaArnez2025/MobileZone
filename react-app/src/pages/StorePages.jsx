import { useEffect, useMemo, useRef, useState } from 'react'
import { catalogProducts, comparisonProducts, comparisonSpecs, homeProducts, offerProducts, productPrices, storePhoto } from '../data/catalog.js'
import { formatPrice } from '../components/ProductCard.jsx'
import { ProductCard } from '../components/ProductCard.jsx'

const currency = (value) => formatPrice(value, true)

function ProductGrid({ products, onOpen, onAdd, favorites, onFavorite, offer = false }) {
  return (
    <div className="product-grid">
      {products.map((product) => <ProductCard key={product.id} product={product} onOpen={onOpen} onAdd={onAdd} favorite={favorites?.has(product.id)} onFavorite={onFavorite} offer={offer} />)}
    </div>
  )
}

export function HomePage({ searchRef, searchValue, setSearchValue, onOpen, onAdd, onNavigate }) {
  const [brand, setBrand] = useState('all')
  const brands = [
    { id: 'all', label: 'Todas' },
    { id: 'Apple', label: 'Apple' },
    { id: 'Samsung', label: 'Samsung' },
    { id: 'Xiaomi', label: 'Xiaomi' },
  ]
  const filteredProducts = homeProducts.filter((product) => {
    const matchesBrand = brand === 'all' || product.brand === brand
    const matchesSearch = `${product.name} ${product.description}`.toLowerCase().includes(searchValue.toLowerCase())
    return matchesBrand && matchesSearch
  })

  return (
    <main>
      <section className="home-hero" id="inicio">
        <div className="home-hero__inner">
          <div className="home-hero__copy">
            <span className="status-pill"><span />Nueva Colección 2026</span>
            <h1>Encuentra el smartphone perfecto para ti</h1>
            <p>Descubre la última tecnología móvil. Rendimiento superior, cámaras profesionales y diseños que redefinen la elegancia digital.</p>
            <div className="hero-actions">
              <a className="button button--primary button--large" href="#smartphones">Explorar smartphones</a>
              <button className="button button--secondary button--large" type="button" onClick={() => onNavigate('/ofertas')}>Ver ofertas</button>
            </div>
          </div>
          <div className="home-hero__visual">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUfrAQbotU5UwH2DUuQ8kq1_K5BZmMg5boc5sdGiK-LBMKGaf16-PEY9QgAWULIKUc1OfvuC850ydnj8sQmJI3SSbSzjminKPiVflvx7MzjLWKEO8r3Hly7boeWTHXrYO6Vy6qRIbK__W1NQOQErcuQUncQUuturVUADnmXft1_1fazx88qxyUzIlQKqwLR6PdnIgBETTLEYZeGVPfhcjz_-Ha8J6SQyCG2ouFWEF6_3e5f1c71v0Z" alt="Tres smartphones premium" fetchPriority="high" />
          </div>
        </div>
      </section>
      <section className="home-filter" aria-label="Buscar y filtrar productos">
        <div className="home-filter__inner">
          <label className="search-field">
            <span className="material-symbols-outlined" aria-hidden="true">search</span>
            <span className="sr-only">Buscar por modelo o características</span>
            <input ref={searchRef} type="search" placeholder="Buscar por modelo, características..." value={searchValue} onChange={(event) => setSearchValue(event.target.value)} />
            {searchValue && <button className="search-clear" type="button" aria-label="Limpiar búsqueda" onClick={() => setSearchValue('')}><span className="material-symbols-outlined" aria-hidden="true">close</span></button>}
          </label>
          <div className="filter-chips" aria-label="Filtrar por marca">
            {brands.map((item) => <button key={item.id} className={`filter-chip${brand === item.id ? ' is-active' : ''}`} type="button" aria-pressed={brand === item.id} onClick={() => setBrand(item.id)}>{item.label}</button>)}
          </div>
        </div>
      </section>
      <section className="content-section" id="smartphones">
        <div className="section-heading section-heading--center">
          <p className="eyebrow">Selección MobileZone</p>
          <h2>Catálogo Premium</h2>
        </div>
        {filteredProducts.length ? <ProductGrid products={filteredProducts} onOpen={onOpen} onAdd={onAdd} /> : <p className="empty-results">No encontramos productos que coincidan con la búsqueda.</p>}
        <div className="section-tail"><button className="button button--secondary" type="button" onClick={() => onNavigate('/smartphones')}>Ver catálogo completo<span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span></button></div>
      </section>
    </main>
  )
}

export function SmartphonesPage({ initialSearch = '', onOpen, onAdd }) {
  const [query, setQuery] = useState(initialSearch)
  const [brands, setBrands] = useState(() => initialSearch ? [] : ['Apple', 'Samsung'])
  const [maxPrice, setMaxPrice] = useState(1500)
  const [sort, setSort] = useState('recommended')
  const [favorites, setFavorites] = useState(() => new Set())

  useEffect(() => {
    setQuery(initialSearch)
    if (initialSearch) setBrands([])
  }, [initialSearch])

  const products = useMemo(() => {
    const matches = catalogProducts.filter((product) => {
      const matchesBrand = brands.length === 0 || brands.includes(product.brand)
      const matchesPrice = product.price <= maxPrice
      const matchesSearch = `${product.name} ${product.brand} ${product.description}`.toLowerCase().includes(query.toLowerCase())
      return matchesBrand && matchesPrice && matchesSearch
    })
    if (sort === 'low') return [...matches].sort((a, b) => a.price - b.price)
    if (sort === 'high') return [...matches].sort((a, b) => b.price - a.price)
    if (sort === 'newest') return [...matches].reverse()
    return matches
  }, [brands, maxPrice, query, sort])

  const toggleBrand = (brand) => setBrands((current) => current.includes(brand) ? current.filter((item) => item !== brand) : [...current, brand])
  const toggleFavorite = (id) => setFavorites((current) => { const next = new Set(current); next.has(id) ? next.delete(id) : next.add(id); return next })
  const clearFilters = () => { setBrands([]); setMaxPrice(1500); setQuery(''); setSort('recommended') }

  return (
    <main className="catalog-page page-wrap">
      <aside className="catalog-sidebar">
        <div className="filter-panel">
          <h1>Filtros</h1>
          <fieldset>
            <legend>Marca</legend>
            {['Apple', 'Samsung', 'Google', 'Xiaomi'].map((brand) => <label className="check-row" key={brand}><input type="checkbox" checked={brands.includes(brand)} onChange={() => toggleBrand(brand)} /><span>{brand}</span></label>)}
          </fieldset>
          <fieldset>
            <legend>Precio máximo</legend>
            <div className="range-labels"><span>$200</span><output>{formatPrice(maxPrice)}+</output></div>
            <input aria-label="Precio máximo" className="price-range" type="range" min="200" max="1500" step="50" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} />
          </fieldset>
          <button className="button button--secondary button--wide" type="button" onClick={clearFilters}>Limpiar filtros</button>
        </div>
      </aside>
      <section className="catalog-content">
        <div className="catalog-heading">
          <div><p className="eyebrow">Tecnología para cada día</p><h1>Nuestro Catálogo Completo</h1><p>Mostrando {products.length} dispositivos de última generación.</p></div>
          <label className="sort-control">Ordenar por:
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="recommended">Recomendados</option><option value="low">Precio: Menor a Mayor</option><option value="high">Precio: Mayor a Menor</option><option value="newest">Novedades</option>
            </select>
          </label>
        </div>
        {products.length ? <ProductGrid products={products} onOpen={onOpen} onAdd={onAdd} favorites={favorites} onFavorite={toggleFavorite} /> : <p className="empty-results">No hay productos con esos filtros. <button type="button" className="text-button" onClick={clearFilters}>Limpiar filtros</button></p>}
      </section>
    </main>
  )
}

export function NotFoundPage({ onNavigate }) {
  return (
    <main className="not-found-page page-wrap" aria-labelledby="not-found-title">
      <p className="eyebrow">Error 404</p>
      <h1 id="not-found-title">No encontramos esta página</h1>
      <p>La dirección puede haber cambiado o no existe.</p>
      <button className="button button--primary" type="button" onClick={() => onNavigate('/inicio')}>Volver al inicio</button>
    </main>
  )
}

export function ComparePage({ onAdd }) {
  return (
    <main className="compare-page page-wrap">
      <div className="page-intro"><p className="eyebrow">Elige con claridad</p><h1>Compara de un vistazo</h1><p>Analiza las especificaciones técnicas lado a lado y encuentra el smartphone perfecto para tus necesidades. Nuestra selección premium, simplificada para ti.</p></div>
      <div className="comparison-scroll" role="region" aria-label="Tabla comparativa de smartphones" tabIndex="0">
        <div className="comparison-table">
          <div className="comparison-row comparison-row--products"><div className="comparison-label">Características</div>{comparisonProducts.map((product) => <div className="comparison-product" key={product.id}>
            <div className="comparison-product__image"><img src={product.image} alt={product.name} loading="lazy" /></div><h2>{product.name}</h2><span className="comparison-tag">{product.badge}</span><p>{product.tagline}</p><strong>{formatPrice(product.price)}</strong><button className="button button--secondary button--wide" type="button" onClick={() => onAdd(product)}>Comprar {formatPrice(product.price)}</button>
          </div>)}</div>
          {comparisonSpecs.map((spec, rowIndex) => <div className="comparison-row" key={spec.label}>
            <div className="comparison-label"><span className="material-symbols-outlined" aria-hidden="true">{spec.icon}</span>{spec.label}</div>
            {spec.values.map((value, index) => <div className="comparison-value" key={`${rowIndex}-${index}`}>{Array.isArray(value) ? <><strong>{value[0]}</strong><small>{value[1]}</small></> : value}</div>)}
          </div>)}
        </div>
      </div>
      <p className="swipe-hint"><span className="material-symbols-outlined" aria-hidden="true">swipe</span>Desliza para ver más</p>
    </main>
  )
}

export function OffersPage({ onAdd }) {
  const [category, setCategory] = useState('Todos')
  const [favorites, setFavorites] = useState(() => new Set())
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [message, setMessage] = useState('')
  const visibleOffers = category === 'Accesorios' ? offerProducts.filter((item) => item.id.includes('buds')) : category === 'Smartphones' ? offerProducts.filter((item) => !item.id.includes('buds')) : offerProducts
  const toggleFavorite = (id) => setFavorites((current) => { const next = new Set(current); next.has(id) ? next.delete(id) : next.add(id); return next })
  const subscribe = (event) => {
    event.preventDefault()
    if (!event.currentTarget.reportValidity()) return
    setSubscribed(true)
    setMessage('¡Gracias! Te has suscrito correctamente a nuestras ofertas.')
    setEmail('')
  }

  return (
    <main className="offers-page page-wrap">
      <section className="promo-banner">
        <div className="promo-banner__copy"><span className="sale-pill">Cyber Week</span><h1>Ahorra hasta un 40% en Premium</h1><p>Equípate con la última tecnología a precios irrepetibles. Solo por tiempo limitado.</p><a className="button button--light" href="#ofertas">Ver todas las ofertas<span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span></a></div>
        <div className="promo-banner__device"><img src={homeProducts[1].image} alt="Smartphone Samsung Galaxy" /></div>
      </section>
      <section className="offers-section" id="ofertas">
        <div className="section-heading section-heading--row"><div><p className="eyebrow">Selección de temporada</p><h2>Ofertas Destacadas</h2><p>Los dispositivos más buscados con descuentos exclusivos.</p></div><div className="filter-chips" aria-label="Categoría de ofertas">{['Todos', 'Smartphones', 'Accesorios'].map((item) => <button className={`filter-chip${category === item ? ' is-active' : ''}`} type="button" aria-pressed={category === item} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div></div>
        <ProductGrid products={visibleOffers} onAdd={onAdd} favorites={favorites} onFavorite={toggleFavorite} offer />
      </section>
      <section className="newsletter-section">
        <div className="newsletter-panel"><span className="material-symbols-outlined newsletter-icon" aria-hidden="true">mail</span><p className="eyebrow">Boletín MobileZone</p><h2>No te pierdas ninguna oferta</h2><p>Suscríbete a nuestra newsletter y recibe notificaciones anticipadas de nuestras promociones flash y descuentos exclusivos.</p>
          {subscribed ? <p className="form-feedback form-feedback--success" role="status">{message}</p> : <form className="newsletter-form" onSubmit={subscribe}>
            <label className="sr-only" htmlFor="newsletter-email">Correo electrónico</label><input id="newsletter-email" type="email" placeholder="tu@email.com" value={email} onChange={(event) => setEmail(event.target.value)} required /><button className="button button--primary" type="submit">Suscribirme</button>
          </form>}
        </div>
      </section>
    </main>
  )
}

export function ContactPage() {
  const [status, setStatus] = useState('idle')
  const timer = useRef(null)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const submitContact = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    setStatus('sending')
    timer.current = window.setTimeout(() => {
      form.reset()
      setStatus('success')
      timer.current = window.setTimeout(() => setStatus('idle'), 5000)
    }, 1500)
  }

  return (
    <main className="contact-page page-wrap">
      <div className="page-intro"><p className="eyebrow">Atención personal</p><h1>Estamos aquí para ayudarte.</h1><p>¿Tienes dudas sobre algún dispositivo, necesitas soporte técnico o buscas una cotización corporativa? Contáctanos y nuestro equipo de expertos en tecnología móvil te responderá a la brevedad.</p></div>
      <div className="contact-grid">
        <section className="contact-info-panel">
          <h2>Información Directa</h2>
          <div className="contact-details">
            <div className="contact-detail"><span className="material-symbols-outlined" aria-hidden="true">location_on</span><div><h3>Tienda Principal</h3><p>Av. Tecnológica 1024, Distrito Central<br />Ciudad Metropolitana</p></div></div>
            <div className="contact-detail"><span className="material-symbols-outlined" aria-hidden="true">mail</span><div><h3>Correo Electrónico</h3><p><a href="mailto:soporte@mobilezone.com">soporte@mobilezone.com</a></p></div></div>
            <div className="contact-detail"><span className="material-symbols-outlined" aria-hidden="true">call</span><div><h3>Línea de Atención</h3><p><a href="tel:+59162628578">+591 62628578</a></p></div></div>
          </div>
          <div className="contact-social"><h3>Conecta con Nosotros</h3><a href="https://wa.me/59162628578" aria-label="WhatsApp MobileZone"><span className="material-symbols-outlined" aria-hidden="true">chat</span></a><a href="https://www.facebook.com/MobileZone.AR" aria-label="Facebook MobileZone"><span className="material-symbols-outlined" aria-hidden="true">thumb_up</span></a></div>
        </section>
        <section className="contact-form-panel">
          <h2>Envíanos un mensaje</h2>
          {status === 'success' ? <div className="contact-success" role="status"><span className="material-symbols-outlined" aria-hidden="true">check_circle</span><p>¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.</p></div> : <form className="contact-form" onSubmit={submitContact}>
            <label>Nombre Completo<input name="nombre" type="text" placeholder="Ej: Alex Rivera" autoComplete="name" required disabled={status === 'sending'} /></label>
            <label>Correo Electrónico<input name="correo" type="email" placeholder="ejemplo@correo.com" autoComplete="email" required disabled={status === 'sending'} /></label>
            <label>Mensaje<textarea name="mensaje" placeholder="¿En qué podemos ayudarte hoy?" rows="5" required disabled={status === 'sending'} /></label>
            <button className="button button--primary button--wide" type="submit" disabled={status === 'sending'}>{status === 'sending' ? <><span className="material-symbols-outlined spin" aria-hidden="true">progress_activity</span>Enviando...</> : <>Enviar<span className="material-symbols-outlined" aria-hidden="true">send</span></>}</button>
          </form>}
        </section>
      </div>
      <section className="store-map" aria-label="Tienda MobileZone"><img src={storePhoto} alt="Interior de la tienda MobileZone en Ciudad Metropolitana" /><div className="store-map__caption"><h2>MOBILEZONE Headquarters</h2><p>Abierto de Lunes a Sábado, 9:00 AM - 8:00 PM.</p></div></section>
    </main>
  )
}

export function CartPage({ items, onQuantityChange, onRemove, onNavigate }) {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0)
  const count = items.reduce((sum, item) => sum + item.quantity, 0)
  const whatsappMessage = encodeURIComponent(`Hola, quiero coordinar esta compra:\n${items.map((item) => `${item.name} x${item.quantity} - ${currency(item.price * item.quantity)}`).join('\n')}\nTotal: ${currency(subtotal)}`)

  return (
    <main className="cart-page page-wrap">
      <div className="cart-heading"><p className="eyebrow">Tu selección</p><h1>Tu Carrito</h1><p>Revisa los artículos seleccionados antes de finalizar tu compra.</p></div>
      <div className="cart-layout">
        <section className="cart-items" aria-label="Artículos en el carrito">
          {items.length ? items.map((item) => <article className="cart-item" key={item.id}>
            <div className="cart-item__image"><img src={item.image} alt={item.name} /></div><div className="cart-item__main"><div className="cart-item__title"><div><h2>{item.name}</h2><p>{item.brand || 'MobileZone'}</p></div><button type="button" className="icon-button remove-button" aria-label={`Eliminar ${item.name}`} onClick={() => onRemove(item.id)}><span className="material-symbols-outlined" aria-hidden="true">delete</span></button></div><div className="cart-item__footer"><div className="quantity-control"><button type="button" aria-label={`Disminuir cantidad de ${item.name}`} onClick={() => onQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity <= 1}><span className="material-symbols-outlined" aria-hidden="true">remove</span></button><output aria-label="Cantidad">{item.quantity}</output><button type="button" aria-label={`Aumentar cantidad de ${item.name}`} onClick={() => onQuantityChange(item.id, item.quantity + 1)}><span className="material-symbols-outlined" aria-hidden="true">add</span></button></div><strong>{currency(item.price * item.quantity)}</strong></div></div>
          </article>) : <div className="empty-cart"><span className="material-symbols-outlined" aria-hidden="true">shopping_bag</span><h2>Tu carrito está vacío</h2><p>Parece que aún no has añadido ningún producto.</p><button className="button button--primary" type="button" onClick={() => onNavigate('/smartphones')}>Explorar productos</button></div>}
        </section>
        <aside className="order-summary">
          <h2>Resumen del Pedido</h2><div className="summary-line"><span>Subtotal ({count} artículos)</span><strong>{currency(subtotal)}</strong></div><div className="summary-line"><span>Envío Estimado</span><strong className="text-success">Gratis</strong></div><div className="summary-line"><span>Impuestos</span><strong>Calculados en caja</strong></div><div className="summary-total"><span>Total</span><strong>{currency(subtotal)}</strong></div>
          {items.length > 0 && <><p className="checkout-label">Finalizar compra seguro</p><a className="button button--whatsapp button--wide" href={`https://wa.me/59162628578?text=${whatsappMessage}`} target="_blank" rel="noreferrer"><span className="material-symbols-outlined" aria-hidden="true">chat</span>Completar por WhatsApp</a><p className="checkout-note">Serás redirigido a WhatsApp para coordinar el pago y envío con un asesor.</p></>}
        </aside>
      </div>
    </main>
  )
}

export function LandingPage({ onOpen, onAdd, onNavigate }) {
  const landingProducts = [
    { ...comparisonProducts[0], id: 'iphone-15-landing', description: '128GB Storage · 48MP Camera · 6.1" Display' },
    { ...comparisonProducts[1], id: 'galaxy-s24-landing', name: 'Samsung Galaxy S24', description: '128GB Storage · 50MP Camera · 6.2" Display' },
    { ...homeProducts[2], id: 'redmi-note-13-landing', name: 'Redmi Note 13 Pro', price: productPrices.redmiNote13Pro, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIx2IKLWy2dGwLSaqzdgolUxXtoFaXHYzN2bXLqaHJhjn4t28QcMX50xcVtKSI1mbLtHlkTK8v71cpojQiWrNQC03_a5YLqi4kL_-aowH17bPkmP6fMv5byv_kyNMeHVF6sg1v5Kj8IJzkPDWr1e1Mg8yem4NSXnAC2RqMag78DksXADM5X_3_SQ_NR8h00sT5eFxCKeNlb5KKhWcqH81Eo-8KnmhJlKSis9oxZ2ODqwICeGiMPq_V', description: '256GB Storage · 200MP Camera · 6.67" Display' },
  ]
  return (
    <main className="landing-page">
      <section className="landing-hero page-wrap"><div><p className="eyebrow">MobileZone Premium</p><h1>Find the perfect smartphone for you</h1><p>Compare smartphones, check prices and specifications, and find the best deals in one place. Experience seamless performance and premium design.</p><div className="hero-actions"><button className="button button--primary" type="button" onClick={() => onNavigate('/smartphones')}>Explore smartphones</button><button className="button button--secondary" type="button" onClick={() => onNavigate('/ofertas')}>View offers</button></div></div><div className="landing-hero__visual"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuABEgRJ9PKYkL0lZJhdFrT-i-6OifMXTjvjNlSaluwDgfoAY0Eqtsoj1W1BzDyGhIC40HU-pVUrAwIG5w8ymx_DBnruFh1vhct0UNPyrmYQEyLtV430WPgs0P6EkHWvdW374AtXK5FrU5Laj_xsNcAzDDAn2G1Jm8bYgbIe-4U2BpMHekEh54ccXiipgdogOpUUhd_miZR2ll4zMpWhogo5aSWccGjPDItGQyPecLtiXsy9Vi45lc6y" alt="Selección de smartphones premium" /></div></section>
      <section className="content-section"><div className="section-heading section-heading--center"><p className="eyebrow">Curated for you</p><h2>Featured smartphones</h2><p>Explore our most popular models</p></div><ProductGrid products={landingProducts} onOpen={onOpen} onAdd={onAdd} /></section>
    </main>
  )
}
