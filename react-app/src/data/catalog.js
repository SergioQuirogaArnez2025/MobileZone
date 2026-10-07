import storeImage from '../../.docs/Legacy/png/png1.jpg'

export const storePhoto = storeImage

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

export const homeProducts = [
  {
    id: 'iphone-15-pro-max',
    brand: 'Apple',
    name: 'iPhone 15 Pro Max',
    price: productPrices.iphone15ProMax,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtRzrv440dQppGQDTMY_cIKnGQ1HcbOlhmM13Q8jAUp9pOV0WP8vTIpezxrQ6v3f2ftNH00jLqgtWstkTodq1NyDq9A8Gk8IdiMjPeolER3MqD0Z1kNR3ye_uUD0qq8EvO0bbMxVeWrO2oUTMLGLhPapohbopBuedbrdolOdHa20u_OrwDx4eH5D7XC8-K85Md5yunMEftedBXLLNdMtYwyhCqlRKx1CNv4WWmZt1BPWGsJmBSYwCw',
    badge: 'En stock',
    description: 'El titanio se une a la potencia del chip A17 Pro. Una experiencia fotográfica sin precedentes.',
    details: 'El titanio se une a la potencia del chip A17 Pro. Una experiencia fotográfica sin precedentes con el nuevo zoom óptico de 5x.',
    specs: ['Chip A17 Pro', 'Sistema de cámaras Pro 48MP', 'Hasta 29h de reproducción de video', 'Pantalla Super Retina XDR de 6.7"'],
  },
  {
    id: 'galaxy-s24-ultra',
    brand: 'Samsung',
    name: 'Galaxy S24 Ultra',
    price: productPrices.galaxyS24Ultra,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8f17_udMJ66SYEhou-U7HrtcUxZTjRqza3wzb4wN3Q-M5krZMSIDJfyfJ2FMiohHRZPiMExl1HcYs1q_uuWoqQo5AK5HsGTdmyWDgBloYHBWmw3Z1QsRzxldfNijqvtsifs5aU8lMij9e2FAZYRxnq-K4hWTAWg5h3VvF8ZpQOCmk-znxHopX1Ecpv0M8s_R0_QVz-pCvCcYSSkCfgjVqjMJj1gRQ7bE6bsIh6Y6JJLt3MLFo6F2v',
    badge: 'Nuevo',
    description: 'Galaxy AI ha llegado. Rendimiento épico y un diseño de titanio de nivel superior.',
    details: 'Galaxy AI ha llegado. Rendimiento épico, un diseño de titanio de nivel superior y la experiencia S Pen integrada más avanzada.',
    specs: ['Snapdragon 8 Gen 3 for Galaxy', 'Cámara principal de 200MP', 'Batería de 5,000 mAh', 'Pantalla Dynamic AMOLED 2X de 6.8"'],
  },
  {
    id: 'redmi-note-13-pro-plus',
    brand: 'Xiaomi',
    name: 'Redmi Note 13 Pro+',
    price: productPrices.redmiNote13ProPlus,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNgVL5IQRg-y9va2RIoBEf660jN9IBbgmyJYFjM_CjVdKYoqDTR-4V3aoGbL8moT_uJWS2s0iaOyXNXmtnSLYqlpp-rRMSomQqWTayGe70MHhry185-_F-7mOLp5bE1Mf41JDUx0IUjjsfH7e1BZ73csFrFjPxd0qBMcJxmcgetQFrasVWx-3mG-YLSvkZtkINRxnmil58Dnn4qKt8mVkkM9fOKLEficzlteNmos3Hyz25ZhlE8zhk',
    badge: 'Oferta',
    description: 'Cámara de 200MP con OIS. Pantalla curva AMOLED de 1.5K. Carga HyperCharge de 120W.',
    details: 'Cámara de 200MP con OIS. Pantalla curva AMOLED de 1.5K a 120Hz. Carga HyperCharge de 120W que llena tu batería en minutos.',
    specs: ['MediaTek Dimensity 7200-Ultra', 'Cámara principal de 200MP con OIS', 'Carga HyperCharge de 120W', 'Pantalla AMOLED de 6.67" a 120Hz'],
  },
]

