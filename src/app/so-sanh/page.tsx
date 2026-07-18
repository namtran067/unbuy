'use client'

import { Suspense, useCallback, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Header } from '@/components/site/header'
import { Analyzer } from '@/components/site/analyzer'
import { ProductDetailDialog } from '@/components/site/product-detail-dialog'
import { Footer } from '@/components/site/footer'
import { AdminLoginDialog } from '@/components/site/admin-login-dialog'
import { AdminPanel } from '@/components/site/admin-panel'
import type { Product } from '@/lib/types'
import { isAdmin } from '@/lib/admin'

function SoSanhContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const prefill = searchParams.get('prefill')
  const productIdQuery = searchParams.get('product')

  const [products, setProducts] = useState<Product[]>([])
  const [productsLoading, setProductsLoading] = useState(true)

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  // Admin state - lazy initialized to avoid hydration issues & linter errors
  const [adminLoginOpen, setAdminLoginOpen] = useState(false)
  const [adminPanelOpen, setAdminPanelOpen] = useState(false)
  const [adminAuthed, setAdminAuthed] = useState(() => {
    if (typeof window !== 'undefined') {
      return isAdmin()
    }
    return false
  })

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
        }
      } catch (e) {
        console.error(e)
      } finally {
        if (active) setProductsLoading(false)
      }
    })()
    return () => {
      active = false
    }
  }, [])

  // Auto-open product detail dialog if "product" query param is present
  useEffect(() => {
    if (productIdQuery && products.length > 0) {
      const p = products.find((x) => x.id === productIdQuery)
      if (p) {
        const timer = setTimeout(() => {
          setSelectedProduct(p)
          setDetailOpen(true)
        }, 0)
        return () => clearTimeout(timer)
      }
    }
  }, [productIdQuery, products])

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

  // "Analyze with product" from detail dialog — on this page, just updates prefill query parameter!
  const handleAnalyzeWithProduct = useCallback(
    (id: string) => {
      setDetailOpen(false)
      router.push(`/so-sanh?prefill=${id}`)
    },
    [router]
  )

  const handleAdminClick = useCallback(() => {
    if (isAdmin()) {
      setAdminPanelOpen(true)
    } else {
      setAdminLoginOpen(true)
    }
  }, [])

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
    <div className="flex min-h-screen flex-col bg-background">
      <Header
        onNavigate={(id) => {
          if (id === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          } else {
            router.push(`/#${id}`)
          }
        }}
        onAdminClick={handleAdminClick}
      />

      <main className="flex-1">
        <div className="py-8">
          <Analyzer
            onPickProduct={openProduct}
            prefillProductId={prefill}
            onPrefillConsumed={() => {
              // Clear search params in URL without reloading
              router.replace('/so-sanh', { scroll: false })
            }}
          />
        </div>
      </main>

      <Footer
        onNavigate={(id) => {
          if (id === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          } else {
            router.push(`/#${id}`)
          }
        }}
        onAdminClick={handleAdminClick}
      />

      <ProductDetailDialog
        product={selectedProduct}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onAnalyzeWithProduct={handleAnalyzeWithProduct}
      />

      {/* Admin Panel */}
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

export default function SoSanhPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gold border-t-transparent mx-auto"></div>
            <p className="mt-4 text-sm text-muted-foreground font-medium">
              Đang tải trình phân tích...
            </p>
          </div>
        </div>
      }
    >
      <SoSanhContent />
    </Suspense>
  )
}
