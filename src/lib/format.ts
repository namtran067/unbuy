// Format helpers

export function formatVND(amount: number): string {
  if (!amount && amount !== 0) return '—'
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatCompactVND(amount: number): string {
  if (amount >= 1_000_000) {
    const m = amount / 1_000_000
    return `${m % 1 === 0 ? m : m.toFixed(1)}tr`
  }
  if (amount >= 1_000) {
    const k = amount / 1_000
    return `${k}k`
  }
  return String(amount)
}

export const CATEGORY_LABELS: Record<string, string> = {
  all: 'Tất cả',
  ring: 'Nhẫn',
  necklace: 'Dây chuyền',
  earring: 'Hoa tai',
  bracelet: 'Lắc tay',
  pearl: 'Ngọc trai',
  diamond: 'Kim cương',
}

export const BUDGET_LABELS: Record<string, string> = {
  low: 'Phổ thông (<15tr)',
  mid: 'Tầm trung (15–40tr)',
  high: 'Cao cấp (40–100tr)',
  luxury: 'Luxury (>100tr)',
}

export const MATERIAL_OPTIONS = [
  'Vàng 18K',
  'Vàng 14K',
  'Vàng 24K',
  'Vàng trắng',
  'Vàng hồng',
  'Bạch kim (Platinum)',
  'Bạc 925',
] as const

export const OCCASION_OPTIONS = [
  'Cầu hôn',
  'Kỷ niệm',
  'Quà tặng',
  'Đeo hàng ngày',
  'Tích trữ',
  'Khác',
] as const
