'use client'

import {
  ShieldX,
  ShieldAlert,
  ShieldCheck,
  Tag,
  AlertTriangle,
  Wallet,
  Gem,
  ExternalLink,
  Lightbulb,
  Quote,
  ShoppingBag,
  Search,
} from 'lucide-react'
import type { AntiMarketingAnalysis } from '@/lib/types'
import { formatVND } from '@/lib/format'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface AnalysisResultProps {
  analysis: AntiMarketingAnalysis
  analyzedProducts: { id: string; name: string; price: number; image: string }[]
  webSources: { name: string; url: string; host: string }[]
  onPickProduct: (id: string) => void
}

const VERDICT_META = {
  AVOID: {
    label: 'KHÔNG NÊN MUA',
    icon: ShieldX,
    color: 'text-bad',
    bg: 'bg-bad/10',
    border: 'border-bad/40',
    ring: 'ring-bad/30',
  },
  RECONSIDER: {
    label: 'CÂN NHẮC KỸ',
    icon: ShieldAlert,
    color: 'text-warn',
    bg: 'bg-warn/10',
    border: 'border-warn/40',
    ring: 'ring-warn/30',
  },
  BUY: {
    label: 'ĐÁNG MUA',
    icon: ShieldCheck,
    color: 'text-good',
    bg: 'bg-good/10',
    border: 'border-good/40',
    ring: 'ring-good/30',
  },
} as const

const SEVERITY_META = {
  high: { label: 'Nghiêm trọng', color: 'text-bad', bg: 'bg-bad/10', border: 'border-bad/30' },
  medium: { label: 'Cần lưu ý', color: 'text-warn', bg: 'bg-warn/10', border: 'border-warn/30' },
  low: { label: 'Nhẹ', color: 'text-muted-foreground', bg: 'bg-muted/30', border: 'border-border' },
} as const

