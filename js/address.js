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

  // Validate all fields
  let hasErrors = false;
  const requiredFields = ['name', 'phone', 'pincode', 'city', 'address', 'state'];

  requiredFields.forEach(fieldName => {
    const field = document.getElementById(fieldName);
    if (!addressData[fieldName] || !validateField(field)) {
      hasErrors = true;
    }
  });

  // Additional validation for specific fields
  if (addressData.phone && !/^[6-9]\d{9}$/.test(addressData.phone)) {
    hasErrors = true;
  }

  if (addressData.pincode && !/^\d{6}$/.test(addressData.pincode)) {
    hasErrors = true;
  }

  if (hasErrors) {
    alert('Please fill in all required fields correctly');
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

// Real-time form validation
function validateField(field) {
  const formGroup = field.closest('.form-group');
  const value = field.value.trim();
  let isValid = false;

  switch(field.name) {
    case 'name':
      isValid = value.length >= 2;
      break;
    case 'phone':
      isValid = /^[6-9]\d{9}$/.test(value);
      break;
    case 'pincode':
      isValid = /^\d{6}$/.test(value);
      break;
    case 'city':
      isValid = value.length >= 2;
      break;
    case 'address':
      isValid = value.length >= 10;
      break;
    case 'state':
      isValid = value !== '';
      break;
    default:
      isValid = value.length > 0;
  }

  return isValid;
}

// Add real-time validation to form fields
document.addEventListener('DOMContentLoaded', function() {
  const inputs = addressForm.querySelectorAll('input, textarea, select');

  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });

    input.addEventListener('input', function() {
      // Re-validate field when user types
      if (this.value.trim() !== '') {
        validateField(this);
      }
    });
  });

  // Pre-fill form if address exists
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