/**
 * Spirit&Bone - Main JavaScript Entry Point
 * Initializes all modules and handles main event listeners
 */

// Clear the URL hash if it's #home
if (window.location.hash === "#home") {
  history.replaceState(null, null, window.location.pathname);
}

// Reset scroll position on page load
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// Import all modules with fixed paths
import { initVideoReveal } from "/Pl4y-Studio/SB-video-reveal.js";
import { initNavigation } from "/Pl4y-Studio/SB-navigation.js";
import { initScrollEffects } from "/Pl4y-Studio/SB-scroll-effect.js";
import { initTeamSection } from "/Pl4y-Studio/SB-team-members.js";
import { initContactForm } from "/Pl4y-Studio/SB-contact-form.js";

// Create page transition element
const pageTransition = document.createElement("div");
pageTransition.className = "page-transition";
document.body.appendChild(pageTransition);

// Add pulse animation style
const style = document.createElement("style");
style.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(192, 0, 1, 0.7); }
    70% { transform: scale(1.2); box-shadow: 0 0 0 10px rgba(192, 0, 1, 0); }
    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(192, 0, 1, 0); }
  }
  .circle.pulse { animation: pulse 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
  .contact-section { margin-bottom: 0 !important; padding-bottom: 0 !important; }
  footer { margin-bottom: 0 !important; position: relative !important; bottom: 0 !important; }
  #contact { position: relative; margin-bottom: 0 !important; }
  body { margin-bottom: 0 !important; padding-bottom: 0 !important; overflow-x: hidden; }
  html { margin-bottom: 0 !important; padding-bottom: 0 !important; }
`;
document.head.appendChild(style);

// Reset scroll position to top on page load/reload
window.onload = function () {
  // Force scroll to top
  window.scrollTo(0, 0);

  // Also try with a small delay to ensure it happens after any other scripts
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 50);
};

// Helper function to update active indicator
// This function needs to be defined BEFORE it's exported and used by other modules
function updateActiveIndicator(sectionId) {
  const indicatorDots = document.querySelectorAll(".indicator-dot");
  indicatorDots.forEach((dot) => {
    dot.classList.toggle(
      "active",
      dot.getAttribute("data-section") === sectionId
    );
  });
}

// Initialize all modules when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing modules..."); // Debug log

  // Force scroll to top
  window.scrollTo(0, 0);

  // Add home-page class to body if we're on the home page (no hash or #home)
  if (!window.location.hash || window.location.hash === "#home") {
    document.body.classList.add("home-page");
  }

  // Initialize all modules
  initVideoReveal();
  initNavigation(pageTransition);
  initScrollEffects();
  initTeamSection();
  initContactForm();

  // Check URL hash for initial scrolling - but only if it's not the home page
  const hash = window.location.hash;
  if (hash && hash !== "#home") {
    const targetSection = document.querySelector(hash);
    if (targetSection) {
      setTimeout(() => {
        targetSection.scrollIntoView({ behavior: "smooth" });
        updateActiveIndicator(hash.substring(1));
      }, 100);
    }
  } else {
    // If it's the home page or no hash, ensure we're at the top
    window.scrollTo(0, 0);
    updateActiveIndicator("home");
  }

  // Apply initial fade-in to visible sections
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top >= 0 && rect.top <= window.innerHeight) {
      section.classList.add("fade-in");

      // Section-specific initializations
      if (section.id === "project") {
        document.querySelector(".project-container")?.classList.add("visible");
      } else if (section.id === "contact") {
        document
          .querySelector(".contact-form-container")
          ?.classList.add("visible");
      }
    }
  });

  // Initial pulse animation
  setTimeout(() => {
    const circle = document.querySelector(".menu-circle .circle");
    if (circle) {
      circle.classList.add("pulse");
      setTimeout(() => circle.classList.remove("pulse"), 700);
    }
  }, 1000);

  // Force hiding any gap below footer
  document.body.style.marginBottom = "0";
  document.body.style.paddingBottom = "0";
  document.documentElement.style.marginBottom = "0";
  document.documentElement.style.paddingBottom = "0";
});

// Export shared functions that might be used across modules
export { updateActiveIndicator };
