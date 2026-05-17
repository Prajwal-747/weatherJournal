async function getWeather(lat, long) {
  console.log(lat, long);

  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${lat},${long}&days=1&aqi=no&alerts=no`,
  );

  console.log(response);

  const data = await response.json();

  console.log(data);

  const weatherInfo = {
    city: data.location.name,
    region: data.location.region,
    country: data.location.country,
    dateTime: data.location.localtime,
    temperature: data.current.temp_c,
    windSpeed: data.current.wind_kph,
    windDirection: data.current.wind_dir,
    humidity: data.current.humidity,
    feelslike: data.current.feelslike_c,
    cloud: data.current.cloud,
    vis_km: data.current.vis_km,
    will_it_rain: data.current.will_it_rain,
    chance_of_rain: data.current.chance_of_rain,
    will_it_snow: data.current.will_it_snow,
    chance_of_snow: data.current.chance_of_snow,
    maxtemp: data.forecast.forecastday[0].day.maxtemp_c,
    mintemp: data.forecast.forecastday[0].day.mintemp_c,
    avgtemp: data.forecast.forecastday[0].day.avgtemp_c,
    sunrise: data.forecast.forecastday[0].astro.sunrise,
    sunset: data.forecast.forecastday[0].astro.sunset,
    moonrise: data.forecast.forecastday[0].astro.moonrise,
    moonset: data.forecast.forecastday[0].astro.moonset,
    moonphase: data.forecast.forecastday[0].astro.moon_phase,
  };

  console.log(weatherInfo);

  return weatherInfo;
}

export default getWeather;
