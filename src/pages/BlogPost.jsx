import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { blogPosts } from './Blog';

const BlogPost = () => {
  const { id } = useParams();
  const lang = useSelector(state => state.lang.current);
  const post = blogPosts.find(p => p.id === parseInt(id)) || blogPosts[0];
  const related = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div className="blog-post-page">
      {/* Breadcrumb */}
      <div className="blog-post-breadcrumb">
        <Link to="/blog">{lang === 'az' ? 'Bloq' : 'Блог'}</Link> /
        <span>{lang === 'az' ? 'Sağlamlıq Yoldaşınız' : 'Ваш помощник по здоровью'}</span>
      </div>

      <h2 className="blog-post-page-title">
        {lang === 'az' ? 'Sağlamlıq Yoldaşınız: Qida Əlavələrinin Əhəmiyyəti' : 'Ваш помощник по здоровью: Важность пищевых добавок'}
      </h2>

      {/* Hero image */}
      <img src={post.image} alt={post.title} className="blog-post-hero" />

      <div className="blog-post-date">{post.date.replace(/\./g, ' ') || '14 Mart 2024'}</div>

      <h1 className="blog-post-title">
        {lang === 'az' ? 'Sağlam həyat, doğru əlavələrdən başlayır' : 'Здоровая жизнь начинается с правильных добавок'}
      </h1>

      <div className="blog-post-content">
        <p>
          {lang === 'az'
            ? 'Qida əlavələri, gündəlik qida verdiyimizə tamamlamamış və bədənimizin ehtiyac duyduğu vacib qida maddələrini təmin etmək üçün mükəmməl bir vasitədir. Bu əlavələr, vitaminlər, minerallar və digər qida maddələrini bədənə təmin edərək ümumi sağlamlığı dəstəkləyir. Bədənimizin düzgün işləməsi üçün lazım olan bu qida maddələrini almaq, bəzi hallarda yalnız qida ilə təmin olunmaya bilər. Buna görə də qida əlavələri, bədəni ehtiyaclarını qarşılamada və sağlamlığını qorumada böyük rol oynayır.'
            : 'Пищевые добавки являются отличным средством для восполнения нашего ежедневного рациона и обеспечения организма важными питательными веществами. Эти добавки поддерживают общее здоровье, снабжая организм витаминами, минералами и другими питательными веществами.'}
        </p>
        <p>
          {lang === 'az'
            ? 'Həmçinin, qida əlavələri sağlamlığa vəziyyətlərini yaxşılaşdırmaq və zəif olan sahələri gücləndirmək üçün əhəmiyyətli rol oynayır. Məsələn, əgər bədəndə müəyyən bir vitamin ya mineral çatışmazlığı varsa, bu əlavələr onun yerini dolduraraq müvafiq sağlamlıq problemlərinin qarşısını ala və daha balans bir həyat təmin edib.'
            : 'Также пищевые добавки играют важную роль в улучшении состояния здоровья и укреплении слабых мест. Например, если в организме не хватает определённого витамина или минерала, эти добавки могут восполнить его дефицит.'}
        </p>

        <blockquote className="blog-post-quote">
          <p>"{lang === 'az' ? 'Sağlamlıq, bədənin ən qiymətli sərvətidir; onu qorumaq üçün kiçik addımlar böyük dəyişikliklərə yol açar.' : 'Здоровье — самое ценное богатство тела; небольшие шаги для его защиты ведут к большим переменам.'}"</p>
          <cite>— Ralph Waldo Emerson</cite>
        </blockquote>

        <h2>{lang === 'az' ? 'Hansı Qida Əlavələri Size Uyğundur?' : 'Какие пищевые добавки подходят именно вам?'}</h2>
        <p>
          {lang === 'az'
            ? 'Fərdi yaş qrupları və sağlamlıq vəziyyətinizə görə, doğru qida əlavələrini seçmək çox vacibdir. Məsələn, yaşlanma prosesi ilə bağlı yaranan çatışmazlıqlar əlavələr və ya stresslə mübarizə üçün hansı tipli əlavələr müvafiqdir. Hər kəsin bədənində fərqli ehtiyaclar olduğu üçün, doğru əlavələri seçmək asan həyat tərfzinizi sağlamlığını qorumağa töhfə edə bilər. Buna görə, ən uyğun əlavənin seçilməsi üçün bir mütəxəssisə müraciət etmək məsləhətdir.'
            : 'В зависимости от возрастных групп и состояния здоровья выбор правильных пищевых добавок очень важен. У каждого человека разные потребности, поэтому правильный выбор добавок может способствовать поддержанию здоровья.'}
        </p>

        <h2>{lang === 'az' ? 'Sağlam Həyat Tərzi Üçün Qida Əlavələrindən Necə İstifadə Etməliyik?' : 'Как правильно использовать пищевые добавки для здорового образа жизни?'}</h2>
        <p>
          {lang === 'az'
            ? 'Qida əlavələrini düzgün şəkildə istifadə etmək çox önəmlidir. Mütəxəssislər tərəfindən tövsiyə olunan dozalara və bədənə uyğun şəkildə istifadə olunduğu, bu əlavələr sağlamlığınızı artıracaq, Qida əlavələrini faydalarda istifadə etmək isə nəticədə daha sağlam bir həyatın yolunu açır. Bununla belə, bədəni doğru zaman zamanlarda və ya dozalarda qəbul olunan əlavələrin bədəni doğrulamaq üçün istifadə olunan əlavələrin sağlığınızı qorumaq mümkündür.'
            : 'Правильное использование пищевых добавок очень важно. При соблюдении рекомендованных специалистами доз и с учётом потребностей организма, эти добавки улучшат ваше здоровье и откроют путь к более здоровой жизни.'}
        </p>
      </div>

      {/* Related posts */}
      <div className="blog-related-section">
        <div className="blog-related-header">
          <h3>{lang === 'az' ? 'Oxşar Bloqlar' : 'Похожие статьи'}</h3>
          <Link to="/blog" className="blog-related-all">
            {lang === 'az' ? 'Ətraflı bax →' : 'Смотреть все →'}
          </Link>
        </div>
        <div className="blog-related-grid">
          {related.map(p => (
            <div key={p.id} className="blog-related-card">
              <Link to={`/blog/${p.id}`}>
                <img src={p.image} alt={p.title} className="blog-related-img" />
              </Link>
              <h4 className="blog-related-title">{p.title}</h4>
              <p className="blog-related-desc">{p.desc}</p>
              <div className="blog-related-footer">
                <span className="blog-card-meta">{p.date} • {p.readTime}</span>
                <Link to={`/blog/${p.id}`} className="blog-card-link">{lang === 'az' ? 'Ətraflı bax' : 'Подробнее'}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
