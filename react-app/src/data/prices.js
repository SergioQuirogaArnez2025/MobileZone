export const productPrices = {
  iphone15: 799,
  iphone15Pro: 999,
  iphone15ProMax: 1199,
  galaxyS24: 799,
  galaxyS24Ultra: 1299,
  redmiNote13Pro: 349,
  redmiNote13ProPlus: 499,
  pixel8Pro: 899,
  xiaomi14Ultra: 1499,
  rogPhone8: 839,
  pixelBudsPro: 137,
}

const modelPrices = new Map([
  ['iphone 15', productPrices.iphone15],
  ['iphone 15 pro', productPrices.iphone15Pro],
  ['iphone 15 pro max', productPrices.iphone15ProMax],
  ['galaxy s24', productPrices.galaxyS24],
  ['samsung galaxy s24', productPrices.galaxyS24],
  ['galaxy s24 ultra', productPrices.galaxyS24Ultra],
  ['samsung galaxy s24 ultra', productPrices.galaxyS24Ultra],
  ['redmi note 13 pro', productPrices.redmiNote13Pro],
  ['redmi note 13 pro+', productPrices.redmiNote13ProPlus],
  ['pixel 8 pro', productPrices.pixel8Pro],
  ['xiaomi 14 ultra', productPrices.xiaomi14Ultra],
  ['rog phone 8', productPrices.rogPhone8],
  ['pixel buds pro', productPrices.pixelBudsPro],
])

export function getCanonicalProductPrice(name, fallbackPrice) {
  const normalizedName = String(name || '').trim().replace(/\s+/g, ' ').toLowerCase()
  return modelPrices.get(normalizedName) ?? Number(fallbackPrice)
}
