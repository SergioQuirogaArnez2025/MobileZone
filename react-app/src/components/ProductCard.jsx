export function ProductCard({ product, onOpen, onAdd, favorite = false, onFavorite, offer = false }) {
  return (
    <article className="product-card">
      {(product.badge || product.previousPrice) && <span className={`product-badge${offer ? ' product-badge--sale' : ''}`}>{offer ? product.badge : product.badge || 'Oferta'}</span>}
      {onFavorite && (
        <button className={`favorite-button${favorite ? ' is-favorite' : ''}`} type="button" aria-label={favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'} aria-pressed={favorite} onClick={() => onFavorite(product.id)}>
          <span className="material-symbols-outlined" aria-hidden="true">{favorite ? 'favorite' : 'favorite_border'}</span>
        </button>
      )}
      <button className="product-image" type="button" onClick={() => onOpen(product)} aria-label={`Ver detalles de ${product.name}`}>
        <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
      </button>
      <div className="product-card__body">
        <p className="product-brand">{product.brand}</p>
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-card__bottom">
          <div className="price-line">
            <strong>{formatPrice(product.price)}</strong>
          </div>
          <div className="product-actions">
            {onOpen && <button className="button button--icon-outline" type="button" aria-label={`Ver detalles de ${product.name}`} onClick={() => onOpen(product)}><span className="material-symbols-outlined" aria-hidden="true">info</span></button>}
            <button className="button button--primary" type="button" onClick={() => onAdd(product)}><span className="material-symbols-outlined" aria-hidden="true">add_shopping_cart</span><span>Añadir</span></button>
          </div>
        </div>
      </div>
    </article>
  )
}

export function formatPrice(price, decimals = false) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: decimals ? 2 : 0, maximumFractionDigits: decimals ? 2 : 0 }).format(price)
}