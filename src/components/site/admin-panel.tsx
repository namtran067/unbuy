'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Loader2,
  Save,
  Plus,
  Trash2,
  Search,
  Package,
  Check,
  LogOut,
  GripVertical,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import { formatVND, CATEGORY_LABELS } from '@/lib/format'
import { adminHeaders, clearAdminKey } from '@/lib/admin'
import type { Product, WhyNotToBuy, Alternative, TargetBudget } from '@/lib/types'
import { toast } from 'sonner'

interface AdminPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLogout: () => void
  onProductsChanged: () => void
}

const SEVERITIES: WhyNotToBuy['severity'][] = ['high', 'medium', 'low']
const SEVERITY_LABEL: Record<WhyNotToBuy['severity'], string> = {
  high: 'Nghiêm trọng',
  medium: 'Cần lưu ý',
  low: 'Nhẹ',
}
const BUDGETS: TargetBudget[] = ['low', 'mid', 'high', 'luxury']
const BUDGET_LABEL: Record<TargetBudget, string> = {
  low: 'Phổ thông',
  mid: 'Tầm trung',
  high: 'Cao cấp',
  luxury: 'Luxury',
}

export function AdminPanel({
  open,
  onOpenChange,
  onLogout,
  onProductsChanged,
}: AdminPanelProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  // Draft of the editable product (anti-marketing context only)
  const [draft, setDraft] = useState<{
    whyNotToBuy: WhyNotToBuy[]
    honestVerdict: string
    whenToBuy: string
    alternatives: Alternative[]
    targetBudget: TargetBudget
  } | null>(null)
  const [saving, setSaving] = useState(false)
  const [savedFlag, setSavedFlag] = useState(false)

  // Fetch products list
  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      if (data.success) {
        setProducts(data.products)
        if (!selectedId && data.products.length > 0) {
          setSelectedId(data.products[0].id)
        }
      }
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }, [selectedId])

  useEffect(() => {
    if (open) fetchProducts()
  }, [open, fetchProducts])

  // When selectedId changes, load draft from product
  useEffect(() => {
    const p = products.find((x) => x.id === selectedId)
    if (p) {
      setDraft({
        whyNotToBuy: JSON.parse(JSON.stringify(p.whyNotToBuy)),
        honestVerdict: p.honestVerdict,
        whenToBuy: p.whenToBuy,
        alternatives: JSON.parse(JSON.stringify(p.alternatives)),
        targetBudget: p.targetBudget,
      })
      setSavedFlag(false)
    } else {
      setDraft(null)
    }
  }, [selectedId, products])

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.material.toLowerCase().includes(search.toLowerCase())
  )

  const selected = products.find((x) => x.id === selectedId)

  // --- Draft mutations ---
  function updateWhyNot(idx: number, field: keyof WhyNotToBuy, value: string) {
    if (!draft) return
    const next = [...draft.whyNotToBuy]
    next[idx] = { ...next[idx], [field]: value } as WhyNotToBuy
    setDraft({ ...draft, whyNotToBuy: next })
    setSavedFlag(false)
  }
  function addWhyNot() {
    if (!draft) return
    setDraft({
      ...draft,
      whyNotToBuy: [
        ...draft.whyNotToBuy,
        { reason: '', detail: '', severity: 'medium' },
      ],
    })
    setSavedFlag(false)
  }
  function removeWhyNot(idx: number) {
    if (!draft) return
    setDraft({
      ...draft,
      whyNotToBuy: draft.whyNotToBuy.filter((_, i) => i !== idx),
    })
    setSavedFlag(false)
  }

  function updateAlt(idx: number, field: keyof Alternative, value: string) {
    if (!draft) return
    const next = [...draft.alternatives]
    next[idx] = { ...next[idx], [field]: value } as Alternative
    setDraft({ ...draft, alternatives: next })
    setSavedFlag(false)
  }
  function addAlt() {
    if (!draft) return
    setDraft({
      ...draft,
      alternatives: [
        ...draft.alternatives,
        { name: '', brand: '', url: '', priceRange: '', whyBetter: '' },
      ],
    })
    setSavedFlag(false)
  }
  function removeAlt(idx: number) {
    if (!draft) return
    setDraft({
      ...draft,
      alternatives: draft.alternatives.filter((_, i) => i !== idx),
    })
    setSavedFlag(false)
  }

  async function handleSave() {
    if (!draft || !selectedId) return
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/products/${selectedId}`, {
        method: 'PUT',
        headers: adminHeaders(),
        body: JSON.stringify(draft),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Lưu thất bại')
      }
      // Update local product state with saved data
      setProducts((prev) =>
        prev.map((p) =>
          p.id === selectedId
            ? {
                ...p,
                whyNotToBuy: draft.whyNotToBuy,
                honestVerdict: draft.honestVerdict,
                whenToBuy: draft.whenToBuy,
                alternatives: draft.alternatives,
                targetBudget: draft.targetBudget,
              }
            : p
        )
      )
      setSavedFlag(true)
      toast.success('Đã lưu context anti-marketing cho sản phẩm.')
      onProductsChanged()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Lưu thất bại')
    } finally {
      setSaving(false)
    }
  }

  function handleLogout() {
    clearAdminKey()
    onLogout()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[94vh] overflow-hidden border-border bg-background p-0 sm:max-w-6xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Admin Panel</DialogTitle>
          <DialogDescription>
            Chỉnh sửa context anti-marketing của sản phẩm
          </DialogDescription>
        </DialogHeader>
        <div className="flex h-[94vh] flex-col">
          {/* Header bar */}
          <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-5 py-3.5">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-gold" />
              <h2 className="font-serif text-lg font-semibold text-ink">
                Admin — Context Anti-Marketing
              </h2>
              <Badge variant="outline" className="ml-2 border-good/30 text-good">
                Đã đăng nhập
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleSave}
                disabled={!draft || saving}
                size="sm"
                className="bg-ink text-background hover:bg-ink/90"
              >
                {saving ? (
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                ) : savedFlag ? (
                  <Check className="mr-1.5 h-3.5 w-3.5" />
                ) : (
                  <Save className="mr-1.5 h-3.5 w-3.5" />
                )}
                {saving ? 'Đang lưu...' : savedFlag ? 'Đã lưu' : 'Lưu'}
              </Button>
              <Button
                onClick={handleLogout}
                size="sm"
                variant="outline"
                className="border-border text-muted-foreground hover:text-ink"
              >
                <LogOut className="mr-1.5 h-3.5 w-3.5" />
                Thoát
              </Button>
            </div>
          </div>

          {/* Body: split list + editor */}
          <div className="grid flex-1 grid-cols-1 overflow-hidden md:grid-cols-[280px_1fr]">
            {/* Product list */}
            <div className="flex flex-col border-r border-border bg-secondary/20">
              <div className="p-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Tìm sản phẩm..."
                    className="h-8 pl-8 text-xs"
                  />
                </div>
              </div>
              <ScrollArea className="scroll-luxe flex-1">
                {loading ? (
                  <div className="p-4 text-center text-xs text-muted-foreground">
                    <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                  </div>
                ) : (
                  <div className="space-y-0.5 px-2 pb-3">
                    {filteredProducts.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedId(p.id)}
                        className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left transition-colors ${
                          p.id === selectedId
                            ? 'bg-background shadow-soft'
                            : 'hover:bg-background/60'
                        }`}
                      >
                        <img
                          src={p.image}
                          alt=""
                          className="h-9 w-9 shrink-0 rounded object-cover"
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
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>

            {/* Editor */}
            <ScrollArea className="scroll-luxe flex-1">
              {selected && draft ? (
                <div className="space-y-6 p-5">
                  {/* Product header */}
                  <div className="flex gap-3 border-b border-border pb-4">
                    <img
                      src={selected.image}
                      alt=""
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {CATEGORY_LABELS[selected.category] ?? selected.category}{' '}
                        • {selected.material}
                      </div>
                      <h3 className="font-serif text-base font-semibold text-ink">
                        {selected.name}
                      </h3>
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        {formatVND(selected.price)}
                        {selected.oldPrice
                          ? ` (gốc ${formatVND(selected.oldPrice)})`
                          : ''}
                      </div>
                    </div>
                  </div>

                  {/* Honest verdict */}
                  <Field label="Đánh giá trung thực (honestVerdict)">
                    <Textarea
                      value={draft.honestVerdict}
                      onChange={(e) => {
                        setDraft({ ...draft, honestVerdict: e.target.value })
                        setSavedFlag(false)
                      }}
                      className="min-h-[70px] resize-y"
                    />
                  </Field>

                  {/* When to buy */}
                  <Field label="Khi nào đáng mua (whenToBuy)">
                    <Textarea
                      value={draft.whenToBuy}
                      onChange={(e) => {
                        setDraft({ ...draft, whenToBuy: e.target.value })
                        setSavedFlag(false)
                      }}
                      className="min-h-[70px] resize-y"
                    />
                  </Field>

                  {/* Target budget */}
                  <Field label="Phân khúc ngân sách (targetBudget)">
                    <Select
                      value={draft.targetBudget}
                      onValueChange={(v) => {
                        setDraft({ ...draft, targetBudget: v as TargetBudget })
                        setSavedFlag(false)
                      }}
                    >
                      <SelectTrigger className="w-full sm:w-64">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {BUDGETS.map((b) => (
                          <SelectItem key={b} value={b}>
                            {BUDGET_LABEL[b]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  {/* Why not to buy */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Label className="text-sm font-semibold text-ink">
                        Lý do không nên mua ({draft.whyNotToBuy.length})
                      </Label>
                      <Button
                        onClick={addWhyNot}
                        size="sm"
                        variant="outline"
                        className="h-7 border-border text-xs"
                      >
                        <Plus className="mr-1 h-3 w-3" />
                        Thêm lý do
                      </Button>
                    </div>
                    <div className="space-y-2.5">
                      {draft.whyNotToBuy.map((r, idx) => (
                        <div
                          key={idx}
                          className="rounded-lg border border-border bg-secondary/30 p-3"
                        >
                          <div className="flex items-start gap-2">
                            <GripVertical className="mt-1.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
                            <div className="flex-1 space-y-2">
                              <div className="flex gap-2">
                                <Input
                                  value={r.reason}
                                  onChange={(e) =>
                                    updateWhyNot(idx, 'reason', e.target.value)
                                  }
                                  placeholder="Lý do ngắn"
                                  className="h-8 text-sm"
                                />
                                <Select
                                  value={r.severity}
                                  onValueChange={(v) =>
                                    updateWhyNot(idx, 'severity', v)
                                  }
                                >
                                  <SelectTrigger className="h-8 w-32 shrink-0 text-xs">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {SEVERITIES.map((s) => (
                                      <SelectItem key={s} value={s}>
                                        {SEVERITY_LABEL[s]}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <button
                                  onClick={() => removeWhyNot(idx)}
                                  className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-bad-soft hover:text-bad"
                                  aria-label="Xóa"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              <Textarea
                                value={r.detail}
                                onChange={(e) =>
                                  updateWhyNot(idx, 'detail', e.target.value)
                                }
                                placeholder="Chi tiết (có số liệu)"
                                className="min-h-[50px] resize-y text-xs"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      {draft.whyNotToBuy.length === 0 && (
                        <div className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                          Chưa có lý do nào.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Alternatives */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Label className="text-sm font-semibold text-ink">
                        Sản phẩm thay thế ({draft.alternatives.length})
                      </Label>
                      <Button
                        onClick={addAlt}
                        size="sm"
                        variant="outline"
                        className="h-7 border-border text-xs"
                      >
                        <Plus className="mr-1 h-3 w-3" />
                        Thêm thay thế
                      </Button>
                    </div>
                    <div className="space-y-2.5">
                      {draft.alternatives.map((alt, idx) => (
                        <div
                          key={idx}
                          className="rounded-lg border border-border bg-secondary/30 p-3"
                        >
                          <div className="flex items-start gap-2">
                            <GripVertical className="mt-1.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
                            <div className="flex-1 space-y-2">
                              <div className="flex gap-2">
                                <Input
                                  value={alt.name}
                                  onChange={(e) =>
                                    updateAlt(idx, 'name', e.target.value)
                                  }
                                  placeholder="Tên sản phẩm thay thế"
                                  className="h-8 text-sm"
                                />
                                <Input
                                  value={alt.brand}
                                  onChange={(e) =>
                                    updateAlt(idx, 'brand', e.target.value)
                                  }
                                  placeholder="Thương hiệu"
                                  className="h-8 w-32 shrink-0 text-sm"
                                />
                                <button
                                  onClick={() => removeAlt(idx)}
                                  className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-bad-soft hover:text-bad"
                                  aria-label="Xóa"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              <Input
                                value={alt.url}
                                onChange={(e) =>
                                  updateAlt(idx, 'url', e.target.value)
                                }
                                placeholder="https://..."
                                className="h-8 text-xs"
                              />
                              <Input
                                value={alt.priceRange}
                                onChange={(e) =>
                                  updateAlt(idx, 'priceRange', e.target.value)
                                }
                                placeholder="Khoảng giá VND"
                                className="h-8 text-xs"
                              />
                              <Textarea
                                value={alt.whyBetter}
                                onChange={(e) =>
                                  updateAlt(idx, 'whyBetter', e.target.value)
                                }
                                placeholder="Tại sao tốt hơn"
                                className="min-h-[50px] resize-y text-xs"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      {draft.alternatives.length === 0 && (
                        <div className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                          Chưa có thay thế nào.
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="h-4" />
                </div>
              ) : (
                <div className="grid h-full place-items-center p-12 text-sm text-muted-foreground">
                  Chọn một sản phẩm để chỉnh sửa.
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <Label className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </Label>
      {children}
    </div>
  )
}
