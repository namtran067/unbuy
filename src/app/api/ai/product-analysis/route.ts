import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { mapProduct, type Product } from '@/lib/types'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

interface AIProductAnalysisRequest {
  productId: string
  userNeeds: string
}

interface AIWhyNotToBuy {
  reason: string
  detail: string
  severity: 'high' | 'medium' | 'low'
}

interface AIAlternative {
  name: string
  brand: string
  url: string
  priceRange: string
  whyBetter: string
}

interface AIRecommendedProduct {
  productId: string
  reason: string
}

interface AIProductAnalysisResponse {
  rewrittenWhyNotToBuy: AIWhyNotToBuy[]
  honestVerdict: string
  recommendedProducts: AIRecommendedProduct[]
  alternatives: AIAlternative[]
  summary: string
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AIProductAnalysisRequest
    const { productId, userNeeds } = body

    if (!productId || !userNeeds?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Thiếu thông tin sản phẩm hoặc nhu cầu' },
        { status: 400 }
      )
    }

    const currentProduct = await db.product.findUnique({
      where: { id: productId },
    })

    if (!currentProduct) {
      return NextResponse.json(
        { success: false, error: 'Sản phẩm không tồn tại' },
        { status: 404 }
      )
    }

    const product = mapProduct(currentProduct)

    const allProducts = await db.product.findMany({
      orderBy: { price: 'asc' },
    })

    const catalog = allProducts
      .filter((p) => p.id !== productId)
      .map((p) => {
        const mapped = mapProduct(p)
        return {
          id: mapped.id,
          name: mapped.name,
          category: mapped.category,
          material: mapped.material,
          price: mapped.price,
          oldPrice: mapped.oldPrice,
          carat: mapped.carat,
          cutGrade: mapped.cutGrade,
          colorGrade: mapped.colorGrade,
          clarityGrade: mapped.clarityGrade,
          origin: mapped.origin,
          badge: mapped.badge,
          description: mapped.description,
          targetBudget: mapped.targetBudget,
          whyNotToBuy: mapped.whyNotToBuy,
          alternatives: mapped.alternatives,
        }
      })

    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'Chưa cấu hình OPENROUTER_API_KEY' },
        { status: 500 }
      )
    }

    const model = process.env.OPENROUTER_MODEL || 'google/gemini-2.5-flash-exp:free'

    const systemPrompt = `Bạn là "NGƯỜI TƯ VẤN TRANG SỨC TRUNG THỰC" của SAIGONXUA.

NHIỆM VỤ:
1. Dựa trên nhu cầu khách hàng, VIẾT LẠI phần "Lý do tại sao KHÔNG nên mua" của sản phẩm hiện tại một cách tích cực, tập trung vào nhu cầu khách hàng.
2. Đề xuất sản phẩm trong catalog của SAIGONXUA phù hợp với nhu cầu đó (ưu tiên sản phẩm của chúng ta trước).
3. Đề xuất sản phẩm thay thế từ thương hiệu khác (nếu cần).

NGUYÊN TẮC:
- Tích cực, tôn trọng: đừng nói "sản phẩm này tệ". Hãy nói "Nếu bạn cần [X], sản phẩm này có thể không phù hợp vì [Y]".
- Luôn đưa ra nhu cầu ngược: tại sao sản phẩm này không phù hợp với nhu cầu cụ thể của khách.
- Mỗi lý do phải có: reason (ngắn), detail (giải thích cụ thể, có số liệu nếu có), severity (high/medium/low).
- honestVerdict: viết lại ngắn gọn, tích cực, dựa trên nhu cầu khách.

FORMAT JSON BẮT BUỘC:
{
  "rewrittenWhyNotToBuy": [
    { "reason": "string", "detail": "string", "severity": "high" | "medium" | "low" }
  ],
  "honestVerdict": "string",
  "recommendedProducts": [
    { "productId": "id", "reason": "tại sao phù hợp nhu cầu khách" }
  ],
  "alternatives": [
    { "name": "tên", "brand": "thương hiệu", "url": "link", "priceRange": "khoảng giá", "whyBetter": "tại sao tốt hơn cho nhu cầu khách" }
  ],
  "summary": "tóm tắt 1-2 câu"
}

LƯU Ý:
- "recommendedProducts" chỉ chứa productId THẬT có trong catalog được cung cấp.
- "alternatives" có thể lấy từ DB hoặc gợi ý thương hiệu phổ biến (PNJ, DOJI, Jemmia, Lightbox, Charles & Colvard, Pandora...).
- KHÔNG bịa URL. Nếu không có URL thật, ghi "(Tìm kiếm trên Google)".
- Tiếng Việt, giọng điệu thân thiện, trung thực, không rao bán.}`

    const userMessage = `SẢN PHẨM HIỆN TẠI:
- Tên: ${product.name}
- Giá: ${product.price.toLocaleString('vi-VN')} VND
- Giá gốc: ${product.oldPrice ? product.oldPrice.toLocaleString('vi-VN') + ' VND' : 'Không có'}
- Chất liệu: ${product.material}
- Danh mục: ${product.category}
- Thông số: ${product.carat ? product.carat + 'ct, ' : ''}${product.cutGrade || ''} ${product.colorGrade || ''} ${product.clarityGrade || ''}
- Nguồn gốc: ${product.origin || 'Không rõ'}
- Mô tả: ${product.description}
- Lý do không nên mua (DB): ${JSON.stringify(product.whyNotToBuy)}
- Khi nào nên mua: ${product.whenToBuy}
- Sản phẩm thay thế (DB): ${JSON.stringify(product.alternatives)}

NHU CẦU KHÁCH HÀNG:
${userNeeds}

CATALOG SẢN PHẨM KHÁC CỦA SAIGONXUA (đề xuất tối đa 3 sản phẩm phù hợp nhất):
${JSON.stringify(catalog.slice(0, 20))}

NHIỆM VỤ:
1. Viết lại "rewrittenWhyNotToBuy" cho sản phẩm hiện tại dựa trên nhu cầu khách (tối đa 3 lý do).
2. "honestVerdict": viết lại ngắn gọn (2-3 câu), tích cực, phù hợp với nhu cầu khách.
3. "recommendedProducts": chọn tối đa 3 sản phẩm từ catalog phù hợp nhất với nhu cầu khách (ưu tiên sản phẩm của SAIGONXUA).
4. "alternatives": đề xuất tối đa 2 sản phẩm thay thế từ thương hiệu khác phù hợp với nhu cầu.
5. "summary": 1-2 câu tóm tắt.

Trả về JSON đúng format. KHÔNG kèm markdown, KHÔNG kèm giải thích ngoài JSON.`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[OpenRouter] error', response.status, errorText)
      return NextResponse.json(
        { success: false, error: 'AI service error', detail: errorText },
        { status: 502 }
      )
    }

    const data = await response.json()
    const raw = data.choices?.[0]?.message?.content ?? ''

    let analysis: AIProductAnalysisResponse | null = null
    try {
      const cleaned = raw.trim()
      const fenceMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/i)
      const jsonStr = fenceMatch ? fenceMatch[1].trim() : cleaned
      const firstBrace = jsonStr.indexOf('{')
      const lastBrace = jsonStr.lastIndexOf('}')
      if (firstBrace !== -1 && lastBrace !== -1) {
        analysis = JSON.parse(jsonStr.slice(firstBrace, lastBrace + 1)) as AIProductAnalysisResponse
      }
    } catch (e) {
      console.error('[product-analysis] parse error', e, raw)
    }

    if (!analysis) {
      return NextResponse.json(
        { success: false, error: 'AI không trả về phân tích hợp lệ', raw },
        { status: 502 }
      )
    }

    const validIds = new Set(catalog.map((p) => p.id))
    analysis.recommendedProducts = (analysis.recommendedProducts || []).filter((r) =>
      validIds.has(r.productId)
    )

    return NextResponse.json({
      success: true,
      analysis,
      productId: product.id,
      productName: product.name,
    })
  } catch (e) {
    console.error('[api/ai/product-analysis] error', e)
    return NextResponse.json(
      { success: false, error: 'Không thể phân tích. Vui lòng thử lại.' },
      { status: 500 }
    )
  }
}