export const catalogProducts = [
  {
    ...homeProducts[0],
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    price: productPrices.iphone15Pro,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtSotVTbAukGuN13qU6Qzz_1EKgEB_G_HFGELcehFmYsVEyihupUOTiCxLdIF1LhxF8oIV9utlUo5U9IkkG4ysJOxdn6zwUKqkg4a0SlyY0ajnJFAhFbtwWmQvgFWQddWS1yTq1l5h2xcsd4iK4kvVXGaKoR6u9UoH_CziUopoOVgnho6eX00g3LgIRiNh4izRH8PZGOIlkooas4D7igUdWnn62FpRQwj_yC1fbJ2Wqr19ay_T1BIf',
    description: 'Titanio aeroespacial, chip A17 Pro y un sistema de cámaras revolucionario.',
    specs: ['Chip A17 Pro', 'Sistema de cámaras Pro 48MP', 'Hasta 23h de reproducción de video', 'Pantalla Super Retina XDR de 6.1"'],
  },
  homeProducts[1],
  {
    id: 'pixel-8-pro',
    brand: 'Google',
    name: 'Pixel 8 Pro',
    price: productPrices.pixel8Pro,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBX4WAYoYceNMfg_Fw285V2z3qzow47ZuHsY0jG5bRyBHe2X63y8lczZVxTraNgAtyiDH5A8YBvGX4BJDXfv1yHRVAfbVeS8BYpEjiKZmoowu9KeR-Wfee4uwZRWZow-tjbi1qCJsLoo7Le8ZjjO98M4ZEU2-ebiKPh8zeAyOgf6jK2dMgB2wEfpQDSDltoaUlzopO0tcapbUnK7pdx9vfwng8QeuXAEf1Bv70nKQP2uoE1pp288x-w',
    badge: 'Oferta',
    description: 'La magia de Google en su máxima expresión con nuevas funciones de cámara.',
    details: 'La magia de Google en su máxima expresión. Captura imágenes increíbles y disfruta de las funciones inteligentes de Google Tensor G3.',
    specs: ['Google Tensor G3', 'Sistema de cámaras Pro de 50MP', 'Batería de 5,050 mAh', 'Pantalla Super Actua de 6.7"'],
  },
  {
    id: 'xiaomi-14-ultra',
    brand: 'Xiaomi',
    name: 'Xiaomi 14 Ultra',
    price: productPrices.xiaomi14Ultra,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFRIDLauHwb0KmjnL4KcJvZcANYgzw9rIaCBI1rsaLaaJRFCcMwTNXe124ZxdZvTIK04lH2XcUxSXTYnaBzsbl-Md_2we0E7MaBbgmjuWMhn-8wJDKUZispX9DYgawSaKMr5OILxUlG5BlJ7_hbfZsxWQGJrTSuQ2NRh2_ItxoGhzTuoeos_1MU-UaoSx25gK1Vpq0rGntRSzlD42M5V1g8mPNS5YoAuEbiZfVGxYR0fYsB0cdR8YJ',
    description: 'Fotografía legendaria co-diseñada con Leica en un diseño icónico.',
    details: 'Un sistema de fotografía co-diseñado con Leica, óptica profesional y un diseño pensado para quienes quieren capturar cada detalle.',
    specs: ['Snapdragon 8 Gen 3', 'Sistema Leica de cuatro cámaras', 'Batería de 5,000 mAh', 'Pantalla AMOLED WQHD+ de 6.73"'],
  },
]

