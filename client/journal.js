const STORAGE_KEY = "dreamJournal";

function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function getAllEntries() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
}

export function saveEntry(entry) {
  const entries = getAllEntries();
  const index = entries.findIndex((existing) => existing.id === entry.id);
  if (index >= 0) {
    entries[index] = entry;
  } else {
    entries.push(entry);
  }
  saveEntries(entries);
}

export function getTodayEntry() {
  const today = new Date().toISOString().split("T")[0];
  return getEntry(today);
}

export function getEntry(id) {
  const entries = getAllEntries();
  return entries.find((entry) => entry.id === id) || null;
}

export function deleteEntry(id) {
  const entries = getAllEntries().filter((entry) => entry.id !== id);
  saveEntries(entries);
  return entries;
}
