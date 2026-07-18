'use client'

import { useState, useEffect } from 'react'
import { Lock, Loader2, ShieldCheck, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ADMIN_KEY, setAdminKey, isAdmin } from '@/lib/admin'

interface AdminLoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function AdminLoginDialog({
  open,
  onOpenChange,
  onSuccess,
}: AdminLoginDialogProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // If already admin, auto-success on open
  useEffect(() => {
    if (open && isAdmin()) {
      onSuccess()
    }
  }, [open, onSuccess])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    // simulate check
    setTimeout(() => {
      if (password === ADMIN_KEY) {
        setAdminKey(password)
        setPassword('')
        setLoading(false)
        onSuccess()
      } else {
        setError('Mật khẩu admin không đúng.')
        setLoading(false)
      }
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm border-border bg-background">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-serif text-lg text-ink">
            <Lock className="h-4 w-4 text-gold" />
            Admin Access
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Nhập mật khẩu admin để chỉnh sửa context anti-marketing của sản phẩm.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <Label htmlFor="admin-pass" className="text-sm font-medium text-ink">
              Mật khẩu
            </Label>
            <Input
              id="admin-pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1.5"
              autoFocus
            />
            {error && (
              <p className="mt-1.5 text-xs text-bad">{error}</p>
            )}
          </div>
          <Button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-ink text-background hover:bg-ink/90"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang kiểm tra...
              </>
            ) : (
              <>
                <ShieldCheck className="mr-2 h-4 w-4" />
                Vào Admin
              </>
            )}
          </Button>
          <p className="text-center text-[11px] text-muted-foreground">
            Demo password: <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-ink">{ADMIN_KEY}</code>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