export const offerProducts = [
  {
    id: 'galaxy-s24-ultra-deal', brand: 'Samsung', name: 'Galaxy S24 Ultra', price: productPrices.galaxyS24Ultra,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhaUvG2wZmva20km_CMTs704iIiyJWj0M6MHE0l5kRevnlMyyTQNrhc_-vAmXABZQgJfOwS3XJ1th8r1Uj4D7InmXQqcATUdHCjdqfybXHl1BNw5iVVK2Xhy9MKWkFmHyDeJ7dLTAhFe7JkIPsW191mDNipQY38brgEc1x7oZoCdXGFi8fGMhu3Zxkh3SFMoT8ZPafBpsRWdb-kXVA2QAYiSausQw8PYuDmZ97JHmD_icyzslJo2Bo',
    description: '256GB / Titanium Gray', badge: '-11%', details: 'Galaxy S24 Ultra con 256GB en Titanium Gray, una oferta especial de Cyber Week.', specs: ['256GB de almacenamiento', 'Galaxy AI', 'Cámara principal de 200MP', 'Envío gratis'],
  },
  {
    id: 'iphone-15-pro-deal', brand: 'Apple', name: 'iPhone 15 Pro', price: productPrices.iphone15Pro,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeGIZmMxgEbLYeIFBtmsXZQm5r7EiKAgmsNWaTCGAwGOhvwMTzBQEgrJLagwBH6_ZlnfIPYZBR2jlMrdaf8QVuJkBkCquYyTru6f_EVD-mLYg2rp6S9M257glUwdwwfGaa3WeOnm0DhnuJzB71lF6_2SKeIQ2U9mkTLJHeV0N5lguAypfmIaj0nYzzLQhyI_8CncN_GMQK5GWXfzxuxAT3ch0rWDQ4548hPT0n1ds56XObXN8OewqS',
    description: '128GB / Natural Titanium', badge: '-18%', details: 'iPhone 15 Pro de 128GB en Natural Titanium con descuento de temporada.', specs: ['128GB de almacenamiento', 'Chip A17 Pro', 'Sistema de cámaras Pro', 'Titanio natural'],
  },
  {
    id: 'rog-phone-8-deal', brand: 'ASUS', name: 'ROG Phone 8', price: productPrices.rogPhone8,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdZoSjgBw-cwxmegr06yf5wglmoxMZU_fbX5qs5bBddHi5ZU6q6bHhQ7N1VlvYyCQeYHqxtVk3Ay5Gs0qnGQNGyzIIc2mwQ_JDkNd9Xzt_nRllUROv0DfW4XqtG-7I6GMA0n8ICSMqVBy9gWCFKDNFO_1bJwZPdNVtXb69oGeXzGwFGb_ueVxhp9eZ1WqLdTsvcMZfIRgT3l4TU-yo-rZrTuyIyyPay88A_4SZsjWbLgS-5URPEsgu',
    description: '512GB / Phantom Black', badge: '-30%', details: 'Potencia de juego portátil en Phantom Black, con 512GB y descuento especial.', specs: ['512GB de almacenamiento', 'Plataforma Snapdragon', 'Refrigeración para gaming', 'Phantom Black'],
  },
  {
    id: 'pixel-buds-pro-deal', brand: 'Google', name: 'Pixel Buds Pro', price: productPrices.pixelBudsPro,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYdfMJekz4A8IJhwqJpCJT8Be7thN8iG79rmfbrXL81wWiM8eB6e4W3FXQoSqRmLY37oAQJkv_FLRDqEa9f5jf8j3wC9jU8kkXGdutLWGovn6rN1kH7AdtwsX_7W6hDXiIJC_-ee15KmrdojnxkA0BFS9g3_gtkxnlcfiO1_BUbB8dJrd5SdWF_hytHUP5rk6SxXXDXt63iXgQfPmZabgjE-njazQ5DwR_fbdfiE640zQaL58p1WR8',
    description: 'Charcoal / ANC Activo', badge: '-40%', details: 'Audio inmersivo con cancelación activa de ruido en acabado Charcoal.', specs: ['Cancelación activa de ruido', 'Audio espacial', 'Estuche de carga inalámbrica', 'Hasta 31 horas con estuche'],
  },
]

