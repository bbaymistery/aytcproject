import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Search, ShoppingBag, Heart, Menu, User, ChevronDown } from 'lucide-react';
import { setLang } from '../features/langSlice';
import { dict } from '../translations';
import Logo from './Logo';

const Header = () => {
  const dispatch = useDispatch();
  const lang = useSelector(state => state.lang.current);
  const t = dict[lang];
  const navigate = useNavigate();

  const cartItems = useSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const favItems = useSelector(state => state.favorites.items);
  const favCount = favItems.length;

  const categories = [t.cat1, t.cat2, t.cat3, t.cat4, t.cat5, t.cat6];

  const handleLangChange = (e) => {
    dispatch(setLang(e.target.value));
  };

  return (
    <header className="header-wrapper">
      <div className="top-bar">
        <Link to="/" className="logo-container">
          <Logo />
        </Link>
        
        <nav className="main-nav">
          <NavLink to="/">{t.home}</NavLink>
          <NavLink to="/products">{t.products}</NavLink>
          <NavLink to="/about">{t.about}</NavLink>
          <NavLink to="/blog">{t.blog}</NavLink>
          <NavLink to="/posts">{t.posts}</NavLink>
          <NavLink to="/campaigns">{t.campaigns}</NavLink>
          <NavLink to="/contact">{t.contact}</NavLink>
        </nav>

        <div className="user-actions">
          <button className="search-icon">
            <Search size={18} />
          </button>
          
          <button className="icon-btn" style={{ position: 'relative' }} onClick={() => navigate('/cart')}>
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: '-5px', right: '-8px', 
                background: '#ef4444', color: 'white', borderRadius: '50%', 
                fontSize: '10px', padding: '2px 6px', fontWeight: 'bold'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          <button className="icon-btn" style={{ position: 'relative' }} onClick={() => navigate('/favorites')}>
            <Heart size={22} />
            {favCount > 0 && (
              <span style={{
                position: 'absolute', top: '-5px', right: '-8px', 
                background: '#ef4444', color: 'white', borderRadius: '50%', 
                fontSize: '10px', padding: '2px 6px', fontWeight: 'bold'
              }}>
                {favCount}
              </span>
            )}
          </button>
          
          <div className="language-selector" style={{ background: 'none', border: 'none' }}>
            <select 
              value={lang} 
              onChange={handleLangChange}
              style={{ border: 'none', outline: 'none', background: 'transparent', cursor: 'pointer', fontWeight: '500', fontSize: '0.95rem' }}
            >
              <option value="az">AZ</option>
              <option value="ru">RU</option>
            </select>
          </div>
          
          <button className="login-btn">
            <User size={20} />
            {t.login}
          </button>
        </div>
      </div>

      <div className="category-nav-wrapper">
        <div className="category-nav">
          <button className="all-categories-btn">
            <Menu size={18} /> {t.allCategories}
          </button>
          <ul className="category-list">
            {categories.map((cat, index) => (
              <li key={index} className="category-item">
                {cat} <ChevronDown size={14} color="#94A3B8" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
