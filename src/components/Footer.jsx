import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { dict } from '../translations';
import Logo from './Logo';

const Footer = () => {
  const lang = useSelector(state => state.lang.current);
  const t = dict[lang];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo-section">
          <Logo />
          <p className="footer-tagline">
            {t.healthSolutions}
          </p>
        </div>
        
        <div className="footer-links">
          <h3>{t.navigation}</h3>
          <ul>
            <li><Link to="/">{t.home}</Link></li>
            <li><Link to="/products">{t.products}</Link></li>
            <li><Link to="/about">{t.about}</Link></li>
            <li><Link to="/blog">{t.blog}</Link></li>
            <li><Link to="/contact">{t.contact}</Link></li>
          </ul>
        </div>
        
        <div className="footer-contact">
          <h3>{t.contactUs}</h3>
          <div className="footer-contact-item">
            <Mail size={18} />
            <span>Email : goldenvit@gmail.com</span>
          </div>
          <div className="footer-contact-item">
            <Phone size={18} />
            <span>Əlaqə : +994 50 808 69 88</span>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Copyright | GoldenVit.com</p>
      </div>
    </footer>
  );
};

export default Footer;
