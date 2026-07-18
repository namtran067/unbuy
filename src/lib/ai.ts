import ZAI from 'z-ai-web-dev-sdk'

export async function getAICompletion(
  systemPrompt: string,
  userMessage: string,
  useSystemRole = false
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (apiKey) {
    // Local / OpenRouter mode
    const model = process.env.OPENROUTER_MODEL || 'google/gemini-2.5-flash-lite'
    const systemRole = useSystemRole ? 'system' : 'assistant'
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: systemRole, content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })
    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`OpenRouter API error (${res.status}): ${errText}`)
    }
    const data = await res.json()
    return data.choices?.[0]?.message?.content ?? ''
  } else {
    // Production / ZAI SDK mode
    const zai = await ZAI.create()
    const systemRole = useSystemRole ? 'system' : 'assistant'
    const response = await zai.chat.completions.create({
      model: 'google/gemini-2.5-flash-lite',
      messages: [
        { role: systemRole, content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })
    return response.choices?.[0]?.message?.content ?? ''
  }
}
