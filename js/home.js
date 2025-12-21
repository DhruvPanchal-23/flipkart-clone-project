// smaple product card creation and rendering
// Select product grid
const productGrid = document.querySelector(".product-grid");

// Render products
function renderProducts(productList) {
  productGrid.innerHTML = "";

  productList.forEach((product) => {
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

// Initial load (show all products)
renderProducts(products);
//cart 