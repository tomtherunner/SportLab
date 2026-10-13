export const DEFAULT_LOCALE = 'cs';

export const translations = {
  cs: {
    appName: 'SPORTLAB',
    heroTitle: 'SPORTLAB',
    heroSubtitle: 'Minimalistická analytika pro sportovce napojená na Stravu.',
    connectStrava: 'Připojit účet Strava',
    badgeText: 'SL',
    languageToggle: 'CZ | EN',
    featureItems: [
      'Statistiky podle sportů',
      'Roční a měsíční souhrny',
      'Historie aktivit',
      'Přehled výkonů',
    ],
    dashboardTitle: 'Dashboard',
    sport: 'Sport',
    period: 'Období',
    periods: ['Dnes', 'Týden', 'Měsíc', 'Tento rok', 'Posledních 12 měsíců', 'Vše'],
    allSports: 'Všechny sporty',
    lastActivities: 'Poslední aktivity',
    records: 'záznamů',
    loading: 'Načítání dat…',
    noActivities: 'Žádné aktivity pro toto období nebyly nalezeny.',
    noSportBreakdown: 'Žádné sporty v tomto období.',
    summary: {
      distance: 'Vzdálenost',
      longest: 'Nejdelší aktivita',
      movingTime: 'Čas v pohybu',
      user: 'Uživatel',
      activities: 'Aktivit',
    },
    metadata: {
      title: 'SportLab',
      description: 'Minimalistická analytika pro sportovce napojená na Stravu.',
    },
  },
  en: {
    appName: 'SPORTLAB',
    heroTitle: 'SPORTLAB',
    heroSubtitle: 'Minimalist analytics for athletes powered by Strava.',
    connectStrava: 'Connect Strava Account',
    badgeText: 'SL',
    languageToggle: 'CZ | EN',
    featureItems: [
      'Sport statistics',
      'Annual and monthly summaries',
      'Activity history',
      'Performance insights',
    ],
    dashboardTitle: 'Dashboard',
    sport: 'Sport',
    period: 'Period',
    periods: ['Today', 'Week', 'Month', 'This year', 'Last 12 months', 'All'],
    allSports: 'All sports',
    lastActivities: 'Recent activities',
    records: 'records',
    loading: 'Loading data…',
    noActivities: 'No activities were found for this period.',
    noSportBreakdown: 'No sports in this period.',
    summary: {
      distance: 'Distance',
      longest: 'Longest activity',
      movingTime: 'Moving time',
      user: 'User',
      activities: 'Activities',
    },
    metadata: {
      title: 'SportLab',
      description: 'Minimalist analytics for athletes powered by Strava.',
    },
  },
};

export const LANGUAGE_STORAGE_KEY = 'sportlab-language';

export const getStoredLocale = () => {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;

  const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return saved === 'cs' || saved === 'en' ? saved : DEFAULT_LOCALE;
};

export const setStoredLocale = (locale) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
};
