export function exportText(entry) {
  if (!entry) {
    console.error("No journal entry selected.");
    return;
  }
  const content = `
${entry.title}
  
Date: ${entry.date}

Meteorological Notes
--------------------
Location: ${entry.weather.city}
Temperature: ${entry.weather.temperature}°C
Humidity: ${entry.weather.humidity}%
Wind: ${entry.weather.windSpeed} km/h
Moon Phase: ${entry.weather.moonphase}

Dream
-----
${entry.dream}
  `.trim();

  const blob = new Blob([content], {
    type: "text/plain",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${entry.date}-${entry.title}.txt`;
  link.click();
  URL.revokeObjectURL(url);
}

export function exportMarkdown(entry) {
  if (!entry) {
    console.error("No journal entry selected.");
    return;
  }
  const content = `
# ${entry.title}
  
**Date:** ${entry.date}

## Meteorological Notes

- **Location:** ${entry.weather.city}
- **Temperature:** ${entry.weather.temperature}°C
- **Humidity:** ${entry.weather.humidity}%
- **Wind:** ${entry.weather.windSpeed} km/h
- **Moon Phase:** ${entry.weather.moonphase}

---

## Dream

${entry.dream}
  `.trim();

  const blob = new Blob([content], {
    type: "text/markdown",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${entry.date}-${entry.title}.md`;
  link.click();
  URL.revokeObjectURL(url);
}
