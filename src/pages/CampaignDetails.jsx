import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { dict } from '../translations';
import LiveTimer from '../components/LiveTimer';

const CampaignDetails = () => {
  const { id } = useParams();
  const lang = useSelector(state => state.lang.current);
  const t = dict[lang];

  return (
    <div className="campaign-details-page">
      <div className="breadcrumbs">
        <Link to="/campaigns" style={{ textDecoration: 'none', color: 'inherit' }}>{t.campaigns}</Link> / <span>Aksiya {id}</span>
      </div>
      
      <h1 className="campaign-details-title">Aksiya {id}: Vitamin Günləri 40% Endirim</h1>
      
      <img src="https://images.unsplash.com/photo-1577401239170-897942555fb3?w=1200&q=80" alt="Aksiya" className="campaign-details-banner" />
      
      <div className="campaign-details-meta">
        <div className="campaign-details-dates">2 Dekabr - 15 Dekabr</div>
        <div className="campaign-details-timer">
          <LiveTimer />
        </div>
      </div>
      
      <div className="campaign-details-text">
        Sağlamlığınız üçün lazımlı bütün qida əlavələrinə bu gün 40%-ə qədər endirim təklif olunur.
      </div>
      
      <ul className="campaign-checklist">
        <li>Lorem ipsum dolor sit amet consectetur, Divam dul eu sed adipicing ml mattis.</li>
        <li>Lorem ipsum dolor sit amet consectetur, Divam dul eu sed adipicing ml mattis.</li>
        <li>Lorem ipsum dolor sit amet consectetur, Divam dul eu sed adipicing ml mattis.</li>
        <li>Lorem ipsum dolor sit amet consectetur, Divam dul eu sed adipicing ml mattis.</li>
      </ul>
    </div>
  );
};

export default CampaignDetails;
