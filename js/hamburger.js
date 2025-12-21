const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("sideMenu");

hamburger.addEventListener("click", () => {
  sideMenu.classList.toggle("active");
});

/* Close menu when clicking a category */
document.querySelectorAll(".side-menu a").forEach(link => {
  link.addEventListener("click", (e) => {
    // If category link with data-category attribute, trigger filter
    const category = link.getAttribute("data-category");
    if (category && typeof handleCategoryFilter === 'function') {
      handleCategoryFilter(category);
    }
    sideMenu.classList.remove("active");
  });
});

/* Function to toggle menu (for close button) */
function toggleMenu() {
  sideMenu.classList.toggle("active");
}

