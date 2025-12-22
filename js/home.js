//-----------------------DOM ELEMENTS--------------------------------
const productGrid = document.querySelector(".product-grid");
const searchInput = document.querySelector(".search-box input");
const searchBtn = document.getElementById("searchBtn");
const sideMenuLinks = document.querySelectorAll(".side-menu a");

//----------------- RENDER PRODUCTS----------------------------
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
      <button class="add-cart">Add to Cart</button>
    `;

    productGrid.appendChild(card);
  });
}

//--------------------------- INITIAL LOAD (ALL PRODUCTS)---------------------
renderProducts(products);

//---------------------------------SEARCH FUNCTIONALITY--------------------------
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.toLowerCase().trim();

  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(query)
  );

  renderProducts(filtered);
});

//------------------------ Allow Enter key search---------------------------------
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchBtn.click();
});

//------------------ CATEGORY FILTER (HAMBURGER MENU ONLY)------------------------
sideMenuLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const category = link.dataset.category;

    if (category === "all") {
      renderProducts(products);
    } else {
      const filtered = products.filter(
        product => product.category === category
      );
      renderProducts(filtered);
    }

    // Close menu after click
    document.getElementById("sideMenu").classList.remove("active");
    document.querySelector(".overlay")?.classList.remove("active");
  });
});
