import { useEffect, useRef, useState } from 'react'
import { SiteShell } from './components/SiteShell.jsx'
import ProductModal from './components/ProductModal.jsx'
import { CartPage, ComparePage, ContactPage, HomePage, LandingPage, OffersPage, SmartphonesPage } from './pages/StorePages.jsx'
import './App.css'

const CART_KEY = 'mobilezone-cart-items'
const OLD_CART_COUNT_KEY = 'mobilezone-cart-count'

function getLocation() {
  const path = window.location.pathname
  return { path: path === '/' || path === '/index.html' ? '/inicio' : path, search: window.location.search }
}

function getInitialCart() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(CART_KEY) || '[]')
    if (Array.isArray(stored) && stored.length) return stored.filter((item) => item && item.id && Number(item.price) >= 0 && Number(item.quantity) > 0)
  } catch {
    return []
  }
  const oldCount = Number(window.localStorage.getItem(OLD_CART_COUNT_KEY) || 0)
  return oldCount > 0 ? [{ id: 'legacy-selected-items', name: 'Productos seleccionados', price: 565.67, quantity: oldCount }] : []
}

function App() {
  const [location, setLocation] = useState(getLocation)
  const [cartItems, setCartItems] = useState(getInitialCart)
  const [modalProduct, setModalProduct] = useState(null)
  const [homeSearch, setHomeSearch] = useState('')
  const homeSearchRef = useRef(null)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const onPopState = () => setLocation(getLocation())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(cartItems))
    window.localStorage.setItem(OLD_CART_COUNT_KEY, String(cartCount))
  }, [cartItems, cartCount])

  useEffect(() => {
    const pageTitle = {
      '/inicio': 'MobileZone | Smartphones premium',
      '/smartphones': 'Catálogo Completo - MobileZone',
      '/comparar': 'Comparación - MobileZone',
      '/ofertas': 'Ofertas Especiales - MobileZone',
      '/contacto': 'Contacto - MobileZone',
      '/carrito': 'Carrito de Compras - MobileZone',
      '/landing': 'MobileZone | Premium Smartphones',
    }
    document.title = pageTitle[location.path] || pageTitle['/inicio']
  }, [location.path])

  useEffect(() => {
    document.body.classList.toggle('modal-open', Boolean(modalProduct))
    return () => document.body.classList.remove('modal-open')
  }, [modalProduct])

  const navigate = (destination) => {
    const next = new URL(destination, window.location.origin)
    const path = next.pathname === '/' || next.pathname === '/index.html' ? '/inicio' : next.pathname
    window.history.pushState({}, '', `${path}${next.search}${next.hash}`)
    setLocation({ path, search: next.search })
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const searchProducts = (query) => {
    const normalized = query.trim()
    navigate(normalized ? `/smartphones?search=${encodeURIComponent(normalized)}` : '/smartphones')
  }

  const addToCart = (product) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      return [...current, { id: product.id, brand: product.brand, name: product.name, price: Number(product.price), image: product.image || '', quantity: 1 }]
    })
  }

  const changeQuantity = (id, quantity) => {
    setCartItems((current) => current.map((item) => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
  }

  const removeFromCart = (id) => setCartItems((current) => current.filter((item) => item.id !== id))
  const openHomeSearch = () => {
    homeSearchRef.current?.focus()
    homeSearchRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  const showProduct = (product) => setModalProduct(product)

  let page
  switch (location.path) {
    case '/smartphones':
      page = <SmartphonesPage initialSearch={new URLSearchParams(location.search).get('search') || ''} onOpen={showProduct} onAdd={addToCart} />
      break
    case '/comparar':
      page = <ComparePage onAdd={addToCart} />
      break
    case '/ofertas':
      page = <OffersPage onAdd={addToCart} />
      break
    case '/contacto':
      page = <ContactPage />
      break
    case '/carrito':
      page = <CartPage items={cartItems} onQuantityChange={changeQuantity} onRemove={removeFromCart} onNavigate={navigate} />
      break
    case '/landing':
      page = <LandingPage onOpen={showProduct} onAdd={addToCart} onNavigate={navigate} />
      break
    case '/inicio':
    default:
      page = <HomePage searchRef={homeSearchRef} searchValue={homeSearch} setSearchValue={setHomeSearch} onOpen={showProduct} onAdd={addToCart} onNavigate={navigate} />
  }

  return (
    <SiteShell currentPath={location.path} cartCount={cartCount} onNavigate={navigate} onFocusHomeSearch={openHomeSearch} onSearch={searchProducts}>
      {page}
      <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} onAdd={addToCart} />
    </SiteShell>
  )
}

export default App
