import ZAI from 'z-ai-web-dev-sdk'

export interface WebSearchResult {
  name: string
  url: string
  snippet: string
  host_name: string
}

export async function performWebSearch(query: string, num = 6): Promise<WebSearchResult[]> {
  // 1. Try ZAI SDK first (VM environment)
  try {
    const zai = await ZAI.create()
    const results = await zai.functions.invoke('web_search', { query, num })
    if (Array.isArray(results)) {
      return results as WebSearchResult[]
    }
  } catch (e) {
    console.warn(
      '[search] ZAI SDK web search failed or unconfigured, falling back to DuckDuckGo:',
      e instanceof Error ? e.message : e
    )
  }

  // 2. Fallback to DuckDuckGo HTML search (Local developer environment)
  try {
    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    })
    if (!res.ok) {
      throw new Error(`DuckDuckGo returned status ${res.status}`)
    }
    const html = await res.text()
    const results: WebSearchResult[] = []
    const blocks = html.split('<div class="result results_links results_links_deep web-result ')

    for (let i = 1; i < blocks.length; i++) {
      const block = blocks[i].split('<div class="clear">')[0] || ''
      const urlMatch = block.match(/href="([^"]+uddg=([^"&]+)[^"]*)"/)
      const titleMatch = block.match(/class="result__a"[^>]*>([\s\S]*?)<\/a>/)
      const snippetMatch = block.match(/class="result__snippet"[^>]*>([\s\S]*?)<\/a>/)

      if (urlMatch && titleMatch) {
        let rawUrl = decodeURIComponent(urlMatch[2].replace(/&amp;/g, '&'))
        let title = titleMatch[1].replace(/<[^>]+>/g, '').trim()
        let snippet = snippetMatch ? snippetMatch[1].replace(/<[^>]+>/g, '').trim() : ''

        results.push({
          name: title,
          url: rawUrl,
          snippet,
          host_name: new URL(rawUrl).hostname,
        })
      }
    }
    return results.slice(0, num)
  } catch (err) {
    console.error('[search] DuckDuckGo fallback search failed:', err)
    return []
  }
}
