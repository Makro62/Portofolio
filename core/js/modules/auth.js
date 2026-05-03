/* ===========================================
   AUTHENTICATION MODULE
   Handles login, logout, and user sessions
   =========================================== */

import { loadPage } from '../router.js'

// Credentials
const VALID_USERNAME = 'admin'
const VALID_PASSWORD = 'admin'
const USER_DATA_KEY = 'freshfruits_user'

export function isLoggedIn() {
  const userData = localStorage.getItem(USER_DATA_KEY)
  return userData !== null
}

export function getCurrentUser() {
  const userData = localStorage.getItem(USER_DATA_KEY)
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
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData))
    updateAuthButton()
    return { success: true }
  }
  return { success: false, message: 'Invalid username or password' }
}

export function logout() {
  localStorage.removeItem(USER_DATA_KEY)
  updateAuthButton()
  loadPage('home')
}

export function updateAuthButton() {
  const authBtn = document.getElementById('auth-btn')
  if (!authBtn) return

  const wishlistBadge = document.getElementById('wishlist-badge')
  if (wishlistBadge) {
    const wishlist = JSON.parse(
      localStorage.getItem('freshfruits_wishlist') || '[]'
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
