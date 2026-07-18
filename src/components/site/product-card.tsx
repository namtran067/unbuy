'use client'

import { Gem, ShieldQuestion, Eye } from 'lucide-react'
import type { Product } from '@/lib/types'
import { formatVND, CATEGORY_LABELS } from '@/lib/format'
import { Badge } from '@/components/ui/badge'

interface ProductCardProps {
  product: Product
  onClick: () => void
}

// Tính "honesty score" dựa trên số lý do không nên mua severity high
export function getHonestyPreview(product: Product): {
  level: 'transparent' | 'fair' | 'caution'
  label: string
  highCount: number
} {
  const highCount = product.whyNotToBuy.filter((r) => r.severity === 'high').length
  if (highCount >= 2) return { level: 'caution', label: 'Cảnh báo cao', highCount }
  if (highCount === 1) return { level: 'fair', label: 'Cần lưu ý', highCount }
  return { level: 'transparent', label: 'Đáng cân nhắc', highCount }
}

const HONESTY_STYLE = {
  transparent: { color: 'text-good', bg: 'bg-good/10', border: 'border-good/30' },
  fair: { color: 'text-warn', bg: 'bg-warn/10', border: 'border-warn/30' },
  caution: { color: 'text-bad', bg: 'bg-bad/10', border: 'border-bad/30' },
} as const

export function ProductCard({ product, onClick }: ProductCardProps) {
  const honesty = getHonestyPreview(product)
  const style = HONESTY_STYLE[honesty.level]
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0

  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card text-left transition-all hover:border-ink/30 hover:shadow-soft-lg"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-background">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />

        {/* Top badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badge && (
            <Badge className="border-border bg-background/90 text-ink backdrop-blur">
              {product.badge}
            </Badge>
          )}
          {discount > 0 && (
            <Badge className="border-bad/40 bg-background/80 text-bad backdrop-blur">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Honesty preview */}
        <div
          className={`absolute right-3 top-3 flex items-center gap-1 rounded-full border ${style.border} ${style.bg} px-2 py-0.5 text-[10px] font-semibold backdrop-blur`}
        >
          <ShieldQuestion className={`h-3 w-3 ${style.color}`} />
          <span className={style.color}>{honesty.label}</span>
        </div>

        {/* Quick verdict on hover */}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-center pb-3 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
          <span className="flex items-center gap-1.5 rounded-full border border-border bg-background/95 px-3 py-1.5 text-xs font-medium text-ink backdrop-blur">
            <Eye className="h-3.5 w-3.5" />
            Xem chi tiết
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          <Gem className="h-3 w-3 text-gold" />
          {CATEGORY_LABELS[product.category] ?? product.category}
          <span className="text-border">•</span>
          <span>{product.material}</span>
        </div>
        <h3 className="font-serif text-base font-semibold leading-snug text-ink line-clamp-2">
          {product.name}
        </h3>

        {product.carat && (
          <div className="mt-1 text-xs text-muted-foreground">
            {product.carat}ct
            {product.origin ? ` • ${product.origin}` : ''}
          </div>
        )}

        <div className="mt-auto pt-3">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg font-bold text-ink">
              {formatVND(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatVND(product.oldPrice)}
              </span>
            )}
          </div>
          <div className="mt-1.5 text-[11px] text-muted-foreground">
            {product.whyNotToBuy.length} lý do cần giải mã
          </div>
        </div>
      </div>
    </button>
  )
}
