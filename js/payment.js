// Payment page functionality

// DOM Elements
const orderSummaryEl = document.getElementById('order-summary');
const finalTotalEl = document.getElementById('final-total');
const payNowBtn = document.getElementById('pay-now-btn');
const paymentMethods = document.querySelectorAll('input[name="payment-method"]');

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

// Load order summary
function loadOrderSummary() {
  const cart = getCart();

  if (cart.length === 0) {
    orderSummaryEl.innerHTML = '<p>No items in cart. <a href="index.html">Continue Shopping</a></p>';
    payNowBtn.disabled = true;
    return;
  }

  let html = '';
  let totalAmount = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    totalAmount += itemTotal;

    html += `
      <div class="order-item">
        <div class="item-info">
          <h4>${item.name}</h4>
          <p>₹${item.price.toLocaleString()} x ${item.quantity}</p>
        </div>
        <div class="item-total">₹${itemTotal.toLocaleString()}</div>
      </div>
    `;
  });

  // Add delivery charges and discount
  const discount = Math.round(totalAmount * 0.05);
  const deliveryCharges = 40;
  const finalTotal = totalAmount - discount + deliveryCharges;

  html += `
    <hr>
    <div class="price-breakdown">
      <div class="price-row">
        <span>Subtotal:</span>
        <span>₹${totalAmount.toLocaleString()}</span>
      </div>
      <div class="price-row">
        <span>Discount (5%):</span>
        <span>-₹${discount.toLocaleString()}</span>
      </div>
      <div class="price-row">
        <span>Delivery Charges:</span>
        <span>₹${deliveryCharges}</span>
      </div>
    </div>
  `;

  orderSummaryEl.innerHTML = html;
  finalTotalEl.textContent = finalTotal.toLocaleString();
}

// Handle payment method selection
function handlePaymentMethodChange() {
  const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;

  // Hide all payment detail sections
  document.querySelectorAll('.payment-section:not(.payment-methods)').forEach(section => {
    section.style.display = 'none';
  });

  // Show selected payment method details
  if (selectedMethod === 'card') {
    document.getElementById('card-details').style.display = 'block';
  } else if (selectedMethod === 'upi') {
    document.getElementById('upi-details').style.display = 'block';
  }
  // Net banking and COD don't need additional details
}

// Process payment
function processPayment() {
  const cart = getCart();
  const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;

  if (cart.length === 0) {
    alert('No items in cart!');
    return;
  }

  // Basic validation based on payment method
  if (selectedMethod === 'card') {
    const cardNumber = document.getElementById('card-number').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;
    const cardName = document.getElementById('card-name').value;

    if (!cardNumber || !expiry || !cvv || !cardName) {
      alert('Please fill in all card details!');
      return;
    }
  } else if (selectedMethod === 'upi') {
    const upiId = document.getElementById('upi-id').value;
    if (!upiId) {
      alert('Please enter your UPI ID!');
      return;
    }
  }

  // Generate order ID
  const orderId = 'ORD' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();

  // Create order object
  const order = {
    orderId: orderId,
    items: cart,
    totalAmount: parseInt(finalTotalEl.textContent.replace(/,/g, '')),
    paymentMethod: selectedMethod,
    orderDate: new Date().toISOString(),
    status: 'Payment Successful'
  };

  // Save order to localStorage
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));

  // Clear cart
  localStorage.removeItem('cart');
  updateCartCount();

  // Show success message and redirect
  alert(`Payment successful! Order ID: ${orderId}`);
  window.location.href = 'index.html';
}

// Event listeners
paymentMethods.forEach(method => {
  method.addEventListener('change', handlePaymentMethodChange);
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  loadOrderSummary();
  handlePaymentMethodChange(); // Show default payment method
});