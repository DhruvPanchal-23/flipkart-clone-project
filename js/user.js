// User management utilities for all pages

// Get current logged in user
function getCurrentUser() {
  const userId = localStorage.getItem("currentUserId");
  if (!userId) return null;

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  return users.find(user => user.id === userId) || null;
}

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem("currentUserId") !== null;
}

// Logout user
function logout() {
  localStorage.removeItem("currentUserId");
  updateAuthDisplay();
  // Optional: redirect to home page
  // window.location.href = "index.html";
}

// Update authentication display across all pages
function updateAuthDisplay() {
  const loginSignupEl = document.querySelector('.login-signup');
  if (!loginSignupEl) return;

  const user = getCurrentUser();

  if (user) {
    // User is logged in - show user menu
    loginSignupEl.innerHTML = `
      <div class="user-menu">
        <span class="material-icons">account_circle</span>
        <span class="auth-text">${user.name}</span>
        <div class="user-dropdown">
          <a href="#" onclick="logout()">Logout</a>
        </div>
      </div>
    `;
  } else {
    // User is not logged in - show login link
    loginSignupEl.innerHTML = `
      <a href="login.html" title="Login / Signup">
        <span class="material-icons">account_circle</span>
        <span class="auth-text">Login</span>
      </a>
    `;
  }
}

// Initialize user display when page loads
document.addEventListener('DOMContentLoaded', function() {
  updateAuthDisplay();
});