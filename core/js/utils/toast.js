/* ===========================================
   TOAST NOTIFICATION UTILITY
   Modern toast notifications untuk feedback
   =========================================== */

export function showToast(message, type = 'info', duration = 3000) {
  let toastContainer = document.getElementById('toast-container')
  if (!toastContainer) {
    toastContainer = document.createElement('div')
    toastContainer.id = 'toast-container'
    toastContainer.className = 'toast-container'
    document.body.appendChild(toastContainer)
  }
  const toast = document.createElement('div')
  toast.className = `toast toast-${type}`
  const icons = {
    success: 'check-circle',
    error: 'x-circle',
    warning: 'alert-triangle',
    info: 'info',
  }
  const icon = icons[type] || icons.info
  toast.innerHTML = `
    <div class="toast-icon">
      <i data-lucide="${icon}"></i>
    </div>
    <div class="toast-message">${escapeHtml(message)}</div>
    <button class="toast-close" aria-label="Close notification">
      <i data-lucide="x"></i>
    </button>
  `
  toastContainer.appendChild(toast)
  if (window.lucide) {
    lucide.createIcons()
  }
  setTimeout(() => {
    toast.classList.add('show')
  }, 10)
  const closeBtn = toast.querySelector('.toast-close')
  closeBtn.addEventListener('click', () => {
    removeToast(toast)
  })
  setTimeout(() => {
    removeToast(toast)
  }, duration)
}

function removeToast(toast) {
  toast.classList.remove('show')
  toast.classList.add('hide')
  setTimeout(() => {
    toast.remove()
    const container = document.getElementById('toast-container')
    if (container && container.children.length === 0) {
      container.remove()
    }
  }, 300)
}

function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

export const toast = {
  success: (message, duration) => showToast(message, 'success', duration),
  error: (message, duration) => showToast(message, 'error', duration),
  warning: (message, duration) => showToast(message, 'warning', duration),
  info: (message, duration) => showToast(message, 'info', duration),
}
