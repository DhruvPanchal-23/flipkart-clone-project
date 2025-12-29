// ================= PAYMENT PAGE FUNCTIONALITY =================

// ---------------- DOM ELEMENTS ----------------
const deliveryInfoEl = document.getElementById("delivery-info");
const orderItemsEl = document.getElementById("order-items");
const subtotalEl = document.getElementById("subtotal");
const discountEl = document.getElementById("discount");
const deliveryChargesEl = document.getElementById("delivery-charges");
const finalTotalEl = document.getElementById("final-total");
const totalSavingsEl = document.getElementById("total-savings");

const placeOrderBtn = document.getElementById("place-order-btn");
const confirmationModal = document.getElementById("confirmation-modal");
const modalOrderIdEl = document.getElementById("modal-order-id");
const modalTotalEl = document.getElementById("modal-total");

const downloadPdfBtn = document.getElementById("download-pdf-btn");
const continueShoppingBtn = document.getElementById("continue-shopping-btn");

// ---------------- CART UTILITIES ----------------
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function updateCartCount() {
  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const cartCount = document.querySelector(".cart-count");
  if (cartCount) cartCount.textContent = totalQty;
}

// ---------------- USER UTILITIES ----------------
function getCurrentUser() {
  const userId = localStorage.getItem("currentUserId");
  if (!userId) return null;

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  return users.find(u => u.id === userId) || null;
}

// ---------------- LOAD DELIVERY ADDRESS ----------------
function loadDeliveryAddress() {
  const address = JSON.parse(localStorage.getItem("deliveryAddress"));
  const user = getCurrentUser();

  if (!user || !address) {
    deliveryInfoEl.innerHTML = `
      <p style="color:red;font-weight:600">
        Please login and add delivery address.
      </p>
    `;
    placeOrderBtn.disabled = true;
    return;
  }

  deliveryInfoEl.innerHTML = `
    <strong>${user.name}</strong><br>
    ${address.address}<br>
    ${address.city}, ${address.state} - ${address.pincode}<br>
    Phone: ${address.phone}
  `;
}

// ---------------- LOAD ORDER ITEMS (FIXED) ----------------
function loadOrderItems() {
  const cart = getCart();

  if (cart.length === 0) {
    orderItemsEl.innerHTML = `
      <div style="text-align: center; color: #666; padding: 40px 20px;">
        <span class="material-icons" style="font-size: 64px; display: block; margin-bottom: 20px; color: #ddd;">shopping_cart</span>
        <p style="font-size: 18px; margin-bottom: 10px;">Your cart is empty</p>
        <p style="margin-bottom: 20px; color: #999;">Add some products to your cart before proceeding to payment.</p>
        <a href="index.html" style="display: inline-block; padding: 12px 24px; background: #2874f0; color: white; text-decoration: none; border-radius: 6px; font-weight: 500; transition: background 0.3s;">
          <span class="material-icons" style="vertical-align: middle; margin-right: 8px; font-size: 18px;">shopping_bag</span>
          Start Shopping
        </a>
      </div>
    `;
    placeOrderBtn.disabled = true;
    placeOrderBtn.textContent = 'Cart is Empty';
    return;
  }

  let subtotal = 0;
  let html = "";

  cart.forEach(item => {
    const qty = item.quantity || 1;
    const price = Number(item.price) || 0;
    const itemTotal = price * qty;
    subtotal += itemTotal;

    html += `
      <div class="order-item" style="display:flex;gap:15px;margin-bottom:15px;">
        <img src="${item.image || item.img}" 
             style="width:60px;height:60px;object-fit:cover;border-radius:6px;">
        <div style="flex:1">
          <h4 style="margin:0">${item.name || item.title}</h4>
          <p>₹${price} × ${qty}</p>
        </div>
        <strong>₹${itemTotal}</strong>
      </div>
    `;
  });

  orderItemsEl.innerHTML = html;

  const discount = Math.round(subtotal * 0.05);
  const delivery = subtotal > 500 ? 0 : 40;
  const finalTotal = subtotal - discount + delivery;

  subtotalEl.textContent = `₹${subtotal}`;
  discountEl.textContent = `-₹${discount}`;
  deliveryChargesEl.textContent = delivery === 0 ? "FREE" : `₹${delivery}`;
  finalTotalEl.textContent = `₹${finalTotal}`;
  totalSavingsEl.textContent = discount;

  placeOrderBtn.disabled = false;
  placeOrderBtn.textContent = `Place Order - ₹${finalTotal}`;
}

// ---------------- ORDER ID ----------------
function generateOrderId() {
  return "FK" + Date.now();
}

