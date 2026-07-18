'use client'

import { Gem, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  onNavigate: (id: string) => void
}

const NAV = [
  { id: 'analyzer', label: 'Giải Mã Marketing' },
  { id: 'products', label: 'Sản Phẩm' },
  { id: 'how', label: 'Cách Hoạt Động' },
]

export function Header({ onNavigate }: HeaderProps) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('top')}
          className="group flex items-center gap-2.5"
          aria-label="CLARITY — về đầu trang"
        >
          <span className="relative grid h-9 w-9 place-items-center rounded-full border border-gold/40 bg-card">
            <Gem className="h-4 w-4 text-gold transition-transform group-hover:rotate-12" />
          </span>
          <div className="flex flex-col items-start leading-none">
            <span className="font-serif text-xl font-semibold tracking-[0.25em] text-champagne">
              CLARITY
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
              Honest Jewelry
            </span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-champagne"
            >
              {item.label}
            </button>
          ))}
          <Button
            onClick={() => onNavigate('analyzer')}
            size="sm"
            className="ml-2 border border-gold/40 bg-gold/10 text-gold hover:bg-gold/20"
          >
            Phân Tích Miễn Phí
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="grid h-10 w-10 place-items-center rounded-md text-champagne md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-border/60 bg-background px-4 py-3 md:hidden">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id)
                setOpen(false)
              }}
              className="block w-full rounded-md px-3 py-3 text-left text-sm font-medium text-muted-foreground hover:bg-accent hover:text-champagne"
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}
