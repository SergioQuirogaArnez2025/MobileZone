export function restoreCartItems(storedItems, products) {
  if (!Array.isArray(storedItems)) return []

  const productsById = new Map(products.map((product) => [product.id, product]))

  return storedItems.flatMap((item) => {
    if (!item || typeof item.id !== 'string' || typeof item.quantity !== 'number'
      || !Number.isInteger(item.quantity) || item.quantity < 1) return []

    const product = productsById.get(item.id)
    if (!product || !Number.isFinite(product.price) || product.price < 0) return []

    return [{
      id: product.id,
      brand: product.brand,
      name: product.name,
      price: product.price,
      image: product.image || '',
      quantity: item.quantity,
    }]
  })
}
