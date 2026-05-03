/* ===========================================
   STATE MODULE
   Manages application state
   =========================================== */

import { fruits } from './data/products.js'
import { STORAGE_KEYS } from './constants.js'

export const state = {
  cart: [],
  selectedCategory: 'all',
  searchTerm: '',
  sortType: 'featured',
  currentPage: 'home',
  selectedProductId: null,
  orderHistory: [
    {
      id: '1234567',
      date: 'May 15, 2025',
      status: 'delivered',
      items: [
        {
          id: 1,
          name: 'Organic Strawberries',
          image: 'https://placehold.co/80x80/ff6b81/ffffff?text=Strawberry',
          quantity: 2,
          priceAtPurchase: 4.99,
        },
        {
          id: 2,
          name: 'Sweet Mangoes',
          image: 'https://placehold.co/80x80/ffa630/ffffff?text=Mango',
          quantity: 3,
          priceAtPurchase: 2.99,
        },
      ],
    },
    {
      id: '1234566',
      date: 'May 10, 2025',
      status: 'processing',
      items: [
        {
          id: 3,
          name: 'Fresh Blueberries',
          image: 'https://placehold.co/80x80/5e60ce/ffffff?text=Blueberry',
          quantity: 1,
          priceAtPurchase: 5.99,
        },
      ],
    },
  ],
  wishlist: [],
}

// Getters
export const getCart = () => state.cart
export const getCurrentPage = () => state.currentPage
export const getSelectedCategory = () => state.selectedCategory
export const getSearchTerm = () => state.searchTerm
export const getSortType = () => state.sortType
export const getSelectedProductId = () => state.selectedProductId
export const getOrderHistory = () => state.orderHistory
export const getWishlist = () => state.wishlist

// Setters
export const setCurrentPage = page => {
  state.currentPage = page
}

export const setSelectedCategory = category => {
  state.selectedCategory = category
}

export const setSearchTerm = term => {
  state.searchTerm = term
}

export const setSortType = sortType => {
  state.sortType = sortType
}

export const addToCart = item => {
  state.cart.push(item)
  saveCartToStorage()
}

export const removeFromCart = id => {
  state.cart = state.cart.filter(item => item.id !== id)
  saveCartToStorage()
}

export const updateCartItem = (id, quantity) => {
  const item = state.cart.find(item => item.id === id)
  if (item) {
    item.quantity = quantity
  }
  saveCartToStorage()
}

export const clearCart = () => {
  state.cart = []
  saveCartToStorage()
}

export const setSelectedProductId = id => {
  state.selectedProductId = id
}

export const addToWishlist = productId => {
  const product = fruits.find(f => f.id === productId)
  if (product && !state.wishlist.find(item => item.id === productId)) {
    state.wishlist.push(product)
    saveWishlistToStorage()
  }
}

export const removeFromWishlist = productId => {
  state.wishlist = state.wishlist.filter(item => item.id !== productId)
  saveWishlistToStorage()
}

export const isInWishlist = productId => {
  return state.wishlist.some(item => item.id === productId)
}

export const toggleWishlist = productId => {
  if (isInWishlist(productId)) {
    removeFromWishlist(productId)
    return false
  } else {
    addToWishlist(productId)
    return true
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cart))
  } catch (e) {
    console.error('Failed to save cart:', e)
  }
}

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CART)
    if (saved) {
      state.cart = JSON.parse(saved)
    }
  } catch (e) {
    console.error('Failed to load cart:', e)
  }
}

function saveWishlistToStorage() {
  try {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(state.wishlist))
  } catch (e) {
    console.error('Failed to save wishlist:', e)
  }
}

function loadWishlistFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST)
    if (saved) {
      state.wishlist = JSON.parse(saved)
    }
  } catch (e) {
    console.error('Failed to load wishlist:', e)
  }
}

loadCartFromStorage()
loadWishlistFromStorage()
