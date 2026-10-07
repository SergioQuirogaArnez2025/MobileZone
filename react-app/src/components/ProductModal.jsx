import { useEffect } from 'react'
import { formatPrice } from './ProductCard.jsx'

export default function ProductModal({ product, onClose, onAdd }) {
  useEffect(() => {
    if (!product) return undefined
    const closeOnEscape = (event) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [product, onClose])

  if (!product) return null

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
        <button className="modal-close icon-button" type="button" aria-label="Cerrar detalles" onClick={onClose}><span className="material-symbols-outlined" aria-hidden="true">close</span></button>
        <div className="product-modal__image"><img src={product.image} alt={product.name} /></div>
        <div className="product-modal__content">
          <p className="eyebrow">{product.brand}</p>
          <h2 id="product-modal-title">{product.name}</h2>
          <strong className="modal-price">{formatPrice(product.price)}</strong>
          <p className="modal-description">{product.details || product.description}</p>
          <div className="modal-specs">
            <h3>Especificaciones clave</h3>
            <ul>{(product.specs || []).map((spec) => <li key={spec}><span className="material-symbols-outlined" aria-hidden="true">check_circle</span>{spec}</li>)}</ul>
          </div>
          <button className="button button--primary button--wide" type="button" onClick={() => { onAdd(product); onClose() }}><span className="material-symbols-outlined" aria-hidden="true">add_shopping_cart</span>Añadir al carrito</button>
        </div>
      </section>
    </div>
  )
}