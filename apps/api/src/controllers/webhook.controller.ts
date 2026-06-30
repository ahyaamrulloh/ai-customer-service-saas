import { Request, Response } from 'express'
import { supabase } from '../lib/supabase'
import { generateChatbotReply } from '../lib/openai'
import { sendWhatsAppMessage } from '../lib/fonnte'

export const handleWebhook = async (req: Request, res: Response) => {
  try {
    console.log('=== WEBHOOK HIT ===')
    console.log('Body:', JSON.stringify(req.body, null, 2))

    const { sender, message, device } = req.body

    console.log('Sender:', sender)
    console.log('Message:', message)
    console.log('Device:', device)

    // 1. Cari tenant
    console.log('Mencari tenant dengan whatsapp_number:', device)
    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .select('*')
      .eq('whatsapp_number', device)
      .single()

    console.log('Tenant:', tenant)
    console.log('Tenant error:', tenantError)

    if (tenantError || !tenant) {
      console.log('Tenant tidak ditemukan!')
      return res.status(404).json({ error: 'Tenant not found' })
    }

    // 2. Cek limit pesan
    const currentMonth = new Date().toISOString().slice(0, 7)
    const { data: usage } = await supabase
      .from('message_usage')
      .select('count')
      .eq('tenant_id', tenant.id)
      .eq('month', currentMonth)
      .single()

    console.log('Usage:', usage)

    const MESSAGE_LIMITS: Record<string, number> = {
      free: 100,
      basic: 1000,
      pro: 10000
    }

    if (usage && usage.count >= MESSAGE_LIMITS[tenant.plan]) {
      console.log('Limit tercapai!')
      await sendWhatsAppMessage(
        sender,
        'Maaf, layanan sedang tidak tersedia.',
        tenant.fonnte_token
      )
      return res.json({ success: false, reason: 'limit_reached' })
    }

    // 3. Ambil produk
    const { data: products } = await supabase
      .from('products')
      .select('*')
      .eq('tenant_id', tenant.id)

    console.log('Products:', products?.length, 'items')

    // 4. Ambil history
    const { data: conversation } = await supabase
      .from('conversations')
      .select('messages')
      .eq('tenant_id', tenant.id)
      .eq('customer_number', sender)
      .single()

    const history = conversation?.messages || []
    console.log('History:', history.length, 'messages')

    // 5. Generate AI reply
    console.log('Generating AI reply...')
    const reply = await generateChatbotReply({
      tenantName: tenant.name,
      businessType: tenant.business_type || 'toko',
      products: products || [],
      customerMessage: message,
      history: history.slice(-10)
    })

    console.log('AI Reply:', reply)

    // 6. Kirim reply
    console.log('Mengirim reply ke:', sender)
    await sendWhatsAppMessage(sender, reply, tenant.fonnte_token)
    console.log('Reply terkirim!')

    // 7. Update history
    const updatedMessages = [
      ...history,
      { role: 'user', content: message },
      { role: 'assistant', content: reply }
    ]

    await supabase
      .from('conversations')
      .upsert({
        tenant_id: tenant.id,
        customer_number: sender,
        messages: updatedMessages,
        updated_at: new Date().toISOString()
      })

    // 8. Update usage
    await supabase
      .from('message_usage')
      .upsert({
        tenant_id: tenant.id,
        month: currentMonth,
        count: (usage?.count || 0) + 1
      })

    console.log('=== SELESAI ===')
    return res.json({ success: true, reply })

  } catch (error) {
    console.error('=== ERROR ===', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}