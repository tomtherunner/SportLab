import { NextResponse } from 'next/server';

async function fetchAllActivities(accessToken) {
  let page = 1;
  let allActivities = [];

  while (true) {
    const response = await fetch(`https://www.strava.com/api/v3/activities?per_page=200&page=${page}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Strava activities request failed');
    }

    const activities = await response.json();
    if (!Array.isArray(activities) || activities.length === 0) {
      break;
    }

    allActivities = [...allActivities, ...activities];

    if (activities.length < 200) {
      break;
    }

    page += 1;
  }

  return allActivities;
}

export async function GET(request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const accessToken = cookieHeader
    .split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith('strava_access_token='))
    ?.split('=')[1];

  if (!accessToken) {
    return NextResponse.json({ error: 'Missing token' }, { status: 401 });
  }

  try {
    const [athlete, activities] = await Promise.all([
      fetch('https://www.strava.com/api/v3/athlete', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
        cache: 'no-store',
      }).then((res) => {
        if (!res.ok) throw new Error('Strava athlete request failed');
        return res.json();
      }),
      fetchAllActivities(accessToken),
    ]);

    return NextResponse.json({ athlete, activities });
  } catch (error) {
    console.error('Strava data route error:', error);
    return NextResponse.json({ error: 'Strava request failed' }, { status: 500 });
  }
}
