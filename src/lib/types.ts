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
export type Verdict = 'BUY' | 'RECONSIDER' | 'AVOID'

export interface AntiMarketingAnalysis {
  verdict: Verdict
  confidence: 'high' | 'medium' | 'low'
  summary: string
  marketingTactics: MarketingTactic[]
  reasonsNotToBuy: {
    reason: string
    detail: string
    severity: Severity
  }[]
  budgetAnalysis: string
  materialAnalysis: string
  whenItIsWorthBuying: string
  alternatives: Alternative[]
  recommendedProducts: { productId: string; reason: string }[]
  finalAdvice: string
}

export interface AnalyzeRequest {
  budget?: number // VND
  material?: string
  occasion?: string
  needsText?: string
  productIds?: string[]
}
