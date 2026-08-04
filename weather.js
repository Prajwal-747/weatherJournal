import { parse } from "dotenv";

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

  weatherInfo.timeOfDay = getTimeOfDay(weatherInfo.dateTime);
  weatherInfo.sunPosition = getSunPosition(
    weatherInfo.dateTime,
    weatherInfo.sunrise,
    weatherInfo.sunset,
  );

  console.log(weatherInfo);

  return weatherInfo;
}

function getTimeOfDay(dateTime) {
  const hour = new Date(dateTime).getHours();

  if (hour >= 5 && hour < 7) return "dawn";
  if (hour >= 7 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 19) return "evening";
  if (hour >= 19 && hour < 20) return "twilight";
  if (hour >= 20 && hour < 24) return "night";
  return "midnight";
}

function getSunPosition(dateTime, sunrise, sunset) {
  const current = parseTime(dateTime);
  const sunriseTime = parseTime12Hour(sunrise);
  const sunsetTime = parseTime12Hour(sunset);

  if (current < sunriseTime) return "before_sunrise";
  if (current < sunriseTime + 30) return "sunrise";
  if (current < sunsetTime) return "day";
  if (current < sunsetTime + 30) return "sunset";
  return "after_sunset";
}

function parseTime(dateTime) {
  const date = new Date(dateTime);
  return date.getHours() * 60 + date.getMinutes();
}

function parseTime12Hour(time) {
  const [clock, period] = time.split(" ");
  let [hour, minute] = clock.split(":").map(Number);

  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  return hour * 60 + minute;
}

export default getWeather;
