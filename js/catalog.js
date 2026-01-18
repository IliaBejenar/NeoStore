// js/catalog.js
import { products } from "./data.js";
import { addToCart, isInCart, cartCount } from "./cart.js";
import { showToast, refreshFavoritesUI } from "./ui.js";

/* ================= SAFE OPTIONAL MODULES =================
   Если favorites.js отсутствует/ломается — сайт всё равно работает.
*/
let fav = {
  toggleFavorite: () => {},
  isFavorite: () => false,
  favoritesCount: () => 0
};

try {
  const m = await import("./favorites.js");
  fav = {
    toggleFavorite: m.toggleFavorite,
    isFavorite: m.isFavorite,
    favoritesCount: m.favoritesCount
  };
} catch (e) {
  console.warn("[NeoStore] favorites.js not loaded:", e);
}

const productsGrid = document.getElementById("products-grid");
const categoryLinks = document.querySelectorAll(".nav-link");
const heroButtons = document.querySelectorAll("[data-category]");

/* ================= HELPERS ================= */

function buildKey(productId, selected) {
  return [
    productId,
    selected.color || "-",
    selected.storage || "-",
    selected.ram || "-",
    selected.ssd || "-"
  ].join("|");
}

function renderOptionButtons(container, values, onSelect) {
  container.innerHTML = "";

  values.forEach(val => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option";
    btn.textContent = val;

    btn.addEventListener("click", e => {
      e.stopPropagation();
      [...container.children].forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      onSelect(val);
    });

    container.appendChild(btn);
  });
}

function autoSelectSingleOption(container, values, onSelect) {
  if (!values || values.length !== 1) return;

  const single = values[0];
  onSelect(single);

  const firstBtn = container.querySelector(".option");
  if (firstBtn) firstBtn.classList.add("active");
}

/* ✅ единый апдейтер счетчиков */
function updateHeaderCounters() {
  const cartCounter = document.querySelector(".cart-btn span");
  if (cartCounter) {
    const n = cartCount();
    cartCounter.textContent = String(Number.isFinite(n) ? n : 0);
  }

  const favCounter = document.querySelector(".favorite-btn span");
  if (favCounter) {
    const n = fav.favoritesCount();
    cartCounter;
    favCounter.textContent = String(Number.isFinite(n) ? n : 0);
  }
}

/* ================= RENDER PRODUCTS ================= */

