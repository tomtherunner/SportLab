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
    privacy: {
      title: '🔒 Soukromí a vaše data',
      items: [
        'Přihlášení probíhá přes oficiální Strava OAuth.',
        'SportLab nikdy nevidí vaše heslo ke Stravě.',
        'Data jsou načítána přímo ze Stravy pouze za účelem zobrazení statistik a přehledů.',
        'Aktivity nejsou ukládány do samostatné databáze SportLabu.',
        'Data nejsou prodávána ani sdílena s třetími stranami.',
      ],
      linkText: 'Zásady ochrany osobních údajů',
      pageTitle: 'Zásady ochrany osobních údajů',
      paragraphs: [
        'SportLab používá oficiální přihlášení Strava OAuth.',
        'SportLab nikdy nezískává ani neukládá vaše přihlašovací údaje ke Stravě.',
        'Po autorizaci získá SportLab přístup pouze ke čtení dat potřebných pro zobrazení statistik a přehledů.',
        'Data jsou načítána přímo ze Stravy.',
        'Aktivity nejsou ukládány do samostatné databáze SportLabu.',
        'Data nejsou prodávána ani sdílena s třetími stranami.',
      ],
    },
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
    privacy: {
      title: '🔒 Privacy & Your Data',
      items: [
        'Authentication uses official Strava OAuth.',
        'SportLab never sees your Strava password.',
        'Data is retrieved directly from Strava only to display statistics and summaries.',
        'Activities are not stored in a separate SportLab database.',
        'Data is never sold or shared with third parties.',
      ],
      linkText: 'Privacy Policy',
      pageTitle: 'Privacy Policy',
      paragraphs: [
        'SportLab uses official Strava OAuth sign-in.',
        'SportLab never collects or stores your Strava login credentials.',
        'After authorization, SportLab only reads the data required to display statistics and summaries.',
        'Data is loaded directly from Strava.',
        'Activities are not stored in a separate SportLab database.',
        'Data is never sold or shared with third parties.',
      ],
    },
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
