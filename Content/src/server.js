import express from 'express'
import { urlencoded, json } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import connect from './db'
import helmet from 'helmet'
import contentRouter from './Content/content.router'
export const app = express()

app.use(helmet())
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/content', contentRouter)

export const start = async () => {
  try {
    await connect()
    const port = process.env.port || 3000

    app.listen(port, () => {
      console.log(`API listening on port ${port}`)
    })
  } catch (e) {
    console.log('ERRROR IS')
    console.error(e)
  }
}
