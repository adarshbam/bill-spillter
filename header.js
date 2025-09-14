// Navigation + hamburger menu + modal handling

// ----- Elements -----
const hamburger = document.querySelector(".hamburger");
const toggle = hamburger
  ? hamburger.querySelector('input[type="checkbox"]')
  : null;
const hamburgerBtn = document.querySelector(".hamburger-icon"); // optional separate button
const closeBtn = document.querySelector(".close-btn"); // close button inside menu (if present)
const menuAnchors = document.querySelectorAll(".menu a, .menu button");

// modal elements (question mark modal inside menu)
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const overlay = document.getElementById("modalOverlay");

// ----- Helpers -----
function openMenu() {
  if (!hamburger) return;
  hamburger.classList.add("open");
  if (toggle) toggle.checked = true;
}

function closeMenu() {
  if (!hamburger) return;
  hamburger.classList.remove("open");
  if (toggle) toggle.checked = false;
}

// ----- Menu events -----
if (toggle) {
  // close on Escape when menu open
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      hamburger &&
      hamburger.classList.contains("open")
    ) {
      closeMenu();
    }
  });

  // auto-close when any menu anchor/button clicked
  menuAnchors.forEach((el) => {
    el.addEventListener("click", () => {
      closeMenu();
    });
  });
}

// optional hamburger icon that opens menu (if you have one)
if (hamburgerBtn) {
  hamburgerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openMenu();
  });
}

// close button inside menu
if (closeBtn) {
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    closeMenu();
  });
}

// ----- Modal handling (simple .hidden toggle) -----
if (openModalBtn && closeModalBtn && overlay) {
  openModalBtn.addEventListener("click", () => {
    overlay.classList.remove("hidden");
  });

  closeModalBtn.addEventListener("click", () => {
    overlay.classList.add("hidden");
  });

  // close when clicking the overlay background
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.classList.add("hidden");
  });

  // close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.classList.contains("hidden")) {
      overlay.classList.add("hidden");
    }
  });
}
