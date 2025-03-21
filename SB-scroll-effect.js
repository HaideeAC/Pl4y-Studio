/**
 * Spirit&Bone - Scroll Effects Module
 * Handles scroll detection, parallax effects, and section transitions
 */

// Fix the import path to use SB-main.js, not main.js
import { updateActiveIndicator } from "./SB-main.js";

// Initialize scroll effects
function initScrollEffects() {
  const sections = document.querySelectorAll(".section");
  const footer = document.querySelector("footer");
  const menuCircle = document.getElementById("menu-circle");

  // If key elements don't exist, exit early
  if (!sections.length) {
    return;
  }

  // Ensure we're at the top of the page on init
  window.scrollTo(0, 0);

  // Intersection Observer to detect visible sections
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          entry.target.classList.add("fade-in");

          // Only update URL and indicators if we're not in the initial load sequence
          if (document.readyState === "complete") {
            updateActiveIndicator(sectionId);

            // Only update history if user has scrolled past home
            if (sectionId !== "home") {
              history.replaceState(null, null, `#${sectionId}`);
            } else {
              history.replaceState(null, null, window.location.pathname);
            }
          }

          handleScrollDownIndicator(sectionId);

          if (sectionId === "project") {
            document
              .querySelector(".project-container")
              ?.classList.add("visible");
          } else if (sectionId === "contact") {
            document
              .querySelector(".contact-form-container")
              ?.classList.add("visible");
            showFooter();
          }
        }
      });
    },
    { root: null, rootMargin: "-20% 0px -20% 0px", threshold: 0.1 }
  );

  // Observe all sections
  sections.forEach((section) => observer.observe(section));

  // Scroll event handling
  window.addEventListener("scroll", () => {
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.scrollHeight - windowHeight;
    const scrolled = window.scrollY;

    // Update progress bar
    const progress = (scrolled / fullHeight) * 100;
    const progressBar = document.getElementById("scroll-progress");
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    // Show footer when at or near bottom
    if (fullHeight - scrolled < 50 || scrolled >= fullHeight) {
      showFooter();
    }

    // Dynamic circle size
    updateCircleSize(scrolled);

    // Parallax effects
    applyParallaxEffect(scrolled);
  });

  // Handle scroll down indicator visibility
  function handleScrollDownIndicator(sectionId) {
    const scrollDown = document.querySelector(".scroll-down");
    if (!scrollDown) return;

    if (sectionId !== "home") {
      scrollDown.style.opacity = "0";
      setTimeout(() => {
        scrollDown.style.display = "none";
      }, 500);
    } else {
      scrollDown.style.display = "block";
      setTimeout(() => {
        scrollDown.style.opacity = "1";
      }, 100);
    }
  }

  // Simple function to ensure footer is visible and correctly positioned
  function showFooter() {
    if (footer) {
      footer.style.opacity = "1";
      footer.style.transform = "translateY(0)";
      footer.style.position = "relative";
      footer.style.bottom = "0";
      footer.style.marginBottom = "0";
      footer.classList.add("visible");
    }
  }

  // Update circle size based on scroll position
  function updateCircleSize(scrolled) {
    if (!menuCircle) return;

    const circle = menuCircle.querySelector(".circle");
    if (!circle) return;

    const baseSize = 40;
    const shrinkFactor = 0.9;
    const scrollFactor = Math.min(scrolled / 300, 1);
    const newSize = baseSize * (1 - scrollFactor * (1 - shrinkFactor));
    circle.style.width = `${newSize}px`;
    circle.style.height = `${newSize}px`;
  }

  // Apply parallax effect to sections
  function applyParallaxEffect(scrolled) {
    const videoContainer = document.querySelector(".video-container");
    if (videoContainer) {
      videoContainer.style.transform = `translateY(${
        scrolled * 0.2
      }px) translateZ(-1px) scale(1.1)`;
    }
  }

  // Mobile optimization for team section
  adjustForMobile();

  // Fix footer position in contact section
  fixFooterPosition();

  // Window resize event handlers
  window.addEventListener("resize", () => {
    adjustForMobile();
    fixFooterPosition();
  });
}

// Mobile optimization for team section
function adjustForMobile() {
  const teamSection = document.getElementById("team");
  if (!teamSection) return;

  if (window.innerWidth <= 768) {
    teamSection.style.height = "auto";
    teamSection.style.minHeight = "200vh";
  } else {
    teamSection.style.height = "100vh";
  }
}

// Fix footer positioning in contact section
function fixFooterPosition() {
  const contactSection = document.getElementById("contact");
  const footer = document.querySelector("footer");

  if (contactSection && footer) {
    // Ensure the contact section doesn't have margin or padding at the bottom
    contactSection.style.marginBottom = "0";
    contactSection.style.paddingBottom = "0";

    // Make sure footer is visible and positioned correctly
    footer.style.opacity = "1";
    footer.style.transform = "translateY(0)";
    footer.style.position = "relative";
    footer.style.bottom = "0";
    footer.style.marginBottom = "0";

    // If the footer isn't inside the contact section, move it there
    if (
      footer.parentNode !== contactSection &&
      contactSection.nextElementSibling === footer
    ) {
      document.body.style.marginBottom = "0";
      document.body.style.paddingBottom = "0";
    }
  }
}

// Export the initialization function and any needed helper functions
export { initScrollEffects, adjustForMobile, fixFooterPosition };
