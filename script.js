function setupSlider(sliderId, dotsId) {
  let currentSlide = 0;
  const slides = document.querySelectorAll(`#${sliderId} img`);
  const slider = document.getElementById(sliderId);
  const dotsContainer = document.getElementById(dotsId);

  // Clear previous dots to avoid duplicates
  dotsContainer.innerHTML = "";

  // Create dots dynamically
  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.addEventListener("click", () => showSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll(".dot");

  function showSlide(n) {
    currentSlide = (n + slides.length) % slides.length;
    slider.style.transform = `translateX(${-currentSlide * 100}%)`;
    updateDots();
  }

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  // Navigation helpers
  function next() { showSlide(currentSlide + 1); }
  function prev() { showSlide(currentSlide - 1); }

  // Init first slide
  showSlide(0);

  return { next, prev };
}

// Initialize all sliders
setupSlider("chargeSlider", "chargeDots");
setupSlider("ecommerceSlider", "ecommerceDots");
setupSlider("businessSlider", "businessDots");

// Lightbox
function openLightbox(src) {
  document.getElementById("lightbox").style.display = "flex";
  document.getElementById("lightbox-img").src = src;
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

// =========================
// Scroll Spy for Navbar (Stable)
// =========================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function onScroll() {
  let scrollPos = window.scrollY + 200; // offset for navbar height
  sections.forEach((section) => {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").substring(1) === section.id) {
          link.classList.add("active");
        }
      });
    }
  });

  // Ensure last section (Contact) is highlighted at bottom
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 5) {
    navLinks.forEach((link) => link.classList.remove("active"));
    document.querySelector('.nav-links a[href="#contact"]').classList.add("active");
  }
}

window.addEventListener("scroll", onScroll);
onScroll(); // run once on page load

// =========================
// Smooth Scrolling for Nav
// =========================
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    document.getElementById(targetId).scrollIntoView({
      behavior: "smooth"
    });
  });
});
