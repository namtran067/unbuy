import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { mapProduct } from '@/lib/types'

export const dynamic = 'force-dynamic'

// GET /api/products/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const row = await db.product.findUnique({ where: { id } })
    if (!row) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy sản phẩm' },
        { status: 404 }
      )
    }
    return NextResponse.json({ success: true, product: mapProduct(row) })
  } catch (e) {
    console.error('[api/products/[id]] error', e)
    return NextResponse.json(
      { success: false, error: 'Không thể tải sản phẩm' },
      { status: 500 }
    )
  }
}
