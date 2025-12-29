// Checkout page functionality

// DOM Elements
const deliveryAddressEl = document.getElementById('delivery-address');
const orderItemsEl = document.getElementById('order-items');
const itemCountEl = document.getElementById('item-count');
const totalPriceEl = document.getElementById('total-price');
const discountAmountEl = document.getElementById('discount-amount');
const finalTotalEl = document.getElementById('final-total');
const placeOrderBtn = document.getElementById('place-order-btn');

// Cart utilities
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function updateCartCount() {
  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.querySelector(".cart-count");
  if (cartCount) cartCount.textContent = totalQty;
}

// Load delivery address
function loadDeliveryAddress() {
  const address = JSON.parse(localStorage.getItem('deliveryAddress'));

  if (address) {
    deliveryAddressEl.innerHTML = `
      <p><strong>${address.name}</strong></p>
      <p>${address.address}</p>
      <p>${address.city}, ${address.state} - ${address.pincode}</p>
      <p>Phone: ${address.phone}</p>
      ${address.landmark ? `<p>Landmark: ${address.landmark}</p>` : ''}
    `;
  } else {
    deliveryAddressEl.innerHTML = `
      <p>No delivery address selected. <a href="address.html">Add Address</a></p>
    `;
    placeOrderBtn.disabled = true;
    placeOrderBtn.textContent = 'Add Delivery Address';
  }
}

// Load order items
function loadOrderItems() {
  const cart = getCart();

  if (cart.length === 0) {
    orderItemsEl.innerHTML = '<p>Your cart is empty. <a href="index.html">Continue Shopping</a></p>';
    placeOrderBtn.disabled = true;
    placeOrderBtn.textContent = 'Cart is Empty';
    return;
  }

  orderItemsEl.innerHTML = '';

  cart.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'order-item';
    itemEl.innerHTML = `
      <div class="order-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="order-item-details">
        <h4 class="order-item-name">${item.name}</h4>
        <div class="order-item-price">₹${item.price.toLocaleString()}</div>
        <div class="order-item-quantity">Quantity: ${item.quantity}</div>
      </div>
    `;
    orderItemsEl.appendChild(itemEl);
  });

  updatePriceDetails(cart);
}

// Update price details
function updatePriceDetails(cart) {
  let totalItems = 0;
  let totalPrice = 0;

  if (Array.isArray(cart)) {
    totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  const discount = Math.round(totalPrice * 0.05); // 5% discount
  const discountedTotal = totalPrice - discount;
  const deliveryCharges = 40;
  const finalTotal = discountedTotal + deliveryCharges;

  itemCountEl.textContent = totalItems;
  totalPriceEl.textContent = totalPrice.toLocaleString();
  discountAmountEl.textContent = discount.toLocaleString();
  finalTotalEl.textContent = finalTotal.toLocaleString();
}

// Place order functionality
function placeOrder() {
  const cart = getCart();
  const address = JSON.parse(localStorage.getItem('deliveryAddress'));

  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  if (!address) {
    alert('Please add a delivery address!');
    window.location.href = 'address.html';
    return;
  }

  // Generate order ID
  const orderId = 'ORD' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();

  // Create order object
  const order = {
    orderId: orderId,
    items: cart,
    address: address,
    totalAmount: parseInt(finalTotalEl.textContent.replace(/,/g, '')),
    orderDate: new Date().toISOString(),
    status: 'Confirmed'
  };

  // Save order to localStorage (in a real app, this would be sent to server)
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));

  // Clear cart
  localStorage.removeItem('cart');
  updateCartCount();

  // Redirect to payment page
  window.location.href = 'payment.html';
}

// Continue shopping
function continueShopping() {
  window.location.href = 'index.html';
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  loadDeliveryAddress();
  loadOrderItems();
});
