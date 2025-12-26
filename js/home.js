//----------------------------DOM ELEMENTS ---------------------------------
const productGrid = document.querySelector(".product-grid");
const searchInput = document.querySelector(".search-box input");
const searchBtn = document.getElementById("searchBtn");
const sideMenuLinks = document.querySelectorAll(".side-menu a");
const sortSelect = document.getElementById("sort-select");

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
function renderProducts(productList, sortBy = 'default') {
  // Sort the products based on sortBy
  let sortedProducts = [...productList];
  switch (sortBy) {
    case 'price-low-high':
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high-low':
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case 'name-a-z':
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-z-a':
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      // Default order
      break;
  }

  productGrid.innerHTML = "";

  if (sortedProducts.length === 0) {
    productGrid.innerHTML = "<p>No products found</p>";
    return;
  }

  sortedProducts.forEach(product => {
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
const category = productGrid.dataset.category;
let currentProductList = category ? products.filter(p => p.category === category) : products;

renderProducts(currentProductList);
updateCartCount();

// Event listener for sorting
if (sortSelect) {
  sortSelect.addEventListener("change", () => {
    renderProducts(currentProductList, sortSelect.value);
  });
}

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
    currentProductList = category ? products.filter(p => p.category === category) : products;
  } else {
    currentProductList = smartSearch(query);
  }
  renderProducts(currentProductList, sortSelect ? sortSelect.value : 'default');
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
      currentProductList = products;
    } else {
      currentProductList = products.filter(p => p.category === category);
    }

    renderProducts(currentProductList, sortSelect ? sortSelect.value : 'default');

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