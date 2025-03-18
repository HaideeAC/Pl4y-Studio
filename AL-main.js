/**
 * Pl4y Studio - Main JavaScript
 *
 * This file serves as the entry point for all JavaScript functionality.
 * It follows a modular approach for better organization and maintainability.
 */

// DOM Element references
const DOM = {
  header: document.querySelector("header"),
  hamburger: document.querySelector(".hamburger"),
  xIcon: document.querySelector(".x-icon"),
  navLinks: document.querySelector(".nav-links"),
  navOverlay: document.querySelector(".nav-overlay"),
  navSocial: document.querySelector(".nav-social"),
  animatedElements: document.querySelectorAll(
    ".project-card, .section-title, .contact-info, .contact-form"
  ),
  formInputs: document.querySelectorAll(
    ".form-group input, .form-group textarea"
  ),
  contactForm: document.querySelector(".contact-form form"),
  lazyImages: document.querySelectorAll("img.lazy"),
  body: document.body,
};

// Configuration
const CONFIG = {
  scrollThreshold: 50,
  scrollThrottleDelay: 10,
  mobileBreakpoint: 768,
  headerHeight: {
    desktop: 80,
    mobile: 70,
  },
};

/**
 * Mobile Navigation Module - COMPLETELY REWRITTEN
 * Instead of transforming elements, we now show/hide separate elements
 */
const MobileNav = {
  init: function () {
    // Set up event listeners for the hamburger menu
    if (DOM.hamburger) {
      DOM.hamburger.addEventListener("click", this.openMenu);
    }

    // Set up event listeners for the X icon
    if (DOM.xIcon) {
      DOM.xIcon.addEventListener("click", this.closeMenu);
    }

    // Add click events to all nav links to close menu when clicked
    if (DOM.navLinks) {
      const navLinks = DOM.navLinks.querySelectorAll("a");
      navLinks.forEach((link) => {
        link.addEventListener("click", this.closeMenu);
      });
    }

    // Close mobile menu with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && DOM.body.classList.contains("menu-open")) {
        this.closeMenu();
      }
    });

    // Set animation order for menu items
    if (DOM.navLinks) {
      const navItems = DOM.navLinks.querySelectorAll("li");
      navItems.forEach((item, index) => {
        item.style.setProperty("--item-order", index);
      });
    }
  },

  openMenu: function () {
    // Add menu-open class to body instead of active classes to elements
    DOM.body.classList.add("menu-open");
    DOM.body.style.overflow = "hidden"; // Prevent scrolling
  },

  closeMenu: function () {
    // Remove menu-open class from body
    DOM.body.classList.remove("menu-open");
    DOM.body.style.overflow = ""; // Restore scrolling
  },
};

/**
 * Smooth Scrolling Module
 * Handles smooth scrolling to anchor links
 */
const SmoothScroll = {
  init: function () {
    // Set up smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = anchor.getAttribute("href");
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        // Close mobile menu if open
        if (DOM.body.classList.contains("menu-open")) {
          MobileNav.closeMenu();

          // Add a small delay to allow menu transition to complete
          setTimeout(() => {
            this.scrollToElement(targetElement);
          }, 500);
        } else {
          this.scrollToElement(targetElement);
        }
      });
    });
  },

  scrollToElement: function (element) {
    if (!element) return;

    const isMobile = window.innerWidth <= CONFIG.mobileBreakpoint;
    const headerOffset = isMobile
      ? CONFIG.headerHeight.mobile
      : CONFIG.headerHeight.desktop;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  },
};

/**
 * Header Scroll Effect Module
 * Handles the header appearance when scrolling
 */
const HeaderScroll = {
  lastScrollTop: 0,
  scrollTimer: null,

  init: function () {
    // Initialize header state based on scroll position
    if (window.scrollY > CONFIG.scrollThreshold && DOM.header) {
      DOM.header.classList.add("scrolled");
    }

    // Set up scroll event listener with throttling
    window.addEventListener("scroll", () => {
      if (!this.scrollTimer) {
        this.scrollTimer = setTimeout(() => {
          this.handleScroll();
          this.scrollTimer = null;
        }, CONFIG.scrollThrottleDelay);
      }
    });
  },

  handleScroll: function () {
    if (!DOM.header) return;

    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;

    // Only toggle class if we've scrolled a meaningful amount
    if (Math.abs(this.lastScrollTop - currentScroll) > 10) {
      if (currentScroll > CONFIG.scrollThreshold) {
        DOM.header.classList.add("scrolled");
      } else {
        DOM.header.classList.remove("scrolled");
      }
      this.lastScrollTop = currentScroll;
    }
  },
};

/**
 * Animation Module
 * Handles all animations throughout the site
 */
const Animations = {
  init: function () {
    // Animate hero accents with delay
    setTimeout(() => {
      const heroAccents = document.querySelectorAll(".hero-accent");
      if (heroAccents) {
        heroAccents.forEach((accent) => {
          accent.style.transform = "scale(1)";
          accent.style.opacity = "0.1";
        });
      }
    }, 300);

    // Set up intersection observer for scroll animations
    this.setupScrollAnimations();
  },

  setupScrollAnimations: function () {
    if (!DOM.animatedElements || DOM.animatedElements.length === 0) return;

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

    // Observe all animated elements
    DOM.animatedElements.forEach((el) => {
      observer.observe(el);
    });
  },
};

/**
 * Form Handling Module
 * Handles form interactions and submissions
 */
const Forms = {
  init: function () {
    if (!DOM.formInputs || DOM.formInputs.length === 0) return;

    // Add active class when input is focused
    DOM.formInputs.forEach((input) => {
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
    if (DOM.contactForm) {
      DOM.contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Here you would typically validate and submit the form
        alert("Thank you for your message! We will get back to you soon.");
        DOM.contactForm.reset();
      });
    }
  },
};

/**
 * Device Detection Module
 * Adds classes to HTML element based on device capabilities
 */
const DeviceDetection = {
  init: function () {
    // Touch device detection
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      document.documentElement.classList.add("touch-device");
    } else {
      document.documentElement.classList.add("no-touch");
    }

    // Screen size detection
    this.updateScreenSizeClass();

    // Update on resize
    window.addEventListener("resize", () => {
      this.updateScreenSizeClass();
    });
  },

  updateScreenSizeClass: function () {
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
  },
};

/**
 * Lazy Loading Module
 * Sets up lazy loading for images
 */
const LazyLoading = {
  init: function () {
    if (!DOM.lazyImages || DOM.lazyImages.length === 0) return;

    if ("IntersectionObserver" in window) {
      const lazyImageObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const lazyImage = entry.target;
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.classList.remove("lazy");
              lazyImage.classList.add("loaded");
              lazyImageObserver.unobserve(lazyImage);
            }
          });
        }
      );

      DOM.lazyImages.forEach((lazyImage) => {
        lazyImageObserver.observe(lazyImage);
      });
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      DOM.lazyImages.forEach((img) => {
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        img.classList.add("loaded");
      });
    }
  },
};

/**
 * Initialize all modules when DOM is loaded
 */
document.addEventListener("DOMContentLoaded", function () {
  // Initialize modules
  MobileNav.init();
  SmoothScroll.init();
  HeaderScroll.init();
  Animations.init();
  Forms.init();
  DeviceDetection.init();
  LazyLoading.init();
});
