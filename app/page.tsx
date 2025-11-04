export const revalidate = 1800; // cache 30 min

type OpenMeteoResponse = {
  daily: {
    time: string[];
    precipitation_sum?: number[];
    precipitation_probability_max?: number[];
  };
  daily_units: {
    precipitation_sum?: string;
    precipitation_probability_max?: string;
  };
};

async function fetchNYWeather(): Promise<{ willRain: boolean; precipitationSumMm: number; probabilityMax: number }> {
  const params = new URLSearchParams({
    latitude: String(40.7128),
    longitude: String(-74.006),
    daily: 'precipitation_sum,precipitation_probability_max',
    timezone: 'America/New_York',
    forecast_days: '1'
  });

  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Falha ao obter dados do clima');
  }
  const data: OpenMeteoResponse = await res.json();

  const precipitationSumMm = data.daily.precipitation_sum?.[0] ?? 0;
  const probabilityMax = data.daily.precipitation_probability_max?.[0] ?? 0;
  const willRain = precipitationSumMm > 0 || probabilityMax >= 40;

  return { willRain, precipitationSumMm, probabilityMax };
}

export default async function Page() {
  const { willRain, precipitationSumMm, probabilityMax } = await fetchNYWeather();

  return (
    <main>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Vai chover hoje em Nova York?</h1>
      <p style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0 }}>
        {willRain ? 'Sim ?' : 'N?o ??'}
      </p>
      <div style={{ marginTop: '1rem', color: '#444' }}>
        <p>Probabilidade m?xima: {Math.round(probabilityMax)}%</p>
        <p>Acumulado previsto: {precipitationSumMm.toFixed(1)} mm</p>
        <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>Fonte: Open?Meteo</p>
      </div>
    </main>
  );
}
