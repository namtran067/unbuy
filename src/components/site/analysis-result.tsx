'use client'

import {
  CheckCircle2,
  XCircle,
  Wallet,
  Gem,
  ExternalLink,
  Quote,
  Sparkles,
  RotateCcw,
  AlertTriangle,
  ThumbsUp,
} from 'lucide-react'
import type {
  AntiMarketingAnalysis,
  RecommendedProduct,
  AvoidedProduct,
} from '@/lib/types'
import { formatVND, CATEGORY_LABELS } from '@/lib/format'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface AnalysisResultProps {
  analysis: AntiMarketingAnalysis
  catalogProducts: {
    id: string
    name: string
    price: number
    image: string
    material: string
    category: string
  }[]
  webSources: { name: string; url: string; host: string }[]
  onPickProduct: (id: string) => void
  onReset: () => void
}

const SEVERITY_STYLE = {
  high: {
    color: 'text-bad',
    bg: 'bg-bad-soft',
    border: 'border-bad/30',
    label: 'Nghiêm trọng',
  },
  medium: {
    color: 'text-warn',
    bg: 'bg-warn-soft',
    border: 'border-warn/30',
    label: 'Cần lưu ý',
  },
  low: {
    color: 'text-muted-foreground',
    bg: 'bg-muted',
    border: 'border-border',
    label: 'Nhẹ',
  },
} as const

const FIT_STYLE = {
  high: { label: 'Phù hợp cao', color: 'text-good', bg: 'bg-good-soft', border: 'border-good/30' },
  medium: { label: 'Phù hợp vừa', color: 'text-warn', bg: 'bg-warn-soft', border: 'border-warn/30' },
} as const

