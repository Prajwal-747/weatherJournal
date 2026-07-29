const { jsPDF } = window.jspdf;

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

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

export function exportPDF(entry) {
  if (!entry) {
    console.error("No journal entry selected.");
    return;
  }
  const doc = new jsPDF();
  doc.setFont("times", "bold");
  doc.setFontSize(22);
  doc.text(entry.title, 20, 25);
  doc.setFont("times", "normal");
  doc.setFontSize(11);
  doc.text(formatDate(entry.date), 20, 35);

  doc.line(20, 42, 190, 42);

  doc.setFont("times", "bold");
  doc.setFontSize(16);
  doc.text("Meteorological Notes", 20, 55);

  doc.setFont("times", "normal");
  doc.setFontSize(11);
  doc.text(`Location`, 20, 65);
  doc.text(entry.weather.city, 60, 65);
  doc.text(`Temperature`, 20, 72);
  doc.text(`${entry.weather.temperature}°C`, 60, 72);
  doc.text(`Humidity`, 20, 79);
  doc.text(`${entry.weather.humidity}%`, 60, 79);
  doc.text(`Wind`, 20, 86);
  doc.text(`${entry.weather.windSpeed} km/h`, 60, 86);
  doc.text(`Moon Phase`, 20, 93);
  doc.text(entry.weather.moonphase, 60, 93);

  doc.line(20, 102, 190, 102);

  doc.setFont("times", "bold");
  doc.setFontSize(16);
  doc.text("Dream", 20, 113);

  doc.setFont("times", "normal");
  doc.setFontSize(12);

  const wrappedDream = doc.splitTextToSize(entry.dream, 170);

  doc.text(wrappedDream, 20, 125);

  doc.save(`${entry.date}-${entry.title}.pdf`);
}