// ---------------- PLACE ORDER ----------------
function placeOrder() {
  const cart = getCart();
  const user = getCurrentUser();
  const address = JSON.parse(localStorage.getItem("deliveryAddress"));

  if (!user || !address || cart.length === 0) {
    alert("Order cannot be placed.");
    return;
  }

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const discount = Math.round(subtotal * 0.05);
  const deliveryCharges = subtotal > 500 ? 0 : 40;
  const finalTotal = subtotal - discount + deliveryCharges;

  const order = {
    orderId: generateOrderId(),
    items: cart,
    customer: user,
    address: address,
    pricing: {
      subtotal,
      discount,
      deliveryCharges,
      finalTotal
    },
    paymentMethod: "Cash on Delivery",
    date: new Date().toISOString(),
    status: "Order Placed"
  };

  // Save orders
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  // IMPORTANT: clear cart AFTER saving order
  localStorage.removeItem("cart");
  updateCartCount();

  // Show confirmation
  modalOrderIdEl.textContent = order.orderId;
  modalTotalEl.textContent = finalTotal;
  confirmationModal.style.display = "flex";

  window.currentOrder = order;
}

// ---------------- PDF GENERATION ----------------
function generatePDF(order) {
  // Format date
  const orderDate = new Date(order.date);
  const formattedDate = orderDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const formattedTime = orderDate.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  // Create order items table rows
  let itemRows = order.items.map(item => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">₹${item.price.toLocaleString()}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity || 1}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">₹${(item.price * (item.quantity || 1)).toLocaleString()}</td>
    </tr>
  `).join("");

  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Invoice - ${order.orderId}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #2874f0;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #2874f0;
            margin: 0;
            font-size: 28px;
        }
        .header p {
            color: #666;
            margin: 5px 0;
        }
        .order-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .order-info h2 {
            margin-top: 0;
            color: #2874f0;
            font-size: 20px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        .info-item {
            margin-bottom: 10px;
        }
        .info-label {
            font-weight: bold;
            color: #333;
        }
        .customer-info, .address-info {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .customer-info h3, .address-info h3 {
            margin-top: 0;
            color: #2874f0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th {
            background: #2874f0;
            color: white;
            padding: 12px;
            text-align: left;
        }
        th:last-child {
            text-align: right;
        }
        .pricing-summary {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
        }
        .pricing-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding: 5px 0;
        }
        .total-row {
            border-top: 2px solid #2874f0;
            padding-top: 10px;
            font-weight: bold;
            font-size: 18px;
            color: #2874f0;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🛒 Flipkart Clone</h1>
        <p>India's Leading Online Shopping Destination</p>
        <h2>Order Invoice</h2>
    </div>

    <div class="order-info">
        <div class="info-grid">
            <div class="info-item">
                <span class="info-label">Order ID:</span> ${order.orderId}
            </div>
            <div class="info-item">
                <span class="info-label">Order Date:</span> ${formattedDate} at ${formattedTime}
            </div>
            <div class="info-item">
                <span class="info-label">Payment Method:</span> ${order.paymentMethod}
            </div>
            <div class="info-item">
                <span class="info-label">Order Status:</span> ${order.status}
            </div>
        </div>
    </div>

    <div class="customer-info">
        <h3>Customer Information</h3>
        <p><strong>Name:</strong> ${order.customer.name}</p>
        <p><strong>Phone:</strong> ${order.address.phone}</p>
    </div>

    <div class="address-info">
        <h3>Delivery Address</h3>
        <p>${order.address.address}</p>
        <p>${order.address.city}, ${order.address.state} - ${order.address.pincode}</p>
        ${order.address.landmark ? `<p><strong>Landmark:</strong> ${order.address.landmark}</p>` : ''}
    </div>

    <h3>Order Items</h3>
    <table>
        <thead>
            <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            ${itemRows}
        </tbody>
    </table>

    <div class="pricing-summary">
        <div class="pricing-row">
            <span>Subtotal:</span>
            <span>₹${order.pricing.subtotal.toLocaleString()}</span>
        </div>
        <div class="pricing-row">
            <span>Discount (5%):</span>
            <span>-₹${order.pricing.discount.toLocaleString()}</span>
        </div>
        <div class="pricing-row">
            <span>Delivery Charges:</span>
            <span>${order.pricing.deliveryCharges === 0 ? 'FREE' : '₹' + order.pricing.deliveryCharges}</span>
        </div>
        <div class="pricing-row total-row">
            <span>Total Amount:</span>
            <span>₹${order.pricing.finalTotal.toLocaleString()}</span>
        </div>
    </div>

    <div class="footer">
        <p>Thank you for shopping with Flipkart Clone!</p>
        <p>For any queries, please contact our customer support.</p>
        <p>© 2025 Flipkart Clone. All rights reserved.</p>
    </div>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `Invoice_${order.orderId}.html`;
  a.click();
}

// ---------------- EVENTS ----------------
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  loadDeliveryAddress();
  loadOrderItems();
});

placeOrderBtn.addEventListener("click", placeOrder);

downloadPdfBtn.addEventListener("click", () => {
  if (window.currentOrder) generatePDF(window.currentOrder);
});

continueShoppingBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

confirmationModal.addEventListener("click", e => {
  if (e.target === confirmationModal) {
    confirmationModal.style.display = "none";
  }
});