export function AnalysisResult({
  analysis,
  catalogProducts,
  webSources,
  onPickProduct,
  onReset,
}: AnalysisResultProps) {
  const productMap = new Map(catalogProducts.map((p) => [p.id, p]))

  return (
    <div className="mt-6 space-y-5 animate-fade-up">
      {/* Top bar: summary + reset */}
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-secondary/40 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-gold">
            <Sparkles className="h-3.5 w-3.5" />
            Tóm tắt khuyến nghị
          </div>
          <p className="font-serif text-lg leading-relaxed text-ink">
            {analysis.summary}
          </p>
        </div>
        <Button
          onClick={onReset}
          variant="outline"
          size="sm"
          className="border-border text-muted-foreground hover:text-ink sm:shrink-0"
        >
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
          Phân tích lại
        </Button>
      </div>

      {/* === NÊN MUA — primary, green === */}
      <div className="overflow-hidden rounded-xl border border-good/30 bg-card shadow-soft">
        <div className="flex items-center gap-2 border-b border-good/20 bg-good-soft px-5 py-3.5">
          <ThumbsUp className="h-5 w-5 text-good" />
          <h3 className="font-serif text-lg font-semibold text-good">
            Sản phẩm NÊN MUA
          </h3>
          <Badge className="ml-1 border-good/30 bg-background text-good">
            {analysis.recommendedProducts.length}
          </Badge>
        </div>
        <div className="p-4 sm:p-5">
          {analysis.recommendedProducts.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Không có sản phẩm nào trong catalog thực sự phù hợp nhu cầu +
                ngân sách của bạn.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Xem phần "Sản phẩm thay thế" bên dưới — có thể thương hiệu khác
                phù hợp hơn.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {analysis.recommendedProducts.map((rec, idx) => (
                <RecommendedCard
                  key={rec.productId}
                  rec={rec}
                  rank={idx + 1}
                  product={productMap.get(rec.productId)}
                  onPick={onPickProduct}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* === KHÔNG NÊN MUA — red/amber === */}
      {analysis.avoidProducts.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-bad/30 bg-card shadow-soft">
          <div className="flex items-center gap-2 border-b border-bad/20 bg-bad-soft px-5 py-3.5">
            <XCircle className="h-5 w-5 text-bad" />
            <h3 className="font-serif text-lg font-semibold text-bad">
              Sản phẩm KHÔNG NÊN MUA
            </h3>
            <Badge className="ml-1 border-bad/30 bg-background text-bad">
              {analysis.avoidProducts.length}
            </Badge>
          </div>
          <div className="space-y-2.5 p-4 sm:p-5">
            {analysis.avoidProducts.map((av) => (
              <AvoidCard
                key={av.productId}
                av={av}
                product={productMap.get(av.productId)}
                onPick={onPickProduct}
              />
            ))}
          </div>
        </div>
      )}

      {/* Budget + Material analysis */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card icon={Wallet} title="Phân tích ngân sách" accent="gold">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {analysis.budgetAnalysis}
          </p>
        </Card>
        <Card icon={Gem} title="Phân tích chất liệu phù hợp" accent="gold">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {analysis.materialAnalysis}
          </p>
        </Card>
      </div>

      {/* Alternatives from web */}
      {analysis.alternatives.length > 0 && (
        <Card
          icon={ExternalLink}
          title="Sản phẩm thay thế từ thương hiệu khác"
          subtitle="Khách quan — từ PNJ, DOJI, Jemmia, Tiffany, Lightbox..."
          accent="gold"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {analysis.alternatives.map((alt, i) => (
              <a
                key={i}
                href={alt.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg border border-border bg-secondary/40 p-4 transition-colors hover:border-ink/30"
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
                  <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-gold" />
                </div>
                <div className="mt-2 text-xs font-medium text-ink/70">
                  {alt.priceRange}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {alt.whyBetter}
                </p>
              </a>
            ))}
          </div>
        </Card>
      )}

      {/* Final advice */}
      {analysis.finalAdvice && (
        <div className="rounded-xl border border-border bg-secondary/40 p-6 sm:p-7">
          <Quote className="h-7 w-7 text-gold/50" />
          <p className="mt-3 font-serif text-lg leading-relaxed text-ink sm:text-xl">
            {analysis.finalAdvice}
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold">
            <Gem className="h-3 w-3" />
            Lời khuyên từ SAIGONXUA
          </div>
        </div>
      )}

      {/* Web sources */}
      {webSources.length > 0 && (
        <div className="rounded-lg border border-border/60 bg-card/50 p-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            Nguồn tìm kiếm web đã tham chiếu
          </div>
          <div className="flex flex-wrap gap-2">
            {webSources.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-ink/30 hover:text-ink"
              >
                <ExternalLink className="h-3 w-3" />
                {s.host}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function RecommendedCard({
  rec,
  rank,
  product,
  onPick,
}: {
  rec: RecommendedProduct
  rank: number
  product?: { id: string; name: string; price: number; image: string; material: string; category: string }
  onPick: (id: string) => void
}) {
  const fit = FIT_STYLE[rec.fitScore] ?? FIT_STYLE.medium
  if (!product) return null
  return (
    <button
      onClick={() => onPick(product.id)}
      className="group flex w-full items-start gap-4 rounded-lg border border-border bg-background p-4 text-left transition-colors hover:border-good/40 hover:bg-good-soft/30"
    >
      {/* Rank badge */}
      <div className="flex flex-col items-center gap-1">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-good text-sm font-bold text-background">
          {rank}
        </span>
      </div>
      {/* Image */}
      <img
        src={product.image}
        alt=""
        className="h-20 w-20 shrink-0 rounded-md object-cover"
      />
      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="font-serif text-base font-semibold text-ink group-hover:text-good">
            {product.name}
          </h4>
          <span
            className={`rounded-full border ${fit.border} ${fit.bg} px-2 py-0.5 text-[10px] font-semibold ${fit.color}`}
          >
            {fit.label}
          </span>
        </div>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-semibold text-ink">{formatVND(product.price)}</span>
          <span>•</span>
          <span>{product.material}</span>
          <span>•</span>
          <span>{CATEGORY_LABELS[product.category] ?? product.category}</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          <CheckCircle2 className="mr-1 inline h-3.5 w-3.5 text-good" />
          {rec.reason}
        </p>
        {rec.caveat && (
          <p className="mt-1.5 text-xs leading-relaxed text-warn">
            <AlertTriangle className="mr-1 inline h-3 w-3" />
            Lưu ý: {rec.caveat}
          </p>
        )}
      </div>
    </button>
  )
}

function AvoidCard({
  av,
  product,
  onPick,
}: {
  av: AvoidedProduct
  product?: { id: string; name: string; price: number; image: string; material: string; category: string }
  onPick: (id: string) => void
}) {
  const sev = SEVERITY_STYLE[av.severity] ?? SEVERITY_STYLE.medium
  if (!product) return null
  return (
    <button
      onClick={() => onPick(product.id)}
      className="group flex w-full items-start gap-3 rounded-lg border border-border bg-background p-3 text-left transition-colors hover:border-bad/30 hover:bg-bad-soft/20"
    >
      <img
        src={product.image}
        alt=""
        className="h-14 w-14 shrink-0 rounded-md object-cover grayscale-[40%]"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="text-sm font-semibold text-ink line-through decoration-bad/40">
            {product.name}
          </h4>
          <span
            className={`rounded-full border ${sev.border} ${sev.bg} px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${sev.color}`}
          >
            {sev.label}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatVND(product.price)}
          </span>
        </div>
        <p className="mt-1 text-xs font-medium text-bad">
          <XCircle className="mr-1 inline h-3 w-3" />
          {av.reason}
        </p>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
          {av.detail}
        </p>
      </div>
    </button>
  )
}

function Card({
  icon: Icon,
  title,
  subtitle,
  children,
  accent = 'gold',
}: {
  icon: React.ElementType
  title: string
  subtitle?: string
  children: React.ReactNode
  accent?: 'gold' | 'warn' | 'good'
}) {
  const color =
    accent === 'warn' ? 'text-warn' : accent === 'good' ? 'text-good' : 'text-gold'
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
      <div className="mb-3 flex items-start gap-3">
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-md bg-secondary ${color}`}
        >
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <h3 className="font-serif text-base font-semibold text-ink">
            {title}
          </h3>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  )
}
