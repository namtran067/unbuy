'use client'

import { useMemo, useState } from 'react'
import { Filter } from 'lucide-react'
import type { Product } from '@/lib/types'
import { CATEGORY_LABELS } from '@/lib/format'
import { ProductCard } from './product-card'

interface ProductGridProps {
  products: Product[]
  onPickProduct: (id: string) => void
}

const CATEGORIES = ['all', 'ring', 'necklace', 'earring', 'bracelet', 'pearl']

export function ProductGrid({ products, onPickProduct }: ProductGridProps) {
  const [category, setCategory] = useState<string>('all')

  const filtered = useMemo(() => {
    if (category === 'all') return products
    return products.filter((p) => p.category === category)
  }, [products, category])

  return (
    <section id="products" className="scroll-mt-20 border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              <Filter className="h-3.5 w-3.5" />
              Bộ sưu tập
            </div>
            <h2 className="font-serif text-3xl font-semibold text-champagne sm:text-4xl">
              Cửa hàng — kèm cảnh báo trung thực
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Mỗi sản phẩm đều hiển thị trước cảnh báo về mức độ rủi ro. Bấm vào
              để xem giải mã marketing &amp; lý do không nên mua chi tiết.
            </p>
          </div>
        </div>

        {/* Category filter */}
        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                category === c
                  ? 'border-gold bg-gold/15 text-gold'
                  : 'border-border text-muted-foreground hover:border-gold/40 hover:text-champagne'
              }`}
            >
              {CATEGORY_LABELS[c] ?? c}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
            Không có sản phẩm trong danh mục này.
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onClick={() => onPickProduct(p.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
