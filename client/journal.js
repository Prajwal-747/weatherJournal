const STORAGE_KEY = "dreamJournal";

export function getAllEntries() {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
        return [];
    }

    return JSON.parse(data);
}

export function saveEntry(entry) {
    const entries = getAllEntries();
    const index = entries.findIndex(existing => existing.id === entry.id);
    if (index !== -1) {
        entries[index] = entry;
    } else {
        entries.push(entry);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function getTodayEntry() {
    const entries = getAllEntries();
    const today = new Date().toISOString().split("T")[0];
    return entries.find(entry => entry.id === today) || null;
}

function clearJournal() {
    
}

