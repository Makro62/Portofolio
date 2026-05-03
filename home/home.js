/* ===========================================
   HOME PAGE LOGIC
   Initialize home page specific functionality
   =========================================== */

/**
 * Initialize banner carousel
 */
export function initBannerCarousel() {
  const slides = document.querySelectorAll('.banner-slide');
  const indicators = document.querySelectorAll('.banner-indicators .indicator');
  const prevBtn = document.querySelector('.banner-nav-btn.prev');
  const nextBtn = document.querySelector('.banner-nav-btn.next');

  if (slides.length === 0) return;

  let currentSlide = 0;
  let slideInterval;

  // Show specific slide
  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));

    slides[index].classList.add('active');
    indicators[index].classList.add('active');

    currentSlide = index;
  }

  // Next slide
  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  // Previous slide
  function prevSlide() {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }

  // Start autoplay
  function startAutoplay() {
    slideInterval = setInterval(nextSlide, 5000); // 5 seconds
  }

  // Stop autoplay
  function stopAutoplay() {
    clearInterval(slideInterval);
  }

  // Event listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      stopAutoplay();
      prevSlide();
      startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopAutoplay();
      nextSlide();
      startAutoplay();
    });
  }

  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      stopAutoplay();
      showSlide(index);
      startAutoplay();
    });
  });

  // Pause on hover
  const bannerCarousel = document.querySelector('.banner-carousel');
  if (bannerCarousel) {
    bannerCarousel.addEventListener('mouseenter', stopAutoplay);
    bannerCarousel.addEventListener('mouseleave', startAutoplay);
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      stopAutoplay();
      prevSlide();
      startAutoplay();
    } else if (e.key === 'ArrowRight') {
      stopAutoplay();
      nextSlide();
      startAutoplay();
    }
  });

  // Start autoplay
  startAutoplay();
}

// Home page initialization handled by router.js
