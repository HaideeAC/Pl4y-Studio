// Mobile menu toggle with improved UX
const mobileMenuButton = document.querySelector(".mobile-menu");
const closeMenuButton = document.querySelector(".close-menu-btn");
const navLinks = document.querySelector(".nav-links");
const menuBackdrop = document.querySelector(".menu-backdrop");
const body = document.body;

// Show mobile menu
function openMobileMenu() {
  navLinks.classList.add("active");
  body.style.overflow = "hidden";

  // Add backdrop for better UX
  if (menuBackdrop) {
    menuBackdrop.style.display = "block";
    setTimeout(() => {
      menuBackdrop.style.opacity = "1";
    }, 10);
  }

  // Animate menu items with a staggered effect
  const menuItems = navLinks.querySelectorAll("li:not(.close-menu-btn)");
  menuItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.05 + 0.1}s`;
    item.style.opacity = "1";
    item.style.transform = "translateY(0)";
  });
}

// Hide mobile menu
function closeMobileMenu() {
  navLinks.classList.remove("active");
  body.style.overflow = "";

  // Fade out backdrop
  if (menuBackdrop) {
    menuBackdrop.style.opacity = "0";
    setTimeout(() => {
      menuBackdrop.style.display = "none";
    }, 300);
  }

  // Reset menu items animation
  const menuItems = navLinks.querySelectorAll("li");
  menuItems.forEach((item) => {
    item.style.transitionDelay = "";
    item.style.opacity = "";
    item.style.transform = "";
  });
}

// Event listeners for menu buttons
if (mobileMenuButton) {
  mobileMenuButton.addEventListener("click", openMobileMenu);
}

if (closeMenuButton) {
  closeMenuButton.addEventListener("click", closeMobileMenu);
}

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    navLinks.classList.contains("active") &&
    !navLinks.contains(e.target) &&
    !mobileMenuButton.contains(e.target)
  ) {
    closeMobileMenu();
  }
});

// Close mobile menu with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navLinks.classList.contains("active")) {
    closeMobileMenu();
  }
});

// Smooth scrolling for anchor links with better handling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    // Close mobile menu if open
    if (navLinks.classList.contains("active")) {
      closeMobileMenu();

      // Add a small delay to allow menu transition to complete
      setTimeout(() => {
        scrollToElement(targetElement);
      }, 300);
    } else {
      scrollToElement(targetElement);
    }
  });
});

// Helper function for smooth scrolling
function scrollToElement(element) {
  const headerOffset = window.innerWidth <= 768 ? 70 : 80;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}

// Header scroll effect with improved performance
const header = document.querySelector("header");
let lastScrollTop = 0;
let scrollTimer;

function handleScroll() {
  const currentScroll =
    window.pageYOffset || document.documentElement.scrollTop;

  // Only toggle class if we've scrolled a meaningful amount
  if (Math.abs(lastScrollTop - currentScroll) > 10) {
    if (currentScroll > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    lastScrollTop = currentScroll;
  }
}

// Use throttled scroll event for better performance
window.addEventListener("scroll", () => {
  if (!scrollTimer) {
    scrollTimer = setTimeout(() => {
      handleScroll();
      scrollTimer = null;
    }, 10);
  }
});

// Add animation for hero accents
document.addEventListener("DOMContentLoaded", () => {
  // Initialize header state based on scroll position
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  }

  // Animate hero accents with delay
  setTimeout(() => {
    document.querySelectorAll(".hero-accent").forEach((accent, index) => {
      accent.style.transform = "scale(1)";
      accent.style.opacity = "0.1";
    });
  }, 300);

  // Animation on scroll - use Intersection Observer for better performance
  const animateOnScroll = () => {
    const options = {
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          observer.unobserve(entry.target);
        }
      });
    }, options);

    // Observe elements that should animate on scroll
    document
      .querySelectorAll(
        ".project-card, .section-title, .contact-info, .contact-form"
      )
      .forEach((el) => {
        observer.observe(el);
      });
  };

  // Initialize scroll animations
  animateOnScroll();

  // Initialize custom form elements if needed
  initFormElements();
});

// Initialize form elements for better mobile experience
function initFormElements() {
  const formInputs = document.querySelectorAll(
    ".form-group input, .form-group textarea"
  );

  formInputs.forEach((input) => {
    // Add active class when input is focused
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("input-focused");
    });

    // Remove active class when input loses focus and has no value
    input.addEventListener("blur", () => {
      if (!input.value) {
        input.parentElement.classList.remove("input-focused");
      }
    });

    // Check initial state
    if (input.value) {
      input.parentElement.classList.add("input-focused");
    }
  });

  // Add form submission handling
  const contactForm = document.querySelector(".contact-form form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Add form submission code here
      alert("Thank you for your message! We will get back to you soon.");
      contactForm.reset();
    });
  }
}

// Add CSS classes for elements based on device capabilities
function addDeviceClasses() {
  // Touch device detection
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) {
    document.documentElement.classList.add("touch-device");
  } else {
    document.documentElement.classList.add("no-touch");
  }

  // Screen size detection
  if (window.innerWidth <= 576) {
    document.documentElement.classList.add("xs-screen");
  } else if (window.innerWidth <= 768) {
    document.documentElement.classList.add("sm-screen");
  } else if (window.innerWidth <= 992) {
    document.documentElement.classList.add("md-screen");
  } else {
    document.documentElement.classList.add("lg-screen");
  }
}

// Call once on load
addDeviceClasses();

// Update on resize
window.addEventListener("resize", () => {
  // Remove all screen size classes
  document.documentElement.classList.remove(
    "xs-screen",
    "sm-screen",
    "md-screen",
    "lg-screen"
  );

  // Re-add appropriate class
  if (window.innerWidth <= 576) {
    document.documentElement.classList.add("xs-screen");
  } else if (window.innerWidth <= 768) {
    document.documentElement.classList.add("sm-screen");
  } else if (window.innerWidth <= 992) {
    document.documentElement.classList.add("md-screen");
  } else {
    document.documentElement.classList.add("lg-screen");
  }
});

// Lazy loading for images to improve performance on mobile
function setupLazyLoading() {
  if ("IntersectionObserver" in window) {
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    const lazyImages = document.querySelectorAll("img.lazy");
    lazyImages.forEach((lazyImage) => {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    const lazyImages = document.querySelectorAll("img.lazy");
    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
      img.classList.remove("lazy");
    });
  }
}

// Initialize lazy loading if there are lazy images
if (document.querySelectorAll("img.lazy").length > 0) {
  setupLazyLoading();
}
