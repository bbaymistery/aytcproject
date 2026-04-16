import React from 'react';
import { useSelector } from 'react-redux';
import { dict } from '../translations';

const mockPosts = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  title: "Vitaminlər və Qida Əlavələri",
  desc: "Bədəninizə nə lazımdır, necə və niyə qəbul etməlisiniz, burada öyrənin!",
  image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=600&fit=crop&q=80"
}));

const Posts = () => {
  const lang = useSelector(state => state.lang.current);
  
  return (
    <div className="main-container" style={{ minHeight: 'auto' }}>
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <div className="page-title">
          <h1>{lang === 'az' ? 'Sosial Media Postları' : 'Посты в социальных сетях'}</h1>
        </div>
      </div>

      <div className="posts-grid">
        {mockPosts.map(post => (
          <div key={post.id} className="post-card">
            <img src={post.image} alt={post.title} className="post-image" />
            <h3 className="post-title">{post.title}</h3>
            <p className="post-desc">{post.desc}</p>
          </div>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
        <button style={{
          background: 'none', border: 'none',
          color: '#1E293B', fontWeight: '600',
          cursor: 'pointer', fontSize: '1rem'
        }}>
          {lang === 'az' ? 'Daha çox' : 'Показать еще'}
        </button>
      </div>
    </div>
  );
};

export default Posts;
