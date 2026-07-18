'use client'

import { useState, useEffect } from 'react'
import {
  ShieldAlert,
  Loader2,
  Sparkles,
  Wand2,
  RotateCcw,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatVND, MATERIAL_OPTIONS, OCCASION_OPTIONS } from '@/lib/format'
import type { AnalyzeRequest, AntiMarketingAnalysis, Product } from '@/lib/types'
import { AnalysisResult } from './analysis-result'

interface AnalyzerProps {
  products: Product[]
  onPickProduct: (id: string) => void
  prefillProductId?: string | null
  onPrefillConsumed?: () => void
}

const BUDGET_PRESETS = [10, 25, 50, 80, 120, 200]

export function Analyzer({
  products,
  onPickProduct,
  prefillProductId,
  onPrefillConsumed,
}: AnalyzerProps) {
  const [budget, setBudget] = useState<number>(50_000_000)
  const [material, setMaterial] = useState<string>('')
  const [occasion, setOccasion] = useState<string>('')
  const [needsText, setNeedsText] = useState<string>('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [showProductPicker, setShowProductPicker] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<AntiMarketingAnalysis | null>(null)
  const [analyzedProducts, setAnalyzedProducts] = useState<
    { id: string; name: string; price: number; image: string }[]
  >([])
  const [webSources, setWebSources] = useState<
    { name: string; url: string; host: string }[]
  >([])

  useEffect(() => {
    if (prefillProductId) {
      setSelectedIds((prev) =>
        prev.includes(prefillProductId) ? prev : [prefillProductId]
      )
      setShowProductPicker(true)
      onPrefillConsumed?.()
    }
  }, [prefillProductId, onPrefillConsumed])

  async function handleAnalyze() {
    setLoading(true)
    setError(null)
    setAnalysis(null)
    try {
      const body: AnalyzeRequest = {
        budget,
        material: material || undefined,
        occasion: occasion || undefined,
        needsText: needsText.trim() || undefined,
        productIds: selectedIds.length > 0 ? selectedIds : undefined,
      }
      const res = await fetch('/api/anti-marketing/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!data.success) {
        throw new Error(data.error || 'Phân tích thất bại')
      }
      setAnalysis(data.analysis as AntiMarketingAnalysis)
      setAnalyzedProducts(data.analyzedProducts || [])
      setWebSources(data.webSources || [])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Lỗi không xác định')
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setAnalysis(null)
    setError(null)
    setAnalyzedProducts([])
    setWebSources([])
  }

  function toggleProduct(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  return (
    <section id="analyzer" className="scroll-mt-20 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <ShieldAlert className="h-3.5 w-3.5 text-warn" />
            Core Feature
          </div>
          <h2 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
            Giải Mã Sản Phẩm — Trước Khi Mở Ví
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Cho chúng tôi biết ngân sách và nhu cầu của bạn. SAIGONXUA sẽ phân
            tích sản phẩm, chỉ ra lý do{' '}
            <span className="text-warn font-medium">tại sao không nên mua</span>,
            và điều phối bạn đến lựa chọn thật sự phù hợp — kể cả từ thương hiệu
            khác.
          </p>
        </div>

        {/* Form card */}
        <div className="mt-10 overflow-hidden rounded-xl border border-border bg-card shadow-soft">
          <div className="border-b border-border/70 bg-secondary/40 px-6 py-4">
            <div className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-gold" />
              <h3 className="font-serif text-lg font-semibold text-ink">
                Thông tin khách hàng
              </h3>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Càng chi tiết, phân tích càng chính xác.
            </p>
          </div>

          <div className="space-y-6 p-6 sm:p-8">
            {/* Budget */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <Label className="text-sm font-medium text-ink">
                  Ngân sách của bạn
                </Label>
                <span className="font-serif text-lg font-semibold text-gold">
                  {formatVND(budget)}
                </span>
              </div>
              <Slider
                value={[budget]}
                onValueChange={(v) => setBudget(v[0])}
                min={3_000_000}
                max={250_000_000}
                step={1_000_000}
                className="py-2"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {BUDGET_PRESETS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setBudget(p * 1_000_000)}
                    className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                      budget === p * 1_000_000
                        ? 'border-ink bg-secondary text-ink'
                        : 'border-border text-muted-foreground hover:border-ink/40 hover:text-ink'
                    }`}
                  >
                    {p}tr
                  </button>
                ))}
              </div>
            </div>

            {/* Material + Occasion */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="mb-2 block text-sm font-medium text-ink">
                  Chất liệu ưu tiên
                </Label>
                <Select value={material} onValueChange={setMaterial}>
                  <SelectTrigger className="w-full bg-input/40">
                    <SelectValue placeholder="Không xác định" />
                  </SelectTrigger>
                  <SelectContent>
                    {MATERIAL_OPTIONS.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-2 block text-sm font-medium text-ink">
                  Dịp sử dụng
                </Label>
                <Select value={occasion} onValueChange={setOccasion}>
                  <SelectTrigger className="w-full bg-input/40">
                    <SelectValue placeholder="Không xác định" />
                  </SelectTrigger>
                  <SelectContent>
                    {OCCASION_OPTIONS.map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Needs text */}
            <div>
              <Label
                htmlFor="needs"
                className="mb-2 block text-sm font-medium text-ink"
              >
                Nhu cầu chi tiết{' '}
                <span className="text-muted-foreground">(tùy chọn — nhưng rất nên điền)</span>
              </Label>
              <Textarea
                id="needs"
                value={needsText}
                onChange={(e) => setNeedsText(e.target.value)}
                placeholder="Vd: Tôi muốn nhẫn cầu hôn khoảng 50 triệu, cô ấy thích kim cương lấp lánh to một chút, đeo hàng ngày, tay nhỏ. Tôi phân vân giữa kim cương tự nhiên và lab-grown..."
                className="min-h-[110px] resize-y bg-input/40"
              />
              <p className="mt-1.5 text-xs text-muted-foreground">
                AI sẽ tìm kiếm sản phẩm tương tự trên web và khuyến nghị chính
                xác hơn khi biết nhu cầu cụ thể.
              </p>
            </div>

            {/* Optional product picker */}
            <div>
              <button
                onClick={() => setShowProductPicker((v) => !v)}
                className="flex w-full items-center justify-between rounded-lg border border-border bg-input/20 px-4 py-3 text-left text-sm font-medium text-ink transition-colors hover:bg-input/40"
              >
                <span>
                  {selectedIds.length > 0
                    ? `Đã chọn ${selectedIds.length} sản phẩm cụ thể để giải mã`
                    : 'Chọn sản phẩm cụ thể để giải mã (tùy chọn)'}
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    showProductPicker ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {showProductPicker && (
                <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg border border-border bg-card-elevated p-3 sm:grid-cols-3 lg:grid-cols-4">
                  {products.map((p) => {
                    const active = selectedIds.includes(p.id)
                    return (
                      <button
                        key={p.id}
                        onClick={() => toggleProduct(p.id)}
                        className={`flex items-center gap-2 rounded-md border p-2 text-left transition-colors ${
                          active
                            ? 'border-ink bg-secondary'
                            : 'border-border hover:border-ink/40'
                        }`}
                      >
                        <img
                          src={p.image}
                          alt=""
                          className="h-9 w-9 rounded object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-xs font-medium text-ink">
                            {p.name}
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            {formatVND(p.price)}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
              <p className="mt-1.5 text-xs text-muted-foreground">
                Nếu không chọn, AI sẽ tự chọn sản phẩm phù hợp ngân sách của bạn.
              </p>
            </div>

            {/* Action */}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button
                onClick={handleAnalyze}
                disabled={loading}
                size="lg"
                className="flex-1 bg-ink text-background hover:bg-ink/90"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang giải mã & tìm kiếm sản phẩm thay thế...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Giải Mã & Khuyến Nghị
                  </>
                )}
              </Button>
              {analysis && (
                <Button
                  onClick={handleReset}
                  size="lg"
                  variant="outline"
                  className="border-border text-ink hover:bg-accent"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Phân tích lại
                </Button>
              )}
            </div>

            {error && (
              <div className="rounded-lg border border-bad/40 bg-bad/10 px-4 py-3 text-sm text-bad">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="mt-8 space-y-4">
            <div className="h-24 animate-pulse rounded-xl animate-shimmer" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="h-40 animate-pulse rounded-xl animate-shimmer" />
              <div className="h-40 animate-pulse rounded-xl animate-shimmer" />
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && analysis && (
          <AnalysisResult
            analysis={analysis}
            analyzedProducts={analyzedProducts}
            webSources={webSources}
            onPickProduct={onPickProduct}
          />
        )}
      </div>
    </section>
  )
}
