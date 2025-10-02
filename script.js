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
