import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { mapProduct, type TargetBudget, type WhyNotToBuy, type Alternative } from '@/lib/types'
import { ADMIN_KEY } from '@/lib/admin'

export const dynamic = 'force-dynamic'

// PUT /api/admin/products/[id] — update anti-marketing context
// Protected by X-Admin-Key header
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Auth check
  const adminKey = req.headers.get('x-admin-key')
  if (adminKey !== ADMIN_KEY) {
    return NextResponse.json(
      { success: false, error: 'Không có quyền admin' },
      { status: 401 }
    )
  }

  try {
    const { id } = await params
    const body = await req.json()

    const {
      whyNotToBuy,
      honestVerdict,
      whenToBuy,
      alternatives,
      targetBudget,
    } = body as {
      whyNotToBuy: WhyNotToBuy[]
      honestVerdict: string
      whenToBuy: string
      alternatives: Alternative[]
      targetBudget: TargetBudget
    }

    // Basic validation
    if (!Array.isArray(whyNotToBuy) || !Array.isArray(alternatives)) {
      return NextResponse.json(
        { success: false, error: 'Dữ liệu không hợp lệ' },
        { status: 400 }
      )
    }
    if (!['low', 'mid', 'high', 'luxury'].includes(targetBudget)) {
      return NextResponse.json(
        { success: false, error: 'targetBudget không hợp lệ' },
        { status: 400 }
      )
    }

    // Sanitize arrays
    const cleanWhyNot = whyNotToBuy
      .filter((r) => r && r.reason && r.reason.trim())
      .map((r) => ({
        reason: String(r.reason).trim().slice(0, 300),
        detail: String(r.detail || '').trim().slice(0, 2000),
        severity: ['high', 'medium', 'low'].includes(r.severity)
          ? r.severity
          : 'medium',
      }))
    const cleanAlts = alternatives
      .filter((a) => a && a.name && a.name.trim())
      .map((a) => ({
        name: String(a.name).trim().slice(0, 300),
        brand: String(a.brand || '').trim().slice(0, 200),
        url: String(a.url || '').trim().slice(0, 1000),
        priceRange: String(a.priceRange || '').trim().slice(0, 200),
        whyBetter: String(a.whyBetter || '').trim().slice(0, 1000),
      }))

    const updated = await db.product.update({
      where: { id },
      data: {
        whyNotToBuy: JSON.stringify(cleanWhyNot),
        honestVerdict: String(honestVerdict || '').slice(0, 2000),
        whenToBuy: String(whenToBuy || '').slice(0, 2000),
        alternatives: JSON.stringify(cleanAlts),
        targetBudget,
      },
    })

    return NextResponse.json({
      success: true,
      product: mapProduct(updated),
    })
  } catch (e) {
    console.error('[api/admin/products/[id] PUT] error', e)
    return NextResponse.json(
      { success: false, error: 'Không thể cập nhật sản phẩm' },
      { status: 500 }
    )
  }
}
