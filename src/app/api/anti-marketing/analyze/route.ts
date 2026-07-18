import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'
import { db } from '@/lib/db'
import { mapProduct, type AnalyzeRequest, type AntiMarketingAnalysis } from '@/lib/types'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

const SYSTEM_PROMPT = `Bạn là "NGƯỜI TƯ VẤN TRANG SỨC TRUNG THỰC" của SAIGONXUA — cố vấn từng làm việc trong ngành kim cương & trang sức hơn 15 năm, ở cả phía bán lẻ và phía nhập khẩu.

TRIẾT LÝ:
- TRUNG THỰC TRƯỚC TIÊN. Mục tiêu: giúp khách ra quyết định sáng suốt, kể cả khi nghĩa là KHÔNG mua sản phẩm nào trong catalog.
- Bạn KHÔNG sợ mất doanh thu. Bạn sợ khách bị lừa.
- Khách hàng nhập ngân sách + nhu cầu → NHIỆM VỤ CỦA BẠN là đi qua TOÀN BỘ catalog, rồi đưa ra danh sách những sản phẩm thực sự phù hợp nhu cầu + ngân sách ("NÊN MUA"), xếp hạng theo độ phù hợp (fit cao → vừa).

TIÊU CHÍ ĐÁNH GIÁ (3 trụ cột):

1. PHÙ HỢP NGÂN SÁCH:
   - Sản phẩm có nằm trong (hoặc gần) ngân sách khách không?
   - Nếu đắt hơn nhiều hoặc vượt ngân sách quá mức → KHÔNG đề xuất.
   - Nếu rẻ hơn nhiều nhưng không tận dụng được → có thể đề xuất với caveat.
   - Khách có đang bị "vượt tay" vì marketing không?

2. CHẤT LIỆU & GIÁ TRỊ THỰC:
   - Kim cương tự nhiên vs lab-grown: khác biệt giá vs khác biệt thị giác.
   - 4C: carat lớn nhưng thông số kém = "đánh lừa".
   - Vàng 10K/14K/18K/24K: độ cứng, giá trị kim loại, phù hợp đeo hay tích trữ.
   - Bạch kim vs vàng trắng rhodium; ngọc trai cultured vs tự nhiên.

3. PHÙ HỢP NHU CẦU CỤ THỂ:
   - Đây là trụ cột QUAN TRỌNG NHẤT. Khách nhập nhu cầu (vd: "nhẫn cầu hôn, cô ấy thích kim cương to lấp lánh, đeo hàng ngày" hoặc "dây chuyền đeo hàng ngày") → bạn phải đối chiếu từng sản phẩm với nhu cầu đó.
   - TUYỆT ĐỐI KHÔNG đề xuất các sản phẩm khác danh mục với loại sản phẩm khách đang cần tìm (ví dụ: khách tìm dây chuyền thì TUYỆT ĐỐI không đề xuất lắc tay, nhẫn hay bông tai).
   - Mọi sản phẩm khác danh mục hoặc không phù hợp bắt buộc phải bỏ qua (neutral), không được đưa vào danh sách đề xuất.
   - Sản phẩm phù hợp nhu cầu nhưng thông số kém hoặc không tốt → có thể đề xuất kèm theo caveat (lưu ý).

NGUYÊN TẮC OUTPUT:
- LUÔN trả về JSON hợp lệ, KHÔNG kèm markdown fence, KHÔNG kèm văn bản thừa.
- Tiếng Việt, giọng điệu trực tiếp, trung thực, không rao bán.
- Cụ thể: dẫn chứng giá, thông số, so sánh. Tránh chung chung.
- Đi qua TẤT CẢ sản phẩm trong catalog được cung cấp, quyết định mỗi sản phẩm vào NÊN MUA / bỏ qua (nếu trung lập).
- NÊN MUA: ít nhất 1 sản phẩm nếu catalog có sản phẩm phù hợp. Xếp hạng theo độ phù hợp (fit cao trước). Tuyệt đối chỉ đề xuất sản phẩm thuộc đúng danh mục khách đang tìm (ví dụ: tìm dây chuyền thì chỉ đề xuất dây chuyền). Mỗi sản phẩm kèm lý do (reason) + caveat (nếu có).
- Nếu KHÔNG có sản phẩm nào trong catalog phù hợp, NÊN MUA = [] và giải thích trong summary + finalAdvice, gợi ý khách ra ngoài (alternatives).

FORMAT JSON BẮT BUỘC:
{
  "summary": "1-2 câu tóm tắt: khách nên mua gì, tránh gì",
  "budgetAnalysis": "phân tích ngân sách khách — mức giá hợp lý cho nhu cầu này, khách có đang đặt ngân sách quá thấp/cao",
  "materialAnalysis": "phân tích chất liệu phù hợp nhu cầu (vd: cầu hôn nên bạch kim/18K, tích trữ nên 24K...)",
  "recommendedProducts": [
    {
      "productId": "id từ catalog",
      "fitScore": "high" | "medium",
      "reason": "tại sao sản phẩm này phù hợp nhu cầu + ngân sách của khách",
      "caveat": "lưu ý nhỏ nếu có (vd: 'cần xi rhodium định kỳ')"
    }
  ],
  "avoidProducts": [], // Luôn luôn trả về mảng rỗng [] vì chúng ta không hiển thị phần này nữa
  "alternatives": [
    { "name": "tên SP thay thế", "brand": "thương hiệu", "url": "link web", "priceRange": "khoảng giá VND", "whyBetter": "tại sao tốt hơn cho khách" }
  ],
  "finalAdvice": "lời khuyên cuối 1-2 câu, trực tiếp"
}

LƯU Ý:
- "recommendedProducts" và "avoidProducts" chỉ chứa productId THẬT sự tồn tại trong catalog được cung cấp.
- "alternatives" dùng URL thật từ kết quả tìm kiếm web được cung cấp hoặc từ DB. KHÔNG bịa URL.
- "caveat" là optional, chỉ thêm khi có lưu ý thực sự.
- Không cần đưa TẤT CẢ sản phẩm vào 2 danh sách — chỉ những sản phẩm có lý do rõ ràng (nên mua hoặc không nên mua). Sản phẩm trung lập có thể bỏ qua.`

