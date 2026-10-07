import test from 'node:test'
import assert from 'node:assert/strict'
import { getPageTitle, getRouteLocation } from './routing.js'
import { getCanonicalProductPrice, productPrices } from './data/prices.js'

test('resolves project root and index to the home route', () => {
  assert.deepEqual(getRouteLocation('/MobileZone/', '', '/MobileZone/'), { path: '/inicio', search: '' })
  assert.deepEqual(getRouteLocation('/MobileZone/index.html', '?from=link', '/MobileZone/'), { path: '/inicio', search: '?from=link' })
})

test('normalizes trailing slashes without matching a different base path', () => {
  assert.deepEqual(getRouteLocation('/MobileZone/contacto/', '', '/MobileZone/'), { path: '/contacto', search: '' })
  assert.deepEqual(getRouteLocation('/MobileZoneExtra/contacto', '', '/MobileZone/'), { path: '/MobileZoneExtra/contacto', search: '' })
})

test('keeps missing routes identifiable and gives them a not found title', () => {
  const missing = getRouteLocation('/MobileZone/no-existe', '', '/MobileZone/')
  assert.equal(missing.path, '/no-existe')
  assert.match(getPageTitle(missing.path), /no encontrada/i)
})

test('uses the same canonical price for model aliases and persisted cart items', () => {
  assert.equal(getCanonicalProductPrice('Samsung Galaxy S24', 999), productPrices.galaxyS24)
  assert.equal(getCanonicalProductPrice('Galaxy S24', 999), productPrices.galaxyS24)
  assert.equal(getCanonicalProductPrice('iPhone 15 Pro', 799), productPrices.iphone15Pro)
  assert.equal(getCanonicalProductPrice('iPhone 15', 999), productPrices.iphone15)
})
