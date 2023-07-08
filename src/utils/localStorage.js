export const getLocalStorage = key => localStorage.getItem(key);

export const setLocalStorage = (key, item) => {
  localStorage.setItem(key, item);
};
