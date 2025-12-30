document.addEventListener("DOMContentLoaded", () => {

  /* ================= DOM ELEMENTS ================= */
  const productGrid = document.querySelector(".product-grid");
  const searchInput = document.querySelector(".search-box input");
  const searchBtn = document.getElementById("searchBtn");
  const sortSelect = document.getElementById("sort-select");
  const cartCount = document.querySelector(".cart-count");
  const categoryLinks = document.querySelectorAll(".categories-container a");

  if (!productGrid || typeof products === "undefined") {
    console.error("Products not loaded");
    return;
  }

  /* ================= CART FUNCTIONS ================= */
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function updateCartCount() {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.textContent = total;
  }

  /* ================= RENDER PRODUCTS ================= */
  function renderProducts(list) {
    productGrid.innerHTML = "";

    if (list.length === 0) {
      productGrid.innerHTML = "<p>No products found</p>";
      return;
    }

    list.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <div class="product-rating">⭐ ${product.rating}</div>
        <div class="product-price">₹${product.price.toLocaleString()}</div>
        <button class="add-cart" data-id="${product.id}">
          Add to Cart
        </button>
      `;

      // Click product → Product Detail Page
      card.addEventListener("click", e => {
        if (e.target.classList.contains("add-cart")) return;
        window.location.href = `product.html?id=${product.id}`;
      });

      productGrid.appendChild(card);
    });
  }

  /* ================= SORT ================= */
  function sortProducts(list, type) {
    const sorted = [...list];

    switch (type) {
      case "price-low-high":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name-a-z":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-z-a":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return sorted;
  }

  /* ================= INITIAL LOAD ================= */
  let currentProducts = [...products];
  renderProducts(currentProducts);
  updateCartCount();

  /* ================= SORT EVENT ================= */
  sortSelect?.addEventListener("change", () => {
    currentProducts = sortProducts(currentProducts, sortSelect.value);
    renderProducts(currentProducts);
  });

  /* ================= SEARCH ================= */
  function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();

    currentProducts = products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );

    renderProducts(currentProducts);
  }

  searchBtn?.addEventListener("click", handleSearch);
  searchInput?.addEventListener("keypress", e => {
    if (e.key === "Enter") handleSearch();
  });

  /* ================= CATEGORY FILTER ================= */
  categoryLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const category = link.dataset.category;

      currentProducts = products.filter(p => p.category === category);
      renderProducts(currentProducts);
    });
  });

  /* ================= ADD TO CART ================= */
  productGrid.addEventListener("click", e => {
    if (!e.target.classList.contains("add-cart")) return;

    const id = Number(e.target.dataset.id);
    const product = products.find(p => p.id === id);
    let cart = getCart();

    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    e.target.textContent = "Added ✓";
    setTimeout(() => e.target.textContent = "Add to Cart", 800);
  });

});