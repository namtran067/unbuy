'use client'

import { ShieldAlert, Sparkles, ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeroProps {
  onAnalyze: () => void
  onShop: () => void
}

export function Hero({ onAnalyze, onShop }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-diamond-radial">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/products/hero.jpg"
          alt=""
          aria-hidden
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        <div className="absolute inset-0 bg-diamond-pattern opacity-30" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold">
            <Sparkles className="h-3.5 w-3.5 animate-sparkle" />
            Cửa hàng trang sức trung thực đầu tiên
          </div>

          <h1 className="font-serif text-4xl font-semibold leading-[1.1] text-champagne sm:text-5xl lg:text-6xl">
            Đừng mua kim cương
            <br />
            <span className="text-gradient-gold">cho đến khi chúng tôi</span>
            <br />
            giải mã cho bạn.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            CLARITY không bán cho bạn giấc mơ. Chúng tôi{' '}
            <span className="text-warn font-medium">
              giải mã chiến lược marketing
            </span>
            , phân tích giá trị thực, và nói thẳng{' '}
            <span className="text-champagne font-medium">
              tại sao bạn KHÔNG nên mua
            </span>{' '}
            sản phẩm này — rồi điều phối bạn đến lựa chọn thật sự phù hợp.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              onClick={onAnalyze}
              size="lg"
              className="group w-full bg-gold text-primary-foreground hover:bg-gold/90 sm:w-auto"
            >
              <ShieldAlert className="mr-2 h-4 w-4" />
              Giải Má Sản Phẩm Của Tôi
            </Button>
            <Button
              onClick={onShop}
              size="lg"
              variant="outline"
              className="w-full border-border bg-card/50 text-champagne hover:bg-accent sm:w-auto"
            >
              Xem Cửa Hàng
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 gap-4 border-t border-border/60 pt-8">
            <Stat value="100%" label="Trung thực" />
            <Stat value="4C" label="Giải mã đầy đủ" />
            <Stat value="0đ" label="Phí tư vấn" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-serif text-3xl font-semibold text-gradient-gold sm:text-4xl">
        {value}
      </div>
      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground sm:text-sm">
        {label}
      </div>
    </div>
  )
}
