import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Search, ShoppingBag, Heart, Menu, User, ChevronDown, X, ChevronRight } from 'lucide-react';
import { setLang } from '../features/langSlice';
import { dict } from '../translations';
import Logo from './Logo';
import AuthDrawer from './AuthDrawer';

const Header = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAllCategoriesOpen, setIsAllCategoriesOpen] = useState(false);
  const [activeSidebarCategory, setActiveSidebarCategory] = useState(null);

  const dispatch = useDispatch();
  const lang = useSelector(state => state.lang.current);
  const t = dict[lang];
  const navigate = useNavigate();

  const cartItems = useSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const favItems = useSelector(state => state.favorites.items);
  const favCount = favItems.length;

  const categories = [t.cat1, t.cat2, t.cat3, t.cat4, t.cat5, t.cat6];
  const subcategoriesArray = [
    ["C Vitamini", "D3 Vitamini", "B Kompleks", "Multivitaminlər", "Sink", "Dəmir"],
    ["Uşaqlar üçün", "Böyüklər üçün", "Həzm üçün", "Gündəlik Kompleks"],
    ["L-Karnitin", "Kofein Ekstraktı", "Yaşıl Çay Ekstraktı", "Kompleks Gücləndirici"],
    ["Qadınlar üçün", "Kişilər üçün", "Tiroid Dəstəyi", "Melatonin"],
    ["Maqnezium", "Kalsium", "Kalium", "Selen", "Mis"],
    ["Omeqa-3", "Ginkqo Biloba", "Fosfatidilserin", "L-Teanin"]
  ];
  const handleLangChange = (e) => {
    dispatch(setLang(e.target.value));
  };

  const openAuth = (mode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
    setIsDropdownOpen(false);
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
          
          <div className="login-dropdown-container">
            <button className="login-btn" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <User size={20} />
              {t.login}
            </button>
            {isDropdownOpen && (
              <div className="login-dropdown">
                <button onClick={() => openAuth('login')} className="login-dropdown-btn primary">
                  Daxil olun
                </button>
                <button onClick={() => openAuth('register')} className="login-dropdown-btn secondary">
                  Qeydiyyatdan keç
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="category-nav-wrapper">
        <div className="category-nav">
          <div className="all-categories-container">
            <button 
              className={`all-categories-btn ${isAllCategoriesOpen ? 'active' : ''}`}
              onClick={() => setIsAllCategoriesOpen(!isAllCategoriesOpen)}
            >
              {isAllCategoriesOpen ? <X size={18} /> : <Menu size={18} />} {t.allCategories}
            </button>
            
            {isAllCategoriesOpen && (
              <div className="sidebar-menu">
                <div className="sidebar-categories-list">
                  {categories.map((cat, i) => (
                    <div 
                      key={i} 
                      className={`sidebar-cat-item ${activeSidebarCategory === i ? 'active' : ''}`}
                      onMouseEnter={() => setActiveSidebarCategory(i)}
                    >
                      {cat} <ChevronRight size={14} color={activeSidebarCategory === i ? '#1D71B8' : '#94A3B8'} />
                    </div>
                  ))}
                </div>
                
                {activeSidebarCategory !== null && (
                  <>
                    <div className="sidebar-subcategories">
                      <h3 className="sub-title">{categories[activeSidebarCategory]}</h3>
                      <ul className="sub-list">
                        {(subcategoriesArray[activeSidebarCategory] || []).map((sub, i) => (
                          <li key={i} className="sub-item" onClick={() => setIsAllCategoriesOpen(false)}>
                            <Link to="/products" style={{ color: 'inherit', textDecoration: 'none', display: 'block', width: '100%' }}>{sub}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="sidebar-image-banner">
                      <img 
                        src="https://images.pexels.com/photos/3850624/pexels-photo-3850624.jpeg?auto=compress&cs=tinysrgb&w=600" 
                        alt="Promo" 
                        className="banner-image" 
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <ul className="category-list">
            {categories.map((cat, index) => (
              <li key={index} className="category-item has-dropdown">
                {cat} <ChevronDown size={14} color="#94A3B8" />
                <div className="dropdown-menu">
                  <ul className="sub-list">
                    {(subcategoriesArray[index] || []).map((sub, i) => (
                      <li key={i} className="sub-item">
                        <Link to="/products" style={{ color: 'inherit', textDecoration: 'none', display: 'block', width: '100%' }}>{sub}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <AuthDrawer isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} initialMode={authMode} />
    </header>
  );
};

export default Header;
