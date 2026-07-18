import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'
import { db } from '@/lib/db'
import { mapProduct, type AnalyzeRequest, type AntiMarketingAnalysis } from '@/lib/types'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

const SYSTEM_PROMPT = `Bạn là "NGƯỜI GIẢI MÃ MARKETING" (The Marketing Decoder) — một cố vấn trang sức trung thực từng làm việc trong ngành kim cương & trang sức hơn 15 năm, ở cả phía bán lẻ và phía nhập khẩu. Bạn biết mọi thủ thuật marketing mà các thương hiệu trang sức sử dụng để thuyết phục khách hàng mua.

TRIẾT LÝ CỦA BẠN:
- TRUNG THỰC TRƯỚC TIÊN. Website này KHÔNG bán hàng bằng cảm xúc. Mục tiêu là giúp khách hàng ra quyết định sáng suốt, kể cả khi điều đó nghĩa là KHÔNG mua sản phẩm này.
- Bạn KHÔNG sợ mất doanh thu. Bạn sợ khách hàng bị lừa.
- Bạn tôn trọng thương hiệu nhưng phân tích khách quan các chiến lược branding mà họ dùng.

KHI PHÂN TÍCH TẠI SAO KHÔNG NÊN MUA, DỰA VÀO 4 TRỤ CỘT:

1. CHIẾN LƯỢC MARKETING / BRANDING (quan trọng nhất):
   - Giải mã các từ ngữ marketing: "Limited Edition", "Forever", "Investment Grade", "Best Seller", "Eco-Friendly", "Certificate of Authenticity", "Perfect Gift", "Classic", "Trending"...
   - Giải mã kỹ thuật định giá: anchor pricing (giá gạch ảo rồi giảm), bundle, "2 tháng lương cho nhẫn cầu hôn" (chiến dịch De Beers)...
   - Giải mã câu chuyện cảm xúc được dùng để hợp thức hóa giá cao.
   - Phân tích "badge"/nhãn gắn trên sản phẩm thực sự mang ý nghĩa gì.

2. PHÙ HỢP NGÂN SÁCH (Budget Reality):
   - So sánh giá sản phẩm với ngân sách khách hàng đưa ra.
   - Đánh giá liệu khách hàng có đang bị vượt tay vì marketing, hay thực sự thoải mái chi.
   - Nếu sản phẩm rẻ hơn ngân sách nhiều, có thể gợi ý sản phẩm tốt hơn tận dụng ngân sách.
   - Nếu đắt hơn, cảnh báo rõ ràng.

3. CHẤT LIỆU & GIÁ TRỊ THỰC (Material & Real Value):
   - Kim cương tự nhiên vs lab-grown: sự khác biệt giá vs sự khác biệt thị giác (gần như không phân biệt bằng mắt).
   - 4C (Carat, Cut, Color, Clarity): giải mã thông số, chỉ ra khi nào carat lớn nhưng thông số kém = "đánh lừa".
   - Vàng 10K/14K/18K/24K: thực tế độ cứng, giá trị kim loại, phù hợp đeo hay tích trữ.
   - Bạch kim vs vàng trắng rhodium: nhược điểm bạch kim (nặng, dẻo, xỉn).
   - Ngọc trai cultured vs tự nhiên: 99% thị trường là cultured.

4. ALTERNATIVES (Gợi ý thay thế từ thương hiệu/web khác):
   - Dựa trên kết quả tìm kiếm web, gợi ý sản phẩm tương tự từ PNJ, DOJI, Jemmia, Tiffany, Lightbox (lab-grown De Beers), Charles & Colvard (moissanite), Pearl Paradise...
   - Chỉ ra TẠI SAO lựa chọn thay thế TỐT HƠN (giá, thông số, phù hợp nhu cầu).
   - Nếu sản phẩm đang xét THỰC SỰ đáng mua, hãy nói rõ.

NGUYÊN TẮC OUTPUT:
- LUÔN trả về JSON hợp lệ, KHÔNG kèm markdown fence, KHÔNG kèm văn bản thừa.
- Tiếng Việt, giọng điệu trực tiếp, trung thực, không rao bán.
- Cụ thể: dẫn chứng giá, thông số, so sánh rõ ràng. Tránh chung chung.
- Không miệt thị thương hiệu — phân tích khách quan.
- Khi sản phẩm thực sự ĐÁNG MUA (vì lý do chính đáng), verdict = "BUY" và giải thích rõ.

FORMAT JSON BẮT BUỘC:
{
  "verdict": "BUY" | "RECONSIDER" | "AVOID",
  "confidence": "high" | "medium" | "low",
  "summary": "1-2 câu tóm tắt đánh giá trung thực",
  "marketingTactics": [
    { "tactic": "tên chiến lược/nhãn marketing", "decoded": "giải mã thực tế" }
  ],
  "reasonsNotToBuy": [
    { "reason": "lý do ngắn", "detail": "giải thích cụ thể với số liệu", "severity": "high|medium|low" }
  ],
  "budgetAnalysis": "phân tích ngân sách: sản phẩm có phù hợp không, khách hàng có đang bị vượt tay không",
  "materialAnalysis": "phân tích chất liệu & giá trị thực",
  "whenItIsWorthBuying": "kịch bản sản phẩm này thực sự đáng mua",
  "alternatives": [
    { "name": "tên SP thay thế", "brand": "thương hiệu", "url": "link web", "priceRange": "khoảng giá VND", "whyBetter": "tại sao tốt hơn" }
  ],
  "recommendedProducts": [
    { "productId": "id sản phẩm trong catalog của chúng tôi phù hợp hơn", "reason": "tại sao" }
  ],
  "finalAdvice": "lời khuyên cuối cùng 1-2 câu, trực tiếp"
}

LƯU Ý QUAN TRỌNG:
- "reasonsNotToBuy" có thể rỗng [] nếu sản phẩm thực sự đáng mua (verdict BUY).
- "alternatives" nên có ít nhất 1-2 gợi ý nếu verdict không phải BUY. Dùng kết quả tìm kiếm web được cung cấp.
- "recommendedProducts" chỉ chứa productId thực sự tồn tại trong danh sách sản phẩm được cung cấp trong context. Nếu không có, trả mảng rỗng [].
- KHÔNG bịa ra URL. Chỉ dùng URL từ kết quả tìm kiếm web được cung cấp, hoặc từ dữ liệu alternatives của sản phẩm.`

