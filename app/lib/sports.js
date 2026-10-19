export const SPORT_LABELS = {
  cs: {
    Run: 'Běh',
    Walk: 'Chůze',
    Ride: 'Kolo',
    Swimming: 'Plavání',
    Hike: 'Turistika',
    Workout: 'Fitness',
    Skiing: 'Lyžování',
    Other: 'Ostatní',
    All: 'Všechny sporty',
  },
  en: {
    Run: 'Run',
    Walk: 'Walk',
    Ride: 'Ride',
    Swimming: 'Swimming',
    Hike: 'Hike',
    Workout: 'Fitness',
    Skiing: 'Skiing',
    Other: 'Other',
    All: 'All sports',
  },
};

export const SPORT_TOKEN_MAP = {
  Run: 'Run',
  Walk: 'Walk',
  Ride: 'Ride',
  Swim: 'Swimming',
  Hike: 'Hike',
  Workout: 'Workout',
  Other: 'Other',
  Skiing: 'Skiing',
  AlpineSki: 'Skiing',
  BackcountrySki: 'Skiing',
  CrossCountrySki: 'Skiing',
  NordicSki: 'Skiing',
  TrailRun: 'Run',
  MountainBikeRide: 'Ride',
  GravelRide: 'Ride',
  EBikeRide: 'Ride',
  VirtualRide: 'Ride',
  WeightTraining: 'Workout',
};

export const getSportGroupFromStrava = (stravaType) => {
  const sportKey = SPORT_TOKEN_MAP[stravaType] || 'Other';
  return sportKey;
};

export const formatSportName = (sportType, locale = 'cs') => {
  const key = sportType || 'Other';
  const label = SPORT_LABELS[locale]?.[key] || SPORT_LABELS.cs[key] || 'Other';
  return label;
};
