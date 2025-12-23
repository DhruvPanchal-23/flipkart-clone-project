//----------------------------DOM ELEMENTS ---------------------------------
const productGrid = document.querySelector(".product-grid");
const searchInput = document.querySelector(".search-box input");
const searchBtn = document.getElementById("searchBtn");
const sideMenuLinks = document.querySelectorAll(".side-menu a");

//-----------------------------CART UTILITIES--------------------------------
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.querySelector(".cart-count");
  if (cartCount) cartCount.textContent = totalQty;
}

//--------------------------------RENDER PRODUCTS----------------------------------------
function renderProducts(productList) {
  productGrid.innerHTML = "";

  if (productList.length === 0) {
    productGrid.innerHTML = "<p>No products found</p>";
    return;
  }

  productList.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3 class="product-name">${product.name}</h3>
      <div class="product-rating">⭐ ${product.rating}</div>
      <div class="product-price">₹${product.price.toLocaleString()}</div>
      <button class="add-cart" data-id="${product.id}">Add to Cart</button>
    `;

    productGrid.appendChild(card);
  });
}

// ------------------------ INITIAL LOAD ---------------------------------------------
renderProducts(products);
updateCartCount();

// ---------------------------SMART SEARCH  ----------------------------------------
function smartSearch(query) {
  query = query.toLowerCase().trim();

  return products.filter(p => {
    const name = p.name.toLowerCase();
    const category = p.category.toLowerCase();

    // Match product name or category
    if (name.includes(query) || category.includes(query)) return true;

    // Match related keywords
    for (let key in searchKeywords) {
      const keywords = searchKeywords[key].map(word => word.toLowerCase());

      if (query.includes(key.toLowerCase()) || keywords.some(k => query.includes(k))) {
        if (name.includes(key.toLowerCase()) || category.includes(key.toLowerCase())) {
          return true;
        }
      }
    }

    return false;
  });
}

// Event listeners for search
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (!query) {
    renderProducts(products);
    return;
  }
  renderProducts(smartSearch(query));
});

searchInput.addEventListener("keypress", e => {
  if (e.key === "Enter") searchBtn.click();
});

// --------------------------------CATEGORY FILTER -------------------------------
sideMenuLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const category = link.dataset.category;

    if (category === "all") {
      renderProducts(products);
    } else {
      renderProducts(products.filter(p => p.category === category));
    }

    document.getElementById("sideMenu")?.classList.remove("active");
  });
});

//------------------------------------ADD TO CART -----------------------------------------------
productGrid.addEventListener("click", e => {
  if (!e.target.classList.contains("add-cart")) return;

  const productId = Number(e.target.dataset.id);
  const product = products.find(p => p.id === productId);

  let cart = getCart();
  const existing = cart.find(item => item.id === productId);

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
  setTimeout(() => (e.target.textContent = "Add to Cart"), 800);
});