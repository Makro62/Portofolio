/* ===========================================
   SHOP EVENTS MODULE
   Shop-specific event handlers
   =========================================== */

import { fruits } from '../data/products.js';
import { setSelectedCategory, setSearchTerm, setSortType } from '../state.js';
import { renderCategories, renderProducts, updateCategoryCarousel } from '../../components/products.js';
import { loadPage } from '../router.js';

/**
 * Setup shop-specific events
 */
export function setupShopEvents() {
  // Init banner slideshow
  initBannerSlideshow();

  // Sort dropdown
  const sortBtn = document.getElementById('sort-btn');
  const sortMenu = document.getElementById('sort-menu');

  if (sortBtn && sortMenu) {
    sortBtn.addEventListener('click', () => {
      sortMenu.classList.toggle('hidden');
      sortBtn.classList.toggle('active');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.sort-dropdown')) {
        sortMenu.classList.add('hidden');
        sortBtn.classList.remove('active');
      }
    });

    // Sort options
    document.querySelectorAll('.sort-option').forEach(option => {
      option.addEventListener('click', () => {
        const sortType = option.dataset.sort;
        document.getElementById('sort-label').textContent = option.textContent;

        // Update active state
        document.querySelectorAll('.sort-option').forEach(o => o.classList.remove('active'));
        option.classList.add('active');

        sortMenu.classList.add('hidden');
        sortBtn.classList.remove('active');

        // Update sort type and re-render products
        setSortType(sortType);
        renderProducts();
      });
    });
  }

  // Filter toggle (mobile)
  const filterToggle = document.getElementById('filter-toggle');
  const shopSidebar = document.getElementById('shop-sidebar');

  if (filterToggle && shopSidebar) {
    filterToggle.addEventListener('click', () => {
      shopSidebar.classList.toggle('mobile-active');
    });
  }

  // View toggle
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;

      // Update active state
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update grid class
      const productsGrid = document.getElementById('products-grid');
      if (productsGrid) {
        if (view === 'list') {
          productsGrid.classList.add('list-view');
        } else {
          productsGrid.classList.remove('list-view');
        }
      }
    });
  });

  // Clear filters
  const clearFilters = document.getElementById('clear-filters');
  if (clearFilters) {
    clearFilters.addEventListener('click', () => {
      setSelectedCategory('all');
      setSearchTerm('');
      renderCategories();
      renderProducts();
      updateCategoryCarousel();

      // Reset form inputs
      document.getElementById('price-min').value = '0';
      document.getElementById('price-max').value = '10';
      document.querySelectorAll('.rating-option input').forEach(input => {
        input.checked = false;
      });
    });
  }
}

/**
 * Initialize banner slideshow
 */
function initBannerSlideshow() {
  const bannerSlides = document.querySelectorAll('.banner-slide');
  const bannerIndicators = document.querySelectorAll('.banner-indicators .indicator');
  const prevBtn = document.querySelector('.banner-nav-btn.prev');
  const nextBtn = document.querySelector('.banner-nav-btn.next');

  if (bannerSlides.length === 0 || bannerIndicators.length === 0) return;

  let currentSlideIndex = 0;
  let slideInterval;

  // Function to show slide
  function showSlide(index) {
    // Hide all slides
    bannerSlides.forEach(slide => slide.classList.remove('active'));

    // Reset all indicators
    bannerIndicators.forEach(indicator => indicator.classList.remove('active'));

    // Show current slide and indicator
    bannerSlides[index].classList.add('active');
    bannerIndicators[index].classList.add('active');

    currentSlideIndex = index;
  }

  // Function to next slide
  function nextSlide() {
    const nextIndex = (currentSlideIndex + 1) % bannerSlides.length;
    showSlide(nextIndex);
  }

  // Function to previous slide
  function prevSlide() {
    const prevIndex = (currentSlideIndex - 1 + bannerSlides.length) % bannerSlides.length;
    showSlide(prevIndex);
  }

  // Start auto slideshow
  function startSlideshow() {
    slideInterval = setInterval(nextSlide, 4000); // 4 seconds
  }

  // Stop auto slideshow
  function stopSlideshow() {
    clearInterval(slideInterval);
  }

  // Event listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      stopSlideshow();
      prevSlide();
      startSlideshow();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopSlideshow();
      nextSlide();
      startSlideshow();
    });
  }

  // Indicator clicks
  bannerIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      stopSlideshow();
      showSlide(index);
      startSlideshow();
    });
  });

  // Pause on hover for better UX
  const bannerContainer = document.querySelector('.shop-banner');
  if (bannerContainer) {
    bannerContainer.addEventListener('mouseenter', stopSlideshow);
    bannerContainer.addEventListener('mouseleave', startSlideshow);
  }

  // Start the slideshow
  startSlideshow();
}