export function AnalysisResult({
  analysis,
  analyzedProducts,
  webSources,
  onPickProduct,
}: AnalysisResultProps) {
  const meta = VERDICT_META[analysis.verdict] ?? VERDICT_META.RECONSIDER
  const VerdictIcon = meta.icon

  // Map productId → product meta for recommended products
  const productMap = new Map(analyzedProducts.map((p) => [p.id, p]))

  return (
    <div className="mt-8 space-y-6">
      {/* Verdict banner */}
      <div
        className={`relative overflow-hidden rounded-2xl border ${meta.border} ${meta.bg} p-6 sm:p-8`}
      >
        <div className="absolute inset-0 bg-diamond-pattern opacity-20" />
        <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div
            className={`grid h-16 w-16 shrink-0 place-items-center rounded-full border ${meta.border} ${meta.bg}`}
          >
            <VerdictIcon className={`h-8 w-8 ${meta.color}`} />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`font-serif text-2xl font-bold ${meta.color} sm:text-3xl`}>
                {meta.label}
              </span>
              <Badge
                variant="outline"
                className={`border-current/40 ${meta.color} capitalize`}
              >
                Độ tin cậy: {analysis.confidence}
              </Badge>
            </div>
            <p className="mt-2 text-base leading-relaxed text-champagne">
              {analysis.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Marketing tactics decoded */}
      {analysis.marketingTactics.length > 0 && (
        <Card
          icon={Tag}
          title="Chiến lược Marketing đã giải mã"
          subtitle="Những nhãn & câu chuyện brand dùng để thuyết phục bạn"
          accent="gold"
        >
          <div className="space-y-3">
            {analysis.marketingTactics.map((t, i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-card-elevated p-4"
              >
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/15 text-xs font-bold text-gold">
                    {i + 1}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-champagne">
                      {t.tactic}
                    </div>
                    <div className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      <span className="text-warn">↳ Giải mã: </span>
                      {t.decoded}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Reasons not to buy */}
      {analysis.reasonsNotToBuy.length > 0 && (
        <Card
          icon={AlertTriangle}
          title="Lý do tại sao KHÔNG nên mua"
          subtitle="Sắp xếp theo mức độ nghiêm trọng"
          accent="warn"
        >
          <div className="space-y-3">
            {analysis.reasonsNotToBuy.map((r, i) => {
              const sev = SEVERITY_META[r.severity] ?? SEVERITY_META.medium
              return (
                <div
                  key={i}
                  className={`rounded-lg border ${sev.border} ${sev.bg} p-4`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-sm font-semibold ${sev.color}`}>
                      {r.reason}
                    </span>
                    <span
                      className={`rounded-full border ${sev.border} px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${sev.color}`}
                    >
                      {sev.label}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {r.detail}
                  </p>
                </div>
              )
            })}
          </div>
        </Card>
      )}

      {/* Budget + Material analysis */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card
          icon={Wallet}
          title="Phân tích ngân sách"
          accent="gold"
          compact
        >
          <p className="text-sm leading-relaxed text-muted-foreground">
            {analysis.budgetAnalysis}
          </p>
        </Card>
        <Card
          icon={Gem}
          title="Phân tích chất liệu & giá trị thực"
          accent="gold"
          compact
        >
          <p className="text-sm leading-relaxed text-muted-foreground">
            {analysis.materialAnalysis}
          </p>
        </Card>
      </div>

      {/* When worth buying */}
      {analysis.whenItIsWorthBuying && (
        <Card
          icon={Lightbulb}
          title="Khi nào sản phẩm này THỰC SỰ đáng mua?"
          accent="good"
        >
          <p className="text-sm leading-relaxed text-muted-foreground">
            {analysis.whenItIsWorthBuying}
          </p>
        </Card>
      )}

      {/* Alternatives from web */}
      {analysis.alternatives.length > 0 && (
        <Card
          icon={Search}
          title="Sản phẩm thay thế tốt hơn"
          subtitle="Từ thương hiệu & website khác — khách quan"
          accent="gold"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {analysis.alternatives.map((alt, i) => (
              <a
                key={i}
                href={alt.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg border border-border bg-card-elevated p-4 transition-colors hover:border-gold/50"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-champagne group-hover:text-gold">
                      {alt.name}
                    </div>
                    <div className="mt-0.5 text-xs font-medium text-gold">
                      {alt.brand}
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-gold" />
                </div>
                <div className="mt-2 text-xs font-medium text-champagne/80">
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

      {/* Recommended products from our catalog */}
      {analysis.recommendedProducts.length > 0 && (
        <Card
          icon={ShoppingBag}
          title="Sản phẩm trong CLARITY phù hợp với bạn hơn"
          subtitle="Đã được AI điều phối dựa trên nhu cầu của bạn"
          accent="good"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {analysis.recommendedProducts.map((rec, i) => {
              const p = productMap.get(rec.productId)
              if (!p)
                return (
                  <div
                    key={i}
                    className="rounded-lg border border-border bg-card-elevated p-4"
                  >
                    <div className="text-sm font-medium text-champagne">
                      {rec.reason}
                    </div>
                  </div>
                )
              return (
                <button
                  key={i}
                  onClick={() => onPickProduct(rec.productId)}
                  className="group flex gap-3 rounded-lg border border-border bg-card-elevated p-3 text-left transition-colors hover:border-good/50"
                >
                  <img
                    src={p.image}
                    alt=""
                    className="h-16 w-16 shrink-0 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-champagne group-hover:text-good">
                      {p.name}
                    </div>
                    <div className="mt-0.5 text-xs font-medium text-gold">
                      {formatVND(p.price)}
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {rec.reason}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </Card>
      )}

      {/* Final advice */}
      {analysis.finalAdvice && (
        <div className="relative overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/10 to-transparent p-6 sm:p-8">
          <div className="absolute inset-0 bg-diamond-pattern opacity-20" />
          <div className="relative">
            <Quote className="h-8 w-8 text-gold/60" />
            <p className="mt-3 font-serif text-lg leading-relaxed text-champagne sm:text-xl">
              {analysis.finalAdvice}
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold">
              <Gem className="h-3 w-3" />
              Lời khuyên từ CLARITY
            </div>
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
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card-elevated px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-gold/50 hover:text-champagne"
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

function Card({
  icon: Icon,
  title,
  subtitle,
  children,
  accent = 'gold',
  compact = false,
}: {
  icon: React.ElementType
  title: string
  subtitle?: string
  children: React.ReactNode
  accent?: 'gold' | 'warn' | 'good'
  compact?: boolean
}) {
  const accentColor =
    accent === 'warn' ? 'text-warn' : accent === 'good' ? 'text-good' : 'text-gold'
  return (
    <div className={`rounded-2xl border border-border bg-card ${compact ? 'p-5' : 'p-6'}`}>
      <div className="mb-4 flex items-start gap-3">
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-card-elevated ${accentColor}`}
        >
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <h3 className="font-serif text-lg font-semibold text-champagne">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}
