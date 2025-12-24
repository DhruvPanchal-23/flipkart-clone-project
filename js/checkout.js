// Checkout page functionality

// DOM Elements
const deliveryAddressEl = document.getElementById('delivery-address');
const orderItemsEl = document.getElementById('order-items');
const itemCountEl = document.getElementById('item-count');
const totalPriceEl = document.getElementById('total-price');
const discountAmountEl = document.getElementById('discount-amount');
const finalTotalEl = document.getElementById('final-total');
const placeOrderBtn = document.getElementById('place-order-btn');
const downloadPdfBtn = document.getElementById('download-pdf-btn');
const orderSuccessModal = document.getElementById('order-success-modal');
const orderIdEl = document.getElementById('order-id');

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

  // Show success modal
  orderIdEl.textContent = orderId;
  orderSuccessModal.style.display = 'block';

  // Update button
  placeOrderBtn.style.display = 'none';
  downloadPdfBtn.style.display = 'block';
}

// Download order PDF
function downloadOrderPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Get order data
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const latestOrder = orders[orders.length - 1];

  if (!latestOrder) {
    alert('No order found to generate PDF!');
    return;
  }

  const { orderId, items, address, totalAmount, orderDate } = latestOrder;

  // PDF Header
  doc.setFontSize(20);
  doc.text('Flipkart Order Invoice', 105, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.text(`Order ID: ${orderId}`, 20, 40);
  doc.text(`Order Date: ${new Date(orderDate).toLocaleDateString()}`, 20, 50);

  // Delivery Address
  doc.setFontSize(14);
  doc.text('Delivery Address:', 20, 70);
  doc.setFontSize(12);
  doc.text(`${address.name}`, 20, 80);
  doc.text(`${address.address}`, 20, 90);
  doc.text(`${address.city}, ${address.state} - ${address.pincode}`, 20, 100);
  doc.text(`Phone: ${address.phone}`, 20, 110);

  // Order Items
  doc.setFontSize(14);
  doc.text('Order Items:', 20, 130);

  let yPosition = 140;
  doc.setFontSize(12);

  items.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    doc.text(`${index + 1}. ${item.name}`, 20, yPosition);
    doc.text(`₹${item.price.toLocaleString()} x ${item.quantity} = ₹${itemTotal.toLocaleString()}`, 150, yPosition);
    yPosition += 10;
  });

  // Price Summary
  yPosition += 10;
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = Math.round(subtotal * 0.05);
  const deliveryCharges = 40;

  doc.text(`Subtotal: ₹${subtotal.toLocaleString()}`, 20, yPosition);
  yPosition += 10;
  doc.text(`Discount (5%): -₹${discount.toLocaleString()}`, 20, yPosition);
  yPosition += 10;
  doc.text(`Delivery Charges: ₹${deliveryCharges}`, 20, yPosition);
  yPosition += 10;
  doc.setFontSize(14);
  doc.text(`Total Amount: ₹${totalAmount.toLocaleString()}`, 20, yPosition);

  // Footer
  yPosition += 30;
  doc.setFontSize(10);
  doc.text('Thank you for shopping with Flipkart!', 105, yPosition, { align: 'center' });
  doc.text('For any queries, contact customer support.', 105, yPosition + 10, { align: 'center' });

  // Save PDF
  doc.save(`Flipkart_Order_${orderId}.pdf`);
}

// Continue shopping
function continueShopping() {
  window.location.href = 'index.html';
}

// Close modal when clicking outside
window.onclick = function(event) {
  if (event.target === orderSuccessModal) {
    orderSuccessModal.style.display = 'none';
  }
};

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  loadDeliveryAddress();
  loadOrderItems();
});
