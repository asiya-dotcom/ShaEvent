// --------------------
// script.js (final safe version)
// --------------------

// Mobile nav toggle
(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(nav.classList.contains('open')));
    });
  }
})();

// Highlight active link
(() => {
  const page = document.body.dataset.page;
  if (page) {
    document.querySelectorAll('.site-nav a').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href.includes(page)) a.classList.add('active');
    });
  }
})();

// Footer year
(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// Testimonials slider
(() => {
  const slidesEl = document.getElementById('slides');
  if (!slidesEl) return;

  const sliderEl = slidesEl.closest('.slider') || document.querySelector('.slider');
  const prevBtn = sliderEl?.querySelector('.slide-btn.prev');
  const nextBtn = sliderEl?.querySelector('.slide-btn.next');

  const scrollAmount = Math.max(300, Math.round(slidesEl.clientWidth * 0.9));
  prevBtn?.addEventListener('click', () => slidesEl.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
  nextBtn?.addEventListener('click', () => slidesEl.scrollBy({ left: scrollAmount, behavior: 'smooth' }));
  console.log("✅ Testimonials slider initialized");
})();

// Hero slideshow
(() => {
  const heroSlides = Array.from(document.querySelectorAll('.hero-slideshow .slide'));
  if (!heroSlides.length) return;

  const dotsContainer = document.querySelector('.hero-slideshow .dots');
  const prevBtn = document.querySelector('.hero-slideshow .arrow.prev');
  const nextBtn = document.querySelector('.hero-slideshow .arrow.next');
  const heroEl = document.querySelector('.hero-slideshow');

  let current = 0;
  let intervalId = null;
  const AUTOPLAY_MS = 5000;

  // Create dots safely
  const dots = [];
  if (dotsContainer) {
    heroSlides.forEach((_, i) => {
      const d = document.createElement('button');
      d.type = 'button';
      if (i === 0) d.classList.add('active');
      d.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(d);
      dots.push(d);
    });
  }

  function show(index) {
    heroSlides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  function goTo(index) {
    current = ((index % heroSlides.length) + heroSlides.length) % heroSlides.length;
    show(current);
    resetInterval();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  nextBtn?.addEventListener('click', next);
  prevBtn?.addEventListener('click', prev);

  function resetInterval() {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(next, AUTOPLAY_MS);
  }

  // init
  show(current);
  resetInterval();

  // pause autoplay on hover
  heroEl?.addEventListener('mouseenter', () => clearInterval(intervalId));
  heroEl?.addEventListener('mouseleave', resetInterval);

  console.log("✅ Hero slideshow initialized");
})();




// Lightbox functionality
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox .close");
const nextBtn = document.querySelector(".lightbox-next");
const prevBtn = document.querySelector(".lightbox-prev");

let images = document.querySelectorAll(".gallery-grid img");
let currentIndex = 0;

images.forEach((img, index) => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
    currentIndex = index;
  });
});

function showImage(index) {
  if (index >= images.length) index = 0;
  if (index < 0) index = images.length - 1;
  currentIndex = index;
  lightboxImg.src = images[currentIndex].src;
}

nextBtn.addEventListener("click", () => showImage(currentIndex + 1));
prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
closeBtn.addEventListener("click", () => (lightbox.style.display = "none"));

window.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.style.display = "none";
});

