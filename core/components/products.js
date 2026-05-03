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
import { escapeHtml, isValidImageUrl } from '../js/utils/escapeHtml.js'

function discountPercent(product) {
  const orig = product.originalPrice
  if (typeof orig !== 'number' || orig <= 0 || orig <= product.price) return 0
  return Math.round(((orig - product.price) / orig) * 100)
}

/**
 * Render category filters
 */
export function renderCategories() {
  const categoryFilters = document.getElementById('category-filters')
  if (!categoryFilters) return

  const selectedCategory = getSelectedCategory()
  const searchTerm = getSearchTerm()

  let html = `
    <button type="button" class="category-filter-btn ${selectedCategory === 'all' ? 'active' : ''}" data-category="all">
      All Fruits
    </button>
  `

  categories.forEach(category => {
    if (category.id === 'all') return
    const isActive = selectedCategory === category.id ? 'active' : ''
    html += `
      <button type="button" class="category-filter-btn ${isActive}" data-category="${category.id}">
        ${category.icon || ''} ${category.name}
      </button>
    `
  })

  categoryFilters.innerHTML = html

  // Add event listeners
  categoryFilters.querySelectorAll('.category-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category
      setSelectedCategory(category)
      const headerCategory = document.getElementById('category-select')
      if (headerCategory) headerCategory.value = category
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

  // Ambil nilai filter harga langsung dari DOM jika ada
  const minInput = document.getElementById('price-min')
  const maxInput = document.getElementById('price-max')
  const minPrice =
    minInput && minInput.value !== '' ? parseFloat(minInput.value) : 0
  const maxPrice =
    maxInput && maxInput.value !== '' ? parseFloat(maxInput.value) : Infinity

  // Filter products
  let filteredProducts = fruits.filter(product => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch =
      searchTerm === '' ||
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice
    return matchesCategory && matchesSearch && matchesPrice
  })

  // Sort products
  filteredProducts = sortProducts(filteredProducts, sortType)

  // Update count (Menampilkan jumlah produk yang ditemukan)
  const resultsCount = document.getElementById('results-count')
  if (resultsCount) {
    resultsCount.innerHTML = `Showing <strong>${filteredProducts.length}</strong> products`
  }

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
  const discount = discountPercent(product)
  const safeImage = isValidImageUrl(product.image)
    ? product.image
    : 'images/placeholder.jpg'
  const safeName = escapeHtml(product.name)

  return `
    <div class="product-card" data-product-id="${product.id}" role="button" tabindex="0">
      <div class="product-image-wrapper" onclick="window.location.hash='#product-detail?id=${product.id}'">
        <img src="${safeImage}" alt="${safeName}" class="product-img" loading="lazy" />
        ${discount > 0 ? `<span class="product-badge badge-discount">-${discount}%</span>` : ''}
        ${!product.inStock ? '<span class="product-badge badge-out">Out of Stock</span>' : ''}
        <button type="button" class="wishlist-btn product-wishlist" data-product-id="${product.id}" aria-label="Tambah ke wishlist">
          <i data-lucide="heart"></i>
        </button>
        <button type="button" class="quick-view-btn" data-product-id="${product.id}" aria-label="Quick view">
          <i data-lucide="eye"></i>
        </button>
      </div>
      <div class="product-info" onclick="window.location.hash='#product-detail?id=${product.id}'">
        <h3 class="product-title">${safeName}</h3>
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
          <button type="button" class="add-to-cart-btn btn-primary" data-product-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
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
  const flashSaleContainer = document.getElementById('flash-sale-grid')
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

  const prevBtn = document.querySelector('.carousel-prev')
  const nextBtn = document.querySelector('.carousel-next')
  const prevBtn = document.getElementById('category-prev')
  const nextBtn = document.getElementById('category-next')

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      categoryCarousel.scrollBy({ left: -200, behavior: 'smooth' })
      categoryCarousel.scrollBy({ left: -300, behavior: 'smooth' })
    })
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      categoryCarousel.scrollBy({ left: 200, behavior: 'smooth' })
      categoryCarousel.scrollBy({ left: 300, behavior: 'smooth' })
    })
  }

  // Tambahkan listener untuk category cards di carousel
  categoryCarousel.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const category = card.dataset.category
      setSelectedCategory(category)
      renderCategories()
      renderProducts()
      updateCategoryCarousel()
    })
  })

  // Setup Navigasi Flash Sale Carousel
  const flashSaleGrid = document.getElementById('flash-sale-grid')
  const fsPrev = document.getElementById('flash-sale-prev')
  const fsNext = document.getElementById('flash-sale-next')

  if (flashSaleGrid && fsPrev && fsNext) {
    fsPrev.addEventListener('click', () => {
      flashSaleGrid.scrollBy({ left: -300, behavior: 'smooth' })
    })
    fsNext.addEventListener('click', () => {
      flashSaleGrid.scrollBy({ left: 300, behavior: 'smooth' })
    })
  }

  // Event listener untuk tombol "Apply" pada filter harga
  const priceBtn = document.querySelector('.price-range .btn.primary')
  if (priceBtn) {
    priceBtn.addEventListener('click', (e) => {
      e.preventDefault()
      renderProducts()
      // Scroll halus ke grid produk setelah filter diterapkan
      const grid = document.getElementById('products-grid')
      if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }
}

/**
 * Update category carousel active state
 */
export function updateCategoryCarousel() {
  const selectedCategory = getSelectedCategory()
  const categoryItems = document.querySelectorAll('.category-card')

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
  // Mengambil ID dari hash karena navigasi menggunakan window.location.hash
  const hash = window.location.hash
  const paramsString = hash.includes('?') ? hash.split('?')[1] : ''
  const urlParams = new URLSearchParams(paramsString)
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

  const discount = discountPercent(product)
  const safeImage = isValidImageUrl(product.image)
    ? product.image
    : 'images/placeholder.jpg'
  const safeName = escapeHtml(product.name)
  const safeDescription = escapeHtml(product.description)

  detailContainer.innerHTML = `
    <div class="product-detail-page">
      <div class="product-detail-images">
        <img src="${safeImage}" alt="${safeName}" class="main-product-image" />
      </div>
      <div class="product-detail-info">
        <h1 class="product-detail-title">${safeName}</h1>
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
        <p class="product-detail-description">${safeDescription}</p>
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
          <button type="button" class="wishlist-btn btn-outline product-wishlist" data-product-id="${product.id}">
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
      import('./cart.js').then(cartModule => {
        for (let i = 0; i < quantity; i++) {
          cartModule.addToCart(product.id)
        }
      })
    })
  }
}

// Export for backward compatibility
export const initProducts = () => {
  renderCategories()
  renderProducts()
}
