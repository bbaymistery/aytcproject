import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Phone, Mail } from 'lucide-react';
import { dict } from '../translations';

const Contact = () => {
  const lang = useSelector(state => state.lang.current);
  const t = dict[lang];

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="contact-page">
      <div className="contact-wrapper">
        {/* Left: Form */}
        <div className="contact-form-panel">
          <h1 className="contact-title">
            {lang === 'az' ? (
              <>Bizimlə <span style={{ color: '#1D71B8' }}>Əlaqə</span></>
            ) : (
              <>Свяжитесь <span style={{ color: '#1D71B8' }}>с нами</span></>
            )}
          </h1>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="contact-form-group">
              <label>{lang === 'az' ? 'Ad, soyad' : 'Имя, фамилия'}</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={lang === 'az' ? 'Ad və soyadınızı daxil edin' : 'Введите имя и фамилию'}
                className="contact-input"
                required
              />
            </div>

            <div className="contact-form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder={lang === 'az' ? 'Email adresinizi daxil edin' : 'Введите email адрес'}
                className="contact-input"
                required
              />
            </div>

            <div className="contact-form-group">
              <label>{lang === 'az' ? 'Mesaj' : 'Сообщение'}</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={lang === 'az' ? 'Mesajınızı daxil edin' : 'Введите ваше сообщение'}
                className="contact-textarea"
                rows={5}
                required
              />
            </div>

            {sent && (
              <div className="contact-success">
                ✓ {lang === 'az' ? 'Mesajınız göndərildi!' : 'Сообщение отправлено!'}
              </div>
            )}

            <button type="submit" className="contact-submit-btn">
              {lang === 'az' ? 'Bizimlə Əlaqə' : 'Связаться с нами'}
            </button>
          </form>

          <div className="contact-info-row">
            <div className="contact-info-block">
              <Phone size={18} color="#1D71B8" />
              <div>
                <p>994 70 700 70 70</p>
                <p>994 70 700 70 70</p>
              </div>
            </div>
            <div className="contact-info-block">
              <Mail size={18} color="#1D71B8" />
              <div>
                <p>goldenvit@gmail.com</p>
                <p>goldenvit@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Map */}
        <div className="contact-map-panel">
          <iframe
            title="Golden Vit Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.578509654506!2d49.83775631573616!3d40.40902837936546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d0a6f3db0a1%3A0x4e7f0a9a8e9e7c50!2sBaku!5e0!3m2!1sen!2saz!4v1613000000000!5m2!1sen!2saz"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '12px' }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
