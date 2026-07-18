import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { mapProduct, type TargetBudget } from '@/lib/types'

export const dynamic = 'force-dynamic'

// GET /api/products
// Query params: category, budget (low|mid|high|luxury), maxPrice, q (search)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const budget = searchParams.get('budget') as TargetBudget | null
    const maxPrice = searchParams.get('maxPrice')
    const q = searchParams.get('q')

    const where: Record<string, unknown> = {}
    if (category && category !== 'all') where.category = category
    if (budget) where.targetBudget = budget
    if (maxPrice) {
      const mp = Number(maxPrice)
      if (!Number.isNaN(mp)) where.price = { lte: mp }
    }
    if (q) {
      where.OR = [
        { name: { contains: q } },
        { description: { contains: q } },
        { material: { contains: q } },
      ]
    }

    const rows = await db.product.findMany({
      where,
      orderBy: { price: 'asc' },
    })

    const products = rows.map(mapProduct)
    return NextResponse.json({ success: true, count: products.length, products })
  } catch (e) {
    console.error('[api/products] error', e)
    return NextResponse.json(
      { success: false, error: 'Không thể tải sản phẩm' },
      { status: 500 }
    )
  }
}
