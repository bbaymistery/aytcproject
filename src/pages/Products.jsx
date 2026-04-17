import React, { useState } from 'react';
import { Search, ShoppingBag, Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { toggleFavorite } from '../features/favoritesSlice';
import { dict } from '../translations';
import { productsData } from '../data/products';

/**
 * Products Page Component
 * Renders the main catalog with dynamic filtering, categories, and responsive grid.
 */
const Products = () => {
  const dispatch = useDispatch();
  
  // Get current language and its translations
  const lang = useSelector(state => state.lang.current);
  const t = dict[lang];
  
  // Get favorited items for the wishlist heart toggle
  const favoriteItems = useSelector(state => state.favorites.items);
  
  // State: Price range (handled by dual-range slider)
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  
  // State: Search text query
  const [searchTerm, setSearchTerm] = useState('');
  
  // State: Tracks which accordion sections are expanded in the sidebar
  const [expanded, setExpanded] = useState({
    filtr: true,
    categories: true,
    audiences: true,
    metabolizm: true
  });

  // State: Boolean filters (Discount, Best Seller, New)
  const [filters, setFilters] = useState({
    isDiscounted: false,
    isBestSeller: false,
    isNew: false
  });
  
  // State: Categories and subcategories filters
  const [cats, setCats] = useState({
    "Termogeniklər": false,
    "Yağ yandırıcılar": false,
    "Tiroid Dəstəkləyicilər": false,
    "Probiotiklər": false,
    "Hormon və Daxili Tarazlıq": false,
    "Minerallar": false,
    "Beyin və Yaddaş Dəstəkləyicilər": false
  });

  // State: Audience specific filters
  const [audiences, setAudiences] = useState({
    "Uşaqlar üçün": false,
    "Qadınlar üçün": false,
    "Kişilər üçün": false
  });

  /**
   * Helper to toggle open/close state of an accordion section
   */
  const toggleExpanded = (key) => setExpanded(p => ({ ...p, [key]: !p[key] }));

  // Handlers for sliders to prevent overlapping min/max logic
  const handleMinSlider = (e) => {
    let value = parseInt(e.target.value);
    if (value > maxPrice - 10) value = maxPrice - 10;
    setMinPrice(value);
  };
  
  const handleMaxSlider = (e) => {
    let value = parseInt(e.target.value);
    if (value < minPrice + 10) value = minPrice + 10;
    setMaxPrice(value);
  };
  
  // Handlers for manual input boxes
  const handleMinInput = (e) => {
    let value = parseInt(e.target.value);
    if (!isNaN(value)) setMinPrice(value);
  };
  
  const handleMaxInput = (e) => {
    let value = parseInt(e.target.value);
    if (!isNaN(value)) setMaxPrice(value);
  };

  /**
   * Adds the selected product to the global cart state in Redux
   */
  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, category: t[product.catKey] }));
  };

  /**
   * Toggles the favorite status of the product in Redux
   */
  const handleToggleFav = (product) => {
    dispatch(toggleFavorite({ ...product, category: t[product.catKey] }));
  };

  // Utility to check if a single product is favorited
  const isFav = (id) => favoriteItems.some(item => item.id === id);

  /**
   * Complex filtering logic applies all rules dynamically.
   * Modifies the displayed product list.
   */
  const filteredProducts = productsData.filter(p => {
    // 1. Search filter: Match against name or category name
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      t[p.catKey].toLowerCase().includes(searchTerm.toLowerCase());
    
    // 2. Price filter: Verify product falls inside selected bounds
    const price = parseInt(p.price);
    const matchesPrice = price >= minPrice && price <= maxPrice;
    
    // 3. Status filters: (e.g. only show item if 'isDiscounted' is checked and item is truly discounted)
    const matchesDiscounted = !filters.isDiscounted || p.isDiscounted;
    const matchesBestSeller = !filters.isBestSeller || p.isBestSeller;
    const matchesNew = !filters.isNew || p.isNew;
    
    // 4. Categories filter: If specific categories are checked, include items matching them
    const selectedCats = Object.keys(cats).filter(k => cats[k]);
    let matchesCategory = true;
    if (selectedCats.length > 0) {
      matchesCategory = selectedCats.some(c => {
        // Match the outer translated category (e.g. Probiotiklər)
        if (t[p.catKey] === c) return true;
        // Or match an exact subcategory element (e.g. Termogeniklər)
        if (p.subcategories?.includes(c)) return true;
        return false;
      });
    }
    
    // 5. Audience filter: E.g., 'Kişilər üçün' should filter to matching array in data
    const selectedAudiences = Object.keys(audiences).filter(key => audiences[key]);
    let matchesAudience = true;
    if (selectedAudiences.length > 0) {
      matchesAudience = selectedAudiences.some(aud => p.audiences?.includes(aud));
    }
    
    // Final check determines if product appears
    return matchesSearch && matchesPrice && matchesDiscounted && matchesBestSeller && matchesNew && matchesCategory && matchesAudience;
  });

  return (
    // Replaced inline layout style with generic layout container classes for responsiveness
    <div className="products-layout" style={{ maxWidth: 1280, margin: '2rem auto', padding: '0 1.5rem', display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
      
      {/* Sidebar for Filters */}
      <aside className="products-sidebar" style={{ width: '260px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem', background: '#FAFAFA', padding: '1.5rem', borderRadius: '12px' }}>
        
        {/* === SECTION: Price Filter === */}
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0F172A', marginBottom: '1rem' }}>Qiymət</h4>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <input type="number" min="0" max="500" placeholder="Min" value={minPrice} onChange={handleMinInput} style={{ width: '100%', padding: '0.5rem', border: '1px solid #E2E8F0', borderRadius: '4px', fontSize: '0.85rem' }} />
            <input type="number" min="0" max="500" placeholder="Max" value={maxPrice} onChange={handleMaxInput} style={{ width: '100%', padding: '0.5rem', border: '1px solid #E2E8F0', borderRadius: '4px', fontSize: '0.85rem' }} />
          </div>
          {/* Dual Range Track */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#64748B', position: 'relative', paddingTop: '10px' }}>
            <span>{minPrice} AZN</span>
            <div style={{ flex: 1, height: '4px', background: '#E2E8F0', borderRadius: '2px', position: 'relative' }}>
              <div style={{ 
                position: 'absolute', 
                left: `${(minPrice / 500) * 100}%`, 
                right: `${100 - (maxPrice / 500) * 100}%`, 
                height: '100%', 
                background: '#1D71B8', 
                borderRadius: '2px',
                zIndex: 1
              }}></div>
              {/* Lower slider layer */}
              <input 
                 type="range"
                 min="0"
                 max="500"
                 value={minPrice}
                 onChange={handleMinSlider}
                 style={{
                   position: 'absolute',
                   width: '100%',
                   top: '-6px',
                   appearance: 'none',
                   background: 'transparent',
                   pointerEvents: 'none',
                   zIndex: 2,
                   margin: 0,
                   left: 0
                 }}
                 className="custom-range-slider"
              />
              {/* Higher slider layer */}
              <input 
                 type="range"
                 min="0"
                 max="500"
                 value={maxPrice}
                 onChange={handleMaxSlider}
                 style={{
                   position: 'absolute',
                   width: '100%',
                   top: '-6px',
                   appearance: 'none',
                   background: 'transparent',
                   pointerEvents: 'none',
                   zIndex: 2,
                   margin: 0,
                   left: 0
                 }}
                 className="custom-range-slider"
              />
            </div>
            <span>{maxPrice} AZN</span>
          </div>
        </div>

        {/* === SECTION: General Badges Filter === */}
        <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1.5rem' }}>
          <div onClick={() => toggleExpanded('filtr')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0F172A' }}>Filtr</h4>
            <span style={{ fontSize: '0.8rem', color: '#64748B', transform: expanded.filtr ? 'rotate(0deg)' : 'rotate(180deg)' }}>▲</span>
          </div>
          {expanded.filtr && (
            <>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#64748B', marginBottom: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={filters.isDiscounted} onChange={() => setFilters(p => ({...p, isDiscounted: !p.isDiscounted}))} /> Endirimdə Olanlar
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#64748B', marginBottom: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={filters.isBestSeller} onChange={() => setFilters(p => ({...p, isBestSeller: !p.isBestSeller}))} /> Ən Çox Satılanlar
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#64748B', marginBottom: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={filters.isNew} onChange={() => setFilters(p => ({...p, isNew: !p.isNew}))} /> Ən Yeni Məhsullar
              </label>
            </>
          )}
        </div>

        {/* === SECTION: Deep Category Selection === */}
        <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1.5rem' }}>
          <div onClick={() => toggleExpanded('categories')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0F172A' }}>Kateqoriya üzrə</h4>
            <span style={{ fontSize: '0.8rem', color: '#64748B', transform: expanded.categories ? 'rotate(0deg)' : 'rotate(180deg)' }}>▲</span>
          </div>
          
          {expanded.categories && (
            <div>
              {/* Inner search query entry */}
              <input 
                type="text" 
                placeholder="Axtarış..." 
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #E2E8F0', borderRadius: '4px', fontSize: '0.85rem', marginBottom: '1rem' }} 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <div style={{ marginTop: '0.5rem' }}>
                <div onClick={() => toggleExpanded('metabolizm')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: '0.75rem' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0F172A' }}>Metabolizm Gücləndiricilər</h4>
                  <span style={{ fontSize: '0.8rem', color: '#64748B', transform: expanded.metabolizm ? 'rotate(0deg)' : 'rotate(180deg)' }}>▲</span>
                </div>
                {/* Specific inner subcategories */}
                {expanded.metabolizm && (
                  <div style={{ paddingLeft: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.5rem' }}>
                     <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748B', cursor: 'pointer' }}>
                       <input type="checkbox" checked={cats["Termogeniklər"]} onChange={() => setCats(p => ({...p, "Termogeniklər": !p["Termogeniklər"]}))} /> Termogeniklər
                     </label>
                     <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748B', cursor: 'pointer' }}>
                       <input type="checkbox" checked={cats["Yağ yandırıcılar"]} onChange={() => setCats(p => ({...p, "Yağ yandırıcılar": !p["Yağ yandırıcılar"]}))} /> Yağ yandırıcılar
                     </label>
                     <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748B', cursor: 'pointer' }}>
                       <input type="checkbox" checked={cats["Tiroid Dəstəkləyicilər"]} onChange={() => setCats(p => ({...p, "Tiroid Dəstəkləyicilər": !p["Tiroid Dəstəkləyicilər"]}))} /> Tiroid Dəstəkləyicilər
                     </label>
                  </div>
                )}
                
                {/* Regular parent categories checkboxes */}
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#0F172A', fontWeight: 500, padding: '0.75rem 0 0.5rem', borderBottom: '1px solid #E2E8F0', cursor:'pointer' }}>
                  <input type="checkbox" checked={cats["Probiotiklər"]} onChange={() => setCats(p => ({...p, "Probiotiklər": !p["Probiotiklər"]}))} /> Probiotiklər
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#0F172A', fontWeight: 500, padding: '0.75rem 0 0.5rem', borderBottom: '1px solid #E2E8F0', cursor:'pointer' }}>
                  <input type="checkbox" checked={cats["Hormon və Daxili Tarazlıq"]} onChange={() => setCats(p => ({...p, "Hormon və Daxili Tarazlıq": !p["Hormon və Daxili Tarazlıq"]}))} /> Hormon və Daxili Tarazlıq
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#0F172A', fontWeight: 500, padding: '0.75rem 0 0.5rem', borderBottom: '1px solid #E2E8F0', cursor:'pointer' }}>
                  <input type="checkbox" checked={cats["Minerallar"]} onChange={() => setCats(p => ({...p, "Minerallar": !p["Minerallar"]}))} /> Minerallar
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#0F172A', fontWeight: 500, padding: '0.75rem 0 0.5rem', cursor:'pointer' }}>
                  <input type="checkbox" checked={cats["Beyin və Yaddaş Dəstəkləyicilər"]} onChange={() => setCats(p => ({...p, "Beyin və Yaddaş Dəstəkləyicilər": !p["Beyin və Yaddaş Dəstəkləyicilər"]}))} /> Beyin və Yaddaş Dəstəkləyicilər
                </label>
              </div>
            </div>
          )}
        </div>

        {/* === SECTION: Target Audiences === */}
        <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1.5rem' }}>
          <div onClick={() => toggleExpanded('audiences')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0F172A' }}>Fərdi seçim</h4>
            <span style={{ fontSize: '0.8rem', color: '#64748B', transform: expanded.audiences ? 'rotate(0deg)' : 'rotate(180deg)' }}>▲</span>
          </div>
          {expanded.audiences && (
            <>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#64748B', marginBottom: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={audiences["Uşaqlar üçün"]} onChange={() => setAudiences(p => ({...p, "Uşaqlar üçün": !p["Uşaqlar üçün"]}))} /> Uşaqlar üçün
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#64748B', marginBottom: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={audiences["Qadınlar üçün"]} onChange={() => setAudiences(p => ({...p, "Qadınlar üçün": !p["Qadınlar üçün"]}))} /> Qadınlar üçün
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#64748B', marginBottom: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={audiences["Kişilər üçün"]} onChange={() => setAudiences(p => ({...p, "Kişilər üçün": !p["Kişilər üçün"]}))} /> Kişilər üçün
              </label>
            </>
          )}
        </div>
      </aside>

      {/* Main Container for Products Grid */}
      <main className="products-main" style={{ flex: 1, minWidth: 0 }}>
        
        {/* Dynamic Display of Active Filter 'Pills/Badges' */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {filters.isDiscounted && (
               <div style={{ padding: '0.4rem 1rem', border: '1px solid #E2E8F0', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748B' }}>
                Endirimdə <span onClick={() => setFilters(p => ({...p, isDiscounted: false}))} style={{ cursor: 'pointer', fontSize: '1rem', lineHeight: 1 }}>×</span>
              </div>
            )}
            {filters.isBestSeller && (
               <div style={{ padding: '0.4rem 1rem', border: '1px solid #E2E8F0', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748B' }}>
                Ən Çox Satılanlar <span onClick={() => setFilters(p => ({...p, isBestSeller: false}))} style={{ cursor: 'pointer', fontSize: '1rem', lineHeight: 1 }}>×</span>
              </div>
            )}
            {filters.isNew && (
               <div style={{ padding: '0.4rem 1rem', border: '1px solid #E2E8F0', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748B' }}>
                Ən Yeni <span onClick={() => setFilters(p => ({...p, isNew: false}))} style={{ cursor: 'pointer', fontSize: '1rem', lineHeight: 1 }}>×</span>
              </div>
            )}
            {Object.keys(cats).filter(k => cats[k]).map(cat => (
               <div key={cat} style={{ padding: '0.4rem 1rem', border: '1px solid #E2E8F0', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748B' }}>
                {cat} <span onClick={() => setCats(p => ({...p, [cat]: false}))} style={{ cursor: 'pointer', fontSize: '1rem', lineHeight: 1 }}>×</span>
              </div>
            ))}
            {Object.keys(audiences).filter(k => audiences[k]).map(aud => (
               <div key={aud} style={{ padding: '0.4rem 1rem', border: '1px solid #E2E8F0', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748B' }}>
                {aud} <span onClick={() => setAudiences(p => ({...p, [aud]: false}))} style={{ cursor: 'pointer', fontSize: '1rem', lineHeight: 1 }}>×</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0F172A', whiteSpace: 'nowrap' }}>
            {filteredProducts.length} Məhsul tapıldı
          </div>
        </div>

        {/* 
          Product Cards Grid 
          Responsive via 'auto-fill' template columns. 
        */}
        <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {filteredProducts.length > 0 ? filteredProducts.map(product => (
            
            <div key={product.id} className="product-card" style={{ background: '#FAFAFA', border: '1px solid #F1F5F9', boxShadow: 'none' }}>
              
              {/* Overlay button to toggle wishlist items */}
              <button className="wishlist-btn" onClick={() => handleToggleFav(product)} style={{ background: '#EBF3FE' }}>
                <Heart size={18} fill={isFav(product.id) ? "#1D71B8" : "none"} color="#1D71B8" />
              </button>
              
              {/* Product Visual Container */}
              <div className="product-image-container" style={{ background: '#FAFAFA' }}>
                <img src={product.image} alt={product.name} className="product-image" />
              </div>
              
              {/* Product Info Block */}
              <div className="product-info" style={{ borderTop: '2px dashed #E2E8F0', paddingTop: '1.5rem', paddingBottom: '0.5rem' }}>
                <div className="product-header" style={{ marginBottom: '0.2rem' }}>
                  <h3 className="product-name" style={{ fontSize: '1rem' }}>{product.name}</h3>
                  <div className="product-price">{product.price} AZN</div>
                </div>
                <p className="product-category" style={{ fontSize: '0.75rem', marginBottom: '1.5rem' }}>{t[product.catKey]}</p>
                
                {/* Store Action Button */}
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingBag size={18} />
                  Səbətə at
                </button>
              </div>

            </div>

          )) : (
            // Fallback empty state
            <div style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: '#64748B', fontWeight: 600 }}>
              Bu axtarış parametrlərinə uyğun məhsul tapılmadı.
            </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default Products;
