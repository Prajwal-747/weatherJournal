import {
  getAllEntries,
  getEntry,
  getTodayEntry,
  saveEntry,
} from "./journal.js";
import { exportCurrentEntry } from "./export.js";

let currentEntry = null;

document.addEventListener("DOMContentLoaded", () => {
  setupDateStamp();
  loadDream();
});

document.getElementById("export-btn").addEventListener("click", () => {
  exportCurrentEntry(currentEntry);
});

function setupDateStamp(dateString) {
  const dateElement = document.getElementById("current-date");
  const date = dateString ? new Date(dateString + "T00:00:00") : new Date();
  const nth = function (d) {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.getFullYear();

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

function displayWeather(weatherData) {
  const weatherContainer = document.getElementById("weather");

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
}

function displayDream(title, dream) {
  const dreamContainer = document.getElementById("dream");

  const formattedDream = dream
    .split("\n")
    .filter((paragraph) => paragraph.trim() !== "")
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");

  dreamContainer.innerHTML = `
    <div class="dream-paper fade-in">
      <h2 class="dream-title">${title ?? "Untitled Dream"}</h2>
      ${formattedDream}
    </div>
  `;
  console.log(formattedDream);
}

function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function displayHistory(entries) {
  const historyContainer = document.getElementById("history");

  const sortedEntries = [...entries]
    .sort((a, b) => b.id.localeCompare(a.id))
    .slice(0, 9);

  historyContainer.innerHTML = sortedEntries
    .map((entry, index) => {
      const date = new Date(entry.id);
      const day = date.getDate();
      const month = date
        .toLocaleDateString("en-US", {
          month: "short",
        })
        .toUpperCase();
      return `
    <div class="history-tab ${index === 0 ? "active" : ""}" data-id="${entry.id}" style="top:${index * 32}px">
      ${day} ${month}
    </div>
    `;
    })
    .join("");
  historyContainer.querySelectorAll(".history-tab").forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.dataset.id;
      const entry = getEntry(id);
      if (!entry) return;
      currentEntry = entry;

      historyContainer.querySelectorAll(".history-tab").forEach((tab) => {
        tab.classList.remove("active");
      });
      item.classList.add("active");
      displayWeather(entry.weather);
      displayDream(entry.title, entry.dream);
      setupDateStamp(entry.date);
    });
  });
}

async function loadDream() {
  const todayEntry = getTodayEntry();

  displayHistory(getAllEntries());

  if (todayEntry) {
    currentEntry = todayEntry;
    displayWeather(todayEntry.weather);
    displayDream(todayEntry.title, todayEntry.dream);
    return;
  }

  const dreamLoadingPhrases = [
    "Awaiting the muse...",
    "Closing eyes to the waking world...",
    "Tracing patterns in the dark...",
    "The ink is slowly drying...",
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

        displayWeather(weatherData);

        const dreamResponse = await fetch(`/api/dream?lat=${lat}&long=${long}`);
        if (!dreamResponse.ok) throw new Error("Dream API Failed");
        const dreamdata = await dreamResponse.json();

        const date = weatherData.dateTime.split(" ")[0];

        newEntry = {
          id: date,
          date: date,
          title: dreamdata.title,
          weather: weatherData,
          dream: dreamdata.dream,
        };

        currentEntry = newEntry;

        saveEntry(newEntry);

        displayHistory(getAllEntries());

        clearInterval(loadingInterval);

        displayDream(dreamdata.title, dreamdata.dream);
      } catch (error) {
        const dreamContainer = document.getElementById("dream");
        console.error("The pages remain blank: ", error);
        clearInterval(loadingInterval);
        dreamContainer.innerHTML = `<p class="fade-in"><em>The ink has spilled. Could not transcribe the visions from the ether.</em></p>`;
      }
    },
    (error) => {
      const weatherContainer = document.getElementById("weather");
      console.error("Cartography error: ", error);
      clearInterval(loadingInterval);
      weatherContainer.innerHTML = `<p class="weather-observation fade-in">Location unknown to the local cartographers.</p>`;
      dreamContainer.innerHTML = `<p class="fade-in"><em>Without a tether to the physical world, the dream cannot be grounded.</em></p>`;
    },
  );
}
