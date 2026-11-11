import test from 'node:test'
import assert from 'node:assert/strict'
import { restoreCartItems } from './cart.js'

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
