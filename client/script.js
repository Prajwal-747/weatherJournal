document.addEventListener('DOMContentLoaded', () => {
  setupDateStamp();
  loadDream();
});

function setupDateStamp() {
  const dateElement = document.getElementById('current-date');
  const today = new Date();
  const nth = function(d) {
    if (d>3 && d<21) return 'th';
    switch (d%10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  }

  const day = today.getDate();
  const month = today.toLocaleDateString('en-US', {month: 'long'});
  const year = today.getFullYear();

  dateElement.textContent = `${month} ${day}${nth(day)}, ${year}`;
}

function startAtmosphericLoading(elementId, phrases) {
  const element = document.getElementById(elementId);
  let index = 0;
  element.innerHTML = `<p class="fade-in"><em>${phrases[0]}</em></p>`;
  const interval = setInterval(() => {
    index = (index + 1) % phrases.length;
    element.innerHTML = `<p class="fade-in"><em>${phrases[index]}</em></p>`;
  }, 4500);
  return interval;
}

async function loadDream() {
  const weatherContainer = document.getElementById("weather");
  const dreamContainer = document.getElementById("dream");
  
  const dreamLoadingPhrases = [
    "Awaiting the muse...",
    "Closing eyes to the waking world...",
    "Tracing patterns in the dark...",
    "The ink is slowly drying..."
  ];

  const loadingInterval = startAtmosphericLoading("dream", dreamLoadingPhrases);
  
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      console.log("Got geolocation:", lat, long);

      try {
        const weatherResponse = await fetch(
          `/api/weather?lat=${lat}&long=${long}`,
        );
        const weatherData = await weatherResponse.json();

        weatherContainer.innerHTML = `
          <p class="weather-observation fade-in">
              "Observations recorded in ${weatherData.city}"
          </p>
          <div class="weather-data fade-in">
            <div>
              <strong>Temperature</strong>
              <span>${weatherData.temperature}°C</span>
            </div>
            <div>
              <strong>Humidity</strong>
              <span>${weatherData.humidity}%</span>
            </div>
            <div>
              <strong>Wind</strong>
              <span>${weatherData.windSpeed} km/h</span>
            </div>
            <div>
              <strong>Moon Phase</strong>
              <span>${weatherData.moonphase}</span>
            </div>
          </div>
        `;
   
        const dreamResponse = await fetch(`/api/dream?lat=${lat}&long=${long}`);
        if (!dreamResponse.ok) throw new Error("Dream API Failed");
        const dreamdata = await dreamResponse.json();

        clearInterval(loadingInterval);

        const formattedDream = dreamdata.dream
          .split('\n')
          .filter(paragraph => paragraph.trim() !== '')
          .map(paragraph => `<p>${paragraph}</p>`)
          .join('');

        dreamContainer.innerHTML = `<div class="fade-in">${formattedDream}</div>`;
        console.log(formattedDream);
      } catch (error) {
        console.error("The pages remain blank: ", error);
        clearInterval(loadingInterval);
        dreamContainer.innerHTML = `<p class="fade-in"><em>The ink has spilled. Could not transcribe the visions from the ether.</em></p>`
      }
    },
    (error) => {
      console.error("Cartography error: ", error);
      clearInterval(loadingInterval);
      weatherContainer.innerHTML = `<p class="weather-observation fade-in">Location unknown to the local cartographers.</p>`;
      dreamContainer.innerHTML = `<p class="fade-in"><em>Without a tether to the physical world, the dream cannot be grounded.</em></p>`;
    },
  );
}
