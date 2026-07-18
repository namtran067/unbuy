'use client'

import { AlertTriangle, CheckCircle2, ExternalLink, Sparkles, X, Loader2 } from 'lucide-react'
import type { Product } from '@/lib/types'
import { formatVND, CATEGORY_LABELS } from '@/lib/format'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useState } from 'react'

interface ProductDetailDialogProps {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onAnalyzeWithProduct: (id: string) => void
}

const SEVERITY_STYLE = {
  high: { color: 'text-bad', bg: 'bg-bad-soft', border: 'border-bad/30', label: 'Nghiêm trọng' },
  medium: { color: 'text-warn', bg: 'bg-warn-soft', border: 'border-warn/30', label: 'Cần lưu ý' },
  low: { color: 'text-muted-foreground', bg: 'bg-muted', border: 'border-border', label: 'Nhẹ' },
} as const

interface AIWhyNotToBuy {
  reason: string
  detail: string
  severity: 'high' | 'medium' | 'low'
}

interface AISimilarProduct {
  productId: string
  name: string
  price: number
  image: string
  reason: string
}

interface AIExternalAlternative {
  name: string
  brand: string
  url: string
  priceRange: string
  whyBetter: string
  image?: string
}

interface AIAnalysis {
  rewrittenWhyNotToBuy: AIWhyNotToBuy[]
  honestVerdict: string
  similarProducts: AISimilarProduct[]
  externalAlternatives: AIExternalAlternative[]
  summary: string
}

