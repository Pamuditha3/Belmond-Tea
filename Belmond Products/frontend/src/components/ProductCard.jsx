import React from 'react';

const ProductCard = ({ product, onSelect }) => {
  return (
    <div className="product-card">
      <div>
        <div className="product-card__img">
          <img src={product.imgUrl} alt={product.name} />
        </div>
        <div className="product-card__rating">{product.rating}</div>
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__desc">
          {product.desc.length > 75 ? `${product.desc.substring(0, 75)}...` : product.desc}
        </p>
      </div>
      <div>
        <div className="product-card__price">{product.price}</div>
        <button 
          className="btn btn-solid w-100" 
          onClick={() => onSelect(product)}
          style={{ width: '100%' }}
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
