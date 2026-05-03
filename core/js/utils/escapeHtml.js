/* ===========================================
   HTML ESCAPE — satu sumber untuk teks ke DOM
   =========================================== */

/**
 * @param {unknown} unsafe
 * @returns {string}
 */
export function escapeHtml(unsafe) {
  if (unsafe == null) return ''
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/** @param {unknown} url */
export function isValidImageUrl(url) {
  return typeof url === 'string' && url.trim().length > 0
}
