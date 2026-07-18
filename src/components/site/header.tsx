'use client'

import { Gem, Menu, X, Lock } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  onNavigate: (id: string) => void
  onAdminClick: () => void
}

const NAV = [
  { id: 'analyzer', label: 'Giải Mã' },
  { id: 'products', label: 'Sản Phẩm' },
  { id: 'how', label: 'Cách Hoạt Động' },
]

export function Header({ onNavigate, onAdminClick }: HeaderProps) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('top')}
          className="group flex items-baseline gap-2"
          aria-label="SAIGONXUA — về đầu trang"
        >
          <span className="font-serif text-2xl font-semibold tracking-[0.18em] text-ink">
            SAIGONXUA
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:inline">
            Honest Jewelry
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-ink"
            >
              {item.label}
            </button>
          ))}
          <Button
            onClick={() => onNavigate('analyzer')}
            size="sm"
            variant="outline"
            className="ml-3 border-ink/20 text-ink hover:bg-secondary"
          >
            Phân Tích Miễn Phí
          </Button>
          <button
            onClick={onAdminClick}
            className="ml-1 grid h-9 w-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-ink"
            aria-label="Admin"
            title="Admin"
          >
            <Lock className="h-4 w-4" />
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="grid h-10 w-10 place-items-center rounded-md text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-border/70 bg-background px-4 py-2 md:hidden">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id)
                setOpen(false)
              }}
              className="block w-full rounded-md px-3 py-3 text-left text-sm font-medium text-foreground/80 hover:bg-secondary"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              onAdminClick()
              setOpen(false)
            }}
            className="flex w-full items-center gap-2 rounded-md px-3 py-3 text-left text-sm font-medium text-muted-foreground hover:bg-secondary"
          >
            <Lock className="h-4 w-4" />
            Admin
          </button>
        </nav>
      )}
    </header>
  )
}
