import { useEffect, useRef, useState, type ReactNode } from 'react';

// ─── Language Content ────────────────────────────────────────────────────────

const t: Record<string, Record<string, string>> = {
  nav_home:       { tr: 'Ana Sayfa',    en: 'Home',        ru: 'Главная',    ar: 'الرئيسية' },
  nav_about:      { tr: 'Hakkımızda',  en: 'About',       ru: 'О нас',      ar: 'عنا' },
  nav_services:   { tr: 'Hizmetler',   en: 'Services',    ru: 'Услуги',     ar: 'الخدمات' },
  nav_pricing:    { tr: 'Fiyatlar',    en: 'Pricing',     ru: 'Цены',       ar: 'الأسعار' },
  nav_portfolio:  { tr: 'Portfolyo',   en: 'Portfolio',   ru: 'Портфолио',  ar: 'أعمالنا' },
  nav_contact:    { tr: 'İletişim',    en: 'Contact',     ru: 'Контакты',   ar: 'اتصل بنا' },
  hero_badge:     { tr: "Kıbrıs'ın Dijital Güç Merkezi", en: "Cyprus's Digital Powerhouse", ru: "Цифровой центр Кипра", ar: "مركز القوة الرقمية في قبرص" },
  hero_h1a:       { tr: 'Markanızı', en: 'Grow Your', ru: 'Развивайте', ar: 'انمِّ علامتك' },
  hero_h1b:       { tr: 'Dijital Dünyada', en: 'Brand Online', ru: 'Бренд Онлайн', ar: 'التجارية رقميًا' },
  hero_h1c:       { tr: 'Büyütelim', en: 'With Us', ru: 'С Нами', ar: 'معنا' },
  hero_sub:       { tr: 'Sosyal medya yönetimi, SEO, Google Ads ve web tasarım hizmetleriyle markanızı bir sonraki seviyeye taşıyoruz.', en: 'We elevate your brand with social media management, SEO, Google Ads, and web design services.', ru: 'Мы продвигаем ваш бренд через социальные сети, SEO, Google Ads и веб-дизайн.', ar: 'نرفع مستوى علامتك التجارية من خلال إدارة وسائل التواصل الاجتماعي وتحسين محركات البحث والإعلانات.' },
  hero_cta1:      { tr: 'Ücretsiz Teklif Al', en: 'Get Free Quote', ru: 'Получить предложение', ar: 'احصل على عرض مجاني' },
  hero_cta2:      { tr: 'Hizmetleri İncele', en: 'View Services', ru: 'Просмотр услуг', ar: 'عرض الخدمات' },
  trusted_title:  { tr: 'Güvenilen Dijital Pazarlama Ortağı', en: 'Trusted Digital Marketing Partner', ru: 'Надёжный партнёр по цифровому маркетингу', ar: 'شريك التسويق الرقمي الموثوق' },
  about_tag:      { tr: 'HAKKIMIZDA', en: 'ABOUT US', ru: 'О НАС', ar: 'عنا' },
  about_h2:       { tr: 'İşletmenizi Dijital Dünyada Güçlendirmek İçin Buradayız', en: "We're Here to Power Your Business in the Digital World", ru: 'Мы здесь, чтобы укрепить ваш бизнес', ar: 'نحن هنا لتعزيز أعمالك في العالم الرقمي' },
  about_p1:       { tr: "CySocial, Kuzey Kıbrıs'taki işletmelere sosyal medya yönetimi, SEO, Google Ads ve web tasarım alanlarında profesyonel çözümler sunan modern bir dijital pazarlama ajansıdır.", en: 'CySocial is a modern digital marketing agency offering professional solutions in social media management, SEO, Google Ads, and web design to businesses in North Cyprus.', ru: 'CySocial — современное агентство цифрового маркетинга, предлагающее профессиональные решения.', ar: 'CySocial وكالة تسويق رقمي حديثة تقدم حلولاً احترافية.' },
  about_p2:       { tr: 'Stratejik planlama, yaratıcı içerikler ve performans odaklı kampanyalar sayesinde markanızın dijital ortamda sürdürülebilir şekilde büyümesini sağlıyoruz.', en: 'Through strategic planning, creative content, and performance-driven campaigns, we ensure sustainable growth for your brand in the digital space.', ru: 'С помощью стратегического планирования и творческих кампаний мы обеспечиваем рост вашего бренда.', ar: 'من خلال التخطيط الاستراتيجي والمحتوى الإبداعي نضمن نمو علامتك التجارية.' },
  services_tag:   { tr: 'HİZMETLERİMİZ', en: 'OUR SERVICES', ru: 'НАШИ УСЛУГИ', ar: 'خدماتنا' },
  services_h2:    { tr: 'Dijital Başarı İçin İhtiyacınız Olan Her Şey', en: 'Everything You Need for Digital Success', ru: 'Всё для цифрового успеха', ar: 'كل ما تحتاجه للنجاح الرقمي' },
  why_tag:        { tr: 'NEDEN CYSOCIAL?', en: 'WHY CYSOCIAL?', ru: 'ПОЧЕМУ CYSOCIAL?', ar: 'لماذا CySocial؟' },
  why_h2:         { tr: 'Sizi Rakiplerinizden Bir Adım Öne Taşıyoruz', en: 'We Put You One Step Ahead of Your Competitors', ru: 'Мы выводим вас на шаг впереди конкурентов', ar: 'نضعك خطوة أمام منافسيك' },
  process_tag:    { tr: 'NASIL ÇALIŞIYORUZ?', en: 'HOW WE WORK', ru: 'КАК МЫ РАБОТАЕМ', ar: 'كيف نعمل' },
  process_h2:     { tr: 'Başarıya Giden Yolumuz', en: 'Our Path to Success', ru: 'Наш путь к успеху', ar: 'طريقنا نحو النجاح' },
  pricing_tag:    { tr: 'FİYATLAR', en: 'PRICING', ru: 'ЦЕНЫ', ar: 'الأسعار' },
  pricing_h2:     { tr: 'İşletmenize Özel Paketler', en: 'Packages Tailored for Your Business', ru: 'Пакеты для вашего бизнеса', ar: 'باقات مصممة لعملك' },
  portfolio_tag:  { tr: 'PORTFOLYO', en: 'PORTFOLIO', ru: 'ПОРТФОЛИО', ar: 'أعمالنا' },
  portfolio_h2:   { tr: 'Son Çalışmalarımız', en: 'Our Recent Work', ru: 'Наши работы', ar: 'أعمالنا الأخيرة' },
  team_tag:       { tr: 'EKİBİMİZ', en: 'OUR TEAM', ru: 'НАША КОМАНДА', ar: 'فريقنا' },
  team_h2:        { tr: 'Uzmanlarımızla Tanışın', en: 'Meet Our Experts', ru: 'Познакомьтесь с нашими экспертами', ar: 'تعرف على خبرائنا' },
  testimonials_tag: { tr: 'MÜŞTERİ YORUMLARI', en: 'TESTIMONIALS', ru: 'ОТЗЫВЫ', ar: 'آراء العملاء' },
  testimonials_h2:  { tr: 'Müşterilerimiz Ne Söylüyor?', en: 'What Our Clients Say', ru: 'Что говорят наши клиенты', ar: 'ماذا يقول عملاؤنا' },
  faq_tag:        { tr: 'SIKÇA SORULAN SORULAR', en: 'FAQ', ru: 'ВОПРОСЫ И ОТВЕТЫ', ar: 'الأسئلة الشائعة' },
  faq_h2:         { tr: 'Merak Ettikleriniz', en: 'Frequently Asked Questions', ru: 'Часто задаваемые вопросы', ar: 'الأسئلة المتكررة' },
  contact_tag:    { tr: 'İLETİŞİM', en: 'CONTACT', ru: 'КОНТАКТЫ', ar: 'اتصل بنا' },
  contact_h2:     { tr: 'Projenizi Birlikte Hayata Geçirelim', en: "Let's Bring Your Project to Life", ru: 'Давайте воплотим ваш проект', ar: 'لنحوّل مشروعك إلى واقع' },
  newsletter_h2:  { tr: 'Dijital Pazarlama İpuçları', en: 'Digital Marketing Tips', ru: 'Советы по цифровому маркетингу', ar: 'نصائح التسويق الرقمي' },
  newsletter_p:   { tr: 'Haftalık ipuçları ve sektör haberlerini kaçırma!', en: "Don't miss weekly tips and industry news!", ru: 'Не пропустите еженедельные советы!', ar: 'لا تفوت النصائح الأسبوعية!' },
  newsletter_btn: { tr: 'Abone Ol', en: 'Subscribe', ru: 'Подписаться', ar: 'اشترك' },
};

