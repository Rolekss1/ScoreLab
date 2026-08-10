import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './OpinionsPage.css';

/* ── Testimonials (marquee) ───────────────────────────────────── */
const testimonials = [
  {
    stars: 5,
    text: '„Zacząłem od poziomu podstawowego i po 3 miesiącach z ScoreLab napisałem maturę na 92%. Polecam każdemu, kto nie lubi się uczyć z podręcznika."',
    initials: 'MK',
    name: 'Mateusz K.',
    meta: 'Matura 2024 · 92%',
  },
  {
    stars: 5,
    text: '„Wreszcie ktoś wytłumaczył funkcje tak, żebym rozumiała. Lekcje są krótkie i konkretne, nie tracę czasu na zbędną teorię. Świetna platforma!"',
    initials: 'ZN',
    name: 'Zofia N.',
    meta: 'Matura 2024 · 88%',
  },
  {
    stars: 5,
    text: '„Arkusze CKE z omówieniem to strzał w dziesiątkę. Przed maturą robiłam po jednym dziennie i dokładnie wiedziałam, czego się spodziewać na egzaminie."',
    initials: 'AP',
    name: 'Aleksandra P.',
    meta: 'Matura 2024 · 96%',
  },
  {
    stars: 5,
    text: '„Bardzo podoba mi się przejrzysty interfejs i system śledzenia postępów. Dzięki temu wiedziałem, na czym muszę się jeszcze skupić."',
    initials: 'JK',
    name: 'Jan K.',
    meta: 'Matura 2024 · 90%',
  },
  {
    stars: 4,
    text: '„Super sprawa z tymi krótkimi wideo. Mogłem uczyć się w drodze do szkoły. Zdecydowanie polecam każdemu maturzyście!"',
    initials: 'PW',
    name: 'Piotr W.',
    meta: 'Matura 2024 · 84%',
  },
  {
    stars: 5,
    text: '„Zawsze miałam problem z prawdopodobieństwem, ale po przerobieniu tego działu na ScoreLab nagle wszystko stało się logiczne."',
    initials: 'KW',
    name: 'Karolina W.',
    meta: 'Matura 2024 · 98%',
  },
  {
    stars: 5,
    text: '„Nie wierzyłem, że można się tak dobrze przygotować do matury przez internet. A jednak! Dziękuję całej ekipie ScoreLab."',
    initials: 'MD',
    name: 'Michał D.',
    meta: 'Matura 2024 · 100%',
  },
  {
    stars: 5,
    text: '„Najlepsza inwestycja przed maturą. Zamiast wydawać fortunę na korepetycje, miałam dostęp do świetnych materiałów 24/7."',
    initials: 'AL',
    name: 'Anna L.',
    meta: 'Matura 2024 · 94%',
  }
]

function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonials__header">
          <div className="section-label">Recenzje</div>
          <h2 className="section-title">Mówią o nas uczniowie</h2>
          <p className="section-subtitle">Ponad 2 400 osób zdało maturę z pomocą ScoreLab. Oto, co o nas mówią.</p>
        </div>
        <div className="testimonials__slider">
          <div className="testimonials__group">
            {testimonials.map(t => (
              <div key={t.name} className="testimonial-card">
                <div className="testimonial-card__stars">
                  {Array.from({ length: t.stars }).map((_, i) => <span key={i}>⭐</span>)}
                </div>
                <p className="testimonial-card__text">{t.text}</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">{t.initials}</div>
                  <div>
                    <div className="testimonial-card__name">{t.name}</div>
                    <div className="testimonial-card__meta">{t.meta}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonials__group" aria-hidden="true">
            {testimonials.map(t => (
              <div key={`${t.name}-copy`} className="testimonial-card">
                <div className="testimonial-card__stars">
                  {Array.from({ length: t.stars }).map((_, i) => <span key={i}>⭐</span>)}
                </div>
                <p className="testimonial-card__text">{t.text}</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">{t.initials}</div>
                  <div>
                    <div className="testimonial-card__name">{t.name}</div>
                    <div className="testimonial-card__meta">{t.meta}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Success stories ──────────────────────────────────────────── */
const successStories = [
  {
    name: 'Kacper',
    tag: 'Matura podstawowa',
    before: 38,
    after: 81,
    quote: 'Zaczynałem praktycznie od zera. Krok po kroku, dział po dziale, w końcu to wszystko zaczęło się układać w całość.',
  },
  {
    name: 'Julia',
    tag: 'Matura rozszerzona',
    before: 52,
    after: 89,
    quote: 'Arkusze CKE z pełnym omówieniem dały mi pewność, że na egzaminie nic mnie już nie zaskoczy.',
  },
  {
    name: 'Bartek',
    tag: 'Poprawka',
    before: 28,
    after: 76,
    quote: 'Po pierwszym podejściu myślałem, że matematyka to po prostu nie dla mnie. ScoreLab pokazał mi, że da się to ogarnąć.',
  },
]

function SuccessStories() {
  return (
    <section className="success-stories">
      <div className="container">
        <div className="section-label">Historie sukcesu</div>
        <h1 className="section-title">Prawdziwe wyniki,<br />prawdziwi uczniowie</h1>
        <p className="section-subtitle">Poznaj kilka historii uczniów, którzy dzięki ScoreLab znacząco poprawili swój wynik.</p>
        <div className="success-stories__grid">
          {successStories.map(s => (
            <div key={s.name} className="success-card">
              <div className="success-card__badge">+{s.after - s.before} pkt</div>
              <div className="success-card__header">
                <div className="success-card__avatar">{s.name.charAt(0)}</div>
                <div>
                  <div className="success-card__name">{s.name}</div>
                  <div className="success-card__tag">{s.tag}</div>
                </div>
              </div>
              <div className="success-card__scores">
                <div className="success-card__score">
                  <span className="success-card__score-value">{s.before}%</span>
                  <span className="success-card__score-label">przed</span>
                </div>
                <span className="success-card__arrow">→</span>
                <div className="success-card__score success-card__score--after">
                  <span className="success-card__score-value">{s.after}%</span>
                  <span className="success-card__score-label">po</span>
                </div>
              </div>
              <div className="success-card__bar">
                <div className="success-card__bar-fill success-card__bar-fill--before" style={{ width: `${s.before}%` }} />
                <div className="success-card__bar-fill" style={{ width: `${s.after}%` }} />
              </div>
              <p className="success-card__quote"><span className="success-card__quote-mark">„</span>{s.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Closing CTA ───────────────────────────────────────────────── */
function ReviewsCTA() {
  return (
    <section className="reviews-cta">
      <div className="container">
        <div className="reviews-cta__badge">★★★★★ 4.9/5 od 2 400+ uczniów</div>
        <h2 className="reviews-cta__title">Chcesz być następną historią sukcesu?</h2>
        <p className="reviews-cta__subtitle">Dołącz do ponad 2 400 uczniów i zacznij naukę już dziś — za darmo, bez karty kredytowej.</p>
        <div className="reviews-cta__actions">
          <Link to="/cennik" className="btn btn-blue">Zacznij za darmo →</Link>
          <Link to="/kursy" className="btn btn-secondary">Zobacz kursy</Link>
        </div>
      </div>
    </section>
  )
}

/* ── Main Page Component ──────────────────────────────────────── */
export default function OpinionsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="opinions-page">
      <SuccessStories />
      <Testimonials />
      <ReviewsCTA />
    </div>
  )
}
