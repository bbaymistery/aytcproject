import React from 'react';
import { useSelector } from 'react-redux';
import { Shield, Truck, Headphones } from 'lucide-react';
import { dict } from '../translations';

const About = () => {
  const lang = useSelector(state => state.lang.current);

  const content = {
    az: {
      whoTitle: 'Biz Kimik?',
      whoParagraph: 'Golden Vit — sağlamlığına dəyər verən hər kəs üçün ən yüksək keyfiyyətli vitamin, mineral və qida əlavələrini təqdim edən etibarlı marka. Biz insan bədəninin ehtiyac duyduğu vacib maddələri elmi əsasla seçərək müştərilərimizə çatdırırıq. Hər bir məhsulumuz beynəlxalq standartlara uyğun sertifikasiyadan keçmişdir.',
      btnText: 'Bizimlə Qrupu',
      goalTitle: 'Məqsədimiz',
      goalParagraph: 'Əsas məqsədimiz hər bir müştəriyə sağlamlığını qorumaq və yaxşılaşdırmaq üçün lazım olan ən doğru məhsulları çatdırmaqdır. Biz inanırıq ki, düzgün qida əlavələri sağlam həyatın ayrılmaz hissəsidir. Buna görə də, daima məhsul keyfiyyətimizi yüksəltmək, müştəri məmnuniyyətini artırmaq və sağlamlıq sahəsindəki ən son innovasiyaları izləməkdən çəkinmirik. Hər bir addımımızda şəffaflıq, etibarlılıq və keyfiyyət anlayışını ön plana çıxarırıq.',
      servicesTitle: 'Xidmətlərimiz',
      services: [
        {
          icon: Shield,
          title: 'Keyfiyyətli Məhsul Seçimi',
          desc: 'Bədəninizə lazım olan ən yaxşı vitamin və əlavələri güvənilə seçin.'
        },
        {
          icon: Truck,
          title: 'Sürətli və Rahat Çatdırılma',
          desc: 'Evinizə qısa zamanda vitaminlər və qida əlavələri təhlükəsiz şəkildə gəlir.'
        },
        {
          icon: Headphones,
          title: 'Müştəri xidməti',
          desc: 'Məhsullarla bağlı istənilən sual üçün peşəkar komandamız sizə yardım göstərəcək.'
        }
      ]
    },
    ru: {
      whoTitle: 'Кто мы?',
      whoParagraph: 'Golden Vit — надёжный бренд, предлагающий витамины, минералы и пищевые добавки высочайшего качества для каждого, кто ценит своё здоровье. Мы научно подбираем все необходимые вещества и доставляем их нашим клиентам. Каждый наш продукт прошёл международную сертификацию.',
      btnText: 'Наша команда',
      goalTitle: 'Наша цель',
      goalParagraph: 'Наша главная цель — предоставлять каждому клиенту самые подходящие продукты для поддержания и улучшения здоровья. Мы верим, что правильные пищевые добавки — неотъемлемая часть здоровой жизни. Поэтому мы постоянно повышаем качество нашей продукции, улучшаем удовлетворённость клиентов и следим за последними инновациями в области здравоохранения.',
      servicesTitle: 'Наши услуги',
      services: [
        {
          icon: Shield,
          title: 'Выбор качественных продуктов',
          desc: 'Надёжно выберите лучшие витамины и добавки, необходимые вашему организму.'
        },
        {
          icon: Truck,
          title: 'Быстрая и удобная доставка',
          desc: 'Витамины и пищевые добавки доставляются к вам домой в короткие сроки и безопасно.'
        },
        {
          icon: Headphones,
          title: 'Клиентский сервис',
          desc: 'Наша профессиональная команда готова ответить на любые вопросы о продуктах.'
        }
      ]
    }
  };

  const c = content[lang];

  return (
    <div className="about-page">

      {/* Section 1: Biz Kimik */}
      <section className="about-who-section">
        <div className="about-who-text">
          <h1 className="about-section-heading">{c.whoTitle}</h1>
          <p className="about-paragraph">{c.whoParagraph}</p>
          <button className="about-team-btn">{c.btnText}</button>
        </div>
        <div className="about-who-image">
          <img
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80"
            alt="Golden Vit Products"
          />
        </div>
      </section>

      {/* Section 2: Məqsədimiz */}
      <section className="about-goal-section">
        <h2 className="about-section-heading">{c.goalTitle}</h2>
        <p className="about-paragraph">{c.goalParagraph}</p>
      </section>

      {/* Section 3: Xidmətlərimiz */}
      <section className="about-services-section">
        <h2 className="about-section-heading">{c.servicesTitle}</h2>
        <div className="about-services-grid">
          {c.services.map((s, i) => (
            <div key={i} className="about-service-card">
              <div className="about-service-icon">
                <s.icon size={32} color="#B7750D" strokeWidth={1.8} />
              </div>
              <h3 className="about-service-title">{s.title}</h3>
              <p className="about-service-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