interface WebSearchResult {
  url: string
  name: string
  snippet: string
  host_name: string
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AnalyzeRequest
    const { budget, material, occasion, needsText } = body

    // 1. Lấy TOÀN BỘ catalog để AI đánh giá (khách không cần tự chọn)
    // Lọc sơ theo ngân sách ±50% để giới hạn context, nhưng vẫn đủ rộng
    let candidateRows
    if (budget && budget > 0) {
      const lo = Math.round(budget * 0.3)
      const hi = Math.round(budget * 2)
      candidateRows = await db.product.findMany({
        where: { price: { gte: lo, lte: hi } },
        orderBy: { price: 'asc' },
      })
      // Nếu quá ít, mở rộng lấy all
      if (candidateRows.length < 4) {
        candidateRows = await db.product.findMany({ orderBy: { price: 'asc' } })
      }
    } else {
      candidateRows = await db.product.findMany({ orderBy: { price: 'asc' } })
    }

    if (!candidateRows || candidateRows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Không có sản phẩm để phân tích' },
        { status: 400 }
      )
    }

    const candidates = candidateRows.map(mapProduct)

    // 2. Web search tìm sản phẩm thay thế
    let webResults: WebSearchResult[] = []
    try {
      const zai = await ZAI.create()
      const queries: string[] = []
      if (needsText && needsText.trim().length > 0) {
        queries.push(`${needsText} trang sức kim cương giá tốt PNJ DOJI Jemmia`)
        queries.push(`best value diamond jewelry ${needsText}`)
      } else if (occasion) {
        queries.push(`trang sức ${occasion} giá tốt PNJ DOJI Jemmia Tiffany`)
      } else {
        const first = candidates[0]
        queries.push(`${first.material} ${first.category} kim cương thay thế PNJ DOJI`)
      }

      const searchPromises = queries.slice(0, 2).map((q) =>
        zai.functions
          .invoke('web_search', { query: q, num: 6 })
          .then((r: unknown) => (Array.isArray(r) ? (r as WebSearchResult[]) : []))
          .catch(() => [] as WebSearchResult[])
      )
      const settled = await Promise.all(searchPromises)
      webResults = settled.flat().slice(0, 8)
    } catch (e) {
      console.error('[anti-marketing] web search failed (non-fatal)', e)
    }

    // 3. Xây context cho LLM — gọn gàng, đủ thông tin để đánh giá
    const productContext = candidates.map((p, i) => ({
      index: i + 1,
      productId: p.id,
      name: p.name,
      category: p.category,
      material: p.material,
      price: p.price,
      oldPrice: p.oldPrice,
      carat: p.carat,
      cutGrade: p.cutGrade,
      colorGrade: p.colorGrade,
      clarityGrade: p.clarityGrade,
      origin: p.origin,
      badge: p.badge,
      description: p.description,
      whyNotToBuyFromDB: p.whyNotToBuy, // context có sẵn để AI tham khảo
      alternativesFromDB: p.alternatives,
    }))

    const webContext = webResults
      .map(
        (r, i) =>
          `${i + 1}. ${r.name}\n   URL: ${r.url}\n   ${r.snippet}\n   Nguồn: ${r.host_name}`
      )
      .join('\n\n')

    const userMessage = `THÔNG TIN KHÁCH HÀNG:
- Ngân sách: ${budget ? budget.toLocaleString('vi-VN') + ' VND' : 'Không xác định'}
- Chất liệu ưu tiên: ${material || 'Không xác định'}
- Dịp sử dụng: ${occasion || 'Không xác định'}
- Nhu cầu chi tiết (khách tự nhập): ${needsText || '(khách chưa nhập — đánh giá chung)'}

CATALOG SẢN PHẨM (đi qua từng sản phẩm, quyết định NÊN MUA / KHÔNG NÊN MUA dựa trên nhu cầu + ngân sách khách):
${JSON.stringify(productContext, null, 2)}

KẾT QUẢ TÌM KIẾM WEB (sản phẩm thay thế từ thương hiệu khác, dùng URL thật cho alternatives):
${webContext || '(không có kết quả tìm kiếm)'}

NHIỆM VỤ:
- Đối chiếu TỪNG sản phẩm trong catalog với nhu cầu + ngân sách khách.
- "recommendedProducts": những sản phẩm thực sự phù hợp, xếp hạng theo độ phù hợp (fit cao trước). Tuyệt đối chỉ đề xuất sản phẩm thuộc đúng danh mục khách đang tìm (ví dụ: tìm dây chuyền thì chỉ đề xuất dây chuyền, không đề xuất lắc tay, nhẫn...). Lý do phải cụ thể theo nhu cầu khách.
- "avoidProducts": Luôn luôn trả về mảng rỗng [] (không phân tích phần này nữa).
- "alternatives": kết hợp alternativesFromDB + kết quả web (URL thật), gợi ý thay thế phù hợp nhu cầu khách.
- "summary" và "finalAdvice": trực tiếp, giúp khách ra quyết định nhanh.

Trả về JSON đúng format. KHÔNG kèm markdown, KHÔNG kèm giải thích ngoài JSON.`

    // 4. Gọi LLM via OpenRouter
    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'Chưa cấu hình OPENROUTER_API_KEY' },
        { status: 500 }
      )
    }
    const model = process.env.OPENROUTER_MODEL || 'google/gemini-2.5-flash-lite'

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'assistant', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[OpenRouter anti-marketing] error', response.status, errorText)
      return NextResponse.json(
        { success: false, error: 'Lỗi dịch vụ AI từ OpenRouter', detail: errorText },
        { status: 502 }
      )
    }

    const data = await response.json()
    const raw = data.choices?.[0]?.message?.content ?? ''

    // 5. Parse JSON
    const analysis = parseJsonLoose<AntiMarketingAnalysis>(raw)

    if (!analysis) {
      return NextResponse.json(
        {
          success: false,
          error: 'AI không trả về phân tích hợp lệ',
          raw,
        },
        { status: 502 }
      )
    }

    // 6. Lọc productId không hợp lệ
    const validIds = new Set(candidates.map((p) => p.id))
    analysis.recommendedProducts = (analysis.recommendedProducts || []).filter(
      (r) => validIds.has(r.productId)
    )
    analysis.avoidProducts = (analysis.avoidProducts || []).filter(
      (r) => validIds.has(r.productId)
    )

    return NextResponse.json({
      success: true,
      analysis,
      catalogProductIds: candidates.map((p) => p.id),
      catalogProducts: candidates.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.image,
        material: p.material,
        category: p.category,
      })),
      webSearchUsed: webResults.length > 0,
      webSources: webResults.map((r) => ({ name: r.name, url: r.url, host: r.host_name })),
    })
  } catch (e) {
    console.error('[api/anti-marketing/analyze] error', e)
    return NextResponse.json(
      { success: false, error: 'Không thể phân tích. Vui lòng thử lại.' },
      { status: 500 }
    )
  }
}

function parseJsonLoose<T>(raw: string): T | null {
  if (!raw) return null
  let s = raw.trim()
  const fence = s.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (fence) s = fence[1].trim()
  const first = s.indexOf('{')
  const last = s.lastIndexOf('}')
  if (first === -1 || last === -1) return null
  s = s.slice(first, last + 1)
  try {
    return JSON.parse(s) as T
  } catch {
    return null
  }
}
