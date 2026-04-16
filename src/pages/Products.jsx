import React, { useState } from 'react';
import { Search, ShoppingBag, Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { toggleFavorite } from '../features/favoritesSlice';
import { dict } from '../translations';
import { productsData } from '../data/products';

const Products = () => {
  const dispatch = useDispatch();
  const lang = useSelector(state => state.lang.current);
  const t = dict[lang];
  const favoriteItems = useSelector(state => state.favorites.items);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, category: t[product.catKey] }));
  };

  const handleToggleFav = (product) => {
    dispatch(toggleFavorite({ ...product, category: t[product.catKey] }));
  };

  const isFav = (id) => favoriteItems.some(item => item.id === id);

  const filteredProducts = productsData.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t[p.catKey].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>{t.products}</h1>
          <span className="product-count">{filteredProducts.length} {t.productCount}</span>
        </div>
        
        <div className="search-box">
          <input 
            type="text" 
            placeholder={t.search} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={18} />
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <button className="wishlist-btn" onClick={() => handleToggleFav(product)}>
              <Heart size={20} fill={isFav(product.id) ? "#1D71B8" : "none"} color="#1D71B8" />
            </button>
            
            <div className="product-image-container">
              <img src={product.image} alt={product.name} className="product-image" />
            </div>
            
            <div className="product-info">
              <div className="product-header">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">{product.price} AZN</div>
              </div>
              <p className="product-category">{t[product.catKey]}</p>
              
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingBag size={18} />
                {t.addToCart}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