function renderProducts(list) {
  if (!productsGrid) return;

  productsGrid.innerHTML = "";

  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    // ⭐ id как строка, чтобы избежть NaN и несоответствий
    const pid = String(product.id);
    const favActive = fav.isFavorite(pid) ? "active" : "";

    card.innerHTML = `
      <button
        class="fav-card-btn ${favActive}"
        type="button"
        aria-label="Add to favorites"
        data-id="${product.id}"
      >
        ❤
      </button>

      <img src="./assets/images/${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>

      <div class="price">
        $${product.price.toLocaleString()}
        ${
          product.oldPrice
            ? `<span class="old-price">$${product.oldPrice.toLocaleString()}</span>`
            : ""
        }
      </div>

      <div class="product-options"></div>

      <button class="add-to-cart-btn" type="button">Add to cart</button>
      <p class="option-hint" hidden>Please select options</p>
    `;

    const favBtn = card.querySelector(".fav-card-btn");
    const optionsWrap = card.querySelector(".product-options");
    const addBtn = card.querySelector(".add-to-cart-btn");
    const hint = card.querySelector(".option-hint");

    const selected = { color: null, storage: null, ram: null, ssd: null };
    const opts = product.options || {};

    function requiredKeys() {
      const required = [];
      if (opts.colors?.length) required.push("color");
      if (opts.storage?.length) required.push("storage");
      if (opts.ram?.length) required.push("ram");
      if (opts.ssd?.length) required.push("ssd");
      return required;
    }

    function hideHintIfReady() {
      const req = requiredKeys();
      const allSelected = req.every(k => selected[k]);
      if (allSelected) hint.hidden = true;
      return allSelected;
    }

    function updateButton() {
      const key = buildKey(product.id, selected);
      const req = requiredKeys();
      const allSelected = req.every(k => selected[k]);

      if (req.length && !allSelected) {
        addBtn.textContent = "Add to cart";
        addBtn.classList.remove("in-cart");
        return { key, allSelected: false, inCart: false };
      }

      const inCart = isInCart(key);
      addBtn.textContent = inCart ? "In cart" : "Add to cart";
      addBtn.classList.toggle("in-cart", inCart);

      return { key, allSelected: true, inCart };
    }

    /* ---------- FAVORITES ---------- */
    favBtn.addEventListener("click", e => {
      e.stopPropagation();

      fav.toggleFavorite(pid);

      // Обновляем только эту кнопку
      favBtn.classList.toggle("active", fav.isFavorite(pid));

      updateHeaderCounters();

      if (typeof refreshFavoritesUI === "function") {
        refreshFavoritesUI();
      }
    });

    /* ---------- OPTIONS ---------- */
    if (opts.colors?.length) {
      const g = document.createElement("div");
      g.className = "option-group";
      g.innerHTML = `<p>Color</p><div class="options"></div>`;
      optionsWrap.appendChild(g);

      const optionsEl = g.querySelector(".options");

      renderOptionButtons(optionsEl, opts.colors, v => {
        selected.color = v;
        hideHintIfReady();
        updateButton();
      });

      autoSelectSingleOption(optionsEl, opts.colors, v => {
        selected.color = v;
      });
    }

    if (opts.storage?.length) {
      const g = document.createElement("div");
      g.className = "option-group";
      g.innerHTML = `<p>Storage</p><div class="options"></div>`;
      optionsWrap.appendChild(g);

      const optionsEl = g.querySelector(".options");

      renderOptionButtons(optionsEl, opts.storage, v => {
        selected.storage = v;
        hideHintIfReady();
        updateButton();
      });

      autoSelectSingleOption(optionsEl, opts.storage, v => {
        selected.storage = v;
      });
    }

    if (opts.ram?.length) {
      const g = document.createElement("div");
      g.className = "option-group";
      g.innerHTML = `<p>RAM</p><div class="options"></div>`;
      optionsWrap.appendChild(g);

      const optionsEl = g.querySelector(".options");

      renderOptionButtons(optionsEl, opts.ram, v => {
        selected.ram = v;
        hideHintIfReady();
        updateButton();
      });

      autoSelectSingleOption(optionsEl, opts.ram, v => {
        selected.ram = v;
      });
    }

    if (opts.ssd?.length) {
      const g = document.createElement("div");
      g.className = "option-group";
      g.innerHTML = `<p>SSD</p><div class="options"></div>`;
      optionsWrap.appendChild(g);

      const optionsEl = g.querySelector(".options");

      renderOptionButtons(optionsEl, opts.ssd, v => {
        selected.ssd = v;
        hideHintIfReady();
        updateButton();
      });

      autoSelectSingleOption(optionsEl, opts.ssd, v => {
        selected.ssd = v;
      });
    }

    hideHintIfReady();
    updateButton();

    /* ---------- ADD / GO TO CART ---------- */
    addBtn.addEventListener("click", e => {
      e.stopPropagation();

      const { key, allSelected, inCart } = updateButton();
      const hasOptions = Object.keys(opts).length > 0;

      if (inCart) {
        window.location.href = "cart.html";
        return;
      }

      if (hasOptions && !allSelected) {
        hint.hidden = false;
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

      if (typeof showToast === "function") showToast("Added to cart");

      updateButton();
      updateHeaderCounters();
    });

    /* ---------- CARD CLICK ---------- */
    card.addEventListener("click", () => {
      window.location.href = `product.html?id=${product.id}`;
    });

    productsGrid.appendChild(card);
  });
}

/* ================= FILTER ================= */

function filterProducts(category) {
  categoryLinks.forEach(link =>
    link.classList.toggle("active", link.dataset.category === category)
  );

  if (category === "all") renderProducts(products);
  else renderProducts(products.filter(p => p.category === category));
}

/* ================= EVENTS ================= */

categoryLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    filterProducts(link.dataset.category);
  });
});

heroButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterProducts(btn.dataset.category);
    window.scrollTo({ top: 700, behavior: "smooth" });
  });
});

window.addEventListener("storage", () => {
  updateHeaderCounters();
  if (typeof refreshFavoritesUI === "function") refreshFavoritesUI();
});

/* ================= INIT ================= */

renderProducts(products);
updateHeaderCounters();
if (typeof refreshFavoritesUI === "function") refreshFavoritesUI();
  