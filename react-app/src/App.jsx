import { useEffect, useRef, useState } from 'react'
import { SiteShell } from './components/SiteShell.jsx'
import ProductModal from './components/ProductModal.jsx'
import { StatusToast } from './components/StatusToast.jsx'
import { AccountPage, CartPage, ComparePage, ContactPage, HomePage, LandingPage, NotFoundPage, OffersPage, SmartphonesPage } from './pages/StorePages.jsx'
import { cartProducts } from './data/catalog.js'
import { addCartItem, ensureUserCart, listCartItems, listProducts, removeCartItem, updateCartItemQuantity } from './lib/mobilezoneData.js'
import { getSupabaseClient, isSupabaseConfigured } from './lib/supabase.js'
import { getPageTitle, getRouteLocation } from './routing.js'
import './App.css'

const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '')
const SUPABASE_CONFIGURED = isSupabaseConfigured()

function getLocation() {
  return getRouteLocation(window.location.pathname, window.location.search, BASE_PATH)
}

function App() {
  const [location, setLocation] = useState(getLocation)
  const [cartItems, setCartItems] = useState([])
  const [cartId, setCartId] = useState(null)
  const [session, setSession] = useState(null)
  const [authReady, setAuthReady] = useState(false)
  const [cartLoading, setCartLoading] = useState(false)
  const [cartError, setCartError] = useState('')
  const [remoteProducts, setRemoteProducts] = useState(new Map())
  const [productError, setProductError] = useState('')
  const [authError, setAuthError] = useState('')
  const [modalProduct, setModalProduct] = useState(null)
  const [cartNotice, setCartNotice] = useState(null)
  const [homeSearch, setHomeSearch] = useState('')
  const homeSearchRef = useRef(null)
  const noticeTimerRef = useRef(null)
  const noticeIdRef = useRef(0)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    if (!SUPABASE_CONFIGURED) {
      setAuthReady(true)
      return undefined
    }

    let active = true
    let client
    try {
      client = getSupabaseClient()
    } catch (error) {
      setAuthError(error.message)
      setAuthReady(true)
      return undefined
    }

    const { data: { subscription } } = client.auth.onAuthStateChange((_event, nextSession) => {
      if (active) {
        setSession(nextSession)
        setAuthReady(true)
      }
    })

    client.auth.getSession().then(({ data, error }) => {
      if (!active) return
      if (error) setAuthError(error.message)
      else setSession(data.session)
      setAuthReady(true)
    }).catch((error) => {
      if (!active) return
      setAuthError(error.message || 'No se pudo comprobar la sesión.')
      setAuthReady(true)
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!SUPABASE_CONFIGURED) return undefined
    let active = true
    listProducts().then((products) => {
      const bySku = new Map(products.map((product) => [product.id, product]))
      const missingSkus = [...new Set(cartProducts.map((product) => product.id))].filter((sku) => !bySku.has(sku))
      if (missingSkus.length) {
        throw new Error(`Faltan ${missingSkus.length} productos del catálogo remoto. Comprueba las migraciones y carga el seed.`)
      }
      if (active) {
        setRemoteProducts(bySku)
        setProductError('')
      }
    }).catch((error) => {
      if (active) setProductError(error.message || 'No se pudo cargar el catálogo remoto.')
    })
    return () => { active = false }
  }, [])

  useEffect(() => {
    if (!authReady) return undefined
    if (!session?.user?.id) {
      setCartId(null)
      setCartItems([])
      setCartError('')
      setCartLoading(false)
      return undefined
    }

    let active = true
    setCartLoading(true)
    setCartError('')
    ;(async () => {
      const id = await ensureUserCart()
      const items = await listCartItems(id)
      if (active) {
        setCartId(id)
        setCartItems(items)
      }
    })().catch((error) => {
      if (active) setCartError(error.message || 'No se pudo cargar el carrito.')
    }).finally(() => {
      if (active) setCartLoading(false)
    })

    return () => { active = false }
  }, [authReady, session?.user?.id])

  useEffect(() => {
    const onPopState = () => setLocation(getLocation())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

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

  const announceCartChange = (message, type = 'success') => {
    window.clearTimeout(noticeTimerRef.current)
    setCartNotice({ id: ++noticeIdRef.current, message, type })
    noticeTimerRef.current = window.setTimeout(() => setCartNotice(null), 2600)
  }

  const addToCart = async (product) => {
    if (!SUPABASE_CONFIGURED) {
      announceCartChange('Supabase no está configurado; no se guardó el artículo.', 'error')
      return
    }
    if (!session?.user) {
      navigate('/cuenta')
      announceCartChange('Inicia sesión para guardar artículos en tu carrito.', 'info')
      return
    }
    if (!cartId || !product.databaseId) {
      announceCartChange('No se pudo identificar el producto o el carrito remoto.', 'error')
      return
    }

    try {
      const oldQuantity = cartItems.find((item) => item.id === product.id)?.quantity || 0
      await addCartItem(product.databaseId)
      const items = await listCartItems(cartId)
      const savedItem = items.find((item) => item.id === product.id)
      if (!savedItem || savedItem.quantity !== oldQuantity + 1) {
        throw new Error('No se pudo confirmar la cantidad guardada en el carrito.')
      }
      setCartItems(items)
      announceCartChange(`${product.name} se agregó al carrito.`)
    } catch (error) {
      announceCartChange(`No se pudo agregar el artículo: ${error.message}`, 'error')
    }
  }

  const changeQuantity = async (id, quantity) => {
    const item = cartItems.find((cartItem) => cartItem.id === id)
    if (!item?.cartItemId || !cartId) return
    try {
      await updateCartItemQuantity(item.cartItemId, quantity)
      const items = await listCartItems(cartId)
      if (items.find((cartItem) => cartItem.id === id)?.quantity !== quantity) {
        throw new Error('No se pudo confirmar la cantidad actualizada.')
      }
      setCartItems(items)
      announceCartChange(`Cantidad de ${item.name} actualizada.`)
    } catch (error) {
      announceCartChange(`No se pudo actualizar la cantidad: ${error.message}`, 'error')
    }
  }

  const removeFromCart = async (id) => {
    const removed = cartItems.find((item) => item.id === id)
    if (!removed?.cartItemId || !cartId) return
    try {
      await removeCartItem(removed.cartItemId)
      const items = await listCartItems(cartId)
      if (items.some((item) => item.id === id)) {
        throw new Error('El artículo continúa en el carrito después de eliminarlo.')
      }
      setCartItems(items)
      announceCartChange(items.length ? `${removed.name} se quitó del carrito.` : `${removed.name} se quitó. El carrito quedó vacío.`)
    } catch (error) {
      announceCartChange(`No se pudo eliminar el artículo: ${error.message}`, 'error')
    }
  }
  const openHomeSearch = () => {
    homeSearchRef.current?.focus()
    homeSearchRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  const showProduct = (product) => setModalProduct(product)

  let page
  switch (location.path) {
    case '/smartphones':
      page = <SmartphonesPage initialSearch={new URLSearchParams(location.search).get('search') || ''} remoteProducts={remoteProducts} onOpen={showProduct} onAdd={addToCart} />
      break
    case '/comparar':
      page = <ComparePage remoteProducts={remoteProducts} onAdd={addToCart} />
      break
    case '/ofertas':
      page = <OffersPage remoteProducts={remoteProducts} onOpen={showProduct} onAdd={addToCart} />
      break
    case '/contacto':
      page = <ContactPage />
      break
    case '/carrito':
      page = <CartPage items={cartItems} isAuthenticated={Boolean(session?.user)} loading={!authReady || cartLoading} error={cartError} onQuantityChange={changeQuantity} onRemove={removeFromCart} onNavigate={navigate} />
      break
    case '/cuenta':
      page = <AccountPage session={session} onSessionChange={setSession} />
      break
    case '/landing':
      page = <LandingPage remoteProducts={remoteProducts} onOpen={showProduct} onAdd={addToCart} onNavigate={navigate} />
      break
    case '/inicio':
      page = <HomePage searchRef={homeSearchRef} searchValue={homeSearch} setSearchValue={setHomeSearch} remoteProducts={remoteProducts} onOpen={showProduct} onAdd={addToCart} onNavigate={navigate} />
      break
    default:
      page = <NotFoundPage onNavigate={navigate} />
      break
  }

  return (
    <SiteShell currentPath={location.path} cartCount={cartCount} onNavigate={navigate} onFocusHomeSearch={openHomeSearch} onSearch={searchProducts}>
      {!SUPABASE_CONFIGURED && <p className="integration-notice" role="status">Supabase no está configurado. El catálogo mostrado es de demostración y no se guardan operaciones remotas.</p>}
      {productError && <p className="integration-notice integration-notice--error" role="alert">No se pudo cargar el catálogo remoto: {productError}</p>}
      {authError && <p className="integration-notice integration-notice--error" role="alert">No se pudo comprobar la sesión: {authError}</p>}
      {page}
      <StatusToast key={cartNotice?.id || 'empty'} message={cartNotice?.message || ''} type={cartNotice?.type} />
      <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} onAdd={addToCart} />
    </SiteShell>
  )
}

export default App
