document.addEventListener("DOMContentLoaded", () => {

  // Get ID from URL
  const params = new URLSearchParams(window.location.search);
  const productId = Number(params.get("id"));

  // Find product
  const product = products.find(p => p.id === productId);

  if (!product) {
    document.body.innerHTML = "<h2 style='text-align:center'>Product Not Found</h2>";
    return;
  }

  // Load product
  document.getElementById("productImage").src = product.image;
  document.getElementById("productName").innerText = product.name;
  document.getElementById("productPrice").innerText =
    "₹" + product.price.toLocaleString();
  document.getElementById("productRating").innerText =
    "⭐ " + product.rating;
  document.getElementById("productDescription").innerText =
    `Category: ${product.category.toUpperCase()}
✔ Premium Quality
✔ Flipkart Assured`;

  // Cart Functions
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Update cart count display
  function updateCartCount() {
    const cartCount = document.querySelector(".cart-count");
    if (cartCount) {
      const cart = getCart();
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = total;
    }
  }

  // Initialize cart count on page load
  updateCartCount();

  // Quantity
  let quantity = 1;
  const qtyValue = document.getElementById("quantityValue");

  document.getElementById("qtyPlus").addEventListener("click", () => {
    quantity++;
    qtyValue.innerText = quantity;
  });

  document.getElementById("qtyMinus").addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      qtyValue.innerText = quantity;
    }
  });

  // Add to cart button
  document.getElementById("addToCartBtn").addEventListener("click", () => {
    let cart = getCart();
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }

    saveCart(cart);
    updateCartCount();

    const btn = document.getElementById("addToCartBtn");
    btn.innerText = "Added ✓";
    setTimeout(() => btn.innerText = "Add to Cart", 1000);
  });

});
