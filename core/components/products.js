/* ===========================================
   PRODUCTS MODULE
   Handles product rendering and display
   =========================================== */

import { fruits, categories } from '../js/data/products.js'
import {
  getSelectedCategory,
  getSearchTerm,
  getSortType,
  setSelectedCategory,
} from '../js/state.js'
import { toast } from '../js/utils/toast.js'
import { loadPage } from '../js/router.js'

/**
 * Render category filters
 */
export function renderCategories() {
  const categoryFilters = document.getElementById('category-filters')
  if (!categoryFilters) return

  const selectedCategory = getSelectedCategory()
  const searchTerm = getSearchTerm()

  let html = `
    <button class="category-filter ${selectedCategory === 'all' ? 'active' : ''}" data-category="all">
      All Fruits
    </button>
  `

  categories.forEach(category => {
    const isActive = selectedCategory === category.id ? 'active' : ''
    html += `
      <button class="category-filter ${isActive}" data-category="${category.id}">
        ${category.icon || ''} ${category.name}
      </button>
    `
  })

  categoryFilters.innerHTML = html

  // Add event listeners
  categoryFilters.querySelectorAll('.category-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category
      setSelectedCategory(category)
      renderCategories()
      renderProducts()
      updateCategoryCarousel()
    })
  })
}

/**
 * Render products grid
 */
export function renderProducts() {
  const productsGrid = document.getElementById('products-grid')
  if (!productsGrid) return

  const selectedCategory = getSelectedCategory()
  const searchTerm = getSearchTerm().toLowerCase()
  const sortType = getSortType()

  // Filter products
  let filteredProducts = fruits.filter(product => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch =
      searchTerm === '' ||
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    return matchesCategory && matchesSearch
  })

  // Sort products
  filteredProducts = sortProducts(filteredProducts, sortType)

  if (filteredProducts.length === 0) {
    productsGrid.innerHTML = `
      <div class="no-products text-center py-5">
        <i data-lucide="inbox" class="mb-3" style="width: 48px; height: 48px;"></i>
        <h3>No products found</h3>
        <p class="text-muted">Try adjusting your search or filter criteria</p>
      </div>
    `
    if (window.lucide) lucide.createIcons()
    return
  }

  productsGrid.innerHTML = filteredProducts
    .map(product => createProductCard(product))
    .join('')

  if (window.lucide) lucide.createIcons()
}

/**
 * Sort products based on sort type
 */
function sortProducts(products, sortType) {
  const sorted = [...products]
  switch (sortType) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price)
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return sorted
  }
}

/**
 * Create product card HTML
 */
function createProductCard(product) {
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  )

  return `
    <div class="product-card" data-product-id="${product.id}">
      <div class="product-image-wrapper">
        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy" />
        ${discount > 0 ? `<span class="product-badge badge-discount">-${discount}%</span>` : ''}
        ${!product.inStock ? '<span class="product-badge badge-out">Out of Stock</span>' : ''}
        <button class="wishlist-btn" data-product-id="${product.id}" aria-label="Add to wishlist">
          <i data-lucide="heart"></i>
        </button>
        <button class="quick-view-btn" data-product-id="${product.id}" aria-label="Quick view">
          <i data-lucide="eye"></i>
        </button>
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <div class="product-rating">
          <div class="stars">
            ${generateStars(product.rating)}
          </div>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <div class="product-price-row">
          <span class="product-price">$${product.price.toFixed(2)}</span>
          ${discount > 0 ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
        </div>
        <div class="product-actions">
          <button class="add-to-cart-btn btn-primary" data-product-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
            <i data-lucide="shopping-cart"></i>
            ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  `
}

/**
 * Generate star rating HTML
 */
function generateStars(rating) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  let stars = ''

  for (let i = 0; i < fullStars; i++) {
    stars += '<i data-lucide="star" class="star-filled"></i>'
  }
  if (hasHalfStar) {
    stars += '<i data-lucide="star-half" class="star-half"></i>'
  }
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i data-lucide="star" class="star-empty"></i>'
  }

  return stars
}

/**
 * Render flash sale section
 */
