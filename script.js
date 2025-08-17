document.addEventListener('DOMContentLoaded', function() {
  console.log("✅ CC77 website loaded");

  //
});
<main>
    <h2>Welcome to CleanCoin77 (CC77)</h2>
    <p>Current CC77 Price: <span id="cc77-price"></span></p>
</main>

<footer>
    <p>© <span id="year"></span> CleanCoin77</p>
</footer>

document.addEventListener('DOMContentLoaded', function() {
  console.log("✅ CC77 website loaded");

  // Auto-update footer year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // CC77 price placeholder (mock for now)
  const priceEl = document.getElementById("cc77-price");
  if (priceEl) {
    priceEl.textContent = "Loading...";

    // Simulate fetch (replace with real API later)
    setTimeout(() => {
      priceEl.textContent = "$0.77 USD";
    }, 1500);
  }
});
