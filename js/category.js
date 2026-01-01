document.addEventListener("DOMContentLoaded", () => {

  /* ================= DOM ELEMENTS ================= */
  const productGrid = document.querySelector(".product-grid");
  const sortSelect = document.getElementById("sort-select");
  const cartCount = document.querySelector(".cart-count");
  const sectionTitle = document.querySelector(".section-title");

  if (!productGrid || typeof products === "undefined") {
    console.error("Products not loaded");
    return;
  }

  // Get category from data-category attribute on product-grid
  const category = productGrid.getAttribute("data-category");

  if (!category) {
    console.error("Category not specified");
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
      productGrid.innerHTML = "<p>No products found in this category</p>";
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

      // Click product → Product Detail Page
      card.addEventListener("click", e => {
        if (e.target.classList.contains("add-cart")) return;
        window.location.href = `../product.html?id=${product.id}`;
      });

      productGrid.appendChild(card);
    });
  }

  /* ================= SORT PRODUCTS ================= */
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

  /* ================= FILTER BY CATEGORY ================= */
  let categoryProducts = products.filter(p => p.category === category);

  // Update section title with category name
  if (sectionTitle) {
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
    sectionTitle.textContent = categoryName;
  }

  // Initial render
  renderProducts(categoryProducts);
  updateCartCount();

  /* ================= PRICE RANGE SLIDER (CATEGORY) ================= */
  const priceRange = document.getElementById("price-range");
  const rangeBubble = document.getElementById("rangeBubble");
  const minInput = document.getElementById("minInput");
  const maxInput = document.getElementById("maxInput");

  if (priceRange && rangeBubble && minInput && maxInput) {
    const minPrice = Number(priceRange.min) || 0;
    const catMax = Math.max(...products.filter(p => p.category === category).map(p => p.price));
    priceRange.max = catMax;
    priceRange.min = 0;
    priceRange.value = 0; // 0 means show all in this category

    // set min/max attributes for inputs
    minInput.min = 0;
    minInput.max = catMax;
    maxInput.min = 0;
    maxInput.max = catMax;

    minInput.value = minPrice;
    maxInput.value = catMax;

    const updateBubble = () => {
      const val = Number(priceRange.value);
      const percent = (catMax === minPrice) ? 0 : ((val - minPrice) / (catMax - minPrice)) * 100;
      rangeBubble.style.left = `${percent}%`;
      rangeBubble.textContent = val === 0 ? "All" : `₹${val.toLocaleString()}`;
      if (val !== 0) maxInput.value = val;
    };

    updateBubble();

    const applyFilter = () => {
      const minVal = Number(minInput.value) || 0;
      let maxVal = Number(maxInput.value) || 0;
      const useAll = maxVal === 0;

      if (useAll) {
        categoryProducts = products.filter(p => p.category === category);
      } else {
        if (maxVal < minVal) maxVal = minVal;
        categoryProducts = products.filter(p => p.category === category && p.price >= minVal && p.price <= maxVal);
      }

      categoryProducts = sortProducts(categoryProducts, sortSelect?.value || "default");
      renderProducts(categoryProducts);
    };

    priceRange.addEventListener("input", () => {
      const selectedMax = Number(priceRange.value);
      updateBubble();
      if (selectedMax === 0) {
        maxInput.value = 0;
      } else {
        maxInput.value = selectedMax;
      }
      applyFilter();
    });

    maxInput.addEventListener("input", () => {
      const val = Number(maxInput.value) || 0;
      if (val === 0) priceRange.value = 0; else priceRange.value = Math.min(val, catMax);
      updateBubble();
      applyFilter();
    });

    minInput.addEventListener("input", () => {
      let val = Number(minInput.value) || 0;
      if (val < 0) val = 0;
      if (val > catMax) val = catMax;
      minInput.value = val;
      applyFilter();
    });
  }

  /* ================= SORT EVENT ================= */
  sortSelect?.addEventListener("change", () => {
    categoryProducts = sortProducts(categoryProducts, sortSelect.value);
    renderProducts(categoryProducts);
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
