// js/favorites.js

const KEY = "neostore_favorites_v1";

function read() {
  try {
    const list = JSON.parse(localStorage.getItem(KEY)) || [];
    // всегда работаем со строками
    return Array.isArray(list) ? list.map(String) : [];
  } catch {
    return [];
  }
}

function write(list) {
  // сохраняем только строки
  localStorage.setItem(KEY, JSON.stringify(list.map(String)));
}

export function getFavorites() {
  return read();
}

export function isFavorite(productId) {
  const id = String(productId);
  return read().includes(id);
}

export function toggleFavorite(productId) {
  const id = String(productId);
  const list = read();
  const idx = list.indexOf(id);

  if (idx === -1) list.push(id);
  else list.splice(idx, 1);

  write(list);
  return list;
}

export function favoritesCount() {
  return read().length;
}
