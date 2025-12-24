const KEY = "notes_app";

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return undefined;
    return JSON.parse(raw);
  } catch (e) {
    console.warn("Failed to load state:", e);
    return undefined;
  }
}

export function saveState(state) {
  try {
    const persist = {
      auth: state.auth,
      notes: state.notes,
      theme: state.theme,
    };
    localStorage.setItem(KEY, JSON.stringify(persist));
  } catch (e) {
    console.warn("Failed to save state:", e);
  }
}
