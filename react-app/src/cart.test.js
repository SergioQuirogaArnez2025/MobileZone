import test from 'node:test'
import assert from 'node:assert/strict'
import { MAX_CART_QUANTITY, restoreCartItems } from './cart.js'

const catalog = [
  { id: 'iphone-15-pro', brand: 'Apple', name: 'iPhone 15 Pro', price: 999, image: '/iphone.jpg' },
]

test('rejects persisted cart quantities that are fractional', () => {
  assert.deepEqual(
    restoreCartItems([{ id: 'iphone-15-pro', quantity: 0.5 }], catalog),
    [],
  )
})

test('rebuilds product data from its ID instead of trusting persisted fields', () => {
  assert.deepEqual(
    restoreCartItems([{
      id: 'iphone-15-pro',
      name: 'Unknown model',
      price: 1,
      brand: 'Unknown',
      image: '/untrusted.jpg',
      quantity: 1,
    }], catalog),
    [{
      id: 'iphone-15-pro',
      brand: 'Apple',
      name: 'iPhone 15 Pro',
      price: 999,
      image: '/iphone.jpg',
      quantity: 1,
    }],
  )
})

test('rejects persisted items whose product ID is not in the catalog', () => {
  assert.deepEqual(
    restoreCartItems([{ id: 'unknown-product', quantity: 1, price: 1 }], catalog),
    [],
  )
})

test('accepts the maximum quantity per product', () => {
  const [item] = restoreCartItems(
    [{ id: 'iphone-15-pro', quantity: MAX_CART_QUANTITY }],
    catalog,
  )

  assert.equal(item.quantity, MAX_CART_QUANTITY)
})

test('rejects an over-limit item without discarding other valid items', () => {
  const products = [
    ...catalog,
    { id: 'pixel-8-pro', brand: 'Google', name: 'Pixel 8 Pro', price: 899, image: '/pixel.jpg' },
  ]

  assert.deepEqual(
    restoreCartItems([
      { id: 'iphone-15-pro', quantity: MAX_CART_QUANTITY + 1 },
      { id: 'pixel-8-pro', quantity: 2 },
    ], products),
    [{
      id: 'pixel-8-pro',
      brand: 'Google',
      name: 'Pixel 8 Pro',
      price: 899,
      image: '/pixel.jpg',
      quantity: 2,
    }],
  )
})
