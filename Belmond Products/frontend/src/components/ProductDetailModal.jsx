import React, { useEffect } from 'react';

const ProductDetailModal = ({ product, isOpen, onClose }) => {
  
  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const displayType = product.type.replace(/-/g, ' ').toUpperCase();

  return (
    <>
      <div className={`product-modal ${isOpen ? 'active' : ''}`}>
        <div className="product-modal__close" onClick={onClose}>&times;</div>
        <div className="product-modal__grid">
          <div className="product-modal__left">
            <img src={product.imgUrl} alt={product.name} />
          </div>
          <div className="product-modal__right">
            <span className="product-modal__cat">{displayType}</span>
            <h2 className="product-modal__title">{product.name}</h2>
            <p className="product-modal__desc">{product.desc}</p>
            
            <div className="product-modal__meta">
              <div><strong>Ingredients:</strong> <span>{product.ingredients}</span></div>
              <div><strong>Brewing Instruction:</strong> <span>{product.brewing}</span></div>
            </div>
            
            <button className="btn btn-solid" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
      
      {/* Backdrop */}
      <div 
        className={`modal-backdrop ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      ></div>
    </>
  );
};

export default ProductDetailModal;
