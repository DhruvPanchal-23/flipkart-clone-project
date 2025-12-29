/* ================= USER MANAGEMENT SYSTEM ================= */

// Simple hash function for basic password security (client-side only)
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
}

// Get users from localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

// Save users to localStorage
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Get current logged in user
function getCurrentUser() {
  const userId = localStorage.getItem("currentUserId");
  if (!userId) return null;

  const users = getUsers();
  return users.find(user => user.id === userId) || null;
}

// Set current logged in user
function setCurrentUser(userId) {
  localStorage.setItem("currentUserId", userId);
}

// Logout user
function logout() {
  localStorage.removeItem("currentUserId");
  window.location.href = "index.html";
}

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem("currentUserId") !== null;
}

/* ================= FORM TOGGLE FUNCTIONS ================= */

function showLogin() {
  document.getElementById("login-form").style.display = "block";
  document.getElementById("signup-form").style.display = "none";
  document.querySelectorAll(".tab-btn")[0].classList.add("active");
  document.querySelectorAll(".tab-btn")[1].classList.remove("active");
  clearErrors();
}

function showSignup() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("signup-form").style.display = "block";
  document.querySelectorAll(".tab-btn")[0].classList.remove("active");
  document.querySelectorAll(".tab-btn")[1].classList.add("active");
  clearErrors();
}

function clearErrors() {
  document.getElementById("login-error").textContent = "";
  document.getElementById("signup-error").textContent = "";
}

/* ================= VALIDATION FUNCTIONS ================= */

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function validateUsername(username) {
  return username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
}

/* ================= SIGNUP FUNCTION ================= */

function signup() {
  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById("signup-confirm-password").value;
  const errorEl = document.getElementById("signup-error");

  // Clear previous error
  errorEl.textContent = "";

  // Validation
  if (!name || !email || !username || !password || !confirmPassword) {
    errorEl.textContent = "Please fill in all fields";
    return;
  }

  if (!validateEmail(email)) {
    errorEl.textContent = "Please enter a valid email address";
    return;
  }

  if (!validateUsername(username)) {
    errorEl.textContent = "Username must be at least 3 characters and contain only letters, numbers, and underscores";
    return;
  }

  if (!validatePassword(password)) {
    errorEl.textContent = "Password must be at least 6 characters long";
    return;
  }

  if (password !== confirmPassword) {
    errorEl.textContent = "Passwords do not match";
    return;
  }

  // Check if user already exists
  const users = getUsers();
  const existingUser = users.find(user => user.username === username || user.email === email);

  if (existingUser) {
    errorEl.textContent = "Username or email already exists";
    return;
  }

  // Create new user
  const newUser = {
    id: Date.now().toString(),
    name: name,
    email: email,
    username: username,
    password: simpleHash(password), // Hash password for basic security
    createdAt: new Date().toISOString()
  };

  // Save user
  users.push(newUser);
  saveUsers(users);

  // Auto login after signup
  setCurrentUser(newUser.id);

  // Clear form
  document.getElementById("signup-name").value = "";
  document.getElementById("signup-email").value = "";
  document.getElementById("signup-username").value = "";
  document.getElementById("signup-password").value = "";
  document.getElementById("signup-confirm-password").value = "";

  // Show success and redirect
  alert("Account created successfully! Welcome to Flipkart!");
  window.location.href = "index.html";
}

/* ================= LOGIN FUNCTION ================= */

function login() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;
  const errorEl = document.getElementById("login-error");

  // Clear previous error
  errorEl.textContent = "";

  // Validation
  if (!username || !password) {
    errorEl.textContent = "Please enter username and password";
    return;
  }

  // Find user
  const users = getUsers();
  const user = users.find(u => u.username === username);

  if (!user) {
    errorEl.textContent = "User not found. Please check your username.";
    return;
  }

  // Check password
  if (user.password !== simpleHash(password)) {
    errorEl.textContent = "Invalid password";
    return;
  }

  // Login successful
  setCurrentUser(user.id);

  // Clear form
  document.getElementById("login-username").value = "";
  document.getElementById("login-password").value = "";

  // Redirect to home
  window.location.href = "index.html";
}

/* ================= INITIALIZATION ================= */

document.addEventListener('DOMContentLoaded', function() {
  // Check if user is already logged in
  if (isLoggedIn()) {
    // Redirect to home if already logged in
    window.location.href = "index.html";
  }

  // Add enter key support for forms
  document.getElementById("login-username").addEventListener("keypress", function(e) {
    if (e.key === "Enter") document.getElementById("login-password").focus();
  });

  document.getElementById("login-password").addEventListener("keypress", function(e) {
    if (e.key === "Enter") login();
  });

  document.getElementById("signup-name").addEventListener("keypress", function(e) {
    if (e.key === "Enter") document.getElementById("signup-email").focus();
  });

  document.getElementById("signup-email").addEventListener("keypress", function(e) {
    if (e.key === "Enter") document.getElementById("signup-username").focus();
  });

  document.getElementById("signup-username").addEventListener("keypress", function(e) {
    if (e.key === "Enter") document.getElementById("signup-password").focus();
  });

  document.getElementById("signup-password").addEventListener("keypress", function(e) {
    if (e.key === "Enter") document.getElementById("signup-confirm-password").focus();
  });

  document.getElementById("signup-confirm-password").addEventListener("keypress", function(e) {
    if (e.key === "Enter") signup();
  });
});
