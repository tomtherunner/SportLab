'use client';

import { useEffect, useMemo, useState } from 'react';
import { DEFAULT_LOCALE, getStoredLocale, setStoredLocale, translations } from '../lib/translations';
import { formatSportName, getSportGroupFromStrava } from '../lib/sports';

const normalizeSport = (stravaType) => getSportGroupFromStrava(stravaType);

const formatDistance = (meters) => {
  if (!meters && meters !== 0) return '0 km';
  return `${(meters / 1000).toFixed(1)} km`;
};

const formatDuration = (seconds) => {
  const totalSeconds = Number(seconds) || 0;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = Math.floor(totalSeconds % 60);

  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${secs}s`;
  return `${secs}s`;
};

const isWithinPeriod = (date, period) => {
  const now = new Date();
  const current = new Date(date);

  if (period === 'today') {
    return current.toDateString() === now.toDateString();
  }

  if (period === 'week') {
    const start = new Date(now);
    start.setHours(0, 0, 0, 0);
    start.setDate(now.getDate() - 6);
    return current >= start;
  }

  if (period === 'month') {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    return current >= start;
  }

  if (period === 'year') {
    const start = new Date(now.getFullYear(), 0, 1);
    return current >= start;
  }

  if (period === 'last12') {
    const start = new Date(now);
    start.setFullYear(now.getFullYear() - 1);
    return current >= start;
  }

  return true;
};

export default function DashboardPage() {
  const [language, setLanguage] = useState(DEFAULT_LOCALE);
  const [period, setPeriod] = useState('all');
  const [selectedSport, setSelectedSport] = useState('all');
  const [athlete, setAthlete] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const savedLanguage = getStoredLocale();
    setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    setStoredLocale(language);
  }, [language]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/strava-data');
        if (!res.ok) {
          window.location.href = '/';
          return;
        }

        const data = await res.json();
        setAthlete(data.athlete);
        setActivities(data.activities || []);
      } catch (error) {
        console.error('Dashboard load failed:', error);
        window.location.href = '/';
      }
    };

    load();
  }, []);

  const t = translations[language];

  const periodOptions = useMemo(
    () => [
      { value: 'today', label: t.periods[0] },
      { value: 'week', label: t.periods[1] },
      { value: 'month', label: t.periods[2] },
      { value: 'year', label: t.periods[3] },
      { value: 'last12', label: t.periods[4] },
      { value: 'all', label: t.periods[5] },
    ],
    [t.periods]
  );

  const sportOptions = useMemo(() => {
    const bySport = new Set(['all']);
    activities.forEach((activity) => bySport.add(normalizeSport(activity.type)));
    return Array.from(bySport).map((sport) => ({
      value: sport,
      label: sport === 'all' ? t.allSports : formatSportName(sport, language),
    }));
  }, [activities, language, t.allSports]);

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const matchesPeriod = isWithinPeriod(activity.start_date, period);
      const sportMatch = selectedSport === 'all' || normalizeSport(activity.type) === selectedSport;
      return matchesPeriod && sportMatch;
    });
  }, [activities, period, selectedSport]);

  const totalDistance = filteredActivities.reduce((sum, activity) => sum + (activity.distance || 0), 0);
  const totalMovingTime = filteredActivities.reduce((sum, activity) => sum + (activity.moving_time || 0), 0);
  const longestDistance = filteredActivities.length
    ? Math.max(...filteredActivities.map((activity) => Number(activity.distance || 0)))
    : 0;

  const sportBreakdown = filteredActivities.reduce((acc, activity) => {
    const sport = normalizeSport(activity.type);
    acc[sport] = (acc[sport] || 0) + (activity.distance || 0);
    return acc;
  }, {});

  const renderedActivities = filteredActivities
    .slice()
    .sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
    .slice(0, 6);

  const activeSportLabel = selectedSport === 'all' ? t.allSports : formatSportName(selectedSport, language);
  const activePeriodLabel = periodOptions.find((item) => item.value === period)?.label || t.periods[5];
  const subtitle = `${activeSportLabel} • ${activePeriodLabel}`;

  const sportDotColors = {
    Run: '#fc4c02',
    Ride: '#3b82f6',
    Walk: '#22c55e',
    Hike: '#8b5cf6',
    Swim: '#14b8a6',
    Workout: '#a855f7',
    Other: '#8a8a90',
  };

  return (
    <main className="sportlab-page">
      <div className="sportlab-shell">
        <div className="sportlab-accent" />

        <header className="sportlab-header">
          <div className="sportlab-brand-wrap">
            <p className="sportlab-kicker">SPORTLAB</p>
            <p className="sportlab-subtitle">{subtitle}</p>
          </div>

          <div className="sportlab-header-actions">
            <div className="language-switcher dashboard-switcher" aria-label={t.languageToggle}>
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
        </header>

        {athlete ? (
          <>
            <section className="summary-section">
              <div className="summary-item">
                <p className="summary-label">{activeSportLabel}</p>
                <h2 className="summary-value">{formatDistance(totalDistance)}</h2>
              </div>

              <div className="summary-divider" />

              <div className="summary-item">
                <p className="summary-label">{t.summary.longest}</p>
                <h2 className="summary-value">{formatDistance(longestDistance)}</h2>
              </div>

              <div className="summary-divider" />

              <div className="summary-item">
                <p className="summary-label">{t.summary.movingTime}</p>
                <h2 className="summary-value">{formatDuration(totalMovingTime)}</h2>
              </div>
            </section>

            <section className="filters-section">
              <div className="filter-group">
                <p className="filter-label">{t.sport}</p>
                <div className="segmented-control sport-grid">
                  {sportOptions.map((sport) => (
                    <button
                      key={sport.value}
                      type="button"
                      className={sport.value === selectedSport ? 'active' : ''}
                      onClick={() => setSelectedSport(sport.value)}
                    >
                      {sport.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <p className="filter-label">{t.period}</p>
                <div className="segmented-control period-grid">
                  {periodOptions.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      className={item.value === period ? 'active' : ''}
                      onClick={() => setPeriod(item.value)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="activities-section">
              <div className="section-heading">
                <h2>{t.lastActivities}</h2>
                <span>
                  {renderedActivities.length} {t.records}
                </span>
              </div>

              <div className="activities-card">
                {renderedActivities.length > 0 ? (
                  renderedActivities.map((activity, index) => {
                    const sportKey = normalizeSport(activity.type);
                    const activityDotColor = sportDotColors[sportKey] || sportDotColors.Other;

                    return (
                      <div key={activity.id}>
                        <div className="activity-row">
                          <div className="activity-main">
                            <div className="activity-title-wrap">
                              <span className="activity-dot" style={{ backgroundColor: activityDotColor }} />
                              <p className="activity-name">{activity.name}</p>
                            </div>
                            <p className="activity-meta">
                              {new Date(activity.start_date).toLocaleDateString(language === 'cs' ? 'cs-CZ' : 'en-US')} · {formatSportName(sportKey, language)}
                            </p>
                          </div>

                          <div className="activity-side">
                            <p className="activity-distance">{formatDistance(activity.distance)}</p>
                            <p className="activity-duration">{formatDuration(activity.moving_time)}</p>
                          </div>
                        </div>

                        {index < renderedActivities.length - 1 && <div className="activity-divider" />}
                      </div>
                    );
                  })
                ) : (
                  <p className="empty-state">{t.noActivities}</p>
                )}
              </div>
            </section>

            <section className="breakdown-section">
              <div className="breakdown-card">
                {Object.entries(sportBreakdown).length > 0 ? (
                  Object.entries(sportBreakdown)
                    .sort(([, a], [, b]) => b - a)
                    .map(([sport, distance], index, arr) => (
                      <div key={sport}>
                        <div className="breakdown-row">
                          <span className="breakdown-label">{formatSportName(sport, language)}</span>
                          <span className="breakdown-value">{formatDistance(distance)}</span>
                        </div>

                        {index < arr.length - 1 && <div className="breakdown-divider" />}
                      </div>
                    ))
                ) : (
                  <p className="empty-state">{t.noSportBreakdown}</p>
                )}
              </div>
            </section>

            <section className="overview-section">
              <div className="overview-list">
                <div className="overview-row">
                  <span className="overview-label">{t.summary.user}</span>
                  <span className="overview-value">
                    {athlete.firstname} {athlete.lastname}
                  </span>
                </div>
                <div className="overview-divider" />

                <div className="overview-row">
                  <span className="overview-label">{t.summary.activities}</span>
                  <span className="overview-value">{filteredActivities.length}</span>
                </div>
                <div className="overview-divider" />

                <div className="overview-row">
                  <span className="overview-label">{t.summary.distance}</span>
                  <span className="overview-value">{formatDistance(totalDistance)}</span>
                </div>
              </div>
            </section>
          </>
        ) : (
          <section className="loading-state">{t.loading}</section>
        )}
      </div>
    </main>
  );
}
