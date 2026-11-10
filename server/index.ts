import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import {
  EmailDeliveryError,
  EmailServiceConfigurationError,
  InvalidContactMessageError,
  sendContactEmail
} from './services/contactEmailService.js'

const app = express()
const port = Number(process.env.PORT) || 4000
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

app.use(helmet())
app.use(cors({ origin: allowedOrigin }))
app.use(express.json({ limit: '20kb' }))
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 100 }))
const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many messages. Please try again later.' }
})

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'saurav-portfolio-api' })
})

app.get('/api/projects', (_req, res) => {
  res.json([
    {
      id: 'last-light',
      title: 'LAST LIGHT',
      type: 'Third-person horror / adventure',
      engine: 'Unreal Engine 5.6',
      status: 'In development',
      description: 'A dark exploration prototype featuring an energy system, pickups, dynamic lighting and combat experiments.',
      technologies: ['Blueprints', 'Unreal Engine 5.6', 'Blender']
    }
  ])
})

app.post('/api/contact', contactRateLimit, async (req, res) => {
  try {
    await sendContactEmail(req.body)
    res.status(200).json({ message: 'Message sent successfully.' })
  } catch (error) {
    if (error instanceof InvalidContactMessageError) {
      res.status(400).json({ message: error.message })
    } else if (error instanceof EmailServiceConfigurationError) {
      console.error(error.message)
      res.status(503).json({ message: error.message })
    } else if (error instanceof EmailDeliveryError) {
      res.status(502).json({ message: error.message })
    } else {
      console.error('Unexpected contact API error:', error)
      res.status(500).json({ message: 'Unable to send your message right now.' })
    }
  }
})

app.use((_req, res) => {
  res.status(404).json({ message: 'API route not found' })
})

app.listen(port, () => {
  console.log(`Portfolio API listening on http://localhost:${port}`)
})
