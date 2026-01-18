// js/ui.js
import { products } from "./data.js";
import {
  getFavorites,
  toggleFavorite,
  favoritesCount,
  isFavorite
} from "./favorites.js";

/* ================= SEARCH LOGIC ================= */

// elements
const searchInput = document.getElementById("search-input");
const searchBtn = document.querySelector(".search-btn");
const noResults = document.getElementById("no-results");

// category keywords
const categoryKeywords = {
  iphone: ["iphone", "phone"],
  macbook: ["macbook", "mac", "laptop"],
  ipad: ["ipad", "tablet"],
  airpods: ["airpods", "air pods", "pods", "headphones"]
};

function normalize(text) {
  return (text || "").toLowerCase().trim();
}

function resetSearchUI() {
  if (noResults) noResults.hidden = true;

  document.querySelectorAll(".product-card").forEach(card => {
    card.style.display = "";
  });

  if (searchInput) searchInput.value = "";
}

function handleSearch() {
  const query = normalize(searchInput?.value);
  if (!query) return;

  resetSearchUI();

  // 1) category by keywords
  for (const category in categoryKeywords) {
    if (categoryKeywords[category].some(word => query.includes(word))) {
      const navLink = document.querySelector(
        `.nav-link[data-category="${category}"]`
      );
      if (navLink) {
        navLink.click();
        if (searchInput) searchInput.value = "";
        return;
      }
    }
  }

  // 2) product title filter
  const productCards = document.querySelectorAll(".product-card");
  let found = false;

  productCards.forEach(card => {
    const title = normalize(card.querySelector("h3")?.textContent);
    if (title.includes(query)) {
      card.style.display = "";
      found = true;
    } else {
      card.style.display = "none";
    }
  });

  if (noResults) noResults.hidden = found;

  document
    .querySelector(".products")
    ?.scrollIntoView({ behavior: "smooth" });
}

if (searchBtn) searchBtn.addEventListener("click", handleSearch);
if (searchInput) {
  searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter") handleSearch();
  });
}

document.querySelectorAll("[data-category]").forEach(el => {
  el.addEventListener("click", resetSearchUI);
});

/* ================= TOAST ================= */

const toast = document.getElementById("toast");
let toastTimeout = null;

export function showToast(text = "Added to cart") {
  if (!toast) return;

  toast.textContent = text;
  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

/* ================= FAVORITES DRAWER ================= */

const favBtnHeader = document.querySelector(".favorite-btn");
const favDrawer = document.getElementById("fav-drawer");
const favOverlay = document.getElementById("fav-overlay");
const favClose = document.getElementById("fav-close");
const favList = document.getElementById("fav-list");
const favClear = document.getElementById("fav-clear");

function setFavCounter() {
  const counter = document.querySelector(".favorite-btn span");
  if (counter) counter.textContent = favoritesCount();
}

function openFav() {
  if (!favDrawer || !favOverlay) return;
  renderFavoritesDrawer();
  favDrawer.classList.add("open");
  favOverlay.classList.add("open");
  favOverlay.hidden = false;
  favDrawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeFav() {
  if (!favDrawer || !favOverlay) return;
  favDrawer.classList.remove("open");
  favOverlay.classList.remove("open");
  favDrawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  setTimeout(() => {
    if (!favOverlay.classList.contains("open")) favOverlay.hidden = true;
  }, 250);
}

function renderFavoritesDrawer() {
  if (!favList) return;

  const ids = getFavorites(); // array of productId (строки)
  const items = ids
    .map(id => products.find(p => String(p.id) === String(id)))
    .filter(Boolean);

  if (!items.length) {
    favList.innerHTML =
      `<div class="drawer-empty">No favorites yet. Tap ❤ on products.</div>`;
    return;
  }

  favList.innerHTML = items
    .map(p => {
      return `
        <div class="fav-item" data-id="${p.id}">
          <img src="./assets/images/${p.image}" alt="${p.title}">
          <div>
            <div class="fav-item-title">${p.title}</div>
            <div class="fav-item-price">$${p.price.toLocaleString()}</div>
          </div>
          <button class="fav-remove" type="button" aria-label="Remove">✕</button>
        </div>
      `;
    })
    .join("");

  // remove handlers
  favList.querySelectorAll(".fav-item").forEach(row => {
    const id = String(row.dataset.id);
    const removeBtn = row.querySelector(".fav-remove");

    removeBtn.addEventListener("click", e => {
      e.stopPropagation();
      toggleFavorite(id);
      setFavCounter();
      renderFavoritesDrawer();

      // синхронизация сердечек на карточках
      document.querySelectorAll(".fav-card-btn").forEach(btn => {
        const pid = btn.dataset.id;
        btn.classList.toggle("active", isFavorite(pid));
      });
    });

    // click item → open product page
    row.addEventListener("click", () => {
      window.location.href = `product.html?id=${id}`;
    });
  });
}

// open / close events
if (favBtnHeader) favBtnHeader.addEventListener("click", openFav);
if (favOverlay) favOverlay.addEventListener("click", closeFav);
if (favClose) favClose.addEventListener("click", closeFav);

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeFav();
});

// clear all
if (favClear) {
  favClear.addEventListener("click", () => {
    const ids = getFavorites();
    ids.forEach(id => toggleFavorite(id)); // быстрый clear
    setFavCounter();
    renderFavoritesDrawer();

    // обновим сердечки на карточках
    document.querySelectorAll(".fav-card-btn").forEach(btn => {
      const pid = btn.dataset.id;
      btn.classList.toggle("active", isFavorite(pid));
    });
  });
}

// init counter on load
setFavCounter();

// экспортируем, если захочешь открыть drawer из других файлов
export function openFavorites() {
  openFav();
}

export function refreshFavoritesUI() {
  setFavCounter();
  renderFavoritesDrawer();

  // глобальная синхронизация сердечек на карточках
  document.querySelectorAll(".fav-card-btn").forEach(btn => {
    const id = btn.dataset.id;
    btn.classList.toggle("active", isFavorite(id));
  });
}
