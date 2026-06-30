import axios from 'axios'

const FONNTE_API = 'https://api.fonnte.com'

export const sendWhatsAppMessage = async (
  target: string,
  message: string,
  token: string
) => {
  try {
    const response = await axios.post(
      `${FONNTE_API}/send`,
      {
        target,
        message,
        countryCode: '62' // Indonesia
      },
      {
        headers: {
          Authorization: token
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Fonnte error:', error)
    throw error
  }
}

export const setWebhook = async (webhookUrl: string, token: string) => {
  try {
    const response = await axios.post(
      `${FONNTE_API}/set-webhook`,
      { webhookUrl },
      {
        headers: {
          Authorization: token
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Fonnte webhook error:', error)
    throw error
  }
}