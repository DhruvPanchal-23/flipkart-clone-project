document.addEventListener("DOMContentLoaded", () => {

  //---------------------------- DOM ELEMENTS ---------------------------------
  const productGrid = document.querySelector(".product-grid");
  const searchInput = document.querySelector(".search-box input");
  const searchBtn = document.getElementById("searchBtn");
  const sortSelect = document.getElementById("sort-select");
  const sideMenuLinks = document.querySelectorAll(".side-menu a");
  const cartCount = document.querySelector(".cart-count");

  if (!productGrid || typeof products === "undefined") {
    console.error("Product grid or products not loaded");
    return;
  }

  //----------------------------- CART UTILITIES --------------------------------
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }

  function updateCartCount() {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.textContent = total;
  }

  //----------------------------- RENDER PRODUCTS --------------------------------
  function renderProducts(productList, sortBy = "default") {

    let list = [...productList];

    switch (sortBy) {
      case "price-low-high":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name-a-z":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-z-a":
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    productGrid.innerHTML = "";

    if (list.length === 0) {
      productGrid.innerHTML = "<p>No products found</p>";
      return;
    }

    list.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="../${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <div class="product-rating">⭐ ${product.rating}</div>
        <div class="product-price">₹${product.price.toLocaleString()}</div>
        <button class="add-cart" data-id="${product.id}">
          Add to Cart
        </button>
      `;

      productGrid.appendChild(card);
    });
  }

  //-------------------------- INITIAL LOAD -------------------------------------
  const category = productGrid.dataset.category;

  let currentProducts = category
    ? products.filter(p => p.category === category)
    : products;

  renderProducts(currentProducts);
  updateCartCount();

  //-------------------------- SORT ---------------------------------------------
  sortSelect?.addEventListener("change", () => {
    renderProducts(currentProducts, sortSelect.value);
  });

  //-------------------------- SEARCH -------------------------------------------
  searchBtn?.addEventListener("click", () => {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      currentProducts = category
        ? products.filter(p => p.category === category)
        : products;
    } else {
      currentProducts = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    renderProducts(currentProducts, sortSelect?.value);
  });

  searchInput?.addEventListener("keypress", e => {
    if (e.key === "Enter") searchBtn.click();
  });

  //-------------------------- CATEGORY MENU ------------------------------------
  sideMenuLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const cat = link.dataset.category;

      currentProducts = cat === "all"
        ? products
        : products.filter(p => p.category === cat);

      renderProducts(currentProducts, sortSelect?.value);
    });
  });

  //-------------------------- ADD TO CART --------------------------------------
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

    saveCart(cart);

    e.target.textContent = "Added ✓";
    setTimeout(() => e.target.textContent = "Add to Cart", 800);
  });

});