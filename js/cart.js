// js/cart.js
const CART_KEY = "neostore_cart_v1";

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function writeCart(list) {
  localStorage.setItem(CART_KEY, JSON.stringify(list));
}

export function getCart() {
  return readCart();
}

export function cartCount() {
  return readCart().reduce((sum, item) => sum + (item.qty || 0), 0);
}

export function isInCart(key) {
  return readCart().some(item => item.key === key);
}

export function addToCart(item) {
  const cart = readCart();
  const idx = cart.findIndex(x => x.key === item.key);

  if (idx !== -1) {
    // если уже есть, просто увеличиваем qty
    cart[idx].qty = (cart[idx].qty || 1) + (item.qty || 1);
  } else {
    cart.push({
      ...item,
      qty: item.qty || 1
    });
  }

  writeCart(cart);
  return cart;
}

export function setQty(key, qty) {
  const cart = readCart();
  const idx = cart.findIndex(x => x.key === key);
  if (idx === -1) return;

  if (qty <= 0) {
    cart.splice(idx, 1);
  } else {
    cart[idx].qty = qty;
  }

  writeCart(cart);
}

export function removeFromCart(key) {
  const cart = readCart().filter(item => item.key !== key);
  writeCart(cart);
}

export function clearCart() {
  writeCart([]);
}
