import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { usePremium } from '../lib/usePremium';
import { useAdmin } from '../lib/useAdmin';
import { applyStoredTheme } from '../lib/theme';
import './GeneratorPage.css';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

const WIP_RESPONSE = 'Generator jest jeszcze w budowie 🛠️ — pracujemy nad tym, żeby naprawdę analizował arkusze CKE i układał dla Ciebie próbne matury. Zajrzyj tu ponownie wkrótce!';

const allTopics = [
  'Wygeneruj mi próbną maturę z wielomianów.',
  'Ułóż zestaw zadań z ciągów arytmetycznych i geometrycznych.',
  'Chcę arkusz powtórkowy z trygonometrii.',
  'Przygotuj próbną maturę z geometrii analitycznej.',
  'Wygeneruj zadania z rachunku prawdopodobieństwa.',
  'Ułóż arkusz ze stereometrii.',
  'Chcę arkusz mieszany na poziomie rozszerzonym.',
  'Przygotuj krótką kartkówkę z funkcji kwadratowych.',
];

function shuffledTopics(): string[] {
  return [...allTopics].sort(() => Math.random() - 0.5).slice(0, 4);
}

/* ── Full chat app (ChatGPT-style shell) ─────────────────────────── */
function GeneratorApp() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>(shuffledTopics);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, typing]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'user', text: trimmed }]);
    setDraft('');
    setTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'assistant', text: WIP_RESPONSE }]);
      setTyping(false);
    }, 900);
  };

  const startNewChat = () => {
    setMessages([]);
    setDraft('');
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="gen-app">
      <aside className="gen-app__sidebar">
        <div className="gen-app__sidebar-header">
          <span className="gen-app__cap-icon">🎓</span>
          <span>Generator Matur</span>
        </div>

        <button type="button" className="gen-app__new-chat" onClick={startNewChat}>
          <span>+</span> Nowa rozmowa
        </button>

        <input className="gen-app__search" placeholder="Szukaj rozmów…" disabled />

        {!hasMessages ? (
          <div className="gen-app__empty">
            <span className="gen-app__empty-icon">💬</span>
            <div className="gen-app__empty-title">Brak rozmów</div>
            <div className="gen-app__empty-sub">Rozpocznij nową rozmowę</div>
          </div>
        ) : (
          <div className="gen-app__history">
            <button type="button" className="gen-app__history-item gen-app__history-item--active">
              <span>💬</span> {messages[0].text.slice(0, 28)}{messages[0].text.length > 28 ? '…' : ''}
            </button>
          </div>
        )}
      </aside>

      <div className="gen-app__main">
        <div className="gen-app__topbar">
          <span className="gen-app__cap-icon">🎓</span>
          <div>
            <div className="gen-app__topbar-title">Generator Matur AI</div>
            <div className="gen-app__topbar-status"><span className="gen-app__status-dot" /> W budowie</div>
          </div>
        </div>

        <div className="gen-app__body">
          {!hasMessages ? (
            <div className="gen-app__welcome">
              <span className="gen-app__welcome-icon" />
              <h2>Cześć!</h2>
              <p>Jestem generatorem matur AI. Powiedz mi, z jakiego działu chcesz próbny arkusz.</p>
              <div className="gen-app__suggestions">
                {suggestions.map(s => (
                  <button key={s} type="button" className="gen-app__suggestion" onClick={() => send(s)}>
                    <span>📖</span>{s}
                  </button>
                ))}
              </div>
              <button type="button" className="gen-app__refresh" onClick={() => setSuggestions(shuffledTopics())}>
                ↻ Odśwież podpowiedzi
              </button>
            </div>
          ) : (
            <div className="gen-app__messages">
              {messages.map(m => (
                <div key={m.id} className={`gen-bubble gen-bubble--${m.role}`}>
                  {m.role === 'assistant' && <span className="gen-bubble__icon">✨</span>}
                  <span>{m.text}</span>
                </div>
              ))}
              {typing && (
                <div className="gen-bubble gen-bubble--assistant gen-bubble--typing">
                  <span className="gen-bubble__icon">✨</span>
                  <span className="gen-typing"><i /><i /><i /></span>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        <form className="gen-app__composer" onSubmit={e => { e.preventDefault(); send(draft); }}>
          <button type="button" className="gen-app__composer-icon" disabled title="Załączanie plików — wkrótce">+</button>
          <input
            className="gen-app__input"
            placeholder="Napisz wiadomość…"
            value={draft}
            maxLength={300}
            onChange={e => setDraft(e.target.value)}
          />
          <button type="button" className="gen-app__composer-icon" disabled title="Wiadomość głosowa — wkrótce">🎤</button>
          <button type="submit" className="gen-app__send" disabled={!draft.trim() || typing} aria-label="Wyślij">➤</button>
        </form>
        <div className="gen-app__disclaimer">Generator może się mylić — sprawdzaj ważne informacje.</div>
      </div>
    </div>
  );
}

/* ── Access gates ──────────────────────────────────────────────── */
function LoginGate() {
  return (
    <div className="gen-gate">
      <div className="gen-gate__icon">🔒</div>
      <h2 className="gen-gate__title">Zaloguj się, aby skorzystać z generatora</h2>
      <p className="gen-gate__desc">Generator Matur AI jest dostępny dla zalogowanych użytkowników z kontem Premium.</p>
      <Link to="/cennik" className="btn btn-blue">Przejdź do logowania →</Link>
    </div>
  );
}

function PremiumGate() {
  return (
    <div className="gen-gate">
      <div className="gen-gate__icon">👑</div>
      <h2 className="gen-gate__title">Generator Matur AI to funkcja Premium</h2>
      <p className="gen-gate__desc">
        Odblokuj konto Premium, aby uzyskać dostęp do generatora spersonalizowanych, próbnych arkuszy maturalnych.
      </p>
      <Link to="/cennik" className="btn btn-blue">Sprawdź Premium →</Link>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────────── */
export default function GeneratorPage() {
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const premium = usePremium(user?.id);
  const admin = useAdmin(user?.id);

  // Force dark mode on this page only, regardless of the site-wide theme
  // preference — restore whatever theme was actually chosen when leaving.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    return () => applyStoredTheme();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });
  }, []);

  const loading = authLoading || premium.loading || admin.loading;
  const hasAccess = premium.isPremium || admin.isAdmin;

  if (!loading && user && hasAccess) {
    return (
      <div className="generator-page generator-page--app">
        <GeneratorApp />
      </div>
    );
  }

  return (
    <div className="generator-page">
      <div className="container">
        <div className="generator-page__header">
          <div className="section-label" style={{ color: 'var(--blue-light)', background: 'rgba(155, 202, 242, 0.1)' }}>ScoreLab Premium</div>
          <h1 className="section-title">Generator Matur AI</h1>
          <p className="section-subtitle">Twórz spersonalizowane próbne arkusze maturalne i sprawdzaj swoje umiejętności w kilka sekund.</p>
        </div>

        {loading ? (
          <div className="generator-page__loading">Weryfikacja dostępu…</div>
        ) : !user ? (
          <LoginGate />
        ) : (
          <PremiumGate />
        )}
      </div>
    </div>
  );
}
