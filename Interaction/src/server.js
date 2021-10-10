import express from 'express'
import { urlencoded, json } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'

import interactionRouter from './Interaction/interaction.router'
export const app = express()

app.use(helmet())
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/interaction', interactionRouter)
export const start = async () => {
  try {
    
    const port = process.env.port || 3002

    app.listen(port, () => {
      console.log(`API listening on port ${port}`)
    })
  } catch (e) {
    console.log('ERRROR IS')
    console.error(e)
  }
}
