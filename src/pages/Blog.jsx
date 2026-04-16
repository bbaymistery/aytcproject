import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { dict } from '../translations';

export const blogPosts = [
  {
    id: 1,
    title: "Vitaminlər və Qida Əlavələri",
    desc: "Bədəninizə nə lazımdır, necə və niyə qəbul etməlisiniz, burada öyrənin!",
    date: "11.06.2024",
    readTime: "5-10 dəq oxuma",
    category: "Vitaminlər",
    image: "https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?w=700&q=80"
  },
  {
    id: 2,
    title: "Vitaminlər və Qida Əlavələri",
    desc: "Bədəninizə nə lazımdır, necə və niyə qəbul etməlisiniz, burada öyrənin!",
    date: "11.06.2024",
    readTime: "5-10 dəq oxuma",
    category: "Probiotiklər",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80"
  },
  {
    id: 3,
    title: "Vitaminlər və Qida Əlavələri",
    desc: "Bədəninizə nə lazımdır, necə və niyə qəbul etməlisiniz, burada öyrənin!",
    date: "11.06.2024",
    readTime: "5-10 dəq oxuma",
    category: "Minerallar",
    image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=700&q=80"
  },
  {
    id: 4,
    title: "Vitaminlər və Qida Əlavələri",
    desc: "Bədəninizə nə lazımdır, necə və niyə qəbul etməlisiniz, burada öyrənin!",
    date: "11.06.2024",
    readTime: "5-10 dəq oxuma",
    category: "Vitaminlər",
    image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=700&q=80"
  },
  {
    id: 5,
    title: "Vitaminlər və Qida Əlavələri",
    desc: "Bədəninizə nə lazımdır, necə və niyə qəbul etməlisiniz, burada öyrənin!",
    date: "11.06.2024",
    readTime: "5-10 dəq oxuma",
    category: "Probiotiklər",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=700&q=80"
  },
  {
    id: 6,
    title: "Vitaminlər və Qida Əlavələri",
    desc: "Bədəninizə nə lazımdır, necə və niyə qəbul etməlisiniz, burada öyrənin!",
    date: "11.06.2024",
    readTime: "5-10 dəq oxuma",
    category: "Minerallar",
    image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=700&q=80"
  },
  {
    id: 7,
    title: "Vitaminlər və Qida Əlavələri",
    desc: "Bədəninizə nə lazımdır, necə və niyə qəbul etməlisiniz, burada öyrənin!",
    date: "11.06.2024",
    readTime: "5-10 dəq oxuma",
    category: "Vitaminlər",
    image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=700&q=80"
  },
  {
    id: 8,
    title: "Vitaminlər və Qida Əlavələri",
    desc: "Bədəninizə nə lazımdır, necə və niyə qəbul etməlisiniz, burada öyrənin!",
    date: "11.05.2024",
    readTime: "5-10 dəq oxuma",
    category: "Probiotiklər",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=700&q=80"
  },
  {
    id: 9,
    title: "Vitaminlər və Qida Əlavələri",
    desc: "Bədəninizə nə lazımdır, necə və niyə qəbul etməlisiniz, burada öyrənin!",
    date: "11.05.2024",
    readTime: "5-10 dəq oxuma",
    category: "Minerallar",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=700&q=80"
  }
];

const CATEGORIES_AZ = ['Hamısı', 'Vitaminlər', 'Probiotiklər', 'Minerallar'];
const CATEGORIES_RU = ['Все', 'Витамины', 'Пробиотики', 'Минералы'];
const CAT_MAP = { 'Hamısı': null, 'Все': null, 'Vitaminlər': 'Vitaminlər', 'Витамины': 'Vitaminlər', 'Probiotiklər': 'Probiotiklər', 'Пробиотики': 'Probiotiklər', 'Minerallar': 'Minerallar', 'Минералы': 'Minerallar' };

const PAGE_SIZE = 9;

const Blog = () => {
  const lang = useSelector(state => state.lang.current);
  const t = dict[lang];
  const [category, setCategory] = useState(lang === 'az' ? 'Hamısı' : 'Все');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const cats = lang === 'az' ? CATEGORIES_AZ : CATEGORIES_RU;

  const filtered = blogPosts.filter(p => {
    const mapped = CAT_MAP[category];
    return !mapped || p.category === mapped;
  });

  const visible = filtered.slice(0, visibleCount);

  return (
    <>
      <div className="blog-page-header">
        <h1 className="blog-page-title">{lang === 'az' ? 'Faydalı Bloqlar' : 'Полезные блоги'}</h1>
        <div className="blog-category-filter">
          <select value={category} onChange={e => { setCategory(e.target.value); setVisibleCount(PAGE_SIZE); }}>
            {cats.map(c => <option key={c} value={c}>{c === 'Hamısı' || c === 'Все' ? (lang === 'az' ? 'Kateqoriya Filtr' : 'Фильтр') : c}</option>)}
          </select>
        </div>
      </div>

      <div className="blog-grid">
        {visible.map(post => (
          <div key={post.id} className="blog-card">
            <Link to={`/blog/${post.id}`}>
              <img src={post.image} alt={post.title} className="blog-card-img" />
            </Link>
            <div className="blog-card-body">
              <h3 className="blog-card-title">{post.title}</h3>
              <p className="blog-card-desc">{post.desc}</p>
              <div className="blog-card-footer">
                <span className="blog-card-meta">{post.date} • {post.readTime}</span>
                <Link to={`/blog/${post.id}`} className="blog-card-link">
                  {lang === 'az' ? 'Ətraflı bax' : 'Подробнее'}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < filtered.length && (
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button className="blog-load-more" onClick={() => setVisibleCount(c => c + PAGE_SIZE)}>
            {lang === 'az' ? 'Daha çox' : 'Показать ещё'}
          </button>
        </div>
      )}
    </>
  );
};

export default Blog;
