import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { removeFromCart, clearCart } from '../features/cartSlice';
import { dict } from '../translations';

const CITIES_AZ = ['Bakı', 'Gəncə', 'Sumqayıt', 'Mingəçevir', 'Naxçıvan', 'Şirvan', 'Lənkəran'];
const CITIES_RU = ['Баку', 'Гянджа', 'Сумгайыт', 'Мингячевир', 'Нахчыван', 'Ширван', 'Ленкорань'];

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = useSelector(state => state.lang.current);
  const t = dict[lang];
  const cartItems = useSelector(state => state.cart.items);

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    city: '',
    address: '',
    note: '',
    agree: false,
  });

  const subtotal = cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);
  const discount = parseFloat((subtotal * 0.1).toFixed(2));
  const total = parseFloat((subtotal - discount).toFixed(2));

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = () => {
    if (!form.fullName || !form.phone || !form.city || !form.address || !form.agree) {
      alert(lang === 'az' ? 'Zəhmət olmasa bütün sahələri doldurun!' : 'Пожалуйста, заполните все поля!');
      return;
    }
    dispatch(clearCart());
    navigate('/');
    alert(lang === 'az' ? 'Sifarişiniz qəbul edildi! Tezliklə sizinlə əlaqə saxlanılacaq.' : 'Ваш заказ принят! Мы свяжемся с вами в ближайшее время.');
  };

  const cities = lang === 'az' ? CITIES_AZ : CITIES_RU;

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-layout">
      {/* LEFT: Form */}
      <div className="checkout-form-panel">
        <h1 className="checkout-title">
          {lang === 'az' ? 'Sifarişin Rəsmiləşdirilməsi' : 'Оформление заказа'}
        </h1>

        <section className="checkout-section">
          <h2 className="checkout-section-title">
            {lang === 'az' ? 'Şəxsi Məlumat' : 'Личные данные'}
          </h2>
          <div className="checkout-form-row">
            <div className="checkout-form-group">
              <label>{lang === 'az' ? 'Ad, soyad' : 'Имя, фамилия'}</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder={lang === 'az' ? 'Ad və soyad daxil edin' : 'Введите имя и фамилию'}
                className="checkout-input"
              />
            </div>
            <div className="checkout-form-group">
              <label>{lang === 'az' ? 'Nömrə' : 'Телефон'}</label>
              <div className="checkout-phone-row">
                <span className="checkout-phone-prefix">994</span>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder={lang === 'az' ? 'Mobil nömrənizi daxil edin' : 'Введите номер телефона'}
                  className="checkout-input checkout-phone-input"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="checkout-section">
          <h2 className="checkout-section-title">
            {lang === 'az' ? 'Çatdırılma Məlumatları' : 'Данные о доставке'}
          </h2>
          <div className="checkout-form-row">
            <div className="checkout-form-group">
              <label>{lang === 'az' ? 'Şəhər' : 'Город'}</label>
              <div style={{ position: 'relative' }}>
                <select
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="checkout-input checkout-select"
                >
                  <option value="">{lang === 'az' ? 'Şəhəri daxil edin' : 'Выберите город'}</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="checkout-form-group">
              <label>{lang === 'az' ? 'Ünvan' : 'Адрес'}</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder={lang === 'az' ? 'Ünvanı qeyd edin' : 'Введите адрес'}
                className="checkout-input"
              />
            </div>
          </div>

          <div className="checkout-form-group" style={{ marginTop: '1rem' }}>
            <label>{lang === 'az' ? 'Əlavə qeyd' : 'Дополнительно'}</label>
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder={lang === 'az' ? 'Sifariş barədə əlavə qeydləriniz varsa daxil edin' : 'Введите дополнительные примечания к заказу'}
              className="checkout-textarea"
              rows={5}
            />
          </div>
        </section>

        <label className="checkout-agree">
          <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} />
          {lang === 'az' ? 'Şərtlərlə razılaşıram' : 'Я согласен с условиями'}
        </label>

        <div className="checkout-btn-row">
          <button className="checkout-cancel-btn" onClick={() => navigate('/cart')}>
            {lang === 'az' ? 'Ləğv et' : 'Отмена'}
          </button>
          <button className="checkout-submit-btn" onClick={handleSubmit}>
            {lang === 'az' ? 'Davam et' : 'Продолжить'}
          </button>
        </div>
      </div>

      {/* RIGHT: Order Summary */}
      <div className="checkout-summary-panel">
        {cartItems.map(item => (
          <div key={item.id} className="checkout-summary-item">
            <img src={item.image} alt={item.name} className="checkout-summary-img" />
            <div className="checkout-summary-info">
              <p className="checkout-summary-name">{item.name}</p>
              <p className="checkout-summary-cat">{item.category}</p>
              <p className="checkout-summary-price">{item.price} AZN (X{item.quantity})</p>
            </div>
            <button className="checkout-summary-remove" onClick={() => dispatch(removeFromCart(item))}>
              <X size={16} />
            </button>
          </div>
        ))}

        <div className="checkout-summary-prices">
          <div className="checkout-summary-row">
            <span>{lang === 'az' ? 'Ümumi Qiymət' : 'Сумма'}</span>
            <span>{subtotal.toFixed(2)} AZN</span>
          </div>
          <div className="checkout-summary-row">
            <span>{lang === 'az' ? 'Endirim' : 'Скидка'}</span>
            <span>-{discount} AZN</span>
          </div>
          <div className="checkout-summary-total">
            <span>{lang === 'az' ? 'Yekun qiymət' : 'Итого'}</span>
            <span>{total} AZN</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
