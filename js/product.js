// js/product.js

import { addToCart, isInCart, cartCount } from "./cart.js";
import { showToast, refreshFavoritesUI } from "./ui.js";
import { toggleFavorite, isFavorite, favoritesCount } from "./favorites.js";

let products = [];

// ВАЖНО: путь data.js должен быть рядом с product.js в той же папке /js
try {
  const m = await import("./data.js");
  products = m.products || [];
  console.log("[Product] data.js OK. products:", products.length);
} catch (e) {
  console.error("[Product] FAILED to import ./data.js", e);
  // покажем на странице понятное сообщение
  const nf = document.getElementById("p-not-found");
  const wrap = document.getElementById("p-wrap");
  if (nf) {
    nf.style.display = "block";
    nf.innerHTML = `
      <div class="drawer-empty">
        data.js not loaded ❌<br>
        Check console for error.<br>
        <small>Most common: wrong folder structure or wrong script paths.</small>
      </div>
    `;
  }
  if (wrap) wrap.style.display = "none";
}

function qs(id) { return document.getElementById(id); }
function money(n) { return `$${Number(n || 0).toLocaleString()}`; }

function getIdFromUrl() {
  const p = new URLSearchParams(location.search);
  return p.get("id");
}

function buildKey(productId, selected) {
  return [
    productId,
    selected.color || "-",
    selected.storage || "-",
    selected.ram || "-",
    selected.ssd || "-"
  ].join("|");
}

function renderOptionGroup(title, values, selected, key, onUpdate) {
  const g = document.createElement("div");
  g.className = "option-group";
  g.innerHTML = `<p>${title}</p><div class="options"></div>`;
  const wrap = g.querySelector(".options");

  values.forEach(val => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option";
    btn.textContent = val;

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      [...wrap.children].forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selected[key] = val;
      onUpdate();
    });

    wrap.appendChild(btn);
  });

  // автоселект, если одна опция
  if (values.length === 1) {
    selected[key] = values[0];
    wrap.querySelector(".option")?.classList.add("active");
  }

  return g;
}

function updateHeaderCounters() {
  const cartCounter = document.querySelector(".cart-btn span");
  if (cartCounter) cartCounter.textContent = String(cartCount());

  const favCounter = document.querySelector(".favorite-btn span");
  if (favCounter) favCounter.textContent = String(favoritesCount());
}

const notFound = qs("p-not-found");
const wrap = qs("p-wrap");

const img = qs("p-img");
const titleTop = qs("p-title");
const nameEl = qs("p-name");
const priceEl = qs("p-price");
const oldEl = qs("p-old");
const favBtn = qs("p-fav");
const optionsEl = qs("p-options");
const hint = qs("p-hint");
const addBtn = qs("p-add");

const pid = getIdFromUrl();
console.log("[Product] URL id =", pid);

// если products не загрузился — дальше не идём
if (!Array.isArray(products) || products.length === 0) {
  // уже показали ошибку выше
} else {
  const product = products.find(p => String(p.id) === String(pid));
  console.log("[Product] found =", product);

  let selected = { color: null, storage: null, ram: null, ssd: null };
  let opts = product?.options || {};

  function requiredKeys() {
    const req = [];
    if (opts.colors?.length) req.push("color");
    if (opts.storage?.length) req.push("storage");
    if (opts.ram?.length) req.push("ram");
    if (opts.ssd?.length) req.push("ssd");
    return req;
  }

  function updateUI() {
    if (!product) return;

    const req = requiredKeys();
    const allSelected = req.every(k => selected[k]);
    if (hint) hint.hidden = allSelected;

    const key = buildKey(product.id, selected);
    const hasOptions = req.length > 0;

    if (hasOptions && !allSelected) {
      addBtn.textContent = "Add to cart";
      addBtn.classList.remove("in-cart");
      return;
    }

    const inCart = isInCart(key);
    addBtn.textContent = inCart ? "In cart" : "Add to cart";
    addBtn.classList.toggle("in-cart", inCart);
  }

  function init() {
    if (!product) {
      if (notFound) notFound.style.display = "block";
      if (wrap) wrap.style.display = "none";
      return;
    }

    if (titleTop) titleTop.textContent = product.title;
    if (nameEl) nameEl.textContent = product.title;

    if (img) {
      img.src = `./assets/images/${product.image}`;
      img.alt = product.title;
    }

    if (priceEl) priceEl.textContent = money(product.price);

    if (product.oldPrice) {
      oldEl.style.display = "inline";
      oldEl.textContent = money(product.oldPrice);
    } else {
      oldEl.style.display = "none";
    }

    favBtn.classList.toggle("active", isFavorite(product.id));

    if (optionsEl) {
      optionsEl.innerHTML = "";
      if (opts.colors?.length) optionsEl.appendChild(renderOptionGroup("Color", opts.colors, selected, "color", updateUI));
      if (opts.storage?.length) optionsEl.appendChild(renderOptionGroup("Storage", opts.storage, selected, "storage", updateUI));
      if (opts.ram?.length) optionsEl.appendChild(renderOptionGroup("RAM", opts.ram, selected, "ram", updateUI));
      if (opts.ssd?.length) optionsEl.appendChild(renderOptionGroup("SSD", opts.ssd, selected, "ssd", updateUI));
    }

    favBtn.addEventListener("click", () => {
      toggleFavorite(product.id);
      favBtn.classList.toggle("active", isFavorite(product.id));
      updateHeaderCounters();
      refreshFavoritesUI?.();
    });

    addBtn.addEventListener("click", () => {
      const req = requiredKeys();
      const allSelected = req.every(k => selected[k]);
      const hasOptions = req.length > 0;

      const key = buildKey(product.id, selected);

      if (hasOptions && !allSelected) {
        if (hint) hint.hidden = false;
        return;
      }

      if (isInCart(key)) {
        window.location.href = "cart.html";
        return;
      }

      addToCart({
        key,
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        selected: { ...selected },
        qty: 1
      });

      showToast?.("Added to cart");
      updateHeaderCounters();
      updateUI();
    });

    updateHeaderCounters();
    refreshFavoritesUI?.();
    updateUI();
  }

  init();
}
