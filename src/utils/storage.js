export const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromStorage = (key) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const getAllStorage = () => {
  return Object.keys(localStorage)
    .map(k => JSON.parse(localStorage.getItem(k)))
    .filter(item => item && item.originalUrl);
};
