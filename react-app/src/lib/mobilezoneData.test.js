import test from 'node:test'
import assert from 'node:assert/strict'
import { mapCartItem, mapProduct, validateCartQuantity } from './mobilezoneData.js'

const productRow = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  sku: 'iphone-15-pro',
  name: 'iPhone 15 Pro',
  brand: 'Apple',
  image: null,
  official_price: '999.00',
  badge: null,
  description: null,
  details: null,
  specs: [],
  tagline: null,
}

test('maps database products to the catalog shape without trusting client IDs', () => {
  assert.deepEqual(mapProduct(productRow), {
    id: 'iphone-15-pro',
    databaseId: productRow.id,
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    price: 999,
    image: '',
    badge: undefined,
    description: undefined,
    details: undefined,
    specs: [],
    tagline: undefined,
  })
})

test('rejects invalid database prices and cart quantities', () => {
  assert.throws(() => mapProduct({ ...productRow, official_price: '-1' }), /invalid price/)
  assert.throws(() => mapCartItem({ id: 'item-id', quantity: 0, products: productRow }), /invalid fields/)
  assert.throws(() => validateCartQuantity(1.5), /entero/)
  assert.throws(() => validateCartQuantity(100), /entero/)
  assert.doesNotThrow(() => validateCartQuantity(99))
})

test('maps the persisted cart item ID separately from its product SKU', () => {
  const item = mapCartItem({ id: 'cart-item-id', quantity: 2, products: productRow })
  assert.equal(item.id, 'iphone-15-pro')
  assert.equal(item.cartItemId, 'cart-item-id')
  assert.equal(item.quantity, 2)
})