interface WebSearchResult {
  url: string
  name: string
  snippet: string
  host_name: string
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AnalyzeRequest
    const { budget, material, occasion, needsText, productIds } = body

    // 1. Lấy sản phẩm ứng viên
    let candidateRows
    if (productIds && productIds.length > 0) {
      candidateRows = await db.product.findMany({
        where: { id: { in: productIds } },
      })
    } else {
      // Lọc theo ngân sách nếu có
      const where: Record<string, unknown> = {}
      if (budget && budget > 0) {
        where.price = { lte: Math.round(budget * 1.3) } // cho phép vượt 30%
      }
      if (material) {
        where.material = { contains: material }
      }
      candidateRows = await db.product.findMany({
        where,
        orderBy: { price: 'asc' },
        take: 6,
      })
      // Nếu không đủ, lấy thêm tất cả
      if (candidateRows.length < 3) {
        candidateRows = await db.product.findMany({ orderBy: { price: 'asc' } })
      }
    }

    if (!candidateRows || candidateRows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Không có sản phẩm để phân tích' },
        { status: 400 }
      )
    }

    const candidates = candidateRows.map(mapProduct)

    // 2. Web search tìm sản phẩm thay thế nếu có needsText hoặc occasion
    let webResults: WebSearchResult[] = []
    try {
      const zai = await ZAI.create()
      const queries: string[] = []
      if (needsText && needsText.trim().length > 0) {
        queries.push(`${needsText} kim cương trang sức giá tốt PNJ DOJI Jemmia`)
        queries.push(`best value diamond jewelry alternative ${needsText}`)
      } else if (occasion) {
        queries.push(`trang sức ${occasion} giá tốt PNJ DOJI Jemmia Tiffany`)
      } else {
        // search chung dựa trên sản phẩm ứng viên đầu
        const first = candidates[0]
        queries.push(
          `${first.material} ${first.category} kim cương giá tốt thay thế PNJ DOJI`
        )
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

    // 3. Xây context cho LLM
    const productContext = candidates
      .map((p, i) => ({
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
        marketingTacticsFromDB: p.marketingTactics,
        whyNotToBuyFromDB: p.whyNotToBuy,
        alternativesFromDB: p.alternatives,
      }))

    const webContext = webResults
      .map(
        (r, i) =>
          `${i + 1}. ${r.name}\n   URL: ${r.url}\n   ${r.snippet}\n   Nguồn: ${r.host_name}`
      )
      .join('\n\n')

    const userMessage = `KHÁCH HÀNG CUNG CẤP THÔNG TIN:
- Ngân sách: ${budget ? budget.toLocaleString('vi-VN') + ' VND' : 'Không xác định'}
- Chất liệu ưu tiên: ${material || 'Không xác định'}
- Dịp sử dụng: ${occasion || 'Không xác định'}
- Nhu cầu chi tiết (khách hàng tự nhập): ${needsText || '(khách chưa nhập thêm)'}

DANH SÁCH SẢN PHẨM CẦN PHÂN TÍCH (từ catalog của chúng tôi):
${JSON.stringify(productContext, null, 2)}

KẾT QUẢ TÌM KIẾM WEB (sản phẩm thay thế từ thương hiệu/web khác):
${webContext || '(không có kết quả tìm kiếm)'}

NHIỆM VỤ:
Phân tích từng sản phẩm (hoặc sản phẩm nổi bật nhất) theo 4 trụ cột. Ưu tiên dùng nhu cầu chi tiết của khách hàng (nếu có) để điều phối khuyến nghị chính xác. 
- Nếu khách hàng nhập nhu cầu cụ thể, hãy đối chiếu sản phẩm với nhu cầu đó và đưa ra recommendedProducts (productId từ danh sách trên) phù hợp nhất.
- Giải mã marketingTactics dựa trên badge và mô tả sản phẩm (có thể bổ sung thêm từ DB).
- reasonsNotToBuy phải cụ thể, có số liệu.
- alternatives nên kết hợp cả alternativesFromDB của sản phẩm VÀ kết quả tìm kiếm web (chỉ dùng URL thật).
- finalAdvice phải trực tiếp, giúp khách ra quyết định.

Trả về JSON đúng format đã quy định. KHÔNG kèm markdown, KHÔNG kèm giải thích ngoài JSON.`

    // 4. Gọi LLM
    const zai = await ZAI.create()
    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'assistant', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage },
      ],
      thinking: { type: 'disabled' },
    })

    const raw = completion.choices[0]?.message?.content ?? ''

    // 5. Parse JSON (chấp nhận có markdown fence)
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

    // 6. Lọc recommendedProducts chỉ giữ productId thật sự tồn tại
    const validIds = new Set(candidates.map((p) => p.id))
    analysis.recommendedProducts = (analysis.recommendedProducts || []).filter(
      (r) => validIds.has(r.productId)
    )

    return NextResponse.json({
      success: true,
      analysis,
      analyzedProductIds: candidates.map((p) => p.id),
      analyzedProducts: candidates.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.image,
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
  // strip markdown fences
  let s = raw.trim()
  const fence = s.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (fence) s = fence[1].trim()
  // find first { ... last }
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
