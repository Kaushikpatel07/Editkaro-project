/**
 * EDITKARO.IN - Single Page Application Unified Controller
 * Integrates: Routing, Navigation, Form Validations, Portfolio Filters, and Video Modal Lightbox.
 */

// Replace this placeholder with your deployed Google Apps Script Web App URL!
const GOOGLE_SCRIPT_URL = ""; 

document.addEventListener("DOMContentLoaded", () => {
  // 1. SPA Router
  initSpaRouter();
  
  // 2. Global UI Core
  initStickyHeader();
  initMobileMenu();
  triggerScrollReveals();
  
  // 3. Portfolio Page Operations
  initPortfolioFilters();
  initVideoModal();
  
  // 4. Form Actions
  initNewsletterForms();
  initContactForm();
  createToastContainer();
});

/* ==========================================================================
   1. SPA ROUTER SYSTEM
   ========================================================================== */

function initSpaRouter() {
  const switchView = (viewId) => {
    // Default view is home
    const targetId = viewId || "home";
    const section = document.getElementById(`${targetId}-view`);
    
    if (!section) return;

    // Remove active class from all sections
    document.querySelectorAll(".page-section").forEach(sec => {
      sec.classList.remove("active");
    });

    // Add active class to target section
    section.classList.add("active");

    // Update main header navigation links
    document.querySelectorAll(".nav-links a").forEach(link => {
      const hrefHash = link.getAttribute("href");
      if (hrefHash === `#${targetId}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Reset window scroll position
    window.scrollTo({ top: 0, behavior: "instant" });

    // Refresh Scroll Reveal animations inside active section
    setTimeout(triggerScrollReveals, 50);
  };

  // Listen to hash changes in URL
  window.addEventListener("hashchange", () => {
    const hash = window.location.hash || "#home";
    switchView(hash.substring(1));
  });

  // Watch for dynamic targeting links from footer and other layouts
  document.addEventListener("click", (e) => {
    const targetLink = e.target.closest("a[href^='#']");
    if (!targetLink) return;

    const hash = targetLink.getAttribute("href");
    if (hash === "#") return;

    // Handle special target category from service category lists
    const targetCat = targetLink.getAttribute("data-target-cat");
    if (targetCat) {
      const tabButton = document.getElementById(`tab-${targetCat}`);
      if (tabButton) {
        // Toggle the category active tab in portfolio view
        setTimeout(() => {
          tabButton.click();
        }, 100);
      }
    }

    // Toggle menu closed on mobile if it was active
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");
    if (navToggle && navToggle.classList.contains("open")) {
      navToggle.classList.remove("open");
      navLinks.classList.remove("open");
      document.body.style.overflow = "";
    }
  });

  // Trigger initial routing state on page load
  const initialHash = window.location.hash || "#home";
  switchView(initialHash.substring(1));
}

/* ==========================================================================
   2. GLOBAL UI ACTIONS
   ========================================================================== */

function initStickyHeader() {
  const header = document.querySelector("header");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();
}

function initMobileMenu() {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!navToggle || !navLinks) return;

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.classList.toggle("open");
    navLinks.classList.toggle("open", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });
}

function triggerScrollReveals() {
  const revealElements = document.querySelectorAll(".fade-in-up");
  if (revealElements.length === 0) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.05,
    rootMargin: "0px 0px -20px 0px"
  });

  revealElements.forEach(el => {
    // If element is inside an active section, observe it. Otherwise bypass.
    const parentSection = el.closest(".page-section");
    if (parentSection && parentSection.classList.contains("active")) {
      revealObserver.observe(el);
    } else if (!parentSection) {
      revealObserver.observe(el); // for footer/header elements
    }
  });
}

/* ==========================================================================
   3. PORTFOLIO & VIDEO LIGHTBOX
   ========================================================================== */

function initPortfolioFilters() {
  const filterTabs = document.querySelectorAll(".filter-tab");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  if (filterTabs.length === 0 || portfolioItems.length === 0) return;

  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      filterTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const category = tab.getAttribute("data-category");

      portfolioItems.forEach(item => {
        const itemCategories = item.getAttribute("data-categories").split(" ");
        
        if (category === "all" || itemCategories.includes(category)) {
          item.classList.add("show");
        } else {
          item.classList.remove("show");
        }
      });
    });
  });
}

function initVideoModal() {
  const modal = document.getElementById("video-modal");
  if (!modal) return;

  const closeBtn = modal.querySelector(".modal-close");
  const videoContainer = modal.querySelector(".modal-video-container");
  const modalTitle = modal.querySelector(".modal-title");
  const modalClient = modal.querySelector("#modal-client");
  const modalDate = modal.querySelector("#modal-date");
  const modalType = modal.querySelector("#modal-type");
  const modalDesc = modal.querySelector(".modal-desc");
  
  const playButtons = document.querySelectorAll("[data-video-url]");

  playButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      
      const videoUrl = btn.getAttribute("data-video-url");
      const title = btn.getAttribute("data-title") || "Editkaro Masterpiece";
      const client = btn.getAttribute("data-client") || "Editkaro Client";
      const date = btn.getAttribute("data-date") || "Recent";
      const category = btn.getAttribute("data-category") || "Video Project";
      const description = btn.getAttribute("data-description") || "A professional, custom-crafted edit optimized for engagement and conversion.";

      modalTitle.textContent = title;
      modalClient.textContent = client;
      modalDate.textContent = date;
      modalType.textContent = category;
      modalDesc.textContent = description;

      if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
        let videoId = extractYouTubeId(videoUrl);
        videoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      } else if (videoUrl.includes("vimeo.com")) {
        let videoId = extractVimeoId(videoUrl);
        videoContainer.innerHTML = `<iframe src="https://player.vimeo.com/video/${videoId}?autoplay=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
      } else {
        videoContainer.innerHTML = `
          <video controls autoplay playsinline class="modal-video-element">
            <source src="${videoUrl}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        `;
      }

      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  const closeModalFunc = () => {
    modal.classList.remove("open");
    document.body.style.overflow = "";
    
    setTimeout(() => {
      videoContainer.innerHTML = "";
    }, 300);
  };

  closeBtn.addEventListener("click", closeModalFunc);
  
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModalFunc();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModalFunc();
    }
  });
}

function extractYouTubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

function extractVimeoId(url) {
  const regExp = /vimeo\.com\/([0-9]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

/* ==========================================================================
   4. FORM VALIDATION & SHEETS SENDERS
   ========================================================================== */

function createToastContainer() {
  if (!document.getElementById("toast-container")) {
    const container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }
}

function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type === "error" ? "toast-error" : ""}`;
  const icon = type === "success" ? "✓" : "✗";
  
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-content">${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 5000);
}

function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
  const re = /^\+?[0-9]{10,14}$/;
  return re.test(String(phone).replace(/[\s\-()]/g, ""));
}

function initNewsletterForms() {
  const forms = document.querySelectorAll(".newsletter-form");
  
  forms.forEach(form => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const emailInput = form.querySelector('input[type="email"]');
      const submitBtn = form.querySelector('button[type="submit"]');
      const email = emailInput.value.trim();
      
      if (!email) {
        showToast("Please enter your email address.", "error");
        return;
      }
      
      if (!validateEmail(email)) {
        showToast("Please enter a valid email address.", "error");
        return;
      }
      
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = "...";
      
      saveLocalData("Newsletter", { email: email });
      
      let success = true;
      let errorMsg = "";

      if (GOOGLE_SCRIPT_URL) {
        try {
          await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              sheetName: "Newsletter",
              email: email
            })
          });
        } catch (error) {
          console.error("Submission error:", error);
          success = false;
          errorMsg = "Network error. Please try again.";
        }
      }

      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      if (success) {
        showToast("Awesome! You've successfully subscribed to our newsletter.");
        emailInput.value = "";
      } else {
        showToast(errorMsg || "Something went wrong. Please try again later.", "error");
      }
    });
  });
}

function initContactForm() {
  const form = document.getElementById("editkaro-contact-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const phoneInput = document.getElementById("contact-phone");
    const messageInput = document.getElementById("contact-message");
    const submitBtn = form.querySelector('button[type="submit"]');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      showToast("Please fill in all required fields (Name, Email, Message).", "error");
      return;
    }

    if (!validateEmail(email)) {
      showToast("Please enter a valid email address.", "error");
      emailInput.focus();
      return;
    }

    if (phone && !validatePhone(phone)) {
      showToast("Please enter a valid phone number (at least 10 digits).", "error");
      phoneInput.focus();
      return;
    }

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending Message...";

    const formData = {
      name: name,
      email: email,
      phone: phone,
      message: message
    };
    saveLocalData("Contact submissions", formData);

    let success = true;
    let errorMsg = "";

    if (GOOGLE_SCRIPT_URL) {
      try {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            sheetName: "Contact submissions",
            ...formData
          })
        });
      } catch (error) {
        console.error("Submission error:", error);
        success = false;
        errorMsg = "Network error. Unable to send message.";
      }
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;

    if (success) {
      showToast("Thank you! Your message has been sent successfully.");
      form.reset();
      form.querySelectorAll(".form-input").forEach(input => {
        input.dispatchEvent(new Event("change"));
      });
    } else {
      showToast(errorMsg || "Submission failed. Please try again.", "error");
    }
  });
}

function saveLocalData(sheetName, data) {
  try {
    const key = `editkaro_${sheetName.toLowerCase().replace(/\s/g, "_")}`;
    const timestamp = new Date().toISOString();
    const entry = { timestamp, ...data };
    
    let existingData = JSON.parse(localStorage.getItem(key)) || [];
    existingData.push(entry);
    localStorage.setItem(key, JSON.stringify(existingData));
    
    console.log(`Saved locally under key [${key}]:`, entry);
  } catch (err) {
    console.error("Failed to write to localStorage:", err);
  }
}
