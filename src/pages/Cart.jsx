import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus } from 'lucide-react';
import { removeFromCart, updateQuantity } from '../features/cartSlice';
import { dict } from '../translations';

const PROMO_CODES = { 'A77B77C77': 20 };

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = useSelector(state => state.lang.current);
  const t = dict[lang];
  const cartItems = useSelector(state => state.cart.items);

  const [selected, setSelected] = useState([]);
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');

  const toggleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    if (selected.length === cartItems.length) setSelected([]);
    else setSelected(cartItems.map(i => i.id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);
  const discountRate = appliedPromo ? PROMO_CODES[appliedPromo] : 0;
  const discount = parseFloat(((subtotal * discountRate) / 100).toFixed(2));
  const total = parseFloat((subtotal - discount).toFixed(2));

  const handleApplyPromo = () => {
    if (PROMO_CODES[promoInput]) {
      setAppliedPromo(promoInput);
      setPromoError('');
    } else {
      setPromoError(lang === 'az' ? 'Promo kod yanlışdır!' : 'Неверный промокод!');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoInput('');
    setPromoError('');
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem 0', color: '#64748B' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#1E293B' }}>
          {lang === 'az' ? 'Səbət boşdur' : 'Корзина пуста'}
        </h2>
        <p>{lang === 'az' ? 'Məhsullar səhifəsindən seçim edin' : 'Выберите товары в разделе продуктов'}</p>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      {/* LEFT: Items */}
      <div className="cart-items-panel">
        <h1 className="cart-main-title">
          {lang === 'az' ? `Səbət (${cartItems.length} Məhsul)` : `Корзина (${cartItems.length} товар)`}
        </h1>

        <label className="cart-select-all">
          <input
            type="checkbox"
            checked={selected.length === cartItems.length && cartItems.length > 0}
            onChange={toggleAll}
          />
          {lang === 'az' ? 'Hamısı seç' : 'Выбрать всё'}
        </label>

        <div className="cart-items-list">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item-row">
              <div className="cart-item-check">
                <input
                  type="checkbox"
                  checked={selected.includes(item.id)}
                  onChange={() => toggleSelect(item.id)}
                />
              </div>

              <div className="cart-item-image-wrap">
                <img src={item.image} alt={item.name} className="cart-item-img" />
              </div>

              <div className="cart-item-info">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-cat">{item.category}</p>
                {discountRate > 0 && (
                  <span className="cart-discount-badge">{discountRate}%</span>
                )}
                <div className="cart-item-price">{item.price} AZN</div>
              </div>

              <div className="cart-item-actions">
                <button
                  className="cart-delete-btn"
                  onClick={() => dispatch(removeFromCart(item))}
                >
                  <Trash2 size={18} />
                </button>

                <div className="cart-qty-ctrl">
                  <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>
                    <Minus size={14} />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: Summary */}
      <div className="cart-summary-panel">
        <h2 className="cart-summary-title">
          {lang === 'az' ? `Səbət (${cartItems.length} məhsul)` : `Корзина (${cartItems.length} товара)`}
        </h2>

        <div className="cart-promo-section">
          <h3 className="cart-promo-label">Promo kod</h3>
          <p className="cart-promo-note">
            {lang === 'az' ? 'Diqqət! Yalnız bir promo kod istifadə oluna bilər.' : 'Внимание! Можно использовать только один промокод.'}
          </p>
          <div className="cart-promo-input-row">
            <input
              type="text"
              value={promoInput}
              onChange={e => setPromoInput(e.target.value.toUpperCase())}
              placeholder="Promo kod"
              className="cart-promo-input"
              disabled={!!appliedPromo}
            />
            {appliedPromo ? (
              <button className="cart-promo-cancel" onClick={handleRemovePromo}>
                {lang === 'az' ? 'Ləğv et' : 'Удалить'}
              </button>
            ) : (
              <button className="cart-promo-apply" onClick={handleApplyPromo}>
                {lang === 'az' ? 'Tətbiq et' : 'Применить'}
              </button>
            )}
          </div>
          {appliedPromo && (
            <p className="cart-promo-success">
              ✓ {discountRate}% {lang === 'az' ? 'Promo kod tətbiq olundu!' : 'Промокод применён!'}
            </p>
          )}
          {promoError && <p className="cart-promo-error">{promoError}</p>}
        </div>

        <div className="cart-price-breakdown">
          <div className="cart-price-row">
            <span>{lang === 'az' ? 'Məhsulların qiyməti' : 'Сумма товаров'}</span>
            <span>{subtotal.toFixed(2)} AZN</span>
          </div>
          {discount > 0 && (
            <div className="cart-price-row">
              <span>{lang === 'az' ? 'Endirim' : 'Скидка'}</span>
              <span>-{discount} AZN</span>
            </div>
          )}
        </div>

        <div className="cart-total-row">
          <span>{lang === 'az' ? 'Yekun qiymət' : 'Итого'}</span>
          <span>{total} AZN</span>
        </div>

        <button
          className="cart-order-btn"
          onClick={() => navigate('/checkout')}
        >
          {lang === 'az' ? 'Sifariş edin' : 'Оформить заказ'}
        </button>
      </div>
    </div>
  );
};

export default Cart;