export const comparisonProducts = [
  {
    id: 'iphone-15-compare', brand: 'Apple', name: 'iPhone 15', price: productPrices.iphone15, badge: 'Popular', tagline: 'El estándar de la industria',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3o2bblWmt9OHz7wHtLc9WAMKYjMzvIrK6fk6fWjlLrynbPwI5KhRKH0_pioGeOEQ7ESmAXT1vOXCrwiFk_-wHfHUiTHatFsJF9NqKmvlAMEUkGSwRvBmCK6H3T_U7FAVa-3bibWJvsyB91E1uLFQWkgTOxwLAp76WQLyW8W0-9N31TtCxY-Yxy9ACenhWA41n6g83LxNfKYedOsEu35JHksMluq9-zX1Ntlx4_12kuyqUiLa0n1nC',
  },
  {
    id: 'galaxy-s24-compare', brand: 'Samsung', name: 'Galaxy S24', price: productPrices.galaxyS24, badge: 'Nuevo', tagline: 'Poder con Inteligencia Artificial',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5Z3At42G3r-lzwA3m8bDvx2t_qaS07Jk5tNMw4NtUZ51fOKtG3AsCkBEjP0cUz3fuR8B0kaMoYd2Ddc4cEB-AIOJ7BKtDK2lhGq5NsDbxWKFHHsWnVPtadCXEyhMrFFpyYnldI4HQKqVZRLylZbxfaaJ2SVZctt5miMXoKVQXXmhOXeedteUNbNCht3dKiLd4zwlVoekgXcPortRzMIVqYMnN24dObezg9SnuVDYJfksaZkt664yX',
  },
  {
    id: 'redmi-note-13-compare', brand: 'Xiaomi', name: 'Redmi Note 13 Pro', price: productPrices.redmiNote13Pro, badge: 'Oferta', tagline: 'Rendimiento accesible',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBag2ZJt5mT4PWiS2VqBIo_bAU3h5nzTz-p0LWKnrxVSUlvq55VrhV4z21zbt8-MzXBoXa9tsd-gOdwJp5BWf1e5Vqpt5LtsZ7Ir-xjyMD0BlrZcI3E7y1FsYaO3eCxPaj5FHJJIaeqckIquUHQYHZMBeML4pYU5c7PItru6Zw7duDA6zoyVbFFVIt0WiHdo6VSnAe28FCV8j4T2_LKzl_FvjHY7p5MlwDEjfw3QHeru-1b-M4O-nlC',
  },
]

export const comparisonSpecs = [
  { label: 'Pantalla', icon: 'smartphone', values: ['6.1" Super Retina XDR OLED', '6.2" Dynamic AMOLED 2X, 120Hz', '6.67" AMOLED, 120Hz'] },
  { label: 'Cámara Principal', icon: 'photo_camera', values: [['48 MP', 'f/1.6, Dual Pixel PDAF'], ['50 MP', 'f/1.8, Dual Pixel PDAF, OIS'], ['200 MP', 'f/1.7, multi-directional PDAF, OIS']] },
  { label: 'Almacenamiento Base', icon: 'memory', values: ['128 GB', '128 GB', '256 GB'] },
  { label: 'Procesador', icon: 'developer_board', values: ['Apple A16 Bionic (4 nm)', 'Exynos 2400 / Snapdragon 8 Gen 3', 'Snapdragon 7s Gen 2 (4 nm)'] },
]

export const navItems = [
  { path: '/inicio', label: 'Inicio' },
  { path: '/smartphones', label: 'Smartphones' },
  { path: '/comparar', label: 'Comparar' },
  { path: '/ofertas', label: 'Ofertas' },
  { path: '/contacto', label: 'Contacto' },
]