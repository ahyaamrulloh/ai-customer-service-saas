import { Router } from 'express'
import { supabase } from '../lib/supabase'
import { handleWebhook } from '../controllers/webhook.controller'

const router = Router()

router.get('/', (req, res) => {
  res.json({ message: 'Chatbot SaaS API v1.0' })
})

router.get('/test-db', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('tenants')
      .select('*')
      .limit(1)
    if (error) throw error
    res.json({ success: true, message: 'Database connected!', data })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
})

// Ini yang penting — pastiin ada ini!
// Test dulu tanpa controller
router.post('/webhook', handleWebhook)

export default router