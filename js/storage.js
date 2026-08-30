// storage.js - safe localStorage helpers
const STORAGE_PREFIX = 'iyf_week7_';

export function save(key, data) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save to storage', e);
  }
}

export function load(key, defaultValue = null) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch (e) {
    console.error('Failed to load from storage', e);
    return defaultValue;
  }
}

export function remove(key) {
  try {
    localStorage.removeItem(STORAGE_PREFIX + key);
  } catch (e) {
    console.error('Failed to remove from storage', e);
  }
}
