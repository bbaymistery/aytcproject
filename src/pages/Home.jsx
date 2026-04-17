import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  ShoppingCart, Heart, ChevronLeft, ChevronRight,
  Shield, Truck, Headphones, ArrowRight
} from 'lucide-react';
import { dict } from '../translations';
import { productsData } from '../data/products';
import { addToCart } from '../features/cartSlice';
import { toggleFavorite } from '../features/favoritesSlice';

/* ── static data ── */
const HERO_SLIDES = [
  {
    titleAz: 'Sağlamlıq üçün',
    titleRu: 'Для здоровья',
    highlightAz: 'Qlobal',
    highlightRu: 'Глобальные',
    afterHighlightAz: ' Həllər',
    afterHighlightRu: ' решения',
    descAz: '',
    descRu: '',
    btnAz: 'Alış-verişə Başla',
    btnRu: 'Начать покупки',
    img1: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?w=280&q=80',
    img2: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=280&q=80',
    bg: "linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url('https://images.unsplash.com/photo-1517231426118-2e06180182ce?w=1600&q=80') center/cover no-repeat",
  },
  {
    titleAz: 'Xüsusi',
    titleRu: 'Специальные',
    highlightAz: 'Endirimlər',
    highlightRu: 'Скидки',
    afterHighlightAz: ' sizin üçün',
    afterHighlightRu: ' для вас',
    descAz: 'Seçilmiş məhsullarda 20% endirim',
    descRu: 'Скидка 20% на избранные товары',
    btnAz: 'İndi Bax',
    btnRu: 'Смотреть',
    img1: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=280&q=80',
    img2: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=280&q=80',
    bg: '#eef4ff',
  },
];

const BLOG_POSTS = [
  {
    id: 1,
    titleAz: 'Vitaminlər və Qida Əlavələri',
    titleRu: 'Витамины и пищевые добавки',
    descAz: 'Bədəninizə lazımlı nece və niyə qəbul etməlisiniz, burada öyrənin',
    descRu: 'Узнайте, как и почему вам нужны витамины',
    date: '10.6.2024',
    readAz: '6-10 dəq oxuma',
    readRu: '6-10 мин чтения',
    image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=400&q=80',
  },
  {
    id: 2,
    titleAz: 'Vitaminlər və Qida Əlavələri',
    titleRu: 'Витамины и пищевые добавки',
    descAz: 'Bədəninizə lazımlı nece və niyə qəbul etməlisiniz, burada öyrənin',
    descRu: 'Узнайте, как и почему вам нужны витамины',
    date: '11.6.2024',
    readAz: '6-10 dəq oxuma',
    readRu: '6-10 мин чтения',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&q=80',
  },
  {
    id: 3,
    titleAz: 'Vitaminlər və Qida Əlavələri',
    titleRu: 'Витамины и пищевые добавки',
    descAz: 'Bədəninizə lazımlı nece və niyə qəbul etməlisiniz, burada öyrənin',
    descRu: 'Узнайте, как и почему вам нужны витамины',
    date: '1.6.2024',
    readAz: '6-10 dəq oxuma',
    readRu: '6-10 мин чтения',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
  },
];

const TESTIMONIALS = [
  {
    text: 'Golden Vit-in məhsulları həqiqətən keyfiyyətlidir. Omega 3 qəbul etdikdən sonra özümü çox yaxşı hiss edirəm.',
    name: 'Ayaz Əliyev',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&q=80',
  },
  {
    text: 'Brain Memory məhsulunu dostum məsləhət gördü. Çatdırılma sürətli idi, məhsul orijinal çıxdı. Tövsiyə edirəm!',
    name: 'Leyla Hüseynova',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&q=80',
  },
  {
    text: 'Zinc + D3 vitamini qış dövründə immunitetimi gücləndirir. Keyfiyyətinə tam əminəm.',
    name: 'Murad Rəsulов',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&q=80',
  },
];

const ITEMS_PER_SLIDE = 4;

