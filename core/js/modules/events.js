/* ===========================================
   MAIN EVENTS MODULE
   Coordinator for all event handlers - now modular
   =========================================== */

import { handleNavigationClick, setupMobileMenu } from './navEvents.js'
import {
  handleCartActions,
  setupCartToggle,
  handleWishlistActions,
  setupPromoCodeHandlers,
} from './cartEvents.js'
import { loadPage } from '../router.js'
import { setupForms } from './formEvents.js'
import { setSearchTerm, getCurrentPage, setSelectedCategory } from '../state.js'

async function safeRenderProducts() {
  try {
    const productModule = await import('../../components/products.js')
    if (!productModule) return
    if (typeof productModule.renderCategories === 'function') {
      productModule.renderCategories()
    }
    if (typeof productModule.renderProducts === 'function') {
      productModule.renderProducts()
    }
    if (typeof productModule.updateCategoryCarousel === 'function') {
      productModule.updateCategoryCarousel()
    }
  } catch (e) {
    console.warn('Gagal merender produk:', e)
  }
}

export function setupEventListeners() {
  document.addEventListener('click', handleNavigationClick)

  document.addEventListener('click', handleCartActions)
  document.addEventListener('click', handleWishlistActions)

  setupPromoCodeHandlers()

  setupCartToggle()
  setupMobileMenu()
  setupSearch()
  setupForms()
}

function setupSearch() {
  const categorySelect = document.getElementById('category-select')
  const inputs = [
    document.getElementById('search-input'),
    document.getElementById('mobile-search-input'),
  ].filter(Boolean)

  if (categorySelect) {
    categorySelect.addEventListener('change', event => {
      setSelectedCategory(event.target.value)
      handleSearchNavigation(inputs[0]?.value || '')
    })
  }

  if (!inputs.length && !categorySelect) return

  inputs.forEach(input => {
    input.addEventListener('input', event => {
      const value = event.target.value
      setSearchTerm(value)
      syncInputs(value, event.target)
      handleSearchNavigation(value)
    })

    input.addEventListener('keypress', event => {
      if (event.key === 'Enter' && event.target.value) {
        loadPage('shop')
      }
    })
  })

  function syncInputs(value, source) {
    inputs.forEach(input => {
      if (input !== source) {
        input.value = value
      }
    })
  }

  function handleSearchNavigation(value) {
    if (value && getCurrentPage() !== 'shop') {
      loadPage('shop')
    } else if (getCurrentPage() === 'shop') {
      safeRenderProducts()
    }
  }
}
