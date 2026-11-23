import { getSupabaseClient } from './supabase.js'
import { MAX_CART_QUANTITY } from '../cart.js'

const PRODUCT_COLUMNS = 'id, sku, name, brand, image, official_price, badge, description, details, specs, tagline'
const CART_ITEM_COLUMNS = `id, cart_id, product_id, quantity, products(${PRODUCT_COLUMNS})`

export function mapProduct(row) {
  if (!row || typeof row.id !== 'string' || typeof row.sku !== 'string' || !row.sku
    || typeof row.name !== 'string' || typeof row.brand !== 'string') {
    throw new Error('Supabase returned a product with invalid required fields.')
  }

  const price = Number(row.official_price)
  if (!Number.isFinite(price) || price < 0) {
    throw new Error(`Supabase returned an invalid price for product "${row.sku}".`)
  }
  if (!Array.isArray(row.specs)) {
    throw new Error(`Supabase returned invalid specifications for product "${row.sku}".`)
  }

  return {
    id: row.sku,
    databaseId: row.id,
    name: row.name,
    brand: row.brand,
    price,
    image: row.image || '',
    badge: row.badge || undefined,
    description: row.description || undefined,
    details: row.details || undefined,
    specs: row.specs,
    tagline: row.tagline || undefined,
  }
}

export function mapCartItem(row) {
  if (!row || typeof row.id !== 'string' || !Number.isInteger(row.quantity)
    || row.quantity < 1 || row.quantity > MAX_CART_QUANTITY) {
    throw new Error('Supabase returned a cart item with invalid fields.')
  }

  return { ...mapProduct(row.products), cartItemId: row.id, quantity: row.quantity }
}

export function validateCartQuantity(quantity) {
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_CART_QUANTITY) {
    throw new RangeError(`La cantidad debe ser un entero entre 1 y ${MAX_CART_QUANTITY}.`)
  }
}

export async function listProducts(client = getSupabaseClient()) {
  const { data, error } = await client
    .from('products')
    .select(PRODUCT_COLUMNS)
    .order('name')

  if (error) throw error
  if (!Array.isArray(data)) throw new Error('Supabase did not return a product list.')
  return data.map(mapProduct)
}

export async function ensureUserCart(client = getSupabaseClient()) {
  const { data: userResult, error: userError } = await client.auth.getUser()
  if (userError) throw userError
  if (!userResult.user) throw new Error('Inicia sesión para acceder a tu carrito.')

  const { data, error } = await client
    .from('carts')
    .upsert({ user_id: userResult.user.id }, { onConflict: 'user_id' })
    .select('id')
    .single()

  if (error) throw error
  if (!data?.id) throw new Error('Supabase did not return the authenticated user cart.')
  return data.id
}

export async function listCartItems(cartId, client = getSupabaseClient()) {
  if (!cartId) throw new Error('A cart ID is required to load cart items.')

  const { data, error } = await client
    .from('cart_items')
    .select(CART_ITEM_COLUMNS)
    .eq('cart_id', cartId)
    .order('id')

  if (error) throw error
  if (!Array.isArray(data)) throw new Error('Supabase did not return a cart item list.')
  return data.map(mapCartItem)
}

export async function addCartItem(productId, quantity = 1, client = getSupabaseClient()) {
  if (!productId) throw new Error('A database product ID is required to add an item.')
  validateCartQuantity(quantity)

  const { data, error } = await client.rpc('add_cart_item', {
    p_product_id: productId,
    p_quantity: quantity,
  })

  if (error) throw error
  if (!data?.id) throw new Error('Supabase did not confirm the cart item insert.')
  return data
}

export async function updateCartItemQuantity(cartItemId, quantity, client = getSupabaseClient()) {
  if (!cartItemId) throw new Error('A cart item ID is required to update quantity.')
  validateCartQuantity(quantity)

  const { data, error } = await client
    .from('cart_items')
    .update({ quantity })
    .eq('id', cartItemId)
    .select('id')
    .maybeSingle()

  if (error) throw error
  if (!data?.id) throw new Error('No se actualizó el artículo: no existe o no tienes permiso.')
}

export async function removeCartItem(cartItemId, client = getSupabaseClient()) {
  if (!cartItemId) throw new Error('A cart item ID is required to remove an item.')

  const { data, error } = await client
    .from('cart_items')
    .delete()
    .eq('id', cartItemId)
    .select('id')
    .maybeSingle()

  if (error) throw error
  if (!data?.id) throw new Error('No se eliminó el artículo: no existe o no tienes permiso.')
}
