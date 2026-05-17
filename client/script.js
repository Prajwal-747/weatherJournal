async function loadDream() {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      console.log("Got geolocation:", lat, long);

      const response = await fetch(`/api/dream?lat=${lat}&long=${long}`);
      const data = await response.json();

      const weatherResponse = await fetch(
        `/api/weather?lat=${lat}&long=${long}`,
      );
      const weatherData = await weatherResponse.json();

      console.log(data);

      document.getElementById("dream").innerText = data.dream;
      document.getElementById("weather").innerHTML = `
            <div class="weather-location">
            ${weatherData.city}
            </div>

            <div class="weather-date">
            ${weatherData.dateTime.split(" ")[0]}
            </div>

            <div class="weather-info">

            <p>Temperature: ${weatherData.temperature}°C</p>

            <p>Humidity: ${weatherData.humidity}%</p>

            <p>
                Wind: ${weatherData.windSpeed} m/s, ${weatherData.windDirection}
            </p>

            <p>
                Moon Phase: ${weatherData.moonphase}
            </p>

            </div>;`;
    },
    (error) => {
      console.error("Error getting geolocation:", error);
      document.getElementById("dream").innerText = "Could not access location";
    },
  );
}

loadDream();