export function ProductDetailDialog({
  product,
  open,
  onOpenChange,
  onAnalyzeWithProduct,
}: ProductDetailDialogProps) {
  const [userNeeds, setUserNeeds] = useState('')
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!product) return null

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0

  const handleAIAnalysis = async () => {
    if (!userNeeds.trim()) return
    setLoading(true)
    setError(null)
    setAiAnalysis(null)
    try {
      const res = await fetch('/api/ai/product-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, userNeeds }),
      })
      const data = await res.json()
      if (!data.success) {
        setError(data.error || 'Không thể phân tích')
        return
      }
      setAiAnalysis(data.analysis)
    } catch {
      setError('Không thể kết nối AI')
    } finally {
      setLoading(false)
    }
  }

  const showAIWhyNot = (aiAnalysis?.rewrittenWhyNotToBuy?.length ?? 0) > 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-hidden border-border bg-background p-0 sm:max-w-4xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>Chi tiết & lý do không nên mua</DialogDescription>
        </DialogHeader>

        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-20 grid h-8 w-8 place-items-center rounded-full border border-border bg-background/90 text-muted-foreground backdrop-blur transition-colors hover:text-ink"
          aria-label="Đóng"
        >
          <X className="h-4 w-4" />
        </button>

        <ScrollArea className="scroll-luxe max-h-[92vh]">
          <div className="grid gap-0 md:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-square bg-secondary md:aspect-auto">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute left-4 top-4 flex flex-col gap-1.5">
                {product.badge && (
                  <Badge className="border-border bg-background/90 text-ink backdrop-blur">
                    {product.badge}
                  </Badge>
                )}
                {discount > 0 && (
                  <Badge className="border-bad/30 bg-background/90 text-bad backdrop-blur">
                    -{discount}%
                  </Badge>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col p-6">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                <Sparkles className="h-3 w-3 text-gold" />
                {CATEGORY_LABELS[product.category] ?? product.category}
                <span className="text-border">•</span>
                <span>{product.material}</span>
              </div>
              <h2 className="mt-1 font-serif text-2xl font-semibold leading-snug text-ink">
                {product.name}
              </h2>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-serif text-2xl font-bold text-ink">
                  {formatVND(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatVND(product.oldPrice)}
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              {/* Specs */}
              <div className="mt-4 grid grid-cols-2 gap-2 rounded-lg border border-border bg-secondary/40 p-3 text-xs">
                {product.carat && <Spec label="Carat" value={`${product.carat}ct`} />}
                {product.cutGrade && <Spec label="Giác cắt" value={product.cutGrade} />}
                {product.colorGrade && <Spec label="Màu" value={product.colorGrade} />}
                {product.clarityGrade && (
                  <Spec label="Tinh khiết" value={product.clarityGrade} />
                )}
                {product.origin && <Spec label="Nguồn gốc" value={product.origin} />}
                <Spec label="Chất liệu" value={product.material} />
              </div>

              {/* AI needs input */}
              <div className="mt-5 space-y-2">
                <label className="text-xs font-medium text-muted-foreground">
                  Nhu cầu của bạn (để AI tư vấn riêng cho bạn)
                </label>
                <textarea
                  value={userNeeds}
                  onChange={(e) => setUserNeeds(e.target.value)}
                  placeholder="Ví dụ: Tôi cần nhẫn cầu hôn, bạn gái thích kim cương to, đeo hàng ngày, ngân sách 50tr..."
                  className="h-24 w-full rounded-lg border border-border bg-secondary/40 p-3 text-sm text-ink placeholder:text-muted-foreground/70 focus:border-ink/30 focus:outline-none"
                />
                <Button
                  onClick={handleAIAnalysis}
                  disabled={loading || !userNeeds.trim()}
                  className="w-full bg-gold text-ink hover:bg-gold/90"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  {loading ? 'Đang phân tích...' : 'Phân tích AI theo nhu cầu của tôi'}
                </Button>
              </div>

              {error && (
                <div className="mt-2 rounded-lg border border-bad/30 bg-bad-soft p-3 text-xs text-bad">
                  {error}
                </div>
              )}

              {/* Original CTA */}
              <Button
                onClick={() => onAnalyzeWithProduct(product.id)}
                variant="outline"
                className="mt-3 border-border hover:border-ink/30"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Phân tích toàn bộ catalog
              </Button>
            </div>
          </div>

          {/* AI Results - only shows AI-rewritten whyNotToBuy and alternatives */}
          {aiAnalysis && (
            <div className="space-y-6 border-t border-border/70 p-6">
              {/* AI Rewritten Why Not To Buy - replaces DB version */}
              {showAIWhyNot && (
                <div className="space-y-3">
                  <h3 className="font-serif text-base font-semibold text-ink">
                    Lý do tại sao KHÔNG nên mua
                  </h3>
                  <div className="space-y-2.5">
                    {(aiAnalysis.rewrittenWhyNotToBuy || []).map((r, i) => {
                      const s =
                        SEVERITY_STYLE[r.severity] ?? SEVERITY_STYLE.medium
                      return (
                        <div
                          key={i}
                          className={`rounded-lg border ${s.border} ${s.bg} p-3`}
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`text-sm font-semibold ${s.color}`}>
                              {r.reason}
                            </span>
                            <span
                              className={`rounded-full border ${s.border} px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider ${s.color}`}
                            >
                              {s.label}
                            </span>
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            {r.detail}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* When to buy - always show after why-not-to-buy */}
              {product.whenToBuy && (
                <div className="rounded-xl border border-good/30 bg-good/5 p-5">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-good">
                    <CheckCircle2 className="h-4 w-4" />
                    Khi nào sản phẩm này đáng mua?
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {product.whenToBuy}
                  </p>
                </div>
              )}

              {/* Similar Products - own catalog */}
              {aiAnalysis.similarProducts?.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-serif text-base font-semibold text-ink">
                    Sản phẩm tương tự bạn có thể thích
                  </h3>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {aiAnalysis.similarProducts.map((sp, i) => (
                      <a
                        key={i}
                        href={`/products/${sp.productId}`}
                        className="group rounded-lg border border-border bg-card p-3 transition-colors hover:border-ink/30"
                      >
                        <div className="flex gap-3">
                          <img
                            src={sp.image}
                            alt={sp.name}
                            className="h-16 w-16 rounded-md object-cover"
                          />
                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-ink group-hover:text-gold">
                              {sp.name}
                            </div>
                            <div className="mt-0.5 text-xs font-medium text-gold">
                              {formatVND(sp.price)}
                            </div>
                            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                              {sp.reason}
                            </p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* External Alternatives with images */}
              {aiAnalysis.externalAlternatives?.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-serif text-base font-semibold text-ink">
                    Gợi ý thêm từ thương hiệu khác
                  </h3>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {aiAnalysis.externalAlternatives.map((alt, i) => (
                      <a
                        key={i}
                        href={alt.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group rounded-lg border border-border bg-card p-3 transition-colors hover:border-ink/30"
                      >
                        <div className="flex gap-3">
                          {alt.image && (
                            <img
                              src={alt.image}
                              alt={alt.name}
                              className="h-16 w-16 rounded-md object-cover"
                            />
                          )}
                          <div className="min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="truncate text-sm font-semibold text-ink group-hover:text-gold">
                                {alt.name}
                              </div>
                              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-gold" />
                            </div>
                            <div className="mt-0.5 text-xs font-medium text-gold">
                              {alt.brand}
                            </div>
                            <div className="mt-1.5 text-xs text-ink/70">
                              {alt.priceRange}
                            </div>
                            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                              {alt.whyBetter}
                            </p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Original DB content (shown when no AI analysis yet) */}
          {!aiAnalysis && (
            <div className="space-y-6 border-t border-border/70 p-6">
              {/* Reasons not to buy */}
              {product.whyNotToBuy.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-serif text-base font-semibold text-ink">
                    Lý do tại sao KHÔNG nên mua
                  </h3>
                  <div className="space-y-2.5">
                    {product.whyNotToBuy.map((r, i) => {
                      const s =
                        SEVERITY_STYLE[r.severity] ?? SEVERITY_STYLE.medium
                      return (
                        <div
                          key={i}
                          className={`rounded-lg border ${s.border} ${s.bg} p-3`}
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`text-sm font-semibold ${s.color}`}>
                              {r.reason}
                            </span>
                            <span
                              className={`rounded-full border ${s.border} px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider ${s.color}`}
                            >
                              {s.label}
                            </span>
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            {r.detail}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* When to buy */}
              {product.whenToBuy && (
                <div className="rounded-xl border border-good/30 bg-good/5 p-5">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-good">
                    <CheckCircle2 className="h-4 w-4" />
                    Khi nào sản phẩm này đáng mua?
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {product.whenToBuy}
                  </p>
                </div>
              )}

              {/* Alternatives */}
              {product.alternatives.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-serif text-base font-semibold text-ink">
                    Gợi ý thêm từ thương hiệu khác
                  </h3>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {product.alternatives.map((alt, i) => (
                      <a
                        key={i}
                        href={alt.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group rounded-lg border border-border bg-card p-3 transition-colors hover:border-ink/30"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-ink group-hover:text-gold">
                              {alt.name}
                            </div>
                            <div className="mt-0.5 text-xs font-medium text-gold">
                              {alt.brand}
                            </div>
                          </div>
                          <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-gold" />
                        </div>
                        <div className="mt-1.5 text-xs text-ink/70">
                          {alt.priceRange}
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                          {alt.whyBetter}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-0.5 font-medium text-ink">{value}</div>
    </div>
  )
}