export default function Home() {
  const dispatch = useDispatch();
  const lang = useSelector(s => s.lang.current);
  const favorites = useSelector(s => s.favorites.items);
  const t = dict[lang];

  const [heroIdx, setHeroIdx] = useState(0);
  const [prodIdx, setProdIdx] = useState(0);
  const [activeCat, setActiveCat] = useState('all');
  const [testiIdx, setTestiIdx] = useState(0);

  /* auto hero */
  useEffect(() => {
    const id = setInterval(() => setHeroIdx(p => (p + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  /* auto testimonials */
  useEffect(() => {
    const id = setInterval(() => setTestiIdx(p => (p + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(id);
  }, []);

  const isFav = id => favorites.some(f => f.id === id);
  const hero = HERO_SLIDES[heroIdx];

  /* filtered products for bestseller slider */
  const filteredProds = activeCat === 'all'
    ? productsData
    : productsData.filter(p => p.catKey === activeCat);

  const maxSlide = Math.max(0, Math.ceil(filteredProds.length / ITEMS_PER_SLIDE) - 1);
  const safeProdIdx = Math.min(prodIdx, maxSlide);
  const visibleProds = filteredProds.slice(safeProdIdx * ITEMS_PER_SLIDE, safeProdIdx * ITEMS_PER_SLIDE + ITEMS_PER_SLIDE);

  /* category pills */
  const catTabs = [
    { key: 'all', label: t.allCategories },
    { key: 'cat1', label: t.cat1 },
    { key: 'cat2', label: t.cat2 },
    { key: 'cat3', label: t.cat3 },
    { key: 'cat4', label: t.cat4 },
    { key: 'cat5', label: t.cat5 },
    { key: 'cat6', label: t.cat6 },
  ];

  /* unique categories for circle section */
  const circleCategories = [
    { key: 'cat1', label: t.cat1, img: productsData.find(p => p.catKey === 'cat1')?.image },
    { key: 'cat6', label: t.cat6, img: productsData.find(p => p.catKey === 'cat6')?.image },
    { key: 'cat2', label: t.cat2, img: productsData.find(p => p.catKey === 'cat2')?.image },
    { key: 'cat3', label: t.cat3, img: productsData.find(p => p.catKey === 'cat3')?.image },
    { key: 'cat2', label: t.cat2, img: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=200&q=80' },
    { key: 'cat4', label: t.cat4, img: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=200&q=80' },
    { key: 'cat6', label: t.cat6, img: 'https://images.unsplash.com/photo-1631815585533-20f5d27ab9c4?w=200&q=80' },
  ];

  const ProductCard = ({ product }) => (
    <div className="home-product-card">
      <button
        className={`home-fav-btn ${isFav(product.id) ? 'active' : ''}`}
        onClick={() => dispatch(toggleFavorite(product))}
      >
        <Heart size={16} fill={isFav(product.id) ? '#ef4444' : 'none'} color={isFav(product.id) ? '#ef4444' : '#94a3b8'} />
      </button>
      <div className="home-prod-img">
        <img src={product.image} alt={product.name} onError={e => { e.target.src = 'https://placehold.co/200x200?text=' + product.name; }} />
      </div>
      <div className="home-prod-info">
        <p className="home-prod-name">{product.name}</p>
        <p className="home-prod-cat">{t[product.catKey]}</p>
        <p className="home-prod-price">{product.price} AZN</p>
      </div>
      <button className="home-add-btn" onClick={() => dispatch(addToCart(product))}>
        <ShoppingCart size={14} /> {t.addToCart}
      </button>
    </div>
  );

  return (
    <div className="home-wrap">

      {/* ══ 1. HERO ══ */}
      <section className="home-hero" style={{ background: hero.bg }}>
        <div className="home-hero-content">
          <div className="home-hero-text">
            <h1>
              {lang === 'az' ? hero.titleAz : hero.titleRu}{' '}
              <br />
              <span className="home-hero-highlight">{lang === 'az' ? hero.highlightAz : hero.highlightRu}</span>
              <span className="home-hero-text-bottom-line">
                {lang === 'az' ? hero.afterHighlightAz : hero.afterHighlightRu}
              </span>
            </h1>
            {(lang === 'az' ? hero.descAz : hero.descRu) && (
              <p>{lang === 'az' ? hero.descAz : hero.descRu}</p>
            )}
            <Link to="/products" className="home-hero-btn">
              {lang === 'az' ? hero.btnAz : hero.btnRu}
              <ArrowRight size={15} />
            </Link>
          </div>
          <div className="home-hero-imgs">
            <img className="hero-img-back" src={hero.img1} alt="p1" />
            <img className="hero-img-front" src={hero.img2} alt="p2" />
          </div>
        </div>
        <div className="home-dots">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} className={`home-dot ${i === heroIdx ? 'on' : ''}`} onClick={() => setHeroIdx(i)} />
          ))}
        </div>
      </section>

      {/* PILLS REMOVED */}

      {/* ══ 3. KATEQORIYALAR (circles) ══ */}
      <section className="home-section">
        <h2 className="home-sec-title">{lang === 'az' ? 'Kateqoriyalar' : 'Категории'}</h2>
        <div className="home-cats-row">
          {circleCategories.map((cat, i) => (
            <button
              key={i}
              className="home-cat-circle"
              onClick={() => { setActiveCat(cat.key); setProdIdx(0); window.scrollTo({ top: 280, behavior: 'smooth' }); }}
            >
              <div className="home-cat-circle-img">
                <img src={cat.img} alt={cat.label} onError={e => { e.target.src = 'https://placehold.co/80x80?text=+'; }} />
              </div>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ══ 4. ƏN ÇOX SATILANLAR ══ */}
      <section className="home-bestsellers">
        <div className="home-bs-inner">
          <h2 className="home-sec-title">{lang === 'az' ? 'Ən Çox Satılanlar' : 'Лидеры продаж'}</h2>
          <div className="home-bs-track">
            <button
              className="home-bs-arrow"
              disabled={safeProdIdx === 0}
              onClick={() => setProdIdx(p => Math.max(0, p - 1))}
            >
              <ChevronLeft size={20} />
            </button>
            <div className="home-bs-cards">
              {visibleProds.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <button
              className="home-bs-arrow"
              disabled={safeProdIdx >= maxSlide}
              onClick={() => setProdIdx(p => Math.min(maxSlide, p + 1))}
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="home-dots">
            {Array.from({ length: maxSlide + 1 }).map((_, i) => (
              <button key={i} className={`home-dot ${i === safeProdIdx ? 'on' : ''}`} onClick={() => setProdIdx(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. MƏHSULLAR grid ══ */}
      <section className="home-section">
        <h2 className="home-sec-title">{t.products}</h2>
        <div className="home-products-grid">
          {productsData.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <div style={{ textAlign: 'right', marginTop: '1.25rem' }}>
          <Link to="/products" className="home-view-all">
            {lang === 'az' ? 'Ətraflı bax' : 'Смотреть все'} <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ══ 6. PROMO BANNERS ══ */}
      <section className="home-section home-promo-section">
        <div className="home-promo-grid">
          {/* top-left: text */}
          <div className="home-promo-card home-promo-yellow">
            <div className="home-promo-badge">20%</div>
            <h3>{lang === 'az' ? 'Enerjinizi artırın, özünüzü daha yaxşı hiss edin!' : 'Повысьте энергию, чувствуйте себя лучше!'}</h3>
            <p>{lang === 'az' ? 'Gün boyu gümrah qalmaq üçün təbii qida əlavələri ilə tanış olun.' : 'Познакомьтесь с натуральными добавками.'}</p>
            <Link to="/products" className="home-promo-btn">
              {lang === 'az' ? 'Məhsullara bax' : 'Смотреть'} <ArrowRight size={13} />
            </Link>
          </div>
          {/* top-right: image */}
          <div className="home-promo-card home-promo-img-card">
            <img src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=80" alt="energy woman" />
          </div>
          {/* bottom-left: image */}
          <div className="home-promo-card home-promo-img-card">
            <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80" alt="healthy food" />
          </div>
          {/* bottom-right: text */}
          <div className="home-promo-card home-promo-blue">
            <h3>{lang === 'az' ? 'Sağlam çəkiyə doğru addım atın!' : 'Сделайте шаг к здоровому весу!'}</h3>
            <p>{lang === 'az' ? 'Ən yaxşı qida əlavələri ilə balanseli qidaların və ideal formanıza çatın.' : 'Достигните идеальной формы с лучшими добавками.'}</p>
            <Link to="/products" className="home-promo-btn">
              {lang === 'az' ? 'Məhsullara bax' : 'Смотреть'} <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 7. XİDMƏTLƏRİMİZ ══ */}
      <section className="home-section">
        <h2 className="home-sec-title">{lang === 'az' ? 'Xidmətlərimiz' : 'Наши услуги'}</h2>
        <div className="home-services-row">
          {[
            {
              Icon: Shield,
              titleAz: 'Keyfiyyətli Məhsul Seçimi',
              titleRu: 'Качественный выбор товаров',
              descAz: 'Bədəninizə uyğun qida əlavələri seçin və sağlamlığınızı gücləndirin.',
              descRu: 'Выбирайте подходящие добавки для вашего организма.',
            },
            {
              Icon: Truck,
              titleAz: 'Sürətli və Rahat Çatdırılma',
              titleRu: 'Быстрая и удобная доставка',
              descAz: 'Vitamininiz istənilən yerə sürətli və təhlükəsiz şəkildə çatdırılır.',
              descRu: 'Ваши витамины доставляются быстро и безопасно.',
            },
            {
              Icon: Headphones,
              titleAz: 'Müştəri xidməti',
              titleRu: 'Служба поддержки',
              descAz: 'Məhsullarla bağlı istənilən suala vaxtında cavab veririk.',
              descRu: 'Ответим на любой вопрос в кратчайшие сроки.',
            },
          ].map(({ Icon, titleAz, titleRu, descAz, descRu }, i) => (
            <div key={i} className="home-service-card">
              <div className="home-service-icon">
                <Icon size={26} color="#1D71B8" />
              </div>
              <h4>{lang === 'az' ? titleAz : titleRu}</h4>
              <p>{lang === 'az' ? descAz : descRu}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 8. FAYDALI BLOQLAR ══ */}
      <section className="home-section">
        <h2 className="home-sec-title">{lang === 'az' ? 'Faydalı Bloqlar' : 'Полезные блоги'}</h2>
        <div className="home-blogs-grid">
          {BLOG_POSTS.map(post => (
            <Link to={`/bloq/${post.id}`} key={post.id} className="home-blog-card">
              <div className="home-blog-img">
                <img src={post.image} alt={lang === 'az' ? post.titleAz : post.titleRu} />
                {post.avatar && (
                  <div className="home-blog-avatar">
                    <img src={post.avatar} alt="author" />
                  </div>
                )}
              </div>
              <div className="home-blog-body">
                <h4>{lang === 'az' ? post.titleAz : post.titleRu}</h4>
                <p>{lang === 'az' ? post.descAz : post.descRu}</p>
                <div className="home-blog-meta">
                  <span>{post.date} · {lang === 'az' ? post.readAz : post.readRu}</span>
                  <span className="home-blog-link">{lang === 'az' ? 'ətraflı bax' : 'подробнее'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ 9. MÜŞTƏRİLƏRDƏN GƏLƏNLƏR ══ */}
      <section className="home-section home-testimonials">
        <h2 className="home-sec-title">{lang === 'az' ? 'Müştərilərdən Gələnlər' : 'Отзывы клиентов'}</h2>
        <div className="home-testi-slider">
          <div
            className="home-testi-track"
            style={{ transform: `translateX(-${testiIdx * 100}%)` }}
          >
            {TESTIMONIALS.map((item, i) => (
              <div key={i} className="home-testi-slide">
                <div className="home-testi-card">
                  <div className="home-testi-quote">"</div>
                  <p>{item.text}</p>
                  <div className="home-testi-author">
                    <img src={item.avatar} alt={item.name} />
                    <span>{item.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="home-dots" style={{ marginTop: '1.5rem' }}>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`home-dot ${i === testiIdx ? 'on' : ''}`}
              onClick={() => setTestiIdx(i)}
            />
          ))}
        </div>
      </section>

    </div>
  );
}
