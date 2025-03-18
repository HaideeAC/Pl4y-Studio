/**
 * Spirit&Bone - Contact Form Module
 * Handles contact form interactions, validation, and submission
 */

// Initialize contact form
function initContactForm() {
  const contactFormContainer = document.querySelector(
    ".contact-form-container"
  );
  if (!contactFormContainer) {
    console.error("Contact form container not found");
    return;
  }

  // Make form elements visible immediately
  contactFormContainer.classList.add("visible");

  // Get form reference
  const form = contactFormContainer.querySelector("form");
  if (!form) {
    console.error("Contact form not found");
    return;
  }

  // Form submission handling
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Basic validation
    if (!validateForm(form)) {
      return;
    }

    // Add visual feedback during submission
    const submitButton = form.querySelector('button[type="submit"]');
    if (!submitButton) return;

    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    // Simulate sending (replace with actual API call in production)
    setTimeout(() => {
      // Success message
      alert("Thank you for your message! We will get back to you soon.");
      form.reset();

      // Reset button
      submitButton.disabled = false;
      submitButton.textContent = originalText;

      // Show footer
      const footer = document.querySelector("footer");
      if (footer) {
        footer.classList.add("visible");
      }
    }, 1000);
  });

  // Set up visibility observer
  setupVisibilityObserver(contactFormContainer);
}

// Validate form inputs
function validateForm(form) {
  // Get form fields
  const name = form.querySelector("#name")?.value.trim();
  const email = form.querySelector("#email")?.value.trim();
  const message = form.querySelector("#message")?.value.trim();

  // Check required fields
  if (!name || !email || !message) {
    alert("Please fill out all fields.");
    return false;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  return true;
}

// Set up observer to add visible class when form scrolls into view
function setupVisibilityObserver(container) {
  // Animate form elements with proper delays
  const formGroups = container.querySelectorAll(".form-group");
  formGroups.forEach((group, index) => {
    group.style.transitionDelay = `${index * 0.1}s`;
  });

  // Add intersection observer to trigger animation when form is in viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          container.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(container);
}

// Export the initialization function
export { initContactForm };
