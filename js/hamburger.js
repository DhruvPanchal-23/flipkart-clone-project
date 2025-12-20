const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("sideMenu");

hamburger.addEventListener("click", () => {
  sideMenu.classList.toggle("active");
});

/* Close menu when clicking a category */
document.querySelectorAll(".side-menu a").forEach(link => {
  link.addEventListener("click", () => {
    sideMenu.classList.remove("active");
  });
});

/* Function to toggle menu (for close button) */
function toggleMenu() {
  sideMenu.classList.toggle("active");
}

document.querySelectorAll(".side-menu a").forEach(link => {
  link.addEventListener("click", () => {
    sideMenu.classList.remove("active");
  });
});

