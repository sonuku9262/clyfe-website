
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const servicesButton = document.getElementById("servicesButton");
const navDropdown = document.querySelector(".nav-dropdown");

// Mobile menu
menuButton?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "✕" : "☰";
});

// Services dropdown
servicesButton?.addEventListener("click", (event) => {
  event.stopPropagation();
  const isOpen = navDropdown.classList.toggle("open");
  servicesButton.setAttribute("aria-expanded", String(isOpen));
});

// Close dropdown when clicking elsewhere
document.addEventListener("click", (event) => {
  if (navDropdown && !navDropdown.contains(event.target)) {
    navDropdown.classList.remove("open");
    servicesButton?.setAttribute("aria-expanded", "false");
  }
});

// Close mobile menu after selecting a link
navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    if (menuButton) menuButton.textContent = "☰";
  });
});

// Animate sections when they enter the screen
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${(index % 3) * 100}ms`;
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}
