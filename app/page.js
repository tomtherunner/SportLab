'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_LOCALE, getStoredLocale, setStoredLocale, translations } from './lib/translations';

export default function Home() {
  const [language, setLanguage] = useState(DEFAULT_LOCALE);

  useEffect(() => {
    setLanguage(getStoredLocale());
  }, []);

  useEffect(() => {
    setStoredLocale(language);
  }, [language]);

  const clientId = process.env.STRAVA_CLIENT_ID ?? '286825';
  const redirectUri = process.env.NEXT_PUBLIC_STRAVA_REDIRECT_URI ?? 'http://localhost:3000/api/auth/callback';
  const STRAVA_URL = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&approval_prompt=force&scope=read,activity:read_all`;

  const t = translations[language];

  return (
    <main className="login-page">
      <div className="login-shell">
        <div className="login-accent" />

        <div className="login-header">
          <div className="brand-badge">{t.badgeText}</div>

          <div className="language-switcher login-switcher" aria-label={t.languageToggle}>
            <button
              type="button"
              className={language === 'cs' ? 'active' : ''}
              onClick={() => setLanguage('cs')}
            >
              CZ
            </button>
            <button
              type="button"
              className={language === 'en' ? 'active' : ''}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
          </div>
        </div>

        <div className="login-content">
          <h1 className="brand-hero">{t.heroTitle}</h1>
          <p className="hero-subtitle">{t.heroSubtitle}</p>

          <div className="feature-preview-card">
            <ul className="feature-preview-list">
              {t.featureItems.map((item) => (
                <li key={item}>
                  <span className="checkmark">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="feature-preview-card privacy-card">
            <h2 className="privacy-card-title">{t.privacy.title}</h2>
            <ul className="privacy-list">
              {t.privacy.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <a href="/privacy" className="privacy-link">
            {t.privacy.linkText}
          </a>

          <a href={STRAVA_URL} className="strava-button">
            {t.connectStrava}
          </a>
        </div>
      </div>
    </main>
  );
}