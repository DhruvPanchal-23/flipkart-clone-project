const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");

hamburger.addEventListener("click", () => {
  sideMenu.classList.toggle("active");
  overlay.classList.toggle("active");
});

closeBtn.addEventListener("click", () => {
  sideMenu.classList.remove("active");
  overlay.classList.remove("active");
});

overlay.addEventListener("click", () => {
  sideMenu.classList.remove("active");
  overlay.classList.remove("active");
});

/* Close menu when clicking a category */
document.querySelectorAll(".side-menu a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const category = link.getAttribute("data-category");
    
    // Filter products if on home page
    if (typeof products !== 'undefined') {
      const productGrid = document.querySelector(".product-grid");
      if (productGrid) {
        if (category === "all") {
          window.currentProducts = [...products];
        } else {
          window.currentProducts = products.filter(p => p.category === category);
        }
        
        // Re-render products
        if (typeof renderProducts === 'function') {
          renderProducts(window.currentProducts);
        }
      }
    }
    
    sideMenu.classList.remove("active");
    overlay.classList.remove("active");
  });
});

/* Function to toggle menu (for close button) */
function toggleMenu() {
  sideMenu.classList.toggle("active");
  overlay.classList.toggle("active");
}

