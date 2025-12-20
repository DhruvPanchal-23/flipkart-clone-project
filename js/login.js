/* ================= LOGIN FUNCTION ================= */

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  // Clear previous error
  error.textContent = "";

  // Validation
  if (username === "" || password === "") {
    error.textContent = "Please enter username and password";
    return;
  }

  // Demo credentials (can be changed)
  const storedUser = localStorage.getItem("username");
  const storedPass = localStorage.getItem("password");

  // First-time login (store credentials)
  if (!storedUser && !storedPass) {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("loggedIn", "true");
    window.location.href = "index.html";
    return;
  }

  // Check credentials
  if (username === storedUser && password === storedPass) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "index.html";
  } else {
    error.textContent = "Invalid username or password";
  }
}
