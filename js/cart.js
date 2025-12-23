// Cart functionality for cart.html

// DOM Elements
const cartItemsContainer = document.getElementById('cart-items');
const itemCountEl = document.getElementById('item-count');
const totalPriceEl = document.getElementById('total-price');
const finalTotalEl = document.getElementById('final-total');
const discountAmountEl = document.getElementById('discount-amount');

// Cart utilities (same as in home.js)
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

function updateCartCount() {
  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.querySelector(".cart-count");
  if (cartCount) cartCount.textContent = totalQty;
}

// Render cart items
function renderCart() {
  const cart = getCart();
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <h3>Your cart is empty</h3>
        <p>Add items to your cart to see them here</p>
        <a href="index.html" class="continue-shopping">Continue Shopping</a>
      </div>
    `;
    updateTotals([]);
    return;
  }

  cart.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <div class="item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="item-details">
        <h4 class="item-name">${item.name}</h4>
        <div class="item-price">₹${item.price.toLocaleString()}</div>
        <div class="quantity-controls">
          <button class="qty-btn minus" data-id="${item.id}">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="qty-btn plus" data-id="${item.id}">+</button>
        </div>
      </div>
      <div class="item-actions">
        <button class="remove-btn" data-id="${item.id}">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(itemEl);
  });

  updateTotals(cart);
}

// Update price totals
function updateTotals(cart) {
  let totalItems = 0;
  let totalPrice = 0;

  if (Array.isArray(cart)) {
    totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  const discount = Math.round(totalPrice * 0.4); // 40% discount
  const discountedTotal = totalPrice - discount;
  const finalTotal = discountedTotal + 40; // Adding delivery charges

  itemCountEl.textContent = totalItems;
  totalPriceEl.textContent = totalPrice.toLocaleString();
  discountAmountEl.textContent = discount.toLocaleString();
  finalTotalEl.textContent = finalTotal.toLocaleString();
}

// Handle quantity changes and removals
cartItemsContainer.addEventListener('click', e => {
  const cart = getCart();
  const itemId = Number(e.target.dataset.id);

  if (e.target.classList.contains('plus')) {
    const item = cart.find(item => item.id === itemId);
    if (item) item.quantity += 1;
  } else if (e.target.classList.contains('minus')) {
    const item = cart.find(item => item.id === itemId);
    if (item && item.quantity > 1) item.quantity -= 1;
  } else if (e.target.classList.contains('remove-btn')) {
    const index = cart.findIndex(item => item.id === itemId);
    if (index > -1) cart.splice(index, 1);
  }

  saveCart(cart);
});

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderCart();
});