export function renderFlashSale() {
  const flashSaleContainer = document.getElementById('flash-sale-products')
  if (!flashSaleContainer) return

  const flashSaleProducts = fruits
    .filter(p => p.originalPrice > p.price)
    .slice(0, 4)

  if (flashSaleProducts.length === 0) {
    flashSaleContainer.innerHTML = '<p>No flash sale items available</p>'
    return
  }

  flashSaleContainer.innerHTML = flashSaleProducts
    .map(product => createProductCard(product))
    .join('')

  if (window.lucide) lucide.createIcons()
}

/**
 * Setup category carousel
 */
export function setupCategoryCarousel() {
  const categoryCarousel = document.querySelector('.category-carousel')
  if (!categoryCarousel) return

  const prevBtn = categoryCarousel.querySelector('.carousel-prev')
  const nextBtn = categoryCarousel.querySelector('.carousel-next')

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      categoryCarousel.scrollBy({ left: -200, behavior: 'smooth' })
    })
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      categoryCarousel.scrollBy({ left: 200, behavior: 'smooth' })
    })
  }
}

/**
 * Update category carousel active state
 */
export function updateCategoryCarousel() {
  const selectedCategory = getSelectedCategory()
  const categoryItems = document.querySelectorAll('.category-item')

  categoryItems.forEach(item => {
    if (item.dataset.category === selectedCategory) {
      item.classList.add('active')
    } else {
      item.classList.remove('active')
    }
  })
}

/**
 * Setup product detail page
 */
export function setupProductDetailPage() {
  const urlParams = new URLSearchParams(window.location.search)
  const productId = urlParams.get('id')

  if (!productId) {
    loadPage('shop')
    return
  }

  const product = fruits.find(p => p.id === parseInt(productId))
  if (!product) {
    loadPage('shop')
    return
  }

  renderProductDetail(product)
}

/**
 * Render product detail page
 */
function renderProductDetail(product) {
  const detailContainer = document.getElementById('product-detail-container')
  if (!detailContainer) return

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  )

  detailContainer.innerHTML = `
    <div class="product-detail-page">
      <div class="product-detail-images">
        <img src="${product.image}" alt="${product.name}" class="main-product-image" />
      </div>
      <div class="product-detail-info">
        <h1 class="product-detail-title">${product.name}</h1>
        <div class="product-detail-rating">
          <div class="stars">
            ${generateStars(product.rating)}
          </div>
          <span class="rating-count">${product.reviews} reviews</span>
        </div>
        <div class="product-detail-price">
          <span class="current-price">$${product.price.toFixed(2)}</span>
          ${discount > 0 ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span><span class="discount-badge">-${discount}%</span>` : ''}
        </div>
        <p class="product-detail-description">${product.description}</p>
        <div class="product-detail-stock">
          <span class="stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}">
            ${product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
          </span>
        </div>
        <div class="product-detail-actions">
          <div class="quantity-selector">
            <button class="quantity-btn" id="decrease-qty">-</button>
            <input type="number" id="product-qty" value="1" min="1" max="99" />
            <button class="quantity-btn" id="increase-qty">+</button>
          </div>
          <button class="add-to-cart-btn btn-primary btn-lg" id="add-to-cart-detail" ${!product.inStock ? 'disabled' : ''}>
            <i data-lucide="shopping-cart"></i>
            ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
          <button class="wishlist-btn btn-outline" data-product-id="${product.id}">
            <i data-lucide="heart"></i>
          </button>
        </div>
      </div>
    </div>
  `

  if (window.lucide) lucide.createIcons()

  // Setup quantity buttons
  const qtyInput = document.getElementById('product-qty')
  const decreaseBtn = document.getElementById('decrease-qty')
  const increaseBtn = document.getElementById('increase-qty')

  if (decreaseBtn && qtyInput) {
    decreaseBtn.addEventListener('click', () => {
      if (qtyInput.value > 1) qtyInput.value = parseInt(qtyInput.value) - 1
    })
  }

  if (increaseBtn && qtyInput) {
    increaseBtn.addEventListener('click', () => {
      if (qtyInput.value < 99) qtyInput.value = parseInt(qtyInput.value) + 1
    })
  }

  // Add to cart button
  const addToCartBtn = document.getElementById('add-to-cart-detail')
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      const quantity = parseInt(qtyInput.value) || 1
      import('../js/state.js').then(({ addToCart }) => {
        addToCart({ ...product, quantity })
        toast.success(`${product.name} added to cart!`)
      })
    })
  }
}

// Export for backward compatibility
export const initProducts = () => {
  renderCategories()
  renderProducts()
}
