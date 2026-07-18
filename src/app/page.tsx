'use client'

import { useCallback, useEffect, useState } from 'react'
import { Header } from '@/components/site/header'
import { Hero } from '@/components/site/hero'
import { Analyzer } from '@/components/site/analyzer'
import { ProductGrid } from '@/components/site/product-grid'
import { ProductDetailDialog } from '@/components/site/product-detail-dialog'
import { Footer } from '@/components/site/footer'
import { AdminLoginDialog } from '@/components/site/admin-login-dialog'
import { AdminPanel } from '@/components/site/admin-panel'
import type { Product } from '@/lib/types'
import { isAdmin } from '@/lib/admin'
import {
  Search,
  Scale,
  Sparkles,
  Eye,
  MessageCircleQuestion,
} from 'lucide-react'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [productsLoading, setProductsLoading] = useState(true)
  const [productsError, setProductsError] = useState<string | null>(null)

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const [prefillProductId, setPrefillProductId] = useState<string | null>(null)

  // Admin state
  const [adminLoginOpen, setAdminLoginOpen] = useState(false)
  const [adminPanelOpen, setAdminPanelOpen] = useState(false)
  const [adminAuthed, setAdminAuthed] = useState(false)

  useEffect(() => {
    setAdminAuthed(isAdmin())
  }, [])

  // Fetch products
  useEffect(() => {
    let active = true
    ;(async () => {
      try {
        setProductsLoading(true)
        const res = await fetch('/api/products')
        const data = await res.json()
        if (!active) return
        if (data.success) {
          setProducts(data.products)
        } else {
          setProductsError(data.error || 'Không tải được sản phẩm')
        }
      } catch (e) {
        if (active)
          setProductsError(e instanceof Error ? e.message : 'Lỗi mạng')
      } finally {
        if (active) setProductsLoading(false)
      }
    })()
    return () => {
      active = false
    }
  }, [])

  // Open detail dialog by product id
  const openProduct = useCallback(
    (id: string) => {
      const p = products.find((x) => x.id === id) || null
      if (p) {
        setSelectedProduct(p)
        setDetailOpen(true)
      }
    },
    [products]
  )

  // Scroll helper
  const scrollTo = useCallback((id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  // "Analyze with product" from detail dialog
  const handleAnalyzeWithProduct = useCallback(
    (id: string) => {
      setDetailOpen(false)
      setPrefillProductId(id)
      // scroll to analyzer
      setTimeout(() => scrollTo('analyzer'), 150)
    },
    [scrollTo]
  )

  // Admin click — if already authed, open panel; else open login
  const handleAdminClick = useCallback(() => {
    if (isAdmin()) {
      setAdminPanelOpen(true)
    } else {
      setAdminLoginOpen(true)
    }
  }, [])

  // Refetch products (after admin edits)
  const refetchProducts = useCallback(async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      if (data.success) setProducts(data.products)
    } catch {
      // ignore
    }
  }, [])

  return (
    <div id="top" className="flex min-h-screen flex-col bg-background">
      <Header onNavigate={scrollTo} onAdminClick={handleAdminClick} />

      <main className="flex-1">
        <Hero
          onAnalyze={() => scrollTo('analyzer')}
          onShop={() => scrollTo('products')}
        />

        <Analyzer
          onPickProduct={openProduct}
          prefillProductId={prefillProductId}
          onPrefillConsumed={() => setPrefillProductId(null)}
        />

        {productsLoading ? (
          <ProductsSkeleton />
        ) : productsError ? (
          <div className="mx-auto max-w-7xl px-4 py-16 text-center text-bad">
            {productsError}
          </div>
        ) : (
          <ProductGrid products={products} onPickProduct={openProduct} />
        )}

        <HowItWorks />
      </main>

      <Footer onNavigate={scrollTo} onAdminClick={handleAdminClick} />

      <ProductDetailDialog
        product={selectedProduct}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onAnalyzeWithProduct={handleAnalyzeWithProduct}
      />

      {/* Admin */}
      <AdminLoginDialog
        open={adminLoginOpen}
        onOpenChange={setAdminLoginOpen}
        onSuccess={() => {
          setAdminAuthed(true)
          setAdminLoginOpen(false)
          setAdminPanelOpen(true)
        }}
      />
      {adminAuthed && (
        <AdminPanel
          open={adminPanelOpen}
          onOpenChange={setAdminPanelOpen}
          onLogout={() => setAdminAuthed(false)}
          onProductsChanged={refetchProducts}
        />
      )}
    </div>
  )
}

function ProductsSkeleton() {
  return (
    <section className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="h-8 w-64 animate-pulse animate-shimmer rounded" />
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] animate-pulse animate-shimmer rounded-xl"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    {
      icon: MessageCircleQuestion,
      title: 'Bạn nhập nhu cầu',
      desc: 'Ngân sách + chất liệu + dịp sử dụng + nhu cầu chi tiết. Không cần tự chọn sản phẩm — AI sẽ làm việc đó.',
    },
    {
      icon: Search,
      title: 'AI đi qua toàn bộ catalog',
      desc: 'Hệ thống đối chiếu từng sản phẩm với nhu cầu + ngân sách của bạn, đồng thời tìm kiếm web sản phẩm thay thế từ PNJ, DOJI, Jemmia, Tiffany, Lightbox...',
    },
    {
      icon: Scale,
      title: 'Phân loại NÊN MUA / KHÔNG NÊN MUA',
      desc: 'Mỗi sản phẩm được đánh giá: phù hợp nhu cầu thì vào danh sách NÊN MUA (xếp hạng), không phù hợp thì vào KHÔNG NÊN MUA (kèm lý do + mức độ).',
    },
    {
      icon: Sparkles,
      title: 'Khuyến nghị cuối cùng',
      desc: 'AI tóm tắt nên mua gì, tránh gì, và gợi ý thay thế từ thương hiệu khác nếu catalog không có sản phẩm phù hợp.',
    },
  ]

  return (
    <section id="how" className="scroll-mt-20 border-t border-border/70 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <Eye className="h-3.5 w-3.5 text-gold" />
            Minh bạch tuyệt đối
          </div>
          <h2 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
            Cách SAIGONXUA khuyến nghị cho bạn
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Bốn bước từ lúc bạn nhập nhu cầu đến lúc ra quyết định — tất cả đều
            hướng tới một mục tiêu: bạn không bị lừa.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <div
                key={i}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-colors hover:border-ink/20"
              >
                <div className="absolute right-4 top-4 font-serif text-5xl font-bold text-border/50">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="relative">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-serif text-lg font-semibold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Manifesto */}
        <div className="mt-14 overflow-hidden rounded-xl border border-border bg-card p-8 sm:p-12">
          <div className="relative">
            <div className="hairline mb-6 w-24" />
            <p className="font-serif text-xl leading-relaxed text-ink sm:text-2xl">
              &ldquo;Chúng tôi không bán giấc mơ vĩnh cửu. Chúng tôi bán sự thật
              — để bạn mở ví vì hiểu rõ, không phải vì bị thuyết phục.&rdquo;
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold">
              <Sparkles className="h-3.5 w-3.5" />
              Tuyên ngôn SAIGONXUA
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
