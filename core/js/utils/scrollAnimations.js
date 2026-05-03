/* ===========================================
   SCROLL ANIMATIONS UTILITY
   Uses Intersection Observer for performance
   =========================================== */

/**
 * Initialize scroll animations for elements with fade-in effect
 */
export function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);

  // Add fade-in elements to home page sections
  document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.feature, .popular-item, .why-item, .testimonial-card, .hero');
    fadeElements.forEach(el => {
      el.classList.add('fade-in-element');
      observer.observe(el);
    });
  });
}

/**
 * Add animate on scroll effect to specific selector
 */
export function addScrollAnimation(selector, animationClass = 'fade-in-element') {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Optional: unobserve after animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll(selector);
  elements.forEach(el => {
    el.classList.add(animationClass);
    observer.observe(el);
  });
}
