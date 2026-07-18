'use client'

import { Gem, Heart } from 'lucide-react'

interface FooterProps {
  onNavigate: (id: string) => void
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 bg-card">
                <Gem className="h-4 w-4 text-gold" />
              </span>
              <div>
                <div className="font-serif text-xl font-semibold tracking-[0.25em] text-champagne">
                  CLARITY
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Honest Jewelry
                </div>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Cửa hàng trang sức kim cương đầu tiên đặt sự trung thực lên trên
              doanh thu. Chúng tôi tin rằng khách hàng xứng đáng biết sự thật
              trước khi mở ví.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-champagne">
              Khám phá
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('analyzer')}
                  className="text-muted-foreground transition-colors hover:text-gold"
                >
                  Giải Mã Marketing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="text-muted-foreground transition-colors hover:text-gold"
                >
                  Sản Phẩm
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how')}
                  className="text-muted-foreground transition-colors hover:text-gold"
                >
                  Cách Hoạt Động
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-champagne">
              Cam kết
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Giải mã marketing minh bạch</li>
              <li>Phân tích giá trị thực 4C</li>
              <li>Khuyến nghị khách quan</li>
              <li>Không ép bán</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} CLARITY — Honest Jewelry. Mọi sản phẩm chỉ là minh họa.</p>
          <p className="flex items-center gap-1.5">
            Làm với <Heart className="h-3 w-3 fill-warn text-warn" /> cho khách hàng xứng đáng
          </p>
        </div>
      </div>
    </footer>
  )
}
