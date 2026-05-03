/* ===========================================
   AUTHENTICATION MODULE
   Handles login, logout, and user sessions
   =========================================== */

import { loadPage } from '../router.js'
import { STORAGE_KEYS } from '../constants.js'

const VALID_USERNAME = 'admin'
const VALID_PASSWORD = 'admin'

export function isLoggedIn() {
  return localStorage.getItem(STORAGE_KEYS.USER) !== null
}

export function getCurrentUser() {
  const userData = localStorage.getItem(STORAGE_KEYS.USER)
  return userData ? JSON.parse(userData) : null
}

export function login(username, password) {
  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    const userData = {
      username: username,
      email: 'admin@freshfruits.com',
      name: 'Admin User',
      loginTime: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData))
    updateAuthButton()
    return { success: true }
  }
  return { success: false, message: 'Invalid username or password' }
}

export function logout() {
  localStorage.removeItem(STORAGE_KEYS.USER)
  updateAuthButton()
  loadPage('home')
}

export function updateAuthButton() {
  const authBtn = document.getElementById('auth-btn')
  if (!authBtn) return

  const wishlistBadge = document.getElementById('wishlist-badge')
  if (wishlistBadge) {
    const wishlist = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.WISHLIST) || '[]'
    )
    wishlistBadge.textContent = wishlist.length
  }

  if (isLoggedIn()) {
    const user = getCurrentUser()
    const btnText = authBtn.querySelector('span')
    if (btnText) btnText.textContent = user.username

    const icon = authBtn.querySelector('.auth-icon')
    if (icon) {
      icon.setAttribute('data-lucide', 'user-check')
    }
  } else {
    const btnText = authBtn.querySelector('span')
    if (btnText) btnText.textContent = 'Masuk/Daftar'

    const icon = authBtn.querySelector('.auth-icon')
    if (icon) {
      icon.setAttribute('data-lucide', 'user')
    }
  }
  if (window.lucide) {
    lucide.createIcons()
  }
}

export function handleAuthButtonClick() {
  if (isLoggedIn()) {
    loadPage('profile')
  } else {
    loadPage('login')
  }
}

export function initAuth() {
  updateAuthButton()
  const authBtn = document.getElementById('auth-btn')
  if (authBtn) {
    authBtn.addEventListener('click', handleAuthButtonClick)
  }
}
