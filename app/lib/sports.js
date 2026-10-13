export const SPORT_LABELS = {
  cs: {
    Run: 'Běh',
    Walk: 'Chůze',
    Ride: 'Kolo',
    Swim: 'Plavání',
    Hike: 'Turistika',
    Workout: 'Fitness',
    Other: 'Ostatní',
    All: 'Všechny sporty',
  },
  en: {
    Run: 'Run',
    Walk: 'Walk',
    Ride: 'Ride',
    Swim: 'Swim',
    Hike: 'Hike',
    Workout: 'Fitness',
    Other: 'Other',
    All: 'All sports',
  },
};

export const SPORT_TOKEN_MAP = {
  Run: 'Run',
  Walk: 'Walk',
  Ride: 'Ride',
  Swim: 'Swim',
  Hike: 'Hike',
  Workout: 'Workout',
  Other: 'Other',
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
