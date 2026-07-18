'use client'

import { useState, useEffect } from 'react'
import {
  Loader2,
  Sparkles,
  Wand2,
  RotateCcw,
  ChevronRight,
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
import type { AnalyzeRequest, AntiMarketingAnalysis } from '@/lib/types'
import { AnalysisResult } from './analysis-result'

interface AnalyzerProps {
  prefillProductId?: string | null
  onPrefillConsumed?: () => void
  onPickProduct: (id: string) => void
}

const BUDGET_PRESETS = [10, 25, 50, 80, 120, 200]

export function Analyzer({
  prefillProductId,
  onPrefillConsumed,
  onPickProduct,
}: AnalyzerProps) {
  const [budget, setBudget] = useState<number>(50_000_000)
  const [material, setMaterial] = useState<string>('')
  const [occasion, setOccasion] = useState<string>('')
  const [needsText, setNeedsText] = useState<string>('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<AntiMarketingAnalysis | null>(null)
  const [catalogProducts, setCatalogProducts] = useState<
    {
      id: string
      name: string
      price: number
      image: string
      material: string
      category: string
    }[]
  >([])
  const [webSources, setWebSources] = useState<
    { name: string; url: string; host: string }[]
  >([])

  useEffect(() => {
    if (prefillProductId) {
      ;(async () => {
        try {
          const res = await fetch(`/api/products/${prefillProductId}`)
          const data = await res.json()
          if (data.success && data.product) {
            const p = data.product
            setBudget(p.price)
            
            // Try to match material option
            if (p.material) {
              const matchedMaterial = MATERIAL_OPTIONS.find(
                (m) => m.toLowerCase().includes(p.material.toLowerCase()) || 
                       p.material.toLowerCase().includes(m.toLowerCase())
              )
              if (matchedMaterial) setMaterial(matchedMaterial)
            }
            
            setNeedsText(
              `Tôi đang xem sản phẩm "${p.name}" (giá ${p.price.toLocaleString('vi-VN')}đ, chất liệu ${p.material}). Tôi muốn phân tích và tìm các sản phẩm thay thế tối ưu hơn.`
            )
          }
        } catch (e) {
          console.error('Failed to prefill product data', e)
        } finally {
          onPrefillConsumed?.()
          const el = document.getElementById('analyzer')
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })()
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
      setCatalogProducts(data.catalogProducts || [])
      setWebSources(data.webSources || [])
      // scroll to result
      setTimeout(() => {
        const el = document.getElementById('analysis-result')
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Lỗi không xác định')
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setAnalysis(null)
    setError(null)
    setCatalogProducts([])
    setWebSources([])
  }

  const canAnalyze = budget > 0 && !loading

  return (
    <section id="analyzer" className="scroll-mt-20 bg-background">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            Core Feature
          </div>
          <h2 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
            Nhập nhu cầu — AI khuyến nghị nên mua gì
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Bạn không cần tự chọn sản phẩm. Hãy cho SAIGONXUA biết ngân sách &
            nhu cầu — AI sẽ đi qua toàn bộ catalog, đưa ra danh sách{' '}
            <span className="font-medium text-good">NÊN MUA</span> và{' '}
            <span className="font-medium text-bad">KHÔNG NÊN MUA</span> (kèm lý
            do), rồi điều phối bạn đến lựa chọn tốt nhất.
          </p>
        </div>

        {/* Form card */}
        <div className="mt-10 overflow-hidden rounded-xl border border-border bg-card shadow-soft">
          <div className="border-b border-border/70 bg-secondary/40 px-6 py-4">
            <div className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-gold" />
              <h3 className="font-serif text-lg font-semibold text-ink">
                Thông tin của bạn
              </h3>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Càng chi tiết nhu cầu, AI khuyến nghị càng chính xác.
            </p>
          </div>

          <div className="space-y-7 p-6 sm:p-8">
            {/* Budget — prominent */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <Label className="text-sm font-semibold text-ink">
                  1. Ngân sách của bạn
                </Label>
                <span className="font-serif text-xl font-bold text-ink">
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
                        : 'border-border text-muted-foreground hover:border-ink/30 hover:text-ink'
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
                <Label className="mb-2 block text-sm font-semibold text-ink">
                  2. Chất liệu ưu tiên
                </Label>
                <Select value={material} onValueChange={setMaterial}>
                  <SelectTrigger className="w-full bg-background">
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
                <Label className="mb-2 block text-sm font-semibold text-ink">
                  3. Dịp sử dụng
                </Label>
                <Select value={occasion} onValueChange={setOccasion}>
                  <SelectTrigger className="w-full bg-background">
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

            {/* Needs text — the KEY input */}
            <div>
              <Label
                htmlFor="needs"
                className="mb-2 block text-sm font-semibold text-ink"
              >
                4. Nhu cầu chi tiết{' '}
                <span className="font-normal text-muted-foreground">
                  (rất quan trọng — kể cho AI nghe bạn muốn gì)
                </span>
              </Label>
              <Textarea
                id="needs"
                value={needsText}
                onChange={(e) => setNeedsText(e.target.value)}
                placeholder="Ví dụ: Tôi muốn nhẫn cầu hôn khoảng 50 triệu, cô ấy thích kim cương to lấp lánh, đeo hàng ngày, tay nhỏ. Tôi phân vân giữa kim cương tự nhiên và lab-grown..."
                className="min-h-[120px] resize-y bg-background"
              />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {[
                  'Nhẫn cầu hôn kim cương to',
                  'Dây chuyền đeo hàng ngày',
                  'Quà tặng kỷ niệm ngọc trai',
                  'Nhẫn cưới đôi vàng 18K',
                  'Tích trữ vàng 24K',
                ].map((hint) => (
                  <button
                    key={hint}
                    onClick={() => setNeedsText(hint)}
                    className="rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-ink/30 hover:text-ink"
                  >
                    {hint}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA — big, obvious, single */}
            <div className="rounded-lg border border-ink/15 bg-secondary/30 p-4">
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-center sm:text-left">
                  <div className="text-sm font-semibold text-ink">
                    Sẵn sàng? AI sẽ đi qua toàn bộ catalog và khuyến nghị
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Phân tích mất ~15-25 giây (bao gồm tìm kiếm web sản phẩm thay
                    thế)
                  </div>
                </div>
                <Button
                  onClick={handleAnalyze}
                  disabled={!canAnalyze}
                  size="lg"
                  className="w-full bg-ink text-background hover:bg-ink/90 sm:w-auto"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang phân tích...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Phân Tích & Khuyến Nghị
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-bad/40 bg-bad-soft px-4 py-3 text-sm text-bad">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="mt-6 space-y-4">
            <div className="h-20 animate-pulse animate-shimmer rounded-xl" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="h-48 animate-pulse animate-shimmer rounded-xl" />
              <div className="h-48 animate-pulse animate-shimmer rounded-xl" />
            </div>
            <div className="h-32 animate-pulse animate-shimmer rounded-xl" />
          </div>
        )}

        {/* Results */}
        {!loading && analysis && (
          <div id="analysis-result">
            <AnalysisResult
              analysis={analysis}
              catalogProducts={catalogProducts}
              webSources={webSources}
              onPickProduct={onPickProduct}
              onReset={handleReset}
            />
          </div>
        )}
      </div>
    </section>
  )
}
