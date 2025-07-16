export function saveToStorage(code, data) {
  localStorage.setItem(code, JSON.stringify(data));
}

export function getFromStorage(code) {
  return JSON.parse(localStorage.getItem(code));
}

export function updateClicks(code, clickData) {
  const item = getFromStorage(code);
  if (!item) return;
  item.clicks.push(clickData);
  item.clickCount = (item.clickCount || 0) + 1;
  saveToStorage(code, item);
}

export function loadAllUrls() {
  const keys = Object.keys(localStorage);
  return keys.filter(k => k !== 'logs').map(k => JSON.parse(localStorage.getItem(k)));
}
