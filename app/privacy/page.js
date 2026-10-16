'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DEFAULT_LOCALE, getStoredLocale, setStoredLocale, translations } from '../lib/translations';

export default function PrivacyPage() {
  const [language, setLanguage] = useState(DEFAULT_LOCALE);

  useEffect(() => {
    setLanguage(getStoredLocale());
  }, []);

  useEffect(() => {
    setStoredLocale(language);
  }, [language]);

  const t = translations[language];

  return (
    <main className="privacy-page">
      <div className="privacy-shell">
        <div className="privacy-card privacy-page-card">
          <div className="privacy-header-row">
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

          <div className="privacy-page-title-wrap">
            <h1 className="brand-hero privacy-page-title">{t.privacy.pageTitle}</h1>
          </div>

          <div className="privacy-page-body">
            {t.privacy.paragraphs.map((paragraph) => (
              <p key={paragraph} className="privacy-page-text">{paragraph}</p>
            ))}
          </div>

          <div className="privacy-back-link-wrap">
            <Link href="/" className="privacy-link privacy-back-link">{language === 'cs' ? 'Zpět na přihlášení' : 'Back to login'}</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
