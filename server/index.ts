import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

const app = express()
const port = Number(process.env.PORT) || 4000
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

app.use(helmet())
app.use(cors({ origin: allowedOrigin }))
app.use(express.json({ limit: '20kb' }))
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 100 }))

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

app.use((_req, res) => {
  res.status(404).json({ message: 'API route not found' })
})

app.listen(port, () => {
  console.log(`Portfolio API listening on http://localhost:${port}`)
})