// ─── Type helper ──────────────────────────────────────────────────────────────
type LM = Record<string, string>;

// ─── Modal wrapper with accessibility ─────────────────────────────────────────
function ModalWrapper({ onClose, children }: { onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [onClose]);
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} autoFocus aria-label="Close dialog">
          <i className="fa-solid fa-xmark" />
        </button>
        {children}
      </div>
    </div>
  );
}
// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [lang, setLang] = useState<'tr'|'en'|'ru'|'ar'>('tr');
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [serviceModal, setServiceModal] = useState<number|null>(null);
  const [pricingYearly, setPricingYearly] = useState(false);
  const [portfolioFilter, setPortfolioFilter] = useState('all');
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number|null>(null);
  const [formState, setFormState] = useState({ name:'', email:'', phone:'', service:'', message:'' });
  const [formErrors, setFormErrors] = useState<Record<string,string>>({});
  const [formSuccess, setFormSuccess] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [typewriter, setTypewriter] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const twTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tw = (key: string) => t[key]?.[lang] ?? t[key]?.['tr'] ?? '';
  // Safe lookup with fallback for any lang-keyed object
  const tl = (obj: LM): string => obj[lang] || obj['tr'] || '';

  // ── Dark mode ──
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('cys-dark', String(dark));
  }, [dark]);
  useEffect(() => {
    const saved = localStorage.getItem('cys-dark');
    if (saved === 'true') setDark(true);
  }, []);

  // ── Scroll events ──
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      setShowTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Scroll reveal ──
  useEffect(() => {
    const targets = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    targets.forEach(t => obs.observe(t));
    return () => obs.disconnect();
  }, []); // one-time DOM setup — all reveal elements are rendered on mount

  // ── Counter animation ──
  useEffect(() => {
    const counters = document.querySelectorAll('.counter');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const target = +(el.dataset.target || 0);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 80));
        const tick = () => {
          current = Math.min(current + step, target);
          el.textContent = current + suffix;
          if (current < target) requestAnimationFrame(tick);
        };
        tick();
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  // ── Progress bar animations ──
  useEffect(() => {
    const bars = document.querySelectorAll('.progress-fill[data-pct]');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          el.style.width = el.dataset.pct + '%';
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    bars.forEach(b => obs.observe(b));
    return () => obs.disconnect();
  }, []);

  // ── Typewriter effect ──
  useEffect(() => {
    const words = ['Sosyal Medya', 'SEO', 'Google Ads', 'Web Tasarım', 'Dijital Reklam'];
    let wi = 0, ci = 0, deleting = false;
    let alive = true;
    const tick = () => {
      if (!alive) return;
      const word = words[wi];
      if (!deleting) {
        ci++;
        setTypewriter(word.slice(0, ci));
        if (ci === word.length) { deleting = true; twTimerRef.current = setTimeout(tick, 1800); return; }
      } else {
        ci--;
        setTypewriter(word.slice(0, ci));
        if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
      }
      twTimerRef.current = setTimeout(tick, deleting ? 60 : 90);
    };
    twTimerRef.current = setTimeout(tick, 800);
    return () => {
      alive = false;
      if (twTimerRef.current) clearTimeout(twTimerRef.current);
    };
  }, []);

  // ── Canvas particles ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let rafId: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const N = 60;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 2 + 1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains('dark');
      const dotColor = isDark ? 'rgba(56,189,248,0.7)' : 'rgba(37,99,235,0.5)';
      const lineColor = isDark ? 'rgba(56,189,248,' : 'rgba(37,99,235,';
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();
      });
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = lineColor + (1 - dist / 120) * 0.4 + ')';
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      rafId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize); };
  }, []);

  // ── Card 3D tilt ──
  useEffect(() => {
    const cards = document.querySelectorAll('.why-card');
    const handleMove = (e: Event) => {
      const card = (e.target as HTMLElement).closest('.why-card') as HTMLElement;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const me = e as MouseEvent;
      const x = (me.clientX - rect.left) / rect.width - 0.5;
      const y = (me.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-8px)`;
    };
    const handleLeave = (e: Event) => {
      const card = (e.target as HTMLElement).closest('.why-card') as HTMLElement;
      if (card) card.style.transform = '';
    };
    cards.forEach(c => {
      c.addEventListener('mousemove', handleMove);
      c.addEventListener('mouseleave', handleLeave);
    });
    return () => cards.forEach(c => {
      c.removeEventListener('mousemove', handleMove);
      c.removeEventListener('mouseleave', handleLeave);
    });
  }, []);

  // ── Testimonial auto-play ──
  useEffect(() => {
    const id = setInterval(() => setTestimonialIdx(i => (i + 1) % testimonials.length), 4500);
    return () => clearInterval(id);
  }, []);

  // ── Smooth scroll ──
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  // ── Form handling ──
  const validateForm = () => {
    const errs: Record<string,string> = {};
    if (!formState.name.trim()) errs.name = lang === 'tr' ? 'Ad zorunludur' : 'Name is required';
    if (!formState.email.match(/^[^@]+@[^@]+\.[^@]+$/)) errs.email = lang === 'tr' ? 'Geçerli e-posta girin' : 'Enter a valid email';
    if (!formState.message.trim()) errs.message = lang === 'tr' ? 'Mesaj zorunludur' : 'Message is required';
    return errs;
  };
  const submitForm = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const errs = validateForm();
    if (Object.keys(errs).length > 0) { setFormErrors(errs); return; }
    setFormSuccess(true);
    setFormState({ name:'', email:'', phone:'', service:'', message:'' });
  };

  // ─── Data ────────────────────────────────────────────────────────────────────

  const services = [
    { icon: 'fa-brands fa-instagram', color: '#E1306C', title: { tr: 'Sosyal Medya Yönetimi', en: 'Social Media Management', ru: 'Управление соцсетями', ar: 'إدارة وسائل التواصل' }, desc: { tr: 'Instagram, Facebook, TikTok ve LinkedIn hesaplarınızı profesyonel şekilde yönetiyoruz.', en: 'We professionally manage your Instagram, Facebook, TikTok and LinkedIn accounts.', ru: 'Профессионально управляем вашими аккаунтами.', ar: 'ندير حساباتك بشكل احترافي.' }, detail: { tr: 'Günlük içerik üretimi, stories yönetimi, reklam kampanyaları, etkileşim takibi ve aylık detaylı raporlama. Rakip analizi ile stratejik büyüme planlaması.', en: 'Daily content creation, stories management, ad campaigns, engagement tracking, and monthly detailed reporting. Competitor analysis with strategic growth planning.', ru: 'Ежедневный контент, управление сторис, рекламные кампании и отчёты.', ar: 'إنشاء محتوى يومي وإدارة القصص وحملات الإعلانات.' } },
    { icon: 'fa-solid fa-magnifying-glass', color: '#10B981', title: { tr: 'SEO Optimizasyonu', en: 'SEO Optimization', ru: 'SEO Оптимизация', ar: 'تحسين محركات البحث' }, desc: { tr: "Web sitenizi Google'da üst sıralara taşıyacak profesyonel SEO hizmetleri.", en: 'Professional SEO services to rank your website higher on Google.', ru: 'Профессиональное SEO для роста в Google.', ar: 'خدمات SEO احترافية للتصدر في نتائج جوجل.' }, detail: { tr: 'Teknik SEO auditi, anahtar kelime araştırması, içerik optimizasyonu, backlink inşası ve aylık sıralama raporları. Yerel SEO çalışmaları ile Kıbrıs pazarına hakimiyet.', en: 'Technical SEO audit, keyword research, content optimization, backlink building, and monthly ranking reports. Local SEO for dominance in the Cyprus market.', ru: 'Технический аудит, ключевые слова, оптимизация контента и местное SEO.', ar: 'تدقيق تقني وبحث كلمات مفتاحية وبناء روابط.' } },
    { icon: 'fa-brands fa-google', color: '#4285F4', title: { tr: 'Google Reklamları', en: 'Google Ads', ru: 'Google Реклама', ar: 'إعلانات جوجل' }, desc: { tr: 'Dönüşüm odaklı reklam kampanyaları ile daha fazla müşteriye ulaşın.', en: 'Reach more customers with conversion-focused ad campaigns.', ru: 'Достигайте больше клиентов с помощью рекламы.', ar: 'الوصول لعملاء أكثر عبر حملات إعلانية مركزة.' }, detail: { tr: 'Google Search, Display ve Shopping kampanyaları. A/B testi, reklam optimizasyonu, dönüşüm takibi ve detaylı ROI raporlaması ile yatırımınızı maksimize ediyoruz.', en: 'Google Search, Display and Shopping campaigns. A/B testing, ad optimization, conversion tracking and detailed ROI reporting to maximize your investment.', ru: 'Поисковая и медийная реклама, A/B тесты, оптимизация и ROI отчёты.', ar: 'حملات البحث والعرض والتسوق مع تتبع التحويلات.' } },
    { icon: 'fa-solid fa-laptop-code', color: '#8B5CF6', title: { tr: 'Web Tasarım', en: 'Web Design', ru: 'Веб-дизайн', ar: 'تصميم الموقع' }, desc: { tr: 'Hızlı, modern ve SEO uyumlu kurumsal web siteleri geliştiriyoruz.', en: 'We develop fast, modern and SEO-friendly corporate websites.', ru: 'Создаём быстрые, современные и SEO-оптимизированные сайты.', ar: 'نطور مواقع ويب سريعة وحديثة ومتوافقة مع SEO.' }, detail: { tr: 'Responsive tasarım, hız optimizasyonu, kullanıcı dostu arayüz, CMS entegrasyonu ve 6 ay ücretsiz teknik destek. E-ticaret çözümleri de dahildir.', en: 'Responsive design, speed optimization, user-friendly interface, CMS integration and 6 months free technical support. E-commerce solutions included.', ru: 'Адаптивный дизайн, оптимизация скорости, CMS и 6 месяцев поддержки.', ar: 'تصميم متجاوب وتحسين السرعة ودعم تقني مجاني 6 أشهر.' } },
    { icon: 'fa-solid fa-pen-nib', color: '#F59E0B', title: { tr: 'İçerik Üretimi', en: 'Content Creation', ru: 'Создание контента', ar: 'إنشاء المحتوى' }, desc: { tr: 'Markanız için etkileyici görsel ve yazılı içerikler üretiyoruz.', en: 'We create compelling visual and written content for your brand.', ru: 'Создаём визуальный и текстовый контент для вашего бренда.', ar: 'ننشئ محتوى مرئيًا ومكتوبًا مقنعًا لعلامتك التجارية.' }, detail: { tr: 'Grafik tasarım, video prodüksiyon, blog yazarlığı, infografik hazırlama ve marka kimliği geliştirme. Her içerik SEO ve platform kurallarına uygun üretilir.', en: 'Graphic design, video production, blog writing, infographic creation and brand identity development. All content is SEO and platform-compliant.', ru: 'Графический дизайн, видео, блог, инфографика и фирменный стиль.', ar: 'تصميم جرافيك وإنتاج فيديو وكتابة مدونات وإنفوغرافيك.' } },
    { icon: 'fa-solid fa-envelope-open-text', color: '#EF4444', title: { tr: 'E-posta Pazarlama', en: 'Email Marketing', ru: 'Email маркетинг', ar: 'التسويق عبر البريد' }, desc: { tr: 'Hedefli e-posta kampanyaları ile müşteri sadakatini artırıyoruz.', en: 'We increase customer loyalty with targeted email campaigns.', ru: 'Повышаем лояльность клиентов с помощью email кампаний.', ar: 'نزيد ولاء العملاء من خلال حملات البريد الإلكتروني المستهدفة.' }, detail: { tr: 'Segmentasyon, otomatik akışlar, A/B testi, açılma ve tıklama oranı optimizasyonu. Mailchimp ve benzeri platformlarla entegre çözümler sunuyoruz.', en: 'Segmentation, automated flows, A/B testing, open and click rate optimization. Integrated solutions with Mailchimp and similar platforms.', ru: 'Сегментация, автоматические цепочки, A/B тесты и интеграция с Mailchimp.', ar: 'تقسيم الجمهور وتدفقات آلية واختبار A/B وتكامل مع Mailchimp.' } },
  ];

  const whyCards = [
    { icon: 'fa-solid fa-award', title: { tr: 'Deneyimli Uzmanlar', en: 'Experienced Experts', ru: 'Опытные эксперты', ar: 'خبراء متمرسون' }, desc: { tr: 'Dijital pazarlama alanında yılların deneyimine sahip ekibimiz.', en: 'Our team has years of experience in digital marketing.', ru: 'Наша команда имеет многолетний опыт.', ar: 'فريقنا لديه سنوات من الخبرة.' } },
    { icon: 'fa-solid fa-chart-column', title: { tr: 'Ölçülebilir Başarı', en: 'Measurable Success', ru: 'Измеримый успех', ar: 'نجاح قابل للقياس' }, desc: { tr: 'Tüm kampanyalarımızı verilerle analiz ediyor ve geliştiriyoruz.', en: 'We analyze all campaigns with data and continuously improve.', ru: 'Анализируем кампании с помощью данных.', ar: 'نحلل جميع الحملات بالبيانات ونطور باستمرار.' } },
    { icon: 'fa-solid fa-bolt', title: { tr: 'Hızlı Sonuçlar', en: 'Fast Results', ru: 'Быстрые результаты', ar: 'نتائج سريعة' }, desc: { tr: 'İşletmenizin hedeflerine en kısa sürede ulaşması için çalışıyoruz.', en: 'We work to reach your business goals as quickly as possible.', ru: 'Работаем для достижения ваших целей в кратчайшие сроки.', ar: 'نعمل للوصول إلى أهداف عملك في أقرب وقت.' } },
    { icon: 'fa-solid fa-headset', title: { tr: '7/24 Destek', en: '24/7 Support', ru: 'Поддержка 24/7', ar: 'دعم 24/7' }, desc: { tr: 'Proje boyunca her zaman yanınızda olan destek ekibimiz.', en: 'Our support team is always by your side throughout the project.', ru: 'Наша команда поддержки всегда рядом.', ar: 'فريق الدعم لدينا دائماً بجانبك.' } },
  ];

  const processSteps = [
    { num: '01', title: { tr: 'Analiz', en: 'Analysis', ru: 'Анализ', ar: 'التحليل' }, desc: { tr: 'Markanızı, rakiplerinizi ve hedef kitlenizi detaylı analiz ediyoruz.', en: 'We analyze your brand, competitors, and target audience in detail.', ru: 'Анализируем ваш бренд, конкурентов и целевую аудиторию.', ar: 'نحلل علامتك التجارية والمنافسين والجمهور المستهدف.' } },
    { num: '02', title: { tr: 'Strateji', en: 'Strategy', ru: 'Стратегия', ar: 'الاستراتيجية' }, desc: { tr: 'İşletmenize özel dijital pazarlama stratejisi geliştiriyoruz.', en: 'We develop a digital marketing strategy tailored to your business.', ru: 'Разрабатываем стратегию цифрового маркетинга.', ar: 'نطور استراتيجية تسويق رقمي مخصصة لعملك.' } },
    { num: '03', title: { tr: 'Uygulama', en: 'Execution', ru: 'Реализация', ar: 'التنفيذ' }, desc: { tr: 'SEO, reklam ve içerik çalışmalarını profesyonel yürütüyoruz.', en: 'We professionally execute SEO, advertising, and content work.', ru: 'Профессионально проводим работы по SEO, рекламе и контенту.', ar: 'ننفذ أعمال تحسين محركات البحث والإعلانات والمحتوى.' } },
    { num: '04', title: { tr: 'Raporlama', en: 'Reporting', ru: 'Отчётность', ar: 'التقارير' }, desc: { tr: 'Performansı düzenli analiz ediyor ve sürekli iyileştirmeler yapıyoruz.', en: 'We regularly analyze performance and make continuous improvements.', ru: 'Регулярно анализируем результаты и улучшаем работу.', ar: 'نحلل الأداء بانتظام ونجري تحسينات مستمرة.' } },
  ];

  const pricing = [
    {
      name: { tr: 'Başlangıç', en: 'Starter', ru: 'Стартер', ar: 'البداية' },
      monthlyPrice: 1500,
      yearlyPrice: 1050,
      currency: '₺',
      desc: { tr: 'Küçük işletmeler için ideal', en: 'Ideal for small businesses', ru: 'Идеально для малого бизнеса', ar: 'مثالي للشركات الصغيرة' },
      features: [
        { tr: '2 Sosyal Medya Hesabı', en: '2 Social Media Accounts', ru: '2 аккаунта соцсетей', ar: 'حسابان على وسائل التواصل' },
        { tr: '12 İçerik/Ay', en: '12 Posts/Month', ru: '12 публикаций/месяц', ar: '12 منشورًا/شهريًا' },
        { tr: 'Aylık Rapor', en: 'Monthly Report', ru: 'Ежемесячный отчёт', ar: 'تقرير شهري' },
        { tr: 'E-posta Desteği', en: 'Email Support', ru: 'Email поддержка', ar: 'دعم عبر البريد' },
      ],
      popular: false,
    },
    {
      name: { tr: 'Büyüme', en: 'Growth', ru: 'Рост', ar: 'النمو' },
      monthlyPrice: 3500,
      yearlyPrice: 2450,
      currency: '₺',
      desc: { tr: 'Büyüyen markalar için güçlü çözüm', en: 'Powerful solution for growing brands', ru: 'Мощное решение для растущих брендов', ar: 'حل قوي للعلامات التجارية النامية' },
      features: [
        { tr: '4 Sosyal Medya Hesabı', en: '4 Social Media Accounts', ru: '4 аккаунта соцсетей', ar: '4 حسابات وسائل التواصل' },
        { tr: '30 İçerik/Ay', en: '30 Posts/Month', ru: '30 публикаций/месяц', ar: '30 منشورًا/شهريًا' },
        { tr: 'SEO Optimizasyonu', en: 'SEO Optimization', ru: 'SEO оптимизация', ar: 'تحسين محركات البحث' },
        { tr: 'Google Ads Yönetimi', en: 'Google Ads Management', ru: 'Управление Google Ads', ar: 'إدارة إعلانات جوجل' },
        { tr: 'Haftalık Rapor', en: 'Weekly Report', ru: 'Еженедельный отчёт', ar: 'تقرير أسبوعي' },
        { tr: '7/24 Destek', en: '24/7 Support', ru: 'Поддержка 24/7', ar: 'دعم 24/7' },
      ],
      popular: true,
    },
    {
      name: { tr: 'Kurumsal', en: 'Enterprise', ru: 'Корпоратив', ar: 'المؤسسي' },
      monthlyPrice: 7500,
      yearlyPrice: 5250,
      currency: '₺',
      desc: { tr: 'Büyük markalar için tam çözüm', en: 'Complete solution for large brands', ru: 'Полное решение для крупных брендов', ar: 'حل متكامل للعلامات التجارية الكبيرة' },
      features: [
        { tr: 'Sınırsız Sosyal Medya', en: 'Unlimited Social Media', ru: 'Неограниченные соцсети', ar: 'وسائل تواصل غير محدودة' },
        { tr: 'Sınırsız İçerik', en: 'Unlimited Content', ru: 'Неограниченный контент', ar: 'محتوى غير محدود' },
        { tr: 'Tam SEO Paketi', en: 'Full SEO Package', ru: 'Полный SEO пакет', ar: 'باقة SEO كاملة' },
        { tr: 'Google + Meta Ads', en: 'Google + Meta Ads', ru: 'Google + Meta реклама', ar: 'إعلانات جوجل وميتا' },
        { tr: 'Web Tasarım Dahil', en: 'Web Design Included', ru: 'Включён веб-дизайн', ar: 'تصميم موقع مشمول' },
        { tr: 'Özel Hesap Yöneticisi', en: 'Dedicated Account Manager', ru: 'Персональный менеджер', ar: 'مدير حساب مخصص' },
        { tr: 'Günlük Rapor', en: 'Daily Report', ru: 'Ежедневный отчёт', ar: 'تقرير يومي' },
      ],
      popular: false,
    },
  ];

  const portfolioItems = [
    { cat: 'social', label: { tr: 'Sosyal Medya', en: 'Social Media' }, title: { tr: 'Restoran Kampanyası', en: 'Restaurant Campaign' }, desc: { tr: 'Etkileşimi %280 artırdık', en: 'Increased engagement by 280%' }, grad: 'linear-gradient(135deg,#E1306C,#F77737)', icon: 'fa-solid fa-store' },
    { cat: 'seo', label: { tr: 'SEO', en: 'SEO' }, title: { tr: 'Emlak SEO Projesi', en: 'Real Estate SEO' }, desc: { tr: 'Google ilk sayfaya çıkardık', en: 'Ranked to Google first page' }, grad: 'linear-gradient(135deg,#10B981,#059669)', icon: 'fa-solid fa-house' },
    { cat: 'ads', label: { tr: 'Google Ads', en: 'Google Ads' }, title: { tr: 'E-Ticaret Reklamları', en: 'E-Commerce Ads' }, desc: { tr: 'ROI %340 büyüdü', en: 'ROI grew by 340%' }, grad: 'linear-gradient(135deg,#4285F4,#0EA5E9)', icon: 'fa-solid fa-cart-shopping' },
    { cat: 'web', label: { tr: 'Web Tasarım', en: 'Web Design' }, title: { tr: 'Kurumsal Web Sitesi', en: 'Corporate Website' }, desc: { tr: 'Ziyaretçi süresi %120 arttı', en: 'Session time increased 120%' }, grad: 'linear-gradient(135deg,#8B5CF6,#7C3AED)', icon: 'fa-solid fa-briefcase' },
    { cat: 'social', label: { tr: 'Sosyal Medya', en: 'Social Media' }, title: { tr: 'Otel Sosyal Medyası', en: 'Hotel Social Media' }, desc: { tr: 'Takipçi 0\'dan 25K\'ya çıktı', en: 'Followers grew from 0 to 25K' }, grad: 'linear-gradient(135deg,#F59E0B,#D97706)', icon: 'fa-solid fa-hotel' },
    { cat: 'seo', label: { tr: 'SEO', en: 'SEO' }, title: { tr: 'Hukuk Bürosu SEO', en: 'Law Firm SEO' }, desc: { tr: 'Organik trafik %450 arttı', en: 'Organic traffic up 450%' }, grad: 'linear-gradient(135deg,#EF4444,#DC2626)', icon: 'fa-solid fa-scale-balanced' },
  ];

  const team = [
    { initials: 'MA', name: 'Mehmet Arslan', role: { tr: 'CEO & Kurucu', en: 'CEO & Founder' }, grad: 'linear-gradient(135deg,#2563EB,#38BDF8)' },
    { initials: 'AD', name: 'Ayşe Demir', role: { tr: 'SEO Direktörü', en: 'SEO Director' }, grad: 'linear-gradient(135deg,#10B981,#059669)' },
    { initials: 'KY', name: 'Kemal Yıldız', role: { tr: 'Sosyal Medya Uzmanı', en: 'Social Media Specialist' }, grad: 'linear-gradient(135deg,#8B5CF6,#7C3AED)' },
    { initials: 'FK', name: 'Fatma Kaya', role: { tr: 'Web Tasarımcı', en: 'Web Designer' }, grad: 'linear-gradient(135deg,#F59E0B,#D97706)' },
  ];

  const testimonials = [
    { name: 'Ahmet Yılmaz', role: { tr: 'Restoran Sahibi', en: 'Restaurant Owner' }, initials: 'AY', grad: 'linear-gradient(135deg,#E1306C,#F77737)', text: { tr: '"CySocial sayesinde sosyal medyamız tamamen değişti. 3 ayda müşterilerimiz ikiye katlandı!"', en: '"Thanks to CySocial, our social media completely transformed. Customers doubled in 3 months!"' } },
    { name: 'Elif Kaya', role: { tr: 'E-Ticaret Girişimcisi', en: 'E-Commerce Entrepreneur' }, initials: 'EK', grad: 'linear-gradient(135deg,#10B981,#059669)', text: { tr: '"SEO çalışmaları sayesinde Google\'da ilk sayfaya çıkmayı başardık. Satışlarımız %200 arttı."', en: '"Thanks to SEO work, we managed to rank on Google\'s first page. Sales increased by 200%."' } },
    { name: 'Mehmet Demir', role: { tr: 'Şirket Müdürü', en: 'Company Director' }, initials: 'MD', grad: 'linear-gradient(135deg,#4285F4,#0EA5E9)', text: { tr: '"Profesyonel ekip, hızlı iletişim ve harika sonuçlar. Kesinlikle tavsiye ediyorum!"', en: '"Professional team, fast communication and great results. Highly recommend!"' } },
    { name: 'Selin Arslan', role: { tr: 'Güzellik Merkezi Sahibi', en: 'Beauty Salon Owner' }, initials: 'SA', grad: 'linear-gradient(135deg,#8B5CF6,#7C3AED)', text: { tr: '"Instagram\'da 0\'dan 12.000 takipçiye çıktık. Randevularım 3 ay önceden dolu!"', en: '"We went from 0 to 12,000 Instagram followers. My appointments are booked 3 months ahead!"' } },
    { name: 'Barış Öztürk', role: { tr: 'Emlakçı', en: 'Real Estate Agent' }, initials: 'BÖ', grad: 'linear-gradient(135deg,#F59E0B,#D97706)', text: { tr: '"Google Ads kampanyaları ile bütçemizin 5 katı geri dönüş aldık. Muhteşem sonuçlar!"', en: '"With Google Ads campaigns, we got 5x return on our budget. Amazing results!"' } },
  ];

  const faqs = [
    { q: { tr: 'SEO ne kadar sürede sonuç verir?', en: 'How long does SEO take to show results?' }, a: { tr: 'Genellikle ilk sonuçlar 3-6 ay arasında görülmeye başlanır. Rekabetli sektörlerde bu süre uzayabilir ancak kalıcı ve sürdürülebilir büyüme sağlanır.', en: 'Results are typically visible within 3-6 months. In competitive sectors this may take longer, but sustainable growth is achieved.' } },
    { q: { tr: 'Sosyal medya yönetimi neleri kapsar?', en: 'What does social media management include?' }, a: { tr: 'İçerik üretimi, tasarım, paylaşım, reklam yönetimi, etkileşim takibi ve aylık detaylı raporlama hizmetlerini kapsar.', en: 'It covers content creation, design, posting, ad management, engagement tracking, and monthly detailed reporting.' } },
    { q: { tr: 'Google Ads yönetiyor musunuz?', en: 'Do you manage Google Ads?' }, a: { tr: 'Evet. Reklam kampanyalarını oluşturuyor, optimize ediyor, A/B testleri yapıyor ve düzenli raporluyoruz.', en: 'Yes. We create, optimize, A/B test, and regularly report on ad campaigns.' } },
    { q: { tr: 'Web siteleri mobil uyumlu mu?', en: 'Are websites mobile-friendly?' }, a: { tr: 'Evet. Tüm projelerimiz responsive tasarım standartlarına uygun olarak geliştirilmektedir.', en: 'Yes. All our projects are developed according to responsive design standards.' } },
    { q: { tr: 'Fiyatlandırma nasıl çalışır?', en: 'How does pricing work?' }, a: { tr: 'Sabit aylık paketlerimiz mevcuttur. İşletmenizin ihtiyaçlarına özel özel teklifler de hazırlıyoruz.', en: 'We have fixed monthly packages. We also prepare custom offers tailored to your business needs.' } },
    { q: { tr: 'Hangi sektörlere hizmet veriyorsunuz?', en: 'Which sectors do you serve?' }, a: { tr: 'Restoran, emlak, perakende, hukuk, sağlık, eğitim ve daha birçok sektörde aktif olarak çalışıyoruz.', en: 'We actively work in restaurants, real estate, retail, law, healthcare, education and many more sectors.' } },
    { q: { tr: 'Raporlama ne sıklıkla yapılır?', en: 'How often is reporting done?' }, a: { tr: 'Paketinize göre aylık, haftalık veya günlük raporlar sunulmaktadır. Tüm veriler şeffaf şekilde paylaşılır.', en: 'Monthly, weekly or daily reports are provided depending on your package. All data is shared transparently.' } },
  ];

  const filterLabel: Record<string, Record<string, string>> = {
    all:    { tr: 'Tümü', en: 'All', ru: 'Все', ar: 'الكل' },
    social: { tr: 'Sosyal Medya', en: 'Social Media', ru: 'Соцсети', ar: 'وسائل التواصل' },
    seo:    { tr: 'SEO', en: 'SEO', ru: 'SEO', ar: 'SEO' },
    ads:    { tr: 'Google Ads', en: 'Google Ads', ru: 'Google Ads', ar: 'Google Ads' },
    web:    { tr: 'Web Tasarım', en: 'Web Design', ru: 'Веб-дизайн', ar: 'تصميم موقع' },
  };

  const langNames: Record<string, string> = { tr: '🇹🇷 Türkçe', en: '🇬🇧 English', ru: '🇷🇺 Русский', ar: '🇸🇦 العربية' };

  // ─── Render ───────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Progress bar */}
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* Header */}
      <header className="site-header">
        <div className="container">
          <nav className="site-nav">
            <a className="logo" href="#" onClick={e => { e.preventDefault(); scrollTo('home'); }}>
              <div className="logo-icon"><i className="fa-solid fa-chart-line" /></div>
              <span className="logo-text">CySocial</span>
            </a>
            <ul className={`nav-links${mobileOpen ? ' open' : ''}`}>
              {['home','about','services','pricing','portfolio','contact'].map(id => (
                <li key={id}><a href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }}>{tw(`nav_${id}`)}</a></li>
              ))}
            </ul>
            <div className="nav-right">
              <button className="dark-toggle" onClick={() => setDark(d => !d)} aria-label="Toggle dark mode">
                <i className={`fa-solid ${dark ? 'fa-sun' : 'fa-moon'}`} />
              </button>
              <div className="lang-dropdown">
                <button className="lang-btn" onClick={() => setLangOpen(o => !o)}>
                  <i className="fa-solid fa-globe" /> {langNames[lang].split(' ')[1]} <i className="fa-solid fa-chevron-down" />
                </button>
                {langOpen && (
                  <div className="lang-menu">
                    {(['tr','en','ru','ar'] as const).map(l => (
                      <button key={l} className={`lang-item${lang===l?' active':''}`} onClick={() => { setLang(l); setLangOpen(false); }}>
                        {langNames[l]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button className="hamburger" onClick={() => setMobileOpen(o => !o)} aria-label="Menu">
                <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'}`} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero" id="home">
        <canvas ref={canvasRef} className="hero-canvas" />
        <div className="hero-glow" />
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge reveal">
              <i className="fa-solid fa-star" /> {tw('hero_badge')}
            </div>
            <h1 className="hero-h1 reveal">
              {tw('hero_h1a')} <span className="gradient-text">{tw('hero_h1b')}</span><br />{tw('hero_h1c')}
            </h1>
            <div className="hero-typewriter reveal">
              <i className="fa-solid fa-arrow-right" /> {typewriter}<span className="cursor">|</span>
            </div>
            <p className="hero-sub reveal">{tw('hero_sub')}</p>
            <div className="hero-btns reveal">
              <a className="btn-primary" href="#contact" onClick={e => { e.preventDefault(); scrollTo('contact'); }}>{tw('hero_cta1')}</a>
              <a className="btn-outline" href="#services" onClick={e => { e.preventDefault(); scrollTo('services'); }}>{tw('hero_cta2')}</a>
            </div>
            <div className="hero-stats reveal">
              {[['250+', lang === 'tr' ? 'Mutlu Müşteri' : 'Happy Clients'],['1200+', lang === 'tr' ? 'Tamamlanan Proje' : 'Projects Done'],['98%', lang === 'tr' ? 'Memnuniyet' : 'Satisfaction']].map(([n,l]) => (
                <div className="hero-stat" key={l}><span className="hero-stat-num">{n}</span><span className="hero-stat-label">{l}</span></div>
              ))}
            </div>
          </div>
          <div className="hero-visual reveal">
            <div className="dashboard-card">
              <div className="dc-header">
                <div className="dc-dots"><span /><span /><span /></div>
                <span className="dc-title">Analytics Dashboard</span>
                <span className="dc-live">● LIVE</span>
              </div>
              <div className="dc-body">
                <div className="dc-chart">
                  {[65,45,80,55,95,70,88].map((h,i) => (
                    <div key={i} className="dc-bar" style={{ height: `${h}%`, animationDelay: `${i*0.1}s` }} />
                  ))}
                </div>
                <div className="dc-metrics">
                  <div className="dc-metric"><i className="fa-brands fa-instagram" /><span>+42%</span><small>Instagram</small></div>
                  <div className="dc-metric"><i className="fa-brands fa-google" /><span>↑ SEO</span><small>Rankings</small></div>
                  <div className="dc-metric"><i className="fa-solid fa-chart-line" /><span>ROI</span><small>+285%</small></div>
                </div>
                <div className="dc-progress-group">
                  <div className="dc-prog-row">
                    <span>Instagram</span>
                    <div className="dc-prog"><div className="dc-prog-fill inst" /></div>
                    <span>87%</span>
                  </div>
                  <div className="dc-prog-row">
                    <span>SEO</span>
                    <div className="dc-prog"><div className="dc-prog-fill seo" /></div>
                    <span>73%</span>
                  </div>
                  <div className="dc-prog-row">
                    <span>Ads</span>
                    <div className="dc-prog"><div className="dc-prog-fill ads" /></div>
                    <span>91%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a className="scroll-indicator" href="#trusted" onClick={e => { e.preventDefault(); scrollTo('trusted'); }}>
          <i className="fa-solid fa-chevron-down" />
        </a>
      </section>

      {/* Trusted By */}
      <section className="trusted-section" id="trusted">
        <div className="container">
          <p className="trusted-label">{tw('trusted_title')}</p>
        </div>
        <div className="marquee-track">
          <div className="marquee-content">
            {[...Array(2)].map((_,ri) => (
              <span key={ri} className="marquee-inner">
                {[['fa-brands fa-google','Google'],['fa-brands fa-meta','Meta'],['fa-brands fa-instagram','Instagram'],['fa-brands fa-linkedin','LinkedIn'],['fa-brands fa-tiktok','TikTok'],['fa-brands fa-youtube','YouTube'],['fa-brands fa-x-twitter','X (Twitter)'],['fa-brands fa-whatsapp','WhatsApp']].map(([ic,nm]) => (
                  <span key={nm} className="marquee-item"><i className={ic} />{nm}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services-section" id="services">
        <div className="container">
          <span className="section-tag reveal">{tw('services_tag')}</span>
          <h2 className="section-h2 reveal">{tw('services_h2')}</h2>
          <div className="services-grid">
            {services.map((s, i) => (
              <div key={i} className="service-card reveal" style={{ animationDelay: `${i*0.08}s` }} onClick={() => setServiceModal(i)}>
                <div className="service-icon" style={{ background: `linear-gradient(135deg,${s.color}22,${s.color}44)` }}>
                  <i className={s.icon} style={{ color: s.color }} />
                </div>
                <h3>{tl(s.title)}</h3>
                <p>{tl(s.desc)}</p>
                <button className="service-more">{lang === 'tr' ? 'Detaylar' : lang === 'en' ? 'Details' : lang === 'ru' ? 'Подробнее' : 'التفاصيل'} <i className="fa-solid fa-arrow-right" /></button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Modal */}
      {serviceModal !== null && (
        <ModalWrapper onClose={() => setServiceModal(null)}>
          <div className="modal-icon" style={{ background: `linear-gradient(135deg,${services[serviceModal].color}22,${services[serviceModal].color}44)` }}>
            <i className={services[serviceModal].icon} style={{ color: services[serviceModal].color }} />
          </div>
          <h3>{tl(services[serviceModal].title)}</h3>
          <p className="modal-detail">{tl(services[serviceModal].detail)}</p>
          <a className="btn-primary" href="#contact" onClick={() => { setServiceModal(null); scrollTo('contact'); }}>
            {tw('hero_cta1')}
          </a>
        </ModalWrapper>
      )}

      {/* About */}
      <section className="about-section" id="about">
        <div className="container about-grid">
          <div className="about-visual reveal">
            <div className="analytics-card">
              <div className="ac-header">
                <h4>Analytics Dashboard</h4>
                <span className="ac-live">Live</span>
              </div>
              <div className="ac-bars">
                {[['Instagram Growth','instagram',87],['SEO Ranking','seo-bar',73],['Google Ads ROI','ads-bar',91],['Content Reach','content-bar',65]].map(([label, cls, pct]) => (
                  <div key={label as string} className="ac-bar-row">
                    <span className="ac-bar-label">{label as string}</span>
                    <div className="ac-bar-track">
                      <div className={`progress-fill ac-fill ${cls}`} data-pct={pct} />
                    </div>
                    <span className="ac-bar-pct">{pct}%</span>
                  </div>
                ))}
              </div>
              <div className="ac-footer">
                <div><span className="ac-big">98%</span><small>Success Rate</small></div>
                <div><span className="ac-big">250+</span><small>Active Clients</small></div>
                <div><span className="ac-big">8+</span><small>Years Exp.</small></div>
              </div>
            </div>
            <div className="timeline">
              {[['2016','Kuruluş'],['2019','100+ Müşteri'],['2022','500+ Proje'],['2024','Lider Ajans']].map(([y,e]) => (
                <div key={y} className="tl-item">
                  <div className="tl-dot" /><span className="tl-year">{y}</span><span className="tl-event">{e}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="about-content reveal">
            <span className="section-tag">{tw('about_tag')}</span>
            <h2>{tw('about_h2')}</h2>
            <p>{tw('about_p1')}</p>
            <p>{tw('about_p2')}</p>
            <div className="about-features">
              {[
                { tr:'Profesyonel Ekip', en:'Professional Team' },
                { tr:'Modern Teknolojiler', en:'Modern Technologies' },
                { tr:'Ölçülebilir Sonuçlar', en:'Measurable Results' },
                { tr:'7/24 Destek', en:'24/7 Support' },
              ].map(f => (
                <div key={f.tr} className="about-feature">
                  <i className="fa-solid fa-circle-check" />
                  <span>{tl(f)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="why-section">
        <div className="container">
          <span className="section-tag reveal">{tw('why_tag')}</span>
          <h2 className="section-h2 reveal">{tw('why_h2')}</h2>
          <div className="why-grid">
            {whyCards.map((c, i) => (
              <div key={i} className="why-card reveal" style={{ animationDelay: `${i*0.1}s` }}>
                <div className="why-icon"><i className={c.icon} /></div>
                <h3>{tl(c.title)}</h3>
                <p>{tl(c.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="process-section">
        <div className="container">
          <span className="section-tag reveal">{tw('process_tag')}</span>
          <h2 className="section-h2 reveal">{tw('process_h2')}</h2>
          <div className="process-grid">
            {processSteps.map((s, i) => (
              <div key={i} className="process-card reveal" style={{ animationDelay: `${i*0.1}s` }}>
                <div className="process-num">{s.num}</div>
                <h3>{tl(s.title)}</h3>
                <p>{tl(s.desc)}</p>
                {i < processSteps.length - 1 && <div className="process-connector" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="stats-section">
        <div className="stats-bg" />
        <div className="container stats-grid">
          {[['250','+',lang==='tr'?'Mutlu Müşteri':'Happy Clients'],['1200','+',lang==='tr'?'Tamamlanan Proje':'Projects Done'],['98','%',lang==='tr'?'Müşteri Memnuniyeti':'Client Satisfaction'],['8','+',lang==='tr'?'Yıllık Deneyim':'Years of Experience']].map(([n,suf,lbl]) => (
            <div key={lbl} className="stat-card reveal">
              <h2 className="counter" data-target={n} data-suffix={suf}>0{suf}</h2>
              <p>{lbl}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing-section" id="pricing">
        <div className="container">
          <span className="section-tag reveal">{tw('pricing_tag')}</span>
          <h2 className="section-h2 reveal">{tw('pricing_h2')}</h2>
          <div className="pricing-toggle reveal">
            <span className={!pricingYearly ? 'active' : ''}>{lang==='tr'?'Aylık':'Monthly'}</span>
            <button className={`toggle-switch${pricingYearly?' on':''}`} onClick={() => setPricingYearly(y => !y)}>
              <span className="toggle-thumb" />
            </button>
            <span className={pricingYearly ? 'active' : ''}>{lang==='tr'?'Yıllık':'Yearly'} <span className="discount-badge">%30 {lang==='tr'?'İndirim':'Off'}</span></span>
          </div>
          <div className="pricing-grid">
            {pricing.map((p, i) => (
              <div key={i} className={`pricing-card reveal${p.popular?' popular':''}`} style={{ animationDelay: `${i*0.1}s` }}>
                {p.popular && <div className="popular-badge">{lang==='tr'?'En Popüler':'Most Popular'}</div>}
                <h3>{tl(p.name)}</h3>
                <p className="pricing-desc">{tl(p.desc)}</p>
                <div className="pricing-price">
                  <span className="currency">{p.currency}</span>
                  <span className="amount">{(pricingYearly ? p.yearlyPrice : p.monthlyPrice).toLocaleString()}</span>
                  <span className="per">/{lang==='tr'?'ay':'mo'}</span>
                </div>
                <ul className="pricing-features">
                  {p.features.map((f, fi) => (
                    <li key={fi}><i className="fa-solid fa-check" />{tl(f)}</li>
                  ))}
                </ul>
                <a className={`btn-pricing${p.popular?' btn-primary':''}`} href="#contact" onClick={e => { e.preventDefault(); scrollTo('contact'); }}>
                  {lang==='tr'?'Başla':'Get Started'}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="portfolio-section" id="portfolio">
        <div className="container">
          <span className="section-tag reveal">{tw('portfolio_tag')}</span>
          <h2 className="section-h2 reveal">{tw('portfolio_h2')}</h2>
          <div className="portfolio-filters reveal">
            {['all','social','seo','ads','web'].map(f => (
              <button key={f} className={`filter-btn${portfolioFilter===f?' active':''}`} onClick={() => setPortfolioFilter(f)}>
                {tl(filterLabel[f])}
              </button>
            ))}
          </div>
          <div className="portfolio-grid">
            {portfolioItems.filter(item => portfolioFilter === 'all' || item.cat === portfolioFilter).map((item, i) => (
              <div key={i} className="portfolio-card reveal" style={{ animationDelay: `${i*0.08}s` }}>
                <div className="portfolio-img" style={{ background: item.grad }}>
                  <i className={item.icon} />
                  <div className="portfolio-overlay"><i className="fa-solid fa-eye" /></div>
                </div>
                <div className="portfolio-info">
                  <span className="portfolio-cat">{tl(item.label)}</span>
                  <h3>{tl(item.title)}</h3>
                  <p>{tl(item.desc)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team-section">
        <div className="container">
          <span className="section-tag reveal">{tw('team_tag')}</span>
          <h2 className="section-h2 reveal">{tw('team_h2')}</h2>
          <div className="team-grid">
            {team.map((m, i) => (
              <div key={i} className="team-card reveal" style={{ animationDelay: `${i*0.1}s` }}>
                <div className="team-avatar" style={{ background: m.grad }}>{m.initials}</div>
                <h3>{m.name}</h3>
                <p>{tl(m.role)}</p>
                <div className="team-socials">
                  <a href="#"><i className="fa-brands fa-linkedin" /></a>
                  <a href="#"><i className="fa-brands fa-instagram" /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <span className="section-tag reveal">{tw('testimonials_tag')}</span>
          <h2 className="section-h2 reveal">{tw('testimonials_h2')}</h2>
          <div className="testimonials-carousel">
            <button className="carousel-btn prev" onClick={() => setTestimonialIdx(i => (i - 1 + testimonials.length) % testimonials.length)}>
              <i className="fa-solid fa-chevron-left" />
            </button>
            <div className="testimonial-viewport">
              {testimonials.map((t, i) => (
                <div key={i} className={`testimonial-card${i === testimonialIdx ? ' active' : i === (testimonialIdx - 1 + testimonials.length) % testimonials.length ? ' prev' : ''}`}>
                  <div className="testimonial-stars">★★★★★</div>
                  <p className="testimonial-text">{tl(t.text)}</p>
                  <div className="testimonial-author">
                    <div className="t-avatar" style={{ background: t.grad }}>{t.initials}</div>
                    <div><strong>{t.name}</strong><small>{tl(t.role)}</small></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-btn next" onClick={() => setTestimonialIdx(i => (i + 1) % testimonials.length)}>
              <i className="fa-solid fa-chevron-right" />
            </button>
          </div>
          <div className="carousel-dots">
            {testimonials.map((_, i) => (
              <button key={i} className={`dot${i === testimonialIdx ? ' active' : ''}`} onClick={() => setTestimonialIdx(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section" id="faq">
        <div className="container">
          <span className="section-tag reveal">{tw('faq_tag')}</span>
          <h2 className="section-h2 reveal">{tw('faq_h2')}</h2>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item${faqOpen===i?' open':''} reveal`}>
                <button className="faq-q" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                  <span>{tl(f.q)}</span>
                  <i className={`fa-solid ${faqOpen===i?'fa-minus':'fa-plus'}`} />
                </button>
                <div className="faq-a">
                  <p>{tl(f.a)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="contact-section" id="contact">
        <div className="container contact-grid">
          <div className="contact-info reveal">
            <span className="section-tag">{tw('contact_tag')}</span>
            <h2>{tw('contact_h2')}</h2>
            <p>{lang==='tr'?'Dijital pazarlama hizmetlerimiz hakkında bilgi almak için bizimle iletişime geçin.':'Get in touch with us to learn about our digital marketing services.'}</p>
            {[
              { icon: 'fa-solid fa-location-dot', label: lang==='tr'?'Adres':'Address', value: 'Lefkoşa, Kuzey Kıbrıs' },
              { icon: 'fa-solid fa-phone', label: lang==='tr'?'Telefon':'Phone', value: '+90 392 000 0000' },
              { icon: 'fa-solid fa-envelope', label: lang==='tr'?'E-posta':'Email', value: 'info@cysocial.com' },
              { icon: 'fa-solid fa-clock', label: lang==='tr'?'Çalışma Saatleri':'Working Hours', value: 'Pzt–Cum: 09:00–18:00' },
            ].map(item => (
              <div key={item.label} className="contact-item">
                <div className="contact-ico"><i className={item.icon} /></div>
                <div><strong>{item.label}</strong><span>{item.value}</span></div>
              </div>
            ))}
          </div>
          <div className="contact-form-wrapper reveal">
            {formSuccess ? (
              <div className="form-success">
                <div className="success-icon"><i className="fa-solid fa-circle-check" /></div>
                <h3>{lang==='tr'?'Mesajınız Gönderildi!':'Message Sent!'}</h3>
                <p>{lang==='tr'?'En kısa sürede size dönüş yapacağız.':'We will get back to you as soon as possible.'}</p>
                <button className="btn-primary" onClick={() => setFormSuccess(false)}>{lang==='tr'?'Yeni Mesaj':'New Message'}</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={submitForm} noValidate>
                <div className="form-row">
                  <div className="form-field">
                    <input className={formErrors.name?'error':''} type="text" placeholder={lang==='tr'?'Adınız':'Your Name'} value={formState.name} onChange={e => setFormState(s => ({...s,name:e.target.value}))} onBlur={() => { const e = validateForm(); setFormErrors(prev => ({...prev, name: e.name||''})); }} />
                    {formErrors.name && <span className="field-error">{formErrors.name}</span>}
                  </div>
                  <div className="form-field">
                    <input className={formErrors.email?'error':''} type="email" placeholder={lang==='tr'?'E-posta':'Email'} value={formState.email} onChange={e => setFormState(s => ({...s,email:e.target.value}))} onBlur={() => { const e = validateForm(); setFormErrors(prev => ({...prev, email: e.email||''})); }} />
                    {formErrors.email && <span className="field-error">{formErrors.email}</span>}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <input type="tel" placeholder={lang==='tr'?'Telefon (opsiyonel)':'Phone (optional)'} value={formState.phone} onChange={e => setFormState(s => ({...s,phone:e.target.value}))} />
                  </div>
                  <div className="form-field">
                    <select value={formState.service} onChange={e => setFormState(s => ({...s,service:e.target.value}))}>
                      <option value="">{lang==='tr'?'Hizmet Seçin':'Select Service'}</option>
                      <option>{lang==='tr'?'Sosyal Medya Yönetimi':'Social Media Management'}</option>
                      <option>SEO Optimizasyonu</option>
                      <option>Google Ads</option>
                      <option>{lang==='tr'?'Web Tasarım':'Web Design'}</option>
                      <option>{lang==='tr'?'İçerik Üretimi':'Content Creation'}</option>
                    </select>
                  </div>
                </div>
                <div className="form-field">
                  <textarea className={formErrors.message?'error':''} rows={5} placeholder={lang==='tr'?'Mesajınız...':'Your message...'} value={formState.message} onChange={e => setFormState(s => ({...s,message:e.target.value}))} onBlur={() => { const e = validateForm(); setFormErrors(prev => ({...prev, message: e.message||''})); }} />
                  {formErrors.message && <span className="field-error">{formErrors.message}</span>}
                </div>
                <button type="submit" className="btn-primary btn-full">
                  {lang==='tr'?'Mesaj Gönder':'Send Message'} <i className="fa-solid fa-paper-plane" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="newsletter-bg" />
        <div className="container newsletter-inner reveal">
          <div className="newsletter-text">
            <h2>{tw('newsletter_h2')}</h2>
            <p>{tw('newsletter_p')}</p>
            <span className="newsletter-social-proof"><i className="fa-solid fa-users" /> {lang==='tr'?'1.200+ kişi abone':'1,200+ subscribers'}</span>
          </div>
          <form className="newsletter-form" onSubmit={e => { e.preventDefault(); (e.target as HTMLFormElement).reset(); }}>
            <input type="email" placeholder={lang==='tr'?'E-posta adresiniz...':'Your email address...'} required />
            <button type="submit" className="btn-primary">{tw('newsletter_btn')}</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <a className="logo" href="#"><div className="logo-icon"><i className="fa-solid fa-chart-line" /></div><span className="logo-text">CySocial</span></a>
            <p>{lang==='tr'?"Kıbrıs'ta dijital pazarlama gücü. İşletmenizi büyütmek için buradayız.":'Digital marketing power in Cyprus. We are here to grow your business.'}</p>
            <div className="footer-socials">
              {[['fa-brands fa-facebook-f','#'],['fa-brands fa-instagram','#'],['fa-brands fa-linkedin-in','#'],['fa-brands fa-x-twitter','#'],['fa-brands fa-tiktok','#']].map(([ic,hr]) => (
                <a key={ic} href={hr}><i className={ic} /></a>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h4>{lang==='tr'?'Hızlı Menü':'Quick Menu'}</h4>
            <ul>{['home','about','services','pricing','portfolio','contact'].map(id => <li key={id}><a href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }}>{tw(`nav_${id}`)}</a></li>)}</ul>
          </div>
          <div className="footer-col">
            <h4>{lang==='tr'?'Hizmetler':'Services'}</h4>
            <ul>{services.map(s => <li key={s.title.tr}><a href="#services" onClick={e => { e.preventDefault(); scrollTo('services'); }}>{s.title[lang]||s.title.tr}</a></li>)}</ul>
          </div>
          <div className="footer-col">
            <h4>{lang==='tr'?'İletişim':'Contact'}</h4>
            <ul>
              <li><i className="fa-solid fa-location-dot" /> Lefkoşa, Kuzey Kıbrıs</li>
              <li><i className="fa-solid fa-phone" /> +90 392 000 0000</li>
              <li><i className="fa-solid fa-envelope" /> info@cysocial.com</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 CySocial. {lang==='tr'?'Tüm hakları saklıdır.':'All rights reserved.'} — <span>{lang==='tr'?"Kıbrıs'ta Dijital Güç":'Digital Power in Cyprus'}</span></p>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a className="whatsapp-fab" href="https://wa.me/905000000000" target="_blank" rel="noreferrer" aria-label="WhatsApp">
        <i className="fa-brands fa-whatsapp" />
      </a>

      {/* Back to top */}
      {showTop && (
        <button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
          <i className="fa-solid fa-arrow-up" />
        </button>
      )}
    </>
  );
}
