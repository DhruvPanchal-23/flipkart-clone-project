// Address page functionality

// DOM Elements
const addressForm = document.getElementById('address-form');

// Form validation and submission
addressForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(addressForm);
  const addressData = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    pincode: formData.get('pincode'),
    city: formData.get('city'),
    address: formData.get('address'),
    landmark: formData.get('landmark'),
    state: formData.get('state'),
    isDefault: formData.get('default-address') === 'on'
  };

  // Basic validation
  if (!addressData.name || !addressData.phone || !addressData.pincode ||
      !addressData.city || !addressData.address || !addressData.state) {
    alert('Please fill in all required fields');
    return;
  }

  // Validate phone number (basic check)
  if (!/^[6-9]\d{9}$/.test(addressData.phone)) {
    alert('Please enter a valid 10-digit phone number');
    return;
  }

  // Validate pincode (basic check)
  if (!/^\d{6}$/.test(addressData.pincode)) {
    alert('Please enter a valid 6-digit pincode');
    return;
  }

  // Save address to localStorage
  localStorage.setItem('deliveryAddress', JSON.stringify(addressData));

  // Check if there's a cart with items
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  if (cart.length > 0) {
    // Redirect to payment page if there are items in cart
    window.location.href = 'payment.html';
  } else {
    // Show success message and redirect to home if no cart items
    alert('Address saved successfully! You can now add items to your cart.');
    window.location.href = 'index.html';
  }
});

// Go back to appropriate page
function goBack() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  if (cart.length > 0) {
    // If there are items in cart, go back to checkout
    window.location.href = 'checkout.html';
  } else {
    // If no items in cart, go back to home
    window.location.href = 'index.html';
  }
}

// Pre-fill form if address exists
document.addEventListener('DOMContentLoaded', function() {
  const savedAddress = localStorage.getItem('deliveryAddress');
  if (savedAddress) {
    const addressData = JSON.parse(savedAddress);

    document.getElementById('name').value = addressData.name || '';
    document.getElementById('phone').value = addressData.phone || '';
    document.getElementById('pincode').value = addressData.pincode || '';
    document.getElementById('city').value = addressData.city || '';
    document.getElementById('address').value = addressData.address || '';
    document.getElementById('landmark').value = addressData.landmark || '';
    document.getElementById('state').value = addressData.state || '';
    document.getElementById('default-address').checked = addressData.isDefault || false;
  }
});