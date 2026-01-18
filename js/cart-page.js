import { cartCount, getCart, setQty, removeFromCart, clearCart } from "./cart.js";
import { showToast } from "./ui.js";

const itemsEl = document.getElementById("cart-items");
const emptyEl = document.getElementById("cart-empty");

const sumItems = document.getElementById("sum-items");
const sumSubtotal = document.getElementById("sum-subtotal");
const sumDelivery = document.getElementById("sum-delivery");
const sumTotal = document.getElementById("sum-total");

const clearBtn = document.getElementById("clear-cart");
const checkoutBtn = document.getElementById("checkout-btn");

function money(n) {
  return `$${Number(n || 0).toLocaleString()}`;
}

function updateHeaderCartCounter() {
  const cartCounter = document.querySelector(".cart-btn span");
  if (cartCounter) cartCounter.textContent = String(cartCount());
}

function render() {
  const cart = getCart(); // ожидаю массив items

  updateHeaderCartCounter();

  if (!cart.length) {
    if (emptyEl) emptyEl.style.display = "block";
    if (itemsEl) itemsEl.innerHTML = "";
    document.querySelector(".cart-layout")?.style && (document.querySelector(".cart-layout").style.display = "none");
    return;
  } else {
    if (emptyEl) emptyEl.style.display = "none";
    document.querySelector(".cart-layout")?.style && (document.querySelector(".cart-layout").style.display = "grid");
  }

  let subtotal = 0;
  let qtyTotal = 0;

  itemsEl.innerHTML = cart.map(item => {
    const price = Number(item.price || 0);
    const qty = Number(item.qty || 1);
    subtotal += price * qty;
    qtyTotal += qty;

    const opts = item.selected
      ? Object.entries(item.selected)
          .filter(([,v]) => v)
          .map(([k,v]) => `${k}: ${v}`)
          .join(" • ")
      : "";

    return `
      <div class="card" style="border:1px solid #eee; border-radius:18px; padding:14px; background:#fff; display:grid; grid-template-columns:90px 1fr auto; gap:14px; align-items:center;">
        <img src="./assets/images/${item.image}" alt="${item.title}" style="width:90px; height:90px; object-fit:contain;" />

        <div>
          <div style="font-weight:800; font-size:14px;">${item.title}</div>
          ${opts ? `<div style="margin-top:6px; font-size:12px; color:#666;">${opts}</div>` : ""}
          <div style="margin-top:8px; font-weight:800;">${money(price)}</div>
        </div>

        <div style="display:grid; gap:10px; justify-items:end;">
          <div style="display:flex; gap:8px; align-items:center;">
            <button class="qty-btn" data-action="dec" data-key="${item.key}" type="button" style="height:34px; width:34px; border-radius:10px; border:1px solid #eee; background:#fff; cursor:pointer;">−</button>
            <strong style="min-width:20px; text-align:center;">${qty}</strong>
            <button class="qty-btn" data-action="inc" data-key="${item.key}" type="button" style="height:34px; width:34px; border-radius:10px; border:1px solid #eee; background:#fff; cursor:pointer;">+</button>
          </div>

          <button class="remove-btn" data-key="${item.key}" type="button" style="height:34px; padding:0 12px; border-radius:10px; border:1px solid #eee; background:#fff; cursor:pointer;">
            Remove
          </button>
        </div>
      </div>
    `;
  }).join("");

  const delivery = subtotal > 0 ? 0 : 0; // можешь поставить 10, если хочешь
  const total = subtotal + delivery;

  sumItems.textContent = String(qtyTotal);
  sumSubtotal.textContent = money(subtotal);
  sumDelivery.textContent = money(delivery);
  sumTotal.textContent = money(total);

  // handlers
  itemsEl.querySelectorAll(".qty-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.key;
      const action = btn.dataset.action;

      const item = getCart().find(x => x.key === key);
      if (!item) return;

      const nextQty = action === "inc" ? (item.qty + 1) : (item.qty - 1);
      setQty(key, nextQty);
      showToast("Updated");
      render();
    });
  });

  itemsEl.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      removeFromCart(btn.dataset.key);
      showToast("Removed");
      render();
    });
  });
}

if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    clearCart();
    showToast("Cart cleared");
    render();
  });
}

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    showToast("Demo checkout ✅");
  });
}

render();
    