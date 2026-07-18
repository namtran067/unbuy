'use client'

import {
  Tag,
  AlertTriangle,
  Gem,
  CheckCircle2,
  ExternalLink,
  Wand2,
  ShieldCheck,
  X,
} from 'lucide-react'
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

interface ProductDetailDialogProps {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onAnalyzeWithProduct: (id: string) => void
}

const SEVERITY_STYLE = {
  high: { color: 'text-bad', bg: 'bg-bad/10', border: 'border-bad/30', label: 'Nghiêm trọng' },
  medium: { color: 'text-warn', bg: 'bg-warn/10', border: 'border-warn/30', label: 'Cần lưu ý' },
  low: { color: 'text-muted-foreground', bg: 'bg-muted/30', border: 'border-border', label: 'Nhẹ' },
} as const

export function ProductDetailDialog({
  product,
  open,
  onOpenChange,
  onAnalyzeWithProduct,
}: ProductDetailDialogProps) {
  if (!product) return null

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-hidden border-border bg-card p-0 sm:max-w-4xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>Chi tiết & giải mã marketing</DialogDescription>
        </DialogHeader>

        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-20 grid h-8 w-8 place-items-center rounded-full border border-border bg-background/80 text-muted-foreground backdrop-blur transition-colors hover:text-champagne"
          aria-label="Đóng"
        >
          <X className="h-4 w-4" />
        </button>

        <ScrollArea className="scroll-luxe max-h-[92vh]">
          <div className="grid gap-0 md:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-square bg-background md:aspect-auto">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute left-4 top-4 flex flex-col gap-1.5">
                {product.badge && (
                  <Badge className="border-gold/40 bg-background/80 text-gold backdrop-blur">
                    {product.badge}
                  </Badge>
                )}
                {discount > 0 && (
                  <Badge className="border-bad/40 bg-background/80 text-bad backdrop-blur">
                    -{discount}%
                  </Badge>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col p-6">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                <Gem className="h-3 w-3 text-gold" />
                {CATEGORY_LABELS[product.category] ?? product.category}
                <span className="text-border">•</span>
                <span>{product.material}</span>
              </div>
              <h2 className="mt-1 font-serif text-2xl font-semibold leading-snug text-champagne">
                {product.name}
              </h2>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-serif text-2xl font-bold text-gold">
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
              <div className="mt-4 grid grid-cols-2 gap-2 rounded-lg border border-border bg-card-elevated p-3 text-xs">
                {product.carat && <Spec label="Carat" value={`${product.carat}ct`} />}
                {product.cutGrade && <Spec label="Giác cắt" value={product.cutGrade} />}
                {product.colorGrade && <Spec label="Màu" value={product.colorGrade} />}
                {product.clarityGrade && (
                  <Spec label="Tinh khiết" value={product.clarityGrade} />
                )}
                {product.origin && <Spec label="Nguồn gốc" value={product.origin} />}
                <Spec label="Chất liệu" value={product.material} />
              </div>

              {/* CTA */}
              <Button
                onClick={() => onAnalyzeWithProduct(product.id)}
                className="mt-5 bg-gold text-primary-foreground hover:bg-gold/90"
              >
                <Wand2 className="mr-2 h-4 w-4" />
                Phân tích AI theo nhu cầu của tôi
              </Button>
              <p className="mt-1.5 text-center text-xs text-muted-foreground">
                Nhập ngân sách & nhu cầu để AI khuyến nghị chính xác hơn
              </p>
            </div>
          </div>

          {/* Anti-marketing sections */}
          <div className="space-y-6 border-t border-border/60 p-6">
            {/* Honest verdict — top highlight */}
            <div className="rounded-xl border border-gold/40 bg-gradient-to-br from-gold/10 to-transparent p-5">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-gold">
                <ShieldCheck className="h-4 w-4" />
                Đánh giá trung thực
              </div>
              <p className="font-serif text-base leading-relaxed text-champagne">
                {product.honestVerdict}
              </p>
            </div>

            {/* Marketing tactics */}
            {product.marketingTactics.length > 0 && (
              <Section
                icon={Tag}
                title="Chiến lược Marketing đã giải mã"
                accent="gold"
              >
                <div className="space-y-2.5">
                  {product.marketingTactics.map((t, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-border bg-card-elevated p-3"
                    >
                      <div className="flex items-start gap-2">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/15 text-[10px] font-bold text-gold">
                          {i + 1}
                        </span>
                        <div>
                          <div className="text-sm font-semibold text-champagne">
                            {t.tactic}
                          </div>
                          <div className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                            <span className="text-warn">↳ </span>
                            {t.decoded}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Reasons not to buy */}
            {product.whyNotToBuy.length > 0 && (
              <Section
                icon={AlertTriangle}
                title="Lý do tại sao KHÔNG nên mua"
                accent="warn"
              >
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
              </Section>
            )}

            {/* When to buy */}
            {product.whenToBuy && (
              <Section
                icon={CheckCircle2}
                title="Khi nào sản phẩm này đáng mua?"
                accent="good"
              >
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {product.whenToBuy}
                </p>
              </Section>
            )}

            {/* Alternatives */}
            {product.alternatives.length > 0 && (
              <Section
                icon={ExternalLink}
                title="Sản phẩm thay thế từ thương hiệu khác"
                accent="gold"
              >
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {product.alternatives.map((alt, i) => (
                    <a
                      key={i}
                      href={alt.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-lg border border-border bg-card-elevated p-3 transition-colors hover:border-gold/50"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold text-champagne group-hover:text-gold">
                            {alt.name}
                          </div>
                          <div className="mt-0.5 text-xs font-medium text-gold">
                            {alt.brand}
                          </div>
                        </div>
                        <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-gold" />
                      </div>
                      <div className="mt-1.5 text-xs text-champagne/80">
                        {alt.priceRange}
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                        {alt.whyBetter}
                      </p>
                    </a>
                  ))}
                </div>
              </Section>
            )}
          </div>
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
      <div className="mt-0.5 font-medium text-champagne">{value}</div>
    </div>
  )
}

function Section({
  icon: Icon,
  title,
  children,
  accent = 'gold',
}: {
  icon: React.ElementType
  title: string
  children: React.ReactNode
  accent?: 'gold' | 'warn' | 'good'
}) {
  const color =
    accent === 'warn' ? 'text-warn' : accent === 'good' ? 'text-good' : 'text-gold'
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <span
          className={`grid h-7 w-7 place-items-center rounded-md border border-border bg-card-elevated ${color}`}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
        <h3 className="font-serif text-base font-semibold text-champagne">
          {title}
        </h3>
      </div>
      {children}
    </div>
  )
}
