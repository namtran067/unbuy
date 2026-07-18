// Shared types for products & anti-marketing analysis (used by API + client)

export type Severity = 'high' | 'medium' | 'low'

export interface MarketingTactic {
  tactic: string
  decoded: string
}

export interface WhyNotToBuy {
  reason: string
  detail: string
  severity: Severity
}

export interface Alternative {
  name: string
  brand: string
  url: string
  priceRange: string
  whyBetter: string
}

export type ProductCategory =
  | 'ring'
  | 'necklace'
  | 'earring'
  | 'bracelet'
  | 'pearl'
  | 'diamond'

export type TargetBudget = 'low' | 'mid' | 'high' | 'luxury'

export interface Product {
  id: string
  name: string
  category: ProductCategory
  material: string
  price: number
  oldPrice: number | null
  image: string
  images: string[]
  description: string
  carat: number | null
  cutGrade: string | null
  colorGrade: string | null
  clarityGrade: string | null
  origin: string | null
  badge: string | null
  marketingTactics: MarketingTactic[]
  whyNotToBuy: WhyNotToBuy[]
  honestVerdict: string
  whenToBuy: string
  alternatives: Alternative[]
  targetBudget: TargetBudget
  createdAt: string
  updatedAt: string
}

// Mapper từ DB record (JSON strings) sang Product parsed
export function mapProduct(row: {
  id: string
  name: string
  category: string
  material: string
  price: number
  oldPrice: number | null
  image: string
  images: string
  description: string
  carat: number | null
  cutGrade: string | null
  colorGrade: string | null
  clarityGrade: string | null
  origin: string | null
  badge: string | null
  marketingTactics: string
  whyNotToBuy: string
  honestVerdict: string
  whenToBuy: string
  alternatives: string
  targetBudget: string
  createdAt: Date
  updatedAt: Date
}): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category as ProductCategory,
    material: row.material,
    price: row.price,
    oldPrice: row.oldPrice,
    image: row.image,
    images: safeParse(row.images, []),
    description: row.description,
    carat: row.carat,
    cutGrade: row.cutGrade,
    colorGrade: row.colorGrade,
    clarityGrade: row.clarityGrade,
    origin: row.origin,
    badge: row.badge,
    marketingTactics: safeParse(row.marketingTactics, []),
    whyNotToBuy: safeParse(row.whyNotToBuy, []),
    honestVerdict: row.honestVerdict,
    whenToBuy: row.whenToBuy,
    alternatives: safeParse(row.alternatives, []),
    targetBudget: row.targetBudget as TargetBudget,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }
}

function safeParse<T>(s: string | null | undefined, fallback: T): T {
  if (!s) return fallback
  try {
    return JSON.parse(s) as T
  } catch {
    return fallback
  }
}

// === AI analysis response shape ===
// Cấu trúc mới: AI tự chọn từ catalog sản phẩm NÊN mua (ranked) và KHÔNG NÊN mua (kèm lý do)
export interface RecommendedProduct {
  productId: string
  fitScore: 'high' | 'medium' // mức độ phù hợp
  reason: string // tại sao sản phẩm này phù hợp nhu cầu + ngân sách
  caveat?: string // lưu ý nhỏ (nếu có)
}

export interface AvoidedProduct {
  productId: string
  reason: string // lý do ngắn tại sao không nên mua cho khách này
  detail: string // giải thích cụ thể
  severity: Severity
}

export interface AntiMarketingAnalysis {
  summary: string // 1-2 câu tóm tắt khuyến nghị
  budgetAnalysis: string // phân tích ngân sách khách
  materialAnalysis: string // phân tích chất liệu phù hợp nhu cầu
  recommendedProducts: RecommendedProduct[] // danh sách NÊN mua (ranked, từ catalog)
  avoidProducts: AvoidedProduct[] // danh sách KHÔNG NÊN mua (từ catalog, kèm lý do)
  alternatives: Alternative[] // gợi ý thay thế từ web/brand khác
  finalAdvice: string // lời khuyên cuối 1-2 câu
}

export interface AnalyzeRequest {
  budget?: number // VND
  material?: string
  occasion?: string
  needsText?: string
  productIds?: string[]
}
