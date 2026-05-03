/* ===========================================
   SEARCH AUTOCOMPLETE
   Modern search dengan suggestions
   =========================================== */

import { fruits } from '../data/products.js'
import { loadPage } from '../router.js'
import { setSearchTerm } from '../state.js'

const autocompleteContainer = null

export function initSearchAutocomplete() {
  const searchInput = document.getElementById('search-input')
  const mobileSearchInput = document.getElementById('mobile-search-input')
  if (searchInput) {
    setupAutocomplete(searchInput, 'desktop')
  }
  if (mobileSearchInput) {
    setupAutocomplete(mobileSearchInput, 'mobile')
  }
}

function setupAutocomplete(input, type) {
  const container = document.createElement('div')
  container.className = `search-autocomplete search-autocomplete-${type}`
  container.id = `search-autocomplete-${type}`
  input.parentElement.appendChild(container)
  input.addEventListener('input', e => {
    const query = e.target.value.trim()
    if (query.length >= 2) {
      showSuggestions(container, query)
    } else {
      hideSuggestions(container)
    }
  })
  input.addEventListener('focus', e => {
    const query = e.target.value.trim()
    if (query.length >= 2) {
      showSuggestions(container, query)
    }
  })
  input.addEventListener('blur', () => {
    setTimeout(() => hideSuggestions(container), 200)
  })
  input.addEventListener('keydown', e => {
    handleKeyboardNavigation(e, container)
  })
  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !container.contains(e.target)) {
      hideSuggestions(container)
    }
  })
}

function showSuggestions(container, query) {
  const results = searchProducts(query)
  if (results.length === 0) {
    container.innerHTML = `
      <div class="autocomplete-empty">
        <i data-lucide="search"></i>
        <p>Tidak ada hasil untuk "${escapeHtml(query)}"</p>
      </div>
    `
  } else {
    container.innerHTML = `
      <div class="autocomplete-header">
        <i data-lucide="search"></i>
        <span>Hasil Pencarian</span>
      </div>
      ${results
        .slice(0, 5)
        .map(
          product => `
        <div class="autocomplete-item" data-product-id="${product.id}">
          <img src="${product.image}" alt="${product.name}" class="autocomplete-img">
          <div class="autocomplete-info">
            <div class="autocomplete-name">${highlightMatch(product.name, query)}</div>
            <div class="autocomplete-meta">
              <span class="autocomplete-category">${getCategoryName(product.category)}</span>
              <span class="autocomplete-price">$${product.price}</span>
            </div>
          </div>
        </div>
      `
        )
        .join('')}
      ${
        results.length > 5
          ? `
        <div class="autocomplete-footer">
          <button class="autocomplete-view-all" id="view-all-results">
            Lihat semua ${results.length} hasil
          </button>
        </div>
      `
          : ''
      }
    `
  }
  container.classList.add('show')
  if (window.lucide) {
    lucide.createIcons()
  }
  setupSuggestionHandlers(container, query)
}

function hideSuggestions(container) {
  container.classList.remove('show')
}

function searchProducts(query) {
  const lowerQuery = query.toLowerCase()
  return fruits
    .filter(product => {
      return (
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery)
      )
    })
    .sort((a, b) => {
      const aNameMatch = a.name.toLowerCase().indexOf(lowerQuery)
      const bNameMatch = b.name.toLowerCase().indexOf(lowerQuery)
      if (aNameMatch !== -1 && bNameMatch === -1) return -1
      if (aNameMatch === -1 && bNameMatch !== -1) return 1
      if (aNameMatch !== -1 && bNameMatch !== -1) {
        return aNameMatch - bNameMatch
      }
      return b.rating - a.rating
    })
}

function highlightMatch(text, query) {
  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi')
  return escapeHtml(text).replace(regex, '<mark>$1</mark>')
}

function getCategoryName(categoryId) {
  const categoryMap = {
    berries: 'Berries',
    tropical: 'Tropical',
    citrus: 'Citrus',
    classic: 'Classic',
    exotic: 'Exotic',
  }
  return categoryMap[categoryId] || categoryId
}

function setupSuggestionHandlers(container, query) {
  container.querySelectorAll('.autocomplete-item').forEach(item => {
    item.addEventListener('click', () => {
      const productId = parseInt(item.dataset.productId)
      navigateToProduct(productId)
    })
  })
  const viewAllBtn = container.querySelector('#view-all-results')
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
      setSearchTerm(query)
      loadPage('shop')
      hideSuggestions(container)
    })
  }
}

function navigateToProduct(productId) {
  import('../state.js').then(state => {
    state.setSelectedProductId(productId)
    loadPage('product-detail')
  })
}

function handleKeyboardNavigation(e, container) {
  const items = container.querySelectorAll('.autocomplete-item')
  if (items.length === 0) return
  const activeItem = container.querySelector('.autocomplete-item.active')
  let currentIndex = activeItem ? Array.from(items).indexOf(activeItem) : -1
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      currentIndex = (currentIndex + 1) % items.length
      break
    case 'ArrowUp':
      e.preventDefault()
      currentIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1
      break
    case 'Enter':
      e.preventDefault()
      if (activeItem) {
        activeItem.click()
      }
      return
    case 'Escape':
      hideSuggestions(container)
      return
    default:
      return
  }
  items.forEach(item => item.classList.remove('active'))
  items[currentIndex].classList.add('active')
  items[currentIndex].scrollIntoView({ block: 'nearest' })
}

function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
