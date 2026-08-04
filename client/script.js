import {
  deleteEntry,
  getAllEntries,
  getEntry,
  getTodayEntry,
  saveEntry,
} from "./journal.js";
import { exportMarkdown, exportText, exportPDF } from "./export.js";

let currentEntry = null;
const exportButton = document.getElementById("export-btn");
const exportMenu = document.getElementById("export-menu");

document.addEventListener("DOMContentLoaded", () => {
  setupDateStamp();
  loadDream();
  const deleteBtn = document.getElementById("delete-btn");
  deleteBtn.addEventListener("click", handleDelete);
  document.getElementById("today-btn").addEventListener("click", returnToToday);
});

exportButton.addEventListener("click", () => {
  exportMenu.classList.toggle("open");
});

const exporters = {
  "export-txt": exportText,
  "export-md": exportMarkdown,
  "export-pdf": exportPDF,
};

Object.entries(exporters).forEach(([id, exporter]) => {
  document.getElementById(id).addEventListener("click", () => {
    exporter(currentEntry);
    exportMenu.classList.remove("open");
  });
});

function returnToToday() {
  const todayEntry = getTodayEntry();
  if (!todayEntry) {
    loadDream();
    return;
  }
  if (currentEntry?.id !== todayEntry.id) {
    showEntry(todayEntry);
    displayHistory(getAllEntries());
    return;
  }
  deleteEntry(todayEntry.id);
  currentEntry = null;
  loadDream();
}

function showEntry(entry) {
  currentEntry = entry;
  setupDateStamp(entry.date);
  displayWeather(entry.weather);
  displayDream(entry.title, entry.dream);
}

function showEmptyJournal() {
  currentEntry = null;
  document.getElementById("current-date").textContent = "Awaiting Tomorrow";
  document.getElementById("weather").innerHTML = `...`;
  document.getElementById("dream").innerHTML = `...`;
}

function handleDelete() {
  if (!currentEntry) return;

  const confirmed = confirm(
    `Delete "${currentEntry.title}"?\n\nThis action cannot be undone.`,
  );
  if (!confirmed) return;

  const entries = deleteEntry(currentEntry.id);
  displayHistory(entries);
  if (entries.length === 0) {
    showEmptyJournal();
    return;
  }
  const newestEntry = [...entries].sort((a, b) => b.id.localeCompare(a.id))[0];
  showEntry(newestEntry);
}

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
    <div class="history-tab ${entry.id === currentEntry?.id ? "active" : ""}" data-id="${entry.id}" style="top:${index * 32}px">
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

      historyContainer.querySelectorAll(".history-tab").forEach((tab) => {
        tab.classList.remove("active");
      });
      item.classList.add("active");
      showEntry(entry);
    });
  });
}

async function loadDream() {
  const todayEntry = getTodayEntry();

  displayHistory(getAllEntries());

  if (todayEntry) {
    showEntry(todayEntry);
    displayHistory(getAllEntries());
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
      // const lat = position.coords.latitude;
      // const long = position.coords.longitude;
      const lat = -45.0312;
      const long = 168.6626;
      console.log("Got geolocation:", lat, long);

      try {
        const weatherResponse = await fetch(
          `/api/weather?lat=${lat}&long=${long}`,
        );
        const weatherData = await weatherResponse.json();

        const dreamResponse = await fetch(`/api/dream?lat=${lat}&long=${long}`);
        if (!dreamResponse.ok) throw new Error("Dream API Failed");
        const dreamdata = await dreamResponse.json();

        const date = weatherData.dateTime.split(" ")[0];

        const newEntry = {
          id: date,
          date: date,
          title: dreamdata.title,
          weather: weatherData,
          dream: dreamdata.dream,
        };

        showEntry(newEntry);

        saveEntry(newEntry);

        displayHistory(getAllEntries());

        clearInterval(loadingInterval);
      } catch (error) {
        const dreamContainer = document.getElementById("dream");
        console.error("The pages remain blank: ", error);
        clearInterval(loadingInterval);
        dreamContainer.innerHTML = `<p class="fade-in"><em>The ink has spilled. Could not transcribe the visions from the ether.</em></p>`;
      }
    },
    (error) => {
      const weatherContainer = document.getElementById("weather");
      const dreamContainer = document.getElementById("dream");
      console.error("Cartography error: ", error);
      clearInterval(loadingInterval);
      weatherContainer.innerHTML = `<p class="weather-observation fade-in">Location unknown to the local cartographers.</p>`;
      dreamContainer.innerHTML = `<p class="fade-in"><em>Without a tether to the physical world, the dream cannot be grounded.</em></p>`;
    },
  );
}
