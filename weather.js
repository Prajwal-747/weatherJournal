async function getWeather() {
  const city = "California";

  console.log(city);

  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=1&aqi=no&alerts=no`,
  );

  console.log(response);

  const data = await response.json();

  console.log(data);
}

export default getWeather;
