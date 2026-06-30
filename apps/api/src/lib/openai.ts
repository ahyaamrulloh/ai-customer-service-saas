import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config()

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export const generateChatbotReply = async ({
  tenantName,
  businessType,
  products,
  customerMessage,
  history
}: {
  tenantName: string
  businessType: string
  products: any[]
  customerMessage: string
  history: { role: 'user' | 'assistant'; content: string }[]
}) => {
  const productList = products
    .filter(p => p.is_available)
    .map(p => `- ${p.name}: Rp ${p.price.toLocaleString()} (stok: ${p.stock})`)
    .join('\n')

  const systemPrompt = `
Kamu adalah asisten virtual untuk ${tenantName} (${businessType}).

Produk yang tersedia:
${productList || 'Belum ada produk yang didaftarkan.'}

Aturan penting:
- Jawab dalam bahasa Indonesia yang ramah, natural, dan singkat
- Maksimal 3 kalimat per balasan
- Kalau ditanya produk yang tidak ada, minta maaf dan tawarkan produk lain
- Kalau ada komplain atau pertanyaan kompleks, bilang akan diteruskan ke pemilik toko
- Jangan membuat informasi yang tidak ada di data di atas
  `.trim()

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      ...history,
      { role: 'user', content: customerMessage }
    ],
    max_tokens: 200,
    temperature: 0.7
  })

  return response.choices[0].message.content || 'Maaf, saya tidak dapat memproses pesan ini.'
}