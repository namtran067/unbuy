'use client'

import { ShieldAlert, ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeroProps {
  onAnalyze: () => void
  onShop: () => void
}

export function Hero({ onAnalyze, onShop }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-28">
        {/* Left: copy */}
        <div className="flex flex-col justify-center">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary/60 px-3.5 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Cửa hàng trang sức trung thực
          </div>

          <h1 className="font-serif text-4xl font-semibold leading-[1.12] text-ink sm:text-5xl lg:text-[3.4rem]">
            Đừng mua trang sức
            <br />
            cho đến khi chúng tôi
            <br />
            <span className="text-accent-gold">nói sự thật cho bạn.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            SAIGONXUA không bán giấc mơ. Chúng tôi phân tích giá trị thực, chỉ ra{' '}
            <span className="font-medium text-warn">tại sao bạn không nên mua</span>{' '}
            sản phẩm này — rồi điều phối bạn đến lựa chọn thật sự phù hợp ngân sách
            &amp; nhu cầu.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={onAnalyze}
              size="lg"
              className="bg-ink text-background hover:bg-ink/90"
            >
              <ShieldAlert className="mr-2 h-4 w-4" />
              Giải Mã Sản Phẩm Của Tôi
            </Button>
            <Button
              onClick={onShop}
              size="lg"
              variant="outline"
              className="border-border text-ink hover:bg-secondary"
            >
              Xem Cửa Hàng
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Right: image */}
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-sm bg-secondary sm:aspect-[5/4] lg:aspect-[4/5]">
            <img
              src="/products/hero.jpg"
              alt="Trang sức kim cương SAIGONXUA"
              className="h-full w-full object-cover"
            />
          </div>
          {/* Minimal floating badge */}
          <div className="absolute bottom-4 left-4 rounded-md border border-border bg-background/90 px-4 py-2.5 backdrop-blur-sm">
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Cam kết
            </div>
            <div className="mt-0.5 text-sm font-medium text-ink">
              100% trung thực
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
