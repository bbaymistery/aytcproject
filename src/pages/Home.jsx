import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { dict } from '../translations';

const Home = () => {
  const lang = useSelector(state => state.lang.current);
  const t = dict[lang];
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: t.slider1Title,
      desc: t.slider1Desc,
      bg: '#ebf4ff',
    },
    {
      title: t.slider2Title,
      desc: t.slider2Desc,
      bg: '#f0fdf4',
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div>
      <div style={{
        backgroundColor: slides[currentSlide].bg,
        padding: '5rem 2rem',
        textAlign: 'center',
        borderRadius: '12px',
        marginBottom: '2rem',
        transition: 'background-color 0.5s ease',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1E293B' }}>{slides[currentSlide].title}</h1>
        <p style={{ fontSize: '1.2rem', color: '#64748B' }}>{slides[currentSlide].desc}</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2.5rem' }}>
          {slides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentSlide(i)}
              style={{
                width: '12px', height: '12px', borderRadius: '50%', border: 'none',
                backgroundColor: i === currentSlide ? '#1D71B8' : '#cbd5e1',
                cursor: 'pointer', transition: 'background-color 0.3s'
              }}
            />
          ))}
        </div>
      </div>
      
      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
        <h2>{t.home}</h2>
        <p style={{ marginTop: '1rem', color: '#64748B' }}>{t.welcome}</p>
      </div>
    </div>
  );
};

export default Home;
