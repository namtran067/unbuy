'use client'

import { Gem, Heart } from 'lucide-react'

interface FooterProps {
  onNavigate: (id: string) => void
  onAdminClick: () => void
}

export function Footer({ onNavigate, onAdminClick }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-border/70 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="font-serif text-2xl font-semibold tracking-[0.18em] text-ink">
              SAIGONXUA
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Honest Jewelry
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Cửa hàng trang sức đặt sự trung thực lên trên doanh thu. Khách hàng
              xứng đáng biết sự thật trước khi mở ví.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink">
              Khám phá
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('analyzer')}
                  className="text-muted-foreground transition-colors hover:text-ink"
                >
                  Giải Mã
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="text-muted-foreground transition-colors hover:text-ink"
                >
                  Sản Phẩm
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how')}
                  className="text-muted-foreground transition-colors hover:text-ink"
                >
                  Cách Hoạt Động
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink">
              Cam kết
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Phân tích giá trị thực</li>
              <li>Khuyến nghị khách quan</li>
              <li>Không ép bán</li>
              <li>
                <button
                  onClick={onAdminClick}
                  className="text-muted-foreground underline-offset-4 transition-colors hover:text-ink hover:underline"
                >
                  Admin
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/70 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} SAIGONXUA — Honest Jewelry. Sản phẩm
            minh họa.
          </p>
          <p className="flex items-center gap-1.5">
            Làm với <Heart className="h-3 w-3 fill-warn text-warn" /> cho khách
            hàng xứng đáng
          </p>
        </div>
      </div>
    </footer>
  )
}
