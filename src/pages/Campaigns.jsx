import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import { dict } from '../translations';
import LiveTimer from '../components/LiveTimer';

const mockCampaigns = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  title: i % 2 === 0 ? `VITAMIN GÜNLƏRİ 40% ENDİRİM` : `ZÜLAL KOMPLEKSİ 20% ENDİRİM`,
  image: i % 2 === 0 
    ? "https://images.unsplash.com/photo-1577401239170-897942555fb3?w=800&q=80" 
    : "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&q=80",
  dateStr: "2 Dekabr - 15 Dekabr",
  desc: "Sağlamlığınız üçün lazımlı bütün qida əlavələrinə bu gün 40%-ə qədər endirim təklif olunur.",
}));

const Campaigns = () => {
  const lang = useSelector(state => state.lang.current);
  const t = dict[lang];
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = mockCampaigns.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>{t.campaigns}</h1>
        </div>
        
        <div className="search-box">
          <input 
            type="text" 
            placeholder={lang === 'az' ? 'Sizə maraqlı olan aksiyanı axtarın' : 'Поиск акций...'} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={18} />
        </div>
      </div>

      <div className="campaign-grid">
        {filtered.map(campaign => (
          <div key={campaign.id} className="campaign-card">
            <Link to={`/campaigns/${campaign.id}`}>
              <img src={campaign.image} alt={campaign.title} className="campaign-image" />
            </Link>
            <div className="campaign-content">
              <h3 className="campaign-card-title" style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#1E293B' }}>
                {campaign.title}
              </h3>
              <div className="campaign-dates">{campaign.dateStr}</div>
              <div className="campaign-desc">{campaign.desc}</div>
              <div className="campaign-footer">
                <div className="campaign-timer">
                  <LiveTimer />
                </div>
                <Link to={`/campaigns/${campaign.id}`} className="campaign-btn">
                  {lang === 'az' ? 'Ətraflı bax' : 'Подробнее'}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Campaigns;
