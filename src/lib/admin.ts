// Admin auth — hardcoded for quick access
// The password IS the admin key. Type correct password → stored in localStorage → sent as X-Admin-Key header.

export const ADMIN_KEY = 'saigonxua-admin-2025'

const LS_KEY = 'sx_admin_key'

export function getAdminKey(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(LS_KEY)
}

export function setAdminKey(key: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(LS_KEY, key)
}

export function clearAdminKey(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(LS_KEY)
}

export function isAdmin(): boolean {
  return getAdminKey() === ADMIN_KEY
}

// Helper to add admin header to fetch
export function adminHeaders(extra: HeadersInit = {}): HeadersInit {
  const key = getAdminKey()
  return {
    'Content-Type': 'application/json',
    ...(key ? { 'X-Admin-Key': key } : {}),
    ...extra,
  }
}
