import { useEffect, useRef, useState } from 'react'
import { SiteShell } from './components/SiteShell.jsx'
import ProductModal from './components/ProductModal.jsx'
import { StatusToast } from './components/StatusToast.jsx'
import { CartPage, ComparePage, ContactPage, HomePage, LandingPage, NotFoundPage, OffersPage, SmartphonesPage } from './pages/StorePages.jsx'
import { getCanonicalProductPrice } from './data/prices.js'
import { getPageTitle, getRouteLocation } from './routing.js'
import './App.css'

const CART_KEY = 'mobilezone-cart-items'
const OLD_CART_COUNT_KEY = 'mobilezone-cart-count'
const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '')

function getLocation() {
  return getRouteLocation(window.location.pathname, window.location.search, BASE_PATH)
}

function getInitialCart() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(CART_KEY) || '[]')
    if (Array.isArray(stored) && stored.length) return stored
      .filter((item) => item && item.id && Number.isFinite(Number(item.quantity)) && Number(item.quantity) > 0)
      .map((item) => ({
        ...item,
        price: getCanonicalProductPrice(item.name, item.price),
        quantity: Number(item.quantity),
      }))
      .filter((item) => Number.isFinite(item.price) && item.price >= 0)
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
  const [cartNotice, setCartNotice] = useState(null)
  const [homeSearch, setHomeSearch] = useState('')
  const homeSearchRef = useRef(null)
  const noticeTimerRef = useRef(null)
  const noticeIdRef = useRef(0)
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

  useEffect(() => () => window.clearTimeout(noticeTimerRef.current), [])

  useEffect(() => {
    document.title = getPageTitle(location.path)
  }, [location.path])

  useEffect(() => {
    document.body.classList.toggle('modal-open', Boolean(modalProduct))
    return () => document.body.classList.remove('modal-open')
  }, [modalProduct])

  const navigate = (destination) => {
    const next = new URL(destination, window.location.href)
    if (next.origin !== window.location.origin) {
      window.location.assign(next.href)
      return
    }
    const nextLocation = getRouteLocation(next.pathname, next.search, BASE_PATH)
    window.history.pushState({}, '', `${BASE_PATH}${nextLocation.path}${next.search}${next.hash}`)
    setLocation(nextLocation)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const searchProducts = (query) => {
    const normalized = query.trim()
    navigate(normalized ? `/smartphones?search=${encodeURIComponent(normalized)}` : '/smartphones')
  }

  const announceCartChange = (message) => {
    window.clearTimeout(noticeTimerRef.current)
    setCartNotice({ id: ++noticeIdRef.current, message })
    noticeTimerRef.current = window.setTimeout(() => setCartNotice(null), 2600)
  }

  const addToCart = (product) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      return [...current, { id: product.id, brand: product.brand, name: product.name, price: getCanonicalProductPrice(product.name, product.price), image: product.image || '', quantity: 1 }]
    })
    announceCartChange(`${product.name} se agregó al carrito.`)
  }

  const changeQuantity = (id, quantity) => {
    setCartItems((current) => current.map((item) => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
  }

  const removeFromCart = (id) => {
    const removed = cartItems.find((item) => item.id === id)
    if (!removed) return
    const isLastItem = cartItems.length === 1
    setCartItems((current) => current.filter((item) => item.id !== id))
    announceCartChange(isLastItem
      ? `${removed.name} se quitó. El carrito quedó vacío.`
      : `${removed.name} se quitó del carrito.`)
  }
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
      page = <OffersPage onOpen={showProduct} onAdd={addToCart} />
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
      page = <HomePage searchRef={homeSearchRef} searchValue={homeSearch} setSearchValue={setHomeSearch} onOpen={showProduct} onAdd={addToCart} onNavigate={navigate} />
      break
    default:
      page = <NotFoundPage onNavigate={navigate} />
      break
  }

  return (
    <SiteShell currentPath={location.path} cartCount={cartCount} onNavigate={navigate} onFocusHomeSearch={openHomeSearch} onSearch={searchProducts}>
      {page}
      <StatusToast key={cartNotice?.id || 'empty'} message={cartNotice?.message || ''} />
      <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} onAdd={addToCart} />
    </SiteShell>
  )
}

export default App
